/**
 * ThermodynamicsConnection Component
 * Shows the ΔG° = -RT ln K relationship for cross-game connection
 * Links Equilibrium Shifter to Thermodynamics Predictor
 */

import { Equilibrium } from '../types';

interface ThermodynamicsConnectionProps {
  equilibrium: Equilibrium;
  language: 'is' | 'en';
  expanded?: boolean;
  onToggle?: () => void;
}

export function ThermodynamicsConnection({
  equilibrium,
  language,
  expanded = false,
  onToggle
}: ThermodynamicsConnectionProps) {
  const { thermodynamics } = equilibrium;
  const hasThermodynamicData = thermodynamics.K !== undefined && thermodynamics.deltaG !== undefined;

  if (!hasThermodynamicData) {
    return null;
  }

  const formatK = (K: number): string => {
    if (K >= 1e6 || K <= 1e-6) {
      return K.toExponential(2);
    }
    if (K >= 1000) {
      return K.toExponential(2);
    }
    if (K < 0.001) {
      return K.toExponential(2);
    }
    return K.toPrecision(3);
  };

  const formatDeltaG = (deltaG: number): string => {
    const sign = deltaG >= 0 ? '+' : '';
    return `${sign}${deltaG.toFixed(1)} kJ/mol`;
  };

  const formatDeltaS = (deltaS: number): string => {
    const sign = deltaS >= 0 ? '+' : '';
    return `${sign}${deltaS.toFixed(0)} J/(mol·K)`;
  };

  // Determine spontaneity based on ΔG
  const isSpontaneous = (thermodynamics.deltaG ?? 0) < 0;
  const spontaneityText = language === 'is'
    ? (isSpontaneous ? 'Sjálfkrafa (ΔG° < 0)' : 'Ekki sjálfkrafa (ΔG° > 0)')
    : (isSpontaneous ? 'Spontaneous (ΔG° < 0)' : 'Non-spontaneous (ΔG° > 0)');

  // Determine favorability based on K
  const K = thermodynamics.K ?? 1;
  const favorability = K > 1
    ? (language === 'is' ? 'Afurðir hagnýtar' : 'Products favored')
    : K < 1
    ? (language === 'is' ? 'Hvarfefni hagnýt' : 'Reactants favored')
    : (language === 'is' ? 'Jafnvægi' : 'At equilibrium');

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🔗</span>
          <span className="font-semibold text-gray-800">
            {language === 'is' ? 'Varmafræðileg tenging' : 'Thermodynamic Connection'}
          </span>
        </div>
        <span className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          {/* Key Relationship */}
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-sm text-gray-600 mb-2">
              {language === 'is' ? 'Lykilsamband' : 'Key Relationship'}
            </div>
            <div className="text-2xl font-mono font-bold text-indigo-700">
              ΔG° = -RT ln K
            </div>
            <div className="text-xs text-gray-500 mt-1">
              R = 8.314 J/(mol·K), T = 298 K
            </div>
          </div>

          {/* Values for this equilibrium */}
          <div className="grid grid-cols-3 gap-3">
            {/* K value */}
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-gray-600 mb-1">K (298K)</div>
              <div className={`text-lg font-bold ${K > 1 ? 'text-green-600' : K < 1 ? 'text-red-600' : 'text-gray-600'}`}>
                {formatK(K)}
              </div>
              <div className="text-xs text-gray-500">{favorability}</div>
            </div>

            {/* ΔG° value */}
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-xs text-gray-600 mb-1">ΔG° (298K)</div>
              <div className={`text-lg font-bold ${isSpontaneous ? 'text-green-600' : 'text-red-600'}`}>
                {formatDeltaG(thermodynamics.deltaG!)}
              </div>
              <div className="text-xs text-gray-500">{spontaneityText}</div>
            </div>

            {/* ΔS° value */}
            {thermodynamics.deltaS !== undefined && (
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-xs text-gray-600 mb-1">ΔS°</div>
                <div className={`text-lg font-bold ${thermodynamics.deltaS > 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                  {formatDeltaS(thermodynamics.deltaS)}
                </div>
                <div className="text-xs text-gray-500">
                  {thermodynamics.deltaS > 0
                    ? (language === 'is' ? 'Óreiða eykst' : 'Entropy increases')
                    : (language === 'is' ? 'Óreiða minnkar' : 'Entropy decreases')}
                </div>
              </div>
            )}
          </div>

          {/* ΔH value (already shown but include for completeness) */}
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-600">ΔH° = </span>
                <span className={`font-bold ${thermodynamics.type === 'exothermic' ? 'text-red-600' : 'text-blue-600'}`}>
                  {thermodynamics.deltaH > 0 ? '+' : ''}{thermodynamics.deltaH} kJ/mol
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>{thermodynamics.type === 'exothermic' ? '🔥' : '❄️'}</span>
                <span className="text-sm text-gray-600">
                  {thermodynamics.type === 'exothermic'
                    ? (language === 'is' ? 'Varmalosandi' : 'Exothermic')
                    : (language === 'is' ? 'Varmabindandi' : 'Endothermic')}
                </span>
              </div>
            </div>
          </div>

          {/* Gibbs-Helmholtz relationship */}
          <div className="bg-indigo-100 rounded-lg p-3 text-center">
            <div className="text-sm text-gray-700 mb-1">
              {language === 'is' ? 'Gibbs-Helmholtz jafna' : 'Gibbs-Helmholtz Equation'}
            </div>
            <div className="font-mono text-indigo-800">
              ΔG° = ΔH° - TΔS°
            </div>
            {thermodynamics.deltaS !== undefined && (
              <div className="text-xs text-gray-600 mt-2">
                {formatDeltaG(thermodynamics.deltaG!)} = {thermodynamics.deltaH > 0 ? '+' : ''}{thermodynamics.deltaH} - (298)({thermodynamics.deltaS > 0 ? '+' : ''}{(thermodynamics.deltaS / 1000).toFixed(3)})
              </div>
            )}
          </div>

          {/* Cross-game link */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎮</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 mb-1">
                  {language === 'is'
                    ? 'Kynntu þér meira um varmafræði!'
                    : 'Learn more about thermodynamics!'}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {language === 'is'
                    ? 'Í Varmafræðispámanninum geturðu æft þig í að spá fyrir um sjálfgengi hvörfum með ΔG, ΔH og ΔS gildum.'
                    : 'In Thermodynamics Predictor, you can practice predicting reaction spontaneity using ΔG, ΔH, and ΔS values.'}
                </p>
                <div className="text-xs text-purple-700 font-medium">
                  → {language === 'is' ? 'Varmafræðispámaður' : 'Thermodynamics Predictor'}
                </div>
              </div>
            </div>
          </div>

          {/* Educational note */}
          <div className="text-xs text-gray-500 text-center italic">
            {language === 'is'
              ? 'Gildi miðuð við staðalaðstæður (298 K, 1 atm)'
              : 'Values at standard conditions (298 K, 1 atm)'}
          </div>
        </div>
      )}
    </div>
  );
}
