import { AuthenticationService } from '../../services/authentication.service';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { messages } from '../../../../shared/utils/messages';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  createForgotPasswordForm,
  type ForgotPasswordFormValue,
} from '../../constants/forgot-password-form';
import { Router } from '@angular/router';
import { CustomValidationMessageComponent } from '../../../../shared/components/custom-validation-message/custom-validation-message';

@Component({
  selector: 'app-forgot-password',
  imports: [
    NzButtonModule,
    NzIconModule,
    NzFlexModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    CustomValidationMessageComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  private notificationService = inject(NzNotificationService);

  public router = inject(Router);

  public forgotPasswordForm = createForgotPasswordForm();

  public messages = messages;

  public authenticationService = inject(AuthenticationService);

  public isLoading = this.authenticationService.isLoading;

  public async forgotPasswordHandler(): Promise<void> {
    if (!this.forgotPasswordForm.valid) {
      this.notificationService.error('Erro', 'Preenchas os campos corretamente!');
    }

    const { email } = this.forgotPasswordForm.value as ForgotPasswordFormValue;

    this.authenticationService.forgotPasswordHandler(email);

    this.forgotPasswordForm.reset();
  }
}
