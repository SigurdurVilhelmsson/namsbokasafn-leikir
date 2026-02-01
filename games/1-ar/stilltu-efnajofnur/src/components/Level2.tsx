import { useState, useEffect } from 'react';
import {
  Equation,
  LEVEL_2_EQUATIONS,
  ELEMENT_COLORS,
  countAtoms,
  isBalanced,
  REACTION_TYPES,
} from '../data/equations';

interface Level2Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  t: (key: string, fallback?: string) => string;
  language: string;
}

interface CoefficientInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

function CoefficientInput({ value, onChange, disabled }: CoefficientInputProps) {
  return (
    <input
      type="number"
      min="1"
      max="20"
      value={value}
      onChange={(e) => onChange(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
      disabled={disabled}
      className="w-12 h-10 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none disabled:bg-gray-100"
    />
  );
}

interface EquationDisplayProps {
  equation: Equation;
  coefficients: number[];
  onCoefficientChange: (index: number, value: number) => void;
  disabled?: boolean;
}

function EquationDisplay({ equation, coefficients, onCoefficientChange, disabled }: EquationDisplayProps) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap text-2xl">
      {/* Reactants */}
      {equation.reactants.map((formula, i) => (
        <span key={`reactant-${i}`} className="flex items-center gap-1">
          {i > 0 && <span className="text-gray-500 mx-1">+</span>}
          <CoefficientInput
            value={coefficients[i]}
            onChange={(val) => onCoefficientChange(i, val)}
            disabled={disabled}
          />
          <span className="font-mono">{formula}</span>
        </span>
      ))}

      {/* Arrow */}
      <span className="text-gray-600 mx-4">→</span>

      {/* Products */}
      {equation.products.map((formula, i) => {
        const prodIndex = equation.reactants.length + i;
        return (
          <span key={`product-${i}`} className="flex items-center gap-1">
            {i > 0 && <span className="text-gray-500 mx-1">+</span>}
            <CoefficientInput
              value={coefficients[prodIndex]}
              onChange={(val) => onCoefficientChange(prodIndex, val)}
              disabled={disabled}
            />
            <span className="font-mono">{formula}</span>
          </span>
        );
      })}
    </div>
  );
}

interface BalanceStatusProps {
  equation: Equation;
  coefficients: number[];
}

function BalanceStatus({ equation, coefficients }: BalanceStatusProps) {
  const { reactants, products } = countAtoms(equation, coefficients);
  const allElements = [...new Set([...Object.keys(reactants), ...Object.keys(products)])];

  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-6">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">
        Staða stillingar / Balance Status
      </h4>
      <div className="flex flex-wrap justify-center gap-4">
        {allElements.map(element => {
          const left = reactants[element] || 0;
          const right = products[element] || 0;
          const balanced = left === right && left > 0;
          const color = ELEMENT_COLORS[element] || '#6b7280';

          return (
            <div
              key={element}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                balanced ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  element === 'H' ? 'border-2 border-gray-400 text-gray-800' : 'text-white'
                }`}
                style={{ backgroundColor: color }}
              >
                {element}
              </div>
              <span className={`font-mono ${balanced ? 'text-green-700' : 'text-red-700'}`}>
                {left} {balanced ? '=' : '≠'} {right}
              </span>
              {balanced && <span className="text-green-600">✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Level2({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer, t, language }: Level2Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [coefficients, setCoefficients] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintLevel, setHintLevel] = useState(0); // 0 = no hint, 1 = element to start, 2 = specific hint
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [attempts, setAttempts] = useState(0);

  const equations = LEVEL_2_EQUATIONS;
  const currentEquation = equations[currentIndex];
  const totalCoefficients = currentEquation.reactants.length + currentEquation.products.length;

  // Initialize coefficients
  useEffect(() => {
    setCoefficients(Array(totalCoefficients).fill(1));
    setHintLevel(0);
    setFeedback(null);
    setAttempts(0);
  }, [currentIndex, totalCoefficients]);

  const updateCoefficient = (index: number, value: number) => {
    setCoefficients(prev => {
      const newCoefs = [...prev];
      newCoefs[index] = value;
      return newCoefs;
    });
    setFeedback(null);
  };

  const checkAnswer = () => {
    const balanced = isBalanced(currentEquation, coefficients);
    setAttempts(prev => prev + 1);

    if (balanced) {
      setFeedback('correct');
      onCorrectAnswer();
      // Points based on hints and attempts
      let pointsEarned = 10;
      if (hintLevel >= 1) pointsEarned -= 2;
      if (hintLevel >= 2) pointsEarned -= 3;
      if (attempts > 2) pointsEarned -= Math.min(3, attempts - 2);
      pointsEarned = Math.max(1, pointsEarned);

      setScore(prev => prev + pointsEarned);

      setTimeout(() => {
        if (currentIndex < equations.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          onComplete(score + pointsEarned, equations.length * 10, hintsUsed);
        }
      }, 1500);
    } else {
      setFeedback('incorrect');
      onIncorrectAnswer();
    }
  };

  const showNextHint = () => {
    setHintLevel(prev => Math.min(2, prev + 1));
    setHintsUsed(prev => prev + 1);
  };

  const getHintText = (): string | null => {
    if (hintLevel === 0) return null;

    if (hintLevel === 1) {
      // Suggest which element to balance first
      const { reactants, products } = countAtoms(currentEquation, coefficients);
      const allElements = [...new Set([...Object.keys(reactants), ...Object.keys(products)])];
      // Find an unbalanced element that's not oxygen (usually balanced last)
      const unbalanced = allElements.find(
        e => e !== 'O' && (reactants[e] || 0) !== (products[e] || 0)
      ) || allElements.find(e => (reactants[e] || 0) !== (products[e] || 0));

      if (language === 'en') {
        return unbalanced
          ? `Try balancing ${unbalanced} first. It appears on both sides.`
          : 'The equation is close to being balanced!';
      }
      return unbalanced
        ? `Reyndu að stilla ${unbalanced} fyrst. Það kemur fyrir beggja megin.`
        : 'Jafnan er næstum stillt!';
    }

    // Level 2 hint - specific hint from equation
    return (language === 'en' ? currentEquation.hintEn : currentEquation.hint) || null;
  };

  const reactionType = language === 'en'
    ? REACTION_TYPES[currentEquation.type].en
    : REACTION_TYPES[currentEquation.type].is;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← {t('common.back', 'Til baka')}
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {t('level2.title', 'Stig 2: Stilling með skoðun')}
            </h1>
            <p className="text-sm text-gray-600">
              {t('level2.subtitle', 'Sláðu inn stuðla til að stilla jöfnuna')}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              {t('common.score', 'Stig')}: <span className="font-bold text-orange-600">{score}</span>
            </div>
            <div className="text-xs text-gray-500">
              {currentIndex + 1} / {equations.length}
            </div>
          </div>
        </div>

        {/* Main equation card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          {/* Reaction type badge */}
          <div className="flex justify-center mb-4">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              {reactionType}
            </span>
          </div>

          {/* Equation input */}
          <EquationDisplay
            equation={currentEquation}
            coefficients={coefficients}
            onCoefficientChange={updateCoefficient}
            disabled={feedback === 'correct'}
          />

          {/* Balance status */}
          <BalanceStatus equation={currentEquation} coefficients={coefficients} />
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`text-center p-4 rounded-lg mb-4 ${
              feedback === 'correct'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {feedback === 'correct' ? (
              <div>
                <div className="font-bold">{t('feedback.correct', 'Rétt!')}</div>
                <div className="text-sm mt-1">
                  {t('feedback.equationBalanced', 'Jafnan er stillt.')}
                </div>
              </div>
            ) : (
              <div>
                <div className="font-bold">{t('feedback.tryAgain', 'Reyndu aftur!')}</div>
                <div className="text-sm mt-1">
                  {t('feedback.checkAtoms', 'Athugaðu fjölda atóma á hvorri hlið.')}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hint display */}
        {hintLevel > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <span className="text-blue-500 text-lg">💡</span>
              <div>
                <div className="text-sm font-semibold text-blue-800 mb-1">
                  {t('hint.level', 'Vísbending')} {hintLevel}:
                </div>
                <div className="text-blue-700">{getHintText()}</div>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          {hintLevel < 2 && (
            <button
              onClick={showNextHint}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {hintLevel === 0
                ? t('common.hint', 'Vísbending')
                : t('common.moreHint', 'Meiri hjálp')}
            </button>
          )}
          <button
            onClick={checkAnswer}
            disabled={feedback === 'correct'}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
          >
            {t('common.check', 'Athuga')}
          </button>
        </div>

        {/* Attempts indicator */}
        {attempts > 0 && feedback !== 'correct' && (
          <div className="text-center mt-4 text-sm text-gray-500">
            {t('attempts', 'Tilraunir')}: {attempts}
          </div>
        )}

        {/* Progress bar */}
        <div className="mt-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / equations.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
