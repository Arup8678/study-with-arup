import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, BarChart3, BellRing } from "lucide-react";
import { TECH_COURSES, getTechCourse } from "@/lib/catalog";
import { IDO_COURSE } from "@/lib/course";

export function generateStaticParams() {
  return TECH_COURSES.map(c => ({ slug: c.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getTechCourse(params.slug);
  if (!c) return {};
  return {
    title: `${c.title} Course | Study With RootX`,
    description: c.description,
  };
}

export default function TechCoursePage({ params }: { params: { slug: string } }) {
  const c = getTechCourse(params.slug);
  if (!c) notFound();

  const notifyText = `Hi, I am interested in the ${c.title} course on Study With RootX. Please notify me when it starts.`;
  const notifyHref = `https://wa.me/91${IDO_COURSE.supportPhone}?text=${encodeURIComponent(notifyText)}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link href="/courses" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white">
        <ArrowLeft size={15} /> All courses
      </Link>

      {/* Hero */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${c.gradient} text-white px-6 sm:px-10 py-8 sm:py-10 shadow-xl`}>
        <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative space-y-3">
          {c.status === "coming-soon" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-300 text-slate-900 text-[11px] font-black tracking-widest uppercase">
              <Clock size={12} /> Coming soon
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading leading-tight">{c.emoji} {c.title}</h1>
          <p className="text-white/80">{c.titleBn}</p>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl">{c.description}</p>
          <div className="flex flex-wrap gap-3 pt-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 border border-white/20"><BarChart3 size={13} /> {c.level}</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 border border-white/20"><Clock size={13} /> {c.duration}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Syllabus */}
        <div className="md:col-span-3 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Planned Syllabus</h2>
          <ol className="space-y-3">
            {c.modules.map((m, i) => (
              <li key={m.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-black ${c.accent}`}>{i + 1}</span>
                  <h3 className="font-bold text-slate-900 dark:text-white">{m.title}</h3>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {m.topics.map(t => (
                    <li key={t} className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300">{t}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-sm">
            <h2 className="font-extrabold font-heading text-slate-900 dark:text-white">What you will learn</h2>
            <ul className="space-y-2.5">
              {c.outcomes.map(o => (
                <li key={o} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" /> {o}
                </li>
              ))}
            </ul>
            <a
              href={notifyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold transition-colors"
            >
              <BellRing size={16} /> Notify me on WhatsApp
            </a>
            <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
              Enrollment opens soon. Message us and we will tell you the start date and fee first.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tools you will use</h2>
            <div className="flex flex-wrap gap-2">
              {c.tools.map(t => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200">{t}</span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Start free today</h2>
            <ul className="space-y-2">
              {c.freeResources.map(r => (
                <li key={r.href}>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className={`text-sm font-semibold ${c.accent} hover:underline`}>{r.label} ↗</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
