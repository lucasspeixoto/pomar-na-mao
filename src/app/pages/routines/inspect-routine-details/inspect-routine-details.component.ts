import { Component, inject } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inspect-routine-details',
  imports: [PageBreadcrumbComponent],
  templateUrl: './inspect-routine-details.component.html',
})
export class InspectRoutineDetailsComponent {
  public route = inject(ActivatedRoute);

  public currentInspectRoutineId!: string | null;

  constructor() {
    this.currentInspectRoutineId = this.route.snapshot.paramMap.get('id');
  }
}
