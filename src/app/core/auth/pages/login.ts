import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { createLoginForm, type LoginFormValue } from '@authCs/login-form';
import { AuthenticationApi } from '@authS/authentication-api';
import { CustomValidationMessage } from '@sharedC/custom-validation-message';
import { LoadingStore } from '@sharedS/loading-store';
import { messages } from '@sharedU/messages';

const PRIMENG = [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, RippleModule];

const COMPONENTS = [CustomValidationMessage];

const COMMON = [FormsModule, RouterModule, ReactiveFormsModule];

@Component({
  selector: 'app-login',
  imports: [...PRIMENG, ...COMPONENTS, ...COMMON],
  template: `
    <section class="flex">
      <div class="hidden md:block w-[60%] container min-h-screen"></div>
      <div class="w-full md:w-[40%] min-h-screen bg-surface-0 dark:bg-surface-900">
        <div class="flex flex-col items-center justify-between h-full">
          <!-- Top -->
          <div class="flex flex-col items-center justify-center w-full mt-0">
            <!-- Image -->
            <img class="p-4 w-[100px] md:w-[150px]" src="assets/images/logo.png" alt="Pomar" />

            <!-- Welcome -->
            <div class="flex flex-col text-center mb-4 gap-1">
              <span class="text-surface-900 dark:text-surface-0 text-xl md:text-2xl font-medium">
                Pomar na mão
              </span>
              <span class="text-muted-color text-lg md:text-xl"
                >Controle - Rastreabilidade - Produtividade
              </span>
            </div>
          </div>

          <!-- Bottom -->
          <div class="flex flex-col items-center justify-center w-full h-full m-2 px-4 md:px-8">
            <!-- Form -->
            <form [formGroup]="loginForm" class="w-full sm:w-[350px] mb-8 mx-8">
              <div class="mb-2">
                <label
                  for="emailField"
                  class="block text-surface-900 dark:text-surface-0 text-md md:text-xl font-medium mb-1"
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

              <div class="my-4">
                <label
                  for="passwordField"
                  class="block text-surface-900 dark:text-surface-0 font-medium text-md md:text-xl mb-1"
                  >Senha
                </label>
                <p-password
                  id="passwordField"
                  formControlName="password"
                  placeholder="Senha"
                  [toggleMask]="true"
                  class="mb-1"
                  [fluid]="true"
                  [feedback]="false">
                </p-password>

                <app-custom-validation-message
                  id="passwordErrorMessage"
                  controlName="password"
                  [minLength]="3" />
              </div>

              <div class="flex justify-end">
                <span
                  routerLink="/lembrar-senha"
                  class="text-sm sm:text-base font-medium hover:underline no-underline ml-2 text-right cursor-pointer text-primary"
                  >Esqueceu a senha?</span
                >
              </div>

              <div class="mt-4 w-full flex justify-center">
                <p-button
                  class="w-full rounded-3xl"
                  (click)="loginHandler()"
                  id="loginButton"
                  label="Entrar">
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
export class Login {
  public router = inject(Router);

  public authenticationService = inject(AuthenticationApi);

  public loadingStore = inject(LoadingStore);

  public messageService = inject(MessageService);

  public loginForm = createLoginForm();

  public messages = messages;

  @HostListener('document:keydown.enter')
  public handleEnterKey(): void {
    this.loginHandler();
  }

  public async loginHandler(): Promise<void> {
    this.loadingStore.startLoading();

    if (!this.loginForm.valid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Preenchas os campos corretamente',
        life: 3000,
      });

      this.loadingStore.stopLoading();

      return;
    }

    const { email, password } = this.loginForm.value as LoginFormValue;

    this.authenticationService.loginUserHandler(email, password);

    this.loginForm.controls.password.reset();
  }
}
