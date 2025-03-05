/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthenticationService } from '../../services/authentication.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let authenticationService: jest.Mocked<AuthenticationService>;
  let nzNotificationService: jest.Mocked<NzNotificationService>;
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(() => {
    const authenticationServiceMock = { isLoading: jest.fn(), forgotPasswordHandler: jest.fn() };
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

    fixture = TestBed.createComponent(ForgotPasswordComponent);
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
      expect(h2Element.textContent).toContain('Recuperar Senha');
    });

    it('should render forgot Password button title', () => {
      const forgotPasswordButtonElement =
        fixture.nativeElement.querySelector('#forgotPasswordButton');
      expect(forgotPasswordButtonElement).toBeTruthy();
      expect(forgotPasswordButtonElement.disabled).toBe(true);
      expect(forgotPasswordButtonElement.textContent).toContain('Resetar senha');
    });
  });

  describe('form validates', () => {
    it('should initialize with empty form', () => {
      expect(component.forgotPasswordForm.get('email')?.value).toBe('');
    });

    it('should validate required fields', () => {
      const form = component.forgotPasswordForm;
      expect(form.valid).toBeFalsy();

      const emailControl = component.forgotPasswordForm.controls.email;

      expect(emailControl?.errors?.['required']).toBeTruthy();
    });

    it('should validate email field', () => {
      const emailControl = component.forgotPasswordForm.controls.email;

      component.forgotPasswordForm.patchValue({ email: 'invalid-email' });
      expect(emailControl?.errors).toBeTruthy();

      component.forgotPasswordForm.patchValue({ email: 'valid_email@gmail.com' });
      expect(emailControl?.errors).toBeFalsy();
    });

    it('should enable forgot button when form is valid', () => {
      const forgotPasswordButtonElement =
        fixture.nativeElement.querySelector('#forgotPasswordButton');

      component.forgotPasswordForm.setValue({ email: 'valid_email@gmail.com' });

      fixture.detectChanges();

      expect(component.forgotPasswordForm.valid).toBeTruthy();
      expect(forgotPasswordButtonElement.disabled).toBe(false);
    });
  });

  describe('behaviour', () => {
    it('should show notification message when form is invalid and submit is clicked', async () => {
      component.forgotPasswordForm.setValue({ email: 'invalid_email' });

      fixture.detectChanges();

      await component.forgotPasswordHandler();

      expect(nzNotificationService.error).toHaveBeenCalledWith(
        'Erro',
        'Preenchas os campos corretamente!'
      );
      expect(authenticationService.forgotPasswordHandler).not.toHaveBeenCalled();
    });

    it('should call AuthenticationService forgotPasswordHandler when form is valid and submit is clicked', async () => {
      component.forgotPasswordForm.setValue({ email: 'valid_email@gmail.com' });

      fixture.detectChanges();

      await component.forgotPasswordHandler();

      expect(nzNotificationService.error).not.toHaveBeenCalled();
      expect(authenticationService.forgotPasswordHandler).toHaveBeenCalledWith(
        'valid_email@gmail.com'
      );
      // reset form
      expect(component.forgotPasswordForm.get('email')?.value).toBe('');
    });
  });
});
