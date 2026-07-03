"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  User, Award, Settings, ShieldAlert, Sparkles, CheckCircle2,
  Trash2, Mail, Flame, Trophy, Coins
} from "lucide-react";
import { dbService } from "@/services/db";
import { UserProfile } from "@/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = () => {
      const logged = localStorage.getItem("exam_bangla_logged_in") === "true";
      if (!logged) {
        router.push("/login");
      } else {
        dbService.getUserProfile().then(p => {
          setProfile(p);
          setUsername(p.username);
          setEmail(p.email);
        });
      }
    };
    checkLogin();
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    if (!username.trim()) {
      setLoading(false);
      return;
    }

    const updated = await dbService.updateUsername(username);
    setProfile(updated);
    // Fire event to notify Header
    window.dispatchEvent(new Event("auth-state-change"));
    setSuccess("Profile settings updated successfully!");
    setLoading(false);
    setTimeout(() => setSuccess(""), 4000);
  };

  const handleResetProfile = () => {
    if (confirm("Are you sure you want to reset all your learning history, XP, coins, and streaks? This cannot be undone.")) {
      localStorage.removeItem("exam_bangla_user_profile");
      localStorage.removeItem("exam_bangla_logged_in");
      window.dispatchEvent(new Event("auth-state-change"));
      router.push("/");
    }
  };

  if (!profile) return null;

  // Custom Achievements checker
  const achievements = [
    { id: "streak-3", title: "Daily Crusader", desc: "Unlock a 3-day consecutive study streak", check: profile.streak >= 3, icon: "🔥" },
    { id: "xp-100", title: "Rising Star", desc: "Gain your first 100 Experience Points", check: profile.xp >= 100, icon: "⭐" },
    { id: "xp-1000", title: "Subject Elite", desc: "Collect over 1,000 total Study XP", check: profile.xp >= 1000, icon: "👑" },
    { id: "test-5", title: "Quiz Master", desc: "Complete 5 or more practice sets / quizzes", check: profile.totalTests >= 5, icon: "🧠" },
    { id: "accuracy-90", title: "Sharp Shooter", desc: "Achieve over 90% accuracy in any test set", check: profile.history.some(h => h.accuracy >= 90), icon: "🎯" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10 text-left">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
          <Settings size={28} className="text-blue-500" />
          Profile Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">Manage your student profile, view study badges and configure metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Form: Edit credentials */}
        <div className="md:col-span-7 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-6 rounded-2xl shadow-premium space-y-6">
          <h2 className="font-heading font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
            <User size={18} className="text-blue-500" />
            General Information
          </h2>

          {success && (
            <div className="p-3.5 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/30 text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> {success}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900/60 rounded-xl py-3 pl-10 pr-4 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 text-sm text-slate-800 dark:text-white transition-all focus:ring-2 focus:ring-blue-500/10"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Email Address (Read Only)</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full bg-slate-100 dark:bg-slate-900/40 rounded-xl py-3 pl-10 pr-4 border border-slate-200 dark:border-slate-700/40 text-sm text-slate-400 transition-all cursor-not-allowed"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all text-xs"
            >
              {loading ? "Saving Changes..." : "Save Profile Settings"}
            </button>
          </form>

          {/* Reset profile warning zone */}
          <div className="border-t border-slate-100 dark:border-slate-700/60 pt-6 space-y-3">
            <h3 className="text-sm font-bold text-red-500 flex items-center gap-1.5">
              <ShieldAlert size={16} /> Danger Zone
            </h3>
            <p className="text-xs text-slate-400">
              Resetting deletes all local study caches, reset streaking calendars, history files and coins. You will be logged out.
            </p>
            <button
              onClick={handleResetProfile}
              className="px-4 py-2.5 rounded-xl border border-red-200 hover:bg-red-500 hover:text-white text-red-500 dark:border-red-950/40 dark:hover:bg-red-950/20 transition-all text-xs font-semibold flex items-center gap-1.5"
            >
              <Trash2 size={14} />
              Reset Local Profile Data
            </button>
          </div>
        </div>

        {/* Right column: Achievements & unlocked badges */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Metrics summary */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-6 rounded-2xl shadow-premium space-y-4">
            <h2 className="font-heading font-bold text-base text-slate-850 dark:text-white">Rewards Vault</h2>
            
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl">
                <span className="text-[9px] text-slate-400 block font-semibold">Streak</span>
                <span className="text-sm font-bold text-orange-500 flex items-center justify-center gap-0.5 mt-0.5">
                  🔥 {profile.streak}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl">
                <span className="text-[9px] text-slate-400 block font-semibold">Total XP</span>
                <span className="text-sm font-bold text-blue-500 flex items-center justify-center gap-0.5 mt-0.5">
                  ⭐ {profile.xp}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl">
                <span className="text-[9px] text-slate-400 block font-semibold">Coins</span>
                <span className="text-sm font-bold text-amber-500 flex items-center justify-center gap-0.5 mt-0.5">
                  🪙 {profile.coins}
                </span>
              </div>
            </div>
          </div>

          {/* Badges list */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-6 rounded-2xl shadow-premium space-y-4">
            <h2 className="font-heading font-bold text-base text-slate-850 dark:text-white flex items-center gap-1.5">
              <Award size={18} className="text-indigo-500" />
              Unlocked Badges ({achievements.filter(a => a.check).length})
            </h2>

            <div className="space-y-3">
              {achievements.map((ach) => (
                <div 
                  key={ach.id} 
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                    ach.check 
                      ? "bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 border-indigo-500/10 text-slate-800 dark:text-slate-200" 
                      : "bg-slate-50/50 border-slate-100 dark:bg-slate-900/10 dark:border-slate-800 text-slate-400 opacity-60"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm text-lg flex-shrink-0">
                    {ach.icon}
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold block">{ach.title}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 leading-relaxed">{ach.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
