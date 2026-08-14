import { useState, useEffect } from 'react';
import { useGameI18n } from '@shared/hooks/useGameI18n';
import { useAchievements } from '@shared/hooks/useAchievements';
import { LanguageSwitcher, AchievementNotificationsContainer } from '@shared/components';
import { gameTranslations } from './i18n';
import { Level1 } from './components/Level1';
import { Level2 } from './components/Level2';
import { Level3 } from './components/Level3';
import { Level4 } from './components/Level4';
import { Level5 } from './components/Level5';

type Screen = 'menu' | 'level1' | 'level2' | 'level3' | 'level4' | 'level5' | 'complete';

interface LevelScores {
  [key: string]: { score: number; maxScore: number; completed: boolean };
}

function App() {
  const { t, language, setLanguage } = useGameI18n({ gameTranslations });
  const {
    notifications,
    dismissNotification,
    trackLevelComplete,
    trackGameComplete,
  } = useAchievements({
    gameId: 'markverdir-tolustafir',
  });

  const [screen, setScreen] = useState<Screen>('menu');
  const [levelScores, setLevelScores] = useState<LevelScores>(() => {
    const saved = localStorage.getItem('sigfigs-levels');
    return saved ? JSON.parse(saved) : {};
  });

  // Save level scores
  useEffect(() => {
    localStorage.setItem('sigfigs-levels', JSON.stringify(levelScores));
  }, [levelScores]);

  const getTotalScore = () => {
    return Object.values(levelScores).reduce((sum, l) => sum + (l.score || 0), 0);
  };

  const getCompletedLevels = () => {
    return Object.values(levelScores).filter(l => l.completed).length;
  };

  const resetProgress = () => {
    setLevelScores({});
    localStorage.removeItem('sigfigs-levels');
  };

  const isLevelUnlocked = (level: number) => {
    if (level === 1) return true;
    const prevKey = `level${level - 1}`;
    return levelScores[prevKey]?.completed && (levelScores[prevKey]?.score || 0) >= 500;
  };

  const handleLevelComplete = (level: 1 | 2 | 3 | 4 | 5, score: number, maxScore: number) => {
    const key = `level${level}`;
    setLevelScores(prev => ({
      ...prev,
      [key]: { score, maxScore, completed: true },
    }));

    // Track level completion for achievements
    trackLevelComplete(level, score, maxScore, {});

    // Check if all levels completed
    const allCompleted = level === 5 &&
      levelScores.level1?.completed &&
      levelScores.level2?.completed &&
      levelScores.level3?.completed &&
      levelScores.level4?.completed;

    if (allCompleted) {
      trackGameComplete();
      setScreen('complete');
    } else {
      setScreen('menu');
    }
  };

  // Level Components
  if (screen === 'level1') {
    return (
      <Level1
        onComplete={(score, maxScore) => handleLevelComplete(1, score, maxScore)}
        onBack={() => setScreen('menu')}
      />
    );
  }

  if (screen === 'level2') {
    return (
      <Level2
        onComplete={(score, maxScore) => handleLevelComplete(2, score, maxScore)}
        onBack={() => setScreen('menu')}
      />
    );
  }

  if (screen === 'level3') {
    return (
      <Level3
        onComplete={(score, maxScore) => handleLevelComplete(3, score, maxScore)}
        onBack={() => setScreen('menu')}
      />
    );
  }

  if (screen === 'level4') {
    return (
      <Level4
        onComplete={(score, maxScore) => handleLevelComplete(4, score, maxScore)}
        onBack={() => setScreen('menu')}
      />
    );
  }

  if (screen === 'level5') {
    return (
      <Level5
        onComplete={(score, maxScore) => handleLevelComplete(5, score, maxScore)}
        onBack={() => setScreen('menu')}
      />
    );
  }

  // Completion Screen
  if (screen === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('completion.title')}</h1>
          <p className="text-gray-600 mb-6">{t('completion.completedAll')}</p>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6 mb-6">
            <div className="text-sm text-gray-600 mb-1">{t('completion.totalScore')}</div>
            <div className="text-4xl font-bold text-indigo-600">{getTotalScore()} stig</div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
            <h3 className="font-bold text-gray-700 mb-3">{t('completion.whatYouLearned')}</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                {t('completion.summary1')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                {t('completion.summary2')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                {t('completion.summary3')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                {t('completion.summary4')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                {t('completion.summary5')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                {t('completion.summary6')}
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setScreen('menu')}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-xl transition-colors"
            >
              {t('completion.back')}
            </button>
            <button
              onClick={() => {
                resetProgress();
                setScreen('menu');
              }}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              {t('completion.startOver')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Menu Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">
                {t('game.title')}
              </h1>
              <p className="text-gray-600">{t('game.subtitle')}</p>
            </div>
            <LanguageSwitcher
              language={language}
              onLanguageChange={setLanguage}
              variant="dropdown"
            />
          </div>

          {/* How it works */}
          <div className="bg-indigo-50 rounded-xl p-4">
            <h3 className="font-semibold text-indigo-700 mb-1">{t('menu.howItWorks')}</h3>
            <p className="text-gray-600 text-sm">{t('menu.howItWorksDesc')}</p>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-700">{t('menu.progress')}</h2>
            {getCompletedLevels() > 0 && (
              <button
                onClick={resetProgress}
                className="text-sm text-red-500 hover:text-red-700"
              >
                {t('menu.reset')}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-indigo-600">{getCompletedLevels()}/5</div>
              <div className="text-sm text-gray-500">{t('menu.levelsCompleted')}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-indigo-600">{getTotalScore()}</div>
              <div className="text-sm text-gray-500">{t('menu.totalPoints')}</div>
            </div>
          </div>
        </div>

        {/* Levels */}
        <div className="space-y-4">
          {/* Level 1 */}
          <button
            onClick={() => setScreen('level1')}
            className="w-full bg-white rounded-2xl shadow-xl p-6 text-left hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🔢</span>
                  <h3 className="text-xl font-bold text-gray-800">{t('levels.level1.name')}</h3>
                </div>
                <p className="text-gray-600">{t('levels.level1.description')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('levels.level1.details')}</p>
              </div>
              <div className="text-right">
                {levelScores.level1?.completed ? (
                  <>
                    <div className="text-green-600 font-bold">{t('levels.completed')}</div>
                    <div className="text-lg text-indigo-600">{levelScores.level1.score} {t('levels.points')}</div>
                  </>
                ) : (
                  <span className="text-indigo-500 text-2xl">→</span>
                )}
              </div>
            </div>
            {!levelScores.level1?.completed && (
              <div className="mt-3 text-sm text-amber-600">
                {t('levels.level1.needScore').replace('{score}', '500')}
              </div>
            )}
          </button>

          {/* Level 2 */}
          <button
            onClick={() => isLevelUnlocked(2) && setScreen('level2')}
            disabled={!isLevelUnlocked(2)}
            className={`w-full bg-white rounded-2xl shadow-xl p-6 text-left transition-all border-2 border-transparent ${
              isLevelUnlocked(2)
                ? 'hover:shadow-2xl hover:border-green-300'
                : 'opacity-60 cursor-not-allowed'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🧮</span>
                  <h3 className="text-xl font-bold text-gray-800">{t('levels.level2.name')}</h3>
                  {!isLevelUnlocked(2) && <span className="text-gray-400">🔒</span>}
                </div>
                <p className="text-gray-600">{t('levels.level2.description')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('levels.level2.details')}</p>
              </div>
              <div className="text-right">
                {levelScores.level2?.completed ? (
                  <>
                    <div className="text-green-600 font-bold">{t('levels.completed')}</div>
                    <div className="text-lg text-indigo-600">{levelScores.level2.score} {t('levels.points')}</div>
                  </>
                ) : isLevelUnlocked(2) ? (
                  <span className="text-teal-500 text-2xl">→</span>
                ) : (
                  <span className="text-gray-400">{t('levels.level2.locked')}</span>
                )}
              </div>
            </div>
            {!levelScores.level2?.completed && isLevelUnlocked(2) && (
              <div className="mt-3 text-sm text-amber-600">
                {t('levels.level2.needScore').replace('{score}', '500')}
              </div>
            )}
          </button>

          {/* Level 3 */}
          <button
            onClick={() => isLevelUnlocked(3) && setScreen('level3')}
            disabled={!isLevelUnlocked(3)}
            className={`w-full bg-white rounded-2xl shadow-xl p-6 text-left transition-all border-2 border-transparent ${
              isLevelUnlocked(3)
                ? 'hover:shadow-2xl hover:border-purple-300'
                : 'opacity-60 cursor-not-allowed'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🔬</span>
                  <h3 className="text-xl font-bold text-gray-800">{t('levels.level3.name')}</h3>
                  {!isLevelUnlocked(3) && <span className="text-gray-400">🔒</span>}
                </div>
                <p className="text-gray-600">{t('levels.level3.description')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('levels.level3.details')}</p>
              </div>
              <div className="text-right">
                {levelScores.level3?.completed ? (
                  <>
                    <div className="text-green-600 font-bold">{t('levels.completed')}</div>
                    <div className="text-lg text-indigo-600">{levelScores.level3.score} {t('levels.points')}</div>
                  </>
                ) : isLevelUnlocked(3) ? (
                  <span className="text-purple-500 text-2xl">→</span>
                ) : (
                  <span className="text-gray-400">{t('levels.level3.locked')}</span>
                )}
              </div>
            </div>
            {!levelScores.level3?.completed && isLevelUnlocked(3) && (
              <div className="mt-3 text-sm text-amber-600">
                {t('levels.level3.needScore').replace('{score}', '500')}
              </div>
            )}
          </button>

          {/* Level 4 */}
          <button
            onClick={() => isLevelUnlocked(4) && setScreen('level4')}
            disabled={!isLevelUnlocked(4)}
            className={`w-full bg-white rounded-2xl shadow-xl p-6 text-left transition-all border-2 border-transparent ${
              isLevelUnlocked(4)
                ? 'hover:shadow-2xl hover:border-cyan-300'
                : 'opacity-60 cursor-not-allowed'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🧪</span>
                  <h3 className="text-xl font-bold text-gray-800">{t('levels.level4.name')}</h3>
                  {!isLevelUnlocked(4) && <span className="text-gray-400">🔒</span>}
                </div>
                <p className="text-gray-600">{t('levels.level4.description')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('levels.level4.details')}</p>
              </div>
              <div className="text-right">
                {levelScores.level4?.completed ? (
                  <>
                    <div className="text-green-600 font-bold">{t('levels.completed')}</div>
                    <div className="text-lg text-indigo-600">{levelScores.level4.score} {t('levels.points')}</div>
                  </>
                ) : isLevelUnlocked(4) ? (
                  <span className="text-cyan-500 text-2xl">→</span>
                ) : (
                  <span className="text-gray-400">{t('levels.level4.locked')}</span>
                )}
              </div>
            </div>
            {!levelScores.level4?.completed && isLevelUnlocked(4) && (
              <div className="mt-3 text-sm text-amber-600">
                {t('levels.level4.needScore').replace('{score}', '500')}
              </div>
            )}
          </button>

          {/* Level 5 */}
          <button
            onClick={() => isLevelUnlocked(5) && setScreen('level5')}
            disabled={!isLevelUnlocked(5)}
            className={`w-full bg-white rounded-2xl shadow-xl p-6 text-left transition-all border-2 border-transparent ${
              isLevelUnlocked(5)
                ? 'hover:shadow-2xl hover:border-amber-300'
                : 'opacity-60 cursor-not-allowed'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🎯</span>
                  <h3 className="text-xl font-bold text-gray-800">{t('levels.level5.name')}</h3>
                  {!isLevelUnlocked(5) && <span className="text-gray-400">🔒</span>}
                </div>
                <p className="text-gray-600">{t('levels.level5.description')}</p>
                <p className="text-sm text-gray-500 mt-1">{t('levels.level5.details')}</p>
              </div>
              <div className="text-right">
                {levelScores.level5?.completed ? (
                  <>
                    <div className="text-green-600 font-bold">{t('levels.completed')}</div>
                    <div className="text-lg text-indigo-600">{levelScores.level5.score} {t('levels.points')}</div>
                  </>
                ) : isLevelUnlocked(5) ? (
                  <span className="text-amber-500 text-2xl">→</span>
                ) : (
                  <span className="text-gray-400">{t('levels.level5.locked')}</span>
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <a
            href="../index.html"
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            ← {t('menu.backToGames')}
          </a>
        </div>
      </div>

      {/* Achievement Notifications */}
      <AchievementNotificationsContainer
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </div>
  );
}

export default App;
