import { useState, useEffect, useRef } from 'react';
import { Compound, Difficulty, getRandomCompound } from './data/compounds';
import { PeriodicTable } from './components/PeriodicTable';
import { CalculationBreakdown } from './components/CalculationBreakdown';
import { validateInput } from './utils/validation';
import { validateAnswer, generateContextualFeedback, calculatePoints } from './utils/calculations';

type GameMode = 'menu' | 'modeSelection' | 'difficultySelection' | 'playing' | 'gameOver' | 'stats';
type PlayMode = 'practice' | 'competition';

interface GameState {
  mode: GameMode;
  playMode: PlayMode;
  difficulty: Difficulty | 'mixed';
  currentCompound: Compound | null;
  userAnswer: string;
  score: number;
  questionsAnswered: number;
  correctAnswers: number;
  timeRemaining: number;
  streak: number;
  bestStreak: number;
  hintsUsed: number;
  showFeedback: boolean;
  lastAnswerCorrect: boolean | null;
  showSolution: boolean;
  showPeriodicTable: boolean;
  inputError: string;
  isPaused: boolean;
}

interface Progress {
  totalScore: number;
  totalQuestions: number;
  totalCorrect: number;
  bestStreak: number;
  gamesPlayed: number;
}

function loadProgress(): Progress {
  const saved = localStorage.getItem('molmassiProgress');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return { totalScore: 0, totalQuestions: 0, totalCorrect: 0, bestStreak: 0, gamesPlayed: 0 };
    }
  }
  return { totalScore: 0, totalQuestions: 0, totalCorrect: 0, bestStreak: 0, gamesPlayed: 0 };
}

function saveProgress(progress: Progress): void {
  localStorage.setItem('molmassiProgress', JSON.stringify(progress));
}

function App() {
  const [gameState, setGameState] = useState<GameState>({
    mode: 'menu',
    playMode: 'practice',
    difficulty: 'mixed',
    currentCompound: null,
    userAnswer: '',
    score: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    timeRemaining: 90,
    streak: 0,
    bestStreak: 0,
    hintsUsed: 0,
    showFeedback: false,
    lastAnswerCorrect: null,
    showSolution: false,
    showPeriodicTable: false,
    inputError: '',
    isPaused: false,
  });

  const [progress, setProgress] = useState<Progress>(loadProgress());
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect for competition mode
  useEffect(() => {
    if (gameState.mode === 'playing' && gameState.playMode === 'competition' && !gameState.isPaused) {
      timerRef.current = setInterval(() => {
        setGameState(prev => {
          if (prev.timeRemaining <= 1) {
            return { ...prev, timeRemaining: 0, mode: 'gameOver' };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.mode, gameState.playMode, gameState.isPaused]);

  const startGame = (playMode: PlayMode, difficulty: Difficulty | 'mixed') => {
    const newCompound = getRandomCompound(difficulty);
    setGameState({
      ...gameState,
      mode: 'playing',
      playMode,
      difficulty,
      currentCompound: newCompound,
      userAnswer: '',
      score: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      timeRemaining: playMode === 'competition' ? 90 : 0,
      streak: 0,
      bestStreak: 0,
      hintsUsed: 0,
      showFeedback: false,
      lastAnswerCorrect: null,
      showSolution: false,
      showPeriodicTable: false,
      inputError: '',
      isPaused: false,
    });
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSubmit = () => {
    if (!gameState.currentCompound || !gameState.userAnswer) return;

    const validation = validateInput(gameState.userAnswer);
    if (!validation.valid) {
      setGameState(prev => ({ ...prev, inputError: validation.error }));
      return;
    }

    const userValue = parseFloat(gameState.userAnswer);
    const isCorrect = validateAnswer(userValue, gameState.currentCompound.molarMass);

    if (isCorrect) {
      const points = calculatePoints(gameState.currentCompound.difficulty, gameState.timeRemaining, gameState.hintsUsed);
      const newStreak = gameState.streak + 1;
      setGameState(prev => ({
        ...prev,
        score: prev.score + points,
        questionsAnswered: prev.questionsAnswered + 1,
        correctAnswers: prev.correctAnswers + 1,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        showFeedback: true,
        lastAnswerCorrect: true,
        inputError: '',
        hintsUsed: 0,
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        questionsAnswered: prev.questionsAnswered + 1,
        streak: 0,
        showFeedback: true,
        lastAnswerCorrect: false,
        inputError: generateContextualFeedback(userValue, gameState.currentCompound!.molarMass),
      }));
    }
  };

  const nextQuestion = () => {
    const newCompound = getRandomCompound(gameState.difficulty);
    setGameState(prev => ({
      ...prev,
      currentCompound: newCompound,
      userAnswer: '',
      showFeedback: false,
      lastAnswerCorrect: null,
      showSolution: false,
      inputError: '',
      hintsUsed: 0,
    }));
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const showHint = () => {
    setGameState(prev => ({ ...prev, showSolution: true, hintsUsed: prev.hintsUsed + 1 }));
  };

  const endGame = () => {
    const newProgress = {
      totalScore: progress.totalScore + gameState.score,
      totalQuestions: progress.totalQuestions + gameState.questionsAnswered,
      totalCorrect: progress.totalCorrect + gameState.correctAnswers,
      bestStreak: Math.max(progress.bestStreak, gameState.bestStreak),
      gamesPlayed: progress.gamesPlayed + 1,
    };
    setProgress(newProgress);
    saveProgress(newProgress);
    setGameState(prev => ({ ...prev, mode: 'gameOver' }));
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      mode: 'menu',
      currentCompound: null,
      userAnswer: '',
      showFeedback: false,
      lastAnswerCorrect: null,
      showSolution: false,
      showPeriodicTable: false,
      inputError: '',
    }));
  };

  // Menu Screen
  if (gameState.mode === 'menu') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">Mólmassi Leikur</h1>
          <p className="text-center text-gray-600 mb-8">Læra um mólmassa efna</p>

          <div className="space-y-4">
            <button
              onClick={() => setGameState(prev => ({ ...prev, mode: 'modeSelection' }))}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-lg transition-colors"
            >
              Byrja Leik
            </button>

            <button
              onClick={() => setGameState(prev => ({ ...prev, mode: 'stats' }))}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-lg transition-colors"
            >
              Tölfræði
            </button>
          </div>

          {progress.gamesPlayed > 0 && (
            <div className="mt-8 bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Snögg yfirlit:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Leikir: {progress.gamesPlayed}</div>
                <div>Stigasumma: {progress.totalScore}</div>
                <div>Rétt svör: {progress.totalCorrect}/{progress.totalQuestions}</div>
                <div>Lengsta rað: {progress.bestStreak}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mode Selection
  if (gameState.mode === 'modeSelection') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Veldu leikham</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => {
                setGameState(prev => ({ ...prev, playMode: 'practice', mode: 'difficultySelection' }));
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-6 transition-colors"
            >
              <h3 className="text-2xl font-bold mb-2">Æfing</h3>
              <p className="text-sm">Engin tímatakmörkun, lærðu á þínum hraða</p>
            </button>

            <button
              onClick={() => {
                setGameState(prev => ({ ...prev, playMode: 'competition', mode: 'difficultySelection' }));
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-6 transition-colors"
            >
              <h3 className="text-2xl font-bold mb-2">Keppni</h3>
              <p className="text-sm">90 sekúndur, fáðu sem flest stig!</p>
            </button>
          </div>

          <button
            onClick={() => setGameState(prev => ({ ...prev, mode: 'menu' }))}
            className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Til baka
          </button>
        </div>
      </div>
    );
  }

  // Difficulty Selection
  if (gameState.mode === 'difficultySelection') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Veldu erfiðleikastig</h2>

          <div className="space-y-3">
            {(['easy', 'medium', 'hard', 'mixed'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => startGame(gameState.playMode, diff)}
                className={`w-full text-white font-bold py-4 px-6 rounded-lg transition-colors ${
                  diff === 'easy' ? 'bg-green-500 hover:bg-green-600' :
                  diff === 'medium' ? 'bg-yellow-500 hover:bg-yellow-600' :
                  diff === 'hard' ? 'bg-red-500 hover:bg-red-600' :
                  'bg-purple-500 hover:bg-purple-600'
                }`}
              >
                {diff === 'easy' ? 'Auðvelt' :
                 diff === 'medium' ? 'Miðlungs' :
                 diff === 'hard' ? 'Erfitt' :
                 'Blandað'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setGameState(prev => ({ ...prev, mode: 'modeSelection' }))}
            className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Til baka
          </button>
        </div>
      </div>
    );
  }

  // Stats Screen
  if (gameState.mode === 'stats') {
    const accuracy = progress.totalQuestions > 0 ? ((progress.totalCorrect / progress.totalQuestions) * 100).toFixed(1) : '0';

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Tölfræði</h2>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-600">{progress.gamesPlayed}</div>
              <div className="text-sm text-gray-600 mt-2">Leikir spilaðir</div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-600">{progress.totalScore}</div>
              <div className="text-sm text-gray-600 mt-2">Heildarstig</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-purple-600">{progress.totalCorrect}/{progress.totalQuestions}</div>
              <div className="text-sm text-gray-600 mt-2">Rétt svör</div>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-600">{accuracy}%</div>
              <div className="text-sm text-gray-600 mt-2">Nákvæmni</div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 text-center col-span-2">
              <div className="text-4xl font-bold text-yellow-600">{progress.bestStreak}</div>
              <div className="text-sm text-gray-600 mt-2">Lengsta rétta rað</div>
            </div>
          </div>

          <button
            onClick={() => setGameState(prev => ({ ...prev, mode: 'menu' }))}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Til baka
          </button>
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (gameState.mode === 'gameOver') {
    const accuracy = gameState.questionsAnswered > 0 ? ((gameState.correctAnswers / gameState.questionsAnswered) * 100).toFixed(1) : '0';

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-4xl font-bold text-center mb-2 text-gray-800">Leik Lokið!</h2>
          <p className="text-center text-gray-600 mb-8">Vel gert!</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{gameState.score}</div>
              <div className="text-sm text-gray-600 mt-1">Stig</div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{gameState.correctAnswers}/{gameState.questionsAnswered}</div>
              <div className="text-sm text-gray-600 mt-1">Rétt svör</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">{accuracy}%</div>
              <div className="text-sm text-gray-600 mt-1">Nákvæmni</div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-orange-600">{gameState.bestStreak}</div>
              <div className="text-sm text-gray-600 mt-1">Lengsta rað</div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => startGame(gameState.playMode, gameState.difficulty)}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Spila Aftur
            </button>

            <button
              onClick={resetGame}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Aftur í valmynd
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing Screen
  if (gameState.mode === 'playing' && gameState.currentCompound) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header with stats */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{gameState.score}</div>
                  <div className="text-xs text-gray-600">Stig</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{gameState.correctAnswers}/{gameState.questionsAnswered}</div>
                  <div className="text-xs text-gray-600">Rétt</div>
                </div>
                {gameState.streak > 0 && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{gameState.streak} 🔥</div>
                    <div className="text-xs text-gray-600">Rað</div>
                  </div>
                )}
              </div>

              {gameState.playMode === 'competition' && (
                <div className="text-center">
                  <div className={`text-3xl font-bold ${gameState.timeRemaining < 20 ? 'text-red-600' : 'text-gray-800'}`}>
                    {Math.floor(gameState.timeRemaining / 60)}:{(gameState.timeRemaining % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-600">Tími</div>
                </div>
              )}

              <button
                onClick={endGame}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Enda leik
              </button>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-4">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-gray-800 mb-2">
                {gameState.currentCompound.formula}
              </div>
              <div className="text-xl text-gray-600">
                {gameState.currentCompound.name}
              </div>
              <div className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                gameState.currentCompound.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                gameState.currentCompound.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {gameState.currentCompound.difficulty === 'easy' ? 'Auðvelt' :
                 gameState.currentCompound.difficulty === 'medium' ? 'Miðlungs' :
                 'Erfitt'}
              </div>
            </div>

            <div className="max-w-md mx-auto">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hver er mólmassi efnisins? (g/mol)
              </label>

              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="number"
                  value={gameState.userAnswer}
                  onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value, inputError: '' }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !gameState.showFeedback) {
                      handleSubmit();
                    } else if (e.key === 'Enter' && gameState.showFeedback) {
                      nextQuestion();
                    }
                  }}
                  disabled={gameState.showFeedback}
                  className={`flex-1 px-4 py-3 text-lg border-2 rounded-lg focus:outline-none ${
                    gameState.inputError ? 'border-red-500' : 'border-gray-300 focus:border-primary'
                  }`}
                  placeholder="Sláðu inn mólmassa..."
                  step="0.001"
                />

                {!gameState.showFeedback ? (
                  <button
                    onClick={handleSubmit}
                    className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-lg transition-colors"
                  >
                    Svara
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                  >
                    Næsta →
                  </button>
                )}
              </div>

              {gameState.inputError && (
                <p className="text-red-600 text-sm mt-2">{gameState.inputError}</p>
              )}

              {gameState.showFeedback && (
                <div className={`mt-4 p-4 rounded-lg ${
                  gameState.lastAnswerCorrect ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'
                }`}>
                  <p className={`text-lg font-bold ${
                    gameState.lastAnswerCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {gameState.lastAnswerCorrect ? '✓ Rétt svar!' : '✗ Rangt svar'}
                  </p>
                  {!gameState.lastAnswerCorrect && (
                    <p className="text-gray-700 mt-1">
                      Rétt svar: {gameState.currentCompound.molarMass.toFixed(3)} g/mol
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Helper Buttons */}
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => setGameState(prev => ({ ...prev, showPeriodicTable: true }))}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              📊 Lotukerfið
            </button>

            {!gameState.showSolution && !gameState.showFeedback && (
              <button
                onClick={showHint}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                💡 Sýna útreikning (-5 stig)
              </button>
            )}
          </div>

          {/* Solution */}
          {gameState.showSolution && (
            <CalculationBreakdown compound={gameState.currentCompound} />
          )}

          {/* Periodic Table Modal */}
          {gameState.showPeriodicTable && (
            <PeriodicTable onClose={() => setGameState(prev => ({ ...prev, showPeriodicTable: false }))} />
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default App;
