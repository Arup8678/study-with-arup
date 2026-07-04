"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, BookOpen, Layers } from "lucide-react";
import { dbService } from "@/services/db";
import { Topic } from "@/types";

interface GKSection {
  id: string;
  name: string;
  description: string;
  emoji: string;
  subCategories?: { id: string; name: string; description: string; emoji: string }[];
  topicId?: string;
}

const GK_STRUCTURE: GKSection[] = [
  {
    id: "history",
    name: "History (ইতিহাস)",
    description: "Ancient History, Medieval History & Modern History",
    emoji: "📜",
    subCategories: [
      { id: "history-ancient", name: "Ancient History (প্রাচীন ভারত)", description: "Indus Valley, Vedic Period, Mauryas, Guptas, Buddhism & Jainism", emoji: "🏛️" },
      { id: "history-medieval", name: "Medieval History (মধ্যযুগীয় ভারত)", description: "Delhi Sultanate, Mughal Empire, Vijayanagara & Bhakti Movement", emoji: "🏰" },
      { id: "history-modern", name: "Modern History (আধুনিক ভারত)", description: "British Raj, 1857 Revolt, Freedom Struggle & Partition of Bengal", emoji: "🕊️" },
    ]
  },
  {
    id: "geography",
    name: "Geography (ভূগোল)",
    description: "Physical Geography, Geography of India & Geography of WB",
    emoji: "🗺️",
    subCategories: [
      { id: "geography-physical", name: "Physical Geography (ভৌত ভূগোল)", description: "Earth structure, Atmosphere, Landforms, Oceans & Climate", emoji: "🌐" },
      { id: "geography-india", name: "Geography of India (ভারতের ভূগোল)", description: "Himalayas, Rivers, Climate, Soil, Minerals & National Parks", emoji: "🇮🇳" },
      { id: "geography-wb", name: "Geography of WB (পশ্চিমবঙ্গের ভূগোল)", description: "Physiography, Rivers, Districts, Climate & Sundarbans", emoji: "🌾" },
    ]
  },
  {
    id: "polity",
    name: "Polity (রাষ্ট্রবিজ্ঞান)",
    description: "Indian Constitution, Fundamental Rights, Parliament & Panchayati Raj",
    emoji: "🏛️",
    topicId: "indian-polity-constitution"
  },
  {
    id: "science",
    name: "General Science (সাধারণ বিজ্ঞান)",
    description: "Physics, Chemistry and Biology",
    emoji: "🔬",
    subCategories: [
      { id: "science-physics", name: "Physics (পদার্থবিদ্যা)", description: "Mechanics, Newton's Laws, Optics, Sound, Heat & Electricity", emoji: "⚡" },
      { id: "science-chemistry", name: "Chemistry (রসায়ন)", description: "Matter, Atomic Structure, Periodic Table, Acids & Bases", emoji: "🧪" },
      { id: "science-biology", name: "Biology (জীববিজ্ঞান)", description: "Cell Biology, Human Anatomy, Plant Physiology & Diseases", emoji: "🧬" },
    ]
  },
  {
    id: "economics",
    name: "Economics (অর্থনীতি)",
    description: "Indian Economy, Five-Year Plans, RBI, Banking & Budget",
    emoji: "📊",
    topicId: "indian-economics-main"
  },
  {
    id: "static-gk",
    name: "Static GK (স্ট্যাটিক জিকে)",
    description: "Books & Authors, First in India/WB, Sports, Awards & Days",
    emoji: "💡",
    topicId: "static-gk-main"
  }
];

export default function PrepareSubjectPage({ params }: { params: { id: string; subId: string } }) {
  const examId = params?.id;
  const subId = params?.subId;
  const router = useRouter();
  const [subjectName, setSubjectName] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeGKCategory, setActiveGKCategory] = useState<GKSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subId || !examId) return;
    dbService.getSubjectById(subId).then(sub => {
      if (!sub) { router.push(`/exams/${examId}/prepare`); return; }
      setSubjectName(sub.name);
      dbService.getTopicsBySubject(subId).then(t => { setTopics(t); setLoading(false); });
    });
  }, [examId, subId, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  const isGK = subId === "gk-general" || subId === "gk-panchayat";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Breadcrumb / Back Link */}
        {activeGKCategory ? (
          <button
            onClick={() => setActiveGKCategory(null)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to GK Tabs
          </button>
        ) : (
          <Link href={`/exams/${examId}/prepare`} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            ← Subjects
          </Link>
        )}

        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
            {activeGKCategory ? activeGKCategory.name : (isGK ? "General Knowledge" : subjectName)}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {activeGKCategory ? activeGKCategory.description : "Select a section to read notes or practice mock tests."}
          </p>
        </div>

        {/* SPECIAL STRUCTURE FOR GENERAL KNOWLEDGE (6 TABS & SUB-SECTIONS) */}
        {isGK && !activeGKCategory && (
          <div className="space-y-3">
            {GK_STRUCTURE.map(cat => (
              <div
                key={cat.id}
                onClick={() => {
                  if (cat.subCategories) {
                    setActiveGKCategory(cat);
                  } else if (cat.topicId) {
                    router.push(`/exams/${examId}/prepare/${subId}/${cat.topicId}`);
                  }
                }}
                className="group cursor-pointer flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-2xl flex-shrink-0">
                  {cat.emoji}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-slate-900 dark:text-white text-sm">{cat.name}</h2>
                    {cat.subCategories && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold">
                        {cat.subCategories.length} Sub-tabs
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{cat.description}</p>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </div>
            ))}
          </div>
        )}

        {/* NESTED SUB-CATEGORIES (e.g. Ancient, Medieval, Modern History) */}
        {isGK && activeGKCategory && activeGKCategory.subCategories && (
          <div className="space-y-3">
            {activeGKCategory.subCategories.map(subCat => (
              <Link
                key={subCat.id}
                href={`/exams/${examId}/prepare/${subId}/${subCat.id}`}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xl flex-shrink-0">
                  {subCat.emoji}
                </div>
                <div className="flex-grow min-w-0">
                  <h2 className="font-bold text-slate-900 dark:text-white text-sm">{subCat.name}</h2>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{subCat.description}</p>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}

        {/* STANDARD NON-GK SUBJECT TOPICS LIST */}
        {!isGK && (
          <div className="space-y-3">
            {topics.length > 0 ? topics.map(topic => (
              <Link
                key={topic.id}
                href={`/exams/${examId}/prepare/${subId}/${topic.id}`}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} />
                </div>
                <div className="flex-grow min-w-0">
                  <h2 className="font-semibold text-slate-900 dark:text-white text-sm">{topic.name}</h2>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{topic.description}</p>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </Link>
            )) : (
              <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 space-y-2">
                <BookOpen size={36} className="mx-auto text-slate-300" />
                <p className="text-sm text-slate-400">No topics added yet.</p>
                <Link href="/admin" className="text-blue-500 text-xs hover:underline">Add topics via Admin Panel →</Link>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
