// Atomic masses (rounded to 2 decimal places for educational purposes)
export const ATOMIC_MASSES: Record<string, number> = {
  H: 1.01,
  C: 12.01,
  N: 14.01,
  O: 16.00,
  S: 32.07,
  P: 30.97,
  Cl: 35.45,
  Br: 79.90,
  F: 19.00,
  Na: 22.99,
  K: 39.10,
  Ca: 40.08,
  Mg: 24.31,
  Fe: 55.85,
  Cu: 63.55,
  Zn: 65.38,
  Al: 26.98,
  Ag: 107.87,
  Au: 196.97,
  Si: 28.09,
  Mn: 54.94,
  Cr: 52.00,
  Ba: 137.33,
};

// Element colors for visualization
export const ELEMENT_COLORS: Record<string, string> = {
  H: '#ffffff',
  C: '#333333',
  N: '#3b82f6',
  O: '#ef4444',
  S: '#eab308',
  P: '#f97316',
  Cl: '#22c55e',
  Br: '#dc2626',
  F: '#84cc16',
  Na: '#a855f7',
  K: '#ec4899',
  Ca: '#14b8a6',
  Mg: '#78716c',
  Fe: '#b45309',
  Cu: '#dc2626',
  Zn: '#6b7280',
  Al: '#94a3b8',
  Ag: '#c0c0c0',
  Au: '#ffd700',
  Si: '#8b5cf6',
  Mn: '#6366f1',
  Cr: '#0ea5e9',
  Ba: '#059669',
};

// Parse formula to get element counts
export function parseFormula(formula: string): Record<string, number> {
  const counts: Record<string, number> = {};

  // Normalize subscript characters
  const normalized = formula
    .replace(/₀/g, '0').replace(/₁/g, '1').replace(/₂/g, '2')
    .replace(/₃/g, '3').replace(/₄/g, '4').replace(/₅/g, '5')
    .replace(/₆/g, '6').replace(/₇/g, '7').replace(/₈/g, '8')
    .replace(/₉/g, '9');

  // Handle parentheses like (OH)₂ or (PO₄)₂
  let processed = normalized;
  const parenRegex = /\(([^)]+)\)(\d+)/g;
  let parenMatch;

  while ((parenMatch = parenRegex.exec(normalized)) !== null) {
    const innerFormula = parenMatch[1];
    const multiplier = parseInt(parenMatch[2], 10);
    const innerCounts = parseFormula(innerFormula);

    for (const [element, count] of Object.entries(innerCounts)) {
      counts[element] = (counts[element] || 0) + count * multiplier;
    }

    processed = processed.replace(parenMatch[0], '');
  }

  // Match element symbols with optional numbers
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;

  while ((match = regex.exec(processed)) !== null) {
    const element = match[1];
    const count = match[2] ? parseInt(match[2], 10) : 1;
    if (element && ATOMIC_MASSES[element] !== undefined) {
      counts[element] = (counts[element] || 0) + count;
    }
  }

  return counts;
}

// Calculate molar mass of a compound
export function calculateMolarMass(formula: string): number {
  const elements = parseFormula(formula);
  let mass = 0;
  for (const [element, count] of Object.entries(elements)) {
    mass += (ATOMIC_MASSES[element] || 0) * count;
  }
  return Math.round(mass * 100) / 100;
}

// Calculate percent composition
export function calculatePercentComposition(formula: string): Record<string, number> {
  const elements = parseFormula(formula);
  const molarMass = calculateMolarMass(formula);
  const percentages: Record<string, number> = {};

  for (const [element, count] of Object.entries(elements)) {
    const elementMass = (ATOMIC_MASSES[element] || 0) * count;
    percentages[element] = Math.round((elementMass / molarMass) * 10000) / 100;
  }

  return percentages;
}

// Level 1: Percent Composition Problems
export interface PercentCompositionProblem {
  id: string;
  formula: string;
  name: string;
  nameEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hint?: string;
  hintEn?: string;
}

export const LEVEL_1_PROBLEMS: PercentCompositionProblem[] = [
  // Easy (4 problems) - Simple binary compounds
  {
    id: 'l1-1',
    formula: 'H₂O',
    name: 'Vatn',
    nameEn: 'Water',
    difficulty: 'easy',
    hint: 'Mólmassi vatns er 18.02 g/mol',
    hintEn: 'Molar mass of water is 18.02 g/mol',
  },
  {
    id: 'l1-2',
    formula: 'NaCl',
    name: 'Natríumklóríð (borðsalt)',
    nameEn: 'Sodium chloride (table salt)',
    difficulty: 'easy',
    hint: 'Bættu saman atómþyngdum Na og Cl',
    hintEn: 'Add together the atomic masses of Na and Cl',
  },
  {
    id: 'l1-3',
    formula: 'CO₂',
    name: 'Koltvísýringur',
    nameEn: 'Carbon dioxide',
    difficulty: 'easy',
    hint: 'Eitt C og tvö O atóm',
    hintEn: 'One C and two O atoms',
  },
  {
    id: 'l1-4',
    formula: 'NH₃',
    name: 'Ammoníak',
    nameEn: 'Ammonia',
    difficulty: 'easy',
    hint: 'Eitt N og þrjú H atóm',
    hintEn: 'One N and three H atoms',
  },
  // Medium (5 problems) - Multi-element compounds
  {
    id: 'l1-5',
    formula: 'H₂SO₄',
    name: 'Brennisteinssýra',
    nameEn: 'Sulfuric acid',
    difficulty: 'medium',
    hint: 'Tvö H, eitt S, fjögur O',
    hintEn: 'Two H, one S, four O',
  },
  {
    id: 'l1-6',
    formula: 'C₆H₁₂O₆',
    name: 'Glúkósi',
    nameEn: 'Glucose',
    difficulty: 'medium',
    hint: 'Mólmassi glúkósa er 180.18 g/mol',
    hintEn: 'Molar mass of glucose is 180.18 g/mol',
  },
  {
    id: 'l1-7',
    formula: 'Ca(OH)₂',
    name: 'Kalsíumhýdroxíð (slökkt kalk)',
    nameEn: 'Calcium hydroxide (slaked lime)',
    difficulty: 'medium',
    hint: 'Sviginn þýðir að OH kemur tvisvar',
    hintEn: 'The parentheses mean OH appears twice',
  },
  {
    id: 'l1-8',
    formula: 'Fe₂O₃',
    name: 'Járnoxíð (ryð)',
    nameEn: 'Iron(III) oxide (rust)',
    difficulty: 'medium',
    hint: 'Tvö Fe og þrjú O atóm',
    hintEn: 'Two Fe and three O atoms',
  },
  {
    id: 'l1-9',
    formula: 'C₂H₅OH',
    name: 'Etanól',
    nameEn: 'Ethanol',
    difficulty: 'medium',
    hint: 'Teldu öll H atóm saman',
    hintEn: 'Count all H atoms together',
  },
  // Hard (3 problems) - Complex compounds
  {
    id: 'l1-10',
    formula: 'Al₂(SO₄)₃',
    name: 'Álsúlfat',
    nameEn: 'Aluminum sulfate',
    difficulty: 'hard',
    hint: 'SO₄ kemur þrisvar fyrir',
    hintEn: 'SO₄ appears three times',
  },
  {
    id: 'l1-11',
    formula: 'Ca₃(PO₄)₂',
    name: 'Kalsíumfosfat',
    nameEn: 'Calcium phosphate',
    difficulty: 'hard',
    hint: 'Þrjú Ca, tvö PO₄ (tvö P og átta O)',
    hintEn: 'Three Ca, two PO₄ (two P and eight O)',
  },
  {
    id: 'l1-12',
    formula: 'Mg(NO₃)₂',
    name: 'Magnesíumnítrat',
    nameEn: 'Magnesium nitrate',
    difficulty: 'hard',
    hint: 'NO₃ kemur tvisvar fyrir',
    hintEn: 'NO₃ appears twice',
  },
];

// Level 2: Empirical Formula from Percent Composition
export interface EmpiricalFormulaProblem {
  id: string;
  percentages: Record<string, number>;
  empiricalFormula: string;
  name: string;
  nameEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hint?: string;
  hintEn?: string;
}

export const LEVEL_2_PROBLEMS: EmpiricalFormulaProblem[] = [
  // Easy (3 problems)
  {
    id: 'l2-1',
    percentages: { H: 11.19, O: 88.81 },
    empiricalFormula: 'HO',
    name: 'Vetnis peroxíð grunnformúla',
    nameEn: 'Hydrogen peroxide base formula',
    difficulty: 'easy',
    hint: 'Deildu % með atómþyngd til að fá mól',
    hintEn: 'Divide % by atomic mass to get moles',
  },
  {
    id: 'l2-2',
    percentages: { C: 40.00, H: 6.71, O: 53.29 },
    empiricalFormula: 'CH₂O',
    name: 'Formaldehýð',
    nameEn: 'Formaldehyde',
    difficulty: 'easy',
    hint: 'Deildu með minnsta mólfjöldanum',
    hintEn: 'Divide by the smallest number of moles',
  },
  {
    id: 'l2-3',
    percentages: { Na: 39.34, Cl: 60.66 },
    empiricalFormula: 'NaCl',
    name: 'Natríumklóríð',
    nameEn: 'Sodium chloride',
    difficulty: 'easy',
    hint: 'Hlutfallið ætti að vera 1:1',
    hintEn: 'The ratio should be 1:1',
  },
  // Medium (4 problems)
  {
    id: 'l2-4',
    percentages: { C: 52.17, H: 13.04, O: 34.78 },
    empiricalFormula: 'C₂H₆O',
    name: 'Etanól',
    nameEn: 'Ethanol',
    difficulty: 'medium',
    hint: 'Reynslujafna er sama og sameindajafna hér',
    hintEn: 'Empirical formula is same as molecular here',
  },
  {
    id: 'l2-5',
    percentages: { N: 35.00, H: 5.04, O: 59.96 },
    empiricalFormula: 'NH₂O₃',
    name: 'Köfnunarefni samband',
    nameEn: 'Nitrogen compound',
    difficulty: 'medium',
    hint: 'Athugaðu hvort hlutföllin séu heil tölur',
    hintEn: 'Check if the ratios are whole numbers',
  },
  {
    id: 'l2-6',
    percentages: { C: 85.63, H: 14.37 },
    empiricalFormula: 'CH₂',
    name: 'Kolvetni',
    nameEn: 'Hydrocarbon',
    difficulty: 'medium',
    hint: 'Einföld reynslujafna fyrir mörg kolvetni',
    hintEn: 'Simple empirical formula for many hydrocarbons',
  },
  {
    id: 'l2-7',
    percentages: { Fe: 69.94, O: 30.06 },
    empiricalFormula: 'Fe₂O₃',
    name: 'Járnoxíð',
    nameEn: 'Iron oxide',
    difficulty: 'medium',
    hint: 'Hlutfallið er 2:3',
    hintEn: 'The ratio is 2:3',
  },
  // Hard (3 problems)
  {
    id: 'l2-8',
    percentages: { C: 40.00, H: 6.71, O: 53.29 },
    empiricalFormula: 'CH₂O',
    name: 'Sykur grunnformúla',
    nameEn: 'Sugar base formula',
    difficulty: 'hard',
    hint: 'Sama reynslujafna og formaldehýð',
    hintEn: 'Same empirical formula as formaldehyde',
  },
  {
    id: 'l2-9',
    percentages: { K: 26.57, Cr: 35.36, O: 38.07 },
    empiricalFormula: 'K₂Cr₂O₇',
    name: 'Kalíumdíkrómat',
    nameEn: 'Potassium dichromate',
    difficulty: 'hard',
    hint: 'Margfaldaðu með 2 ef þú færð 1:1:3.5',
    hintEn: 'Multiply by 2 if you get 1:1:3.5',
  },
  {
    id: 'l2-10',
    percentages: { Mg: 28.83, P: 22.04, O: 49.13 },
    empiricalFormula: 'Mg₃(PO₄)₂',
    name: 'Magnesíumfosfat',
    nameEn: 'Magnesium phosphate',
    difficulty: 'hard',
    hint: 'Hlutfallið er Mg:P:O = 3:2:8',
    hintEn: 'The ratio is Mg:P:O = 3:2:8',
  },
];

// Level 3: Molecular Formula from Empirical Formula
export interface MolecularFormulaProblem {
  id: string;
  empiricalFormula: string;
  molarMass: number;
  molecularFormula: string;
  name: string;
  nameEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hint?: string;
  hintEn?: string;
}

export const LEVEL_3_PROBLEMS: MolecularFormulaProblem[] = [
  // Easy (3 problems)
  {
    id: 'l3-1',
    empiricalFormula: 'CH₂O',
    molarMass: 180,
    molecularFormula: 'C₆H₁₂O₆',
    name: 'Glúkósi',
    nameEn: 'Glucose',
    difficulty: 'easy',
    hint: 'Mólmassi CH₂O er 30 g/mol. 180/30 = ?',
    hintEn: 'Molar mass of CH₂O is 30 g/mol. 180/30 = ?',
  },
  {
    id: 'l3-2',
    empiricalFormula: 'HO',
    molarMass: 34,
    molecularFormula: 'H₂O₂',
    name: 'Vetnisperoxíð',
    nameEn: 'Hydrogen peroxide',
    difficulty: 'easy',
    hint: 'Mólmassi HO er 17 g/mol',
    hintEn: 'Molar mass of HO is 17 g/mol',
  },
  {
    id: 'l3-3',
    empiricalFormula: 'CH₂',
    molarMass: 28,
    molecularFormula: 'C₂H₄',
    name: 'Etýlen',
    nameEn: 'Ethylene',
    difficulty: 'easy',
    hint: 'Mólmassi CH₂ er 14 g/mol',
    hintEn: 'Molar mass of CH₂ is 14 g/mol',
  },
  // Medium (3 problems)
  {
    id: 'l3-4',
    empiricalFormula: 'CH₂',
    molarMass: 84,
    molecularFormula: 'C₆H₁₂',
    name: 'Sýklóhexan',
    nameEn: 'Cyclohexane',
    difficulty: 'medium',
    hint: '84 / 14 = 6',
    hintEn: '84 / 14 = 6',
  },
  {
    id: 'l3-5',
    empiricalFormula: 'CH',
    molarMass: 78,
    molecularFormula: 'C₆H₆',
    name: 'Bensen',
    nameEn: 'Benzene',
    difficulty: 'medium',
    hint: 'Mólmassi CH er 13 g/mol',
    hintEn: 'Molar mass of CH is 13 g/mol',
  },
  {
    id: 'l3-6',
    empiricalFormula: 'CH₂O',
    molarMass: 60,
    molecularFormula: 'C₂H₄O₂',
    name: 'Ediksýra',
    nameEn: 'Acetic acid',
    difficulty: 'medium',
    hint: '60 / 30 = 2',
    hintEn: '60 / 30 = 2',
  },
  // Hard (2 problems)
  {
    id: 'l3-7',
    empiricalFormula: 'C₃H₄O₃',
    molarMass: 176,
    molecularFormula: 'C₆H₈O₆',
    name: 'Askorbínsýra (C-vítamín)',
    nameEn: 'Ascorbic acid (Vitamin C)',
    difficulty: 'hard',
    hint: 'Mólmassi C₃H₄O₃ er 88 g/mol',
    hintEn: 'Molar mass of C₃H₄O₃ is 88 g/mol',
  },
  {
    id: 'l3-8',
    empiricalFormula: 'C₂H₃O₂',
    molarMass: 118,
    molecularFormula: 'C₄H₆O₄',
    name: 'Ravsýra',
    nameEn: 'Succinic acid',
    difficulty: 'hard',
    hint: 'Mólmassi C₂H₃O₂ er 59 g/mol',
    hintEn: 'Molar mass of C₂H₃O₂ is 59 g/mol',
  },
];

// Helper to format formula with subscripts
export function formatFormula(formula: string): string {
  return formula
    .replace(/(\d+)/g, (match) => {
      const subscripts = '₀₁₂₃₄₅₆₇₈₉';
      return match.split('').map(d => subscripts[parseInt(d)]).join('');
    });
}

// Helper to parse subscripted formula back to normal
export function normalizeFormula(formula: string): string {
  return formula
    .replace(/₀/g, '0').replace(/₁/g, '1').replace(/₂/g, '2')
    .replace(/₃/g, '3').replace(/₄/g, '4').replace(/₅/g, '5')
    .replace(/₆/g, '6').replace(/₇/g, '7').replace(/₈/g, '8')
    .replace(/₉/g, '9');
}

// Check if two formulas are equivalent (handles subscript variations)
export function formulasEqual(f1: string, f2: string): boolean {
  const n1 = normalizeFormula(f1).replace(/\s/g, '');
  const n2 = normalizeFormula(f2).replace(/\s/g, '');
  return n1 === n2;
}

// Get multiplier from empirical to molecular formula
export function getMultiplier(empiricalFormula: string, molarMass: number): number {
  const empiricalMass = calculateMolarMass(empiricalFormula);
  return Math.round(molarMass / empiricalMass);
}
