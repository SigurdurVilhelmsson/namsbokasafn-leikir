// Driving Forces data for double replacement reactions
// A double replacement reaction proceeds when it produces:
// 1. A precipitate (solid forms)
// 2. A gas (bubbles)
// 3. Water (weak electrolyte)

export type DrivingForce = 'precipitate' | 'gas' | 'water' | 'none';

export interface DrivingForceQuestion {
  id: string;
  reactants: string;
  products: string;
  equation: string;
  drivingForce: DrivingForce;
  precipitateFormula?: string;
  gasFormula?: string;
  explanation: string;
  explanationEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Common solubility rules for predicting precipitates
export const SOLUBILITY_RULES = {
  is: [
    'Öll natríum (Na⁺), kalíum (K⁺) og ammóníum (NH₄⁺) sölt eru leysanleg',
    'Öll nítröt (NO₃⁻) og asetöt (CH₃COO⁻) eru leysanleg',
    'Flest klóríð (Cl⁻), brómíð (Br⁻) og joðíð (I⁻) eru leysanleg, nema Ag⁺, Pb²⁺, Hg₂²⁺',
    'Flest súlfat (SO₄²⁻) eru leysanleg, nema Ba²⁺, Pb²⁺, Ca²⁺',
    'Flest hýdroxíð (OH⁻) eru óleysanleg, nema alkalímálmar og Ba²⁺',
    'Öll karbónöt (CO₃²⁻), fosfat (PO₄³⁻) og súlfíð (S²⁻) eru óleysanleg, nema alkalímálmar og NH₄⁺',
  ],
  en: [
    'All sodium (Na⁺), potassium (K⁺), and ammonium (NH₄⁺) salts are soluble',
    'All nitrates (NO₃⁻) and acetates (CH₃COO⁻) are soluble',
    'Most chlorides (Cl⁻), bromides (Br⁻), and iodides (I⁻) are soluble, except Ag⁺, Pb²⁺, Hg₂²⁺',
    'Most sulfates (SO₄²⁻) are soluble, except Ba²⁺, Pb²⁺, Ca²⁺',
    'Most hydroxides (OH⁻) are insoluble, except alkali metals and Ba²⁺',
    'All carbonates (CO₃²⁻), phosphates (PO₄³⁻), and sulfides (S²⁻) are insoluble, except alkali metals and NH₄⁺',
  ],
  pl: [
    'Wszystkie sole sodu (Na⁺), potasu (K⁺) i amonu (NH₄⁺) są rozpuszczalne',
    'Wszystkie azotany (NO₃⁻) i octany (CH₃COO⁻) są rozpuszczalne',
    'Większość chlorków (Cl⁻), bromków (Br⁻) i jodków (I⁻) jest rozpuszczalna, z wyjątkiem Ag⁺, Pb²⁺, Hg₂²⁺',
    'Większość siarczanów (SO₄²⁻) jest rozpuszczalna, z wyjątkiem Ba²⁺, Pb²⁺, Ca²⁺',
    'Większość wodorotlenków (OH⁻) jest nierozpuszczalna, z wyjątkiem metali alkalicznych i Ba²⁺',
    'Wszystkie węglany (CO₃²⁻), fosforany (PO₄³⁻) i siarczki (S²⁻) są nierozpuszczalne, z wyjątkiem metali alkalicznych i NH₄⁺',
  ],
};

export const DRIVING_FORCE_INFO = {
  precipitate: {
    name: 'Botnfall',
    nameEn: 'Precipitate',
    namePl: 'Osad',
    description: 'Fast efni myndast úr lausn',
    descriptionEn: 'Solid forms from solution',
    descriptionPl: 'Ciało stałe tworzy się z roztworu',
    emoji: '🧊',
    symbol: '(s)',
    color: '#6366f1', // indigo
  },
  gas: {
    name: 'Gas',
    nameEn: 'Gas',
    namePl: 'Gaz',
    description: 'Gas myndast og fer úr lausninni',
    descriptionEn: 'Gas forms and escapes solution',
    descriptionPl: 'Gaz powstaje i ucieka z roztworu',
    emoji: '💨',
    symbol: '(g)',
    color: '#22c55e', // green
  },
  water: {
    name: 'Vatn',
    nameEn: 'Water',
    namePl: 'Woda',
    description: 'Vatn (veikur rafleysi) myndast',
    descriptionEn: 'Water (weak electrolyte) forms',
    descriptionPl: 'Woda (słaby elektrolit) powstaje',
    emoji: '💧',
    symbol: 'H₂O',
    color: '#0ea5e9', // sky
  },
  none: {
    name: 'Ekkert hvarf',
    nameEn: 'No Reaction',
    namePl: 'Brak reakcji',
    description: 'Enginn drifkraftur - hvarf á sér ekki stað',
    descriptionEn: 'No driving force - reaction does not occur',
    descriptionPl: 'Brak siły napędowej - reakcja nie zachodzi',
    emoji: '❌',
    symbol: 'NR',
    color: '#6b7280', // gray
  },
};

export const DRIVING_FORCE_QUESTIONS: DrivingForceQuestion[] = [
  // Precipitate forming reactions
  {
    id: 'df1',
    reactants: 'NaCl(aq) + AgNO₃(aq)',
    products: 'NaNO₃(aq) + AgCl(s)',
    equation: 'NaCl(aq) + AgNO₃(aq) → NaNO₃(aq) + AgCl(s)',
    drivingForce: 'precipitate',
    precipitateFormula: 'AgCl',
    explanation: 'Silfurklóríð (AgCl) er óleysanlegt og myndar hvítt botnfall',
    explanationEn: 'Silver chloride (AgCl) is insoluble and forms a white precipitate',
    difficulty: 'easy',
  },
  {
    id: 'df2',
    reactants: 'Pb(NO₃)₂(aq) + 2KI(aq)',
    products: '2KNO₃(aq) + PbI₂(s)',
    equation: 'Pb(NO₃)₂(aq) + 2KI(aq) → 2KNO₃(aq) + PbI₂(s)',
    drivingForce: 'precipitate',
    precipitateFormula: 'PbI₂',
    explanation: 'Blýjoðíð (PbI₂) er óleysanlegt og myndar gult botnfall',
    explanationEn: 'Lead iodide (PbI₂) is insoluble and forms a yellow precipitate',
    difficulty: 'easy',
  },
  {
    id: 'df3',
    reactants: 'BaCl₂(aq) + Na₂SO₄(aq)',
    products: '2NaCl(aq) + BaSO₄(s)',
    equation: 'BaCl₂(aq) + Na₂SO₄(aq) → 2NaCl(aq) + BaSO₄(s)',
    drivingForce: 'precipitate',
    precipitateFormula: 'BaSO₄',
    explanation: 'Baríumsúlfat (BaSO₄) er óleysanlegt og myndar hvítt botnfall',
    explanationEn: 'Barium sulfate (BaSO₄) is insoluble and forms a white precipitate',
    difficulty: 'medium',
  },
  {
    id: 'df4',
    reactants: 'CaCl₂(aq) + Na₂CO₃(aq)',
    products: '2NaCl(aq) + CaCO₃(s)',
    equation: 'CaCl₂(aq) + Na₂CO₃(aq) → 2NaCl(aq) + CaCO₃(s)',
    drivingForce: 'precipitate',
    precipitateFormula: 'CaCO₃',
    explanation: 'Kalsíumkarbónat (CaCO₃) er óleysanlegt og myndar hvítt botnfall',
    explanationEn: 'Calcium carbonate (CaCO₃) is insoluble and forms a white precipitate',
    difficulty: 'medium',
  },

  // Gas forming reactions
  {
    id: 'df5',
    reactants: 'Na₂CO₃(aq) + 2HCl(aq)',
    products: '2NaCl(aq) + H₂O(l) + CO₂(g)',
    equation: 'Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g)',
    drivingForce: 'gas',
    gasFormula: 'CO₂',
    explanation: 'Koltvísýringur (CO₂) myndast og fer úr lausninni sem loftbólur',
    explanationEn: 'Carbon dioxide (CO₂) forms and escapes as bubbles',
    difficulty: 'easy',
  },
  {
    id: 'df6',
    reactants: 'Na₂S(aq) + 2HCl(aq)',
    products: '2NaCl(aq) + H₂S(g)',
    equation: 'Na₂S(aq) + 2HCl(aq) → 2NaCl(aq) + H₂S(g)',
    drivingForce: 'gas',
    gasFormula: 'H₂S',
    explanation: 'Brennisteinsvetni (H₂S) myndast sem gas með lykt af rotnum eggjum',
    explanationEn: 'Hydrogen sulfide (H₂S) forms as a gas with rotten egg smell',
    difficulty: 'medium',
  },
  {
    id: 'df7',
    reactants: 'NH₄Cl(aq) + NaOH(aq)',
    products: 'NaCl(aq) + H₂O(l) + NH₃(g)',
    equation: 'NH₄Cl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l) + NH₃(g)',
    drivingForce: 'gas',
    gasFormula: 'NH₃',
    explanation: 'Ammóníak (NH₃) myndast sem gas með beittri lykt',
    explanationEn: 'Ammonia (NH₃) forms as a gas with a sharp odor',
    difficulty: 'hard',
  },

  // Water forming reactions (neutralization)
  {
    id: 'df8',
    reactants: 'HCl(aq) + NaOH(aq)',
    products: 'NaCl(aq) + H₂O(l)',
    equation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
    drivingForce: 'water',
    explanation: 'Sýru-basahvarf myndar vatn sem er veikur rafleysi',
    explanationEn: 'Acid-base reaction forms water, a weak electrolyte',
    difficulty: 'easy',
  },
  {
    id: 'df9',
    reactants: 'H₂SO₄(aq) + 2KOH(aq)',
    products: 'K₂SO₄(aq) + 2H₂O(l)',
    equation: 'H₂SO₄(aq) + 2KOH(aq) → K₂SO₄(aq) + 2H₂O(l)',
    drivingForce: 'water',
    explanation: 'Hlutleysing á sér stað þar sem H⁺ og OH⁻ mynda vatn',
    explanationEn: 'Neutralization occurs as H⁺ and OH⁻ form water',
    difficulty: 'medium',
  },
  {
    id: 'df10',
    reactants: 'HNO₃(aq) + NH₃(aq)',
    products: 'NH₄NO₃(aq)',
    equation: 'HNO₃(aq) + NH₃(aq) → NH₄NO₃(aq)',
    drivingForce: 'water', // Well, it's forming a salt - but it's acid-base
    explanation: 'Sýra hvarfast við basa og myndar salt (veikt samband við vatn)',
    explanationEn: 'Acid reacts with base to form salt (weak bond with water)',
    difficulty: 'hard',
  },

  // No reaction cases
  {
    id: 'df11',
    reactants: 'NaCl(aq) + KNO₃(aq)',
    products: 'NaNO₃(aq) + KCl(aq)',
    equation: 'NaCl(aq) + KNO₃(aq) → NR',
    drivingForce: 'none',
    explanation: 'Öll hugsanleg myndefni eru leysanleg - enginn drifkraftur',
    explanationEn: 'All possible products are soluble - no driving force',
    difficulty: 'easy',
  },
  {
    id: 'df12',
    reactants: 'Na₂SO₄(aq) + K₂CO₃(aq)',
    products: '?',
    equation: 'Na₂SO₄(aq) + K₂CO₃(aq) → NR',
    drivingForce: 'none',
    explanation: 'Öll natríum- og kalíumsölt eru leysanleg - ekkert hvarf',
    explanationEn: 'All sodium and potassium salts are soluble - no reaction',
    difficulty: 'medium',
  },
  {
    id: 'df13',
    reactants: 'NaNO₃(aq) + KCl(aq)',
    products: '?',
    equation: 'NaNO₃(aq) + KCl(aq) → NR',
    drivingForce: 'none',
    explanation: 'Nítröt og klóríð alkalímálma eru öll leysanleg',
    explanationEn: 'Nitrates and chlorides of alkali metals are all soluble',
    difficulty: 'medium',
  },

  // Additional precipitate reactions
  {
    id: 'df14',
    reactants: 'FeCl₃(aq) + 3NaOH(aq)',
    products: '3NaCl(aq) + Fe(OH)₃(s)',
    equation: 'FeCl₃(aq) + 3NaOH(aq) → 3NaCl(aq) + Fe(OH)₃(s)',
    drivingForce: 'precipitate',
    precipitateFormula: 'Fe(OH)₃',
    explanation: 'Járnhýdroxíð (Fe(OH)₃) er óleysanlegt og myndar rauðbrúnt botnfall',
    explanationEn: 'Iron(III) hydroxide (Fe(OH)₃) is insoluble and forms a reddish-brown precipitate',
    difficulty: 'hard',
  },
  {
    id: 'df15',
    reactants: 'CuSO₄(aq) + 2NaOH(aq)',
    products: 'Na₂SO₄(aq) + Cu(OH)₂(s)',
    equation: 'CuSO₄(aq) + 2NaOH(aq) → Na₂SO₄(aq) + Cu(OH)₂(s)',
    drivingForce: 'precipitate',
    precipitateFormula: 'Cu(OH)₂',
    explanation: 'Koparhýdroxíð (Cu(OH)₂) er óleysanlegt og myndar blátt botnfall',
    explanationEn: 'Copper(II) hydroxide (Cu(OH)₂) is insoluble and forms a blue precipitate',
    difficulty: 'hard',
  },
];

export function getDrivingForceQuestions(count?: number): DrivingForceQuestion[] {
  const shuffled = [...DRIVING_FORCE_QUESTIONS].sort(() => Math.random() - 0.5);
  return count ? shuffled.slice(0, count) : shuffled;
}
