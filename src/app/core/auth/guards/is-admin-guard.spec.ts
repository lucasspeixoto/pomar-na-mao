import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthenticationApi } from '../services/authentication-api';
import { isAdminGuard } from './is-admin-guard';

describe('isAdminGuard', () => {
  let authService: jasmine.SpyObj<AuthenticationApi>;
  let router: jasmine.SpyObj<Router>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    const authServiceMock = { isAdminCheckHandler: jasmine.createSpy('authService') };
    const routerMock = { navigateByUrl: jasmine.createSpy('routerSpy') };

    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = {} as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationApi, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    authService = TestBed.inject(AuthenticationApi) as jasmine.SpyObj<AuthenticationApi>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access when user is admin in', () => {
    // Arrange
    authService.isAdminCheckHandler.and.returnValue(true);

    // Act
    const result = TestBed.runInInjectionContext(() => isAdminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBe(true);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should redirect to login when user is not admin', () => {
    // Arrange
    authService.isAdminCheckHandler.and.returnValue(false);

    // Act
    const result = TestBed.runInInjectionContext(() => isAdminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/inicio');
  });
});
