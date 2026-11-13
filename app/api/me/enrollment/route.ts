import { NextResponse } from "next/server";
import { IDO_COURSE, normalisePhone, normaliseUtr } from "@/lib/course";
import { supabaseAdmin, ENROLLMENTS_TABLE } from "@/lib/supabaseAdmin";
import { getStudentFromRequest, isMissingColumn, studentRealEmail } from "@/lib/studentServer";

export const dynamic = "force-dynamic";

const NOT_READY = { enrollment: null, ready: false };

/** The logged-in student's latest PSC IDO enrollment. */
export async function GET(req: Request) {
  if (!supabaseAdmin) return NextResponse.json(NOT_READY);
  const student = await getStudentFromRequest(req);
  if (!student) return NextResponse.json({ error: "Please log in." }, { status: 401 });

  const { data, error } = await supabaseAdmin.from(ENROLLMENTS_TABLE).select("*")
    .eq("course_id", IDO_COURSE.id).eq("user_id", student.id)
    .order("created_at", { ascending: false }).limit(1).maybeSingle();
  if (error) {
    if (isMissingColumn(error)) return NextResponse.json(NOT_READY);
    return NextResponse.json({ error: "Could not load your course right now." }, { status: 500 });
  }
  if (data) return NextResponse.json({ enrollment: data, ready: true });

  // Students who logged in with their mobile (verified by OTP): pick up an
  // enrollment they made earlier with the same number, and link it.
  const phone = student.phone ? normalisePhone(student.phone) : "";
  if (phone) {
    const { data: byPhone } = await supabaseAdmin.from(ENROLLMENTS_TABLE).select("*")
      .eq("course_id", IDO_COURSE.id).eq("phone", phone).is("user_id", null)
      .order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (byPhone) {
      await supabaseAdmin.from(ENROLLMENTS_TABLE).update({ user_id: student.id }).eq("id", byPhone.id);
      return NextResponse.json({ enrollment: { ...byPhone, user_id: student.id }, ready: true });
    }
  }
  return NextResponse.json({ enrollment: null, ready: true });
}

/** Link an enrollment made before logging in. Needs the exact UTR + mobile it was made with. */
export async function POST(req: Request) {
  if (!supabaseAdmin) return NextResponse.json(NOT_READY);
  const student = await getStudentFromRequest(req);
  if (!student) return NextResponse.json({ error: "Please log in." }, { status: 401 });
  const body = await req.json().catch(() => ({} as Record<string, string>));
  const utr = normaliseUtr(String(body.utr || ""));
  const phone = normalisePhone(String(body.phone || ""));
  if (!utr || !phone) return NextResponse.json({ error: "Bad request" }, { status: 400 });

  const { data, error } = await supabaseAdmin.from(ENROLLMENTS_TABLE)
    .update({ user_id: student.id, email: studentRealEmail(student) })
    .eq("utr", utr).eq("phone", phone).is("user_id", null)
    .select().maybeSingle();
  if (error) {
    if (isMissingColumn(error)) return NextResponse.json(NOT_READY);
    return NextResponse.json({ error: "Could not link right now." }, { status: 500 });
  }
  return NextResponse.json({ enrollment: data ?? null, ready: true });
}
