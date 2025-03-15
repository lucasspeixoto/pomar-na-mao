/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { inject, Injectable, signal } from '@angular/core';
import { iUser } from '../models/user.model';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { messages } from '../../../shared/utils/messages';
import { injectSupabase } from '../../../shared/utils/inject-supabase';
import { Session } from '@supabase/supabase-js';
import { ConnectivityService } from '../../../shared/services/connectivity/connectivity.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public supabase = injectSupabase();

  public currentUser = signal<iUser | null>(null);

  public isLoading = signal(false);

  public messages = messages;

  public session: Session | null = null;

  private router = inject(Router);

  private notificationService = inject(NzNotificationService);

  private connectivityService = inject(ConnectivityService);

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

    if (sessionError || !session) {
      this.restoreSessionFromStorage();
    }

    this.session = session;

    this.isLoading.set(false);

    if (session?.user.id) {
      const { data, error: userDataError } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', session?.user.id)
        .single();

      if (userDataError) {
        this.isLoading.set(false);
      }

      this.currentUser.set(data as unknown as iUser);
    }

    this.listenForNetworkChanges();
  }

  public restoreSessionFromStorage() {
    this.isLoading.set(true);

    const sessionData = localStorage.getItem('sb-qmhdkjspsnhkwvgodlru-auth-token');

    if (sessionData) {
      const parsedSession = JSON.parse(sessionData);
      this.session = parsedSession?.currentSession || parsedSession?.session || null;
      this.isLoading.set(false);
    }
  }

  public listenForNetworkChanges() {
    window.addEventListener('online', async () => {
      this.connectivityService.isOnline = true;

      const { data } = await this.supabase.auth.getSession();
      if (!data.session) {
        console.warn('Sessão expirada. Usuário precisa fazer login novamente.');
        this.router.navigateByUrl('/');

        this.supabase.auth.signOut();

        this.isLoading.set(false);

        return;
      }
    });
  }

  public isLoggedCheckHandler(): boolean {
    if (this.session) {
      return true;
    }

    const sessionData = localStorage.getItem('sb-qmhdkjspsnhkwvgodlru-auth-token');

    if (sessionData) {
      const parsedSession = JSON.parse(sessionData);
      this.session = parsedSession?.currentSession || parsedSession?.session || null;

      return this.session !== null;
    }

    return false;
  }

  public async logoutAndRedirect(): Promise<void> {
    this.router.navigate(['/']);
    await this.supabase.auth.signOut();
  }
}
