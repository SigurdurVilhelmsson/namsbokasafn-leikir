import { useState, useEffect } from 'react';
import {
  LEVEL_3_PROBLEMS,
  calculateMolarMass,
  formulasEqual,
  getMultiplier,
  MolecularFormulaProblem,
} from '../data/compounds';

interface Level3Props {
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  t: (key: string, fallback?: string) => string;
  language: string;
}

interface CalculationHelperProps {
  problem: MolecularFormulaProblem;
  showSteps: boolean;
}

function CalculationHelper({ problem, showSteps }: CalculationHelperProps) {
  if (!showSteps) return null;

  const empiricalMass = calculateMolarMass(problem.empiricalFormula);
  const multiplier = getMultiplier(problem.empiricalFormula, problem.molarMass);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
      <h4 className="font-semibold text-blue-800 mb-3">Útreikningshjálp / Calculation Help</h4>
      <div className="space-y-3 text-sm">
        <div className="bg-white rounded p-3">
          <div className="font-medium mb-1">Skref 1: Reikna mólmassa reynslujöfnu</div>
          <div className="font-mono">
            {problem.empiricalFormula} = <span className="font-bold text-blue-600">{empiricalMass.toFixed(2)} g/mol</span>
          </div>
        </div>
        <div className="bg-white rounded p-3">
          <div className="font-medium mb-1">Skref 2: Finna margfaldara</div>
          <div className="font-mono">
            n = Mólmassi / Reynslumólmassi = {problem.molarMass} / {empiricalMass.toFixed(2)} = <span className="font-bold text-purple-600">{multiplier}</span>
          </div>
        </div>
        <div className="bg-white rounded p-3">
          <div className="font-medium mb-1">Skref 3: Margfalda reynslujöfnu með n</div>
          <div className="font-mono">
            ({problem.empiricalFormula}) × {multiplier} = <span className="font-bold text-green-600">{problem.molecularFormula}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Level3({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer, t, language }: Level3Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const problems = LEVEL_3_PROBLEMS;
  const currentProblem = problems[currentIndex];
  const empiricalMass = calculateMolarMass(currentProblem.empiricalFormula);
  const multiplier = getMultiplier(currentProblem.empiricalFormula, currentProblem.molarMass);

  // Reset when problem changes
  useEffect(() => {
    setAnswer('');
    setFeedback(null);
    setShowHint(false);
    setShowSteps(false);
  }, [currentIndex]);

  const checkAnswer = () => {
    const isCorrect = formulasEqual(answer.trim(), currentProblem.molecularFormula);

    if (isCorrect) {
      setFeedback('correct');
      onCorrectAnswer();
      const pointsEarned = showSteps ? 5 : showHint ? 7 : 10;
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
              {t('level3.title', 'Stig 3: Sameindajafna')}
            </h1>
            <p className="text-sm text-gray-600">
              {t('level3.subtitle', 'Finndu sameindajöfnu út frá reynslujöfnu og mólmassa')}
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

          {/* Given information */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-sm text-purple-600 mb-1">
                {t('level3.empiricalFormula', 'Reynslujafna')}
              </div>
              <div className="text-3xl font-bold font-mono text-purple-800">
                {currentProblem.empiricalFormula}
              </div>
              <div className="text-xs text-purple-500 mt-1">
                ({empiricalMass.toFixed(2)} g/mol)
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-sm text-orange-600 mb-1">
                {t('level3.molarMass', 'Mólmassi')}
              </div>
              <div className="text-3xl font-bold font-mono text-orange-800">
                {currentProblem.molarMass}
              </div>
              <div className="text-xs text-orange-500 mt-1">g/mol</div>
            </div>
          </div>

          {/* Multiplier hint (optional reveal) */}
          {showSteps && (
            <div className="bg-gray-100 rounded-lg p-3 mb-4 text-center">
              <span className="text-gray-600">Margfaldari: </span>
              <span className="font-bold text-lg">{multiplier}</span>
              <span className="text-gray-500 text-sm ml-2">
                ({currentProblem.molarMass} ÷ {empiricalMass.toFixed(0)} = {multiplier})
              </span>
            </div>
          )}

          {/* Answer input */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              {t('level3.enterFormula', 'Hver er sameindajafnan?')}
            </label>
            <div className="flex gap-4 items-center justify-center">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={feedback === 'correct'}
                placeholder={`t.d. ${currentProblem.empiricalFormula.replace(/[₀-₉]/g, '')}...`}
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

          {/* Calculation helper */}
          <CalculationHelper problem={currentProblem} showSteps={showSteps} />
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
                  {currentProblem.empiricalFormula} × {multiplier} = {currentProblem.molecularFormula}
                </div>
              </div>
            ) : (
              <div>
                <div className="font-bold">{t('feedback.tryAgain', 'Reyndu aftur!')}</div>
                <div className="text-sm mt-1">
                  {t('level3.checkMultiplier', 'Athugaðu margfaldarann')}
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
          {!showSteps && (
            <button
              onClick={() => setShowSteps(true)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {t('level3.showSteps', 'Sýna útreikning')}
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
