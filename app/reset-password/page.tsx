"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Opened from the "reset password" email. Supabase logs the student in from the link; they pick a new password here.
export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState<boolean | null>(null);
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supabase) { setReady(false); return; }
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { if (s) setReady(true); });
    supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true); });
    const t = setTimeout(() => setReady(r => r ?? false), 6000);
    return () => { clearTimeout(t); sub.subscription.unsubscribe(); };
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    if (pw.length < 6) { setError("Password must be at least 6 characters."); return; }
    setBusy(true); setError("");
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) { setError(error.message); return; }
    router.replace("/my-course");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-24 pb-16">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 sm:p-8 rounded-3xl shadow-xl space-y-5">
        <h1 className="text-2xl font-bold font-heading text-center text-slate-900 dark:text-white">Set a new password</h1>
        {ready === null && <div className="flex justify-center"><Loader2 className="animate-spin text-blue-600" /></div>}
        {ready === false && (
          <p className="text-sm text-center text-slate-500">This link has expired or was opened in a different browser. Go to <a className="text-blue-600 underline" href="/login">Login</a> → Forgot password to get a new one.</p>
        )}
        {ready && (
          <form onSubmit={save} className="space-y-4">
            {error && <p className="text-xs text-red-600 bg-red-50 dark:bg-red-950/30 rounded-xl px-3 py-2">{error}</p>}
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input type="password" value={pw} onChange={e => setPw(e.target.value)} autoComplete="new-password" placeholder="New password (min 6 characters)" autoFocus
                className="w-full bg-slate-50 dark:bg-slate-900/60 rounded-xl py-3 pl-10 pr-4 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white outline-none focus:border-blue-500" />
            </div>
            <button type="submit" disabled={busy} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm disabled:opacity-50">
              {busy ? "Saving…" : "Save password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
