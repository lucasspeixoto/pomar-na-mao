import { DetectionService } from '@sharedS/detection/detection.service';
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
import { ComplementDialogComponent } from '@collectC/forms-dialog/complement-dialog/complement-dialog.component';
import { ObservationDialogComponent } from '@collectC/forms-dialog/observation-dialog/observation-dialog.component';
import { CollectComplementDataFormValue } from '@collectCs/collect-complement-data-form';
import { PlantData } from '@collectM/collect.model';
import { CollectService } from '@collectS/collect/collect.service';
import { ComplementDataService } from '@collectS/complement-data/complement-data.service';
import { ObservationDataService } from '@collectS/observation-data/observation-data.service';
import { SearchFiltersService } from '@collectS/search-filters/search-filters.service';
import { LayoutService } from '@layoutS/layout.service';
import { OccurrencesPipe } from '../../../pipes/occurrences.pipe';
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

const COMPONENTS = [ComplementDialogComponent, ObservationDialogComponent, OccurrencesPipe];

const COMMON = [NgClass];

@Component({
  selector: 'app-search-items',
  imports: [...PRIMENG, ...COMPONENTS, ...COMMON],
  templateUrl: './search-items.component.html',
  styleUrl: './search-items.component.scss',
  providers: [...PROVIDERS],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchItemsComponent {
  @ViewChild('plantPhotoPopover') public plantPhotoPopover!: Popover;

  public collectService = inject(CollectService);

  public observationDataService = inject(ObservationDataService);

  public complementDataService = inject(ComplementDataService);

  public collectSearchFiltersService = inject(SearchFiltersService);

  public layoutService = inject(LayoutService);

  public detectionService = inject(DetectionService);

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

    this.observationDataService.setCollectObservationDataFormValue(observationDataForm);

    this.selectedCollectId.set(id);

    this.observationDialog = true;
  }

  public openPlantPhotoPopover(event: Event, plantId: string): void {
    this.selectedPlantPhotoUrl = `${environment.SUPABASE_URL}/${PLANT_COLLECT_STORAGE}/${plantId}.png`;
    this.plantPhotoPopover.toggle(event);
  }

  public async updateComplementDataHandler(): Promise<void> {
    await this.collectService.updateAPlantCollectComplementDataHandler(this.selectedCollectId()!);
    this.collectSearchFiltersService.applyFilters();
    this.complementDialog = false;
  }

  public async updateObservationDataHandler(): Promise<void> {
    await this.collectService.updateAPlantCollectObservationDataHandler(this.selectedCollectId()!);
    this.collectSearchFiltersService.applyFilters();
    this.observationDialog = false;
  }
}
