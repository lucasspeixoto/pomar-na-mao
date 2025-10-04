import { Routes } from '@angular/router';

import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './pages/auth-pages/forgot-password/forgot-password.component';
import { CalenderComponent } from './pages/calender/calender.component';
import { isLoggedGuard } from './core/auth/guards/is-logged.guard';
import { ResetPasswordComponent } from './pages/auth-pages/reset-password/reset-password.component';
import { InspectRoutinesComponent } from './pages/routines/inspect-routines/inspect-routines.component';
import { HomeComponent } from './pages/home/home.component';
import { WorkRoutinesComponent } from './pages/routines/work-routines/work-routines.component';
import { InspectRoutineDetailsComponent } from './pages/routines/inspect-routine-details/inspect-routine-details.component';

export const routes: Routes = [
  {
    path: 'login',
    component: SignInComponent,
    title: 'Entrar',
  },
  {
    path: 'lembrar-senha',
    component: ForgotPasswordComponent,
    title: 'Lembrar Senha',
  },
  {
    path: 'resetar-senha',
    component: ResetPasswordComponent,
    title: 'Resetar Senha',
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [isLoggedGuard],
    children: [
      {
        path: 'inicio',
        pathMatch: 'full',
        component: HomeComponent,
        title: 'Bem-vindo(a)',
      },
      {
        path: 'rotinas-de-inspecao',
        component: InspectRoutinesComponent,
        title: 'Rotinas de inspeção',
      },
      {
        path: 'rotinas-de-trabalho',
        component: WorkRoutinesComponent,
        title: 'Rotinas de trabalho',
      },
      {
        path: 'rotinas-de-inspecao/:id',
        component: InspectRoutineDetailsComponent,
        title: 'Detalhe Inspeção',
      },
      {
        path: 'calendar',
        component: CalenderComponent,
        title: 'Calendário',
      },
      {
        path: 'perfil',
        component: ProfileComponent,
        title: 'Meu perfil',
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Página não encontrada',
  },
];
