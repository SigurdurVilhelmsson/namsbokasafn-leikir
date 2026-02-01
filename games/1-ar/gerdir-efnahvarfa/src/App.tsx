import { useState, useEffect } from 'react';
import { Level1 } from './components/Level1';
import { Level2 } from './components/Level2';
import { Level3 } from './components/Level3';
import { useAchievements } from '@shared/hooks/useAchievements';
import { AchievementNotificationsContainer } from '@shared/components';
import { useGameI18n } from '@shared/hooks/useGameI18n';
import { LanguageSwitcher } from '@shared/components';
import { gameTranslations } from './i18n';
import { REACTION_TYPES, ReactionType } from './data/reactions';

type ActiveLevel = 'menu' | 'level1' | 'level2' | 'level3' | 'complete';

interface Progress {
  level1Score: number | null;
  level1Completed: boolean;
  level2Score: number | null;
  level2Completed: boolean;
  level3Score: number | null;
  level3Completed: boolean;
  totalGamesPlayed: number;
}

const STORAGE_KEY = 'gerdir-efnahvarfa-progress';

function getDefaultProgress(): Progress {
  return {
    level1Score: null,
    level1Completed: false,
    level2Score: null,
    level2Completed: false,
    level3Score: null,
    level3Completed: false,
    totalGamesPlayed: 0,
  };
}

function loadProgress(): Progress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...getDefaultProgress(), ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
  return getDefaultProgress();
}

function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

function App() {
  const [activeLevel, setActiveLevel] = useState<ActiveLevel>('menu');
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const { t, language, setLanguage } = useGameI18n({ gameTranslations });

  const {
    notifications,
    dismissNotification,
    trackLevelComplete,
    trackGameComplete,
    trackCorrectAnswer,
    trackIncorrectAnswer,
  } = useAchievements({
    gameId: 'gerdir-efnahvarfa',
  });

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const handleLevel1Complete = (score: number, _maxScore: number) => {
    setProgress(prev => ({
      ...prev,
      level1Score: Math.max(prev.level1Score || 0, score),
      level1Completed: true,
      totalGamesPlayed: prev.totalGamesPlayed + 1,
    }));
    trackLevelComplete(1, score, 1000, {});
    setActiveLevel('menu');
  };

  const handleLevel2Complete = (score: number, maxScore: number, hintsUsed: number) => {
    setProgress(prev => ({
      ...prev,
      level2Score: Math.max(prev.level2Score || 0, score),
      level2Completed: true,
      totalGamesPlayed: prev.totalGamesPlayed + 1,
    }));
    trackLevelComplete(2, score, maxScore, { hintsUsed });
    setActiveLevel('menu');
  };

  const handleLevel3Complete = (score: number, maxScore: number, _hintsUsed: number) => {
    setProgress(prev => ({
      ...prev,
      level3Score: Math.max(prev.level3Score || 0, score),
      level3Completed: true,
      totalGamesPlayed: prev.totalGamesPlayed + 1,
    }));
    trackLevelComplete(3, score, maxScore, {});
    trackGameComplete();
    setActiveLevel('complete');
  };

  const resetProgress = () => {
    if (confirm('Ertu viss um að þú viljir endurstilla alla framvindu?')) {
      setProgress(getDefaultProgress());
      setActiveLevel('menu');
    }
  };

  const isLevel2Unlocked = progress.level1Completed;
  const isLevel3Unlocked = progress.level2Completed;

  if (activeLevel === 'level1') {
    return (
      <>
        <Level1 onComplete={handleLevel1Complete} onBack={() => setActiveLevel('menu')} />
        <AchievementNotificationsContainer notifications={notifications} onDismiss={dismissNotification} />
      </>
    );
  }

  if (activeLevel === 'level2') {
    return (
      <>
        <Level2
          onComplete={handleLevel2Complete}
          onBack={() => setActiveLevel('menu')}
          onCorrectAnswer={trackCorrectAnswer}
          onIncorrectAnswer={trackIncorrectAnswer}
        />
        <AchievementNotificationsContainer notifications={notifications} onDismiss={dismissNotification} />
      </>
    );
  }

  if (activeLevel === 'level3') {
    return (
      <>
        <Level3
          onComplete={handleLevel3Complete}
          onBack={() => setActiveLevel('menu')}
          onCorrectAnswer={trackCorrectAnswer}
          onIncorrectAnswer={trackIncorrectAnswer}
        />
        <AchievementNotificationsContainer notifications={notifications} onDismiss={dismissNotification} />
      </>
    );
  }

  if (activeLevel === 'complete') {
    const totalScore = (progress.level1Score || 0) + (progress.level2Score || 0) + (progress.level3Score || 0);

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-orange-700 mb-2">{t('completion.title')}</h1>
            <p className="text-gray-600 mb-6">{t('completion.completedAll')}</p>

            <div className="space-y-3 mb-6">
              <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center">
                <div className="text-left">
                  <div className="font-bold text-blue-800">{t('levels.level1.name')}</div>
                </div>
                <div className="text-2xl font-bold text-blue-600">{progress.level1Score || 0}</div>
              </div>
              <div className="bg-amber-50 p-4 rounded-xl flex justify-between items-center">
                <div className="text-left">
                  <div className="font-bold text-amber-800">{t('levels.level2.name')}</div>
                </div>
                <div className="text-2xl font-bold text-amber-600">{progress.level2Score || 0}</div>
              </div>
              <div className="bg-red-50 p-4 rounded-xl flex justify-between items-center">
                <div className="text-left">
                  <div className="font-bold text-red-800">{t('levels.level3.name')}</div>
                </div>
                <div className="text-2xl font-bold text-red-600">{progress.level3Score || 0}</div>
              </div>
              <div className="bg-orange-100 p-4 rounded-xl flex justify-between items-center border-2 border-orange-400">
                <div className="font-bold text-orange-800">{t('completion.totalScore')}</div>
                <div className="text-3xl font-bold text-orange-600">{totalScore}</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-bold text-gray-700 mb-2">{t('completion.whatYouLearned')}</h3>
              <ul className="space-y-1 text-sm text-gray-600 font-mono">
                <li>🔗 {t('completion.summary1')}</li>
                <li>💥 {t('completion.summary2')}</li>
                <li>🔄 {t('completion.summary3')}</li>
                <li>🔀 {t('completion.summary4')}</li>
                <li>🔥 {t('completion.summary5')}</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setActiveLevel('menu')}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl"
              >
                {t('completion.back')}
              </button>
              <button
                onClick={resetProgress}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl"
              >
                {t('completion.startOver')}
              </button>
            </div>
          </div>
        </div>
        <AchievementNotificationsContainer notifications={notifications} onDismiss={dismissNotification} />
      </div>
    );
  }

  // Main Menu
  const reactionTypes: ReactionType[] = ['samsetting', 'sundurlitur', 'einföld', 'tvöföld', 'bruni'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-orange-700">{t('game.title')}</h1>
              <p className="text-gray-600">{t('game.subtitle')}</p>
            </div>
            <LanguageSwitcher language={language} onLanguageChange={setLanguage} variant="dropdown" />
          </div>

          <details className="bg-orange-50 rounded-xl p-4">
            <summary className="font-semibold text-orange-700 cursor-pointer">{t('menu.howItWorks')}</summary>
            <p className="text-sm text-gray-600 mt-2">{t('menu.howItWorksDesc')}</p>
          </details>
        </div>

        {/* Reaction Types Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Fimm gerðir efnahvarfa:</h2>
          <div className="grid grid-cols-5 gap-2">
            {reactionTypes.map(type => (
              <div
                key={type}
                className="p-3 rounded-xl text-center"
                style={{ backgroundColor: `${REACTION_TYPES[type].color}15` }}
              >
                <span className="text-2xl">{REACTION_TYPES[type].emoji}</span>
                <div className="font-mono text-xs mt-1 text-gray-600">{REACTION_TYPES[type].formula}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">{t('menu.progress')}</h2>
            <button onClick={resetProgress} className="text-sm text-gray-500 hover:text-red-500">
              {t('menu.reset')}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="bg-blue-50 rounded-lg p-2">
              <div className="text-lg font-bold text-blue-600">
                {[progress.level1Completed, progress.level2Completed, progress.level3Completed].filter(Boolean).length}/3
              </div>
              <div className="text-xs text-gray-600">{t('menu.levelsCompleted')}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-2">
              <div className="text-lg font-bold text-green-600">
                {(progress.level1Score || 0) + (progress.level2Score || 0) + (progress.level3Score || 0)}
              </div>
              <div className="text-xs text-gray-600">{t('menu.totalPoints')}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-2">
              <div className="text-lg font-bold text-purple-600">{progress.totalGamesPlayed}</div>
              <div className="text-xs text-gray-600">Leikir</div>
            </div>
          </div>
        </div>

        {/* Level Selection */}
        <div className="space-y-4">
          <button
            onClick={() => setActiveLevel('level1')}
            className="w-full p-6 rounded-xl border-4 border-blue-400 bg-blue-50 hover:bg-blue-100 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">📚</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl font-bold text-blue-800">{t('levels.level1.name')}</span>
                  {progress.level1Completed && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">✓ {t('levels.completed')}</span>
                  )}
                  {progress.level1Score !== null && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{progress.level1Score} {t('levels.points')}</span>
                  )}
                </div>
                <div className="text-sm mt-1 text-blue-600">{t('levels.level1.description')}</div>
                <div className="text-xs text-gray-600 mt-2">{t('levels.level1.details')}</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => isLevel2Unlocked && setActiveLevel('level2')}
            disabled={!isLevel2Unlocked}
            className={`w-full p-6 rounded-xl border-4 transition-all text-left ${
              isLevel2Unlocked ? 'border-amber-400 bg-amber-50 hover:bg-amber-100' : 'border-gray-300 bg-gray-100 opacity-70'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{isLevel2Unlocked ? '🎯' : '🔒'}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xl font-bold ${isLevel2Unlocked ? 'text-amber-800' : 'text-gray-500'}`}>
                    {t('levels.level2.name')}
                  </span>
                  {progress.level2Completed && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">✓ {t('levels.completed')}</span>
                  )}
                  {progress.level2Score !== null && (
                    <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">{progress.level2Score} {t('levels.points')}</span>
                  )}
                </div>
                <div className={`text-sm mt-1 ${isLevel2Unlocked ? 'text-amber-600' : 'text-gray-500'}`}>
                  {t('levels.level2.description')}
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  {isLevel2Unlocked ? t('levels.level2.details') : t('levels.level2.locked')}
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => isLevel3Unlocked && setActiveLevel('level3')}
            disabled={!isLevel3Unlocked}
            className={`w-full p-6 rounded-xl border-4 transition-all text-left ${
              isLevel3Unlocked ? 'border-red-400 bg-red-50 hover:bg-red-100' : 'border-gray-300 bg-gray-100 opacity-70'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{isLevel3Unlocked ? '⚡' : '🔒'}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xl font-bold ${isLevel3Unlocked ? 'text-red-800' : 'text-gray-500'}`}>
                    {t('levels.level3.name')}
                  </span>
                  {progress.level3Completed && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">✓ {t('levels.completed')}</span>
                  )}
                  {progress.level3Score !== null && (
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">{progress.level3Score} {t('levels.points')}</span>
                  )}
                </div>
                <div className={`text-sm mt-1 ${isLevel3Unlocked ? 'text-red-600' : 'text-gray-500'}`}>
                  {t('levels.level3.description')}
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  {isLevel3Unlocked ? t('levels.level3.details') : t('levels.level3.locked')}
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-6 text-center">
          <a href="../" className="text-gray-500 hover:text-orange-600 text-sm">← {t('menu.backToGames')}</a>
        </div>
      </div>

      <AchievementNotificationsContainer notifications={notifications} onDismiss={dismissNotification} />
    </div>
  );
}

export default App;
