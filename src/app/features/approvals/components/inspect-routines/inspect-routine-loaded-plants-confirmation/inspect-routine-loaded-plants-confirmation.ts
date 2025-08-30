import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { StepperModule } from 'primeng/stepper';
import { InspectRoutinePlantsStore } from '../../../services/inspect-routine/inspect-routine-plants-store';
import { InspectRoutineStore } from '../../../services/inspect-routine/inspect-routine-store';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { PlantsStore } from '../../../services/plants/plants-store';
import { RoutineDetailCardComponent } from './routine-detail-card/routine-detail-card';
import { PlantsStepperComponent } from './plants-stepper/plants-stepper';
import { RoutineMapDetailComponent } from './routine-map-detail/routine-map-detail';

const PRIMENG = [ButtonModule, StepperModule, SplitterModule, ToggleSwitchModule];

const COMMON = [FormsModule];

const COMPONENTS = [RoutineDetailCardComponent, PlantsStepperComponent, RoutineMapDetailComponent];

@Component({
  selector: 'app-inspect-routine-loaded-plants-confirmation',
  templateUrl: './inspect-routine-loaded-plants-confirmation.html',
  imports: [...PRIMENG, ...COMMON, ...COMPONENTS],
  styles: [
    `
      .step-overrides {
        :host ::ng-deep {
          .p-step {
            padding-bottom: 30px;
          }

          .p-drawer-header {
            padding: 2px;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectRoutineLoadedPlantsConfirmationComponent {
  public inspectRoutinePlantsStore = inject(InspectRoutinePlantsStore);

  public inspectRoutineStore = inject(InspectRoutineStore);

  public plantsStore = inject(PlantsStore);
}
