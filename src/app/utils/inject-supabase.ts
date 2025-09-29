import { inject } from '@angular/core';

import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseInstance } from '../shared/services/supabase-instance.service';

export const injectSupabase = (): SupabaseClient => {
  const supabaseInstance = inject(SupabaseInstance);
  return supabaseInstance.getClient();
};
