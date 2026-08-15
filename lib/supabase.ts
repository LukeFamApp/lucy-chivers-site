import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Public Supabase client — safe for the browser.
 * Only has the permissions granted to the anon role (public insert-only on `subscribers`).
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
