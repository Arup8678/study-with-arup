"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, BookOpen } from "lucide-react";
import { dbService } from "@/services/db";
import { Topic } from "@/types";

export default function PrepareSubjectPage({ params }: { params: { id: string; subId: string } }) {
  const examId = params?.id;
  const subId = params?.subId;
  const router = useRouter();
  const [subjectName, setSubjectName] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subId || !examId) return;
    dbService.getSubjectById(subId).then(sub => {
      if (!sub) { router.push(`/exams/${examId}/prepare`); return; }
      setSubjectName(sub.name);
      dbService.getTopicsBySubject(subId).then(t => { setTopics(t); setLoading(false); });
    });
  }, [examId, subId, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        <Link href={`/exams/${examId}/prepare`} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">← Subjects</Link>
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">{subjectName}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Select a topic to read notes or take a mock test.</p>
        </div>

        <div className="space-y-3">
          {topics.length > 0 ? topics.map(topic => (
            <Link
              key={topic.id}
              href={`/exams/${examId}/prepare/${subId}/${topic.id}`}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center flex-shrink-0">
                <BookOpen size={18} />
              </div>
              <div className="flex-grow min-w-0">
                <h2 className="font-semibold text-slate-900 dark:text-white text-sm">{topic.name}</h2>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{topic.description}</p>
              </div>
              <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
            </Link>
          )) : (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 space-y-2">
              <BookOpen size={36} className="mx-auto text-slate-300" />
              <p className="text-sm text-slate-400">No topics added yet.</p>
              <Link href="/admin" className="text-blue-500 text-xs hover:underline">Add topics via Admin Panel →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
