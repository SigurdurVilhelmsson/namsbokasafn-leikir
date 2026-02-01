import { useState, useEffect } from 'react';
import { Level1 } from './components/Level1';
import { Level2 } from './components/Level2';
import { Level3 } from './components/Level3';
import { Level4 } from './components/Level4';
import { FactoryMode } from './components/FactoryMode';
import { storage } from './utils/storage';
import { useAchievements } from '@shared/hooks/useAchievements';
import { useGameI18n } from '@shared/hooks';
import { AchievementsButton, AchievementsPanel } from '@shared/components/AchievementsPanel';
import { AchievementNotificationsContainer } from '@shared/components/AchievementNotificationPopup';
import { LanguageSwitcher } from '@shared/components';
import { gameTranslations } from './i18n';
import './styles.css';

type Screen = 'menu' | 'level1' | 'level2' | 'level3' | 'level4' | 'factory';

interface Progress {
  level1Completed: boolean;
  level1Score: number;
  level2Completed: boolean;
  level2Score: number;
  level3BestScore: number;
  level3BestAccuracy: number;
  level4Completed: boolean;
  level4Score: number;
  totalGamesPlayed: number;
  factoryBestScore: number;
  factoryBestProfit: number;
}

const STORAGE_KEY = 'takmarkandi-levels-progress';

function getDefaultProgress(): Progress {
  return {
    level1Completed: false,
    level1Score: 0,
    level2Completed: false,
    level2Score: 0,
    level3BestScore: 0,
    level3BestAccuracy: 0,
    level4Completed: false,
    level4Score: 0,
    totalGamesPlayed: 0,
    factoryBestScore: 0,
    factoryBestProfit: 0
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
  } = useAchievements({ gameId: 'takmarkandi' });

  useEffect(() => {
    storage.set(STORAGE_KEY, progress);
  }, [progress]);

  const handleLevel1Complete = (score: number, maxScore: number, hintsUsed: number) => {
    const wasLevel1Completed = progress.level1Completed;
    setProgress(prev => ({
      ...prev,
      level1Completed: true,
      level1Score: Math.max(prev.level1Score, score),
      totalGamesPlayed: prev.totalGamesPlayed + 1
    }));
    trackLevelComplete(1, score, maxScore, { hintsUsed });
    // Check if all levels are now complete
    if (!wasLevel1Completed && progress.level2Completed && progress.level3BestScore > 0) {
      trackGameComplete();
    }
    setScreen('menu');
  };

  const handleLevel2Complete = (score: number, maxScore: number, hintsUsed: number) => {
    const wasLevel2Completed = progress.level2Completed;
    setProgress(prev => ({
      ...prev,
      level2Completed: true,
      level2Score: Math.max(prev.level2Score, score),
      totalGamesPlayed: prev.totalGamesPlayed + 1
    }));
    trackLevelComplete(2, score, maxScore, { hintsUsed });
    // Check if all levels are now complete
    if (progress.level1Completed && !wasLevel2Completed && progress.level3BestScore > 0) {
      trackGameComplete();
    }
    setScreen('menu');
  };

  const handleLevel3Complete = (score: number, correct: number, total: number, maxScore: number, hintsUsed: number) => {
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const wasLevel3Played = progress.level3BestScore > 0;
    setProgress(prev => ({
      ...prev,
      level3BestScore: Math.max(prev.level3BestScore, score),
      level3BestAccuracy: Math.max(prev.level3BestAccuracy, accuracy),
      totalGamesPlayed: prev.totalGamesPlayed + 1
    }));
    trackLevelComplete(3, score, maxScore, { hintsUsed });
    // Check if all levels are now complete
    if (progress.level1Completed && progress.level2Completed && !wasLevel3Played) {
      trackGameComplete();
    }
    setScreen('menu');
  };

  const handleLevel4Complete = (score: number, _maxScore: number) => {
    const wasLevel4Completed = progress.level4Completed;
    setProgress(prev => ({
      ...prev,
      level4Completed: true,
      level4Score: Math.max(prev.level4Score, score),
      totalGamesPlayed: prev.totalGamesPlayed + 1
    }));
    // Level 4 is a bonus level, track as game stat instead
    // trackLevelComplete only supports levels 1-3
    // Check if all levels are now complete
    if (progress.level1Completed && progress.level2Completed && progress.level3BestScore > 0 && !wasLevel4Completed) {
      trackGameComplete();
    }
    setScreen('menu');
  };

  const handleFactoryComplete = (score: number, profit: number) => {
    setProgress(prev => ({
      ...prev,
      factoryBestScore: Math.max(prev.factoryBestScore, score),
      factoryBestProfit: Math.max(prev.factoryBestProfit, profit),
      totalGamesPlayed: prev.totalGamesPlayed + 1
    }));
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
          onComplete={handleLevel1Complete}
          onBack={() => setScreen('menu')}
          onCorrectAnswer={trackCorrectAnswer}
          onIncorrectAnswer={trackIncorrectAnswer}
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
          onComplete={handleLevel2Complete}
          onBack={() => setScreen('menu')}
          onCorrectAnswer={trackCorrectAnswer}
          onIncorrectAnswer={trackIncorrectAnswer}
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
          onComplete={handleLevel3Complete}
          onBack={() => setScreen('menu')}
          onCorrectAnswer={trackCorrectAnswer}
          onIncorrectAnswer={trackIncorrectAnswer}
        />
        <AchievementNotificationsContainer
          notifications={notifications}
          onDismiss={dismissNotification}
        />
      </>
    );
  }

  if (screen === 'level4') {
    return (
      <>
        <Level4
          onComplete={handleLevel4Complete}
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

  if (screen === 'factory') {
    return (
      <>
        <FactoryMode
          onComplete={handleFactoryComplete}
          onBack={() => setScreen('menu')}
        />
        <AchievementNotificationsContainer
          notifications={notifications}
          onDismiss={dismissNotification}
        />
      </>
    );
  }

  // Main Menu - Year 1: Orange/Amber theme
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <LanguageSwitcher
              language={language}
              onLanguageChange={setLanguage}
              variant="compact"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">{t('game.title', 'Takmarkandi Hvarfefni')}</h1>
              <p className="text-center text-gray-600">{t('game.description', 'Lærðu að finna takmarkandi hvarfefni og reikna heimtir')}</p>
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
              className="w-full bg-white border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 rounded-xl p-6 text-left transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      Stig 1
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">Grunnhugtök</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Skildu hugtökin sjónrænt - hvað eyðist fyrst?
                  </p>
                </div>
                <div className="text-right">
                  {progress.level1Completed ? (
                    <div className="text-green-600">
                      <div className="text-2xl font-bold">{progress.level1Score}</div>
                      <div className="text-xs">stig - Lokið</div>
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
                  ? 'border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50'
                  : 'border-gray-200 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-white text-sm font-bold px-3 py-1 rounded-full ${
                      progress.level1Completed ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}>
                      Stig 2
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">Leiðbeind æfing</h3>
                    {!progress.level1Completed && (
                      <span className="text-xs text-gray-500">(Ljúktu stigi 1 fyrst)</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Leystu verkefni skref fyrir skref með leiðsögn
                  </p>
                </div>
                <div className="text-right">
                  {progress.level2Completed ? (
                    <div className="text-green-600">
                      <div className="text-2xl font-bold">{progress.level2Score}</div>
                      <div className="text-xs">stig - Lokið</div>
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
                  ? 'border-red-200 hover:border-red-400 hover:bg-red-50'
                  : 'border-gray-200 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-white text-sm font-bold px-3 py-1 rounded-full ${
                      progress.level2Completed ? 'bg-red-500' : 'bg-gray-400'
                    }`}>
                      Stig 3
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">Meistarapróf</h3>
                    {!progress.level2Completed && (
                      <span className="text-xs text-gray-500">(Ljúktu stigi 2 fyrst)</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    Veldu erfiðleikastig og kepptu við tímann!
                  </p>
                </div>
                <div className="text-right">
                  {progress.level3BestScore > 0 ? (
                    <div className="text-green-600">
                      <div className="text-2xl font-bold">{progress.level3BestScore}</div>
                      <div className="text-xs">{progress.level3BestAccuracy}% nákvæmni</div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-3xl">→</div>
                  )}
                </div>
              </div>
            </button>

            {/* Level 4 - Percent Yield */}
            <button
              onClick={() => progress.level3BestScore > 0 && setScreen('level4')}
              className={`w-full bg-white border-2 rounded-xl p-6 text-left transition-all ${
                progress.level3BestScore > 0
                  ? 'border-purple-200 hover:border-purple-400 hover:bg-purple-50'
                  : 'border-gray-200 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-white text-sm font-bold px-3 py-1 rounded-full ${
                      progress.level3BestScore > 0 ? 'bg-purple-500' : 'bg-gray-400'
                    }`}>
                      Stig 4
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">{t('levels.level4.title', 'Prósentuheimta')}</h3>
                    {progress.level3BestScore === 0 && (
                      <span className="text-xs text-gray-500">({t('levels.level4.locked', 'Ljúktu stigi 3 fyrst')})</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {t('levels.level4.description', 'Reiknaðu prósentuheimtu efnahvarfa')}
                  </p>
                </div>
                <div className="text-right">
                  {progress.level4Completed ? (
                    <div className="text-green-600">
                      <div className="text-2xl font-bold">{progress.level4Score}</div>
                      <div className="text-xs">stig - Lokið</div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-3xl">→</div>
                  )}
                </div>
              </div>
            </button>

            {/* Factory Mode - Bonus game */}
            <button
              onClick={() => progress.level1Completed && setScreen('factory')}
              className={`w-full bg-gradient-to-r from-slate-700 to-slate-800 border-2 rounded-xl p-6 text-left transition-all ${
                progress.level1Completed
                  ? 'border-emerald-400 hover:border-emerald-300 hover:from-slate-600 hover:to-slate-700'
                  : 'border-gray-600 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-white text-sm font-bold px-3 py-1 rounded-full ${
                      progress.level1Completed ? 'bg-emerald-500' : 'bg-gray-500'
                    }`}>
                      🏭 Bónus
                    </span>
                    <h3 className="text-xl font-bold text-white">Verksmiðjuhamur</h3>
                    {!progress.level1Completed && (
                      <span className="text-xs text-gray-400">(Ljúktu stigi 1 fyrst)</span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm">
                    Stjórnaðu efnaverksmiðju - kauptu hráefni, framleiddu afurðir, hámarka hagnað!
                  </p>
                </div>
                <div className="text-right">
                  {progress.factoryBestScore > 0 ? (
                    <div className="text-emerald-400">
                      <div className="text-2xl font-bold">{progress.factoryBestScore}</div>
                      <div className="text-xs">
                        {progress.factoryBestProfit >= 0 ? '+' : ''}{progress.factoryBestProfit} kr
                      </div>
                    </div>
                  ) : (
                    <div className="text-emerald-400 text-3xl">🏭</div>
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
              <h3 className="font-semibold text-gray-700">Framvinda</h3>
              <button
                onClick={resetProgress}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                Endurstilla
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">
                  {[progress.level1Completed, progress.level2Completed, progress.level3BestScore > 0, progress.level4Completed].filter(Boolean).length}/4
                </div>
                <div className="text-xs text-gray-600">Stig lokið</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">
                  {progress.level1Score + progress.level2Score + progress.level3BestScore + progress.level4Score}
                </div>
                <div className="text-xs text-gray-600">Heildar stig</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-600">
                  {progress.totalGamesPlayed}
                </div>
                <div className="text-xs text-gray-600">Leikir spilaðir</div>
              </div>
            </div>
          </div>
        )}

        {/* What you'll learn */}
        <div className="bg-orange-50 rounded-xl p-6 mt-6">
          <h3 className="font-bold text-orange-800 mb-3">{t('learn.title', 'Hvað lærir þú?')}</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">✓</span>
              <span>{t('learn.point1', 'Hvað er takmarkandi hvarfefni og hvers vegna það skiptir máli')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">✓</span>
              <span>{t('learn.point2', 'Hvernig á að finna takmarkandi hvarfefni út frá stuðlum')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">✓</span>
              <span>{t('learn.point3', 'Reikna magn afurða og afganga eftir hvarf')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">✓</span>
              <span>{t('learn.point4', 'Nota stökjómetríu til að leysa raunveruleg vandamál')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">✓</span>
              <span>{t('learn.point5', 'Reikna prósentuheimtu og skilja af hverju heimta er undir 100%')}</span>
            </li>
          </ul>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <a
            href="/games/1-ar/"
            className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            ← Til baka í leikjayfirlit
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
