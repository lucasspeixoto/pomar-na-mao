import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase!: SupabaseClient;

  constructor() {
    this.supabase = new SupabaseClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);
  }
}
