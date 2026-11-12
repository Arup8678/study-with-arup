"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Play, ExternalLink } from "lucide-react";
import { dbService } from "@/services/db";
import { Topic } from "@/types";
import NotesRenderer from "@/components/NotesRenderer";

export default function TopicChoicePage({ params }: { params: { id: string; subId: string; topicId: string } }) {
  const examId = params?.id;
  const subId = params?.subId;
  const topicId = params?.topicId;
  const router = useRouter();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [notesState, setNotesState] = useState<"ready" | "loading" | "error">("ready");

  useEffect(() => {
    if (!topicId) return;
    dbService.getTopicById(topicId).then(t => {
      if (!t) { router.push(`/exams/${examId}/prepare/${subId}`); return; }
      setTopic(t);
      if (t.notesUrl) {
        setNotesState("loading");
        dbService.getIdoChapter(t.id).then(ch => {
          if (ch) { setNotes(ch.notes); setNotesState("ready"); } else setNotesState("error");
        });
      } else {
        setNotes(t.notesContent);
      }
    });
  }, [examId, subId, topicId, router]);

  if (!topic) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  const mockHref = topic.notesUrl
    ? (topic.quizId ? `/quiz/${topic.quizId}` : null)
    : "/quiz/quiz-wbp-gk";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        <Link href={`/exams/${examId}/prepare/${subId}`} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">← {topic.notesUrl ? "Chapters" : "Topics"}</Link>

        {/* Topic header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white leading-tight">{topic.name}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{topic.description}</p>
        </div>

        {/* TWO BIG CHOICE BUTTONS */}
        <div className="grid grid-cols-2 gap-4">
          {/* Notes */}
          <a
            href="#notes-section"
            className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 border border-blue-200/60 dark:border-blue-800/30 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <BookOpen size={26} />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">Notes</div>
              <div className="text-xs text-slate-400 mt-0.5">Read study notes</div>
            </div>
          </a>

          {/* Mock */}
          {mockHref ? (
            <Link
              href={mockHref}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/10 border border-violet-200/60 dark:border-violet-800/30 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                <Play size={26} />
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">Mock Test</div>
                <div className="text-xs text-slate-400 mt-0.5">{topic.quizId ? `${topic.questionsCount} MCQs` : "Practice MCQs"}</div>
              </div>
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 text-center opacity-70">
              <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-400 flex items-center justify-center">
                <Play size={26} />
              </div>
              <div>
                <div className="font-bold text-slate-700 dark:text-slate-300 text-sm">Mock Test</div>
                <div className="text-xs text-slate-400 mt-0.5">No MCQs for this section</div>
              </div>
            </div>
          )}
        </div>

        {/* Notes Content */}
        <div id="notes-section" className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-6 shadow-sm space-y-1 scroll-mt-24">
          {notesState === "loading" && <p className="text-sm text-slate-400">Loading notes…</p>}
          {notesState === "error" && <p className="text-sm text-red-500">Could not load the notes. Check your connection and refresh.</p>}
          {notesState === "ready" && <NotesRenderer content={notes} />}
        </div>

        {/* Reference Links */}
        {topic.referenceLinks && topic.referenceLinks.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-200/60 dark:border-blue-800/30 p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ExternalLink size={14} className="text-blue-500" /> Free Reference Resources
            </h3>
            <div className="space-y-2">
              {topic.referenceLinks.map((ref, i) => (
                <a key={i} href={ref.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-400 hover:underline font-medium">
                  <ExternalLink size={11} /> {ref.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
