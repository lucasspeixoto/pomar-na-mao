import { Routes } from '@angular/router';
import { LoginComponent } from './features/authentication/login/login.component';
import { MainComponent } from './features/layout/main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  {
    path: 'home',
    component: MainComponent,
    children: [
      /* Coleta */
      {
        path: 'collect',
        loadChildren: () => import('./features/collect/collect.routes').then(m => m.COLLECT_ROUTES),
      },
      /* Relatórios */
      {
        path: 'collects',
        loadChildren: () =>
          import('./features/collects/collects.routes').then(m => m.COLLECTS_ROUTES),
      },
      {
        path: 'charts',
        loadChildren: () => import('./features/charts/charts.routes').then(m => m.CHARTS_ROUTES),
      },
      /* Detecção */
      {
        path: 'detection',
        loadChildren: () =>
          import('./features/detection/detection.routes').then(m => m.DETECTION_ROUTES),
      },
    ],
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(c => c.NotFoundComponent),
  },
];
