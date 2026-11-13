"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/** Mobile OTP needs an SMS provider in Supabase. Turn on with NEXT_PUBLIC_PHONE_LOGIN=on once it's set up. */
export const PHONE_LOGIN_ENABLED = (process.env.NEXT_PUBLIC_PHONE_LOGIN || "").toLowerCase() === "on";
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
  return ((u.user_metadata || {}) as Record<string, string>).mobile || "";
}

export function studentLabel(u: Student | null | undefined): string {
  return studentName(u) || u?.email || (u?.phone ? "+" + u.phone : "") || "Student";
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
