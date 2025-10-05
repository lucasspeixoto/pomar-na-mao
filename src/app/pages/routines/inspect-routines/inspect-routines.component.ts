import { Component, inject, type OnInit } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { InspectRoutinesTableComponent } from '../../../features/inspect-routines/components/inspect-routines-table/inspect-routines-table.component';
import { InspectRoutineService } from '../../../features/inspect-routines/services/inspect-routine.service';
import { FarmRegionApi } from '../../../shared/services/farm-region-api.service';

@Component({
  selector: 'app-inspect-routines',
  imports: [PageBreadcrumbComponent, InspectRoutinesTableComponent],
  templateUrl: './inspect-routines.component.html',
})
export class InspectRoutinesComponent implements OnInit {
  public inspectRoutineService = inject(InspectRoutineService);

  public farmRegionApi = inject(FarmRegionApi);

  public async ngOnInit(): Promise<void> {
    await this.inspectRoutineService.getInspectRoutinesDataHandler();
    await this.farmRegionApi.getAllFarmRegionsHandler();
  }
}
