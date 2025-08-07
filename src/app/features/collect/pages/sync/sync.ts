import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FluidModule } from 'primeng/fluid';
import { AsyncPipe } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule, CheckboxChangeEvent } from 'primeng/checkbox';
import { ComplementFormDialog } from '@collectC/complement-form-dialog';
import { GeolocationFormDialog } from '@collectC/geolocation-form-dialog';
import { ObservationFormDialog } from '@collectC/observation-form-dialog';
import { CollectComplementDataFormValue } from '@collectCs/collect-complement-data-form';
import { CollectGeolocationDataFormValue } from '@collectCs/collect-geolocation-data-form';
import {
  initialCollectObservationData,
  CollectObservationDataFormValue,
} from '@collectCs/collect-observation-data-form';
import { PlantData } from '@collectM/collect.model';

import { GeolocationStore } from '@collectS/geolocation-store';
import { ObservationStore } from '@collectS/observation-store';
import { LayoutConfig } from 'src/app/core/layout/layout-config';
import { IndexDbPlantStore } from '@sharedS/index-db-plant-store';
import { ShortTimestampPipe } from '@sharedPp/short-timestamp-pipe';
import { OccurrencesPipe } from '../../pipes/occurrences-pipe';
import { CollectApi } from '@collectS/collect-api';
import { ComplementStore } from '@collectS/complement-store';

const PRIMENG = [
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
  CheckboxModule,
];

const COMPONENTS = [ComplementFormDialog, ObservationFormDialog, GeolocationFormDialog];

const PROVIDERS = [MessageService, ConfirmationService, ShortTimestampPipe];

const PIPES = [ShortTimestampPipe, OccurrencesPipe];

const COMMON = [AsyncPipe];

@Component({
  selector: 'app-sync',
  imports: [...COMMON, ...PRIMENG, ...COMPONENTS, ...PIPES],
  templateUrl: './sync.html',
  providers: [...PROVIDERS],
  styles: [
    `
      :host ::ng-deep .p-frozen-column {
        font-weight: bold;
      }

      :host ::ng-deep .p-datatable-frozen-tbody {
        font-weight: bold;
      }

      :host ::ng-deep {
        .p-button:disabled {
          cursor: not-allowed;
        }
      }

      ::ng-deep {
        .p-inputmask,
        .p-inputnumber,
        .p-datepicker {
          width: 100%;
        }
      }

      @media (max-width: 450px) {
        .p-iconfield {
          width: 100%;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sync implements OnInit {
  private IndexDbPlantStore = inject(IndexDbPlantStore);

  private collectService = inject(CollectApi);

  private complementDataService = inject(ComplementStore);

  private ObservationStore = inject(ObservationStore);

  private geolocationStore = inject(GeolocationStore);

  private confirmationService = inject(ConfirmationService);

  public layoutService = inject(LayoutConfig);

  public collectedData = this.IndexDbPlantStore.collectedData;

  public totalCollectedData = this.IndexDbPlantStore.totalCollectedData;

  public listAllCollects$ = this.IndexDbPlantStore.listAllCollects();

  public selectedCollects: PlantData[] | null = [];

  public complementDialog = false;

  public observationDialog = false;

  public geolocationDialog = false;

  public ngOnInit(): void {
    this.complementDataService.setCollectComplementDataFormValue(null);
    this.ObservationStore.setCollectObservationDataFormValue(initialCollectObservationData);
  }

  public selectCollectHandler(event: CheckboxChangeEvent, id: string): void {
    if (event.checked) {
      const selectedCollect = this.collectedData().find(item => item.id === id) as PlantData;

      this.selectedCollects = [...this.selectedCollects!, selectedCollect];
    } else {
      const collectsWithNonSelected = this.selectedCollects!.filter(item => item.id !== id);

      this.selectedCollects = collectsWithNonSelected;
    }
  }

  public async syncAllCollects(): Promise<void> {
    this.selectedCollects = this.collectedData();

    await this.syncSelectedCollects();
  }

  public onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public showGeolocationDialog(collect: PlantData): void {
    const { id, latitude, longitude, gps_timestamp } = collect;

    const geolocationFormData = {
      id,
      latitude,
      longitude,
      gpsTimestamp: gps_timestamp,
    };

    this.geolocationStore.setCollectGeolocationDataFormValue(geolocationFormData);

    this.geolocationDialog = true;
  }

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
    };

    this.complementDataService.setCollectComplementDataFormValue(complementDataForm);

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

    this.observationDialog = true;
  }

  public async syncSelectedCollects(): Promise<void> {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja sincronizar as coletas selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Não',
        severity: 'secondary',
      },
      acceptButtonProps: {
        label: 'Sim',
        severity: 'primary',
      },
      accept: async () => {
        if (this.selectedCollects) {
          await this.collectService.syncAllCollectPlantHandler(this.selectedCollects);

          this.selectedCollects = [];
        }
      },
    });
  }

  public deleteSelectedCollects(): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir as coletas selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Não',
        severity: 'secondary',
      },
      acceptButtonProps: {
        label: 'Sim',
        severity: 'primary',
      },
      accept: () => {
        if (this.selectedCollects) {
          const collectIds = this.selectedCollects.map(item => item.id);

          this.IndexDbPlantStore.deleteManyCollects(collectIds, true).subscribe();

          this.selectedCollects = [];
        }
      },
    });
  }

  public updateObservationDataHandler(): void {
    const {
      id,
      stick,
      brokenBranch,
      vineGrowing,
      burntBranch,
      struckByLightning,
      drill,
      anthill,
      inExperiment,
      weedsInTheBasin,
      fertilizationOrManuring,
      mites,
      thrips,
      emptyCollectionBoxNear,
    } =
      this.ObservationStore.getCollectObservationDataFormValue() as CollectObservationDataFormValue;

    this.IndexDbPlantStore.findCollectById(id!).subscribe(value => {
      const updatedPlantData = {
        ...value,
        stick,
        broken_branch: brokenBranch,
        vine_growing: vineGrowing,
        burnt_branch: burntBranch,
        struck_by_lightning: struckByLightning,
        drill,
        anthill,
        in_experiment: inExperiment,
        weeds_in_the_basin: weedsInTheBasin,
        fertilization_or_manuring: fertilizationOrManuring,
        mites,
        thrips,
        empty_collection_box_near: emptyCollectionBoxNear,
      } as PlantData;

      this.IndexDbPlantStore.updateCollect(updatedPlantData, true).subscribe();
    });
  }

  public updateComplementDataHandler(): void {
    const { id, mass, harvest, description, plantingDate, lifeOfTheTree, variety, region } =
      this.complementDataService.getCollectComplementDataFormValue() as CollectComplementDataFormValue;

    this.IndexDbPlantStore.findCollectById(id!).subscribe(value => {
      const updatedPlantData = {
        ...value,
        mass,
        harvest,
        description,
        planting_date: plantingDate,
        life_of_the_tree: lifeOfTheTree,
        variety,
        region,
      } as PlantData;

      this.IndexDbPlantStore.updateCollect(updatedPlantData, true).subscribe();
    });
  }

  public updateGeolocationDataHandler(): void {
    const { id, latitude, longitude, gpsTimestamp } =
      this.geolocationStore.getCollectGeolocationDataFormValue() as CollectGeolocationDataFormValue;

    this.IndexDbPlantStore.findCollectById(id!).subscribe(value => {
      const updatedPlantData = {
        ...value,
        latitude,
        longitude,
        gps_timestamp: gpsTimestamp,
      } as PlantData;

      this.IndexDbPlantStore.updateCollect(updatedPlantData, true).subscribe();
    });
  }
}
