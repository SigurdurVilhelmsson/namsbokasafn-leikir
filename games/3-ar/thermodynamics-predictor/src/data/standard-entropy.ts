/**
 * Standard molar entropy values (S°) at 298 K
 * Units: J/(mol·K)
 */
export interface EntropyData {
  formula: string;
  name: string;
  nameIs: string;
  entropy: number;
  state: 's' | 'l' | 'g' | 'aq';
}

export const STANDARD_ENTROPY: EntropyData[] = [
  // Elements
  { formula: 'H₂(g)', name: 'Hydrogen gas', nameIs: 'Vetni (gas)', entropy: 130.7, state: 'g' },
  { formula: 'O₂(g)', name: 'Oxygen gas', nameIs: 'Súrefni (gas)', entropy: 205.1, state: 'g' },
  { formula: 'N₂(g)', name: 'Nitrogen gas', nameIs: 'Köfnunarefni (gas)', entropy: 191.6, state: 'g' },
  { formula: 'C(s, graphite)', name: 'Carbon (graphite)', nameIs: 'Kolefni (grafít)', entropy: 5.7, state: 's' },
  { formula: 'C(s, diamond)', name: 'Carbon (diamond)', nameIs: 'Kolefni (demantur)', entropy: 2.4, state: 's' },
  { formula: 'S(s)', name: 'Sulfur', nameIs: 'Brennisteinn', entropy: 32.1, state: 's' },
  { formula: 'Fe(s)', name: 'Iron', nameIs: 'Járn', entropy: 27.3, state: 's' },
  { formula: 'Cu(s)', name: 'Copper', nameIs: 'Kopar', entropy: 33.2, state: 's' },
  { formula: 'Zn(s)', name: 'Zinc', nameIs: 'Sink', entropy: 41.6, state: 's' },
  { formula: 'Ca(s)', name: 'Calcium', nameIs: 'Kalsíum', entropy: 41.4, state: 's' },
  { formula: 'Na(s)', name: 'Sodium', nameIs: 'Natríum', entropy: 51.2, state: 's' },
  { formula: 'Cl₂(g)', name: 'Chlorine gas', nameIs: 'Klór (gas)', entropy: 223.1, state: 'g' },
  { formula: 'Br₂(l)', name: 'Bromine liquid', nameIs: 'Bróm (fljótandi)', entropy: 152.2, state: 'l' },
  { formula: 'Br₂(g)', name: 'Bromine gas', nameIs: 'Bróm (gas)', entropy: 245.5, state: 'g' },
  { formula: 'I₂(s)', name: 'Iodine solid', nameIs: 'Joð (fast)', entropy: 116.1, state: 's' },

  // Water and ice
  { formula: 'H₂O(l)', name: 'Water (liquid)', nameIs: 'Vatn (fljótandi)', entropy: 70.0, state: 'l' },
  { formula: 'H₂O(g)', name: 'Water vapor', nameIs: 'Vatnsgufa', entropy: 188.8, state: 'g' },
  { formula: 'H₂O(s)', name: 'Ice', nameIs: 'Ís', entropy: 48.0, state: 's' },

  // Oxides
  { formula: 'CO(g)', name: 'Carbon monoxide', nameIs: 'Kolmónoxíð', entropy: 197.7, state: 'g' },
  { formula: 'CO₂(g)', name: 'Carbon dioxide', nameIs: 'Koldíoxíð', entropy: 213.8, state: 'g' },
  { formula: 'SO₂(g)', name: 'Sulfur dioxide', nameIs: 'Brennisteinsdíoxíð', entropy: 248.2, state: 'g' },
  { formula: 'SO₃(g)', name: 'Sulfur trioxide', nameIs: 'Brennisteinstriuxíð', entropy: 256.8, state: 'g' },
  { formula: 'NO(g)', name: 'Nitric oxide', nameIs: 'Köfnunarefnisoxíð', entropy: 210.8, state: 'g' },
  { formula: 'NO₂(g)', name: 'Nitrogen dioxide', nameIs: 'Köfnunarefnisdíoxíð', entropy: 240.1, state: 'g' },
  { formula: 'N₂O₄(g)', name: 'Dinitrogen tetroxide', nameIs: 'Diniturtetraxíð', entropy: 304.4, state: 'g' },
  { formula: 'CaO(s)', name: 'Calcium oxide', nameIs: 'Kalsíumoxíð', entropy: 39.8, state: 's' },
  { formula: 'Fe₂O₃(s)', name: 'Iron(III) oxide', nameIs: 'Járnoxíð', entropy: 87.4, state: 's' },

  // Carbonates and other compounds
  { formula: 'CaCO₃(s)', name: 'Calcium carbonate', nameIs: 'Kalsíumkarbónat', entropy: 92.9, state: 's' },
  { formula: 'NaCl(s)', name: 'Sodium chloride', nameIs: 'Natríumklóríð', entropy: 72.1, state: 's' },
  { formula: 'NH₃(g)', name: 'Ammonia', nameIs: 'Ammoníak', entropy: 192.5, state: 'g' },
  { formula: 'NH₄Cl(s)', name: 'Ammonium chloride', nameIs: 'Ammoníumklóríð', entropy: 94.6, state: 's' },
  { formula: 'HCl(g)', name: 'Hydrogen chloride', nameIs: 'Klórvetni', entropy: 186.9, state: 'g' },
  { formula: 'H₂O₂(l)', name: 'Hydrogen peroxide', nameIs: 'Vetnisperoxíð', entropy: 109.6, state: 'l' },

  // Organic
  { formula: 'CH₄(g)', name: 'Methane', nameIs: 'Metan', entropy: 186.3, state: 'g' },
  { formula: 'C₂H₆(g)', name: 'Ethane', nameIs: 'Etan', entropy: 229.2, state: 'g' },
  { formula: 'C₃H₈(g)', name: 'Propane', nameIs: 'Própan', entropy: 270.3, state: 'g' },
  { formula: 'C₆H₁₂O₆(s)', name: 'Glucose', nameIs: 'Glúkósi', entropy: 212.0, state: 's' },
  { formula: 'CH₃OH(l)', name: 'Methanol', nameIs: 'Metanól', entropy: 126.8, state: 'l' },
  { formula: 'C₂H₅OH(l)', name: 'Ethanol', nameIs: 'Etanól', entropy: 160.7, state: 'l' },
  { formula: 'O₃(g)', name: 'Ozone', nameIs: 'Óson', entropy: 238.9, state: 'g' },

  // Ions
  { formula: 'Na⁺(aq)', name: 'Sodium ion', nameIs: 'Natríumjón', entropy: 59.0, state: 'aq' },
  { formula: 'Cl⁻(aq)', name: 'Chloride ion', nameIs: 'Klóríðjón', entropy: 56.5, state: 'aq' },
  { formula: 'H⁺(aq)', name: 'Hydrogen ion', nameIs: 'Vetnið', entropy: 0, state: 'aq' },
  { formula: 'OH⁻(aq)', name: 'Hydroxide ion', nameIs: 'Hýdroxíðjón', entropy: -10.8, state: 'aq' },
  { formula: 'Cu²⁺(aq)', name: 'Copper(II) ion', nameIs: 'Koparjón', entropy: -99.6, state: 'aq' },
  { formula: 'Zn²⁺(aq)', name: 'Zinc ion', nameIs: 'Sinkjón', entropy: -112.1, state: 'aq' },
];

/**
 * Entropy calculation problems
 */
export interface EntropyProblem {
  id: string;
  type: 'calculate-delta-s' | 'calculate-delta-s-from-delta-g' | 'calculate-k' | 'calculate-delta-g-from-k';
  reaction: string;
  name: string;
  nameIs: string;
  difficulty: 'Auðvelt' | 'Miðlungs' | 'Erfitt';

  // For calculate-delta-s
  reactants?: Array<{ formula: string; coefficient: number; entropy: number }>;
  products?: Array<{ formula: string; coefficient: number; entropy: number }>;

  // For calculate-delta-s-from-delta-g
  deltaH?: number; // kJ/mol
  deltaG?: number; // kJ/mol
  temperature?: number; // K

  // For calculate-k and calculate-delta-g-from-k
  deltaGStandard?: number; // kJ/mol
  K?: number; // equilibrium constant

  correctAnswer: number;
  answerUnit: string;
  tolerance: number;
  hintIs: string;
  hint: string;
  explanationIs: string;
  explanation: string;
  solutionStepsIs: string[];
  solutionSteps: string[];
}

export const ENTROPY_PROBLEMS: EntropyProblem[] = [
  // Calculate ΔS° from standard entropy values
  {
    id: 'entropy-1',
    type: 'calculate-delta-s',
    reaction: 'N₂(g) + 3H₂(g) → 2NH₃(g)',
    name: 'Haber Process',
    nameIs: 'Haber aðferðin',
    difficulty: 'Auðvelt',
    reactants: [
      { formula: 'N₂(g)', coefficient: 1, entropy: 191.6 },
      { formula: 'H₂(g)', coefficient: 3, entropy: 130.7 }
    ],
    products: [
      { formula: 'NH₃(g)', coefficient: 2, entropy: 192.5 }
    ],
    correctAnswer: -198.7,
    answerUnit: 'J/(mol·K)',
    tolerance: 0.05,
    hintIs: 'ΔS° = Σ S°(myndefni) - Σ S°(hvarfefni). Mundu að margfalda með stefnustuðlum.',
    hint: 'ΔS° = Σ S°(products) - Σ S°(reactants). Remember to multiply by stoichiometric coefficients.',
    explanationIs: 'ΔS° = [2(192.5)] - [1(191.6) + 3(130.7)] = 385.0 - 583.7 = -198.7 J/(mol·K)',
    explanation: 'ΔS° = [2(192.5)] - [1(191.6) + 3(130.7)] = 385.0 - 583.7 = -198.7 J/(mol·K)',
    solutionStepsIs: [
      'S°(myndefni) = 2 × 192.5 = 385.0 J/(mol·K)',
      'S°(hvarfefni) = 1 × 191.6 + 3 × 130.7 = 191.6 + 392.1 = 583.7 J/(mol·K)',
      'ΔS° = 385.0 - 583.7 = -198.7 J/(mol·K)'
    ],
    solutionSteps: [
      'S°(products) = 2 × 192.5 = 385.0 J/(mol·K)',
      'S°(reactants) = 1 × 191.6 + 3 × 130.7 = 191.6 + 392.1 = 583.7 J/(mol·K)',
      'ΔS° = 385.0 - 583.7 = -198.7 J/(mol·K)'
    ]
  },
  {
    id: 'entropy-2',
    type: 'calculate-delta-s',
    reaction: 'CaCO₃(s) → CaO(s) + CO₂(g)',
    name: 'Thermal decomposition of limestone',
    nameIs: 'Niðurbrot kalksteins',
    difficulty: 'Auðvelt',
    reactants: [
      { formula: 'CaCO₃(s)', coefficient: 1, entropy: 92.9 }
    ],
    products: [
      { formula: 'CaO(s)', coefficient: 1, entropy: 39.8 },
      { formula: 'CO₂(g)', coefficient: 1, entropy: 213.8 }
    ],
    correctAnswer: 160.7,
    answerUnit: 'J/(mol·K)',
    tolerance: 0.05,
    hintIs: 'Þegar gas myndast eykst óreiða mikið.',
    hint: 'When gas is formed, entropy increases significantly.',
    explanationIs: 'ΔS° = [39.8 + 213.8] - [92.9] = 253.6 - 92.9 = 160.7 J/(mol·K)',
    explanation: 'ΔS° = [39.8 + 213.8] - [92.9] = 253.6 - 92.9 = 160.7 J/(mol·K)',
    solutionStepsIs: [
      'S°(myndefni) = 39.8 + 213.8 = 253.6 J/(mol·K)',
      'S°(hvarfefni) = 92.9 J/(mol·K)',
      'ΔS° = 253.6 - 92.9 = 160.7 J/(mol·K)',
      'Jákvætt: Gas myndast, óreiða eykst'
    ],
    solutionSteps: [
      'S°(products) = 39.8 + 213.8 = 253.6 J/(mol·K)',
      'S°(reactants) = 92.9 J/(mol·K)',
      'ΔS° = 253.6 - 92.9 = 160.7 J/(mol·K)',
      'Positive: Gas is formed, entropy increases'
    ]
  },
  {
    id: 'entropy-3',
    type: 'calculate-delta-s',
    reaction: 'H₂O(l) → H₂O(g)',
    name: 'Vaporization of water',
    nameIs: 'Uppgufun vatns',
    difficulty: 'Auðvelt',
    reactants: [
      { formula: 'H₂O(l)', coefficient: 1, entropy: 70.0 }
    ],
    products: [
      { formula: 'H₂O(g)', coefficient: 1, entropy: 188.8 }
    ],
    correctAnswer: 118.8,
    answerUnit: 'J/(mol·K)',
    tolerance: 0.05,
    hintIs: 'Uppgufun eykur óreiðu því gasefni hafa meira svigrúm til hreyfingar.',
    hint: 'Vaporization increases entropy as gases have more room to move.',
    explanationIs: 'ΔS° = 188.8 - 70.0 = 118.8 J/(mol·K)',
    explanation: 'ΔS° = 188.8 - 70.0 = 118.8 J/(mol·K)',
    solutionStepsIs: [
      'S°(H₂O gas) = 188.8 J/(mol·K)',
      'S°(H₂O fljótandi) = 70.0 J/(mol·K)',
      'ΔS° = 188.8 - 70.0 = 118.8 J/(mol·K)'
    ],
    solutionSteps: [
      'S°(H₂O gas) = 188.8 J/(mol·K)',
      'S°(H₂O liquid) = 70.0 J/(mol·K)',
      'ΔS° = 188.8 - 70.0 = 118.8 J/(mol·K)'
    ]
  },

  // Calculate ΔS from ΔH and ΔG
  {
    id: 'entropy-4',
    type: 'calculate-delta-s-from-delta-g',
    reaction: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)',
    name: 'Methane combustion',
    nameIs: 'Brennsla metans',
    difficulty: 'Miðlungs',
    deltaH: -802,
    deltaG: -801,
    temperature: 298,
    correctAnswer: -3.36,
    answerUnit: 'J/(mol·K)',
    tolerance: 0.10,
    hintIs: 'Notaðu ΔG = ΔH - TΔS og einangraðu ΔS.',
    hint: 'Use ΔG = ΔH - TΔS and solve for ΔS.',
    explanationIs: 'ΔS = (ΔH - ΔG) / T = (-802 - (-801)) kJ/mol / 298 K = -1 kJ / 298 K = -3.36 J/(mol·K)',
    explanation: 'ΔS = (ΔH - ΔG) / T = (-802 - (-801)) kJ/mol / 298 K = -1 kJ / 298 K = -3.36 J/(mol·K)',
    solutionStepsIs: [
      'ΔG = ΔH - TΔS',
      'ΔS = (ΔH - ΔG) / T',
      'ΔS = (-802 - (-801)) / 298',
      'ΔS = -1 kJ/mol / 298 K',
      'ΔS = -0.00336 kJ/(mol·K) = -3.36 J/(mol·K)'
    ],
    solutionSteps: [
      'ΔG = ΔH - TΔS',
      'ΔS = (ΔH - ΔG) / T',
      'ΔS = (-802 - (-801)) / 298',
      'ΔS = -1 kJ/mol / 298 K',
      'ΔS = -0.00336 kJ/(mol·K) = -3.36 J/(mol·K)'
    ]
  },

  // Calculate K from ΔG°
  {
    id: 'k-1',
    type: 'calculate-k',
    reaction: 'N₂(g) + 3H₂(g) → 2NH₃(g)',
    name: 'Haber Process K',
    nameIs: 'Haber aðferðin K',
    difficulty: 'Miðlungs',
    deltaGStandard: -33.0,
    temperature: 298,
    correctAnswer: 6.0e5,
    answerUnit: '',
    tolerance: 0.20,
    hintIs: 'Notaðu ΔG° = -RT ln K og einangraðu K. R = 8.314 J/(mol·K).',
    hint: 'Use ΔG° = -RT ln K and solve for K. R = 8.314 J/(mol·K).',
    explanationIs: 'ln K = -ΔG° / RT = -(-33000 J/mol) / (8.314 × 298) = 13.3, K = e^13.3 ≈ 6.0 × 10⁵',
    explanation: 'ln K = -ΔG° / RT = -(-33000 J/mol) / (8.314 × 298) = 13.3, K = e^13.3 ≈ 6.0 × 10⁵',
    solutionStepsIs: [
      'ΔG° = -RT ln K',
      'ln K = -ΔG° / RT',
      'ln K = -(-33000) / (8.314 × 298)',
      'ln K = 33000 / 2478 = 13.32',
      'K = e^13.32 ≈ 6.0 × 10⁵'
    ],
    solutionSteps: [
      'ΔG° = -RT ln K',
      'ln K = -ΔG° / RT',
      'ln K = -(-33000) / (8.314 × 298)',
      'ln K = 33000 / 2478 = 13.32',
      'K = e^13.32 ≈ 6.0 × 10⁵'
    ]
  },
  {
    id: 'k-2',
    type: 'calculate-k',
    reaction: 'H₂O(l) ⇌ H⁺(aq) + OH⁻(aq)',
    name: 'Water autoionization',
    nameIs: 'Sjálfsjónun vatns',
    difficulty: 'Miðlungs',
    deltaGStandard: 79.9,
    temperature: 298,
    correctAnswer: 1.0e-14,
    answerUnit: '',
    tolerance: 0.30,
    hintIs: 'Jákvætt ΔG° gefur K < 1. Þetta er Kw!',
    hint: 'Positive ΔG° gives K < 1. This is Kw!',
    explanationIs: 'ln K = -79900 / (8.314 × 298) = -32.2, K = e^-32.2 ≈ 1.0 × 10⁻¹⁴',
    explanation: 'ln K = -79900 / (8.314 × 298) = -32.2, K = e^-32.2 ≈ 1.0 × 10⁻¹⁴',
    solutionStepsIs: [
      'ln K = -ΔG° / RT',
      'ln K = -79900 / (8.314 × 298)',
      'ln K = -79900 / 2478 = -32.24',
      'K = e^-32.24 ≈ 1.0 × 10⁻¹⁴',
      'Þetta er Kw, jónunarfasti vatns!'
    ],
    solutionSteps: [
      'ln K = -ΔG° / RT',
      'ln K = -79900 / (8.314 × 298)',
      'ln K = -79900 / 2478 = -32.24',
      'K = e^-32.24 ≈ 1.0 × 10⁻¹⁴',
      'This is Kw, the ion product of water!'
    ]
  },

  // Calculate ΔG° from K
  {
    id: 'k-3',
    type: 'calculate-delta-g-from-k',
    reaction: 'CH₃COOH(aq) ⇌ CH₃COO⁻(aq) + H⁺(aq)',
    name: 'Acetic acid ionization',
    nameIs: 'Jónun ediksýru',
    difficulty: 'Miðlungs',
    K: 1.8e-5,
    temperature: 298,
    correctAnswer: 27.1,
    answerUnit: 'kJ/mol',
    tolerance: 0.05,
    hintIs: 'Notaðu ΔG° = -RT ln K. Ef K < 1 þá er ΔG° > 0.',
    hint: 'Use ΔG° = -RT ln K. If K < 1 then ΔG° > 0.',
    explanationIs: 'ΔG° = -RT ln K = -(8.314)(298) ln(1.8×10⁻⁵) = -2478 × (-10.93) = 27.1 kJ/mol',
    explanation: 'ΔG° = -RT ln K = -(8.314)(298) ln(1.8×10⁻⁵) = -2478 × (-10.93) = 27.1 kJ/mol',
    solutionStepsIs: [
      'ΔG° = -RT ln K',
      'ΔG° = -(8.314)(298) ln(1.8 × 10⁻⁵)',
      'ln(1.8 × 10⁻⁵) = -10.93',
      'ΔG° = -2478 J/mol × (-10.93)',
      'ΔG° = 27080 J/mol = 27.1 kJ/mol'
    ],
    solutionSteps: [
      'ΔG° = -RT ln K',
      'ΔG° = -(8.314)(298) ln(1.8 × 10⁻⁵)',
      'ln(1.8 × 10⁻⁵) = -10.93',
      'ΔG° = -2478 J/mol × (-10.93)',
      'ΔG° = 27080 J/mol = 27.1 kJ/mol'
    ]
  },

  // Advanced problems
  {
    id: 'k-4',
    type: 'calculate-k',
    reaction: 'N₂(g) + 3H₂(g) → 2NH₃(g)',
    name: 'Haber Process at 500 K',
    nameIs: 'Haber aðferðin við 500 K',
    difficulty: 'Erfitt',
    deltaGStandard: 7.5, // At 500 K, ΔG = ΔH - TΔS = -92 - 500(-0.199) = -92 + 99.5 = 7.5 kJ/mol
    temperature: 500,
    correctAnswer: 0.164,
    answerUnit: '',
    tolerance: 0.15,
    hintIs: 'Við hærra hitastig minnkar K fyrir varmalosandi hvarf.',
    hint: 'At higher temperature, K decreases for exothermic reactions.',
    explanationIs: 'ln K = -7500 / (8.314 × 500) = -1.80, K = e^-1.80 ≈ 0.16',
    explanation: 'ln K = -7500 / (8.314 × 500) = -1.80, K = e^-1.80 ≈ 0.16',
    solutionStepsIs: [
      'Við 500 K, ΔG° ≈ 7.5 kJ/mol (reiknað frá ΔH og ΔS)',
      'ln K = -ΔG° / RT',
      'ln K = -7500 / (8.314 × 500) = -1.80',
      'K = e^-1.80 ≈ 0.16',
      'K minnkar við hærra hitastig (varmalosandi hvarf)'
    ],
    solutionSteps: [
      'At 500 K, ΔG° ≈ 7.5 kJ/mol (calculated from ΔH and ΔS)',
      'ln K = -ΔG° / RT',
      'ln K = -7500 / (8.314 × 500) = -1.80',
      'K = e^-1.80 ≈ 0.16',
      'K decreases at higher temperature (exothermic reaction)'
    ]
  },
  {
    id: 'entropy-5',
    type: 'calculate-delta-s',
    reaction: '2H₂O₂(l) → 2H₂O(l) + O₂(g)',
    name: 'Hydrogen peroxide decomposition',
    nameIs: 'Niðurbrot vetnisperoxíðs',
    difficulty: 'Miðlungs',
    reactants: [
      { formula: 'H₂O₂(l)', coefficient: 2, entropy: 109.6 }
    ],
    products: [
      { formula: 'H₂O(l)', coefficient: 2, entropy: 70.0 },
      { formula: 'O₂(g)', coefficient: 1, entropy: 205.1 }
    ],
    correctAnswer: 125.9,
    answerUnit: 'J/(mol·K)',
    tolerance: 0.05,
    hintIs: 'Gas myndast (O₂) sem eykur óreiðu.',
    hint: 'Gas is produced (O₂) which increases entropy.',
    explanationIs: 'ΔS° = [2(70.0) + 205.1] - [2(109.6)] = 345.1 - 219.2 = 125.9 J/(mol·K)',
    explanation: 'ΔS° = [2(70.0) + 205.1] - [2(109.6)] = 345.1 - 219.2 = 125.9 J/(mol·K)',
    solutionStepsIs: [
      'S°(myndefni) = 2 × 70.0 + 205.1 = 345.1 J/(mol·K)',
      'S°(hvarfefni) = 2 × 109.6 = 219.2 J/(mol·K)',
      'ΔS° = 345.1 - 219.2 = 125.9 J/(mol·K)'
    ],
    solutionSteps: [
      'S°(products) = 2 × 70.0 + 205.1 = 345.1 J/(mol·K)',
      'S°(reactants) = 2 × 109.6 = 219.2 J/(mol·K)',
      'ΔS° = 345.1 - 219.2 = 125.9 J/(mol·K)'
    ]
  }
];

export function getEntropyProblemsByType(type: EntropyProblem['type']): EntropyProblem[] {
  return ENTROPY_PROBLEMS.filter(p => p.type === type);
}

export function getEntropyProblemsByDifficulty(difficulty: EntropyProblem['difficulty']): EntropyProblem[] {
  return ENTROPY_PROBLEMS.filter(p => p.difficulty === difficulty);
}
