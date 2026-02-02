import { useState } from 'react';
import { FeedbackPanel } from '@shared/components';

interface Level3Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface BombProblem {
  id: number;
  questionType: 'concept' | 'calculate-q' | 'calculate-du' | 'energy-content' | 'fuel-compare';
  question: string;
  givenData?: string[];
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const problems: BombProblem[] = [
  {
    id: 1,
    questionType: 'concept',
    question: 'Hvað mælir sprengihitamælir (bomb calorimeter)?',
    options: [
      'Innri orku (ΔU) við stöðugt rúmmál',
      'Enþalpíu (ΔH) við stöðugan þrýsting',
      'Hitastig eingöngu',
      'Þrýstingsbreytingu'
    ],
    correctAnswer: 0,
    hint: 'Sprengihólf er lokað - rúmmál er stöðugt.',
    explanation: 'Sprengihitamælir mælir ΔU (innri orku) vegna þess að hvörfið fer fram í lokuðu hólfi þar sem rúmmál er stöðugt. q_v = ΔU.'
  },
  {
    id: 2,
    questionType: 'concept',
    question: 'Hvers vegna er sprengihitamælir notaður fyrir brunihvörf?',
    options: [
      'Hvörfin krefjast súrefnis við háan þrýsting',
      'Hann er ódýrari',
      'Niðurstöður eru nákvæmari',
      'Hvörfin eru öruggari'
    ],
    correctAnswer: 0,
    hint: 'Brunihvörf þurfa súrefni og gefa frá sér mikinn varma.',
    explanation: 'Brunihvörf krefjast mikið af súrefni. Sprengihólfið er þrýst með hreinu O₂ og einangrað vel til að mæla allan varma.'
  },
  {
    id: 3,
    questionType: 'calculate-q',
    question: 'Brunahvarf í sprengihitamæli hækkar hitastig 2000 g vatns um 4.5°C. Hver er q?',
    givenData: ['m(vatn) = 2000 g', 'ΔT = 4.5°C', 'c(vatn) = 4.18 J/(g·°C)'],
    options: ['37,620 J', '3,762 J', '376,200 J', '18,810 J'],
    correctAnswer: 0,
    hint: 'q = mcΔT fyrir vatnsbólið.',
    explanation: 'q = mcΔT = 2000 × 4.18 × 4.5 = 37,620 J = 37.62 kJ'
  },
  {
    id: 4,
    questionType: 'calculate-du',
    question: 'Ef 0.50 g af bensósýru (C₆H₅COOH) brann og gaf frá sér 13,230 J, hver er ΔU á gramm?',
    givenData: ['m = 0.50 g', 'q = -13,230 J (losað)', 'ΔU = q_v'],
    options: ['-26.46 kJ/g', '+26.46 kJ/g', '-13.23 kJ/g', '+13.23 kJ/g'],
    correctAnswer: 0,
    hint: 'ΔU per gramm = q/m. Brunihvörf eru exóþerm.',
    explanation: 'ΔU = q/m = -13,230 J / 0.50 g = -26,460 J/g = -26.46 kJ/g. Neikvætt vegna þess að orka losnar.'
  },
  {
    id: 5,
    questionType: 'energy-content',
    question: 'Hver er orkuinnihald eldsneytis sem gefur frá sér 45,000 J þegar 1.5 g brenna?',
    givenData: ['q = -45,000 J', 'm = 1.5 g'],
    options: ['30 kJ/g', '45 kJ/g', '67.5 kJ/g', '22.5 kJ/g'],
    correctAnswer: 0,
    hint: 'Orkuinnihald = |q|/m',
    explanation: 'Orkuinnihald = |q|/m = 45,000/1.5 = 30,000 J/g = 30 kJ/g'
  },
  {
    id: 6,
    questionType: 'fuel-compare',
    question: 'Hvaða eldsneyti hefur hæsta orkuinnihald á hvert gramm?',
    givenData: ['Bensín: ~47 kJ/g', 'Etanól: ~27 kJ/g', 'Kol: ~30 kJ/g', 'Metan: ~55 kJ/g'],
    options: ['Metan', 'Bensín', 'Kol', 'Etanól'],
    correctAnswer: 0,
    hint: 'Berðu saman kJ/g gildin.',
    explanation: 'Metan (CH₄) hefur hæsta orkuinnihald (~55 kJ/g) vegna hátt hlutfall vetnisatóma sem gefa mikla orku við bruna.'
  },
  {
    id: 7,
    questionType: 'calculate-q',
    question: 'Sprengihitamælir með varmarýmd 8.50 kJ/°C sýnir 3.2°C hækkun. Hver var heildarvarminn?',
    givenData: ['C(hitamælir) = 8.50 kJ/°C', 'ΔT = 3.2°C'],
    options: ['27.2 kJ', '2.72 kJ', '272 kJ', '5.3 kJ'],
    correctAnswer: 0,
    hint: 'q = C × ΔT (varmarýmd × hitabreyting)',
    explanation: 'q = C × ΔT = 8.50 × 3.2 = 27.2 kJ. Varmarýmd hitamælisins nær yfir vatn OG málmhluta.'
  },
  {
    id: 8,
    questionType: 'calculate-du',
    question: 'Ef 1.00 g sykur (C₁₂H₂₂O₁₁, M=342 g/mol) brann og gaf 16.5 kJ, hver er ΔU á mól?',
    givenData: ['m = 1.00 g', 'M = 342 g/mol', 'q = -16.5 kJ'],
    options: ['-5,643 kJ/mol', '+5,643 kJ/mol', '-564 kJ/mol', '+564 kJ/mol'],
    correctAnswer: 0,
    hint: 'Fyrst: n = m/M. Svo: ΔU = q/n',
    explanation: 'n = 1.00/342 = 0.00292 mol. ΔU = -16.5/0.00292 = -5,643 kJ/mol'
  },
  {
    id: 9,
    questionType: 'concept',
    question: 'Hver er munurinn á ΔH og ΔU fyrir brunihvörf?',
    options: [
      'ΔH = ΔU + Δ(PV), munur vegna gas-myndunnar',
      'Enginn munur - þau eru alltaf jöfn',
      'ΔU er alltaf stærra en ΔH',
      'ΔH er alltaf tvöfalt ΔU'
    ],
    correctAnswer: 0,
    hint: 'Brunihvörf framleiða CO₂ og H₂O gas - rúmmál breytist.',
    explanation: 'ΔH = ΔU + Δ(PV). Fyrir brunihvörf sem framleiða gas er munur vegna PV-vinnu. Við stöðugt rúmmál (sprengi) mælum við ΔU.'
  },
  {
    id: 10,
    questionType: 'energy-content',
    question: 'Ef 2.5 g af olíu brann í sprengihitamæli og hitaði 3.0 kg vatns um 15°C, hver er orkuinnihald olíunnar?',
    givenData: ['m(olía) = 2.5 g', 'm(vatn) = 3000 g', 'ΔT = 15°C', 'c = 4.18 J/g·°C'],
    options: ['75.2 kJ/g', '7.52 kJ/g', '752 kJ/g', '18.8 kJ/g'],
    correctAnswer: 0,
    hint: 'q = mcΔT fyrir vatn, síðan orkuinnihald = q/m(olía)',
    explanation: 'q = 3000 × 4.18 × 15 = 188,100 J. Orkuinnihald = 188,100/2.5 = 75,240 J/g = 75.2 kJ/g'
  }
];

const BombCalorimeterDiagram = () => {
  return (
    <div className="bg-red-50 p-4 rounded-xl mb-6">
      <h3 className="font-bold text-red-800 mb-3 text-center">Sprengihitamælir (Bomb Calorimeter)</h3>
      <div className="flex justify-center">
        <div className="relative w-48 h-56">
          {/* Water bath */}
          <div className="absolute bottom-0 w-full h-48 bg-blue-200 rounded-lg border-4 border-gray-400">
            <div className="absolute top-2 left-2 text-xs text-blue-600">Vatnsbað</div>
          </div>
          {/* Bomb chamber */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-28 bg-gray-400 rounded-lg border-4 border-gray-600">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-white text-center">
              Sprengihólf<br/>(O₂)
            </div>
          </div>
          {/* Stirrer */}
          <div className="absolute top-0 left-4 w-1 h-20 bg-gray-500"></div>
          {/* Thermometer */}
          <div className="absolute top-0 right-4 w-2 h-20 bg-gray-200 rounded-full">
            <div className="absolute bottom-0 w-full h-12 bg-red-400 rounded-full"></div>
          </div>
          {/* Ignition wire */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-1 bg-yellow-500"></div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-center">
        <div className="bg-white p-2 rounded">Lokað kerfi (V = stöðugt)</div>
        <div className="bg-white p-2 rounded">q_v = ΔU</div>
      </div>
    </div>
  );
};

export function Level3({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level3Props) {
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
      title: 'Sprengihitamælir',
      content: 'Nákvæmt tæki til að mæla brunaorku eldsneytis og matvæla. Hvörfið fer fram í lokuðu stálhólfi.',
      icon: '💥'
    },
    {
      title: 'Stöðugt rúmmál',
      content: 'Þar sem hólfið er lokað er rúmmál stöðugt. Þetta þýðir að q_v = ΔU (innri orka).',
      icon: '📦'
    },
    {
      title: 'Brunihvörf',
      content: 'Eldsneyti + O₂ → CO₂ + H₂O + varmi. Allt súrefni er í hólfinu og allur varmi er mældur.',
      icon: '🔥'
    },
    {
      title: 'Orkuinnihald',
      content: 'Orkuinnihald eldsneytis er mælt í kJ/g eða kJ/mol. Þetta er mikilvægt fyrir samanburð á eldsneyti.',
      icon: '⛽'
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
              ← Til baka
            </button>
            <div className="text-sm text-gray-500">
              {learnStep + 1} af {learnContent.length}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-red-600">
            💥 Sprengihitamælir
          </h1>

          <div className="flex justify-center gap-2 mb-6">
            {learnContent.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === learnStep ? 'bg-red-500' : idx < learnStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <BombCalorimeterDiagram />

          <div className="bg-red-50 p-8 rounded-2xl border-2 border-red-200 mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-red-800 mb-4">{step.title}</h2>
              <p className="text-red-900 text-lg">{step.content}</p>
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
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl"
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            ← Til baka
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Spurning {currentProblem + 1} af {problems.length}
            </div>
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold">
              Stig: {score}
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-red-600">
          💥 Sprengihitamælir
        </h1>

        <div className="bg-red-50 p-4 rounded-xl mb-4 grid grid-cols-2 gap-2 text-sm text-center">
          <div className="bg-white p-2 rounded font-mono">q = mcΔT</div>
          <div className="bg-white p-2 rounded font-mono">ΔU = q/n (á mól)</div>
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
                    <span key={idx} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-mono">
                      {data}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {showHint && (
          <div className="bg-orange-50 p-4 rounded-xl mb-4 border border-orange-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <span className="text-orange-800">{problem.hint}</span>
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
                      ? 'border-red-500 bg-red-50'
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
                  className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-800 font-bold py-3 px-6 rounded-xl"
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
                    : 'bg-red-500 hover:bg-red-600 text-white'
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
                relatedConcepts: ['Sprengihitamælir', 'ΔU', 'Orkuinnihald'],
                nextSteps: isCorrect
                  ? 'Frábært! Þú skilur hvernig sprengihitamælir virkar.'
                  : 'Mundu: q_v = ΔU. Orkuinnihald = |q|/m í kJ/g.',
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
            className="bg-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
