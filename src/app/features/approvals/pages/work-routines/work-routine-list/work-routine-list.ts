import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FarmRegionApi } from '@sharedS/farm-region-api';
import { WorkRoutinesTableComponent } from '../../../components/work-routines/work-routines-table/work-routines-table';
import { WorkRoutineStore } from '../../../services/work-routine/work-routine-store';

@Component({
  selector: 'app-work-routine-list',
  imports: [WorkRoutinesTableComponent],
  templateUrl: './work-routine-list.html',
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
export class WorkRoutineList implements OnInit {
  public workRoutineStore = inject(WorkRoutineStore);

  public farmRegionApi = inject(FarmRegionApi);

  public ngOnInit(): void {
    this.workRoutineStore.getWorkRoutinesDataHandler();
    this.farmRegionApi.getAllFarmRegionsHandler();
  }
}
