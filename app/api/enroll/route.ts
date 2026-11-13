import { NextResponse } from "next/server";
import { IDO_COURSE, validateEnrollment } from "@/lib/course";
import { supabaseAdmin, isEnrollmentDbConfigured, ENROLLMENTS_TABLE } from "@/lib/supabaseAdmin";
import { getStudentFromRequest, isMissingColumn, studentRealEmail } from "@/lib/studentServer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: Record<string, string> = {};
  try { body = await req.json(); } catch { /* ignore */ }

  const v = validateEnrollment(body);
  if ("error" in v) return NextResponse.json({ error: v.error }, { status: 400 });

  const record = {
    course_id: IDO_COURSE.id,
    name: v.name,
    phone: v.phone,
    utr: v.utr,
    amount: IDO_COURSE.offerPrice,
    status: "pending" as const,
  };

  if (!isEnrollmentDbConfigured || !supabaseAdmin) {
    // No database yet: accept so the student isn't blocked, but nothing is stored server-side.
    return NextResponse.json({
      enrollment: { ...record, created_at: new Date().toISOString() },
      stored: "local",
    });
  }

  const { data: existing, error: findErr } = await supabaseAdmin
    .from(ENROLLMENTS_TABLE).select("id, phone, status").eq("utr", v.utr).maybeSingle();
  if (findErr) return NextResponse.json({ error: "Could not save right now. Please try again." }, { status: 500 });
  if (existing) {
    return NextResponse.json(
      { error: existing.phone === v.phone
          ? "This UTR is already submitted from your number. Your enrollment is " + existing.status + "."
          : "This UTR has already been used for another enrollment." },
      { status: 409 },
    );
  }

  // If the student is logged in, tie the enrollment to their account.
  const student = await getStudentFromRequest(req);
  const linked = student ? { ...record, user_id: student.id, email: studentRealEmail(student) } : record;

  let { data, error } = await supabaseAdmin.from(ENROLLMENTS_TABLE).insert(linked).select().single();
  if (error && student && isMissingColumn(error)) {
    // supabase/student_accounts.sql hasn't been run yet: save without the account link.
    ({ data, error } = await supabaseAdmin.from(ENROLLMENTS_TABLE).insert(record).select().single());
  }
  if (error) {
    if (error.code === "23505") return NextResponse.json({ error: "This UTR has already been used for another enrollment." }, { status: 409 });
    return NextResponse.json({ error: "Could not save right now. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ enrollment: data, stored: "server" });
}
