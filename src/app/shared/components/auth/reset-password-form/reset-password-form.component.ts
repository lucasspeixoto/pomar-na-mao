import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationApi } from '../../../../core/auth/services/authentication-api';
import { LoadingStore } from '../../../services/loading-store';
import { messages } from '../../../../utils/messages';
import { CustomValidationMessage } from '../../form/custom-validation-message/custom-validation-message';
import {
  createResetPasswordForm,
  type ResetPasswordFormValue,
} from '../../../../core/auth/constants/reset-password-form';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-reset-password-form',
  imports: [
    CommonModule,
    LabelComponent,
    ButtonComponent,
    CustomValidationMessage,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reset-password-form.component.html',
  styles: ``,
})
export class ResetPasswordFormComponent {
  public router = inject(Router);

  public authenticationService = inject(AuthenticationApi);

  public loadingStore = inject(LoadingStore);

  public toastService = inject(ToastService);

  public showPassword = false;

  public isChecked = false;

  public resetPasswordForm = createResetPasswordForm();

  public messages = messages;

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  @HostListener('document:keydown.enter')
  public handleEnterKey(): void {
    this.resetPasswordHandler();
  }

  public resetPasswordHandler(): void {
    this.loadingStore.startLoading();

    if (!this.resetPasswordForm.valid) {
      this.toastService.show(
        'Formulário inválido!',
        'Por favor, verifique se todos os campos foram preenchidos corretamente.',
        'info'
      );

      this.loadingStore.stopLoading();

      return;
    }

    const { password } = this.resetPasswordForm.value as ResetPasswordFormValue;

    this.authenticationService.resetPasswordHandler(password);

    this.resetPasswordForm.reset();
  }
}
