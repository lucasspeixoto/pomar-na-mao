import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexFill,
  ApexStroke,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { DropdownItemComponent } from '../ui/dropdown/dropdown-item/dropdown-item.component';
import { DropdownComponent } from '../ui/dropdown/dropdown.component';

@Component({
  selector: 'app-harvest-productivity',
  imports: [CommonModule, NgApexchartsModule, DropdownComponent, DropdownItemComponent],
  templateUrl: './harvest-productivity.component.html',
})
export class HarvestProductivityComponent {
  public series: ApexNonAxisChartSeries = [75.55];
  public chart: ApexChart = {
    fontFamily: 'Outfit, sans-serif',
    type: 'radialBar',
    height: 330,
    sparkline: { enabled: true },
  };
  public plotOptions: ApexPlotOptions = {
    radialBar: {
      startAngle: -85,
      endAngle: 85,
      hollow: { size: '80%' },
      track: {
        background: '#E4E7EC',
        strokeWidth: '100%',
        margin: 5,
      },
      dataLabels: {
        name: { show: false },
        value: {
          fontSize: '36px',
          fontWeight: '600',
          offsetY: -40,
          color: '#1D2939',
          formatter: (val: number) => `${val}%`,
        },
      },
    },
  };
  public fill: ApexFill = {
    type: 'solid',
    colors: ['#465FFF'],
  };
  public stroke: ApexStroke = {
    lineCap: 'round',
  };
  public labels: string[] = ['Progress'];
  public colors: string[] = ['#465FFF'];

  public isOpen = false;

  public toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  public closeDropdown(): void {
    this.isOpen = false;
  }
}
