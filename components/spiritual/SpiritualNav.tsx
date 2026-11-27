"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/spiritual", label: "Overview" },
  { href: "/spiritual/meditation", label: "🧘 Meditation" },
  { href: "/spiritual/yoga", label: "🌅 Yoga" },
  { href: "/spiritual/books", label: "📚 Books" },
  { href: "/spiritual/osho", label: "🌸 Osho" },
];

export default function SpiritualNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
      {TABS.map(t => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border whitespace-nowrap transition-all ${
              active
                ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-400"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
