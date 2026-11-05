import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from './env.js';

// Resolve secret key (supporting new format SUPABASE_SECRET_KEY and legacy SUPABASE_SERVICE_ROLE_KEY)
export const supabaseSecretKey =
  env.SUPABASE_SECRET_KEY ||
  env.SUPABASE_SERVICE_ROLE_KEY ||
  'placeholder-service-role-key';

// Admin client for backend-privileged operations (bypasses RLS only when explicitly required)
export const supabaseAdmin: SupabaseClient = createClient(
  env.SUPABASE_URL,
  supabaseSecretKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Public / Anon client respecting RLS
export const supabasePublic: SupabaseClient = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Client operating on behalf of an authenticated user token
export function createAuthenticatedSupabaseClient(accessToken: string): SupabaseClient {
  return createClient(
    env.SUPABASE_URL,
    env.SUPABASE_PUBLISHABLE_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
