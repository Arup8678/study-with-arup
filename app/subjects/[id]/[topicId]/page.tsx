"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, BookOpen, Play } from "lucide-react";
import { dbService } from "@/services/db";
import { Topic } from "@/types";

export default function TopicDetailPage({ params }: { params: Promise<{ id: string; topicId: string }> }) {
  const { id: subjectId, topicId } = use(params);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    dbService.getTopicById(topicId).then(data => {
      if (!data) { router.push(`/subjects/${subjectId}`); return; }
      setTopic(data);
      setLoading(false);
    });
  }, [subjectId, topicId, router]);

  if (loading || !topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 flex flex-col items-center gap-4 text-slate-400">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm">Loading notes...</p>
      </div>
    );
  }

  // Render markdown-like notes: split on newlines, handle ### ## headings, bold, tables
  const renderNotes = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, i) => {
      // H3
      if (line.startsWith("### ")) {
        return <h3 key={i} className="text-base font-bold text-slate-900 dark:text-white mt-6 mb-2">{line.slice(4)}</h3>;
      }
      // H2
      if (line.startsWith("## ")) {
        return <h2 key={i} className="text-xl font-extrabold text-slate-900 dark:text-white mt-8 mb-3 font-heading">{line.slice(3)}</h2>;
      }
      // Blockquote
      if (line.startsWith("> ")) {
        return (
          <div key={i} className="border-l-4 border-blue-400 pl-4 py-1 bg-blue-50/60 dark:bg-blue-900/10 rounded-r-lg my-2 text-sm text-slate-600 dark:text-slate-300 italic">
            {line.slice(2)}
          </div>
        );
      }
      // Table row
      if (line.startsWith("|") && line.endsWith("|")) {
        const cells = line.split("|").filter(c => c.trim() !== "");
        const isHeader = lines[i + 1]?.startsWith("|:") || lines[i + 1]?.startsWith("| :") || lines[i + 1]?.includes("|:---");
        const isDivider = cells.every(c => /^[-:\s]+$/.test(c));
        if (isDivider) return null;
        return (
          <div key={i} className={`grid text-xs font-medium py-2 px-3 rounded-lg ${isHeader ? "bg-slate-100 dark:bg-slate-700/50 font-bold" : "border-b border-slate-100 dark:border-slate-700/40"}`}
            style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}>
            {cells.map((cell, ci) => (
              <span key={ci} className="text-slate-700 dark:text-slate-300">{cell.trim()}</span>
            ))}
          </div>
        );
      }
      // Bullet
      if (line.startsWith("* ") || line.startsWith("- ")) {
        const text = line.slice(2);
        return (
          <div key={i} className="flex items-start gap-2 my-1 text-sm text-slate-700 dark:text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
            <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
          </div>
        );
      }
      // Numbered list
      if (/^\d+\. /.test(line)) {
        const num = line.match(/^(\d+)\. /)?.[1];
        const text = line.replace(/^\d+\. /, "");
        return (
          <div key={i} className="flex items-start gap-2 my-1 text-sm text-slate-700 dark:text-slate-300">
            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{num}</span>
            <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
          </div>
        );
      }
      // Empty line spacer
      if (line.trim() === "") return <div key={i} className="h-2" />;
      // Normal paragraph
      return (
        <p key={i} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

      {/* Back */}
      <Link
        href={`/subjects/${subjectId}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
      >
        <ArrowLeft size={14} /> Back to topics
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-blue-500" />
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Study Notes</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white leading-tight">
          {topic.name}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{topic.description}</p>
      </div>

      {/* Notes Content */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-6 sm:p-8 shadow-sm space-y-1">
        {renderNotes(topic.notesContent)}
      </div>

      {/* Reference Links */}
      {topic.referenceLinks && topic.referenceLinks.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-200/60 dark:border-blue-800/30 p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ExternalLink size={15} className="text-blue-500" />
            Reference Resources (Free)
          </h3>
          <div className="space-y-2">
            {topic.referenceLinks.map((ref, i) => (
              <a
                key={i}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-400 hover:underline font-medium"
              >
                <ExternalLink size={11} />
                {ref.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Practice Quiz CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 text-white">
        <div>
          <h3 className="font-bold text-base">Ready to Practice?</h3>
          <p className="text-xs text-slate-400 mt-1">Test your understanding with a quick MCQ quiz on this topic.</p>
        </div>
        <Link
          href="/quiz"
          className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-900/30 transition-all"
        >
          <Play size={13} fill="currentColor" /> Take a Quiz
        </Link>
      </div>

    </div>
  );
}
