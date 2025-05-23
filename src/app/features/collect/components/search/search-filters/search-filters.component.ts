import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { SelectModule, SelectChangeEvent } from 'primeng/select';
import { OCCURRENCES } from '@collectCs/occurrences';
import { FarmRegionService } from '@collectS/farm-region/farm-region.service';
import { SearchFiltersService } from '@collectS/search-filters/search-filters.service';

interface SelectField {
  name: string;
  code: string;
}

const PRIMENG = [
  SelectModule,
  InputTextModule,
  RadioButtonModule,
  ButtonModule,
  AccordionModule,
  CheckboxModule,
  DividerModule,
  SliderModule,
];

const COMMON = [FormsModule];

@Component({
  selector: 'app-search-filters',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './search-filters.component.html',
  styles: [
    `
      :host ::ng-deep .p-button {
        &:disabled {
          cursor: not-allowed;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFiltersComponent {
  public hideDialog = output<void>();

  public farmRegionService = inject(FarmRegionService);

  public collectSearchFiltersService = inject(SearchFiltersService);

  public regions = computed(() => [
    ...new Set(this.farmRegionService.farmRegions().map(item => item.region)),
  ]);

  public occurrences: SelectField[] = OCCURRENCES;

  public changeOccurrenceHandler(event: SelectChangeEvent): void {
    this.collectSearchFiltersService.selectedOccurrences.set(event.value);
  }

  public applyFilters(): void {
    this.hideDialog.emit();
    this.collectSearchFiltersService.applyFilters();
  }

  public clearFilters(): void {
    this.hideDialog.emit();
    this.collectSearchFiltersService.clearFilters();
  }

  public closeDialog(): void {
    this.hideDialog.emit();
  }
}
