import type { Metadata } from "next";
import PracticeCard from "@/components/spiritual/PracticeCard";
import { ASANAS, PRANAYAMA, SURYA_NAMASKAR } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Learn Yoga (যোগ): Asanas, Surya Namaskar, Pranayama | Study With RootX",
  description: "Beginner yoga guide with simple asanas, the 12 steps of Surya Namaskar and pranayama breathing, with safety notes.",
};

const RULES = [
  "Practise on an empty stomach (2–3 hours after a meal).",
  "Use a mat or a folded blanket on a flat floor.",
  "Move slowly. Never force a pose or feel sharp pain.",
  "Breathe through the nose unless told otherwise.",
  "End every session with 5 minutes of Shavasana.",
];

export default function YogaPage() {
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">🌅 Learn Yoga</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">যোগ শিখুন — সুস্থ শরীর, শান্ত মন</p>
        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl">
          A 20-minute daily routine for beginners: warm up with Surya Namaskar, do five basic asanas, then two or three
          pranayama practices.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-5 space-y-3">
        <h2 className="font-extrabold font-heading text-slate-900 dark:text-white">☀️ Surya Namaskar (সূর্য নমস্কার): 12 steps</h2>
        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 list-decimal pl-5 text-sm text-slate-700 dark:text-slate-300">
          {SURYA_NAMASKAR.map(s => <li key={s}>{s}</li>)}
        </ol>
        <p className="text-xs text-slate-500 dark:text-slate-400">Repeat leading with the left leg to complete one round. Start with 2–4 rounds.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Basic Asanas</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {ASANAS.map((a, i) => <PracticeCard key={a.name} p={a} index={i} />)}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pranayama (Breathing)</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {PRANAYAMA.map((p, i) => <PracticeCard key={p.name} p={p} index={i} />)}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
        <h2 className="font-extrabold font-heading text-slate-900 dark:text-white">✅ Safety Rules</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
          {RULES.map(r => <li key={r}>{r}</li>)}
        </ul>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          This is general guidance, not medical advice. If you have a medical condition, consult a doctor or a qualified yoga teacher first.
        </p>
      </section>

      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-5 text-sm text-slate-500 dark:text-slate-400">
        🎥 Photos and video demonstrations for each pose are coming soon.
      </div>
    </>
  );
}
