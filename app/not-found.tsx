"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 text-center bg-gradient-to-b from-blue-50/20 to-transparent dark:from-blue-950/10">
      
      {/* Decorative Blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      
      <div className="space-y-6 max-w-md relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto border border-amber-500/20">
          <AlertCircle size={32} />
        </div>
        
        <div className="space-y-2">
          <span className="text-4xl font-extrabold font-heading text-slate-800 dark:text-white block">404</span>
          <h1 className="text-xl font-bold font-heading text-slate-800 dark:text-white">Page Not Found</h1>
          <p className="text-sm text-slate-450 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/10 transition-all text-xs"
        >
          <ArrowLeft size={14} /> Back to Homepage
        </Link>
      </div>

    </div>
  );
}
