import { useState, useEffect } from 'react';
import { Level1 } from './components/Level1';
import { Level2 } from './components/Level2';
import { Level3 } from './components/Level3';
import { storage } from './utils/storage';
import { useAchievements } from '@shared/hooks/useAchievements';
import { useGameI18n } from '@shared/hooks';
import { AchievementsButton, AchievementsPanel } from '@shared/components/AchievementsPanel';
import { AchievementNotificationsContainer } from '@shared/components/AchievementNotificationPopup';
import { LanguageSwitcher } from '@shared/components';
import { gameTranslations } from './i18n';
import './styles.css';

type Screen = 'menu' | 'level1' | 'level2' | 'level3';

interface Progress {
  level1Completed: boolean;
  level1Score: number;
  level2Completed: boolean;
  level2Score: number;
  level3Completed: boolean;
  level3Score: number;
  totalGamesPlayed: number;
}

const STORAGE_KEY = 'hlutfallsgreining-progress';

function getDefaultProgress(): Progress {
  return {
    level1Completed: false,
    level1Score: 0,
    level2Completed: false,
    level2Score: 0,
    level3Completed: false,
    level3Score: 0,
    totalGamesPlayed: 0,
  };
}

function App() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [progress, setProgress] = useState<Progress>(() =>
    storage.get<Progress>(STORAGE_KEY, getDefaultProgress())
  );
  const [showAchievements, setShowAchievements] = useState(false);
  const { t, language, setLanguage } = useGameI18n({ gameTranslations });

  const {
    achievements,
    allAchievements,
    notifications,
    trackCorrectAnswer,
    trackIncorrectAnswer,
    trackLevelComplete,
    trackGameComplete,
    dismissNotification,
    resetAll: resetAchievements,
  } = useAchievements({ gameId: 'hlutfallsgreining' });

  useEffect(() => {
    storage.set(STORAGE_KEY, progress);
  }, [progress]);

  const handleLevelComplete = (level: 1 | 2 | 3, score: number, maxScore: number) => {
    const levelKey = `level${level}Completed` as keyof Progress;
    const scoreKey = `level${level}Score` as keyof Progress;
    const wasCompleted = progress[levelKey];

    setProgress(prev => ({
      ...prev,
      [levelKey]: true,
      [scoreKey]: Math.max(prev[scoreKey] as number, score),
      totalGamesPlayed: prev.totalGamesPlayed + 1,
    }));

    trackLevelComplete(level, score, maxScore, {});

    // Check if all levels complete for game complete
    if (!wasCompleted) {
      const newCompleted = {
        ...progress,
        [levelKey]: true,
      };
      if (newCompleted.level1Completed && newCompleted.level2Completed && newCompleted.level3Completed) {
        trackGameComplete();
      }
    }

    setScreen('menu');
  };

  const resetProgress = () => {
    const newProgress = getDefaultProgress();
    setProgress(newProgress);
    storage.set(STORAGE_KEY, newProgress);
  };

  // Level screens
  if (screen === 'level1') {
    return (
      <>
        <Level1
          onComplete={(score, maxScore) => handleLevelComplete(1, score, maxScore)}
          onBack={() => setScreen('menu')}
          onCorrectAnswer={trackCorrectAnswer}
          onIncorrectAnswer={trackIncorrectAnswer}
          t={t}
          language={language}
        />
        <AchievementNotificationsContainer
          notifications={notifications}
          onDismiss={dismissNotification}
        />
      </>
    );
  }

  if (screen === 'level2') {
    return (
      <>
        <Level2
          onComplete={(score, maxScore) => handleLevelComplete(2, score, maxScore)}
          onBack={() => setScreen('menu')}
          onCorrectAnswer={trackCorrectAnswer}
          onIncorrectAnswer={trackIncorrectAnswer}
          t={t}
          language={language}
        />
        <AchievementNotificationsContainer
          notifications={notifications}
          onDismiss={dismissNotification}
        />
      </>
    );
  }

  if (screen === 'level3') {
    return (
      <>
        <Level3
          onComplete={(score, maxScore) => handleLevelComplete(3, score, maxScore)}
          onBack={() => setScreen('menu')}
          onCorrectAnswer={trackCorrectAnswer}
          onIncorrectAnswer={trackIncorrectAnswer}
          t={t}
          language={language}
        />
        <AchievementNotificationsContainer
          notifications={notifications}
          onDismiss={dismissNotification}
        />
      </>
    );
  }

  // Main Menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <LanguageSwitcher
              language={language}
              onLanguageChange={setLanguage}
              variant="compact"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
                {t('game.title', 'Hlutfallsgreining')}
              </h1>
              <p className="text-center text-gray-600">
                {t('game.description', 'Lærðu um prósentusamsetningu og reynslujöfnur')}
              </p>
            </div>
            <AchievementsButton
              achievements={achievements}
              onClick={() => setShowAchievements(true)}
            />
          </div>

          <div className="space-y-4">
            {/* Level 1 */}
            <button
              onClick={() => setScreen('level1')}
              className="w-full bg-white border-2 border-green-200 hover:border-green-400 hover:bg-green-50 rounded-xl p-6 text-left transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {t('levels.level', 'Stig')} 1
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">
                      {t('level1.title', 'Prósentusamsetning')}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {t('level1.description', 'Reiknaðu massaprósentu hvers frumefnis')}
                  </p>
                </div>
                <div className="text-right">
                  {progress.level1Completed ? (
                    <div className="text-green-600">
                      <div className="text-2xl font-bold">{progress.level1Score}</div>
                      <div className="text-xs">{t('common.points', 'stig')} - {t('common.completed', 'Lokið')}</div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-3xl">→</div>
                  )}
                </div>
              </div>
            </button>

            {/* Level 2 */}
            <button
              onClick={() => progress.level1Completed && setScreen('level2')}
              className={`w-full bg-white border-2 rounded-xl p-6 text-left transition-all ${
                progress.level1Completed
                  ? 'border-blue-200 hover:border-blue-400 hover:bg-blue-50'
                  : 'border-gray-200 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-white text-sm font-bold px-3 py-1 rounded-full ${
                        progress.level1Completed ? 'bg-blue-500' : 'bg-gray-400'
                      }`}
                    >
                      {t('levels.level', 'Stig')} 2
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">
                      {t('level2.title', 'Reynslujafna')}
                    </h3>
                    {!progress.level1Completed && (
                      <span className="text-xs text-gray-500">
                        ({t('levels.completePrevious', 'Ljúktu stigi 1 fyrst')})
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {t('level2.description', 'Finndu reynslujöfnu út frá prósentusamsetningu')}
                  </p>
                </div>
                <div className="text-right">
                  {progress.level2Completed ? (
                    <div className="text-green-600">
                      <div className="text-2xl font-bold">{progress.level2Score}</div>
                      <div className="text-xs">{t('common.points', 'stig')} - {t('common.completed', 'Lokið')}</div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-3xl">→</div>
                  )}
                </div>
              </div>
            </button>

            {/* Level 3 */}
            <button
              onClick={() => progress.level2Completed && setScreen('level3')}
              className={`w-full bg-white border-2 rounded-xl p-6 text-left transition-all ${
                progress.level2Completed
                  ? 'border-purple-200 hover:border-purple-400 hover:bg-purple-50'
                  : 'border-gray-200 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-white text-sm font-bold px-3 py-1 rounded-full ${
                        progress.level2Completed ? 'bg-purple-500' : 'bg-gray-400'
                      }`}
                    >
                      {t('levels.level', 'Stig')} 3
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">
                      {t('level3.title', 'Sameindajafna')}
                    </h3>
                    {!progress.level2Completed && (
                      <span className="text-xs text-gray-500">
                        ({t('levels.completePrevious', 'Ljúktu stigi 2 fyrst')})
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {t('level3.description', 'Finndu sameindajöfnu út frá reynslujöfnu og mólmassa')}
                  </p>
                </div>
                <div className="text-right">
                  {progress.level3Completed ? (
                    <div className="text-green-600">
                      <div className="text-2xl font-bold">{progress.level3Score}</div>
                      <div className="text-xs">{t('common.points', 'stig')} - {t('common.completed', 'Lokið')}</div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-3xl">→</div>
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Progress Summary */}
        {progress.totalGamesPlayed > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">
                {t('menu.progress', 'Framvinda')}
              </h3>
              <button
                onClick={resetProgress}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                {t('menu.reset', 'Endurstilla')}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">
                  {[progress.level1Completed, progress.level2Completed, progress.level3Completed].filter(Boolean).length}/3
                </div>
                <div className="text-xs text-gray-600">
                  {t('menu.levelsCompleted', 'Stig lokið')}
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">
                  {progress.level1Score + progress.level2Score + progress.level3Score}
                </div>
                <div className="text-xs text-gray-600">
                  {t('menu.totalScore', 'Heildar stig')}
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-600">
                  {progress.totalGamesPlayed}
                </div>
                <div className="text-xs text-gray-600">
                  {t('menu.gamesPlayed', 'Leikir spilaðir')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* What you'll learn */}
        <div className="bg-green-50 rounded-xl p-6 mt-6">
          <h3 className="font-bold text-green-800 mb-3">
            {t('menu.whatYouLearn', 'Hvað lærir þú?')}
          </h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>{t('menu.learn1', 'Reikna massaprósentu frumefna í efnasamböndum')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>{t('menu.learn2', 'Finna reynslujöfnu út frá prósentusamsetningu')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>{t('menu.learn3', 'Ákvarða sameindajöfnu út frá reynslujöfnu og mólmassa')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>{t('menu.learn4', 'Skilja tengsl milli reynslu- og sameindajöfnu')}</span>
            </li>
          </ul>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <a
            href="/games/1-ar/"
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            ← {t('menu.backToGames', 'Til baka í leikjayfirlit')}
          </a>
        </div>
      </div>

      {/* Achievements Panel Modal */}
      {showAchievements && (
        <AchievementsPanel
          achievements={achievements}
          allAchievements={allAchievements}
          onClose={() => setShowAchievements(false)}
          onReset={resetAchievements}
        />
      )}

      {/* Achievement Notifications */}
      <AchievementNotificationsContainer
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </div>
  );
}

export default App;
