import { useState, useCallback, useMemo } from 'react';
import {
  ACTIVITY_SERIES,
  getActivitySeriesQuestions,
  Metal,
} from '../data/activitySeries';
import { useGameI18n } from '@shared/hooks/useGameI18n';
import { gameTranslations } from '../i18n';

interface Level5Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

type Phase = 'learn' | 'quiz';

export function Level5({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level5Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const { t, language } = useGameI18n({ gameTranslations });

  const questions = useMemo(() => getActivitySeriesQuestions(12), []);
  const currentItem = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;
  const maxScore = questions.length * 100;

  const handleAnswer = useCallback((willReact: boolean) => {
    if (showResult) return;

    setSelectedAnswer(willReact);
    const correct = willReact === currentItem.willReact;
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

  const getMetalName = (metal: Metal): string => {
    switch (language) {
      case 'en': return metal.nameEn;
      case 'pl': return metal.namePl;
      default: return metal.name;
    }
  };

  // Find position of metals in activity series
  const findMetal = (symbol: string): Metal | undefined =>
    ACTIVITY_SERIES.find(m => m.symbol === symbol);

  // Learning Phase
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <span>←</span> {t('gameplay.back') || 'Til baka'}
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-teal-700">
                {t('levels.level5.name')}
              </h1>
              <div></div>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-teal-700 mb-4">
              {t('level5.intro.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('level5.intro.description')}
            </p>

            <div className="bg-teal-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-teal-800">
                <strong>{t('level5.intro.rule')}:</strong> {t('level5.intro.ruleText')}
              </p>
            </div>

            {/* Activity Series Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-teal-100">
                    <th className="p-2 text-left">{t('level5.table.rank')}</th>
                    <th className="p-2 text-left">{t('level5.table.symbol')}</th>
                    <th className="p-2 text-left">{t('level5.table.name')}</th>
                    <th className="p-2 text-center">{t('level5.table.displaceH')}</th>
                    <th className="p-2 text-center">{t('level5.table.reactivity')}</th>
                  </tr>
                </thead>
                <tbody>
                  {ACTIVITY_SERIES.map((metal, idx) => (
                    <tr
                      key={metal.symbol}
                      className={`border-b ${metal.symbol === 'H' ? 'bg-yellow-100 font-bold' : idx < 6 ? 'bg-red-50' : idx < 12 ? 'bg-orange-50' : 'bg-green-50'}`}
                    >
                      <td className="p-2">{metal.position}</td>
                      <td className="p-2 font-mono font-bold">{metal.symbol}</td>
                      <td className="p-2">{getMetalName(metal)}</td>
                      <td className="p-2 text-center">
                        {metal.canDisplaceH ? '✓' : '✗'}
                      </td>
                      <td className="p-2 text-center">
                        {metal.position <= 5 ? '🔥🔥🔥' :
                         metal.position <= 8 ? '🔥🔥' :
                         metal.position <= 12 ? '🔥' : '❄️'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-center">
              <div className="bg-red-100 p-2 rounded">{t('level5.legend.veryReactive')}</div>
              <div className="bg-orange-100 p-2 rounded">{t('level5.legend.moderateReactive')}</div>
              <div className="bg-green-100 p-2 rounded">{t('level5.legend.leastReactive')}</div>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="font-bold text-teal-700 mb-4">{t('level5.examples.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                <div className="font-mono text-lg mb-2">Zn + CuSO₄ → ZnSO₄ + Cu</div>
                <p className="text-sm text-gray-600">
                  ✓ {t('level5.examples.reacts')} - Zn ({t('level5.examples.position')} 8) &gt; Cu ({t('level5.examples.position')} 14)
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
                <div className="font-mono text-lg mb-2">Cu + ZnSO₄ → NR</div>
                <p className="text-sm text-gray-600">
                  ✗ {t('level5.examples.noReaction')} - Cu ({t('level5.examples.position')} 14) &lt; Zn ({t('level5.examples.position')} 8)
                </p>
              </div>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              {t('gameplay.startQuiz')} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phase
  const metalAdded = findMetal(currentItem.metalAdded);
  const metalInSol = findMetal(currentItem.metalInSolution);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setPhase('learn')}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <span>←</span> {t('gameplay.back') || 'Til baka'}
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-teal-700">{t('levels.level5.name')}</h1>
              {streak > 1 && (
                <div className="text-sm text-orange-500 font-bold">🔥 {streak} {t('gameplay.inARow') || 'í röð'}!</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-teal-600">{score} {t('gameplay.score') || 'stig'}</div>
              <div className="text-xs text-gray-500">{currentIndex + 1} / {questions.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
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
              {currentItem.difficulty === 'easy' ? (t('difficulty.easy') || 'Auðvelt') :
               currentItem.difficulty === 'medium' ? (t('difficulty.medium') || 'Miðlungs') :
               (t('difficulty.hard') || 'Erfitt')}
            </span>
          </div>

          {/* Visual representation */}
          <div className="bg-gray-100 rounded-xl p-5 mb-4">
            <div className="flex items-center justify-center gap-4 text-xl">
              <div className="text-center">
                <div className="text-4xl mb-1 font-mono font-bold text-teal-700">{currentItem.metalAdded}</div>
                <div className="text-sm text-gray-500">{t('level5.quiz.metalAdded')}</div>
              </div>
              <div className="text-2xl text-gray-400">+</div>
              <div className="text-center">
                <div className="text-2xl font-mono">{currentItem.solution}</div>
                <div className="text-sm text-gray-500">{t('level5.quiz.solution')}</div>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="text-4xl">❓</div>
            </div>
          </div>

          {/* Question */}
          <p className="text-center text-lg font-medium text-gray-700 mb-4">
            {t('level5.question')}
          </p>

          {/* Hint button */}
          {!showResult && !showHint && (
            <button
              onClick={handleHint}
              className="text-sm text-teal-600 hover:text-teal-700 mb-4 block mx-auto"
            >
              💡 {t('gameplay.showHint') || 'Sýna vísbendingu'} (-50 stig)
            </button>
          )}

          {/* Hint display - show positions in activity series */}
          {showHint && !showResult && metalAdded && metalInSol && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
              <div className="flex justify-around items-center">
                <div className="text-center">
                  <div className="font-mono font-bold text-lg">{currentItem.metalAdded}</div>
                  <div className="text-sm text-gray-600">{t('level5.table.rank')}: {metalAdded.position}</div>
                </div>
                <div className="text-gray-400">vs</div>
                <div className="text-center">
                  <div className="font-mono font-bold text-lg">{currentItem.metalInSolution}</div>
                  <div className="text-sm text-gray-600">{t('level5.table.rank')}: {metalInSol.position}</div>
                </div>
              </div>
              <p className="text-xs text-center text-gray-500 mt-2">
                {t('level5.hint.lowerNumberMoreReactive')}
              </p>
            </div>
          )}

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(true)}
              disabled={showResult}
              className={`p-6 rounded-xl border-2 transition-all ${
                showResult
                  ? currentItem.willReact
                    ? 'border-green-500 bg-green-100 scale-105'
                    : selectedAnswer === true
                      ? 'border-red-500 bg-red-100'
                      : 'border-gray-200 opacity-40'
                  : 'border-gray-200 hover:border-green-400 hover:bg-green-50'
              }`}
            >
              <div className="text-4xl mb-2 text-center">✓</div>
              <div className="font-bold text-center text-green-700">
                {t('level5.answer.yes')}
              </div>
              <div className="text-xs text-center text-gray-500 mt-1">
                {t('level5.answer.reactionOccurs')}
              </div>
            </button>

            <button
              onClick={() => handleAnswer(false)}
              disabled={showResult}
              className={`p-6 rounded-xl border-2 transition-all ${
                showResult
                  ? !currentItem.willReact
                    ? 'border-green-500 bg-green-100 scale-105'
                    : selectedAnswer === false
                      ? 'border-red-500 bg-red-100'
                      : 'border-gray-200 opacity-40'
                  : 'border-gray-200 hover:border-red-400 hover:bg-red-50'
              }`}
            >
              <div className="text-4xl mb-2 text-center">✗</div>
              <div className="font-bold text-center text-red-700">
                {t('level5.answer.no')}
              </div>
              <div className="text-xs text-center text-gray-500 mt-1">
                {t('level5.answer.noReaction')}
              </div>
            </button>
          </div>
        </div>

        {/* Result */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-xl mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? (
                  <>
                    ✓ {t('gameplay.correct') || 'Rétt'}!
                    <span className="ml-2 text-sm font-normal">
                      +{showHint ? 50 : 100}{streak > 0 && !showHint ? ` +${Math.min(streak * 10, 50)} ` + (t('gameplay.streakBonus') || 'röð bónus') : ''} {t('gameplay.points') || 'stig'}
                    </span>
                  </>
                ) : (
                  `✗ ${t('gameplay.incorrect') || 'Rangt'}`
                )}
              </div>

              {/* Show equation */}
              <div className="bg-white rounded-lg p-3 font-mono text-center text-lg mt-3">
                {currentItem.equation}
              </div>

              <p className="text-sm text-gray-600 mt-3">
                {language === 'en' ? currentItem.explanationEn : currentItem.explanation}
              </p>

              {metalAdded && metalInSol && (
                <div className="mt-3 flex justify-center gap-8 text-sm">
                  <div className="text-center">
                    <div className="font-mono font-bold">{currentItem.metalAdded}</div>
                    <div className="text-gray-500">{t('level5.table.rank')}: {metalAdded.position}</div>
                  </div>
                  <div className="text-gray-400 self-center">
                    {metalAdded.position < metalInSol.position ? '>' : '<'}
                  </div>
                  <div className="text-center">
                    <div className="font-mono font-bold">{currentItem.metalInSolution}</div>
                    <div className="text-gray-500">{t('level5.table.rank')}: {metalInSol.position}</div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? (t('gameplay.finishLevel') || 'Ljúka stigi') : (t('gameplay.next') || 'Næsta spurning') + ' →'}
            </button>
          </div>
        )}

        {/* Mini activity series reference */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">{t('level5.miniTable')}:</h3>
          <div className="flex flex-wrap gap-2 justify-center text-xs font-mono">
            {ACTIVITY_SERIES.slice(0, 14).map((metal, idx) => (
              <span
                key={metal.symbol}
                className={`px-2 py-1 rounded ${
                  metal.symbol === 'H' ? 'bg-yellow-200 font-bold' :
                  idx < 6 ? 'bg-red-100' :
                  idx < 12 ? 'bg-orange-100' : 'bg-green-100'
                }`}
              >
                {metal.symbol}
              </span>
            ))}
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">
            ← {t('level5.miniTableMore')} | {t('level5.miniTableLess')} →
          </p>
        </div>
      </div>
    </div>
  );
}
