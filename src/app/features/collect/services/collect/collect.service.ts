import { inject, Injectable, signal } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GeolocationService } from '../../../../shared/services/geolocation/geolocation.service';
import { LoadingService } from '../../../../shared/services/loading/loading.service';
import { CollectComplementDataFormValue } from '../../constants/collect-complement-data-form';
import { PlantFileService } from '../plant-file/plant-file.service';
import { PlantData } from '../../models/collect.model';
import { injectSupabase } from '../../../../shared/utils/inject-supabase';

@Injectable({
  providedIn: 'root',
})
export class CollectService {
  public plantFileService = inject(PlantFileService);

  public geolocationService = inject(GeolocationService);

  public messageService = inject(NzMessageService);

  public loadingService = inject(LoadingService);

  public plantData = signal<PlantData[]>([]);

  private supabase = injectSupabase();

  public async getAllCollectsDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('plant_collect')
      .select('*, users(full_name)')
      .order('created_at', { ascending: false });

    if (data) this.plantData.set(data);

    setTimeout(() => {
      this.loadingService.isLoading.set(false);

      if (error) {
        this.plantData.set([]);
        this.messageService.error('Erro ao carregar base de coletas, tente novamente mais tarde!');
      }
    }, 2000);
  }

  public async insertAPlantCollectHandler(
    complementData: CollectComplementDataFormValue
  ): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { mass, harvest, description, plantingDate } = complementData;

    const { longitude, latitude } = this.geolocationService.coordinates()!;

    const { error } = await this.supabase.from('plant_collect').insert([
      {
        created_at: new Date().toISOString(),
        longitude,
        latitude,
        gps_timestamp: this.geolocationService.coordinatesTimestamp(),
        plant_photo: this.plantFileService.plantPhotoString(),
        mass,
        harvest,
        description,
        planting_date: plantingDate,
      },
    ]);

    setTimeout(() => {
      this.loadingService.isLoading.set(false);

      if (error) {
        this.messageService.error('Erro ao inserir registro!');
      } else {
        this.messageService.success('Registro armazenado!');
      }
    }, 2000);
  }
}
