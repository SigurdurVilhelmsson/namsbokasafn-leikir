import { useState } from 'react';
import { FeedbackPanel } from '@shared/components';

interface Level1Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface GalvanicCellProblem {
  id: number;
  anode: { metal: string; symbol: string; ion: string; color: string };
  cathode: { metal: string; symbol: string; ion: string; color: string };
  question: string;
  questionType: 'identify-anode' | 'identify-cathode' | 'electron-flow' | 'ion-flow' | 'oxidation' | 'reduction';
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const problems: GalvanicCellProblem[] = [
  {
    id: 1,
    anode: { metal: 'Sink', symbol: 'Zn', ion: 'Zn²⁺', color: 'bg-gray-400' },
    cathode: { metal: 'Kopar', symbol: 'Cu', ion: 'Cu²⁺', color: 'bg-orange-400' },
    question: 'Í Zn-Cu rafhlöðu, hvað er anode?',
    questionType: 'identify-anode',
    options: ['Sink (Zn)', 'Kopar (Cu)', 'Saltbrú', 'Lausn'],
    correctAnswer: 0,
    hint: 'Anode er þar sem oxun fer fram - málmurinn sem gefur frá sér rafeindir.',
    explanation: 'Sink er anode vegna þess að Zn oxast: Zn → Zn²⁺ + 2e⁻'
  },
  {
    id: 2,
    anode: { metal: 'Sink', symbol: 'Zn', ion: 'Zn²⁺', color: 'bg-gray-400' },
    cathode: { metal: 'Kopar', symbol: 'Cu', ion: 'Cu²⁺', color: 'bg-orange-400' },
    question: 'Í Zn-Cu rafhlöðu, hvað er cathode?',
    questionType: 'identify-cathode',
    options: ['Sink (Zn)', 'Kopar (Cu)', 'Saltbrú', 'Lausn'],
    correctAnswer: 1,
    hint: 'Cathode er þar sem afoxun fer fram - jónir öðlast rafeindir.',
    explanation: 'Kopar er cathode vegna þess að Cu²⁺ afoxast: Cu²⁺ + 2e⁻ → Cu'
  },
  {
    id: 3,
    anode: { metal: 'Sink', symbol: 'Zn', ion: 'Zn²⁺', color: 'bg-gray-400' },
    cathode: { metal: 'Kopar', symbol: 'Cu', ion: 'Cu²⁺', color: 'bg-orange-400' },
    question: 'Í hvaða átt flæða rafeindirnar í vírnunni?',
    questionType: 'electron-flow',
    options: ['Frá Cu til Zn', 'Frá Zn til Cu', 'Í báðar áttir', 'Engar rafeindir flæða'],
    correctAnswer: 1,
    hint: 'Rafeindir flæða frá anode til cathode.',
    explanation: 'Rafeindir flæða frá Zn (anode) til Cu (cathode) vegna þess að Zn gefur frá sér rafeindir.'
  },
  {
    id: 4,
    anode: { metal: 'Magnesíum', symbol: 'Mg', ion: 'Mg²⁺', color: 'bg-gray-300' },
    cathode: { metal: 'Silfur', symbol: 'Ag', ion: 'Ag⁺', color: 'bg-gray-200' },
    question: 'Hvað gerist við anode (Mg)?',
    questionType: 'oxidation',
    options: ['Mg → Mg²⁺ + 2e⁻', 'Mg²⁺ + 2e⁻ → Mg', 'Ag → Ag⁺ + e⁻', 'Ag⁺ + e⁻ → Ag'],
    correctAnswer: 0,
    hint: 'Við anode fer fram oxun - málmur tapar rafeindum.',
    explanation: 'Við anode oxast Mg: Mg → Mg²⁺ + 2e⁻ (tapir rafeindum)'
  },
  {
    id: 5,
    anode: { metal: 'Magnesíum', symbol: 'Mg', ion: 'Mg²⁺', color: 'bg-gray-300' },
    cathode: { metal: 'Silfur', symbol: 'Ag', ion: 'Ag⁺', color: 'bg-gray-200' },
    question: 'Hvað gerist við cathode (Ag)?',
    questionType: 'reduction',
    options: ['Mg → Mg²⁺ + 2e⁻', 'Mg²⁺ + 2e⁻ → Mg', 'Ag → Ag⁺ + e⁻', 'Ag⁺ + e⁻ → Ag'],
    correctAnswer: 3,
    hint: 'Við cathode fer fram afoxun - jónir öðlast rafeindir.',
    explanation: 'Við cathode afoxast Ag⁺: Ag⁺ + e⁻ → Ag (öðlast rafeindir)'
  },
  {
    id: 6,
    anode: { metal: 'Járn', symbol: 'Fe', ion: 'Fe²⁺', color: 'bg-gray-500' },
    cathode: { metal: 'Kopar', symbol: 'Cu', ion: 'Cu²⁺', color: 'bg-orange-400' },
    question: 'Hvað er hlutverk saltbrúarinnar?',
    questionType: 'ion-flow',
    options: ['Flytja rafeindir', 'Viðhalda rafhlutleysi lausnanna', 'Flýta fyrir hvörfunum', 'Hægja á hvörfunum'],
    correctAnswer: 1,
    hint: 'Saltbrúin leyfir jónum að flæða til að halda jafnvægi.',
    explanation: 'Saltbrúin viðheldur rafhlutleysi með því að leyfa jónum að flæða milli lausna.'
  },
  {
    id: 7,
    anode: { metal: 'Blý', symbol: 'Pb', ion: 'Pb²⁺', color: 'bg-gray-600' },
    cathode: { metal: 'Kopar', symbol: 'Cu', ion: 'Cu²⁺', color: 'bg-orange-400' },
    question: 'Í Pb-Cu rafhlöðu, hvaða jónir flæða í gegnum saltbrúna til cathode-lausnarinnar?',
    questionType: 'ion-flow',
    options: ['Jákvæðar jónir (katiónir)', 'Neikvæðar jónir (aníónir)', 'Engar jónir', 'Bæði'],
    correctAnswer: 1,
    hint: 'Cu²⁺ jónir eru að eyðast við cathode - hvað þarf til að halda jafnvægi?',
    explanation: 'Neikvæðar jónir (aníónir) flæða til cathode-lausnarinnar til að bæta upp fyrir Cu²⁺ sem er að afoxast.'
  },
  {
    id: 8,
    anode: { metal: 'Sink', symbol: 'Zn', ion: 'Zn²⁺', color: 'bg-gray-400' },
    cathode: { metal: 'Kopar', symbol: 'Cu', ion: 'Cu²⁺', color: 'bg-orange-400' },
    question: 'Hvað gerist við anode-rafskautið í Zn-Cu rafhlöðu?',
    questionType: 'oxidation',
    options: ['Það stækkar', 'Það minnkar', 'Það breytist ekki', 'Það leysist upp strax'],
    correctAnswer: 1,
    hint: 'Hvað gerist þegar málmur oxast?',
    explanation: 'Anode-rafskautið (Zn) minnkar vegna þess að sink-atóm oxast og fara út í lausn sem Zn²⁺ jónir.'
  },
  {
    id: 9,
    anode: { metal: 'Nikkel', symbol: 'Ni', ion: 'Ni²⁺', color: 'bg-gray-400' },
    cathode: { metal: 'Silfur', symbol: 'Ag', ion: 'Ag⁺', color: 'bg-gray-200' },
    question: 'Hvað gerist við cathode-rafskautið í Ni-Ag rafhlöðu?',
    questionType: 'reduction',
    options: ['Það stækkar', 'Það minnkar', 'Það breytist ekki', 'Það leysist upp'],
    correctAnswer: 0,
    hint: 'Hvað gerist þegar jónir afoxast við yfirborð cathode?',
    explanation: 'Cathode-rafskautið (Ag) stækkar vegna þess að Ag⁺ jónir afoxast og setjast á yfirborðið sem silfur-atóm.'
  },
  {
    id: 10,
    anode: { metal: 'Sink', symbol: 'Zn', ion: 'Zn²⁺', color: 'bg-gray-400' },
    cathode: { metal: 'Kopar', symbol: 'Cu', ion: 'Cu²⁺', color: 'bg-orange-400' },
    question: 'Hvaða formúla lýsir heildarviðbragði Zn-Cu rafhlöðunnar?',
    questionType: 'oxidation',
    options: [
      'Zn + Cu → Zn²⁺ + Cu²⁺',
      'Zn + Cu²⁺ → Zn²⁺ + Cu',
      'Zn²⁺ + Cu → Zn + Cu²⁺',
      'Zn²⁺ + Cu²⁺ → Zn + Cu'
    ],
    correctAnswer: 1,
    hint: 'Sink oxast (gefur rafeindir) og kopar-jónir afoxast (taka við rafeindum).',
    explanation: 'Heildarviðbragðið er: Zn + Cu²⁺ → Zn²⁺ + Cu, þar sem Zn tapar rafeindum og Cu²⁺ öðlast þær.'
  }
];

const GalvanicCellDiagram = ({ anode, cathode, showElectronFlow }: {
  anode: { metal: string; symbol: string; ion: string; color: string };
  cathode: { metal: string; symbol: string; ion: string; color: string };
  showElectronFlow: boolean;
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border-2 border-gray-200 mb-6">
      <div className="relative">
        {/* Cell diagram */}
        <div className="flex justify-center items-end gap-8">
          {/* Anode side */}
          <div className="flex flex-col items-center">
            <div className="text-sm font-bold text-red-600 mb-1">Anode (−)</div>
            <div className={`w-8 h-24 ${anode.color} rounded-t-lg border-2 border-gray-600`}></div>
            <div className="w-20 h-16 bg-blue-200 rounded-b-lg border-2 border-t-0 border-gray-400 flex items-center justify-center">
              <span className="text-xs font-bold">{anode.ion}</span>
            </div>
            <div className="text-sm mt-1">{anode.symbol}</div>
          </div>

          {/* Salt bridge */}
          <div className="flex flex-col items-center -mb-16">
            <div className="w-24 h-6 bg-yellow-200 rounded-full border-2 border-yellow-400 flex items-center justify-center">
              <span className="text-xs">Saltbrú</span>
            </div>
          </div>

          {/* Cathode side */}
          <div className="flex flex-col items-center">
            <div className="text-sm font-bold text-blue-600 mb-1">Cathode (+)</div>
            <div className={`w-8 h-24 ${cathode.color} rounded-t-lg border-2 border-gray-600`}></div>
            <div className="w-20 h-16 bg-blue-200 rounded-b-lg border-2 border-t-0 border-gray-400 flex items-center justify-center">
              <span className="text-xs font-bold">{cathode.ion}</span>
            </div>
            <div className="text-sm mt-1">{cathode.symbol}</div>
          </div>
        </div>

        {/* Wire connecting electrodes */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="w-48 h-1 bg-gray-800 rounded"></div>
          {showElectronFlow && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <div className="flex items-center gap-1 text-xs text-amber-600 font-bold animate-pulse">
                <span>e⁻</span>
                <span>→</span>
              </div>
            </div>
          )}
        </div>

        {/* Voltmeter */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-8">
          <div className="w-12 h-8 bg-gray-100 rounded border-2 border-gray-400 flex items-center justify-center">
            <span className="text-xs font-bold">V</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Anode: Oxun ({anode.symbol} → {anode.ion})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Cathode: Afoxun ({cathode.ion} → {cathode.symbol})</span>
        </div>
      </div>
    </div>
  );
};

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
      title: 'Hvað er galvanísk hlaup?',
      content: 'Galvanísk hlaup (rafhlöðu) er tæki sem breytir efnaorku í raforku með sjálfvirku redox-hvarfi.',
      icon: '🔋'
    },
    {
      title: 'Anode - Oxun',
      content: 'Við anode fer fram OXUN. Málmurinn tapar rafeindum og fer í lausn sem jón. Þetta er neikvæði pólurinn.',
      icon: '➖'
    },
    {
      title: 'Cathode - Afoxun',
      content: 'Við cathode fer fram AFOXUN. Jónir í lausn öðlast rafeindir og verða að málmi. Þetta er jákvæði pólurinn.',
      icon: '➕'
    },
    {
      title: 'Rafeindarflæði',
      content: 'Rafeindir flæða í gegnum vírinn frá anode til cathode. Þetta er rafstraumurinn sem rafhlöðurnar framleiða.',
      icon: '⚡'
    },
    {
      title: 'Saltbrúin',
      content: 'Saltbrúin leyfir jónum að flæða milli lausnanna til að viðhalda rafhlutleysi. Án hennar myndi hvörfið stöðvast.',
      icon: '🌉'
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
              ← Til baka
            </button>
            <div className="text-sm text-gray-500">
              {learnStep + 1} af {learnContent.length}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-yellow-600">
            📚 Galvanísk hlaup
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Grunnhugtök um rafhlöður
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {learnContent.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === learnStep ? 'bg-yellow-500' : idx < learnStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="bg-yellow-50 p-8 rounded-2xl border-2 border-yellow-200 mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-yellow-800 mb-4">{step.title}</h2>
              <p className="text-yellow-900 text-lg">{step.content}</p>
            </div>

            {learnStep === 0 && (
              <GalvanicCellDiagram
                anode={{ metal: 'Sink', symbol: 'Zn', ion: 'Zn²⁺', color: 'bg-gray-400' }}
                cathode={{ metal: 'Kopar', symbol: 'Cu', ion: 'Cu²⁺', color: 'bg-orange-400' }}
                showElectronFlow={false}
              />
            )}

            {learnStep === 3 && (
              <GalvanicCellDiagram
                anode={{ metal: 'Sink', symbol: 'Zn', ion: 'Zn²⁺', color: 'bg-gray-400' }}
                cathode={{ metal: 'Kopar', symbol: 'Cu', ion: 'Cu²⁺', color: 'bg-orange-400' }}
                showElectronFlow={true}
              />
            )}
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
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl"
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            ← Til baka
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Spurning {currentProblem + 1} af {problems.length}
            </div>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-bold">
              Stig: {score}
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-yellow-600">
          🔋 Galvanísk hlaup
        </h1>

        <GalvanicCellDiagram
          anode={problem.anode}
          cathode={problem.cathode}
          showElectronFlow={true}
        />

        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800 mb-4">
              {problem.question}
            </div>
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
                      ? 'border-yellow-500 bg-yellow-50'
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
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
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
                relatedConcepts: ['Galvanísk hlaup', 'Oxun og afoxun', 'Rafeindarflæði'],
                nextSteps: isCorrect
                  ? 'Frábært! Þú skilur grunnhugtökin í rafefnafræði.'
                  : 'Mundu: Anode = oxun (tapar e⁻), Cathode = afoxun (öðlast e⁻).',
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
            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
