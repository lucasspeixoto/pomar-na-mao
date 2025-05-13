import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CollectSearchFiltersService {
  public selectedHarvest = signal<string | null>(null);

  public selectedRegion = signal<string | null>(null);

  public selectedOccurrences = signal<string | null>(null);

  public isFiltersDisabled = computed(() => {
    return !this.selectedHarvest() && !this.selectedRegion() && !this.selectedOccurrences();
  });

  public applyFilters(): void {
    console.log(`Safra: ${this.selectedHarvest()}`);
    console.log(`Região: ${this.selectedRegion()}`);
    console.log(`Ocorrência: ${this.selectedOccurrences()}`);
  }

  public clearFilters(): void {
    this.selectedHarvest.set(null);
    this.selectedRegion.set(null);
    this.selectedOccurrences.set(null);
  }
}
