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
      <div class="w-full md:w-[40%] min-h-screen bg-surface-0 dark:bg-surface-900">
        <div class="flex flex-col items-center justify-between h-full">
          <!-- Top -->
          <div class="flex flex-col items-center justify-center w-full mt-0">
            <!-- Image -->
            <img
              class="md:inline-block hidden w-full md:w-[150px]"
              src="assets/images/lichia.png"
              alt="Pomar" />

            <div class="inline-block md:hidden relative w-full h-[200px] mb-4 overflow-hidden">
              <img
                src="assets/images/background.jpeg"
                alt="Pomar"
                class="w-full h-full object-cover [clip-path:ellipse(90%_85%_at_50%_0%)]" />
            </div>

            <!-- Welcome -->
            <div class="flex flex-col text-center mb-2 gap-1">
              <span class="text-surface-900 dark:text-surface-0 text-xl md:text-3xl font-medium">
                Pomar na mão
              </span>
              <span class="text-muted-color text-lg md:text-2xl"
                >Controle - Rastreabilidade - Produtividade
              </span>
            </div>
          </div>

          <!-- Bottom -->
          <div
            class="flex flex-col items-center justify-center gap-4 w-full h-full m-2 px-4 md:px-8">
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
                  class="w-full rounded-3xl"></p-button>
              </div>
            </form>
          </div>

          <app-offline-collect-button class="mb-4" />
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

      :host ::ng-deep {
        .p-inputtext {
          border-radius: 20px;
          padding: 1rem;
        }

        .p-button {
          width: 100%;
          border-radius: 20px;
          padding: 1rem;
        }
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
