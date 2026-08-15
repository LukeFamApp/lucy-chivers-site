import "server-only";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Server-only Supabase client using the service role key, which bypasses RLS.
 * Needed because `subscribers` only has a public INSERT policy — reading the
 * full list for the admin dashboard requires this elevated key.
 *
 * NEVER import this file from a client component or expose SUPABASE_SERVICE_ROLE_KEY
 * to the browser.
 */
export function getSupabaseAdmin() {
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Add it to .env.local (Supabase dashboard → Project Settings → API → service_role key). It is required for the admin dashboard to read subscribers, since the table only has a public-insert RLS policy."
    );
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
