import { AlertTriangle, Timer } from "lucide-react";
import type { Practice } from "@/lib/catalog";

export default function PracticeCard({ p, index }: { p: Practice; index?: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white leading-snug">
            {index !== undefined && <span className="text-slate-400 mr-1">{index + 1}.</span>}
            {p.name}
          </h3>
          {p.nameBn && <p className="text-xs text-slate-500 dark:text-slate-400">{p.nameBn}</p>}
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
          <Timer size={12} /> {p.time}
        </span>
      </div>
      <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
        {p.steps.map(s => <li key={s}>{s}</li>)}
      </ol>
      <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">✨ {p.benefit}</p>
      {p.caution && (
        <p className="flex gap-1.5 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-2">
          <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" /> {p.caution}
        </p>
      )}
    </div>
  );
}
