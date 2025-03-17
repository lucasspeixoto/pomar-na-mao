import { inject, Injectable, signal } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GeolocationService } from '../../../../shared/services/geolocation/geolocation.service';
import { LoadingService } from '../../../../shared/services/loading/loading.service';
import { PlantUploadService } from '../../../../shared/services/plant-upload/plant-upload.service';
import { PlantData } from '../../models/collect.model';
import { injectSupabase } from '../../../../shared/utils/inject-supabase';
import { ComplementDataService } from '../../../../shared/services/complement-data/complement-data.service';

@Injectable({
  providedIn: 'root',
})
export class CollectService {
  public plantUploadService = inject(PlantUploadService);

  public geolocationService = inject(GeolocationService);

  public messageService = inject(NzMessageService);

  public loadingService = inject(LoadingService);

  public complementDataService = inject(ComplementDataService);

  public plantData = signal<PlantData[]>([]);

  private supabase = injectSupabase();

  public async getAllCollectsDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('plant_collect')
      .select('*, users(full_name)')
      .order('created_at', { ascending: false });

    if (!error) this.plantData.set(data);

    setTimeout(() => {
      this.loadingService.isLoading.set(false);

      if (error) {
        this.plantData.set([]);
        this.messageService.error('Erro ao carregar base de coletas, tente novamente mais tarde!');
      }
    }, 2000);
  }

  public async insertAPlantCollectHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    /* Validações */
    /**
     * Dados complementares
     */
    const complementData = this.complementDataService.getCollectComplementDataFormValue();

    if (!complementData) {
      this.loadingService.isLoading.set(false);
      this.messageService.error('Dados complementares não foram salvos!');
      return;
    }

    /**
     * Dados de geolocalização
     */
    //this.geolocationService.getLocaltionCoordinate(); // Atualiza a posição

    if (!this.geolocationService.isCoordinatesAvailable()) {
      this.loadingService.isLoading.set(false);
      this.messageService.error('Não foi possível obter as coordenadas!');
      return;
    }

    const {
      mass,
      harvest,
      description,
      plantingDate,
      lifeOfTheTree,
      stick,
      brokenBranch,
      vineGrowing,
      burntBranch,
      struckByLightning,
      drill,
      anthill,
      inExperiment,
      weedsInTheBasin,
      fertilizationOrManuring,
      mites,
      thrips,
      emptyCollectionBoxNear,
    } = this.complementDataService.getCollectComplementDataFormValue()!;

    const { longitude, latitude } = this.geolocationService.coordinates()!;

    const newCollectData = {
      created_at: new Date().toISOString(),
      longitude,
      latitude,
      gps_timestamp: this.geolocationService.coordinatesTimestamp(),
      plant_photo: this.plantUploadService.plantPhotoString(),
      mass,
      harvest,
      description,
      planting_date: plantingDate,
      life_of_the_tree: lifeOfTheTree,
      stick,
      broken_branch: brokenBranch,
      vine_growing: vineGrowing,
      burnt_branch: burntBranch,
      struck_by_lightning: struckByLightning,
      drill,
      anthill,
      in_experiment: inExperiment,
      weeds_in_the_basin: weedsInTheBasin,
      fertilization_or_manuring: fertilizationOrManuring,
      mites,
      thrips,
      empty_collection_box_near: emptyCollectionBoxNear,
    };

    const { error } = await this.supabase.from('plant_collect').insert([newCollectData]);

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
