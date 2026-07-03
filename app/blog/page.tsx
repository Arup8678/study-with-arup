"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Search, Clock, ArrowRight, User } from "lucide-react";
import { dbService } from "@/services/db";
import { BlogItem } from "@/types";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogItem[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    dbService.getBlogs().then(data => {
      setBlogs(data);
      setFilteredBlogs(data);
    });
  }, []);

  useEffect(() => {
    let result = blogs;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(b => b.title.toLowerCase().includes(q) || b.description.toLowerCase().includes(q));
    }

    if (activeCategory !== "All") {
      result = result.filter(b => b.category === activeCategory);
    }

    setFilteredBlogs(result);
  }, [search, activeCategory, blogs]);

  const categories = ["All", "Recruitment", "Exam Prep", "Study Guide", "Success Story"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      
      {/* Title */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
          <FileText size={28} className="text-blue-500" />
          Prep Guide & Notification Bulletin
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
          Get official bulletins about West Bengal recruitment processes, important exam dates, and proven syllabus strategy guides.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
        
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bulletins and prep tips..."
            className="w-full bg-slate-50 dark:bg-slate-900/60 rounded-xl py-2 pl-9 pr-3 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 text-xs text-slate-800 dark:text-white transition-all"
          />
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-750 dark:text-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-10 text-slate-400 bg-white dark:bg-slate-800 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
          No articles match your selection. Clear query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBlogs.map((blog) => (
            <article 
              key={blog.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 shadow-premium hover:shadow-premium-hover transition-all flex flex-col justify-between gap-5 text-left group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-650 dark:text-blue-400 font-bold uppercase tracking-wider">
                    {blog.category}
                  </span>
                  <span className="text-slate-400 font-semibold">{blog.date}</span>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-slate-850 dark:text-white leading-snug group-hover:text-blue-650 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-450 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">{blog.description}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-700/60 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock size={12} />
                  <span>{blog.readTime}</span>
                </div>
                
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                >
                  Read Article
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
}
