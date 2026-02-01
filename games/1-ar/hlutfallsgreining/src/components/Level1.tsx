import { useState, useEffect } from 'react';
import {
  LEVEL_1_PROBLEMS,
  ATOMIC_MASSES,
  ELEMENT_COLORS,
  parseFormula,
  calculateMolarMass,
  calculatePercentComposition,
} from '../data/compounds';

interface Level1Props {
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  t: (key: string, fallback?: string) => string;
  language: string;
}

interface ElementInputProps {
  element: string;
  value: string;
  correctValue: number;
  onChange: (value: string) => void;
  disabled: boolean;
  showResult: boolean;
}

function ElementInput({ element, value, correctValue, onChange, disabled, showResult }: ElementInputProps) {
  const color = ELEMENT_COLORS[element] || '#6b7280';
  const isLight = element === 'H';
  const numValue = parseFloat(value) || 0;
  const isCorrect = Math.abs(numValue - correctValue) < 0.5; // Allow 0.5% tolerance

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
          isLight ? 'border-2 border-gray-400 text-gray-800' : 'text-white'
        }`}
        style={{ backgroundColor: color }}
      >
        {element}
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-600 mb-1">
          {element} ({ATOMIC_MASSES[element]} g/mol)
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={`w-24 px-3 py-2 border-2 rounded-lg text-center font-mono ${
              showResult
                ? isCorrect
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : 'border-gray-300 focus:border-orange-500'
            } focus:outline-none`}
            placeholder="0.0"
          />
          <span className="text-gray-600">%</span>
          {showResult && (
            <span className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '✓' : `(${correctValue.toFixed(2)}%)`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface CalculationHelperProps {
  formula: string;
  showSteps: boolean;
}

function CalculationHelper({ formula, showSteps }: CalculationHelperProps) {
  const elements = parseFormula(formula);
  const molarMass = calculateMolarMass(formula);

  if (!showSteps) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
      <h4 className="font-semibold text-blue-800 mb-3">Útreikningshjálp / Calculation Help</h4>
      <div className="space-y-2 text-sm">
        <div className="font-medium">Mólmassi / Molar mass:</div>
        <div className="font-mono bg-white rounded p-2">
          {Object.entries(elements).map(([el, count], i) => (
            <span key={el}>
              {i > 0 && ' + '}
              {count} × {ATOMIC_MASSES[el]} ({el})
            </span>
          ))}
          {' = '}
          <span className="font-bold">{molarMass.toFixed(2)} g/mol</span>
        </div>
        <div className="font-medium mt-3">Formúla fyrir prósentu / Percent formula:</div>
        <div className="font-mono bg-white rounded p-2">
          % = (atómþyngd × fjöldi / mólmassi) × 100
        </div>
      </div>
    </div>
  );
}

export function Level1({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer, t, language }: Level1Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const problems = LEVEL_1_PROBLEMS;
  const currentProblem = problems[currentIndex];
  const elements = parseFormula(currentProblem.formula);
  const correctPercentages = calculatePercentComposition(currentProblem.formula);

  // Initialize inputs when problem changes
  useEffect(() => {
    const initialInputs: Record<string, string> = {};
    for (const element of Object.keys(elements)) {
      initialInputs[element] = '';
    }
    setInputs(initialInputs);
    setShowResult(false);
    setShowHint(false);
    setShowSteps(false);
  }, [currentIndex]);

  const handleInputChange = (element: string, value: string) => {
    setInputs(prev => ({ ...prev, [element]: value }));
  };

  const checkAnswers = () => {
    setShowResult(true);

    // Check if all answers are correct (within 0.5% tolerance)
    let allCorrect = true;
    for (const [element, correctPercent] of Object.entries(correctPercentages)) {
      const userValue = parseFloat(inputs[element]) || 0;
      if (Math.abs(userValue - correctPercent) >= 0.5) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      onCorrectAnswer();
      const pointsEarned = showHint || showSteps ? 5 : 10;
      setScore(prev => prev + pointsEarned);

      setTimeout(() => {
        if (currentIndex < problems.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          onComplete(score + pointsEarned, problems.length * 10);
        }
      }, 1500);
    } else {
      onIncorrectAnswer();
    }
  };

  const hint = language === 'en' ? currentProblem.hintEn : currentProblem.hint;
  const compoundName = language === 'en' ? currentProblem.nameEn : currentProblem.name;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-3xl mx-auto">
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
              {t('level1.title', 'Stig 1: Prósentusamsetning')}
            </h1>
            <p className="text-sm text-gray-600">
              {t('level1.subtitle', 'Reiknaðu massaprósentu hvers frumefnis')}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              {t('common.score', 'Stig')}: <span className="font-bold text-green-600">{score}</span>
            </div>
            <div className="text-xs text-gray-500">
              {currentIndex + 1} / {problems.length}
            </div>
          </div>
        </div>

        {/* Main problem card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          {/* Compound info */}
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-gray-800 mb-2 font-mono">
              {currentProblem.formula}
            </div>
            <div className="text-lg text-gray-600">{compoundName}</div>
            <div className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
              currentProblem.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              currentProblem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentProblem.difficulty === 'easy' ? t('difficulty.easy', 'Auðvelt') :
               currentProblem.difficulty === 'medium' ? t('difficulty.medium', 'Miðlungs') :
               t('difficulty.hard', 'Erfitt')}
            </div>
          </div>

          {/* Element inputs */}
          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-gray-700">
              {t('level1.enterPercent', 'Sláðu inn massaprósentu hvers frumefnis:')}
            </h3>
            {Object.keys(elements).map(element => (
              <ElementInput
                key={element}
                element={element}
                value={inputs[element] || ''}
                correctValue={correctPercentages[element]}
                onChange={(value) => handleInputChange(element, value)}
                disabled={showResult && Object.entries(correctPercentages).every(
                  ([el, pct]) => Math.abs((parseFloat(inputs[el]) || 0) - pct) < 0.5
                )}
                showResult={showResult}
              />
            ))}
          </div>

          {/* Calculation helper */}
          <CalculationHelper formula={currentProblem.formula} showSteps={showSteps} />
        </div>

        {/* Hint */}
        {showHint && hint && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-center">
            <span className="text-yellow-800">💡 {hint}</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          {!showSteps && (
            <button
              onClick={() => setShowSteps(true)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {t('level1.showSteps', 'Sýna útreikning')}
            </button>
          )}
          {!showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
            >
              {t('common.hint', 'Vísbending')}
            </button>
          )}
          <button
            onClick={checkAnswers}
            disabled={showResult && Object.entries(correctPercentages).every(
              ([el, pct]) => Math.abs((parseFloat(inputs[el]) || 0) - pct) < 0.5
            )}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
          >
            {t('common.check', 'Athuga')}
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / problems.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
