import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkCredentials, cookieOptions, createSessionToken, isAdminConfigured } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin login is not set up. Add ADMIN_USERNAME and ADMIN_PASSWORD in Vercel environment variables." }, { status: 503 });
  }
  const { username = "", password = "" } = await req.json().catch(() => ({}));
  if (!checkCredentials(String(username), String(password))) {
    await new Promise(r => setTimeout(r, 800)); // slow down guessing
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }
  const { token, maxAge } = createSessionToken();
  const res = NextResponse.json({ username: String(username).trim() });
  res.cookies.set(ADMIN_COOKIE, token, cookieOptions(maxAge));
  return res;
}
