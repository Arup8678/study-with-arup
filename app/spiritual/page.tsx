import type { Metadata } from "next";
import Link from "next/link";
import { SPIRITUAL_SECTIONS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Spiritual: Meditation, Yoga & Spiritual Books | Study With RootX",
  description: "Learn meditation and yoga step by step, and read the Bhagavad Gita, Upanishads, Quran and books of great philosophers free online.",
};

export default function SpiritualHome() {
  return (
    <>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-indigo-700 text-white px-6 sm:px-10 py-10 shadow-xl">
        <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-yellow-200/20 blur-3xl" />
        <div className="relative space-y-3 max-w-2xl">
          <span className="inline-flex px-3 py-1 rounded-full bg-white/15 text-[11px] font-semibold tracking-widest uppercase">Free for everyone</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading leading-tight">🕉️ Spiritual Path</h1>
          <p className="text-white/85">আধ্যাত্মিক পথ — শান্ত মন, সুস্থ শরীর</p>
          <p className="text-white/90 text-sm sm:text-base">
            A calm mind helps in study and in life. Learn simple meditation and yoga, and explore the great scriptures and
            philosophies of the world with respect for every tradition.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SPIRITUAL_SECTIONS.map(s => (
          <Link
            key={s.href}
            href={s.href}
            className={`group rounded-2xl bg-gradient-to-br ${s.gradient} border border-slate-200/80 dark:border-slate-700/60 p-6 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col gap-3`}
          >
            <div className="w-12 h-12 rounded-xl bg-white/80 dark:bg-slate-800/60 flex items-center justify-center text-2xl shadow-sm">{s.emoji}</div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white text-lg">{s.title}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{s.titleBn}</p>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 flex-grow">{s.text}</p>
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 group-hover:underline">Start →</span>
          </Link>
        ))}
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Yoga and meditation here are for general well-being and are not medical advice. If you have a health condition, are pregnant or
        recovering from surgery, please consult a doctor first.
      </p>
    </>
  );
}
