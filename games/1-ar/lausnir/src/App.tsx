import { useState, useEffect, useRef, useCallback } from 'react';
import { GameState } from './types';
import { CHEMISTRY_FACTS } from './data';
import { generateProblem } from './utils/problem-generator';
import {
  validateInput,
  checkAnswer,
  getContextualFeedback
} from './utils/validation';
import {
  getPointValue,
  getHintPenalty,
  getSpeedBonus,
  getStreakBonus,
  getMaxScore,
  getProblemCount,
  getAchievement
} from './utils/scoring';
import { BeakerVisualization } from './components/BeakerVisualization';
import { StepBySolution } from './components/StepBySolution';
import { FormulaCard } from './components/FormulaCard';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentProblem: null,
    userAnswer: '',
    score: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    isPlaying: false,
    gameOver: false,
    difficulty: 'easy',
    showFeedback: false,
    lastAnswerCorrect: null,
    showHint: false,
    hintLevel: 0,
    problemsCompleted: 0,
    totalProblems: 10,
    streak: 0,
    bestStreak: 0,
    incorrectAttempts: 0,
    showSolution: false,
    gameMode: 'competition',
    showFormulaCard: false,
    showWorkspace: false,
    workspaceValues: {},
    timerMode: false,
    timeRemaining: 90,
    soundEnabled: false,
    showBeakers: true,
    inputError: null,
    achievementShown: null
  });

  const [showInstructions, setShowInstructions] = useState(true);
  const [animateBeakers, setAnimateBeakers] = useState(false);
  const [currentFact, setCurrentFact] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const themeColor = gameState.gameMode === 'practice' ? '#10b981' : '#f36b22';
  const themeColorDark = gameState.gameMode === 'practice' ? '#059669' : '#d95a1a';

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeRemaining <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return { ...prev, timeRemaining: 0, showFeedback: true, lastAnswerCorrect: false };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);
  }, []);

  const startGame = useCallback(() => {
    const problemsCount = getProblemCount(gameState.difficulty);
    const firstProblem = generateProblem(gameState.difficulty);

    setGameState((prev) => ({
      ...prev,
      currentProblem: firstProblem,
      userAnswer: '',
      score: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      isPlaying: true,
      gameOver: false,
      showFeedback: false,
      lastAnswerCorrect: null,
      showHint: false,
      hintLevel: 0,
      problemsCompleted: 0,
      totalProblems: problemsCount,
      streak: 0,
      incorrectAttempts: 0,
      showSolution: false,
      inputError: null,
      timeRemaining: 90
    }));

    setAnimateBeakers(true);
    setTimeout(() => setAnimateBeakers(false), 2000);

    if (gameState.timerMode) {
      startTimer();
    }
  }, [gameState.difficulty, gameState.timerMode, startTimer]);

  const checkAnswerHandler = useCallback(() => {
    if (!gameState.currentProblem || !gameState.userAnswer.trim()) return;

    const validation = validateInput(gameState.userAnswer);
    if (!validation.valid) {
      setGameState((prev) => ({ ...prev, inputError: validation.error }));
      return;
    }

    const userValue = validation.value!;
    const correctAnswer = gameState.currentProblem.answer;
    const isCorrect = checkAnswer(userValue, correctAnswer);

    const pointValue = getPointValue(gameState.currentProblem.difficulty);
    const hintPenalty = getHintPenalty(gameState.hintLevel, gameState.gameMode);
    const speedBonus = isCorrect
      ? getSpeedBonus(gameState.timeRemaining, gameState.timerMode)
      : 0;

    const newStreak = isCorrect ? gameState.streak + 1 : 0;
    const streakBonus = getStreakBonus(newStreak);

    const achievement = isCorrect
      ? getAchievement(newStreak, gameState.currentProblem.type)
      : null;

    setGameState((prev) => {
      const newProblemsCompleted = prev.problemsCompleted + 1;
      const isGameOver = newProblemsCompleted >= prev.totalProblems;

      return {
        ...prev,
        score: isCorrect
          ? prev.score + pointValue - hintPenalty + speedBonus + streakBonus
          : prev.score,
        questionsAnswered: prev.questionsAnswered + 1,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        showFeedback: true,
        lastAnswerCorrect: isCorrect,
        problemsCompleted: newProblemsCompleted,
        gameOver: isGameOver,
        isPlaying: !isGameOver,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        incorrectAttempts: isCorrect ? 0 : prev.incorrectAttempts + 1,
        achievementShown: achievement
      };
    });

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (Math.random() < 0.3) {
      setCurrentFact(
        CHEMISTRY_FACTS[Math.floor(Math.random() * CHEMISTRY_FACTS.length)]
      );
    }

    setTimeout(() => {
      if (gameState.problemsCompleted + 1 < gameState.totalProblems) {
        const nextProblem = generateProblem(gameState.difficulty);
        setGameState((prev) => ({
          ...prev,
          currentProblem: nextProblem,
          userAnswer: '',
          showFeedback: false,
          lastAnswerCorrect: null,
          showHint: false,
          hintLevel: 0,
          incorrectAttempts: 0,
          showSolution: false,
          inputError: null,
          timeRemaining: 90,
          achievementShown: null
        }));
        setAnimateBeakers(true);
        setTimeout(() => setAnimateBeakers(false), 2000);
        if (inputRef.current) inputRef.current.focus();
        if (gameState.timerMode) startTimer();
      } else {
        setCurrentFact(null);
      }
    }, 3000);
  }, [gameState, startTimer]);

  const showNextHint = () => {
    setGameState((prev) => ({
      ...prev,
      hintLevel: Math.min(prev.hintLevel + 1, 3),
      showHint: true
    }));
  };

  const revealSolution = () => {
    setGameState((prev) => ({
      ...prev,
      showSolution: true,
      score: prev.gameMode === 'competition' ? prev.score + 5 : prev.score
    }));
  };

  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState((prev) => ({
      ...prev,
      currentProblem: null,
      userAnswer: '',
      score: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      isPlaying: false,
      gameOver: false,
      showFeedback: false,
      lastAnswerCorrect: null,
      showHint: false,
      hintLevel: 0,
      problemsCompleted: 0,
      streak: 0,
      incorrectAttempts: 0,
      showSolution: false,
      inputError: null
    }));
    setCurrentFact(null);
  };

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.key === 'Enter' &&
        !gameState.showFeedback &&
        gameState.userAnswer.trim()
      ) {
        checkAnswerHandler();
      } else if (e.key === 'h' || e.key === 'H') {
        if (!gameState.showFeedback && gameState.hintLevel < 3) {
          showNextHint();
        }
      } else if (e.key === 's' || e.key === 'S') {
        if (gameState.incorrectAttempts >= 2 && !gameState.showSolution) {
          revealSolution();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        setGameState((prev) => ({ ...prev, showFormulaCard: !prev.showFormulaCard }));
      } else if (e.key === 'r' || e.key === 'R') {
        setAnimateBeakers(true);
        setTimeout(() => setAnimateBeakers(false), 2000);
      } else if (e.key === '?') {
        setShowInstructions(true);
      }
    },
    [gameState.showFeedback, gameState.userAnswer, gameState.hintLevel, gameState.incorrectAttempts, gameState.showSolution, checkAnswerHandler]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameState.isPlaying && !gameState.showFeedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState.isPlaying, gameState.showFeedback, gameState.currentProblem]);

  useEffect(() => {
    if (gameState.userAnswer && gameState.inputError) {
      const validation = validateInput(gameState.userAnswer);
      if (validation.valid) {
        setGameState((prev) => ({ ...prev, inputError: null }));
      }
    }
  }, [gameState.userAnswer, gameState.inputError]);

  // Instructions Screen
  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h1
            className="text-3xl md:text-4xl font-bold text-center mb-6"
            style={{ color: '#f36b22' }}
          >
            💧 Lausnir
          </h1>

          <div className="space-y-4 text-gray-700">
            <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#f36b22' }}>
              Leiðbeiningar
            </h2>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Markmið:</h3>
              <p>
                Leysðu verkefni um mólstyrk, útþynningu og blöndun lausna! Sjáðu sjónræn
                bollalíkön og lærðu með skref-fyrir-skref lausnum.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Verkefnategundir:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  <strong>Útþynning:</strong> M₁V₁ = M₂V₂
                </li>
                <li>
                  <strong>Mólstyrkur:</strong> M = mól / lítrar
                </li>
                <li>
                  <strong>Blöndun:</strong> Tvær lausnir blandaðar
                </li>
                <li>
                  <strong>Massi ↔ Mólstyrkur:</strong> Umreikning með mólþyngd
                </li>
              </ol>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Formúlur:</h3>
              <div className="font-mono text-sm space-y-1 bg-white p-3 rounded">
                <p>M₁V₁ = M₂V₂ (útþynning)</p>
                <p>M = mól / L (mólstyrkur)</p>
                <p>mól = massi(g) / mólþyngd(g/mol)</p>
                <p>M = (M₁V₁ + M₂V₂) / (V₁ + V₂) (blöndun)</p>
                <p>1 L = 1000 mL</p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Nýir eiginleikar:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>🔬 Sjónræn bollalíkön með hreyfingum</li>
                <li>📝 Skref-fyrir-skref lausnir</li>
                <li>🔥 Röð (streak) kerfi með umbun</li>
                <li>💡 3-þrepa ábendingakerfi</li>
                <li>
                  ⌨️ Flýtilyklar (H=ábending, F=formúlur, R=endurtaka hreyfingu, ?=hjálp)
                </li>
                <li>🎯 Æfinga- eða keppnisstilling</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Stigagjöf:</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <strong>Auðvelt:</strong> 10 stig × 8 spurningar = 80 max
                </li>
                <li>
                  <strong>Miðlungs:</strong> 15 stig × 10 spurningar = 150 max
                </li>
                <li>
                  <strong>Erfitt:</strong> 20 stig × 12 spurningar = 240 max
                </li>
                <li>
                  <strong>Ábendingar:</strong> -2, -2, -3 stig (1., 2., 3. ábending)
                </li>
                <li>
                  <strong>Röð:</strong> +5 fyrir 3 í röð, +10 fyrir 5 í röð
                </li>
                <li>
                  <strong>Hraðaumbuð:</strong> +10 ef &lt;20s, +5 ef &lt;30s (í tímamóti)
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setShowInstructions(false)}
            className="w-full mt-6 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 text-lg"
            style={{ backgroundColor: '#f36b22' }}
            onMouseOver={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = '#d95a1a')
            }
            onMouseOut={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = '#f36b22')
            }
          >
            Byrja að spila 🚀
          </button>
        </div>
      </div>
    );
  }

  // Menu Screen
  if (!gameState.isPlaying && !gameState.gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h1
            className="text-3xl md:text-4xl font-bold text-center mb-6"
            style={{ color: '#f36b22' }}
          >
            💧 Lausnir
          </h1>

          <div className="space-y-6">
            {/* Game mode selection */}
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">Veldu leikstillingu:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() =>
                    setGameState((prev) => ({ ...prev, gameMode: 'competition' }))
                  }
                  className={`p-6 rounded-xl border-4 transition-all ${
                    gameState.gameMode === 'competition'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 bg-white hover:border-orange-200'
                  }`}
                >
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-xl font-bold">Keppnisstilling</div>
                  <div className="text-sm mt-2 text-gray-600">
                    Stigagjöf, tímamót, ábendingar kosta stig
                  </div>
                </button>
                <button
                  onClick={() => setGameState((prev) => ({ ...prev, gameMode: 'practice' }))}
                  className={`p-6 rounded-xl border-4 transition-all ${
                    gameState.gameMode === 'practice'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-green-200'
                  }`}
                >
                  <div className="text-3xl mb-2">📚</div>
                  <div className="text-xl font-bold">Æfingastilling</div>
                  <div className="text-sm mt-2 text-gray-600">
                    Engin stig, ókeypis ábendingar, ótakmarkað
                  </div>
                </button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">Veldu erfiðleikastig:</p>
            </div>

            <div className="grid gap-4">
              <button
                onClick={() => {
                  setGameState((prev) => ({ ...prev, difficulty: 'easy' }));
                  setTimeout(startGame, 100);
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-6 rounded-xl transition-colors"
              >
                <div className="text-2xl mb-2">😊</div>
                <div className="text-xl">Auðvelt</div>
                <div className="text-sm opacity-90 mt-2">
                  8 spurningar - Einföld útþynning og mólstyrkur
                </div>
              </button>

              <button
                onClick={() => {
                  setGameState((prev) => ({ ...prev, difficulty: 'medium' }));
                  setTimeout(startGame, 100);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-6 px-6 rounded-xl transition-colors"
              >
                <div className="text-2xl mb-2">🤔</div>
                <div className="text-xl">Miðlungs</div>
                <div className="text-sm opacity-90 mt-2">
                  10 spurningar - Með massi og mólþyngd
                </div>
              </button>

              <button
                onClick={() => {
                  setGameState((prev) => ({ ...prev, difficulty: 'hard' }));
                  setTimeout(startGame, 100);
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-6 px-6 rounded-xl transition-colors"
              >
                <div className="text-2xl mb-2">😰</div>
                <div className="text-xl">Erfitt</div>
                <div className="text-sm opacity-90 mt-2">
                  12 spurningar - Blöndun og flókin verkefni
                </div>
              </button>
            </div>

            {/* Optional settings */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-semibold mb-3">Valfrjálsar stillingar:</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gameState.timerMode}
                    onChange={(e) =>
                      setGameState((prev) => ({ ...prev, timerMode: e.target.checked }))
                    }
                    className="w-5 h-5"
                  />
                  <span>⏱️ Tímamót (90 sek á spurningu, hraðabónus)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gameState.showBeakers}
                    onChange={(e) =>
                      setGameState((prev) => ({ ...prev, showBeakers: e.target.checked }))
                    }
                    className="w-5 h-5"
                  />
                  <span>🔬 Sýna sjónræn bollalíkön</span>
                </label>
              </div>
            </div>

            <button
              onClick={() => setShowInstructions(true)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              📖 Sjá leiðbeiningar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (gameState.gameOver) {
    const accuracy =
      gameState.questionsAnswered > 0
        ? ((gameState.correctAnswers / gameState.questionsAnswered) * 100).toFixed(1)
        : '0';

    const maxScore = getMaxScore(gameState.difficulty);
    const percentage =
      gameState.gameMode === 'competition'
        ? ((gameState.score / maxScore) * 100).toFixed(0)
        : accuracy;

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h1
            className="text-3xl md:text-4xl font-bold text-center mb-6"
            style={{ color: themeColor }}
          >
            🎉 Til hamingju!
          </h1>

          <div className="space-y-6">
            {gameState.gameMode === 'competition' && (
              <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-6 rounded-xl">
                <div className="text-center">
                  <div
                    className="text-4xl md:text-6xl font-bold mb-2"
                    style={{ color: '#f36b22' }}
                  >
                    {gameState.score}
                  </div>
                  <div className="text-lg md:text-xl text-gray-700">
                    af {maxScore} stigum mögulegum
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mt-2">
                    {percentage}%
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">
                  {gameState.totalProblems}
                </div>
                <div className="text-sm text-gray-700">Spurningar</div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600">
                  {gameState.correctAnswers}
                </div>
                <div className="text-sm text-gray-700">Rétt</div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-600">
                  {accuracy}%
                </div>
                <div className="text-sm text-gray-700">Nákvæmni</div>
              </div>

              <div className="bg-red-50 p-4 rounded-xl text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600">
                  {gameState.bestStreak}
                </div>
                <div className="text-sm text-gray-700">Lengsta röð</div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl">
              <h3 className="font-semibold text-center mb-2">
                {parseInt(percentage) >= 90
                  ? '🌟 Fullkomið!'
                  : parseInt(percentage) >= 75
                  ? '👍 Frábært!'
                  : parseInt(percentage) >= 60
                  ? '💪 Vel gert!'
                  : '📚 Haltu áfram!'}
              </h3>
              <p className="text-center text-sm text-gray-700">
                {parseInt(percentage) >= 90
                  ? 'Þú skilur mólstyrk fullkomlega!'
                  : parseInt(percentage) >= 75
                  ? 'Mjög góð þekking á lausnum!'
                  : parseInt(percentage) >= 60
                  ? 'Á góðri leið!'
                  : 'Æfðu meira með formúlunum!'}
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={resetGame}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-colors"
              >
                ↻ Velja stig
              </button>
              <button
                onClick={() => startGame()}
                className="flex-1 text-white font-bold py-4 px-6 rounded-xl transition-colors"
                style={{ backgroundColor: themeColor }}
                onMouseOver={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor = themeColorDark)
                }
                onMouseOut={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor = themeColor)
                }
              >
                Spila aftur
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game Playing Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h1
              className="text-xl md:text-3xl font-bold flex items-center gap-2"
              style={{ color: themeColor }}
            >
              💧 Lausnir
              <span className="text-sm md:text-base font-normal text-gray-600">
                ({gameState.gameMode === 'practice' ? 'Æfing' : 'Keppni'})
              </span>
            </h1>

            <div className="flex gap-2 md:gap-4 items-center flex-wrap">
              {gameState.gameMode === 'competition' && (
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1" style={{ color: themeColor }}>
                    <span>🏆</span>
                    <span className="text-xl md:text-2xl font-bold">{gameState.score}</span>
                  </div>
                  <div className="text-xs text-gray-600">Stig</div>
                </div>
              )}

              {gameState.streak > 0 && (
                <div className="text-center">
                  <div className="flex items-center gap-2 mb-1 text-red-600">
                    <span className="streak-flame">🔥</span>
                    <span className="text-xl md:text-2xl font-bold">{gameState.streak}</span>
                  </div>
                  <div className="text-xs text-gray-600">Röð</div>
                </div>
              )}

              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-blue-600">
                  {gameState.problemsCompleted}/{gameState.totalProblems}
                </div>
                <div className="text-xs text-gray-600">Framvinda</div>
              </div>

              {gameState.timerMode && gameState.timeRemaining > 0 && (
                <div
                  className={`text-center ${gameState.timeRemaining < 15 ? 'timer-warning' : ''}`}
                >
                  <div
                    className={`text-xl md:text-2xl font-bold ${gameState.timeRemaining < 15 ? 'text-red-600' : 'text-purple-600'}`}
                  >
                    ⏱️ {gameState.timeRemaining}s
                  </div>
                  <div className="text-xs text-gray-600">Tími</div>
                </div>
              )}

              <button
                onClick={() =>
                  setGameState((prev) => ({
                    ...prev,
                    showFormulaCard: !prev.showFormulaCard
                  }))
                }
                className="p-2 rounded-lg transition-colors text-sm md:text-base"
                style={{ color: themeColor }}
                onMouseOver={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor = '#fff7ed')
                }
                onMouseOut={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor = 'transparent')
                }
                title="Formúlur (F)"
              >
                📐
              </button>

              <button
                onClick={() => setShowInstructions(true)}
                className="p-2 rounded-lg transition-colors text-sm md:text-base"
                style={{ color: themeColor }}
                onMouseOver={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor = '#fff7ed')
                }
                onMouseOut={(e) =>
                  ((e.target as HTMLButtonElement).style.backgroundColor = 'transparent')
                }
                title="Hjálp (?)"
              >
                ❓
              </button>
            </div>
          </div>

          <div className="mt-4 bg-gray-200 rounded-full h-2 md:h-3">
            <div
              className="h-2 md:h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(gameState.problemsCompleted / gameState.totalProblems) * 100}%`,
                background: `linear-gradient(to right, ${themeColor}, ${themeColorDark})`
              }}
            />
          </div>
        </div>

        {/* Achievement notification */}
        {gameState.achievementShown && (
          <div className="mb-6 bg-gradient-to-r from-yellow-100 to-yellow-200 border-4 border-yellow-400 rounded-xl p-4 text-center animate-pulse">
            <div className="text-2xl md:text-3xl font-bold text-yellow-800">
              {gameState.achievementShown}
            </div>
          </div>
        )}

        {/* Formula reference card */}
        {gameState.showFormulaCard && <FormulaCard themeColor={themeColor} />}

        {/* Chemistry fact */}
        {currentFact && (
          <div className="mb-6 bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
            <h3 className="font-bold text-blue-800 mb-2">💡 Visstu að...?</h3>
            <p className="text-blue-900">{currentFact}</p>
          </div>
        )}

        {/* Problem Area */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8">
          {gameState.currentProblem && (
            <>
              <div className="mb-6">
                <div
                  className="inline-block bg-orange-100 px-4 py-2 rounded-full text-sm font-semibold mb-4"
                  style={{ color: themeColorDark }}
                >
                  {gameState.currentProblem.description}
                </div>

                <div className="text-lg md:text-xl text-gray-800 leading-relaxed">
                  {gameState.currentProblem.question}
                </div>
              </div>

              {/* Beaker visualization */}
              {gameState.showBeakers && (
                <div className="mb-6">
                  <div className="flex justify-center mb-2">
                    <button
                      onClick={() => {
                        setAnimateBeakers(true);
                        setTimeout(() => setAnimateBeakers(false), 2000);
                      }}
                      className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
                      title="Endurtaka hreyfingu (R)"
                    >
                      🔄 Endurtaka hreyfingu
                    </button>
                  </div>
                  <BeakerVisualization
                    problem={gameState.currentProblem}
                    animate={animateBeakers}
                  />
                </div>
              )}

              {/* Hints */}
              {gameState.showHint && gameState.hintLevel > 0 && (
                <div className="mb-4 bg-yellow-50 border-2 border-yellow-300 p-4 rounded-xl">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    💡 Ábending {gameState.hintLevel}:
                    {gameState.gameMode === 'competition' && (
                      <span className="text-sm">
                        (-
                        {gameState.hintLevel === 1
                          ? 2
                          : gameState.hintLevel === 2
                          ? 2
                          : 3}{' '}
                        stig)
                      </span>
                    )}
                  </h4>
                  <p className="text-yellow-900">
                    {gameState.currentProblem.hints[gameState.hintLevel - 1]}
                  </p>
                </div>
              )}

              {/* Show solution */}
              {gameState.showSolution && (
                <div className="mb-4 bg-blue-50 border-2 border-blue-300 p-4 rounded-xl">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    📖 Fullkomin lausn
                    {gameState.gameMode === 'competition' && (
                      <span className="text-sm"> (+5 stig fyrir tilraun)</span>
                    )}
                  </h4>
                  <StepBySolution problem={gameState.currentProblem} />
                </div>
              )}

              {/* Answer Input */}
              <div className="max-w-md mx-auto">
                {!gameState.showFeedback ? (
                  <div className="space-y-4">
                    <div className="flex gap-2 items-end">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Svar:
                        </label>
                        <input
                          ref={inputRef}
                          type="number"
                          inputMode="decimal"
                          step="any"
                          value={gameState.userAnswer}
                          onChange={(e) =>
                            setGameState((prev) => ({
                              ...prev,
                              userAnswer: e.target.value
                            }))
                          }
                          placeholder="0.000"
                          className={`w-full p-3 text-xl border-2 rounded-lg focus:outline-none text-center font-bold ${
                            gameState.inputError ? 'input-error' : ''
                          }`}
                          style={{
                            borderColor: gameState.inputError ? '#ef4444' : themeColor
                          }}
                          onFocus={(e) =>
                            !gameState.inputError &&
                            ((e.target as HTMLInputElement).style.borderColor =
                              themeColorDark)
                          }
                          onBlur={(e) =>
                            !gameState.inputError &&
                            ((e.target as HTMLInputElement).style.borderColor = themeColor)
                          }
                          autoFocus
                          aria-label="Svarsvæði"
                          aria-invalid={gameState.inputError ? 'true' : 'false'}
                          aria-describedby={gameState.inputError ? 'input-error' : undefined}
                        />
                        {gameState.inputError && (
                          <div id="input-error" className="error-message" role="alert">
                            ⚠️ {gameState.inputError}
                          </div>
                        )}
                      </div>
                      <div className="text-xl font-bold text-gray-600 pb-3">
                        {gameState.currentProblem.unit}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                      {gameState.hintLevel < 3 && (
                        <button
                          onClick={showNextHint}
                          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                          title="Ábending (H)"
                        >
                          💡 Ábending {gameState.hintLevel + 1}
                          {gameState.gameMode === 'competition' &&
                            ` (-${gameState.hintLevel === 0 ? 2 : gameState.hintLevel === 1 ? 2 : 3})`}
                        </button>
                      )}
                      {gameState.incorrectAttempts >= 2 && !gameState.showSolution && (
                        <button
                          onClick={revealSolution}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                          title="Sýna lausn (S)"
                        >
                          📖 Sýna lausn
                          {gameState.gameMode === 'competition' && ' (+5)'}
                        </button>
                      )}
                      <button
                        onClick={checkAnswerHandler}
                        disabled={!gameState.userAnswer.trim() || !!gameState.inputError}
                        className="flex-1 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor:
                            gameState.userAnswer.trim() && !gameState.inputError
                              ? themeColor
                              : undefined
                        }}
                        onMouseOver={(e) => {
                          if (gameState.userAnswer.trim() && !gameState.inputError)
                            (e.target as HTMLButtonElement).style.backgroundColor =
                              themeColorDark;
                        }}
                        onMouseOut={(e) => {
                          if (gameState.userAnswer.trim() && !gameState.inputError)
                            (e.target as HTMLButtonElement).style.backgroundColor =
                              themeColor;
                        }}
                        title="Athuga (Enter)"
                      >
                        Athuga ✓
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      className={`p-6 rounded-xl mb-4 ${
                        gameState.lastAnswerCorrect
                          ? 'bg-green-50 border-4 border-green-300'
                          : 'bg-red-50 border-4 border-red-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-2">
                          {gameState.lastAnswerCorrect ? '✅' : '❌'}
                        </div>
                        <div className="text-2xl font-bold mb-2">
                          {gameState.lastAnswerCorrect ? 'Rétt!' : 'Rangt'}
                        </div>
                        <div className="text-lg text-gray-700">
                          Rétt svar:{' '}
                          <span className="font-bold">
                            {gameState.currentProblem.answer.toFixed(3)}{' '}
                            {gameState.currentProblem.unit}
                          </span>
                        </div>
                        {!gameState.lastAnswerCorrect && (
                          <>
                            <div className="text-sm text-gray-600 mt-2">
                              Þitt svar: {gameState.userAnswer}{' '}
                              {gameState.currentProblem.unit}
                            </div>
                            <div className="text-sm text-red-700 mt-2 font-semibold">
                              {getContextualFeedback(
                                parseFloat(gameState.userAnswer),
                                gameState.currentProblem.answer
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Always show step-by-step after answering */}
                    <StepBySolution problem={gameState.currentProblem} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Keyboard shortcuts reminder */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            ⌨️ Flýtilyklar: <strong>Enter</strong>=athuga, <strong>H</strong>=ábending,{' '}
            <strong>S</strong>=sýna lausn, <strong>F</strong>=formúlur,{' '}
            <strong>R</strong>=endurtaka, <strong>?</strong>=hjálp
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
