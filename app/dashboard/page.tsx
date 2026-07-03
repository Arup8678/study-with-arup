"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  GraduationCap, Award, Flame, Trophy, Trash2, ChevronDown, ChevronUp,
  TrendingUp, BarChart2, BookOpen, Clock, AlertTriangle, CheckCircle2, Bookmark, ExternalLink
} from "lucide-react";
import { dbService } from "@/services/db";
import { UserProfile, QuizQuestion } from "@/types";

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookmarks, setBookmarks] = useState<QuizQuestion[]>([]);
  const [openBookmarkId, setOpenBookmarkId] = useState<string | null>(null);
  const router = useRouter();

  const loadData = () => {
    const logged = localStorage.getItem("exam_bangla_logged_in") === "true";
    setIsLoggedIn(logged);
    if (logged) {
      dbService.getUserProfile().then(p => {
        setProfile(p);
      });
      dbService.getBookmarkedQuestions().then(b => {
        setBookmarks(b);
      });
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener("auth-state-change", loadData);
    return () => window.removeEventListener("auth-state-change", loadData);
  }, []);

  const handleMockLogin = () => {
    localStorage.setItem("exam_bangla_logged_in", "true");
    window.dispatchEvent(new Event("auth-state-change"));
    loadData();
  };

  const handleRemoveBookmark = async (qId: string) => {
    const updated = await dbService.toggleBookmark(qId);
    setBookmarks(bookmarks.filter(b => b.id !== qId));
    if (profile) {
      setProfile({ ...profile, bookmarks: updated });
    }
  };

  // Auth Gate
  if (!isLoggedIn || !profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
          <GraduationCap size={32} />
        </div>
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">Access Your Student Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm leading-relaxed">
          Log in to track your test histories, check subject weaknesses, manage bookmarks, and compare your ranks with students across West Bengal.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all text-sm"
          >
            Go to Login
          </Link>
          <button
            onClick={handleMockLogin}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold transition-all text-sm flex items-center justify-center gap-1.5"
          >
            <span>⚡ Log In with Demo Profile</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
      
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-600/10 to-indigo-600/5 dark:from-blue-900/20 dark:to-transparent p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/30">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
            Namaskar, {profile.username}!
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Here is a report on your competitive exam progress targets today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link 
            href="/profile" 
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all"
          >
            Edit Profile
          </Link>
          <Link 
            href="/subjects" 
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/10 transition-all"
          >
            Practice Next Set
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Streak */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-premium flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/20 text-orange-500 flex items-center justify-center flex-shrink-0 text-xl font-bold">
            🔥
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Daily Streak</span>
            <span className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">{profile.streak} Days</span>
          </div>
        </div>

        {/* XP */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-premium flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
            <GraduationCap size={24} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Total Experience</span>
            <span className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">{profile.xp} XP</span>
          </div>
        </div>

        {/* Coins */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-premium flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-50 dark:bg-yellow-950/20 text-yellow-500 flex items-center justify-center flex-shrink-0 text-xl font-bold">
            🪙
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Practice Coins</span>
            <span className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">{profile.coins} Coins</span>
          </div>
        </div>

        {/* Rank */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-premium flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
            <Trophy size={22} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">State Rank</span>
            <span className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">#{profile.rank}</span>
          </div>
        </div>

      </div>

      {/* Diagnostics: Overall Stats, Strengths & Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Performance Metrics */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-6 rounded-2xl shadow-premium space-y-6">
          <h3 className="font-heading font-bold text-lg text-slate-850 dark:text-white flex items-center gap-2">
            <BarChart2 size={20} className="text-blue-500" />
            Performance Analytics
          </h3>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/50">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Total Tests</span>
              <span className="text-2xl font-bold text-slate-850 dark:text-slate-100">{profile.totalTests}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/50">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Avg Accuracy</span>
              <span className="text-2xl font-bold text-emerald-500">{profile.overallAccuracy}%</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/50">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Avg Score</span>
              <span className="text-2xl font-bold text-blue-500">{profile.averageScore}%</span>
            </div>
          </div>

          {/* Practice History chart outline */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Weekly Streak Active Days</span>
            <div className="flex gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => {
                // Hardcode some mock streak fills
                const isActive = idx < 5;
                return (
                  <div key={idx} className="flex-1 text-center space-y-2">
                    <div className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold ${
                      isActive ? "bg-orange-500 text-white" : "bg-slate-100 dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800"
                    }`}>
                      {isActive ? "🔥" : ""}
                    </div>
                    <span className="text-[10px] text-slate-400 block">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Strong vs Weak Subjects */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-6 rounded-2xl shadow-premium flex flex-col justify-between gap-6">
          
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-850 dark:text-white flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-500" />
              Syllabus Diagnostics
            </h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1.5 mb-1.5">
                  <CheckCircle2 size={14} /> Strong Topics (Keep practicing)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {profile.strongSubjects.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-semibold text-amber-500 flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle size={14} /> Weak Areas (Revise recommended notes)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {profile.weakSubjects.map((w, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/notes"
            className="w-full text-center py-2.5 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all block mt-4"
          >
            Review Recommended Revision Notes
          </Link>
        </div>

      </div>

      {/* Bookmarks Section */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-6 rounded-2xl shadow-premium space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-850 dark:text-white flex items-center gap-2">
          <Bookmark size={20} className="text-amber-500 fill-amber-500" />
          Bookmarked Questions ({bookmarks.length})
        </h3>

        {bookmarks.length === 0 ? (
          <p className="text-sm text-slate-400 py-4 text-center">No questions bookmarked yet. Start practice sets and click the bookmark icon to save questions here!</p>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((q) => {
              const isOpen = openBookmarkId === q.id;
              return (
                <div key={q.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/20 text-left space-y-3 transition-all">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {q.question}
                    </span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => setOpenBookmarkId(isOpen ? null : q.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        aria-label="Toggle details"
                      >
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      <button
                        onClick={() => handleRemoveBookmark(q.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                        aria-label="Remove bookmark"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800 text-xs space-y-3 animate-in fade-in slide-in-from-top-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-medium">
                        {q.options.map((opt, oIdx) => {
                          const isCorrect = oIdx === q.correctAnswerIndex;
                          return (
                            <div key={oIdx} className={`p-2 rounded-lg border ${
                              isCorrect ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400" : "border-slate-200 dark:border-slate-700 text-slate-500"
                            }`}>
                              {opt} {isCorrect ? "✓" : ""}
                            </div>
                          );
                        })}
                      </div>
                      <div className="p-3 rounded-lg bg-blue-500/5 text-slate-500 leading-relaxed border-l-4 border-blue-500">
                        <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Explanation:</span>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* History logs */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-6 rounded-2xl shadow-premium space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-850 dark:text-white flex items-center gap-2">
          <Clock size={20} className="text-blue-500" />
          Practice History Log
        </h3>

        {profile.history.length === 0 ? (
          <p className="text-sm text-slate-400 py-4 text-center">No tests recorded yet. Click on Daily Quiz or Mock Tests to start practicing!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Test Title</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Time Spent</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-350">
                {profile.history.map((hist) => (
                  <tr key={hist.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">{hist.title}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        hist.type === "quiz" ? "bg-amber-500/10 text-amber-500" : "bg-purple-500/10 text-purple-500"
                      }`}>
                        {hist.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">{hist.score} / {hist.totalQuestions}</td>
                    <td className={`py-3.5 px-4 font-bold ${hist.accuracy >= 75 ? "text-green-500" : "text-amber-500"}`}>
                      {hist.accuracy}%
                    </td>
                    <td className="py-3.5 px-4">
                      {Math.floor(hist.timeSpentSeconds / 60)}m {hist.timeSpentSeconds % 60}s
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">{hist.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
