"use client";

import React from "react";
import Link from "next/link";
import IdoCourseBanner from "@/components/IdoCourseBanner";
import { IDO_COURSE } from "@/lib/course";

const EXAM_PILLS = [
  { id: "wbp-constable",  label: "WBP Constable",  emoji: "🛡️" },
  { id: "ssc-gd",         label: "SSC GD",          emoji: "⭐" },
  { id: "agniveer-army",  label: "Agniveer Army",   emoji: "🪖" },
  { id: "wb-panchayat",   label: "WB Panchayat",    emoji: "🏛️" },
  { id: "psc-miscellaneous", label: "PSC Miscellaneous", emoji: "💼" },
  { id: "psc-ido",        label: "PSC IDO",         emoji: "🏭" },
];

const IDO_SUBJECTS = [
  { name: "Mental Ability & Arithmetic",          marks: 20 },
  { name: "English",                              marks: 15 },
  { name: "Environment, Energy & Renewables",     marks: 15 },
  { name: "Physical Science",                     marks: 15 },
  { name: "Industrial Scenario of West Bengal",   marks: 15 },
  { name: "Industrial Safety & Pollution Control", marks: 10 },
  { name: "Computer Knowledge",                   marks: 10 },
];

const IDO_FACTS = [
  { label: "Vacancies",   value: "247" },
  { label: "Questions",   value: "100 MCQ" },
  { label: "Duration",    value: "90 min" },
  { label: "Negative",    value: "−0.25" },
];

const IDO_DATES = [
  { label: "Apply online",           value: "6 – 26 Nov 2026 (till 3 PM)" },
  { label: "Edit / document upload", value: "27 Nov – 2 Dec 2026" },
  { label: "Exam date",              value: "To be announced" },
];

const IDO_LINKS = [
  { href: "/exams/psc-ido",          label: "Exam Overview" },
  { href: "/exams/psc-ido/syllabus", label: "Syllabus" },
  { href: "/exams/psc-ido/prepare",  label: "Start Preparing" },
  { href: "/exams/psc-ido/news",     label: "Notifications" },
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
              Study With RootX
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

          {/* Course offer pill */}
          <div>
            <Link
              href="/courses/psc-ido"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-600 text-white text-xs sm:text-sm font-bold shadow-lg hover:scale-105 transition-transform"
            >
              🔥 New: PSC IDO Course <span className="line-through opacity-75">₹{IDO_COURSE.regularPrice}</span> ₹{IDO_COURSE.offerPrice} →
            </Link>
          </div>

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

      {/* ── PAID COURSE AD ─────────────────────────── */}
      <IdoCourseBanner />

      {/* ── PSC IDO SECTION ─────────────────────────── */}
      <section id="psc-ido" className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">

            {/* Header */}
            <div className="bg-gradient-to-br from-teal-600 to-cyan-700 px-6 sm:px-10 py-8 sm:py-10 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[11px] font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Applications open • Advt. No. 15/2024
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold font-heading leading-tight">
                🏭 WBPSC Industrial Development Officer
              </h2>
              <p className="mt-1 text-white/80 text-sm sm:text-base">
                শিল্প উন্নয়ন আধিকারিক (IDO) — Department of MSME &amp; Textiles, Govt. of West Bengal
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {IDO_FACTS.map(f => (
                  <div key={f.label} className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3">
                    <div className="text-xl sm:text-2xl font-bold">{f.value}</div>
                    <div className="text-[11px] uppercase tracking-wider text-white/70">{f.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="grid md:grid-cols-5 gap-8 px-6 sm:px-10 py-8">

              {/* Subject-wise marks */}
              <div className="md:col-span-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                  Subject-wise Marks (Written — 100)
                </h3>
                <ul className="space-y-3">
                  {IDO_SUBJECTS.map(sub => (
                    <li key={sub.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-800 dark:text-slate-200">{sub.name}</span>
                        <span className="font-semibold text-teal-700 dark:text-teal-400">{sub.marks}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" style={{ width: `${sub.marks * 5}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                  Followed by a Personality Test of 15 marks. Final merit is out of 115.
                </p>
              </div>

              {/* Dates + links */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                    Important Dates
                  </h3>
                  <ul className="space-y-3">
                    {IDO_DATES.map(d => (
                      <li key={d.label} className="rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-3">
                        <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">{d.label}</div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{d.value}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {IDO_LINKS.map((l, i) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={
                        i === 2
                          ? "text-center px-4 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold transition-colors"
                          : "text-center px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-semibold transition-colors"
                      }
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>

                <a
                  href="https://psc.wb.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline"
                >
                  Apply on the official WBPSC website ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
