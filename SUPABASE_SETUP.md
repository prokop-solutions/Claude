# 🚀 Supabase Setup Anleitung

Diese Anleitung hilft Ihnen, Supabase für die ICD-10 Lernplattform einzurichten.

## 📋 Voraussetzungen

- Supabase Account (kostenlos)
- Node.js installiert

---

## 1️⃣ Supabase Projekt erstellen

### Schritt 1: Account erstellen
1. Gehe zu [https://supabase.com](https://supabase.com)
2. Klicke auf "Start your project"
3. Registriere dich (kostenlos)

### Schritt 2: Neues Projekt anlegen
1. Klicke auf "New Project"
2. **WICHTIG:** Wähle **EU (Frankfurt)** oder **EU (London)** als Region (DSGVO!)
3. Vergib einen Namen (z.B. "icd10-learning")
4. Wähle ein sicheres Passwort (speichere es!)
5. Klicke auf "Create new project"

⏱️ **Warten:** Das Projekt wird erstellt (ca. 2 Minuten)

---

## 2️⃣ Datenbank einrichten

### Schritt 1: SQL Editor öffnen
1. Im Supabase Dashboard: Linke Sidebar → **SQL Editor**
2. Klicke auf "New Query"

### Schritt 2: Tabelle erstellen
Kopiere und füge diesen SQL-Code ein:

\`\`\`sql
-- Tabelle für User Progress erstellen
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  box_system JSONB DEFAULT '{}',
  quiz_stats JSONB DEFAULT '{"totalQuestions": 0, "correctAnswers": 0}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Row Level Security (RLS) aktivieren
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

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

-- Index für bessere Performance
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
\`\`\`

3. Klicke auf **"Run"** (oder F5)
4. ✅ Erfolg: "Success. No rows returned"

---

## 3️⃣ Google OAuth aktivieren (optional)

### Schritt 1: Authentication Settings
1. Linke Sidebar → **Authentication** → **Providers**
2. Suche "Google" in der Liste

### Schritt 2: Google OAuth einrichten
**Option A: Schnell-Setup (Supabase managed)**
1. Bei Google: Toggle auf **Enabled**
2. Klicke auf "Use Supabase OAuth"
3. ✅ Fertig!

**Option B: Eigene Google Credentials (fortgeschritten)**
1. Gehe zu [Google Cloud Console](https://console.cloud.google.com)
2. Erstelle ein neues Projekt
3. Aktiviere "Google+ API"
4. Erstelle OAuth 2.0 Credentials
5. Autorisierte Redirect URI: `https://YOUR-PROJECT.supabase.co/auth/v1/callback`
6. Kopiere Client ID & Client Secret
7. Füge sie in Supabase ein

---

## 4️⃣ API Keys kopieren

### Schritt 1: Project Settings
1. Linke Sidebar → **Project Settings** (Zahnrad-Icon unten)
2. → **API**

### Schritt 2: Keys kopieren
Kopiere folgende Werte:
- **Project URL** (z.B. `https://xyzabc.supabase.co`)
- **anon public** Key (langer String)

⚠️ **NICHT** den `service_role` Key verwenden!

---

## 5️⃣ Environment Variables einrichten

### Schritt 1: .env Datei erstellen
Im Projekt-Ordner:

\`\`\`bash
cp .env.example .env
\`\`\`

### Schritt 2: .env bearbeiten
Öffne `.env` und füge ein:

\`\`\`env
VITE_SUPABASE_URL=https://DEIN-PROJEKT.supabase.co
VITE_SUPABASE_ANON_KEY=dein-anon-key-hier
\`\`\`

**Ersetze** die Werte mit deinen echten Keys!

---

## 6️⃣ Dependencies installieren

\`\`\`bash
npm install
\`\`\`

---

## 7️⃣ App starten

\`\`\`bash
npm run dev
\`\`\`

🎉 **Fertig!** Die App läuft auf [http://localhost:3000](http://localhost:3000)

---

## ✅ Funktionen testen

### Test 1: Registrierung
1. Klicke auf "Anmelden"
2. Wechsle zu "Registrieren"
3. Gib E-Mail und Passwort ein
4. ✉️ Bestätigungs-E-Mail wird gesendet

### Test 2: E-Mail bestätigen
1. Öffne deine E-Mail
2. Klicke auf Bestätigungs-Link
3. ✅ Account aktiviert

### Test 3: Login
1. Melde dich an
2. Dein Fortschritt wird geladen
3. Lernen → Änderungen werden automatisch gespeichert

### Test 4: Google Login (wenn aktiviert)
1. Klicke auf "Mit Google anmelden"
2. Wähle Google-Account
3. ✅ Angemeldet

---

## 🔒 Sicherheit & DSGVO

### EU-Server ✅
- Projekt in EU-Region erstellt → DSGVO-konform
- Daten bleiben in Europa

### Row Level Security (RLS) ✅
- User können nur eigene Daten sehen
- Automatisch durch Policies geschützt

### Passwörter ✅
- Automatisch verschlüsselt (bcrypt)
- Nie im Klartext gespeichert

---

## 🛠️ Troubleshooting

### Problem: "Invalid API credentials"
✅ **Lösung:** Überprüfe `.env` Datei
- URL und Key korrekt?
- Keine Leerzeichen?
- Datei heißt `.env` (nicht `.env.txt`)?

### Problem: "Failed to fetch"
✅ **Lösung:**
- Supabase Projekt läuft? (Dashboard checken)
- Internet-Verbindung OK?

### Problem: "Email not confirmed"
✅ **Lösung:**
- Bestätigungs-E-Mail checken (auch Spam!)
- Oder in Supabase Dashboard → Authentication → Users → User anklicken → "Confirm email"

### Problem: Google Login funktioniert nicht
✅ **Lösung:**
- Provider aktiviert?
- Redirect URI korrekt?
- Browser-Cookies erlaubt?

---

## 📊 Daten ansehen

### User ansehen
1. Dashboard → **Authentication** → **Users**
2. Siehe alle registrierten User

### Progress ansehen
1. Dashboard → **Table Editor** → **user_progress**
2. Siehe Lernfortschritt aller User

---

## 🚀 Self-Hosting (später)

Wenn du Supabase auf deinem eigenen Server hosten willst:

### Docker Installation
\`\`\`bash
git clone https://github.com/supabase/supabase
cd supabase/docker
cp .env.example .env
docker-compose up -d
\`\`\`

### Anleitung
[Supabase Self-Hosting Docs](https://supabase.com/docs/guides/self-hosting)

**Migration von Cloud → Self-Hosted:**
1. Datenbank exportieren (Dashboard → Database → Backups)
2. Im Self-Hosted: Datenbank importieren
3. `.env` anpassen mit neuer URL

---

## 📚 Weitere Ressourcen

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [React + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)

---

## 💬 Support

Bei Fragen:
- Supabase Discord: [discord.supabase.com](https://discord.supabase.com)
- Supabase GitHub Issues

---

**Viel Erfolg mit deiner ICD-10 Lernplattform! 🎓**
