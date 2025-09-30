import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  createForgotPasswordForm,
  type ForgotPasswordFormValue,
} from '../../../../core/auth/constants/forgot-password-form';
import { AuthenticationService } from '../../../../core/auth/services/authentication.service';
import { messages } from '../../../../utils/messages';
import { CustomValidationMessageComponent } from '../../form/custom-validation-message/custom-validation-message';
import { ButtonComponent } from '../../ui/button/button.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-forgot-password-form',
  imports: [
    CommonModule,
    LabelComponent,
    ButtonComponent,
    CustomValidationMessageComponent,
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

  public authenticationService = inject(AuthenticationService);

  public toastService = inject(ToastService);

  public forgotPasswordForm = createForgotPasswordForm();

  public messages = messages;

  public forgotPasswordHandler(): void {
    if (!this.forgotPasswordForm.valid) {
      this.toastService.show(
        'Formulário inválido!',
        'Por favor, verifique se todos os campos foram preenchidos corretamente.',
        'info'
      );

      return;
    }

    const { email } = this.forgotPasswordForm.value as ForgotPasswordFormValue;

    this.authenticationService.forgotPasswordHandler(email);

    this.forgotPasswordForm.reset();
  }
}
