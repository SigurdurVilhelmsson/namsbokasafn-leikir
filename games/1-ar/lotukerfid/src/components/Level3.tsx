import { useState, useCallback, useMemo } from 'react';
import {
  GROUP_COLORS,
  shuffleArray,
  getElementBySymbol,
} from '../data/elements';
import {
  TREND_QUESTIONS,
  TREND_TYPE_INFO,
  type TrendQuestion,
  type TrendType,
} from '../data/trends';

interface Level3Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

type Phase = 'learn' | 'quiz';

export function Level3({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level3Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  // Shuffle the 12 trend questions
  const questions = useMemo(() => shuffleArray(TREND_QUESTIONS), []);
  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;
  const maxScore = questions.length * 100;

  const element1 = useMemo(() => getElementBySymbol(currentQ?.element1Symbol), [currentQ]);
  const element2 = useMemo(() => getElementBySymbol(currentQ?.element2Symbol), [currentQ]);

  const handleAnswer = useCallback((answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    const correct = answer === currentQ.answerSymbol;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const basePoints = showHint ? 50 : 100;
      const streakBonus = Math.min(streak * 10, 50);
      setScore(prev => prev + basePoints + streakBonus);
      setStreak(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
      onCorrectAnswer?.();
    } else {
      setStreak(0);
      onIncorrectAnswer?.();
    }
  }, [showResult, currentQ, showHint, streak, onCorrectAnswer, onIncorrectAnswer]);

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

  // Get trend-specific hint text
  const getHintText = (q: TrendQuestion): string => {
    const info = TREND_TYPE_INFO[q.trendType];
    return info.ruleIs;
  };

  // Get trend emoji
  const getTrendEmoji = (type: TrendType): string => {
    return TREND_TYPE_INFO[type].emoji;
  };

  // Learning Phase: explain periodic trends
  if (phase === 'learn') {
    const trendTypes: TrendType[] = ['atomic-radius', 'ionization-energy', 'electronegativity'];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 md:p-8">
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
              <h1 className="text-xl md:text-2xl font-bold text-purple-700">
                Stig 3: Lotumynstur
              </h1>
              <div></div>
            </div>
          </div>

          {/* Main concept */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Lotumynstur / Periodic Trends
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Lotukerfid er skipulagt thannig ad eiginleikar frumefna breytast a fyrirsjanlegan hatt eftir lotum og hopum.
            </p>

            {/* Visual trend arrows */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-center items-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-600 mb-2">Eftir lotu &rarr;</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-red-200 rounded px-2 py-1 text-xs">Atomgeisli minnkar</div>
                    <span>&rarr;</span>
                    <div className="bg-blue-200 rounded px-2 py-1 text-xs">Jonunarorka eykst</div>
                    <span>&rarr;</span>
                    <div className="bg-teal-200 rounded px-2 py-1 text-xs">Rafneikvaedni eykst</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4">
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-600 mb-2">Nidur hop &darr;</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-red-200 rounded px-2 py-1 text-xs">Atomgeisli eykst</div>
                    <span>&darr;</span>
                    <div className="bg-blue-200 rounded px-2 py-1 text-xs">Jonunarorka minnkar</div>
                    <span>&darr;</span>
                    <div className="bg-teal-200 rounded px-2 py-1 text-xs">Rafneikvaedni minnkar</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Three trends explained */}
          <div className="space-y-4 mb-6">
            {trendTypes.map(type => {
              const info = TREND_TYPE_INFO[type];
              return (
                <div key={type} className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{info.emoji}</span>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{info.nameIs}</h3>
                      <p className="text-sm text-gray-500">{info.nameEn}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{info.descriptionIs}</p>
                  <div className="bg-purple-50 p-3 rounded-xl">
                    <p className="text-sm font-semibold text-purple-700">
                      Regla: {info.ruleIs}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Misconception buster */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
            <h3 className="font-bold text-gray-700 mb-3">Af hverju?</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-purple-50 p-3 rounded-xl">
                <span className="font-bold text-purple-700">Eftir lotu (til haegri):</span>{' '}
                <span className="text-gray-600">
                  Fleiri roteindir draga sterkar ad ser rafeindir, atomid verdur minna og erfidara ad fjarllegja rafeind.
                </span>
              </div>
              <div className="bg-purple-50 p-3 rounded-xl">
                <span className="font-bold text-purple-700">Nidur hop:</span>{' '}
                <span className="text-gray-600">
                  Nyjar rafeindaskeldjar baetast vid, atomid staekkar og ystu rafeindir eru fjaar kjarnanum.
                </span>
              </div>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              Hefja spurningakeppni &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phase: trend comparison questions
  if (!element1 || !element2 || !currentQ) return null;

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
              <span>&larr;</span> Til baka
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-purple-700">Stig 3: Lotumynstur</h1>
              <div className="flex items-center justify-center gap-4 text-sm">
                {streak > 1 && (
                  <span className="text-orange-500 font-bold">&#128293; {streak} i rod!</span>
                )}
                <span className="text-gray-500">&#10003; {totalCorrect}/{currentIndex + (showResult ? 1 : 0)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-purple-600">{score} stig</div>
              <div className="text-xs text-gray-500">{currentIndex + 1} / {questions.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Trend type indicator */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">{getTrendEmoji(currentQ.trendType)}</span>
            <span className="font-bold text-gray-700">
              {TREND_TYPE_INFO[currentQ.trendType].nameIs}
            </span>
            <span className="text-gray-400 text-sm">
              ({TREND_TYPE_INFO[currentQ.trendType].nameEn})
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <p className="text-center text-lg font-medium text-gray-700 mb-6">
            {currentQ.questionIs}
          </p>

          {/* Hint button */}
          {!showResult && !showHint && (
            <button
              onClick={handleHint}
              className="text-sm text-purple-600 hover:text-purple-700 mb-4 block mx-auto"
            >
              &#128161; Syna visbendingu (-50 stig)
            </button>
          )}

          {/* Hint display */}
          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-center">
              &#128161; {getHintText(currentQ)}
            </div>
          )}

          {/* Two element choices */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { symbol: currentQ.element1Symbol, el: element1 },
              { symbol: currentQ.element2Symbol, el: element2 },
            ].map(({ symbol, el }) => (
              <button
                key={symbol}
                onClick={() => handleAnswer(symbol)}
                disabled={showResult}
                className={`p-6 rounded-xl border-3 transition-all ${
                  showResult
                    ? symbol === currentQ.answerSymbol
                      ? 'border-green-500 bg-green-100 scale-105'
                      : selectedAnswer === symbol
                        ? 'border-red-500 bg-red-100'
                        : 'border-gray-200 opacity-40'
                    : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center ${GROUP_COLORS[el.group].bg}`}>
                    <span className="text-xs text-gray-500">{el.atomicNumber}</span>
                    <span className={`text-2xl font-bold ${GROUP_COLORS[el.group].text}`}>
                      {el.symbol}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-800">{el.nameIs}</div>
                    <div className="text-xs text-gray-500">{el.nameEn}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Lota {el.period}, Dalki {el.column}
                    </div>
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
                    &#10003; Rett!
                    <span className="ml-2 text-sm font-normal">
                      +{showHint ? 50 : 100}{streak > 1 && !showHint ? ` +${Math.min((streak - 1) * 10, 50)} rod bonus` : ''} stig
                    </span>
                  </>
                ) : (
                  '&#10007; Rangt'
                )}
              </div>

              <p className="text-gray-700 text-sm mt-2">
                {currentQ.explanationIs}
              </p>

              <div className="mt-3 bg-purple-50 p-3 rounded-lg">
                <p className="text-xs font-semibold text-purple-700">
                  Regla: {TREND_TYPE_INFO[currentQ.trendType].ruleIs}
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ljuka stigi' : 'Naesta spurning &rarr;'}
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="bg-white rounded-xl p-3 shadow">
            <div className="text-2xl font-bold text-purple-600">{streak}</div>
            <div className="text-xs text-gray-500">Rod</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow">
            <div className="text-2xl font-bold text-green-600">{totalCorrect}</div>
            <div className="text-xs text-gray-500">Rett</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow">
            <div className="text-2xl font-bold text-blue-600">
              {totalCorrect > 0 ? Math.round((totalCorrect / (currentIndex + (showResult ? 1 : 0))) * 100) : 0}%
            </div>
            <div className="text-xs text-gray-500">Naekvaemni</div>
          </div>
        </div>
      </div>
    </div>
  );
}
