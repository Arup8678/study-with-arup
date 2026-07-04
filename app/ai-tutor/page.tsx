"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bot, Sparkles, Send, User, Zap, BookOpen, Shield, HelpCircle, ArrowLeft, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const PRESET_TOPICS = [
  { label: "WBP Constable Syllabus & Strategy", query: "What is the complete syllabus and 85 marks pattern for WBP Constable?" },
  { label: "Ancient Indian History Short Notes", query: "Give me short notes on Ancient History including Indus Valley and Maurya dynasty." },
  { label: "West Bengal Geography & Sundarbans", query: "What are the key geography facts for West Bengal state exams?" },
  { label: "Agniveer Army Physical & CEE Test", query: "Explain Agniveer Army CEE exam pattern and physical test details." },
  { label: "WB Panchayat Exam Rural Schemes", query: "List important rural development schemes for WB Panchayat exam." },
  { label: "Percentage & Profit/Loss Formulas", query: "Give me shortcut formulas for percentage and profit loss calculations." },
];

function getFullAIAnswer(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("wbp") || q.includes("constable")) {
    return `🛡️ **WBP Constable Complete Preparation Guide**\n\n` +
      `### 1. Selection Process Stages\n` +
      `- **Stage 1**: Written Examination (85 Marks - OMR MCQ)\n` +
      `- **Stage 2**: Physical Measurement Test (PMT) & Physical Efficiency Test (PET)\n` +
      `- **Stage 3**: Interview / Personality Test (15 Marks)\n` +
      `- **Stage 4**: Medical Examination & Police Verification\n\n` +
      `### 2. Written Exam Pattern (85 Marks | 60 Mins)\n` +
      `- **General Awareness & GK**: 25 Questions (25 Marks)\n` +
      `- **Elementary Mathematics**: 25 Questions (25 Marks)\n` +
      `- **Reasoning**: 25 Questions (25 Marks)\n` +
      `- **English**: 10 Questions (10 Marks)\n` +
      `- **Negative Marking**: 0.25 mark deducted per wrong answer.\n\n` +
      `💡 **Preparation Tip**: Focus heavily on WB Geography (Sandakphu, Sundarbans, Teesta river) and Class 10 Arithmetic. Target 55+ in written exam for safe merit list clearance!`;
  }

  if (q.includes("ancient") || q.includes("history")) {
    return `📜 **Ancient Indian History Master Notes**\n\n` +
      `### 1. Indus Valley Civilization (2500 BC – 1750 BC)\n` +
      `- Harappa (Dayaram Sahni, 1921), Mohenjo-daro (R.D. Banerjee, 1922).\n` +
      `- Port city: Lothal (Gujarat). Great Bath at Mohenjo-daro.\n\n` +
      `### 2. Vedic Period (1500 BC – 500 BC)\n` +
      `- Rigveda (1028 hymns), Sama Veda (Music), Yajur Veda (Rituals), Atharva Veda (Medicine).\n\n` +
      `### 3. Religious Movements\n` +
      `- Gautama Buddha: Enlightened at Bodh Gaya, first sermon at Sarnath.\n` +
      `- Mahavira: 24th Tirthankara of Jainism.\n\n` +
      `### 4. Empires\n` +
      `- Maurya Dynasty: Founded by Chandragupta Maurya & Chanakya. Ashoka's Kalinga War (261 BC).\n` +
      `- Gupta Dynasty: Samudragupta (Napoleon of India), Vikramaditya (Kalidasa).`;
  }

  if (q.includes("geography") || q.includes("sundarban") || q.includes("bengal")) {
    return `🌾 **West Bengal Geography & State Facts**\n\n` +
      `• **Area**: 88,752 sq km (13th largest state in India).\n` +
      `• **Districts**: 23 Districts | **Capital**: Kolkata.\n` +
      `• **Highest Peak**: Sandakphu (3,636 m) on Singalila Ridge.\n` +
      `• **Sundarbans**: UNESCO World Heritage Site (1987), largest mangrove forest delta.\n` +
      `• **State Symbols**: Animal = Fishing Cat (মেছো বিড়াল), Bird = White-throated Kingfisher, Flower = Night Jasmine (Shiuli), Tree = Chatim.\n` +
      `• **Major Rivers**: Ganga (Farakka Barrage), Teesta (Lifeline of North Bengal), Damodar (Sorrow of Bengal).`;
  }

  if (q.includes("army") || q.includes("agniveer")) {
    return `🪖 **Agniveer Army Exam Guidelines**\n\n` +
      `### CEE Exam Pattern (100 Marks | 60 Mins)\n` +
      `- **General Knowledge**: 15 Questions (30 Marks)\n` +
      `- **General Science**: 15 Questions (30 Marks)\n` +
      `- **Mathematics**: 15 Questions (30 Marks)\n` +
      `- **Logical Reasoning**: 5 Questions (10 Marks)\n` +
      `- **Negative Marking**: -0.5 per wrong answer.\n\n` +
      `### Physical Test Standard\n` +
      `- **1.6 km Run**: Group I (Under 5 min 30 sec = 60 Marks), Group II (5 min 31 sec to 5 min 45 sec = 48 Marks).\n` +
      `- **Pull Ups**: 10 Pull ups = 40 Marks. Total Physical = 100 Marks.`;
  }

  if (q.includes("panchayat") || q.includes("rural") || q.includes("scheme")) {
    return `🏛️ **WB Panchayat & Rural Development Notes**\n\n` +
      `• **Constitutional Mandate**: 73rd Constitutional Amendment (1992), Part IX, Schedule 11.\n` +
      `• **Article 40**: Organization of Village Panchayats.\n` +
      `• **3-Tier Structure**: Gram Panchayat (village), Panchayat Samiti (block), Zilla Parishad (district).\n` +
      `• **Key Schemes**: MGNREGA (100 days employment), PMGSY (Rural roads), PMAY-G (Rural housing), Lakshmir Bhandar, Kanyashree.`;
  }

  return `🤖 **Arup AI Study Assistant Response**:\n\n` +
    `Great question! To get maximum marks in West Bengal competitive exams:\n\n` +
    `1. Revise History, Geography, and Science fundamentals regularly.\n` +
    `2. Practice 10th level Mathematics daily (Percentage, Ratio, Time & Work).\n` +
    `3. Take full length Mock Tests on Study With Arup to improve speed and accuracy!`;
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "ai",
      text: "👋 Welcome to **Arup AI Tutor**! I am your AI study mentor for **WBP Constable**, **SSC GD**, **Agniveer Army**, and **WB Panchayat** exams. Ask me any doubt or select a topic below!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiReplyText = getFullAIAnswer(query);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20 pb-16 flex flex-col">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full flex-grow flex flex-col space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all">
              <ArrowLeft size={18} />
            </Link>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
              <Bot size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold font-heading text-white">Arup AI Exam Tutor</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30 flex items-center gap-1">
                  <Zap size={10} /> Powered by AI
                </span>
              </div>
              <p className="text-xs text-slate-400">Ask doubts, get syllabus explanations & formula shortcuts 24/7</p>
            </div>
          </div>
        </div>

        {/* Preset Topic Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PRESET_TOPICS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(item.query)}
              className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-blue-600/20 border border-slate-800 hover:border-blue-500/40 text-left transition-all group"
            >
              <span className="font-bold text-xs text-blue-400 group-hover:text-blue-300 block mb-1">{item.label}</span>
              <span className="text-[11px] text-slate-400 line-clamp-2">{item.query}</span>
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="flex-grow bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-6 flex flex-col min-h-[420px] max-h-[60vh] overflow-hidden shadow-2xl">
          <div ref={scrollRef} className="flex-grow overflow-y-auto space-y-4 pr-2 font-sans text-xs sm:text-sm">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                    <Bot size={18} />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl p-4 space-y-2 ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white font-medium rounded-br-none"
                    : "bg-slate-800 text-slate-100 border border-slate-700/60 rounded-bl-none leading-relaxed"
                }`}>
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  <span className={`text-[10px] block text-right font-mono ${msg.sender === "user" ? "text-blue-200" : "text-slate-400"}`}>
                    {msg.timestamp}
                  </span>
                </div>
                {msg.sender === "user" && (
                  <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                <Bot size={18} className="text-blue-500 animate-spin" />
                <span>Arup AI Tutor is preparing response...</span>
              </div>
            )}
          </div>

          {/* Form input */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="mt-4 flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-2xl p-2 focus-within:border-blue-500 transition-all"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question (e.g. WBP Constable exam syllabus, Ancient history notes)..."
              className="flex-grow bg-transparent px-4 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg flex-shrink-0"
            >
              <span>Send</span> <Send size={14} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
