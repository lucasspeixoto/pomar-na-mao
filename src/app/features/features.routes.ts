/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Routes } from '@angular/router';
import { CollectComponent } from './collect/views/collect.component';
import { HomeComponent } from '@home/home.component';

//import { isAdminGuard } from '../auth/guards/is-admin/is-admin.guard';

export default [
  {
    path: 'inicio',
    component: HomeComponent,
  },
  {
    path: 'coleta',
    component: CollectComponent,
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
