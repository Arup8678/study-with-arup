import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { BOOK_SHELVES } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Spiritual Books Library: Gita, Upanishads, Quran & Philosophers | Study With RootX",
  description: "Read the Bhagavad Gita, Vedas, Upanishads, Ramayana, Mahabharata, the Quran, Dhammapada, Guru Granth Sahib and great philosophers free online.",
};

export default function BooksPage() {
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">📚 Spiritual Books Library</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">আধ্যাত্মিক গ্রন্থাগার — বিনামূল্যে অনলাইনে পড়ুন</p>
        <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl">
          The great scriptures and philosophies of the world, presented with equal respect. Every link opens a free,
          trusted source (public-domain or freely available editions), so you can read online or download.
        </p>
      </div>

      {/* Shelf jump links */}
      <div className="flex flex-wrap gap-2">
        {BOOK_SHELVES.map(s => (
          <a key={s.id} href={`#${s.id}`} className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700">
            {s.emoji} {s.title}
          </a>
        ))}
      </div>

      {BOOK_SHELVES.map(shelf => (
        <section key={shelf.id} id={shelf.id} className="space-y-4 scroll-mt-24">
          <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white">
            {shelf.emoji} {shelf.title} <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">· {shelf.titleBn}</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {shelf.books.map(b => (
              <article key={b.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{b.title}</h3>
                  {(b.titleBn || b.author) && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">{[b.titleBn, b.author].filter(Boolean).join(" · ")}</p>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 flex-grow">{b.about}</p>
                <ul className="space-y-1.5">
                  {b.links.map(l => (
                    <li key={l.href + l.label}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
                        <ExternalLink size={13} /> {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ))}

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Study With RootX does not host these books. Links go to external free libraries such as Project Gutenberg, Wikisource,
        Internet Archive, Sacred-Texts, Gita Supersite (IIT Kanpur), Quran.com and SearchGurbani. Want a book added? Contact us.
      </p>
    </>
  );
}
