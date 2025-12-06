import { useState, useEffect } from 'react';
import { level2Problems } from '../data/problems';
import { UnitCancellationVisualizer } from './UnitCancellationVisualizer';
import { UnitBlock, ConversionFactorBlock } from './UnitBlock';

interface Level2Progress {
  problemsCompleted: number;
  predictionsMade: number;
  predictionsCorrect: number;
  finalAnswersCorrect: number;
  mastered: boolean;
}

interface Level2Props {
  onComplete: (progress: Level2Progress) => void;
  onBack: () => void;
  initialProgress?: Level2Progress;
}

export function Level2({ onComplete, onBack, initialProgress }: Level2Props) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(
    initialProgress?.problemsCompleted || 0
  );
  const [progress, setProgress] = useState<Level2Progress>(
    initialProgress || {
      problemsCompleted: 0,
      predictionsMade: 0,
      predictionsCorrect: 0,
      finalAnswersCorrect: 0,
      mastered: false
    }
  );

  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [predictedUnit, setPredictedUnit] = useState('');
  const [showPredictionPrompt, setShowPredictionPrompt] = useState(false);
  const [pendingFactor, setPendingFactor] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const problem = level2Problems[currentProblemIndex];

  useEffect(() => {
    if (problem) {
      setSelectedFactors([]);
      setUserAnswer('');
      setPredictedUnit('');
      setShowFeedback(false);
    }
  }, [currentProblemIndex, problem]);

  const handleFactorSelect = (factor: string) => {
    setPendingFactor(factor);
    setShowPredictionPrompt(true);
  };

  const handlePredictionSubmit = () => {
    // Track prediction
    const numeratorUnits = [problem.startUnit, ...selectedFactors.map(f => f.split(' / ')[0].split(' ')[1])];
    const denominatorUnits = selectedFactors.map(f => f.split(' / ')[1].split(' ')[1]);

    // Simple unit tracking - check if prediction makes sense
    const newNumeratorUnits = [...numeratorUnits, pendingFactor.split(' / ')[0].split(' ')[1]];
    const newDenominatorUnits = [...denominatorUnits, pendingFactor.split(' / ')[1].split(' ')[1]];

    // Remove cancelled units
    const cancelledUnits = newNumeratorUnits.filter(u => newDenominatorUnits.includes(u));
    const finalNumerator = newNumeratorUnits.filter(u => !cancelledUnits.includes(u) || newNumeratorUnits.filter(x => x === u).length > newDenominatorUnits.filter(x => x === u).length);
    const finalDenominator = newDenominatorUnits.filter(u => !cancelledUnits.includes(u) || newDenominatorUnits.filter(x => x === u).length > newNumeratorUnits.filter(x => x === u).length);

    const actualUnit = finalDenominator.length > 0
      ? `${finalNumerator[finalNumerator.length - 1]}/${finalDenominator[finalDenominator.length - 1]}`
      : finalNumerator[finalNumerator.length - 1];

    const predictionCorrect = predictedUnit.trim() === actualUnit;

    const newProgress = {
      ...progress,
      predictionsMade: progress.predictionsMade + 1,
      predictionsCorrect: progress.predictionsCorrect + (predictionCorrect ? 1 : 0)
    };
    setProgress(newProgress);

    // Apply the factor
    setSelectedFactors([...selectedFactors, pendingFactor]);
    setShowPredictionPrompt(false);
    setPredictedUnit('');
  };

  const handleSubmit = () => {
    // Check if path matches correct path
    const pathCorrect = problem.correctPath.every((step, idx) => selectedFactors[idx] === step);

    // Check final answer
    const userNum = parseFloat(userAnswer);
    let expectedAnswer = problem.startValue;
    problem.correctPath.forEach(factor => {
      const [num, den] = factor.split(' / ');
      const numVal = parseFloat(num.split(' ')[0]);
      const denVal = parseFloat(den.split(' ')[0]);
      expectedAnswer = expectedAnswer * numVal / denVal;
    });

    const answerCorrect = Math.abs(userNum - expectedAnswer) < 0.01;
    const finalCorrect = pathCorrect && answerCorrect;

    setIsCorrect(finalCorrect);
    setShowFeedback(true);

    const newProgress = {
      ...progress,
      finalAnswersCorrect: progress.finalAnswersCorrect + (finalCorrect ? 1 : 0)
    };
    setProgress(newProgress);
  };

  const handleContinue = () => {
    const newProgress = {
      ...progress,
      problemsCompleted: progress.problemsCompleted + 1
    };

    // Check mastery after 15 problems
    if (newProgress.problemsCompleted >= 15) {
      const predictionAccuracy = newProgress.predictionsMade > 0 ? newProgress.predictionsCorrect / newProgress.predictionsMade : 0;
      const answerAccuracy = newProgress.problemsCompleted > 0 ? newProgress.finalAnswersCorrect / newProgress.problemsCompleted : 0;
      newProgress.mastered = predictionAccuracy >= 0.7 && answerAccuracy >= 0.8;
    }

    setProgress(newProgress);

    if (currentProblemIndex < level2Problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    } else {
      onComplete(newProgress);
    }
  };

  if (!problem) return null;

  const predictionAccuracy = progress.predictionsMade > 0
    ? Math.round((progress.predictionsCorrect / progress.predictionsMade) * 100)
    : 0;

  // Calculate current units for visualization
  const numeratorUnits = [problem.startUnit, ...selectedFactors.map(f => f.split(' / ')[0].split(' ')[1])];
  const denominatorUnits = selectedFactors.map(f => f.split(' / ')[1].split(' ')[1]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2 text-lg"
          >
            ← Til baka
          </button>
          <div className="text-sm text-gray-600 flex items-center gap-2 sm:gap-4 flex-wrap">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
              Stig 2: Beiting
            </span>
            <span>Verkefni {progress.problemsCompleted + 1} / 15</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              Spánákvæmni: {predictionAccuracy}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((progress.problemsCompleted) / 15) * 100}%` }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Samhengi:</p>
            <p className="font-semibold">{problem.context}</p>
          </div>

          <div className="mb-6 p-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl text-center">
            <p className="text-sm text-gray-600 mb-3">Byrja með:</p>
            <div className="flex justify-center mb-4">
              <UnitBlock
                value={problem.startValue}
                unit={problem.startUnit}
                color="orange"
                size="large"
              />
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <span className="text-2xl">→</span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-bold">
                {problem.targetUnit}
              </span>
            </div>
          </div>

          {/* Unit visualization */}
          <div className="mb-6">
            <UnitCancellationVisualizer
              numeratorUnits={numeratorUnits}
              denominatorUnits={denominatorUnits}
              showCancelButton={false}
            />
          </div>

          {selectedFactors.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-semibold mb-3 text-gray-700">Stuðlar notaðir:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {selectedFactors.map((factor, idx) => {
                  const [numPart, denPart] = factor.split(' / ');
                  const numValue = parseFloat(numPart.split(' ')[0]);
                  const numUnit = numPart.split(' ').slice(1).join(' ');
                  const denValue = parseFloat(denPart.split(' ')[0]);
                  const denUnit = denPart.split(' ').slice(1).join(' ');

                  return (
                    <div key={idx} className="flex items-center gap-2">
                      {idx > 0 && <span className="text-xl text-gray-400">×</span>}
                      <ConversionFactorBlock
                        numeratorValue={numValue}
                        numeratorUnit={numUnit}
                        denominatorValue={denValue}
                        denominatorUnit={denUnit}
                        isCorrect={true}
                        size="small"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!showFeedback && (
            <>
              {/* Available factors */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Veldu umbreytingarstuðul:</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {problem.correctPath.slice(selectedFactors.length, selectedFactors.length + 3).map((factor, idx) => {
                    // Parse factor string like "1 L / 1000 mL"
                    const [numPart, denPart] = factor.split(' / ');
                    const numValue = parseFloat(numPart.split(' ')[0]);
                    const numUnit = numPart.split(' ').slice(1).join(' ');
                    const denValue = parseFloat(denPart.split(' ')[0]);
                    const denUnit = denPart.split(' ').slice(1).join(' ');

                    return (
                      <ConversionFactorBlock
                        key={idx}
                        numeratorValue={numValue}
                        numeratorUnit={numUnit}
                        denominatorValue={denValue}
                        denominatorUnit={denUnit}
                        onClick={() => handleFactorSelect(factor)}
                        size="medium"
                      />
                    );
                  })}
                </div>
              </div>

              {/* Answer input */}
              <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200">
                <label className="block font-semibold mb-3 text-gray-800">Hvað er lokagildið?</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Sláðu inn svar"
                    className="flex-1 p-4 border-2 border-gray-300 rounded-xl font-mono text-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  />
                  <div className="px-4 py-3 bg-green-100 text-green-800 rounded-xl font-bold text-lg">
                    {problem.targetUnit}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={selectedFactors.length === 0 || !userAnswer.trim()}
                className="w-full py-4 rounded-xl font-bold text-lg transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Athuga svar →
              </button>
            </>
          )}

          {showFeedback && (
            <div className={`p-6 rounded-xl border-2 ${isCorrect ? 'bg-green-100 border-green-300' : 'bg-yellow-100 border-yellow-300'}`}>
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">{isCorrect ? '🎉' : '💡'}</div>
                <h3 className="text-2xl font-bold">
                  {isCorrect ? 'Rétt svar!' : 'Nálægt!'}
                </h3>
              </div>

              <div className="mb-6 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Rétt umbreytingarleið:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {problem.correctPath.map((factor, idx) => {
                    const [numPart, denPart] = factor.split(' / ');
                    const numValue = parseFloat(numPart.split(' ')[0]);
                    const numUnit = numPart.split(' ').slice(1).join(' ');
                    const denValue = parseFloat(denPart.split(' ')[0]);
                    const denUnit = denPart.split(' ').slice(1).join(' ');

                    return (
                      <div key={idx} className="flex items-center gap-1">
                        {idx > 0 && <span className="text-gray-400 mx-1">×</span>}
                        <ConversionFactorBlock
                          numeratorValue={numValue}
                          numeratorUnit={numUnit}
                          denominatorValue={denValue}
                          denominatorUnit={denUnit}
                          isCorrect={true}
                          size="small"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <p className="text-xs text-gray-600">Spánákvæmni</p>
                  <p className={`text-2xl font-bold ${predictionAccuracy >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {predictionAccuracy}%
                  </p>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-colors ${
                  isCorrect
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {currentProblemIndex < level2Problems.length - 1 ? 'Næsta verkefni →' : 'Ljúka stigi'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Prediction modal */}
      {showPredictionPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-slide-up">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🔮</div>
              <h3 className="text-2xl font-bold text-gray-800">Spáðu fyrir um útkomunna!</h3>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-3">Þú ætlar að nota þennan stuðul:</p>
              <div className="flex justify-center">
                {(() => {
                  const [numPart, denPart] = pendingFactor.split(' / ');
                  const numValue = parseFloat(numPart.split(' ')[0]);
                  const numUnit = numPart.split(' ').slice(1).join(' ');
                  const denValue = parseFloat(denPart.split(' ')[0]);
                  const denUnit = denPart.split(' ').slice(1).join(' ');
                  return (
                    <ConversionFactorBlock
                      numeratorValue={numValue}
                      numeratorUnit={numUnit}
                      denominatorValue={denValue}
                      denominatorUnit={denUnit}
                      size="medium"
                    />
                  );
                })()}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hvaða eining verður útkoman?
              </label>
              <input
                type="text"
                value={predictedUnit}
                onChange={(e) => setPredictedUnit(e.target.value)}
                placeholder="t.d. kg, m/s, osfrv."
                className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPredictionPrompt(false);
                  setPredictedUnit('');
                }}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Hætta við
              </button>
              <button
                onClick={handlePredictionSubmit}
                disabled={!predictedUnit.trim()}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Staðfesta →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
