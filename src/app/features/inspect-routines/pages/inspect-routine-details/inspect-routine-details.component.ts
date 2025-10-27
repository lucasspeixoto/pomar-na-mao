import { InspectRoutineService } from '../../services/inspect-routine.service';
import { ChangeDetectionStrategy, Component, inject, OnInit, type OnDestroy } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ActivatedRoute } from '@angular/router';
import { RoutineMainInfoComponent } from '../../components/routine-main-info/routine-main-info.component';
import { RoutineMainInfo } from '../../models/routine-main-info.model';
import { RoutineMapComponent } from '../../components/routine-map/routine-map.component';
import { RoutinePlantComparisonComponent } from '../../components/routine-plant-comparison/routine-plant-comparison.component';
import { InspectComparisonResumeComponent } from '../../components/inspect-comparison-resume/inspect-comparison-resume.component';

@Component({
  selector: 'app-inspect-routine-details',
  imports: [
    PageBreadcrumbComponent,
    RoutineMainInfoComponent,
    RoutineMapComponent,
    RoutinePlantComparisonComponent,
    InspectComparisonResumeComponent,
  ],
  templateUrl: './inspect-routine-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectRoutineDetailsComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);

  public inspectRoutineService = inject(InspectRoutineService);

  public currentInspectRoutineId!: string | null;

  public routineDetail!: RoutineMainInfo;

  constructor() {
    this.currentInspectRoutineId = this.route.snapshot.paramMap.get('id');
  }

  public ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams as RoutineMainInfo;

    this.routineDetail = { ...queryParams };
  }

  public ngOnDestroy(): void {
    this.inspectRoutineService.setIsComparisonActive(false);
  }
}
