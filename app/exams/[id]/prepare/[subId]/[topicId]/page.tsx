"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Play, ExternalLink } from "lucide-react";
import { dbService } from "@/services/db";
import { Topic } from "@/types";

export default function TopicChoicePage({ params }: { params: Promise<{ id: string; subId: string; topicId: string }> }) {
  const { id: examId, subId, topicId } = use(params);
  const router = useRouter();
  const [topic, setTopic] = useState<Topic | null>(null);

  useEffect(() => {
    dbService.getTopicById(topicId).then(t => {
      if (!t) { router.push(`/exams/${examId}/prepare/${subId}`); return; }
      setTopic(t);
    });
  }, [examId, subId, topicId, router]);

  if (!topic) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  const renderNotes = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("### ")) return <h3 key={i} className="text-base font-bold text-slate-900 dark:text-white mt-5 mb-1.5">{line.slice(4)}</h3>;
      if (line.startsWith("## "))  return <h2 key={i} className="text-xl font-extrabold text-slate-900 dark:text-white mt-7 mb-2 font-heading">{line.slice(3)}</h2>;
      if (line.startsWith("> "))   return <div key={i} className="border-l-4 border-blue-400 pl-4 py-1 bg-blue-50/60 dark:bg-blue-900/10 rounded-r-lg my-2 text-sm text-slate-600 dark:text-slate-300 italic">{line.slice(2)}</div>;
      if (line.startsWith("|") && line.endsWith("|")) {
        const cells = line.split("|").filter(c => c.trim() !== "");
        const isDivider = cells.every(c => /^[-:\s]+$/.test(c));
        if (isDivider) return null;
        return (
          <div key={i} className="grid text-xs font-medium py-2 px-3 border-b border-slate-100 dark:border-slate-700/40"
            style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}>
            {cells.map((cell, ci) => <span key={ci} className="text-slate-700 dark:text-slate-300">{cell.trim()}</span>)}
          </div>
        );
      }
      if (line.startsWith("* ") || line.startsWith("- ")) {
        return <div key={i} className="flex items-start gap-2 my-1 text-sm text-slate-700 dark:text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
          <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
        </div>;
      }
      if (/^\d+\. /.test(line)) {
        const num = line.match(/^(\d+)\. /)?.[1];
        const text = line.replace(/^\d+\. /, "");
        return <div key={i} className="flex items-start gap-2 my-1 text-sm text-slate-700 dark:text-slate-300">
          <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{num}</span>
          <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
        </div>;
      }
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        <Link href={`/exams/${examId}/prepare/${subId}`} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">← Topics</Link>

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
          <Link
            href={`/quiz/quiz-wbp-gk`}
            className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/10 border border-violet-200/60 dark:border-violet-800/30 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Play size={26} />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">Mock Test</div>
              <div className="text-xs text-slate-400 mt-0.5">Practice MCQs</div>
            </div>
          </Link>
        </div>

        {/* Notes Content */}
        <div id="notes-section" className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-6 shadow-sm space-y-1 scroll-mt-24">
          {renderNotes(topic.notesContent)}
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
