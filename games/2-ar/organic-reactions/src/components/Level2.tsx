import { useState } from 'react';
import { FeedbackPanel } from '@shared/components';

interface Level2Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface MechanismProblem {
  id: number;
  questionType: 'nucleophile' | 'electrophile' | 'arrow-pushing' | 'mechanism-type';
  question: string;
  diagram?: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  explanation: string;
}

const problems: MechanismProblem[] = [
  {
    id: 1,
    questionType: 'nucleophile',
    question: 'Hvað er kjarnsækni (nucleophile)?',
    options: [
      'Efni sem gefur frá sér rafeindir og sækir jákvætt hlaðna staði',
      'Efni sem tekur við rafeindum og sækir neikvætt hlaðna staði',
      'Efni sem tekur við prótonum',
      'Efni sem gefur frá sér prótón'
    ],
    correctAnswer: 0,
    hint: 'Núkleófíll = kjarnsækið. "Kjarni" er jákvæður.',
    explanation: 'Kjarnsækni (nucleophile) er efni með laus rafeinapör sem sækir jákvætt hlaðna staði. Dæmi: OH⁻, NH₃, H₂O, Br⁻.'
  },
  {
    id: 2,
    questionType: 'electrophile',
    question: 'Hvað er rafeindasækni (electrophile)?',
    options: [
      'Efni sem gefur frá sér rafeindir',
      'Efni sem tekur við rafeindum og sækir neikvætt hlaðna staði',
      'Efni sem tekur við rafeindum og sækir rafeindaþétta svæði',
      'Efni sem gefur frá sér prótón'
    ],
    correctAnswer: 2,
    hint: 'Elektró = rafeind, fíll = elskandi. Þetta efni vill fá rafeindir.',
    explanation: 'Rafeindasækni (electrophile) er efni sem tekur við rafeindum. Það sækir rafeindaþétt svæði. Dæmi: H⁺, Br⁺, karbókatjónir (R⁺).'
  },
  {
    id: 3,
    questionType: 'nucleophile',
    question: 'Hvað af þessu er STERKASTA kjarnsæknið?',
    options: ['H₂O', 'OH⁻', 'CH₃OH', 'NH₃'],
    correctAnswer: 1,
    hint: 'Neikvætt hlaðnar jónir eru sterkari kjarnsækni en hlutlausar sameindir.',
    explanation: 'OH⁻ er sterkasta kjarnsæknið vegna þess að það er neikvætt hlaðið og hefur mikið af rafeinatéttleika til að gefa frá sér.'
  },
  {
    id: 4,
    questionType: 'arrow-pushing',
    question: 'Í boga-myndun (arrow pushing), hvert benda bogarnir?',
    diagram: 'Nu:⁻ → C—X',
    options: [
      'Frá uppsprettu rafeinda að áfangastað rafeinda',
      'Frá áfangastað til uppsprettu',
      'Frá jákvæðu til neikvæðu',
      'Í átt að leysiefni'
    ],
    correctAnswer: 0,
    hint: 'Bogarnir sýna HVERT rafeindir fara, ekki hvaðan þær koma.',
    explanation: 'Bogarnir benda alltaf frá uppsprettu rafeinda (t.d. laust par, tenging) til áfangastaðar (t.d. elektróphile). Nu:⁻ → C sýnir að rafeindir fara frá kjarnsækni til kolefnis.'
  },
  {
    id: 5,
    questionType: 'mechanism-type',
    question: 'Hvað einkennir SN2 hvarf (substitution nucleophilic bimolecular)?',
    options: [
      'Eitt skref - kjarnsækni ræðst á kolefni samtímis og farandi hópur fer',
      'Tvö skref - fyrst fer farandi hópur, síðan kemur kjarnsækni',
      'Þrjú skref - með millilið',
      'Hvarf í gegnum róttækla millilið'
    ],
    correctAnswer: 0,
    hint: 'SN2: S=substitution, N=nucleophilic, 2=bimolecular (tvær sameindir í hraðatakmarkandi skrefi).',
    explanation: 'SN2 er eins skrefs hvarf þar sem kjarnsækni ræðst á bakhlið kolefnis samtímis og farandi hópur (leaving group) fer. Ýlingar snýst við (Walden inversion).'
  },
  {
    id: 6,
    questionType: 'mechanism-type',
    question: 'Hvað einkennir E2 hvarf (elimination bimolecular)?',
    options: [
      'Tvö skref - karbókatjón myndast fyrst',
      'Eitt skref - basi tekur H samtímis og farandi hópur fer, tvöföld tenging myndast',
      'Þrjú skref með karbaníóni',
      'Radíkal millilið'
    ],
    correctAnswer: 1,
    hint: 'E2: E=elimination, 2=bimolecular. Allt gerist í einu skrefi.',
    explanation: 'E2 er eins skrefs hvarf: Basi tekur vetni (H) af kolefni við hlið farandi hóps, farandi hópur fer, og tvöföld tenging myndast - allt samtímis.'
  },
  {
    id: 7,
    questionType: 'electrophile',
    question: 'Í viðbótarhvarfi alkens við HBr, hver er rafeindasæknið (electrophile)?',
    diagram: 'C=C + H-Br → C-C(H)(Br)',
    options: ['C=C', 'H⁺ (frá HBr)', 'Br⁻', 'HBr sameind'],
    correctAnswer: 1,
    hint: 'Hvort endinn á HBr er rafeindafátækur?',
    explanation: 'H⁺ (eða H hlutinn af HBr) er rafeindasæknið. Það er jákvætt og sækir rafeindaþéttu svæðið í tvöföldu tengingunni. Br⁻ bætist síðan við.'
  },
  {
    id: 8,
    questionType: 'arrow-pushing',
    question: 'Hversu margir bogaörvar þarf til að sýna SN2 hvarf (CH₃Br + OH⁻ → CH₃OH + Br⁻)?',
    options: ['Einn - frá OH⁻ til C', 'Tvo - frá OH⁻ til C og frá C-Br til Br', 'Þrjá', 'Fjóra'],
    correctAnswer: 1,
    hint: 'Þú þarft að sýna: 1) Kjarnsækni fer að kolefni, 2) Tenging við farandi hóp brotnar.',
    explanation: 'Tveir bogaörvar: 1) Frá lausu pari á OH⁻ til kolefnisins (ný tenging myndast), 2) Frá C-Br tengingunni til Br (tenging brotnar og Br⁻ myndast).'
  }
];

const MechanismConcepts = () => {
  return (
    <div className="bg-indigo-50 p-4 rounded-xl mb-6">
      <h3 className="font-bold text-indigo-800 mb-3 text-center">Lykilhugtök</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border-2 border-indigo-200">
          <div className="font-bold text-indigo-700 mb-2">Kjarnsækni (Nu:)</div>
          <div className="text-sm text-gray-700 mb-2">Gefur rafeindir, sækir + svæði</div>
          <div className="flex flex-wrap gap-1">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">OH⁻</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Br⁻</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">NH₃</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">H₂O</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border-2 border-indigo-200">
          <div className="font-bold text-indigo-700 mb-2">Rafeindasækni (E⁺)</div>
          <div className="text-sm text-gray-700 mb-2">Tekur við rafeindum, sækir − svæði</div>
          <div className="flex flex-wrap gap-1">
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">H⁺</span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Br⁺</span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">R⁺</span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">AlCl₃</span>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-white p-3 rounded-lg border-2 border-indigo-200">
        <div className="font-bold text-indigo-700 mb-2 text-center">Bogaörvar (Arrow Pushing)</div>
        <div className="text-center text-sm">
          <span className="font-mono">Nu:⁻ ⟶ C—X ⟶ X⁻</span>
          <div className="text-gray-500 mt-1">Örvar benda frá uppsprettu rafeinda til áfangastaðar</div>
        </div>
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
      title: 'Hvarfgangur (Mechanism)',
      content: 'Hvarfgangur lýsir nákvæmlega hvernig efnahvarf fer fram - hvaða tengingar brotna og myndast, og í hvaða röð.',
      icon: '🔬'
    },
    {
      title: 'Kjarnsækni (Nucleophile)',
      content: 'Kjarnsækni (Nu:) er efni sem gefur frá sér rafeindir. Það sækir jákvætt hlaðna eða rafeindafátæka staði. "Núkleó" þýðir kjarni (jákvæður).',
      icon: '🔵',
      examples: 'OH⁻, Br⁻, I⁻, NH₃, H₂O, CN⁻'
    },
    {
      title: 'Rafeindasækni (Electrophile)',
      content: 'Rafeindasækni (E⁺) er efni sem tekur við rafeindum. Það sækir neikvætt hlaðna eða rafeindaþétta svæði. "Elektró" þýðir rafeind.',
      icon: '🔴',
      examples: 'H⁺, Br⁺, NO₂⁺, karbókatjónir (R⁺)'
    },
    {
      title: 'Bogaörvar (Arrow Pushing)',
      content: 'Bogaörvar sýna hvernig rafeindir hreyfast í hvarfi. Þeir benda alltaf FRÁ uppsprettu rafeinda TIL áfangastaðar.',
      icon: '➡️',
      diagram: 'Fullt ör (⟶) = par rafeinda, Hálft ör (⇀) = ein rafeind'
    },
    {
      title: 'SN2 og E2',
      content: 'SN2: Kjarnsækni ræðst á kolefni samtímis og farandi hópur fer (eitt skref). E2: Basi tekur H og farandi hópur fer (eitt skref, tvöföld tenging myndast).',
      icon: '⚡'
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
              ← Til baka
            </button>
            <div className="text-sm text-gray-500">
              {learnStep + 1} af {learnContent.length}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-indigo-600">
            Hvarfgangar
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Kjarnsækni, rafeindasækni og bogaörvar
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {learnContent.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === learnStep ? 'bg-indigo-500' : idx < learnStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="bg-indigo-50 p-8 rounded-2xl border-2 border-indigo-200 mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h2 className="text-2xl font-bold text-indigo-800 mb-4">{step.title}</h2>
              <p className="text-indigo-900 text-lg">{step.content}</p>
              {(step as { examples?: string }).examples && (
                <div className="mt-4 bg-white p-4 rounded-xl border-2 border-indigo-300">
                  <div className="text-sm text-gray-600 mb-1">Dæmi:</div>
                  <code className="text-lg font-mono font-bold text-indigo-700">{(step as { examples?: string }).examples}</code>
                </div>
              )}
              {(step as { diagram?: string }).diagram && (
                <div className="mt-4 bg-white p-4 rounded-xl border-2 border-indigo-300">
                  <code className="text-sm font-mono text-indigo-700">{(step as { diagram?: string }).diagram}</code>
                </div>
              )}
            </div>
          </div>

          {learnStep === 0 && <MechanismConcepts />}

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
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl"
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            ← Til baka
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Spurning {currentProblem + 1} af {problems.length}
            </div>
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-bold">
              Stig: {score}
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-indigo-600">
          Hvarfgangar
        </h1>

        <MechanismConcepts />

        <div className="bg-gray-50 p-6 rounded-xl mb-6">
          <div className="text-center">
            {problem.diagram && (
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 mb-4">
                <code className="text-lg font-mono font-bold text-gray-800">{problem.diagram}</code>
              </div>
            )}
            <div className="text-xl font-bold text-gray-800">
              {problem.question}
            </div>
          </div>
        </div>

        {showHint && (
          <div className="bg-purple-50 p-4 rounded-xl mb-4 border border-purple-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <span className="text-purple-800">{problem.hint}</span>
            </div>
          </div>
        )}

        {!showFeedback ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {problem.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAnswer(idx)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedAnswer === idx
                      ? 'border-indigo-500 bg-indigo-50'
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
                  className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold py-3 px-6 rounded-xl"
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
                    : 'bg-indigo-500 hover:bg-indigo-600 text-white'
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
                relatedConcepts: ['Kjarnsækni', 'Rafeindasækni', 'Bogaörvar', 'SN2/E2'],
                nextSteps: isCorrect
                  ? 'Frábært! Þú skilur grunnhugtök hvarfganga.'
                  : 'Mundu: Kjarnsækni gefur e⁻ (sækir +), Rafeindasækni tekur e⁻ (sækir −).',
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
            className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
