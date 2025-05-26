import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { messages } from '@utils/messages';
import { AuthenticationService } from '@authS/authentication.service';
import { LoadingService } from '@sharedS/loading/loading.service';
import { MessageService } from 'primeng/api';
import { CustomValidationMessageComponent } from '@sharedC/custom-validation-message/custom-validation-message.component';
import { createForgotPasswordForm, ForgotPasswordFormValue } from '@authCs/forgot-password-form';
import { ConnectivityService } from '@sharedS/connectivity/connectivity.service';
import { ToolbarServicesComponent } from '@authC/toolbar-services/toolbar-services.component';

const PRIMENG = [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, RippleModule];

const COMPONENTS = [CustomValidationMessageComponent, ToolbarServicesComponent];

const COMMON = [FormsModule, RouterModule, ReactiveFormsModule];

@Component({
  selector: 'app-forgot-password',
  imports: [...PRIMENG, ...COMPONENTS, ...COMMON],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  public router = inject(Router);

  public authenticationService = inject(AuthenticationService);

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public connectivityService = inject(ConnectivityService);

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
