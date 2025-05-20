import { computed, inject, Injectable, signal } from '@angular/core';
import { FarmRegion } from '@collectM/farm-region.model';
import { LoadingService } from '@sharedS/loading/loading.service';
import { injectSupabase } from '@utils/inject-supabase';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class FarmRegionService {
  private supabase = injectSupabase();

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  private _farmRegions = signal<FarmRegion[]>([]);

  public farmRegions = this._farmRegions.asReadonly();

  public numberOfFarmRegionPoints = computed(() => this._farmRegions().length);

  public numberOfRegions = computed(() => {
    const uniqueRegions = new Set(this._farmRegions().map(item => item.region));

    return uniqueRegions.size;
  });

  public async getAllFarmRegionsHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('regions')
      .select('*')
      .order('region', { ascending: true });

    if (!error) this._farmRegions.set(data);

    this.loadingService.isLoading.set(false);

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
