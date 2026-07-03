"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Search, ChevronRight, BarChart2 } from "lucide-react";
import { dbService } from "@/services/db";
import { Subject } from "@/types";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dbService.getSubjects().then(data => {
      setSubjects(data);
      setFilteredSubjects(data);
    });
  }, []);

  useEffect(() => {
    if (search.trim()) {
      const q = search.toLowerCase();
      setFilteredSubjects(subjects.filter(
        s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      ));
    } else {
      setFilteredSubjects(subjects);
    }
  }, [search, subjects]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      
      {/* Title */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
          <BookOpen size={28} className="text-blue-500" />
          Syllabus Subject Categories
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
          Develop comprehensive topic-wise mastery. Practice curated MCQs and study bilingual notes organized by subject weightage.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md bg-white dark:bg-slate-800 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center gap-2">
        <Search className="text-slate-400 ml-2" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search subjects, e.g. History, Geography..."
          className="w-full bg-transparent border-0 outline-none text-sm text-slate-800 dark:text-white"
        />
      </div>

      {/* Grid */}
      {filteredSubjects.length === 0 ? (
        <div className="text-center py-10 text-slate-400 bg-white dark:bg-slate-800 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
          No subjects match your query.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSubjects.map((sub) => (
            <div
              key={sub.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-premium hover:shadow-premium-hover transition-all flex flex-col justify-between gap-6 hover:-translate-y-1 text-left relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl font-bold">
                  📚
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-800 dark:text-white line-clamp-1">{sub.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">{sub.description}</p>
                </div>
              </div>

              <div className="space-y-3.5">
                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-semibold text-slate-450 dark:text-slate-400">
                    <span className="flex items-center gap-0.5">
                      <BarChart2 size={10} /> Progress
                    </span>
                    <span>{sub.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-750 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${sub.progress}%` }} />
                  </div>
                </div>

                <Link
                  href={`/subjects/${sub.id}`}
                  className="w-full text-center block py-2.5 rounded-xl text-xs font-semibold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-100 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white transition-all flex items-center justify-center gap-0.5 group"
                >
                  Explore Topics
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
