import { useState, useCallback, useMemo } from 'react';
import {
  DRIVING_FORCE_INFO,
  SOLUBILITY_RULES,
  getDrivingForceQuestions,
  DrivingForce,
} from '../data/drivingForces';
import { useGameI18n } from '@shared/hooks/useGameI18n';
import { gameTranslations } from '../i18n';

interface Level4Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

type Phase = 'learn' | 'quiz';

export function Level4({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level4Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<DrivingForce | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const { t, language } = useGameI18n({ gameTranslations });

  const questions = useMemo(() => getDrivingForceQuestions(12), []);
  const currentItem = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;
  const maxScore = questions.length * 100;

  const drivingForces: DrivingForce[] = ['precipitate', 'gas', 'water', 'none'];

  const handleAnswer = useCallback((force: DrivingForce) => {
    if (showResult) return;

    setSelectedAnswer(force);
    const correct = force === currentItem.drivingForce;
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

  const solubilityRules = SOLUBILITY_RULES[language as keyof typeof SOLUBILITY_RULES] || SOLUBILITY_RULES.en;

  // Learning Phase
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <span>←</span> {t('gameplay.back') || 'Til baka'}
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-indigo-700">
                {t('levels.level4.name')}
              </h1>
              <div></div>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-indigo-700 mb-4">
              {t('level4.intro.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('level4.intro.description')}
            </p>

            {/* Three driving forces */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {(['precipitate', 'gas', 'water'] as const).map(force => (
                <div
                  key={force}
                  className="p-4 rounded-xl border-2"
                  style={{
                    borderColor: DRIVING_FORCE_INFO[force].color,
                    backgroundColor: `${DRIVING_FORCE_INFO[force].color}10`,
                  }}
                >
                  <div className="text-3xl mb-2 text-center">{DRIVING_FORCE_INFO[force].emoji}</div>
                  <h3
                    className="font-bold text-center mb-2"
                    style={{ color: DRIVING_FORCE_INFO[force].color }}
                  >
                    {language === 'is' ? DRIVING_FORCE_INFO[force].name :
                     language === 'pl' ? DRIVING_FORCE_INFO[force].namePl :
                     DRIVING_FORCE_INFO[force].nameEn}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {language === 'is' ? DRIVING_FORCE_INFO[force].description :
                     language === 'pl' ? DRIVING_FORCE_INFO[force].descriptionPl :
                     DRIVING_FORCE_INFO[force].descriptionEn}
                  </p>
                  <div className="text-center mt-2 font-mono text-lg" style={{ color: DRIVING_FORCE_INFO[force].color }}>
                    {DRIVING_FORCE_INFO[force].symbol}
                  </div>
                </div>
              ))}
            </div>

            {/* No reaction case */}
            <div
              className="p-4 rounded-xl border-2 mb-6"
              style={{
                borderColor: DRIVING_FORCE_INFO.none.color,
                backgroundColor: `${DRIVING_FORCE_INFO.none.color}10`,
              }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{DRIVING_FORCE_INFO.none.emoji}</span>
                <div>
                  <h3 className="font-bold" style={{ color: DRIVING_FORCE_INFO.none.color }}>
                    {language === 'is' ? DRIVING_FORCE_INFO.none.name :
                     language === 'pl' ? DRIVING_FORCE_INFO.none.namePl :
                     DRIVING_FORCE_INFO.none.nameEn}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'is' ? DRIVING_FORCE_INFO.none.description :
                     language === 'pl' ? DRIVING_FORCE_INFO.none.descriptionPl :
                     DRIVING_FORCE_INFO.none.descriptionEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Solubility Rules */}
            <details className="bg-indigo-50 rounded-xl p-4">
              <summary className="font-semibold text-indigo-700 cursor-pointer">
                {t('level4.solubilityRules')}
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {solubilityRules.map((rule, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-indigo-500">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              {t('gameplay.startQuiz')} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
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
              <h1 className="text-xl font-bold text-indigo-700">{t('levels.level4.name')}</h1>
              {streak > 1 && (
                <div className="text-sm text-orange-500 font-bold">🔥 {streak} {t('gameplay.inARow') || 'í röð'}!</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-indigo-600">{score} {t('gameplay.score') || 'stig'}</div>
              <div className="text-xs text-gray-500">{currentIndex + 1} / {questions.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
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

          {/* Reactants */}
          <div className="bg-gray-100 rounded-xl p-5 mb-4">
            <div className="font-mono text-xl md:text-2xl text-center text-gray-800">
              {currentItem.reactants}
            </div>
          </div>

          {/* Question */}
          <p className="text-center text-lg font-medium text-gray-700 mb-4">
            {t('level4.question')}
          </p>

          {/* Hint button */}
          {!showResult && !showHint && (
            <button
              onClick={handleHint}
              className="text-sm text-indigo-600 hover:text-indigo-700 mb-4 block mx-auto"
            >
              💡 {t('gameplay.showHint') || 'Sýna vísbendingu'} (-50 stig)
            </button>
          )}

          {/* Hint display */}
          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-center">
              💡 {t('level4.hintText')}
            </div>
          )}

          {/* Answer options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {drivingForces.map(force => (
              <button
                key={force}
                onClick={() => handleAnswer(force)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 transition-all ${
                  showResult
                    ? force === currentItem.drivingForce
                      ? 'border-green-500 bg-green-100 scale-105'
                      : selectedAnswer === force
                        ? 'border-red-500 bg-red-100'
                        : 'border-gray-200 opacity-40'
                    : 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50'
                }`}
              >
                <div className="text-3xl mb-2 text-center">{DRIVING_FORCE_INFO[force].emoji}</div>
                <div
                  className="font-bold text-sm text-center"
                  style={{ color: DRIVING_FORCE_INFO[force].color }}
                >
                  {language === 'is' ? DRIVING_FORCE_INFO[force].name :
                   language === 'pl' ? DRIVING_FORCE_INFO[force].namePl :
                   DRIVING_FORCE_INFO[force].nameEn}
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
                    ✓ {t('gameplay.correct') || 'Rétt'}!
                    <span className="ml-2 text-sm font-normal">
                      +{showHint ? 50 : 100}{streak > 0 && !showHint ? ` +${Math.min(streak * 10, 50)} ` + (t('gameplay.streakBonus') || 'röð bónus') : ''} {t('gameplay.points') || 'stig'}
                    </span>
                  </>
                ) : (
                  `✗ ${t('gameplay.incorrect') || 'Rangt'}`
                )}
              </div>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-3xl">{DRIVING_FORCE_INFO[currentItem.drivingForce].emoji}</span>
                <div>
                  <span className="font-semibold" style={{ color: DRIVING_FORCE_INFO[currentItem.drivingForce].color }}>
                    {language === 'is' ? DRIVING_FORCE_INFO[currentItem.drivingForce].name :
                     language === 'pl' ? DRIVING_FORCE_INFO[currentItem.drivingForce].namePl :
                     DRIVING_FORCE_INFO[currentItem.drivingForce].nameEn}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === 'en' ? currentItem.explanationEn : currentItem.explanation}
                  </p>
                </div>
              </div>

              {/* Show equation if reaction occurs */}
              {currentItem.drivingForce !== 'none' && (
                <div className="mt-3 bg-white rounded-lg p-3 font-mono text-center">
                  {currentItem.equation}
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? (t('gameplay.finishLevel') || 'Ljúka stigi') : (t('gameplay.next') || 'Næsta spurning') + ' →'}
            </button>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">{t('level4.drivingForces') || 'Drifkraftar'}:</h3>
          <div className="grid grid-cols-4 gap-2 text-xs text-center">
            {drivingForces.map(force => (
              <div key={force} className="flex flex-col items-center">
                <span className="text-lg">{DRIVING_FORCE_INFO[force].emoji}</span>
                <span className="text-gray-500">
                  {language === 'is' ? DRIVING_FORCE_INFO[force].name :
                   language === 'pl' ? DRIVING_FORCE_INFO[force].namePl :
                   DRIVING_FORCE_INFO[force].nameEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
