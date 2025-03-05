/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);

  const router = inject(Router);

  if (!authService.isLogged()) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
