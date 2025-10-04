import { Component } from '@angular/core';
import { MonthlyInspectRoutinesChartComponent } from '../../shared/components/monthly-inspect-routines-chart/monthly-inspect-routines-chart.component';
import { HarvestProductivityComponent } from '../../shared/components/harvest-productivity/harvest-productivity.component';
import { FarmMetricsComponent } from '../../shared/components/farm-metrics/farm-metrics.component';

@Component({
  selector: 'app-home',
  imports: [
    FarmMetricsComponent,
    MonthlyInspectRoutinesChartComponent,
    HarvestProductivityComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
