import { useState, useCallback, useMemo } from 'react';

interface Unit {
  id: string;
  symbol: string;
  name: string;
  category: 'mass' | 'length' | 'volume' | 'time';
  baseValue: number; // Value relative to base unit
}

interface ConversionStep {
  numerator: { value: number; unit: string };
  denominator: { value: number; unit: string };
}

interface UnitConversionBuilderProps {
  startValue: number;
  startUnit: string;
  targetUnit: string;
  availableUnits: Unit[];
  onComplete: (path: ConversionStep[], finalValue: number) => void;
  onStepAdded?: (step: ConversionStep) => void;
  showHints?: boolean;
  disabled?: boolean;
}

// Common conversion relationships
const CONVERSIONS: Record<string, Record<string, number>> = {
  // Mass
  kg: { g: 1000, mg: 1000000 },
  g: { kg: 0.001, mg: 1000 },
  mg: { g: 0.001, kg: 0.000001 },
  // Length
  km: { m: 1000, cm: 100000, mm: 1000000 },
  m: { km: 0.001, cm: 100, mm: 1000 },
  cm: { m: 0.01, mm: 10, km: 0.00001 },
  mm: { m: 0.001, cm: 0.1, km: 0.000001 },
  // Volume
  L: { mL: 1000 },
  mL: { L: 0.001 },
  // Time
  klst: { mín: 60, s: 3600 },
  mín: { klst: 1/60, s: 60 },
  s: { mín: 1/60, klst: 1/3600 },
};

// Get conversion factor between two units
function getConversionFactor(from: string, to: string): { num: number; den: number } | null {
  if (CONVERSIONS[from]?.[to]) {
    const factor = CONVERSIONS[from][to];
    if (factor >= 1) {
      return { num: factor, den: 1 };
    } else {
      return { num: 1, den: 1 / factor };
    }
  }
  if (CONVERSIONS[to]?.[from]) {
    const factor = CONVERSIONS[to][from];
    if (factor >= 1) {
      return { num: 1, den: factor };
    } else {
      return { num: 1 / factor, den: 1 };
    }
  }
  return null;
}

export function UnitConversionBuilder({
  startValue,
  startUnit,
  targetUnit,
  availableUnits,
  onComplete,
  onStepAdded,
  showHints = true,
  disabled = false,
}: UnitConversionBuilderProps) {
  const [steps, setSteps] = useState<ConversionStep[]>([]);
  const [draggedUnit, setDraggedUnit] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<'numerator' | 'denominator' | null>(null);
  const [pendingStep, setPendingStep] = useState<Partial<ConversionStep>>({});
  const [showPreview, setShowPreview] = useState(false);

  // Calculate current unit and value after all steps
  const { currentUnit, currentValue, cancelledUnits } = useMemo(() => {
    let unit = startUnit;
    let value = startValue;
    const cancelled: string[] = [];

    for (const step of steps) {
      // Check if denominator unit matches current unit (cancellation)
      if (step.denominator.unit === unit) {
        cancelled.push(unit);
        unit = step.numerator.unit;
        value = value * step.numerator.value / step.denominator.value;
      }
    }

    return { currentUnit: unit, currentValue: value, cancelledUnits: cancelled };
  }, [steps, startUnit, startValue]);

  // Check if target is reached
  const isComplete = currentUnit === targetUnit;

  // Get hint for next unit
  const nextUnitHint = useMemo(() => {
    if (!showHints || isComplete) return null;

    // Find direct conversion
    const direct = getConversionFactor(currentUnit, targetUnit);
    if (direct) return targetUnit;

    // Find intermediate unit
    const currentConversions = CONVERSIONS[currentUnit];
    if (currentConversions) {
      for (const intermediateUnit of Object.keys(currentConversions)) {
        if (CONVERSIONS[intermediateUnit]?.[targetUnit]) {
          return intermediateUnit;
        }
      }
    }

    return null;
  }, [currentUnit, targetUnit, showHints, isComplete]);

  // Handle drag start
  const handleDragStart = useCallback((unit: string) => {
    if (disabled) return;
    setDraggedUnit(unit);
  }, [disabled]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDraggedUnit(null);
    setDropTarget(null);
  }, []);

  // Handle drop on numerator or denominator
  const handleDrop = useCallback((target: 'numerator' | 'denominator') => {
    if (!draggedUnit || disabled) return;

    const factor = getConversionFactor(
      target === 'denominator' ? draggedUnit : (pendingStep.denominator?.unit || currentUnit),
      target === 'numerator' ? draggedUnit : (pendingStep.numerator?.unit || '')
    );

    if (target === 'numerator') {
      const numValue = factor?.num || 1;
      setPendingStep(prev => ({
        ...prev,
        numerator: { value: numValue, unit: draggedUnit }
      }));
    } else {
      const denValue = factor?.den || 1;
      setPendingStep(prev => ({
        ...prev,
        denominator: { value: denValue, unit: draggedUnit }
      }));
    }

    setDraggedUnit(null);
    setDropTarget(null);
  }, [draggedUnit, disabled, pendingStep, currentUnit]);

  // Add step to conversion chain
  const addStep = useCallback(() => {
    if (!pendingStep.numerator || !pendingStep.denominator) return;

    const step: ConversionStep = {
      numerator: pendingStep.numerator,
      denominator: pendingStep.denominator,
    };

    setSteps(prev => [...prev, step]);
    setPendingStep({});
    onStepAdded?.(step);
  }, [pendingStep, onStepAdded]);

  // Auto-fill conversion values when both units are selected
  const autoFillValues = useCallback(() => {
    if (!pendingStep.numerator?.unit || !pendingStep.denominator?.unit) return;

    const factor = getConversionFactor(pendingStep.denominator.unit, pendingStep.numerator.unit);
    if (factor) {
      setPendingStep({
        numerator: { value: factor.num, unit: pendingStep.numerator.unit },
        denominator: { value: factor.den, unit: pendingStep.denominator.unit },
      });
    }
  }, [pendingStep]);

  // Complete the conversion
  const handleComplete = useCallback(() => {
    if (isComplete) {
      onComplete(steps, currentValue);
    }
  }, [isComplete, steps, currentValue, onComplete]);

  // Remove last step
  const removeLastStep = useCallback(() => {
    setSteps(prev => prev.slice(0, -1));
  }, []);

  // Clear pending step
  const clearPendingStep = useCallback(() => {
    setPendingStep({});
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
      {/* Header - Current State */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 border-2 border-orange-300 rounded-lg px-4 py-2">
            <div className="text-xs text-orange-600 font-medium">Núverandi</div>
            <div className="text-xl font-bold text-orange-700">
              {currentValue.toFixed(currentValue % 1 === 0 ? 0 : 2)} {currentUnit}
            </div>
          </div>
          <div className="text-2xl text-gray-400">→</div>
          <div className={`border-2 rounded-lg px-4 py-2 ${
            isComplete
              ? 'bg-green-100 border-green-300'
              : 'bg-gray-100 border-gray-300'
          }`}>
            <div className={`text-xs font-medium ${isComplete ? 'text-green-600' : 'text-gray-500'}`}>
              Markmið
            </div>
            <div className={`text-xl font-bold ${isComplete ? 'text-green-700' : 'text-gray-600'}`}>
              ? {targetUnit}
            </div>
          </div>
        </div>

        {isComplete && (
          <button
            onClick={handleComplete}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Staðfesta ✓
          </button>
        )}
      </div>

      {/* Conversion Chain Display */}
      {steps.length > 0 && (
        <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Umbreytingakeðja:</span>
            <button
              onClick={removeLastStep}
              className="text-xs text-red-500 hover:text-red-700"
              disabled={disabled}
            >
              Afturkalla síðasta skref ↩
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-orange-50 rounded px-2 py-1 font-mono text-sm">
              {startValue} {startUnit}
            </div>
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span className="text-gray-400">×</span>
                <div className="bg-blue-50 rounded border border-blue-200 px-2 py-1">
                  <div className="text-xs font-bold text-blue-600 text-center border-b border-blue-200">
                    {step.numerator.value} {step.numerator.unit}
                  </div>
                  <div className="text-xs font-bold text-green-600 text-center">
                    {step.denominator.value} {step.denominator.unit}
                  </div>
                </div>
                {/* Show cancelled unit */}
                {cancelledUnits[idx] && (
                  <span className="text-xs text-gray-400 line-through ml-1">
                    {cancelledUnits[idx]}
                  </span>
                )}
              </div>
            ))}
            <span className="text-gray-400">=</span>
            <div className={`rounded px-2 py-1 font-mono text-sm ${
              isComplete ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'
            }`}>
              {currentValue.toFixed(currentValue % 1 === 0 ? 0 : 2)} {currentUnit}
            </div>
          </div>
        </div>
      )}

      {/* Unit Palette */}
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-600 mb-2">
          Dragðu einingar til að byggja umbreytingarstuðul:
        </div>
        <div className="flex flex-wrap gap-2 p-3 bg-gray-100 rounded-lg">
          {availableUnits.map((unit) => (
            <div
              key={unit.id}
              draggable={!disabled}
              onDragStart={() => handleDragStart(unit.symbol)}
              onDragEnd={handleDragEnd}
              className={`
                px-4 py-2 rounded-lg font-bold cursor-grab active:cursor-grabbing
                transition-all select-none
                ${draggedUnit === unit.symbol
                  ? 'opacity-50 scale-95'
                  : 'hover:scale-105 hover:shadow-md'
                }
                ${unit.category === 'mass' ? 'bg-purple-100 text-purple-700 border-2 border-purple-200' :
                  unit.category === 'length' ? 'bg-blue-100 text-blue-700 border-2 border-blue-200' :
                  unit.category === 'volume' ? 'bg-teal-100 text-teal-700 border-2 border-teal-200' :
                  'bg-amber-100 text-amber-700 border-2 border-amber-200'
                }
              `}
            >
              {unit.symbol}
              <span className="text-xs ml-1 opacity-70">({unit.name})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Factor Builder */}
      <div className="bg-white rounded-xl p-4 border-2 border-dashed border-gray-300 mb-4">
        <div className="text-center text-sm font-medium text-gray-500 mb-3">
          Byggðu umbreytingarstuðul
        </div>

        <div className="flex items-center justify-center gap-4">
          {/* Numerator drop zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDropTarget('numerator');
            }}
            onDragLeave={() => setDropTarget(null)}
            onDrop={() => handleDrop('numerator')}
            className={`
              min-w-[120px] min-h-[50px] rounded-lg border-2 border-dashed
              flex items-center justify-center transition-all
              ${dropTarget === 'numerator'
                ? 'border-blue-500 bg-blue-50 scale-105'
                : pendingStep.numerator
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 bg-gray-50'
              }
            `}
          >
            {pendingStep.numerator ? (
              <div className="flex items-center gap-2 px-3 py-2">
                <input
                  type="number"
                  value={pendingStep.numerator.value}
                  onChange={(e) => setPendingStep(prev => ({
                    ...prev,
                    numerator: { ...prev.numerator!, value: parseFloat(e.target.value) || 1 }
                  }))}
                  className="w-16 text-center font-bold text-blue-600 border rounded"
                  disabled={disabled}
                />
                <span className="font-bold text-blue-600">{pendingStep.numerator.unit}</span>
              </div>
            ) : (
              <span className="text-gray-400 text-sm">Teljari ↑</span>
            )}
          </div>
        </div>

        {/* Fraction line */}
        <div className="flex justify-center my-2">
          <div className="w-32 h-0.5 bg-gray-800"></div>
        </div>

        <div className="flex items-center justify-center gap-4">
          {/* Denominator drop zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDropTarget('denominator');
            }}
            onDragLeave={() => setDropTarget(null)}
            onDrop={() => handleDrop('denominator')}
            className={`
              min-w-[120px] min-h-[50px] rounded-lg border-2 border-dashed
              flex items-center justify-center transition-all
              ${dropTarget === 'denominator'
                ? 'border-green-500 bg-green-50 scale-105'
                : pendingStep.denominator
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-300 bg-gray-50'
              }
            `}
          >
            {pendingStep.denominator ? (
              <div className="flex items-center gap-2 px-3 py-2">
                <input
                  type="number"
                  value={pendingStep.denominator.value}
                  onChange={(e) => setPendingStep(prev => ({
                    ...prev,
                    denominator: { ...prev.denominator!, value: parseFloat(e.target.value) || 1 }
                  }))}
                  className="w-16 text-center font-bold text-green-600 border rounded"
                  disabled={disabled}
                />
                <span className="font-bold text-green-600">{pendingStep.denominator.unit}</span>
              </div>
            ) : (
              <span className="text-gray-400 text-sm">Nefnari ↓</span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-3 mt-4">
          {(pendingStep.numerator || pendingStep.denominator) && (
            <button
              onClick={clearPendingStep}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1"
              disabled={disabled}
            >
              Hreinsa
            </button>
          )}
          {pendingStep.numerator && pendingStep.denominator && (
            <>
              <button
                onClick={autoFillValues}
                className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
                disabled={disabled}
              >
                Sjálfvirkt fylla
              </button>
              <button
                onClick={addStep}
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded font-medium"
                disabled={disabled}
              >
                Bæta við keðju →
              </button>
            </>
          )}
        </div>
      </div>

      {/* Hint section */}
      {showHints && nextUnitHint && !isComplete && (
        <div
          className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg cursor-pointer transition-all"
          onClick={() => setShowPreview(!showPreview)}
        >
          <div className="flex items-center gap-2">
            <span className="text-yellow-600">💡</span>
            <span className="text-sm text-yellow-700">
              {showPreview
                ? `Næsta eining gæti verið: ${nextUnitHint}`
                : 'Smelltu til að sjá vísbendingu'
              }
            </span>
          </div>
        </div>
      )}

      {/* Unit cancellation explanation */}
      {pendingStep.denominator && (
        <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
          <div className="text-sm text-indigo-700">
            <span className="font-medium">Strikun: </span>
            {pendingStep.denominator.unit === currentUnit ? (
              <span className="text-green-600">
                ✓ <span className="line-through">{currentUnit}</span> styttist út og{' '}
                {pendingStep.numerator?.unit || '?'} verður eftir
              </span>
            ) : (
              <span className="text-red-500">
                ⚠ {pendingStep.denominator.unit} passar ekki við {currentUnit} - ekkert styttist út
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UnitConversionBuilder;
