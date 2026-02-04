import { useState, useCallback, useMemo } from 'react';
import { REACTIONS } from '../data/reactions';
import { shuffleArray } from '../data/substances';

interface Level2Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

type Phase = 'learn' | 'quiz';

export function Level2({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level2Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);

  // Randomize questions
  const questions = useMemo(() => shuffleArray(REACTIONS).slice(0, 10), []);

  const currentReaction = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;
  const maxScore = questions.length * 100;

  // Build answer options: correct salt + 3 wrong salts
  const options = useMemo(() => {
    if (!currentReaction) return [];
    const allOptions = [currentReaction.salt, ...currentReaction.wrongSalts];
    return shuffleArray(allOptions);
  }, [currentIndex, currentReaction]);

  const handleAnswer = useCallback((salt: string) => {
    if (showResult) return;

    setSelectedAnswer(salt);
    const correct = salt === currentReaction.salt;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const basePoints = showHint ? 50 : 100;
      const streakBonus = Math.min(streak * 10, 50);
      setScore(prev => prev + basePoints + streakBonus);
      setStreak(prev => prev + 1);
      onCorrectAnswer?.();
    } else {
      setStreak(0);
      onIncorrectAnswer?.();
    }
  }, [showResult, currentReaction, showHint, streak, onCorrectAnswer, onIncorrectAnswer]);

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

  // Learning Phase
  if (phase === 'learn') {
    const exampleReactions = REACTIONS.slice(0, 3);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <span>&larr;</span> Til baka
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-green-700">
                Stig 2: Hlutleysis&shy;efna&shy;hvorf
              </h1>
              <div></div>
            </div>
          </div>

          {/* Neutralization Overview */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Hlutleysing / Neutralization
            </h2>

            {/* General pattern */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 mb-6 text-center">
              <p className="text-lg font-bold text-green-800 mb-2">Almennt mynstur:</p>
              <div className="text-2xl font-mono font-bold text-green-700">
                <span className="text-red-600">S&yacute;ra</span> + <span className="text-blue-600">Basi</span> &rarr; <span className="text-purple-600">Salt</span> + <span className="text-cyan-600">Vatn</span>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Kati&oacute;ninn fr&aacute; basanum og anj&oacute;ninn fr&aacute; s&yacute;runni mynda salti&eth;.
              </p>
            </div>

            {/* Examples */}
            <h3 className="font-bold text-gray-700 mb-3">D&aelig;mi:</h3>
            <div className="space-y-4 mb-6">
              {exampleReactions.map(r => (
                <div key={r.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-center">
                    <div className="text-xl font-mono font-bold text-gray-800 mb-2">
                      {r.balancedEquation}
                    </div>
                    <div className="flex justify-center gap-2 text-sm">
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded">{r.acid} = s&yacute;ra</span>
                      <span className="text-gray-400">+</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{r.base} = basi</span>
                      <span className="text-gray-400">&rarr;</span>
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">{r.salt} = {r.saltName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key concept */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="font-bold text-yellow-800 mb-2">Muna&eth;u:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>&bull; M&aacute;lmurinn &uacute;r basanum (Na&#8314;, K&#8314;, Ca&#178;&#8314;) heldur &aacute;fram</li>
                <li>&bull; Anj&oacute;ninn &uacute;r s&yacute;runni (Cl&#8315;, SO&#8324;&#178;&#8315;, NO&#8323;&#8315;) heldur &aacute;fram</li>
                <li>&bull; Saman mynda &thorn;eir salti&eth;</li>
                <li>&bull; H&#8314; fr&aacute; s&yacute;runni og OH&#8315; fr&aacute; basanum mynda H&#8322;O (vatn)</li>
              </ul>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              Hefja spurningakeppni &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setPhase('learn')}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <span>&larr;</span> Til baka
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-green-700">Hlutleysis&shy;efna&shy;hvorf</h1>
              {streak > 1 && (
                <div className="text-sm text-orange-500 font-bold">{streak} &iacute; r&ouml;&eth;!</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">{score} stig</div>
              <div className="text-xs text-gray-500">{currentIndex + 1} / {questions.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-2">Hva&eth; myndast &thorn;egar &thorn;essi efni hvarfast?</p>
            <div className="flex items-center justify-center gap-3 text-2xl font-mono font-bold mb-3">
              <span className="bg-red-100 text-red-700 px-3 py-2 rounded-xl">
                {currentReaction.acidCoeff > 1 ? currentReaction.acidCoeff : ''}{currentReaction.acid}
              </span>
              <span className="text-gray-400">+</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-xl">
                {currentReaction.baseCoeff > 1 ? currentReaction.baseCoeff : ''}{currentReaction.base}
              </span>
              <span className="text-gray-400">&rarr;</span>
              <span className="bg-gray-200 text-gray-600 px-3 py-2 rounded-xl">?</span>
              <span className="text-gray-400">+</span>
              <span className="bg-cyan-100 text-cyan-700 px-3 py-2 rounded-xl">
                {currentReaction.waterCoeff > 1 ? currentReaction.waterCoeff : ''}H&#8322;O
              </span>
            </div>
          </div>

          {/* Hint button */}
          {!showResult && !showHint && (
            <button
              onClick={handleHint}
              className="text-sm text-green-600 hover:text-green-700 mb-4 block mx-auto"
            >
              S&yacute;na v&iacute;sbendingu (-50 stig)
            </button>
          )}

          {/* Hint display */}
          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-center">
              {currentReaction.hint}
            </div>
          )}

          <p className="text-center text-lg font-medium text-gray-700 mb-4">
            Hva&eth;a salt myndast?
          </p>

          {/* Salt options */}
          <div className="grid grid-cols-2 gap-3">
            {options.map((salt, idx) => (
              <button
                key={`${salt}-${idx}`}
                onClick={() => handleAnswer(salt)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  showResult
                    ? salt === currentReaction.salt
                      ? 'border-green-500 bg-green-100 scale-105'
                      : selectedAnswer === salt
                        ? 'border-red-500 bg-red-100'
                        : 'border-gray-200 opacity-40'
                    : 'border-gray-200 hover:border-green-400 hover:bg-green-50 hover:shadow-md'
                }`}
              >
                <span className="text-xl font-mono font-bold text-gray-800">{salt}</span>
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
                    Rett!
                    <span className="ml-2 text-sm font-normal">
                      +{showHint ? 50 : 100}{streak > 0 && !showHint ? ` +${Math.min(streak * 10, 50)} r&ouml;&eth; b&oacute;nus` : ''} stig
                    </span>
                  </>
                ) : (
                  'Rangt'
                )}
              </div>

              <div className="mt-3 space-y-2">
                <div className="text-center">
                  <div className="text-lg font-mono font-bold text-gray-800">
                    {currentReaction.balancedEquation}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Salti&eth; er <strong>{currentReaction.salt}</strong> ({currentReaction.saltName})
                  </p>
                </div>
                <p className="text-gray-700 text-sm">{currentReaction.hint}</p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Lj\u00faka stigi' : 'N\u00e6sta spurning \u2192'}
            </button>
          </div>
        )}

        {/* Reference */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Muna&eth;u:</h3>
          <p className="text-xs text-gray-500">
            S&yacute;ra + basi &rarr; salt + vatn. Kati&oacute;ninn kemur fr&aacute; basanum, anj&oacute;ninn fr&aacute; s&yacute;runni.
          </p>
        </div>
      </div>
    </div>
  );
}
