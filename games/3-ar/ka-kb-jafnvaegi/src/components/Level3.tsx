import { useState } from 'react';
import { LEVEL3_PROBLEMS } from '../data';

interface Level3Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function Level3({ onComplete, onBack }: Level3Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintMultiplier, setHintMultiplier] = useState(1.0);

  const problem = LEVEL3_PROBLEMS[currentIndex];
  const totalProblems = LEVEL3_PROBLEMS.length;

  const checkAnswer = () => {
    if (!userAnswer) return false;

    // For string answers (like 'increases', 'formic', etc.)
    if (typeof problem.correctAnswer === 'string') {
      const normalizedUser = userAnswer.toLowerCase().trim();
      const normalizedCorrect = problem.correctAnswer.toLowerCase();
      return (
        normalizedUser === normalizedCorrect ||
        normalizedUser.includes(normalizedCorrect) ||
        normalizedCorrect.includes(normalizedUser)
      );
    }

    // For numeric answers
    const userNum = parseFloat(userAnswer);
    if (isNaN(userNum)) return false;

    const tolerance = problem.tolerance || 0.1;
    const relativeError = Math.abs(userNum - (problem.correctAnswer as number)) / (problem.correctAnswer as number);
    return relativeError <= tolerance;
  };

  const isCorrect = checkAnswer();

  const handleSubmit = () => {
    if (!userAnswer) return;
    setShowFeedback(true);

    if (isCorrect) {
      const points = Math.round(15 * hintMultiplier);
      setScore((prev) => prev + points);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalProblems - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer('');
      setShowFeedback(false);
      setShowExplanation(false);
      setShowHint(false);
      setHintMultiplier(1.0);
    } else {
      const finalScore = Math.round((score / (totalProblems * 15)) * 100);
      onComplete(finalScore);
    }
  };

  const handleShowHint = () => {
    if (!showHint && !showFeedback) {
      setShowHint(true);
      setHintMultiplier(0.5);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'percent-ionization':
        return { is: 'Jónunarprósentu', color: 'bg-purple-100 text-purple-700' };
      case 'pka-pkb-conversion':
        return { is: 'pKa/pKb umbreyting', color: 'bg-blue-100 text-blue-700' };
      case 'dilution-effect':
        return { is: 'Þynningaráhrif', color: 'bg-teal-100 text-teal-700' };
      case 'compare-ionization':
        return { is: 'Bera saman jónun', color: 'bg-orange-100 text-orange-700' };
      default:
        return { is: 'Spurning', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const typeLabel = getTypeLabel(problem.type);

  const getInputPlaceholder = () => {
    switch (problem.type) {
      case 'percent-ionization':
        return 't.d. 1.3 (fyrir 1.3%)';
      case 'pka-pkb-conversion':
        return 't.d. 9.26';
      case 'dilution-effect':
        return 'increases / decreases / stays same';
      case 'compare-ionization':
        return 't.d. formic eða acetic';
      default:
        return 'Sláðu inn svar';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
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
                {currentIndex + 1} / {totalProblems}
              </div>
              <div className="text-lg font-bold text-purple-600">Stig: {score}</div>
            </div>
          </div>

          <h1 className="text-xl md:text-2xl font-bold mt-2 text-purple-800">
            Þrep 3: Jónunarprósentu
          </h1>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="h-2 rounded-full transition-all duration-300 bg-purple-500"
              style={{ width: `${((currentIndex + 1) / totalProblems) * 100}%` }}
            />
          </div>
        </div>

        {/* Problem Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          {/* Problem Type Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeLabel.color}`}>
              {typeLabel.is}
            </span>
            {problem.acidBase && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {problem.acidBase.formula}
              </span>
            )}
          </div>

          {/* Question */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{problem.questionIs}</h2>

          {/* Given Information */}
          {(problem.concentration || problem.acidBase?.Ka || problem.acidBase?.Kb) && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Gefnar upplýsingar:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {problem.acidBase && (
                  <div>
                    <span className="text-gray-500">Efni:</span>{' '}
                    <span className="font-mono">{problem.acidBase.formula}</span>
                  </div>
                )}
                {problem.concentration && (
                  <div>
                    <span className="text-gray-500">Þéttni:</span>{' '}
                    <span className="font-mono">{problem.concentration} M</span>
                  </div>
                )}
                {problem.acidBase?.Ka && (
                  <div>
                    <span className="text-gray-500">Ka:</span>{' '}
                    <span className="font-mono">{problem.acidBase.Ka.toExponential(1)}</span>
                  </div>
                )}
                {problem.acidBase?.Kb && (
                  <div>
                    <span className="text-gray-500">Kb:</span>{' '}
                    <span className="font-mono">{problem.acidBase.Kb.toExponential(1)}</span>
                  </div>
                )}
                {problem.acidBase?.pKa && (
                  <div>
                    <span className="text-gray-500">pKa:</span>{' '}
                    <span className="font-mono">{problem.acidBase.pKa}</span>
                  </div>
                )}
                {problem.acidBase?.pKb && (
                  <div>
                    <span className="text-gray-500">pKb:</span>{' '}
                    <span className="font-mono">{problem.acidBase.pKb}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Hint System */}
          {problem.hintIs && !showFeedback && (
            <div className="mb-4">
              {!showHint ? (
                <button
                  onClick={handleShowHint}
                  className="text-purple-600 hover:text-purple-800 text-sm flex items-center gap-1"
                >
                  💡 Sýna vísbendingu (-50% stig)
                </button>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">💡 Vísbending:</span> {problem.hintIs}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Answer Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Svarið þitt:
            </label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={showFeedback}
              placeholder={getInputPlaceholder()}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none font-mono disabled:bg-gray-100"
            />
          </div>

          {/* Submit / Next Button */}
          {!showFeedback ? (
            <button
              onClick={handleSubmit}
              disabled={!userAnswer}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Athuga svar
            </button>
          ) : (
            <div className="mt-4">
              {/* Feedback */}
              <div
                className={`p-4 rounded-lg mb-4 ${
                  isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                <p className="font-bold">
                  {isCorrect ? '✓ Rétt!' : '✗ Rangt'}
                  {isCorrect && (
                    <span className="ml-2 text-sm font-normal">
                      +{Math.round(15 * hintMultiplier)} stig
                    </span>
                  )}
                </p>
                {!isCorrect && (
                  <p className="text-sm mt-1">
                    Rétt svar:{' '}
                    <span className="font-mono">
                      {typeof problem.correctAnswer === 'number'
                        ? problem.correctAnswer.toFixed(2)
                        : problem.correctAnswer}
                      {problem.type === 'percent-ionization' && '%'}
                    </span>
                  </p>
                )}
              </div>

              {/* Explanation Toggle */}
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-purple-600 hover:text-purple-800 text-sm mb-4"
              >
                {showExplanation ? '▼ Fela útskýringu' : '▶ Sýna útskýringu'}
              </button>

              {showExplanation && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-700">{problem.explanationIs}</p>
                </div>
              )}

              <button
                onClick={handleNext}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
              >
                {currentIndex < totalProblems - 1 ? 'Næsta verkefni →' : 'Ljúka þrepi →'}
              </button>
            </div>
          )}
        </div>

        {/* Formula Reference */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">📐 Lykilformúlur</h3>
          <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
            <p>
              <strong>Jónunarprósentu:</strong>{' '}
              <span className="font-mono">% jónun = ([H⁺]/C₀) × 100%</span>
            </p>
            <p>
              <strong>pKa/pKb samband:</strong>{' '}
              <span className="font-mono">pKa + pKb = 14</span>
            </p>
            <p>
              <strong>Þynningaráhrif:</strong> Þegar lausn er þynnt eykst jónunarprósentan (Le Chatelier)
            </p>
            <p>
              <strong>Styrksáhrif:</strong> Hærri styrkur = lægri jónunarprósentu, lægri styrkur = hærri jónunarprósentu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
