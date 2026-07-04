"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, AlertCircle, CheckCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { dbService } from "@/services/db";
import { Exam } from "@/types";

export default function SyllabusPage({ params }: { params: { id: string } }) {
  const examId = params?.id;
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);

  useEffect(() => {
    if (!examId) return;
    dbService.getExamById(examId).then(d => { if (!d) router.push("/exams"); else setExam(d); });
  }, [examId, router]);

  if (!exam) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        <Link href={`/exams/${examId}`} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">← Back to Exam Hub</Link>

        <div>
          <div className="flex items-center gap-2">
            <FileText size={22} className="text-blue-500" />
            <h1 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">Official Syllabus</h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{exam.name}</p>
        </div>

        {/* Official Source Banner */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 dark:text-emerald-300">
              <span className="font-bold block text-sm">Verified Official Syllabus</span>
              This syllabus and exam pattern is sourced directly from the official notification released by the conducting authority.
            </div>
          </div>
          {exam.officialLink && (
            <a
              href={exam.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              Portal <ExternalLink size={11} />
            </a>
          )}
        </div>

        {/* Exam Pattern Table */}
        {exam.examPattern && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60 font-bold text-slate-900 dark:text-white text-sm">Official Exam Pattern &amp; Marks Distribution</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-700/40">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Subject / Section</th>
                    <th className="text-center px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Qs</th>
                    <th className="text-center px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
                  {exam.examPattern.sections.map((s, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20">
                      <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                      <td className="px-4 py-3.5 text-center font-bold text-blue-600 dark:text-blue-400">{s.questions}</td>
                      <td className="px-4 py-3.5 text-center font-bold text-emerald-600 dark:text-emerald-400">{s.marks}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 dark:bg-slate-700/40 font-bold">
                    <td className="px-5 py-3.5 text-slate-900 dark:text-white">Total</td>
                    <td className="px-4 py-3.5 text-center text-blue-700 dark:text-blue-300">{exam.examPattern.totalQuestions}</td>
                    <td className="px-4 py-3.5 text-center text-emerald-700 dark:text-emerald-300">{exam.examPattern.totalMarks}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-amber-50 dark:bg-amber-900/10 border-t border-amber-100 dark:border-amber-800/20 flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 font-medium">
              <AlertCircle size={14} className="flex-shrink-0" />
              {exam.examPattern.negativeMarking > 0 ? `Negative Marking Rule: -${exam.examPattern.negativeMarking} mark per wrong answer.` : "No negative marking."}
            </div>
          </div>
        )}

        {/* Detailed Syllabus */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60 font-bold text-slate-900 dark:text-white text-sm">Subject-wise Syllabus Topics</div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/40">
            {exam.syllabus.map((item, i) => (
              <div key={i} className="px-5 py-4 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selection Process */}
        {exam.selectionProcess && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700/60 font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-500" /> Selection Process Stages
            </div>
            <div className="p-5 space-y-3">
              {exam.selectionProcess.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
