"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, User, Calendar, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { dbService } from "@/services/db";
import { BlogItem } from "@/types";

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    dbService.getBlogBySlug(slug).then(data => {
      if (!data) {
        router.push("/blog");
        return;
      }
      setBlog(data);
      setLoading(false);
    });
  }, [slug, router]);

  if (loading || !blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-400">
        Loading article details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 text-left">
      
      {/* Back button */}
      <Link 
        href="/blog" 
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
      >
        <ArrowLeft size={14} /> Back to all bulletins
      </Link>

      {/* Article Header */}
      <div className="space-y-4 border-b border-slate-200/60 dark:border-slate-800 pb-6">
        <span className="inline-block px-3 py-1 rounded-md text-[10px] bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
          {blog.category}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-white leading-tight">
          {blog.title}
        </h1>
        
        {/* Meta items */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <User size={14} /> By {blog.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {blog.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {blog.readTime}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <article className="prose prose-slate dark:prose-invert max-w-none text-slate-750 dark:text-slate-350 leading-relaxed space-y-4 whitespace-pre-line bg-white dark:bg-slate-800/40 p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/30 shadow-sm font-sans">
        {blog.content}
      </article>

      {/* Tags section */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
        {blog.tags.map((tag, idx) => (
          <span 
            key={idx}
            className="px-3 py-1 rounded-lg text-xs bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-semibold"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Prep CTA block */}
      <div className="p-6 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-lg flex items-center gap-1.5">
            <Sparkles size={18} className="text-amber-300" /> Start Preparing Immediately!
          </h3>
          <p className="text-xs text-blue-100 leading-relaxed">
            Practice interactive mock test series and track your progress in real-time.
          </p>
        </div>
        <Link
          href="/mock-tests"
          className="px-6 py-3 bg-white hover:bg-slate-100 text-blue-600 rounded-xl text-xs font-bold transition-all shadow-md flex-shrink-0 flex items-center gap-1 group"
        >
          Explore Mock Tests
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
