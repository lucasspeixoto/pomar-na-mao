import { Routes } from '@angular/router';
import { EcommerceComponent } from './pages/dashboard/ecommerce/ecommerce.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './pages/auth-pages/forgot-password/forgot-password';
import { CalenderComponent } from './pages/calender/calender.component';
import { isLoggedGuard } from './core/auth/guards/is-logged-guard';
import { ResetPasswordComponent } from './pages/auth-pages/reset-password/reset-password.component';

export const routes: Routes = [
  /* { path: '', redirectTo: 'login', pathMatch: 'full' }, */
  // auth pages
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
        path: '',
        component: EcommerceComponent,
        pathMatch: 'full',
        title: 'Bem-vindo(a) ao pomar na mão',
      },
      {
        path: 'calendar',
        component: CalenderComponent,
        title: 'Início',
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
