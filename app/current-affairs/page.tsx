"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Search, FileText, Download, Sparkles, Award } from "lucide-react";

export default function CurrentAffairsPage() {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">("daily");
  const [search, setSearch] = useState("");

  const bulletPoints = [
    {
      id: 1,
      title: "West Bengal Government launches 'Sobuj Sathi' extension cycle schemes",
      desc: "The Department of School Education announced an extension to cover technical school students in rural subdivisions.",
      category: "West Bengal Specific",
      date: "03 July 2026",
      tag: "WB Schemes"
    },
    {
      id: 2,
      title: "India partners with Germany for clean energy corridors and green hydrogen projects",
      desc: "A bilateral pact signed in Berlin sets targets for carbon neutrality with special focus on offshore wind farms.",
      category: "National News",
      date: "02 July 2026",
      tag: "Bilateral"
    },
    {
      id: 3,
      title: "CV Ananda Bose inaugurates rural development seminar in Kolkata",
      desc: "Focus areas include self-help groups (SHG), credit linkages, and promotion of Terracotta crafts in Bankura.",
      category: "West Bengal Specific",
      date: "30 June 2026",
      tag: "Rural Development"
    },
    {
      id: 4,
      title: "United Nations Environment Program awards Kolkata Municipal Corporation for waste recycling",
      desc: "The city municipal waste-to-energy conversion systems were cited as a model for developing Asian cities.",
      category: "International Awards",
      date: "28 June 2026",
      tag: "UNEP Award"
    }
  ];

  const pdfDownloads = [
    { title: "Monthly Current Affairs Digest - June 2026", size: "2.4 MB", type: "Monthly" },
    { title: "Weekly Revision Bulletins - Week 4 (June 2026)", size: "1.2 MB", type: "Weekly" },
    { title: "West Bengal Budget & Special Schemes Capsule 2026", size: "3.1 MB", type: "Special" },
    { title: "Daily GK Digest Sheets - July Week 1", size: "850 KB", type: "Daily" }
  ];

  const filteredNews = bulletPoints.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      
      {/* Title */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
          <Calendar size={28} className="text-blue-500" />
          Current Affairs Hub (সাম্প্রতিক ঘটনা)
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
          Stay updated with local and national events. Download monthly revision capsules and practice current affairs questions.
        </p>
      </div>

      {/* Main Grid: Left news timeline, Right PDF downloads list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: News Feed */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
            <div className="flex gap-2">
              {(["daily", "weekly", "monthly"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                      : "bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative flex-grow max-w-xs">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bulletins..."
                className="w-full bg-slate-50 dark:bg-slate-900/60 rounded-xl py-1.5 pl-8 pr-3 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 text-xs text-slate-800 dark:text-white transition-all"
              />
            </div>
          </div>

          {/* Timeline listing */}
          <div className="space-y-4">
            {filteredNews.map((news) => (
              <div 
                key={news.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-premium flex flex-col justify-between gap-3 text-left relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                      {news.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{news.date}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-850 dark:text-white leading-snug">{news.title}</h3>
                  <p className="text-xs text-slate-450 dark:text-slate-400 leading-relaxed mt-1.5">{news.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Tag: <b className="text-slate-650 dark:text-slate-350">{news.tag}</b></span>
                  <Link href="/quiz/quiz-today" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-0.5">
                    Practice GK Quiz →
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side: Downloadable Capsules */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-6 rounded-2xl shadow-premium space-y-6">
          <div>
            <h3 className="font-heading font-bold text-base text-slate-850 dark:text-white flex items-center gap-1.5">
              <FileText size={18} className="text-indigo-500" />
              Download Study PDFs
            </h3>
            <p className="text-[11px] text-slate-450 mt-1">Get comprehensive capsules offline to revise at your own pace.</p>
          </div>

          <div className="space-y-3">
            {pdfDownloads.map((pdf, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-700/65 bg-slate-50/50 dark:bg-slate-900/20 flex items-center justify-between gap-4"
              >
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">{pdf.type} CAPSULE</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{pdf.title}</span>
                  <span className="text-[10px] text-slate-400 block">{pdf.size}</span>
                </div>
                
                {/* Download trigger */}
                <button
                  onClick={() => alert(`Starting download for: ${pdf.title}`)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/10 transition-all flex-shrink-0"
                  aria-label={`Download ${pdf.title}`}
                >
                  <Download size={14} />
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
