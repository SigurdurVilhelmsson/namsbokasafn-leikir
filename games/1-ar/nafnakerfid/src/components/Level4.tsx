import { useState, useCallback, useMemo } from 'react';
import {
  getUniquePolyatomicIons,
  type PolyatomicIon,
  type IonPerformance,
  getIonsForSpacedRepetition
} from '../data/polyatomicIons';
import { AudioButton } from './AudioButton';

/**
 * Level 4: Polyatomic Ion Drill (Fjölatóma jónaæfing)
 * Flash card style memorization with spaced repetition
 */

interface Level4Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

type DrillMode = 'formula-to-name' | 'name-to-formula' | 'mixed';
type GamePhase = 'setup' | 'playing' | 'review' | 'complete';

const STORAGE_KEY = 'nafnakerfid-ion-performance';

function loadPerformance(): IonPerformance[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

function savePerformance(performance: IonPerformance[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(performance));
}

export function Level4({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level4Props) {
  const [phase, setPhase] = useState<GamePhase>('setup');
  const [mode, setMode] = useState<DrillMode>('formula-to-name');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'all'>('easy');
  const [questionCount, setQuestionCount] = useState(10);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const [performance, setPerformance] = useState<IonPerformance[]>(loadPerformance());
  const [sessionResults, setSessionResults] = useState<{ ion: PolyatomicIon; correct: boolean; userAnswer: string }[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);

  // Get ions based on difficulty and spaced repetition
  const ions = useMemo(() => {
    const uniqueIons = getUniquePolyatomicIons();
    let filteredIons: PolyatomicIon[];

    if (difficulty === 'all') {
      filteredIons = uniqueIons;
    } else {
      filteredIons = uniqueIons.filter(ion => ion.difficulty === difficulty);
    }

    // Use spaced repetition to prioritize ions that need practice
    return getIonsForSpacedRepetition(filteredIons, performance, questionCount);
  }, [difficulty, questionCount, performance]);

  const currentIon = ions[currentIndex];

  // Determine what to show and what to ask for
  const isFormulaToName = mode === 'formula-to-name' ||
    (mode === 'mixed' && currentIndex % 2 === 0);

  const question = isFormulaToName ? currentIon?.formula : currentIon?.nameIs;
  const answer = isFormulaToName ? currentIon?.nameIs : currentIon?.formula;

  // Normalize answer for comparison
  const normalizeAnswer = (text: string): string => {
    return text.toLowerCase().trim()
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/ý/g, 'y')
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/ð/g, 'd')
      .replace(/þ/g, 'th')
      .replace(/æ/g, 'ae')
      .replace(/ö/g, 'o')
      .replace(/₂/g, '2')
      .replace(/₃/g, '3')
      .replace(/₄/g, '4')
      .replace(/₇/g, '7')
      .replace(/⁻/g, '-')
      .replace(/⁺/g, '+')
      .replace(/²⁻/g, '2-')
      .replace(/³⁻/g, '3-')
      .replace(/\s+/g, '');
  };

  // Update performance tracking
  const updatePerformance = useCallback((ion: PolyatomicIon, correct: boolean) => {
    setPerformance(prev => {
      const existing = prev.find(p => p.ionFormula === ion.formula);
      let updated: IonPerformance[];

      if (existing) {
        updated = prev.map(p =>
          p.ionFormula === ion.formula
            ? {
                ...p,
                correctCount: correct ? p.correctCount + 1 : p.correctCount,
                incorrectCount: correct ? p.incorrectCount : p.incorrectCount + 1,
                lastSeen: Date.now()
              }
            : p
        );
      } else {
        updated = [...prev, {
          ionFormula: ion.formula,
          correctCount: correct ? 1 : 0,
          incorrectCount: correct ? 0 : 1,
          lastSeen: Date.now()
        }];
      }

      savePerformance(updated);
      return updated;
    });
  }, []);

  // Check answer
  const checkAnswer = useCallback(() => {
    if (!currentIon || showAnswer) return;

    const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(answer);
    setShowAnswer(true);
    updatePerformance(currentIon, isCorrect);

    if (isCorrect) {
      const points = showHint ? 5 : 10;
      setScore(prev => prev + points);
      setStreak(prev => {
        const newStreak = prev + 1;
        setMaxStreak(max => Math.max(max, newStreak));
        return newStreak;
      });
      onCorrectAnswer?.();
    } else {
      setStreak(0);
      onIncorrectAnswer?.();
    }

    setSessionResults(prev => [...prev, {
      ion: currentIon,
      correct: isCorrect,
      userAnswer
    }]);
  }, [currentIon, userAnswer, answer, showAnswer, showHint, updatePerformance, onCorrectAnswer, onIncorrectAnswer]);

  // Move to next ion
  const nextIon = useCallback(() => {
    if (currentIndex + 1 < ions.length) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
      setUserAnswer('');
      setShowHint(false);
    } else {
      setPhase('complete');
    }
  }, [currentIndex, ions.length]);

  // Skip to show answer (counts as incorrect)
  const revealAnswer = useCallback(() => {
    if (!currentIon || showAnswer) return;

    setShowAnswer(true);
    setStreak(0);
    updatePerformance(currentIon, false);
    onIncorrectAnswer?.();

    setSessionResults(prev => [...prev, {
      ion: currentIon,
      correct: false,
      userAnswer: '(sleppt)'
    }]);
  }, [currentIon, showAnswer, updatePerformance, onIncorrectAnswer]);

  // Start the drill
  const startDrill = () => {
    setPhase('playing');
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setSessionResults([]);
    setShowAnswer(false);
    setUserAnswer('');
    setShowHint(false);
  };

  // Get category color
  const getCategoryColor = (category: PolyatomicIon['category']) => {
    const colors: Record<PolyatomicIon['category'], { bg: string; text: string; border: string }> = {
      nitrate: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
      sulfate: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
      carbonate: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
      phosphate: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
      halogen: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
      other: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' }
    };
    return colors[category];
  };

  // Setup screen
  if (phase === 'setup') {
    const uniqueIons = getUniquePolyatomicIons();
    const easyCount = uniqueIons.filter(i => i.difficulty === 'easy').length;
    const mediumCount = uniqueIons.filter(i => i.difficulty === 'medium').length;
    const hardCount = uniqueIons.filter(i => i.difficulty === 'hard').length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
              ← Til baka
            </button>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-cyan-600">
            Fjölatóma jónaæfing
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Lærðu helstu fjölatóma jónirnar á flasskorta-stíl
          </p>

          {/* Mode selection */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-700 mb-3">Veldu stillingar:</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Stefna:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['formula-to-name', 'name-to-formula', 'mixed'] as DrillMode[]).map(m => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        mode === m
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                          : 'border-gray-200 hover:border-cyan-300'
                      }`}
                    >
                      {m === 'formula-to-name' && 'Formúla → Nafn'}
                      {m === 'name-to-formula' && 'Nafn → Formúla'}
                      {m === 'mixed' && 'Blönduð'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Erfiðleiki:</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['easy', 'medium', 'hard', 'all'] as const).map(d => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        difficulty === d
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                          : 'border-gray-200 hover:border-cyan-300'
                      }`}
                    >
                      <div>
                        {d === 'easy' && 'Auðvelt'}
                        {d === 'medium' && 'Miðlungs'}
                        {d === 'hard' && 'Erfitt'}
                        {d === 'all' && 'Allt'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {d === 'easy' && `${easyCount} jónir`}
                        {d === 'medium' && `${mediumCount} jónir`}
                        {d === 'hard' && `${hardCount} jónir`}
                        {d === 'all' && `${uniqueIons.length} jónir`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">Fjöldi spurninga:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 15, 20].map(n => (
                    <button
                      key={n}
                      onClick={() => setQuestionCount(n)}
                      className={`p-3 rounded-xl border-2 font-medium transition-all ${
                        questionCount === n
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                          : 'border-gray-200 hover:border-cyan-300'
                      }`}
                    >
                      {n} spurningar
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ion reference */}
          <div className="bg-cyan-50 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-cyan-800 mb-3">Helstu fjölatóma jónir:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm max-h-48 overflow-y-auto">
              {getUniquePolyatomicIons().slice(0, 12).map(ion => (
                <div key={ion.formula} className="bg-white rounded-lg p-2 flex justify-between items-center">
                  <span className="font-mono font-bold">{ion.formula}</span>
                  <span className="text-gray-600">{ion.nameIs}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={startDrill}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-6 rounded-xl text-lg"
          >
            Byrja æfingu →
          </button>

          {/* Performance stats */}
          {performance.length > 0 && (
            <div className="mt-6 bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-700 mb-2 text-sm">Þín framvinda:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white rounded-lg p-2 text-center">
                  <div className="text-xl font-bold text-cyan-600">{performance.length}</div>
                  <div className="text-xs text-gray-500">Jónir séðar</div>
                </div>
                <div className="bg-white rounded-lg p-2 text-center">
                  <div className="text-xl font-bold text-green-600">
                    {Math.round(
                      (performance.reduce((acc, p) => acc + p.correctCount, 0) /
                       Math.max(1, performance.reduce((acc, p) => acc + p.correctCount + p.incorrectCount, 0))) * 100
                    )}%
                  </div>
                  <div className="text-xs text-gray-500">Nákvæmni</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Playing screen
  if (phase === 'playing' && currentIon) {
    const categoryColor = getCategoryColor(currentIon.category);
    const isCorrect = showAnswer && normalizeAnswer(userAnswer) === normalizeAnswer(answer);

    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
                ← Til baka
              </button>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-cyan-600">{currentIndex + 1}/{ions.length}</div>
                  <div className="text-xs text-gray-500">Spurning</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">{score}</div>
                  <div className="text-xs text-gray-500">Stig</div>
                </div>
                {streak > 0 && (
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-500">{streak}🔥</div>
                    <div className="text-xs text-gray-500">Röð</div>
                  </div>
                )}
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 transition-all duration-300"
                style={{ width: `${((currentIndex + (showAnswer ? 1 : 0)) / ions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Flash card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-4">
            {/* Question side */}
            <div className={`${categoryColor.bg} rounded-xl p-6 mb-6 text-center`}>
              <div className="text-sm text-gray-500 mb-2">
                {isFormulaToName ? 'Hvað heitir þessi jón?' : 'Hver er formúla þessarar jónar?'}
              </div>
              <div className={`text-4xl md:text-5xl font-bold ${categoryColor.text} flex items-center justify-center gap-3`}>
                {isFormulaToName ? (
                  <span className="font-mono">{question}</span>
                ) : (
                  <>
                    <span>{question}</span>
                    <AudioButton text={question} size="medium" />
                  </>
                )}
              </div>
              <div className={`text-xs mt-2 ${categoryColor.text} opacity-70`}>
                Hleðsla: {currentIon.charge}
              </div>
            </div>

            {/* Answer input */}
            {!showAnswer ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && userAnswer && checkAnswer()}
                  placeholder={isFormulaToName ? 'Skrifaðu nafnið...' : 'Skrifaðu formúluna...'}
                  className="w-full text-center text-2xl font-bold p-4 border-2 border-cyan-300 rounded-xl focus:border-cyan-500 focus:outline-none"
                  autoFocus
                />

                {showHint && currentIon.mnemonicIs && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <span className="text-xl">💡</span>
                      <span>{currentIon.mnemonicIs}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  {!showHint && currentIon.mnemonicIs && (
                    <button
                      onClick={() => {
                        setShowHint(true);
                        setTotalHintsUsed(prev => prev + 1);
                      }}
                      className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-bold py-3 px-4 rounded-xl"
                    >
                      💡 Vísbending
                    </button>
                  )}
                  <button
                    onClick={revealAnswer}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl"
                  >
                    Sýna svar
                  </button>
                  <button
                    onClick={checkAnswer}
                    disabled={!userAnswer.trim()}
                    className={`flex-1 font-bold py-3 px-4 rounded-xl ${
                      !userAnswer.trim()
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                    }`}
                  >
                    Athuga
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Result */}
                <div className={`p-6 rounded-xl text-center ${
                  isCorrect ? 'bg-green-100 border-2 border-green-400' : 'bg-red-100 border-2 border-red-400'
                }`}>
                  <div className="text-4xl mb-2">{isCorrect ? '✓' : '✗'}</div>
                  <div className={`text-xl font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Rétt!' : 'Ekki alveg'}
                  </div>
                  {!isCorrect && userAnswer !== '(sleppt)' && (
                    <div className="mt-2 text-red-700">
                      Þú skrifaðir: <strong>{userAnswer}</strong>
                    </div>
                  )}
                  <div className="mt-2 text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                    {isFormulaToName ? (
                      <>
                        {answer}
                        <AudioButton text={answer} size="small" />
                      </>
                    ) : (
                      <span className="font-mono">{answer}</span>
                    )}
                  </div>
                </div>

                {/* Ion info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Formúla:</div>
                      <div className="font-mono font-bold text-lg">{currentIon.formula}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Nafn:</div>
                      <div className="font-bold text-lg">{currentIon.nameIs}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-gray-500">Algengar notanir:</div>
                      <div className="text-gray-700">{currentIon.commonUse}</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={nextIon}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-xl"
                >
                  {currentIndex + 1 < ions.length ? 'Næsta jón →' : 'Sjá niðurstöður →'}
                </button>
              </div>
            )}
          </div>

          {/* Quick reference */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm">Flýtileiðbeiningar:</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-blue-50 p-2 rounded">
                <span className="font-bold text-blue-700">-at:</span> meira súrefni (NO₃⁻, SO₄²⁻)
              </div>
              <div className="bg-purple-50 p-2 rounded">
                <span className="font-bold text-purple-700">-ít:</span> minna súrefni (NO₂⁻, SO₃²⁻)
              </div>
              <div className="bg-red-50 p-2 rounded">
                <span className="font-bold text-red-700">per-:</span> mest súrefni (ClO₄⁻)
              </div>
              <div className="bg-green-50 p-2 rounded">
                <span className="font-bold text-green-700">hýpó-:</span> minnst súrefni (ClO⁻)
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Complete screen
  if (phase === 'complete') {
    const correctCount = sessionResults.filter(r => r.correct).length;
    const accuracy = Math.round((correctCount / sessionResults.length) * 100);
    const incorrectIons = sessionResults.filter(r => !r.correct);

    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
              {accuracy >= 90 ? '🏆' : accuracy >= 70 ? '🎉' : accuracy >= 50 ? '👍' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-cyan-600 mb-2">
              {accuracy >= 90 ? 'Framúrskarandi!' :
               accuracy >= 70 ? 'Vel gert!' :
               accuracy >= 50 ? 'Góð byrjun!' : 'Haltu áfram að æfa!'}
            </h1>
            <p className="text-gray-600">Þú hefur lokið fjölatóma jónaæfingu</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-cyan-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-cyan-600">{score}</div>
              <div className="text-sm text-gray-600">Stig</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{correctCount}/{sessionResults.length}</div>
              <div className="text-sm text-gray-600">Rétt</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{accuracy}%</div>
              <div className="text-sm text-gray-600">Nákvæmni</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-orange-600">{maxStreak}🔥</div>
              <div className="text-sm text-gray-600">Besta röð</div>
            </div>
          </div>

          {/* Incorrect ions for review */}
          {incorrectIons.length > 0 && (
            <div className="bg-red-50 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-red-800 mb-3">Þarfnast æfingar:</h3>
              <div className="grid gap-2 max-h-48 overflow-y-auto">
                {incorrectIons.map((result, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <span className="font-mono font-bold">{result.ion.formula}</span>
                      <span className="mx-2 text-gray-400">→</span>
                      <span className="font-medium">{result.ion.nameIs}</span>
                    </div>
                    <AudioButton text={result.ion.nameIs} size="small" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => {
                setPhase('setup');
              }}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl"
            >
              Æfa aftur
            </button>
            <button
              onClick={() => onComplete(score, questionCount * 10, totalHintsUsed)}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-xl"
            >
              Ljúka stigi →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
