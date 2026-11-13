import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const username = getAdminFromRequest(req);
  return NextResponse.json({ username }, { status: username ? 200 : 401 });
}
