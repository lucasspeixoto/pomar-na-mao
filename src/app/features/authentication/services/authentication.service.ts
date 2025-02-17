/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { inject, Injectable, signal } from '@angular/core';
import { iUser } from '../models/user.model';
import { injectSupabase } from '../../../shared/utils/inject-supabase';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { messages } from '../../../shared/utils/messages';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private supabase = injectSupabase();

  public currentUser = signal<iUser | null>(null);

  public isLogged = signal(false);

  private router = inject(Router);

  public isLoading = signal(false);

  private notificationService = inject(NzNotificationService);

  public messages = messages;

  public async loginUserHandler(email: string, password: string): Promise<void> {
    this.isLoading.set(true);

    const { error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      this.notificationService.error('Erro', messages[error?.code!]);
      this.isLoading.set(false);

      return;
    }

    this.loadUserData();

    this.notificationService.success('Sucesso', 'Login realizado com sucesso!');

    this.isLoading.set(false);

    this.router.navigateByUrl('/home/collect');
  }

  public async forgotPasswordHandler(email: string): Promise<void> {
    this.isLoading.set(true);

    const { error } = await this.supabase.auth.resetPasswordForEmail(email);

    if (error) {
      this.notificationService.error('Erro', messages[error?.code!]);
      this.isLoading.set(false);

      return;
    }

    this.loadUserData();

    this.notificationService.success('Sucesso', 'Link de recuperação enviado por e-mail!');

    this.isLoading.set(false);

    this.router.navigateByUrl('/login');
  }

  public async resetPasswordHandler(password: string): Promise<void> {
    this.isLoading.set(true);

    const { error } = await this.supabase.auth.updateUser({ password });

    if (error) {
      this.notificationService.error('Erro', messages[error?.code!]);
      this.isLoading.set(false);

      return;
    }

    this.loadUserData();

    this.notificationService.success('Sucesso', 'Senha alterada com sucesso!');

    this.isLoading.set(false);

    this.router.navigateByUrl('/login');
  }

  public async loadUserData(): Promise<void> {
    this.isLoading.set(true);

    const { data } = await this.supabase.auth.getSession();

    if (!data.session) {
      await this.logoutAndRedirect();

      this.isLoading.set(false);

      return;
    }

    this.currentUser.set(data.session.user as unknown as iUser);

    this.isLogged.set(true);

    this.isLoading.set(false);
  }
  public async logoutAndRedirect(): Promise<void> {
    await this.supabase.auth.signOut();
    this.router.navigate(['/']);
  }
}
