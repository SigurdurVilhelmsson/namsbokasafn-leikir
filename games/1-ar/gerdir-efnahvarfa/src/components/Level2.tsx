import { useState, useCallback, useMemo } from 'react';
import { REACTION_TYPES, REACTION_EXAMPLES, ReactionType, shuffleArray } from '../data/reactions';

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
  const [selectedAnswer, setSelectedAnswer] = useState<ReactionType | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);

  // Randomize questions
  const questions = useMemo(() => shuffleArray(REACTION_EXAMPLES).slice(0, 15), []);

  const currentItem = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;
  const maxScore = questions.length * 100;

  const reactionTypes: ReactionType[] = ['samsetting', 'sundurlitur', 'einföld', 'tvöföld', 'bruni'];

  const handleAnswer = useCallback((type: ReactionType) => {
    if (showResult) return;

    setSelectedAnswer(type);
    const correct = type === currentItem.type;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const basePoints = showHint ? 50 : 100;
      const streakBonus = Math.min(streak * 10, 50);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
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
              <h1 className="text-xl font-bold text-amber-700">Stig 2: Flokkun</h1>
              {streak > 1 && (
                <div className="text-sm text-orange-500 font-bold">🔥 {streak} í röð!</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-amber-600">{score} stig</div>
              <div className="text-xs text-gray-500">{currentIndex + 1} / {questions.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {/* Difficulty badge */}
          <div className="flex justify-between items-center mb-4">
            <span className={`text-xs px-2 py-1 rounded-full ${
              currentItem.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              currentItem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentItem.difficulty === 'easy' ? 'Auðvelt' :
               currentItem.difficulty === 'medium' ? 'Miðlungs' : 'Erfitt'}
            </span>
            <span className="text-sm text-gray-500">{currentItem.name}</span>
          </div>

          {/* Chemical equation */}
          <div className="bg-gray-100 rounded-xl p-5 mb-4">
            <div className="font-mono text-2xl md:text-3xl text-center text-gray-800">
              {currentItem.balancedEquation}
            </div>
          </div>

          <p className="text-center text-gray-600 mb-4">{currentItem.description}</p>

          {/* Hint button */}
          {!showResult && !showHint && (
            <button
              onClick={handleHint}
              className="text-sm text-amber-600 hover:text-amber-700 mb-4 block mx-auto"
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
            Veldu rétta gerð hvarfs:
          </p>

          {/* Answer options */}
          <div className="grid grid-cols-5 gap-2">
            {reactionTypes.map(type => (
              <button
                key={type}
                onClick={() => handleAnswer(type)}
                disabled={showResult}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  showResult
                    ? type === currentItem.type
                      ? 'border-green-500 bg-green-100 scale-105'
                      : selectedAnswer === type
                        ? 'border-red-500 bg-red-100'
                        : 'border-gray-200 opacity-40'
                    : 'border-gray-200 hover:border-amber-400 hover:bg-amber-50'
                }`}
              >
                <div className="text-2xl mb-1">{REACTION_TYPES[type].emoji}</div>
                <div
                  className="font-bold text-xs truncate"
                  style={{ color: REACTION_TYPES[type].color }}
                >
                  {REACTION_TYPES[type].name.split(' ')[0]}
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
                      +{showHint ? 50 : 100}{streak > 0 && !showHint ? ` +${Math.min(streak * 10, 50)} röð bónus` : ''} stig
                    </span>
                  </>
                ) : (
                  '✗ Rangt'
                )}
              </div>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-3xl">{REACTION_TYPES[currentItem.type].emoji}</span>
                <div>
                  <span className="font-semibold" style={{ color: REACTION_TYPES[currentItem.type].color }}>
                    {REACTION_TYPES[currentItem.type].name}
                  </span>
                  <span className="text-sm text-gray-500 ml-2 font-mono">
                    {REACTION_TYPES[currentItem.type].formula}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{currentItem.hint}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ljúka stigi' : 'Næsta spurning →'}
            </button>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Gerðir efnahvarfa:</h3>
          <div className="grid grid-cols-5 gap-2 text-xs">
            {reactionTypes.map(type => (
              <div key={type} className="flex flex-col items-center">
                <span>{REACTION_TYPES[type].emoji}</span>
                <span className="font-mono text-gray-500">{REACTION_TYPES[type].formula}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
