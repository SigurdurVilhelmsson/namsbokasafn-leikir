import { useState } from 'react';
import { FeedbackPanel } from '@shared/components';

interface Level1Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface HeatCapacityProblem {
  id: number;
  questionType: 'calculate-q' | 'calculate-m' | 'calculate-dt' | 'calculate-c' | 'compare' | 'concept';
  question: string;
  givenData?: string[];
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const problems: HeatCapacityProblem[] = [
  {
    id: 1,
    questionType: 'concept',
    question: 'Hvað mælir eðlisvarmi (specific heat capacity)?',
    options: [
      'Orku sem þarf til að hita 1 g um 1°C',
      'Heildarhitastig efnis',
      'Massa efnis',
      'Þrýsting efnis'
    ],
    correctAnswer: 0,
    hint: 'Eðlisvarmi segir til um hversu mikla orku þarf til að breyta hitastigi.',
    explanation: 'Eðlisvarmi (c) er orkumagnið sem þarf til að hita 1 gramm af efni um 1°C. Eining: J/(g·°C).'
  },
  {
    id: 2,
    questionType: 'calculate-q',
    question: 'Hversu mikill varmi (q) þarf til að hita 100 g af vatni úr 20°C í 80°C?',
    givenData: ['m = 100 g', 'ΔT = 80 - 20 = 60°C', 'c(vatn) = 4.18 J/(g·°C)'],
    options: ['25,080 J', '4,180 J', '418 J', '2,508 J'],
    correctAnswer: 0,
    hint: 'Notaðu q = mcΔT',
    explanation: 'q = mcΔT = 100 × 4.18 × 60 = 25,080 J = 25.08 kJ'
  },
  {
    id: 3,
    questionType: 'compare',
    question: 'Af hverju tekur lengri tíma að hita vatn en málm af sama massa?',
    options: [
      'Vatn hefur hærri eðlisvarma',
      'Vatn er þyngra',
      'Vatn leiðir varma betur',
      'Málmar hafa meiri massa'
    ],
    correctAnswer: 0,
    hint: 'Hugsaðu um hvað eðlisvarmi þýðir fyrir varmaflæði.',
    explanation: 'Vatn hefur mjög háan eðlisvarma (4.18 J/g·°C) samanborið við málma (~0.4 J/g·°C), svo það þarf meiri orku til að hita það.'
  },
  {
    id: 4,
    questionType: 'calculate-dt',
    question: 'Ef 500 J hitast 50 g af vatni, hversu mikil verður hitabreytingin?',
    givenData: ['q = 500 J', 'm = 50 g', 'c(vatn) = 4.18 J/(g·°C)'],
    options: ['2.4°C', '24°C', '0.24°C', '240°C'],
    correctAnswer: 0,
    hint: 'Umritaðu formúluna: ΔT = q/(mc)',
    explanation: 'ΔT = q/(mc) = 500/(50 × 4.18) = 500/209 = 2.39°C ≈ 2.4°C'
  },
  {
    id: 5,
    questionType: 'calculate-q',
    question: 'Hversu mikill varmi losnar þegar 200 g af vatni kólnar úr 90°C í 25°C?',
    givenData: ['m = 200 g', 'ΔT = 25 - 90 = -65°C', 'c(vatn) = 4.18 J/(g·°C)'],
    options: ['-54,340 J', '54,340 J', '-5,434 J', '5,434 J'],
    correctAnswer: 0,
    hint: 'Neikvætt q þýðir að varmi losnar (exóþermt).',
    explanation: 'q = mcΔT = 200 × 4.18 × (-65) = -54,340 J. Neikvætt gildi þýðir að vatnið gefur frá sér varma.'
  },
  {
    id: 6,
    questionType: 'calculate-m',
    question: 'Ef 8,360 J hita vatn um 40°C, hver var massi vatnsins?',
    givenData: ['q = 8,360 J', 'ΔT = 40°C', 'c(vatn) = 4.18 J/(g·°C)'],
    options: ['50 g', '500 g', '5 g', '200 g'],
    correctAnswer: 0,
    hint: 'Umritaðu formúluna: m = q/(cΔT)',
    explanation: 'm = q/(cΔT) = 8,360/(4.18 × 40) = 8,360/167.2 = 50 g'
  },
  {
    id: 7,
    questionType: 'concept',
    question: 'Hvað þýðir það þegar q er neikvætt?',
    options: [
      'Kerfið gefur frá sér varma (exóþermt)',
      'Kerfið tekur við varma (endóþermt)',
      'Ekkert hvarf fer fram',
      'Massi minnkar'
    ],
    correctAnswer: 0,
    hint: 'Hugsaðu um orku sem fer ÚT úr kerfinu.',
    explanation: 'Neikvætt q þýðir að kerfið tapar orku - það gefur frá sér varma til umhverfisins (exóþermt ferli).'
  },
  {
    id: 8,
    questionType: 'calculate-c',
    question: 'Óþekkt málmur (80 g) hitnar um 25°C þegar hann fær 450 J. Hver er eðlisvarmi málmsins?',
    givenData: ['m = 80 g', 'ΔT = 25°C', 'q = 450 J'],
    options: ['0.225 J/(g·°C)', '2.25 J/(g·°C)', '0.0225 J/(g·°C)', '22.5 J/(g·°C)'],
    correctAnswer: 0,
    hint: 'c = q/(mΔT)',
    explanation: 'c = q/(mΔT) = 450/(80 × 25) = 450/2000 = 0.225 J/(g·°C). Þetta er svipað og ál (0.90) eða kopar (0.39).'
  },
  {
    id: 9,
    questionType: 'compare',
    question: 'Hvaða efni af þessum mun hitna mest ef öll fá 1000 J?',
    givenData: ['Vatn: c = 4.18 J/(g·°C)', 'Kopar: c = 0.39 J/(g·°C)', 'Járn: c = 0.45 J/(g·°C)', 'Massi allra = 100 g'],
    options: ['Kopar', 'Vatn', 'Járn', 'Öll hitna jafn mikið'],
    correctAnswer: 0,
    hint: 'Lægri eðlisvarmi = meiri hitabreyting fyrir sömu orku.',
    explanation: 'Kopar hefur lægsta eðlisvarmanum (0.39) svo það hitnar mest: ΔT = 1000/(100×0.39) = 25.6°C samanborið við vatn: 2.4°C.'
  },
  {
    id: 10,
    questionType: 'calculate-q',
    question: 'Hversu mikinn varma þarf til að hita 250 g af áli úr 25°C í 100°C? (c_Al = 0.90 J/g·°C)',
    givenData: ['m = 250 g', 'ΔT = 100 - 25 = 75°C', 'c(ál) = 0.90 J/(g·°C)'],
    options: ['16,875 J', '1,687.5 J', '168,750 J', '168.75 J'],
    correctAnswer: 0,
    hint: 'q = mcΔT',
    explanation: 'q = mcΔT = 250 × 0.90 × 75 = 16,875 J = 16.875 kJ'
  }
];

const specificHeatTable = [
  { substance: 'Vatn (l)', c: 4.18 },
  { substance: 'Ís', c: 2.09 },
  { substance: 'Gufa', c: 2.01 },
  { substance: 'Ál', c: 0.90 },
  { substance: 'Járn', c: 0.45 },
  { substance: 'Kopar', c: 0.39 },
  { substance: 'Silfur', c: 0.24 },
  { substance: 'Gull', c: 0.13 },
];

export function Level1({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level1Props) {
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
      title: 'Varmi og hitastig',
      content: 'Varmi (q) er orka sem flyst milli hluta vegna hitamunar. Hitastig mælir meðalhraða sameinda.',
      icon: '🔥'
    },
    {
      title: 'Eðlisvarmi (c)',
      content: 'Eðlisvarmi er orkumagnið sem þarf til að hita 1 gramm af efni um 1°C. Vatn hefur mjög háan eðlisvarma.',
      icon: '📊'
    },
    {
      title: 'Aðalformúlan: q = mcΔT',
      content: 'q = varmi (J), m = massi (g), c = eðlisvarmi (J/g·°C), ΔT = hitabreyting (°C). Þetta er lykilformúlan!',
      icon: '🧮'
    },
    {
      title: 'Exóþerm vs Endóþerm',
      content: 'Exóþerm: Gefur frá sér varma (q < 0). Endóþerm: Tekur við varma (q > 0). Formerki q segir til um átt.',
      icon: '🔄'
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
              ← Til baka
            </button>
            <div className="text-sm text-gray-500">
              {learnStep + 1} af {learnContent.length}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-orange-600">
            🌡️ Varmarýmd
          </h1>

          <div className="flex justify-center gap-2 mb-6">
            {learnContent.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === learnStep ? 'bg-orange-500' : idx < learnStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="bg-orange-50 p-8 rounded-2xl border-2 border-orange-200 mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-orange-800 mb-4">{step.title}</h2>
              <p className="text-orange-900 text-lg">{step.content}</p>
            </div>

            {learnStep === 2 && (
              <div className="bg-white p-4 rounded-xl border-2 border-orange-300 mt-4">
                <code className="text-2xl font-mono font-bold text-orange-700 block text-center">
                  q = m × c × ΔT
                </code>
              </div>
            )}
          </div>

          {learnStep === 1 && (
            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <h3 className="font-bold text-gray-700 mb-3 text-center">Eðlisvarmi algengra efna</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {specificHeatTable.map((item, idx) => (
                  <div key={idx} className="bg-white p-2 rounded border text-center text-sm">
                    <div className="font-medium">{item.substance}</div>
                    <div className="text-orange-600 font-mono">{item.c} J/g·°C</div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl"
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            ← Til baka
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Spurning {currentProblem + 1} af {problems.length}
            </div>
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-bold">
              Stig: {score}
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-orange-600">
          🌡️ Varmarýmd
        </h1>

        <div className="bg-orange-50 p-4 rounded-xl mb-4">
          <code className="text-lg font-mono font-bold text-orange-700 block text-center">
            q = m × c × ΔT
          </code>
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
                    <span key={idx} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-mono">
                      {data}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {showHint && (
          <div className="bg-amber-50 p-4 rounded-xl mb-4 border border-amber-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <span className="text-amber-800">{problem.hint}</span>
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
                      ? 'border-orange-500 bg-orange-50'
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
                  className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold py-3 px-6 rounded-xl"
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
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
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
                relatedConcepts: ['Varmarýmd', 'Eðlisvarmi', 'Hitabreyting'],
                nextSteps: isCorrect
                  ? 'Frábært! Þú skilur q = mcΔT formúluna.'
                  : 'Mundu: q = mcΔT. Athugaðu einingarnar vandlega.',
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
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
