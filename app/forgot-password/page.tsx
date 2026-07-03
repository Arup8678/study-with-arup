"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-950/10 dark:to-transparent">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-8 rounded-3xl shadow-xl space-y-6 text-left relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20">
            <BookOpen size={24} />
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">Recover Password</h1>
          <p className="text-xs text-slate-400">We will send you a link to reset your account credentials</p>
        </div>

        {/* Success */}
        {success ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/30 text-sm text-green-600 dark:text-green-400 flex items-start gap-2">
              <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Reset Link Sent!</span>
                Check your inbox for a password reset email. Follow the instructions to recover your account.
              </div>
            </div>
            <Link
              href="/login"
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-650 dark:text-slate-200 font-semibold transition-all flex items-center justify-center text-sm"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 group text-sm"
            >
              {loading ? "Sending link..." : "Send Reset Link"}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
            </button>
            
            <p className="text-center text-xs text-slate-400">
              <Link href="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Back to Login
              </Link>
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
