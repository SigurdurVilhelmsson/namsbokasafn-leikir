/**
 * ICETable Component
 *
 * Interactive ICE (Initial, Change, Equilibrium) table for equilibrium calculations.
 * Students can:
 * - View the equilibrium equation and K value
 * - Fill in the ICE table (or view a completed one)
 * - Calculate x (the change variable)
 * - See step-by-step solutions
 */

import { useState, useEffect } from 'react';
import type { ICETableProblem, ICESolveResult, ShiftDirection } from '../types';
import {
  solveICETable,
  calculateQ,
  getShiftDirection,
  formatKExpression,
  getChangeExpressions,
  validateICEInput,
} from '../utils/ice-table';
import { HintSystem } from '@shared/components';
import type { TieredHints } from '@shared/types';

interface ICETableProps {
  problem: ICETableProblem;
  mode: 'interactive' | 'guided' | 'view';
  language: 'is' | 'en';
  onComplete?: (score: number, hintsUsed: number) => void;
  onBack?: () => void;
}

type Step = 'direction' | 'setup' | 'solve' | 'complete';

export function ICETable({
  problem,
  mode: _mode,
  language,
  onComplete,
  onBack,
}: ICETableProps) {
  const [step, setStep] = useState<Step>('direction');
  const [userDirection, setUserDirection] = useState<ShiftDirection | null>(null);
  const [userX, setUserX] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintMultiplier, setHintMultiplier] = useState(1.0);
  const [hintResetKey, setHintResetKey] = useState(0);
  const [score, setScore] = useState(0);

  // Calculate solution
  const solution: ICESolveResult = solveICETable(problem, language);
  const Q0 = calculateQ(problem.equilibrium, problem.initialConcentrations);
  const correctDirection = getShiftDirection(Q0, problem.K);

  // Get change expressions for display
  const changeExpressions = getChangeExpressions(
    problem.equilibrium,
    correctDirection === 'right'
  );

  // Build hints for HintSystem
  const hints: TieredHints = {
    topic: problem.hints.topic,
    strategy: problem.hints.strategy,
    method: problem.hints.method,
    solution: problem.hints.solution,
  };

  const handleHintUsed = (tier: number) => {
    setHintsUsed((prev) => prev + 1);
    const multipliers = [0.8, 0.6, 0.4, 0.2];
    setHintMultiplier(multipliers[tier - 1] || 0.2);
  };

  // Step 1: Check direction prediction
  const handleDirectionSubmit = () => {
    if (!userDirection) return;

    const isCorrect = userDirection === correctDirection;
    if (isCorrect) {
      setFeedback({
        correct: true,
        message:
          language === 'is'
            ? 'Rétt! Q vs K samanburður er réttur.'
            : 'Correct! Q vs K comparison is right.',
      });
      setScore((prev) => prev + Math.round(30 * hintMultiplier));
      setTimeout(() => {
        setFeedback(null);
        setStep('setup');
        setHintResetKey((prev) => prev + 1);
        setHintMultiplier(1.0);
      }, 1500);
    } else {
      setFeedback({
        correct: false,
        message:
          language === 'is'
            ? `Rangt. Q = ${Q0.toExponential(2)}, K = ${problem.K.toExponential(2)}. ${
                Q0 < problem.K
                  ? 'Q < K svo hvarfið fer til hægri.'
                  : 'Q > K svo hvarfið fer til vinstri.'
              }`
            : `Incorrect. Q = ${Q0.toExponential(2)}, K = ${problem.K.toExponential(2)}. ${
                Q0 < problem.K
                  ? 'Q < K so reaction shifts right.'
                  : 'Q > K so reaction shifts left.'
              }`,
      });
    }
  };

  // Step 2: Setup is informational, just show the table structure
  const handleSetupContinue = () => {
    setStep('solve');
    setHintResetKey((prev) => prev + 1);
    setHintMultiplier(1.0);
  };

  // Step 3: Solve for x
  const handleSolveSubmit = () => {
    const userXValue = parseFloat(userX);
    if (isNaN(userXValue)) {
      setFeedback({
        correct: false,
        message: language === 'is' ? 'Sláðu inn tölu.' : 'Enter a number.',
      });
      return;
    }

    const validation = validateICEInput(userXValue, Math.abs(solution.x), 0.15);

    if (validation.correct) {
      setFeedback({
        correct: true,
        message:
          language === 'is'
            ? `Rétt! x = ${Math.abs(solution.x).toFixed(4)} M`
            : `Correct! x = ${Math.abs(solution.x).toFixed(4)} M`,
      });
      setScore((prev) => prev + Math.round(70 * hintMultiplier));
      setTimeout(() => {
        setFeedback(null);
        setStep('complete');
      }, 1500);
    } else {
      setFeedback({
        correct: false,
        message:
          language === 'is'
            ? `Rangt. Skekkja: ${validation.percentError.toFixed(1)}%. Reyndu aftur.`
            : `Incorrect. Error: ${validation.percentError.toFixed(1)}%. Try again.`,
      });
    }
  };

  // Complete - show full solution
  useEffect(() => {
    if (step === 'complete' && onComplete) {
      onComplete(score, hintsUsed);
    }
  }, [step]);

  // Get species for the table
  const allSpecies = [
    ...problem.equilibrium.reactants.map((r) => ({
      ...r,
      isReactant: true,
    })),
    ...problem.equilibrium.products.map((p) => ({
      ...p,
      isReactant: false,
    })),
  ].filter((s) => s.phase === 'g' || s.phase === 'aq');

  return (
    <div className="ice-table-container bg-white rounded-2xl shadow-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {onBack && (
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← {language === 'is' ? 'Til baka' : 'Back'}
          </button>
        )}
        <div className="text-right">
          <div className="text-sm text-gray-600">
            {language === 'is' ? 'Stig' : 'Score'}: {score}
          </div>
          <div className="text-xs text-gray-500">
            {language === 'is'
              ? `Erfiðleiki: ${problem.difficulty === 'beginner' ? 'Byrjandi' : problem.difficulty === 'intermediate' ? 'Meðal' : 'Háþróaður'}`
              : `Difficulty: ${problem.difficulty}`}
          </div>
        </div>
      </div>

      {/* Equation and K */}
      <div className="mb-6 p-4 bg-indigo-50 rounded-xl">
        <div className="text-2xl font-bold text-center mb-2">
          {problem.equilibrium.equation}
        </div>
        <div className="text-center text-gray-700">
          <span className="font-mono bg-white px-2 py-1 rounded">
            {problem.Ktype} = {problem.K.toExponential(2)}
          </span>
          <span className="ml-4 text-sm">
            T = {problem.temperature} K
          </span>
        </div>
      </div>

      {/* Problem description */}
      <div className="mb-6 p-4 bg-gray-50 rounded-xl">
        <p className="text-gray-700">
          {language === 'is' ? problem.descriptionIs : problem.description}
        </p>
      </div>

      {/* Step 1: Direction prediction */}
      {step === 'direction' && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4">
            {language === 'is'
              ? 'Skref 1: Ákvarðaðu stefnu hvarfsins'
              : 'Step 1: Determine reaction direction'}
          </h3>

          <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
            <div className="font-medium mb-2">
              {language === 'is' ? 'Upphafsgildi:' : 'Initial values:'}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.entries(problem.initialConcentrations).map(([species, conc]) => (
                <div key={species} className="bg-white px-3 py-2 rounded text-center">
                  <div className="font-mono">[{species}]₀</div>
                  <div className="font-bold">{conc.toFixed(3)} M</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">
              {language === 'is'
                ? 'Reiknaðu Q og berðu saman við K. Hvert mun hvarfið færast?'
                : 'Calculate Q and compare to K. Which way will the reaction shift?'}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setUserDirection('left')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  userDirection === 'left'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <div className="text-2xl mb-1">←</div>
                <div className="text-sm font-medium">
                  {language === 'is' ? 'Til vinstri' : 'Shift Left'}
                </div>
                <div className="text-xs text-gray-500">Q {'>'} K</div>
              </button>

              <button
                onClick={() => setUserDirection('none')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  userDirection === 'none'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="text-2xl mb-1">⇌</div>
                <div className="text-sm font-medium">
                  {language === 'is' ? 'Engin hliðrun' : 'No Shift'}
                </div>
                <div className="text-xs text-gray-500">Q = K</div>
              </button>

              <button
                onClick={() => setUserDirection('right')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  userDirection === 'right'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="text-2xl mb-1">→</div>
                <div className="text-sm font-medium">
                  {language === 'is' ? 'Til hægri' : 'Shift Right'}
                </div>
                <div className="text-xs text-gray-500">Q {'<'} K</div>
              </button>
            </div>
          </div>

          <button
            onClick={handleDirectionSubmit}
            disabled={!userDirection}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            {language === 'is' ? 'Staðfesta' : 'Confirm'}
          </button>
        </div>
      )}

      {/* Step 2: ICE Table Setup */}
      {step === 'setup' && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4">
            {language === 'is'
              ? 'Skref 2: Settu upp ICE töflu'
              : 'Step 2: Set up ICE table'}
          </h3>

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="border p-2 text-left"></th>
                  {allSpecies.map((s) => (
                    <th
                      key={s.formula}
                      className={`border p-2 text-center ${
                        s.isReactant ? 'bg-red-50' : 'bg-green-50'
                      }`}
                    >
                      {s.formula}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Initial row */}
                <tr>
                  <td className="border p-2 font-bold bg-gray-50">I</td>
                  {allSpecies.map((s) => (
                    <td key={s.formula} className="border p-2 text-center">
                      {(problem.initialConcentrations[s.formula] ?? 0).toFixed(3)}
                    </td>
                  ))}
                </tr>
                {/* Change row */}
                <tr>
                  <td className="border p-2 font-bold bg-gray-50">C</td>
                  {allSpecies.map((s) => (
                    <td
                      key={s.formula}
                      className={`border p-2 text-center font-mono ${
                        s.isReactant ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {changeExpressions[s.formula]}
                    </td>
                  ))}
                </tr>
                {/* Equilibrium row */}
                <tr>
                  <td className="border p-2 font-bold bg-gray-50">E</td>
                  {allSpecies.map((s) => {
                    const init = problem.initialConcentrations[s.formula] ?? 0;
                    const expr = s.isReactant
                      ? `${init.toFixed(3)} ${changeExpressions[s.formula]}`
                      : `${init.toFixed(3)} ${changeExpressions[s.formula]}`;
                    return (
                      <td key={s.formula} className="border p-2 text-center font-mono text-sm">
                        {expr}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg mb-4">
            <div className="font-medium mb-2">
              {language === 'is' ? 'K tjáning:' : 'K expression:'}
            </div>
            <div className="font-mono text-lg">
              {formatKExpression(problem.equilibrium)}
            </div>
          </div>

          <button
            onClick={handleSetupContinue}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            {language === 'is' ? 'Halda áfram' : 'Continue'}
          </button>
        </div>
      )}

      {/* Step 3: Solve for x */}
      {step === 'solve' && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4">
            {language === 'is'
              ? 'Skref 3: Leystu fyrir x'
              : 'Step 3: Solve for x'}
          </h3>

          <div className="p-4 bg-yellow-50 rounded-lg mb-4">
            <div className="text-sm text-gray-700 mb-2">
              {language === 'is'
                ? 'Settu jafnvægistjáninguna í K jöfnuna og leystu fyrir x.'
                : 'Substitute equilibrium expressions into K equation and solve for x.'}
            </div>
            <div className="font-mono text-sm bg-white p-2 rounded">
              {problem.K.toExponential(2)} = {formatKExpression(problem.equilibrium).replace('K = ', '')}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'is'
                ? 'Sláðu inn gildi x (í M eða atm):'
                : 'Enter the value of x (in M or atm):'}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                step="any"
                value={userX}
                onChange={(e) => setUserX(e.target.value)}
                className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-indigo-500 focus:outline-none"
                placeholder="0.000"
              />
              <button
                onClick={handleSolveSubmit}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-2 rounded-lg transition-colors"
              >
                {language === 'is' ? 'Athuga' : 'Check'}
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowSolution(!showSolution)}
            className="text-indigo-600 hover:text-indigo-800 text-sm underline"
          >
            {showSolution
              ? language === 'is'
                ? 'Fela lausn'
                : 'Hide solution'
              : language === 'is'
                ? 'Sýna lausn'
                : 'Show solution'}
          </button>

          {showSolution && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <div className="font-medium mb-2">
                {language === 'is' ? 'Lausn:' : 'Solution:'}
              </div>
              <div className="space-y-1 text-sm">
                {(language === 'is' ? solution.stepsIs : solution.steps).map(
                  (stepText, i) => (
                    <div key={i} className="font-mono">
                      {stepText}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Complete - show results */}
      {step === 'complete' && (
        <div className="mb-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-green-600">
              {language === 'is' ? 'Vel gert!' : 'Well done!'}
            </h3>
            <div className="text-gray-600">
              {language === 'is' ? 'Þú leystir ICE töfluna!' : 'You solved the ICE table!'}
            </div>
          </div>

          {/* Final ICE table with values */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="border p-2 text-left"></th>
                  {allSpecies.map((s) => (
                    <th
                      key={s.formula}
                      className={`border p-2 text-center ${
                        s.isReactant ? 'bg-red-50' : 'bg-green-50'
                      }`}
                    >
                      {s.formula}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-bold bg-gray-50">I</td>
                  {allSpecies.map((s) => (
                    <td key={s.formula} className="border p-2 text-center">
                      {(problem.initialConcentrations[s.formula] ?? 0).toFixed(4)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 font-bold bg-gray-50">C</td>
                  {allSpecies.map((s) => {
                    const change = s.isReactant
                      ? -s.coefficient * Math.abs(solution.x)
                      : s.coefficient * Math.abs(solution.x);
                    return (
                      <td
                        key={s.formula}
                        className={`border p-2 text-center ${
                          change < 0 ? 'text-red-600' : 'text-green-600'
                        }`}
                      >
                        {change >= 0 ? '+' : ''}
                        {change.toFixed(4)}
                      </td>
                    );
                  })}
                </tr>
                <tr className="bg-yellow-50">
                  <td className="border p-2 font-bold">E</td>
                  {allSpecies.map((s) => (
                    <td key={s.formula} className="border p-2 text-center font-bold">
                      {(solution.equilibriumConcentrations[s.formula] ?? 0).toFixed(4)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">x = </span>
                <span className="font-bold">{Math.abs(solution.x).toFixed(4)} M</span>
              </div>
              <div>
                <span className="text-gray-600">
                  {language === 'is' ? 'Stefna: ' : 'Direction: '}
                </span>
                <span className="font-bold">
                  {solution.shiftDirection === 'right'
                    ? language === 'is'
                      ? 'Til hægri →'
                      : 'Right →'
                    : solution.shiftDirection === 'left'
                      ? language === 'is'
                        ? '← Til vinstri'
                        : '← Left'
                      : language === 'is'
                        ? 'Í jafnvægi'
                        : 'At equilibrium'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 mb-2">
              {score} {language === 'is' ? 'stig' : 'points'}
            </div>
            {hintsUsed > 0 && (
              <div className="text-sm text-gray-500">
                {language === 'is'
                  ? `${hintsUsed} vísbendingar notaðar`
                  : `${hintsUsed} hints used`}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feedback message */}
      {feedback && (
        <div
          className={`p-4 rounded-lg mb-4 ${
            feedback.correct
              ? 'bg-green-100 border border-green-300 text-green-800'
              : 'bg-red-100 border border-red-300 text-red-800'
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* Hint system */}
      {step !== 'complete' && (
        <div className="mt-4">
          <HintSystem
            key={hintResetKey}
            hints={hints}
            onHintUsed={handleHintUsed}
          />
        </div>
      )}
    </div>
  );
}

export default ICETable;
