import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FluidModule } from 'primeng/fluid';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { NgClass, NgFor } from '@angular/common';
import { IndexDbCollectService } from './../../../../services/index-db/index-db-collect.service';
import { ExcelService } from '../../../../services/excel/excel.service';
import { PlantData } from '../../models/collect.model';
import { ShortTimestampPipe } from '../../../../pipes/short-timestamp/short-timestamp.pipe';
import { ComplementDialogComponent } from '../../components/collect-forms-dialog/complement-dialog/complement-dialog.component';
import { ObservationDialogComponent } from '../../components/collect-forms-dialog/observation-dialog/observation-dialog.component';
import { ComplementDataService } from '../../services/complement-data/complement-data.service';
import { ObservationDataService } from '../../services/observation-data/observation-data.service';
import {
  initialCollectObservationData,
  type CollectObservationDataFormValue,
} from '../../constants/collect-observation-data-form';
import { CollectService } from '../../services/collect/collect.service';
import { DataViewModule } from 'primeng/dataview';
import { GeolocationDialogComponent } from '../../components/collect-forms-dialog/geolocation-dialog/geolocation-dialog.component';
import { GeolocationFormService } from '../../services/geolocation-form/geolocation-form.service';
import { CheckboxModule, CheckboxChangeEvent } from 'primeng/checkbox';
import { CollectComplementDataFormValue } from '../../constants/collect-complement-data-form';
import { CollectGeolocationDataFormValue } from '../../constants/collect-geolocation-data-form';

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
  DataViewModule,
  CheckboxModule,
];

const COMPONENTS = [
  ComplementDialogComponent,
  ObservationDialogComponent,
  GeolocationDialogComponent,
];

const PROVIDERS = [MessageService, ConfirmationService, ShortTimestampPipe];

const PIPES = [ShortTimestampPipe, NgFor, NgClass];

@Component({
  selector: 'app-collect-sync',
  imports: [...PRIMENG, ...COMPONENTS, ...PIPES],
  templateUrl: './collect-sync.component.html',
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
})
export class CollectSyncComponent implements OnInit {
  private indexDbCollectService = inject(IndexDbCollectService);

  private collectService = inject(CollectService);

  private complementDataService = inject(ComplementDataService);

  private observationDataService = inject(ObservationDataService);

  private geolocationFormService = inject(GeolocationFormService);

  private excelService = inject(ExcelService);

  private confirmationService = inject(ConfirmationService);

  public collectedData = this.indexDbCollectService.collectedData;

  public totalCollectedData = this.indexDbCollectService.totalCollectedData;

  public selectedCollects: PlantData[] | null = [];

  public complementDialog = false;

  public observationDialog = false;

  public geolocationDialog = false;

  public ngOnInit(): void {
    this.complementDataService.setCollectComplementDataFormValue(null);
    this.observationDataService.setCollectObservationDataFormValue(initialCollectObservationData);

    this.indexDbCollectService.listAllCollects();
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

  public exportCSV(): void {
    this.excelService.exportToExcel(this.collectedData(), 'Coletas Offline');
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

    this.geolocationFormService.setCollectGeolocationDataFormValue(geolocationFormData);

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

    this.observationDataService.setCollectObservationDataFormValue(observationDataForm);

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

          this.indexDbCollectService.deleteManyCollects(collectIds, true).subscribe();

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
      this.observationDataService.getCollectObservationDataFormValue() as CollectObservationDataFormValue;

    this.indexDbCollectService.findCollectById(id!).subscribe(value => {
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

      this.indexDbCollectService.updateCollect(updatedPlantData, true).subscribe();
    });
  }

  public updateComplementDataHandler(): void {
    const { id, mass, harvest, description, plantingDate, lifeOfTheTree, variety, region } =
      this.complementDataService.getCollectComplementDataFormValue() as CollectComplementDataFormValue;

    this.indexDbCollectService.findCollectById(id!).subscribe(value => {
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

      this.indexDbCollectService.updateCollect(updatedPlantData, true).subscribe();
    });
  }

  public updateGeolocationDataHandler(): void {
    const { id, latitude, longitude, gpsTimestamp } =
      this.geolocationFormService.getCollectGeolocationDataFormValue() as CollectGeolocationDataFormValue;

    this.indexDbCollectService.findCollectById(id!).subscribe(value => {
      const updatedPlantData = {
        ...value,
        latitude,
        longitude,
        gps_timestamp: gpsTimestamp,
      } as PlantData;

      this.indexDbCollectService.updateCollect(updatedPlantData, true).subscribe();
    });
  }
}
