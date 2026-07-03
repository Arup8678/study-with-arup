"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HelpCircle, Clock, Award, Play, Flame, Search } from "lucide-react";
import { dbService } from "@/services/db";
import { Quiz } from "@/types";

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dbService.getQuizzes().then(data => {
      setQuizzes(data);
      setFilteredQuizzes(data);
    });
  }, []);

  useEffect(() => {
    if (search.trim()) {
      const q = search.toLowerCase();
      setFilteredQuizzes(quizzes.filter(
        qz => qz.title.toLowerCase().includes(q) || qz.subjectName.toLowerCase().includes(q)
      ));
    } else {
      setFilteredQuizzes(quizzes);
    }
  }, [search, quizzes]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      
      {/* Title */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
          <Flame size={28} className="text-orange-500 fill-orange-500" />
          Interactive Daily Quizzes
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
          Quick daily checkpoint practices. Complete active quizzes to unlock streak points, gain XP coins and review detailed explanation logs.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md bg-white dark:bg-slate-800 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center gap-2">
        <Search className="text-slate-400 ml-2" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search quizzes, e.g. GK, Arithmetic..."
          className="w-full bg-transparent border-0 outline-none text-sm text-slate-800 dark:text-white"
        />
      </div>

      {/* Grid */}
      {filteredQuizzes.length === 0 ? (
        <div className="text-center py-10 text-slate-400 bg-white dark:bg-slate-800 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
          No active quizzes found. Clear search filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-premium hover:shadow-premium-hover transition-all flex flex-col justify-between gap-6 hover:-translate-y-1 text-left relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-1 rounded-md text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-350 font-bold uppercase tracking-wider">
                    {quiz.subjectName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{quiz.date}</span>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-slate-850 dark:text-white line-clamp-1">{quiz.title}</h3>
                  <p className="text-xs text-slate-450 dark:text-slate-450 mt-1 leading-relaxed">
                    Test your subject matter skills with this interactive objective questionnaire. Correct answers grant coins!
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <HelpCircle size={14} /> {quiz.questionsCount} MCQs
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {quiz.timeLimitMinutes} minutes
                  </span>
                  <span className="flex items-center gap-1">
                    <Award size={14} /> Difficulty: {quiz.difficulty}
                  </span>
                </div>
              </div>

              <Link
                href={`/quiz/${quiz.id}`}
                className="w-full text-center py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-1.5 group"
              >
                <Play size={12} fill="currentColor" />
                Start Quiz
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
