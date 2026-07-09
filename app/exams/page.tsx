"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, ChevronRight, ExternalLink, Search } from "lucide-react";
import { dbService } from "@/services/db";
import { Exam } from "@/types";

const EXAM_GRADIENTS: Record<string, string> = {
  "wbp-constable":  "from-blue-500/10 to-indigo-500/10",
  "ssc-gd":         "from-emerald-500/10 to-green-500/10",
  "agniveer-army":  "from-amber-500/10 to-orange-500/10",
  "wb-panchayat":   "from-purple-500/10 to-violet-500/10",
  "psc-miscellaneous": "from-rose-500/10 to-pink-500/10",
};

const EXAM_ICONS: Record<string, string> = {
  "wbp-constable":  "🛡️",
  "ssc-gd":         "⭐",
  "agniveer-army":  "🪖",
  "wb-panchayat":   "🏛️",
  "psc-miscellaneous": "💼",
};

const EXAM_BADGE: Record<string, { label: string; color: string }> = {
  "wbp-constable":  { label: "State Police",   color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  "ssc-gd":         { label: "Central Govt",   color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  "agniveer-army":  { label: "Indian Army",    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  "wb-panchayat":   { label: "State Panchayat", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
  "psc-miscellaneous": { label: "State PSC",   color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" },
};

const CATEGORIES = [
  { label: "All Exams", value: "all" },
  { label: "State Exams (WB)", value: "state" },
  { label: "Central Exams", value: "central" },
];

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    dbService.getExams().then(setExams);
  }, []);

  const filtered = exams.filter(exam => {
    const matchSearch = !search.trim() ||
      exam.name.toLowerCase().includes(search.toLowerCase()) ||
      exam.description.toLowerCase().includes(search.toLowerCase());

    const matchCat =
      category === "all" ||
      (category === "state"   && (exam.id === "wbp-constable" || exam.id === "wb-panchayat" || exam.id === "psc-miscellaneous")) ||
      (category === "central" && (exam.id === "ssc-gd" || exam.id === "agniveer-army"));

    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
          <Shield size={28} className="text-blue-500" /> Choose Your Exam
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">
          Select the exam you are preparing for. You will get the syllabus, recent news, previous year questions, and topic-wise study notes.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={15} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search exams..."
            className="w-full bg-white dark:bg-slate-800 rounded-xl py-2.5 pl-10 pr-4 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 text-sm text-slate-800 dark:text-white transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                category === cat.value
                  ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exam Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
          No exams match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filtered.map(exam => {
            const icon = EXAM_ICONS[exam.id] || "🎓";
            const gradient = EXAM_GRADIENTS[exam.id] || "from-blue-500/10 to-indigo-500/10";
            const badge = EXAM_BADGE[exam.id];
            return (
              <div
                key={exam.id}
                className={`group relative rounded-2xl bg-gradient-to-br ${gradient} border border-slate-200/80 dark:border-slate-700/60 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between gap-5 overflow-hidden`}
              >
                {/* BG Decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10 text-6xl flex items-center justify-center pointer-events-none select-none">
                  {icon}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/80 dark:bg-slate-800/60 flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
                      {icon}
                    </div>
                    {badge && (
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${badge.color}`}>
                        {badge.label}
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white text-base leading-snug">{exam.name}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{exam.description}</p>
                  </div>

                  {/* Exam quick stats */}
                  {exam.examPattern && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        `${exam.examPattern.totalQuestions} Qs`,
                        `${exam.examPattern.totalMarks} Marks`,
                        `${exam.examPattern.durationMinutes} Min`,
                      ].map(stat => (
                        <span key={stat} className="px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-800/60 text-[10px] font-bold text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/40">
                          {stat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/exams/${exam.id}`}
                    className="flex-grow flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all shadow-sm group/btn"
                  >
                    Open Exam Hub
                    <ChevronRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                  {exam.officialLink && (
                    <a
                      href={exam.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Official website"
                      className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/60 transition-all"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
