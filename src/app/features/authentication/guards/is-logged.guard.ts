/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);

  const router = inject(Router);

  if (!authenticationService.isLoggedCheckHandler()) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
