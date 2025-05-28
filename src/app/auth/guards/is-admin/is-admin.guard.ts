/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '@authS/authentication.service';

export const isAdminGuard: CanActivateFn = (_route, _state) => {
  const authenticationService = inject(AuthenticationService);

  const router = inject(Router);

  if (authenticationService.isAdminCheckHandler()) {
    return true;
  } else {
    router.navigateByUrl('/app/inicio');
    return false;
  }
};
