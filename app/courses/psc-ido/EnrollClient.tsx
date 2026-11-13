"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Copy, Check, Clock, XCircle, Smartphone, ShieldCheck, ArrowLeft, Sparkles } from "lucide-react";
import {
  IDO_COURSE, ENROLL_STORAGE_KEY, Enrollment, UTR_REGEX, PHONE_REGEX,
  normalisePhone, normaliseUtr, upiDeepLink,
} from "@/lib/course";

type Step = "details" | "pay" | "utr" | "done";

function loadEnrollment(): Enrollment | null {
  try {
    const raw = localStorage.getItem(ENROLL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Enrollment) : null;
  } catch { return null; }
}
function saveEnrollment(e: Enrollment) {
  try { localStorage.setItem(ENROLL_STORAGE_KEY, JSON.stringify(e)); } catch { /* private mode */ }
}

const discount = Math.round((1 - IDO_COURSE.offerPrice / IDO_COURSE.regularPrice) * 100);

export default function EnrollClient() {
  const [step, setStep] = useState<Step>("details");
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [utr, setUtr] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Restore a previous enrollment and refresh its status from the server.
  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    const saved = loadEnrollment();
    if (!saved) return;
    setEnrollment(saved);
    setStep("done");
    fetch(`/api/enroll/status?utr=${encodeURIComponent(saved.utr)}&phone=${encodeURIComponent(saved.phone)}`)
      .then(r => r.json())
      .then(d => {
        if (d?.status && d.status !== saved.status) {
          const next = { ...saved, status: d.status, reviewed_at: d.reviewed_at };
          saveEnrollment(next);
          setEnrollment(next);
        }
      })
      .catch(() => {});
  }, []);

  // On phones the steps sit below the course card, so bring them into view.
  useEffect(() => {
    if (step === "pay" || step === "utr") {
      document.getElementById("enroll-steps")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  const copyUpi = async () => {
    try { await navigator.clipboard.writeText(IDO_COURSE.upiId); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };

  const utrClean = normaliseUtr(utr);
  const phoneClean = normalisePhone(phone);
  const formValid = name.trim().length >= 2 && PHONE_REGEX.test(phoneClean) && UTR_REGEX.test(utrClean);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formValid) { setError("Please check your name, 10-digit mobile number and 12-digit UTR."); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: phoneClean, utr: utrClean }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong. Please try again."); return; }
      saveEnrollment(data.enrollment);
      setEnrollment(data.enrollment);
      setStep("done");
      document.getElementById("enroll-steps")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const waText = enrollment
    ? `Hi Study With RootX, I enrolled in the PSC IDO course.%0AName: ${encodeURIComponent(enrollment.name)}%0APhone: ${enrollment.phone}%0AUTR: ${enrollment.utr}%0AAmount: Rs ${enrollment.amount}`
    : "";

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-6">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* ── Course summary ── */}
          <aside className="lg:col-span-2 rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500 via-rose-500 to-fuchsia-600 text-white shadow-xl self-start">
            <div className="p-6 sm:p-8 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[11px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Launch offer • {discount}% off
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-heading leading-tight">{IDO_COURSE.title}</h1>
                <p className="text-white/80 text-sm mt-1">WBPSC Industrial Development Officer • by Study With RootX</p>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-black">₹{IDO_COURSE.offerPrice}</span>
                <span className="text-xl text-white/70 line-through mb-1">₹{IDO_COURSE.regularPrice}</span>
              </div>
              <ul className="space-y-2.5">
                {IDO_COURSE.features.map(f => (
                  <li key={f} className="flex gap-2 text-sm"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
            <div className="px-6 sm:px-8 py-4 bg-black/15 text-xs text-white/80">
              Questions? Call / WhatsApp <a className="font-bold underline" href={`tel:+91${IDO_COURSE.supportPhone}`}>{IDO_COURSE.supportPhone}</a>
            </div>
          </aside>

          {/* ── Steps ── */}
          <section id="enroll-steps" className="scroll-mt-24 lg:col-span-3 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8">
            {step !== "done" && (
              <ol className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider mb-6">
                {(["details", "pay", "utr"] as Step[]).map((s, i) => {
                  const idx = ["details", "pay", "utr"].indexOf(step);
                  const active = i <= idx;
                  return (
                    <li key={s} className="flex items-center gap-2 flex-1">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center ${active ? "bg-rose-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}>{i + 1}</span>
                      <span className={active ? "text-slate-800 dark:text-slate-100" : "text-slate-400"}>{["Course", "Pay", "Confirm"][i]}</span>
                      {i < 2 && <span className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />}
                    </li>
                  );
                })}
              </ol>
            )}

            {step === "details" && (
              <div className="space-y-5">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Enroll in the PSC IDO course</h2>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                  <div className="flex justify-between px-4 py-3"><span className="text-slate-500">Course fee</span><span className="line-through text-slate-500">₹{IDO_COURSE.regularPrice}</span></div>
                  <div className="flex justify-between px-4 py-3"><span className="text-slate-500">Launch discount</span><span className="text-emerald-600 font-semibold">− ₹{IDO_COURSE.regularPrice - IDO_COURSE.offerPrice}</span></div>
                  <div className="flex justify-between px-4 py-3 font-bold text-base"><span className="text-slate-900 dark:text-white">You pay</span><span className="text-rose-600">₹{IDO_COURSE.offerPrice}</span></div>
                </div>
                <button onClick={() => setStep("pay")} className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-extrabold text-base shadow-lg transition-transform hover:scale-[1.01]">
                  Pay ₹{IDO_COURSE.offerPrice} →
                </button>
                <p className="text-xs text-slate-500 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Pay by any UPI app: Google Pay, PhonePe, Paytm, BHIM.</p>
              </div>
            )}

            {step === "pay" && (
              <div className="space-y-5 text-center">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Scan &amp; pay ₹{IDO_COURSE.offerPrice}</h2>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IDO_COURSE.qrImagePath} alt={`UPI QR code for ${IDO_COURSE.payeeName}`} className="mx-auto w-64 sm:w-72 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white" />
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm">
                  <span className="text-slate-500">UPI ID:</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">{IDO_COURSE.upiId}</span>
                  <button onClick={copyUpi} aria-label="Copy UPI ID" className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700">
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                  </button>
                </div>
                <p className="text-xs text-slate-500">Payee name: <b>{IDO_COURSE.payeeName}</b>. Enter exactly ₹{IDO_COURSE.offerPrice}.</p>
                <a href={upiDeepLink()} className={`${isMobile ? "flex" : "hidden"} items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold`}>
                  <Smartphone className="w-4 h-4" /> Pay with UPI app
                </a>
                <button onClick={() => setStep("utr")} className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 text-white font-extrabold shadow-lg">
                  I have paid → Enter UTR
                </button>
                <button onClick={() => setStep("details")} className="text-xs font-semibold text-slate-500 hover:underline">Back</button>
              </div>
            )}

            {step === "utr" && (
              <form onSubmit={submit} className="space-y-4">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Confirm your payment</h2>
                <p className="text-sm text-slate-500">Open your UPI app → the ₹{IDO_COURSE.offerPrice} payment → copy the <b>12-digit UTR / UPI Ref. No.</b></p>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Full name</span>
                  <input value={name} onChange={e => setName(e.target.value)} autoComplete="name" required className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500" />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobile number</span>
                  <input value={phone} onChange={e => setPhone(e.target.value)} inputMode="numeric" autoComplete="tel" placeholder="10-digit number" required className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500" />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">UTR / UPI reference number</span>
                  <input value={utr} onChange={e => setUtr(e.target.value.replace(/[^\d\s]/g, "").slice(0, 14))} inputMode="numeric" placeholder="e.g. 4321 0987 6543" required className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 font-mono tracking-widest text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500" />
                  <span className={`text-xs ${utrClean.length === 0 ? "text-slate-400" : UTR_REGEX.test(utrClean) ? "text-emerald-600" : "text-rose-600"}`}>{utrClean.length}/12 digits</span>
                </label>
                {error && <p className="text-sm text-rose-600 bg-rose-50 dark:bg-rose-950/40 rounded-xl px-4 py-3">{error}</p>}
                <button type="submit" disabled={!formValid || submitting} className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 disabled:opacity-50 text-white font-extrabold shadow-lg">
                  {submitting ? "Submitting…" : "Submit & Enroll"}
                </button>
                <button type="button" onClick={() => setStep("pay")} className="block mx-auto text-xs font-semibold text-slate-500 hover:underline">Show QR again</button>
              </form>
            )}

            {step === "done" && enrollment && (
              <div className="text-center space-y-5">
                {enrollment.status === "rejected" ? (
                  <>
                    <XCircle className="w-16 h-16 mx-auto text-rose-500" />
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Payment could not be verified</h2>
                    <p className="text-sm text-slate-500">We couldn&apos;t find UTR <b className="font-mono">{enrollment.utr}</b> in our account. Please contact us on WhatsApp with your payment screenshot.</p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Enrolled successfully! 🎉</h2>
                    <p className="text-slate-600 dark:text-slate-300">Welcome, <b>{enrollment.name}</b>. You&apos;re enrolled in the {IDO_COURSE.title}.</p>
                    {enrollment.status === "approved" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold"><ShieldCheck className="w-4 h-4" /> Payment verified</span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-bold"><Clock className="w-4 h-4" /> Payment verification in progress (usually within a few hours)</span>
                    )}
                  </>
                )}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 text-sm text-left divide-y divide-slate-200 dark:divide-slate-800">
                  <div className="flex justify-between px-4 py-2.5"><span className="text-slate-500">UTR</span><span className="font-mono">{enrollment.utr}</span></div>
                  <div className="flex justify-between px-4 py-2.5"><span className="text-slate-500">Mobile</span><span>{enrollment.phone}</span></div>
                  <div className="flex justify-between px-4 py-2.5"><span className="text-slate-500">Amount</span><span>₹{enrollment.amount}</span></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Link href="/exams/psc-ido/prepare" className="py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold">Start Preparing →</Link>
                  <a href={`https://wa.me/91${IDO_COURSE.supportPhone}?text=${waText}`} target="_blank" rel="noopener noreferrer" className="py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold">Send details on WhatsApp</a>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
