import { AuthenticationService } from './../../services/authentication.service';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { messages } from '../../../../shared/utils/messages';
import { createLoginForm, type LoginFormValue } from '../../constants/login-form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';
import { CustomValidationMessageComponent } from '../../../../shared/components/custom-validation-message/custom-validation-message';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';

@Component({
  selector: 'app-login',
  imports: [
    NzButtonModule,
    NzIconModule,
    NzFlexModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    CustomValidationMessageComponent,
    NzAnchorModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private notificationService = inject(NzNotificationService);

  public router = inject(Router);

  public authenticationService = inject(AuthenticationService);

  public loginForm = createLoginForm();

  public messages = messages;

  public passwordVisible = false;

  public async loginHandler(): Promise<void> {
    if (!this.loginForm.valid) {
      this.notificationService.error('Erro', 'Preenchas os campos corretamente!');

      return;
    }

    const { email, password } = this.loginForm.value as LoginFormValue;

    this.authenticationService.loginUserHandler(email, password);

    this.loginForm.reset();
  }
}
