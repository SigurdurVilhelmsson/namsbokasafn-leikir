import { useState, useMemo } from 'react';

export type IndicatorType = 'phenolphthalein' | 'bromothymol' | 'universal' | 'methyl-orange';

interface IndicatorInfo {
  name: string;
  nameIs: string;
  description: string;
  colorStops: { pH: number; color: string }[];
}

// Indicator color data
const INDICATORS: Record<IndicatorType, IndicatorInfo> = {
  phenolphthalein: {
    name: 'Phenolphthalein',
    nameIs: 'Fenólftaleín',
    description: 'Litlaus í sýru, bleikur/fjólublár í basa',
    colorStops: [
      { pH: 0, color: '#ffffff00' },  // Clear
      { pH: 8.2, color: '#ffffff00' }, // Clear until pH 8.2
      { pH: 8.4, color: '#ffb6c1' },   // Light pink transition
      { pH: 10, color: '#ff69b4' },    // Hot pink
      { pH: 14, color: '#da70d6' },    // Orchid/purple
    ]
  },
  bromothymol: {
    name: 'Bromothymol Blue',
    nameIs: 'Brómþýmólblátt',
    description: 'Gulur í sýru, grænn í hlutlausu, blár í basa',
    colorStops: [
      { pH: 0, color: '#ffd700' },   // Yellow (acidic)
      { pH: 6, color: '#ffd700' },   // Yellow
      { pH: 7, color: '#228b22' },   // Green (neutral)
      { pH: 7.6, color: '#1e90ff' }, // Blue transition
      { pH: 14, color: '#0000cd' },  // Deep blue (basic)
    ]
  },
  universal: {
    name: 'Universal Indicator',
    nameIs: 'Algildur litgjafi',
    description: 'Rauður → appelsínugulur → gulur → grænn → blár → fjólublár',
    colorStops: [
      { pH: 0, color: '#ff0000' },   // Red (strong acid)
      { pH: 2, color: '#ff4500' },   // Red-orange
      { pH: 4, color: '#ffa500' },   // Orange
      { pH: 6, color: '#ffff00' },   // Yellow
      { pH: 7, color: '#7cfc00' },   // Green (neutral)
      { pH: 8, color: '#32cd32' },   // Lime green
      { pH: 10, color: '#1e90ff' },  // Blue
      { pH: 12, color: '#8a2be2' },  // Purple
      { pH: 14, color: '#4b0082' },  // Indigo (strong base)
    ]
  },
  'methyl-orange': {
    name: 'Methyl Orange',
    nameIs: 'Metýlappelsínugult',
    description: 'Rauður í sýru, appelsínugulur í basa',
    colorStops: [
      { pH: 0, color: '#ff0000' },   // Red
      { pH: 3.1, color: '#ff4500' }, // Red-orange transition
      { pH: 4.4, color: '#ffa500' }, // Orange
      { pH: 14, color: '#ffcc00' },  // Yellow-orange
    ]
  }
};

interface IndicatorSystemProps {
  /** Current pH value (0-14) */
  pH: number;
  /** Selected indicator type */
  indicator: IndicatorType;
  /** Callback when indicator changes */
  onIndicatorChange?: (indicator: IndicatorType) => void;
  /** Show pH scale */
  showScale?: boolean;
  /** Show color explanation tooltip */
  showTooltip?: boolean;
  /** Size of the indicator display */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Interpolate between two colors based on a factor (0-1)
 */
function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  if (!c1 || !c2) return color1;

  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);
  const a1 = c1.a !== undefined ? c1.a : 1;
  const a2 = c2.a !== undefined ? c2.a : 1;
  const a = a1 + (a2 - a1) * factor;

  if (a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number; a?: number } | null {
  // Handle rgba format
  if (hex.startsWith('rgba')) {
    const match = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
        a: match[4] ? parseFloat(match[4]) : 1
      };
    }
  }

  // Handle hex with alpha
  if (hex.length === 9) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = parseInt(hex.slice(7, 9), 16) / 255;
    return { r, g, b, a };
  }

  // Standard hex
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

/**
 * Get the indicator color for a given pH
 */
export function getIndicatorColor(indicator: IndicatorType, pH: number): string {
  const stops = INDICATORS[indicator].colorStops;

  // Clamp pH to valid range
  const clampedPH = Math.max(0, Math.min(14, pH));

  // Find the two color stops to interpolate between
  let lower = stops[0];
  let upper = stops[stops.length - 1];

  for (let i = 0; i < stops.length - 1; i++) {
    if (clampedPH >= stops[i].pH && clampedPH <= stops[i + 1].pH) {
      lower = stops[i];
      upper = stops[i + 1];
      break;
    }
  }

  // Calculate interpolation factor
  const range = upper.pH - lower.pH;
  const factor = range === 0 ? 0 : (clampedPH - lower.pH) / range;

  return interpolateColor(lower.color, upper.color, factor);
}

export function IndicatorSystem({
  pH,
  indicator,
  onIndicatorChange,
  showScale = true,
  showTooltip = true,
  size = 'medium'
}: IndicatorSystemProps) {
  const [showInfo, setShowInfo] = useState(false);

  const indicatorInfo = INDICATORS[indicator];
  const currentColor = useMemo(() => getIndicatorColor(indicator, pH), [indicator, pH]);

  const sizeClasses = {
    small: { beaker: 'w-16 h-20', text: 'text-xs' },
    medium: { beaker: 'w-24 h-32', text: 'text-sm' },
    large: { beaker: 'w-32 h-40', text: 'text-base' }
  };

  const sizes = sizeClasses[size];

  return (
    <div className="space-y-3">
      {/* Indicator selector */}
      {onIndicatorChange && (
        <div className="flex flex-wrap gap-2 justify-center">
          {(Object.keys(INDICATORS) as IndicatorType[]).map((ind) => (
            <button
              key={ind}
              onClick={() => onIndicatorChange(ind)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                indicator === ind
                  ? 'bg-primary text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {INDICATORS[ind].nameIs}
            </button>
          ))}
        </div>
      )}

      {/* Color display beaker */}
      <div className="flex items-center justify-center gap-4">
        <div
          className={`${sizes.beaker} relative rounded-b-xl border-4 border-gray-400 transition-all duration-500`}
          style={{
            backgroundColor: currentColor,
            boxShadow: `inset 0 -10px 20px rgba(0,0,0,0.1)`
          }}
        >
          {/* Liquid surface shine */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 w-2/3 h-1 rounded-full opacity-40"
            style={{ backgroundColor: 'white' }}
          />

          {/* pH value display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${sizes.text} font-bold text-white drop-shadow-lg`}>
              pH {pH.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Info tooltip */}
        {showTooltip && (
          <div className="relative">
            <button
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              onClick={() => setShowInfo(!showInfo)}
              className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold"
            >
              ?
            </button>

            {showInfo && (
              <div className="absolute left-8 top-0 w-48 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-10">
                <div className="font-bold text-gray-800 text-sm mb-1">
                  {indicatorInfo.nameIs}
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {indicatorInfo.description}
                </div>
                <div className="text-xs text-gray-500">
                  pH breytir lit vegna {indicator === 'phenolphthalein' ? 'H⁺/OH⁻ jafnvægis' : 'breytilegrar jónunar'}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* pH Scale with indicator colors */}
      {showScale && (
        <div className="space-y-1">
          <div className="text-xs text-gray-500 text-center">pH skalinn</div>
          <div className="h-4 rounded-full overflow-hidden flex">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={i}
                className={`flex-1 transition-all duration-300 ${
                  Math.abs(i - pH) < 0.5 ? 'ring-2 ring-gray-800 ring-inset z-10' : ''
                }`}
                style={{ backgroundColor: getIndicatorColor(indicator, i) }}
                title={`pH ${i}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 px-1">
            <span>0</span>
            <span>7</span>
            <span>14</span>
          </div>
          <div className="flex justify-between text-xs px-1">
            <span className="text-red-500">Sýra</span>
            <span className="text-green-500">Hlutlaust</span>
            <span className="text-blue-500">Basi</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndicatorSystem;
