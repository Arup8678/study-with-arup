"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { dbService } from "@/services/db";
import { Exam, Subject } from "@/types";

const SUBJECT_ICONS: Record<string, string> = {
  "gk-general":   "🌍",
  "gk-panchayat": "🏛️",
  "mathematics":  "🔢",
  "reasoning":    "🧩",
  "english":      "📝",
  "science":      "🔬",
  "bengali":      "✍️",
};

const SUBJECT_COLORS: Record<string, string> = {
  "gk-general":   "from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/5 border-blue-200/60 dark:border-blue-800/30",
  "gk-panchayat": "from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/5 border-green-200/60 dark:border-green-800/30",
  "mathematics":  "from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/5 border-orange-200/60 dark:border-orange-800/30",
  "reasoning":    "from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/5 border-purple-200/60 dark:border-purple-800/30",
  "english":      "from-teal-50 to-cyan-50 dark:from-teal-900/10 dark:to-cyan-900/5 border-teal-200/60 dark:border-teal-800/30",
  "science":      "from-red-50 to-rose-50 dark:from-red-900/10 dark:to-rose-900/5 border-red-200/60 dark:border-red-800/30",
  "bengali":      "from-pink-50 to-fuchsia-50 dark:from-pink-900/10 dark:to-fuchsia-900/5 border-pink-200/60 dark:border-pink-800/30",
};

export default function PreparePage({ params }: { params: { id: string } }) {
  const examId = params?.id;
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    if (!examId) return;
    dbService.getExamById(examId).then(d => {
      if (!d) { router.push("/exams"); return; }
      setExam(d);
      if (d.subjectIds?.length) {
        dbService.getSubjects().then(all =>
          setSubjects(all.filter(s => d.subjectIds!.includes(s.id)))
        );
      }
    });
  }, [examId, router]);

  if (!exam) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        <Link href={`/exams/${examId}`} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">← Back</Link>
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">Start Preparation</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{exam.name} — Choose a subject to start studying.</p>
        </div>

        <div className="space-y-3">
          {subjects.map(sub => {
            const icon = SUBJECT_ICONS[sub.id] || "📚";
            const color = SUBJECT_COLORS[sub.id] || "from-slate-50 to-slate-50 border-slate-200";
            return (
              <Link
                key={sub.id}
                href={`/exams/${examId}/prepare/${sub.id}`}
                className={`group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br ${color} border hover:shadow-md hover:-translate-y-0.5 transition-all`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/80 dark:bg-slate-800/60 flex items-center justify-center text-2xl shadow-sm flex-shrink-0">{icon}</div>
                <div className="flex-grow min-w-0">
                  <h2 className="font-bold text-slate-900 dark:text-white text-sm">{sub.name}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{sub.description}</p>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </Link>
            );
          })}
          {subjects.length === 0 && (
            <div className="text-center py-20 text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
              <p className="text-sm">Subjects coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
