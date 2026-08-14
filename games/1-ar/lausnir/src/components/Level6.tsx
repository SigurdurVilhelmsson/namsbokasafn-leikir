import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  StoichiometryProblem,
  getStoichiometryProblemsForGame,
} from '../data/stoichiometryProblems';

interface Level6Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

type Difficulty = 'easy' | 'medium' | 'hard';
type GamePhase = 'menu' | 'play' | 'results';

// Reaction visualization component
function ReactionVisualization({
  problem,
  showProducts,
}: {
  problem: StoichiometryProblem;
  showProducts: boolean;
}) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
      <div className="text-center mb-3">
        <div className="font-mono text-lg font-bold text-gray-800">
          {problem.equationBalanced}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        {/* Reactant 1 */}
        <div className="text-center">
          <div className="w-16 h-20 mx-auto relative">
            <svg viewBox="0 0 60 80" className="w-full h-full">
              {/* Flask */}
              <path
                d="M20 10 L20 30 L10 70 Q10 75 15 75 L45 75 Q50 75 50 70 L40 30 L40 10"
                fill="#bfdbfe"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <rect x="18" y="5" width="24" height="10" fill="#6b7280" rx="2" />
              {/* Liquid */}
              <path
                d="M12 60 Q12 73 17 73 L43 73 Q48 73 48 60 L48 45 L12 45 Z"
                fill={problem.type === 'precipitation' ? '#93c5fd' : '#fca5a5'}
                opacity="0.7"
              />
            </svg>
          </div>
          <div className="text-sm font-bold">{problem.reactant1.formula}</div>
          <div className="text-xs text-gray-600">
            {problem.reactant1.molarity && `${problem.reactant1.molarity} M`}
            {problem.reactant1.volume && `, ${problem.reactant1.volume} mL`}
            {problem.reactant1.mass && `${problem.reactant1.mass} g`}
          </div>
        </div>

        <div className="text-2xl text-gray-400">+</div>

        {/* Reactant 2 */}
        <div className="text-center">
          <div className="w-16 h-20 mx-auto relative">
            <svg viewBox="0 0 60 80" className="w-full h-full">
              <path
                d="M20 10 L20 30 L10 70 Q10 75 15 75 L45 75 Q50 75 50 70 L40 30 L40 10"
                fill="#fef3c7"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <rect x="18" y="5" width="24" height="10" fill="#6b7280" rx="2" />
              <path
                d="M12 60 Q12 73 17 73 L43 73 Q48 73 48 60 L48 45 L12 45 Z"
                fill={problem.reactant2.isExcess ? '#fde68a' : '#a7f3d0'}
                opacity="0.7"
              />
            </svg>
          </div>
          <div className="text-sm font-bold">{problem.reactant2.formula}</div>
          <div className="text-xs text-gray-600">
            {problem.reactant2.isExcess
              ? 'umframmagn'
              : problem.reactant2.molarity && problem.reactant2.volume
              ? `${problem.reactant2.molarity} M, ${problem.reactant2.volume} mL`
              : problem.reactant2.molarity
              ? `${problem.reactant2.molarity} M`
              : ''}
          </div>
        </div>

        <div className="text-2xl text-gray-400">→</div>

        {/* Product */}
        {problem.product && (
          <div className="text-center">
            <div className="w-16 h-20 mx-auto relative">
              <svg viewBox="0 0 60 80" className="w-full h-full">
                <path
                  d="M20 10 L20 30 L10 70 Q10 75 15 75 L45 75 Q50 75 50 70 L40 30 L40 10"
                  fill="#e0e7ff"
                  stroke="#6366f1"
                  strokeWidth="2"
                />
                <rect x="18" y="5" width="24" height="10" fill="#6b7280" rx="2" />
                {/* Precipitate */}
                {showProducts && (
                  <>
                    <ellipse
                      cx="30"
                      cy="70"
                      rx="15"
                      ry="5"
                      fill="#6366f1"
                      opacity="0.8"
                      className="animate-pulse"
                    />
                    <path
                      d="M12 55 Q12 73 17 73 L43 73 Q48 73 48 55 L48 45 L12 45 Z"
                      fill="#c7d2fe"
                      opacity="0.5"
                    />
                  </>
                )}
              </svg>
            </div>
            <div className="text-sm font-bold">{problem.product.formula}</div>
            <div className="text-xs text-gray-600">
              {problem.product.molarMass} g/mol
            </div>
          </div>
        )}

        {!problem.product && (
          <div className="text-center">
            <div className="w-16 h-20 mx-auto flex items-center justify-center">
              <span className="text-4xl">💧</span>
            </div>
            <div className="text-sm font-bold">H₂O</div>
            <div className="text-xs text-gray-600">+ salt</div>
          </div>
        )}
      </div>
    </div>
  );
}

// Step-by-step solution display
function SolutionSteps({ problem }: { problem: StoichiometryProblem }) {
  return (
    <div className="bg-blue-50 rounded-xl p-4">
      <h4 className="font-bold text-blue-800 mb-3">Lausn skref fyrir skref:</h4>
      <div className="space-y-3">
        {problem.steps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg p-3">
            <div className="text-sm font-semibold text-blue-700">{step.step}</div>
            <div className="text-xs text-gray-500 mb-1">{step.stepEn}</div>
            {step.calculation && (
              <div className="font-mono text-sm bg-gray-50 p-2 rounded mt-1">
                {step.calculation}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Formula reference card
function FormulaReference() {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
      <h4 className="font-bold text-purple-800 mb-3">Formúlur / Formulas</h4>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-white p-2 rounded-lg">
          <div className="font-mono font-bold text-purple-700">n = M × V</div>
          <div className="text-xs text-gray-600">mól = mólstyrkur × rúmmál (L)</div>
        </div>
        <div className="bg-white p-2 rounded-lg">
          <div className="font-mono font-bold text-purple-700">n = m / M</div>
          <div className="text-xs text-gray-600">mól = massi / mólmassi</div>
        </div>
        <div className="bg-white p-2 rounded-lg">
          <div className="font-mono font-bold text-purple-700">m = n × M</div>
          <div className="text-xs text-gray-600">massi = mól × mólmassi</div>
        </div>
        <div className="bg-white p-2 rounded-lg">
          <div className="font-mono font-bold text-purple-700">V = n / M</div>
          <div className="text-xs text-gray-600">rúmmál (L) = mól / mólstyrkur</div>
        </div>
      </div>
      <div className="mt-3 bg-yellow-50 p-2 rounded-lg text-xs">
        <span className="font-bold">Mikilvægt:</span> Mundu að breyta mL → L (deila með 1000)
      </div>
    </div>
  );
}

export function Level6({
  onComplete,
  onBack,
  onCorrectAnswer,
  onIncorrectAnswer,
}: Level6Props) {
  const [phase, setPhase] = useState<GamePhase>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showFormulas, setShowFormulas] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Get problems based on difficulty
  const problems = useMemo(() => {
    const allProblems = getStoichiometryProblemsForGame(12);
    if (difficulty === 'easy') {
      return allProblems.filter((p) => p.difficulty === 'easy').slice(0, 8);
    } else if (difficulty === 'medium') {
      return allProblems
        .filter((p) => p.difficulty === 'easy' || p.difficulty === 'medium')
        .slice(0, 10);
    }
    return allProblems;
  }, [difficulty]);

  const currentProblem = problems[currentIndex];
  const isLastQuestion = currentIndex >= problems.length - 1;
  const maxScore = problems.length * 100;

  // Focus input when problem changes
  useEffect(() => {
    if (phase === 'play' && !showResult && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, showResult, currentIndex]);

  const checkAnswer = useCallback(() => {
    if (!userAnswer.trim() || !currentProblem) return;

    const userValue = parseFloat(userAnswer.replace(',', '.'));

    if (isNaN(userValue)) {
      setInputError('Vinsamlegast sláðu inn tölu');
      return;
    }

    // Check if answer is within tolerance
    const diff = Math.abs(userValue - currentProblem.answer);
    const correct = diff <= currentProblem.tolerance;

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const hintPenalty = hintLevel * 15;
      const points = Math.max(10, 100 - hintPenalty);
      setScore((prev) => prev + points);
      setCorrectAnswers((prev) => prev + 1);
      onCorrectAnswer();
    } else {
      onIncorrectAnswer();
    }
  }, [userAnswer, currentProblem, hintLevel, onCorrectAnswer, onIncorrectAnswer]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !showResult && userAnswer.trim()) {
        checkAnswer();
      }
    },
    [showResult, userAnswer, checkAnswer]
  );

  const handleNext = () => {
    if (isLastQuestion) {
      setPhase('results');
    } else {
      setCurrentIndex((prev) => prev + 1);
      setShowResult(false);
      setUserAnswer('');
      setHintLevel(0);
      setInputError(null);
    }
  };

  const showNextHint = () => {
    if (hintLevel < currentProblem.hints.length) {
      setHintLevel((prev) => prev + 1);
      setHintsUsed((prev) => prev + 1);
    }
  };

  const startGame = (diff: Difficulty) => {
    setDifficulty(diff);
    setPhase('play');
    setCurrentIndex(0);
    setScore(0);
    setHintsUsed(0);
    setCorrectAnswers(0);
    setShowResult(false);
    setUserAnswer('');
    setHintLevel(0);
  };

  // Menu phase
  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
              ← Til baka
            </button>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-2">
            Stig 6: Stökefnafræði lausna
          </h1>
          <p className="text-center text-gray-600 mb-6">Solution Stoichiometry</p>

          <div className="bg-indigo-50 p-4 rounded-xl mb-6">
            <h3 className="font-semibold text-indigo-800 mb-2">
              Hvað eru stökefnafræðilegir útreikningar?
            </h3>
            <p className="text-sm text-indigo-700 mb-3">
              Þú notar jöfnustöðull og mólreikning til að finna hversu mikið af
              hvarfefnum eða afurðum þarf eða myndast í efnahvarfi.
            </p>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• <strong>Hlutleysing:</strong> Hversu mikið af NaOH þarf til að hlutleysa HCl?</li>
              <li>• <strong>Útfelling:</strong> Hversu mikið fellur út?</li>
              <li>• <strong>Massi/rúmmál:</strong> Tengja massa og rúmmál lausna</li>
            </ul>
          </div>

          <div className="text-center mb-4">
            <p className="text-lg text-gray-700">Veldu erfiðleikastig:</p>
          </div>

          <div className="grid gap-4">
            <button
              onClick={() => startGame('easy')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-6 rounded-xl transition-colors"
            >
              <div className="text-2xl mb-2">😊</div>
              <div className="text-xl">Auðvelt</div>
              <div className="text-sm opacity-90 mt-2">
                8 spurningar - 1:1 hlutföll, einföld hlutleysing
              </div>
            </button>

            <button
              onClick={() => startGame('medium')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-6 px-6 rounded-xl transition-colors"
            >
              <div className="text-2xl mb-2">🤔</div>
              <div className="text-xl">Miðlungs</div>
              <div className="text-sm opacity-90 mt-2">
                10 spurningar - Útfellingar, flóknari hlutföll
              </div>
            </button>

            <button
              onClick={() => startGame('hard')}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-6 px-6 rounded-xl transition-colors"
            >
              <div className="text-2xl mb-2">😰</div>
              <div className="text-xl">Erfitt</div>
              <div className="text-sm opacity-90 mt-2">
                12 spurningar - Takmörkunarefni, massi-rúmmál
              </div>
            </button>
          </div>

          <FormulaReference />
        </div>
      </div>
    );
  }

  // Results phase
  if (phase === 'results') {
    const accuracy = Math.round((correctAnswers / problems.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Til hamingju!
          </h1>

          <div className="text-center mb-6">
            <div className="text-6xl mb-2">
              {accuracy >= 80 ? '🏆' : accuracy >= 60 ? '⭐' : '💪'}
            </div>
            <div className="text-4xl font-bold text-indigo-600">{score} stig</div>
            <div className="text-gray-600">af {maxScore} mögulegum</div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div className="bg-green-50 p-3 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-xs text-gray-600">Rétt</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{accuracy}%</div>
              <div className="text-xs text-gray-600">Nákvæmni</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-xl">
              <div className="text-2xl font-bold text-yellow-600">{hintsUsed}</div>
              <div className="text-xs text-gray-600">Ábendingar</div>
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-xl mb-6">
            <h3 className="font-bold text-indigo-800 mb-2">Hvað lærðir þú?</h3>
            <ul className="text-sm text-indigo-900 space-y-1">
              <li>✓ n = M × V tengir mól við styrk og rúmmál</li>
              <li>✓ Jöfnustuðlar segja þér hlutföll milli efna</li>
              <li>✓ Takmörkunarefni ákvarðar hversu mikið myndast</li>
              <li>✓ m = n × M tengir mól við massa</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              Til baka
            </button>
            <button
              onClick={() => onComplete(score, maxScore, hintsUsed)}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              Ljuka Stigi 6
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Play phase
  if (!currentProblem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <span>←</span> Til baka
            </button>
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-bold text-indigo-700">
                Stig 6: Stökefnafræði lausna
              </h1>
              <p className="text-sm text-gray-600">Solution Stoichiometry</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-indigo-600">{score} stig</div>
              <div className="text-xs text-gray-500">
                {currentIndex + 1} / {problems.length}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(currentIndex / problems.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Visualization and equation */}
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
            <ReactionVisualization
              problem={currentProblem}
              showProducts={showResult}
            />

            <button
              onClick={() => setShowFormulas(!showFormulas)}
              className="w-full text-sm text-indigo-600 hover:text-indigo-700 py-2"
            >
              {showFormulas ? '▲ Fela formúlur' : '▼ Sýna formúlur'}
            </button>

            {showFormulas && <FormulaReference />}
          </div>

          {/* Question and answer */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {/* Difficulty badge */}
            <div
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                currentProblem.difficulty === 'easy'
                  ? 'bg-green-100 text-green-700'
                  : currentProblem.difficulty === 'medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {currentProblem.difficulty === 'easy'
                ? 'Auðvelt'
                : currentProblem.difficulty === 'medium'
                ? 'Miðlungs'
                : 'Erfitt'}
            </div>

            {/* Question */}
            <div className="bg-indigo-50 p-4 rounded-xl mb-4">
              <p className="text-lg font-medium text-gray-800 mb-2">
                {currentProblem.question}
              </p>
              <p className="text-sm text-gray-600">{currentProblem.questionEn}</p>
            </div>

            {/* Hints */}
            {hintLevel > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Ábendingar ({hintLevel}/{currentProblem.hints.length}):
                </h4>
                <ul className="space-y-1 text-sm text-yellow-900">
                  {currentProblem.hints.slice(0, hintLevel).map((hint, i) => (
                    <li key={i}>• {hint}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Answer input */}
            {!showResult ? (
              <div className="space-y-4">
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Svar:
                    </label>
                    <input
                      ref={inputRef}
                      type="number"
                      inputMode="decimal"
                      step="any"
                      value={userAnswer}
                      onChange={(e) => {
                        setUserAnswer(e.target.value);
                        setInputError(null);
                      }}
                      onKeyPress={handleKeyPress}
                      placeholder="0.000"
                      className={`w-full p-3 text-xl border-2 rounded-lg focus:outline-none text-center font-bold ${
                        inputError ? 'border-red-500' : 'border-indigo-400'
                      }`}
                      autoFocus
                    />
                    {inputError && (
                      <div className="text-red-500 text-sm mt-1">{inputError}</div>
                    )}
                  </div>
                  <div className="text-xl font-bold text-gray-600 pb-3">
                    {currentProblem.unit}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                  {hintLevel < currentProblem.hints.length && (
                    <button
                      onClick={showNextHint}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      💡 Ábending {hintLevel + 1} (-15 stig)
                    </button>
                  )}
                  <button
                    onClick={checkAnswer}
                    disabled={!userAnswer.trim()}
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Athuga ✓
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Result feedback */}
                <div
                  className={`p-4 rounded-xl ${
                    isCorrect ? 'bg-green-100 border-2 border-green-400' : 'bg-red-100 border-2 border-red-400'
                  }`}
                >
                  <div className="text-center mb-2">
                    <span className="text-4xl">{isCorrect ? '✅' : '❌'}</span>
                    <div
                      className={`text-2xl font-bold ${
                        isCorrect ? 'text-green-700' : 'text-red-700'
                      }`}
                    >
                      {isCorrect ? 'Rétt!' : 'Rangt'}
                    </div>
                  </div>
                  <div className="text-center text-gray-700">
                    Rétt svar:{' '}
                    <span className="font-bold">
                      {currentProblem.answer.toFixed(3)} {currentProblem.unit}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="text-center text-sm text-gray-600 mt-1">
                      Þitt svar: {userAnswer} {currentProblem.unit}
                    </div>
                  )}
                </div>

                {/* Solution steps */}
                <SolutionSteps problem={currentProblem} />

                {/* Next button */}
                <button
                  onClick={handleNext}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl transition-colors"
                >
                  {isLastQuestion ? 'Sjá niðurstöður' : 'Næsta spurning'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Keyboard shortcuts */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            ⌨️ Flýtilyklar: <strong>Enter</strong>=athuga
          </p>
        </div>
      </div>
    </div>
  );
}

export default Level6;
