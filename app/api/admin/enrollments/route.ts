import { NextResponse } from "next/server";
import { getAdminFromRequest, isAdminConfigured } from "@/lib/adminAuth";
import { supabaseAdmin, isEnrollmentDbConfigured, ENROLLMENTS_TABLE } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

function guard(req: Request) {
  if (!isAdminConfigured()) return NextResponse.json({ error: "Admin login is not set up (ADMIN_USERNAME / ADMIN_PASSWORD)." }, { status: 503 });
  if (!getAdminFromRequest(req)) return NextResponse.json({ error: "Please log in." }, { status: 401 });
  if (!isEnrollmentDbConfigured || !supabaseAdmin) return NextResponse.json({ error: "Database not configured: set SUPABASE_SERVICE_ROLE_KEY and run supabase/course_enrollments.sql." }, { status: 503 });
  return null;
}

export async function GET(req: Request) {
  const blocked = guard(req); if (blocked) return blocked;
  const { data, error } = await supabaseAdmin!.from(ENROLLMENTS_TABLE).select("*").order("created_at", { ascending: false }).limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ enrollments: data });
}

export async function PATCH(req: Request) {
  const blocked = guard(req); if (blocked) return blocked;
  const { id, status } = await req.json().catch(() => ({}));
  if (!id || !["pending", "approved", "rejected"].includes(status)) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  const { data, error } = await supabaseAdmin!.from(ENROLLMENTS_TABLE)
    .update({ status, reviewed_at: status === "pending" ? null : new Date().toISOString() })
    .eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ enrollment: data });
}
