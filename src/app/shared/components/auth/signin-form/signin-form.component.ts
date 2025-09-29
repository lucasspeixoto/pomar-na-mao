import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
import { CheckboxComponent } from '../../form/input/checkbox.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createLoginForm, type LoginFormValue } from '../../../../core/auth/constants/login-form';
import { AuthenticationApi } from '../../../../core/auth/services/authentication-api';
import { LoadingStore } from '../../../services/loading-store';
import { messages } from '../../../../utils/messages';
import { CustomValidationMessage } from '../../form/custom-validation-message/custom-validation-message';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-signin-form',
  imports: [
    CommonModule,
    LabelComponent,
    CheckboxComponent,
    ButtonComponent,
    CustomValidationMessage,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signin-form.component.html',
  styles: ``,
})
export class SigninFormComponent {
  public router = inject(Router);

  public authenticationService = inject(AuthenticationApi);

  public loadingStore = inject(LoadingStore);

  public toastService = inject(ToastService);

  public showPassword = false;

  public isChecked = false;

  public loginForm = createLoginForm();

  public messages = messages;

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  @HostListener('document:keydown.enter')
  public handleEnterKey(): void {
    this.onSignIn();
  }

  public onSignIn(): void {
    this.loadingStore.startLoading();

    if (!this.loginForm.valid) {
      this.toastService.show(
        'Erro ao entrar',
        'Por favor, verifique se todos os campos foram preenchidos corretamente.',
        'info'
      );

      this.loadingStore.stopLoading();

      return;
    }

    const { email, password } = this.loginForm.value as LoginFormValue;

    this.authenticationService.loginUserHandler(email, password);
  }
}
