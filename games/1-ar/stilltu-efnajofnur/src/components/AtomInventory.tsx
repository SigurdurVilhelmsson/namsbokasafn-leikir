import { Equation, ELEMENT_COLORS, countAtoms } from '../data/equations';

interface AtomInventoryProps {
  equation: Equation;
  coefficients: number[];
  language: string;
  highlightElements?: string[];
  compact?: boolean;
}

/**
 * AtomInventory - A reusable component that shows a live atom counting table
 * Shows element | left side count | right side count | balanced status
 * Color-coded: green when balanced, red when not
 */
export function AtomInventory({
  equation,
  coefficients,
  language,
  highlightElements = [],
  compact = false,
}: AtomInventoryProps) {
  const { reactants, products } = countAtoms(equation, coefficients);
  const allElements = [...new Set([...Object.keys(reactants), ...Object.keys(products)])];

  // Sort elements: metals first, then nonmetals, H and O last
  const sortOrder: Record<string, number> = {
    // Metals (lower numbers = first)
    'Na': 1, 'K': 2, 'Ca': 3, 'Mg': 4, 'Fe': 5, 'Al': 6, 'Zn': 7, 'Cu': 8, 'Ag': 9, 'Au': 10,
    // Nonmetals
    'C': 20, 'N': 21, 'S': 22, 'P': 23, 'Cl': 24,
    // H and O last
    'H': 90, 'O': 100,
  };

  const sortedElements = [...allElements].sort((a, b) => {
    const orderA = sortOrder[a] ?? 50;
    const orderB = sortOrder[b] ?? 50;
    return orderA - orderB;
  });

  const allBalanced = sortedElements.every(
    e => (reactants[e] || 0) === (products[e] || 0) && (reactants[e] || 0) > 0
  );

  const labels = {
    is: {
      title: 'Atómatalning',
      element: 'Frumefni',
      left: 'Vinstri',
      right: 'Hægri',
      balanced: 'Jafnt?',
      yes: 'Já',
      no: 'Nei',
    },
    en: {
      title: 'Atom Inventory',
      element: 'Element',
      left: 'Left',
      right: 'Right',
      balanced: 'Balanced?',
      yes: 'Yes',
      no: 'No',
    },
    pl: {
      title: 'Inwentarz atomów',
      element: 'Pierwiastek',
      left: 'Lewa',
      right: 'Prawa',
      balanced: 'Zrównoważone?',
      yes: 'Tak',
      no: 'Nie',
    },
  };

  const l = labels[language as keyof typeof labels] || labels.is;

  if (compact) {
    // Compact inline version for smaller spaces
    return (
      <div className={`flex flex-wrap justify-center gap-2 p-3 rounded-lg transition-colors ${
        allBalanced ? 'bg-green-50' : 'bg-gray-50'
      }`}>
        {sortedElements.map(element => {
          const left = reactants[element] || 0;
          const right = products[element] || 0;
          const balanced = left === right && left > 0;
          const isHighlighted = highlightElements.includes(element);
          const color = ELEMENT_COLORS[element] || '#6b7280';

          return (
            <div
              key={element}
              className={`flex items-center gap-1 px-2 py-1 rounded text-sm transition-all ${
                balanced
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              } ${isHighlighted ? 'ring-2 ring-blue-400 ring-offset-1' : ''}`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  element === 'H' ? 'border border-gray-400 text-gray-800' : 'text-white'
                }`}
                style={{ backgroundColor: color }}
              >
                {element}
              </div>
              <span className="font-mono">{left}:{right}</span>
              {balanced && <span>✓</span>}
            </div>
          );
        })}
      </div>
    );
  }

  // Full table version
  return (
    <div className={`rounded-lg p-4 transition-colors ${
      allBalanced ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
    }`}>
      <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center flex items-center justify-center gap-2">
        <span>📊</span>
        <span>{l.title}</span>
        {allBalanced && <span className="text-green-600">✓</span>}
      </h4>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-3 text-left font-semibold text-gray-600">{l.element}</th>
              <th className="py-2 px-3 text-center font-semibold text-gray-600">{l.left}</th>
              <th className="py-2 px-3 text-center font-semibold text-gray-600">{l.right}</th>
              <th className="py-2 px-3 text-center font-semibold text-gray-600">{l.balanced}</th>
            </tr>
          </thead>
          <tbody>
            {sortedElements.map(element => {
              const left = reactants[element] || 0;
              const right = products[element] || 0;
              const balanced = left === right && left > 0;
              const isHighlighted = highlightElements.includes(element);
              const color = ELEMENT_COLORS[element] || '#6b7280';

              return (
                <tr
                  key={element}
                  className={`border-b border-gray-200 transition-all ${
                    isHighlighted ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
                          element === 'H' ? 'border-2 border-gray-400 text-gray-800' : 'text-white'
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {element}
                      </div>
                      <span className="font-medium text-gray-700">{element}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className={`font-mono text-lg font-bold ${
                      balanced ? 'text-green-600' : 'text-gray-700'
                    }`}>
                      {left}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className={`font-mono text-lg font-bold ${
                      balanced ? 'text-green-600' : 'text-gray-700'
                    }`}>
                      {right}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    {balanced ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <span>✓</span>
                        <span>{l.yes}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        <span>✗</span>
                        <span>{l.no}</span>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary row */}
      <div className={`mt-3 pt-3 border-t text-center text-sm font-medium ${
        allBalanced ? 'border-green-200 text-green-700' : 'border-gray-200 text-gray-600'
      }`}>
        {allBalanced ? (
          <span className="flex items-center justify-center gap-2">
            <span className="text-lg">✓</span>
            {language === 'en' ? 'All elements balanced!' : language === 'pl' ? 'Wszystkie pierwiastki zrównoważone!' : 'Öll frumefni stillt!'}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span className="text-lg">⚠</span>
            {language === 'en' ? 'Some elements not balanced' : language === 'pl' ? 'Niektóre pierwiastki niezrównoważone' : 'Sum frumefni ekki stillt'}
          </span>
        )}
      </div>
    </div>
  );
}

interface AtomInventoryToggleProps {
  showInventory: boolean;
  onToggle: () => void;
  language: string;
}

/**
 * Toggle button for showing/hiding the AtomInventory
 */
export function AtomInventoryToggle({
  showInventory,
  onToggle,
  language,
}: AtomInventoryToggleProps) {
  const labels = {
    is: {
      show: 'Sýna atómatalningartöflu',
      hide: 'Fela atómatalningartöflu',
    },
    en: {
      show: 'Show atom inventory',
      hide: 'Hide atom inventory',
    },
    pl: {
      show: 'Pokaż inwentarz atomów',
      hide: 'Ukryj inwentarz atomów',
    },
  };

  const l = labels[language as keyof typeof labels] || labels.is;

  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <span className="text-lg">📊</span>
      <span>{showInventory ? l.hide : l.show}</span>
      <span className={`transform transition-transform ${showInventory ? 'rotate-180' : ''}`}>
        ▼
      </span>
    </button>
  );
}
