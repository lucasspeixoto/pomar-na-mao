/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthenticationService } from '../../services/authentication.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

describe('LoginComponent', () => {
  let authenticationService: jest.Mocked<AuthenticationService>;
  let nzNotificationService: jest.Mocked<NzNotificationService>;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    const authenticationServiceMock = { isLoading: jest.fn(), loginUserHandler: jest.fn() };
    const nzNotificationServiceMock = { error: jest.fn() };

    TestBed.configureTestingModule({
      imports: [NzButtonModule, NzFlexModule, NzInputModule, NzFormModule, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: NzNotificationService, useValue: nzNotificationServiceMock },
        { provide: AuthenticationService, useValue: authenticationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authenticationService = TestBed.inject(
      AuthenticationService
    ) as jest.Mocked<AuthenticationService>;

    nzNotificationService = TestBed.inject(
      NzNotificationService
    ) as jest.Mocked<NzNotificationService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('visibility', () => {
    it('should render h2 login page title', () => {
      const h2Element = fixture.nativeElement.querySelector('h2');
      expect(h2Element).toBeTruthy();
      expect(h2Element.textContent).toContain('Login');
    });

    it('should render login button title', () => {
      const loginButtonElement = fixture.nativeElement.querySelector('#loginButton');
      expect(loginButtonElement).toBeTruthy();
      expect(loginButtonElement.disabled).toBe(true);
      expect(loginButtonElement.textContent).toContain('Entrar');
    });

    it('should toggle passwordVisible visible in Eye button click', () => {
      const passwordEyeToggleElement = fixture.nativeElement.querySelector('#passwordEyeToggle');

      expect(component.passwordVisible).toBe(false);
      passwordEyeToggleElement.click();
      expect(component.passwordVisible).toBe(true);
    });
  });

  describe('form validates', () => {
    it('should initialize with empty form', () => {
      expect(component.loginForm.get('email')?.value).toBe('');
      expect(component.loginForm.get('password')?.value).toBe('');
    });

    it('should validate required fields', () => {
      const form = component.loginForm;
      expect(form.valid).toBeFalsy();

      const emailControl = component.loginForm.controls.email;
      const passwordControl = component.loginForm.controls.password;

      expect(emailControl?.errors?.['required']).toBeTruthy();
      expect(passwordControl?.errors?.['required']).toBeTruthy();
    });

    it('should validate email field', () => {
      const emailControl = component.loginForm.controls.email;

      component.loginForm.patchValue({ email: 'invalid-email' });
      expect(emailControl?.errors).toBeTruthy();

      component.loginForm.patchValue({ email: 'valid_email@gmail.com' });
      expect(emailControl?.errors).toBeFalsy();
    });

    it('should validate password field', () => {
      const passwordControl = component.loginForm.controls.password;

      component.loginForm.patchValue({ password: 'li' });
      expect(passwordControl?.errors).toBeTruthy();

      component.loginForm.patchValue({ password: 'password1234' });
      expect(passwordControl?.errors).toBeFalsy();
    });

    it('should enable login button when form is valid', () => {
      const loginButtonElement = fixture.nativeElement.querySelector('#loginButton');

      component.loginForm.setValue({ email: 'valid_email@gmail.com', password: 'password1234' });

      fixture.detectChanges();

      expect(component.loginForm.valid).toBeTruthy();
      expect(loginButtonElement.disabled).toBe(false);
    });
  });

  describe('behaviour', () => {
    it('should show notification message when form is invalid and submit is clicked', async () => {
      component.loginForm.setValue({ email: 'invalid_email', password: 'li' });

      fixture.detectChanges();

      await component.loginHandler();

      expect(nzNotificationService.error).toHaveBeenCalledWith(
        'Erro',
        'Preenchas os campos corretamente!'
      );
      expect(authenticationService.loginUserHandler).not.toHaveBeenCalled();
    });

    it('should call AuthenticationService loginUserHandler when form is valid and submit is clicked', async () => {
      component.loginForm.setValue({ email: 'valid_email@gmail.com', password: 'password1234' });

      fixture.detectChanges();

      await component.loginHandler();

      expect(nzNotificationService.error).not.toHaveBeenCalled();
      expect(authenticationService.loginUserHandler).toHaveBeenCalledWith(
        'valid_email@gmail.com',
        'password1234'
      );
      // reset form
      expect(component.loginForm.get('email')?.value).toBe('');
      expect(component.loginForm.get('password')?.value).toBe('');
    });
  });
});
