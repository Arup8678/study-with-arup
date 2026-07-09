"use client";

import React from "react";
import Link from "next/link";

const EXAM_PILLS = [
  { id: "wbp-constable",  label: "WBP Constable",  emoji: "🛡️" },
  { id: "ssc-gd",         label: "SSC GD",          emoji: "⭐" },
  { id: "agniveer-army",  label: "Agniveer Army",   emoji: "🪖" },
  { id: "wb-panchayat",   label: "WB Panchayat",    emoji: "🏛️" },
  { id: "psc-miscellaneous", label: "PSC Miscellaneous", emoji: "💼" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ── CINEMATIC HERO ─────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/army-hero.png')" }}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

        {/* Subtle animated grain texture */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")" }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto space-y-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/80 text-xs font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            পশ্চিমবঙ্গ • West Bengal
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-heading text-white leading-none tracking-tight drop-shadow-2xl">
              Study With Arup
            </h1>
            <p className="text-lg sm:text-xl text-white/75 font-light tracking-wide">
              Prepare Smart. Serve India.
            </p>
          </div>

          {/* Tagline */}
          <p className="text-white/55 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Topic-wise notes, previous year questions and practice tests — focused on what actually comes in the exam.
          </p>

          {/* CTA */}
          <Link
            href="/exams"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-2xl text-sm font-bold shadow-2xl transition-all hover:scale-105 active:scale-100"
          >
            Choose Your Exam →
          </Link>

          {/* Exam Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {EXAM_PILLS.map(exam => (
              <Link
                key={exam.id}
                href={`/exams/${exam.id}`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold backdrop-blur-sm transition-all hover:scale-105"
              >
                <span>{exam.emoji}</span> {exam.label}
              </Link>
            ))}
          </div>

        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8FAFC] dark:from-[#0f172a] to-transparent" />
      </section>

    </div>
  );
}
