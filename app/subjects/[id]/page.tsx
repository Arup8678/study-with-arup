"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, FileText, ChevronRight, Play, BookMarked } from "lucide-react";
import { dbService } from "@/services/db";
import { Subject, Topic } from "@/types";

export default function SubjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: subjectId } = use(params);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
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
        Loading subject specifications...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      
      {/* Back Link */}
      <Link href="/subjects" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
        ← Back to all subjects
      </Link>

      {/* Subject Header Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-tr from-blue-600/10 to-indigo-600/5 dark:from-blue-900/20 dark:to-transparent border border-slate-200/50 dark:border-slate-800/30 flex flex-col sm:flex-row items-start justify-between gap-6">
        <div className="space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl font-bold">
            📚
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">{subject.name}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl leading-relaxed">{subject.description}</p>
        </div>

        <div className="flex flex-col gap-2 text-xs text-slate-400 self-start md:self-auto">
          <span>Total Practice Pools: {subject.questionCount} Questions</span>
          <span>Topic-Wise Master Modules: {topics.length} Chapters</span>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-850 dark:text-white">Chapters & Topics List</h2>
        
        {topics.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 text-center text-slate-450">
            No study chapters uploaded yet for this subject. Check back shortly!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-premium hover:shadow-premium-hover transition-all flex flex-col justify-between gap-6 text-left hover:-translate-y-1 relative"
              >
                <div className="space-y-3">
                  <h3 className="font-bold text-base text-slate-850 dark:text-white line-clamp-1">{topic.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{topic.description}</p>
                  
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold pt-1">
                    <FileText size={12} /> {topic.questionsCount} practice questions
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    href={`/subjects/${subjectId}/${topic.id}`}
                    className="w-full text-center py-2.5 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 dark:bg-slate-750 dark:hover:bg-slate-700 dark:text-slate-350 transition-all flex items-center justify-center gap-1.5"
                  >
                    <BookMarked size={14} /> Read Notes
                  </Link>
                  <Link
                    href="/quiz/quiz-math-practice"
                    className="w-full text-center py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Play size={10} fill="currentColor" /> Practice MCQs
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
