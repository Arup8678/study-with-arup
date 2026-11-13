// Server-only admin auth. Credentials live ONLY in env vars (ADMIN_USERNAME, ADMIN_PASSWORD),
// never in the code or the browser bundle. A signed, httpOnly cookie keeps the admin logged in.
import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "rootx_admin";
const SESSION_HOURS = 12;

const envUser = () => process.env.ADMIN_USERNAME || "";
const envPass = () => process.env.ADMIN_PASSWORD || "";
const secret = () => process.env.ADMIN_SESSION_SECRET || `${envUser()}:${envPass()}`;

export const isAdminConfigured = () => envUser().length > 0 && envPass().length > 0;

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a), bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function checkCredentials(username: string, password: string) {
  if (!isAdminConfigured()) return false;
  // evaluate both to keep timing similar
  const u = safeEqual(username.trim(), envUser());
  const p = safeEqual(password, envPass());
  return u && p;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSessionToken() {
  const exp = Date.now() + SESSION_HOURS * 3600 * 1000;
  const payload = `${envUser()}|${exp}`;
  return { token: `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`, maxAge: SESSION_HOURS * 3600 };
}

/** Returns the admin username if the request carries a valid session cookie. */
export function getAdminFromRequest(req: Request): string | null {
  if (!isAdminConfigured()) return null;
  const cookie = req.headers.get("cookie") || "";
  const raw = cookie.split(/;\s*/).find(c => c.startsWith(ADMIN_COOKIE + "="))?.slice(ADMIN_COOKIE.length + 1);
  if (!raw) return null;
  const [b64, sig] = decodeURIComponent(raw).split(".");
  if (!b64 || !sig) return null;
  let payload = "";
  try { payload = Buffer.from(b64, "base64url").toString(); } catch { return null; }
  if (!safeEqual(sig, sign(payload))) return null;
  const [user, exp] = payload.split("|");
  if (user !== envUser() || !(Number(exp) > Date.now())) return null;
  return user;
}

export const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge,
});
