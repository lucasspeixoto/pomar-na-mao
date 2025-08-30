import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FarmRegionApi } from '@sharedS/farm-region-api';
import { WorkRoutineStore } from '../../../services/work-routine/work-routine-store';
import { InspectRoutinesTableComponent } from '../../../components/inspect-routines/inspect-routines-table/inspect-routines-table';

@Component({
  selector: 'app-inspect-routine-list',
  imports: [InspectRoutinesTableComponent],
  templateUrl: './inspect-routine-list.html',
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
export class InspectRoutineList implements OnInit {
  public workRoutineStore = inject(WorkRoutineStore);

  public farmRegionApi = inject(FarmRegionApi);

  public ngOnInit(): void {
    this.workRoutineStore.getWorkRoutinesDataHandler();
    this.farmRegionApi.getAllFarmRegionsHandler();
  }
}
