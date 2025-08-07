import { Routes } from '@angular/router';
import { AppLayout } from '@layoutC/app.layout';
import { Notfound } from '@sharedP/notfound/notfound';
import { isLoggedGuard } from '@authG/is-logged-guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./app/core/auth/pages/login').then(c => c.Login),
  },
  {
    path: 'lembrar-senha',
    loadComponent: () =>
      import('./app/core/auth/pages/forgot-password').then(c => c.ForgotPassword),
  },
  {
    path: 'resetar-senha',
    loadComponent: () => import('./app/core/auth/pages/reset-password').then(c => c.ResetPassword),
  },
  {
    path: '',
    component: AppLayout,
    canActivate: [isLoggedGuard],
    children: [{ path: 'app', loadChildren: () => import('./app/features/features.routes') }],
  },
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' },
];
