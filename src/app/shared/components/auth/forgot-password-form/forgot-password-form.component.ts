import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  createForgotPasswordForm,
  type ForgotPasswordFormValue,
} from '../../../../core/auth/constants/forgot-password-form';
import { AuthenticationApi } from '../../../../core/auth/services/authentication-api';
import { messages } from '../../../../utils/messages';
import { LoadingStore } from '../../../services/loading-store';
import { CustomValidationMessage } from '../../form/custom-validation-message/custom-validation-message';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-forgot-password-form',
  imports: [
    CommonModule,
    LabelComponent,
    ButtonComponent,
    CustomValidationMessage,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './forgot-password-form.component.html',
  styles: ``,
})
export class ForgotPasswordFormComponent {
  showPassword = false;
  isChecked = false;

  public router = inject(Router);

  public authenticationService = inject(AuthenticationApi);

  public LoadingStore = inject(LoadingStore);

  public forgotPasswordForm = createForgotPasswordForm();

  public messages = messages;

  public forgotPasswordHandler(): void {
    if (!this.forgotPasswordForm.valid) {
      alert('Preenchas os campos corretamente');

      return;
    }

    const { email } = this.forgotPasswordForm.value as ForgotPasswordFormValue;

    this.authenticationService.forgotPasswordHandler(email);

    this.forgotPasswordForm.reset();
  }
}
