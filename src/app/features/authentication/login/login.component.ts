import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { injectSupabase } from './../../../../app/shared/utils/inject-supabase';
import { messages } from './../../../../app/shared/utils/messages';
import { createLoginForm, type LoginFormValue } from './constants/login-form';

@Component({
  selector: 'app-login',
  imports: [NzButtonModule, NzFlexModule, NzInputModule, NzFormModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private router = inject(Router);

  private supabase = injectSupabase();

  private notificationService = inject(NzNotificationService);

  public loginForm = createLoginForm();

  public messages = messages;

  public async loginHandler(): Promise<void> {
    if (!this.loginForm.valid) {
      this.notificationService.error('Erro', 'Preenchas os campos corretamente!');
    }

    const { email, password } = this.loginForm.value as LoginFormValue;

    const { error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      this.notificationService.error('Erro', messages[error?.code!]);
      return;
    }

    this.notificationService.success('Sucesso', 'Login realizado com sucesso!');

    this.loginForm.reset();

    this.router.navigateByUrl('/home/collect');
  }
}
