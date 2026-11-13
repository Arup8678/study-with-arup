"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Smartphone, ArrowRight, ArrowLeft, ShieldCheck, User, Loader2, Lock, Eye, EyeOff, AtSign } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { mobileToEmail, safeNext, studentName, studentMobile, useStudent } from "@/lib/studentAuth";
import { IDO_COURSE, PHONE_REGEX, normalisePhone } from "@/lib/course";

type Mode = "login" | "signup" | "forgot" | "name";

const inputCls =
  "w-full bg-slate-50 dark:bg-slate-900/60 rounded-xl py-3 pl-10 pr-4 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 text-sm text-slate-800 dark:text-white transition-all focus:ring-2 focus:ring-blue-500/10";
const primaryBtn =
  "w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-sm";

/** "9876543210", "+91 98765 43210" -> mobile; anything with "@" -> email. */
function parseId(raw: string): { kind: "mobile"; mobile: string; email: string } | { kind: "email"; email: string } | null {
  const v = raw.trim();
  if (v.includes("@")) return /^\S+@\S+\.\S+$/.test(v) ? { kind: "email", email: v.toLowerCase() } : null;
  const m = normalisePhone(v);
  return PHONE_REGEX.test(m) ? { kind: "mobile", mobile: m, email: mobileToEmail(m) } : null;
}

function friendly(msg: string): string {
  const m = (msg || "").toLowerCase();
  if (m.includes("invalid login credentials")) return "Wrong mobile number / email or password. New here? Tap \"Create account\".";
  if (m.includes("already registered") || m.includes("already exists")) return "An account with this mobile number / email already exists. Please log in.";
  if (m.includes("email not confirmed")) return "Your account is not active yet. Please contact us on WhatsApp.";
  if (m.includes("password") && (m.includes("6") || m.includes("short") || m.includes("weak"))) return "Password must be at least 6 characters.";
  if (m.includes("rate limit") || m.includes("too many") || m.includes("security purposes")) return "Too many attempts. Please wait a minute and try again.";
  if (m.includes("signups not allowed") || m.includes("signup is disabled")) return "New accounts are switched off right now. Please contact us.";
  if (m.includes("provider is not enabled")) return "This login option is not switched on yet. Please use mobile number or email.";
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

  const [mode, setMode] = useState<Mode>(params.get("mode") === "signup" ? "signup" : "login");
  const [ident, setIdent] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(params.get("error") || "");
  const [info, setInfo] = useState("");

  // Logged in: ask for a name once (Google accounts usually have one), then continue.
  useEffect(() => {
    if (sessionLoading || !user) return;
    try { localStorage.setItem("exam_bangla_logged_in", "true"); } catch { /* ignore */ }
    window.dispatchEvent(new Event("auth-state-change"));
    if (!studentName(user)) {
      setMobile(studentMobile(user));
      setMode("name");
    } else {
      router.replace(next);
    }
  }, [user, sessionLoading, next, router]);

  const switchMode = (m: Mode) => { setMode(m); setError(""); setInfo(""); };

  const google = async () => {
    if (!supabase) return;
    setError(""); setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) { setError(friendly(error.message)); setBusy(false); }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    const id = parseId(ident);
    if (!id) { setError("Enter your 10-digit mobile number or your email address."); return; }
    if (!password) { setError("Please enter your password."); return; }
    setError(""); setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: id.email, password });
    setBusy(false);
    if (error) setError(friendly(error.message));
  };

  const signup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    const id = parseId(ident);
    if (name.trim().length < 2) { setError("Please enter your full name."); return; }
    if (!id) { setError("Enter your 10-digit mobile number or your email address."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setError(""); setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: id.email,
      password,
      options: { data: { full_name: name.trim(), ...(id.kind === "mobile" ? { mobile: id.mobile } : {}) } },
    });
    if (error) { setBusy(false); setError(friendly(error.message)); return; }
    if (!data.session) {
      // Existing account (Supabase hides this) or email confirmation still switched on.
      if (data.user && (data.user.identities?.length ?? 0) === 0) {
        setBusy(false); setError(friendly("already registered")); return;
      }
      const { error: e2 } = await supabase.auth.signInWithPassword({ email: id.email, password });
      setBusy(false);
      if (e2) setError(friendly(e2.message));
      return;
    }
    setBusy(false);
    // Session set: the effect above takes them on.
  };

  const forgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    const id = parseId(ident);
    if (!id) { setError("Enter your 10-digit mobile number or your email address."); return; }
    setError(""); setInfo("");
    if (id.kind === "mobile") {
      setInfo("mobile");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(id.email, { redirectTo: `${window.location.origin}/reset-password` });
    setBusy(false);
    if (error) { setError(friendly(error.message)); return; }
    setInfo("email");
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

  if (mode === "name") {
    return (
      <Card title="One last step" subtitle="Tell us your name so we can set up your account.">
        <ErrorBox error={error} />
        <form onSubmit={saveName} className="space-y-4">
          <Field label="Full name" icon={<User size={16} />}>
            <input value={name} onChange={e => setName(e.target.value)} autoComplete="name" placeholder="Your full name" className={inputCls} autoFocus required />
          </Field>
          <Field label="Mobile number (optional, for course updates)" icon={<Smartphone size={16} />}>
            <input value={mobile} onChange={e => setMobile(e.target.value)} inputMode="numeric" autoComplete="tel" placeholder="10-digit number" className={inputCls} />
          </Field>
          <button type="submit" disabled={busy} className={primaryBtn}>
            {busy ? <Loader2 size={16} className="animate-spin" /> : <>Continue <ArrowRight size={16} /></>}
          </button>
        </form>
      </Card>
    );
  }

  if (mode === "forgot") {
    return (
      <Card title="Forgot password?" subtitle="Enter the mobile number or email you signed up with.">
        <ErrorBox error={error} />
        {info === "email" ? (
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 text-sm text-green-700 dark:text-green-300">
            We emailed you a link to set a new password. Check your inbox (and Spam folder).
          </div>
        ) : info === "mobile" ? (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-sm text-amber-800 dark:text-amber-300 space-y-3">
            <p>For mobile number accounts, we reset the password for you. Send us a WhatsApp message from your registered number.</p>
            <a href={`https://wa.me/91${IDO_COURSE.supportPhone}?text=${encodeURIComponent(`Hi Study With RootX, please reset my password. My registered mobile number is ${normalisePhone(ident)}.`)}`} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold">WhatsApp {IDO_COURSE.supportPhone}</a>
          </div>
        ) : (
          <form onSubmit={forgot} className="space-y-4">
            <IdField value={ident} onChange={setIdent} />
            <button type="submit" disabled={busy} className={primaryBtn}>
              {busy ? <Loader2 size={16} className="animate-spin" /> : <>Continue <ArrowRight size={16} /></>}
            </button>
          </form>
        )}
        <button onClick={() => switchMode("login")} className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:underline">
          <ArrowLeft size={13} /> Back to login
        </button>
      </Card>
    );
  }

  const isSignup = mode === "signup";
  return (
    <Card title={isSignup ? "Create your account" : "Student Login"} subtitle={isSignup ? "Sign up with your mobile number or email and choose a password." : "Log in with your mobile number or email and password."}>
      <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/60 text-xs font-bold">
        {(["login", "signup"] as Mode[]).map(m => (
          <button key={m} onClick={() => switchMode(m)}
            className={`py-2 rounded-lg transition-all ${mode === m ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500"}`}>
            {m === "login" ? "Log in" : "Create account"}
          </button>
        ))}
      </div>

      <ErrorBox error={error} />

      <form onSubmit={isSignup ? signup : login} className="space-y-4">
        {isSignup && (
          <Field label="Full name" icon={<User size={16} />}>
            <input value={name} onChange={e => setName(e.target.value)} autoComplete="name" placeholder="Your full name" className={inputCls} required />
          </Field>
        )}
        <IdField value={ident} onChange={setIdent} />
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{isSignup ? "Choose a password (min 6 characters)" : "Password"}</span>
            {!isSignup && (
              <button type="button" onClick={() => switchMode("forgot")} className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</button>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
            <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
              autoComplete={isSignup ? "new-password" : "current-password"} placeholder="••••••••" className={`${inputCls} pr-11`} required />
            <button type="button" onClick={() => setShowPw(s => !s)} aria-label={showPw ? "Hide password" : "Show password"} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <button type="submit" disabled={busy} className={primaryBtn}>
          {busy ? <Loader2 size={16} className="animate-spin" /> : <>{isSignup ? "Create account" : "Log in"} <ArrowRight size={16} /></>}
        </button>
      </form>

      <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-slate-400">
        <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" /> or <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
      </div>

      <button onClick={google} disabled={busy} className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-semibold flex items-center justify-center gap-3 text-sm transition-all disabled:opacity-50">
        <GoogleIcon /> Continue with Google (Gmail)
      </button>

      <p className="text-center text-xs text-slate-500">
        {isSignup ? "Already have an account? " : "New to Study With RootX? "}
        <button onClick={() => switchMode(isSignup ? "login" : "signup")} className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          {isSignup ? "Log in" : "Create an account"}
        </button>
      </p>
      <p className="text-[11px] text-slate-400 flex items-start gap-1.5">
        <ShieldCheck size={14} className="flex-shrink-0 text-emerald-500" />
        We only use your number or email for your account and course updates. <Link href="/privacy" className="underline">Privacy</Link>
      </p>
    </Card>
  );
}

function IdField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Field label="Mobile number or email" icon={value.includes("@") ? <AtSign size={16} /> : <Smartphone size={16} />}>
      <input value={value} onChange={e => onChange(e.target.value)} autoComplete="username" autoCapitalize="none" spellCheck={false}
        placeholder="10-digit mobile or yourname@gmail.com" className={inputCls} required />
    </Field>
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
