// Net Ionic Equations (Nettó jónajöfnur) data
// The process:
// 1. Start with molecular equation
// 2. Write complete ionic equation (split all aqueous ions)
// 3. Remove spectator ions
// 4. Write net ionic equation

export interface IonicEquationProblem {
  id: string;
  molecularEquation: string;
  completeIonicEquation: string;
  spectatorIons: string[];
  netIonicEquation: string;
  explanation: string;
  explanationEn: string;
  productType: 'precipitate' | 'gas' | 'water';
  difficulty: 'easy' | 'medium' | 'hard';
}

// Rules for splitting compounds into ions:
// - Only split compounds in aqueous (aq) state
// - Strong acids: HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄
// - Strong bases: Group 1 hydroxides, Ba(OH)₂, Ca(OH)₂, Sr(OH)₂
// - Soluble salts split into ions
// - Do NOT split: solids (s), liquids (l), gases (g), weak acids, weak bases

export const IONIC_EQUATION_RULES = {
  is: [
    'Aðeins efni í vatnslausn (aq) eru skipt í jónir',
    'Sterkar sýrur: HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄',
    'Sterkir basar: NaOH, KOH, Ba(OH)₂, Ca(OH)₂',
    'Fastar efni (s), vökvar (l), og gös (g) eru EKKI skipt',
    'Veik sýra (t.d. CH₃COOH) og veikir basar eru ekki skipt',
    'Áhorfandajónir birtast bæði megin við örina og fella þær út',
  ],
  en: [
    'Only compounds in aqueous state (aq) are split into ions',
    'Strong acids: HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄',
    'Strong bases: NaOH, KOH, Ba(OH)₂, Ca(OH)₂',
    'Solids (s), liquids (l), and gases (g) are NOT split',
    'Weak acids (e.g., CH₃COOH) and weak bases are not split',
    'Spectator ions appear on both sides and are removed',
  ],
  pl: [
    'Tylko związki w roztworze wodnym (aq) są dzielone na jony',
    'Mocne kwasy: HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄',
    'Mocne zasady: NaOH, KOH, Ba(OH)₂, Ca(OH)₂',
    'Ciała stałe (s), ciecze (l) i gazy (g) NIE są dzielone',
    'Słabe kwasy (np. CH₃COOH) i słabe zasady nie są dzielone',
    'Jony widza pojawiają się po obu stronach i są usuwane',
  ],
};

export const IONIC_EQUATION_PROBLEMS: IonicEquationProblem[] = [
  // Easy - Precipitate formation
  {
    id: 'ie1',
    molecularEquation: 'NaCl(aq) + AgNO₃(aq) → NaNO₃(aq) + AgCl(s)',
    completeIonicEquation: 'Na⁺(aq) + Cl⁻(aq) + Ag⁺(aq) + NO₃⁻(aq) → Na⁺(aq) + NO₃⁻(aq) + AgCl(s)',
    spectatorIons: ['Na⁺', 'NO₃⁻'],
    netIonicEquation: 'Ag⁺(aq) + Cl⁻(aq) → AgCl(s)',
    explanation: 'Na⁺ og NO₃⁻ eru áhorfandajónir sem birtast bæði megin',
    explanationEn: 'Na⁺ and NO₃⁻ are spectator ions appearing on both sides',
    productType: 'precipitate',
    difficulty: 'easy',
  },
  {
    id: 'ie2',
    molecularEquation: 'Pb(NO₃)₂(aq) + 2KI(aq) → 2KNO₃(aq) + PbI₂(s)',
    completeIonicEquation: 'Pb²⁺(aq) + 2NO₃⁻(aq) + 2K⁺(aq) + 2I⁻(aq) → 2K⁺(aq) + 2NO₃⁻(aq) + PbI₂(s)',
    spectatorIons: ['K⁺', 'NO₃⁻'],
    netIonicEquation: 'Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)',
    explanation: 'Gula botnfallið (PbI₂) myndast úr blý- og joðíðjónum',
    explanationEn: 'The yellow precipitate (PbI₂) forms from lead and iodide ions',
    productType: 'precipitate',
    difficulty: 'easy',
  },

  // Easy - Neutralization (water formation)
  {
    id: 'ie3',
    molecularEquation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
    completeIonicEquation: 'H⁺(aq) + Cl⁻(aq) + Na⁺(aq) + OH⁻(aq) → Na⁺(aq) + Cl⁻(aq) + H₂O(l)',
    spectatorIons: ['Na⁺', 'Cl⁻'],
    netIonicEquation: 'H⁺(aq) + OH⁻(aq) → H₂O(l)',
    explanation: 'Klassísk hlutleysing - H⁺ og OH⁻ mynda vatn',
    explanationEn: 'Classic neutralization - H⁺ and OH⁻ form water',
    productType: 'water',
    difficulty: 'easy',
  },
  {
    id: 'ie4',
    molecularEquation: 'HNO₃(aq) + KOH(aq) → KNO₃(aq) + H₂O(l)',
    completeIonicEquation: 'H⁺(aq) + NO₃⁻(aq) + K⁺(aq) + OH⁻(aq) → K⁺(aq) + NO₃⁻(aq) + H₂O(l)',
    spectatorIons: ['K⁺', 'NO₃⁻'],
    netIonicEquation: 'H⁺(aq) + OH⁻(aq) → H₂O(l)',
    explanation: 'Allar sterkar sýru-basa hlutleysingar hafa sömu nettó jónajöfnu',
    explanationEn: 'All strong acid-base neutralizations have the same net ionic equation',
    productType: 'water',
    difficulty: 'easy',
  },

  // Medium - Gas formation
  {
    id: 'ie5',
    molecularEquation: 'Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g)',
    completeIonicEquation: '2Na⁺(aq) + CO₃²⁻(aq) + 2H⁺(aq) + 2Cl⁻(aq) → 2Na⁺(aq) + 2Cl⁻(aq) + H₂O(l) + CO₂(g)',
    spectatorIons: ['Na⁺', 'Cl⁻'],
    netIonicEquation: 'CO₃²⁻(aq) + 2H⁺(aq) → H₂O(l) + CO₂(g)',
    explanation: 'Karbónatjón hvarfast við sýru og gefur CO₂ gas',
    explanationEn: 'Carbonate ion reacts with acid and produces CO₂ gas',
    productType: 'gas',
    difficulty: 'medium',
  },
  {
    id: 'ie6',
    molecularEquation: 'BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s) + 2NaCl(aq)',
    completeIonicEquation: 'Ba²⁺(aq) + 2Cl⁻(aq) + 2Na⁺(aq) + SO₄²⁻(aq) → BaSO₄(s) + 2Na⁺(aq) + 2Cl⁻(aq)',
    spectatorIons: ['Na⁺', 'Cl⁻'],
    netIonicEquation: 'Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)',
    explanation: 'Baríumsúlfat er óleysanlegt hvítt botnfall',
    explanationEn: 'Barium sulfate is an insoluble white precipitate',
    productType: 'precipitate',
    difficulty: 'medium',
  },

  // Medium - More complex
  {
    id: 'ie7',
    molecularEquation: 'H₂SO₄(aq) + 2NaOH(aq) → Na₂SO₄(aq) + 2H₂O(l)',
    completeIonicEquation: '2H⁺(aq) + SO₄²⁻(aq) + 2Na⁺(aq) + 2OH⁻(aq) → 2Na⁺(aq) + SO₄²⁻(aq) + 2H₂O(l)',
    spectatorIons: ['Na⁺', 'SO₄²⁻'],
    netIonicEquation: 'H⁺(aq) + OH⁻(aq) → H₂O(l)',
    explanation: 'Þótt jafnan sé flóknari er nettó jónajafnan sama hlutleysingin',
    explanationEn: 'Though the equation is more complex, the net ionic is the same neutralization',
    productType: 'water',
    difficulty: 'medium',
  },
  {
    id: 'ie8',
    molecularEquation: 'CaCl₂(aq) + Na₂CO₃(aq) → CaCO₃(s) + 2NaCl(aq)',
    completeIonicEquation: 'Ca²⁺(aq) + 2Cl⁻(aq) + 2Na⁺(aq) + CO₃²⁻(aq) → CaCO₃(s) + 2Na⁺(aq) + 2Cl⁻(aq)',
    spectatorIons: ['Na⁺', 'Cl⁻'],
    netIonicEquation: 'Ca²⁺(aq) + CO₃²⁻(aq) → CaCO₃(s)',
    explanation: 'Kalsíumkarbónat (kalksteinn) er óleysanlegt',
    explanationEn: 'Calcium carbonate (limestone) is insoluble',
    productType: 'precipitate',
    difficulty: 'medium',
  },

  // Hard - Multiple products or complex ions
  {
    id: 'ie9',
    molecularEquation: 'FeCl₃(aq) + 3NaOH(aq) → Fe(OH)₃(s) + 3NaCl(aq)',
    completeIonicEquation: 'Fe³⁺(aq) + 3Cl⁻(aq) + 3Na⁺(aq) + 3OH⁻(aq) → Fe(OH)₃(s) + 3Na⁺(aq) + 3Cl⁻(aq)',
    spectatorIons: ['Na⁺', 'Cl⁻'],
    netIonicEquation: 'Fe³⁺(aq) + 3OH⁻(aq) → Fe(OH)₃(s)',
    explanation: 'Járnhýdroxíð er rauðbrúnt botnfall',
    explanationEn: 'Iron(III) hydroxide is a reddish-brown precipitate',
    productType: 'precipitate',
    difficulty: 'hard',
  },
  {
    id: 'ie10',
    molecularEquation: 'CuSO₄(aq) + 2NaOH(aq) → Cu(OH)₂(s) + Na₂SO₄(aq)',
    completeIonicEquation: 'Cu²⁺(aq) + SO₄²⁻(aq) + 2Na⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s) + 2Na⁺(aq) + SO₄²⁻(aq)',
    spectatorIons: ['Na⁺', 'SO₄²⁻'],
    netIonicEquation: 'Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s)',
    explanation: 'Koparhýdroxíð er blátt botnfall',
    explanationEn: 'Copper(II) hydroxide is a blue precipitate',
    productType: 'precipitate',
    difficulty: 'hard',
  },
];

// For the quiz: student needs to identify spectator ions
export interface SpectatorIonQuestion {
  id: string;
  completeIonicEquation: string;
  options: string[];
  correctSpectators: string[];
  explanation: string;
  explanationEn: string;
}

export const SPECTATOR_ION_QUESTIONS: SpectatorIonQuestion[] = [
  {
    id: 'siq1',
    completeIonicEquation: 'Na⁺ + Cl⁻ + Ag⁺ + NO₃⁻ → Na⁺ + NO₃⁻ + AgCl(s)',
    options: ['Na⁺', 'Cl⁻', 'Ag⁺', 'NO₃⁻'],
    correctSpectators: ['Na⁺', 'NO₃⁻'],
    explanation: 'Na⁺ og NO₃⁻ eru óbreytt - þau taka ekki þátt í hvarfinu',
    explanationEn: 'Na⁺ and NO₃⁻ are unchanged - they do not participate in the reaction',
  },
  {
    id: 'siq2',
    completeIonicEquation: 'H⁺ + Cl⁻ + Na⁺ + OH⁻ → Na⁺ + Cl⁻ + H₂O',
    options: ['H⁺', 'Cl⁻', 'Na⁺', 'OH⁻'],
    correctSpectators: ['Na⁺', 'Cl⁻'],
    explanation: 'H⁺ og OH⁻ hvarfast og mynda vatn; Na⁺ og Cl⁻ eru áhorfendur',
    explanationEn: 'H⁺ and OH⁻ react to form water; Na⁺ and Cl⁻ are spectators',
  },
];

export function getIonicEquationProblems(count?: number): IonicEquationProblem[] {
  const shuffled = [...IONIC_EQUATION_PROBLEMS].sort(() => Math.random() - 0.5);
  return count ? shuffled.slice(0, count) : shuffled;
}
