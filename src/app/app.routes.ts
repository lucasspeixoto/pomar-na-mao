import { Routes } from '@angular/router';
import { DetectionComponent } from './features/detection/detection.component';
import { ReportsComponent } from './features/reports/reports.component';
import { MainComponent } from './layout/main/main.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'inicio',
        component: HomeComponent,
      },
      {
        path: 'deteccao',
        component: DetectionComponent,
      },
      {
        path: 'relatorios',
        component: ReportsComponent,
      },
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' },
];
