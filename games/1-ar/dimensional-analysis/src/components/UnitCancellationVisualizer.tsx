import { useState, useEffect } from 'react';
import { UnitBlock } from './UnitBlock';

interface UnitCancellationVisualizerProps {
  numeratorUnits: string[];
  denominatorUnits: string[];
  onCancel?: (unit: string) => void;
  showCancelButton?: boolean;
}

/**
 * Enhanced visual unit cancellation display
 * Shows units in numerator and denominator with cancellation animation
 * Uses the same UnitBlock component as Level 1 for consistency
 */
export function UnitCancellationVisualizer({
  numeratorUnits,
  denominatorUnits,
  onCancel,
  showCancelButton = false
}: UnitCancellationVisualizerProps) {
  const [cancellingUnit, setCancellingUnit] = useState<string | null>(null);
  const [cancelledUnits, setCancelledUnits] = useState<Set<string>>(new Set());

  // Find matching units that can be cancelled
  const matchingUnits = numeratorUnits.filter(u => denominatorUnits.includes(u) && !cancelledUnits.has(u));
  const hasMatchingUnits = matchingUnits.length > 0;

  // Track which units are already cancelled (appear in both)
  useEffect(() => {
    const cancelled = new Set<string>();
    const numCounts: Record<string, number> = {};
    const denCounts: Record<string, number> = {};

    numeratorUnits.forEach(u => { numCounts[u] = (numCounts[u] || 0) + 1; });
    denominatorUnits.forEach(u => { denCounts[u] = (denCounts[u] || 0) + 1; });

    // Mark units that appear in both as "can be cancelled"
    Object.keys(numCounts).forEach(unit => {
      if (denCounts[unit]) {
        const cancelCount = Math.min(numCounts[unit], denCounts[unit]);
        for (let i = 0; i < cancelCount; i++) {
          cancelled.add(`${unit}-${i}`);
        }
      }
    });
  }, [numeratorUnits, denominatorUnits]);

  const handleCancel = (unit: string) => {
    setCancellingUnit(unit);
    setTimeout(() => {
      if (onCancel) onCancel(unit);
      setCancellingUnit(null);
      setCancelledUnits(prev => new Set([...prev, unit]));
    }, 600);
  };

  // Determine which units are matching and should be highlighted
  const getUnitStatus = (unit: string, position: 'numerator' | 'denominator') => {
    if (cancellingUnit === unit) return 'cancelling';
    if (cancelledUnits.has(unit)) return 'cancelled';

    // Check if this unit has a match in the other position
    const otherUnits = position === 'numerator' ? denominatorUnits : numeratorUnits;
    if (otherUnits.includes(unit)) return 'matching';

    return 'normal';
  };

  const getUnitColor = (status: string, position: 'numerator' | 'denominator'): 'blue' | 'green' | 'orange' | 'gray' => {
    if (status === 'cancelling' || status === 'cancelled') return 'gray';
    if (status === 'matching') return 'orange';
    return position === 'numerator' ? 'blue' : 'green';
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-2xl shadow-lg border-2 border-gray-200">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Einingagreining</h3>
        <p className="text-xs text-gray-500">Eins einingar strikast út</p>
      </div>

      {/* Numerator */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">Teljari</span>
        </div>
        <div className="min-h-[60px] border-2 border-dashed border-blue-300 rounded-xl p-3 bg-blue-50 flex flex-wrap items-center justify-center gap-2">
          {numeratorUnits.length === 0 ? (
            <span className="text-gray-400 text-sm italic">Engar einingar</span>
          ) : (
            numeratorUnits.map((unit, idx) => {
              const status = getUnitStatus(unit, 'numerator');
              return (
                <UnitBlock
                  key={`num-${idx}`}
                  value={1}
                  unit={unit}
                  color={getUnitColor(status, 'numerator')}
                  size="medium"
                  showValue={false}
                  isCancelling={status === 'cancelling'}
                  isCancelled={status === 'cancelled'}
                  isSelected={status === 'matching'}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Fraction bar */}
      <div className="relative my-4">
        <div className="h-1 bg-gray-800 rounded-full" />
        {hasMatchingUnits && (
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-lg">×</span>
            </div>
          </div>
        )}
      </div>

      {/* Denominator */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">Nefnari</span>
        </div>
        <div className="min-h-[60px] border-2 border-dashed border-green-300 rounded-xl p-3 bg-green-50 flex flex-wrap items-center justify-center gap-2">
          {denominatorUnits.length === 0 ? (
            <span className="text-gray-400 text-sm italic">Engar einingar</span>
          ) : (
            denominatorUnits.map((unit, idx) => {
              const status = getUnitStatus(unit, 'denominator');
              return (
                <UnitBlock
                  key={`denom-${idx}`}
                  value={1}
                  unit={unit}
                  color={getUnitColor(status, 'denominator')}
                  size="medium"
                  showValue={false}
                  isCancelling={status === 'cancelling'}
                  isCancelled={status === 'cancelled'}
                  isSelected={status === 'matching'}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Matching units indicator */}
      {hasMatchingUnits && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-xl text-center">
          <p className="text-sm text-orange-700">
            <span className="font-bold">{matchingUnits.join(', ')}</span> er í bæði teljara og nefnara og strikast út!
          </p>
        </div>
      )}

      {/* Cancel button */}
      {showCancelButton && hasMatchingUnits && (
        <button
          onClick={() => handleCancel(matchingUnits[0])}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          disabled={cancellingUnit !== null}
        >
          Strika út {matchingUnits[0]}
        </button>
      )}

      {/* Result preview */}
      {!hasMatchingUnits && numeratorUnits.length > 0 && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-center">
          <p className="text-sm text-green-700 font-semibold">
            Lokaeining: {numeratorUnits.filter(u => !denominatorUnits.includes(u)).join(' · ') || '(einingalaust)'}
            {denominatorUnits.filter(u => !numeratorUnits.includes(u)).length > 0 && (
              <> / {denominatorUnits.filter(u => !numeratorUnits.includes(u)).join(' · ')}</>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
