/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Routes } from '@angular/router';

import { Home } from '@home/home';
import { WorkRoutines } from './work-routines/pages/work-routines';
import { isAdminGuard } from '@authG/is-admin-guard';

export default [
  {
    path: 'inicio',
    component: Home,
  },
  {
    path: 'rotinas-de-trabalho',
    component: WorkRoutines,
    canActivate: [isAdminGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./work-routines/work-routines.routes'),
      },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
