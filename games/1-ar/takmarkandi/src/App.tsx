import { useState, useEffect } from 'react';
import { GameState, Difficulty, Progress } from './types';
import { REACTIONS } from './data/reactions';
import { calculateCorrectAnswer, generateReactantCounts, calculatePoints } from './utils/calculations';
import { validateAnswer, isValidInteger } from './utils/validation';
import { playSound } from './utils/sounds';
import { storage } from './utils/storage';
import { Molecule } from './components/Molecule';
import './styles.css';

type Screen = 'instructions' | 'menu' | 'game' | 'results';

const STORAGE_KEY = 'takmarkandi-progress';

function App() {
  const [screen, setScreen] = useState<Screen>('instructions');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [timerMode, setTimerMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [gameState, setGameState] = useState<GameState>({
    currentReaction: null,
    reactant1Count: 0,
    reactant2Count: 0,
    userAnswer: {
      limitingReactant: '',
      productsFormed: {},
      excessRemaining: ''
    },
    isAnswered: false,
    isCorrect: null,
    score: 0,
    questionsAnswered: 0,
    showHint: false,
    difficulty: 'easy',
    incorrectAttempts: 0,
    showingSolution: false,
    animatingReaction: false,
    animationStep: 0
  });

  const [progress, setProgress] = useState<Progress>(() => {
    return storage.get<Progress>(STORAGE_KEY, {
      totalGames: 0,
      totalCorrect: 0,
      bestStreak: 0,
      reactionsMastered: [],
      accuracyByDifficulty: {
        easy: [],
        medium: [],
        hard: []
      },
      commonMistakes: {
        limitingReactant: 0,
        products: 0,
        excess: 0
      },
      timeSpentMinutes: 0
    });
  });

  // Timer countdown
  useEffect(() => {
    if (screen === 'game' && timerMode && timeRemaining > 0 && !gameState.isAnswered) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timerMode && timeRemaining === 0 && !gameState.isAnswered) {
      handleTimeout();
    }
  }, [screen, timerMode, timeRemaining, gameState.isAnswered]);

  const handleTimeout = () => {
    playSound(soundEnabled, 'incorrect');
    setScreen('results');
  };

  const startGame = (selectedDifficulty: Difficulty, timer: boolean) => {
    setDifficulty(selectedDifficulty);
    setTimerMode(timer);
    setStreak(0);
    setScore(0);
    setQuestionsAnswered(0);
    setCorrectAnswers(0);
    setTimeRemaining(120);
    loadNewQuestion(selectedDifficulty);
    setScreen('game');
  };

  const loadNewQuestion = (diff: Difficulty) => {
    const availableReactions = REACTIONS.filter(r => r.difficulty === diff);
    const reaction = availableReactions[Math.floor(Math.random() * availableReactions.length)];

    const { r1Count, r2Count } = generateReactantCounts(diff);

    // Initialize products formed object
    const productsFormed: Record<string, string> = {};
    reaction.products.forEach(product => {
      productsFormed[product.formula] = '';
    });

    setGameState({
      currentReaction: reaction,
      reactant1Count: r1Count,
      reactant2Count: r2Count,
      userAnswer: {
        limitingReactant: '',
        productsFormed,
        excessRemaining: ''
      },
      isAnswered: false,
      isCorrect: null,
      score: 0,
      questionsAnswered: 0,
      showHint: false,
      difficulty: diff,
      incorrectAttempts: 0,
      showingSolution: false,
      animatingReaction: false,
      animationStep: 0
    });
  };

  const handleLimitingReactantSelect = (formula: string) => {
    if (!gameState.isAnswered) {
      setGameState(prev => ({
        ...prev,
        userAnswer: {
          ...prev.userAnswer,
          limitingReactant: formula
        }
      }));
    }
  };

  const handleProductInput = (productFormula: string, value: string) => {
    if (!gameState.isAnswered) {
      setGameState(prev => ({
        ...prev,
        userAnswer: {
          ...prev.userAnswer,
          productsFormed: {
            ...prev.userAnswer.productsFormed,
            [productFormula]: value
          }
        }
      }));
    }
  };

  const handleExcessInput = (value: string) => {
    if (!gameState.isAnswered) {
      setGameState(prev => ({
        ...prev,
        userAnswer: {
          ...prev.userAnswer,
          excessRemaining: value
        }
      }));
    }
  };

  const handleSubmit = () => {
    if (!gameState.currentReaction || gameState.isAnswered) return;

    const correctAnswer = calculateCorrectAnswer(
      gameState.currentReaction,
      gameState.reactant1Count,
      gameState.reactant2Count
    );

    const validation = validateAnswer(
      gameState.userAnswer,
      correctAnswer,
      gameState.currentReaction.products
    );

    const isCorrect = validation.allCorrect;

    if (isCorrect) {
      playSound(soundEnabled, 'correct');
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
      if (newStreak % 5 === 0) {
        playSound(soundEnabled, 'streak');
      }

      const points = calculatePoints(difficulty, newStreak, timeRemaining, timerMode);
      setScore(prev => prev + points);
      setCorrectAnswers(prev => prev + 1);

      // Update progress
      const newProgress = { ...progress };
      newProgress.totalCorrect++;
      newProgress.accuracyByDifficulty[difficulty].push(1);
      if (newStreak > newProgress.bestStreak) {
        newProgress.bestStreak = newStreak;
      }
      setProgress(newProgress);
      storage.set(STORAGE_KEY, newProgress);
    } else {
      playSound(soundEnabled, 'incorrect');
      setStreak(0);

      // Track mistakes
      const newProgress = { ...progress };
      if (!validation.isLimitingCorrect) {
        newProgress.commonMistakes.limitingReactant++;
      }
      if (!validation.isProductsCorrect) {
        newProgress.commonMistakes.products++;
      }
      if (!validation.isExcessCorrect) {
        newProgress.commonMistakes.excess++;
      }
      newProgress.accuracyByDifficulty[difficulty].push(0);
      setProgress(newProgress);
      storage.set(STORAGE_KEY, newProgress);
    }

    setGameState(prev => ({
      ...prev,
      isAnswered: true,
      isCorrect
    }));

    setQuestionsAnswered(prev => prev + 1);
  };

  const handleNext = () => {
    loadNewQuestion(difficulty);
    if (timerMode) {
      setTimeRemaining(120);
    }
  };

  const handleShowHint = () => {
    setGameState(prev => ({ ...prev, showHint: !prev.showHint }));
  };

  const handleShowSolution = () => {
    setGameState(prev => ({ ...prev, showingSolution: !prev.showingSolution }));
  };

  const handleQuit = () => {
    setScreen('results');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (screen !== 'game') return;

      if (e.key === '1') {
        handleLimitingReactantSelect(gameState.currentReaction?.reactant1.formula || '');
      } else if (e.key === '2') {
        handleLimitingReactantSelect(gameState.currentReaction?.reactant2.formula || '');
      } else if (e.key === 'h' || e.key === 'H') {
        handleShowHint();
      } else if (e.key === 's' || e.key === 'S') {
        if (gameState.isAnswered) {
          handleShowSolution();
        }
      } else if (e.key === 'Enter') {
        if (!gameState.isAnswered) {
          handleSubmit();
        } else {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [screen, gameState]);

  const correctAnswer = gameState.currentReaction
    ? calculateCorrectAnswer(
        gameState.currentReaction,
        gameState.reactant1Count,
        gameState.reactant2Count
      )
    : null;

  const canSubmit =
    gameState.userAnswer.limitingReactant !== '' &&
    gameState.userAnswer.excessRemaining !== '' &&
    gameState.currentReaction?.products.every(
      p => isValidInteger(gameState.userAnswer.productsFormed[p.formula])
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Takmarkandi Hvarfefni
          </h1>
          <p className="text-lg text-gray-600">Limiting Reactants Game</p>
        </header>

        {/* Instructions Screen */}
        {screen === 'instructions' && (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Leiðbeiningar</h2>

            <div className="space-y-4 text-gray-700 mb-6">
              <p>
                Í þessum leik lærir þú að finna <strong>takmarkandi hvarfefni</strong> (limiting reactant)
                í efnahvörfum og reikna út magn afurða og afganga.
              </p>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                <h3 className="font-bold mb-2">Hvað er takmarkandi hvarfefni?</h3>
                <p>
                  Takmarkandi hvarfefnið er hvarfefnið sem eyðist fyrst í hvörfunum.
                  Það takmarkar magn afurða sem myndast.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="font-bold mb-2">Hvernig á að spila:</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Veldu takmarkandi hvarfefnið með því að smella á það</li>
                  <li>Reiknaðu hversu margar sameindur af hverri afurð myndast</li>
                  <li>Reiknaðu hversu margar sameindur eru afgangs af hinu hvarfefninu</li>
                  <li>Smelltu á "Athuga svar" til að sjá hvort þú hafir rétt</li>
                </ol>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                <h3 className="font-bold mb-2">Flýtilyklar:</h3>
                <ul className="space-y-1">
                  <li><kbd className="px-2 py-1 bg-gray-200 rounded">1</kbd> - Velja fyrra hvarfefni</li>
                  <li><kbd className="px-2 py-1 bg-gray-200 rounded">2</kbd> - Velja seinna hvarfefni</li>
                  <li><kbd className="px-2 py-1 bg-gray-200 rounded">H</kbd> - Sýna vísbendingu</li>
                  <li><kbd className="px-2 py-1 bg-gray-200 rounded">S</kbd> - Sýna lausn (eftir svar)</li>
                  <li><kbd className="px-2 py-1 bg-gray-200 rounded">Enter</kbd> - Staðfesta/Næsta</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setScreen('menu')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
            >
              Áfram í valmynd
            </button>
          </div>
        )}

        {/* Menu Screen */}
        {screen === 'menu' && (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Veldu erfiðleikastig</h2>

            {/* Progress Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Framvinda þín</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Rétt svör:</p>
                  <p className="text-2xl font-bold text-green-600">{progress.totalCorrect}</p>
                </div>
                <div>
                  <p className="text-gray-600">Besta röð:</p>
                  <p className="text-2xl font-bold text-purple-600">{progress.bestStreak}</p>
                </div>
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="space-y-4 mb-6">
              <button
                onClick={() => startGame('easy', false)}
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg p-6 text-left transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Auðvelt</h3>
                <p className="text-green-100">Einföld hlutföll (1:1, 2:1)</p>
              </button>

              <button
                onClick={() => startGame('medium', false)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg p-6 text-left transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Miðlungs</h3>
                <p className="text-yellow-100">Flóknari hlutföll (3:1, 2:3)</p>
              </button>

              <button
                onClick={() => startGame('hard', false)}
                className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg p-6 text-left transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">Erfitt</h3>
                <p className="text-red-100">Stór stuðlar og margar afurðir</p>
              </button>
            </div>

            {/* Settings */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-gray-700">Hljóð virkt</span>
              </label>
            </div>

            <button
              onClick={() => setScreen('instructions')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg transition-colors"
            >
              Til baka í leiðbeiningar
            </button>
          </div>
        )}

        {/* Game Screen */}
        {screen === 'game' && gameState.currentReaction && (
          <div className="space-y-6">
            {/* Game Header */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Stig</p>
                    <p className="text-2xl font-bold text-orange-600">{score}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Röð</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {streak > 0 && '🔥'} {streak}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rétt</p>
                    <p className="text-2xl font-bold text-green-600">
                      {correctAnswers}/{questionsAnswered}
                    </p>
                  </div>
                </div>
                {timerMode && (
                  <div>
                    <p className="text-sm text-gray-600">Tími</p>
                    <p className={`text-2xl font-bold ${timeRemaining < 30 ? 'text-red-600' : 'text-blue-600'}`}>
                      {timeRemaining}s
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Equation Display */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Efnahvörf:</h3>
              <div className="text-center text-2xl font-mono mb-6 p-4 bg-gray-50 rounded">
                {gameState.currentReaction.equation}
              </div>

              {/* Reactants Display */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div
                  className={`border-4 rounded-lg p-6 cursor-pointer transition-all ${
                    gameState.userAnswer.limitingReactant === gameState.currentReaction.reactant1.formula
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${gameState.isAnswered && correctAnswer?.limitingReactant === gameState.currentReaction.reactant1.formula ? 'ring-4 ring-green-400' : ''}`}
                  onClick={() => handleLimitingReactantSelect(gameState.currentReaction!.reactant1.formula)}
                >
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 mb-2">Hvarfefni 1 (ýttu á 1)</p>
                    <p className="text-xl font-semibold mb-4">{gameState.currentReaction.reactant1.formula}</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: gameState.reactant1Count }).map((_, i) => (
                      <Molecule
                        key={i}
                        formula={gameState.currentReaction!.reactant1.formula}
                        color={gameState.currentReaction!.reactant1.color}
                        size={40}
                        className="molecule-pop"
                      />
                    ))}
                  </div>
                  <p className="text-center mt-4 text-2xl font-bold">
                    {gameState.reactant1Count} sameind{gameState.reactant1Count !== 1 ? 'ir' : ''}
                  </p>
                </div>

                <div
                  className={`border-4 rounded-lg p-6 cursor-pointer transition-all ${
                    gameState.userAnswer.limitingReactant === gameState.currentReaction.reactant2.formula
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${gameState.isAnswered && correctAnswer?.limitingReactant === gameState.currentReaction.reactant2.formula ? 'ring-4 ring-green-400' : ''}`}
                  onClick={() => handleLimitingReactantSelect(gameState.currentReaction!.reactant2.formula)}
                >
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 mb-2">Hvarfefni 2 (ýttu á 2)</p>
                    <p className="text-xl font-semibold mb-4">{gameState.currentReaction.reactant2.formula}</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: gameState.reactant2Count }).map((_, i) => (
                      <Molecule
                        key={i}
                        formula={gameState.currentReaction!.reactant2.formula}
                        color={gameState.currentReaction!.reactant2.color}
                        size={40}
                        className="molecule-pop"
                      />
                    ))}
                  </div>
                  <p className="text-center mt-4 text-2xl font-bold">
                    {gameState.reactant2Count} sameind{gameState.reactant2Count !== 1 ? 'ir' : ''}
                  </p>
                </div>
              </div>

              {/* Products Input */}
              <div className="bg-purple-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-4">Hversu margar afurðir myndast?</h4>
                <div className="space-y-4">
                  {gameState.currentReaction.products.map((product) => (
                    <div key={product.formula} className="flex items-center gap-4">
                      <Molecule
                        formula={product.formula}
                        color={product.color}
                        size={50}
                      />
                      <label className="flex-1">
                        <span className="text-lg font-semibold mr-2">{product.formula}:</span>
                        <input
                          type="text"
                          value={gameState.userAnswer.productsFormed[product.formula] || ''}
                          onChange={(e) => handleProductInput(product.formula, e.target.value)}
                          disabled={gameState.isAnswered}
                          className={`w-24 px-3 py-2 border-2 rounded-lg text-lg ${
                            gameState.isAnswered
                              ? parseInt(gameState.userAnswer.productsFormed[product.formula]) === correctAnswer?.productsFormed[product.formula]
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="0"
                        />
                        <span className="ml-2 text-gray-600">sameind{parseInt(gameState.userAnswer.productsFormed[product.formula]) !== 1 ? 'ir' : ''}</span>
                      </label>
                      {gameState.isAnswered && (
                        <span className="text-sm font-semibold text-gray-600">
                          (Rétt svar: {correctAnswer?.productsFormed[product.formula]})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Excess Reactant Input */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Afgangur af hinu hvarfefninu:</h4>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value={gameState.userAnswer.excessRemaining}
                    onChange={(e) => handleExcessInput(e.target.value)}
                    disabled={gameState.isAnswered}
                    className={`w-24 px-3 py-2 border-2 rounded-lg text-lg ${
                      gameState.isAnswered
                        ? parseInt(gameState.userAnswer.excessRemaining) === correctAnswer?.excessRemaining
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  <span className="text-gray-600">sameind{parseInt(gameState.userAnswer.excessRemaining) !== 1 ? 'ir' : ''} afgangur</span>
                  {gameState.isAnswered && (
                    <span className="text-sm font-semibold text-gray-600">
                      (Rétt svar: {correctAnswer?.excessRemaining})
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Hint */}
            {gameState.showHint && !gameState.isAnswered && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">💡 Vísbending</h4>
                <p className="text-gray-700 mb-2">
                  1. Reiknaðu hversu oft hvert hvarfefni getur framkvæmt hvörfin með formúlunni:
                </p>
                <p className="font-mono bg-white p-2 rounded mb-2">
                  Fjöldi skipta = Fjöldi sameinda / Stuðull í jöfnu
                </p>
                <p className="text-gray-700">
                  2. Takmarkandi hvarfefnið er það sem gefur færri skipti.
                  <br />
                  3. Margfaldaðu fjölda skipta með stuðli hverrar afurðar.
                  <br />
                  4. Reiknaðu afganginn: Upphafsfjöldi - (Fjöldi skipta × Stuðull)
                </p>
              </div>
            )}

            {/* Solution */}
            {gameState.showingSolution && gameState.isAnswered && correctAnswer && (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">✓ Lausn</h4>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <p className="font-semibold">Skref 1: Reikna fjölda skipta fyrir hvort hvarfefni</p>
                    <p className="ml-4">
                      {gameState.currentReaction.reactant1.formula}: {gameState.reactant1Count} / {gameState.currentReaction.reactant1.coeff} = {correctAnswer.timesFromR1.toFixed(2)} skipti
                    </p>
                    <p className="ml-4">
                      {gameState.currentReaction.reactant2.formula}: {gameState.reactant2Count} / {gameState.currentReaction.reactant2.coeff} = {correctAnswer.timesFromR2.toFixed(2)} skipti
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Skref 2: Takmarkandi hvarfefni</p>
                    <p className="ml-4">
                      <span className="font-bold text-green-700">{correctAnswer.limitingReactant}</span> er takmarkandi því það gefur færri skipti ({Math.min(correctAnswer.timesFromR1, correctAnswer.timesFromR2).toFixed(2)})
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Skref 3: Afurðir</p>
                    {gameState.currentReaction.products.map(product => (
                      <p key={product.formula} className="ml-4">
                        {product.formula}: {correctAnswer.timesReactionRuns} × {product.coeff} = <span className="font-bold text-green-700">{correctAnswer.productsFormed[product.formula]}</span> sameind{correctAnswer.productsFormed[product.formula] !== 1 ? 'ir' : ''}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold">Skref 4: Afgangur</p>
                    <p className="ml-4">
                      {correctAnswer.excessReactant}: {correctAnswer.limitingReactant === gameState.currentReaction.reactant1.formula ? gameState.reactant2Count : gameState.reactant1Count} - ({correctAnswer.timesReactionRuns} × {correctAnswer.limitingReactant === gameState.currentReaction.reactant1.formula ? gameState.currentReaction.reactant2.coeff : gameState.currentReaction.reactant1.coeff}) = <span className="font-bold text-green-700">{correctAnswer.excessRemaining}</span> sameind{correctAnswer.excessRemaining !== 1 ? 'ir' : ''}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Feedback */}
            {gameState.isAnswered && (
              <div className={`rounded-lg p-6 ${gameState.isCorrect ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'}`}>
                <h3 className="text-2xl font-bold mb-2">
                  {gameState.isCorrect ? '✓ Rétt!' : '✗ Rangt'}
                </h3>
                {gameState.isCorrect ? (
                  <p className="text-green-800">
                    Vel gert! {streak > 1 && `Þú ert með ${streak} rétt í röð!`}
                  </p>
                ) : (
                  <p className="text-red-800">Reyndu aftur í næsta skipti!</p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {!gameState.isAnswered ? (
                <>
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={`flex-1 font-bold py-4 px-6 rounded-lg transition-colors ${
                      canSubmit
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Athuga svar
                  </button>
                  <button
                    onClick={handleShowHint}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
                  >
                    {gameState.showHint ? 'Fela vísbendingu' : 'Sýna vísbendingu (H)'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
                  >
                    Næsta spurning (Enter)
                  </button>
                  <button
                    onClick={handleShowSolution}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
                  >
                    {gameState.showingSolution ? 'Fela lausn' : 'Sýna lausn (S)'}
                  </button>
                </>
              )}
              <button
                onClick={handleQuit}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
              >
                Hætta
              </button>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {screen === 'results' && (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Niðurstöður</h2>

            <div className="space-y-4 mb-8">
              <div className="bg-orange-50 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-600 mb-1">Heildarfjöldi stiga</p>
                <p className="text-4xl font-bold text-orange-600">{score}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Rétt svör</p>
                  <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Spurningar</p>
                  <p className="text-2xl font-bold text-blue-600">{questionsAnswered}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Besta röð</p>
                  <p className="text-2xl font-bold text-purple-600">{bestStreak}</p>
                </div>
              </div>

              {questionsAnswered > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Nákvæmni</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {((correctAnswers / questionsAnswered) * 100).toFixed(1)}%
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setScreen('menu')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
              >
                Spila aftur
              </button>
              <button
                onClick={() => setScreen('instructions')}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg transition-colors"
              >
                Til baka í leiðbeiningar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
