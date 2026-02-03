import { useState } from 'react';
import { LEVEL1_PROBLEMS } from '../data';
import type { Level1Problem } from '../types';

interface Level1Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function Level1({ onComplete, onBack }: Level1Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintMultiplier, setHintMultiplier] = useState(1.0);

  const problem = LEVEL1_PROBLEMS[currentIndex];
  const isCorrect = selectedAnswer === problem.correctAnswer;
  const totalProblems = LEVEL1_PROBLEMS.length;

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setShowFeedback(true);

    if (isCorrect) {
      const points = Math.round(10 * hintMultiplier);
      setScore((prev) => prev + points);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalProblems - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowExplanation(false);
      setShowHint(false);
      setHintMultiplier(1.0);
    } else {
      const finalScore = Math.round((score / (totalProblems * 10)) * 100);
      onComplete(finalScore);
    }
  };

  const handleShowHint = () => {
    if (!showHint && !showFeedback) {
      setShowHint(true);
      setHintMultiplier(0.5); // 50% points after using hint
    }
  };

  const getTypeLabel = (type: Level1Problem['type']) => {
    switch (type) {
      case 'write-ka':
        return { is: 'Ka tjáning', en: 'Ka Expression' };
      case 'write-kb':
        return { is: 'Kb tjáning', en: 'Kb Expression' };
      case 'ka-kb-relationship':
        return { is: 'Ka/Kb samband', en: 'Ka/Kb Relationship' };
      case 'compare-strength':
        return { is: 'Bera saman styrk', en: 'Compare Strength' };
      default:
        return { is: 'Spurning', en: 'Question' };
    }
  };

  const typeLabel = getTypeLabel(problem.type);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4 md:p-8">
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
              <div className="text-lg font-bold text-blue-600">Stig: {score}</div>
            </div>
          </div>

          <h1 className="text-xl md:text-2xl font-bold mt-2 text-blue-800">
            Þrep 1: Ka/Kb Tjáningar
          </h1>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="h-2 rounded-full transition-all duration-300 bg-blue-500"
              style={{ width: `${((currentIndex + 1) / totalProblems) * 100}%` }}
            />
          </div>
        </div>

        {/* Problem Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          {/* Problem Type Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {typeLabel.is}
            </span>
            {problem.acidBase && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {problem.acidBase.formula}
              </span>
            )}
          </div>

          {/* Question */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {problem.questionIs}
          </h2>

          {/* Acid/Base Info */}
          {problem.acidBase && (
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Formúla:</span>{' '}
                  <span className="font-mono">{problem.acidBase.formula}</span>
                </div>
                <div>
                  <span className="text-gray-500">Nafn:</span>{' '}
                  <span>{problem.acidBase.nameIs}</span>
                </div>
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
              </div>
            </div>
          )}

          {/* Hint System */}
          {problem.hintIs && !showFeedback && (
            <div className="mb-4">
              {!showHint ? (
                <button
                  onClick={handleShowHint}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
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

          {/* Answer Options */}
          <div className="space-y-3">
            {problem.options?.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === problem.correctAnswer;

              let bgColor = 'bg-gray-50 hover:bg-gray-100';
              let borderColor = 'border-gray-200';
              let textColor = 'text-gray-800';

              if (showFeedback) {
                if (isCorrectOption) {
                  bgColor = 'bg-green-50';
                  borderColor = 'border-green-500';
                  textColor = 'text-green-800';
                } else if (isSelected && !isCorrectOption) {
                  bgColor = 'bg-red-50';
                  borderColor = 'border-red-500';
                  textColor = 'text-red-800';
                }
              } else if (isSelected) {
                bgColor = 'bg-blue-50';
                borderColor = 'border-blue-500';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${bgColor} ${borderColor} ${textColor} ${
                    showFeedback ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <span className="font-mono text-sm">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Submit / Next Button */}
          {!showFeedback ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                      +{Math.round(10 * hintMultiplier)} stig
                    </span>
                  )}
                </p>
              </div>

              {/* Explanation Toggle */}
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-blue-600 hover:text-blue-800 text-sm mb-4"
              >
                {showExplanation ? '▼ Fela útskýringu' : '▶ Sýna útskýringu'}
              </button>

              {showExplanation && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-700">{problem.explanationIs}</p>
                </div>
              )}

              <button
                onClick={handleNext}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
              >
                {currentIndex < totalProblems - 1 ? 'Næsta spurning →' : 'Ljúka þrepi →'}
              </button>
            </div>
          )}
        </div>

        {/* Formula Reference */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">📐 Lykilformúlur</h3>
          <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm font-mono">
            <p>
              <strong>Veik sýra:</strong> HA ⇌ H⁺ + A⁻ → Ka = [H⁺][A⁻]/[HA]
            </p>
            <p>
              <strong>Veikur basi:</strong> B + H₂O ⇌ BH⁺ + OH⁻ → Kb = [BH⁺][OH⁻]/[B]
            </p>
            <p>
              <strong>Samband:</strong> Ka × Kb = Kw = 1.0 × 10⁻¹⁴
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
