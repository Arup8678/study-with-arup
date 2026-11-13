"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Clock, XCircle, LogOut, Loader2, Mail, Smartphone, BookOpen, Pencil, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { IDO_COURSE, STATUS_LABEL, Enrollment } from "@/lib/course";
import { authFetch, signOutStudent, studentLabel, studentMobile, studentName, useStudent } from "@/lib/studentAuth";

export default function MyCoursePage() {
  const router = useRouter();
  const { user, loading } = useStudent();
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [fetching, setFetching] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/login?next=/my-course"); return; }
    setName(studentName(user));
    authFetch("/api/me/enrollment", { cache: "no-store" })
      .then(r => r.json())
      .then(d => setEnrollment(d?.enrollment ?? null))
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [user, loading, router]);

  const saveName = async () => {
    if (!supabase || name.trim().length < 2) return;
    await supabase.auth.updateUser({ data: { full_name: name.trim() } });
    setEditing(false);
  };

  const logout = async () => {
    await signOutStudent();
    router.replace("/");
  };

  if (loading || !user) {
    return <div className="min-h-[70vh] flex items-center justify-center pt-24"><Loader2 className="animate-spin text-blue-600" /></div>;
  }

  const mobile = studentMobile(user);
  const status = enrollment?.status;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Account */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-black flex-shrink-0">
            {studentLabel(user).charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            {editing ? (
              <div className="flex gap-2">
                <input value={name} onChange={e => setName(e.target.value)} className="flex-1 min-w-0 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-slate-900 dark:text-white" autoFocus />
                <button onClick={saveName} aria-label="Save name" className="px-3 rounded-lg bg-blue-600 text-white"><Check size={16} /></button>
              </div>
            ) : (
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2 truncate">
                {studentName(user) || "Student"}
                <button onClick={() => setEditing(true)} aria-label="Edit name" className="text-slate-400 hover:text-slate-600"><Pencil size={14} /></button>
              </h1>
            )}
            {user.email && <p className="text-sm text-slate-500 flex items-center gap-1.5 truncate"><Mail size={13} /> {user.email}</p>}
            {mobile && <p className="text-sm text-slate-500 flex items-center gap-1.5"><Smartphone size={13} /> +91 {mobile}</p>}
          </div>
          <button onClick={logout} className="self-start sm:self-center flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
            <LogOut size={14} /> Log out
          </button>
        </section>

        {/* Course */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 text-white">
            <p className="text-[11px] font-bold tracking-widest uppercase text-white/80">My course</p>
            <h2 className="text-xl sm:text-2xl font-extrabold font-heading">{IDO_COURSE.title}</h2>
          </div>
          <div className="p-6 space-y-4">
            {fetching ? (
              <div className="flex justify-center py-4"><Loader2 className="animate-spin text-slate-400" /></div>
            ) : !enrollment ? (
              <>
                <p className="text-slate-600 dark:text-slate-300">You haven&apos;t enrolled yet. Get the full course for just <b>₹{IDO_COURSE.offerPrice}</b> <span className="line-through text-slate-400">₹{IDO_COURSE.regularPrice}</span>.</p>
                <Link href="/courses/psc-ido" className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 text-white font-extrabold">Enroll now →</Link>
                <p className="text-xs text-slate-400">Already paid before creating this account? Open the enroll page on the same phone you paid from and we&apos;ll link it automatically, or WhatsApp us your UTR on {IDO_COURSE.supportPhone}.</p>
              </>
            ) : (
              <>
                <div className={`flex items-center gap-3 p-4 rounded-2xl ${status === "approved" ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300" : status === "rejected" ? "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300" : "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300"}`}>
                  {status === "approved" ? <CheckCircle2 className="w-7 h-7 flex-shrink-0" /> : status === "rejected" ? <XCircle className="w-7 h-7 flex-shrink-0" /> : <Clock className="w-7 h-7 flex-shrink-0" />}
                  <div>
                    <p className="font-extrabold">{STATUS_LABEL[enrollment.status]}</p>
                    <p className="text-xs opacity-80">
                      {status === "approved" ? "Your payment is confirmed. Full course access is open."
                        : status === "rejected" ? "We couldn't match your UTR. Please WhatsApp us your payment screenshot."
                        : "We are checking your payment. This usually takes a few hours."}
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 text-sm divide-y divide-slate-200 dark:divide-slate-800">
                  <div className="flex justify-between px-4 py-2.5"><span className="text-slate-500">UTR</span><span className="font-mono">{enrollment.utr}</span></div>
                  <div className="flex justify-between px-4 py-2.5"><span className="text-slate-500">Amount</span><span>₹{enrollment.amount}</span></div>
                  <div className="flex justify-between px-4 py-2.5"><span className="text-slate-500">Enrolled on</span><span>{new Date(enrollment.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}</span></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Link href="/exams/psc-ido/prepare" className="py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-center flex items-center justify-center gap-2"><BookOpen size={16} /> Start Preparing</Link>
                  <a href={`https://wa.me/91${IDO_COURSE.supportPhone}?text=${encodeURIComponent(`Hi Study With RootX, my PSC IDO enrollment UTR is ${enrollment.utr}.`)}`} target="_blank" rel="noopener noreferrer" className="py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-center">WhatsApp support</a>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
