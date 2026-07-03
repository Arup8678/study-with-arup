"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ExternalLink } from "lucide-react";
import { dbService } from "@/services/db";
import { Exam } from "@/types";

export default function ExamNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: examId } = use(params);
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);

  useEffect(() => {
    dbService.getExamById(examId).then(d => { if (!d) router.push("/exams"); else setExam(d); });
  }, [examId, router]);

  if (!exam) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  const TYPE_COLORS: Record<string, string> = {
    "Recruitment": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "Exam Date":   "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    "Admit Card":  "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "Result":      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        <Link href={`/exams/${examId}`} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">← Back</Link>
        <h1 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2"><Bell size={22} className="text-emerald-500" /> Current News</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{exam.name} — Official notifications. Always verify from the official website.</p>

        <div className="space-y-4">
          {(exam.notifications && exam.notifications.length > 0) ? exam.notifications.map(notif => (
            <div key={notif.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-2 flex-grow">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${TYPE_COLORS[notif.type] || ""}`}>{notif.type}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{notif.date}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{notif.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{notif.desc}</p>
                </div>
                {notif.officialLink && (
                  <a href={notif.officialLink} target="_blank" rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-semibold transition-all">
                    <ExternalLink size={12} /> Official
                  </a>
                )}
              </div>
            </div>
          )) : (
            <div className="text-center py-20 text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
              <Bell size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No notifications yet. Check the official website.</p>
              {exam.officialLink && <a href={exam.officialLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs mt-2 inline-block hover:underline">{exam.officialLink}</a>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
