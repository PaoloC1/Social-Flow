
export enum AppState {
  HOME = 'HOME',
  LOGIN = 'LOGIN',
  USER_SIGNUP_STEP1 = 'USER_SIGNUP_STEP1',
  USER_SIGNUP_STEP2 = 'USER_SIGNUP_STEP2',
  USER_SIGNUP_SURVEY = 'USER_SIGNUP_SURVEY',
  USER_SIGNUP_RESULTS = 'USER_SIGNUP_RESULTS',
  USER_DASHBOARD = 'USER_DASHBOARD',
  COACH_DASHBOARD = 'COACH_DASHBOARD',
  COACH_SELECTION = 'COACH_SELECTION',
  COACH_LANDING = 'COACH_LANDING',
  TOPIC_SELECTION = 'TOPIC_SELECTION',
  BOOKING = 'BOOKING',
  WARMUP = 'WARMUP',
  LIVE_SESSION = 'LIVE_SESSION',
  FEEDBACK = 'FEEDBACK',
  COACH_SIGNUP = 'COACH_SIGNUP',
  CONFIRMATION = 'CONFIRMATION',
  PRICING = 'PRICING'
}

export type UserRole = 'USER' | 'COACH';

export interface PerformanceMetrics {
  fluidita: number;
  entropia: number; // Sovrapposizioni
  lagTime: number;
  balbuzia: number;
  centralita: number;
  iniziativa: number;
  volumeVoce: number;
  contattoVisivo: number;
}

export interface UserProfile {
  name: string;
  surname: string;
  birthDate: string;
  email: string;
  phone: string;
  surveyScore: number;
  shynessLevel: string;
  couragePoints: number;
  metrics: PerformanceMetrics;
}

export interface Coach {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  description: string;
  specialties: string[];
  vibe: 'Calmo' | 'Energico' | 'Diretto';
  personalityPrompt: string;
  price: number;
  rating: number;
  reviewCount: number;
}

export interface SessionRecord {
  id: string;
  date: string;
  coachName: string;
  topic: string;
  metrics: PerformanceMetrics;
  comment: string;
}

export interface TranscriptionItem {
  speaker: 'user' | 'model';
  text: string;
}

// Added FeedbackData interface to fix export error
export interface FeedbackData {
  score: number;
  strengths: string[];
  improvements: string[];
  summary: string;
  conversationTip: string;
}
