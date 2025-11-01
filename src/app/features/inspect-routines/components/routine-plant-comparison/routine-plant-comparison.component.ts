import { ChangeDetectionStrategy, Component, effect, inject, Input } from '@angular/core';
import { RoutineMainInfo } from '../../models/routine-main-info.model';
import { InspectRoutineService } from '../../services/inspect-routine.service';
import { InspectRoutinePlantsService } from '../../services/inspect-routine-plants.service';

import { CardLoaderComponent } from '../../../../shared/components/card-loader/card-loader.component';
import { occurenceKeys, occurencesLabels } from '../../../../utils/occurrences';
import { PlantOcurrencesListComponent } from '../plant-ocurrences-list/plant-ocurrences-list.component';
import { PlantsService } from '../../../plants/services/plants.service';

@Component({
  selector: 'app-routine-plant-comparison',
  imports: [CardLoaderComponent, PlantOcurrencesListComponent],
  templateUrl: './routine-plant-comparison.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      @layer utilities {
        .text-gradient {
          @apply bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] bg-clip-text text-transparent;
        }
      }
    `,
  ],
})
export class RoutinePlantComparisonComponent {
  @Input() public routineDetail!: RoutineMainInfo;

  public inspectRoutineService = inject(InspectRoutineService);

  public inspectRoutinePlantsService = inject(InspectRoutinePlantsService);

  public plantsService = inject(PlantsService);

  public isLoadingRoutinePlants = this.inspectRoutinePlantsService.isLoading;

  public isLoadingCurrentPlamt = this.plantsService.isLoading;

  public currentIndex = 0;

  public occurenceKeys = occurenceKeys;

  public occurencesLabels = occurencesLabels;

  constructor() {
    effect(() => {
      if (this.inspectRoutineService.isComparisonActive()) {
        const selectedPlantId = this.plantsService.selectedPlantInComparison()?.id;

        const selectedPlantInComparison = this.inspectRoutinePlantsService
          .inspectRoutinePlants()
          .find(plant => plant.plant_id === selectedPlantId)!;

        this.inspectRoutinePlantsService.setSelectedPlantInComparison(selectedPlantInComparison);
      }
    });
  }

  get canGoPreviousPlant(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNextPlant(): boolean {
    return (
      this.inspectRoutinePlantsService.inspectRoutinePlants() &&
      this.currentIndex < this.inspectRoutinePlantsService.inspectRoutinePlants().length - 1
    );
  }

  public async goPreviousPlant(): Promise<void> {
    if (this.canGoPreviousPlant) this.currentIndex--;

    this.getNextPlantData();
  }

  public async goNextPlant(): Promise<void> {
    if (this.canGoNextPlant) this.currentIndex++;

    this.getNextPlantData();
  }

  public async getNextPlantData(): Promise<void> {
    const currentPlant = this.inspectRoutinePlantsService.inspectRoutinePlants()[this.currentIndex];

    await this.plantsService.getPlantByIdHandler(currentPlant?.plant_id!);
  }
}
