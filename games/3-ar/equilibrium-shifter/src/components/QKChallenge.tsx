/**
 * Numerical Q vs K Challenge Component
 *
 * Students calculate Q from given concentrations, compare to K,
 * and predict the shift direction.
 */

import { useState, useEffect } from 'react';
import { HintSystem } from '@shared/components';
import type { TieredHints } from '@shared/types';
import type { QKProblem } from '../data/qk-problems';

interface QKChallengeProps {
  problem: QKProblem;
  onComplete: (score: number, hintsUsed: number) => void;
  onNext: () => void;
  onBack: () => void;
  problemNumber: number;
  totalProblems: number;
}

export function QKChallenge({
  problem,
  onComplete,
  onNext,
  onBack,
  problemNumber,
  totalProblems,
}: QKChallengeProps) {
  const [qInput, setQInput] = useState('');
  const [selectedDirection, setSelectedDirection] = useState<'left' | 'right' | 'none' | null>(
    null
  );
  const [phase, setPhase] = useState<'calculate' | 'predict' | 'feedback'>('calculate');
  const [isQCorrect, setIsQCorrect] = useState(false);
  const [isDirectionCorrect, setIsDirectionCorrect] = useState(false);
  const [hintMultiplier, setHintMultiplier] = useState(1.0);
  const [hintsUsedTier, setHintsUsedTier] = useState(0);
  const [hintResetKey, setHintResetKey] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  // Reset state when problem changes
  useEffect(() => {
    setQInput('');
    setSelectedDirection(null);
    setPhase('calculate');
    setIsQCorrect(false);
    setIsDirectionCorrect(false);
    setHintMultiplier(1.0);
    setHintsUsedTier(0);
    setHintResetKey((prev) => prev + 1);
    setShowSolution(false);
  }, [problem.id]);

  const { equilibrium, K, Ktype, initialConcentrations, correctQ, correctShift } = problem;

  // Format concentrations for display
  const formatConcentrations = () => {
    return Object.entries(initialConcentrations)
      .map(([species, conc]) => `[${species}] = ${conc} ${Ktype === 'Kp' ? 'atm' : 'M'}`)
      .join(', ');
  };

  // Check Q answer
  const checkQ = () => {
    const userQ = parseFloat(qInput);
    if (isNaN(userQ)) return;

    // Allow 20% tolerance or within 0.001 absolute difference for small numbers
    const relativeError = Math.abs(userQ - correctQ) / correctQ;
    const absoluteError = Math.abs(userQ - correctQ);
    const qCorrect = relativeError <= 0.2 || absoluteError <= 0.001;

    setIsQCorrect(qCorrect);
    setPhase('predict');
  };

  // Check direction prediction
  const checkDirection = () => {
    if (!selectedDirection) return;

    const dirCorrect = selectedDirection === correctShift;
    setIsDirectionCorrect(dirCorrect);
    setPhase('feedback');

    // Calculate score
    let score = 0;
    if (isQCorrect) score += 50;
    if (dirCorrect) score += 50;
    score = Math.round(score * hintMultiplier);

    onComplete(score, hintsUsedTier);
  };

  // Build hints
  const getHints = (): TieredHints => ({
    topic: problem.hints.topic,
    strategy: problem.hints.strategy,
    method: problem.hints.method,
    solution: problem.hints.solution,
  });

  // Handle hint usage
  const handleHintUsed = (tier: 1 | 2 | 3 | 4) => {
    setHintsUsedTier(tier);
  };

  // Format scientific notation
  const formatScientific = (num: number): string => {
    if (num >= 0.001 && num < 1000) {
      return num.toPrecision(3);
    }
    return num.toExponential(2);
  };

  // Get Q expression string
  const getQExpression = (): string => {
    const numParts: string[] = [];
    const denParts: string[] = [];

    for (const product of equilibrium.products) {
      if (product.phase === 'g' || product.phase === 'aq') {
        if (product.coefficient === 1) {
          numParts.push(`[${product.formula}]`);
        } else {
          numParts.push(`[${product.formula}]^${product.coefficient}`);
        }
      }
    }

    for (const reactant of equilibrium.reactants) {
      if (reactant.phase === 'g' || reactant.phase === 'aq') {
        if (reactant.coefficient === 1) {
          denParts.push(`[${reactant.formula}]`);
        } else {
          denParts.push(`[${reactant.formula}]^${reactant.coefficient}`);
        }
      }
    }

    const numerator = numParts.join(' × ') || '1';
    const denominator = denParts.join(' × ') || '1';

    return `Q = ${numerator} / ${denominator}`;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← Til baka
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {problemNumber} / {totalProblems}
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                problem.difficulty === 'beginner'
                  ? 'bg-green-100 text-green-700'
                  : problem.difficulty === 'intermediate'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
              }`}
            >
              {problem.difficulty === 'beginner'
                ? 'Byrjandi'
                : problem.difficulty === 'intermediate'
                  ? 'Miðstig'
                  : 'Framhaldstig'}
            </div>
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-bold mt-2 text-indigo-800">
          Q vs K: Reikna hvarfkvóta
        </h1>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <div
            className="h-2 rounded-full transition-all duration-300 bg-indigo-500"
            style={{ width: `${(problemNumber / totalProblems) * 100}%` }}
          />
        </div>
      </div>

      {/* Problem Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
        {/* Equilibrium Equation */}
        <div className="text-center mb-4">
          <div className="text-2xl font-mono font-bold text-gray-800">{equilibrium.equation}</div>
          <div className="text-sm text-gray-500 mt-1">{equilibrium.nameIs}</div>
        </div>

        {/* Given Information */}
        <div className="bg-indigo-50 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-indigo-800 mb-2">Gefnar upplýsingar:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">{Ktype}:</span>{' '}
              <span className="font-mono font-bold">{formatScientific(K)}</span>
            </div>
            <div>
              <span className="text-gray-600">Hitastig:</span>{' '}
              <span className="font-mono">sjá lýsingu</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-gray-600">Upphafsþéttni:</span>
            <div className="font-mono text-sm mt-1 bg-white rounded p-2">
              {formatConcentrations()}
            </div>
          </div>
        </div>

        {/* Q Expression Reference */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4 text-center">
          <span className="text-sm text-gray-600">Q tjáning: </span>
          <span className="font-mono text-gray-800">{getQExpression()}</span>
        </div>

        {/* Question */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{problem.questionIs}</h2>

        {/* Hints */}
        <div className="mb-4">
          <HintSystem
            hints={getHints()}
            basePoints={100}
            onHintUsed={handleHintUsed}
            onPointsChange={setHintMultiplier}
            disabled={phase === 'feedback'}
            resetKey={hintResetKey}
          />
        </div>

        {/* Phase 1: Calculate Q */}
        {phase === 'calculate' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reiknaðu Q (hvarfkvóta):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={qInput}
                  onChange={(e) => setQInput(e.target.value)}
                  placeholder="t.d. 0.025 eða 2.5e-3"
                  className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none font-mono"
                />
                <button
                  onClick={checkQ}
                  disabled={!qInput}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Athuga
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Predict Direction */}
        {phase === 'predict' && (
          <div className="space-y-4">
            {/* Q Result */}
            <div
              className={`p-4 rounded-lg ${isQCorrect ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
            >
              <p className="font-semibold">
                {isQCorrect
                  ? '✓ Q útreikningur réttur!'
                  : `✗ Q útreikningur ónákvæmur. Rétt Q = ${formatScientific(correctQ)}`}
              </p>
              <p className="text-sm mt-1">
                Þitt svar: Q = {qInput} | Rétt: Q = {formatScientific(correctQ)}
              </p>
            </div>

            {/* Direction Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Q = {formatScientific(correctQ)}, K = {formatScientific(K)}. Í hvaða átt hliðrast
                hvarfið?
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedDirection('left')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedDirection === 'left'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">←</div>
                  <div className="font-medium">Til vinstri</div>
                  <div className="text-xs text-gray-500">Q &gt; K</div>
                </button>
                <button
                  onClick={() => setSelectedDirection('none')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedDirection === 'none'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">⇌</div>
                  <div className="font-medium">Jafnvægi</div>
                  <div className="text-xs text-gray-500">Q ≈ K</div>
                </button>
                <button
                  onClick={() => setSelectedDirection('right')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedDirection === 'right'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">→</div>
                  <div className="font-medium">Til hægri</div>
                  <div className="text-xs text-gray-500">Q &lt; K</div>
                </button>
              </div>
              <button
                onClick={checkDirection}
                disabled={!selectedDirection}
                className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Staðfesta
              </button>
            </div>
          </div>
        )}

        {/* Phase 3: Feedback */}
        {phase === 'feedback' && (
          <div className="space-y-4">
            {/* Results */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-lg ${isQCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              >
                <div className="font-semibold">{isQCorrect ? '✓ Q réttur' : '✗ Q rangur'}</div>
                <div className="text-sm">
                  Q = {formatScientific(correctQ)} ({Ktype === 'Kp' ? 'atm' : 'M'})
                </div>
              </div>
              <div
                className={`p-4 rounded-lg ${isDirectionCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              >
                <div className="font-semibold">
                  {isDirectionCorrect ? '✓ Stefna rétt' : '✗ Stefna röng'}
                </div>
                <div className="text-sm">
                  Rétt:{' '}
                  {correctShift === 'left'
                    ? 'Til vinstri ←'
                    : correctShift === 'right'
                      ? 'Til hægri →'
                      : 'Jafnvægi ⇌'}
                </div>
              </div>
            </div>

            {/* Score */}
            <div className="text-center py-4">
              <div className="text-3xl font-bold text-indigo-600">
                +{Math.round((isQCorrect ? 50 : 0 + (isDirectionCorrect ? 50 : 0)) * hintMultiplier)}{' '}
                stig
              </div>
              {hintMultiplier < 1 && (
                <div className="text-sm text-gray-500">
                  (vísbendingar notuð: ×{hintMultiplier.toFixed(1)})
                </div>
              )}
            </div>

            {/* Show Solution */}
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-indigo-600 hover:text-indigo-800 text-sm"
            >
              {showSolution ? '▼ Fela lausn' : '▶ Sýna lausn'}
            </button>

            {showSolution && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-800 mb-2">Lausn:</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>1.</strong> {problem.hints.method}
                  </p>
                  <p>
                    <strong>2.</strong> Ber saman: Q = {formatScientific(correctQ)}{' '}
                    {correctQ < K ? '<' : correctQ > K ? '>' : '≈'} K = {formatScientific(K)}
                  </p>
                  <p>
                    <strong>3.</strong> {problem.hints.solution}
                  </p>
                </div>
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={onNext}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
            >
              {problemNumber < totalProblems ? 'Næsta verkefni →' : 'Ljúka þrepi →'}
            </button>
          </div>
        )}
      </div>

      {/* Q vs K Reference Card */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-2">📐 Q vs K Samanburður</h3>
        <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
          <p>
            <strong>Q &lt; K:</strong> Hvarf hliðrast til hægri → (mynda meira af afurðum)
          </p>
          <p>
            <strong>Q &gt; K:</strong> Hvarf hliðrast til vinstri ← (mynda meira af hvarfefnum)
          </p>
          <p>
            <strong>Q = K:</strong> Kerfið er í jafnvægi ⇌ (engin nettó breyting)
          </p>
        </div>
      </div>
    </div>
  );
}
