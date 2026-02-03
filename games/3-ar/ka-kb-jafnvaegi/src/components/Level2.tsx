import { useState } from 'react';
import { LEVEL2_PROBLEMS } from '../data';

interface Level2Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function Level2({ onComplete, onBack }: Level2Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintMultiplier, setHintMultiplier] = useState(1.0);

  const problem = LEVEL2_PROBLEMS[currentIndex];
  const totalProblems = LEVEL2_PROBLEMS.length;

  const checkAnswer = () => {
    const userNum = parseFloat(userAnswer);
    if (isNaN(userNum)) return false;

    // For scientific notation answers (like Ka values)
    if (problem.correctAnswer < 0.001) {
      const orderOfMagnitude = Math.floor(Math.log10(problem.correctAnswer));
      const userOrder = Math.floor(Math.log10(userNum));
      const relativeError = Math.abs(userNum - problem.correctAnswer) / problem.correctAnswer;
      return orderOfMagnitude === userOrder && relativeError <= problem.tolerance;
    }

    // For pH/pOH values
    const diff = Math.abs(userNum - problem.correctAnswer);
    return diff <= problem.tolerance;
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
      setShowSteps(false);
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
      case 'ph-from-ka':
        return { is: 'pH frá Ka', en: 'pH from Ka', color: 'bg-red-100 text-red-700' };
      case 'ph-from-kb':
        return { is: 'pH frá Kb', en: 'pH from Kb', color: 'bg-blue-100 text-blue-700' };
      case 'ka-from-ph':
        return { is: 'Ka frá pH', en: 'Ka from pH', color: 'bg-purple-100 text-purple-700' };
      case 'concentration-from-ph':
        return { is: 'Styrkur frá pH', en: 'Concentration from pH', color: 'bg-green-100 text-green-700' };
      default:
        return { is: 'Útreikningur', en: 'Calculation', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const typeLabel = getTypeLabel(problem.type);

  const formatAnswer = (value: number) => {
    if (value < 0.001) {
      return value.toExponential(1);
    }
    return value.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-100 p-4 md:p-8">
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
              <div className="text-lg font-bold text-green-600">Stig: {score}</div>
            </div>
          </div>

          <h1 className="text-xl md:text-2xl font-bold mt-2 text-green-800">
            Þrep 2: pH Útreikningar
          </h1>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="h-2 rounded-full transition-all duration-300 bg-green-500"
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
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {problem.acidBase.formula} ({problem.acidBase.type === 'weak-acid' ? 'veik sýra' : 'veikur basi'})
            </span>
          </div>

          {/* Question */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{problem.questionIs}</h2>

          {/* Given Information */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Gefnar upplýsingar:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Efni:</span>{' '}
                <span className="font-mono">{problem.acidBase.formula}</span>
              </div>
              {problem.initialConcentration && (
                <div>
                  <span className="text-gray-500">Upphafsþéttni (C₀):</span>{' '}
                  <span className="font-mono">{problem.initialConcentration} M</span>
                </div>
              )}
              {problem.acidBase.Ka && (
                <div>
                  <span className="text-gray-500">Ka:</span>{' '}
                  <span className="font-mono">{problem.acidBase.Ka.toExponential(1)}</span>
                </div>
              )}
              {problem.acidBase.Kb && (
                <div>
                  <span className="text-gray-500">Kb:</span>{' '}
                  <span className="font-mono">{problem.acidBase.Kb.toExponential(1)}</span>
                </div>
              )}
              {problem.givenValue && (
                <div>
                  <span className="text-gray-500">
                    {problem.type === 'ka-from-ph' ? 'pH:' : 'Gefið gildi:'}
                  </span>{' '}
                  <span className="font-mono">{problem.givenValue}</span>
                </div>
              )}
            </div>
          </div>

          {/* Hint System */}
          {problem.hintIs && !showFeedback && (
            <div className="mb-4">
              {!showHint ? (
                <button
                  onClick={handleShowHint}
                  className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
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
              <span className="text-gray-500 ml-2">
                (skekkjumörk: ±{problem.tolerance})
              </span>
            </label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={showFeedback}
              placeholder={problem.type.includes('ka') ? 't.d. 2.5e-5' : 't.d. 2.87'}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none font-mono disabled:bg-gray-100"
            />
          </div>

          {/* Submit / Next Button */}
          {!showFeedback ? (
            <button
              onClick={handleSubmit}
              disabled={!userAnswer}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                    Rétt svar: <span className="font-mono">{formatAnswer(problem.correctAnswer)}</span>
                  </p>
                )}
              </div>

              {/* Steps Toggle */}
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="text-green-600 hover:text-green-800 text-sm mb-4"
              >
                {showSteps ? '▼ Fela lausnarskref' : '▶ Sýna lausnarskref'}
              </button>

              {showSteps && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-green-800 mb-2">Lausnarskref:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    {problem.stepsIs.map((step, idx) => (
                      <li key={idx} className="font-mono">{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              <button
                onClick={handleNext}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
              >
                {currentIndex < totalProblems - 1 ? 'Næsta verkefni →' : 'Ljúka þrepi →'}
              </button>
            </div>
          )}
        </div>

        {/* ICE Table Reference */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">📐 ICE tafla aðferð</h3>
          <div className="bg-gray-50 rounded-lg p-3 overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-1 px-2 text-left"></th>
                  <th className="py-1 px-2 text-center">HA</th>
                  <th className="py-1 px-2 text-center">⇌</th>
                  <th className="py-1 px-2 text-center">H⁺</th>
                  <th className="py-1 px-2 text-center">+</th>
                  <th className="py-1 px-2 text-center">A⁻</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 px-2 font-bold">I</td>
                  <td className="py-1 px-2 text-center">C₀</td>
                  <td></td>
                  <td className="py-1 px-2 text-center">0</td>
                  <td></td>
                  <td className="py-1 px-2 text-center">0</td>
                </tr>
                <tr>
                  <td className="py-1 px-2 font-bold">C</td>
                  <td className="py-1 px-2 text-center">-x</td>
                  <td></td>
                  <td className="py-1 px-2 text-center">+x</td>
                  <td></td>
                  <td className="py-1 px-2 text-center">+x</td>
                </tr>
                <tr>
                  <td className="py-1 px-2 font-bold">E</td>
                  <td className="py-1 px-2 text-center">C₀-x</td>
                  <td></td>
                  <td className="py-1 px-2 text-center">x</td>
                  <td></td>
                  <td className="py-1 px-2 text-center">x</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-2 text-gray-600 text-xs">
              Ka = x²/(C₀-x) ≈ x²/C₀ ef x {'<<'} C₀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
