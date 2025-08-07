import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { createResetPasswordForm, ResetPasswordFormValue } from '@authCs/reset-password-form';
import { AuthenticationApi } from '@authS/authentication-api';
import { CustomValidationMessage } from '@sharedC/custom-validation-message';
import { LoadingStore } from '@sharedS/loading-store';
import { messages } from '@sharedU/messages';

const PRIMENG = [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, RippleModule];

const COMPONENTS = [CustomValidationMessage];

const COMMON = [FormsModule, RouterModule, ReactiveFormsModule];

@Component({
  selector: 'app-reset-password',
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
            <form [formGroup]="resetPasswordForm" class="w-full sm:w-[350px] mb-8">
              <div class="mb-2">
                <label
                  for="passwordField"
                  class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-1"
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

              <div class="flex justify-end">
                <span
                  routerLink="/login"
                  class="text-sm sm:text-base font-medium hover:underline no-underline ml-2 text-right cursor-pointer text-primary"
                  >Login</span
                >
              </div>

              <div class="mt-4 w-full flex justify-center">
                <p-button
                  class="w-full rounded-3xl"
                  (click)="resetPasswordHandler()"
                  id="resetPasswordButton"
                  label="Gerar">
                </p-button>
              </div>
            </form>
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
export class ResetPassword {
  public router = inject(Router);

  public authenticationService = inject(AuthenticationApi);

  public LoadingStore = inject(LoadingStore);

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
