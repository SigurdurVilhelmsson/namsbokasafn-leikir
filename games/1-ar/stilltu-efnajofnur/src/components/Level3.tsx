import { useState, useEffect, useCallback } from 'react';
import {
  Equation,
  LEVEL_3_EQUATIONS,
  ELEMENT_COLORS,
  countAtoms,
  isBalanced,
  REACTION_TYPES,
} from '../data/equations';
import { AtomInventory, AtomInventoryToggle } from './AtomInventory';

interface Level3Props {
  onComplete: (score: number, correct: number, total: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  t: (key: string, fallback?: string) => string;
  language: string;
}

type GameMode = 'select' | 'practice' | 'challenge';

interface CoefficientInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  highlight?: boolean;
}

function CoefficientInput({ value, onChange, disabled, highlight }: CoefficientInputProps) {
  return (
    <input
      type="number"
      min="1"
      max="20"
      value={value}
      onChange={(e) => onChange(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
      disabled={disabled}
      className={`w-12 h-10 text-center text-xl font-bold border-2 rounded-lg focus:outline-none transition-colors ${
        highlight
          ? 'border-green-500 bg-green-50'
          : 'border-gray-300 focus:border-orange-500'
      } ${disabled ? 'bg-gray-100' : ''}`}
    />
  );
}

interface CompactBalanceStatusProps {
  equation: Equation;
  coefficients: number[];
}

function CompactBalanceStatus({ equation, coefficients }: CompactBalanceStatusProps) {
  const { reactants, products } = countAtoms(equation, coefficients);
  const allElements = [...new Set([...Object.keys(reactants), ...Object.keys(products)])];
  const allBalanced = allElements.every(
    e => (reactants[e] || 0) === (products[e] || 0) && (reactants[e] || 0) > 0
  );

  return (
    <div className={`flex flex-wrap justify-center gap-2 p-3 rounded-lg ${
      allBalanced ? 'bg-green-50' : 'bg-gray-50'
    }`}>
      {allElements.map(element => {
        const left = reactants[element] || 0;
        const right = products[element] || 0;
        const balanced = left === right && left > 0;
        const color = ELEMENT_COLORS[element] || '#6b7280';

        return (
          <div
            key={element}
            className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
              balanced ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                element === 'H' ? 'border border-gray-400 text-gray-800' : 'text-white'
              }`}
              style={{ backgroundColor: color }}
            >
              {element}
            </div>
            <span className="font-mono">{left}:{right}</span>
            {balanced && <span>✓</span>}
          </div>
        );
      })}
    </div>
  );
}

export function Level3({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer, t, language }: Level3Props) {
  const [mode, setMode] = useState<GameMode>('select');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [coefficients, setCoefficients] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [shuffledEquations, setShuffledEquations] = useState<Equation[]>([]);
  const [showAtomInventory, setShowAtomInventory] = useState(false);

  const CHALLENGE_TIME = 180; // 3 minutes
  const currentEquation = shuffledEquations[currentIndex];
  const totalCoefficients = currentEquation
    ? currentEquation.reactants.length + currentEquation.products.length
    : 0;

  // Shuffle equations
  const shuffleEquations = useCallback(() => {
    const shuffled = [...LEVEL_3_EQUATIONS].sort(() => Math.random() - 0.5);
    setShuffledEquations(shuffled);
  }, []);

  // Initialize game
  useEffect(() => {
    shuffleEquations();
  }, [shuffleEquations]);

  // Initialize coefficients when equation changes
  useEffect(() => {
    if (currentEquation) {
      setCoefficients(Array(totalCoefficients).fill(1));
      setShowHint(false);
      setFeedback(null);
    }
  }, [currentIndex, currentEquation, totalCoefficients]);

  // Timer for challenge mode
  useEffect(() => {
    if (mode !== 'challenge' || gameOver || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, gameOver, timeLeft]);

  const startGame = (selectedMode: 'practice' | 'challenge') => {
    setMode(selectedMode);
    setCurrentIndex(0);
    setScore(0);
    setCorrect(0);
    setHintsUsed(0);
    setGameOver(false);
    shuffleEquations();
    if (selectedMode === 'challenge') {
      setTimeLeft(CHALLENGE_TIME);
    }
  };

  const updateCoefficient = (index: number, value: number) => {
    setCoefficients(prev => {
      const newCoefs = [...prev];
      newCoefs[index] = value;
      return newCoefs;
    });
    setFeedback(null);
  };

  const checkAnswer = () => {
    if (!currentEquation) return;

    const balanced = isBalanced(currentEquation, coefficients);

    if (balanced) {
      setFeedback('correct');
      onCorrectAnswer();
      setCorrect(prev => prev + 1);

      // Calculate points
      let points = mode === 'challenge' ? 15 : 10;
      if (showHint) points = Math.max(1, points - 5);
      setScore(prev => prev + points);

      setTimeout(() => {
        if (currentIndex < shuffledEquations.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          // All equations completed
          if (mode === 'practice') {
            onComplete(score + points, correct + 1, shuffledEquations.length, shuffledEquations.length * 10, hintsUsed);
          } else {
            setGameOver(true);
          }
        }
      }, 1000);
    } else {
      setFeedback('incorrect');
      onIncorrectAnswer();
    }
  };

  const skipEquation = () => {
    if (currentIndex < shuffledEquations.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (mode === 'challenge') {
      setGameOver(true);
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Mode selection screen
  if (mode === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2 mb-6"
          >
            ← {t('common.back', 'Til baka')}
          </button>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {t('level3.title', 'Stig 3: Meistarapróf')}
            </h1>
            <p className="text-gray-600 mb-8">
              {t('level3.description', 'Flóknar efnajöfnur sem krefjast kerfisbundinnar nálgunar')}
            </p>

            <div className="space-y-4">
              <button
                onClick={() => startGame('practice')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-6 text-left transition-colors"
              >
                <h3 className="text-xl font-bold mb-2">
                  {t('level3.practice', 'Æfingahamur')}
                </h3>
                <p className="text-blue-100 text-sm">
                  {t('level3.practiceDesc', 'Taktu þinn tíma og lærðu á flóknar jöfnur')}
                </p>
              </button>

              <button
                onClick={() => startGame('challenge')}
                className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl p-6 text-left transition-colors"
              >
                <h3 className="text-xl font-bold mb-2">
                  {t('level3.challenge', 'Áskorunarhamur')} ⏱️
                </h3>
                <p className="text-red-100 text-sm">
                  {t('level3.challengeDesc', '3 mínútur - hversu margar getur þú stillt?')}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game over screen (challenge mode)
  if (gameOver && mode === 'challenge') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {t('level3.gameOver', 'Leik lokið!')}
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-orange-600">{score}</div>
                <div className="text-sm text-gray-600">{t('common.score', 'Stig')}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-600">{correct}</div>
                <div className="text-sm text-gray-600">{t('level3.equationsBalanced', 'Jöfnur stilltar')}</div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => startGame('challenge')}
                className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-3 font-bold transition-colors"
              >
                {t('level3.tryAgain', 'Reyna aftur')}
              </button>
              <button
                onClick={() => {
                  onComplete(score, correct, currentIndex + 1, LEVEL_3_EQUATIONS.length * 15, hintsUsed);
                }}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white rounded-lg py-3 transition-colors"
              >
                {t('level3.finish', 'Ljúka')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentEquation) {
    return <div>Loading...</div>;
  }

  const hint = language === 'en' ? currentEquation.hintEn : currentEquation.hint;
  const reactionType = language === 'en'
    ? REACTION_TYPES[currentEquation.type].en
    : REACTION_TYPES[currentEquation.type].is;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← {t('common.back', 'Til baka')}
          </button>

          {mode === 'challenge' && (
            <div className={`text-2xl font-mono font-bold ${
              timeLeft <= 30 ? 'text-red-600 animate-pulse' : 'text-gray-800'
            }`}>
              ⏱️ {formatTime(timeLeft)}
            </div>
          )}

          <div className="text-right">
            <div className="text-sm text-gray-600">
              {t('common.score', 'Stig')}: <span className="font-bold text-orange-600">{score}</span>
            </div>
            <div className="text-xs text-gray-500">
              {correct} / {currentIndex + 1}
            </div>
          </div>
        </div>

        {/* Main equation card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          {/* Reaction type and difficulty */}
          <div className="flex justify-center gap-2 mb-4">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              {reactionType}
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {t('difficulty.hard', 'Erfitt')}
            </span>
          </div>

          {/* Equation input */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-xl mb-4">
            {currentEquation.reactants.map((formula, i) => (
              <span key={`reactant-${i}`} className="flex items-center gap-1">
                {i > 0 && <span className="text-gray-500 mx-1">+</span>}
                <CoefficientInput
                  value={coefficients[i]}
                  onChange={(val) => updateCoefficient(i, val)}
                  disabled={feedback === 'correct'}
                  highlight={feedback === 'correct'}
                />
                <span className="font-mono">{formula}</span>
              </span>
            ))}

            <span className="text-gray-600 mx-3">→</span>

            {currentEquation.products.map((formula, i) => {
              const prodIndex = currentEquation.reactants.length + i;
              return (
                <span key={`product-${i}`} className="flex items-center gap-1">
                  {i > 0 && <span className="text-gray-500 mx-1">+</span>}
                  <CoefficientInput
                    value={coefficients[prodIndex]}
                    onChange={(val) => updateCoefficient(prodIndex, val)}
                    disabled={feedback === 'correct'}
                    highlight={feedback === 'correct'}
                  />
                  <span className="font-mono">{formula}</span>
                </span>
              );
            })}
          </div>

          {/* Compact balance status */}
          <CompactBalanceStatus equation={currentEquation} coefficients={coefficients} />

          {/* Optional Atom Inventory toggle (practice mode only) */}
          {mode === 'practice' && (
            <div className="mt-4 flex justify-center">
              <AtomInventoryToggle
                showInventory={showAtomInventory}
                onToggle={() => setShowAtomInventory(!showAtomInventory)}
                language={language}
              />
            </div>
          )}

          {/* Enhanced Atom Inventory table */}
          {showAtomInventory && mode === 'practice' && (
            <div className="mt-4">
              <AtomInventory
                equation={currentEquation}
                coefficients={coefficients}
                language={language}
              />
            </div>
          )}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`text-center p-3 rounded-lg mb-4 ${
              feedback === 'correct'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {feedback === 'correct'
              ? t('feedback.correct', 'Rétt!')
              : t('feedback.tryAgain', 'Reyndu aftur!')}
          </div>
        )}

        {/* Hint */}
        {showHint && hint && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-center text-sm">
            <span className="text-blue-800">💡 {hint}</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center gap-3">
          {mode === 'challenge' && (
            <button
              onClick={skipEquation}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors"
            >
              {t('level3.skip', 'Sleppa')}
            </button>
          )}
          {!showHint && mode === 'practice' && (
            <button
              onClick={handleShowHint}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {t('common.hint', 'Vísbending')}
            </button>
          )}
          <button
            onClick={checkAnswer}
            disabled={feedback === 'correct'}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
          >
            {t('common.check', 'Athuga')}
          </button>
        </div>

        {/* Progress indicator (practice mode) */}
        {mode === 'practice' && (
          <div className="mt-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / shuffledEquations.length) * 100}%` }}
              />
            </div>
            <div className="text-center text-sm text-gray-500 mt-2">
              {currentIndex + 1} / {shuffledEquations.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
