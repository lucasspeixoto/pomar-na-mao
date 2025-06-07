/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Routes } from '@angular/router';
import { Collect } from './collect/pages/collect';
import { Home } from '@home/home';

//import { isAdminGuard } from '../auth/guards/is-admin/is-admin.guard';

export default [
  {
    path: 'inicio',
    component: Home,
  },
  {
    path: 'coleta',
    component: Collect,
    /* canActivate: [isAdminGuard], */
    children: [
      {
        path: '',
        loadChildren: () => import('./collect/collect.routes'),
      },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
