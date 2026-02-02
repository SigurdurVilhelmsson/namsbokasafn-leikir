/**
 * Level 3: Precipitation Prediction and Selective Precipitation
 *
 * Students learn to:
 * 1. Calculate Q and compare to Ksp to predict precipitation
 * 2. Determine which compound precipitates first in selective precipitation
 */

import { useState } from 'react';
import { useI18n } from '@shared/hooks/useI18n';
import { HintSystem } from '@shared/components';
import { level3Problems } from '../data';

interface Level3Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export function Level3({ onComplete, onBack }: Level3Props) {
  const { language } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [hintResetKey, setHintResetKey] = useState(0);

  // For predict_precipitate
  const [selectedPrediction, setSelectedPrediction] = useState<boolean | null>(null);

  // For selective_precipitation
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);

  const totalProblems = Math.min(6, level3Problems.length);
  const currentProblem = level3Problems[currentIndex];
  const isComplete = currentIndex >= totalProblems;

  const handlePredictPrecipitate = (willPrecipitate: boolean) => {
    if (showFeedback) return;

    setSelectedPrediction(willPrecipitate);
    const correct = willPrecipitate === currentProblem.willPrecipitate;
    setShowFeedback(true);
    setIsCorrect(correct);

    if (correct) {
      const points =
        hintLevel === 0 ? 100 : hintLevel === 1 ? 75 : hintLevel === 2 ? 50 : 25;
      setScore((s) => s + points);
    }
  };

  const handleSelectCompound = (formula: string) => {
    if (showFeedback) return;

    if (selectedOrder.includes(formula)) {
      setSelectedOrder(selectedOrder.filter((f) => f !== formula));
    } else {
      const newOrder = [...selectedOrder, formula];
      setSelectedOrder(newOrder);

      // Check if all selected
      if (newOrder.length === currentProblem.compounds.length) {
        const correct =
          JSON.stringify(newOrder) === JSON.stringify(currentProblem.precipitationOrder);
        setShowFeedback(true);
        setIsCorrect(correct);

        if (correct) {
          const points =
            hintLevel === 0 ? 100 : hintLevel === 1 ? 75 : hintLevel === 2 ? 50 : 25;
          setScore((s) => s + points);
        }
      }
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedPrediction(null);
    setSelectedOrder([]);
    setHintLevel(0);
    setHintResetKey((k) => k + 1);
    setCurrentIndex((i) => i + 1);
  };

  const handleHintUsed = (_tier: 1 | 2 | 3 | 4, _multiplier: number) => {
    setHintLevel((l) => l + 1);
  };

  // Calculate concentrations after mixing for display
  const calculateMixedConcentrations = () => {
    const { solution1, solution2 } = currentProblem.mixingData;
    const totalVolume = solution1.volume + solution2.volume;
    const conc1 = (solution1.concentration * solution1.volume) / totalVolume;
    const conc2 = (solution2.concentration * solution2.volume) / totalVolume;
    return { conc1, conc2, totalVolume };
  };

  if (isComplete) {
    const finalScore = Math.round((score / (totalProblems * 100)) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-purple-800 mb-4">
            {language === 'is' ? 'Þrep 3 lokið!' : 'Level 3 Complete!'}
          </h2>
          <div className="text-6xl mb-6">
            {finalScore >= 80 ? '🏆' : finalScore >= 60 ? '⭐' : '📚'}
          </div>
          <p className="text-xl mb-4">
            {language === 'is' ? 'Skor' : 'Score'}: {finalScore}%
          </p>
          <p className="text-gray-600 mb-6">
            {language === 'is'
              ? `Þú spáðir rétt fyrir um ${Math.round(score / 100)} af ${totalProblems} botnföllum.`
              : `You correctly predicted ${Math.round(score / 100)} of ${totalProblems} precipitations.`}
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
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              {language === 'is' ? 'Ljúka leik' : 'Finish Game'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { conc1, conc2, totalVolume } = calculateMixedConcentrations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
          >
            ← {language === 'is' ? 'Til baka' : 'Back'}
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-800">
              {language === 'is' ? 'Þrep 3: Botnfall' : 'Level 3: Precipitation'}
            </h1>
            <p className="text-gray-600">
              {currentIndex + 1} / {totalProblems}
            </p>
          </div>
          <div className="text-right">
            <span className="text-purple-600 font-bold">{score}</span>
            <span className="text-gray-500"> {language === 'is' ? 'stig' : 'pts'}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${(currentIndex / totalProblems) * 100}%` }}
          />
        </div>

        {/* Problem type badge */}
        <div className="flex justify-center mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentProblem.type === 'predict_precipitate'
                ? 'bg-blue-200 text-blue-800'
                : 'bg-orange-200 text-orange-800'
            }`}
          >
            {currentProblem.type === 'predict_precipitate'
              ? language === 'is'
                ? 'Q vs Ksp'
                : 'Q vs Ksp'
              : language === 'is'
                ? 'Sértækt botnfall'
                : 'Selective Precipitation'}
          </span>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {language === 'is' ? currentProblem.questionIs : currentProblem.question}
          </h2>

          {/* Mixing visualization */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              {/* Beaker 1 */}
              <div className="text-center">
                <div className="text-4xl mb-2">🧪</div>
                <p className="font-mono text-sm">
                  {currentProblem.mixingData.solution1.volume} mL
                </p>
                <p className="font-mono text-sm">
                  {currentProblem.mixingData.solution1.concentration.toExponential(1)} M{' '}
                  {currentProblem.mixingData.solution1.ion}
                </p>
              </div>

              <div className="text-2xl">+</div>

              {/* Beaker 2 */}
              <div className="text-center">
                <div className="text-4xl mb-2">🧪</div>
                <p className="font-mono text-sm">
                  {currentProblem.mixingData.solution2.volume} mL
                </p>
                <p className="font-mono text-sm">
                  {currentProblem.mixingData.solution2.concentration.toExponential(1)} M{' '}
                  {currentProblem.mixingData.solution2.ion}
                </p>
              </div>

              <div className="text-2xl">→</div>

              {/* Result beaker */}
              <div className="text-center">
                <div className="text-4xl mb-2">⚗️</div>
                <p className="font-mono text-sm">{totalVolume} mL</p>
                <p className="text-xs text-gray-500">
                  {language === 'is' ? 'Blöndun' : 'Mixture'}
                </p>
              </div>
            </div>

            {/* Calculated concentrations */}
            <div className="bg-white rounded p-3 text-sm">
              <p className="font-semibold mb-1">
                {language === 'is' ? 'Eftir blöndun:' : 'After mixing:'}
              </p>
              <p>
                [{currentProblem.mixingData.solution1.ion}] = {conc1.toExponential(2)} M
              </p>
              <p>
                [{currentProblem.mixingData.solution2.ion}] = {conc2.toExponential(2)} M
              </p>
            </div>
          </div>

          {/* Compound info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">
              {language === 'is' ? 'Efnasambandsgögn:' : 'Compound Data:'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentProblem.compounds.map((compound) => (
                <div key={compound.formula} className="bg-white rounded p-3">
                  <p className="font-mono font-bold">{compound.formula}</p>
                  <p className="text-sm text-gray-600">
                    Ksp = {compound.Ksp.toExponential(2)}
                  </p>
                  {compound.color && (
                    <p className="text-xs text-gray-500">
                      {language === 'is' ? 'Litur' : 'Color'}: {compound.color}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Answer section */}
          {currentProblem.type === 'predict_precipitate' && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handlePredictPrecipitate(true)}
                disabled={showFeedback}
                className={`p-6 rounded-xl border-2 text-center transition ${
                  showFeedback
                    ? currentProblem.willPrecipitate
                      ? 'border-green-500 bg-green-50'
                      : selectedPrediction === true
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                    : selectedPrediction === true
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <div className="text-4xl mb-2">⬇️</div>
                <p className="font-bold">
                  {language === 'is' ? 'Já, botnfall' : 'Yes, precipitate'}
                </p>
                <p className="text-sm text-gray-600">Q {'>'} Ksp</p>
              </button>

              <button
                onClick={() => handlePredictPrecipitate(false)}
                disabled={showFeedback}
                className={`p-6 rounded-xl border-2 text-center transition ${
                  showFeedback
                    ? !currentProblem.willPrecipitate
                      ? 'border-green-500 bg-green-50'
                      : selectedPrediction === false
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                    : selectedPrediction === false
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <div className="text-4xl mb-2">💧</div>
                <p className="font-bold">
                  {language === 'is' ? 'Nei, ekkert botnfall' : 'No, no precipitate'}
                </p>
                <p className="text-sm text-gray-600">Q {'<'} Ksp</p>
              </button>
            </div>
          )}

          {currentProblem.type === 'selective_precipitation' && (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                {language === 'is'
                  ? 'Smelltu á efnasamböndin í þeirri röð sem þau falla út (fyrst fyrst):'
                  : 'Click the compounds in the order they precipitate (first one first):'}
              </p>

              {/* Show selected order */}
              {selectedOrder.length > 0 && (
                <div className="flex gap-2 mb-4 p-3 bg-gray-100 rounded-lg">
                  <span className="text-gray-500">
                    {language === 'is' ? 'Röðin þín:' : 'Your order:'}
                  </span>
                  {selectedOrder.map((formula, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-500 text-white rounded">
                      {idx + 1}. {formula}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {currentProblem.compounds.map((compound) => {
                  const orderIndex = selectedOrder.indexOf(compound.formula);
                  const isSelected = orderIndex !== -1;

                  return (
                    <button
                      key={compound.formula}
                      onClick={() => handleSelectCompound(compound.formula)}
                      disabled={showFeedback}
                      className={`p-4 rounded-xl border-2 text-center transition relative ${
                        showFeedback
                          ? currentProblem.precipitationOrder?.[0] === compound.formula
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200'
                          : isSelected
                            ? 'border-purple-500 bg-purple-100'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 left-2 w-6 h-6 bg-purple-500 text-white rounded-full text-sm flex items-center justify-center">
                          {orderIndex + 1}
                        </span>
                      )}
                      <p className="text-xl font-mono font-bold">{compound.formula}</p>
                      <p className="text-sm text-gray-600">Ksp = {compound.Ksp.toExponential(2)}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
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

            {currentProblem.type === 'predict_precipitate' && currentProblem.Q && (
              <div className="bg-white rounded-lg p-3 mb-3">
                <p>
                  Q = {currentProblem.Q.toExponential(2)} vs Ksp ={' '}
                  {currentProblem.compounds[0].Ksp.toExponential(2)}
                </p>
                <p className="font-semibold">
                  Q {currentProblem.Q > currentProblem.compounds[0].Ksp ? '>' : '<'} Ksp →{' '}
                  {currentProblem.willPrecipitate
                    ? language === 'is'
                      ? 'Botnfall myndast'
                      : 'Precipitate forms'
                    : language === 'is'
                      ? 'Ekkert botnfall'
                      : 'No precipitate'}
                </p>
              </div>
            )}

            {currentProblem.type === 'selective_precipitation' && (
              <div className="bg-white rounded-lg p-3 mb-3">
                <p className="font-semibold">
                  {language === 'is' ? 'Rétt röð:' : 'Correct order:'}
                </p>
                <p className="font-mono">{currentProblem.precipitationOrder?.join(' → ')}</p>
              </div>
            )}

            <p className="text-gray-700">
              {language === 'is' ? currentProblem.explanationIs : currentProblem.explanation}
            </p>

            <button
              onClick={handleNext}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
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

export default Level3;
