import { Component, computed, inject } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { FarmRegionService } from '../../../services/farm-region/farm-region.service';
import { SelectModule } from 'primeng/select';
import { CollectSearchFiltersService } from '../../../services/collect-search/collect-search-filters.service';

const PRIMENG = [
  SelectModule,
  InputTextModule,
  RadioButtonModule,
  ButtonModule,
  AccordionModule,
  CheckboxModule,
  DividerModule,
];

const COMMON = [FormsModule];

@Component({
  selector: 'app-collect-search-filters',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './collect-search-filters.component.html',
  styleUrl: './collect-search-filters.component.scss',
})
export class CollectSearchFiltersComponent {
  public farmRegionService = inject(FarmRegionService);

  public collectSearchFiltersService = inject(CollectSearchFiltersService);

  public regions = computed(() => [
    ...new Set(this.farmRegionService.farmRegions().map(item => item.region)),
  ]);

  public applyFilters(): void {
    this.collectSearchFiltersService.applyFilters();
  }

  public clearFilters(): void {
    this.collectSearchFiltersService.clearFilters();
  }
}
