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
import { FarmRegionApi } from '@collectS/farm-region-api';
import { SearchFiltersStore } from '@collectS/search-filters-store';

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
  selector: 'app-search-collect-filters',
  imports: [...PRIMENG, ...COMMON],
  template: `
    <div class="flex flex-col h-full" id="container">
      <div class="w-full mt-4 flex md:flex-col flex-row flex-wrap items-start gap-4">
        <span class="text-2xl font-semibold opacity-55">Filtros</span>
        <div class="my-2 w-full">
          <span class="text-md md:text-xl text-surface-400 mb-0.5">Safra</span>
          <div class="flex flex-col gap-2">
            <input
              pInputText
              id="selectedHarvest"
              aria-describedby="selectedHarvestField"
              [(ngModel)]="collectSearchFiltersStore.selectedHarvest" />
            <small class="font-semibold text-blue-500 dark:text-cyan-300" id="selectedHarvestField"
              >Filtre por alguma safra em específico.</small
            >
          </div>
        </div>

        <div class="my-2 w-full">
          <span class="text-md md:text-xl text-surface-400 mb-0.5">Regiões</span>
          <div class="flex flex-col gap-2">
            <p-select
              appendTo="body"
              [options]="regions()"
              [(ngModel)]="collectSearchFiltersStore.selectedRegion"
              [checkmark]="true"
              [showClear]="true"
              [editable]="true"
              placeholder="Selecione a região" />
            <small class="font-semibold text-blue-500 dark:text-cyan-300" id="selectedHarvestField"
              >Seleciona apenas uma região de alcançe para o filtro</small
            >
          </div>
        </div>

        <div class="my-2 w-full">
          <span class="text-md md:text-xl text-surface-400 mb-0.5">Ocorrências</span>

          <p-select
            appendTo="body"
            [options]="occurrences"
            (onChange)="changeOccurrenceHandler($event)"
            [(ngModel)]="collectSearchFiltersStore.selectedOccurrences"
            placeholder="Selecione a ocorrência"
            [checkmark]="true"
            [showClear]="true"
            optionLabel="name"
            optionValue="code"
            class="w-full" />
        </div>

        <div class="my-2 w-full">
          <span class="text-md md:text-xl text-surface-400 mb-0.5">Variedade</span>
          <div class="flex flex-col gap-2">
            <input
              pInputText
              id="selectedHarvest"
              aria-describedby="selectedHarvestField"
              [(ngModel)]="collectSearchFiltersStore.selectedVariety" />
            <small class="font-semibold text-blue-500 dark:text-cyan-300" id="selectedHarvestField"
              >Filtre por alguma variedade em específico.</small
            >
          </div>
        </div>

        <div class="my-2 w-full">
          <span class="text-md md:text-xl text-surface-400 mb-1">Massa (Kg)</span>
          <p-slider
            min="0"
            max="1000"
            animate="true"
            styleClass="mx-2 mt-4"
            [(ngModel)]="collectSearchFiltersStore.selectedMassRange"
            [range]="true" />
          <p class="ml-3 text-sm md:text-md text-surface-300 mt-2">
            Faixa: {{ collectSearchFiltersStore.selectedMassRange()[0] }} -
            {{ collectSearchFiltersStore.selectedMassRange()[1] }}
          </p>
        </div>
      </div>

      <!-- Action -->
      <div class="flex justify-end gap-4 mt-8 mb-4">
        <p-button
          [disabled]="collectSearchFiltersStore.isFiltersDisabled()"
          label="Limpar"
          icon="pi pi-eraser"
          severity="secondary"
          (click)="clearFilters()" />
        <p-button
          [disabled]="collectSearchFiltersStore.isFiltersDisabled()"
          label="Aplicar"
          icon="pi pi-filter"
          severity="primary"
          (click)="applyFilters()" />
      </div>
    </div>
  `,
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
export class SearchCollectFilters {
  public hideDialog = output<void>();

  public farmRegionApi = inject(FarmRegionApi);

  public collectSearchFiltersStore = inject(SearchFiltersStore);

  public regions = computed(() => [
    ...new Set(this.farmRegionApi.farmRegions().map(item => item.region)),
  ]);

  public occurrences: SelectField[] = OCCURRENCES;

  public changeOccurrenceHandler(event: SelectChangeEvent): void {
    this.collectSearchFiltersStore.selectedOccurrences.set(event.value);
  }

  public applyFilters(): void {
    this.hideDialog.emit();
    this.collectSearchFiltersStore.applyFilters();
  }

  public clearFilters(): void {
    this.hideDialog.emit();
    this.collectSearchFiltersStore.clearFilters();
  }

  public closeDialog(): void {
    this.hideDialog.emit();
  }
}
