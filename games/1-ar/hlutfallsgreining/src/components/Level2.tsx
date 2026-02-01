import { useState, useEffect } from 'react';
import {
  LEVEL_2_PROBLEMS,
  ATOMIC_MASSES,
  ELEMENT_COLORS,
  formulasEqual,
} from '../data/compounds';

interface Level2Props {
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  t: (key: string, fallback?: string) => string;
  language: string;
}

interface StepData {
  element: string;
  percent: number;
  moles: number;
  ratio: number;
  subscript: number;
}

function calculateSteps(percentages: Record<string, number>): StepData[] {
  const steps: StepData[] = [];

  // Step 1: Convert % to moles (assuming 100g sample)
  for (const [element, percent] of Object.entries(percentages)) {
    const moles = percent / ATOMIC_MASSES[element];
    steps.push({
      element,
      percent,
      moles,
      ratio: 0,
      subscript: 0,
    });
  }

  // Step 2: Divide by smallest mole value
  const minMoles = Math.min(...steps.map(s => s.moles));
  for (const step of steps) {
    step.ratio = step.moles / minMoles;
  }

  // Step 3: Round to nearest integer (with tolerance for x.5)
  // If ratio is close to x.5, multiply all by 2
  const hasHalfRatio = steps.some(s => {
    const decimal = s.ratio % 1;
    return decimal > 0.4 && decimal < 0.6;
  });

  const multiplier = hasHalfRatio ? 2 : 1;
  for (const step of steps) {
    step.subscript = Math.round(step.ratio * multiplier);
  }

  return steps;
}

interface StepVisualizationProps {
  steps: StepData[];
  currentStep: number;
}

function StepVisualization({ steps, currentStep }: StepVisualizationProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-3 text-left">Frumefni</th>
            <th className="py-2 px-3 text-center">Prósenta</th>
            {currentStep >= 1 && <th className="py-2 px-3 text-center">Mól (% ÷ atómþyngd)</th>}
            {currentStep >= 2 && <th className="py-2 px-3 text-center">Hlutfall</th>}
            {currentStep >= 3 && <th className="py-2 px-3 text-center">Ágiskatala</th>}
          </tr>
        </thead>
        <tbody>
          {steps.map(step => {
            const color = ELEMENT_COLORS[step.element] || '#6b7280';
            const isLight = step.element === 'H';
            return (
              <tr key={step.element} className="border-b last:border-b-0">
                <td className="py-2 px-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        isLight ? 'border-2 border-gray-400 text-gray-800' : 'text-white'
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {step.element}
                    </div>
                    <span className="text-gray-600">({ATOMIC_MASSES[step.element]})</span>
                  </div>
                </td>
                <td className="py-2 px-3 text-center font-mono">{step.percent.toFixed(2)}%</td>
                {currentStep >= 1 && (
                  <td className="py-2 px-3 text-center font-mono text-blue-600">
                    {step.moles.toFixed(3)}
                  </td>
                )}
                {currentStep >= 2 && (
                  <td className="py-2 px-3 text-center font-mono text-purple-600">
                    {step.ratio.toFixed(2)}
                  </td>
                )}
                {currentStep >= 3 && (
                  <td className="py-2 px-3 text-center font-mono font-bold text-green-600">
                    {step.subscript}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function Level2({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer, t, language }: Level2Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const problems = LEVEL_2_PROBLEMS;
  const currentProblem = problems[currentIndex];
  const steps = calculateSteps(currentProblem.percentages);

  // Reset when problem changes
  useEffect(() => {
    setAnswer('');
    setFeedback(null);
    setShowHint(false);
    setCurrentStep(0);
  }, [currentIndex]);

  const checkAnswer = () => {
    const isCorrect = formulasEqual(answer.trim(), currentProblem.empiricalFormula);

    if (isCorrect) {
      setFeedback('correct');
      onCorrectAnswer();
      const pointsEarned = currentStep === 0 ? 10 : Math.max(1, 10 - currentStep * 2);
      setScore(prev => prev + pointsEarned);

      setTimeout(() => {
        if (currentIndex < problems.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          onComplete(score + pointsEarned, problems.length * 10);
        }
      }, 1500);
    } else {
      setFeedback('incorrect');
      onIncorrectAnswer();
    }
  };

  const showNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const hint = language === 'en' ? currentProblem.hintEn : currentProblem.hint;
  const compoundName = language === 'en' ? currentProblem.nameEn : currentProblem.name;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
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
              {t('level2.title', 'Stig 2: Reynslujafna')}
            </h1>
            <p className="text-sm text-gray-600">
              {t('level2.subtitle', 'Finndu reynslujöfnu út frá prósentusamsetningu')}
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
          {/* Problem info */}
          <div className="text-center mb-4">
            <div className="text-lg text-gray-600 mb-2">{compoundName}</div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm ${
              currentProblem.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              currentProblem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentProblem.difficulty === 'easy' ? t('difficulty.easy', 'Auðvelt') :
               currentProblem.difficulty === 'medium' ? t('difficulty.medium', 'Miðlungs') :
               t('difficulty.hard', 'Erfitt')}
            </div>
          </div>

          {/* Percent composition display */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {Object.entries(currentProblem.percentages).map(([element, percent]) => {
              const color = ELEMENT_COLORS[element] || '#6b7280';
              const isLight = element === 'H';
              return (
                <div
                  key={element}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      isLight ? 'border-2 border-gray-400 text-gray-800' : 'text-white'
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {element}
                  </div>
                  <span className="text-xl font-mono font-bold">{percent.toFixed(2)}%</span>
                </div>
              );
            })}
          </div>

          {/* Step visualization */}
          {currentStep > 0 && (
            <StepVisualization steps={steps} currentStep={currentStep} />
          )}

          {/* Answer input */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('level2.enterFormula', 'Sláðu inn reynslujöfnu (t.d. CH₂O eða CH2O):')}
            </label>
            <div className="flex gap-4 items-center justify-center">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={feedback === 'correct'}
                placeholder="t.d. CH2O"
                className={`w-48 px-4 py-3 text-2xl font-mono text-center border-2 rounded-lg ${
                  feedback === 'correct'
                    ? 'border-green-500 bg-green-50'
                    : feedback === 'incorrect'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 focus:border-green-500'
                } focus:outline-none`}
              />
              {feedback === 'correct' && (
                <span className="text-green-600 text-2xl">✓</span>
              )}
            </div>
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
            {feedback === 'correct' ? (
              <div>
                <div className="font-bold">{t('feedback.correct', 'Rétt!')}</div>
                <div className="text-sm mt-1">
                  {t('level2.formulaIs', 'Reynslujafnan er')} {currentProblem.empiricalFormula}
                </div>
              </div>
            ) : (
              <div>
                <div className="font-bold">{t('feedback.tryAgain', 'Reyndu aftur!')}</div>
                <div className="text-sm mt-1">
                  {t('level2.checkCalculation', 'Athugaðu útreikningana þína')}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hint */}
        {showHint && hint && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-center">
            <span className="text-yellow-800">💡 {hint}</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          {currentStep < 3 && (
            <button
              onClick={showNextStep}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {currentStep === 0
                ? t('level2.showStep1', 'Reikna mól')
                : currentStep === 1
                ? t('level2.showStep2', 'Deila með minnsta')
                : t('level2.showStep3', 'Sýna ágiskutölur')}
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
            onClick={checkAnswer}
            disabled={feedback === 'correct' || !answer.trim()}
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
