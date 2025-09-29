/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationApi } from '../services/authentication-api';

export const isAdminGuard: CanActivateFn = (_route, _state) => {
  const authenticationService = inject(AuthenticationApi);

  const router = inject(Router);

  if (authenticationService.isAdminCheckHandler()) {
    return true;
  } else {
    router.navigateByUrl('/inicio');
    return false;
  }
};
