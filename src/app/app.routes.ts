import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/collects' },
  /* Coleta */
  {
    path: 'collect',
    loadChildren: () => import('./features/collect/collect.routes').then(m => m.COLLECT_ROUTES),
  },
  /* Relatórios */
  {
    path: 'collects',
    loadChildren: () => import('./features/collects/collects.routes').then(m => m.COLLECTS_ROUTES),
  },
  {
    path: 'charts',
    loadChildren: () => import('./features/charts/charts.routes').then(m => m.CHARTS_ROUTES),
  },
  /* Detecção */
  {
    path: 'detection',
    loadChildren: () => import('./features/detection/detection.routes').then(m => m.DETECTION_ROUTES),
  },
];
