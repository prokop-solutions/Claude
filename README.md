# ICD-10 Lernplattform

🧠 **Interaktive Lernplattform für ICD-10 F0-F9 Diagnosen** (Psychische und Verhaltensstörungen)

## ✨ Features

### 🎓 4 Lernmodi
- **Explorer**: Durchstöbere alle F0-F9 Kategorien mit 22 Diagnosen
- **Leitner-Box**: Spaced Repetition System (5-Boxen-Methode)
- **Lernkarten**: Systematisch alle Diagnosen durchgehen
- **Quiz**: Fallbasierte Multiple-Choice Tests

### 🔐 Benutzer-System (Supabase)
- ✅ E-Mail/Passwort Registrierung & Login
- ✅ Google Social Login
- ✅ Automatische Fortschrittsspeicherung
- ✅ DSGVO-konform (EU-Server)
- ✅ Sichere Datenspeicherung

### 📊 Fortschritt-Tracking
- Leitner-Box Status wird gespeichert
- Quiz-Statistiken (Richtig/Falsch, Prozent)
- Geräteübergreifende Synchronisation

### 🎨 Modern & Responsive
- Tailwind CSS Design
- Lucide Icons
- Gradient Buttons
- Mobile-friendly

## 🚀 Quick Start

### 1. Repository klonen
```bash
git clone <repository-url>
cd Claude
```

### 2. Dependencies installieren
```bash
npm install
```

### 3. Supabase einrichten
📖 **Folge der Anleitung:** [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

Kurzfassung:
1. Erstelle Supabase Projekt (EU-Region!)
2. Führe `supabase-schema.sql` im SQL Editor aus
3. Kopiere API Keys in `.env`

### 4. App starten
```bash
npm run dev
```

🎉 App läuft auf http://localhost:3000

## 📁 Projektstruktur

```
Claude/
├── src/
│   ├── components/
│   │   ├── ICD10LearningSystem.jsx          # Ursprüngliche Komponente (ohne Auth)
│   │   ├── ICD10LearningSystemWithAuth.jsx  # Mit Supabase Auth
│   │   └── auth/
│   │       └── AuthModal.jsx                 # Login/Register Modal
│   ├── contexts/
│   │   └── AuthContext.jsx                   # React Context für Auth
│   ├── lib/
│   │   ├── supabase.js                       # Supabase Client
│   │   └── progressService.js                # Fortschritt laden/speichern
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── supabase-schema.sql                       # Datenbank Schema
├── SUPABASE_SETUP.md                         # Setup Anleitung
├── .env.example                              # Environment Variablen Vorlage
└── package.json
```

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend/Auth**: Supabase
- **Datenbank**: PostgreSQL (Supabase)

## 📚 ICD-10 Inhalte

22 Diagnosen aus F0-F9:

- **F0**: Organische psychische Störungen (Demenz, Delir)
- **F1**: Substanzstörungen (Alkohol, Cannabis)
- **F2**: Schizophrenie & Wahn
- **F3**: Affektive Störungen (Depression, Bipolar)
- **F4**: Neurotische Störungen (Angst, PTBS)
- **F5**: Verhaltensauffälligkeiten (Anorexie, Bulimie)
- **F6**: Persönlichkeitsstörungen (Borderline, Dissozial)
- **F7**: Intelligenzminderung
- **F8**: Entwicklungsstörungen (Autismus, Asperger)
- **F9**: Störungen Kindheit/Jugend (ADHS, Sozialverhalten)

Jede Diagnose enthält:
- ✅ ICD-10 Code
- ✅ Definition
- ✅ Hauptsymptome
- ✅ 3 Fallbeispiele
- ✅ Merkhilfe/Eselsbrücke

## 🔒 Sicherheit & Datenschutz

- ✅ **DSGVO-konform**: EU-Server (Frankfurt/London)
- ✅ **Row Level Security**: User sehen nur eigene Daten
- ✅ **Passwörter**: Automatisch verschlüsselt (bcrypt)
- ✅ **OAuth**: Sichere Google-Anmeldung
- ✅ **API Keys**: Niemals im Code committed (.gitignore)

## 🎯 Verwendung

### Ohne Login (Gast)
- Alle Funktionen nutzbar
- Fortschritt nur in Browser-Session
- Keine Synchronisation

### Mit Login
- Fortschritt wird in Cloud gespeichert
- Geräteübergreifend synchronisiert
- Quiz-Statistiken persistent

## 🚀 Build für Production

```bash
npm run build
npm run preview
```

Deployment:
- Vercel
- Netlify
- Eigener Server

## 📖 Weitere Dokumentation

- [Supabase Setup Guide](./SUPABASE_SETUP.md)
- [Supabase Self-Hosting](https://supabase.com/docs/guides/self-hosting)

## 🤝 Beitragen

Contributions willkommen! Features, Bugfixes, neue Diagnosen.

## 📄 Lizenz

MIT

## 💡 Ideen für Erweiterungen

- [ ] Mehr Diagnosen (F0-F9 komplett)
- [ ] ICD-10 F-Kapitel komplett
- [ ] Suchfunktion
- [ ] Favoriten
- [ ] Notizen pro Diagnose
- [ ] Lerngruppen/Multiplayer
- [ ] PDF Export
- [ ] Dark Mode

---

**Viel Erfolg beim Lernen! 🎓**
