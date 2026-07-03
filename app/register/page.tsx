"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Mail, Lock, User, ArrowRight, CheckCircle2, Award } from "lucide-react";
import { dbService } from "@/services/db";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [targetExam, setTargetExam] = useState("wbcs");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("exam_bangla_logged_in") === "true") {
      router.push("/dashboard");
    }
  }, [router]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !email || !password) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    setTimeout(async () => {
      // Mock registration: updates username in local storage profile
      const defaultProfile = await dbService.getUserProfile();
      const updatedProfile = {
        ...defaultProfile,
        username: username,
        email: email,
        xp: 100, // starting bonus
        coins: 10,
        history: [],
        streakCalendar: [new Date().toISOString().split("T")[0]]
      };
      
      localStorage.setItem("exam_bangla_user_profile", JSON.stringify(updatedProfile));
      localStorage.setItem("exam_bangla_logged_in", "true");
      
      // Dispatch auth change
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
      
      {/* Glow */}
      <div className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-8 rounded-3xl shadow-xl space-y-6 text-left relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20">
            <BookOpen size={24} />
          </div>
          <h1 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">Create Account</h1>
          <p className="text-xs text-slate-400">Join Exam Bangla and start practicing immediately</p>
        </div>

        {/* Notices */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/30 text-xs font-medium text-red-600 dark:text-red-400">
            ⚠ {error}
          </div>
        )}
        {success && (
          <div className="p-3.5 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/30 text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
            <CheckCircle2 size={16} /> Account created! Accessing dashboard...
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Prasenjit Sen"
                className="w-full bg-slate-50 dark:bg-slate-900/60 rounded-xl py-3 pl-10 pr-4 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 text-sm text-slate-800 dark:text-white transition-all focus:ring-2 focus:ring-blue-500/10"
                required
              />
            </div>
          </div>

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
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Target Competitive Exam</label>
            <div className="relative">
              <Award className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/60 rounded-xl py-3 pl-10 pr-4 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 text-sm text-slate-800 dark:text-white transition-all focus:ring-2 focus:ring-blue-500/10 appearance-none"
              >
                <option value="wbcs">WBCS (Civil Service)</option>
                <option value="food-si">WBPSC Food SI</option>
                <option value="wb-police">WB Police Constable/SI</option>
                <option value="kp-police">Kolkata Police Constable</option>
                <option value="clerkship">WBPSC Clerkship</option>
                <option value="rrb-ntpc">Railway NTPC</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                ▾
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Password</label>
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

          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 group text-sm"
          >
            {loading ? "Creating Account..." : "Register"}
            {!loading && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
          </button>
        </form>

        {/* Switch to Login */}
        <p className="text-center text-xs text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}
