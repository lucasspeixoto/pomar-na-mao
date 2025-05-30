import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { createResetPasswordForm, type ResetPasswordFormValue } from '@authCs/reset-password-form';
import { AuthenticationService } from '@authS/authentication.service';
import { CustomValidationMessageComponent } from '@sharedC/custom-validation-message/custom-validation-message.component';
import { ConnectivityService } from '@sharedS/connectivity/connectivity.service';
import { LoadingService } from '@sharedS/loading/loading.service';
import { messages } from '@utils/messages';
import { ToolbarServicesComponent } from '@authC/offline-collect-button/offline-collect-button.component';

const PRIMENG = [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, RippleModule];

const COMPONENTS = [CustomValidationMessageComponent, ToolbarServicesComponent];

const COMMON = [FormsModule, RouterModule, ReactiveFormsModule];

@Component({
  selector: 'app-reset-password',
  imports: [...PRIMENG, ...COMPONENTS, ...COMMON],
  templateUrl: './reset-password.component.html',
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
