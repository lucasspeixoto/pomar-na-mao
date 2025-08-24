import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FarmRegionApi } from '@sharedS/farm-region-api';
import { WorkRoutineStore } from '../../../services/work-routine-store';

@Component({
  selector: 'app-inspection-routine-list',
  imports: [],
  templateUrl: './inspection-routine-list.html',
  styles: [
    `
      :host ::ng-deep {
        .p-button:disabled {
          cursor: not-allowed;
        }

        .p-dialog-header {
          padding: 0rem;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionRoutineList implements OnInit {
  public workRoutineStore = inject(WorkRoutineStore);

  public farmRegionApi = inject(FarmRegionApi);

  public ngOnInit(): void {
    this.workRoutineStore.getWorkRoutinesDataHandler();
    this.farmRegionApi.getAllFarmRegionsHandler();
  }
}
