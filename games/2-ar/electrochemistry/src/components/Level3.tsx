import { useState } from 'react';
import { FeedbackPanel } from '@shared/components';

interface Level3Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface QuantProblem {
  id: number;
  questionType: 'faraday-mass' | 'faraday-time' | 'faraday-current' | 'nernst-concept' | 'battery-comparison';
  question: string;
  givenData?: string[];
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const problems: QuantProblem[] = [
  {
    id: 1,
    questionType: 'faraday-mass',
    question: 'Hversu mikið kopar (Cu, M = 63.5 g/mol) útfellst við rafgreiningu með 1.93 A straum í 1000 sekúndur?',
    givenData: ['I = 1.93 A', 't = 1000 s', 'M(Cu) = 63.5 g/mol', 'n = 2 (Cu²⁺ + 2e⁻ → Cu)', 'F = 96485 C/mol'],
    options: ['0.635 g', '1.27 g', '6.35 g', '0.318 g'],
    correctAnswer: 0,
    hint: 'm = (I × t × M) / (n × F)',
    explanation: 'Q = I × t = 1.93 × 1000 = 1930 C. mól = Q/(n×F) = 1930/(2×96485) = 0.01 mol. m = 0.01 × 63.5 = 0.635 g'
  },
  {
    id: 2,
    questionType: 'faraday-time',
    question: 'Hversu lengi þarf að keyra 2.0 A straum til að útfella 1.08 g silfur (Ag, M = 108 g/mol)?',
    givenData: ['I = 2.0 A', 'm = 1.08 g', 'M(Ag) = 108 g/mol', 'n = 1 (Ag⁺ + e⁻ → Ag)', 'F = 96485 C/mol'],
    options: ['482 s', '965 s', '1930 s', '241 s'],
    correctAnswer: 0,
    hint: 't = (m × n × F) / (I × M)',
    explanation: 'mól = 1.08/108 = 0.01 mol. Q = n × mól × F = 1 × 0.01 × 96485 = 964.85 C. t = Q/I = 964.85/2.0 ≈ 482 s'
  },
  {
    id: 3,
    questionType: 'nernst-concept',
    question: 'Hvað gerist við rafspennun (E) þegar styrkur hvarfefna minnkar?',
    options: [
      'E eykst',
      'E minnkar',
      'E breytist ekki',
      'E verður núll'
    ],
    correctAnswer: 1,
    hint: 'Hugsaðu um Le Chatelier: Minna af hvarfefnum ýtir jafnvæginu til vinstri.',
    explanation: 'Samkvæmt Nernst-jöfnunni: E = E° - (RT/nF)ln(Q). Þegar styrkur hvarfefna minnkar eykst Q og E minnkar.'
  },
  {
    id: 4,
    questionType: 'faraday-current',
    question: 'Hvaða straumstyrk þarf til að útfella 3.27 g sink (Zn, M = 65.4 g/mol) á 30 mínútum?',
    givenData: ['m = 3.27 g', 't = 30 mín = 1800 s', 'M(Zn) = 65.4 g/mol', 'n = 2 (Zn²⁺ + 2e⁻ → Zn)', 'F = 96485 C/mol'],
    options: ['5.36 A', '2.68 A', '10.72 A', '1.34 A'],
    correctAnswer: 0,
    hint: 'I = (m × n × F) / (M × t)',
    explanation: 'mól = 3.27/65.4 = 0.05 mol. Q = n × mól × F = 2 × 0.05 × 96485 = 9648.5 C. I = Q/t = 9648.5/1800 = 5.36 A'
  },
  {
    id: 5,
    questionType: 'battery-comparison',
    question: 'Af hverju gefur lithium-jón rafhlaðan (Li) hærri spennu en blý-sýru rafhlaðan (Pb)?',
    options: [
      'Lithium hefur lægra E° og er sterkara afoxunarefni',
      'Lithium er þyngra en blý',
      'Lithium er ódýrara en blý',
      'Lithium leiðir rafmagn betur'
    ],
    correctAnswer: 0,
    hint: 'Mundu: Stærri munur á E° milli anode og cathode = hærri spenna.',
    explanation: 'Li hefur E° = -3.04 V, sem er mjög lágt. Þetta þýðir stærri E°cell og hærri spennu en blý (E° = -0.13 V).'
  },
  {
    id: 6,
    questionType: 'faraday-mass',
    question: 'Ef 19297 C fara í gegnum rafgreiningu kopars, hversu mikið Cu útfellst? (M = 63.5 g/mol, n = 2)',
    givenData: ['Q = 19297 C', 'M(Cu) = 63.5 g/mol', 'n = 2', 'F = 96485 C/mol'],
    options: ['6.35 g', '3.175 g', '12.7 g', '1.27 g'],
    correctAnswer: 0,
    hint: 'mól = Q / (n × F), þá m = mól × M',
    explanation: 'mól = 19297 / (2 × 96485) = 0.1 mol. m = 0.1 × 63.5 = 6.35 g'
  },
  {
    id: 7,
    questionType: 'nernst-concept',
    question: 'Í Daniell-hlöðu (Zn-Cu), hvað gerist við spennuna ef [Cu²⁺] minnkar?',
    options: [
      'Spenna eykst',
      'Spenna minnkar',
      'Spenna breytist ekki',
      'Hlaðan hættir að virka'
    ],
    correctAnswer: 1,
    hint: 'Cu²⁺ er hvarfefni við cathode. Minna af því = minni drifkraftur.',
    explanation: 'Þegar [Cu²⁺] minnkar er minni drifkraftur fyrir afoxun við cathode, og heildarspennan minnkar.'
  },
  {
    id: 8,
    questionType: 'faraday-time',
    question: 'Rafgreining vatns: Hversu lengi þarf að keyra 5.0 A til að framleiða 0.224 L af H₂ við STP?',
    givenData: ['I = 5.0 A', 'V(H₂) = 0.224 L við STP', 'n = 2 (2H⁺ + 2e⁻ → H₂)', 'F = 96485 C/mol', '1 mól gas = 22.4 L við STP'],
    options: ['3859 s', '1930 s', '7718 s', '965 s'],
    correctAnswer: 0,
    hint: 'Fyrst reikna mól H₂, síðan Q = n × mól × F, síðan t = Q/I',
    explanation: 'mól H₂ = 0.224/22.4 = 0.01 mol. Q = 2 × 0.01 × 96485 = 1929.7 C. t = 1929.7/0.5 ≈ 3859 s'
  },
  {
    id: 9,
    questionType: 'battery-comparison',
    question: 'Af hverju er eldsneytishlaðan (fuel cell) betri en hefðbundin rafhlaða fyrir umhverfið?',
    options: [
      'Framleiðir aðeins vatn sem úrgang',
      'Notar minna rafmagn',
      'Er ódýrari',
      'Varir lengur'
    ],
    correctAnswer: 0,
    hint: 'Hugsaðu um hvað kemur út úr hvörfinu 2H₂ + O₂ → 2H₂O',
    explanation: 'Eldsneytishlaðan (H₂ + O₂) framleiðir aðeins vatn (H₂O) sem aukaafurð, sem gerir hana mjög umhverfisvæna.'
  },
  {
    id: 10,
    questionType: 'faraday-current',
    question: 'Í iðnaðarrafgreiningu áloxíðs (Al₂O₃), hvaða straumstyrk þarf til að framleiða 27 g Al á klukkustund?',
    givenData: ['m = 27 g', 't = 1 klst = 3600 s', 'M(Al) = 27 g/mol', 'n = 3 (Al³⁺ + 3e⁻ → Al)', 'F = 96485 C/mol'],
    options: ['80.4 A', '26.8 A', '161 A', '40.2 A'],
    correctAnswer: 0,
    hint: 'I = (m × n × F) / (M × t)',
    explanation: 'mól = 27/27 = 1 mol. Q = n × mól × F = 3 × 1 × 96485 = 289455 C. I = Q/t = 289455/3600 = 80.4 A'
  }
];

const FaradayFormula = () => {
  return (
    <div className="bg-purple-50 p-4 rounded-xl mb-6">
      <h3 className="font-bold text-purple-800 mb-3 text-center">Faradays Lög</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
          <div className="font-bold text-purple-700 mb-2">Grunnformúla:</div>
          <code className="text-lg font-mono">Q = n × F × mól</code>
          <div className="text-xs text-gray-500 mt-2">
            Q = Hleðsla (Coulombs)<br />
            n = Fjöldi rafeinda<br />
            F = Faraday-fasti (96485 C/mol)
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
          <div className="font-bold text-purple-700 mb-2">Nytsamlegar formúlur:</div>
          <div className="space-y-1 text-sm font-mono">
            <div>Q = I × t</div>
            <div>m = (I × t × M) / (n × F)</div>
            <div>t = (m × n × F) / (I × M)</div>
          </div>
        </div>
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
      title: 'Faradays Lög',
      content: 'Michael Faraday uppgötvaði beint samband milli rafmagns og efnamagns í rafgreiningu.',
      icon: '⚡',
      details: 'Magn efnis sem útfellst er í réttu hlutfalli við rafmagnshleðslu sem fer í gegn.'
    },
    {
      title: 'Faraday-Fastinn (F)',
      content: 'F = 96485 C/mol - Þetta er hleðslan á einu móli rafeinda.',
      icon: '🔢',
      details: 'Til að útfella 1 mól af eingildu málmi (t.d. Ag⁺) þarf 96485 C. Fyrir Cu²⁺ þarf 2 × 96485 C.'
    },
    {
      title: 'Aðalformúla',
      content: 'Q = I × t og Q = n × F × mól efnis',
      icon: '🧮',
      details: 'Sameinaðu formúlurnar til að finna m = (I × t × M) / (n × F)'
    },
    {
      title: 'Nernst-Jafnan (Hugtak)',
      content: 'Raunveruleg spenna fer eftir styrk jóna - ekki bara E° gildum.',
      icon: '📈',
      details: 'Þegar styrkur jóna breytist frá stöðluðum aðstæðum, breytist spenna rafhlöðunnar.'
    },
    {
      title: 'Rafhlöðutegundir',
      content: 'Mismunandi efnasamsetningar gefa mismunandi spennu og eiginleika.',
      icon: '🔋',
      details: 'Lithium-jón, Blý-sýra, Alkaline, Eldsneyti - hver með sína kosti.'
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
              ← Til baka
            </button>
            <div className="text-sm text-gray-500">
              {learnStep + 1} af {learnContent.length}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-purple-600">
            🧮 Magnreikningar
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Faradays lög og útreikningar
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {learnContent.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === learnStep ? 'bg-purple-500' : idx < learnStep ? 'bg-purple-300' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="bg-purple-50 p-8 rounded-2xl border-2 border-purple-200 mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-purple-800 mb-4">{step.title}</h2>
              <p className="text-purple-900 text-lg mb-4">{step.content}</p>
              <p className="text-purple-700 text-sm">{step.details}</p>
            </div>
          </div>

          {(learnStep === 2 || learnStep === 0) && <FaradayFormula />}

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
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-xl"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            ← Til baka
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Spurning {currentProblem + 1} af {problems.length}
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-bold">
              Stig: {score}
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-purple-600">
          🧮 Magnreikningar
        </h1>

        <FaradayFormula />

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
                    <span key={idx} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-mono">
                      {data}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {showHint && (
          <div className="bg-indigo-50 p-4 rounded-xl mb-4 border border-indigo-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <span className="text-indigo-800">{problem.hint}</span>
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
                      ? 'border-purple-500 bg-purple-50'
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
                  className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-bold py-3 px-6 rounded-xl"
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
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
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
                relatedConcepts: ['Faradays lög', 'Rafgreining', 'Magnreikningar'],
                nextSteps: isCorrect
                  ? 'Frábært! Þú getur nú reiknað efnamagn í rafefnafræði.'
                  : 'Mundu: m = (I × t × M) / (n × F). Athugaðu fjölda rafeinda (n) vandlega.',
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
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-xl"
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
            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
