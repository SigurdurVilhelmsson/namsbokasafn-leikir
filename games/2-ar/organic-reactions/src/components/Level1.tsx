import { useState } from 'react';
import { FeedbackPanel } from '@shared/components';

interface Level1Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface ReactionTypeProblem {
  id: number;
  reactionType: 'addition' | 'substitution' | 'elimination';
  reactants: string;
  product: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const problems: ReactionTypeProblem[] = [
  {
    id: 1,
    reactionType: 'addition',
    reactants: 'CH₂=CH₂ + HBr',
    product: 'CH₃-CH₂Br',
    question: 'Hvaða tegund efnahvarfs er þetta: CH₂=CH₂ + HBr → CH₃-CH₂Br?',
    options: ['Viðbót (Addition)', 'Staðgengill (Substitution)', 'Brotthvarf (Elimination)', 'Endurröðun (Rearrangement)'],
    correctAnswer: 0,
    hint: 'Þegar tvöföld tenging opnast og tekur við atómum er það viðbótarhvarf.',
    explanation: 'Þetta er viðbótarhvarf (addition) vegna þess að HBr bætist við tvöfalda tenginguna í etheni. Tvöfalda tengingin opnast og H og Br bætast við.'
  },
  {
    id: 2,
    reactionType: 'substitution',
    reactants: 'CH₃Br + OH⁻',
    product: 'CH₃OH + Br⁻',
    question: 'Hvaða tegund efnahvarfs er þetta: CH₃Br + OH⁻ → CH₃OH + Br⁻?',
    options: ['Viðbót (Addition)', 'Staðgengill (Substitution)', 'Brotthvarf (Elimination)', 'Oxun (Oxidation)'],
    correctAnswer: 1,
    hint: 'Eitt atóm eða hópur er skipt út fyrir annað.',
    explanation: 'Þetta er staðgengilshvarf (substitution) vegna þess að Br er skipt út fyrir OH. Hydroxíð jónin tekur við stað brómjónarinnar.'
  },
  {
    id: 3,
    reactionType: 'elimination',
    reactants: 'CH₃-CH₂OH + H₂SO₄ (hiti)',
    product: 'CH₂=CH₂ + H₂O',
    question: 'Hvaða tegund efnahvarfs er þetta: CH₃-CH₂OH → CH₂=CH₂ + H₂O (með H₂SO₄ og hita)?',
    options: ['Viðbót (Addition)', 'Staðgengill (Substitution)', 'Brotthvarf (Elimination)', 'Afoxun (Reduction)'],
    correctAnswer: 2,
    hint: 'Atóm eða hópar hverfa úr sameind og tvöföld tenging myndast.',
    explanation: 'Þetta er brotthvarfshvarf (elimination) vegna þess að H₂O hverfur og tvöföld tenging myndast. H og OH hverfa af aðlægum kolefnum.'
  },
  {
    id: 4,
    reactionType: 'addition',
    reactants: 'CH₃-CH=CH₂ + Br₂',
    product: 'CH₃-CHBr-CH₂Br',
    question: 'Hvað gerist þegar alken hvarfast við Br₂?',
    options: ['Viðbótarhvarf - bróm bætist við tvöföld tengingu', 'Staðgengilshvarf - bróm skiptir út H', 'Brotthvarfshvarf - HBr hverfur', 'Fjölliðunarhvarf'],
    correctAnswer: 0,
    hint: 'Bróm bætist við tvöföldun tenginguna og myndar díbrómíð.',
    explanation: 'Þetta er viðbótarhvarf. Br₂ bætist við tvöföld tenginguna og myndar 1,2-díbrómópróan. Litur brómvatns hverfur (brúnn → litlaus).'
  },
  {
    id: 5,
    reactionType: 'substitution',
    reactants: 'C₆H₅Br + NaOH',
    product: 'C₆H₅OH + NaBr',
    question: 'Hvaða tegund efnahvarfs er þetta: C₆H₅Br + NaOH → C₆H₅OH + NaBr?',
    options: ['Viðbót (Addition)', 'Staðgengill (Substitution)', 'Brotthvarf (Elimination)', 'Hýdrógenun'],
    correctAnswer: 1,
    hint: 'Bróm er skipt út fyrir hýdroxíð hóp.',
    explanation: 'Þetta er staðgengilshvarf (substitution) á arómötum hring. Br hverfur og OH kemur í staðinn. Fenól myndast.'
  },
  {
    id: 6,
    reactionType: 'elimination',
    reactants: 'CH₃-CHBr-CH₃ + KOH (alkóhól, hiti)',
    product: 'CH₃-CH=CH₂ + KBr + H₂O',
    question: 'Hvað gerist þegar alkýlhalíð hvarfast við sterkan basa í alkóhól við háan hita?',
    options: ['Viðbótarhvarf', 'Staðgengilshvarf (SN1/SN2)', 'Brotthvarfshvarf (E1/E2)', 'Ekkert hvarf'],
    correctAnswer: 2,
    hint: 'Hár hiti og alkóhól sem leysiefni stuðlar að brotthvarfi.',
    explanation: 'Þetta er E2 brotthvarfshvarf. KOH í alkóhól við hita fjarlægir HBr og myndar tvöfalda tengingu. Alkýlhalíð → Alken.'
  },
  {
    id: 7,
    reactionType: 'addition',
    reactants: 'CH₂=CH₂ + H₂O (H₂SO₄)',
    product: 'CH₃-CH₂OH',
    question: 'Hvaða tegund efnahvarfs er vötnun alkens (með sýruhvata)?',
    options: ['Viðbót (Addition)', 'Staðgengill (Substitution)', 'Brotthvarf (Elimination)', 'Kondensasía'],
    correctAnswer: 0,
    hint: 'Vatn bætist við tvöfalda tenginguna og myndar alkóhól.',
    explanation: 'Þetta er viðbótarhvarf. H₂O bætist við tvöfalda tenginguna. H fer á annað kolefni og OH á hitt. Ethanól myndast úr etheni.'
  },
  {
    id: 8,
    reactionType: 'substitution',
    reactants: 'CH₃-CH₂-CH₂Cl + I⁻',
    product: 'CH₃-CH₂-CH₂I + Cl⁻',
    question: 'Hvaða tegund efnahvarfs er þetta: CH₃-CH₂-CH₂Cl + I⁻ → CH₃-CH₂-CH₂I + Cl⁻?',
    options: ['Viðbót (Addition)', 'Staðgengill (Substitution)', 'Brotthvarf (Elimination)', 'Isómering'],
    correctAnswer: 1,
    hint: 'Einn halógen er skipt út fyrir annan.',
    explanation: 'Þetta er SN2 staðgengilshvarf. Jóðíð jón (I⁻) kemur í stað klóríð (Cl⁻). Þetta er dæmigert kjarnsækilegt staðgengilshvarf.'
  },
  {
    id: 9,
    reactionType: 'elimination',
    reactants: '(CH₃)₃C-Br + NaOC₂H₅',
    product: '(CH₃)₂C=CH₂ + NaBr + C₂H₅OH',
    question: 'Þegar þriðja stigs alkýlhalíð hvarfast við sterkan basa í alkóhól, hvað gerist?',
    options: ['Viðbótarhvarf', 'Staðgengilshvarf er ríkjandi', 'Brotthvarfshvarf er ríkjandi', 'Ekkert hvarf fer fram'],
    correctAnswer: 2,
    hint: 'Þriðja stigs alkýlhalíð eru of hindraðar fyrir SN2 og sterkar basar stuðla að brotthvarfi.',
    explanation: 'Þetta er E2 brotthvarf. Þriðja stigs alkýlhalíð eru of hindraðar fyrir SN2. Sterkur basi fjarlægir H og Br hverfur → alken myndast.'
  },
  {
    id: 10,
    reactionType: 'addition',
    reactants: 'CH≡CH + 2Cl₂',
    product: 'CHCl₂-CHCl₂',
    question: 'Hvað gerist þegar alkýn (þríföld tenging) hvarfast við umfram halógen?',
    options: ['Tvöföld viðbót - tetra-halíð myndast', 'Einföld viðbót - díhalíð myndast', 'Staðgengilshvarf', 'Brotthvarfshvarf'],
    correctAnswer: 0,
    hint: 'Þríföld tenging getur tekið við tveimur sameindum halógens.',
    explanation: 'Þetta er tvöfalt viðbótarhvarf. Fyrst bætist eitt Cl₂ við þríföldutenginguna (→ díklór alken), síðan annað Cl₂ (→ tetraklór alkan).'
  }
];

const ReactionTypeInfo = ({ type }: { type: 'addition' | 'substitution' | 'elimination' }) => {
  const info = {
    addition: {
      name: 'Viðbót (Addition)',
      color: 'bg-blue-100 border-blue-300 text-blue-800',
      description: 'Atóm eða hópar bætast við tvöfalda/þrífalda tengingu',
      example: 'C=C + HBr → C-C (með H og Br)'
    },
    substitution: {
      name: 'Staðgengill (Substitution)',
      color: 'bg-green-100 border-green-300 text-green-800',
      description: 'Eitt atóm/hópur er skipt út fyrir annað',
      example: 'R-X + Nu⁻ → R-Nu + X⁻'
    },
    elimination: {
      name: 'Brotthvarf (Elimination)',
      color: 'bg-orange-100 border-orange-300 text-orange-800',
      description: 'Atóm/hópar hverfa og tvöföld tenging myndast',
      example: 'R-CH₂-CH₂-X → R-CH=CH₂ + HX'
    }
  };

  const data = info[type];
  return (
    <div className={`p-3 rounded-lg border-2 ${data.color}`}>
      <div className="font-bold mb-1">{data.name}</div>
      <div className="text-sm">{data.description}</div>
      <div className="text-xs font-mono mt-1">{data.example}</div>
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
      title: 'Lífræn efnahvörf',
      content: 'Í lífrænni efnafræði eru þrjár aðalgerðir efnahvarfa: viðbót, staðgengill og brotthvarf.',
      icon: '🧪'
    },
    {
      title: 'Viðbót (Addition)',
      content: 'Í viðbótarhvarfi bætast atóm eða hópar við tvöfalda eða þrífalda tengingu. Tengingin opnast og ný efnatenging myndast.',
      icon: '➕',
      example: 'CH₂=CH₂ + HBr → CH₃-CH₂Br'
    },
    {
      title: 'Staðgengill (Substitution)',
      content: 'Í staðgengilshvarfi er eitt atóm eða hópur skipt út fyrir annað. Heildarfjöldi bindinga breytist ekki.',
      icon: '🔄',
      example: 'CH₃Br + OH⁻ → CH₃OH + Br⁻'
    },
    {
      title: 'Brotthvarf (Elimination)',
      content: 'Í brotthvarfshvarfi hverfa atóm eða hópar úr sameind og tvöföld tenging myndast. Oft þarf hita og basa.',
      icon: '➖',
      example: 'CH₃-CH₂Br → CH₂=CH₂ + HBr'
    },
    {
      title: 'Hvernig á að greina?',
      content: 'Skoðaðu: 1) Eru tvöfaldar tengingar að myndast eða hverfa? 2) Er eitthvað að fara ÚT úr sameind? 3) Er eitthvað að skipta stað?',
      icon: '🔍'
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
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
              ← Til baka
            </button>
            <div className="text-sm text-gray-500">
              {learnStep + 1} af {learnContent.length}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-teal-600">
            Gerðir efnahvarfa
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Viðbót, Staðgengill, Brotthvarf
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {learnContent.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === learnStep ? 'bg-teal-500' : idx < learnStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="bg-teal-50 p-8 rounded-2xl border-2 border-teal-200 mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-teal-800 mb-4">{step.title}</h2>
              <p className="text-teal-900 text-lg">{step.content}</p>
              {(step as { example?: string }).example && (
                <div className="mt-4 bg-white p-4 rounded-xl border-2 border-teal-300">
                  <code className="text-lg font-mono font-bold text-teal-700">{(step as { example?: string }).example}</code>
                </div>
              )}
            </div>
          </div>

          {learnStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              <ReactionTypeInfo type="addition" />
              <ReactionTypeInfo type="substitution" />
              <ReactionTypeInfo type="elimination" />
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
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-xl"
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            ← Til baka
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Spurning {currentProblem + 1} af {problems.length}
            </div>
            <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-bold">
              Stig: {score}
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-teal-600">
          Gerðir efnahvarfa
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
          <ReactionTypeInfo type="addition" />
          <ReactionTypeInfo type="substitution" />
          <ReactionTypeInfo type="elimination" />
        </div>

        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200 mb-4">
              <div className="text-lg font-mono font-bold text-gray-800">
                {problem.reactants} → {problem.product}
              </div>
            </div>
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
                      ? 'border-teal-500 bg-teal-50'
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
                    : 'bg-teal-500 hover:bg-teal-600 text-white'
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
                relatedConcepts: ['Viðbótarhvarf', 'Staðgengilshvarf', 'Brotthvarfshvarf'],
                nextSteps: isCorrect
                  ? 'Frábært! Þú getur greint mismunandi gerðir efnahvarfa.'
                  : 'Mundu: Viðbót = tenging opnast, Staðgengill = skipti, Brotthvarf = tenging myndast.',
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
            className="bg-teal-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
