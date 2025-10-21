-- ===================================================
-- ICD-10 Lernplattform - Supabase Database Schema
-- ===================================================
-- Führe dieses Script im Supabase SQL Editor aus
-- ===================================================

-- 1. Tabelle für User Progress erstellen
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  box_system JSONB DEFAULT '{}',
  quiz_stats JSONB DEFAULT '{"totalQuestions": 0, "correctAnswers": 0}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 2. Row Level Security (RLS) aktivieren
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- 3. Policies erstellen

-- Policy: User kann nur eigene Daten lesen
CREATE POLICY "Users can read own progress"
  ON user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: User kann eigene Daten erstellen
CREATE POLICY "Users can insert own progress"
  ON user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: User kann eigene Daten updaten
CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: User kann eigene Daten löschen
CREATE POLICY "Users can delete own progress"
  ON user_progress
  FOR DELETE
  USING (auth.uid() = user_id);

-- 4. Index für bessere Performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);

-- 5. Updated_at Trigger (automatisch Timestamp aktualisieren)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ===================================================
-- Script erfolgreich ausgeführt!
-- ===================================================
-- Nächste Schritte:
-- 1. Aktiviere Authentication → Providers → Email
-- 2. (Optional) Aktiviere Google OAuth
-- 3. Kopiere API Keys in .env Datei
-- ===================================================
