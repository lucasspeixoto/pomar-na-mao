import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { createResetPasswordForm, type ResetPasswordFormValue } from '@authCs/reset-password-form';
import { AuthenticationService } from '@authS/authentication.service';
import { CustomValidationMessageComponent } from '@sharedC/custom-validation-message/custom-validation-message.component';
import { ConnectivityService } from '@sharedS/connectivity/connectivity.service';
import { LoadingService } from '@sharedS/loading/loading.service';
import { messages } from '@utils/messages';

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
            </form>
            <div class="w-full text-center">
              <p-button
                [disabled]="!connectivityService.isOnline()"
                (click)="resetPasswordHandler()"
                id="resetPasswordButton"
                label="Gerar"
                styleClass="w-auto sm:w-1/2 md:w-2/3 lg:w-full"></p-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  public router = inject(Router);

  public authenticationService = inject(AuthenticationService);

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public connectivityService = inject(ConnectivityService);

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
