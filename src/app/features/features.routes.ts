/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Routes } from '@angular/router';

import { Home } from '@home/home';
import { isAdminGuard } from '@authG/is-admin-guard';
import { Approvals } from './approvals/pages/approvals';

export default [
  {
    path: 'inicio',
    component: Home,
  },
  {
    path: 'aprovacoes',
    component: Approvals,
    canActivate: [isAdminGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./approvals/approvals.routes'),
      },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
