export type Grade = 'all' | 'A' | 'B' | 'C' | 'D' | 'E' | 'ST';

export type Subject = 'all' | 'language' | 'math' | 'history' | 'geography' | 'science' | 'art';

export interface Question {
  id: string;
  prompt: string;
  type: 'multiple-choice' | 'fill-blank' | 'math' | 'drawing';
  options?: string[];
  answer?: string;
  hint?: string;
}

export interface Worksheet {
  id: string;
  title: string;
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'ST';
  subject: 'language' | 'math' | 'history' | 'geography' | 'science' | 'art';
  description: string;
  difficulty: 1 | 2 | 3; // 1: Easy, 2: Medium, 3: Challenge
  durationMinutes: number;
  tags: string[];
  downloadUrl?: string;
  fileData?: string; // Base64 data if uploaded directly as PDF/file
  solvedCount: number;
  likes: number;
  content: {
    instructions: string;
    questions: Question[];
    funFact?: string;
    badgeEarned?: string;
  };
  createdAt: string;
  teacherNotes?: string;
  isCustomUploaded?: boolean;
}

export interface Sticker {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface TeacherAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'normal' | 'star';
}
