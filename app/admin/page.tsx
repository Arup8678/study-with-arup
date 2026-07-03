"use client";

import React, { useState, useEffect } from "react";
import { Shield, Plus, HelpCircle, BookOpen, Lock, User, Eye, EyeOff, CheckCircle, Trash2 } from "lucide-react";
import { SUBJECTS_DATA, EXAMS_DATA } from "@/services/mockData";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";
const LS_TOPICS_KEY   = "admin_topics";
const LS_QUESTIONS_KEY = "admin_questions";
const LS_PYQS_KEY      = "admin_pyqs";

type AdminTopic    = { id: string; subjectId: string; name: string; description: string; createdAt: string };
type AdminQuestion = { id: string; topicId: string; question: string; options: string[]; correctIndex: number; explanation: string; createdAt: string };
type AdminPYQ      = { id: string; examId: string; year: string; question: string; options: string[]; correctIndex: number; explanation: string; createdAt: string };

function load<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}
function save(key: string, data: unknown[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

export default function AdminPage() {
  const [authed, setAuthed]     = useState(false);
  const [user, setUser]         = useState("");
  const [pw, setPw]             = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [authError, setAuthError] = useState(false);
  const [tab, setTab]           = useState<"topics" | "questions" | "pyq">("topics");
  const [toast, setToast]       = useState("");

  // Topics state
  const [topics, setTopics]     = useState<AdminTopic[]>([]);
  const [tSubject, setTSubject] = useState("");
  const [tName, setTName]       = useState("");
  const [tDesc, setTDesc]       = useState("");

  // Questions state
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);
  const [qTopic, setQTopic]       = useState("");
  const [qText, setQText]         = useState("");
  const [qOpts, setQOpts]         = useState(["", "", "", ""]);
  const [qCorrect, setQCorrect]   = useState(0);
  const [qExp, setQExp]           = useState("");

  // PYQ state
  const [pyqs, setPyqs]       = useState<AdminPYQ[]>([]);
  const [pExam, setPExam]     = useState("");
  const [pYear, setPYear]     = useState("");
  const [pText, setPText]     = useState("");
  const [pOpts, setPOpts]     = useState(["", "", "", ""]);
  const [pCorrect, setPCorrect] = useState(0);
  const [pExp, setPExp]       = useState("");

  useEffect(() => {
    if (authed) {
      setTopics(load<AdminTopic>(LS_TOPICS_KEY));
      setQuestions(load<AdminQuestion>(LS_QUESTIONS_KEY));
      setPyqs(load<AdminPYQ>(LS_PYQS_KEY));
    }
  }, [authed]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const login = () => {
    if (user.trim() === ADMIN_USERNAME && pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const addTopic = () => {
    if (!tSubject || !tName.trim()) return;
    const item: AdminTopic = { id: `t-${Date.now()}`, subjectId: tSubject, name: tName, description: tDesc, createdAt: new Date().toISOString() };
    const updated = [...topics, item];
    setTopics(updated); save(LS_TOPICS_KEY, updated);
    setTName(""); setTDesc(""); showToast("✅ Topic added!");
  };

  const deleteTopic = (id: string) => {
    const updated = topics.filter(t => t.id !== id);
    setTopics(updated); save(LS_TOPICS_KEY, updated);
  };

  const addQuestion = () => {
    if (!qTopic || !qText.trim() || qOpts.some(o => !o.trim())) return;
    const item: AdminQuestion = { id: `q-${Date.now()}`, topicId: qTopic, question: qText, options: qOpts, correctIndex: qCorrect, explanation: qExp, createdAt: new Date().toISOString() };
    const updated = [...questions, item];
    setQuestions(updated); save(LS_QUESTIONS_KEY, updated);
    setQText(""); setQOpts(["","","",""]); setQCorrect(0); setQExp(""); showToast("✅ Question added!");
  };

  const deleteQuestion = (id: string) => {
    const updated = questions.filter(q => q.id !== id);
    setQuestions(updated); save(LS_QUESTIONS_KEY, updated);
  };

  const addPYQ = () => {
    if (!pExam || !pYear || !pText.trim() || pOpts.some(o => !o.trim())) return;
    const item: AdminPYQ = { id: `pyq-${Date.now()}`, examId: pExam, year: pYear, question: pText, options: pOpts, correctIndex: pCorrect, explanation: pExp, createdAt: new Date().toISOString() };
    const updated = [...pyqs, item];
    setPyqs(updated); save(LS_PYQS_KEY, updated);
    setPText(""); setPOpts(["","","",""]); setPCorrect(0); setPExp(""); showToast("✅ PYQ added!");
  };

  const deletePYQ = (id: string) => {
    const updated = pyqs.filter(p => p.id !== id);
    setPyqs(updated); save(LS_PYQS_KEY, updated);
  };

  // ── Login Screen ──────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto"><Shield size={26} /></div>
            <h1 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white">Admin Portal</h1>
            <p className="text-xs text-slate-400">Enter admin credentials to manage content</p>
          </div>

          <div className="p-3.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-2xl text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <p className="font-bold text-blue-600 dark:text-blue-400">Default Credentials:</p>
            <p>Username: <code className="font-mono bg-blue-100 dark:bg-blue-900/60 px-1.5 py-0.5 rounded text-blue-700 dark:text-blue-300">admin</code></p>
            <p>Password: <code className="font-mono bg-blue-100 dark:bg-blue-900/60 px-1.5 py-0.5 rounded text-blue-700 dark:text-blue-300">admin123</code></p>
          </div>

          <div className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={user}
                onChange={e => { setUser(e.target.value); setAuthError(false); }}
                placeholder="Username"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all ${authError ? "border-red-400 bg-red-50 dark:bg-red-900/10" : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-blue-500"} text-slate-900 dark:text-white`}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type={showPw ? "text" : "password"}
                value={pw}
                onChange={e => { setPw(e.target.value); setAuthError(false); }}
                onKeyDown={e => e.key === "Enter" && login()}
                placeholder="Password"
                className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm outline-none transition-all ${authError ? "border-red-400 bg-red-50 dark:bg-red-900/10" : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-blue-500"} text-slate-900 dark:text-white`}
              />
              <button onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-3.5 text-slate-400">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {authError && <p className="text-xs text-red-500">Invalid username or password. Please try again.</p>}

            <button onClick={login} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-500/20">
              Sign In to Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Admin Dashboard ───────────────────────
  const TABS = [
    { id: "topics",    label: "Add Topic",    icon: <BookOpen size={15} /> },
    { id: "questions", label: "Add Question", icon: <HelpCircle size={15} /> },
    { id: "pyq",       label: "Upload PYQ",   icon: <Plus size={15} /> },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-16">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-xl text-sm font-semibold animate-in slide-in-from-right">
          <CheckCircle size={16} /> {toast}
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center gap-2"><Shield size={22} className="text-blue-500" /> Admin Panel</h1>
            <p className="text-xs text-slate-400 mt-1">Logged in as: <strong className="text-blue-500">{ADMIN_USERNAME}</strong></p>
          </div>
          <button onClick={() => setAuthed(false)} className="text-xs text-red-500 font-bold hover:underline">Logout</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 flex-1 justify-center px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${tab === t.id ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ── ADD TOPIC ── */}
        {tab === "topics" && (
          <div className="space-y-5">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-6 space-y-4">
              <h2 className="font-bold text-slate-900 dark:text-white text-sm">Add New Topic</h2>
              <div className="space-y-3">
                <select value={tSubject} onChange={e => setTSubject(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white outline-none focus:border-blue-500">
                  <option value="">Select Subject</option>
                  {SUBJECTS_DATA.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <input value={tName} onChange={e => setTName(e.target.value)} placeholder="Topic Name" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white outline-none focus:border-blue-500" />
                <textarea value={tDesc} onChange={e => setTDesc(e.target.value)} placeholder="Short description (optional)" rows={2} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white outline-none focus:border-blue-500 resize-none" />
                <button onClick={addTopic} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all">+ Add Topic</button>
              </div>
            </div>
            {/* Topics List */}
            <div className="space-y-2">
              {topics.length === 0 ? <p className="text-xs text-slate-400 text-center py-4">No topics added yet.</p> :
                topics.map(t => (
                  <div key={t.id} className="flex items-center justify-between gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                      <p className="text-xs text-slate-400">{SUBJECTS_DATA.find(s => s.id === t.subjectId)?.name}</p>
                    </div>
                    <button onClick={() => deleteTopic(t.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* ── ADD QUESTION ── */}
        {tab === "questions" && (
          <div className="space-y-5">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-6 space-y-4">
              <h2 className="font-bold text-slate-900 dark:text-white text-sm">Add Question to a Topic</h2>
              <div className="space-y-3">
                <select value={qTopic} onChange={e => setQTopic(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white outline-none focus:border-blue-500">
                  <option value="">Select Topic</option>
                  {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  <option disabled>── Built-in topics ──</option>
                </select>
                <textarea value={qText} onChange={e => setQText(e.target.value)} placeholder="Question text" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white outline-none focus:border-blue-500 resize-none" />
                {qOpts.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input type="radio" name="correct" checked={qCorrect === i} onChange={() => setQCorrect(i)} className="accent-blue-600" />
                    <input value={opt} onChange={e => { const n = [...qOpts]; n[i] = e.target.value; setQOpts(n); }} placeholder={`Option ${String.fromCharCode(65+i)}`}
                      className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white outline-none focus:border-blue-500" />
                    {qCorrect === i && <span className="text-xs text-emerald-500 font-bold">✓ Correct</span>}
                  </div>
                ))}
                <textarea value={qExp} onChange={e => setQExp(e.target.value)} placeholder="Explanation (optional)" rows={2} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white outline-none focus:border-blue-500 resize-none" />
                <button onClick={addQuestion} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all">+ Add Question</button>
              </div>
            </div>
            <div className="space-y-2">
              {questions.length === 0 ? <p className="text-xs text-slate-400 text-center py-4">No questions added yet.</p> :
                questions.map(q => (
                  <div key={q.id} className="flex items-start justify-between gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                    <p className="text-sm text-slate-800 dark:text-slate-200 line-clamp-2">{q.question}</p>
                    <button onClick={() => deleteQuestion(q.id)} className="text-slate-300 hover:text-red-500 transition-colors flex-shrink-0"><Trash2 size={15} /></button>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* ── UPLOAD PYQ ── */}
        {tab === "pyq" && (
          <div className="space-y-5">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-6 space-y-4">
              <h2 className="font-bold text-slate-900 dark:text-white text-sm">Upload Previous Year Question</h2>
              <div className="space-y-3">
                <select value={pExam} onChange={e => setPExam(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white outline-none focus:border-blue-500">
                  <option value="">Select Exam</option>
                  {EXAMS_DATA.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
                <input value={pYear} onChange={e => setPYear(e.target.value)} type="number" placeholder="Year (e.g. 2024)" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white outline-none focus:border-blue-500" />
                <textarea value={pText} onChange={e => setPText(e.target.value)} placeholder="Question text" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white outline-none focus:border-blue-500 resize-none" />
                {pOpts.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input type="radio" name="pcorrect" checked={pCorrect === i} onChange={() => setPCorrect(i)} className="accent-blue-600" />
                    <input value={opt} onChange={e => { const n = [...pOpts]; n[i] = e.target.value; setPOpts(n); }} placeholder={`Option ${String.fromCharCode(65+i)}`}
                      className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white outline-none focus:border-blue-500" />
                    {pCorrect === i && <span className="text-xs text-emerald-500 font-bold">✓ Correct</span>}
                  </div>
                ))}
                <textarea value={pExp} onChange={e => setPExp(e.target.value)} placeholder="Explanation (optional)" rows={2} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white outline-none focus:border-blue-500 resize-none" />
                <button onClick={addPYQ} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all">+ Upload PYQ</button>
              </div>
            </div>
            <div className="space-y-2">
              {pyqs.length === 0 ? <p className="text-xs text-slate-400 text-center py-4">No PYQs uploaded yet.</p> :
                pyqs.map(p => (
                  <div key={p.id} className="flex items-start justify-between gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                    <div>
                      <p className="text-sm text-slate-800 dark:text-slate-200 line-clamp-1">{p.question}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{EXAMS_DATA.find(e => e.id === p.examId)?.name} — {p.year}</p>
                    </div>
                    <button onClick={() => deletePYQ(p.id)} className="text-slate-300 hover:text-red-500 transition-colors flex-shrink-0"><Trash2 size={15} /></button>
                  </div>
                ))
              }
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
