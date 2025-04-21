export interface Option {
  id: string;
  icon: string;
  label: string;
  description: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  options?: Option[];
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  grade: number;
  school_name: string;
  created_at: Date;
}

export type AuthView = 'sign-in' | 'sign-up' | 'profile-setup';