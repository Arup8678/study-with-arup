"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Award, FileText, Clock, Play, Lock, Sparkles, Filter } from "lucide-react";
import { dbService } from "@/services/db";
import { MockTest, Exam } from "@/types";

export default function MockTestsPage() {
  const [tests, setTests] = useState<MockTest[]>([]);
  const [filteredTests, setFilteredTests] = useState<MockTest[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [search, setSearch] = useState("");
  const [examFilter, setExamFilter] = useState("all");
  const [pricingFilter, setPricingFilter] = useState("all"); // all, free, premium

  useEffect(() => {
    dbService.getMockTests().then(data => {
      setTests(data);
      setFilteredTests(data);
    });
    dbService.getExams().then(setExams);
  }, []);

  useEffect(() => {
    let result = tests;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(q) || t.examName.toLowerCase().includes(q));
    }

    if (examFilter !== "all") {
      result = result.filter(t => t.examId === examFilter);
    }

    if (pricingFilter !== "all") {
      const wantPremium = pricingFilter === "premium";
      result = result.filter(t => t.isPremium === wantPremium);
    }

    setFilteredTests(result);
  }, [search, examFilter, pricingFilter, tests]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      
      {/* Title */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
          <Award size={28} className="text-blue-500" />
          Full-Length Mock Test Series
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
          Simulate actual exam conditions with full-length mock papers. Complete sets for WBCS Prelims, WBP Constables, and Food SI.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm items-center">
        
        {/* Search */}
        <div className="md:col-span-4 relative">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mock papers..."
            className="w-full bg-slate-50 dark:bg-slate-900/60 rounded-xl py-2 pl-10 pr-4 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 text-sm text-slate-800 dark:text-white transition-all"
          />
        </div>

        {/* Target Exam Filter */}
        <div className="md:col-span-4 relative">
          <select
            value={examFilter}
            onChange={(e) => setExamFilter(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900/60 rounded-xl py-2 px-3 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 text-sm text-slate-800 dark:text-white appearance-none"
          >
            <option value="all">All Exams Target</option>
            {exams.map(e => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
            ▾
          </div>
        </div>

        {/* Pricing tag Filter */}
        <div className="md:col-span-4 relative">
          <select
            value={pricingFilter}
            onChange={(e) => setPricingFilter(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900/60 rounded-xl py-2 px-3 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 text-sm text-slate-800 dark:text-white appearance-none"
          >
            <option value="all">All Access</option>
            <option value="free">Free Mock Series</option>
            <option value="premium">Premium Mock Series Only</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
            ▾
          </div>
        </div>

      </div>

      {/* Mock Tests List */}
      {filteredTests.length === 0 ? (
        <div className="text-center py-10 text-slate-400 bg-white dark:bg-slate-800 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
          No mock test series match your active query filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-premium hover:shadow-premium-hover transition-all flex flex-col justify-between gap-6 text-left relative overflow-hidden"
            >
              {/* Premium ribbon */}
              {test.isPremium && (
                <div className="absolute top-0 right-0 px-3.5 py-1 bg-amber-500 text-white text-[9px] font-bold uppercase tracking-wider rounded-bl-xl flex items-center gap-1">
                  <Lock size={10} /> Premium
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                    {test.examName}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-850 dark:text-white line-clamp-1 pr-12">{test.title}</h3>
                  <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
                    Simulate real Exam timing parameters. Submissions compile accuracy lists and award XP points.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-450 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <FileText size={14} className="text-blue-500" /> {test.totalQuestions} questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-blue-500" /> {test.durationMinutes} minutes
                  </span>
                  <span className="flex items-center gap-1">
                    <Award size={14} className="text-blue-500" /> {test.totalMarks} Marks
                  </span>
                </div>
              </div>

              <Link
                href={`/mock-tests/${test.id}`}
                className="w-full text-center py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-1.5 group"
              >
                <Play size={12} fill="currentColor" />
                Start Test Series
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
