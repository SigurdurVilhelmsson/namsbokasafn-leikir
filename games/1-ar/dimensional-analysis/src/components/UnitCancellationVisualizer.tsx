import { useState } from 'react';
import { UnitTile } from './UnitTile';

interface UnitCancellationVisualizerProps {
  numeratorUnits: string[];
  denominatorUnits: string[];
  onCancel?: (unit: string) => void;
  showCancelButton?: boolean;
}

export function UnitCancellationVisualizer({
  numeratorUnits,
  denominatorUnits,
  onCancel,
  showCancelButton = false
}: UnitCancellationVisualizerProps) {
  const [cancelling, setCancelling] = useState<string | null>(null);

  const handleCancel = (unit: string) => {
    setCancelling(unit);
    setTimeout(() => {
      if (onCancel) onCancel(unit);
      setCancelling(null);
    }, 600);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Teljari:</h3>
        <div className="min-h-[50px] border-2 border-dashed border-blue-300 rounded-lg p-2 bg-blue-50">
          {numeratorUnits.length === 0 ? (
            <span className="text-gray-400 text-sm">Engar einingar í teljara</span>
          ) : (
            numeratorUnits.map((unit, idx) => (
              <UnitTile
                key={`num-${idx}`}
                unit={unit}
                position="numerator"
                cancelling={cancelling === unit}
              />
            ))
          )}
        </div>
      </div>

      <div className="border-t-4 border-gray-800 my-4"></div>

      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Nefnari:</h3>
        <div className="min-h-[50px] border-2 border-dashed border-green-300 rounded-lg p-2 bg-green-50">
          {denominatorUnits.length === 0 ? (
            <span className="text-gray-400 text-sm">Engar einingar í nefnara</span>
          ) : (
            denominatorUnits.map((unit, idx) => (
              <UnitTile
                key={`denom-${idx}`}
                unit={unit}
                position="denominator"
                cancelling={cancelling === unit}
              />
            ))
          )}
        </div>
      </div>

      {showCancelButton && numeratorUnits.length > 0 && denominatorUnits.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => {
              const common = numeratorUnits.find(u => denominatorUnits.includes(u));
              if (common) handleCancel(common);
            }}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!numeratorUnits.some(u => denominatorUnits.includes(u))}
          >
            Strika út sameiginlegar einingar
          </button>
        </div>
      )}
    </div>
  );
}
