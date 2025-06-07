import { computed, inject, Injectable, signal } from '@angular/core';
import { REGIONS } from '@collectCs/regions';
import { FarmRegion } from '@collectM/farm-region.model';
import { LoadingStore } from '@sharedS/loading-store';
import { injectSupabase } from '@sharedU/inject-supabase';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class FarmRegionApi {
  private supabase = injectSupabase();

  public loadingStore = inject(LoadingStore);

  public messageService = inject(MessageService);

  private _farmRegions = signal<FarmRegion[]>([]);

  public farmRegions = this._farmRegions.asReadonly();

  public uniqueRegions = computed(() => {
    if (this.farmRegions().length > 0) {
      return [...new Set(this.farmRegions().map(item => item.region))];
    } else {
      return REGIONS;
    }
  });

  public numberOfFarmRegionPoints = computed(() => this._farmRegions().length);

  public numberOfRegions = computed(() => {
    const uniqueRegions = new Set(this._farmRegions().map(item => item.region));

    return uniqueRegions.size;
  });

  public async getAllFarmRegionsHandler(): Promise<void> {
    this.loadingStore.startLoading();

    const { data, error } = await this.supabase
      .from('regions')
      .select('*')
      .order('region', { ascending: true });

    if (!error) this._farmRegions.set(data);

    this.loadingStore.stopLoading();

    if (error) {
      this._farmRegions.set([]);
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Ocorreu um erro ao carregar regiões, tente novamente!',
        life: 3000,
      });
    }
  }
}
