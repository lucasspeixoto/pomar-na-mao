import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { WorkRoutineStore } from '../../services/work-routine-store';
import { WorkRoutinesTableComponent } from '../../components/work-routines-table/work-routines-table';
import { FarmRegionApi } from '@sharedS/farm-region-api';

@Component({
  selector: 'app-approvals',
  imports: [WorkRoutinesTableComponent],
  templateUrl: './approvals.html',
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
export class Approvals implements OnInit {
  public workRoutineStore = inject(WorkRoutineStore);

  public farmRegionApi = inject(FarmRegionApi);

  public ngOnInit(): void {
    this.workRoutineStore.getWorkRoutinesDataHandler();
    this.farmRegionApi.getAllFarmRegionsHandler();
  }
}
