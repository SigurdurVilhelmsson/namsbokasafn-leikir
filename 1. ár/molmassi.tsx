import React, { useState, useEffect, useRef } from 'react';
import { Calculator, Trophy, RotateCcw, HelpCircle, Zap, Clock } from 'lucide-react';

interface Element {
  symbol: string;
  name: string;
  atomicMass: number;
}

// Periodic table data (common elements)
const elements: Element[] = [
  { symbol: 'H', name: 'Hydrogen', atomicMass: 1.008 },
  { symbol: 'C', name: 'Carbon', atomicMass: 12.011 },
  { symbol: 'N', name: 'Nitrogen', atomicMass: 14.007 },
  { symbol: 'O', name: 'Oxygen', atomicMass: 15.999 },
  { symbol: 'F', name: 'Fluorine', atomicMass: 18.998 },
  { symbol: 'Na', name: 'Sodium', atomicMass: 22.990 },
  { symbol: 'Mg', name: 'Magnesium', atomicMass: 24.305 },
  { symbol: 'Al', name: 'Aluminum', atomicMass: 26.982 },
  { symbol: 'Si', name: 'Silicon', atomicMass: 28.086 },
  { symbol: 'P', name: 'Phosphorus', atomicMass: 30.974 },
  { symbol: 'S', name: 'Sulfur', atomicMass: 32.06 },
  { symbol: 'Cl', name: 'Chlorine', atomicMass: 35.45 },
  { symbol: 'K', name: 'Potassium', atomicMass: 39.098 },
  { symbol: 'Ca', name: 'Calcium', atomicMass: 40.078 },
  { symbol: 'Fe', name: 'Iron', atomicMass: 55.845 },
  { symbol: 'Cu', name: 'Copper', atomicMass: 63.546 },
  { symbol: 'Zn', name: 'Zinc', atomicMass: 65.38 },
  { symbol: 'Br', name: 'Bromine', atomicMass: 79.904 },
  { symbol: 'Ag', name: 'Silver', atomicMass: 107.868 },
  { symbol: 'I', name: 'Iodine', atomicMass: 126.904 },
];

interface Compound {
  formula: string;
  name: string;
  elements: { symbol: string; count: number }[];
  molarMass: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const compoundsList: Compound[] = [
  // Easy - Simple molecules
  { formula: 'H₂O', name: 'Water', elements: [{symbol: 'H', count: 2}, {symbol: 'O', count: 1}], molarMass: 18.015, difficulty: 'easy' },
  { formula: 'CO₂', name: 'Carbon dioxide', elements: [{symbol: 'C', count: 1}, {symbol: 'O', count: 2}], molarMass: 44.009, difficulty: 'easy' },
  { formula: 'NH₃', name: 'Ammonia', elements: [{symbol: 'N', count: 1}, {symbol: 'H', count: 3}], molarMass: 17.031, difficulty: 'easy' },
  { formula: 'CH₄', name: 'Methane', elements: [{symbol: 'C', count: 1}, {symbol: 'H', count: 4}], molarMass: 16.043, difficulty: 'easy' },
  { formula: 'NaCl', name: 'Sodium chloride', elements: [{symbol: 'Na', count: 1}, {symbol: 'Cl', count: 1}], molarMass: 58.440, difficulty: 'easy' },
  { formula: 'O₂', name: 'Oxygen', elements: [{symbol: 'O', count: 2}], molarMass: 31.998, difficulty: 'easy' },
  { formula: 'HCl', name: 'Hydrochloric acid', elements: [{symbol: 'H', count: 1}, {symbol: 'Cl', count: 1}], molarMass: 36.458, difficulty: 'easy' },
  { formula: 'MgO', name: 'Magnesium oxide', elements: [{symbol: 'Mg', count: 1}, {symbol: 'O', count: 1}], molarMass: 40.304, difficulty: 'easy' },
  
  // Medium - More complex molecules
  { formula: 'H₂SO₄', name: 'Sulfuric acid', elements: [{symbol: 'H', count: 2}, {symbol: 'S', count: 1}, {symbol: 'O', count: 4}], molarMass: 98.079, difficulty: 'medium' },
  { formula: 'CaCO₃', name: 'Calcium carbonate', elements: [{symbol: 'Ca', count: 1}, {symbol: 'C', count: 1}, {symbol: 'O', count: 3}], molarMass: 100.087, difficulty: 'medium' },
  { formula: 'NaOH', name: 'Sodium hydroxide', elements: [{symbol: 'Na', count: 1}, {symbol: 'O', count: 1}, {symbol: 'H', count: 1}], molarMass: 39.997, difficulty: 'medium' },
  { formula: 'C₆H₁₂O₆', name: 'Glucose', elements: [{symbol: 'C', count: 6}, {symbol: 'H', count: 12}, {symbol: 'O', count: 6}], molarMass: 180.156, difficulty: 'medium' },
  { formula: 'Ca(OH)₂', name: 'Calcium hydroxide', elements: [{symbol: 'Ca', count: 1}, {symbol: 'O', count: 2}, {symbol: 'H', count: 2}], molarMass: 74.093, difficulty: 'medium' },
  { formula: 'Al₂O₃', name: 'Aluminum oxide', elements: [{symbol: 'Al', count: 2}, {symbol: 'O', count: 3}], molarMass: 101.961, difficulty: 'medium' },
  { formula: 'HNO₃', name: 'Nitric acid', elements: [{symbol: 'H', count: 1}, {symbol: 'N', count: 1}, {symbol: 'O', count: 3}], molarMass: 63.012, difficulty: 'medium' },
  { formula: 'KNO₃', name: 'Potassium nitrate', elements: [{symbol: 'K', count: 1}, {symbol: 'N', count: 1}, {symbol: 'O', count: 3}], molarMass: 101.103, difficulty: 'medium' },
  
  // Hard - Complex molecules
  { formula: 'Ca₃(PO₄)₂', name: 'Calcium phosphate', elements: [{symbol: 'Ca', count: 3}, {symbol: 'P', count: 2}, {symbol: 'O', count: 8}], molarMass: 310.177, difficulty: 'hard' },
  { formula: 'Al(OH)₃', name: 'Aluminum hydroxide', elements: [{symbol: 'Al', count: 1}, {symbol: 'O', count: 3}, {symbol: 'H', count: 3}], molarMass: 78.004, difficulty: 'hard' },
  { formula: '(NH₄)₂SO₄', name: 'Ammonium sulfate', elements: [{symbol: 'N', count: 2}, {symbol: 'H', count: 8}, {symbol: 'S', count: 1}, {symbol: 'O', count: 4}], molarMass: 132.140, difficulty: 'hard' },
  { formula: 'Fe₂O₃', name: 'Iron(III) oxide', elements: [{symbol: 'Fe', count: 2}, {symbol: 'O', count: 3}], molarMass: 159.688, difficulty: 'hard' },
  { formula: 'CuSO₄·5H₂O', name: 'Copper(II) sulfate pentahydrate', elements: [{symbol: 'Cu', count: 1}, {symbol: 'S', count: 1}, {symbol: 'O', count: 9}, {symbol: 'H', count: 10}], molarMass: 249.685, difficulty: 'hard' },
  { formula: 'Mg(NO₃)₂', name: 'Magnesium nitrate', elements: [{symbol: 'Mg', count: 1}, {symbol: 'N', count: 2}, {symbol: 'O', count: 6}], molarMass: 148.315, difficulty: 'hard' },
];

interface GameState {
  currentCompound: Compound | null;
  userAnswer: string;
  score: number;
  questionsAnswered: number;
  correctAnswers: number;
  timeRemaining: number;
  isPlaying: boolean;
  gameOver: boolean;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  showFeedback: boolean;
  lastAnswerCorrect: boolean | null;
  streak: number;
  bestStreak: number;
  showPeriodicTable: boolean;
}

const MolarMassChallenge: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentCompound: null,
    userAnswer: '',
    score: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    timeRemaining: 90,
    isPlaying: false,
    gameOver: false,
    difficulty: 'mixed',
    showFeedback: false,
    lastAnswerCorrect: null,
    streak: 0,
    bestStreak: 0,
    showPeriodicTable: false
  });

  const [showInstructions, setShowInstructions] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getElementMass = (symbol: string): number => {
    const element = elements.find(e => e.symbol === symbol);
    return element ? element.atomicMass : 0;
  };

  const generateQuestion = (difficulty: 'easy' | 'medium' | 'hard' | 'mixed'): Compound => {
    let availableCompounds: Compound[];
    
    if (difficulty === 'mixed') {
      availableCompounds = compoundsList;
    } else {
      availableCompounds = compoundsList.filter(c => c.difficulty === difficulty);
    }

    return availableCompounds[Math.floor(Math.random() * availableCompounds.length)];
  };

  const startGame = () => {
    const firstQuestion = generateQuestion(gameState.difficulty);
    setGameState(prev => ({
      ...prev,
      currentCompound: firstQuestion,
      userAnswer: '',
      score: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      timeRemaining: 90,
      isPlaying: true,
      gameOver: false,
      showFeedback: false,
      lastAnswerCorrect: null,
      streak: 0
    }));
  };

  const checkAnswer = () => {
    if (!gameState.currentCompound || !gameState.userAnswer.trim()) return;

    const userValue = parseFloat(gameState.userAnswer);
    const correctAnswer = gameState.currentCompound.molarMass;
    
    // Allow 1% tolerance
    const tolerance = correctAnswer * 0.01;
    const isCorrect = Math.abs(userValue - correctAnswer) <= tolerance;

    const pointValue = gameState.currentCompound.difficulty === 'easy' ? 10 : 
                       gameState.currentCompound.difficulty === 'medium' ? 15 : 20;
    
    const streakBonus = gameState.streak >= 3 ? 5 : 0;
    const timeBonus = gameState.timeRemaining > 60 ? 5 : gameState.timeRemaining > 30 ? 3 : 0;

    setGameState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + pointValue + streakBonus + timeBonus : prev.score,
      questionsAnswered: prev.questionsAnswered + 1,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      showFeedback: true,
      lastAnswerCorrect: isCorrect,
      streak: isCorrect ? prev.streak + 1 : 0,
      bestStreak: isCorrect && prev.streak + 1 > prev.bestStreak ? prev.streak + 1 : prev.bestStreak
    }));

    setTimeout(() => {
      if (gameState.timeRemaining > 0) {
        const nextQuestion = generateQuestion(gameState.difficulty);
        setGameState(prev => ({
          ...prev,
          currentCompound: nextQuestion,
          userAnswer: '',
          showFeedback: false,
          lastAnswerCorrect: null
        }));
        inputRef.current?.focus();
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !gameState.showFeedback) {
      checkAnswer();
    }
  };

  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState(prev => ({
      ...prev,
      currentCompound: null,
      userAnswer: '',
      score: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      timeRemaining: 90,
      isPlaying: false,
      gameOver: false,
      showFeedback: false,
      lastAnswerCorrect: null,
      streak: 0
    }));
  };

  // Timer effect
  useEffect(() => {
    if (gameState.isPlaying && !gameState.gameOver && gameState.timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setGameState(prev => {
          if (prev.timeRemaining <= 1) {
            return { ...prev, timeRemaining: 0, isPlaying: false, gameOver: true };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.isPlaying, gameState.gameOver, gameState.timeRemaining]);

  useEffect(() => {
    if (gameState.isPlaying && !gameState.showFeedback) {
      inputRef.current?.focus();
    }
  }, [gameState.isPlaying, gameState.showFeedback, gameState.currentCompound]);

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-6 text-orange-600">
            ⚖️ Molar Mass Challenge
          </h1>
          
          <div className="space-y-4 text-gray-700">
            <h2 className="text-2xl font-semibold text-orange-500">Leiðbeiningar / Instructions</h2>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Markmið / Goal:</h3>
              <p>Reiknaðu mólþyngd (molar mass) efnasambanda eins hratt og þú getur!</p>
              <p className="text-sm italic">Calculate the molar mass of compounds as fast as you can!</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Hvernig á að spila / How to play:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Veldu erfiðleikastig / Choose difficulty level</li>
                <li>Sjáðu efnaformúluna / See the chemical formula</li>
                <li>Reiknaðu mólþyngd með lotukerfinu / Calculate using periodic table</li>
                <li>Sláðu inn svarið í g/mol / Enter answer in g/mol</li>
                <li>Haltu áfram í 90 sekúndur! / Keep going for 90 seconds!</li>
              </ol>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Dæmi / Example:</h3>
              <div className="font-mono text-sm bg-white p-3 rounded">
                <p className="font-bold mb-1">H₂O (Water)</p>
                <p>H: 2 × 1.008 = 2.016</p>
                <p>O: 1 × 15.999 = 15.999</p>
                <p className="border-t border-gray-300 pt-1 mt-1 font-bold">
                  Samtals / Total: 18.015 g/mol
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Stigagjöf / Scoring:</h3>
              <ul className="space-y-1 text-sm">
                <li><strong>Auðvelt:</strong> 10 stig + bónus</li>
                <li><strong>Miðlungs:</strong> 15 stig + bónus</li>
                <li><strong>Erfitt:</strong> 20 stig + bónus</li>
                <li><strong>Röð bónus:</strong> +5 eftir 3 í röð</li>
                <li><strong>Tíma bónus:</strong> +3-5 fyrir hraða svör</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Ábendingar / Tips:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Notaðu "Sýna lotukerfið" takkann</li>
                <li>Mundu algengustu massatölurnar</li>
                <li>Fylgdu nákvæmnistillögunni (1% skekkja)</li>
                <li>Ef hydrate (·xH₂O), bættu við vatninu</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setShowInstructions(false)}
            className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 text-lg"
          >
            Byrja að spila / Start Playing! 🚀
          </button>
        </div>
      </div>
    );
  }

  if (!gameState.isPlaying && !gameState.gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-6 text-orange-600">
            ⚖️ Molar Mass Challenge
          </h1>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">
                Veldu erfiðleikastig / Choose your difficulty:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setGameState(prev => ({ ...prev, difficulty: 'easy' }));
                  setTimeout(startGame, 100);
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-6 rounded-xl transition-colors"
              >
                <div className="text-2xl mb-2">😊</div>
                <div className="text-xl">Auðvelt</div>
                <div className="text-sm opacity-90">Easy</div>
                <div className="text-xs mt-2">Einföld sambönd</div>
              </button>

              <button
                onClick={() => {
                  setGameState(prev => ({ ...prev, difficulty: 'medium' }));
                  setTimeout(startGame, 100);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-6 px-6 rounded-xl transition-colors"
              >
                <div className="text-2xl mb-2">🤔</div>
                <div className="text-xl">Miðlungs</div>
                <div className="text-sm opacity-90">Medium</div>
                <div className="text-xs mt-2">Flóknari formúlur</div>
              </button>

              <button
                onClick={() => {
                  setGameState(prev => ({ ...prev, difficulty: 'hard' }));
                  setTimeout(startGame, 100);
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-6 px-6 rounded-xl transition-colors"
              >
                <div className="text-2xl mb-2">😰</div>
                <div className="text-xl">Erfitt</div>
                <div className="text-sm opacity-90">Hard</div>
                <div className="text-xs mt-2">Mjög flókin</div>
              </button>

              <button
                onClick={() => {
                  setGameState(prev => ({ ...prev, difficulty: 'mixed' }));
                  setTimeout(startGame, 100);
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-6 px-6 rounded-xl transition-colors"
              >
                <div className="text-2xl mb-2">🎲</div>
                <div className="text-xl">Blandað</div>
                <div className="text-sm opacity-90">Mixed</div>
                <div className="text-xs mt-2">Öll stig</div>
              </button>
            </div>

            <button
              onClick={() => setShowInstructions(true)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              📖 Sjá leiðbeiningar / View Instructions
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState.gameOver) {
    const accuracy = gameState.questionsAnswered > 0 
      ? ((gameState.correctAnswers / gameState.questionsAnswered) * 100).toFixed(1)
      : '0';

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-6 text-orange-600">
            🏁 Leik lokið / Game Over!
          </h1>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-xl">
              <div className="text-center">
                <div className="text-6xl font-bold text-orange-600 mb-2">{gameState.score}</div>
                <div className="text-xl text-gray-700">Heildarstaða / Total Score</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-600">{gameState.questionsAnswered}</div>
                <div className="text-sm text-gray-700">Spurningar</div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl text-center">
                <div className="text-3xl font-bold text-green-600">{gameState.correctAnswers}</div>
                <div className="text-sm text-gray-700">Rétt</div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl text-center">
                <div className="text-3xl font-bold text-yellow-600">{accuracy}%</div>
                <div className="text-sm text-gray-700">Nákvæmni</div>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl text-center">
                <div className="text-3xl font-bold text-orange-600">{gameState.bestStreak}</div>
                <div className="text-sm text-gray-700">Besta röð</div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl">
              <h3 className="font-semibold text-center mb-2">
                {gameState.score >= 350 ? '🌟 Frábært! / Excellent!' :
                 gameState.score >= 250 ? '👍 Vel gert! / Well done!' :
                 gameState.score >= 150 ? '💪 Góð byrjun! / Good start!' :
                 '📚 Æfðu meira! / Keep practicing!'}
              </h3>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetGame}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                Velja stig
              </button>
              <button
                onClick={() => setShowInstructions(true)}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-colors"
              >
                Leiðbeiningar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="flex items-center gap-2 text-red-600 mb-1">
                  <Clock size={24} />
                  <span className="text-3xl font-bold">{gameState.timeRemaining}s</span>
                </div>
                <div className="text-xs text-gray-600">Tími eftir</div>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-2 text-orange-600 mb-1">
                  <Trophy size={24} />
                  <span className="text-3xl font-bold">{gameState.score}</span>
                </div>
                <div className="text-xs text-gray-600">Stig</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {gameState.correctAnswers}/{gameState.questionsAnswered}
                </div>
                <div className="text-xs text-gray-600">Rétt</div>
              </div>

              {gameState.streak >= 3 && (
                <div className="text-center animate-pulse">
                  <div className="flex items-center gap-1 text-orange-600 mb-1">
                    <Zap size={20} />
                    <span className="text-2xl font-bold">{gameState.streak}</span>
                  </div>
                  <div className="text-xs text-gray-600">Streak!</div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(gameState.timeRemaining / 90) * 100}%` }}
            />
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {gameState.currentCompound && (
            <>
              <div className="mb-6 text-center">
                <div className="text-6xl font-bold text-gray-800 mb-4">
                  {gameState.currentCompound.formula}
                </div>
                <div className="text-xl text-gray-600 mb-2">
                  {gameState.currentCompound.name}
                </div>
                <div className="text-sm text-gray-500">
                  Reiknaðu mólþyngd í g/mol / Calculate molar mass in g/mol
                </div>
              </div>

              {/* Periodic Table Toggle */}
              <div className="mb-4 text-center">
                <button
                  onClick={() => setGameState(prev => ({ ...prev, showPeriodicTable: !prev.showPeriodicTable }))}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm"
                >
                  {gameState.showPeriodicTable ? 'Fela lotukerfið' : 'Sýna lotukerfið'} 📊
                </button>
              </div>

              {gameState.showPeriodicTable && (
                <div className="mb-6 bg-blue-50 p-4 rounded-xl max-h-60 overflow-y-auto">
                  <h4 className="font-semibold mb-2 text-center">Lotukerfið / Periodic Table</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    {elements.map(el => (
                      <div key={el.symbol} className="bg-white p-2 rounded border border-blue-200">
                        <div className="font-bold">{el.symbol}</div>
                        <div className="text-xs text-gray-600">{el.atomicMass.toFixed(3)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Answer Input */}
              <div className="max-w-md mx-auto">
                {!gameState.showFeedback ? (
                  <div className="space-y-4">
                    <input
                      ref={inputRef}
                      type="number"
                      step="0.001"
                      value={gameState.userAnswer}
                      onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
                      onKeyPress={handleKeyPress}
                      placeholder="Mólþyngd í g/mol"
                      className="w-full p-4 text-2xl border-4 border-orange-300 rounded-xl focus:border-orange-500 focus:outline-none text-center font-bold"
                      autoFocus
                    />
                    <button
                      onClick={checkAnswer}
                      disabled={!gameState.userAnswer.trim()}
                      className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-xl transition-colors text-xl"
                    >
                      Athuga svar / Check ✓
                    </button>
                  </div>
                ) : (
                  <div className={`p-6 rounded-xl ${gameState.lastAnswerCorrect ? 'bg-green-50 border-4 border-green-300' : 'bg-red-50 border-4 border-red-300'}`}>
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {gameState.lastAnswerCorrect ? '✅' : '❌'}
                      </div>
                      <div className="text-2xl font-bold mb-2">
                        {gameState.lastAnswerCorrect ? 'Rétt!' : 'Rangt'}
                      </div>
                      <div className="text-lg text-gray-700">
                        Rétt svar: <span className="font-bold">{gameState.currentCompound.molarMass.toFixed(3)} g/mol</span>
                      </div>
                      {!gameState.lastAnswerCorrect && (
                        <div className="text-sm text-gray-600 mt-2">
                          Þitt svar: {gameState.userAnswer} g/mol
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MolarMassChallenge;
