"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, FileText, ChevronRight, Play, BookMarked } from "lucide-react";
import { dbService } from "@/services/db";
import { Subject, Topic } from "@/types";

export default function SubjectDetailPage({ params }: { params: { id: string } }) {
  const subjectId = params?.id;
  const [subject, setSubject] = useState<Subject | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!subjectId) return;
    setLoading(true);
    dbService.getSubjectById(subjectId).then(data => {
      if (!data) {
        router.push("/subjects");
        return;
      }
      setSubject(data);
      dbService.getTopicsBySubject(subjectId).then(tData => {
        setTopics(tData);
        setLoading(false);
      });
    });
  }, [subjectId, router]);

  if (loading || !subject) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-400">
        Loading chapter data...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 text-left">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200/60 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
            Subject Portal
          </span>
          <span className="text-[10px] text-slate-400 font-semibold">{topics.length} Key Topics</span>
        </div>
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white leading-tight">
          {subject.name}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">{subject.description}</p>
      </div>

      {/* Topic List */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-slate-800 dark:text-white text-lg flex items-center gap-2">
          <BookMarked size={20} className="text-blue-500" />
          Syllabus Topics &amp; Revision Notes
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {topics.map((t, idx) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-base text-slate-850 dark:text-white">{t.name}</h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 pl-8">{t.description}</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href={`/subjects/${subjectId}/${t.id}`}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white dark:bg-blue-900/30 dark:hover:bg-blue-600 dark:text-blue-400 dark:hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <FileText size={14} /> Notes
                </Link>
                <Link
                  href={`/quiz/quiz-wbp-gk`}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-800 hover:text-white dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <Play size={14} /> Practice
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
