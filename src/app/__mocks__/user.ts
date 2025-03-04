import type { Session } from '@supabase/supabase-js';

export const MOCKED_USER = {
  id: '4e607c9c-bba6-4268-83f7-e4ea0d985832',
  full_name: 'Lucas Peixoto',
  avatar_url: '',
  email: 'lspeixoto@gmail.com',
};

export const MOCKE_SUPABASE_SESSION: Session = {
  user: {
    id: '12345678-1234-1234-1234-123456789abc',
    app_metadata: {
      provider: 'email',
      roles: ['user'],
    },
    user_metadata: {
      name: 'Test User',
    },
    aud: 'authenticated',
    email: 'test@example.com',
    created_at: new Date().toISOString(),
    confirmed_at: new Date().toISOString(),
    email_confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
    role: 'user',
    updated_at: new Date().toISOString(),
    identities: [],
    is_anonymous: false,
    factors: [],
  },
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: 'bearer',
};
