"use client";

import React, { useState } from "react";
import { KeyRound } from "lucide-react";

/** Admin tool: set a new password for a student who forgot theirs (mobile-number accounts can't reset by email). */
export default function StudentPasswordReset() {
  const [ident, setIdent] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg(null);
    try {
      const r = await fetch("/api/admin/students", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ident, password }) });
      const d = await r.json();
      if (!r.ok) setMsg({ ok: false, text: d.error || "Failed" });
      else { setMsg({ ok: true, text: `Done. Tell the student their new password is: ${password}` }); setPassword(""); }
    } catch { setMsg({ ok: false, text: "Network error" }); }
    setBusy(false);
  };

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
      <h2 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2"><KeyRound className="w-4 h-4" /> Reset a student&apos;s password</h2>
      <p className="text-xs text-slate-500">Use this when a student WhatsApps you that they forgot their password. Check the message comes from their registered number first.</p>
      <form onSubmit={submit} className="flex flex-wrap gap-2">
        <input value={ident} onChange={e => setIdent(e.target.value)} placeholder="Mobile number or email" className="flex-1 min-w-[12rem] rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-white" required />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="New password (min 6)" className="flex-1 min-w-[12rem] rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-white" required minLength={6} />
        <button disabled={busy} className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold disabled:opacity-50">{busy ? "Saving…" : "Set password"}</button>
      </form>
      {msg && <p className={`text-sm ${msg.ok ? "text-emerald-600" : "text-rose-600"}`}>{msg.text}</p>}
    </section>
  );
}
