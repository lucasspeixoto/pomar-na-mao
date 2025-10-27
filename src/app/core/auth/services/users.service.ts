import { computed, inject, Injectable, signal } from '@angular/core';
import { LoadingService } from '../../../shared/services/loading-store.service';
import { injectSupabase } from '../../../utils/inject-supabase';
import type { Option } from '../../../shared/components/form/select/select.component';
import type { iUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private supabase = injectSupabase();

  public loadingStore = inject(LoadingService);

  public users = signal<iUser[]>([]);

  public usersOptions = computed(() => {
    return this.users().map(user => ({ label: user.full_name, value: user.id }) as Option);
  });

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
