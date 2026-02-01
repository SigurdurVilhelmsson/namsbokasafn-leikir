import { useState, useCallback, useMemo, useEffect } from 'react';
import { CATEGORIES, MATTER_SAMPLES, MatterCategory, shuffleArray } from '../data/classifications';

interface Level3Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

const TIME_PER_QUESTION = 15; // seconds

export function Level3({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level3Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<MatterCategory | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [streak, setStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);

  // Randomize all questions
  const questions = useMemo(() => shuffleArray(MATTER_SAMPLES), []);

  const currentItem = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;
  const maxScore = questions.length * 150; // 100 base + 50 time bonus max

  // Timer
  useEffect(() => {
    if (showResult || !currentItem) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up - auto-fail
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, showResult]);

  const handleTimeout = () => {
    setSelectedAnswer(null);
    setIsCorrect(false);
    setShowResult(true);
    setStreak(0);
    onIncorrectAnswer();
  };

  const handleAnswer = useCallback((category: MatterCategory) => {
    if (showResult) return;

    setSelectedAnswer(category);
    const correct = category === currentItem.category;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      // Time bonus: up to 50 points for answering quickly
      const timeBonus = Math.floor((timeLeft / TIME_PER_QUESTION) * 50);
      const streakBonus = Math.min(streak * 15, 75);
      setScore(prev => prev + 100 + timeBonus + streakBonus);
      setStreak(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
      onCorrectAnswer();
    } else {
      setStreak(0);
      onIncorrectAnswer();
    }
  }, [showResult, currentItem, timeLeft, streak, onCorrectAnswer, onIncorrectAnswer]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, maxScore, 0);
    } else {
      setCurrentIndex(prev => prev + 1);
      setShowResult(false);
      setSelectedAnswer(null);
      setTimeLeft(TIME_PER_QUESTION);
    }
  };

  // Shuffle options each question
  const options = useMemo(() => {
    const categories: MatterCategory[] = ['frumefni', 'efnasamband', 'einsleit', 'misleit'];
    return shuffleArray(categories);
  }, [currentIndex]);

  // Timer color based on time left
  const getTimerColor = () => {
    if (timeLeft > 10) return 'text-green-500';
    if (timeLeft > 5) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getTimerBg = () => {
    if (timeLeft > 10) return 'bg-green-500';
    if (timeLeft > 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 md:p-8">
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
              <h1 className="text-xl font-bold text-purple-700">Stig 3: Áskoranir</h1>
              <div className="flex items-center justify-center gap-4 text-sm">
                {streak > 1 && (
                  <span className="text-orange-500 font-bold">🔥 {streak} í röð!</span>
                )}
                <span className="text-gray-500">✓ {totalCorrect}/{currentIndex + (showResult ? 1 : 0)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-purple-600">{score} stig</div>
              <div className="text-xs text-gray-500">{currentIndex + 1} / {questions.length}</div>
            </div>
          </div>

          {/* Timer bar */}
          <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-linear ${getTimerBg()}`}
              style={{ width: `${(timeLeft / TIME_PER_QUESTION) * 100}%` }}
            />
          </div>
          <div className={`text-center mt-1 font-mono font-bold ${getTimerColor()}`}>
            {!showResult && `${timeLeft}s`}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <span className={`text-7xl mb-4 block ${!showResult && timeLeft <= 5 ? 'animate-pulse' : ''}`}>
              {currentItem.emoji}
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{currentItem.name}</h2>
            {currentItem.formula && (
              <p className="text-xl font-mono text-purple-600">{currentItem.formula}</p>
            )}
          </div>

          {/* Answer options - horizontal for speed */}
          <div className="grid grid-cols-4 gap-2">
            {options.map(cat => (
              <button
                key={cat}
                onClick={() => handleAnswer(cat)}
                disabled={showResult}
                className={`p-3 rounded-xl border-2 transition-all ${
                  showResult
                    ? cat === currentItem.category
                      ? 'border-green-500 bg-green-100'
                      : selectedAnswer === cat
                        ? 'border-red-500 bg-red-100'
                        : 'border-gray-200 opacity-40'
                    : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50 active:scale-95'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-1">{CATEGORIES[cat].emoji}</span>
                  <span
                    className="text-xs font-bold truncate w-full text-center"
                    style={{ color: CATEGORIES[cat].color }}
                  >
                    {CATEGORIES[cat].name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-xl mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? (
                  <>
                    ✓ Rétt!
                    <span className="ml-2 text-sm font-normal">
                      +100 + {Math.floor((timeLeft / TIME_PER_QUESTION) * 50)} tíma bónus
                      {streak > 1 && ` + ${Math.min((streak - 1) * 15, 75)} röð bónus`}
                    </span>
                  </>
                ) : timeLeft === 0 ? (
                  '⏰ Tíminn rann út!'
                ) : (
                  '✗ Rangt'
                )}
              </div>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-3xl">{CATEGORIES[currentItem.category].emoji}</span>
                <div>
                  <span className="font-semibold" style={{ color: CATEGORIES[currentItem.category].color }}>
                    {CATEGORIES[currentItem.category].name}
                  </span>
                  <p className="text-sm text-gray-600">{currentItem.hint}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ljúka stigi' : 'Næsta spurning →'}
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="bg-white rounded-xl p-3 shadow">
            <div className="text-2xl font-bold text-purple-600">{streak}</div>
            <div className="text-xs text-gray-500">Röð</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow">
            <div className="text-2xl font-bold text-green-600">{totalCorrect}</div>
            <div className="text-xs text-gray-500">Rétt</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow">
            <div className="text-2xl font-bold text-blue-600">
              {totalCorrect > 0 ? Math.round((totalCorrect / (currentIndex + (showResult ? 1 : 0))) * 100) : 0}%
            </div>
            <div className="text-xs text-gray-500">Nákvæmni</div>
          </div>
        </div>
      </div>
    </div>
  );
}
