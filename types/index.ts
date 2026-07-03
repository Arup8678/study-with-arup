export interface ExamSection {
  name: string;
  questions: number;
  marks: number;
}

export interface ExamPattern {
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  negativeMarking: number;
  sections: ExamSection[];
}

export interface PYQItem {
  year: number;
  questions: QuizQuestion[];
}

export interface ExamNotification {
  id: string;
  title: string;
  type: "Exam Date" | "Admit Card" | "Result" | "Recruitment";
  date: string;
  desc: string;
  officialLink?: string;
}

export interface Exam {
  id: string;
  name: string;
  description: string;
  iconName: string;
  activeStudents: number;
  totalQuestions: number;
  totalMockTests: number;
  details: string;
  syllabus: string[];
  officialLink?: string;
  examPattern?: ExamPattern;
  selectionProcess?: string[];
  subjectIds?: string[];
  notifications?: ExamNotification[];
  pyqs?: PYQItem[];
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  iconName: string;
  questionCount: number;
  progress: number; // 0 to 100
  examIds?: string[];
}

export interface ReferenceLink {
  label: string;
  url: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
  description: string;
  notesContent: string;
  questionsCount: number;
  referenceLinks?: ReferenceLink[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeLimitMinutes: number;
  questionsCount: number;
  questions: QuizQuestion[];
  date: string;
}

export interface MockTest {
  id: string;
  examId: string;
  examName: string;
  title: string;
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  isPremium: boolean;
  questions: QuizQuestion[];
}

export interface BlogItem {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  category: string;
  slug: string;
  readTime: string;
  tags: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  type: "Exam Date" | "Admit Card" | "Result" | "Recruitment";
  date: string;
  desc: string;
  officialLink?: string;
}

export interface UserHistoryItem {
  id: string;
  type: "quiz" | "mock-test";
  title: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  timeSpentSeconds: number;
  date: string;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  xp: number;
  coins: number;
  streak: number;
  rank: number;
  overallAccuracy: number;
  totalTests: number;
  averageScore: number;
  weakSubjects: string[];
  strongSubjects: string[];
  bookmarks: string[];
  history: UserHistoryItem[];
  streakCalendar: string[];
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  district: string;
  xp: number;
  streak: number;
}
