import { PlantPositionDetect } from '@sharedS/plant-position-detect';
import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ComplementFormDialog } from '@collectC/complement-form-dialog';
import { ObservationFormDialog } from '@collectC/observation-form-dialog';
import { CollectComplementDataFormValue } from '@collectCs/collect-complement-data-form';
import { PlantData } from '@collectM/collect.model';
import { CollectApi } from '@collectS/collect-api';
import { ComplementStore } from '@collectS/complement-store';
import { ObservationStore } from '@collectS/observation-store';
import { SearchFiltersStore } from '@collectS/search-filters-store';
import { LayoutConfig } from 'src/app/core/layout/layout-config';
import { OccurrencesPipe } from '../pipes/occurrences-pipe';
import { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';
import { environment } from '@env/environment';
import { PLANT_COLLECT_STORAGE } from '@sharedU/endpoints';

const PRIMENG = [
  PopoverModule,
  TableModule,
  ButtonModule,
  ToastModule,
  ToolbarModule,
  InputTextModule,
  TagModule,
  InputIconModule,
  IconFieldModule,
  ConfirmDialogModule,
  FluidModule,
  DataViewModule,
  CheckboxModule,
  CardModule,
  TooltipModule,
];

const PROVIDERS = [MessageService, ConfirmationService];

const COMPONENTS = [ComplementFormDialog, ObservationFormDialog, OccurrencesPipe];

const COMMON = [NgClass];

@Component({
  selector: 'app-search-collect-items',
  imports: [...PRIMENG, ...COMPONENTS, ...COMMON],
  template: `
    <section class="w-full h-full">
      @let collects = filteredCollectData();

      @if (collects.length === 0) {
        <div class="mt-8 w-full flex flex-col justify-center items-center gap-4">
          <img class="w-1/3" src="assets/images/no-data.svg" alt="Sem resultados" />
          <span class="text-xl dark:text-slate-300 text-slate-800">Nenhum resultado.</span>
        </div>
      } @else {
        <span class="text-md sm:text-lg md:text-xl dark:text-slate-300 text-slate-800"
          >Mostrando {{ numberOfFilteredCollects() }} resultados</span
        >
        <div
          class="mx-0.5 mt-4 w-full min-h-[100px] gap-4 flex justify-between items-center flex-wrap ">
          @for (collect of collects; track collect.id) {
            <div
              [ngClass]="{
                'border-2 border-primary-500 animate-pulse text-shadow-[0_35px_35px_rgb(132_204_22_/_0.25)]':
                  PlantPositionDetect.detectedColledtId() === collect.id,
              }"
              class="hover:border hover:border-primary-500 bg-surface-0 dark:bg-surface-900 cursor-pointer w-[45%] sm:w-[220px] rounded-lg p-1/2 sm:p-1">
              <div class="py-2 px-2 flex justify-between items-center">
                <span class="font-bold text-md"> #{{ collect.id.split('-')[0] }}...</span>
                @if (collect?.region) {
                  <div
                    class="shadow-lg shadow-primary-500/50 inline-flex items-center justify-center rounded-md w-10 h-7 bg-primary-200 hover:bg-primary-300 transition-all duration-200 text-sm dark:bg-primary-800 dark:hover:bg-primary-700">
                    <div
                      class="w-auto h-auto text-primary-900 dark:text-primary-50 font-medium text-center px-1">
                      R-{{ collect.region }}
                    </div>
                  </div>
                }
              </div>
              <div class="pl-1 my-2 gap-2 flex flex-col items-start justify-start">
                <span class="text-md sm:text-lg">
                  Massa: <strong>{{ collect.mass }} Kg</strong>
                </span>
                <span class="mr-1 text-md sm:text-lg items-center">
                  Ocorrências: {{ collect | occurrences }}<strong> </strong
                ></span>
              </div>

              <div class="px-0.5 mt-4 gap-1 flex flex-wrap items-start justify-between">
                <span class="text-md"> {{ collect.latitude.toFixed(5) }}</span>
                <span class="text-md"> {{ collect.longitude.toFixed(5) }}</span>
              </div>

              <div class="px-0.5 gap-1 flex flex-wrap items-start justify-center">
                <p-button
                  (onClick)="openPlantPhotoPopover($event, collect.id!)"
                  pTooltip="Foto"
                  tooltipPosition="top"
                  icon="pi pi-image"
                  severity="secondary"
                  [rounded]="true"
                  [text]="true" />
                <p-button
                  pTooltip="Dados complementares"
                  tooltipPosition="top"
                  (click)="showComplementDialog(collect)"
                  icon="pi pi-search-plus"
                  severity="info"
                  [rounded]="true"
                  [text]="true" />
                <p-button
                  pTooltip="Observações"
                  tooltipPosition="top"
                  (click)="showObservationDialog(collect)"
                  icon="pi pi-eye"
                  severity="warn"
                  [rounded]="true"
                  [text]="true" />
              </div>
            </div>
          }
        </div>
      }

      <p-popover #plantPhotoPopover>
        <div class="p-4 max-w-fit max-h-fit">
          <img width="200px" height="200px" [src]="selectedPlantPhotoUrl" alt="Foto Planta" />
        </div>
      </p-popover>

      <app-complement-form-dialog
        (updateDataHandler)="updateComplementDataHandler()"
        [isVisible]="complementDialog"
        (dialogClosed)="complementDialog = false" />

      <app-observation-form-dialog
        (updateDataHandler)="updateObservationDataHandler()"
        [isVisible]="observationDialog"
        (dialogClosed)="observationDialog = false" />
    </section>
  `,
  styles: [
    `
      ::ng-deep .p-dataview {
        .p-dataview-emptymessage {
          padding: 1rem;
          font-size: 1.1rem;
        }
      }
    `,
  ],
  providers: [...PROVIDERS],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCollectItems {
  @ViewChild('plantPhotoPopover') public plantPhotoPopover!: Popover;

  public collectService = inject(CollectApi);

  public ObservationStore = inject(ObservationStore);

  public complementDataService = inject(ComplementStore);

  public collectSearchFiltersStore = inject(SearchFiltersStore);

  public layoutService = inject(LayoutConfig);

  public PlantPositionDetect = inject(PlantPositionDetect);

  public filteredCollectData = this.collectService.filteredCollectData;

  public numberOfFilteredCollects = this.collectService.numberOfFilteredCollects;

  public complementDialog = false;

  public observationDialog = false;

  public selectedCollectId = signal<string | null>(null);

  public numberOfOccurrences = signal(0);

  public selectedPlantPhotoUrl!: string;

  public showComplementDialog(collect: PlantData): void {
    const { id, mass, variety, harvest, planting_date, description, life_of_the_tree, region } =
      collect;

    const complementDataForm = {
      id,
      mass,
      variety,
      plantingDate: planting_date,
      harvest,
      description,
      lifeOfTheTree: life_of_the_tree,
      region,
    } as CollectComplementDataFormValue;

    this.complementDataService.setCollectComplementDataFormValue(complementDataForm);

    this.selectedCollectId.set(id);

    this.complementDialog = true;
  }

  public showObservationDialog(collect: PlantData): void {
    const {
      id,
      stick,
      broken_branch,
      vine_growing,
      burnt_branch,
      struck_by_lightning,
      drill,
      anthill,
      in_experiment,
      weeds_in_the_basin,
      fertilization_or_manuring,
      mites,
      thrips,
      empty_collection_box_near,
    } = collect;

    const observationDataForm = {
      id,
      stick,
      brokenBranch: broken_branch,
      vineGrowing: vine_growing,
      burntBranch: burnt_branch,
      struckByLightning: struck_by_lightning,
      drill,
      anthill,
      inExperiment: in_experiment,
      weedsInTheBasin: weeds_in_the_basin,
      fertilizationOrManuring: fertilization_or_manuring,
      mites,
      thrips,
      emptyCollectionBoxNear: empty_collection_box_near,
    };

    this.ObservationStore.setCollectObservationDataFormValue(observationDataForm);

    this.selectedCollectId.set(id);

    this.observationDialog = true;
  }

  public openPlantPhotoPopover(event: Event, plantId: string): void {
    this.selectedPlantPhotoUrl = `${environment.SUPABASE_URL}/${PLANT_COLLECT_STORAGE}/${plantId}.png`;
    this.plantPhotoPopover.toggle(event);
  }

  public async updateComplementDataHandler(): Promise<void> {
    await this.collectService.updateAPlantCollectComplementDataHandler(this.selectedCollectId()!);
    this.collectSearchFiltersStore.applyFilters();
    this.complementDialog = false;
  }

  public async updateObservationDataHandler(): Promise<void> {
    await this.collectService.updateAPlantCollectObservationDataHandler(this.selectedCollectId()!);
    this.collectSearchFiltersStore.applyFilters();
    this.observationDialog = false;
  }
}
