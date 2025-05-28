import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CollectService } from '@collectS/collect/collect.service';
import { LoadingService } from '@sharedS/loading/loading.service';
import { Session } from '@supabase/supabase-js';
import { injectSupabase } from '@utils/inject-supabase';
import { messages } from '@utils/messages';
import { MessageService } from 'primeng/api';
import { iUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public supabase = injectSupabase();

  public currentUser = signal<iUser | null>(null);

  public messageService = inject(MessageService);

  public loadingService = inject(LoadingService);

  public collectService = inject(CollectService);

  public messages = messages;

  public session: Session | null = null;

  private router = inject(Router);

  public async loginUserHandler(email: string, password: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: messages[error.status!],
        life: 3000,
      });

      this.loadingService.isLoading.set(false);

      return;
    }

    //this.loadUserData(); Load desnecessário visto que ocorre no isLoggedGuard

    setTimeout(() => {
      this.router.navigateByUrl('/app/inicio');

      this.collectService.resetCollectData(); // Reset para não ter interferência nos steps de coleta online e offline

      this.loadingService.isLoading.set(false);

      this.messageService.add({
        severity: 'success',
        summary: 'Olá',
        detail: 'Bem-vindo!',
        life: 3000,
      });
    }, 3000);
  }

  public async forgotPasswordHandler(email: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase.auth.resetPasswordForEmail(email);

    if (error) {
      this.loadingService.isLoading.set(false);

      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: messages[error.status!],
        life: 3000,
      });

      return;
    }

    this.loadUserData();

    this.loadingService.isLoading.set(false);

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Link de recuperação enviado por e-mail!',
      life: 3000,
    });

    this.router.navigateByUrl('/login');
  }

  public async resetPasswordHandler(password: string): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { error } = await this.supabase.auth.updateUser({ password });

    if (error) {
      this.loadingService.isLoading.set(false);

      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: messages[error.status!],
        life: 3000,
      });

      return;
    }

    this.loadUserData();

    this.loadingService.isLoading.set(false);

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Senha alterada com sucesso!',
      life: 3000,
    });

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

      /* const { data: userRoleData } = await this.supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', this.session?.user.id)
        .single(); */

      const isAdmin = true; //userRoleData?.role === 'admin' ? true : false;

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
    this.router.navigate(['/login']);

    this.collectService.resetCollectData(); // Reset para não ter interferência nos steps de coleta online e offline

    await this.supabase.auth.signOut();
  }
}
