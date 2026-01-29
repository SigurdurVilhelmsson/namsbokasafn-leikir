import { useState, useEffect } from 'react';
import { Molecule } from './Molecule';

interface ReactantData {
  formula: string;
  coeff: number;
  color: string;
}

interface ProductData {
  formula: string;
  coeff: number;
  color: string;
}

interface StoichiometryVisualizationProps {
  reactant1: ReactantData;
  reactant2: ReactantData;
  products: ProductData[];
  r1Count: number;
  r2Count: number;
  showCalculations?: boolean;
  highlightLimiting?: boolean;
  animated?: boolean;
  compact?: boolean;
}

interface ReactionGroup {
  r1Molecules: number[];
  r2Molecules: number[];
  productMolecules: number[];
  isComplete: boolean;
  isExcess: boolean;
}

export function StoichiometryVisualization({
  reactant1,
  reactant2,
  products,
  r1Count,
  r2Count,
  showCalculations = true,
  highlightLimiting = true,
  animated = true,
  compact = false
}: StoichiometryVisualizationProps) {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [showGroups, setShowGroups] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Calculate stoichiometry
  const timesR1 = Math.floor(r1Count / reactant1.coeff);
  const timesR2 = Math.floor(r2Count / reactant2.coeff);
  const timesReactionRuns = Math.min(timesR1, timesR2);
  const limitingIsR1 = timesR1 <= timesR2;
  const excessReactant = limitingIsR1 ? reactant2.formula : reactant1.formula;

  const excessR1 = r1Count - (timesReactionRuns * reactant1.coeff);
  const excessR2 = r2Count - (timesReactionRuns * reactant2.coeff);
  const excessCount = limitingIsR1 ? excessR2 : excessR1;

  // Create reaction groups for visualization
  const groups: ReactionGroup[] = [];

  // Complete reaction groups
  for (let i = 0; i < timesReactionRuns; i++) {
    groups.push({
      r1Molecules: Array.from({ length: reactant1.coeff }, (_, j) => i * reactant1.coeff + j),
      r2Molecules: Array.from({ length: reactant2.coeff }, (_, j) => i * reactant2.coeff + j),
      productMolecules: Array.from({ length: products[0].coeff }, (_, j) => i * products[0].coeff + j),
      isComplete: true,
      isExcess: false
    });
  }

  // Animation effect
  useEffect(() => {
    if (animated && showGroups) {
      const timer = setTimeout(() => {
        if (animationStep < groups.length) {
          setAnimationStep(prev => prev + 1);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [animated, showGroups, animationStep, groups.length]);

  const handleShowGroups = () => {
    setShowGroups(true);
    setAnimationStep(0);
  };

  const moleculeSize = compact ? 24 : 32;
  const smallMoleculeSize = compact ? 18 : 24;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
      {/* Header with equation */}
      <div className="text-center mb-4">
        <div className="inline-block bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
          <span className="font-mono text-lg">
            <span className="text-blue-600 font-bold">{reactant1.coeff}</span>
            <span className="mx-1">{reactant1.formula}</span>
            <span className="mx-2 text-gray-400">+</span>
            <span className="text-red-600 font-bold">{reactant2.coeff}</span>
            <span className="mx-1">{reactant2.formula}</span>
            <span className="mx-2 text-gray-400">→</span>
            <span className="text-green-600 font-bold">{products[0].coeff}</span>
            <span className="mx-1">{products[0].formula}</span>
          </span>
        </div>
      </div>

      {/* Molecule counts display */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Reactant 1 */}
        <div className={`bg-white rounded-xl p-3 border-2 transition-all ${
          highlightLimiting && limitingIsR1
            ? 'border-orange-400 ring-2 ring-orange-200'
            : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-gray-700">{reactant1.formula}</span>
            {highlightLimiting && limitingIsR1 && (
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                Takmarkandi
              </span>
            )}
          </div>

          {/* Molecule grid with grouping */}
          <div className="relative">
            <div className="flex flex-wrap gap-1 justify-center min-h-[60px]">
              {Array.from({ length: r1Count }).map((_, i) => {
                const groupIndex = Math.floor(i / reactant1.coeff);
                const isInActiveGroup = activeGroup !== null && groupIndex === activeGroup;
                const isUsed = groupIndex < timesReactionRuns;
                const isExcess = !isUsed;
                const showAsAnimated = showGroups && groupIndex < animationStep;

                return (
                  <div
                    key={i}
                    className={`transition-all duration-300 ${
                      isInActiveGroup ? 'scale-110 z-10' : ''
                    } ${showAsAnimated ? 'opacity-30' : ''}`}
                    onMouseEnter={() => setActiveGroup(groupIndex)}
                    onMouseLeave={() => setActiveGroup(null)}
                  >
                    <Molecule
                      formula=""
                      color={reactant1.color}
                      size={moleculeSize}
                      className={`${
                        isExcess && highlightLimiting
                          ? 'ring-2 ring-yellow-400 ring-offset-1'
                          : ''
                      } ${
                        isInActiveGroup
                          ? 'ring-2 ring-indigo-500 ring-offset-1'
                          : ''
                      } ${
                        // Add group separator styling
                        i > 0 && i % reactant1.coeff === 0 ? 'ml-2' : ''
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Group brackets */}
            {showGroups && reactant1.coeff > 1 && (
              <div className="flex justify-center gap-2 mt-1">
                {Array.from({ length: Math.ceil(r1Count / reactant1.coeff) }).map((_, groupIdx) => {
                  const isComplete = groupIdx < timesReactionRuns;
                  return (
                    <div
                      key={groupIdx}
                      className={`text-xs px-1 rounded ${
                        isComplete
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                      style={{ width: moleculeSize * reactant1.coeff + 4 * (reactant1.coeff - 1) }}
                    >
                      {isComplete ? `×${reactant1.coeff}` : 'afgangur'}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="text-center mt-2 text-sm text-gray-600">
            <span className="font-bold text-lg">{r1Count}</span> sameindur
          </div>
        </div>

        {/* Reactant 2 */}
        <div className={`bg-white rounded-xl p-3 border-2 transition-all ${
          highlightLimiting && !limitingIsR1
            ? 'border-orange-400 ring-2 ring-orange-200'
            : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-gray-700">{reactant2.formula}</span>
            {highlightLimiting && !limitingIsR1 && (
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                Takmarkandi
              </span>
            )}
          </div>

          {/* Molecule grid with grouping */}
          <div className="relative">
            <div className="flex flex-wrap gap-1 justify-center min-h-[60px]">
              {Array.from({ length: r2Count }).map((_, i) => {
                const groupIndex = Math.floor(i / reactant2.coeff);
                const isInActiveGroup = activeGroup !== null && groupIndex === activeGroup;
                const isUsed = groupIndex < timesReactionRuns;
                const isExcess = !isUsed;
                const showAsAnimated = showGroups && groupIndex < animationStep;

                return (
                  <div
                    key={i}
                    className={`transition-all duration-300 ${
                      isInActiveGroup ? 'scale-110 z-10' : ''
                    } ${showAsAnimated ? 'opacity-30' : ''}`}
                    onMouseEnter={() => setActiveGroup(groupIndex)}
                    onMouseLeave={() => setActiveGroup(null)}
                  >
                    <Molecule
                      formula=""
                      color={reactant2.color}
                      size={moleculeSize}
                      className={`${
                        isExcess && highlightLimiting
                          ? 'ring-2 ring-yellow-400 ring-offset-1'
                          : ''
                      } ${
                        isInActiveGroup
                          ? 'ring-2 ring-indigo-500 ring-offset-1'
                          : ''
                      } ${
                        i > 0 && i % reactant2.coeff === 0 ? 'ml-2' : ''
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Group brackets */}
            {showGroups && reactant2.coeff > 1 && (
              <div className="flex justify-center gap-2 mt-1">
                {Array.from({ length: Math.ceil(r2Count / reactant2.coeff) }).map((_, groupIdx) => {
                  const isComplete = groupIdx < timesReactionRuns;
                  return (
                    <div
                      key={groupIdx}
                      className={`text-xs px-1 rounded ${
                        isComplete
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                      style={{ width: moleculeSize * reactant2.coeff + 4 * (reactant2.coeff - 1) }}
                    >
                      {isComplete ? `×${reactant2.coeff}` : 'afgangur'}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="text-center mt-2 text-sm text-gray-600">
            <span className="font-bold text-lg">{r2Count}</span> sameindur
          </div>
        </div>
      </div>

      {/* Calculations section */}
      {showCalculations && (
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
          <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-xl">🧮</span> Stökefnafræðileg útreikningar
          </h4>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {/* R1 calculation */}
            <div className={`p-3 rounded-lg ${limitingIsR1 ? 'bg-orange-50' : 'bg-gray-50'}`}>
              <div className="font-medium text-gray-700 mb-1">{reactant1.formula}:</div>
              <div className="font-mono text-gray-600">
                {r1Count} ÷ {reactant1.coeff} = <span className="font-bold text-indigo-600">{timesR1}</span> skipti
              </div>
              {limitingIsR1 && (
                <div className="text-xs text-orange-600 mt-1 font-medium">
                  ← Færri skipti = takmarkandi
                </div>
              )}
            </div>

            {/* R2 calculation */}
            <div className={`p-3 rounded-lg ${!limitingIsR1 ? 'bg-orange-50' : 'bg-gray-50'}`}>
              <div className="font-medium text-gray-700 mb-1">{reactant2.formula}:</div>
              <div className="font-mono text-gray-600">
                {r2Count} ÷ {reactant2.coeff} = <span className="font-bold text-indigo-600">{timesR2}</span> skipti
              </div>
              {!limitingIsR1 && (
                <div className="text-xs text-orange-600 mt-1 font-medium">
                  ← Færri skipti = takmarkandi
                </div>
              )}
            </div>
          </div>

          {/* Result summary */}
          <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xs text-gray-500 mb-1">Hvörf gerast</div>
                <div className="text-xl font-bold text-green-600">{timesReactionRuns}×</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Afurðir</div>
                <div className="text-xl font-bold text-blue-600">
                  {timesReactionRuns * products[0].coeff} {products[0].formula}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Afgangur</div>
                <div className="text-xl font-bold text-yellow-600">
                  {excessCount} {excessReactant}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual grouping toggle */}
      {!compact && (
        <div className="flex gap-2">
          <button
            onClick={handleShowGroups}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              showGroups
                ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
          >
            {showGroups ? '✓ Sýni hópun' : '👁️ Sýna hópun eftir stuðlum'}
          </button>
          {showGroups && (
            <button
              onClick={() => {
                setShowGroups(false);
                setAnimationStep(0);
              }}
              className="py-2 px-4 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
            >
              🔄
            </button>
          )}
        </div>
      )}

      {/* Grouped reaction visualization */}
      {showGroups && !compact && (
        <div className="mt-4 p-4 bg-white rounded-xl border border-indigo-200">
          <h4 className="font-bold text-gray-700 mb-3 text-center">
            Hvörfin skref fyrir skref
          </h4>

          <div className="space-y-3">
            {groups.map((group, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                  idx < animationStep
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-50 border border-gray-200 opacity-50'
                }`}
              >
                {/* Reaction number */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  idx < animationStep ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {idx + 1}
                </div>

                {/* Reactant 1 molecules */}
                <div className="flex gap-0.5">
                  {group.r1Molecules.map((_, mIdx) => (
                    <Molecule
                      key={mIdx}
                      formula=""
                      color={reactant1.color}
                      size={smallMoleculeSize}
                    />
                  ))}
                </div>

                <span className="text-gray-400 font-bold">+</span>

                {/* Reactant 2 molecules */}
                <div className="flex gap-0.5">
                  {group.r2Molecules.map((_, mIdx) => (
                    <Molecule
                      key={mIdx}
                      formula=""
                      color={reactant2.color}
                      size={smallMoleculeSize}
                    />
                  ))}
                </div>

                <span className="text-gray-400 font-bold">→</span>

                {/* Product molecules */}
                <div className="flex gap-0.5">
                  {group.productMolecules.map((_, mIdx) => (
                    <Molecule
                      key={mIdx}
                      formula=""
                      color={products[0].color}
                      size={smallMoleculeSize}
                      className="ring-2 ring-green-400 ring-offset-1"
                    />
                  ))}
                </div>

                {/* Checkmark */}
                {idx < animationStep && (
                  <span className="text-green-500 text-xl ml-2">✓</span>
                )}
              </div>
            ))}

            {/* Excess display */}
            {(excessR1 > 0 || excessR2 > 0) && animationStep >= groups.length && (
              <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200 animate-fade-in">
                <span className="text-yellow-600 font-medium">Afgangur:</span>
                <div className="flex gap-1">
                  {Array.from({ length: excessCount }).map((_, i) => (
                    <Molecule
                      key={i}
                      formula=""
                      color={limitingIsR1 ? reactant2.color : reactant1.color}
                      size={smallMoleculeSize}
                      className="ring-2 ring-yellow-400 ring-offset-1"
                    />
                  ))}
                </div>
                <span className="text-yellow-700 font-bold">
                  {excessCount} {excessReactant}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      {highlightLimiting && !compact && (
        <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-orange-200 border-2 border-orange-400"></div>
            <span>Takmarkandi hvarfefni</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-gray-200 ring-2 ring-yellow-400"></div>
            <span>Afgangur (excess)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-green-200 ring-2 ring-green-400"></div>
            <span>Afurðir</span>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default StoichiometryVisualization;
