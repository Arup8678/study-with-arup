"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, ChevronRight } from "lucide-react";
import { dbService } from "@/services/db";
import { Exam } from "@/types";

const EXAM_GRADIENTS: Record<string, string> = {
  "wbp-constable":  "from-blue-600 to-indigo-700",
  "ssc-gd":         "from-emerald-600 to-teal-700",
  "agniveer-army":  "from-amber-600 to-orange-700",
  "wb-panchayat":   "from-purple-600 to-violet-700",
  "psc-miscellaneous": "from-rose-600 to-pink-700",
};

const OPTIONS = [
  {
    id: "syllabus",
    label: "Syllabus",
    sublabel: "Exam pattern, subjects & marks",
    emoji: "📋",
    bg: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10",
    border: "border-blue-200/60 dark:border-blue-800/30",
    iconBg: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
    href: (id: string) => `/exams/${id}/syllabus`,
  },
  {
    id: "news",
    label: "Current News",
    sublabel: "Notifications & official updates",
    emoji: "📰",
    bg: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/10",
    border: "border-emerald-200/60 dark:border-emerald-800/30",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400",
    href: (id: string) => `/exams/${id}/news`,
  },
  {
    id: "pyq",
    label: "Previous Year Questions",
    sublabel: "Year-wise PYQs with answers",
    emoji: "📝",
    bg: "from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/10",
    border: "border-amber-200/60 dark:border-amber-800/30",
    iconBg: "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400",
    href: (id: string) => `/exams/${id}/pyq`,
  },
  {
    id: "prepare",
    label: "Let's Start Preparation",
    sublabel: "Topic-wise notes & practice tests",
    emoji: "🚀",
    bg: "from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/10",
    border: "border-violet-200/60 dark:border-violet-800/30",
    iconBg: "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400",
    href: (id: string) => `/exams/${id}/prepare`,
    highlight: true,
  },
];

export default function ExamDetailPage({ params }: { params: { id: string } }) {
  const examId = params?.id;
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!examId) return;
    dbService.getExamById(examId).then(data => {
      if (!data) { router.push("/exams"); return; }
      setExam(data);
      setLoading(false);
    });
  }, [examId, router]);

  if (loading || !exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const gradient = EXAM_GRADIENTS[examId] || "from-blue-600 to-indigo-700";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">

        {/* Back */}
        <Link href="/exams" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          ← All Exams
        </Link>

        {/* Exam Header */}
        <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${gradient} p-7 text-white shadow-xl`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
          <div className="relative space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl font-extrabold font-heading leading-tight">{exam.name}</h1>
                <p className="text-white/70 text-sm mt-1.5 max-w-md">{exam.description}</p>
              </div>
              {exam.officialLink && (
                <a
                  href={exam.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-semibold transition-all border border-white/20"
                >
                  <ExternalLink size={12} /> Official Site
                </a>
              )}
            </div>

            {/* Quick Stats */}
            {exam.examPattern && (
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { v: exam.examPattern.totalQuestions, l: "Questions" },
                  { v: exam.examPattern.totalMarks,     l: "Marks" },
                  { v: `${exam.examPattern.durationMinutes} min`, l: "Duration" },
                  { v: exam.examPattern.negativeMarking > 0 ? `-${exam.examPattern.negativeMarking}` : "None", l: "Negative Marking" },
                ].map(s => (
                  <div key={s.l} className="bg-white/15 border border-white/10 rounded-xl px-3.5 py-2 text-center min-w-[70px]">
                    <div className="text-lg font-bold leading-none">{s.v}</div>
                    <div className="text-[10px] text-white/60 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 4 Option Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {OPTIONS.map(opt => (
            <Link
              key={opt.id}
              href={opt.href(examId)}
              className={`group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br ${opt.bg} border ${opt.border} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ${opt.highlight ? "sm:col-span-2" : ""}`}
            >
              <div className={`w-12 h-12 rounded-xl ${opt.iconBg} flex items-center justify-center text-2xl flex-shrink-0 shadow-sm`}>
                {opt.emoji}
              </div>
              <div className="flex-grow min-w-0">
                <h2 className={`font-bold text-slate-900 dark:text-white ${opt.highlight ? "text-base" : "text-sm"}`}>{opt.label}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{opt.sublabel}</p>
              </div>
              <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
