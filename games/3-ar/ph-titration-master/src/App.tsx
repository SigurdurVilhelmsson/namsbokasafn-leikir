import { useState, useEffect } from 'react';
import { Titration, IndicatorType, GameMode } from './types';
import { titrations, getRandomTitration } from './data/titrations';
import { calculatePH } from './utils/ph-calculations';
import { isIndicatorAppropriate } from './data/indicators';
import { Burette, Flask, PHMeter, TitrationCurve, IndicatorSelector } from './components';
import { useAchievements } from '@shared/hooks/useAchievements';
import { AchievementsButton, AchievementsPanel } from '@shared/components/AchievementsPanel';
import { AchievementNotificationsContainer } from '@shared/components/AchievementNotificationPopup';

interface TitrationProgress {
  score: number;
  highScore: number;
  titrationsCompleted: number;
}

const STORAGE_KEY = 'ph-titration-master-progress';

function loadProgress(): TitrationProgress {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return getDefaultProgress();
    }
  }
  return getDefaultProgress();
}

function getDefaultProgress(): TitrationProgress {
  return {
    score: 0,
    highScore: 0,
    titrationsCompleted: 0
  };
}

function saveProgress(progress: TitrationProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

/**
 * pH Titration Master - Main Application
 */
function App() {
  // Game state
  const [screen, setScreen] = useState<'menu' | 'game' | 'feedback'>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('practice');
  const [currentTitration, setCurrentTitration] = useState<Titration | null>(null);
  const [volumeAdded, setVolumeAdded] = useState(0);
  const [currentPH, setCurrentPH] = useState(7);
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorType | null>(null);
  const [curveData, setCurveData] = useState<Array<{ volume: number; pH: number }>>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Stats with localStorage persistence
  const [progress, setProgress] = useState<TitrationProgress>(loadProgress);
  const [startTime, setStartTime] = useState(Date.now());

  // Achievements
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
    resetAll: resetAchievements,
  } = useAchievements({ gameId: 'ph-titration-master' });

  // Save progress whenever it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const resetProgress = () => {
    const newProgress = getDefaultProgress();
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  // Feedback
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    message: string;
    points: number;
    difference: string;
    equivalenceVolume: string;
    equivalencePH: string;
    indicatorCorrect: boolean;
  } | null>(null);

  // Start new titration
  const startNewTitration = (mode: GameMode) => {
    const randomTitration = getRandomTitration();
    setGameMode(mode);
    setCurrentTitration(randomTitration);
    setSelectedIndicator(null);
    setVolumeAdded(0);
    setCurrentPH(randomTitration.initialPH);
    setCurveData([{ volume: 0, pH: randomTitration.initialPH }]);
    setFeedback(null);
    setStartTime(Date.now());
    setScreen('game');
  };

  // Add titrant
  const addTitrant = (amount: number) => {
    if (!currentTitration || feedback) return;

    const newVolume = Math.max(0, Math.min(volumeAdded + amount, 100));
    setVolumeAdded(newVolume);

    const newPH = calculatePH(currentTitration, newVolume);
    setCurrentPH(newPH);

    // Update curve data
    const newPoint = { volume: newVolume, pH: newPH };
    setCurveData(prev => [...prev, newPoint]);

    // Animation for adding
    if (amount > 0) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Check answer
  const checkAnswer = () => {
    if (!currentTitration) return;

    // Determine target equivalence point
    let targetVolume: number;
    let targetPH: number;

    if ('equivalenceVolume' in currentTitration) {
      targetVolume = currentTitration.equivalenceVolume;
      targetPH = currentTitration.equivalencePH;
    } else {
      // For polyprotic, find closest equivalence point
      let minDiff = Infinity;
      let closestIdx = 0;
      currentTitration.equivalenceVolumes.forEach((vol, idx) => {
        const diff = Math.abs(volumeAdded - vol);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      targetVolume = currentTitration.equivalenceVolumes[closestIdx];
      targetPH = currentTitration.equivalencePHs[closestIdx];
    }

    const difference = Math.abs(volumeAdded - targetVolume);
    const timeElapsed = (Date.now() - startTime) / 1000;

    let points = 0;
    let message = '';
    let isCorrect = false;

    // Volume accuracy scoring
    if (difference <= 0.05) {
      points = 150;
      message = 'Fullkomið! Nákvæmni: ±0.05 mL ⭐';
      isCorrect = true;
    } else if (difference <= 0.2) {
      points = 100;
      message = 'Frábært! Innan vikmarka: ±0.2 mL ✓';
      isCorrect = true;
    } else if (difference <= 0.5) {
      points = 50;
      message = 'Gott! Nálægt réttri upphæð';
      isCorrect = true;
    } else {
      points = 0;
      message = `Ekki nægjanlega nákvæmt. Jafngildistaður: ${targetVolume.toFixed(2)} mL`;
      isCorrect = false;
    }

    // Indicator bonus
    const indicatorCorrect = selectedIndicator ? isIndicatorAppropriate(selectedIndicator, targetPH) : false;
    if (indicatorCorrect) {
      points += 20;
      message += ' (+20 fyrir réttan vísi)';
    }

    // Time bonus (Practice mode, under 2 minutes)
    if (gameMode === 'practice' && timeElapsed < 120 && isCorrect) {
      points += 30;
      message += ' (+30 tíma bónus)';
    }

    // Track achievements
    const maxScore = 200; // Maximum possible score per titration
    if (isCorrect) {
      trackCorrectAnswer({ firstAttempt: true });
      // Map difficulty to level: Byrjandi=1, Miðlungs=2, Háþróað/Sérfræðingur=3
      const difficultyLevel = currentTitration.difficulty === 'Byrjandi' ? 1 :
                             currentTitration.difficulty === 'Miðlungs' ? 2 : 3;
      trackLevelComplete(difficultyLevel as 1 | 2 | 3, points, maxScore, { timeTaken: timeElapsed, hintsUsed: 0 });

      // Track game completion after 3 successful titrations
      const newTitrationsCompleted = progress.titrationsCompleted + 1;
      if (newTitrationsCompleted >= 3 && newTitrationsCompleted % 3 === 0) {
        trackGameComplete();
      }
    } else {
      trackIncorrectAnswer();
    }

    setProgress(prev => ({
      ...prev,
      score: prev.score + points,
      titrationsCompleted: prev.titrationsCompleted + 1,
      highScore: Math.max(prev.highScore, prev.score + points)
    }));

    setFeedback({
      isCorrect,
      message,
      points,
      difference: difference.toFixed(2),
      equivalenceVolume: targetVolume.toFixed(2),
      equivalencePH: targetPH.toFixed(2),
      indicatorCorrect
    });

    setScreen('feedback');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (screen !== 'game' || feedback) return;

      switch (e.key) {
        case '+':
        case '=':
          addTitrant(1);
          break;
        case '-':
        case '_':
          addTitrant(-1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          addTitrant(0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          addTitrant(-0.1);
          break;
        case 'Enter':
          e.preventDefault();
          checkAnswer();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [screen, feedback, volumeAdded, currentTitration]);

  // ==================== RENDER ====================

  // Menu Screen
  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header with Achievements Button */}
            <div className="flex justify-end mb-4">
              <AchievementsButton
                achievements={achievements}
                onClick={() => setShowAchievements(true)}
              />
            </div>

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4" style={{ color: '#f36b22' }}>
                pH Þéttigreining Meistari
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Lærðu að framkvæma sýru-basa þéttigreiningar og túlka pH ferla
              </p>

              {/* Progress Stats */}
              {(progress.highScore > 0 || progress.titrationsCompleted > 0) && (
                <div className="mt-4">
                  <div className="flex justify-center gap-6 text-sm flex-wrap">
                    <div className="bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                      <span className="font-bold text-yellow-800">🏆 Hæsta stig: {progress.highScore}</span>
                    </div>
                    <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                      <span className="font-bold text-blue-800">🧪 Þéttigreiningar: {progress.titrationsCompleted}</span>
                    </div>
                  </div>
                  <button
                    onClick={resetProgress}
                    className="mt-3 text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Endurstilla framvindu
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Practice Mode */}
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <h2 className="text-2xl font-bold mb-3 text-blue-900">Æfingahamur</h2>
                <ul className="text-gray-700 mb-4 space-y-2">
                  <li>✓ Engin tímatakmörk</li>
                  <li>✓ Sjá pH stöðugt</li>
                  <li>✓ Ítarlegar útskýringar</li>
                  <li>✓ Henderson-Hasselbalch greining</li>
                  <li>✓ Nákvæmnisbónus</li>
                </ul>
                <button
                  onClick={() => startNewTitration('practice')}
                  className="w-full py-3 px-6 rounded-lg font-bold text-white transition hover:opacity-90"
                  style={{ backgroundColor: '#3b82f6' }}
                >
                  Byrja að Æfa
                </button>
              </div>

              {/* Challenge Mode */}
              <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                <h2 className="text-2xl font-bold mb-3 text-orange-900">Keppnishamur</h2>
                <ul className="text-gray-700 mb-4 space-y-2">
                  <li>⚡ Tíma bónus fyrir hraða</li>
                  <li>🎯 Stigatafla</li>
                  <li>📊 Nákvæmni skipta máli</li>
                  <li>🔬 Rétt val á vísi mikilvægt</li>
                  <li>🏆 Hámarksstig 200</li>
                </ul>
                <button
                  onClick={() => startNewTitration('challenge')}
                  className="w-full py-3 px-6 rounded-lg font-bold text-white transition hover:opacity-90"
                  style={{ backgroundColor: '#f36b22' }}
                >
                  Byrja Keppni
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Leiðbeiningar</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-bold mb-2">Þéttigreining:</h4>
                  <ul className="space-y-1">
                    <li>• Veldu vísi (indicator) fyrst</li>
                    <li>• Bættu við þéttiefni úr búretti</li>
                    <li>• Fylgstu með pH breytingum</li>
                    <li>• Finndu jafngildisstað (equivalence point)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Lyklaborð:</h4>
                  <ul className="space-y-1">
                    <li>• <kbd className="px-2 py-1 bg-gray-200 rounded">+</kbd> Bæta við 1.0 mL</li>
                    <li>• <kbd className="px-2 py-1 bg-gray-200 rounded">-</kbd> Draga frá 1.0 mL</li>
                    <li>• <kbd className="px-2 py-1 bg-gray-200 rounded">↑</kbd> Bæta við 0.1 mL</li>
                    <li>• <kbd className="px-2 py-1 bg-gray-200 rounded">↓</kbd> Draga frá 0.1 mL</li>
                    <li>• <kbd className="px-2 py-1 bg-gray-200 rounded">Enter</kbd> Athuga svar</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Available Titrations Info */}
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>📚 {titrations.length} þéttigreiningar í boði • 4 byrjenda, 6 miðlungs, 3 háþróað</p>
            </div>
          </div>
        </main>

        <footer className="text-center text-sm text-gray-500 py-4">
          <p>© 2024 Kvennaskólinn - Efnafræðileikir</p>
        </footer>

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

  // Game Screen
  if (screen === 'game' && currentTitration) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{currentTitration.name}</h2>
                <p className="text-sm text-gray-600">
                  {currentTitration.analyte.volume} mL af {currentTitration.analyte.molarity} M {currentTitration.analyte.name}
                  {' → '} þéttað með {currentTitration.titrant.molarity} M {currentTitration.titrant.name}
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Stig</p>
                  <p className="text-2xl font-bold" style={{ color: '#f36b22' }}>{progress.score}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Erfiðleiki</p>
                  <p className="text-lg font-bold text-gray-800">{currentTitration.difficulty}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Game Area */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column: Lab Equipment */}
            <div className="col-span-8 bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-3 gap-6 mb-6">
                <Burette volumeAdded={volumeAdded} isAnimating={isAnimating} />
                <Flask
                  pH={currentPH}
                  selectedIndicator={selectedIndicator}
                  volumeAnalyte={currentTitration.analyte.volume}
                  volumeTitrant={volumeAdded}
                  isSwirling={isAnimating}
                />
                <PHMeter pH={currentPH} isActive={true} />
              </div>

              {/* Controls */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-3">Stjórnun þéttiefnis</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => addTitrant(5)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    + 5.0 mL
                  </button>
                  <button
                    onClick={() => addTitrant(1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    + 1.0 mL
                  </button>
                  <button
                    onClick={() => addTitrant(0.5)}
                    className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition"
                  >
                    + 0.5 mL
                  </button>
                  <button
                    onClick={() => addTitrant(0.1)}
                    className="px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-400 transition"
                  >
                    + 0.1 mL
                  </button>
                  <button
                    onClick={() => addTitrant(-0.1)}
                    className="px-4 py-2 bg-red-300 text-white rounded hover:bg-red-400 transition"
                  >
                    - 0.1 mL
                  </button>
                  <button
                    onClick={() => setVolumeAdded(0)}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                  >
                    Endurstilla
                  </button>
                </div>
              </div>

              {/* Check Answer Button */}
              <button
                onClick={checkAnswer}
                disabled={!selectedIndicator || volumeAdded === 0}
                className="w-full mt-4 py-3 px-6 rounded-lg font-bold text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#f36b22' }}
              >
                Athuga Svar (Enter)
              </button>
            </div>

            {/* Right Column: Indicator & Curve */}
            <div className="col-span-4 space-y-6">
              <IndicatorSelector
                selectedIndicator={selectedIndicator}
                onSelect={setSelectedIndicator}
                disabled={false}
              />

              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-bold text-gray-800 mb-3">Þéttiferill (pH vs. rúmmál)</h3>
                <TitrationCurve
                  curveData={curveData}
                  currentVolume={volumeAdded}
                  currentPH={currentPH}
                  titration={currentTitration}
                  showEquivalencePoints={false}
                  width={350}
                  height={300}
                />
              </div>

              <button
                onClick={() => setScreen('menu')}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                ← Til baka
              </button>
            </div>
          </div>
        </main>

        {/* Achievement Notifications */}
        <AchievementNotificationsContainer
          notifications={notifications}
          onDismiss={dismissNotification}
        />
      </div>
    );
  }

  // Feedback Screen
  if (screen === 'feedback' && currentTitration && feedback) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Result */}
            <div className={`text-center mb-8 p-6 rounded-lg ${feedback.isCorrect ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'}`}>
              <h2 className="text-3xl font-bold mb-2" style={{ color: feedback.isCorrect ? '#22c55e' : '#ef4444' }}>
                {feedback.isCorrect ? '✓ Rétt!' : '✗ Ekki alveg'}
              </h2>
              <p className="text-xl mb-2">{feedback.message}</p>
              <p className="text-2xl font-bold" style={{ color: '#f36b22' }}>+{feedback.points} stig</p>
            </div>

            {/* Analysis */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-900 mb-3">Þín niðurstaða:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Rúmmál bætt við: <strong>{volumeAdded.toFixed(2)} mL</strong></li>
                  <li>pH við lok: <strong>{currentPH.toFixed(2)}</strong></li>
                  <li>Frávik frá jafngildi: <strong>{feedback.difference} mL</strong></li>
                  <li>Vísi: <strong className={feedback.indicatorCorrect ? 'text-green-600' : 'text-red-600'}>
                    {selectedIndicator || 'Ekkert valið'} {feedback.indicatorCorrect ? '✓' : '✗'}
                  </strong></li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-900 mb-3">Rétt svar:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Jafngildistaður: <strong>{feedback.equivalenceVolume} mL</strong></li>
                  <li>pH við jafngildi: <strong>{feedback.equivalencePH}</strong></li>
                  <li>Besti vísir: <strong>{currentTitration.bestIndicator}</strong></li>
                  {'halfEquivalencePH' in currentTitration && currentTitration.halfEquivalencePH && (
                    <li>pH við hálfpunkt: <strong>{currentTitration.halfEquivalencePH.toFixed(2)}</strong></li>
                  )}
                </ul>
              </div>
            </div>

            {/* Titration Curve with Solution */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
              <h3 className="font-bold text-gray-800 mb-4 text-center">Þéttiferill með jafngildisstöðum</h3>
              <div className="flex justify-center">
                <TitrationCurve
                  curveData={curveData}
                  currentVolume={volumeAdded}
                  currentPH={currentPH}
                  titration={currentTitration}
                  showEquivalencePoints={true}
                  width={600}
                  height={400}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => startNewTitration(gameMode)}
                className="px-8 py-3 rounded-lg font-bold text-white transition"
                style={{ backgroundColor: '#f36b22' }}
              >
                Næsta Þéttigreining
              </button>
              <button
                onClick={() => setScreen('menu')}
                className="px-8 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition"
              >
                Til Aðalvalmyndar
              </button>
            </div>
          </div>
        </main>

        {/* Achievement Notifications */}
        <AchievementNotificationsContainer
          notifications={notifications}
          onDismiss={dismissNotification}
        />
      </div>
    );
  }

  return null;
}

export default App;
