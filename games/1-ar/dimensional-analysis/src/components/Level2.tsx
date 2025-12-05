import { useState, useEffect } from 'react';
import { level2Problems } from '../data/problems';
import { UnitCancellationVisualizer } from './UnitCancellationVisualizer';

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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← Til baka
          </button>
          <div className="text-sm text-gray-600">
            <span>Vandamál {progress.problemsCompleted + 1} / 15</span>
            <span className="ml-4">Spánákvæmni: {predictionAccuracy}%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Samhengi:</p>
            <p className="font-semibold">{problem.context}</p>
          </div>

          <div className="mb-6 p-6 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-2">Byrja með:</p>
            <p className="text-3xl font-bold" style={{ color: '#f36b22' }}>
              {problem.startValue} {problem.startUnit}
            </p>
            <p className="text-sm text-gray-600 mt-4">Markmið: {problem.targetUnit}</p>
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
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Stuðlar notaðir:</p>
              <div className="flex flex-wrap gap-2">
                {selectedFactors.map((factor, idx) => (
                  <div key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-mono">
                    {factor}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!showFeedback && (
            <>
              {/* Available factors */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Tiltækir umbreytingarstuðlar:</p>
                <div className="grid grid-cols-2 gap-3">
                  {problem.correctPath.slice(selectedFactors.length, selectedFactors.length + 3).map((factor, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFactorSelect(factor)}
                      className="p-3 border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all font-mono text-sm"
                    >
                      {factor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Answer input */}
              <div className="mb-6">
                <label className="block font-semibold mb-2">Lokagildi:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Sláðu inn svar"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg font-mono"
                  />
                  <span className="flex items-center px-3 text-gray-600">{problem.targetUnit}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={selectedFactors.length === 0 || !userAnswer.trim()}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                style={{ backgroundColor: selectedFactors.length === 0 || !userAnswer.trim() ? undefined : '#f36b22' }}
              >
                Athuga svar
              </button>
            </>
          )}

          {showFeedback && (
            <div className={`p-6 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-yellow-100'}`}>
              <h3 className="text-xl font-bold mb-4">
                {isCorrect ? '✓ Rétt svar!' : '○ Ekki alveg rétt'}
              </h3>

              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Rétt leið:</strong> {problem.correctPath.join(' → ')}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Spánákvæmni þín:</strong> {predictionAccuracy}%
                </p>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600"
                style={{ backgroundColor: '#f36b22' }}
              >
                {currentProblemIndex < level2Problems.length - 1 ? 'Næsta vandamál →' : 'Ljúka stigi'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Prediction modal */}
      {showPredictionPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Spáðu fyrir um næstu einingu</h3>
            <p className="text-sm text-gray-600 mb-4">
              Ef þú notar stuðulinn <span className="font-mono font-semibold">{pendingFactor}</span>,
              hvaða eining munt þú fá?
            </p>

            <input
              type="text"
              value={predictedUnit}
              onChange={(e) => setPredictedUnit(e.target.value)}
              placeholder="t.d. kg, m/s, osfrv."
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4"
              autoFocus
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPredictionPrompt(false);
                  setPredictedUnit('');
                }}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50"
              >
                Hætta við
              </button>
              <button
                onClick={handlePredictionSubmit}
                disabled={!predictedUnit.trim()}
                className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-300"
                style={{ backgroundColor: !predictedUnit.trim() ? undefined : '#f36b22' }}
              >
                Staðfesta spá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
