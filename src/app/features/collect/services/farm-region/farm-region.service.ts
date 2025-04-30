import { computed, inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../../services/loading/loading.service';
import { injectSupabase } from '../../../../utils/inject-supabase';
import { FarmRegion } from '../../models/farm-region.model';

@Injectable({
  providedIn: 'root',
})
export class FarmRegionService {
  private supabase = injectSupabase();

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public farmRegions = signal<FarmRegion[]>([]);

  public numberOfFarmRegionPoints = computed(() => this.farmRegions().length);

  public numberOfRegions = computed(() => {
    const uniqueRegions = new Set(this.farmRegions().map(item => item.region));

    return uniqueRegions.size;
  });

  public async getAllFarmRegionsHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('regions')
      .select('*')
      .order('region', { ascending: true });

    if (!error) this.farmRegions.set(data);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.farmRegions.set([]);
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Ocorreu um erro ao carregar regiões, tente novamente!',
        life: 3000,
      });
    }
  }
}
