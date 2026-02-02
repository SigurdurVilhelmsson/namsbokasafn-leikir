/**
 * Level 2: Solubility Calculations
 *
 * Students learn to:
 * 1. Calculate molar solubility from Ksp (AB, AB2, AB3 types)
 * 2. Calculate Ksp from solubility data
 * 3. Apply the common ion effect
 */

import { useState, useCallback } from 'react';
import { useI18n } from '@shared/hooks/useI18n';
import { HintSystem } from '@shared/components';
import { level2Problems } from '../data';

interface Level2Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export function Level2({ onComplete, onBack }: Level2Props) {
  const { language } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [hintResetKey, setHintResetKey] = useState(0);
  const [showSteps, setShowSteps] = useState(false);

  // Order problems by difficulty
  const orderedProblems = [
    ...level2Problems.filter((p) => p.difficulty === 'basic'),
    ...level2Problems.filter((p) => p.difficulty === 'with_stoichiometry'),
    ...level2Problems.filter((p) => p.difficulty === 'common_ion'),
  ];

  const totalProblems = Math.min(7, orderedProblems.length);
  const currentProblem = orderedProblems[currentIndex];
  const isComplete = currentIndex >= totalProblems;

  const parseScientificNotation = (input: string): number | null => {
    // Handle formats like: 1.33e-5, 1.33×10^-5, 1.33x10-5, 1.33E-5
    const cleaned = input
      .replace(/\s/g, '')
      .replace(/×/g, 'x')
      .replace(/\^/g, '')
      .replace(/10/g, 'e')
      .replace(/x/gi, 'e')
      .replace(/ee/g, 'e');

    const num = parseFloat(cleaned);
    if (isNaN(num)) {
      // Try direct parse
      const direct = parseFloat(input);
      return isNaN(direct) ? null : direct;
    }
    return num;
  };

  const checkAnswer = useCallback(() => {
    const parsed = parseScientificNotation(userAnswer);
    if (parsed === null) {
      return;
    }

    const tolerance = currentProblem.tolerance || 0.1;
    const percentError = Math.abs(parsed - currentProblem.answer) / Math.abs(currentProblem.answer);
    const correct = percentError <= tolerance;

    setShowFeedback(true);
    setIsCorrect(correct);

    if (correct) {
      const points =
        hintLevel === 0 ? 100 : hintLevel === 1 ? 75 : hintLevel === 2 ? 50 : 25;
      setScore((s) => s + points);
    }
  }, [userAnswer, currentProblem, hintLevel]);

  const handleNext = () => {
    setShowFeedback(false);
    setUserAnswer('');
    setHintLevel(0);
    setHintResetKey((k) => k + 1);
    setShowSteps(false);
    setCurrentIndex((i) => i + 1);
  };

  const handleHintUsed = (_tier: 1 | 2 | 3 | 4, _multiplier: number) => {
    setHintLevel((l) => l + 1);
  };

  if (isComplete) {
    const finalScore = Math.round((score / (totalProblems * 100)) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            {language === 'is' ? 'Þrep 2 lokið!' : 'Level 2 Complete!'}
          </h2>
          <div className="text-6xl mb-6">
            {finalScore >= 80 ? '🏆' : finalScore >= 60 ? '⭐' : '📚'}
          </div>
          <p className="text-xl mb-4">
            {language === 'is' ? 'Skor' : 'Score'}: {finalScore}%
          </p>
          <p className="text-gray-600 mb-6">
            {language === 'is'
              ? `Þú útreiknaðir ${Math.round(score / 100)} af ${totalProblems} vandamálum rétt.`
              : `You solved ${Math.round(score / 100)} of ${totalProblems} problems correctly.`}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              {language === 'is' ? 'Til baka' : 'Back'}
            </button>
            <button
              onClick={() => onComplete(finalScore)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              {language === 'is' ? 'Halda áfram' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const difficultyLabel =
    currentProblem.difficulty === 'basic'
      ? language === 'is'
        ? 'Grunnur'
        : 'Basic'
      : currentProblem.difficulty === 'with_stoichiometry'
        ? language === 'is'
          ? 'Með stefnumetri'
          : 'With Stoichiometry'
        : language === 'is'
          ? 'Sameiginleg jón'
          : 'Common Ion';

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-green-600 hover:text-green-800"
          >
            ← {language === 'is' ? 'Til baka' : 'Back'}
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-800">
              {language === 'is' ? 'Þrep 2: Útreikningar' : 'Level 2: Calculations'}
            </h1>
            <p className="text-gray-600">
              {currentIndex + 1} / {totalProblems}
            </p>
          </div>
          <div className="text-right">
            <span className="text-green-600 font-bold">{score}</span>
            <span className="text-gray-500"> {language === 'is' ? 'stig' : 'pts'}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-green-600 h-2 rounded-full transition-all"
            style={{ width: `${(currentIndex / totalProblems) * 100}%` }}
          />
        </div>

        {/* Difficulty badge */}
        <div className="flex justify-center mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentProblem.difficulty === 'basic'
                ? 'bg-green-200 text-green-800'
                : currentProblem.difficulty === 'with_stoichiometry'
                  ? 'bg-yellow-200 text-yellow-800'
                  : 'bg-red-200 text-red-800'
            }`}
          >
            {difficultyLabel}
          </span>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {language === 'is' ? currentProblem.questionIs : currentProblem.question}
          </h2>

          {/* Compound info */}
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">⚗️</div>
              <div>
                <p className="text-2xl font-mono font-bold text-green-800">
                  {currentProblem.compound.formula}
                </p>
                <p className="text-gray-600">
                  {language === 'is'
                    ? currentProblem.compound.nameIs
                    : currentProblem.compound.name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {currentProblem.compound.formula} ⇌ {currentProblem.compound.cationCoeff}
                  {currentProblem.compound.cation} + {currentProblem.compound.anionCoeff}
                  {currentProblem.compound.anion}
                </p>
              </div>
            </div>
          </div>

          {/* Given data */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">
              {language === 'is' ? 'Gefin gögn:' : 'Given:'}
            </h3>
            <ul className="space-y-1">
              {currentProblem.givenData.Ksp && (
                <li>Ksp = {currentProblem.givenData.Ksp.toExponential(2)}</li>
              )}
              {currentProblem.givenData.solubility && (
                <li>
                  {language === 'is' ? 'Leysni' : 'Solubility'} ={' '}
                  {currentProblem.givenData.solubility.toExponential(2)}{' '}
                  {currentProblem.givenData.solubilityUnit}
                </li>
              )}
              {currentProblem.givenData.commonIon && (
                <li>
                  [{currentProblem.givenData.commonIon.ion}] ={' '}
                  {currentProblem.givenData.commonIon.concentration} M (
                  {language === 'is' ? 'frá öðru efni' : 'from another source'})
                </li>
              )}
            </ul>
          </div>

          {/* Answer input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'is' ? 'Svar þitt' : 'Your answer'}
              {currentProblem.answerUnit && ` (${currentProblem.answerUnit})`}:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={showFeedback}
                placeholder={language === 'is' ? 'T.d. 1.33e-5' : 'e.g., 1.33e-5'}
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none font-mono"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !showFeedback) {
                    checkAnswer();
                  }
                }}
              />
              {!showFeedback && (
                <button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {language === 'is' ? 'Athuga' : 'Check'}
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {language === 'is'
                ? 'Notaðu vísindalega rithætti (t.d. 1.33e-5 eða 1.33×10⁻⁵)'
                : 'Use scientific notation (e.g., 1.33e-5 or 1.33×10⁻⁵)'}
            </p>
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div
            className={`rounded-xl p-6 mb-6 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{isCorrect ? '✅' : '❌'}</span>
              <span className="text-xl font-bold">
                {isCorrect
                  ? language === 'is'
                    ? 'Rétt!'
                    : 'Correct!'
                  : language === 'is'
                    ? 'Rangt'
                    : 'Incorrect'}
              </span>
            </div>

            <p className="mb-2">
              <span className="font-semibold">
                {language === 'is' ? 'Rétt svar:' : 'Correct answer:'}
              </span>{' '}
              <span className="font-mono">
                {currentProblem.answer.toExponential(2)} {currentProblem.answerUnit}
              </span>
            </p>

            {/* Show/hide steps */}
            <button
              onClick={() => setShowSteps(!showSteps)}
              className="text-blue-600 hover:text-blue-800 underline mb-3"
            >
              {showSteps
                ? language === 'is'
                  ? 'Fela lausn'
                  : 'Hide solution'
                : language === 'is'
                  ? 'Sýna lausn'
                  : 'Show solution'}
            </button>

            {showSteps && (
              <div className="bg-white rounded-lg p-4 mt-2">
                <h4 className="font-semibold mb-2">
                  {language === 'is' ? 'Lausn:' : 'Solution:'}
                </h4>
                <ol className="list-decimal list-inside space-y-1">
                  {(language === 'is' ? currentProblem.stepsIs : currentProblem.steps).map(
                    (step, idx) => (
                      <li key={idx} className="text-gray-700">
                        {step}
                      </li>
                    )
                  )}
                </ol>
              </div>
            )}

            <button
              onClick={handleNext}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              {language === 'is' ? 'Næst' : 'Next'}
            </button>
          </div>
        )}

        {/* Hint display */}
        {!showFeedback && (
          <HintSystem
            hints={currentProblem.hints}
            onHintUsed={handleHintUsed}
            resetKey={hintResetKey}
            disabled={showFeedback}
          />
        )}
      </div>
    </div>
  );
}

export default Level2;
