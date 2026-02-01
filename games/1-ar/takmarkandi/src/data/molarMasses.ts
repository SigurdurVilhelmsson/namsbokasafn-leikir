// Molar masses for compounds used in reactions (g/mol)
export const MOLAR_MASSES: Record<string, number> = {
  // Elements
  H2: 2.016,
  O2: 32.00,
  N2: 28.02,
  Cl2: 70.90,
  C: 12.01,
  S: 32.07,
  Ca: 40.08,
  Mg: 24.31,
  Na: 22.99,
  K: 39.10,
  Zn: 65.38,
  Cu: 63.55,
  Fe: 55.85,
  Al: 26.98,
  P4: 123.90,
  S8: 256.52,

  // Products
  H2O: 18.02,
  CO2: 44.01,
  CO: 28.01,
  NH3: 17.03,
  MgO: 40.30,
  NaCl: 58.44,
  KCl: 74.55,
  CaS: 72.14,
  ZnS: 97.46,
  CuO: 79.55,
  'Al2O3': 101.96,
  'Ca3N2': 148.26,
  'Mg3N2': 100.95,
  'Fe2O3': 159.69,
  'Fe3O4': 231.53,
  'P2O5': 141.94,
  SO2: 64.07,
  SO3: 80.06,
  CH4: 16.04,
  FeS2: 119.98,
};

// Percent yield problem data
export interface PercentYieldProblem {
  id: string;
  reactionId: string;
  reactant1Amount: number; // in grams
  reactant2Amount: number; // in grams
  actualYieldPercent: number; // what the student should calculate
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
  hintEn: string;
}

export const PERCENT_YIELD_PROBLEMS: PercentYieldProblem[] = [
  // Easy problems with simple reactions
  {
    id: 'py1',
    reactionId: '3', // C + O₂ → CO₂
    reactant1Amount: 12.01, // 1 mol C
    reactant2Amount: 64.00, // 2 mol O₂ (excess)
    actualYieldPercent: 85,
    difficulty: 'easy',
    hint: 'Fræðileg heimta er 44.01g CO₂. Reiknaðu: (raunveruleg heimta / fræðileg heimta) × 100%',
    hintEn: 'Theoretical yield is 44.01g CO₂. Calculate: (actual yield / theoretical yield) × 100%',
  },
  {
    id: 'py2',
    reactionId: '9', // Ca + S → CaS
    reactant1Amount: 40.08, // 1 mol Ca
    reactant2Amount: 64.14, // 2 mol S (excess)
    actualYieldPercent: 90,
    difficulty: 'easy',
    hint: 'Fræðileg heimta er 72.14g CaS. Hvað er 90% af því?',
    hintEn: 'Theoretical yield is 72.14g CaS. What is 90% of that?',
  },
  {
    id: 'py3',
    reactionId: '2', // 2Mg + O₂ → 2MgO
    reactant1Amount: 48.62, // 2 mol Mg
    reactant2Amount: 48.00, // 1.5 mol O₂ (excess)
    actualYieldPercent: 80,
    difficulty: 'easy',
    hint: 'Takmarkandi er Mg. 2 mól Mg gefur 2 mól MgO = 80.60g',
    hintEn: 'Limiting reagent is Mg. 2 mol Mg gives 2 mol MgO = 80.60g',
  },
  // Medium problems
  {
    id: 'py4',
    reactionId: '4', // N₂ + 3H₂ → 2NH₃
    reactant1Amount: 28.02, // 1 mol N₂
    reactant2Amount: 8.064, // 4 mol H₂ (excess)
    actualYieldPercent: 78,
    difficulty: 'medium',
    hint: 'N₂ er takmarkandi. 1 mól N₂ gefur 2 mól NH₃ = 34.06g',
    hintEn: 'N₂ is limiting. 1 mol N₂ gives 2 mol NH₃ = 34.06g',
  },
  {
    id: 'py5',
    reactionId: '5', // CH₄ + 2O₂ → CO₂ + 2H₂O
    reactant1Amount: 32.08, // 2 mol CH₄
    reactant2Amount: 128.00, // 4 mol O₂ (limiting)
    actualYieldPercent: 87,
    difficulty: 'medium',
    hint: 'O₂ er takmarkandi (4 mól þarf 2 mól CH₄). Fræðileg CO₂: 2 mól = 88.02g',
    hintEn: 'O₂ is limiting (4 mol needs 2 mol CH₄). Theoretical CO₂: 2 mol = 88.02g',
  },
  {
    id: 'py6',
    reactionId: '12', // 4Al + 3O₂ → 2Al₂O₃
    reactant1Amount: 107.92, // 4 mol Al
    reactant2Amount: 80.00, // 2.5 mol O₂ (limiting)
    actualYieldPercent: 82,
    difficulty: 'medium',
    hint: 'O₂ takmarkandi. 2.5 mól O₂ gefur (2.5/3)×2 = 1.67 mól Al₂O₃',
    hintEn: 'O₂ limiting. 2.5 mol O₂ gives (2.5/3)×2 = 1.67 mol Al₂O₃',
  },
  // Hard problems
  {
    id: 'py7',
    reactionId: '6', // 4Fe + 3O₂ → 2Fe₂O₃
    reactant1Amount: 111.70, // 2 mol Fe (limiting)
    reactant2Amount: 96.00, // 3 mol O₂
    actualYieldPercent: 73.5,
    difficulty: 'hard',
    hint: 'Fe takmarkandi. 2 mól Fe gefur 1 mól Fe₂O₃ = 159.69g',
    hintEn: 'Fe limiting. 2 mol Fe gives 1 mol Fe₂O₃ = 159.69g',
  },
  {
    id: 'py8',
    reactionId: '17', // P₄ + 5O₂ → 2P₂O₅
    reactant1Amount: 123.90, // 1 mol P₄
    reactant2Amount: 192.00, // 6 mol O₂ (excess)
    actualYieldPercent: 81.2,
    difficulty: 'hard',
    hint: 'P₄ takmarkandi. Fræðileg P₂O₅: 2 mól = 283.88g',
    hintEn: 'P₄ limiting. Theoretical P₂O₅: 2 mol = 283.88g',
  },
  {
    id: 'py9',
    reactionId: '16', // 3Fe + 2O₂ → Fe₃O₄
    reactant1Amount: 167.55, // 3 mol Fe
    reactant2Amount: 56.00, // 1.75 mol O₂ (limiting)
    actualYieldPercent: 86.7,
    difficulty: 'hard',
    hint: 'O₂ takmarkandi. (1.75/2) = 0.875 mól Fe₃O₄ = 202.59g',
    hintEn: 'O₂ limiting. (1.75/2) = 0.875 mol Fe₃O₄ = 202.59g',
  },
  {
    id: 'py10',
    reactionId: '18', // S₈ + 12O₂ → 8SO₃
    reactant1Amount: 256.52, // 1 mol S₈
    reactant2Amount: 320.00, // 10 mol O₂ (limiting)
    actualYieldPercent: 77.8,
    difficulty: 'hard',
    hint: 'O₂ takmarkandi. (10/12)×8 = 6.67 mól SO₃',
    hintEn: 'O₂ limiting. (10/12)×8 = 6.67 mol SO₃',
  },
];

// Calculate theoretical yield in grams for a given problem
export function calculateTheoreticalYield(
  problem: PercentYieldProblem,
  reaction: { reactant1: { formula: string; coeff: number }; reactant2: { formula: string; coeff: number }; products: { formula: string; coeff: number }[] }
): { theoreticalGrams: number; limitingReagent: string; productFormula: string } {
  const r1Moles = problem.reactant1Amount / MOLAR_MASSES[reaction.reactant1.formula];
  const r2Moles = problem.reactant2Amount / MOLAR_MASSES[reaction.reactant2.formula];

  const r1Ratio = r1Moles / reaction.reactant1.coeff;
  const r2Ratio = r2Moles / reaction.reactant2.coeff;

  const limitingReagent = r1Ratio <= r2Ratio ? reaction.reactant1.formula : reaction.reactant2.formula;
  const limitingRatio = Math.min(r1Ratio, r2Ratio);

  // Calculate moles of first product
  const product = reaction.products[0];
  const productMoles = limitingRatio * product.coeff;
  const theoreticalGrams = productMoles * MOLAR_MASSES[product.formula];

  return { theoreticalGrams, limitingReagent, productFormula: product.formula };
}

export function calculateActualYield(theoreticalGrams: number, percentYield: number): number {
  return (percentYield / 100) * theoreticalGrams;
}
