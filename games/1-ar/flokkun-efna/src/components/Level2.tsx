import { useState, useCallback, useMemo } from 'react';
import { CATEGORIES, MATTER_SAMPLES, MatterCategory, shuffleArray } from '../data/classifications';

interface Level2Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

export function Level2({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level2Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<MatterCategory | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);

  // Randomize questions
  const questions = useMemo(() => shuffleArray(MATTER_SAMPLES).slice(0, 12), []);

  const currentItem = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;
  const maxScore = questions.length * 100;

  const handleAnswer = useCallback((category: MatterCategory) => {
    if (showResult) return;

    setSelectedAnswer(category);
    const correct = category === currentItem.category;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const basePoints = showHint ? 50 : 100;
      const streakBonus = Math.min(streak * 10, 50); // Max 50 bonus
      setScore(prev => prev + basePoints + streakBonus);
      setStreak(prev => prev + 1);
      onCorrectAnswer();
    } else {
      setStreak(0);
      onIncorrectAnswer();
    }
  }, [showResult, currentItem, showHint, streak, onCorrectAnswer, onIncorrectAnswer]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, maxScore, hintsUsed);
    } else {
      setCurrentIndex(prev => prev + 1);
      setShowResult(false);
      setSelectedAnswer(null);
      setShowHint(false);
    }
  };

  const handleHint = () => {
    if (!showHint) {
      setHintsUsed(prev => prev + 1);
      setShowHint(true);
    }
  };

  // Get wrong options for variety
  const getOptions = (): MatterCategory[] => {
    const categories: MatterCategory[] = ['frumefni', 'efnasamband', 'einsleit', 'misleit'];
    return shuffleArray(categories);
  };

  const options = useMemo(() => getOptions(), [currentIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
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
              <h1 className="text-xl font-bold text-emerald-700">Stig 2: Flokkun</h1>
              {streak > 1 && (
                <div className="text-sm text-orange-500 font-bold">🔥 {streak} í röð!</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-emerald-600">{score} stig</div>
              <div className="text-xs text-gray-500">{currentIndex + 1} / {questions.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <span className="text-7xl mb-4 block animate-bounce">{currentItem.emoji}</span>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{currentItem.name}</h2>
            <p className="text-sm text-gray-500">{currentItem.nameEn}</p>
            {currentItem.formula && (
              <p className="text-xl font-mono text-emerald-600 mt-2">{currentItem.formula}</p>
            )}
            <p className="text-gray-600 mt-3">{currentItem.description}</p>
          </div>

          {/* Hint button */}
          {!showResult && !showHint && (
            <button
              onClick={handleHint}
              className="text-sm text-emerald-600 hover:text-emerald-700 mb-4 block mx-auto"
            >
              💡 Sýna vísbendingu (-50 stig)
            </button>
          )}

          {/* Hint display */}
          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-center">
              💡 {currentItem.hint}
            </div>
          )}

          <p className="text-center text-lg font-medium text-gray-700 mb-4">
            Veldu réttan flokk:
          </p>

          {/* Answer options - 2x2 grid */}
          <div className="grid grid-cols-2 gap-4">
            {options.map(cat => (
              <button
                key={cat}
                onClick={() => handleAnswer(cat)}
                disabled={showResult}
                className={`p-5 rounded-xl border-3 transition-all transform hover:scale-102 ${
                  showResult
                    ? cat === currentItem.category
                      ? 'border-green-500 bg-green-100 scale-105'
                      : selectedAnswer === cat
                        ? 'border-red-500 bg-red-100'
                        : 'border-gray-200 opacity-40'
                    : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-4xl">{CATEGORIES[cat].emoji}</span>
                  <div className="text-center">
                    <div
                      className="font-bold text-lg"
                      style={{ color: CATEGORIES[cat].color }}
                    >
                      {CATEGORIES[cat].name}
                    </div>
                    <div className="text-xs text-gray-500">{CATEGORIES[cat].nameEn}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Result & Explanation */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-xl mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? (
                  <>
                    ✓ Rétt!
                    <span className="ml-2 text-sm font-normal">
                      +{showHint ? 50 : 100}{streak > 0 && !showHint ? ` +${Math.min(streak * 10, 50)} röð bónus` : ''} stig
                    </span>
                  </>
                ) : (
                  '✗ Rangt'
                )}
              </div>

              {/* Explanation */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{CATEGORIES[currentItem.category].emoji}</span>
                  <span className="font-semibold" style={{ color: CATEGORIES[currentItem.category].color }}>
                    {CATEGORIES[currentItem.category].name}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{currentItem.hint}</p>
                <p className="text-gray-600 text-xs italic">
                  {CATEGORIES[currentItem.category].description}
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ljúka stigi' : 'Næsta spurning →'}
            </button>
          </div>
        )}

        {/* Category Legend */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Flokkar:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            {(Object.keys(CATEGORIES) as MatterCategory[]).map(cat => (
              <div key={cat} className="flex items-center gap-1">
                <span>{CATEGORIES[cat].emoji}</span>
                <span style={{ color: CATEGORIES[cat].color }}>{CATEGORIES[cat].name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
