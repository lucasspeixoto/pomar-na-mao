import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { StepperModule } from 'primeng/stepper';
import { WorkRoutinePlantsStore } from '../../../services/work-routine/work-routine-plants-store';
import { WorkRoutineStore } from '../../../services/work-routine/work-routine-store';
import { WorkRoutinePlants } from '../../../models/routine.model';

const PRIMENG = [ButtonModule, StepperModule, SplitterModule];

@Component({
  selector: 'app-work-routine-loaded-plants-confirmation',
  templateUrl: './work-routine-loaded-plants-confirmation.html',
  imports: [...PRIMENG],
  styles: [
    `
      .step-overrides {
        .p-step {
          padding-bottom: 30px;
        }

        .p-drawer-header {
          padding: 2px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkRoutineLoadedPlantsConfirmationComponent {
  public workRoutinePlantsStore = inject(WorkRoutinePlantsStore);

  public workRoutineStore = inject(WorkRoutineStore);

  public sincronizePlantUpdate(plant: WorkRoutinePlants): void {
    console.log(plant);
  }
}
