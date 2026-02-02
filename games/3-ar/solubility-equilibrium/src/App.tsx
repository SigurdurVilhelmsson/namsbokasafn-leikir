import { useState, useEffect } from 'react';
import { useProgress, useAccessibility, useGameI18n } from '@shared/hooks';
import { LanguageSwitcher } from '@shared/components';
import { gameTranslations } from './i18n';
import { Level1, Level2, Level3 } from './components';
import type { ActiveLevel, GameProgress } from './types';

const STORAGE_KEY = 'ksp-game-progress';

function App() {
  const { updateProgress } = useProgress({
    gameId: 'solubility-equilibrium',
    initialProgress: {
      currentLevel: 0,
      problemsCompleted: 0,
      lastPlayedDate: new Date().toISOString(),
      totalTimeSpent: 0,
      levelProgress: {},
    },
  });

  const { settings, toggleHighContrast, setTextSize } = useAccessibility();
  const { t, language, setLanguage } = useGameI18n({ gameTranslations });

  const [activeLevel, setActiveLevel] = useState<ActiveLevel>('menu');
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    level1Completed: false,
    level1Score: 0,
    level2Completed: false,
    level2Score: 0,
    level3Completed: false,
    level3Score: 0,
    totalGamesPlayed: 0,
  });

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setGameProgress(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load game progress:', e);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: Partial<GameProgress>) => {
    const updated = { ...gameProgress, ...newProgress };
    setGameProgress(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Also update shared progress
    const totalProblems =
      (updated.level1Score > 0 ? 8 : 0) +
      (updated.level2Score > 0 ? 7 : 0) +
      (updated.level3Score > 0 ? 6 : 0);
    updateProgress({
      problemsCompleted: totalProblems,
      levelProgress: {
        level1: {
          questionsAnswered: updated.level1Score > 0 ? 8 : 0,
          questionsCorrect: Math.round(8 * updated.level1Score / 100),
          explanationsProvided: 0,
          explanationScores: [],
          mastered: updated.level1Score >= 80,
        },
        level2: {
          problemsCompleted: updated.level2Score > 0 ? 7 : 0,
          predictionsMade: 0,
          predictionsCorrect: 0,
          finalAnswersCorrect: Math.round(7 * updated.level2Score / 100),
          mastered: updated.level2Score >= 80,
        },
        level3: {
          problemsCompleted: updated.level3Score > 0 ? 6 : 0,
          compositeScores: [],
          achievements: [],
          mastered: updated.level3Score >= 80,
          hintsUsed: 0,
        },
      },
    });
  };

  const handleLevel1Complete = (score: number) => {
    saveProgress({
      level1Completed: true,
      level1Score: Math.max(gameProgress.level1Score, score),
    });
    setActiveLevel('menu');
  };

  const handleLevel2Complete = (score: number) => {
    saveProgress({
      level2Completed: true,
      level2Score: Math.max(gameProgress.level2Score, score),
    });
    setActiveLevel('menu');
  };

  const handleLevel3Complete = (score: number) => {
    saveProgress({
      level3Completed: true,
      level3Score: Math.max(gameProgress.level3Score, score),
      totalGamesPlayed: gameProgress.totalGamesPlayed + 1,
    });
    setActiveLevel('menu');
  };

  // Render active level
  if (activeLevel === 'level1') {
    return (
      <Level1 onComplete={handleLevel1Complete} onBack={() => setActiveLevel('menu')} />
    );
  }

  if (activeLevel === 'level2') {
    return (
      <Level2 onComplete={handleLevel2Complete} onBack={() => setActiveLevel('menu')} />
    );
  }

  if (activeLevel === 'level3') {
    return (
      <Level3 onComplete={handleLevel3Complete} onBack={() => setActiveLevel('menu')} />
    );
  }

  // Main menu
  const canPlayLevel2 = gameProgress.level1Completed || gameProgress.level1Score >= 60;
  const canPlayLevel3 = gameProgress.level2Completed || gameProgress.level2Score >= 60;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">
        {t('accessibility.skipToContent', 'Fara beint í efní')}
      </a>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="text-6xl mb-4">⚗️</div>
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">{t('game.title')}</h1>
          <p className="text-lg text-indigo-600">Kvennaskólinn - {t('game.subtitle')}</p>
        </header>

        {/* Accessibility Menu */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 max-w-2xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={toggleHighContrast}
                className="rounded"
              />
              <span className="text-sm">{t('accessibility.highContrast', 'Há birtuskil')}</span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-sm">{t('accessibility.textSize', 'Leturstærð')}:</span>
              <select
                value={settings.textSize}
                onChange={(e) => setTextSize(e.target.value as 'small' | 'medium' | 'large')}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="small">{t('accessibility.textSizeSmall', 'Lítil')}</option>
                <option value="medium">{t('accessibility.textSizeMedium', 'Miðlungs')}</option>
                <option value="large">{t('accessibility.textSizeLarge', 'Stór')}</option>
              </select>
            </div>

            <LanguageSwitcher
              language={language}
              onLanguageChange={setLanguage}
              variant="dropdown"
            />
          </div>
        </div>

        {/* Level Selection */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">
            {t('menu.selectLevel', 'Veldu þrep')}
          </h2>

          <div className="space-y-4">
            {/* Level 1 */}
            <button
              onClick={() => setActiveLevel('level1')}
              className="w-full bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-400"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">🧪</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {t('menu.level1', 'Þrep 1: Ksp Tjáningar')}
                    </h3>
                    {gameProgress.level1Completed && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                        {t('menu.completed', 'Lokið')} ({gameProgress.level1Score}%)
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">
                    {t('menu.level1Desc', 'Lærðu að skrifa Ksp tjáningar og bera saman leysni')}
                  </p>
                </div>
                <div className="text-2xl text-blue-500">→</div>
              </div>
            </button>

            {/* Level 2 */}
            <button
              onClick={() => canPlayLevel2 && setActiveLevel('level2')}
              disabled={!canPlayLevel2}
              className={`w-full rounded-xl shadow-md p-6 text-left transition-shadow border-2 ${
                canPlayLevel2
                  ? 'bg-white hover:shadow-lg border-transparent hover:border-green-400'
                  : 'bg-gray-100 cursor-not-allowed border-gray-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{canPlayLevel2 ? '⚗️' : '🔒'}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-xl font-bold ${canPlayLevel2 ? 'text-gray-800' : 'text-gray-500'}`}
                    >
                      {t('menu.level2', 'Þrep 2: Útreikningar')}
                    </h3>
                    {gameProgress.level2Completed && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                        {t('menu.completed', 'Lokið')} ({gameProgress.level2Score}%)
                      </span>
                    )}
                    {!canPlayLevel2 && (
                      <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-sm">
                        {t('menu.locked', 'Læst')}
                      </span>
                    )}
                  </div>
                  <p className={`mt-1 ${canPlayLevel2 ? 'text-gray-600' : 'text-gray-400'}`}>
                    {t('menu.level2Desc', 'Reiknaðu mólleysni, Ksp, og sameiginlegu jónu áhrif')}
                  </p>
                </div>
                <div className={`text-2xl ${canPlayLevel2 ? 'text-green-500' : 'text-gray-300'}`}>
                  →
                </div>
              </div>
            </button>

            {/* Level 3 */}
            <button
              onClick={() => canPlayLevel3 && setActiveLevel('level3')}
              disabled={!canPlayLevel3}
              className={`w-full rounded-xl shadow-md p-6 text-left transition-shadow border-2 ${
                canPlayLevel3
                  ? 'bg-white hover:shadow-lg border-transparent hover:border-purple-400'
                  : 'bg-gray-100 cursor-not-allowed border-gray-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{canPlayLevel3 ? '⬇️' : '🔒'}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-xl font-bold ${canPlayLevel3 ? 'text-gray-800' : 'text-gray-500'}`}
                    >
                      {t('menu.level3', 'Þrep 3: Botnfall')}
                    </h3>
                    {gameProgress.level3Completed && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                        {t('menu.completed', 'Lokið')} ({gameProgress.level3Score}%)
                      </span>
                    )}
                    {!canPlayLevel3 && (
                      <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-sm">
                        {t('menu.locked', 'Læst')}
                      </span>
                    )}
                  </div>
                  <p className={`mt-1 ${canPlayLevel3 ? 'text-gray-600' : 'text-gray-400'}`}>
                    {t('menu.level3Desc', 'Spáðu hvort botnfall myndast með Q vs Ksp')}
                  </p>
                </div>
                <div className={`text-2xl ${canPlayLevel3 ? 'text-purple-500' : 'text-gray-300'}`}>
                  →
                </div>
              </div>
            </button>
          </div>

          {/* Progress summary */}
          {(gameProgress.level1Completed ||
            gameProgress.level2Completed ||
            gameProgress.level3Completed) && (
            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {language === 'is' ? 'Framvinda' : 'Progress'}
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div
                  className={`p-4 rounded-lg ${gameProgress.level1Completed ? 'bg-blue-50' : 'bg-gray-50'}`}
                >
                  <p className="text-2xl font-bold text-blue-600">{gameProgress.level1Score}%</p>
                  <p className="text-sm text-gray-600">
                    {language === 'is' ? 'Þrep 1' : 'Level 1'}
                  </p>
                </div>
                <div
                  className={`p-4 rounded-lg ${gameProgress.level2Completed ? 'bg-green-50' : 'bg-gray-50'}`}
                >
                  <p className="text-2xl font-bold text-green-600">{gameProgress.level2Score}%</p>
                  <p className="text-sm text-gray-600">
                    {language === 'is' ? 'Þrep 2' : 'Level 2'}
                  </p>
                </div>
                <div
                  className={`p-4 rounded-lg ${gameProgress.level3Completed ? 'bg-purple-50' : 'bg-gray-50'}`}
                >
                  <p className="text-2xl font-bold text-purple-600">{gameProgress.level3Score}%</p>
                  <p className="text-sm text-gray-600">
                    {language === 'is' ? 'Þrep 3' : 'Level 3'}
                  </p>
                </div>
              </div>
              {gameProgress.totalGamesPlayed > 0 && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  {language === 'is'
                    ? `Leikir kláraðir: ${gameProgress.totalGamesPlayed}`
                    : `Games completed: ${gameProgress.totalGamesPlayed}`}
                </p>
              )}
            </div>
          )}

          {/* Topic overview */}
          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-indigo-800 mb-3">
              {language === 'is' ? 'Um leysnisjafnvægi' : 'About Solubility Equilibrium'}
            </h3>
            <p className="text-gray-700 mb-3">
              {language === 'is'
                ? 'Leysnisjafnvægi (Ksp) lýsir hversu mikið af jónefnasambandi leysist í vatni. Ksp (solubility product constant) er jafnvægisfastinn fyrir upplausnarferli.'
                : 'Solubility equilibrium (Ksp) describes how much of an ionic compound dissolves in water. Ksp (solubility product constant) is the equilibrium constant for the dissolution process.'}
            </p>
            <div className="bg-white rounded-lg p-4 font-mono text-center">
              <p>MX(s) ⇌ M⁺(aq) + X⁻(aq)</p>
              <p className="mt-2">Ksp = [M⁺][X⁻]</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        <p>© 2024 Kvennaskólinn - Efnafræðileikir</p>
      </footer>
    </div>
  );
}

export default App;
