import { NextResponse } from "next/server";
import { getAdminFromRequest, isAdminConfigured } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { normalisePhone, PHONE_REGEX } from "@/lib/course";

export const dynamic = "force-dynamic";

const MOBILE_DOMAIN = "mobile.studywithrootx.in";

/** Admin: set a new password for a student, found by mobile number or email. */
export async function POST(req: Request) {
  if (!isAdminConfigured()) return NextResponse.json({ error: "Admin login is not set up." }, { status: 503 });
  if (!getAdminFromRequest(req)) return NextResponse.json({ error: "Please log in." }, { status: 401 });
  if (!supabaseAdmin) return NextResponse.json({ error: "Set SUPABASE_SERVICE_ROLE_KEY in Vercel first." }, { status: 503 });

  const body = await req.json().catch(() => ({} as Record<string, string>));
  const ident = String(body.ident || "").trim().toLowerCase();
  const password = String(body.password || "");
  if (password.length < 6) return NextResponse.json({ error: "New password must be at least 6 characters." }, { status: 400 });

  let email = ident;
  if (!ident.includes("@")) {
    const m = normalisePhone(ident);
    if (!PHONE_REGEX.test(m)) return NextResponse.json({ error: "Enter a 10-digit mobile number or an email." }, { status: 400 });
    email = `91${m}@${MOBILE_DOMAIN}`;
  }

  // Find the account (fine for up to a few thousand students).
  let userId: string | null = null;
  for (let page = 1; page <= 20 && !userId; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    userId = data.users.find(u => (u.email || "").toLowerCase() === email)?.id ?? null;
    if (data.users.length < 1000) break;
  }
  if (!userId) return NextResponse.json({ error: "No student account found with that mobile number / email." }, { status: 404 });

  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, { password });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
