import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured =
  supabaseUrl.trim().length > 0 &&
  supabaseAnonKey.trim().length > 0;

// Browser client. Also handles student login (Supabase Auth): the session is kept
// in localStorage and Google / email-link redirects (?code=...) are picked up automatically.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        flowType: "pkce",
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "rootx-student-auth",
      },
    })
  : null;
