"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, User, MessageSquare, RefreshCw, Zap } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "🛡️ WBP Constable 85 marks strategy?",
  "📜 Ancient History short notes?",
  "🌾 WB Rivers & Sandakphu details?",
  "🪖 Agniveer Army physical standards?",
  "🏛️ WB Panchayat 73rd Amendment rules?",
  "🔢 Speed math tricks for percentage?"
];

// Offline fallback AI responses for competitive exams
function generateAIResponse(query: string): string {
  const q = query.toLowerCase();
  
  if (q.includes("wbp") || q.includes("constable")) {
    return `🛡️ **WBP Constable Exam Breakdown & Strategy**:\n\n` +
      `• **Written Exam**: 85 Marks (85 MCQs) | Duration: 60 mins | Negative: -0.25.\n` +
      `• **Subjects**: GK (25m), Maths (25m), Reasoning (25m), English (10m).\n` +
      `• **Interview**: 15 Marks after PMT & PET.\n\n` +
      `💡 **Pro Tip**: Focus heavily on WB Geography (Sandakphu, Sundarbans) and 10th level Arithmetic. Target 60+ marks for safe cutoff!`;
  }
  
  if (q.includes("history") || q.includes("ancient") || q.includes("revolt")) {
    return `📜 **Indian History Rapid Revision**:\n\n` +
      `• **Ancient**: Indus Valley (Harappa 1921, Mohenjo-daro 1922), Maurya (Ashoka Kalinga War 261 BC), Gupta (Samudragupta = Napoleon of India).\n` +
      `• **Medieval**: Delhi Sultanate (First Panipat 1526), Mughal Golden Age (Shah Jahan Taj Mahal), Bhakti Movement (Chaitanya Mahaprabhu in Bengal).\n` +
      `• **Modern**: 1857 Revolt (Mangal Pandey at Barrackpore), INC 1885 (A.O. Hume, W.C. Bonnerjee), Partition of Bengal 1905, Netaji Subhas Bose INA.`;
  }

  if (q.includes("geography") || q.includes("river") || q.includes("sundarban") || q.includes("bengal")) {
    return `🌾 **West Bengal & Indian Geography Essentials**:\n\n` +
      `• **Highest Peak of WB**: Sandakphu (3,636 m) on Singalila Ridge.\n` +
      `• **State Symbols**: Animal = Fishing Cat, Bird = White-throated Kingfisher, Flower = Night Jasmine (Shiuli), Tree = Chatim.\n` +
      `• **Sundarbans**: UNESCO World Heritage (1987), World's largest mangrove delta.\n` +
      `• **Major Rivers**: Ganga (enters at Farakka), Teesta (North Bengal lifeline), Damodar (Sorrow of Bengal).`;
  }

  if (q.includes("army") || q.includes("agniveer")) {
    return `🪖 **Agniveer Army Exam Guidelines**:\n\n` +
      `• **Common Entrance Exam (CEE)**: 50 Questions | 100 Marks | 60 Mins | Negative: -0.5.\n` +
      `• **Sections**: GK (15 Qs / 30m), General Science (15 Qs / 30m), Maths (15 Qs / 30m), Reasoning (5 Qs / 10m).\n` +
      `• **Physical Standard**: 1.6 km Run (Group I: 5 min 30 sec = 60 marks; Group II: 5 min 45 sec = 48 marks), Beam Push-ups (10 = 40 marks).`;
  }

  if (q.includes("panchayat") || q.includes("rural") || q.includes("73rd")) {
    return `🏛️ **WB Panchayat Exam Preparation Notes**:\n\n` +
      `• **Constitutional Basis**: 73rd Constitutional Amendment Act (1992), Part IX, Articles 243 to 243O, Schedule 11.\n` +
      `• **Article 40**: Directive Principles of State Policy (DPSP) for village panchayats.\n` +
      `• **Key WB Schemes**: MGNREGA (100 days work guarantee), Kanyashree, Lakshmir Bhandar, PMGSY (Rural Roads).`;
  }

  if (q.includes("math") || q.includes("percentage") || q.includes("profit") || q.includes("ratio")) {
    return `🔢 **Speed Math Shortcuts for Competitive Exams**:\n\n` +
      `1. **Percentage to Fraction**: 20% = 1/5, 25% = 1/4, 33.33% = 1/3, 50% = 1/2.\n` +
      `2. **Profit & Loss**: Profit% = (Profit ÷ CP) × 100. If SP is given with x% profit: CP = SP × 100 / (100 + x).\n` +
      `3. **LCM & HCF Formula**: Product of 2 numbers = HCF × LCM.`;
  }

  return `🤖 **Study With Arup AI Mentor**:\n\n` +
    `I can help you prepare for **WBP Constable**, **SSC GD**, **Agniveer Army**, and **WB Panchayat** exams!\n\n` +
    `Ask me about:\n` +
    `• Specific subject notes (History, Geography, Polity, Science, Maths)\n` +
    `• Exam pattern, negative marking & cutoff marks\n` +
    `• Shortcut tricks for competitive exam numericals!`;
}

export default function AITutorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-welcome",
      sender: "ai",
      text: "👋 Namaskar! I am **Arup AI Tutor**. Ask me any doubt about WBP Constable, SSC GD, Agniveer Army, WB Panchayat, or any GK & Math question!",
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

    // Simulate AI response stream
    setTimeout(() => {
      const aiReplyText = generateAIResponse(query);
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
    <>
      {/* Floating Widget Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-2xl hover:scale-105 transition-all group border border-white/20"
        aria-label="Ask Arup AI Tutor"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative">
          <Bot size={20} className="text-white animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
        </div>
        <span className="font-extrabold text-xs tracking-wide">Ask Arup AI</span>
        <Sparkles size={14} className="text-amber-300 group-hover:rotate-12 transition-transform" />
      </button>

      {/* AI Chat Drawer Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[92vw] sm:w-[420px] h-[540px] max-h-[80vh] z-50 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Drawer Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <Bot size={22} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-white text-sm">Arup AI Tutor</h3>
                  <span className="px-2 py-0.5 rounded-full text-[9px] bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30 flex items-center gap-1">
                    <Zap size={9} /> AI Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">24/7 Competitive Exam Doubts Solver</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick Prompt Carousel */}
          <div className="px-3 py-2 bg-slate-950/60 border-b border-slate-800/80 flex gap-2 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-blue-600/30 text-[11px] font-medium text-slate-300 border border-slate-700/60 transition-all whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div ref={scrollRef} className="flex-grow p-4 space-y-4 overflow-y-auto font-sans text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Bot size={15} />
                  </div>
                )}
                <div className={`max-w-[82%] rounded-2xl p-3.5 space-y-1.5 ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white font-medium rounded-br-none"
                    : "bg-slate-800/90 text-slate-200 border border-slate-700/50 rounded-bl-none leading-relaxed"
                }`}>
                  <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                  <span className={`text-[9px] block text-right font-mono ${msg.sender === "user" ? "text-blue-200" : "text-slate-400"}`}>
                    {msg.timestamp}
                  </span>
                </div>
                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-xl bg-slate-700 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                <Bot size={16} className="text-blue-500 animate-spin" />
                <span>Arup AI is thinking...</span>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2 bg-slate-900 border border-slate-750 rounded-2xl p-2 focus-within:border-blue-500 transition-all"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask any question or doubt..."
                className="flex-grow bg-transparent px-3 text-xs text-white placeholder-slate-500 outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white flex items-center justify-center transition-all flex-shrink-0 shadow-md"
              >
                <Send size={14} />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
