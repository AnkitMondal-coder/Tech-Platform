/*
  # Fix User Registration RLS Policy

  1. Security Updates
    - Add policy to allow anonymous users to insert new records during registration
    - Ensure existing policies remain intact for authenticated users
    - Maintain security while enabling user signup functionality

  2. Changes
    - Add INSERT policy for anonymous (anon) role to allow user registration
    - Keep existing SELECT and UPDATE policies for authenticated users
*/

-- Allow anonymous users to insert new user records during registration
CREATE POLICY "Allow anonymous user registration"
  ON users
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure the existing policies are properly configured
DROP POLICY IF EXISTS "Users can read own data" ON users;
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

DROP POLICY IF EXISTS "Users can update own data" ON users;
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);