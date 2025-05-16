import { ComplementDialogComponent } from './../../collect-forms-dialog/complement-dialog/complement-dialog.component';
import { NgFor, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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
import { ShortTimestampPipe } from 'src/app/pipes/short-timestamp/short-timestamp.pipe';
import { CollectService } from '../../../services/collect/collect.service';
import { ObservationDialogComponent } from '../../collect-forms-dialog/observation-dialog/observation-dialog.component';
import { PlantData } from '../../../models/collect.model';
import { ObservationDataService } from '../../../services/observation-data/observation-data.service';
import { ComplementDataService } from '../../../services/complement-data/complement-data.service';

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

const PROVIDERS = [MessageService, ConfirmationService];

const PIPES = [NgFor, NgClass, ShortTimestampPipe];

const COMPONENTS = [ComplementDialogComponent, ObservationDialogComponent];

@Component({
  selector: 'app-collect-search-items',
  imports: [...PRIMENG, ...PIPES, ...COMPONENTS],
  templateUrl: './collect-search-items.component.html',
  styleUrl: './collect-search-items.component.scss',
  providers: [...PROVIDERS],
})
export class CollectSearchItemsComponent {
  public collectService = inject(CollectService);

  public observationDataService = inject(ObservationDataService);

  public complementDataService = inject(ComplementDataService);

  public filteredCollectData = this.collectService.filteredCollectData;

  public numberOfFilteredCollects = this.collectService.numberOfFilteredCollects;

  public complementDialog = false;

  public observationDialog = false;

  public selectedCollectId = signal<string | null>(null);

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

    this.observationDataService.setCollectObservationDataFormValue(observationDataForm);

    this.selectedCollectId.set(id);

    this.observationDialog = true;
  }

  public updateComplementDataHandler(): void {
    this.collectService.updateAPlantCollectHandler(this.selectedCollectId()!);
  }

  public updateObservationDataHandler(): void {
    this.collectService.updateAPlantCollectHandler(this.selectedCollectId()!);
  }
}
