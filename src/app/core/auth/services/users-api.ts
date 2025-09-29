import { inject, Injectable, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { LoadingStore } from '../../../shared/services/loading-store';
import { injectSupabase } from '../../../utils/inject-supabase';

@Injectable({
  providedIn: 'root',
})
export class UsersApi {
  private supabase = injectSupabase();

  public loadingStore = inject(LoadingStore);

  public users = signal<User[]>([]);

  public async getAllUsers(): Promise<void> {
    this.loadingStore.startLoading();

    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .order('full_name', { ascending: true });

    if (!error) this.users.set(data);

    this.loadingStore.stopLoading();

    if (error) {
      this.users.set([]);
    }
  }
}
