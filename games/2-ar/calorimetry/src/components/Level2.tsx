import { useState } from 'react';
import { FeedbackPanel } from '@shared/components';

interface Level2Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface CoffeeCupProblem {
  id: number;
  questionType: 'concept' | 'calculate-q' | 'calculate-dh' | 'exo-endo' | 'assumptions';
  question: string;
  givenData?: string[];
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const problems: CoffeeCupProblem[] = [
  {
    id: 1,
    questionType: 'concept',
    question: 'Hvað mælir kaffibollahitamælir (coffee-cup calorimeter)?',
    options: [
      'Enþalpíubreytingu (ΔH) við stöðugan þrýsting',
      'Innri orku (ΔU) við stöðugt rúmmál',
      'Hitastig lausnarinnar eingöngu',
      'Þrýsting kerfisins'
    ],
    correctAnswer: 0,
    hint: 'Kaffibollahitamælir er opinn - þrýstingur er stöðugur.',
    explanation: 'Kaffibollahitamælir mælir ΔH (enþalpíubreytingu) vegna þess að hann er opinn og þrýstingur er stöðugur. q_p = ΔH.'
  },
  {
    id: 2,
    questionType: 'calculate-q',
    question: 'NaOH leysist í 100 g af vatni og hitastigið hækkar úr 22°C í 30°C. Hver er q lausnarinnar?',
    givenData: ['m = 100 g', 'ΔT = 30 - 22 = 8°C', 'c(vatn) = 4.18 J/(g·°C)'],
    options: ['3,344 J', '-3,344 J', '334.4 J', '-334.4 J'],
    correctAnswer: 0,
    hint: 'q(lausn) = mcΔT. Lausnin hitnar, svo q er jákvætt fyrir lausnina.',
    explanation: 'q = mcΔT = 100 × 4.18 × 8 = 3,344 J. Lausnin tekur við varma frá hvörfinu.'
  },
  {
    id: 3,
    questionType: 'exo-endo',
    question: 'Í fyrri spurningunni, er upplausn NaOH exóþerm eða endóþerm?',
    options: [
      'Exóþerm (ΔH < 0) - hvörfið gefur frá sér varma',
      'Endóþerm (ΔH > 0) - hvörfið tekur við varma',
      'Hvorugt - ekkert varmaflæði',
      'Fer eftir magni NaOH'
    ],
    correctAnswer: 0,
    hint: 'Ef lausnin hitnar, hvaðan kemur varmin?',
    explanation: 'Lausnin hitnar, sem þýðir að hvörfið gefur frá sér varma → exóþermt hvarf → ΔH < 0.'
  },
  {
    id: 4,
    questionType: 'calculate-dh',
    question: 'Ef 0.5 mól af syru hlutleysa 0.5 mól af basa og q = -28,500 J, hver er ΔH á mól?',
    givenData: ['q(hvarfi) = -28,500 J', 'n = 0.5 mól', 'q(hvarfi) = -q(lausn)'],
    options: ['-57.0 kJ/mol', '+57.0 kJ/mol', '-28.5 kJ/mol', '+28.5 kJ/mol'],
    correctAnswer: 0,
    hint: 'ΔH = q/n (á mól)',
    explanation: 'ΔH = q/n = -28,500 J / 0.5 mól = -57,000 J/mol = -57.0 kJ/mol. Neikvætt þýðir exóþermt.'
  },
  {
    id: 5,
    questionType: 'concept',
    question: 'Hvers vegna er formúlan q(hvarfi) = -q(lausn)?',
    options: [
      'Orka sem hvörfið gefur frá sér fer til lausnarinnar (og öfugt)',
      'Orka tapast í hvörfinu',
      'Hitastig hvörfs og lausnar er alltaf jafnt',
      'Massinn breytist í hvörfinu'
    ],
    correctAnswer: 0,
    hint: 'Hugsaðu um orkuvarðveislu.',
    explanation: 'Samkvæmt orkuvarðveislu: Orka sem hvörfið losar (exóþermt) fer beint í lausnina, svo q(hvarfi) = -q(lausn).'
  },
  {
    id: 6,
    questionType: 'calculate-q',
    question: 'NH₄NO₃ leysist í 150 g af vatni og hitastigið lækkar úr 25°C í 18°C. Hver er q lausnarinnar?',
    givenData: ['m = 150 g', 'ΔT = 18 - 25 = -7°C', 'c(vatn) = 4.18 J/(g·°C)'],
    options: ['-4,389 J', '+4,389 J', '-438.9 J', '+438.9 J'],
    correctAnswer: 0,
    hint: 'ΔT er neikvætt (kólnar), svo q er neikvætt.',
    explanation: 'q = mcΔT = 150 × 4.18 × (-7) = -4,389 J. Lausnin tapar varma (kólnar) - fer til hvörfsins.'
  },
  {
    id: 7,
    questionType: 'exo-endo',
    question: 'Hvort er upplausn NH₄NO₃ (sem kælir lausnina) exóþermt eða endóþermt?',
    options: [
      'Endóþerm (ΔH > 0) - hvörfið tekur við varma',
      'Exóþerm (ΔH < 0) - hvörfið gefur frá sér varma',
      'Hvorugt',
      'Ekki hægt að segja'
    ],
    correctAnswer: 0,
    hint: 'Ef lausnin kólnar, hvert fer varmin?',
    explanation: 'Lausnin kólnar → varmi fer FRÁ lausn TIL hvörfs → hvörfið tekur við varma → endóþermt → ΔH > 0.'
  },
  {
    id: 8,
    questionType: 'calculate-dh',
    question: 'Þegar 4.0 g NaOH (M=40 g/mol) leysist í vatni, hitnar lausnin um 5.5°C (200 g lausn). Hver er ΔH upplausnar?',
    givenData: ['m(NaOH) = 4.0 g', 'M = 40 g/mol', 'm(lausn) = 200 g', 'ΔT = 5.5°C', 'c = 4.18 J/g·°C'],
    options: ['-45.98 kJ/mol', '+45.98 kJ/mol', '-4.598 kJ/mol', '+4.598 kJ/mol'],
    correctAnswer: 0,
    hint: 'Fyrst: n = m/M. Svo: q(lausn) = mcΔT. Loks: ΔH = -q(lausn)/n',
    explanation: 'n = 4.0/40 = 0.1 mol. q(lausn) = 200 × 4.18 × 5.5 = 4,598 J. ΔH = -4,598/0.1 = -45,980 J/mol = -45.98 kJ/mol.'
  }
];

const CoffeeCupDiagram = () => {
  return (
    <div className="bg-blue-50 p-4 rounded-xl mb-6">
      <h3 className="font-bold text-blue-800 mb-3 text-center">Kaffibollahitamælir</h3>
      <div className="flex justify-center">
        <div className="relative">
          {/* Cup */}
          <div className="w-32 h-40 bg-white rounded-b-3xl border-4 border-blue-300 relative overflow-hidden">
            {/* Solution */}
            <div className="absolute bottom-0 w-full h-28 bg-blue-200">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-blue-600">
                Lausn
              </div>
            </div>
            {/* Thermometer */}
            <div className="absolute top-2 left-4 w-2 h-32 bg-gray-200 rounded-full">
              <div className="absolute bottom-0 w-full h-20 bg-red-400 rounded-full"></div>
            </div>
            {/* Stirrer */}
            <div className="absolute top-2 right-4 w-1 h-28 bg-gray-400"></div>
          </div>
          {/* Lid */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-36 h-4 bg-white border-4 border-blue-300 rounded-t-lg"></div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-center">
        <div className="bg-white p-2 rounded">Opið kerfi (P = stöðugur)</div>
        <div className="bg-white p-2 rounded">q_p = ΔH</div>
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
      title: 'Kaffibollahitamælir',
      content: 'Einfalt tæki til að mæla varmaflæði í lausnarhvörfum. Notar strokkennu kaffibolla sem einangrun.',
      icon: '☕'
    },
    {
      title: 'Stöðugur þrýstingur',
      content: 'Þar sem bollinn er opinn er þrýstingur stöðugur (loftþrýstingur). Þetta þýðir að q_p = ΔH.',
      icon: '📊'
    },
    {
      title: 'Orkuvarðveisla',
      content: 'q(hvarfi) = -q(lausn). Orka sem hvörfið losar fer til lausnarinnar, og öfugt.',
      icon: '🔄'
    },
    {
      title: 'ΔH á mól',
      content: 'Til að fá ΔH á mól: ΔH = q(hvarfi) / n = -q(lausn) / n',
      icon: '🧮'
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
              ← Til baka
            </button>
            <div className="text-sm text-gray-500">
              {learnStep + 1} af {learnContent.length}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-blue-600">
            ☕ Kaffibollahitamælir
          </h1>

          <div className="flex justify-center gap-2 mb-6">
            {learnContent.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === learnStep ? 'bg-blue-500' : idx < learnStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <CoffeeCupDiagram />

          <div className="bg-blue-50 p-8 rounded-2xl border-2 border-blue-200 mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">{step.title}</h2>
              <p className="text-blue-900 text-lg">{step.content}</p>
            </div>
          </div>

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
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            ← Til baka
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Spurning {currentProblem + 1} af {problems.length}
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">
              Stig: {score}
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-blue-600">
          ☕ Kaffibollahitamælir
        </h1>

        <div className="bg-blue-50 p-4 rounded-xl mb-4 grid grid-cols-2 gap-2 text-sm text-center">
          <div className="bg-white p-2 rounded font-mono">q = mcΔT</div>
          <div className="bg-white p-2 rounded font-mono">ΔH = -q(lausn)/n</div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800 mb-4">
              {problem.question}
            </div>
            {problem.givenData && (
              <div className="mt-4 bg-white p-3 rounded-lg border border-gray-200">
                <div className="text-sm font-bold text-gray-600 mb-2">Gefin gögn:</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {problem.givenData.map((data, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono">
                      {data}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {showHint && (
          <div className="bg-cyan-50 p-4 rounded-xl mb-4 border border-cyan-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <span className="text-cyan-800">{problem.hint}</span>
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
                      ? 'border-blue-500 bg-blue-50'
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
                  className="flex-1 bg-cyan-100 hover:bg-cyan-200 text-cyan-800 font-bold py-3 px-6 rounded-xl"
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
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
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
                relatedConcepts: ['Kaffibollahitamælir', 'ΔH', 'Exóþerm/Endóþerm'],
                nextSteps: isCorrect
                  ? 'Frábært! Þú skilur hvernig kaffibollahitamælir virkar.'
                  : 'Mundu: q(hvarfi) = -q(lausn). Hitnar = exóþermt, kólnar = endóþermt.',
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
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
