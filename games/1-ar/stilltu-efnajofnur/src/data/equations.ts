// Element colors for visual atom representation
export const ELEMENT_COLORS: Record<string, string> = {
  H: '#ffffff',   // White (with dark border)
  O: '#ff4444',   // Red
  N: '#3b82f6',   // Blue
  C: '#333333',   // Dark gray/black
  S: '#eab308',   // Yellow
  Cl: '#22c55e',  // Green
  Na: '#a855f7',  // Purple
  K: '#ec4899',   // Pink
  Ca: '#14b8a6',  // Teal
  Mg: '#78716c',  // Gray
  Fe: '#b45309',  // Brown/orange
  Al: '#94a3b8',  // Silver/gray
  P: '#f97316',   // Orange
  Cu: '#dc2626',  // Copper red
  Zn: '#6b7280',  // Zinc gray
  Ag: '#c0c0c0',  // Silver
  Au: '#ffd700',  // Gold
};

export type ReactionType =
  | 'synthesis'
  | 'decomposition'
  | 'single-replacement'
  | 'double-replacement'
  | 'combustion'
  | 'complex';

export interface Equation {
  id: string;
  reactants: string[];      // e.g., ['H₂', 'O₂']
  products: string[];       // e.g., ['H₂O']
  coefficients: number[];   // Balanced coefficients: [reactant1, reactant2, ..., product1, product2, ...]
  type: ReactionType;
  difficulty: 'easy' | 'medium' | 'hard';
  hint?: string;
  hintEn?: string;
}

// Helper to count atoms in a formula (simplified)
export function parseFormula(formula: string): Record<string, number> {
  const counts: Record<string, number> = {};

  // Remove subscript characters and convert to regular numbers
  const normalized = formula
    .replace(/₀/g, '0').replace(/₁/g, '1').replace(/₂/g, '2')
    .replace(/₃/g, '3').replace(/₄/g, '4').replace(/₅/g, '5')
    .replace(/₆/g, '6').replace(/₇/g, '7').replace(/₈/g, '8')
    .replace(/₉/g, '9');

  // Match element symbols with optional numbers
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;

  // Handle parentheses like (OH)₂ or (PO₄)₂
  const parenRegex = /\(([^)]+)\)(\d+)/g;
  let processed = normalized;
  let parenMatch;

  while ((parenMatch = parenRegex.exec(normalized)) !== null) {
    const innerFormula = parenMatch[1];
    const multiplier = parseInt(parenMatch[2], 10);
    const innerCounts = parseFormula(innerFormula);

    for (const [element, count] of Object.entries(innerCounts)) {
      counts[element] = (counts[element] || 0) + count * multiplier;
    }

    // Remove the processed part
    processed = processed.replace(parenMatch[0], '');
  }

  while ((match = regex.exec(processed)) !== null) {
    const element = match[1];
    const count = match[2] ? parseInt(match[2], 10) : 1;
    if (element) {
      counts[element] = (counts[element] || 0) + count;
    }
  }

  return counts;
}

// Calculate total atoms on each side given coefficients
export function countAtoms(
  equation: Equation,
  coefficients: number[]
): { reactants: Record<string, number>; products: Record<string, number> } {
  const reactantCounts: Record<string, number> = {};
  const productCounts: Record<string, number> = {};

  // Count reactant atoms
  equation.reactants.forEach((formula, i) => {
    const coef = coefficients[i] || 0;
    const atoms = parseFormula(formula);
    for (const [element, count] of Object.entries(atoms)) {
      reactantCounts[element] = (reactantCounts[element] || 0) + count * coef;
    }
  });

  // Count product atoms
  const productStartIndex = equation.reactants.length;
  equation.products.forEach((formula, i) => {
    const coef = coefficients[productStartIndex + i] || 0;
    const atoms = parseFormula(formula);
    for (const [element, count] of Object.entries(atoms)) {
      productCounts[element] = (productCounts[element] || 0) + count * coef;
    }
  });

  return { reactants: reactantCounts, products: productCounts };
}

// Check if equation is balanced
export function isBalanced(equation: Equation, coefficients: number[]): boolean {
  const { reactants, products } = countAtoms(equation, coefficients);

  const allElements = new Set([...Object.keys(reactants), ...Object.keys(products)]);

  for (const element of allElements) {
    if ((reactants[element] || 0) !== (products[element] || 0)) {
      return false;
    }
  }

  // Also check that all coefficients are positive integers
  return coefficients.every(c => c > 0 && Number.isInteger(c));
}

// Level 1: Easy equations (10 problems) - Visual atom balancing
export const LEVEL_1_EQUATIONS: Equation[] = [
  {
    id: 'l1-1',
    reactants: ['H₂', 'O₂'],
    products: ['H₂O'],
    coefficients: [2, 1, 2],
    type: 'synthesis',
    difficulty: 'easy',
    hint: 'Byrjaðu á að telja vetnisatóm',
    hintEn: 'Start by counting hydrogen atoms',
  },
  {
    id: 'l1-2',
    reactants: ['Na', 'Cl₂'],
    products: ['NaCl'],
    coefficients: [2, 1, 2],
    type: 'synthesis',
    difficulty: 'easy',
    hint: 'Klór kemur sem Cl₂ sameind',
    hintEn: 'Chlorine comes as Cl₂ molecule',
  },
  {
    id: 'l1-3',
    reactants: ['N₂', 'H₂'],
    products: ['NH₃'],
    coefficients: [1, 3, 2],
    type: 'synthesis',
    difficulty: 'easy',
    hint: 'Þetta er Haber-ferlið',
    hintEn: 'This is the Haber process',
  },
  {
    id: 'l1-4',
    reactants: ['Mg', 'O₂'],
    products: ['MgO'],
    coefficients: [2, 1, 2],
    type: 'synthesis',
    difficulty: 'easy',
    hint: 'Magnesíum brennur í súrefni',
    hintEn: 'Magnesium burns in oxygen',
  },
  {
    id: 'l1-5',
    reactants: ['H₂O'],
    products: ['H₂', 'O₂'],
    coefficients: [2, 2, 1],
    type: 'decomposition',
    difficulty: 'easy',
    hint: 'Rafgreining vatns',
    hintEn: 'Electrolysis of water',
  },
  {
    id: 'l1-6',
    reactants: ['K', 'Cl₂'],
    products: ['KCl'],
    coefficients: [2, 1, 2],
    type: 'synthesis',
    difficulty: 'easy',
    hint: 'Svipað og natríum og klór',
    hintEn: 'Similar to sodium and chlorine',
  },
  {
    id: 'l1-7',
    reactants: ['Ca', 'O₂'],
    products: ['CaO'],
    coefficients: [2, 1, 2],
    type: 'synthesis',
    difficulty: 'easy',
    hint: 'Kalsíum oxíð er brennd kalk',
    hintEn: 'Calcium oxide is quickite',
  },
  {
    id: 'l1-8',
    reactants: ['S', 'O₂'],
    products: ['SO₂'],
    coefficients: [1, 1, 1],
    type: 'synthesis',
    difficulty: 'easy',
    hint: 'Þessi jafna er þegar stillt!',
    hintEn: 'This equation is already balanced!',
  },
  {
    id: 'l1-9',
    reactants: ['Al', 'O₂'],
    products: ['Al₂O₃'],
    coefficients: [4, 3, 2],
    type: 'synthesis',
    difficulty: 'easy',
    hint: 'Ál oxíð hefur hlutfallið 2:3',
    hintEn: 'Aluminum oxide has ratio 2:3',
  },
  {
    id: 'l1-10',
    reactants: ['Fe', 'O₂'],
    products: ['Fe₂O₃'],
    coefficients: [4, 3, 2],
    type: 'synthesis',
    difficulty: 'easy',
    hint: 'Ryð myndast',
    hintEn: 'Rust forms',
  },
];

// Level 2: Medium equations (15 problems) - Balancing by inspection
export const LEVEL_2_EQUATIONS: Equation[] = [
  {
    id: 'l2-1',
    reactants: ['CH₄', 'O₂'],
    products: ['CO₂', 'H₂O'],
    coefficients: [1, 2, 1, 2],
    type: 'combustion',
    difficulty: 'medium',
    hint: 'Byrjaðu á kolefni, síðan vetni, síðast súrefni',
    hintEn: 'Start with carbon, then hydrogen, finally oxygen',
  },
  {
    id: 'l2-2',
    reactants: ['C₂H₆', 'O₂'],
    products: ['CO₂', 'H₂O'],
    coefficients: [2, 7, 4, 6],
    type: 'combustion',
    difficulty: 'medium',
    hint: 'Etanbruni - stiltu C, H, O í þeirri röð',
    hintEn: 'Ethane combustion - balance C, H, O in that order',
  },
  {
    id: 'l2-3',
    reactants: ['KClO₃'],
    products: ['KCl', 'O₂'],
    coefficients: [2, 2, 3],
    type: 'decomposition',
    difficulty: 'medium',
    hint: 'Kalíumklórat sundrast við upphitun',
    hintEn: 'Potassium chlorate decomposes when heated',
  },
  {
    id: 'l2-4',
    reactants: ['Zn', 'HCl'],
    products: ['ZnCl₂', 'H₂'],
    coefficients: [1, 2, 1, 1],
    type: 'single-replacement',
    difficulty: 'medium',
    hint: 'Sink leysir upp í saltsýru',
    hintEn: 'Zinc dissolves in hydrochloric acid',
  },
  {
    id: 'l2-5',
    reactants: ['Fe', 'H₂O'],
    products: ['Fe₃O₄', 'H₂'],
    coefficients: [3, 4, 1, 4],
    type: 'single-replacement',
    difficulty: 'medium',
    hint: 'Járn hvarfast við gufu',
    hintEn: 'Iron reacts with steam',
  },
  {
    id: 'l2-6',
    reactants: ['C₃H₈', 'O₂'],
    products: ['CO₂', 'H₂O'],
    coefficients: [1, 5, 3, 4],
    type: 'combustion',
    difficulty: 'medium',
    hint: 'Própanbruni',
    hintEn: 'Propane combustion',
  },
  {
    id: 'l2-7',
    reactants: ['NaOH', 'H₂SO₄'],
    products: ['Na₂SO₄', 'H₂O'],
    coefficients: [2, 1, 1, 2],
    type: 'double-replacement',
    difficulty: 'medium',
    hint: 'Sýru-basa hvarf',
    hintEn: 'Acid-base reaction',
  },
  {
    id: 'l2-8',
    reactants: ['Al', 'HCl'],
    products: ['AlCl₃', 'H₂'],
    coefficients: [2, 6, 2, 3],
    type: 'single-replacement',
    difficulty: 'medium',
    hint: 'Ál hefur hleðslu +3',
    hintEn: 'Aluminum has charge +3',
  },
  {
    id: 'l2-9',
    reactants: ['Na₂CO₃', 'HCl'],
    products: ['NaCl', 'H₂O', 'CO₂'],
    coefficients: [1, 2, 2, 1, 1],
    type: 'double-replacement',
    difficulty: 'medium',
    hint: 'Sódi og saltsýra',
    hintEn: 'Soda and hydrochloric acid',
  },
  {
    id: 'l2-10',
    reactants: ['CaCO₃'],
    products: ['Cite', 'CO₂'],
    coefficients: [1, 1, 1],
    type: 'decomposition',
    difficulty: 'medium',
    hint: 'Kalksteinn sundrast',
    hintEn: 'Limestone decomposes',
  },
  {
    id: 'l2-11',
    reactants: ['AgNO₃', 'NaCl'],
    products: ['AgCl', 'NaNO₃'],
    coefficients: [1, 1, 1, 1],
    type: 'double-replacement',
    difficulty: 'medium',
    hint: 'Silfurklóríð fellur út',
    hintEn: 'Silver chloride precipitates',
  },
  {
    id: 'l2-12',
    reactants: ['Mg', 'HCl'],
    products: ['MgCl₂', 'H₂'],
    coefficients: [1, 2, 1, 1],
    type: 'single-replacement',
    difficulty: 'medium',
    hint: 'Magnesíum í saltsýru',
    hintEn: 'Magnesium in hydrochloric acid',
  },
  {
    id: 'l2-13',
    reactants: ['Cu', 'AgNO₃'],
    products: ['Cu(NO₃)₂', 'Ag'],
    coefficients: [1, 2, 1, 2],
    type: 'single-replacement',
    difficulty: 'medium',
    hint: 'Kopar kemur í stað silfurs',
    hintEn: 'Copper replaces silver',
  },
  {
    id: 'l2-14',
    reactants: ['BaCl₂', 'Na₂SO₄'],
    products: ['BaSO₄', 'NaCl'],
    coefficients: [1, 1, 1, 2],
    type: 'double-replacement',
    difficulty: 'medium',
    hint: 'Baríumsúlfat fellur út',
    hintEn: 'Barium sulfate precipitates',
  },
  {
    id: 'l2-15',
    reactants: ['Fe₂O₃', 'C'],
    products: ['Fe', 'CO₂'],
    coefficients: [2, 3, 4, 3],
    type: 'single-replacement',
    difficulty: 'medium',
    hint: 'Afoxun járns með kolefni',
    hintEn: 'Reduction of iron with carbon',
  },
];

// Level 3: Hard equations (10 problems) - Systematic balancing
export const LEVEL_3_EQUATIONS: Equation[] = [
  {
    id: 'l3-1',
    reactants: ['C₆H₁₂O₆', 'O₂'],
    products: ['CO₂', 'H₂O'],
    coefficients: [1, 6, 6, 6],
    type: 'combustion',
    difficulty: 'hard',
    hint: 'Glúkósabruni - öndun',
    hintEn: 'Glucose combustion - respiration',
  },
  {
    id: 'l3-2',
    reactants: ['Fe₂O₃', 'CO'],
    products: ['Fe', 'CO₂'],
    coefficients: [1, 3, 2, 3],
    type: 'single-replacement',
    difficulty: 'hard',
    hint: 'Háofnsferli',
    hintEn: 'Blast furnace process',
  },
  {
    id: 'l3-3',
    reactants: ['Ca₃(PO₄)₂', 'SiO₂', 'C'],
    products: ['CaSiO₃', 'P₄', 'CO'],
    coefficients: [2, 6, 10, 6, 1, 10],
    type: 'complex',
    difficulty: 'hard',
    hint: 'Fosfórframleiðsla - flókin jafna',
    hintEn: 'Phosphorus production - complex equation',
  },
  {
    id: 'l3-4',
    reactants: ['NH₃', 'O₂'],
    products: ['NO', 'H₂O'],
    coefficients: [4, 5, 4, 6],
    type: 'combustion',
    difficulty: 'hard',
    hint: 'Ostwald-ferlið',
    hintEn: 'Ostwald process',
  },
  {
    id: 'l3-5',
    reactants: ['C₂H₅OH', 'O₂'],
    products: ['CO₂', 'H₂O'],
    coefficients: [1, 3, 2, 3],
    type: 'combustion',
    difficulty: 'hard',
    hint: 'Etanólbruni',
    hintEn: 'Ethanol combustion',
  },
  {
    id: 'l3-6',
    reactants: ['Al', 'Fe₂O₃'],
    products: ['Al₂O₃', 'Fe'],
    coefficients: [2, 1, 1, 2],
    type: 'single-replacement',
    difficulty: 'hard',
    hint: 'Thermít-hvarf',
    hintEn: 'Thermite reaction',
  },
  {
    id: 'l3-7',
    reactants: ['KMnO₄', 'HCl'],
    products: ['KCl', 'MnCl₂', 'H₂O', 'Cl₂'],
    coefficients: [2, 16, 2, 2, 8, 5],
    type: 'complex',
    difficulty: 'hard',
    hint: 'Oxun-afoxun hvarf',
    hintEn: 'Redox reaction',
  },
  {
    id: 'l3-8',
    reactants: ['C₄H₁₀', 'O₂'],
    products: ['CO₂', 'H₂O'],
    coefficients: [2, 13, 8, 10],
    type: 'combustion',
    difficulty: 'hard',
    hint: 'Bútanbruni',
    hintEn: 'Butane combustion',
  },
  {
    id: 'l3-9',
    reactants: ['P₄', 'O₂'],
    products: ['P₄O₁₀'],
    coefficients: [1, 5, 1],
    type: 'synthesis',
    difficulty: 'hard',
    hint: 'Fosfór brennur',
    hintEn: 'Phosphorus burns',
  },
  {
    id: 'l3-10',
    reactants: ['H₂S', 'SO₂'],
    products: ['S', 'H₂O'],
    coefficients: [2, 1, 3, 2],
    type: 'complex',
    difficulty: 'hard',
    hint: 'Claus-ferlið',
    hintEn: 'Claus process',
  },
];

// Fix the CaO typo in level 2
LEVEL_2_EQUATIONS[9] = {
  id: 'l2-10',
  reactants: ['CaCO₃'],
  products: ['CaO', 'CO₂'],
  coefficients: [1, 1, 1],
  type: 'decomposition',
  difficulty: 'medium',
  hint: 'Kalksteinn sundrast',
  hintEn: 'Limestone decomposes',
};

// Reaction type translations
export const REACTION_TYPES: Record<ReactionType, { is: string; en: string }> = {
  'synthesis': { is: 'Samsetningarhvarf', en: 'Synthesis' },
  'decomposition': { is: 'Sundrunarhvarf', en: 'Decomposition' },
  'single-replacement': { is: 'Einföld víxlhvörf', en: 'Single Replacement' },
  'double-replacement': { is: 'Tvöföld víxlhvörf', en: 'Double Replacement' },
  'combustion': { is: 'Brunahvarf', en: 'Combustion' },
  'complex': { is: 'Flókið hvarf', en: 'Complex Reaction' },
};

// Get all equations for a level
export function getEquationsForLevel(level: 1 | 2 | 3): Equation[] {
  switch (level) {
    case 1: return LEVEL_1_EQUATIONS;
    case 2: return LEVEL_2_EQUATIONS;
    case 3: return LEVEL_3_EQUATIONS;
    default: return [];
  }
}
