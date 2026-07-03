"use client";

import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8 text-left leading-relaxed text-slate-700 dark:text-slate-350 font-sans">
      <div className="space-y-2 border-b border-slate-200/60 dark:border-slate-800 pb-6 text-center">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="text-xs text-slate-400">Last updated: July 03, 2026</p>
      </div>

      <div className="space-y-6 text-sm">
        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-heading text-slate-850 dark:text-white">1. Platform Licensing</h2>
          <p>
            By using Exam Bangla, you agree to access test papers, revision notes, and daily quizzes solely for individual preparation purposes. Reproducing, publishing, or selling our questions, explanations, and notes is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-heading text-slate-850 dark:text-white">2. Local Storage Disclaimer</h2>
          <p>
            Exam Bangla provides a fallback mock database engine. Clearing browser caches, cookies, or local storage datasets will delete your active learning progress, bookmarked items, streaks, and XP lists.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-heading text-slate-850 dark:text-white">3. Platform Modifications</h2>
          <p>
            We reserve the right to modify questions, updates list, mock timer limits, and pricing tags at any time to align with official West Bengal civil service and police recruitment changes.
          </p>
        </section>
      </div>
    </div>
  );
}
