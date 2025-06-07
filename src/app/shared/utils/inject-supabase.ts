import { inject } from '@angular/core';
import { SupabaseInstance } from '../services/supabase-instance';
import { SupabaseClient } from '@supabase/supabase-js';

export const injectSupabase = (): SupabaseClient => {
  const supabaseInstance = inject(SupabaseInstance);
  return supabaseInstance.getClient();
};
