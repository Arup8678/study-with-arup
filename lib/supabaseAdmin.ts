import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client using the service-role key, so the enrollments
// table can stay locked (RLS on, no public policies).
const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isEnrollmentDbConfigured = url.trim().length > 0 && serviceKey.trim().length > 0;

export const supabaseAdmin = isEnrollmentDbConfigured
  ? createClient(url, serviceKey, { auth: { persistSession: false } })
  : null;

export const ENROLLMENTS_TABLE = "course_enrollments";
