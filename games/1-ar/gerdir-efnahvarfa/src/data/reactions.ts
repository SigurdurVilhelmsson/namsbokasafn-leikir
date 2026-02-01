// Reaction Types data for chemistry education

export type ReactionType =
  | 'samsetting'    // Synthesis: A + B → AB
  | 'sundurlitur'   // Decomposition: AB → A + B
  | 'einföld'       // Single replacement: A + BC → AC + B
  | 'tvöföld'       // Double replacement: AB + CD → AD + CB
  | 'bruni';        // Combustion: CxHy + O₂ → CO₂ + H₂O

export interface ReactionExample {
  id: string;
  type: ReactionType;
  equation: string;
  balancedEquation: string;
  reactants: string[];
  products: string[];
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  hint: string;
  hintEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Reaction type definitions with descriptions
export const REACTION_TYPES: Record<ReactionType, {
  name: string;
  nameEn: string;
  formula: string;
  description: string;
  descriptionEn: string;
  color: string;
  emoji: string;
  pattern: string;
}> = {
  samsetting: {
    name: 'Samsetningarhvarf',
    nameEn: 'Synthesis',
    formula: 'A + B → AB',
    description: 'Tvö eða fleiri efni sameinast í eitt nýtt efni',
    descriptionEn: 'Two or more substances combine to form one new substance',
    color: '#22c55e', // green
    emoji: '🔗',
    pattern: 'A + B → AB',
  },
  sundurlitur: {
    name: 'Sundurliturarhvarf',
    nameEn: 'Decomposition',
    formula: 'AB → A + B',
    description: 'Eitt efni brotnar niður í tvö eða fleiri efni',
    descriptionEn: 'One substance breaks down into two or more substances',
    color: '#ef4444', // red
    emoji: '💥',
    pattern: 'AB → A + B',
  },
  einföld: {
    name: 'Einfalt víxlhvarf',
    nameEn: 'Single Replacement',
    formula: 'A + BC → AC + B',
    description: 'Eitt frumefni víxlar með frumefni í efnasambandi',
    descriptionEn: 'One element replaces another element in a compound',
    color: '#3b82f6', // blue
    emoji: '🔄',
    pattern: 'A + BC → AC + B',
  },
  tvöföld: {
    name: 'Tvöfalt víxlhvarf',
    nameEn: 'Double Replacement',
    formula: 'AB + CD → AD + CB',
    description: 'Jónir í tveimur efnasamböndum víxla hvor við aðra',
    descriptionEn: 'Ions in two compounds exchange with each other',
    color: '#8b5cf6', // purple
    emoji: '🔀',
    pattern: 'AB + CD → AD + CB',
  },
  bruni: {
    name: 'Brunahvarf',
    nameEn: 'Combustion',
    formula: 'CxHy + O₂ → CO₂ + H₂O',
    description: 'Efni hvarfast við súrefni og gefur frá sér hita og ljós',
    descriptionEn: 'Substance reacts with oxygen releasing heat and light',
    color: '#f59e0b', // amber
    emoji: '🔥',
    pattern: 'fuel + O₂ → CO₂ + H₂O',
  },
};

// Example reactions for each type
export const REACTION_EXAMPLES: ReactionExample[] = [
  // Synthesis (Samsetning) - Easy
  {
    id: 'syn1',
    type: 'samsetting',
    equation: '2H₂ + O₂ → 2H₂O',
    balancedEquation: '2H₂ + O₂ → 2H₂O',
    reactants: ['H₂', 'O₂'],
    products: ['H₂O'],
    name: 'Myndun vatns',
    nameEn: 'Formation of water',
    description: 'Vetni og súrefni sameinast og mynda vatn',
    descriptionEn: 'Hydrogen and oxygen combine to form water',
    hint: 'Tvö einföld efni sameinast í eitt efnasamband',
    hintEn: 'Two simple substances combine into one compound',
    difficulty: 'easy',
  },
  {
    id: 'syn2',
    type: 'samsetting',
    equation: '2Na + Cl₂ → 2NaCl',
    balancedEquation: '2Na + Cl₂ → 2NaCl',
    reactants: ['Na', 'Cl₂'],
    products: ['NaCl'],
    name: 'Myndun borðsalts',
    nameEn: 'Formation of table salt',
    description: 'Natríum og klór sameinast og mynda salt',
    descriptionEn: 'Sodium and chlorine combine to form salt',
    hint: 'Málmur + ómetallur → salt',
    hintEn: 'Metal + nonmetal → salt',
    difficulty: 'easy',
  },
  {
    id: 'syn3',
    type: 'samsetting',
    equation: '2Mg + O₂ → 2MgO',
    balancedEquation: '2Mg + O₂ → 2MgO',
    reactants: ['Mg', 'O₂'],
    products: ['MgO'],
    name: 'Bruni magnesíums',
    nameEn: 'Burning of magnesium',
    description: 'Magnesíum brennur í súrefni',
    descriptionEn: 'Magnesium burns in oxygen',
    hint: 'Frumefni sameinast við súrefni → oxíð',
    hintEn: 'Element combines with oxygen → oxide',
    difficulty: 'medium',
  },
  {
    id: 'syn4',
    type: 'samsetting',
    equation: 'CaO + H₂O → Ca(OH)₂',
    balancedEquation: 'CaO + H₂O → Ca(OH)₂',
    reactants: ['CaO', 'H₂O'],
    products: ['Ca(OH)₂'],
    name: 'Myndun slekkts kalks',
    nameEn: 'Formation of slaked lime',
    description: 'Kalk hvarfast við vatn',
    descriptionEn: 'Quickite reacts with water',
    hint: 'Oxíð + vatn → hvarf',
    hintEn: 'Oxide + water → base',
    difficulty: 'medium',
  },

  // Decomposition (Sundurlitur) - Easy
  {
    id: 'dec1',
    type: 'sundurlitur',
    equation: '2H₂O → 2H₂ + O₂',
    balancedEquation: '2H₂O → 2H₂ + O₂',
    reactants: ['H₂O'],
    products: ['H₂', 'O₂'],
    name: 'Rafgreining vatns',
    nameEn: 'Electrolysis of water',
    description: 'Vatn sundurgreinist í vetni og súrefni',
    descriptionEn: 'Water decomposes into hydrogen and oxygen',
    hint: 'Eitt efni brotnar niður í frumefni',
    hintEn: 'One substance breaks into elements',
    difficulty: 'easy',
  },
  {
    id: 'dec2',
    type: 'sundurlitur',
    equation: '2H₂O₂ → 2H₂O + O₂',
    balancedEquation: '2H₂O₂ → 2H₂O + O₂',
    reactants: ['H₂O₂'],
    products: ['H₂O', 'O₂'],
    name: 'Niðurbrot vetnisperoxíðs',
    nameEn: 'Decomposition of hydrogen peroxide',
    description: 'Vetnisperoxíð brotnar niður',
    descriptionEn: 'Hydrogen peroxide breaks down',
    hint: 'Eitt efnasamband gefur frá sér tvö efni',
    hintEn: 'One compound gives two products',
    difficulty: 'easy',
  },
  {
    id: 'dec3',
    type: 'sundurlitur',
    equation: 'CaCO₃ → Cite + CO₂',
    balancedEquation: 'CaCO₃ → CaO + CO₂',
    reactants: ['CaCO₃'],
    products: ['CaO', 'CO₂'],
    name: 'Niðurbrot kalksteins',
    nameEn: 'Decomposition of limestone',
    description: 'Kalksteinn brotnar niður við hita',
    descriptionEn: 'Limestone breaks down when heated',
    hint: 'Eitt efni → tvö minni efni',
    hintEn: 'One substance → two smaller substances',
    difficulty: 'medium',
  },
  {
    id: 'dec4',
    type: 'sundurlitur',
    equation: '2KClO₃ → 2KCl + 3O₂',
    balancedEquation: '2KClO₃ → 2KCl + 3O₂',
    reactants: ['KClO₃'],
    products: ['KCl', 'O₂'],
    name: 'Niðurbrot kalíumklórats',
    nameEn: 'Decomposition of potassium chlorate',
    description: 'Kalíumklórat gefur frá sér súrefni',
    descriptionEn: 'Potassium chlorate releases oxygen',
    hint: 'Eitt salt brotnar niður og gefur gas',
    hintEn: 'One salt breaks down releasing gas',
    difficulty: 'hard',
  },

  // Single Replacement (Einfalt víxlhvarf) - Medium
  {
    id: 'sr1',
    type: 'einföld',
    equation: 'Zn + CuSO₄ → ZnSO₄ + Cu',
    balancedEquation: 'Zn + CuSO₄ → ZnSO₄ + Cu',
    reactants: ['Zn', 'CuSO₄'],
    products: ['ZnSO₄', 'Cu'],
    name: 'Sink í koparsúlfati',
    nameEn: 'Zinc in copper sulfate',
    description: 'Sink víxlar við kopar',
    descriptionEn: 'Zinc replaces copper',
    hint: 'Eitt frumefni þrengir öðru frumefni út úr sambandi',
    hintEn: 'One element pushes another out of a compound',
    difficulty: 'easy',
  },
  {
    id: 'sr2',
    type: 'einföld',
    equation: 'Fe + CuSO₄ → FeSO₄ + Cu',
    balancedEquation: 'Fe + CuSO₄ → FeSO₄ + Cu',
    reactants: ['Fe', 'CuSO₄'],
    products: ['FeSO₄', 'Cu'],
    name: 'Járn í koparsúlfati',
    nameEn: 'Iron in copper sulfate',
    description: 'Járn víxlar við kopar',
    descriptionEn: 'Iron replaces copper',
    hint: 'Málmur + salt → nýtt salt + annar málmur',
    hintEn: 'Metal + salt → new salt + different metal',
    difficulty: 'easy',
  },
  {
    id: 'sr3',
    type: 'einföld',
    equation: '2Na + 2H₂O → 2NaOH + H₂',
    balancedEquation: '2Na + 2H₂O → 2NaOH + H₂',
    reactants: ['Na', 'H₂O'],
    products: ['NaOH', 'H₂'],
    name: 'Natríum í vatni',
    nameEn: 'Sodium in water',
    description: 'Natríum víxlar við vetni í vatni',
    descriptionEn: 'Sodium replaces hydrogen in water',
    hint: 'Virkt málmur víxlar við H í vatni',
    hintEn: 'Active metal replaces H in water',
    difficulty: 'medium',
  },
  {
    id: 'sr4',
    type: 'einföld',
    equation: 'Mg + 2HCl → MgCl₂ + H₂',
    balancedEquation: 'Mg + 2HCl → MgCl₂ + H₂',
    reactants: ['Mg', 'HCl'],
    products: ['MgCl₂', 'H₂'],
    name: 'Magnesíum í saltsýru',
    nameEn: 'Magnesium in hydrochloric acid',
    description: 'Magnesíum víxlar við vetni í sýru',
    descriptionEn: 'Magnesium replaces hydrogen in acid',
    hint: 'Málmur + sýra → gas + salt',
    hintEn: 'Metal + acid → gas + salt',
    difficulty: 'medium',
  },

  // Double Replacement (Tvöfalt víxlhvarf) - Medium/Hard
  {
    id: 'dr1',
    type: 'tvöföld',
    equation: 'NaCl + AgNO₃ → NaNO₃ + AgCl',
    balancedEquation: 'NaCl + AgNO₃ → NaNO₃ + AgCl',
    reactants: ['NaCl', 'AgNO₃'],
    products: ['NaNO₃', 'AgCl'],
    name: 'Myndun silfurklóríðs',
    nameEn: 'Formation of silver chloride',
    description: 'Tvö sölt víxla jónum og mynda botnfall',
    descriptionEn: 'Two salts exchange ions and form precipitate',
    hint: 'Tvö sölt → jónir skipta um maka',
    hintEn: 'Two salts → ions swap partners',
    difficulty: 'easy',
  },
  {
    id: 'dr2',
    type: 'tvöföld',
    equation: 'HCl + NaOH → NaCl + H₂O',
    balancedEquation: 'HCl + NaOH → NaCl + H₂O',
    reactants: ['HCl', 'NaOH'],
    products: ['NaCl', 'H₂O'],
    name: 'Hlutleysing',
    nameEn: 'Neutralization',
    description: 'Sýra og basi mynda salt og vatn',
    descriptionEn: 'Acid and base form salt and water',
    hint: 'Sýra + basi → salt + vatn (klassískt tvöfalt víxlhvarf)',
    hintEn: 'Acid + base → salt + water (classic double replacement)',
    difficulty: 'easy',
  },
  {
    id: 'dr3',
    type: 'tvöföld',
    equation: 'BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl',
    balancedEquation: 'BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl',
    reactants: ['BaCl₂', 'Na₂SO₄'],
    products: ['BaSO₄', 'NaCl'],
    name: 'Myndun baríumsúlfats',
    nameEn: 'Formation of barium sulfate',
    description: 'Tvö sölt víxla og mynda hvítt botnfall',
    descriptionEn: 'Two salts exchange and form white precipitate',
    hint: 'AB + CD → AD + CB (jónir víxla)',
    hintEn: 'AB + CD → AD + CB (ions exchange)',
    difficulty: 'medium',
  },
  {
    id: 'dr4',
    type: 'tvöföld',
    equation: 'Pb(NO₃)₂ + 2KI → PbI₂ + 2KNO₃',
    balancedEquation: 'Pb(NO₃)₂ + 2KI → PbI₂ + 2KNO₃',
    reactants: ['Pb(NO₃)₂', 'KI'],
    products: ['PbI₂', 'KNO₃'],
    name: 'Myndun blýjoðíðs',
    nameEn: 'Formation of lead iodide',
    description: 'Gult botnfall myndast',
    descriptionEn: 'Yellow precipitate forms',
    hint: 'Litað botnfall gefur til kynna tvöfalt víxlhvarf',
    hintEn: 'Colored precipitate indicates double replacement',
    difficulty: 'hard',
  },

  // Combustion (Brunahvarf) - Easy/Medium
  {
    id: 'comb1',
    type: 'bruni',
    equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
    balancedEquation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
    reactants: ['CH₄', 'O₂'],
    products: ['CO₂', 'H₂O'],
    name: 'Bruni metans',
    nameEn: 'Combustion of methane',
    description: 'Methan (jarðgas) brennur',
    descriptionEn: 'Methane (natural gas) burns',
    hint: 'Kolvetni + súrefni → CO₂ + vatn + orka',
    hintEn: 'Hydrocarbon + oxygen → CO₂ + water + energy',
    difficulty: 'easy',
  },
  {
    id: 'comb2',
    type: 'bruni',
    equation: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O',
    balancedEquation: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O',
    reactants: ['C₃H₈', 'O₂'],
    products: ['CO₂', 'H₂O'],
    name: 'Bruni própans',
    nameEn: 'Combustion of propane',
    description: 'Própan (grillgas) brennur',
    descriptionEn: 'Propane (grill gas) burns',
    hint: 'Eldsneyti brennur → CO₂ og vatn',
    hintEn: 'Fuel burns → CO₂ and water',
    difficulty: 'easy',
  },
  {
    id: 'comb3',
    type: 'bruni',
    equation: '2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O',
    balancedEquation: '2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O',
    reactants: ['C₈H₁₈', 'O₂'],
    products: ['CO₂', 'H₂O'],
    name: 'Bruni oktans (bensíns)',
    nameEn: 'Combustion of octane (gasoline)',
    description: 'Bensín brennur í bílvél',
    descriptionEn: 'Gasoline burns in car engine',
    hint: 'Stærra kolvetni krefst meira súrefnis',
    hintEn: 'Larger hydrocarbon needs more oxygen',
    difficulty: 'medium',
  },
  {
    id: 'comb4',
    type: 'bruni',
    equation: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O',
    balancedEquation: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O',
    reactants: ['C₆H₁₂O₆', 'O₂'],
    products: ['CO₂', 'H₂O'],
    name: 'Öndun (bruni glúkósa)',
    nameEn: 'Respiration (combustion of glucose)',
    description: 'Líkaminn "brennir" sykur',
    descriptionEn: 'Body "burns" sugar',
    hint: 'Lífrænt efni + O₂ → CO₂ + H₂O (öndun er hæg bruni)',
    hintEn: 'Organic matter + O₂ → CO₂ + H₂O (respiration is slow combustion)',
    difficulty: 'medium',
  },
];

// Get reactions by type
export function getReactionsByType(type: ReactionType): ReactionExample[] {
  return REACTION_EXAMPLES.filter(r => r.type === type);
}

// Get reactions by difficulty
export function getReactionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): ReactionExample[] {
  return REACTION_EXAMPLES.filter(r => r.difficulty === difficulty);
}

// Shuffle array helper
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get random reactions for a quiz
export function getRandomReactions(count: number): ReactionExample[] {
  return shuffleArray(REACTION_EXAMPLES).slice(0, count);
}
