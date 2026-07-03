"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Clock, Award, ChevronRight, ChevronLeft, CheckCircle2, AlertTriangle, 
  BookOpen, Bookmark, BookmarkCheck, LayoutDashboard, RefreshCw, BarChart2
} from "lucide-react";
import { dbService } from "@/services/db";
import { Quiz, QuizQuestion } from "@/types";

export default function QuizDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: quizId } = use(params);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);
  const router = useRouter();

  // Load Quiz & User profile bookmarks
  useEffect(() => {
    setLoading(true);
    dbService.getQuizById(quizId).then(data => {
      if (!data) {
        router.push("/quiz");
        return;
      }
      setQuiz(data);
      setTimeLeft(data.timeLimitMinutes * 60);
      
      // Load bookmarks
      dbService.getUserProfile().then(profile => {
        setBookmarkedIds(profile.bookmarks);
        setLoading(false);
      });
    });
  }, [quizId, router]);

  // Timer Tick
  useEffect(() => {
    if (loading || isCompleted || !quiz) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, isCompleted, quiz]);

  const handleSelectOption = (optIdx: number) => {
    setSelectedOptions(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleToggleBookmark = async (qId: string) => {
    const updated = await dbService.toggleBookmark(qId);
    setBookmarkedIds(updated);
  };

  const handleSubmit = async () => {
    if (!quiz || isCompleted) return;
    
    // Compute Score
    let computedScore = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedOptions[idx] === q.correctAnswerIndex) {
        computedScore += 1;
      }
    });

    setScore(computedScore);
    setIsCompleted(true);

    // Save submission records to DB service
    await dbService.recordTestSubmission(
      "quiz",
      quiz.title,
      computedScore,
      quiz.questionsCount,
      timeSpent
    );
  };

  if (loading || !quiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-400">
        Loading quiz specifications...
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIdx];
  const isBookmarked = bookmarkedIds.includes(currentQuestion.id);

  // Minutes & Seconds formatter
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // 1. COMPLETION RESULT VIEW
  if (isCompleted) {
    const accuracy = Math.round((score / quiz.questionsCount) * 100);
    const coinsEarned = score * 2;
    const xpEarned = score * 10 + 20;

    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 text-left">
        
        {/* Result summary banner */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white dark:bg-slate-950/80 border border-slate-800 shadow-xl space-y-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">Quiz Finished</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">{quiz.title}</h1>
          </div>

          {/* Stats blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-850 dark:bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Final Score</span>
              <span className="text-xl font-bold text-slate-100">{score} / {quiz.questionsCount}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-850 dark:bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Accuracy</span>
              <span className={`text-xl font-bold ${accuracy >= 80 ? "text-green-400" : "text-amber-400"}`}>{accuracy}%</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-850 dark:bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">XP Earned</span>
              <span className="text-xl font-bold text-blue-400">⚡ +{xpEarned}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-850 dark:bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Coins Gained</span>
              <span className="text-xl font-bold text-amber-450">🪙 +{coinsEarned}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all text-xs flex items-center justify-center gap-1.5"
            >
              <LayoutDashboard size={14} /> Go to Dashboard
            </Link>
            <Link
              href="/quiz"
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold transition-all text-xs flex items-center justify-center gap-1.5"
            >
              Take Another Quiz
            </Link>
          </div>
        </div>

        {/* Detailed Solutions Section */}
        <div className="space-y-6">
          <h3 className="font-heading font-bold text-xl text-slate-850 dark:text-white flex items-center gap-2">
            <BarChart2 size={20} className="text-blue-500" />
            Detailed Question Explanations
          </h3>

          <div className="space-y-4">
            {quiz.questions.map((q, idx) => {
              const selected = selectedOptions[idx];
              const correct = q.correctAnswerIndex;
              const isCorrect = selected === correct;
              return (
                <div 
                  key={q.id} 
                  className={`p-6 rounded-2xl bg-white dark:bg-slate-800 border text-left space-y-4 shadow-sm ${
                    isCorrect ? "border-green-500/20" : "border-red-500/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white leading-relaxed">
                      Q{idx + 1}: {q.question}
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      isCorrect ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                    }`}>
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selected === oIdx;
                      const isCorrectOpt = correct === oIdx;
                      
                      let cardStyle = "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400";
                      if (isCorrectOpt) {
                        cardStyle = "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 font-semibold";
                      } else if (isSelected) {
                        cardStyle = "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 font-semibold";
                      }

                      return (
                        <div key={oIdx} className={`p-2.5 rounded-xl border ${cardStyle}`}>
                          {opt} {isCorrectOpt ? "✓" : isSelected ? "✗" : ""}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 rounded-xl bg-blue-500/5 dark:bg-blue-950/20 border-l-4 border-blue-500 text-xs text-slate-500 leading-relaxed">
                    <span className="font-bold text-slate-700 dark:text-slate-200 block mb-1">Answer Key Walkthrough:</span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  // 2. ACTIVE QUIZ TAKING VIEW
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left panel: Active Question Card */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Quiz Info Bar */}
        <div className="flex justify-between items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
          <div>
            <h1 className="font-bold text-sm text-slate-800 dark:text-slate-200 line-clamp-1">{quiz.title}</h1>
            <span className="text-[10px] text-slate-400 block mt-0.5 uppercase tracking-wider font-semibold">
              Question {currentIdx + 1} of {quiz.questionsCount}
            </span>
          </div>
          <button
            onClick={() => handleToggleBookmark(currentQuestion.id)}
            className={`p-2 rounded-xl border transition-all ${
              isBookmarked
                ? "bg-amber-500/15 border-amber-500/20 text-amber-500"
                : "border-slate-200 dark:border-slate-700/80 text-slate-400 hover:text-slate-600"
            }`}
            aria-label="Bookmark question"
          >
            {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
        </div>

        {/* Question Panel */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-6 sm:p-8 rounded-3xl shadow-premium space-y-6">
          <h2 className="text-base sm:text-lg font-bold text-slate-850 dark:text-white leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, oIdx) => {
              const isSelected = selectedOptions[currentIdx] === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between text-sm ${
                    isSelected
                      ? "bg-blue-600/10 border-blue-600 text-blue-600 dark:text-blue-400 font-bold ring-2 ring-blue-600/15"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-650 dark:text-slate-300"
                  }`}
                >
                  <span>{opt}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300"
                  }`}>
                    {isSelected && "✓"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next/Prev navigation controls */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => setCurrentIdx(currentIdx - 1)}
            disabled={currentIdx === 0}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 text-xs font-semibold text-slate-600 dark:text-slate-350 transition-all flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Prev
          </button>
          
          {currentIdx === quiz.questionsCount - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold shadow-md shadow-green-500/10 transition-all text-xs"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentIdx(currentIdx + 1)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/10 transition-all text-xs flex items-center gap-1"
            >
              Next <ChevronRight size={16} />
            </button>
          )}
        </div>

      </div>

      {/* Right sidebar: Timing clock & Quick Navigation bubble grid */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Timer Card */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-6 rounded-2xl shadow-premium text-center space-y-3">
          <Clock size={28} className="text-amber-500 mx-auto" />
          <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Remaining Time</span>
          <span className={`text-2xl font-bold font-mono tracking-wider ${timeLeft <= 60 ? "text-red-500 animate-pulse" : "text-slate-800 dark:text-white"}`}>
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Quick Navigator bubbles */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-6 rounded-2xl shadow-premium text-left space-y-4">
          <h3 className="font-heading font-bold text-sm text-slate-850 dark:text-white flex items-center gap-1.5">
            <BookOpen size={16} /> Question Navigator
          </h3>
          
          <div className="grid grid-cols-5 gap-2">
            {quiz.questions.map((_, idx) => {
              const isAttempted = selectedOptions[idx] !== undefined;
              const isActive = currentIdx === idx;
              
              let bubbleStyle = "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600";
              if (isActive) {
                bubbleStyle = "bg-blue-600 border-blue-600 text-white font-bold ring-2 ring-blue-600/15";
              } else if (isAttempted) {
                bubbleStyle = "bg-green-500/15 border-green-500/20 text-green-600 dark:text-green-400 font-bold";
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`aspect-square rounded-lg border text-xs flex items-center justify-center transition-all ${bubbleStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
