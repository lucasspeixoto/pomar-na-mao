import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationService } from '../../../features/authentication/services/authentication.service';
import { messages } from '../../../shared/utils/messages';
import {
  createResetPasswordForm,
  type ResetPasswordFormValue,
} from '../../../features/authentication/constants/reset-password-form';

@Component({
  selector: 'app-reset-password',
  imports: [
    NzButtonModule,
    NzIconModule,
    NzFlexModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  private notificationService = inject(NzNotificationService);

  public passwordVisible = false;

  public router = inject(Router);

  public resetPasswordForm = createResetPasswordForm();

  public messages = messages;

  public authenticationService = inject(AuthenticationService);

  public isLoading = this.authenticationService.isLoading;

  public async resetPasswordHandler(): Promise<void> {
    if (!this.resetPasswordForm.valid) {
      this.notificationService.error('Erro', 'Preenchas os campos corretamente!');
    }

    const { password } = this.resetPasswordForm.value as ResetPasswordFormValue;

    this.authenticationService.resetPasswordHandler(password);

    this.resetPasswordForm.reset();
  }
}
