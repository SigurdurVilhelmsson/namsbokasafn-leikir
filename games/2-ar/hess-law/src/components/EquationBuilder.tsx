import { useState, useCallback, useMemo } from 'react';
import { DragDropBuilder } from '@shared/components';
import type { DraggableItemData, DropZoneData, DropResult, ZoneState } from '@shared/components';

interface Equation {
  id: string;
  reactants: string;
  products: string;
  deltaH: number;
  isReversed: boolean;
  multiplier: number;
}

interface EquationBuilderProps {
  equations: Equation[];
  targetDeltaH: number;
  targetEquation: {
    reactants: string;
    products: string;
  };
  onEquationChange: (id: string, changes: Partial<Equation>) => void;
  onSelectionChange: (selectedIds: string[]) => void;
  selectedIds: string[];
}

// Equation card component for drag items
function EquationCard({
  equation,
  onReverse,
  onMultiply,
  compact = false,
}: {
  equation: Equation;
  onReverse?: () => void;
  onMultiply?: (n: number) => void;
  compact?: boolean;
}) {
  const effectiveDeltaH = equation.deltaH * equation.multiplier * (equation.isReversed ? -1 : 1);
  const displayMultiplier = equation.multiplier !== 1 ? `${equation.multiplier}×` : '';

  return (
    <div className={`${compact ? 'p-2' : 'p-3'} rounded-lg border-2 bg-white ${
      equation.isReversed ? 'border-red-300 bg-red-50' :
      equation.multiplier !== 1 ? 'border-blue-300 bg-blue-50' :
      'border-gray-300'
    }`}>
      {/* Equation display */}
      <div className={`text-center font-mono ${compact ? 'text-xs' : 'text-sm'}`}>
        {displayMultiplier && <span className="text-orange-600 font-bold">{displayMultiplier}</span>}
        <span className="text-blue-700">{equation.isReversed ? equation.products : equation.reactants}</span>
        <span className="mx-1">→</span>
        <span className="text-green-700">{equation.isReversed ? equation.reactants : equation.products}</span>
      </div>

      {/* ΔH */}
      <div className={`text-center ${compact ? 'text-xs' : 'text-sm'} mt-1`}>
        <span className={`font-bold ${effectiveDeltaH < 0 ? 'text-red-600' : 'text-blue-600'}`}>
          ΔH = {effectiveDeltaH > 0 ? '+' : ''}{effectiveDeltaH.toFixed(1)} kJ
        </span>
      </div>

      {/* Controls (only if callbacks provided) */}
      {(onReverse || onMultiply) && (
        <div className={`flex justify-center gap-2 ${compact ? 'mt-1' : 'mt-2'}`}>
          {onReverse && (
            <button
              onClick={(e) => { e.stopPropagation(); onReverse(); }}
              className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                equation.isReversed
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 hover:bg-red-100'
              }`}
            >
              🔄
            </button>
          )}

          {onMultiply && (
            <div className="flex gap-0.5">
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  onClick={(e) => { e.stopPropagation(); onMultiply(n); }}
                  className={`w-6 h-6 rounded text-xs font-bold transition-colors ${
                    equation.multiplier === n
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-blue-100'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function EquationBuilder({
  equations,
  targetDeltaH,
  targetEquation,
  onEquationChange,
  onSelectionChange,
  selectedIds,
}: EquationBuilderProps) {
  const [zoneState, setZoneState] = useState<ZoneState>({
    'combination-zone': [],
  });

  // Convert equations to draggable items
  const draggableItems: DraggableItemData[] = useMemo(() => {
    return equations.map((eq) => ({
      id: eq.id,
      content: (
        <EquationCard
          equation={eq}
          onReverse={() => onEquationChange(eq.id, { isReversed: !eq.isReversed })}
          onMultiply={(n) => onEquationChange(eq.id, { multiplier: n })}
          compact={true}
        />
      ),
      data: { equation: eq },
    }));
  }, [equations, onEquationChange]);

  // Drop zones
  const dropZones: DropZoneData[] = useMemo(() => [
    {
      id: 'combination-zone',
      label: 'Dragðu jöfnur hingað til að sameina',
      maxItems: 5,
      placeholder: '← Dragðu jöfnur til að byggja Hess-samsetningu',
    },
  ], []);

  // Handle drop
  const handleDrop = useCallback((result: DropResult) => {
    const { itemId, zoneId, index } = result;

    setZoneState(prev => {
      const newState = { ...prev };
      // Remove from all zones
      for (const key of Object.keys(newState)) {
        newState[key] = newState[key].filter(id => id !== itemId);
      }
      // Add to target zone
      if (!newState[zoneId]) {
        newState[zoneId] = [];
      }
      newState[zoneId].splice(index, 0, itemId);

      // Update parent with selected IDs
      onSelectionChange(newState['combination-zone'] || []);

      return newState;
    });
  }, [onSelectionChange]);

  // Handle reorder
  const handleReorder = useCallback((zoneId: string, newOrder: string[]) => {
    setZoneState(prev => ({
      ...prev,
      [zoneId]: newOrder,
    }));
    if (zoneId === 'combination-zone') {
      onSelectionChange(newOrder);
    }
  }, [onSelectionChange]);

  // Calculate current sum
  const currentSum = useMemo(() => {
    return equations
      .filter(eq => selectedIds.includes(eq.id))
      .reduce((sum, eq) => {
        return sum + (eq.deltaH * eq.multiplier * (eq.isReversed ? -1 : 1));
      }, 0);
  }, [equations, selectedIds]);

  const isCorrect = Math.abs(currentSum - targetDeltaH) < 0.5;

  // Get selected equations in order
  const selectedEquations = useMemo(() => {
    const zoneOrder = zoneState['combination-zone'] || [];
    return zoneOrder.map(id => equations.find(eq => eq.id === id)).filter(Boolean) as Equation[];
  }, [equations, zoneState]);

  return (
    <div className="space-y-4">
      {/* Target equation reminder */}
      <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
        <div className="text-sm font-medium text-orange-700 mb-1">🎯 Markmið:</div>
        <div className="text-center font-mono">
          <span className="text-blue-700">{targetEquation.reactants}</span>
          <span className="mx-2">→</span>
          <span className="text-green-700">{targetEquation.products}</span>
          <span className="ml-3 font-bold text-orange-600">ΔH = ?</span>
        </div>
      </div>

      {/* Drag and drop builder */}
      <DragDropBuilder
        items={draggableItems}
        zones={dropZones}
        initialState={zoneState}
        onDrop={handleDrop}
        onReorder={handleReorder}
        orientation="vertical"
        itemsPoolClassName="min-h-[100px]"
        zonesClassName="min-h-[150px]"
      />

      {/* Equation combination visualization */}
      {selectedEquations.length > 0 && (
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200">
          <h4 className="font-semibold text-teal-700 mb-3 text-sm">
            📊 Samsetning jafna:
          </h4>

          {/* Step-by-step combination */}
          <div className="space-y-2">
            {selectedEquations.map((eq, idx) => {
              const effectiveDeltaH = eq.deltaH * eq.multiplier * (eq.isReversed ? -1 : 1);
              const displayMultiplier = eq.multiplier !== 1 ? `${eq.multiplier}×` : '';

              return (
                <div key={eq.id} className="flex items-center gap-2">
                  {idx > 0 && (
                    <span className="text-teal-500 font-bold text-lg w-6 text-center">+</span>
                  )}
                  {idx === 0 && <span className="w-6" />}

                  <div className="flex-1 bg-white rounded-lg p-2 border border-teal-200">
                    <div className="flex justify-between items-center">
                      <div className="font-mono text-sm">
                        {displayMultiplier && <span className="text-orange-600 font-bold">{displayMultiplier}</span>}
                        (
                        <span className="text-blue-600">{eq.isReversed ? eq.products : eq.reactants}</span>
                        <span className="mx-1">→</span>
                        <span className="text-green-600">{eq.isReversed ? eq.reactants : eq.products}</span>
                        )
                      </div>
                      <div className={`font-bold text-sm ${effectiveDeltaH < 0 ? 'text-red-600' : 'text-blue-600'}`}>
                        {effectiveDeltaH > 0 ? '+' : ''}{effectiveDeltaH.toFixed(1)} kJ
                      </div>
                    </div>
                  </div>

                  {/* Modification buttons */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => onEquationChange(eq.id, { isReversed: !eq.isReversed })}
                      className={`p-1 rounded text-xs ${
                        eq.isReversed ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-red-100'
                      }`}
                      title="Snúa við"
                    >
                      🔄
                    </button>
                    <select
                      value={eq.multiplier}
                      onChange={(e) => onEquationChange(eq.id, { multiplier: parseInt(e.target.value) })}
                      className="text-xs rounded border border-gray-300 px-1"
                    >
                      <option value={1}>×1</option>
                      <option value={2}>×2</option>
                      <option value={3}>×3</option>
                    </select>
                  </div>
                </div>
              );
            })}

            {/* Sum line */}
            <div className="border-t-2 border-teal-300 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-teal-700">Σ ΔH =</span>
                <span className={`text-xl font-bold ${
                  isCorrect ? 'text-green-600' : currentSum < 0 ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {currentSum > 0 ? '+' : ''}{currentSum.toFixed(1)} kJ
                  {isCorrect && <span className="ml-2">✓</span>}
                </span>
              </div>
              {selectedEquations.length > 0 && (
                <div className="text-xs text-gray-500 mt-1">
                  Markmið: {targetDeltaH > 0 ? '+' : ''}{targetDeltaH.toFixed(1)} kJ
                  {!isCorrect && (
                    <span className="text-orange-600 ml-2">
                      (mismunur: {Math.abs(currentSum - targetDeltaH).toFixed(1)} kJ)
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Visual hints about what cancels */}
      {selectedEquations.length >= 2 && (
        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
          <h4 className="font-semibold text-purple-700 mb-2 text-sm">
            🔍 Efni sem styttast út:
          </h4>
          <CancellationAnalysis equations={selectedEquations} />
        </div>
      )}
    </div>
  );
}

// Analyze what species cancel between equations
function CancellationAnalysis({ equations }: { equations: Equation[] }) {
  // Simple analysis - find species that appear on both sides
  const allReactants: string[] = [];
  const allProducts: string[] = [];

  equations.forEach(eq => {
    const reactants = (eq.isReversed ? eq.products : eq.reactants).split('+').map(s => s.trim());
    const products = (eq.isReversed ? eq.reactants : eq.products).split('+').map(s => s.trim());

    // Account for multipliers (simplified - just look at species names)
    reactants.forEach(r => {
      const times = eq.multiplier;
      for (let i = 0; i < times; i++) allReactants.push(r);
    });
    products.forEach(p => {
      const times = eq.multiplier;
      for (let i = 0; i < times; i++) allProducts.push(p);
    });
  });

  // Find cancellations
  const cancelled: string[] = [];
  const reactantsCopy = [...allReactants];
  const productsCopy = [...allProducts];

  reactantsCopy.forEach(r => {
    const idx = productsCopy.indexOf(r);
    if (idx !== -1) {
      cancelled.push(r);
      productsCopy.splice(idx, 1);
    }
  });

  // Get unique cancelled
  const uniqueCancelled = [...new Set(cancelled)];

  return (
    <div className="text-sm space-y-1">
      {uniqueCancelled.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {uniqueCancelled.map((species, i) => (
            <span key={i} className="bg-purple-200 text-purple-800 px-2 py-0.5 rounded line-through">
              {species}
            </span>
          ))}
          <span className="text-purple-600">← styttist út</span>
        </div>
      ) : (
        <div className="text-purple-600 italic">Ekkert styttist út enn...</div>
      )}
    </div>
  );
}

export default EquationBuilder;
