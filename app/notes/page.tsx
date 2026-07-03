"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Search, BookMarked, ArrowRight } from "lucide-react";
import { TOPICS_DATA, SUBJECTS_DATA } from "@/services/mockData";
import { Topic } from "@/types";

export default function NotesPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTopics(TOPICS_DATA);
    setFilteredTopics(TOPICS_DATA);
  }, []);

  useEffect(() => {
    if (search.trim()) {
      const q = search.toLowerCase();
      setFilteredTopics(topics.filter(
        t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      ));
    } else {
      setFilteredTopics(topics);
    }
  }, [search, topics]);

  // Map subject name helper
  const getSubjectName = (subId: string) => {
    return SUBJECTS_DATA.find(s => s.id === subId)?.name || "General Study";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      
      {/* Title */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
          <BookMarked size={28} className="text-blue-500" />
          Study & Revision Notes
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
          Topic-wise study notes for WBP Constable, SSC GD, Agniveer Army and WB Panchayat exams. Free reference links included.
        </p>
      </div>

      {/* Free PDF Download Card */}
      <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-gradient-to-r from-indigo-600/10 to-blue-600/5 border border-indigo-200/60 dark:border-indigo-800/30 dark:from-indigo-900/20">
        <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-3xl flex-shrink-0">
          📖
        </div>
        <div className="flex-grow text-center sm:text-left">
          <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-0.5">Free Download</div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">WBCS 2024 Complete GK E-Book in Bengali</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Comprehensive GK notes in Bengali — useful for all 4 exams. Covers History, Geography, Polity, Science and Current Affairs.</p>
        </div>
        <a
          href="/gk-ebook.pdf"
          download
          className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 transition-all"
        >
          ⬇ Download PDF
        </a>
      </div>

      {/* Search Bar */}
      <div className="max-w-md bg-white dark:bg-slate-800 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center gap-2">
        <Search className="text-slate-400 ml-2" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search study notes topics..."
          className="w-full bg-transparent border-0 outline-none text-sm text-slate-800 dark:text-white"
        />
      </div>

      {/* Grid */}
      {filteredTopics.length === 0 ? (
        <div className="text-center py-10 text-slate-400 bg-white dark:bg-slate-800 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
          No study topics match your search query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-premium hover:shadow-premium-hover transition-all flex flex-col justify-between gap-5 hover:-translate-y-1 text-left"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-1 rounded-md text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                    {getSubjectName(topic.subjectId)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{topic.questionsCount} MCQs</span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-850 dark:text-white line-clamp-1">{topic.name}</h3>
                  <p className="text-xs text-slate-450 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">{topic.description}</p>
                </div>
              </div>

              <Link
                href={`/subjects/${topic.subjectId}/${topic.id}`}
                className="w-full text-center py-2.5 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-700 dark:bg-slate-750 dark:hover:bg-blue-600 dark:text-slate-250 transition-all flex items-center justify-center gap-1 group"
              >
                Open Study Notes
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
