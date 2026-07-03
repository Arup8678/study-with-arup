"use client";

import React from "react";
import { BookOpen } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8 text-left leading-relaxed text-slate-700 dark:text-slate-350 font-sans">
      <div className="space-y-2 border-b border-slate-200/60 dark:border-slate-800 pb-6 text-center">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: July 03, 2026</p>
      </div>

      <div className="space-y-6 text-sm">
        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-heading text-slate-850 dark:text-white">1. Information Collection</h2>
          <p>
            At Exam Bangla, we prioritize your data privacy. If you run the application in Local Mock Mode, we do not store any of your private credentials or learning logs on our central servers. All indicators, bookmarks, test history, XP achievements, and streaks are written and read directly from your browser's local storage.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-heading text-slate-850 dark:text-white">2. Supabase Cloud Operations</h2>
          <p>
            If the application is connected to a live Supabase project instance, we store only your basic registration records (email, public username) and test metrics to synchronize dashboards across different browser sessions. Password credentials are encrypted securely using Supabase Auth.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-lg font-bold font-heading text-slate-850 dark:text-white">3. Third Party Integrations</h2>
          <p>
            We do not share, sell, or disclose your study logs, performance metrics, or emails with third-party analytical companies or advertising networks.
          </p>
        </section>
      </div>
    </div>
  );
}
