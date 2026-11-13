import type { User } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

/** Reads "Authorization: Bearer <token>" and asks Supabase who it belongs to. Server only. */
export async function getStudentFromRequest(req: Request): Promise<User | null> {
  const h = req.headers.get("authorization") || "";
  const token = h.toLowerCase().startsWith("bearer ") ? h.slice(7).trim() : "";
  if (!token || !supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}

/** True when a Supabase error says a column is missing (student_accounts.sql not run yet). */
export function isMissingColumn(err: { code?: string; message?: string } | null | undefined) {
  if (!err) return false;
  return err.code === "42703" || err.code === "PGRST204" || /column .* does not exist|could not find the .* column/i.test(err.message || "");
}
