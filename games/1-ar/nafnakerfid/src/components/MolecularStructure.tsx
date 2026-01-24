import { useMemo } from 'react';
import { Compound } from '../data/compounds';

interface MolecularStructureProps {
  compound: Compound;
  size?: 'small' | 'medium' | 'large';
  showLabels?: boolean;
}

// Atom visual properties - colors based on CPK coloring convention
const ATOM_COLORS: Record<string, { fill: string; border: string; textColor: string }> = {
  // Common elements
  H: { fill: '#FFFFFF', border: '#CBD5E1', textColor: '#374151' },
  C: { fill: '#333333', border: '#1F2937', textColor: '#FFFFFF' },
  N: { fill: '#3B82F6', border: '#2563EB', textColor: '#FFFFFF' },
  O: { fill: '#EF4444', border: '#DC2626', textColor: '#FFFFFF' },
  F: { fill: '#22C55E', border: '#16A34A', textColor: '#FFFFFF' },
  Cl: { fill: '#22C55E', border: '#16A34A', textColor: '#FFFFFF' },
  Br: { fill: '#92400E', border: '#78350F', textColor: '#FFFFFF' },
  I: { fill: '#7C3AED', border: '#6D28D9', textColor: '#FFFFFF' },
  S: { fill: '#EAB308', border: '#CA8A04', textColor: '#1F2937' },
  P: { fill: '#F97316', border: '#EA580C', textColor: '#FFFFFF' },

  // Metals
  Na: { fill: '#8B5CF6', border: '#7C3AED', textColor: '#FFFFFF' },
  K: { fill: '#EC4899', border: '#DB2777', textColor: '#FFFFFF' },
  Li: { fill: '#A855F7', border: '#9333EA', textColor: '#FFFFFF' },
  Mg: { fill: '#14B8A6', border: '#0D9488', textColor: '#FFFFFF' },
  Ca: { fill: '#F97316', border: '#EA580C', textColor: '#FFFFFF' },
  Ba: { fill: '#10B981', border: '#059669', textColor: '#FFFFFF' },
  Al: { fill: '#A1A1AA', border: '#71717A', textColor: '#FFFFFF' },
  Fe: { fill: '#B45309', border: '#92400E', textColor: '#FFFFFF' },
  Cu: { fill: '#D97706', border: '#B45309', textColor: '#FFFFFF' },
  Zn: { fill: '#6B7280', border: '#4B5563', textColor: '#FFFFFF' },
  Ag: { fill: '#C0C0C0', border: '#9CA3AF', textColor: '#374151' },
  Pb: { fill: '#4B5563', border: '#374151', textColor: '#FFFFFF' },
  Hg: { fill: '#71717A', border: '#52525B', textColor: '#FFFFFF' },
  Sn: { fill: '#9CA3AF', border: '#6B7280', textColor: '#374151' },
  Mn: { fill: '#A78BFA', border: '#8B5CF6', textColor: '#FFFFFF' },
  Cr: { fill: '#06B6D4', border: '#0891B2', textColor: '#FFFFFF' },
  Co: { fill: '#3B82F6', border: '#2563EB', textColor: '#FFFFFF' },
  Ni: { fill: '#10B981', border: '#059669', textColor: '#FFFFFF' },
  Xe: { fill: '#38BDF8', border: '#0EA5E9', textColor: '#1F2937' },
};

// Default color for unknown elements
const DEFAULT_COLOR = { fill: '#9CA3AF', border: '#6B7280', textColor: '#FFFFFF' };

// Parse formula to extract element counts
function parseFormula(formula: string): Array<{ symbol: string; count: number }> {
  // Replace subscript numbers with regular numbers
  const normalized = formula
    .replace(/₀/g, '0').replace(/₁/g, '1').replace(/₂/g, '2')
    .replace(/₃/g, '3').replace(/₄/g, '4').replace(/₅/g, '5')
    .replace(/₆/g, '6').replace(/₇/g, '7').replace(/₈/g, '8')
    .replace(/₉/g, '9')
    // Remove brackets and their multipliers for simplified display
    .replace(/[()[\]·]/g, '');

  const result: Array<{ symbol: string; count: number }> = [];

  // Match element symbols followed by optional numbers
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;

  while ((match = regex.exec(normalized)) !== null) {
    const symbol = match[1];
    const count = match[2] ? parseInt(match[2], 10) : 1;

    // Skip if symbol is empty
    if (!symbol) continue;

    // Merge with existing element or add new
    const existing = result.find(e => e.symbol === symbol);
    if (existing) {
      existing.count += count;
    } else {
      result.push({ symbol, count });
    }
  }

  return result;
}

// Size configurations
const SIZE_CONFIG = {
  small: { atomSize: 20, fontSize: 'text-[8px]', gap: 1, maxAtoms: 8 },
  medium: { atomSize: 28, fontSize: 'text-[10px]', gap: 2, maxAtoms: 10 },
  large: { atomSize: 36, fontSize: 'text-xs', gap: 3, maxAtoms: 12 },
};

// Single atom component
function Atom({
  symbol,
  size,
  showLabel
}: {
  symbol: string;
  size: number;
  showLabel: boolean;
}) {
  const colors = ATOM_COLORS[symbol] || DEFAULT_COLOR;

  return (
    <div
      className="rounded-full flex items-center justify-center font-bold shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: colors.fill,
        borderColor: colors.border,
        borderWidth: 2,
        color: colors.textColor,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 -2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {showLabel && (
        <span className="leading-none" style={{ fontSize: size * 0.35 }}>
          {symbol}
        </span>
      )}
    </div>
  );
}

/**
 * Visual molecular structure component
 * Displays atoms as colored circles based on the compound formula
 */
export function MolecularStructure({
  compound,
  size = 'medium',
  showLabels = true
}: MolecularStructureProps) {
  const config = SIZE_CONFIG[size];

  const atoms = useMemo(() => {
    const parsed = parseFormula(compound.formula);
    const result: string[] = [];

    // Flatten to individual atoms, respecting max limit
    for (const { symbol, count } of parsed) {
      const atomsToAdd = Math.min(count, config.maxAtoms - result.length);
      for (let i = 0; i < atomsToAdd && result.length < config.maxAtoms; i++) {
        result.push(symbol);
      }
    }

    return result;
  }, [compound.formula, config.maxAtoms]);

  const totalParsed = useMemo(() => {
    return parseFormula(compound.formula).reduce((sum, el) => sum + el.count, 0);
  }, [compound.formula]);

  const hasMore = totalParsed > atoms.length;

  // Arrange atoms in a visually pleasing layout
  // For ionic compounds: show metal/nonmetal grouping
  // For molecular compounds: show connected structure
  const isIonic = compound.type === 'ionic';

  if (atoms.length === 0) {
    return null;
  }

  // For small displays, use a simple flex wrap
  if (size === 'small') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-0.5">
        {atoms.map((symbol, idx) => (
          <Atom key={idx} symbol={symbol} size={config.atomSize} showLabel={showLabels} />
        ))}
        {hasMore && (
          <span className="text-gray-400 text-[8px] ml-1">+{totalParsed - atoms.length}</span>
        )}
      </div>
    );
  }

  // For medium/large, try to show structure
  // Group by element type for ionic compounds
  if (isIonic) {
    const metals = atoms.filter(s => !['O', 'Cl', 'F', 'Br', 'I', 'S', 'N', 'H', 'C', 'P'].includes(s));
    const nonmetals = atoms.filter(s => ['O', 'Cl', 'F', 'Br', 'I', 'S', 'N', 'H', 'C', 'P'].includes(s));

    return (
      <div className="flex items-center justify-center gap-2">
        {/* Metal atoms */}
        {metals.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-0.5">
            {metals.map((symbol, idx) => (
              <Atom key={`m-${idx}`} symbol={symbol} size={config.atomSize} showLabel={showLabels} />
            ))}
          </div>
        )}

        {/* Separator for ionic */}
        {metals.length > 0 && nonmetals.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="text-gray-400 text-xs">⁺</div>
            <div className="text-gray-400 text-xs">⁻</div>
          </div>
        )}

        {/* Nonmetal atoms */}
        {nonmetals.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-0.5">
            {nonmetals.map((symbol, idx) => (
              <Atom key={`n-${idx}`} symbol={symbol} size={config.atomSize} showLabel={showLabels} />
            ))}
          </div>
        )}

        {hasMore && (
          <span className="text-gray-400 text-xs">+{totalParsed - atoms.length}</span>
        )}
      </div>
    );
  }

  // Molecular compounds - show as connected cluster
  return (
    <div className="flex flex-wrap items-center justify-center" style={{ gap: config.gap }}>
      {atoms.map((symbol, idx) => (
        <Atom key={idx} symbol={symbol} size={config.atomSize} showLabel={showLabels} />
      ))}
      {hasMore && (
        <span className="text-gray-400 text-xs ml-1">+{totalParsed - atoms.length}</span>
      )}
    </div>
  );
}

/**
 * Compact badge showing element composition
 */
export function ElementBadges({ compound, size = 'small' }: { compound: Compound; size?: 'small' | 'medium' }) {
  const elements = parseFormula(compound.formula);

  const badgeSize = size === 'small' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-1';

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {elements.slice(0, 4).map(({ symbol, count }) => {
        const colors = ATOM_COLORS[symbol] || DEFAULT_COLOR;
        return (
          <span
            key={symbol}
            className={`rounded-full font-semibold ${badgeSize}`}
            style={{
              backgroundColor: colors.fill,
              color: colors.textColor,
              borderColor: colors.border,
              borderWidth: 1,
            }}
          >
            {symbol}{count > 1 ? `×${count}` : ''}
          </span>
        );
      })}
    </div>
  );
}
