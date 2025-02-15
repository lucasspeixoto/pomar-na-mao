import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { injectSupabase } from './../../../../app/shared/utils/inject-supabase';

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

  private formBuilder = inject(UntypedFormBuilder);

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  public async loginHandler() {
    if (!this.loginForm.valid) {
      this.notificationService.error('Erro', 'Preenchas os campos corretamente!');
    }

    const { email, password } = this.loginForm.value;

    const { error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      this.notificationService.error('Erro', error.message);
      return;
    }

    this.notificationService.success('Sucesso', 'Login realizado com sucesso!');

    this.loginForm.reset();

    this.router.navigateByUrl('/home/collect');
  }
}
