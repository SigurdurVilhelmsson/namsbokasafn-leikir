import { useState, useEffect } from 'react';
import { UnitCancellationVisualizer } from './UnitCancellationVisualizer';
import { CONVERSION_FACTORS, ConversionFactor } from '../data/conversion-factors';
import { PRACTICE_PROBLEMS, PracticeProblem } from '../data/practice-problems';

interface SandboxPlaygroundProps {
  onUpdateStats: (key: 'conversionsExplored' | 'pathsTried' | 'timeSpent') => void;
}

export function SandboxPlayground({ onUpdateStats }: SandboxPlaygroundProps) {
  const [currentProblem, setCurrentProblem] = useState<PracticeProblem | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<ConversionFactor[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [numeratorUnits, setNumeratorUnits] = useState<string[]>([]);
  const [denominatorUnits, setDenominatorUnits] = useState<string[]>([]);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const problem = PRACTICE_PROBLEMS[Math.floor(Math.random() * PRACTICE_PROBLEMS.length)];
    setCurrentProblem(problem);
    setSelectedFactors([]);
    setShowSolution(false);
    setNumeratorUnits([problem.from]);
    setDenominatorUnits([]);
    setCurrentValue(problem.value);
    onUpdateStats('conversionsExplored');
  };

  const getAvailableFactors = () => {
    if (!currentProblem) return [];
    const category = currentProblem.category;
    const allFactors = CONVERSION_FACTORS[category] || [];
    return allFactors;
  };

  const addFactor = (factor: ConversionFactor) => {
    const newFactors = [...selectedFactors, factor];
    setSelectedFactors(newFactors);

    const newNumerator = [...numeratorUnits, factor.to];
    const newDenominator = [...denominatorUnits, factor.from];
    setNumeratorUnits(newNumerator);
    setDenominatorUnits(newDenominator);

    setCurrentValue(currentValue * factor.factor);
    onUpdateStats('pathsTried');
  };

  const removeFactor = (index: number) => {
    const newFactors = selectedFactors.filter((_, i) => i !== index);
    setSelectedFactors(newFactors);
    recalculateFromFactors(newFactors);
  };

  const flipFactor = (index: number) => {
    const factor = selectedFactors[index];
    const flipped: ConversionFactor = {
      from: factor.to,
      to: factor.from,
      factor: 1 / factor.factor,
      name: factor.name
    };
    const newFactors = [...selectedFactors];
    newFactors[index] = flipped;
    setSelectedFactors(newFactors);
    recalculateFromFactors(newFactors);
  };

  const recalculateFromFactors = (factors: ConversionFactor[]) => {
    if (!currentProblem) return;

    let value = currentProblem.value;
    let numUnits = [currentProblem.from];
    let denomUnits: string[] = [];

    factors.forEach(factor => {
      value *= factor.factor;
      numUnits.push(factor.to);
      denomUnits.push(factor.from);
    });

    setCurrentValue(value);
    setNumeratorUnits(numUnits);
    setDenominatorUnits(denomUnits);
  };

  const cancelUnits = (unit: string) => {
    setNumeratorUnits(numeratorUnits.filter((_, i) => i !== numeratorUnits.indexOf(unit)));
    setDenominatorUnits(denominatorUnits.filter((_, i) => i !== denominatorUnits.indexOf(unit)));
  };

  const getSolution = () => {
    if (!currentProblem) return [];
    const allFactors = CONVERSION_FACTORS[currentProblem.category] || [];
    const solution = allFactors.filter(f =>
      f.from === currentProblem.from && f.to === currentProblem.to
    );
    return solution;
  };

  const isCorrect = () => {
    if (!currentProblem) return false;
    const finalUnit = numeratorUnits.filter(u => !denominatorUnits.includes(u)).slice(-1)[0];
    const solution = getSolution()[0];
    return finalUnit === currentProblem.to && solution && Math.abs(currentValue - (currentProblem.value * solution.factor)) < 0.001;
  };

  if (!currentProblem) {
    return <div className="text-center p-8">Hleð...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 animate-slide-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Leiksvæði - Frjáls könnun</h2>

      {/* Problem statement */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Upphafsgild:</p>
            <p className="text-3xl font-bold">{currentProblem.value} {currentProblem.from}</p>
          </div>
          <div className="text-4xl">→</div>
          <div>
            <p className="text-sm opacity-90 mb-1">Markgildi:</p>
            <p className="text-3xl font-bold">? {currentProblem.to}</p>
          </div>
        </div>
      </div>

      {/* Unit tracking */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Einingar núna:</h3>
        <UnitCancellationVisualizer
          numeratorUnits={numeratorUnits}
          denominatorUnits={denominatorUnits}
          onCancel={cancelUnits}
        />

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Núverandi gildi:</p>
          <p className="text-2xl font-bold text-gray-800">
            {currentValue.toFixed(4)} {numeratorUnits.filter(u => !denominatorUnits.includes(u)).slice(-1)[0] || '?'}
          </p>

          {isCorrect() && (
            <div className="mt-2 text-green-600 font-semibold flex items-center gap-2">
              <span className="text-2xl">✓</span>
              Rétt! Vel gert!
            </div>
          )}
        </div>
      </div>

      {/* Selected factors */}
      {selectedFactors.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Valdir stuðlar:</h3>
          <div className="space-y-2">
            {selectedFactors.map((factor, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                <span className="flex-1 font-mono text-lg">
                  {factor.to} / {factor.from}
                </span>
                <button
                  onClick={() => flipFactor(index)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                  title="Snúa við stuðli"
                >
                  ⇅
                </button>
                <button
                  onClick={() => removeFactor(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available factors */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Tiltækir umbreytingarstuðlar:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {getAvailableFactors().map((factor, index) => (
            <button
              key={index}
              onClick={() => addFactor(factor)}
              className="bg-gray-100 hover:bg-primary hover:text-white text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors text-left"
            >
              <div className="font-mono text-lg mb-1">
                {factor.to} / {factor.from}
              </div>
              <div className="text-xs opacity-75">
                {factor.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Solution display */}
      {showSolution && (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl shadow-lg p-6 mb-6 animate-slide-in">
          <h3 className="text-lg font-bold text-green-800 mb-4">💡 Lausn:</h3>
          <div className="space-y-2">
            {getSolution().map((factor, index) => (
              <div key={index} className="bg-white rounded-lg p-3">
                <p className="font-mono text-lg">
                  {currentProblem.value} {factor.from} × ({factor.to} / {factor.from}) = {(currentProblem.value * factor.factor).toFixed(4)} {factor.to}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => {
            setSelectedFactors([]);
            setNumeratorUnits([currentProblem.from]);
            setDenominatorUnits([]);
            setCurrentValue(currentProblem.value);
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Hreinsa
        </button>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {showSolution ? 'Fela lausn' : 'Sýna lausn'}
        </button>
        <button
          onClick={generateNewProblem}
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Nýtt dæmi
        </button>
      </div>
    </div>
  );
}
