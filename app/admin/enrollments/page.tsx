"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Lock, RefreshCw, Check, X, RotateCcw, Search } from "lucide-react";
import type { Enrollment, EnrollmentStatus } from "@/lib/course";

const BADGE: Record<EnrollmentStatus, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  rejected: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

export default function EnrollmentsAdmin() {
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [rows, setRows] = useState<Enrollment[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | EnrollmentStatus>("pending");
  const [q, setQ] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/admin/enrollments", { cache: "no-store" });
      const data = await res.json();
      if (res.status === 401) { setAuthed(false); return; }
      setAuthed(true);
      if (!res.ok) { setError(data.error || "Failed"); return; }
      setRows(data.enrollments);
    } catch { setError("Network error"); } finally { setLoading(false); setChecking(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pw }),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.error || "Invalid username or password."); setLoading(false); return; }
      setPw("");
      await load();
    } catch { setError("Network error"); setLoading(false); }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    setAuthed(false); setRows([]);
  };

  const setStatus = async (id: string | undefined, status: EnrollmentStatus) => {
    if (!id) return;
    const res = await fetch("/api/admin/enrollments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    if (res.status === 401) { setAuthed(false); return; }
    if (!res.ok) { setError(data.error || "Update failed"); return; }
    setRows(r => r.map(x => (x.id === id ? data.enrollment : x)));
  };

  const shown = useMemo(() => rows.filter(r =>
    (filter === "all" || r.status === filter) &&
    (!q || r.utr.includes(q) || r.phone.includes(q) || r.name.toLowerCase().includes(q.toLowerCase()))
  ), [rows, filter, q]);

  const counts = useMemo(() => ({
    pending: rows.filter(r => r.status === "pending").length,
    approved: rows.filter(r => r.status === "approved").length,
    rejected: rows.filter(r => r.status === "rejected").length,
  }), [rows]);

  if (checking) return <div className="min-h-screen pt-28 text-center text-slate-400">Loading…</div>;

  if (!authed) {
    return (
      <div className="min-h-screen pt-28 px-4 flex justify-center bg-slate-50 dark:bg-slate-950">
        <form onSubmit={login} className="w-full max-w-sm h-fit rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-8 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-lg"><Lock className="w-5 h-5" /> Course enrollments</div>
          <input value={user} onChange={e => setUser(e.target.value)} placeholder="Username" autoComplete="username" className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white" />
          <input type="password" autoComplete="current-password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white" />
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button disabled={loading || !pw || !user} className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold disabled:opacity-50">{loading ? "Checking…" : "Open"}</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">PSC IDO course enrollments</h1>
            <p className="text-sm text-slate-500">Match each UTR against your bank / UPI statement for ₹299, then approve or reject.</p>
          </div>
          <div className="flex gap-2">
          <button onClick={logout} className="px-4 py-2 rounded-xl text-sm font-semibold text-rose-600 hover:underline">Logout</button>
          <button onClick={() => load()} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {(["pending", "approved", "rejected", "all"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${filter === f ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"}`}>
              {f}{f !== "all" ? ` (${counts[f]})` : ` (${rows.length})`}
            </button>
          ))}
          <label className="ml-auto flex items-center gap-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5">
            <Search className="w-4 h-4 text-slate-400" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="UTR, phone or name" className="bg-transparent outline-none text-sm text-slate-900 dark:text-white w-44" />
          </label>
        </div>

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wider text-slate-500 bg-slate-50 dark:bg-slate-800/50">
              <tr><th className="px-4 py-3">Submitted</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">UTR</th><th className="px-4 py-3">₹</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-100">
              {shown.length === 0 && <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400">No enrollments here.</td></tr>}
              {shown.map(r => (
                <tr key={r.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-500">{new Date(r.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</td>
                  <td className="px-4 py-3">{r.name}{r.email ? <div className="text-[11px] text-slate-400">{r.email}</div> : r.user_id ? <div className="text-[11px] text-slate-400">mobile account</div> : null}</td>
                  <td className="px-4 py-3"><a className="hover:underline" href={`https://wa.me/91${r.phone}`} target="_blank" rel="noopener noreferrer">{r.phone}</a></td>
                  <td className="px-4 py-3 font-mono">{r.utr}</td>
                  <td className="px-4 py-3">{r.amount}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[11px] font-bold capitalize ${BADGE[r.status]}`}>{r.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      {r.status !== "approved" && <button onClick={() => setStatus(r.id, "approved")} title="Approve" className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white"><Check className="w-4 h-4" /></button>}
                      {r.status !== "rejected" && <button onClick={() => setStatus(r.id, "rejected")} title="Reject" className="p-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white"><X className="w-4 h-4" /></button>}
                      {r.status !== "pending" && <button onClick={() => setStatus(r.id, "pending")} title="Back to pending" className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700"><RotateCcw className="w-4 h-4" /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
