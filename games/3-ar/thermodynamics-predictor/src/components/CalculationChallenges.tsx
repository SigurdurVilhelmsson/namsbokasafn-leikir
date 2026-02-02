/**
 * CalculationChallenges - Entropy and ΔG-K calculation problems
 *
 * D1: Standard entropy calculations (ΔS° from S° values)
 * D2: ΔG-K connection (K from ΔG° and vice versa)
 */

import { useState, useEffect, useRef } from 'react';
import { ENTROPY_PROBLEMS, STANDARD_ENTROPY, EntropyProblem } from '../data/standard-entropy';

type ChallengeType = 'entropy' | 'delta-g-k' | 'mixed';

interface CalculationChallengesProps {
  challengeType: ChallengeType;
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

export function CalculationChallenges({
  challengeType,
  onComplete,
  onBack,
  onCorrectAnswer,
  onIncorrectAnswer
}: CalculationChallengesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const hintsUsed = useRef(0);
  const completed = useRef(0);
  const levelCompleteReported = useRef(false);

  // Filter problems based on challenge type
  const problems = ENTROPY_PROBLEMS.filter(p => {
    if (challengeType === 'entropy') {
      return p.type === 'calculate-delta-s' || p.type === 'calculate-delta-s-from-delta-g';
    }
    if (challengeType === 'delta-g-k') {
      return p.type === 'calculate-k' || p.type === 'calculate-delta-g-from-k';
    }
    return true; // mixed
  });

  const totalProblems = Math.min(6, problems.length);
  const maxScore = totalProblems * 20;
  const problem = problems[currentIndex];

  // Check completion
  useEffect(() => {
    if (completed.current >= totalProblems && !levelCompleteReported.current) {
      levelCompleteReported.current = true;
      onComplete(score, maxScore);
    }
  }, [score, totalProblems, maxScore, onComplete]);

  const parseAnswer = (input: string): number | null => {
    // Handle scientific notation
    const cleaned = input
      .replace(/\s/g, '')
      .replace(/×/g, 'x')
      .replace(/\^/g, '')
      .replace(/10/g, 'e')
      .replace(/x/gi, 'e')
      .replace(/ee/g, 'e')
      .replace(',', '.');

    const num = parseFloat(cleaned);
    if (isNaN(num)) {
      const direct = parseFloat(input.replace(',', '.'));
      return isNaN(direct) ? null : direct;
    }
    return num;
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const numericAnswer = parseAnswer(userAnswer);
    if (numericAnswer === null) return;

    const relativeError = Math.abs(numericAnswer - problem.correctAnswer) / Math.abs(problem.correctAnswer);
    const correct = relativeError <= problem.tolerance;

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const points = showHint ? 10 : 20;
      setScore(prev => prev + points);
      onCorrectAnswer?.();
    } else {
      onIncorrectAnswer?.();
    }
  };

  const handleShowHint = () => {
    if (!showHint) {
      setShowHint(true);
      hintsUsed.current += 1;
    }
  };

  const handleNext = () => {
    completed.current += 1;
    setShowResult(false);
    setShowHint(false);
    setShowSolution(false);
    setUserAnswer('');
    setIsCorrect(false);

    if (currentIndex < problems.length - 1 && completed.current < totalProblems) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showResult) {
      handleSubmit();
    }
  };

  const formatAnswer = (value: number): string => {
    if (Math.abs(value) < 0.001 || Math.abs(value) > 10000) {
      return value.toExponential(2);
    }
    return value.toFixed(2);
  };

  const getProblemTypeLabel = (type: EntropyProblem['type']): string => {
    switch (type) {
      case 'calculate-delta-s': return 'Reikna ΔS°';
      case 'calculate-delta-s-from-delta-g': return 'ΔS úr ΔG';
      case 'calculate-k': return 'Reikna K';
      case 'calculate-delta-g-from-k': return 'ΔG° úr K';
      default: return type;
    }
  };

  const getProblemTypeColor = (type: EntropyProblem['type']): string => {
    switch (type) {
      case 'calculate-delta-s': return 'bg-purple-500';
      case 'calculate-delta-s-from-delta-g': return 'bg-blue-500';
      case 'calculate-k': return 'bg-green-500';
      case 'calculate-delta-g-from-k': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getChallengeTitle = (): string => {
    switch (challengeType) {
      case 'entropy': return 'Óreiðuútreikningar (ΔS°)';
      case 'delta-g-k': return 'ΔG° og K Tenging';
      case 'mixed': return 'Varmafræðilegir útreikningar';
      default: return 'Útreikningar';
    }
  };

  if (!problem) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <button
              onClick={onBack}
              className="px-4 py-2 border-2 border-purple-500 text-purple-500 rounded-lg font-medium hover:bg-purple-50"
            >
              ← Til baka
            </button>

            <h1 className="text-xl font-bold text-purple-600">
              📐 {getChallengeTitle()}
            </h1>

            <div className="flex gap-4 items-center">
              <div className="text-center">
                <div className="text-sm text-gray-600">Spurning</div>
                <div className="text-xl font-bold">{completed.current + 1} / {totalProblems}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Stig</div>
                <div className="text-xl font-bold text-purple-600">{score}</div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completed.current / totalProblems) * 100}%` }}
            />
          </div>
        </div>

        {/* Problem card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <div className="flex items-start gap-3 mb-4">
            <span className={`${getProblemTypeColor(problem.type)} text-white text-xs font-bold px-3 py-1 rounded-full`}>
              {getProblemTypeLabel(problem.type)}
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              problem.difficulty === 'Auðvelt' ? 'bg-green-100 text-green-700' :
              problem.difficulty === 'Miðlungs' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {problem.difficulty}
            </span>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-2">{problem.nameIs}</h2>

          <div className="bg-gray-50 p-4 rounded-lg mb-4 font-mono text-lg">
            {problem.reaction}
          </div>

          {/* Given data */}
          <div className="bg-purple-50 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-purple-800 mb-2">Gefin gögn:</h3>

            {/* Standard entropy values */}
            {problem.type === 'calculate-delta-s' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-purple-700 mb-1">Hvarfefni:</h4>
                  {problem.reactants?.map((r, i) => (
                    <div key={i} className="text-sm">
                      S°({r.formula}) = {r.entropy} J/(mol·K)
                      {r.coefficient > 1 && ` × ${r.coefficient}`}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700 mb-1">Myndefni:</h4>
                  {problem.products?.map((p, i) => (
                    <div key={i} className="text-sm">
                      S°({p.formula}) = {p.entropy} J/(mol·K)
                      {p.coefficient > 1 && ` × ${p.coefficient}`}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ΔH and ΔG for entropy from Gibbs */}
            {problem.type === 'calculate-delta-s-from-delta-g' && (
              <div className="text-sm space-y-1">
                <div>ΔH° = {problem.deltaH} kJ/mol</div>
                <div>ΔG° = {problem.deltaG} kJ/mol</div>
                <div>T = {problem.temperature} K</div>
              </div>
            )}

            {/* ΔG for K calculation */}
            {problem.type === 'calculate-k' && (
              <div className="text-sm space-y-1">
                <div>ΔG° = {problem.deltaGStandard} kJ/mol</div>
                <div>T = {problem.temperature} K</div>
                <div>R = 8.314 J/(mol·K)</div>
              </div>
            )}

            {/* K for ΔG calculation */}
            {problem.type === 'calculate-delta-g-from-k' && (
              <div className="text-sm space-y-1">
                <div>K = {problem.K?.toExponential(2)}</div>
                <div>T = {problem.temperature} K</div>
                <div>R = 8.314 J/(mol·K)</div>
              </div>
            )}
          </div>

          {/* Formula reference */}
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-blue-800 mb-2">Formúlur:</h3>
            <div className="text-sm font-mono space-y-1">
              {(problem.type === 'calculate-delta-s') && (
                <div>ΔS° = Σ S°(myndefni) - Σ S°(hvarfefni)</div>
              )}
              {(problem.type === 'calculate-delta-s-from-delta-g') && (
                <>
                  <div>ΔG° = ΔH° - TΔS°</div>
                  <div>ΔS° = (ΔH° - ΔG°) / T</div>
                </>
              )}
              {(problem.type === 'calculate-k' || problem.type === 'calculate-delta-g-from-k') && (
                <>
                  <div>ΔG° = -RT ln K</div>
                  <div>K = e^(-ΔG°/RT)</div>
                </>
              )}
            </div>
          </div>

          {/* Answer input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Svarið þitt ({problem.answerUnit || 'einingarlaust'}):
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={showResult}
                placeholder={
                  problem.type === 'calculate-k' ? 'T.d. 6.0e5 eða 600000' :
                  problem.type === 'calculate-delta-g-from-k' ? 'T.d. 27.1' :
                  'T.d. -198.7'
                }
                className={`flex-1 px-4 py-3 border-2 rounded-xl text-lg font-mono ${
                  showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                }`}
              />
              {problem.answerUnit && (
                <span className="flex items-center px-4 py-3 bg-gray-100 rounded-xl font-semibold text-gray-700">
                  {problem.answerUnit}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Skekkjumörk: ±{(problem.tolerance * 100).toFixed(0)}%
            </p>
          </div>

          {/* Hint */}
          {!showResult && (
            <div className="mb-4">
              {showHint ? (
                <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4">
                  <div className="font-bold text-yellow-800 mb-1">💡 Vísbending:</div>
                  <p className="text-yellow-900">{problem.hintIs}</p>
                </div>
              ) : (
                <button
                  onClick={handleShowHint}
                  className="text-yellow-600 hover:text-yellow-800 text-sm flex items-center gap-2"
                >
                  💡 Sýna vísbendingu (-10 stig)
                </button>
              )}
            </div>
          )}

          {/* Submit button */}
          {!showResult && (
            <button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className={`w-full px-6 py-3 rounded-xl font-bold transition-colors ${
                userAnswer.trim()
                  ? 'bg-purple-500 hover:bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Athuga svar
            </button>
          )}

          {/* Result feedback */}
          {showResult && (
            <div className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-300' : 'bg-red-50 border border-red-300'}`}>
              <div className={`font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '✓ Rétt!' : '✗ Rangt'}
                {isCorrect && showHint && ' (10 stig)'}
                {isCorrect && !showHint && ' (+20 stig)'}
              </div>

              <div className="text-sm mb-2">
                <span className="font-semibold">Þitt svar:</span> {userAnswer} {problem.answerUnit}
                <br />
                <span className="font-semibold">Rétt svar:</span> {formatAnswer(problem.correctAnswer)} {problem.answerUnit}
              </div>

              <p className={`text-sm ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                {problem.explanationIs}
              </p>

              {/* Show solution button */}
              {!showSolution && (
                <button
                  onClick={() => setShowSolution(true)}
                  className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-semibold"
                >
                  📝 Sýna útreikningsgang
                </button>
              )}

              {/* Solution steps */}
              {showSolution && (
                <div className="mt-3 bg-white rounded-lg p-3 border border-gray-200">
                  <h4 className="font-bold text-gray-700 mb-2">Lausn:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm font-mono text-gray-800">
                    {problem.solutionStepsIs.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              <button
                onClick={handleNext}
                className="mt-4 w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-bold"
              >
                {completed.current < totalProblems - 1 ? 'Næsta spurning →' : 'Ljúka →'}
              </button>
            </div>
          )}
        </div>

        {/* Reference tables */}
        {challengeType === 'entropy' && problem.type === 'calculate-delta-s' && (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-bold text-gray-700 mb-3">📋 Staðlað Óreiðugildi (S°) Uppfletting</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              {STANDARD_ENTROPY.slice(0, 15).map((entry, i) => (
                <div key={i} className="bg-gray-50 p-2 rounded">
                  <span className="font-mono">{entry.formula}</span>
                  <span className="text-gray-600 ml-2">{entry.entropy}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {challengeType === 'delta-g-k' && (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-bold text-gray-700 mb-3">📋 ΔG° og K Tenging</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-3">
                <h4 className="font-semibold text-green-800 mb-2">Ef ΔG° &lt; 0</h4>
                <ul className="text-sm text-green-900 space-y-1">
                  <li>• K &gt; 1</li>
                  <li>• Hvarf hliðrast til hægri</li>
                  <li>• Myndefni ríkjandi við jafnvægi</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <h4 className="font-semibold text-red-800 mb-2">Ef ΔG° &gt; 0</h4>
                <ul className="text-sm text-red-900 space-y-1">
                  <li>• K &lt; 1</li>
                  <li>• Hvarf hliðrast til vinstri</li>
                  <li>• Hvarfefni ríkjandi við jafnvægi</li>
                </ul>
              </div>
            </div>
            <div className="mt-3 bg-purple-50 p-3 rounded-lg">
              <div className="font-mono text-sm text-center">
                <p>ΔG° = -RT ln K</p>
                <p className="text-gray-600 mt-1">R = 8.314 J/(mol·K) | Mundu: ln, ekki log₁₀!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalculationChallenges;
