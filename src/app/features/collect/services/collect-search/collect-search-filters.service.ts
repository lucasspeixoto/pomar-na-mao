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

  public selectedVariety = signal<string | null>(null);

  public selectedMassRange = signal<number[]>([0, 1000]);

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
      this.selectedOccurrences(),
      this.selectedVariety(),
      this.selectedMassRange()
    );

    this.storageFiltersHandler();
  }

  public clearFilters(): void {
    this.selectedHarvest.set(null);
    this.selectedRegion.set(null);
    this.selectedOccurrences.set(null);
    this.selectedVariety.set(null);
    this.selectedMassRange.set([0, 1000]);

    this.collectService.clearSelectedCollectsFromFilters();
    localStorage.removeItem('POMAR-NA-MAO:COLLECT-SEARCH-FILTERS');
  }

  public storageFiltersHandler(): void {
    const filters = {
      harvest: this.selectedHarvest(),
      region: this.selectedRegion(),
      occurrence: this.selectedOccurrences(),
      variety: this.selectedVariety(),
      massRange: this.selectedMassRange(),
    } as CollectFilters;

    localStorage.setItem('POMAR-NA-MAO:COLLECT-SEARCH-FILTERS', JSON.stringify(filters));
  }

  public getFilterItemHandler(): void {
    const filters = checkCurrencCollectFilters();

    if (filters) {
      const { harvest, region, occurrence, variety, massRange } = filters;

      this.selectedHarvest.set(harvest);
      this.selectedRegion.set(region);
      this.selectedOccurrences.set(occurrence);
      this.selectedVariety.set(variety);
      this.selectedMassRange.set(massRange);

      this.collectService.getAllFilteredCollectsDataHandler(
        harvest,
        region,
        occurrence,
        variety,
        massRange
      );
    }
  }
}
