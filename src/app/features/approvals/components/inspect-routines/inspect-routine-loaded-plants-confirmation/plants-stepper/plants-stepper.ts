import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { StepperModule } from 'primeng/stepper';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { InspectRoutinePlantsStore } from '../../../../services/inspect-routine/inspect-routine-plants-store';
import { InspectRoutineStore } from '../../../../services/inspect-routine/inspect-routine-store';
import { PlantsStore } from '../../../../services/plants/plants-store';
import { PlantOccurrencesComponent } from '../../../plant-occurrences/plant-occurrences';
import type { RoutinePlants } from '../../../../models/routine.model';
import { occurenceKeys } from '../../../../utils/occurrences';

const PRIMENG = [ButtonModule, StepperModule, SplitterModule, ToggleSwitchModule];

const COMMON = [FormsModule];

@Component({
  selector: 'app-plants-stepper',
  templateUrl: './plants-stepper.html',
  imports: [...PRIMENG, ...COMMON, PlantOccurrencesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlantsStepperComponent {
  public inspectRoutinePlantsStore = inject(InspectRoutinePlantsStore);

  public inspectRoutineStore = inject(InspectRoutineStore);

  public plantsStore = inject(PlantsStore);

  public activeIndex = 1;

  public selectedPlant = this.plantsStore.selectedPlant;

  public occurrences = occurenceKeys;

  constructor() {
    /* Escutar o carregamento de plantas da rotina e buscar a primeira da lista
     * para iniciar a exibição
     */
    effect(() => {
      const currentInspectRoutinePlants = this.inspectRoutinePlantsStore.inspectRoutinePlants();

      if (currentInspectRoutinePlants.length > 0) {
        const firstPlant = currentInspectRoutinePlants[0];

        if (firstPlant) {
          this.plantsStore.getPlantByIdHandler(firstPlant?.plant_id!);
        }
      }
    });
  }

  public onStepClick(stepIndex: number, plant: RoutinePlants): void {
    this.activeIndex = stepIndex;
    this.plantsStore.getPlantByIdHandler(plant?.plant_id!);
    console.log(plant);
  }
}
