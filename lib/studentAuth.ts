"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Mobile-number accounts use a password, not SMS. Supabase needs an email for a
 * password login, so a mobile number is stored as a stand-in address on this
 * domain. Nothing is ever sent to it (email confirmation must be OFF).
 */
export const MOBILE_EMAIL_DOMAIN = "mobile.studywithrootx.in";
export function mobileToEmail(mobile10: string) {
  return `91${mobile10}@${MOBILE_EMAIL_DOMAIN}`;
}
export function isMobileEmail(email: string | null | undefined) {
  return !!email && email.toLowerCase().endsWith("@" + MOBILE_EMAIL_DOMAIN);
}
/** The real email of a student, or "" for mobile-number accounts. */
export function realEmail(u: { email?: string | null } | null | undefined) {
  return u?.email && !isMobileEmail(u.email) ? u.email : "";
}
export const isStudentAuthConfigured = isSupabaseConfigured;

export type Student = User;

/** Live student session (null when logged out). */
export function useStudent() {
  const [user, setUser] = useState<Student | null>(null);
  const [loading, setLoading] = useState(!!supabase);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    let alive = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, []);

  return { user, loading, configured: isSupabaseConfigured };
}

export function studentName(u: Student | null | undefined): string {
  if (!u) return "";
  const m = (u.user_metadata || {}) as Record<string, string>;
  return (m.full_name || m.name || "").trim();
}

/** 10-digit mobile from the verified login phone, or the one the student typed on their profile. */
export function studentMobile(u: Student | null | undefined): string {
  if (!u) return "";
  if (u.phone) {
    const d = u.phone.replace(/\D/g, "");
    return d.length === 12 && d.startsWith("91") ? d.slice(2) : d;
  }
  const meta = ((u.user_metadata || {}) as Record<string, string>).mobile;
  if (meta) return meta;
  if (isMobileEmail(u.email)) return u.email!.split("@")[0].replace(/^91/, "");
  return "";
}

export function studentLabel(u: Student | null | undefined): string {
  const m = studentMobile(u);
  return studentName(u) || realEmail(u) || (m ? "+91 " + m : "") || "Student";
}

export async function getAccessToken(): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

/** fetch() that sends the student's login token so the server knows who is asking. */
export async function authFetch(input: string, init: RequestInit = {}) {
  const token = await getAccessToken();
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return fetch(input, { ...init, headers });
}

export async function signOutStudent() {
  try { localStorage.removeItem("exam_bangla_logged_in"); } catch { /* ignore */ }
  if (supabase) await supabase.auth.signOut();
  window.dispatchEvent(new Event("auth-state-change"));
}

/** Only allow same-site paths after login (avoid open redirects). */
export function safeNext(next: string | null | undefined, fallback = "/my-course") {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return fallback;
  return next;
}
