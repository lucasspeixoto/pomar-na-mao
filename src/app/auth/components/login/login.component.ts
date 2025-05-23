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
import { AuthenticationService } from '@authS/authentication.service';
import { CustomValidationMessageComponent } from '@sharedC/custom-validation-message/custom-validation-message.component';
import { InstallPwaButtonComponent } from '@sharedC/install-pwa-button/install-pwa-button.component';
import { ConnectivityService } from '@sharedS/connectivity/connectivity.service';
import { LoadingService } from '@sharedS/loading/loading.service';
import { messages } from '@utils/messages';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    ReactiveFormsModule,
    CustomValidationMessageComponent,
    InstallPwaButtonComponent,
  ],
  template: `
    <section>
      @if (connectivityService.isOnline()) {
        <app-install-pwa-button />
      }
      <div
        class="container bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="w-full flex flex-col items-center justify-center">
          <div class="w-[95%] sm:w-[400px]">
            <div class="bg-surface-0 dark:bg-surface-900 py-6 px-4 sm:px-10 rounded-2xl">
              <div class="text-center mb-8">
                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
                  Bem vindo
                </div>
                <span class="text-muted-color font-medium">Faça login para continuar</span>
              </div>

              <form [formGroup]="loginForm">
                <div class="my-4">
                  <label
                    for="emailField"
                    class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
                    >Email</label
                  >
                  <input
                    pInputText
                    id="emailField"
                    type="text"
                    placeholder="Endereço de Email"
                    class="w-full mb-2"
                    formControlName="email" />
                  <app-custom-validation-message id="emailErrorMessage" controlName="email" />
                </div>

                <div class="my-4">
                  <label
                    for="passwordField"
                    class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
                    >Senha
                  </label>
                  <p-password
                    id="passwordField"
                    formControlName="password"
                    placeholder="Senha"
                    [toggleMask]="true"
                    styleClass="mb-2"
                    [fluid]="true"
                    [feedback]="false">
                  </p-password>

                  <app-custom-validation-message
                    id="passwordErrorMessage"
                    controlName="password"
                    [minLength]="3" />
                </div>

                <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                  <span>
                    <span
                      class="text-sm sm:text-base underline font-bold text-right cursor-pointer text-blue-400"
                      routerLink="/coleta-offline"
                      >Coletar
                    </span>
                    📦
                  </span>
                  <span
                    routerLink="/lembrar-senha"
                    class="text-sm sm:text-base font-medium hover:underline no-underline ml-2 text-right cursor-pointer text-primary"
                    >Esqueceu a senha?</span
                  >
                </div>
              </form>
              <div class="w-full flex justify-center text-center">
                <p-button
                  [disabled]="!connectivityService.isOnline()"
                  (click)="loginHandler()"
                  id="loginButton"
                  label="Entrar">
                </p-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public router = inject(Router);

  public authenticationService = inject(AuthenticationService);

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public connectivityService = inject(ConnectivityService);

  public loginForm = createLoginForm();

  public messages = messages;

  @HostListener('document:keydown.enter')
  public handleEnterKey(): void {
    this.loginHandler();
  }

  public async loginHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    if (!this.loginForm.valid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Preenchas os campos corretamente',
        life: 3000,
      });

      this.loadingService.isLoading.set(false);

      return;
    }

    const { email, password } = this.loginForm.value as LoginFormValue;

    this.authenticationService.loginUserHandler(email, password);

    this.loginForm.controls.password.reset();
  }
}
