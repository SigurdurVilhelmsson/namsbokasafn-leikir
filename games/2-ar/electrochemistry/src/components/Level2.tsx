import { useState } from 'react';
import { FeedbackPanel } from '@shared/components';

interface Level2Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

// Standard reduction potentials table (E° values in Volts)
const standardPotentials: { halfReaction: string; species: string; potential: number }[] = [
  { halfReaction: 'F₂ + 2e⁻ → 2F⁻', species: 'F₂/F⁻', potential: 2.87 },
  { halfReaction: 'Au³⁺ + 3e⁻ → Au', species: 'Au³⁺/Au', potential: 1.50 },
  { halfReaction: 'Cl₂ + 2e⁻ → 2Cl⁻', species: 'Cl₂/Cl⁻', potential: 1.36 },
  { halfReaction: 'Ag⁺ + e⁻ → Ag', species: 'Ag⁺/Ag', potential: 0.80 },
  { halfReaction: 'Cu²⁺ + 2e⁻ → Cu', species: 'Cu²⁺/Cu', potential: 0.34 },
  { halfReaction: '2H⁺ + 2e⁻ → H₂', species: 'H⁺/H₂', potential: 0.00 },
  { halfReaction: 'Pb²⁺ + 2e⁻ → Pb', species: 'Pb²⁺/Pb', potential: -0.13 },
  { halfReaction: 'Ni²⁺ + 2e⁻ → Ni', species: 'Ni²⁺/Ni', potential: -0.26 },
  { halfReaction: 'Fe²⁺ + 2e⁻ → Fe', species: 'Fe²⁺/Fe', potential: -0.44 },
  { halfReaction: 'Zn²⁺ + 2e⁻ → Zn', species: 'Zn²⁺/Zn', potential: -0.76 },
  { halfReaction: 'Al³⁺ + 3e⁻ → Al', species: 'Al³⁺/Al', potential: -1.66 },
  { halfReaction: 'Mg²⁺ + 2e⁻ → Mg', species: 'Mg²⁺/Mg', potential: -2.37 },
  { halfReaction: 'Na⁺ + e⁻ → Na', species: 'Na⁺/Na', potential: -2.71 },
  { halfReaction: 'K⁺ + e⁻ → K', species: 'K⁺/K', potential: -2.93 },
  { halfReaction: 'Li⁺ + e⁻ → Li', species: 'Li⁺/Li', potential: -3.04 },
];

interface CellProblem {
  id: number;
  questionType: 'calculate-ecell' | 'spontaneity' | 'stronger-reducing' | 'stronger-oxidizing';
  anode?: string;
  cathode?: string;
  metal1?: string;
  metal2?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const problems: CellProblem[] = [
  {
    id: 1,
    questionType: 'calculate-ecell',
    anode: 'Zn',
    cathode: 'Cu',
    question: 'Reiknaðu E°cell fyrir Zn-Cu rafhlöðu. (E°(Cu²⁺/Cu) = +0.34 V, E°(Zn²⁺/Zn) = -0.76 V)',
    options: ['+1.10 V', '-1.10 V', '+0.42 V', '-0.42 V'],
    correctAnswer: 0,
    hint: 'E°cell = E°cathode - E°anode',
    explanation: 'E°cell = E°(Cu) - E°(Zn) = 0.34 - (-0.76) = +1.10 V'
  },
  {
    id: 2,
    questionType: 'spontaneity',
    question: 'Ef E°cell = +0.46 V, er hvörfið sjálfvirkt?',
    options: ['Já, jákvætt E°cell þýðir sjálfvirkt', 'Nei, þarf ytri orku', 'Fer eftir hitastigi', 'Ekki hægt að segja'],
    correctAnswer: 0,
    hint: 'Jákvætt E°cell gefur til kynna sjálfvirkt hvarf.',
    explanation: 'Þegar E°cell > 0 er ΔG < 0 og hvörfið er sjálfvirkt (thermodynamically favorable).'
  },
  {
    id: 3,
    questionType: 'stronger-reducing',
    metal1: 'Fe',
    metal2: 'Cu',
    question: 'Hvor er sterkari afoxunarefni (reducing agent): Fe eða Cu?',
    options: ['Fe (E° = -0.44 V)', 'Cu (E° = +0.34 V)', 'Jafn sterk', 'Fer eftir styrkleika'],
    correctAnswer: 0,
    hint: 'Lægra E° þýðir sterkara afoxunarefni - vill meira gefa frá sér rafeindir.',
    explanation: 'Fe er sterkara afoxunarefni vegna þess að það hefur lægra E° (-0.44 V vs +0.34 V) og oxast frekar.'
  },
  {
    id: 4,
    questionType: 'calculate-ecell',
    anode: 'Mg',
    cathode: 'Ag',
    question: 'Reiknaðu E°cell fyrir Mg-Ag rafhlöðu. (E°(Ag⁺/Ag) = +0.80 V, E°(Mg²⁺/Mg) = -2.37 V)',
    options: ['+3.17 V', '-3.17 V', '+1.57 V', '-1.57 V'],
    correctAnswer: 0,
    hint: 'E°cell = E°cathode - E°anode. Mg er anode (oxast), Ag er cathode (afoxast).',
    explanation: 'E°cell = E°(Ag) - E°(Mg) = 0.80 - (-2.37) = +3.17 V'
  },
  {
    id: 5,
    questionType: 'spontaneity',
    question: 'Ef E°cell = -0.78 V, hvað þýðir það?',
    options: [
      'Hvörfið er sjálfvirkt',
      'Hvörfið er ekki sjálfvirkt, þarf ytri orku',
      'Hvörfið er í jafnvægi',
      'E° gildi er rangt'
    ],
    correctAnswer: 1,
    hint: 'Neikvætt E°cell gefur til kynna hvarf sem er ekki sjálfvirkt.',
    explanation: 'Þegar E°cell < 0 er ΔG > 0 og hvörfið er ekki sjálfvirkt - þarfnast ytri orku (rafgreiningar).'
  },
  {
    id: 6,
    questionType: 'stronger-oxidizing',
    metal1: 'Au',
    metal2: 'Zn',
    question: 'Hvor er sterkari oxunarefni (oxidizing agent): Au³⁺ jónir eða Zn²⁺ jónir?',
    options: ['Au³⁺ (E° = +1.50 V)', 'Zn²⁺ (E° = -0.76 V)', 'Jafn sterk', 'Hvorugt er oxunarefni'],
    correctAnswer: 0,
    hint: 'Hærra E° þýðir sterkara oxunarefni - vill frekar taka við rafeindum.',
    explanation: 'Au³⁺ er sterkara oxunarefni vegna þess að það hefur hærra E° (+1.50 V) og afoxast frekar.'
  },
  {
    id: 7,
    questionType: 'calculate-ecell',
    anode: 'Pb',
    cathode: 'Ag',
    question: 'Reiknaðu E°cell fyrir Pb-Ag rafhlöðu. (E°(Ag⁺/Ag) = +0.80 V, E°(Pb²⁺/Pb) = -0.13 V)',
    options: ['+0.93 V', '-0.93 V', '+0.67 V', '-0.67 V'],
    correctAnswer: 0,
    hint: 'E°cell = E°cathode - E°anode',
    explanation: 'E°cell = E°(Ag) - E°(Pb) = 0.80 - (-0.13) = +0.93 V'
  },
  {
    id: 8,
    questionType: 'stronger-reducing',
    metal1: 'Na',
    metal2: 'Ag',
    question: 'Raðaðu málmunum eftir afoxunargetu (sterkastur fyrst): Ag, Na, Fe',
    options: ['Na > Fe > Ag', 'Ag > Fe > Na', 'Fe > Na > Ag', 'Na > Ag > Fe'],
    correctAnswer: 0,
    hint: 'Lægra E° = sterkara afoxunarefni. Na er mjög hvarfgjarnt.',
    explanation: 'Na (E°=-2.71) > Fe (E°=-0.44) > Ag (E°=+0.80). Lægra E° = gefur frekar frá sér rafeindir.'
  },
  {
    id: 9,
    questionType: 'spontaneity',
    anode: 'Cu',
    cathode: 'Zn',
    question: 'Er hvörfið Cu + Zn²⁺ → Cu²⁺ + Zn sjálfvirkt? (E°(Cu²⁺/Cu) = +0.34 V, E°(Zn²⁺/Zn) = -0.76 V)',
    options: [
      'Já, E°cell > 0',
      'Nei, E°cell < 0',
      'Fer eftir styrk jóna',
      'Fer eftir hitastigi'
    ],
    correctAnswer: 1,
    hint: 'Ef Cu er að oxast (anode) og Zn²⁺ er að afoxast (cathode), reiknaðu E°cell.',
    explanation: 'E°cell = E°(Zn) - E°(Cu) = -0.76 - 0.34 = -1.10 V. Neikvætt E°cell = ekki sjálfvirkt.'
  },
  {
    id: 10,
    questionType: 'calculate-ecell',
    anode: 'Al',
    cathode: 'Ni',
    question: 'Reiknaðu E°cell fyrir Al-Ni rafhlöðu. (E°(Ni²⁺/Ni) = -0.26 V, E°(Al³⁺/Al) = -1.66 V)',
    options: ['+1.40 V', '-1.40 V', '+1.92 V', '-1.92 V'],
    correctAnswer: 0,
    hint: 'Al er anode (oxast) vegna þess að það hefur lægra E°.',
    explanation: 'E°cell = E°(Ni) - E°(Al) = -0.26 - (-1.66) = +1.40 V'
  },
  {
    id: 11,
    questionType: 'stronger-oxidizing',
    question: 'Hvaða efni á þessum lista er sterkasta oxunarefnið (oxidizing agent)?',
    options: ['Li⁺', 'K⁺', 'Au³⁺', 'Zn²⁺'],
    correctAnswer: 2,
    hint: 'Sterkasta oxunarefnið hefur hæsta E° gildi.',
    explanation: 'Au³⁺ (E° = +1.50 V) er sterkasta oxunarefnið af þessum vegna þess að það hefur hæsta E° gildið.'
  },
  {
    id: 12,
    questionType: 'calculate-ecell',
    anode: 'Fe',
    cathode: 'Cu',
    question: 'Reiknaðu E°cell fyrir Fe-Cu rafhlöðu. (E°(Cu²⁺/Cu) = +0.34 V, E°(Fe²⁺/Fe) = -0.44 V)',
    options: ['+0.78 V', '-0.78 V', '+0.10 V', '-0.10 V'],
    correctAnswer: 0,
    hint: 'Fe er anode (oxast), Cu er cathode (afoxast).',
    explanation: 'E°cell = E°(Cu) - E°(Fe) = 0.34 - (-0.44) = +0.78 V'
  }
];

const StandardPotentialsTable = ({ highlight }: { highlight?: string[] }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-xl mb-6 overflow-x-auto">
      <h3 className="font-bold text-gray-700 mb-3 text-center">Staðalaflmætir (E°) við 25°C</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="text-left p-2">Hálfhvarf</th>
            <th className="text-right p-2">E° (V)</th>
          </tr>
        </thead>
        <tbody>
          {standardPotentials.map((row, idx) => {
            const isHighlighted = highlight?.some(h =>
              row.species.toLowerCase().includes(h.toLowerCase()) ||
              row.halfReaction.toLowerCase().includes(h.toLowerCase())
            );
            return (
              <tr
                key={idx}
                className={`border-b border-gray-200 ${isHighlighted ? 'bg-yellow-100 font-bold' : ''}`}
              >
                <td className="p-2 font-mono text-xs">{row.halfReaction}</td>
                <td className={`text-right p-2 font-mono ${
                  row.potential > 0 ? 'text-green-600' : row.potential < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {row.potential > 0 ? '+' : ''}{row.potential.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-3 text-xs text-gray-500 text-center">
        Hærra E° = Betri oxunarefni | Lægra E° = Betri afoxunarefni
      </div>
    </div>
  );
};

export function Level2({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level2Props) {
  const [phase, setPhase] = useState<'learn' | 'practice'>('learn');
  const [learnStep, setLearnStep] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);

  const maxScore = problems.length * 10;

  const learnContent = [
    {
      title: 'Staðalmætti (E°)',
      content: 'Staðalmætti (E°) mælir hversu gjarnlega hálfhvarf fer fram miðað við vetnisviðmiðið (H⁺/H₂ = 0.00 V).',
      icon: '📊',
      formula: null
    },
    {
      title: 'Jákvætt vs Neikvætt E°',
      content: 'Jákvætt E° = Góður oxunarefni (vill afoxast). Neikvætt E° = Góður afoxunarefni (vill oxast).',
      icon: '➕➖',
      formula: null
    },
    {
      title: 'E°cell Formúla',
      content: 'Til að reikna spennumun galvanísks hlaups notum við formúluna:',
      icon: '🧮',
      formula: 'E°cell = E°cathode - E°anode'
    },
    {
      title: 'Sjálfvirkni',
      content: 'Ef E°cell > 0: Hvörfið er sjálfvirkt (ΔG < 0). Ef E°cell < 0: Hvörfið er ekki sjálfvirkt - þarf rafgreiningu.',
      icon: '⚡',
      formula: 'E°cell > 0 → Sjálfvirkt'
    },
    {
      title: 'Afoxunar- og Oxunarefni',
      content: 'Lægra E° = Sterkara afoxunarefni (gefur rafeindir). Hærra E° = Sterkara oxunarefni (tekur rafeindir).',
      icon: '🔄',
      formula: null
    }
  ];

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === problems[currentProblem].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const points = attempts === 0 ? 10 : attempts === 1 ? 5 : 2;
      setScore(prev => prev + points);
      onCorrectAnswer?.();
    } else {
      onIncorrectAnswer?.();
    }
  };

  const handleNext = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
      setAttempts(0);
    } else {
      onComplete(score, maxScore, totalHintsUsed);
    }
  };

  const handleTryAgain = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    setAttempts(prev => prev + 1);
    setShowHint(true);
  };

  if (phase === 'learn') {
    const step = learnContent[learnStep];

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
              ← Til baka
            </button>
            <div className="text-sm text-gray-500">
              {learnStep + 1} af {learnContent.length}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-green-600">
            📊 Staðalmætti (E°)
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Lærðu að nota E° töflur
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {learnContent.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === learnStep ? 'bg-green-500' : idx < learnStep ? 'bg-green-300' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="bg-green-50 p-8 rounded-2xl border-2 border-green-200 mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">{step.title}</h2>
              <p className="text-green-900 text-lg">{step.content}</p>
              {step.formula && (
                <div className="mt-4 bg-white p-4 rounded-xl border-2 border-green-300">
                  <code className="text-xl font-mono font-bold text-green-700">{step.formula}</code>
                </div>
              )}
            </div>
          </div>

          {learnStep === 0 && <StandardPotentialsTable />}

          <div className="flex gap-4">
            <button
              onClick={() => setLearnStep(prev => prev - 1)}
              disabled={learnStep === 0}
              className={`flex-1 py-3 px-6 rounded-xl font-bold ${
                learnStep === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-500 hover:bg-gray-600 text-white'
              }`}
            >
              ← Fyrri
            </button>
            <button
              onClick={() => {
                if (learnStep < learnContent.length - 1) {
                  setLearnStep(prev => prev + 1);
                } else {
                  setPhase('practice');
                }
              }}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl"
            >
              {learnStep === learnContent.length - 1 ? 'Byrja æfingar →' : 'Næsta →'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Practice phase
  const problem = problems[currentProblem];
  const highlightedMetals = [problem.anode, problem.cathode, problem.metal1, problem.metal2].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            ← Til baka
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Spurning {currentProblem + 1} af {problems.length}
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
              Stig: {score}
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-green-600">
          📊 Staðalmætti (E°)
        </h1>

        <StandardPotentialsTable highlight={highlightedMetals} />

        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800 mb-4">
              {problem.question}
            </div>
          </div>
        </div>

        {showHint && (
          <div className="bg-emerald-50 p-4 rounded-xl mb-4 border border-emerald-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <span className="text-emerald-800">{problem.hint}</span>
            </div>
          </div>
        )}

        {!showFeedback ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {problem.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedAnswer === idx
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              {!showHint && (
                <button
                  onClick={() => {
                    setShowHint(true);
                    setTotalHintsUsed(prev => prev + 1);
                  }}
                  className="flex-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-3 px-6 rounded-xl"
                >
                  💡 Vísbending
                </button>
              )}
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className={`flex-1 font-bold py-3 px-6 rounded-xl ${
                  selectedAnswer === null
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                Athuga svar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <FeedbackPanel
              feedback={{
                isCorrect,
                explanation: isCorrect
                  ? problem.explanation
                  : `Rangt. ${problem.explanation}`,
                relatedConcepts: ['Staðalmætti', 'Sjálfvirkni', 'Afoxunarefni'],
                nextSteps: isCorrect
                  ? 'Frábært! Þú skilur hvernig á að nota E° gildi.'
                  : 'Mundu: E°cell = E°cathode - E°anode. Jákvætt = sjálfvirkt.',
              }}
              config={{
                showExplanation: true,
                showRelatedConcepts: true,
                showNextSteps: true,
              }}
            />

            {isCorrect ? (
              <button
                onClick={handleNext}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl"
              >
                {currentProblem < problems.length - 1 ? 'Næsta spurning →' : 'Ljúka stigi →'}
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={handleTryAgain}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl"
                >
                  Reyna aftur
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl"
                >
                  Halda áfram →
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
