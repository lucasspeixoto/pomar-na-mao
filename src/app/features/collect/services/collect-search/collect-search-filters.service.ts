import { computed, inject, Injectable, signal } from '@angular/core';
import { CollectService } from '../collect/collect.service';
import { checkCurrencCollectFilters } from '../../utils/localstorage';
import type { CollectFilters } from '../../models/collect-filters.model';

@Injectable({
  providedIn: 'root',
})
export class CollectSearchFiltersService {
  private collectService = inject(CollectService);

  public selectedHarvest = signal<string | null>(null);

  public selectedRegion = signal<string | null>(null);

  public selectedOccurrences = signal<string | null>(null);

  public isFiltersDisabled = computed(() => {
    return !this.selectedHarvest() && !this.selectedRegion() && !this.selectedOccurrences();
  });

  constructor() {
    this.getFilterItemHandler();
  }

  public applyFilters(): void {
    this.collectService.getAllFilteredCollectsDataHandler(
      this.selectedHarvest(),
      this.selectedRegion(),
      this.selectedOccurrences()
    );

    this.storageFiltersHandler();
  }

  public clearFilters(): void {
    this.selectedHarvest.set(null);
    this.selectedRegion.set(null);
    this.selectedOccurrences.set(null);

    this.collectService.clearSelectedCollectsFromFilters();
    localStorage.removeItem('POMAR-NA-MAO:COLLECT-SEARCH-FILTERS');
  }

  public storageFiltersHandler(): void {
    const filters = {
      harvest: this.selectedHarvest(),
      region: this.selectedRegion(),
      occurrence: this.selectedOccurrences(),
    } as CollectFilters;

    localStorage.setItem('POMAR-NA-MAO:COLLECT-SEARCH-FILTERS', JSON.stringify(filters));
  }

  public getFilterItemHandler(): void {
    const filters = checkCurrencCollectFilters();

    if (filters) {
      this.selectedHarvest.set(filters.harvest);
      this.selectedRegion.set(filters.region);
      this.selectedOccurrences.set(filters.occurrence);

      this.collectService.getAllFilteredCollectsDataHandler(
        this.selectedHarvest(),
        this.selectedRegion(),
        this.selectedOccurrences()
      );
    }
  }
}
