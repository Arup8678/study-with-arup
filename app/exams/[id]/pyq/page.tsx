"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { dbService } from "@/services/db";
import { Exam, PYQItem } from "@/types";

function PYQQuestion({ q, num }: { q: { id: string; question: string; options: string[]; correctAnswerIndex: number; explanation: string }; num: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  return (
    <div className="p-5 space-y-3">
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200"><span className="text-blue-500 mr-1.5">Q{num}.</span>{q.question}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {q.options.map((opt, oi) => {
          const isCorrect = oi === q.correctAnswerIndex;
          const isSelected = oi === selected;
          return (
            <button key={oi} disabled={answered} onClick={() => setSelected(oi)}
              className={`text-left px-4 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                !answered ? "border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50/50 text-slate-700 dark:text-slate-300"
                : isCorrect ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold"
                : isSelected ? "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600"
                : "border-slate-100 dark:border-slate-800 text-slate-400 opacity-50"
              }`}>
              <span className="font-bold mr-1">{String.fromCharCode(65 + oi)}.</span>{opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="bg-blue-50 dark:bg-blue-900/15 border border-blue-200/50 dark:border-blue-800/30 rounded-xl p-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">✅ Explanation</span>{q.explanation}
        </div>
      )}
    </div>
  );
}

export default function PYQPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: examId } = use(params);
  const router = useRouter();
  const [exam, setExam] = useState<Exam | null>(null);
  const [openYear, setOpenYear] = useState<number | null>(null);

  useEffect(() => {
    dbService.getExamById(examId).then(d => { if (!d) router.push("/exams"); else { setExam(d); if (d.pyqs?.[0]) setOpenYear(d.pyqs[0].year); } });
  }, [examId, router]);

  if (!exam) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        <Link href={`/exams/${examId}`} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">← Back</Link>
        <h1 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2"><HelpCircle size={22} className="text-amber-500" /> Previous Year Questions</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{exam.name} — Click an option to reveal the answer and explanation.</p>

        {(exam.pyqs && exam.pyqs.length > 0) ? (
          <div className="space-y-4">
            {exam.pyqs.map((set: PYQItem) => (
              <div key={set.year} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 overflow-hidden shadow-sm">
                <button onClick={() => setOpenYear(openYear === set.year ? null : set.year)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm font-bold">{set.year}</div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900 dark:text-white text-sm">{set.year} Questions</div>
                      <div className="text-xs text-slate-400">{set.questions.length} questions with explanations</div>
                    </div>
                  </div>
                  {openYear === set.year ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                </button>
                {openYear === set.year && (
                  <div className="divide-y divide-slate-100 dark:divide-slate-700/40 border-t border-slate-100 dark:border-slate-700/60">
                    {set.questions.map((q, qi) => <PYQQuestion key={q.id} q={q} num={qi + 1} />)}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
            <HelpCircle size={36} className="mx-auto mb-3 text-slate-300" />
            <p className="text-sm text-slate-400">PYQs will be added soon via the Admin Panel.</p>
          </div>
        )}
      </div>
    </div>
  );
}
