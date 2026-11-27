import type { Metadata } from "next";
import PracticeCard from "@/components/spiritual/PracticeCard";
import { MEDITATIONS, MEDITATION_PLAN } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Learn Meditation (ধ্যান) Step by Step | Study With RootX",
  description: "Beginner meditation guide: breath awareness, body scan, mantra japa and loving-kindness, with a 7-day starter plan.",
};

const TIPS = [
  "Same time, same place every day. Early morning is best.",
  "Start with only 5 minutes. Consistency matters more than length.",
  "Keep the phone on silent and away from you.",
  "A wandering mind is normal. Bringing it back IS the practice.",
];

export default function MeditationPage() {
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">🧘 Learn Meditation</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">ধ্যান শিখুন — প্রতিদিন মাত্র ১০ মিনিট</p>
        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl">
          Meditation is training the attention. It reduces stress, improves memory and focus, and helps you sleep better.
          These four practices come from Indian and world traditions and need no equipment.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {MEDITATIONS.map((m, i) => <PracticeCard key={m.name} p={m} index={i} />)}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <h2 className="font-extrabold font-heading text-slate-900 dark:text-white">📅 7-Day Starter Plan</h2>
          <ul className="space-y-2">
            {MEDITATION_PLAN.map(d => (
              <li key={d.day} className="flex gap-3 text-sm">
                <span className="w-20 flex-shrink-0 font-bold text-indigo-600 dark:text-indigo-400">{d.day}</span>
                <span className="text-slate-700 dark:text-slate-300">{d.task}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-5 space-y-3">
          <h2 className="font-extrabold font-heading text-slate-900 dark:text-white">💡 Tips for Beginners</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
            {TIPS.map(t => <li key={t}>{t}</li>)}
          </ul>
        </section>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-5 text-sm text-slate-500 dark:text-slate-400">
        🎧 Guided audio and video sessions in Bengali are coming soon.
      </div>
    </>
  );
}
