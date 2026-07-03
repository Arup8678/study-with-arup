"use client";

import React from "react";
import { BookOpen, ShieldCheck, Heart, Sparkles, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12 text-left">
      
      {/* Title */}
      <div className="space-y-3 text-center border-b border-slate-200/60 dark:border-slate-800 pb-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-md">
          <BookOpen size={24} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
          About Exam Bangla
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
          West Bengal's student-centric prep platform designed to build confidence, speed, and accuracy for state competitive recruitments.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 leading-relaxed text-slate-700 dark:text-slate-300">
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Our Mission</h2>
          <p className="text-sm">
            Exam Bangla was built with a simple goal: to democratize high-quality preparation materials for aspirants across every district in West Bengal. Competitive exams like WBCS, Food SI, Police, and Clerkship require structured study schedules, targeted topic revisions, and realistic mock simulators.
          </p>
          <p className="text-sm">
            We provide a modern, fast, and responsive digital dashboard that removes the complexity of preparing, letting you focus entirely on your core syllabus topics.
          </p>
        </section>

        {/* Feature highlights grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          {[
            {
              title: "Expert Curated MCQs",
              desc: "Questions are formulated by top educators based on the exact PSC and police recruitment blueprints.",
              icon: Award,
              color: "text-amber-500"
            },
            {
              title: "Bilingual Standard",
              desc: "Study notes and quiz options are provided in English and Bengali to match the actual exam formats.",
              icon: Sparkles,
              color: "text-blue-500"
            },
            {
              title: "Offline Mock Mode",
              desc: "Take quizzes immediately. If Supabase config is missing, data is preserved locally on your machine.",
              icon: ShieldCheck,
              color: "text-emerald-500"
            },
            {
              title: "Student Growth Focus",
              desc: "Streaks, XP, and badges encourage daily consistency, making learning engaging and gamified.",
              icon: Heart,
              color: "text-red-500"
            }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-805 border border-slate-200/80 dark:border-slate-700/60 shadow-sm space-y-3"
              >
                <div className={`w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center ${feat.color}`}>
                  <Icon size={18} />
                </div>
                <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100">{feat.title}</h3>
                <p className="text-xs text-slate-450 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </section>

      </div>

    </div>
  );
}
