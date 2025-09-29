import { computed, inject, Injectable, signal } from '@angular/core';
import type { FarmRegion } from '../../models/farm-region.model';
import { injectSupabase } from '../../utils/inject-supabase';
import { LoadingStore } from './loading-store';

export const REGIONS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

@Injectable({
  providedIn: 'root',
})
export class FarmRegionApi {
  private supabase = injectSupabase();

  public loadingStore = inject(LoadingStore);

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
      /* this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Ocorreu um erro ao carregar regiões, tente novamente!',
        life: 3000,
      }); */
    }
  }
}
