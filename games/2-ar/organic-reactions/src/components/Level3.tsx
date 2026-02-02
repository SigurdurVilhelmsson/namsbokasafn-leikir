import { useState } from 'react';
import { FeedbackPanel } from '@shared/components';

interface Level3Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface SynthesisProblem {
  id: number;
  startingMaterial: string;
  product: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
  steps?: string[];
}

const problems: SynthesisProblem[] = [
  {
    id: 1,
    startingMaterial: 'CH₃-CH=CH₂ (própen)',
    product: 'CH₃-CHBr-CH₃ (2-brómprópan)',
    question: 'Hvaða hvarfefni þarf til að breyta própeni í 2-brómprópan?',
    options: ['HBr', 'Br₂', 'NaBr', 'KBr + H₂SO₄'],
    correctAnswer: 0,
    hint: 'Þú þarft að bæta H og Br við tvöfalda tenginguna. Markovnikov reglan segir að H fari á kolefnið með fleiri H.',
    explanation: 'HBr bætist við tvöfalda tenginguna (viðbótarhvarf). Samkvæmt Markovnikov reglu fer H á enda-kolefnið og Br á miðju-kolefnið → 2-brómprópan.',
    steps: ['CH₃-CH=CH₂ + HBr → CH₃-CHBr-CH₃']
  },
  {
    id: 2,
    startingMaterial: 'CH₃-CH₂Br (brómetan)',
    product: 'CH₃-CH₂OH (etanól)',
    question: 'Hvaða hvarfefni þarf til að breyta brómetani í etanól?',
    options: ['H₂O', 'NaOH (í vatni)', 'HBr', 'Na'],
    correctAnswer: 1,
    hint: 'Þú þarft að skipta Br út fyrir OH. Þetta er staðgengilshvarf.',
    explanation: 'NaOH í vatni (eða diluted NaOH) framkvæmir SN2 staðgengilshvarf. OH⁻ kemur í stað Br⁻ og etanól myndast.',
    steps: ['CH₃-CH₂Br + NaOH → CH₃-CH₂OH + NaBr']
  },
  {
    id: 3,
    startingMaterial: 'CH₃-CH₂OH (etanól)',
    product: 'CH₂=CH₂ (eten)',
    question: 'Hvaða hvarfefni og aðstæður þarf til að breyta etanóli í eten?',
    options: ['NaOH + hiti', 'H₂SO₄ (þykkt) + hiti (~180°C)', 'HBr', 'Br₂'],
    correctAnswer: 1,
    hint: 'Þú þarft að fjarlægja H₂O (brotthvarf). Þykkt svavlasýra er góður vökvafjarlægir.',
    explanation: 'Þykkt H₂SO₄ við ~180°C framkvæmir brotthvarf (dehydration). H₂O hverfur og tvöföld tenging myndast → eten.',
    steps: ['CH₃-CH₂OH → CH₂=CH₂ + H₂O (H₂SO₄, hiti)']
  },
  {
    id: 4,
    startingMaterial: 'CH₂=CH₂ (eten)',
    product: 'CH₂Br-CH₂Br (1,2-díbrómetan)',
    question: 'Hvaða hvarfefni þarf til að breyta eteni í 1,2-díbrómetan?',
    options: ['HBr', 'Br₂', '2 NaBr', 'Br₂ + hiti'],
    correctAnswer: 1,
    hint: 'Þú þarft að bæta tveimur Br við (eitt á hvort kolefni). Br₂ bætist við tvöfalda tenginguna.',
    explanation: 'Br₂ bætist við tvöfalda tenginguna í viðbótarhvarfi. Brúnn litur Br₂ hverfur (klassískt próf fyrir alken). 1,2-díbrómetan myndast.',
    steps: ['CH₂=CH₂ + Br₂ → CH₂Br-CH₂Br']
  },
  {
    id: 5,
    startingMaterial: 'CH₃-CHBr-CH₃ (2-brómprópan)',
    product: 'CH₃-CH=CH₂ (própen)',
    question: 'Hvaða hvarfefni þarf til að breyta 2-brómprópani í própen?',
    options: ['HBr', 'Br₂', 'NaOH í vatni', 'KOH í etanóli + hiti'],
    correctAnswer: 3,
    hint: 'Þú þarft að fjarlægja HBr (brotthvarf). Sterkur basi í alkóhól stuðlar að E2.',
    explanation: 'KOH í etanóli við hita framkvæmir E2 brotthvarf. Basinn tekur H af einu kolefni, Br hverfur af öðru, og tvöföld tenging myndast.',
    steps: ['CH₃-CHBr-CH₃ + KOH → CH₃-CH=CH₂ + KBr + H₂O (í etanóli, hiti)']
  },
  {
    id: 6,
    startingMaterial: 'CH₃-CH=CH₂ (própen)',
    product: 'CH₃-CH₂-CH₂OH (1-própanól)',
    question: 'Hver er besta leiðin til að breyta própeni í 1-própanól (andstætt Markovnikov)?',
    options: ['H₂O + H₂SO₄', 'HBr, síðan NaOH', 'BH₃/THF, síðan H₂O₂/NaOH (hydroboration-oxidation)', 'Br₂, síðan NaOH'],
    correctAnswer: 2,
    hint: 'Venjuleg vötnun gefur 2-própanól (Markovnikov). Þú þarft andstæða regióselectivity.',
    explanation: 'Hydroboration-oxidation (BH₃/THF, síðan H₂O₂/NaOH) gefur anti-Markovnikov vötnun. OH endar á minna staðgengla kolefninu → 1-própanól.',
    steps: ['CH₃-CH=CH₂ + BH₃ → (trialkylborane)', '(trialkylborane) + H₂O₂/NaOH → CH₃-CH₂-CH₂OH']
  }
];

const SynthesisArrow = () => (
  <div className="flex items-center justify-center py-2">
    <div className="text-3xl text-gray-400">↓</div>
  </div>
);

const ReagentBox = ({ reagent, isAnswer }: { reagent: string; isAnswer?: boolean }) => (
  <div className={`p-3 rounded-lg border-2 text-center ${
    isAnswer ? 'bg-green-100 border-green-400 text-green-800' : 'bg-yellow-100 border-yellow-400 text-yellow-800'
  }`}>
    <span className="font-bold">?</span>
    {isAnswer && <span className="ml-2 font-mono">{reagent}</span>}
  </div>
);

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
      title: 'Efnasmíði (Synthesis)',
      content: 'Efnasmíði er að skipuleggja hvernig á að breyta einu efni í annað með röð efnahvarfa. Þú þarft að velja rétt hvarfefni og aðstæður.',
      icon: '🧪'
    },
    {
      title: 'Afturábak Greining (Retrosynthesis)',
      content: 'Byrjaðu á markefninu og vinndu afturábak. Spyrðu: "Hvað gæti myndað þetta efni?" Þetta hjálpar að finna réttu hvarfefnin.',
      icon: '⬅️'
    },
    {
      title: 'Lykilhvörf',
      content: 'Þekktu helstu hvörfin: Viðbót við alken (HX, X₂, H₂O), Staðgengill (SN1/SN2), Brotthvarf (E1/E2). Hver gerð krefst sérstakra aðstæðna.',
      icon: '🔑'
    },
    {
      title: 'Markovnikov vs Anti-Markovnikov',
      content: 'Markovnikov: H fer á kolefni með fleiri H (venjuleg viðbót). Anti-Markovnikov: H fer á kolefni með færri H (hydroboration).',
      icon: '↔️'
    },
    {
      title: 'Aðstæður skipta máli',
      content: 'SN2 vs E2 fer eftir: Hita (hærri → E), Leysiefni (vatn → SN, alkóhól → E), Basa (sterkur → E). Þriðja stigs halíð → E.',
      icon: '⚗️'
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
              ← Til baka
            </button>
            <div className="text-sm text-gray-500">
              {learnStep + 1} af {learnContent.length}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-emerald-600">
            Efnasmíði
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Skipuleggðu hvörf til að búa til efni
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {learnContent.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === learnStep ? 'bg-emerald-500' : idx < learnStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="bg-emerald-50 p-8 rounded-2xl border-2 border-emerald-200 mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">{step.title}</h2>
              <p className="text-emerald-900 text-lg">{step.content}</p>
            </div>
          </div>

          {learnStep === 2 && (
            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <h3 className="font-bold text-gray-700 mb-3 text-center">Algeng hvörf</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="font-bold text-blue-700">Viðbót við alken</div>
                  <div className="font-mono text-xs mt-1">+ HBr → halíð</div>
                  <div className="font-mono text-xs">+ H₂O → alkóhól</div>
                  <div className="font-mono text-xs">+ Br₂ → díbrómíð</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="font-bold text-green-700">Staðgengill (SN)</div>
                  <div className="font-mono text-xs mt-1">R-X + OH⁻ → R-OH</div>
                  <div className="font-mono text-xs">R-X + CN⁻ → R-CN</div>
                  <div className="font-mono text-xs">(vatn, lágur hiti)</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <div className="font-bold text-orange-700">Brotthvarf (E)</div>
                  <div className="font-mono text-xs mt-1">R-X + KOH → alken</div>
                  <div className="font-mono text-xs">R-OH + H₂SO₄ → alken</div>
                  <div className="font-mono text-xs">(alkóhól, hiti)</div>
                </div>
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
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl"
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            ← Til baka
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Spurning {currentProblem + 1} af {problems.length}
            </div>
            <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
              Stig: {score}
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-emerald-600">
          Efnasmíði
        </h1>

        {/* Synthesis diagram */}
        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="text-center">
            {/* Starting material */}
            <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-300 inline-block">
              <div className="text-sm text-blue-600 mb-1">Upphafefni</div>
              <div className="font-mono font-bold text-blue-800">{problem.startingMaterial}</div>
            </div>

            <SynthesisArrow />

            {/* Reagent box */}
            <ReagentBox
              reagent={showFeedback && isCorrect ? problem.options[problem.correctAnswer] : ''}
              isAnswer={showFeedback && isCorrect}
            />

            <SynthesisArrow />

            {/* Product */}
            <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300 inline-block">
              <div className="text-sm text-green-600 mb-1">Markefni</div>
              <div className="font-mono font-bold text-green-800">{problem.product}</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="text-xl font-bold text-gray-800">
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
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium font-mono">{option}</span>
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
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
              >
                Athuga svar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {problem.steps && (
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mb-4">
                <div className="font-bold text-blue-800 mb-2">Hvörfin:</div>
                {problem.steps.map((step, idx) => (
                  <div key={idx} className="font-mono text-sm text-blue-700 mb-1">
                    {idx + 1}. {step}
                  </div>
                ))}
              </div>
            )}

            <FeedbackPanel
              feedback={{
                isCorrect,
                explanation: isCorrect
                  ? problem.explanation
                  : `Rangt. ${problem.explanation}`,
                relatedConcepts: ['Efnasmíði', 'Hvarfefni', 'Viðbót/Staðgengill/Brotthvarf'],
                nextSteps: isCorrect
                  ? 'Frábært! Þú getur skipulagt einfalda efnasmíði.'
                  : 'Hugsaðu: Hvað breytist? Myndast/hverfur tenging? Þá veistu hvaða hvarf þarf.',
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
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
