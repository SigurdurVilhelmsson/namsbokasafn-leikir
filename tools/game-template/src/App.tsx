import { useState } from 'react';
import { useProgress, useAccessibility, useI18n } from '@shared/hooks';

/**
 * GAME_NAME - Main Application Component
 *
 * TODO: Customize this template for your game
 * 1. Import your game-specific data from ./data/
 * 2. Define your game state and logic
 * 3. Create game-specific components in ./components/
 * 4. Implement game screens (menu, gameplay, stats, etc.)
 */
function App() {
  const { progress } = useProgress({
    gameId: 'GAME_ID',
    initialProgress: {
      currentLevel: 0,
      problemsCompleted: 0,
      lastPlayedDate: new Date().toISOString(),
      totalTimeSpent: 0,
      levelProgress: {},
    },
  });

  const { settings, toggleHighContrast, setTextSize } = useAccessibility();
  const { t, language, setLanguage } = useI18n();

  const [screen, setScreen] = useState<'menu' | 'game' | 'stats'>('menu');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">
        {t('accessibility.skipToContent', 'Fara beint í efní')}
      </a>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">GAME_TITLE</h1>
          <p className="text-lg text-gray-600">Kvennaskólinn - GAME_SUBTITLE</p>
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

              {/* Game Start Button */}
              <button
                onClick={() => setScreen('game')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-6 text-left transition-colors mb-4"
                style={{ backgroundColor: '#f36b22' }}
              >
                <h3 className="text-xl font-semibold mb-2">{t('common.start', 'Byrja')}</h3>
                <p className="text-orange-100">GAME_DESCRIPTION</p>
              </button>

              {/* Stats Button */}
              <button
                onClick={() => setScreen('stats')}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg p-4 transition-colors"
              >
                {t('mainMenu.statistics', 'Tölfræði')}
              </button>
            </div>
          </div>
        )}

        {/* Game Screen - TODO: Implement game logic */}
        {screen === 'game' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">GAME_TITLE</h2>
              <p className="text-gray-600 mb-6">TODO: Implement game logic here</p>
              <button
                onClick={() => setScreen('menu')}
                className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg px-6 py-2 transition-colors"
              >
                {t('common.back', 'Til baka')}
              </button>
            </div>
          </div>
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
