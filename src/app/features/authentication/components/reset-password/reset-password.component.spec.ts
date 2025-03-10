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
import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let authenticationService: jest.Mocked<AuthenticationService>;
  let nzNotificationService: jest.Mocked<NzNotificationService>;
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(() => {
    const authenticationServiceMock = { isLoading: jest.fn(), resetPasswordHandler: jest.fn() };
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

    fixture = TestBed.createComponent(ResetPasswordComponent);
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
      expect(h2Element.textContent).toContain('Gerar nova Senha');
    });

    it('should render resetPassword button title', () => {
      const resetPasswordButtonElement =
        fixture.nativeElement.querySelector('#resetPasswordButton');
      expect(resetPasswordButtonElement).toBeTruthy();
      expect(resetPasswordButtonElement.disabled).toBe(true);
      expect(resetPasswordButtonElement.textContent).toContain('Gerar');
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
      expect(component.resetPasswordForm.get('password')?.value).toBe('');
    });

    it('should validate required fields', () => {
      const form = component.resetPasswordForm;
      expect(form.valid).toBeFalsy();

      const passwordControl = component.resetPasswordForm.controls.password;

      expect(passwordControl?.errors?.['required']).toBeTruthy();
    });

    it('should validate password field', () => {
      const passwordControl = component.resetPasswordForm.controls.password;

      component.resetPasswordForm.patchValue({ password: 'li' });
      expect(passwordControl?.errors).toBeTruthy();

      component.resetPasswordForm.patchValue({ password: 'password1234' });
      expect(passwordControl?.errors).toBeFalsy();
    });

    it('should enable reset Password button when form is valid', () => {
      const resetPasswordButtonElement =
        fixture.nativeElement.querySelector('#resetPasswordButton');

      component.resetPasswordForm.setValue({
        password: 'password1234',
      });

      fixture.detectChanges();

      expect(component.resetPasswordForm.valid).toBeTruthy();
      expect(resetPasswordButtonElement.disabled).toBe(false);
    });
  });

  describe('behaviour', () => {
    it('should show notification message when form is invalid and submit is clicked', async () => {
      component.resetPasswordForm.setValue({ password: 'li' });

      fixture.detectChanges();

      await component.resetPasswordHandler();

      expect(nzNotificationService.error).toHaveBeenCalledWith(
        'Erro',
        'Preenchas os campos corretamente!'
      );
      expect(authenticationService.resetPasswordHandler).not.toHaveBeenCalled();
    });

    it('should call AuthenticationService resetPasswordHandler when form is valid and submit is clicked', async () => {
      component.resetPasswordForm.setValue({
        password: 'password1234',
      });

      fixture.detectChanges();

      await component.resetPasswordHandler();

      expect(nzNotificationService.error).not.toHaveBeenCalled();
      expect(authenticationService.resetPasswordHandler).toHaveBeenCalledWith('password1234');

      // reset form
      expect(component.resetPasswordForm.get('password')?.value).toBe('');
    });
  });
});
