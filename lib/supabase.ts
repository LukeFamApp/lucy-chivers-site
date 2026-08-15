import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Public Supabase client — safe for the browser.
 * Only has the permissions granted to the anon role (public insert-only on `subscribers`).
 *
 * Lazily constructed so a missing/invalid env var only breaks the request that
 * needs it, instead of throwing at module load — which would otherwise crash
 * the whole build during Next's "collecting page data" step (it imports every
 * route handler, including this one, regardless of env var availability then).
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase is not configured: NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY are missing."
    );
  }

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}
