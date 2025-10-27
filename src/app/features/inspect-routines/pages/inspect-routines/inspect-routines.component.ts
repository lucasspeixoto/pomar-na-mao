import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { InspectRoutinesTableComponent } from '../../components/inspect-routines-table/inspect-routines-table.component';

@Component({
  selector: 'app-inspect-routines',
  imports: [PageBreadcrumbComponent, InspectRoutinesTableComponent],
  templateUrl: './inspect-routines.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectRoutinesComponent {}
