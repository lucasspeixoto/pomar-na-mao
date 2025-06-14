/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationApi } from '@authS/authentication-api';

export const isLoggedGuard: CanActivateFn = async (_route, _state) => {
  const authenticationService = inject(AuthenticationApi);

  const router = inject(Router);

  await authenticationService.loadUserData();

  if (!authenticationService.isLoggedCheckHandler()) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
