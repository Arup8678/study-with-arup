import { NextResponse } from "next/server";
import { normalisePhone, normaliseUtr } from "@/lib/course";
import { supabaseAdmin, ENROLLMENTS_TABLE } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

// Returns the current status for a UTR, only when the phone number matches too.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const utr = normaliseUtr(searchParams.get("utr") || "");
  const phone = normalisePhone(searchParams.get("phone") || "");
  if (!supabaseAdmin) return NextResponse.json({ status: null, stored: "local" });

  const { data } = await supabaseAdmin
    .from(ENROLLMENTS_TABLE).select("status, reviewed_at").eq("utr", utr).eq("phone", phone).maybeSingle();
  return NextResponse.json({ status: data?.status ?? null, reviewed_at: data?.reviewed_at ?? null });
}
