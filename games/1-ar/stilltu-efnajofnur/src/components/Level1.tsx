import { useState, useEffect } from 'react';
import {
  Equation,
  LEVEL_1_EQUATIONS,
  ELEMENT_COLORS,
  parseFormula,
  countAtoms,
  isBalanced,
} from '../data/equations';

interface Level1Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  t: (key: string, fallback?: string) => string;
  language: string;
}

interface AtomCircleProps {
  element: string;
  count: number;
  size?: number;
}

function AtomCircle({ element, count, size = 40 }: AtomCircleProps) {
  const color = ELEMENT_COLORS[element] || '#6b7280';
  const isLight = element === 'H' || color === '#ffffff';

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-all duration-300 ${
            isLight ? 'border-2 border-gray-400 text-gray-800' : 'text-white'
          }`}
          style={{
            width: size,
            height: size,
            backgroundColor: color,
          }}
        >
          {element}
        </div>
      ))}
    </div>
  );
}

interface AtomDisplayProps {
  formula: string;
  coefficient: number;
  showLabel?: boolean;
}

function AtomDisplay({ formula, coefficient, showLabel = false }: AtomDisplayProps) {
  const atoms = parseFormula(formula);
  const elements = Object.entries(atoms);

  return (
    <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg shadow-sm min-w-[80px]">
      {showLabel && (
        <div className="text-sm font-semibold text-gray-700">
          {coefficient > 1 ? `${coefficient} ` : ''}{formula}
        </div>
      )}
      <div className="flex flex-col gap-2">
        {elements.map(([element, count]) => (
          <AtomCircle key={element} element={element} count={count * coefficient} />
        ))}
      </div>
    </div>
  );
}

interface AtomCountComparisonProps {
  equation: Equation;
  coefficients: number[];
}

function AtomCountComparison({ equation, coefficients }: AtomCountComparisonProps) {
  const { reactants, products } = countAtoms(equation, coefficients);
  const allElements = new Set([...Object.keys(reactants), ...Object.keys(products)]);

  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-4">
      <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">
        Fjöldi atóma / Atom Count
      </h4>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="font-semibold text-center">Frumefni</div>
        <div className="font-semibold text-center">Vinstri</div>
        <div className="font-semibold text-center">Hægri</div>
        {Array.from(allElements).map(element => {
          const left = reactants[element] || 0;
          const right = products[element] || 0;
          const balanced = left === right && left > 0;
          return (
            <>
              <div
                key={`${element}-name`}
                className="flex items-center justify-center gap-1"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    element === 'H' ? 'border-2 border-gray-400 text-gray-800' : 'text-white'
                  }`}
                  style={{ backgroundColor: ELEMENT_COLORS[element] || '#6b7280' }}
                >
                  {element}
                </div>
              </div>
              <div
                key={`${element}-left`}
                className={`text-center font-mono ${balanced ? 'text-green-600' : 'text-red-500'}`}
              >
                {left}
              </div>
              <div
                key={`${element}-right`}
                className={`text-center font-mono ${balanced ? 'text-green-600' : 'text-red-500'}`}
              >
                {right}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export function Level1({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer, t, language }: Level1Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [coefficients, setCoefficients] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showAtomCount, setShowAtomCount] = useState(true);

  const equations = LEVEL_1_EQUATIONS;
  const currentEquation = equations[currentIndex];
  const totalCoefficients = currentEquation.reactants.length + currentEquation.products.length;

  // Initialize coefficients
  useEffect(() => {
    setCoefficients(Array(totalCoefficients).fill(1));
    setShowHint(false);
    setFeedback(null);
  }, [currentIndex, totalCoefficients]);

  const updateCoefficient = (index: number, delta: number) => {
    setCoefficients(prev => {
      const newCoefs = [...prev];
      newCoefs[index] = Math.max(1, Math.min(10, newCoefs[index] + delta));
      return newCoefs;
    });
    setFeedback(null);
  };

  const checkAnswer = () => {
    const balanced = isBalanced(currentEquation, coefficients);

    if (balanced) {
      setFeedback('correct');
      onCorrectAnswer();
      const pointsEarned = showHint ? 5 : 10;
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

  const handleShowHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  const hint = language === 'en' ? currentEquation.hintEn : currentEquation.hint;

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
              {t('level1.title', 'Stig 1: Sjónræn stilling')}
            </h1>
            <p className="text-sm text-gray-600">
              {t('level1.subtitle', 'Stilltu efnajöfnur með því að breyta stuðlum')}
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

        {/* Main equation display */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* Reactants */}
            {currentEquation.reactants.map((formula, i) => (
              <div key={`reactant-${i}`} className="flex items-center gap-2">
                {i > 0 && <span className="text-2xl text-gray-500">+</span>}
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => updateCoefficient(i, -1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                      disabled={coefficients[i] <= 1}
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold w-8 text-center">{coefficients[i]}</span>
                    <button
                      onClick={() => updateCoefficient(i, 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                      disabled={coefficients[i] >= 10}
                    >
                      +
                    </button>
                  </div>
                  <AtomDisplay formula={formula} coefficient={coefficients[i]} showLabel />
                </div>
              </div>
            ))}

            {/* Arrow */}
            <span className="text-3xl text-gray-600 mx-4">→</span>

            {/* Products */}
            {currentEquation.products.map((formula, i) => {
              const prodIndex = currentEquation.reactants.length + i;
              return (
                <div key={`product-${i}`} className="flex items-center gap-2">
                  {i > 0 && <span className="text-2xl text-gray-500">+</span>}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() => updateCoefficient(prodIndex, -1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                        disabled={coefficients[prodIndex] <= 1}
                      >
                        -
                      </button>
                      <span className="text-2xl font-bold w-8 text-center">{coefficients[prodIndex]}</span>
                      <button
                        onClick={() => updateCoefficient(prodIndex, 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                        disabled={coefficients[prodIndex] >= 10}
                      >
                        +
                      </button>
                    </div>
                    <AtomDisplay formula={formula} coefficient={coefficients[prodIndex]} showLabel />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Atom count comparison */}
          {showAtomCount && (
            <AtomCountComparison equation={currentEquation} coefficients={coefficients} />
          )}

          {/* Toggle atom count */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAtomCount(!showAtomCount)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {showAtomCount
                ? t('level1.hideCount', 'Fela fjölda atóma')
                : t('level1.showCount', 'Sýna fjölda atóma')}
            </button>
          </div>
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
            {feedback === 'correct'
              ? t('feedback.correct', 'Rétt! Jafnan er stillt.')
              : t('feedback.incorrect', 'Ekki rétt. Athugaðu fjölda atóma á hvorri hlið.')}
          </div>
        )}

        {/* Hint */}
        {showHint && hint && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-center">
            <span className="text-blue-800">{hint}</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          {!showHint && (
            <button
              onClick={handleShowHint}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {t('common.hint', 'Vísbending')} (-5 stig)
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
