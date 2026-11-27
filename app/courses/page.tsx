import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { IDO_COURSE } from "@/lib/course";
import { TECH_COURSES } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Courses: PSC IDO, AI, Cybersecurity, Web Development | Study With RootX",
  description: "All Study With RootX courses: WBPSC IDO exam course plus upcoming AI, Cybersecurity and Full-Stack Web Development (Frontend, Backend, Database) courses.",
};

export default function CoursesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2">
          <GraduationCap size={30} className="text-blue-500" /> Our Courses
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">
          Government exam preparation and job-ready tech skills, in simple English and Bengali. আমাদের সব কোর্স এক জায়গায়।
        </p>
      </div>

      {/* Exam course */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Exam Preparation</h2>
        <Link
          href="/courses/psc-ido"
          className="group block relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 text-white p-6 shadow-lg hover:-translate-y-1 transition-all"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-rose-600 text-[10px] font-black uppercase tracking-widest">Enrolling now</span>
              <h3 className="mt-2 text-xl font-extrabold font-heading">🏭 {IDO_COURSE.title}</h3>
              <p className="text-white/85 text-sm">Notes, 925+ MCQs and 10 full mock tests</p>
            </div>
            <div className="text-right">
              <div className="text-white/75 line-through text-sm">₹{IDO_COURSE.regularPrice}</div>
              <div className="text-3xl font-black">₹{IDO_COURSE.offerPrice}</div>
            </div>
          </div>
        </Link>
      </section>

      {/* Tech courses */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tech Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TECH_COURSES.map(c => (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col"
            >
              <div className={`bg-gradient-to-br ${c.gradient} px-5 py-6 text-white`}>
                <div className="text-4xl">{c.emoji}</div>
                <h3 className="mt-3 font-extrabold font-heading text-lg leading-snug">{c.title}</h3>
                <p className="text-white/80 text-xs">{c.titleBn}</p>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                <p className="text-sm text-slate-600 dark:text-slate-300">{c.tagline}</p>
                <div className="flex items-center justify-between">
                  {c.status === "coming-soon" ? (
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">Coming soon</span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Live</span>
                  )}
                  <span className={`text-sm font-bold ${c.accent} group-hover:underline`}>View syllabus →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold font-heading text-lg text-slate-900 dark:text-white">🕉️ Looking for peace of mind?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">Free meditation, yoga and a spiritual books library. ধ্যান, যোগ ও আধ্যাত্মিক বই।</p>
        </div>
        <Link href="/spiritual" className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors">
          Explore Spiritual →
        </Link>
      </section>
    </div>
  );
}
