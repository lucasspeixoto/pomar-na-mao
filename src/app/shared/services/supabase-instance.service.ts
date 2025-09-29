import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseInstance {
  private static instance: SupabaseInstance;

  public supabase!: SupabaseClient;

  constructor() {
    if (SupabaseInstance.instance) {
      return SupabaseInstance.instance;
    }

    if (typeof window !== 'undefined' && !this.supabase) {
      this.supabase = new SupabaseClient(environment.SUPABASE_URL, environment.SUPABASE_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    }

    SupabaseInstance.instance = this;
  }

  public getClient(): SupabaseClient {
    return this.supabase;
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }
}
