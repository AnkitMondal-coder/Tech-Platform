import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  last_login: string;
  preferred_currency: string;
  country: string;
}

export interface Donation {
  id: string;
  user_id: string;
  recipient_id: string;
  amount: number;
  currency: string;
  type: 'cash' | 'clothes' | 'food';
  status: 'pending' | 'completed' | 'verified';
  created_at: string;
  location?: string;
}

export interface UserFeedback {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface MonthlyDonation {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  recipient_type: string;
  is_active: boolean;
  next_payment: string;
  created_at: string;
}