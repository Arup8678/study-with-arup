"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, Book, Award, FileText, Calendar, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { EXAMS_DATA, SUBJECTS_DATA, BLOGS_DATA, NOTIFICATIONS_DATA } from "@/services/mockData";

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    exams: typeof EXAMS_DATA;
    subjects: typeof SUBJECTS_DATA;
    blogs: typeof BLOGS_DATA;
    notifications: typeof NOTIFICATIONS_DATA;
  }>({ exams: [], subjects: [], blogs: [], notifications: [] });

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard shortcut Ctrl+K to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ exams: [], subjects: [], blogs: [], notifications: [] });
      return;
    }

    const q = query.toLowerCase();

    const filteredExams = EXAMS_DATA.filter(
      e => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
    );
    const filteredSubjects = SUBJECTS_DATA.filter(
      s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    );
    const filteredBlogs = BLOGS_DATA.filter(
      b => b.title.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)
    );
    const filteredNotifications = NOTIFICATIONS_DATA.filter(
      n => n.title.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q)
    );

    setResults({
      exams: filteredExams,
      subjects: filteredSubjects,
      blogs: filteredBlogs,
      notifications: filteredNotifications,
    });
  }, [query]);

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(path);
  };

  const hasResults =
    results.exams.length > 0 ||
    results.subjects.length > 0 ||
    results.blogs.length > 0 ||
    results.notifications.length > 0;

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 rounded-full border border-slate-200 dark:border-slate-700/60 transition-colors w-40 md:w-56"
        aria-label="Global Search"
      >
        <Search size={16} />
        <span className="text-left flex-grow">Search...</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 text-xs text-slate-400 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-600 font-sans">
          Ctrl K
        </kbd>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/40 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Search Input Area */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
              <Search className="text-slate-400" size={20} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search exams, subjects, notes, syllabus, blogs..."
                className="w-full text-slate-800 dark:text-slate-100 bg-transparent border-0 outline-none placeholder-slate-400 text-base"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
              {!query.trim() ? (
                <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                  <p className="text-sm">Type to search for WBCS, Food SI, Constables, GK quizzes...</p>
                  <p className="text-xs mt-1">Tip: Press ESC to exit</p>
                </div>
              ) : !hasResults ? (
                <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                  <p className="text-sm">No results matching &ldquo;{query}&rdquo;</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Exams */}
                  {results.exams.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Award size={12} /> Popular Exams
                      </h3>
                      <div className="space-y-1">
                        {results.exams.map(e => (
                          <button
                            key={e.id}
                            onClick={() => handleNavigate(`/exams/${e.id}`)}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between group transition-all"
                          >
                            <div>
                              <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{e.name}</div>
                              <div className="text-xs text-slate-400 line-clamp-1">{e.description}</div>
                            </div>
                            <ArrowRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Subjects */}
                  {results.subjects.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Book size={12} /> Subjects & Practice
                      </h3>
                      <div className="space-y-1">
                        {results.subjects.map(s => (
                          <button
                            key={s.id}
                            onClick={() => handleNavigate(`/subjects/${s.id}`)}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between group transition-all"
                          >
                            <div>
                              <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{s.name}</div>
                              <div className="text-xs text-slate-400 line-clamp-1">{s.description}</div>
                            </div>
                            <ArrowRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Blogs */}
                  {results.blogs.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <FileText size={12} /> Prep Guides & Blog
                      </h3>
                      <div className="space-y-1">
                        {results.blogs.map(b => (
                          <button
                            key={b.id}
                            onClick={() => handleNavigate(`/blog/${b.slug}`)}
                            className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between group transition-all"
                          >
                            <div>
                              <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{b.title}</div>
                              <div className="text-xs text-slate-400 line-clamp-1">{b.description}</div>
                            </div>
                            <ArrowRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notifications */}
                  {results.notifications.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Calendar size={12} /> Notices & Dates
                      </h3>
                      <div className="space-y-1">
                        {results.notifications.map(n => (
                          <a
                            key={n.id}
                            href={n.officialLink || "/blog"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between group transition-all block"
                          >
                            <div>
                              <div className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-500 dark:bg-amber-500/20">
                                  {n.type}
                                </span>
                                {n.title}
                              </div>
                              <div className="text-xs text-slate-400 line-clamp-1">{n.desc}</div>
                            </div>
                            <ArrowRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
