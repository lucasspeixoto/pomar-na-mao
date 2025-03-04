/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { inject, Injectable, signal } from '@angular/core';
import { iUser } from '../models/user.model';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { messages } from '../../../shared/utils/messages';
import { injectSupabase } from '../../../shared/utils/inject-supabase';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public supabase = injectSupabase();

  public currentUser = signal<iUser | null>(null);

  public isLogged = signal(false);

  public isLoading = signal(false);

  public messages = messages;

  private router = inject(Router);

  private notificationService = inject(NzNotificationService);

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

    this.router.navigateByUrl('/collect/register');
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

    const {
      data: { session },
      error: sessionError,
    } = await this.supabase.auth.getSession();

    if (sessionError) {
      this.router.navigateByUrl('/');

      this.supabase.auth.signOut();

      this.isLoading.set(false);

      return;
    }

    this.isLogged.set(true);

    this.isLoading.set(false);

    const { data, error: userDataError } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', session!.user.id)
      .single();

    if (userDataError) {
      this.isLogged.set(false);
      this.isLoading.set(false);
    }

    this.currentUser.set(data as unknown as iUser);
  }

  public async logoutAndRedirect(): Promise<void> {
    this.router.navigate(['/']);
    await this.supabase.auth.signOut();
  }
}
