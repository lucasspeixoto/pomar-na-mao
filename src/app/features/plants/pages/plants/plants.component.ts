import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { PlantsTableComponent } from '../../components/plants-table/plants-table.component';

@Component({
  selector: 'app-plants',
  imports: [PageBreadcrumbComponent, PlantsTableComponent],
  templateUrl: './plants.component.html',
})
export class PlantsComponent {}
