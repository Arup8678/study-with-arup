"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Smartphone, ArrowRight, ArrowLeft, ShieldCheck, User, Loader2, KeyRound } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { PHONE_LOGIN_ENABLED, safeNext, studentName, studentMobile, useStudent } from "@/lib/studentAuth";
import { PHONE_REGEX, normalisePhone } from "@/lib/course";

type Method = "email" | "phone";
type Step = "start" | "code" | "name";

const inputCls =
  "w-full bg-slate-50 dark:bg-slate-900/60 rounded-xl py-3 pl-10 pr-4 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 text-sm text-slate-800 dark:text-white transition-all focus:ring-2 focus:ring-blue-500/10";
const primaryBtn =
  "w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-sm";

function friendly(msg: string, method: Method): string {
  const m = msg.toLowerCase();
  if (m.includes("rate limit") || m.includes("too many") || m.includes("security purposes"))
    return "Too many attempts. Please wait a minute and try again.";
  if (m.includes("expired") || m.includes("invalid") || m.includes("token"))
    return "That code is wrong or has expired. Please check it or ask for a new code.";
  if (method === "phone" && (m.includes("provider") || m.includes("sms") || m.includes("phone")))
    return "Mobile login is not available right now. Please continue with Gmail.";
  if (m.includes("provider is not enabled")) return "This login option is not switched on yet. Please try another option.";
  return msg || "Something went wrong. Please try again.";
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const { user, loading: sessionLoading, configured } = useStudent();

  const [method, setMethod] = useState<Method>("email");
  const [step, setStep] = useState<Step>("start");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(params.get("error") || "");
  const [info, setInfo] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Already logged in: ask for a name once, otherwise go straight on.
  useEffect(() => {
    if (sessionLoading || !user) return;
    try { localStorage.setItem("exam_bangla_logged_in", "true"); } catch { /* ignore */ }
    window.dispatchEvent(new Event("auth-state-change"));
    if (!studentName(user)) {
      setMobile(studentMobile(user));
      setStep("name");
    } else {
      router.replace(next);
    }
  }, [user, sessionLoading, next, router]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const callbackUrl = () => `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
  const phoneE164 = () => "+91" + normalisePhone(phone);

  const google = async () => {
    if (!supabase) return;
    setError(""); setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl(), queryParams: { prompt: "select_account" } },
    });
    if (error) { setError(friendly(error.message, "email")); setBusy(false); }
    // On success the browser leaves for Google.
  };

  const sendCode = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!supabase) return;
    setError(""); setInfo("");
    if (method === "email" && !/^\S+@\S+\.\S+$/.test(email.trim())) { setError("Please enter a valid email address."); return; }
    if (method === "phone" && !PHONE_REGEX.test(normalisePhone(phone))) { setError("Please enter a valid 10-digit mobile number."); return; }
    setBusy(true);
    const { error } = method === "email"
      ? await supabase.auth.signInWithOtp({ email: email.trim().toLowerCase(), options: { shouldCreateUser: true, emailRedirectTo: callbackUrl() } })
      : await supabase.auth.signInWithOtp({ phone: phoneE164(), options: { shouldCreateUser: true, channel: "sms" } });
    setBusy(false);
    if (error) { setError(friendly(error.message, method)); return; }
    setStep("code"); setCode(""); setCooldown(60);
    setInfo(method === "email"
      ? `We sent a code to ${email.trim()}. Check your inbox (and Spam folder).`
      : `We sent an SMS code to +91 ${normalisePhone(phone)}.`);
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    const token = code.replace(/\D/g, "");
    if (token.length < 6) { setError("Please enter the code we sent you."); return; }
    setError(""); setBusy(true);
    const { error } = method === "email"
      ? await supabase.auth.verifyOtp({ email: email.trim().toLowerCase(), token, type: "email" })
      : await supabase.auth.verifyOtp({ phone: phoneE164(), token, type: "sms" });
    setBusy(false);
    if (error) setError(friendly(error.message, method));
    // On success, the session effect above moves on.
  };

  const saveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    if (name.trim().length < 2) { setError("Please enter your full name."); return; }
    const m = normalisePhone(mobile);
    if (m && !PHONE_REGEX.test(m)) { setError("Please enter a valid 10-digit mobile number, or leave it empty."); return; }
    setError(""); setBusy(true);
    const { error } = await supabase.auth.updateUser({ data: { full_name: name.trim(), ...(m ? { mobile: m } : {}) } });
    setBusy(false);
    if (error) { setError(error.message); return; }
    router.replace(next);
  };

  if (!configured) {
    return (
      <Card title="Student Login" subtitle="Login is being set up. Please check back soon.">
        <p className="text-sm text-slate-500">You can still browse notes and mock tests without an account.</p>
      </Card>
    );
  }

  if (sessionLoading) {
    return <Card title="Student Login" subtitle=""><div className="flex justify-center py-6"><Loader2 className="animate-spin text-blue-600" /></div></Card>;
  }

  if (step === "name") {
    return (
      <Card title="One last step" subtitle="Tell us your name so we can set up your account.">
        <ErrorBox error={error} />
        <form onSubmit={saveName} className="space-y-4">
          <Field label="Full name" icon={<User size={16} />}>
            <input value={name} onChange={e => setName(e.target.value)} autoComplete="name" placeholder="Your full name" className={inputCls} autoFocus required />
          </Field>
          {!user?.phone && (
            <Field label="Mobile number (optional, for course updates)" icon={<Smartphone size={16} />}>
              <input value={mobile} onChange={e => setMobile(e.target.value)} inputMode="numeric" autoComplete="tel" placeholder="10-digit number" className={inputCls} />
            </Field>
          )}
          <button type="submit" disabled={busy} className={primaryBtn}>
            {busy ? <Loader2 size={16} className="animate-spin" /> : <>Continue <ArrowRight size={16} /></>}
          </button>
        </form>
      </Card>
    );
  }

  if (step === "code") {
    return (
      <Card title="Enter your code" subtitle={info}>
        <ErrorBox error={error} />
        <form onSubmit={verify} className="space-y-4">
          <Field label="One-time code" icon={<KeyRound size={16} />}>
            <input
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, "").slice(0, 10))}
              inputMode="numeric" autoComplete="one-time-code" placeholder="6-digit code"
              className={`${inputCls} font-mono tracking-[0.4em] text-center`} autoFocus required
            />
          </Field>
          <button type="submit" disabled={busy} className={primaryBtn}>
            {busy ? <Loader2 size={16} className="animate-spin" /> : <>Verify &amp; continue <ArrowRight size={16} /></>}
          </button>
        </form>
        <div className="flex items-center justify-between text-xs">
          <button onClick={() => { setStep("start"); setError(""); setInfo(""); }} className="flex items-center gap-1 font-semibold text-slate-500 hover:underline">
            <ArrowLeft size={13} /> Change {method === "email" ? "email" : "number"}
          </button>
          <button onClick={() => sendCode()} disabled={cooldown > 0 || busy} className="font-semibold text-blue-600 dark:text-blue-400 disabled:text-slate-400 hover:underline">
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Login or Sign up" subtitle="No password needed. New here? Your account is created automatically.">
      <ErrorBox error={error} />

      <button onClick={google} disabled={busy} className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-semibold flex items-center justify-center gap-3 text-sm transition-all disabled:opacity-50">
        <GoogleIcon /> Continue with Google (Gmail)
      </button>

      <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-slate-400">
        <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" /> or get a code <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/60 text-xs font-bold">
        {(["email", "phone"] as Method[]).map(m => (
          <button key={m} onClick={() => { setMethod(m); setError(""); }}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${method === m ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500"}`}>
            {m === "email" ? <><Mail size={13} /> Email</> : <><Smartphone size={13} /> Mobile</>}
          </button>
        ))}
      </div>

      {method === "phone" && !PHONE_LOGIN_ENABLED ? (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/30 text-sm text-amber-800 dark:text-amber-300">
          Mobile OTP login is coming soon. For now, please use <b>Continue with Google</b> or the <b>Email</b> code.
        </div>
      ) : (
        <form onSubmit={sendCode} className="space-y-4">
          {method === "email" ? (
            <Field label="Email address" icon={<Mail size={16} />}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" placeholder="yourname@gmail.com" className={inputCls} required />
            </Field>
          ) : (
            <Field label="Mobile number" icon={<Smartphone size={16} />}>
              <span className="absolute left-10 top-3 text-sm text-slate-500">+91</span>
              <input value={phone} onChange={e => setPhone(e.target.value.replace(/[^\d\s]/g, "").slice(0, 12))} inputMode="numeric" autoComplete="tel-national" placeholder="10-digit number" className={`${inputCls} pl-[4.25rem]`} required />
            </Field>
          )}
          <button type="submit" disabled={busy} className={primaryBtn}>
            {busy ? <Loader2 size={16} className="animate-spin" /> : <>Send code <ArrowRight size={16} /></>}
          </button>
        </form>
      )}

      <p className="text-[11px] text-slate-400 flex items-start gap-1.5">
        <ShieldCheck size={14} className="flex-shrink-0 text-emerald-500" />
        We only use your email or number to log you in and send course updates.
      </p>
    </Card>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-24 pb-16 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/10 dark:to-transparent">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-6 sm:p-8 rounded-3xl shadow-xl space-y-5 text-left">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20 font-black text-xs">SWA</div>
          <h1 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</span>
      <div className="relative">
        <span className="absolute left-3.5 top-3.5 text-slate-400">{icon}</span>
        {children}
      </div>
    </label>
  );
}

function ErrorBox({ error }: { error: string }) {
  if (!error) return null;
  return (
    <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/30 text-xs font-medium text-red-600 dark:text-red-400">
      {error}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
