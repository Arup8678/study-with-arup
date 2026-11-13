"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, Smartphone, Loader2, Trophy, UserPlus } from "lucide-react";
import { supabase } from "@/lib/supabase";

/** Keeps a finished test's answers across the login redirect (per browser tab). */
export type PendingResult = { selectedOptions: Record<number, number>; score: number; timeSpent: number };

const key = (id: string) => `rootx_pending_result:${id}`;

export function savePendingResult(id: string, r: PendingResult) {
  try { sessionStorage.setItem(key(id), JSON.stringify(r)); } catch { /* ignore */ }
}
export function loadPendingResult(id: string): PendingResult | null {
  try { const raw = sessionStorage.getItem(key(id)); return raw ? JSON.parse(raw) : null; } catch { return null; }
}
export function clearPendingResult(id: string) {
  try { sessionStorage.removeItem(key(id)); } catch { /* ignore */ }
}

/** Shown after a test is submitted, to students who are not logged in. */
export default function ResultLoginGate({ title, answered, total, next }: { title: string; answered: number; total: number; next: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const google = async () => {
    if (!supabase) return;
    setBusy(true); setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) { setError("Google login is not available right now. Please use email or mobile."); setBusy(false); }
  };

  const loginHref = `/login?next=${encodeURIComponent(next)}`;

  return (
    <div className="max-w-lg mx-auto px-4 pt-24 pb-16">
      <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden text-center">
        <div className="p-6 sm:p-8 bg-slate-900 text-white space-y-3 relative">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600 flex items-center justify-center"><Trophy className="w-7 h-7" /></div>
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Test submitted</p>
          <h1 className="text-xl sm:text-2xl font-extrabold font-heading">{title}</h1>
          <p className="text-sm text-slate-300">You answered <b className="text-white">{answered}</b> of {total} questions.</p>
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="px-4 py-2 rounded-xl bg-white/10 text-2xl font-black tracking-widest blur-[6px] select-none" aria-hidden="true">88 / {total}</span>
            <Lock className="w-5 h-5 text-slate-400" />
          </div>
        </div>
        <div className="p-6 sm:p-8 space-y-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Log in free to see your score</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">See your marks, correct answers and explanations. Takes 30 seconds: just your mobile number or email and a password.</p>
          </div>
          {error && <p className="text-xs text-red-600 bg-red-50 dark:bg-red-950/30 rounded-xl px-3 py-2">{error}</p>}
          <button onClick={google} disabled={busy} className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-semibold flex items-center justify-center gap-3 text-sm disabled:opacity-50">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : (
              <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
              </svg>
            )}
            Continue with Google (Gmail)
          </button>
          <Link href={loginHref} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 text-sm">
            <Smartphone className="w-4 h-4" /> Log in with mobile / email
          </Link>
          <Link href={`${loginHref}&mode=signup`} className="w-full py-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-semibold flex items-center justify-center gap-2 text-sm">
            <UserPlus className="w-4 h-4" /> New student? Create account
          </Link>
          <p className="text-[11px] text-slate-400">Your answers are saved. After login you come straight back to your result.</p>
        </div>
      </div>
    </div>
  );
}
