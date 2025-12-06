import { useState } from 'react';
import { useProgress, useAccessibility, useI18n } from '@shared/hooks';

// Import Level components
import { Level1Conceptual } from './components/Level1Conceptual';
import { Level2 } from './components/Level2';
import { Level3 } from './components/Level3';

/**
 * Main application component for Dimensional Analysis Game
 */
function App() {
  const { progress, updateProgress } = useProgress({
    gameId: 'dimensional-analysis',
    initialProgress: {
      currentLevel: 1,
      problemsCompleted: 0,
      lastPlayedDate: new Date().toISOString(),
      totalTimeSpent: 0,
      levelProgress: {
        level1: {
          questionsAnswered: 0,
          questionsCorrect: 0,
          explanationsProvided: 0,
          explanationScores: [],
          mastered: false
        },
        level2: {
          problemsCompleted: 0,
          predictionsMade: 0,
          predictionsCorrect: 0,
          finalAnswersCorrect: 0,
          mastered: false
        },
        level3: {
          problemsCompleted: 0,
          compositeScores: [],
          achievements: [],
          mastered: false,
          hintsUsed: 0
        }
      }
    }
  });

  const { settings, toggleHighContrast, setTextSize } = useAccessibility();
  const { t, language, setLanguage } = useI18n();

  const [screen, setScreen] = useState<'menu' | 'level1' | 'level2' | 'level3' | 'stats'>('menu');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">
        {t('accessibility.skipToContent', 'Fara beint í efni')}
      </a>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Einingagreining
          </h1>
          <p className="text-lg text-gray-600">
            Kvennaskólinn - Efnafræði 1. ár
          </p>
        </header>

        {/* Accessibility Menu */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            {t('accessibility.menuTitle', 'Aðgengisval')}
          </h2>
          <div className="flex flex-wrap gap-4">
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
                onChange={(e) => setTextSize(e.target.value as any)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="small">{t('accessibility.textSizeSmall', 'Lítil')}</option>
                <option value="medium">{t('accessibility.textSizeMedium', 'Miðlungs')}</option>
                <option value="large">{t('accessibility.textSizeLarge', 'Stór')}</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">Tungumál:</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="is">Íslenska</option>
                <option value="en">English</option>
                <option value="pl">Polski</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        {screen === 'menu' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {t('mainMenu.selectLevel', 'Veldu stig')}
              </h2>

              {/* Progress Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">
                  {t('progress.problemsCompleted', 'Verkefni kláruð')}: {progress.problemsCompleted}
                </p>
              </div>

              {/* Level Cards - Conceptual First Progression */}
              <div className="grid gap-4">
                {/* Level 1 - Conceptual (Visual Learning) */}
                <button
                  onClick={() => setScreen('level1')}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-6 text-left transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">1</span>
                    <h3 className="text-xl font-semibold">
                      {t('levels.level1.name', 'Hugtök')}
                    </h3>
                  </div>
                  <p className="text-green-100">
                    {t('levels.level1.description', 'Sjónræn lærdómur - engar útreikninga')}
                  </p>
                  <p className="text-sm text-green-200 mt-2">
                    Áskoranir: {progress.levelProgress?.level1?.questionsAnswered || 0}/6
                  </p>
                </button>

                {/* Level 2 - Application (Predict & Reason) */}
                <button
                  onClick={() => setScreen('level2')}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-6 text-left transition-colors"
                  disabled={!progress.levelProgress?.level1?.mastered}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">2</span>
                    <h3 className="text-xl font-semibold">
                      {t('levels.level2.name', 'Beiting')}
                    </h3>
                  </div>
                  <p className="text-blue-100">
                    {t('levels.level2.description', 'Spá fyrir og rökstyðja')}
                  </p>
                  {progress.levelProgress?.level1?.mastered && (
                    <p className="text-sm text-blue-200 mt-2">
                      Verkefni: {progress.levelProgress?.level2?.problemsCompleted || 0}/15
                    </p>
                  )}
                </button>

                {/* Level 3 - Calculation (Full Problems) */}
                <button
                  onClick={() => setScreen('level3')}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-6 text-left transition-colors"
                  disabled={!progress.levelProgress?.level2?.mastered}
                  style={{ backgroundColor: !progress.levelProgress?.level2?.mastered ? undefined : '#f36b22' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">3</span>
                    <h3 className="text-xl font-semibold">
                      {t('levels.level3.name', 'Útreikningar')}
                    </h3>
                  </div>
                  <p className="text-orange-100">
                    {t('levels.level3.description', 'Fullir útreikningar með formúlum')}
                  </p>
                  {progress.levelProgress?.level2?.mastered && (
                    <p className="text-sm text-orange-200 mt-2">
                      Verkefni: {progress.levelProgress?.level3?.problemsCompleted || 0}/10
                    </p>
                  )}
                </button>
              </div>

              {/* Stats Button */}
              <button
                onClick={() => setScreen('stats')}
                className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg p-4 transition-colors"
              >
                {t('mainMenu.statistics', 'Tölfræði')}
              </button>
            </div>
          </div>
        )}

        {/* Level Screens */}
        {screen === 'level1' && (
          <Level1Conceptual
            onComplete={(levelProgress) => {
              updateProgress({
                problemsCompleted: progress.problemsCompleted + levelProgress.questionsAnswered,
                currentLevel: levelProgress.mastered ? 2 : 1,
                levelProgress: {
                  ...progress.levelProgress,
                  level1: levelProgress
                }
              });
              setScreen('menu');
            }}
            onBack={() => setScreen('menu')}
            initialProgress={progress.levelProgress?.level1}
          />
        )}

        {screen === 'level2' && (
          <Level2
            onComplete={(levelProgress) => {
              updateProgress({
                problemsCompleted: progress.problemsCompleted + levelProgress.problemsCompleted,
                currentLevel: levelProgress.mastered ? 3 : 2,
                levelProgress: {
                  ...progress.levelProgress,
                  level2: levelProgress
                }
              });
              setScreen('menu');
            }}
            onBack={() => setScreen('menu')}
            initialProgress={progress.levelProgress?.level2}
          />
        )}

        {screen === 'level3' && (
          <Level3
            onComplete={(levelProgress) => {
              updateProgress({
                problemsCompleted: progress.problemsCompleted + levelProgress.problemsCompleted,
                currentLevel: 3,
                levelProgress: {
                  ...progress.levelProgress,
                  level3: levelProgress
                }
              });
              setScreen('menu');
            }}
            onBack={() => setScreen('menu')}
            initialProgress={progress.levelProgress?.level3}
          />
        )}

        {/* Stats Screen */}
        {screen === 'stats' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {t('stats.title', 'Tölfræði')}
              </h2>

              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Heildar framvinda</h3>
                  <p className="text-sm text-gray-600">
                    Verkefni kláruð: {progress.problemsCompleted}
                  </p>
                  <p className="text-sm text-gray-600">
                    Núverandi stig: {progress.currentLevel}
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Stig 1 - Hugtök</h3>
                  <p className="text-sm text-gray-600">
                    Áskoranir: {progress.levelProgress?.level1?.questionsAnswered || 0}/6
                  </p>
                  <p className="text-sm text-gray-600">
                    Nákvæmni: {progress.levelProgress?.level1?.questionsAnswered
                      ? Math.round((progress.levelProgress.level1.questionsCorrect / progress.levelProgress.level1.questionsAnswered) * 100)
                      : 0}%
                  </p>
                </div>

                <div className="border-b pb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Stig 2 - Beiting</h3>
                  <p className="text-sm text-gray-600">
                    Verkefni: {progress.levelProgress?.level2?.problemsCompleted || 0}/15
                  </p>
                  <p className="text-sm text-gray-600">
                    Spánákvæmni: {progress.levelProgress?.level2?.predictionsMade
                      ? Math.round((progress.levelProgress.level2.predictionsCorrect / progress.levelProgress.level2.predictionsMade) * 100)
                      : 0}%
                  </p>
                </div>

                <div className="pb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Stig 3 - Útreikningar</h3>
                  <p className="text-sm text-gray-600">
                    Verkefni: {progress.levelProgress?.level3?.problemsCompleted || 0}/10
                  </p>
                  <p className="text-sm text-gray-600">
                    Meðaleinkunn: {progress.levelProgress?.level3?.compositeScores?.length
                      ? Math.round((progress.levelProgress.level3.compositeScores.reduce((a, b) => a + b, 0) / progress.levelProgress.level3.compositeScores.length) * 100)
                      : 0}%
                  </p>
                </div>
              </div>

              <button
                onClick={() => setScreen('menu')}
                className="mt-6 bg-gray-500 hover:bg-gray-600 text-white rounded-lg px-6 py-2 transition-colors"
              >
                {t('common.back', 'Til baka')}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        <p>© 2024 Kvennaskólinn - Efnafræðileikir</p>
      </footer>
    </div>
  );
}

export default App;
