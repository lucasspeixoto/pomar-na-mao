import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { messages } from '../../../utils/messages';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingService } from '../../../services/loading/loading.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CustomValidationMessageComponent } from '../../../components/custom-validation-message/custom-validation-message';
import {
  createResetPasswordForm,
  ResetPasswordFormValue,
} from '../../constants/reset-password-form';

@Component({
  selector: 'app-reset-password',
  imports: [
    ToastModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    ReactiveFormsModule,
    CustomValidationMessageComponent,
  ],
  template: `
    <p-toast />
    <div
      class="container bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
      <div class="w-full flex flex-col items-center justify-center">
        <div class="w-[95%] sm:w-[400px]">
          <div class="bg-surface-0 dark:bg-surface-900 py-12 px-4 sm:px-10 rounded-2xl">
            <div class="text-center mb-8">
              <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
                Bem vindo
              </div>
              <span class="text-muted-color font-medium">Gerar nova Senha</span>
            </div>

            <form [formGroup]="resetPasswordForm">
              <!-- Password -->
              <div class="my-4">
                <label
                  for="passwordField"
                  class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
                  >Senha</label
                >
                <p-password
                  id="passwordField"
                  formControlName="password"
                  placeholder="Senha"
                  [toggleMask]="true"
                  styleClass="mb-2"
                  [fluid]="true"
                  [feedback]="false"></p-password>

                <app-custom-validation-message
                  id="passwordErrorMessage"
                  controlName="password"
                  [minLength]="3" />
              </div>

              <div class="flex items-center justify-end mt-2 mb-8 gap-8">
                <span
                  routerLink="/login"
                  class="text-sm sm:text-base font-medium hover:underline no-underline ml-2 text-right cursor-pointer text-primary"
                  >Login</span
                >
              </div>
              <p-button
                (click)="resetPasswordHandler()"
                id="resetPasswordButton"
                label="Gerar"
                styleClass="w-full"></p-button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  public router = inject(Router);

  public authenticationService = inject(AuthenticationService);

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public resetPasswordForm = createResetPasswordForm();

  public messages = messages;

  public async resetPasswordHandler(): Promise<void> {
    if (!this.resetPasswordForm.valid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Preenchas os campos corretamente',
        life: 3000,
      });

      return;
    }

    const { password } = this.resetPasswordForm.value as ResetPasswordFormValue;

    this.authenticationService.resetPasswordHandler(password);

    this.resetPasswordForm.reset();
  }
}
