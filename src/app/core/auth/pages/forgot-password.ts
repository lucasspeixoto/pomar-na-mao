import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { messages } from '@sharedU/messages';
import { AuthenticationApi } from '@authS/authentication-api';
import { LoadingStore } from '@sharedS/loading-store';
import { MessageService } from 'primeng/api';
import { CustomValidationMessage } from '@sharedC/custom-validation-message';
import { createForgotPasswordForm, ForgotPasswordFormValue } from '@authCs/forgot-password-form';
import { ConnectivityStatus } from '@sharedS/connectivity-status';
import { OfflineCollectButton } from '@authC/offline-collect-button/offline-collect-button';

const PRIMENG = [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, RippleModule];

const COMPONENTS = [CustomValidationMessage, OfflineCollectButton];

const COMMON = [FormsModule, RouterModule, ReactiveFormsModule];

@Component({
  selector: 'app-forgot-password',
  imports: [...PRIMENG, ...COMPONENTS, ...COMMON],
  template: `
    <section class="flex">
      <div class="hidden md:block w-[60%] container min-h-screen"></div>
      <div class="w-full md:w-[40%] h-screen bg-surface-0 dark:bg-surface-900">
        <div class="flex h-full flex-col items-center justify-between">
          <!-- Top -->
          <div class="flex flex-col items-center justify-center w-full mt-8 md:mt-0">
            <!-- Image -->
            <img class="w-[180px]" src="assets/images/lichia.png" alt="Pomar" />

            <!-- Welcome -->
            <div class="flex flex-col text-center mb-8 gap-2">
              <span class="text-surface-900 dark:text-surface-0 text-lg md:text-3xl font-medium">
                Pomar na mão
              </span>
              <span class="text-muted-color text-md md:text-xl">Bem vindo</span>
            </div>
          </div>

          <!-- Bottom -->
          <div class="flex flex-col items-center justify-end gap-4 w-full h-full m-4 px-4 md:px-8">
            <!-- Form -->
            <form [formGroup]="forgotPasswordForm" class="w-full sm:w-[350px] mb-8">
              <div class="mb-2">
                <label
                  for="emailField"
                  class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-1"
                  >Email</label
                >
                <input
                  pInputText
                  id="emailField"
                  type="text"
                  placeholder="Endereço de Email"
                  class="w-full mb-1"
                  formControlName="email" />

                <app-custom-validation-message id="emailErrorMessage" controlName="email" />
              </div>

              <div class="flex justify-end">
                <span
                  routerLink="/login"
                  class="text-sm sm:text-base font-medium hover:underline no-underline ml-2 text-right cursor-pointer text-primary"
                  >Login</span
                >
              </div>

              <div class="mt-4 w-full flex justify-center">
                <p-button
                  [disabled]="!ConnectivityStatus.isOnline()"
                  (click)="forgotPasswordHandler()"
                  id="forgotPasswordButton"
                  label="Lembrar"
                  class="w-auto rounded-full"></p-button>
              </div>
            </form>

            <app-offline-collect-button />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .container {
        background-image: url('/assets/images/background.jpeg');
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPassword {
  public router = inject(Router);

  public authenticationService = inject(AuthenticationApi);

  public LoadingStore = inject(LoadingStore);

  public messageService = inject(MessageService);

  public ConnectivityStatus = inject(ConnectivityStatus);

  public forgotPasswordForm = createForgotPasswordForm();

  public messages = messages;

  public async forgotPasswordHandler(): Promise<void> {
    if (!this.forgotPasswordForm.valid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Preenchas os campos corretamente',
        life: 3000,
      });

      return;
    }

    const { email } = this.forgotPasswordForm.value as ForgotPasswordFormValue;

    this.authenticationService.forgotPasswordHandler(email);

    this.forgotPasswordForm.reset();
  }
}
