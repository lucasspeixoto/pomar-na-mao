import { Routes } from '@angular/router';
import { MainComponent } from './features/layout/main/main.component';
import { isLoggedGuard } from './features/authentication/guards/is-logged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/authentication/components/login/login.component').then(
        c => c.LoginComponent
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/authentication/components/forgot-password/forgot-password.component').then(
        c => c.ForgotPasswordComponent
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./core/pages/reset-password/reset-password.component').then(
        c => c.ResetPasswordComponent
      ),
  },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [isLoggedGuard],
    children: [
      {
        path: 'collect',
        loadChildren: () => import('./features/collect/collect.routes').then(m => m.COLLECT_ROUTES),
      },
      {
        path: 'collects',
        loadChildren: () =>
          import('./features/collects/collects.routes').then(m => m.COLLECTS_ROUTES),
      },
      {
        path: 'charts',
        loadChildren: () => import('./features/charts/charts.routes').then(m => m.CHARTS_ROUTES),
      },
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
