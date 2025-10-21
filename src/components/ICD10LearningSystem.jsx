import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Brain, BookOpen, FileText, Award, ArrowLeft, ArrowRight, Check, X, RotateCcw, Home, ThumbsUp, ThumbsDown, Package } from 'lucide-react';

const ICD10LearningSystem = () => {
// Daten zuerst definieren
const icd10Data = {
F0: {
title: "Organische psychische Störungen",
color: "bg-red-100 border-red-400",
subcategories: {
"F00": {
code: "F00", name: "Demenz bei Alzheimer",
definition: "Progrediente neurodegenerative Erkrankung mit Gedächtnisverlust und kognitiven Einbußen.",
symptoms: ["Gedächtnisstörungen", "Orientierungsstörungen", "Sprachstörungen", "Beeinträchtigung Alltagsaktivitäten"],
cases: ["Frau M., 72: Vergisst Termine, findet nicht nach Hause.", "Herr K., 68: Stellt dieselben Fragen mehrfach.", "Frau T., 75: Lässt Herd an, verirrt sich."],
tip: "💡 DEMENZ = Denken Eingeschränkt, Merkfähigkeit Erloschen"
},
"F05": {
code: "F05", name: "Delir",
definition: "Akut auftretende Bewusstseinsstörung mit Desorientiertheit. Oft reversibel.",
symptoms: ["Bewusstseinstrübung", "Desorientierung", "Halluzinationen", "Psychomotorische Unruhe"],
cases: ["Herr B., 80, postop: Sieht Spinnen, will aus Bett.", "Frau L., 75: Verwirrt, ruft nach Verstorbenen.", "Herr D., 82: Aggressiv, schimpft."],
tip: "💡 AKUT (vs. schleichende Demenz), nachts schlimmer!"
}
}
},
F1: {
title: "Störungen durch Substanzen",
color: "bg-orange-100 border-orange-400",
subcategories: {
"F10": {
code: "F10.2", name: "Alkoholabhängigkeit",
definition: "Zwanghafter Konsum trotz negativer Folgen. Kontrollverlust, Toleranz, Entzug.",
symptoms: ["Craving", "Kontrollverlust", "Toleranz", "Entzugssymptome", "Vernachlässigung"],
cases: ["Herr S., 45: Trinkt täglich, zittert morgens.", "Frau G., 52: Heimliches Trinken, Wodka versteckt.", "Herr M., 38: Drei Unfälle unter Alkohol."],
tip: "💡 6 Kriterien - mind. 3 = Abhängigkeit"
},
"F12": {
code: "F12.1", name: "Schädlicher Cannabisgebrauch",
definition: "Cannabiskonsum mit Gesundheitsschäden, ohne Abhängigkeit.",
symptoms: ["Motivationsverlust", "Konzentrationsstörungen", "Sozialer Rückzug", "Leistungsabfall"],
cases: ["Tim, 19: Kifft täglich, Ausbildung abgebrochen.", "Lisa, 22: Paranoia beim Kiffen.", "Max, 17: Kifft vor Schule, sitzengeblieben."],
tip: "💡 Schädlich aber nicht abhängig (wäre F12.2)"
}
}
},
F2: {
title: "Schizophrenie & Wahn",
color: "bg-purple-100 border-purple-400",
subcategories: {
"F20": {
code: "F20.0", name: "Paranoide Schizophrenie",
definition: "Häufigste Form mit Wahn und Halluzinationen. Chronischer Verlauf.",
symptoms: ["Stimmenhören", "Verfolgungswahn", "Ich-Störungen", "Misstrauen"],
cases: ["Herr P., 28: Hört Stimmen, glaubt überwacht zu werden.", "Frau K., 35: TV sendet Botschaften.", "Herr L., 24: Gedanken werden gestohlen."],
tip: "💡 PARANOIDe = PARAnoia + HalluziNOIDen"
},
"F22": {
code: "F22.0", name: "Wahnhafte Störung",
definition: "Anhaltender Wahn (mind. 3 Mon.) ohne andere Symptome.",
symptoms: ["Wahngedanken", "Keine/kaum Halluzinationen", "Sonst normale Persönlichkeit"],
cases: ["Frau H., 55: Überzeugt von Affäre des Mannes.", "Herr W., 48: Strahlen von Nachbarn.", "Frau N., 62: Schauspieler verliebt."],
tip: "💡 NUR Wahn, KEINE Halluzinationen"
}
}
},
F3: {
title: "Affektive Störungen",
color: "bg-blue-100 border-blue-400",
subcategories: {
"F32": {
code: "F32", name: "Depressive Episode",
definition: "Gedrückte Stimmung, Interessenverlust, Antriebsminderung. Mind. 2 Wochen.",
symptoms: ["Gedrückte Stimmung", "Interessenverlust", "Antriebsminderung", "Schlafstörungen", "Suizidgedanken"],
cases: ["Frau A., 42: Liegt im Bett, weint oft, Suizidgedanken.", "Herr F., 35: Schläft kaum, geht nicht zur Arbeit.", "Frau R., 50: Erschöpft, keine Freude."],
tip: "💡 HAMburger = Hemmung, Affekt gedrückt, Minus Freude"
},
"F31": {
code: "F31", name: "Bipolare Störung",
definition: "Wechsel zwischen manischen und depressiven Phasen.",
symptoms: ["Manisch: Wenig Schlaf, Größenideen", "Depressiv: wie F32", "Symptomfreie Intervalle"],
cases: ["Herr T., 38: Kaum Schlaf, startet Firmen. Dann Absturz.", "Frau D., 45: Erstmals gehoben nach 5 Depressionen.", "Herr N., 29: Zyklus 4-6 Monate."],
tip: "💡 BI-polar = 2 Pole = Hoch UND Tief"
}
}
},
F4: {
title: "Neurotische Störungen",
color: "bg-yellow-100 border-yellow-400",
subcategories: {
"F41": {
code: "F41.1", name: "Generalisierte Angststörung",
definition: "Anhaltende frei flottierende Angst über Alltägliches. Mind. 6 Monate.",
symptoms: ["Ständige Nervosität", "Übermäßige Sorgen", "Konzentrationsprobleme", "Muskelverspannungen"],
cases: ["Frau S., 38: Permanent Sorgen, verspannt.", "Herr G., 45: Grübelt über Katastrophen.", "Frau W., 52: Sorgt sich um alles."],
tip: "💡 GENERALISIERT = Angst vor ALLEM"
},
"F43": {
code: "F43.1", name: "PTBS",
definition: "Verzögerte Reaktion auf Trauma. Wiedererleben, Vermeidung, Übererregung.",
symptoms: ["Flashbacks/Albträume", "Vermeidung", "Übererregung", "Emotionale Taubheit"],
cases: ["Herr K., 35, nach Unfall: Albträume, meidet Auto.", "Frau L., 28, nach Überfall: Flashbacks, verlässt Wohnung kaum.", "Herr P., 42, nach Krieg: Alpträume, aggressiv."],
tip: "💡 Trias = Wiedererleben, Vermeidung, Übererregung"
}
}
},
F5: {
title: "Verhaltensauffälligkeiten",
color: "bg-green-100 border-green-400",
subcategories: {
"F50a": {
code: "F50.0", name: "Anorexia nervosa",
definition: "Selbst herbeigeführter Gewichtsverlust. Verzerrte Körperwahrnehmung.",
symptoms: ["BMI <17,5", "Verzerrte Wahrnehmung", "Angst vor Gewicht", "Amenorrhoe"],
cases: ["Lisa, 16, 42kg: Nur Salat, exzessiv Sport.", "Anna, 19, BMI 15: Zählt Kalorien.", "Marie, 22, 35kg: Rituelle Essensregeln."],
tip: "💡 Anorexie = Hungern, Bulimie = Erbrechen"
},
"F50b": {
code: "F50.2", name: "Bulimia nervosa",
definition: "Wiederholte Essanfälle mit Gegenmaßnahmen (Erbrechen).",
symptoms: ["Essanfälle", "Erbrechen", "Beschäftigung mit Figur", "Normalgewicht"],
cases: ["Sarah, 24: Isst heimlich, erbricht, Zahnschäden.", "Julia, 20: Essattacken abends, Abführmittel.", "Lena, 27: Kontrolliert tags, nachts Heißhunger."],
tip: "💡 Bulimie = Ess-BRECH-Sucht"
}
}
},
F6: {
title: "Persönlichkeitsstörungen",
color: "bg-pink-100 border-pink-400",
subcategories: {
"F60a": {
code: "F60.31", name: "Borderline-Störung",
definition: "Impulsivität, instabile Beziehungen, Stimmungsschwankungen.",
symptoms: ["Instabile Beziehungen", "Gestörtes Selbstbild", "Impulsivität", "Selbstverletzung", "Verlassensangst"],
cases: ["Nina, 25: Ritzt sich, klammert, fühlt sich leer.", "Tom, 28: Partner 'perfekt' oder 'Monster'.", "Laura, 23: Panikangst verlassen zu werden."],
tip: "💡 BORDER-line = an der Grenze"
},
"F60b": {
code: "F60.2", name: "Dissoziale Störung",
definition: "Missachtung sozialer Normen, mangelndes Mitgefühl.",
symptoms: ["Missachtung Normen", "Kein Schuldbewusstsein", "Kein Einfühlungsvermögen", "Aggressivität"],
cases: ["Mark, 32: Vorstrafen, belügt ohne Reue.", "Stefan, 38: Manipulativ, nutzt aus.", "Peter, 29: Impulsive Gewalt."],
tip: "💡 Früher 'Psychopathie'"
}
}
},
F7: {
title: "Intelligenzminderung",
color: "bg-indigo-100 border-indigo-400",
subcategories: {
"F70": {
code: "F70", name: "Leichte Intelligenzminderung",
definition: "IQ 50-69. Kann Alltagskompetenzen erlernen.",
symptoms: ["IQ 50-69", "Verzögerte Entwicklung", "Lernschwierigkeiten", "Selbstständigkeit möglich"],
cases: ["Tim, 12: Förderschule, kommt im Alltag zurecht.", "Anna, 25: Arbeitet in Werkstatt, wohnt betreut.", "Max, 18: Hauptschule mit Förderung."],
tip: "💡 LEICHT = Lernen möglich"
},
"F71": {
code: "F71", name: "Mittelgradige Intelligenzminderung",
definition: "IQ 35-49. Benötigt lebenslang Betreuung.",
symptoms: ["IQ 35-49", "Deutlich verzögert", "Begrenzte Sprache", "Ständige Betreuung"],
cases: ["Leon, 15: Kurze Sätze, Hilfe beim Anziehen.", "Lisa, 22: Lebt in Wohnheim, Hilfe bei Pflege.", "Ben, 28: Einfache Worte, braucht Hilfe."],
tip: "💡 Mittelgradig = Mehr Betreuung"
}
}
},
F8: {
title: "Entwicklungsstörungen",
color: "bg-cyan-100 border-cyan-400",
subcategories: {
"F84a": {
code: "F84.0", name: "Frühkindlicher Autismus",
definition: "Tiefgreifende Störung vor 3. Lebensjahr. Beeinträchtigung Interaktion.",
symptoms: ["Beeinträchtigte Interaktion", "Kommunikationsprobleme", "Stereotype Muster", "Beginn <3 Jahre"],
cases: ["Leo, 4: Spricht nicht, meidet Blickkontakt, reiht auf.", "Mia, 5: Echolalie, keine Mimik, dreht sich.", "Ben, 6: Spricht monoton über Züge."],
tip: "💡 Trias: Sozial, Kommunikation, Stereotype"
},
"F84b": {
code: "F84.5", name: "Asperger-Syndrom",
definition: "Autismus ohne Sprachverzögerung. Oft normale Intelligenz.",
symptoms: ["Soziale Probleme", "Spezialinteressen", "Motorisch ungeschickt", "Normale Sprache"],
cases: ["Tim, 10: Weiß alles über Dinos, versteht Ironie nicht.", "Lisa, 14: Gute Noten, nimmt wörtlich.", "Max, 16: Hochintelligent, versteht soziale Regeln nicht."],
tip: "💡 Asperger = Autismus ohne Sprachprobleme"
}
}
},
F9: {
title: "Störungen Kindheit/Jugend",
color: "bg-teal-100 border-teal-400",
subcategories: {
"F90": {
code: "F90", name: "ADHS",
definition: "Hyperkinetische Störung mit Unaufmerksamkeit, Hyperaktivität, Impulsivität.",
symptoms: ["Unaufmerksamkeit", "Hyperaktivität", "Impulsivität", "Beginn vor 7 Jahren"],
cases: ["Tom, 8: Kann nicht stillsitzen, platzt raus.", "Emma, 10: Träumt, verliert Sachen.", "Luca, 9: Zappelt, unterbricht, gefährlich."],
tip: "💡 ADHS = Aufmerksamkeitsdefizit + Hyperaktivität"
},
"F91": {
code: "F91", name: "Störung Sozialverhalten",
definition: "Wiederholendes dissoziales, aggressives Verhalten.",
symptoms: ["Aggressivität", "Zerstörung", "Betrug/Diebstahl", "Regelverletzungen"],
cases: ["Kevin, 13: Prügelt, stiehlt, schwänzt.", "Sarah, 14: Lügt, Auto gestohlen.", "Marco, 12: Quält Tiere, zündet an."],
tip: "💡 Kernmerkmal: Verletzung der Rechte anderer"
}
}
}
};

// States - jetzt NACH icd10Data
const [mode, setMode] = useState('menu');
const [selectedMainCat, setSelectedMainCat] = useState(null);
const [selectedSubCat, setSelectedSubCat] = useState(null);
const [currentCardIndex, setCurrentCardIndex] = useState(0);
const [showAnswer, setShowAnswer] = useState(false);
const [quizAnswer, setQuizAnswer] = useState(null);
const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
const [currentQuizCase, setCurrentQuizCase] = useState(null);

// Leitner Box System - Initial: Alle Karten in Box 1
const getInitialBoxes = () => {
const initial = {};
Object.keys(icd10Data).forEach(mainCat => {
Object.keys(icd10Data[mainCat].subcategories).forEach(subCat => {
initial[subCat] = 1;
});
});
return initial;
};

const [boxSystem, setBoxSystem] = useState(getInitialBoxes());
const [currentLeitnerCard, setCurrentLeitnerCard] = useState(null);

// Speichere Box-System im State (bleibt während der Session erhalten)

const getAllDiagnoses = () => {
const diagnoses = [];
Object.keys(icd10Data).forEach(mainCat => {
Object.keys(icd10Data[mainCat].subcategories).forEach(subCat => {
diagnoses.push({
mainCat,
subCat,
...icd10Data[mainCat].subcategories[subCat]
});
});
});
return diagnoses;
};

// Nächste Karte nach Leitner-System auswählen
const selectNextLeitnerCard = () => {
const allDiagnoses = getAllDiagnoses();

// Priorisiere niedrigere Boxen
const boxPriority = [1, 2, 3, 4, 5];

for (const box of boxPriority) {
  const cardsInBox = allDiagnoses.filter(d => boxSystem[d.subCat] === box);
  if (cardsInBox.length > 0) {
    const randomCard = cardsInBox[Math.floor(Math.random() * cardsInBox.length)];
    return randomCard;
  }
}

return allDiagnoses[0]; // Fallback
};

const handleLeitnerAnswer = (known) => {
if (!currentLeitnerCard) return;

const currentBox = boxSystem[currentLeitnerCard.subCat];
let newBox;

if (known) {
  // Gewusst: eine Box höher (max 5)
  newBox = Math.min(5, currentBox + 1);
} else {
  // Nicht gewusst: zurück zu Box 1
  newBox = 1;
}

setBoxSystem(prev => ({
  ...prev,
  [currentLeitnerCard.subCat]: newBox
}));

// Nächste Karte
setShowAnswer(false);
setCurrentLeitnerCard(selectNextLeitnerCard());
};

const getBoxStatistics = () => {
const stats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
Object.values(boxSystem).forEach(box => {
stats[box]++;
});
return stats;
};

const resetBoxSystem = () => {
const initial = {};
Object.keys(icd10Data).forEach(mainCat => {
Object.keys(icd10Data[mainCat].subcategories).forEach(subCat => {
initial[subCat] = 1;
});
});
setBoxSystem(initial);
setCurrentLeitnerCard(null);
};

const generateQuizCase = () => {
const allDiagnoses = getAllDiagnoses();
const randomDiagnosis = allDiagnoses[Math.floor(Math.random() * allDiagnoses.length)];
const randomCase = randomDiagnosis.cases[Math.floor(Math.random() * randomDiagnosis.cases.length)];

const wrongOptions = [];
while (wrongOptions.length < 3) {
  const randomWrong = allDiagnoses[Math.floor(Math.random() * allDiagnoses.length)];
  if (randomWrong.code !== randomDiagnosis.code && !wrongOptions.find(o => o.code === randomWrong.code)) {
    wrongOptions.push(randomWrong);
  }
}

const allOptions = [randomDiagnosis, ...wrongOptions].sort(() => Math.random() - 0.5);

return {
  case: randomCase,
  correct: randomDiagnosis,
  options: allOptions
};
};

const startQuiz = () => {
setMode('quiz');
setQuizScore({ correct: 0, total: 0 });
setQuizAnswer(null);
setCurrentQuizCase(generateQuizCase());
};

const startLeitner = () => {
setMode('leitner');
setShowAnswer(false);
setCurrentLeitnerCard(selectNextLeitnerCard());
};

const handleQuizAnswer = (selected) => {
setQuizAnswer(selected);
const isCorrect = selected.code === currentQuizCase.correct.code;
setQuizScore(prev => ({
correct: prev.correct + (isCorrect ? 1 : 0),
total: prev.total + 1
}));
};

const nextQuizQuestion = () => {
setQuizAnswer(null);
setCurrentQuizCase(generateQuizCase());
};

const resetToHome = () => {
setMode('menu');
setSelectedMainCat(null);
setSelectedSubCat(null);
};

const allDiagnoses = getAllDiagnoses();
const boxStats = getBoxStatistics();

// Hauptmenü
if (mode === 'menu') {
return (
<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
<div className="max-w-5xl mx-auto">
<div className="text-center mb-12">
<h1 className="text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
<Brain className="w-12 h-12 text-indigo-600" />
ICD-10 Lernsystem
</h1>
<p className="text-xl text-gray-600">F0-F9: Psychische und Verhaltensstörungen</p>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button
          onClick={() => setMode('explorer')}
          className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          <BookOpen className="w-12 h-12 mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">Explorer</h2>
          <p className="text-sm text-blue-100">Kategorien durchstöbern</p>
        </button>

        <button
          onClick={startLeitner}
          className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          <Package className="w-12 h-12 mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">Leitner-Box</h2>
          <p className="text-sm text-purple-100">5-Boxen-System</p>
        </button>

        <button
          onClick={() => setMode('flashcards')}
          className="bg-gradient-to-br from-pink-400 to-pink-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          <FileText className="w-12 h-12 mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">Lernkarten</h2>
          <p className="text-sm text-pink-100">Alle durchgehen</p>
        </button>

        <button
          onClick={startQuiz}
          className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          <Award className="w-12 h-12 mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">Quiz</h2>
          <p className="text-sm text-green-100">Wissen testen</p>
        </button>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Package className="w-6 h-6 text-purple-600" />
          Leitner-Box Statistik
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map(box => (
            <div key={box} className="text-center">
              <div className={`w-full h-20 rounded-lg flex items-center justify-center text-2xl font-bold ${
                box === 1 ? 'bg-red-200 text-red-800' :
                box === 2 ? 'bg-orange-200 text-orange-800' :
                box === 3 ? 'bg-yellow-200 text-yellow-800' :
                box === 4 ? 'bg-green-200 text-green-800' :
                'bg-blue-200 text-blue-800'
              }`}>
                {boxStats[box]}
              </div>
              <div className="text-sm text-gray-600 mt-2">Box {box}</div>
            </div>
          ))}
        </div>
        <button
          onClick={resetBoxSystem}
          className="mt-4 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Boxen zurücksetzen
        </button>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">📚 Über dieses System</h3>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li><strong>Explorer:</strong> Entdecke Kategorien und Diagnosen</li>
          <li><strong>Leitner-Box:</strong> Spaced Repetition - Gewusste Karten wandern hoch, falsche zurück zu Box 1</li>
          <li><strong>Lernkarten:</strong> Systematisch alle {allDiagnoses.length} Diagnosen durchgehen</li>
          <li><strong>Quiz:</strong> Teste dich selbst mit Fallbeispielen</li>
        </ul>
      </div>
    </div>
  </div>
);
}

// Leitner-Box Modus
if (mode === 'leitner' && currentLeitnerCard) {
const currentBox = boxSystem[currentLeitnerCard.subCat];

return (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button onClick={resetToHome} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold">
          <Home className="w-5 h-5" />
          Hauptmenü
        </button>
        <div className="flex items-center gap-4">
          <div className="text-sm font-semibold text-gray-700">
            Aktuelle Box: <span className={`text-lg ${
              currentBox === 1 ? 'text-red-600' :
              currentBox === 2 ? 'text-orange-600' :
              currentBox === 3 ? 'text-yellow-600' :
              currentBox === 4 ? 'text-green-600' :
              'text-blue-600'
            }`}>Box {currentBox}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-8 min-h-96">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-gray-800 mb-2">{currentLeitnerCard.code}</div>
          <div className="text-2xl font-bold text-gray-700">{currentLeitnerCard.name}</div>
        </div>

        {!showAnswer ? (
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-8">Was weißt du über diese Diagnose?</p>
            <button
              onClick={() => setShowAnswer(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
            >
              Antwort zeigen
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Definition:</h3>
              <p className="text-gray-700">{currentLeitnerCard.definition}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Hauptsymptome:</h3>
              <ul className="space-y-1">
                {currentLeitnerCard.symptoms.map((symptom, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Fallbeispiele:</h3>
              <div className="space-y-2">
                {currentLeitnerCard.cases.map((caseEx, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                    <strong>Fall {idx + 1}:</strong> {caseEx}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
              <p className="text-gray-800 font-semibold">{currentLeitnerCard.tip}</p>
            </div>

            <div className="border-t-2 pt-6">
              <p className="text-center text-lg font-bold text-gray-800 mb-4">Hast du diese Karte gewusst?</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleLeitnerAnswer(false)}
                  className="flex-1 bg-gradient-to-r from-red-400 to-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <ThumbsDown className="w-6 h-6" />
                  Nicht gewusst
                  <span className="text-sm opacity-80">(→ Box 1)</span>
                </button>
                <button
                  onClick={() => handleLeitnerAnswer(true)}
                  className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <ThumbsUp className="w-6 h-6" />
                  Gewusst!
                  <span className="text-sm opacity-80">(→ Box {Math.min(5, currentBox + 1)})</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-sm font-bold text-gray-700 mb-3">Box-Verteilung:</h3>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map(box => (
            <div key={box} className="text-center">
              <div className={`w-full h-12 rounded flex items-center justify-center font-bold ${
                box === 1 ? 'bg-red-200 text-red-800' :
                box === 2 ? 'bg-orange-200 text-orange-800' :
                box === 3 ? 'bg-yellow-200 text-yellow-800' :
                box === 4 ? 'bg-green-200 text-green-800' :
                'bg-blue-200 text-blue-800'
              }`}>
                {boxStats[box]}
              </div>
              <div className="text-xs text-gray-600 mt-1">Box {box}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}

// Quiz Modus
if (mode === 'quiz') {
return (
<div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
<div className="max-w-4xl mx-auto">
<div className="flex justify-between items-center mb-8">
<button onClick={resetToHome} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold">
<Home className="w-5 h-5" />
Hauptmenü
</button>
<div className="text-xl font-bold text-gray-800">
Score: {quizScore.correct}/{quizScore.total}
</div>
</div>

      {currentQuizCase && (
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welche Diagnose passt zu diesem Fall?</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <p className="text-lg text-gray-800">{currentQuizCase.case}</p>
            </div>
          </div>

          <div className="space-y-3">
            {currentQuizCase.options.map((option, idx) => {
              const isSelected = quizAnswer && quizAnswer.code === option.code;
              const isCorrect = option.code === currentQuizCase.correct.code;
              const showResult = quizAnswer !== null;

              let buttonClass = "w-full p-4 rounded-xl border-2 text-left transition-all ";
              if (!showResult) {
                buttonClass += "bg-gray-50 border-gray-300 hover:bg-blue-50 hover:border-blue-400";
              } else if (isCorrect) {
                buttonClass += "bg-green-100 border-green-500";
              } else if (isSelected && !isCorrect) {
                buttonClass += "bg-red-100 border-red-500";
              } else {
                buttonClass += "bg-gray-50 border-gray-300";
              }

              return (
                <button
                  key={idx}
                  onClick={() => !quizAnswer && handleQuizAnswer(option)}
                  disabled={quizAnswer !== null}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-800">{option.code}</div>
                      <div className="text-gray-700">{option.name}</div>
                    </div>
                    {showResult && isCorrect && <Check className="w-6 h-6 text-green-600" />}
                    {showResult && isSelected && !isCorrect && <X className="w-6 h-6 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {quizAnswer && (
            <div className="mt-8">
              <div className={`p-6 rounded-xl ${quizAnswer.code === currentQuizCase.correct.code ? 'bg-green-50 border-2 border-green-400' : 'bg-red-50 border-2 border-red-400'}`}>
                <h3 className="text-xl font-bold mb-3">
                  {quizAnswer.code === currentQuizCase.correct.code ? '✓ Richtig!' : '✗ Falsch'}
                </h3>
                <div className="mb-3">
                  <strong>Korrekte Diagnose:</strong> {currentQuizCase.correct.code} - {currentQuizCase.correct.name}
                </div>
                <div className="text-gray-700 mb-2">{currentQuizCase.correct.definition}</div>
                <div className="text-sm text-gray-600">{currentQuizCase.correct.tip}</div>
              </div>
              <button
                onClick={nextQuizQuestion}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Nächste Frage <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);
}

// Lernkarten Modus
if (mode === 'flashcards') {
const currentCard = allDiagnoses[currentCardIndex];

return (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button onClick={resetToHome} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold">
          <Home className="w-5 h-5" />
          Hauptmenü
        </button>
        <div className="text-xl font-bold text-gray-800">
          Karte {currentCardIndex + 1} / {allDiagnoses.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-8 min-h-96">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-gray-800 mb-2">{currentCard.code}</div>
          <div className="text-2xl font-bold text-gray-700">{currentCard.name}</div>
        </div>

        {!showAnswer ? (
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-8">Was weißt du über diese Diagnose?</p>
            <button
              onClick={() => setShowAnswer(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
            >
              Antwort zeigen
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Definition:</h3>
              <p className="text-gray-700">{currentCard.definition}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Hauptsymptome:</h3>
              <ul className="space-y-1">
                {currentCard.symptoms.map((symptom, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Fallbeispiele:</h3>
              <div className="space-y-2">
                {currentCard.cases.map((caseEx, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                    <strong>Fall {idx + 1}:</strong> {caseEx}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
              <p className="text-gray-800 font-semibold">{currentCard.tip}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => {
            setShowAnswer(false);
            setCurrentCardIndex(Math.max(0, currentCardIndex - 1));
          }}
          disabled={currentCardIndex === 0}
          className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-bold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Vorherige
        </button>
        <button
          onClick={() => {
            setShowAnswer(false);
            setCurrentCardIndex(Math.min(allDiagnoses.length - 1, currentCardIndex + 1));
          }}
          disabled={currentCardIndex === allDiagnoses.length - 1}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-6 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Nächste
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);
}

// Explorer Modus - Detailansicht
if (mode === 'explorer' && selectedSubCat && selectedMainCat) {
const diagnosis = icd10Data[selectedMainCat].subcategories[selectedSubCat];
return (
<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
<div className="max-w-4xl mx-auto">
<div className="flex justify-between items-center mb-6">
<button
onClick={() => setSelectedSubCat(null)}
className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold"
>
<ArrowLeft className="w-5 h-5" />
Zurück zu {selectedMainCat}
</button>
<button
onClick={resetToHome}
className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold"
>
<Home className="w-5 h-5" />
Hauptmenü
</button>
</div>

      <div className={`${icd10Data[selectedMainCat].color} border-2 rounded-2xl shadow-2xl p-8`}>
        <div className="mb-6">
          <div className="text-3xl font-bold text-gray-800 mb-2">{diagnosis.code}</div>
          <div className="text-2xl font-bold text-gray-700 mb-4">{diagnosis.name}</div>
          <div className="text-lg text-gray-700 italic">{diagnosis.definition}</div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Check className="w-6 h-6 text-green-600" />
            Hauptsymptome
          </h3>
          <ul className="space-y-2">
            {diagnosis.symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start bg-white bg-opacity-70 p-3 rounded-lg">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span className="text-gray-700">{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Fallbeispiele
          </h3>
          <div className="space-y-3">
            {diagnosis.cases.map((caseEx, idx) => (
              <div key={idx} className="bg-white bg-opacity-70 p-4 rounded-lg border-l-4 border-blue-500">
                <span className="font-semibold text-blue-700">Fall {idx + 1}:</span>
                <p className="text-gray-700 mt-1">{caseEx}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
          <p className="text-gray-800 font-semibold">{diagnosis.tip}</p>
        </div>
      </div>
    </div>
  </div>
);
}

// Explorer Modus - Unterkategorien
if (mode === 'explorer' && selectedMainCat) {
const category = icd10Data[selectedMainCat];
return (
<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
<div className="max-w-6xl mx-auto">
<div className="flex justify-between items-center mb-6">
<button
onClick={() => setSelectedMainCat(null)}
className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold"
>
<ArrowLeft className="w-5 h-5" />
Zurück zur Übersicht
</button>
<button
onClick={resetToHome}
className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold"
>
<Home className="w-5 h-5" />
Hauptmenü
</button>
</div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedMainCat}</h2>
        <p className="text-xl text-gray-600">{category.title}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Object.keys(category.subcategories).map(subCat => {
          const diagnosis = category.subcategories[subCat];
          return (
            <div
              key={subCat}
              onClick={() => setSelectedSubCat(subCat)}
              className={`${category.color} border-2 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer p-5 transform hover:scale-105`}
            >
              <div className="font-bold text-xl text-gray-800 mb-2">{diagnosis.code}</div>
              <div className="font-semibold text-lg text-gray-700 mb-3">{diagnosis.name}</div>
              <div className="text-sm text-gray-600 italic">{diagnosis.definition}</div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
}

// Explorer Modus - Hauptkategorien
if (mode === 'explorer') {
return (
<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
<div className="max-w-6xl mx-auto">
<div className="flex justify-between items-center mb-8">
<h1 className="text-3xl font-bold text-gray-800">Explorer Modus</h1>
<button
onClick={resetToHome}
className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold"
>
<Home className="w-5 h-5" />
Hauptmenü
</button>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.keys(icd10Data).map(mainCat => {
          const category = icd10Data[mainCat];
          const subCatCount = Object.keys(category.subcategories).length;

          return (
            <div
              key={mainCat}
              onClick={() => setSelectedMainCat(mainCat)}
              className={`${category.color} border-2 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer p-6 transform hover:scale-105`}
            >
              <div className="font-bold text-2xl text-gray-800 mb-2">{mainCat}</div>
              <div className="font-semibold text-lg text-gray-700 mb-3">{category.title}</div>
              <div className="text-sm text-gray-600">{subCatCount} Diagnosen</div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
}

return null;
};

export default ICD10LearningSystem;
