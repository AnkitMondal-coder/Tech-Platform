/*
  # Initial Schema Setup for HopeConnect Platform

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password_hash` (text)
      - `name` (text)
      - `country` (text)
      - `preferred_currency` (text)
      - `created_at` (timestamp)
      - `last_login` (timestamp)
    
    - `donations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `recipient_id` (text)
      - `amount` (numeric)
      - `currency` (text)
      - `type` (text)
      - `status` (text)
      - `location` (text)
      - `created_at` (timestamp)
    
    - `user_feedback`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `rating` (integer)
      - `comment` (text)
      - `created_at` (timestamp)
    
    - `monthly_donations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `amount` (numeric)
      - `currency` (text)
      - `recipient_type` (text)
      - `is_active` (boolean)
      - `next_payment` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  country text DEFAULT 'US',
  preferred_currency text DEFAULT 'USD',
  created_at timestamptz DEFAULT now(),
  last_login timestamptz DEFAULT now()
);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  recipient_id text NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  currency text DEFAULT 'USD',
  type text DEFAULT 'cash' CHECK (type IN ('cash', 'clothes', 'food')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'verified')),
  location text,
  created_at timestamptz DEFAULT now()
);

-- Create user feedback table
CREATE TABLE IF NOT EXISTS user_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create monthly donations table
CREATE TABLE IF NOT EXISTS monthly_donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  amount numeric NOT NULL CHECK (amount > 0),
  currency text DEFAULT 'USD',
  recipient_type text NOT NULL,
  is_active boolean DEFAULT true,
  next_payment timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_donations ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create policies for donations table
CREATE POLICY "Users can read own donations"
  ON donations
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create donations"
  ON donations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

-- Create policies for user feedback table
CREATE POLICY "Anyone can read feedback"
  ON user_feedback
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create feedback"
  ON user_feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

-- Create policies for monthly donations table
CREATE POLICY "Users can read own monthly donations"
  ON monthly_donations
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create monthly donations"
  ON monthly_donations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own monthly donations"
  ON monthly_donations
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id::text);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_donations_user_id ON donations(user_id);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at);
CREATE INDEX IF NOT EXISTS idx_user_feedback_user_id ON user_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_user_feedback_created_at ON user_feedback(created_at);
CREATE INDEX IF NOT EXISTS idx_monthly_donations_user_id ON monthly_donations(user_id);
CREATE INDEX IF NOT EXISTS idx_monthly_donations_next_payment ON monthly_donations(next_payment);