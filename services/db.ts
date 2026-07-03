import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { 
  EXAMS_DATA, 
  SUBJECTS_DATA, 
  TOPICS_DATA, 
  MOCK_QUIZZES, 
  MOCK_TESTS, 
  BLOGS_DATA, 
  NOTIFICATIONS_DATA, 
  LEADERBOARD_DATA,
  SAMPLE_QUESTIONS
} from "./mockData";
import { Exam, Subject, Topic, Quiz, MockTest, BlogItem, NotificationItem, LeaderboardUser, UserProfile, UserHistoryItem, QuizQuestion } from "@/types";

const LOCAL_STORAGE_PROFILE_KEY = "exam_bangla_user_profile";

const DEFAULT_PROFILE: UserProfile = {
  id: "mock-user-123",
  email: "student@exambangla.in",
  username: "Bengali Learner",
  xp: 450,
  coins: 80,
  streak: 5,
  rank: 124,
  overallAccuracy: 78,
  totalTests: 12,
  averageScore: 82,
  weakSubjects: ["Indian Economy", "English Grammar"],
  strongSubjects: ["Indian History", "Geography (ভূগোল)", "Mathematics (গণিত)"],
  bookmarks: ["q1", "q4"],
  history: [
    {
      id: "hist-1",
      type: "quiz",
      title: "Daily GK Power Quiz",
      score: 4,
      totalQuestions: 5,
      accuracy: 80,
      timeSpentSeconds: 140,
      date: "2026-07-02"
    },
    {
      id: "hist-2",
      type: "mock-test",
      title: "WBP Constable Prelims Mock - 01",
      score: 6,
      totalQuestions: 8,
      accuracy: 75,
      timeSpentSeconds: 980,
      date: "2026-06-30"
    }
  ],
  streakCalendar: ["2026-07-01", "2026-07-02", "2026-07-03"]
};

// Safe localStorage checks for SSR context
const getLocalProfile = (): UserProfile => {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  const stored = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE));
    return DEFAULT_PROFILE;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_PROFILE;
  }
};

const saveLocalProfile = (profile: UserProfile) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(profile));
  }
};

export const dbService = {
  // --- EXAMS ---
  async getExams(): Promise<Exam[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("exams").select("*");
      if (!error && data) return data as Exam[];
    }
    return EXAMS_DATA;
  },

  async getExamById(id: string): Promise<Exam | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("exams").select("*").eq("id", id).single();
      if (!error && data) return data as Exam;
    }
    return EXAMS_DATA.find(e => e.id === id) || null;
  },

  // --- SUBJECTS ---
  async getSubjects(): Promise<Subject[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("subjects").select("*");
      if (!error && data) return data as Subject[];
    }
    return SUBJECTS_DATA;
  },

  async getSubjectById(id: string): Promise<Subject | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("subjects").select("*").eq("id", id).single();
      if (!error && data) return data as Subject;
    }
    return SUBJECTS_DATA.find(s => s.id === id) || null;
  },

  // --- TOPICS ---
  async getTopicsBySubject(subjectId: string): Promise<Topic[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("topics").select("*").eq("subjectId", subjectId);
      if (!error && data) return data as Topic[];
    }
    return TOPICS_DATA.filter(t => t.subjectId === subjectId);
  },

  async getTopicById(id: string): Promise<Topic | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("topics").select("*").eq("id", id).single();
      if (!error && data) return data as Topic;
    }
    return TOPICS_DATA.find(t => t.id === id) || null;
  },

  // --- QUIZZES ---
  async getQuizzes(): Promise<Quiz[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("quizzes").select("*, questions(*)");
      if (!error && data) return data as Quiz[];
    }
    return MOCK_QUIZZES;
  },

  async getQuizById(id: string): Promise<Quiz | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("quizzes").select("*, questions(*)").eq("id", id).single();
      if (!error && data) return data as Quiz;
    }
    return MOCK_QUIZZES.find(q => q.id === id) || null;
  },

  // --- MOCK TESTS ---
  async getMockTests(): Promise<MockTest[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("mock_tests").select("*, questions(*)");
      if (!error && data) return data as MockTest[];
    }
    return MOCK_TESTS;
  },

  async getMockTestById(id: string): Promise<MockTest | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("mock_tests").select("*, questions(*)").eq("id", id).single();
      if (!error && data) return data as MockTest;
    }
    return MOCK_TESTS.find(t => t.id === id) || null;
  },

  // --- BLOGS & NEWS ---
  async getBlogs(): Promise<BlogItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("blogs").select("*");
      if (!error && data) return data as BlogItem[];
    }
    return BLOGS_DATA;
  },

  async getBlogBySlug(slug: string): Promise<BlogItem | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("blogs").select("*").eq("slug", slug).single();
      if (!error && data) return data as BlogItem;
    }
    return BLOGS_DATA.find(b => b.slug === slug) || null;
  },

  // --- NOTIFICATIONS ---
  async getNotifications(): Promise<NotificationItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("notifications").select("*").order("date", { ascending: false });
      if (!error && data) return data as NotificationItem[];
    }
    return NOTIFICATIONS_DATA;
  },

  // --- LEADERBOARD ---
  async getLeaderboard(period: "daily" | "weekly" | "monthly"): Promise<LeaderboardUser[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("leaderboard").select("*").order("xp", { ascending: false }).limit(20);
      if (!error && data) return data as LeaderboardUser[];
    }
    // Return mock data, but dynamically injecting the user's updated mock profile.
    const userProfile = getLocalProfile();
    const mockList = [...LEADERBOARD_DATA];
    
    const existingIndex = mockList.findIndex(u => u.name === userProfile.username);
    if (existingIndex !== -1) {
      mockList[existingIndex].xp = userProfile.xp;
      mockList[existingIndex].streak = userProfile.streak;
    } else {
      mockList.push({
        rank: 0, // Assigned below
        name: userProfile.username,
        district: "Kolkata",
        xp: userProfile.xp,
        streak: userProfile.streak
      });
    }

    // Sort by XP
    mockList.sort((a, b) => b.xp - a.xp);
    return mockList.map((item, idx) => ({ ...item, rank: idx + 1 }));
  },

  // --- USER PROFILE & ACTIONS ---
  async getUserProfile(): Promise<UserProfile> {
    if (isSupabaseConfigured && supabase) {
      // Logic for fetching authenticated user record from supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        if (!error && data) return data as UserProfile;
      }
    }
    return getLocalProfile();
  },

  async toggleBookmark(questionId: string): Promise<string[]> {
    const profile = getLocalProfile();
    const index = profile.bookmarks.indexOf(questionId);
    if (index === -1) {
      profile.bookmarks.push(questionId);
    } else {
      profile.bookmarks.splice(index, 1);
    }
    saveLocalProfile(profile);

    if (isSupabaseConfigured && supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").update({ bookmarks: profile.bookmarks }).eq("id", user.id);
      }
    }
    return profile.bookmarks;
  },

  async getBookmarkedQuestions(): Promise<QuizQuestion[]> {
    const profile = getLocalProfile();
    // Scan all pools of questions to return corresponding definitions
    const allQuestions = [
      ...SAMPLE_QUESTIONS,
      ...MOCK_QUIZZES.flatMap(q => q.questions),
      ...MOCK_TESTS.flatMap(t => t.questions)
    ];
    
    // De-duplicate questions by ID
    const uniqueQuestionsMap: Record<string, QuizQuestion> = {};
    allQuestions.forEach(q => {
      uniqueQuestionsMap[q.id] = q;
    });

    return profile.bookmarks.map(id => uniqueQuestionsMap[id]).filter(Boolean);
  },

  async recordTestSubmission(
    type: "quiz" | "mock-test",
    title: string,
    score: number,
    totalQuestions: number,
    timeSpentSeconds: number
  ): Promise<UserProfile> {
    const profile = getLocalProfile();
    const accuracy = Math.round((score / totalQuestions) * 100);
    const xpGained = score * 10 + 20; // 10 XP per question + 20 participation XP
    const coinsGained = score * 2;   // 2 coins per correct answer

    const historyItem: UserHistoryItem = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      score,
      totalQuestions,
      accuracy,
      timeSpentSeconds,
      date: new Date().toISOString().split("T")[0]
    };

    // Calculate new stats
    const updatedHistory = [historyItem, ...profile.history];
    const newTotalTests = updatedHistory.length;
    
    // Average accuracy
    const sumAccuracy = updatedHistory.reduce((acc, h) => acc + h.accuracy, 0);
    const newOverallAccuracy = Math.round(sumAccuracy / newTotalTests);

    // Average score (rescaled to percentage)
    const sumScorePct = updatedHistory.reduce((acc, h) => acc + (h.score / h.totalQuestions) * 100, 0);
    const newAverageScore = Math.round(sumScorePct / newTotalTests);

    // Handle Streaks
    const todayStr = new Date().toISOString().split("T")[0];
    const updatedStreakCalendar = [...new Set([...profile.streakCalendar, todayStr])].sort();
    
    let newStreak = profile.streak;
    // Check if yesterday is in the streak calendar to increment or maintain
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (profile.streakCalendar.includes(yesterdayStr)) {
      if (!profile.streakCalendar.includes(todayStr)) {
        newStreak = profile.streak + 1;
      }
    } else {
      // Streak broken unless user already did something today or yesterday
      const isDidToday = profile.streakCalendar.includes(todayStr);
      if (!isDidToday) {
        newStreak = 1; // start new streak
      }
    }

    const updatedProfile: UserProfile = {
      ...profile,
      xp: profile.xp + xpGained,
      coins: profile.coins + coinsGained,
      streak: newStreak,
      totalTests: newTotalTests,
      overallAccuracy: newOverallAccuracy,
      averageScore: newAverageScore,
      history: updatedHistory,
      streakCalendar: updatedStreakCalendar
    };

    saveLocalProfile(updatedProfile);

    if (isSupabaseConfigured && supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").update({
          xp: updatedProfile.xp,
          coins: updatedProfile.coins,
          streak: updatedProfile.streak,
          total_tests: updatedProfile.totalTests,
          overall_accuracy: updatedProfile.overallAccuracy,
          average_score: updatedProfile.averageScore,
          history: updatedProfile.history,
          streak_calendar: updatedProfile.streakCalendar
        }).eq("id", user.id);
      }
    }

    return updatedProfile;
  },

  async updateUsername(username: string): Promise<UserProfile> {
    const profile = getLocalProfile();
    profile.username = username;
    saveLocalProfile(profile);

    if (isSupabaseConfigured && supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").update({ username }).eq("id", user.id);
      }
    }
    return profile;
  }
};
