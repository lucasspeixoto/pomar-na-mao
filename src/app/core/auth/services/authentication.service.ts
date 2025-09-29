import { messages } from '../../../utils/messages';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { iUser } from '../models/user.model';
import { LoadingService } from '../../../shared/services/loading-store.service';
import { injectSupabase } from '../../../utils/inject-supabase';
import { ToastService } from '../../../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public supabase = injectSupabase();

  public currentUser = signal<iUser | null>(null);

  public loadingStore = inject(LoadingService);

  public messages = messages;

  public session: Session | null = null;

  private router = inject(Router);

  private toastService = inject(ToastService);

  public async loginUserHandler(email: string, password: string): Promise<void> {
    this.loadingStore.startLoading();

    const { error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      this.toastService.show(
        'Erro',
        this.messages[error.status!] || 'Erro ao entrar. Tente novamente.',
        'error'
      );

      this.loadingStore.stopLoading();

      return;
    }

    setTimeout(() => {
      this.router.navigateByUrl('/inicio');

      this.loadingStore.stopLoading();

      this.toastService.show('Bem-vindo de volta', 'Login realizado com sucesso!', 'success');
    }, 3000);
  }

  public async forgotPasswordHandler(email: string): Promise<void> {
    this.loadingStore.startLoading();

    const { error } = await this.supabase.auth.resetPasswordForEmail(email);

    if (error) {
      this.loadingStore.stopLoading();

      this.toastService.show(
        'Erro',
        this.messages[error.status!] || 'Erro ao lembrar senha. Tente novamente.',
        'error'
      );

      return;
    }

    this.loadUserData();

    this.loadingStore.stopLoading();

    this.toastService.show('Enviado', 'Link de recuperação enviado por e-mail!', 'success');

    this.router.navigateByUrl('/login');
  }

  public async resetPasswordHandler(password: string): Promise<void> {
    this.loadingStore.startLoading();

    const { error } = await this.supabase.auth.updateUser({ password });

    if (error) {
      this.loadingStore.stopLoading();

      this.toastService.show(
        'Erro',
        this.messages[error.status!] || 'Erro ao resetar senha. Tente novamente.',
        'error'
      );

      return;
    }

    this.loadUserData();

    this.loadingStore.stopLoading();

    this.toastService.show('Sucesso', 'Senha alterada com sucesso!', 'success');

    this.router.navigateByUrl('/login');
  }

  public async loadUserData(): Promise<void> {
    const {
      data: { session },
      error: sessionError,
    } = await this.supabase.auth.getSession();

    if (sessionError || !session) {
      this.restoreSessionFromStorage();
    }

    this.session = session;

    if (session?.user.id) {
      const { data: userData } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', session?.user.id)
        .single();

      const { data: userRoleData } = await this.supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', this.session?.user.id)
        .single();

      const isAdmin = userRoleData?.role === 'admin' ? true : false;

      const iUserData = {
        ...userData,
        isAdmin,
      };

      this.currentUser.set(iUserData as unknown as iUser);
    }
  }

  public restoreSessionFromStorage(): void {
    const sessionData = localStorage.getItem('sb-xqsikzksebdtexargilq-auth-token');

    if (sessionData) {
      const parsedSession = JSON.parse(sessionData);
      this.session = parsedSession?.currentSession || parsedSession?.session || null;
    }
  }

  public isLoggedCheckHandler(): boolean {
    if (this.session) {
      return true;
    }

    const sessionData = localStorage.getItem('sb-xqsikzksebdtexargilq-auth-token');

    if (sessionData) {
      const parsedSession = JSON.parse(sessionData);
      this.session = parsedSession?.currentSession || parsedSession?.session || null;

      return this.session !== null;
    }

    return false;
  }

  public isAdminCheckHandler(): boolean {
    return this.currentUser()?.isAdmin ? true : false;
  }

  public async logoutAndRedirect(): Promise<void> {
    await this.supabase.auth.signOut();

    this.router.navigateByUrl('login');
  }
}
