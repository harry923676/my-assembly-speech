export type ClassLevel = 'Class 1' | 'Class 2' | 'Class 3' | 'Class 4' | 'Class 5' | 'Class 6+';

export type LanguageCode =
  | 'English'
  | 'Hindi'
  | 'Punjabi'
  | 'Telugu'
  | 'Marathi'
  | 'Bengali'
  | 'Tamil'
  | 'Kannada'
  | 'Malayalam'
  | 'Gujarati'
  | 'Hinglish';

export type SpeechDuration = '1 minute' | '2 minutes' | '3 minutes';

export type SpeechStyle =
  | 'Simple & Educational'
  | 'Inspirational'
  | 'Patriotic'
  | 'Storytelling'
  | 'Friendly & Cheerful'
  | 'Formal';

export type EventCategory =
  | 'National'
  | 'Festival'
  | 'Education'
  | 'Science'
  | 'Environment'
  | 'History'
  | 'Personality'
  | 'Space'
  | 'Sports'
  | 'International'
  | 'Culture'
  | 'Evergreen';

export interface IndianEvent {
  id: string;
  title: string;
  hindiTitle?: string;
  category: EventCategory;
  categoryIcon: string;
  dateStr: string; // e.g. "2026-09-14" or "14 Sep"
  dayAndMonth: string; // "14 Sep"
  year?: number;
  description: string;
  importance: string;
  sourceName: string;
  sourceUrl?: string;
  isLunarFestival?: boolean;
  score?: number;
  proximityDays?: number;
  isCurrentOrUpcoming?: boolean;
}

export interface DifficultWord {
  word: string;
  pronunciation: string;
  meaning: string;
}

export interface TeacherQA {
  question: string;
  answer: string;
}

export interface VerifiedSource {
  name: string;
  url?: string;
  confidence: number;
  note?: string;
}

export interface AssemblySpeech {
  id: string;
  eventId: string;
  eventTitle: string;
  eventCategory: EventCategory;
  eventDate: string;
  classLevel: ClassLevel;
  language: LanguageCode;
  duration: SpeechDuration;
  style: SpeechStyle;
  title: string;
  speechText: string;
  cleanText: string;
  wordCount: number;
  estimatedSeconds: number;
  whyThisTopic: string;
  difficultWords: DifficultWord[];
  threeKeyFacts: string[];
  teacherQuestions: TeacherQA[];
  speakingTips: string[];
  moralLesson: string;
  openingOptions: {
    traditional: string;
    question: string;
    surpriseFact: string;
  };
  sources: VerifiedSource[];
  createdAt: string;
  childName?: string;
  schoolName?: string;
}

export interface ChildProfile {
  childName: string;
  schoolName: string;
  classLevel: ClassLevel;
  preferredLanguage: LanguageCode;
  speechDuration: SpeechDuration;
  speechStyle: SpeechStyle;
  region: string;
}

export interface SyncedTimeData {
  iso: string;
  dateStr: string; // YYYY-MM-DD
  displayDate: string; // e.g. "Thursday, 10 September 2026"
  timeStr: string; // e.g. "08:15:30 PM"
  dayName: string;
  dayOfWeek: number; // 0 = Sun, 4 = Thu
  timezone: string;
  nextWeekendAssembly: {
    dateStr: string;
    displayDate: string;
    dayName: string;
    daysRemaining: number;
  };
  networkSynced: boolean;
  source: string;
  syncedAt: number;
}

export interface PracticeResult {
  score: number;
  accuracyScore: number;
  paceScore: number;
  confidenceScore: number;
  wordsSpokenCount: number;
  totalWordsCount: number;
  feedback: string;
  completedAt: string;
}
