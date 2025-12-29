import { useState } from 'react';
import { Level1 } from './components/Level1';
import { Level2 } from './components/Level2';
import { Level3 } from './components/Level3';
import { useAchievements } from '@shared/hooks/useAchievements';
import { AchievementsButton, AchievementsPanel } from '@shared/components/AchievementsPanel';
import { AchievementNotificationsContainer } from '@shared/components/AchievementNotificationPopup';

type AppMode = 'menu' | 'level1' | 'level2' | 'level3';

interface Progress {
  level1Completed: boolean;
  level2Completed: boolean;
  level3HighScore: number;
}

function loadProgress(): Progress {
  const saved = localStorage.getItem('molmassiLevelProgress');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return { level1Completed: false, level2Completed: false, level3HighScore: 0 };
    }
  }
  return { level1Completed: false, level2Completed: false, level3HighScore: 0 };
}

function saveProgress(progress: Progress): void {
  localStorage.setItem('molmassiLevelProgress', JSON.stringify(progress));
}

function App() {
  const [mode, setMode] = useState<AppMode>('menu');
  const [progress, setProgress] = useState<Progress>(loadProgress());
  const [showAchievements, setShowAchievements] = useState(false);

  const {
    achievements,
    allAchievements,
    notifications,
    trackCorrectAnswer,
    trackIncorrectAnswer,
    trackLevelComplete,
    trackGameComplete,
    dismissNotification,
    resetAll,
  } = useAchievements({ gameId: 'molmassi' });

  const completeLevel1 = (score: number, maxScore: number, hintsUsed: number) => {
    const newProgress = { ...progress, level1Completed: true };
    setProgress(newProgress);
    saveProgress(newProgress);
    trackLevelComplete(1, score, maxScore, { hintsUsed });
    setMode('level2');
  };

  const completeLevel2 = (score: number, maxScore: number, hintsUsed: number) => {
    const newProgress = { ...progress, level2Completed: true };
    setProgress(newProgress);
    saveProgress(newProgress);
    trackLevelComplete(2, score, maxScore, { hintsUsed });
    setMode('level3');
  };

  const completeLevel3 = (score: number, maxScore: number, hintsUsed: number) => {
    trackLevelComplete(3, score, maxScore, { hintsUsed });
    // Check if all levels are complete to track game completion
    if (progress.level1Completed && progress.level2Completed) {
      trackGameComplete();
    }
  };

  // Render current mode
  if (mode === 'level1') {
    return (
      <>
        <Level1
          onBack={() => setMode('menu')}
          onComplete={completeLevel1}
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

  if (mode === 'level2') {
    return (
      <>
        <Level2
          onBack={() => setMode('menu')}
          onComplete={completeLevel2}
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

  if (mode === 'level3') {
    return (
      <>
        <Level3
          onBack={() => setMode('menu')}
          onComplete={completeLevel3}
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

  // Main Menu with Level Selection
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Header with Achievements Button */}
        <div className="flex justify-end mb-4 animate-fade-in-up">
          <AchievementsButton
            achievements={achievements}
            onClick={() => setShowAchievements(true)}
          />
        </div>

        {/* Title */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="text-6xl mb-4">⚗️</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Mólmassi</h1>
          <p className="text-gray-600">Lærðu að skilja og reikna mólmassa</p>
        </div>

        {/* Level Cards */}
        <div className="space-y-4">
          {/* Level 1 */}
          <button
            onClick={() => setMode('level1')}
            className="w-full bg-white rounded-2xl shadow-lg p-6 text-left hover:shadow-xl transition-all transform hover:scale-[1.02] animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                  🔬
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-800">Stig 1</h2>
                    {progress.level1Completed && (
                      <span className="text-green-500 text-lg">✓</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">Skildu sameindir - án útreikninga</p>
                </div>
              </div>
              <span className="text-gray-400 text-2xl">→</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Telja frumeindir</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Bera saman</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Byggja sameindir</span>
            </div>
          </button>

          {/* Level 2 */}
          <button
            onClick={() => setMode('level2')}
            className={`w-full bg-white rounded-2xl shadow-lg p-6 text-left transition-all transform animate-fade-in-up ${
              !progress.level1Completed
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:shadow-xl hover:scale-[1.02]'
            }`}
            style={{ animationDelay: '200ms' }}
            disabled={!progress.level1Completed}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                  📊
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-800">Stig 2</h2>
                    {progress.level2Completed && (
                      <span className="text-green-500 text-lg">✓</span>
                    )}
                    {!progress.level1Completed && (
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">🔒 Læst</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">Áætla mólmassa með námundun</p>
                </div>
              </div>
              <span className="text-gray-400 text-2xl">→</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Áætla massa</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Raða sameindum</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Heilar tölur</span>
            </div>
          </button>

          {/* Level 3 */}
          <button
            onClick={() => setMode('level3')}
            className={`w-full bg-white rounded-2xl shadow-lg p-6 text-left transition-all transform animate-fade-in-up ${
              !progress.level2Completed
                ? 'opacity-60 cursor-not-allowed'
                : 'hover:shadow-xl hover:scale-[1.02]'
            }`}
            style={{ animationDelay: '300ms' }}
            disabled={!progress.level2Completed}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center text-2xl">
                  🧮
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-800">Stig 3</h2>
                    {!progress.level2Completed && (
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">🔒 Læst</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">Reikna nákvæman mólmassa</p>
                </div>
              </div>
              <span className="text-gray-400 text-2xl">→</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Lotukerfið</span>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Nákvæmir útreikningar</span>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Keppni</span>
            </div>
          </button>
        </div>

        {/* Learning Path Description */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>📚</span> Námsferillinn
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${progress.level1Completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
              <div>
                <span className="font-medium text-gray-800">Skilningur</span> - Lærðu hvað sameindir og frumeindir þýða
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${progress.level2Completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
              <div>
                <span className="font-medium text-gray-800">Áætlun</span> - Notaðu námundaðar tölur til að áætla
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-gray-200 text-gray-600">3</div>
              <div>
                <span className="font-medium text-gray-800">Útreikningur</span> - Reiknaðu með nákvæmum gildum
              </div>
            </div>
          </div>
        </div>

        {/* Reset Progress (small link) */}
        {(progress.level1Completed || progress.level2Completed) && (
          <div className="mt-6 text-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <button
              onClick={() => {
                if (confirm('Ertu viss um að þú viljir endurstilla framvinduna?')) {
                  const reset = { level1Completed: false, level2Completed: false, level3HighScore: 0 };
                  setProgress(reset);
                  saveProgress(reset);
                }
              }}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              Endurstilla framvindu
            </button>
          </div>
        )}
      </div>

      {/* Achievements Panel Modal */}
      {showAchievements && (
        <AchievementsPanel
          achievements={achievements}
          allAchievements={allAchievements}
          onClose={() => setShowAchievements(false)}
          onReset={resetAll}
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
