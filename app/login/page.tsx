"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Redirect if already logged in
    if (localStorage.getItem("exam_bangla_logged_in") === "true") {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Mock Login action
    setTimeout(() => {
      localStorage.setItem("exam_bangla_logged_in", "true");
      // Fire event to notify header component
      window.dispatchEvent(new Event("auth-state-change"));
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }, 1200);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/10 dark:to-transparent">
      
      {/* Glows */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-md bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-8 rounded-3xl shadow-xl space-y-6 text-left relative z-10">
        
        {/* Top Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20">
            <BookOpen size={24} />
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="text-xs text-slate-400">Enter your credentials to access your exam mock tests</p>
        </div>

        {/* Status updates */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/30 text-xs font-medium text-red-600 dark:text-red-400">
            ⚠ {error}
          </div>
        )}
        {success && (
          <div className="p-3.5 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/30 text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
            <CheckCircle2 size={16} /> Logged in successfully! Redirecting...
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@exambangla.in"
                className="w-full bg-slate-50 dark:bg-slate-900/60 rounded-xl py-3 pl-10 pr-4 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 text-sm text-slate-800 dark:text-white transition-all focus:ring-2 focus:ring-blue-500/10"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Password</label>
              <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-slate-900/60 rounded-xl py-3 pl-10 pr-4 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 text-sm text-slate-800 dark:text-white transition-all focus:ring-2 focus:ring-blue-500/10"
                required
              />
            </div>
          </div>

          {/* Quick Mock Auto-fill Alert */}
          <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-800/20 flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Sparkles size={12} className="animate-spin" />
              Use any values to login in Mock Mode
            </span>
            <button 
              type="button" 
              onClick={() => {
                setEmail("student@exambangla.in");
                setPassword("password123");
              }}
              className="text-blue-700 dark:text-blue-300 underline font-bold"
            >
              Autofill
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 group text-sm"
          >
            {loading ? "Logging in..." : "Log In"}
            {!loading && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
          </button>
        </form>

        {/* Switch to Register */}
        <p className="text-center text-xs text-slate-400">
          New to Exam Bangla?{" "}
          <Link href="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Create an Account
          </Link>
        </p>

      </div>
    </div>
  );
}
