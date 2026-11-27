import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { OSHO_ABOUT, OSHO_OFFICIAL, OSHO_TOPICS, OSHO_STARTER_BOOKS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Osho: Books, Videos & Meditations (ওশো) | Study With RootX",
  description: "Explore Osho's talks, books, videos and meditations through the official Osho library and channels.",
};

export default function OshoPage() {
  return (
    <>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-fuchsia-600 to-indigo-700 text-white px-6 sm:px-10 py-10 shadow-xl">
        <div className="relative space-y-3 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading">🌸 Osho</h1>
          <p className="text-white/85">ওশো — বই, ভিডিও ও ধ্যান</p>
          <p className="text-white/90 text-sm sm:text-base">{OSHO_ABOUT}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-900/10 p-4 text-sm text-amber-800 dark:text-amber-300">
        Osho&apos;s books, talks and videos are protected by copyright (Osho International Foundation). To respect this, we link to
        the <b>official</b> sources below instead of hosting any books, PDFs or videos on this site.
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {OSHO_OFFICIAL.map(o => (
          <section key={o.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col gap-3">
            <div className="text-3xl">{o.emoji}</div>
            <h2 className="font-bold text-slate-900 dark:text-white">{o.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 flex-grow">{o.text}</p>
            <ul className="space-y-1.5">
              {o.links.map(l => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-700 dark:text-rose-400 hover:underline">
                    <ExternalLink size={13} /> {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Popular topics</h2>
        <div className="flex flex-wrap gap-2">
          {OSHO_TOPICS.map(t => (
            <span key={t} className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-xs font-semibold text-rose-700 dark:text-rose-300">{t}</span>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Where to start (find these in the official library or bookstores)</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {OSHO_STARTER_BOOKS.map(b => (
            <div key={b.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <h3 className="font-bold text-slate-900 dark:text-white">{b.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{b.about}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
