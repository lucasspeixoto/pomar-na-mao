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
import { ToolbarServicesComponent } from '@authC/toolbar-services/toolbar-services.component';

const PRIMENG = [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, RippleModule];

const COMPONENTS = [
  CustomValidationMessageComponent,
  InstallPwaButtonComponent,
  ToolbarServicesComponent,
];

const COMMON = [FormsModule, RouterModule, ReactiveFormsModule];

@Component({
  selector: 'app-login',
  imports: [...PRIMENG, ...COMPONENTS, ...COMMON],
  templateUrl: './login.component.html',
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
