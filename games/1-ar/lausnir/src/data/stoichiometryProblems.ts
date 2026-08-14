// Solution stoichiometry problems for Level 6 (Stökefnafræði lausna)

export interface StoichiometryProblem {
  id: string;
  type: 'neutralization' | 'precipitation' | 'dilution_stoich' | 'mass_volume';
  difficulty: 'easy' | 'medium' | 'hard';

  // Problem setup
  equation: string;
  equationBalanced: string;

  // Given values
  reactant1: {
    formula: string;
    name: string;
    nameEn: string;
    molarity?: number;  // M
    volume?: number;    // mL
    mass?: number;      // g
    molarMass?: number; // g/mol
  };
  reactant2: {
    formula: string;
    name: string;
    nameEn: string;
    molarity?: number;
    volume?: number;
    mass?: number;
    molarMass?: number;
    isExcess?: boolean;
  };
  product?: {
    formula: string;
    name: string;
    nameEn: string;
    molarMass: number;
  };

  // What to find
  findWhat: 'volume' | 'mass' | 'molarity' | 'moles';

  // Question text
  question: string;
  questionEn: string;
  questionPl: string;

  // Answer
  answer: number;
  unit: string;
  tolerance: number; // Acceptable error margin

  // Solution steps
  steps: {
    step: string;
    stepEn: string;
    calculation?: string;
  }[];

  // Hints
  hints: string[];
  hintsEn: string[];
}

export const STOICHIOMETRY_PROBLEMS: StoichiometryProblem[] = [
  // Neutralization problems
  {
    id: 'stoich1',
    type: 'neutralization',
    difficulty: 'easy',
    equation: 'NaOH + HCl → NaCl + H₂O',
    equationBalanced: 'NaOH + HCl → NaCl + H₂O',
    reactant1: {
      formula: 'HCl',
      name: 'Saltsýra',
      nameEn: 'Hydrochloric acid',
      molarity: 0.150,
      volume: 25.0,
    },
    reactant2: {
      formula: 'NaOH',
      name: 'Natríumhýdroxíð',
      nameEn: 'Sodium hydroxide',
      molarity: 0.200,
    },
    findWhat: 'volume',
    question: 'Hversu mörg mL af 0.200 M NaOH þarf til að hlutleysa 25.0 mL af 0.150 M HCl?',
    questionEn: 'How many mL of 0.200 M NaOH are needed to neutralize 25.0 mL of 0.150 M HCl?',
    questionPl: 'Ile mL 0.200 M NaOH potrzeba do zobojętnienia 25.0 mL 0.150 M HCl?',
    answer: 18.75,
    unit: 'mL',
    tolerance: 0.1,
    steps: [
      {
        step: '1. Finndu mól HCl: n = M × V',
        stepEn: '1. Find moles of HCl: n = M × V',
        calculation: 'n(HCl) = 0.150 M × 0.0250 L = 0.00375 mól',
      },
      {
        step: '2. Notaðu hlutfall úr jöfnu: 1:1',
        stepEn: '2. Use ratio from equation: 1:1',
        calculation: 'n(NaOH) = n(HCl) = 0.00375 mól',
      },
      {
        step: '3. Finndu rúmmál NaOH: V = n/M',
        stepEn: '3. Find volume of NaOH: V = n/M',
        calculation: 'V = 0.00375 mól / 0.200 M = 0.01875 L = 18.75 mL',
      },
    ],
    hints: [
      'Byrjaðu á að reikna mól af sýru: mól = M × V',
      'Hlutfallið í jöfnunni er 1:1 svo mól NaOH = mól HCl',
      'Notaðu V = n/M til að finna rúmmál',
    ],
    hintsEn: [
      'Start by calculating moles of acid: mol = M × V',
      'The ratio in the equation is 1:1 so mol NaOH = mol HCl',
      'Use V = n/M to find volume',
    ],
  },
  {
    id: 'stoich2',
    type: 'neutralization',
    difficulty: 'easy',
    equation: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O',
    equationBalanced: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O',
    reactant1: {
      formula: 'H₂SO₄',
      name: 'Brennisteinssýra',
      nameEn: 'Sulfuric acid',
      molarity: 0.100,
      volume: 20.0,
    },
    reactant2: {
      formula: 'NaOH',
      name: 'Natríumhýdroxíð',
      nameEn: 'Sodium hydroxide',
      molarity: 0.100,
    },
    findWhat: 'volume',
    question: 'Hversu mörg mL af 0.100 M NaOH þarf til að hlutleysa 20.0 mL af 0.100 M H₂SO₄?',
    questionEn: 'How many mL of 0.100 M NaOH are needed to neutralize 20.0 mL of 0.100 M H₂SO₄?',
    questionPl: 'Ile mL 0.100 M NaOH potrzeba do zobojętnienia 20.0 mL 0.100 M H₂SO₄?',
    answer: 40.0,
    unit: 'mL',
    tolerance: 0.1,
    steps: [
      {
        step: '1. Finndu mól H₂SO₄',
        stepEn: '1. Find moles of H₂SO₄',
        calculation: 'n(H₂SO₄) = 0.100 M × 0.0200 L = 0.00200 mól',
      },
      {
        step: '2. Notaðu hlutfall 1:2 úr jöfnu',
        stepEn: '2. Use 1:2 ratio from equation',
        calculation: 'n(NaOH) = 2 × n(H₂SO₄) = 2 × 0.00200 = 0.00400 mól',
      },
      {
        step: '3. Finndu rúmmál NaOH',
        stepEn: '3. Find volume of NaOH',
        calculation: 'V = 0.00400 mól / 0.100 M = 0.0400 L = 40.0 mL',
      },
    ],
    hints: [
      'Athugaðu stuðlana í jöfnunni: 1 H₂SO₄ + 2 NaOH',
      'Þú þarft tvöfalt meira mól af NaOH',
      'V = n/M gefur rúmmálið',
    ],
    hintsEn: [
      'Check the coefficients: 1 H₂SO₄ + 2 NaOH',
      'You need twice as many moles of NaOH',
      'V = n/M gives the volume',
    ],
  },
  // Precipitation problems
  {
    id: 'stoich3',
    type: 'precipitation',
    difficulty: 'medium',
    equation: 'AgNO₃ + NaCl → AgCl + NaNO₃',
    equationBalanced: 'AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)',
    reactant1: {
      formula: 'AgNO₃',
      name: 'Silfurnítrat',
      nameEn: 'Silver nitrate',
      molarity: 0.100,
      volume: 50.0,
    },
    reactant2: {
      formula: 'NaCl',
      name: 'Natríumklóríð',
      nameEn: 'Sodium chloride',
      isExcess: true,
    },
    product: {
      formula: 'AgCl',
      name: 'Silfurklóríð',
      nameEn: 'Silver chloride',
      molarMass: 143.32,
    },
    findWhat: 'mass',
    question: 'Hvaða massi af AgCl fellur út þegar 50.0 mL af 0.100 M AgNO₃ blandast við umframmagn af NaCl?',
    questionEn: 'What mass of AgCl precipitates when 50.0 mL of 0.100 M AgNO₃ mixes with excess NaCl?',
    questionPl: 'Jaka masa AgCl wytrąca się gdy 50.0 mL 0.100 M AgNO₃ miesza się z nadmiarem NaCl?',
    answer: 0.717,
    unit: 'g',
    tolerance: 0.01,
    steps: [
      {
        step: '1. Finndu mól AgNO₃',
        stepEn: '1. Find moles of AgNO₃',
        calculation: 'n(AgNO₃) = 0.100 M × 0.0500 L = 0.00500 mól',
      },
      {
        step: '2. Hlutfall 1:1 gefur mól AgCl',
        stepEn: '2. 1:1 ratio gives moles of AgCl',
        calculation: 'n(AgCl) = n(AgNO₃) = 0.00500 mól',
      },
      {
        step: '3. Reiknaðu massa: m = n × M',
        stepEn: '3. Calculate mass: m = n × M',
        calculation: 'm(AgCl) = 0.00500 mól × 143.32 g/mol = 0.717 g',
      },
    ],
    hints: [
      'Byrjaðu á að finna mól af AgNO₃',
      'Umframmagn þýðir að AgNO₃ er takmörkunarefni',
      'Massi = mól × mólmassi (143.32 g/mol fyrir AgCl)',
    ],
    hintsEn: [
      'Start by finding moles of AgNO₃',
      'Excess means AgNO₃ is the limiting reagent',
      'Mass = mol × molar mass (143.32 g/mol for AgCl)',
    ],
  },
  {
    id: 'stoich4',
    type: 'precipitation',
    difficulty: 'medium',
    equation: 'Pb(NO₃)₂ + 2KI → PbI₂ + 2KNO₃',
    equationBalanced: 'Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s) + 2KNO₃(aq)',
    reactant1: {
      formula: 'Pb(NO₃)₂',
      name: 'Blýnítrat',
      nameEn: 'Lead(II) nitrate',
      molarity: 0.0500,
      volume: 100.0,
    },
    reactant2: {
      formula: 'KI',
      name: 'Kalíumjóðíð',
      nameEn: 'Potassium iodide',
      isExcess: true,
    },
    product: {
      formula: 'PbI₂',
      name: 'Blýjóðíð',
      nameEn: 'Lead(II) iodide',
      molarMass: 461.0,
    },
    findWhat: 'mass',
    question: 'Hvaða massi af gulum PbI₂ fellur út þegar 100.0 mL af 0.0500 M Pb(NO₃)₂ hvarfast við umframmagn af KI?',
    questionEn: 'What mass of yellow PbI₂ precipitates when 100.0 mL of 0.0500 M Pb(NO₃)₂ reacts with excess KI?',
    questionPl: 'Jaka masa żółtego PbI₂ wytrąca się gdy 100.0 mL 0.0500 M Pb(NO₃)₂ reaguje z nadmiarem KI?',
    answer: 2.31,
    unit: 'g',
    tolerance: 0.05,
    steps: [
      {
        step: '1. Finndu mól Pb(NO₃)₂',
        stepEn: '1. Find moles of Pb(NO₃)₂',
        calculation: 'n = 0.0500 M × 0.100 L = 0.00500 mól',
      },
      {
        step: '2. Hlutfall 1:1 fyrir Pb(NO₃)₂ og PbI₂',
        stepEn: '2. 1:1 ratio for Pb(NO₃)₂ and PbI₂',
        calculation: 'n(PbI₂) = 0.00500 mól',
      },
      {
        step: '3. Massi PbI₂',
        stepEn: '3. Mass of PbI₂',
        calculation: 'm = 0.00500 mól × 461.0 g/mol = 2.31 g',
      },
    ],
    hints: [
      'Þetta er klassískt útfellingarverkefni',
      'Blý(II)nítrat er takmörkunarefni',
      'Mólmassi PbI₂ = 461.0 g/mol',
    ],
    hintsEn: [
      'This is a classic precipitation problem',
      'Lead(II) nitrate is the limiting reagent',
      'Molar mass PbI₂ = 461.0 g/mol',
    ],
  },
  {
    id: 'stoich5',
    type: 'neutralization',
    difficulty: 'medium',
    equation: '3NaOH + H₃PO₄ → Na₃PO₄ + 3H₂O',
    equationBalanced: '3NaOH + H₃PO₄ → Na₃PO₄ + 3H₂O',
    reactant1: {
      formula: 'H₃PO₄',
      name: 'Fosfórsýra',
      nameEn: 'Phosphoric acid',
      molarity: 0.0800,
      volume: 30.0,
    },
    reactant2: {
      formula: 'NaOH',
      name: 'Natríumhýdroxíð',
      nameEn: 'Sodium hydroxide',
      molarity: 0.120,
    },
    findWhat: 'volume',
    question: 'Hversu mörg mL af 0.120 M NaOH þarf til að fullkomlega hlutleysa 30.0 mL af 0.0800 M H₃PO₄?',
    questionEn: 'How many mL of 0.120 M NaOH are needed to completely neutralize 30.0 mL of 0.0800 M H₃PO₄?',
    questionPl: 'Ile mL 0.120 M NaOH potrzeba do całkowitego zobojętnienia 30.0 mL 0.0800 M H₃PO₄?',
    answer: 60.0,
    unit: 'mL',
    tolerance: 0.5,
    steps: [
      {
        step: '1. Finndu mól H₃PO₄',
        stepEn: '1. Find moles of H₃PO₄',
        calculation: 'n(H₃PO₄) = 0.0800 M × 0.0300 L = 0.00240 mól',
      },
      {
        step: '2. Notaðu hlutfall 1:3',
        stepEn: '2. Use 1:3 ratio',
        calculation: 'n(NaOH) = 3 × 0.00240 = 0.00720 mól',
      },
      {
        step: '3. Finndu rúmmál',
        stepEn: '3. Find volume',
        calculation: 'V = 0.00720 / 0.120 = 0.0600 L = 60.0 mL',
      },
    ],
    hints: [
      'H₃PO₄ er þríprótónsýra og þarf 3 NaOH',
      'Stuðlar: 3 NaOH : 1 H₃PO₄',
      'Mundu að breyta mL í L þegar þú reiknar mól',
    ],
    hintsEn: [
      'H₃PO₄ is triprotic and needs 3 NaOH',
      'Coefficients: 3 NaOH : 1 H₃PO₄',
      'Remember to convert mL to L when calculating moles',
    ],
  },
  // Mass-volume problems
  {
    id: 'stoich6',
    type: 'mass_volume',
    difficulty: 'hard',
    equation: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂',
    equationBalanced: 'CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)',
    reactant1: {
      formula: 'CaCO₃',
      name: 'Kalsíumkarbónat',
      nameEn: 'Calcium carbonate',
      mass: 5.00,
      molarMass: 100.09,
    },
    reactant2: {
      formula: 'HCl',
      name: 'Saltsýra',
      nameEn: 'Hydrochloric acid',
      molarity: 0.500,
    },
    findWhat: 'volume',
    question: 'Hversu mörg mL af 0.500 M HCl þarf til að uppleysa 5.00 g af CaCO₃?',
    questionEn: 'How many mL of 0.500 M HCl are needed to dissolve 5.00 g of CaCO₃?',
    questionPl: 'Ile mL 0.500 M HCl potrzeba do rozpuszczenia 5.00 g CaCO₃?',
    answer: 200.0,
    unit: 'mL',
    tolerance: 2,
    steps: [
      {
        step: '1. Finndu mól CaCO₃',
        stepEn: '1. Find moles of CaCO₃',
        calculation: 'n = 5.00 g / 100.09 g/mol = 0.0500 mól',
      },
      {
        step: '2. Notaðu hlutfall 1:2',
        stepEn: '2. Use 1:2 ratio',
        calculation: 'n(HCl) = 2 × 0.0500 = 0.100 mól',
      },
      {
        step: '3. Finndu rúmmál HCl',
        stepEn: '3. Find volume of HCl',
        calculation: 'V = 0.100 / 0.500 = 0.200 L = 200 mL',
      },
    ],
    hints: [
      'Byrjaðu á að breyta grömm í mól: n = m/M',
      'Hvert mól CaCO₃ þarf 2 mól HCl',
      'V = n/M gefur rúmmálið í lítrum',
    ],
    hintsEn: [
      'Start by converting grams to moles: n = m/M',
      'Each mole of CaCO₃ needs 2 moles of HCl',
      'V = n/M gives volume in liters',
    ],
  },
  {
    id: 'stoich7',
    type: 'precipitation',
    difficulty: 'hard',
    equation: 'BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl',
    equationBalanced: 'BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s) + 2NaCl(aq)',
    reactant1: {
      formula: 'BaCl₂',
      name: 'Baríumklóríð',
      nameEn: 'Barium chloride',
      molarity: 0.150,
      volume: 75.0,
    },
    reactant2: {
      formula: 'Na₂SO₄',
      name: 'Natríumsúlfat',
      nameEn: 'Sodium sulfate',
      molarity: 0.200,
      volume: 50.0,
    },
    product: {
      formula: 'BaSO₄',
      name: 'Baríumsúlfat',
      nameEn: 'Barium sulfate',
      molarMass: 233.38,
    },
    findWhat: 'mass',
    question: 'Hvaða massi af BaSO₄ fellur út þegar 75.0 mL af 0.150 M BaCl₂ blandast við 50.0 mL af 0.200 M Na₂SO₄?',
    questionEn: 'What mass of BaSO₄ precipitates when 75.0 mL of 0.150 M BaCl₂ mixes with 50.0 mL of 0.200 M Na₂SO₄?',
    questionPl: 'Jaka masa BaSO₄ wytrąca się gdy 75.0 mL 0.150 M BaCl₂ miesza się z 50.0 mL 0.200 M Na₂SO₄?',
    answer: 2.33,
    unit: 'g',
    tolerance: 0.05,
    steps: [
      {
        step: '1. Finndu mól beggja hvarfefna',
        stepEn: '1. Find moles of both reactants',
        calculation: 'n(BaCl₂) = 0.150 × 0.075 = 0.01125 mól\nn(Na₂SO₄) = 0.200 × 0.050 = 0.0100 mól',
      },
      {
        step: '2. Ákvarðaðu takmörkunarefni (1:1)',
        stepEn: '2. Determine limiting reagent (1:1)',
        calculation: 'Na₂SO₄ er takmörkunarefni (minna mól)',
      },
      {
        step: '3. Massi BaSO₄',
        stepEn: '3. Mass of BaSO₄',
        calculation: 'm = 0.0100 mól × 233.38 g/mol = 2.33 g',
      },
    ],
    hints: [
      'Reiknaðu mól beggja hvarfefna',
      'Hvarfefnið með færri mól er takmörkunarefnið',
      'Notaðu mól takmörkunarefnis til að finna massa',
    ],
    hintsEn: [
      'Calculate moles of both reactants',
      'The reactant with fewer moles is the limiting reagent',
      'Use moles of limiting reagent to find mass',
    ],
  },
  {
    id: 'stoich8',
    type: 'neutralization',
    difficulty: 'hard',
    equation: 'H₂SO₄ + 2KOH → K₂SO₄ + 2H₂O',
    equationBalanced: 'H₂SO₄ + 2KOH → K₂SO₄ + 2H₂O',
    reactant1: {
      formula: 'H₂SO₄',
      name: 'Brennisteinssýra',
      nameEn: 'Sulfuric acid',
      molarity: 0.250,
      volume: 35.0,
    },
    reactant2: {
      formula: 'KOH',
      name: 'Kalíumhýdroxíð',
      nameEn: 'Potassium hydroxide',
      molarity: 0.100,
      volume: 120.0,
    },
    findWhat: 'moles',
    question: 'Ef 35.0 mL af 0.250 M H₂SO₄ blandast við 120.0 mL af 0.100 M KOH, hversu mörg mól af H₂SO₄ eru eftir óbreytt?',
    questionEn: 'If 35.0 mL of 0.250 M H₂SO₄ mixes with 120.0 mL of 0.100 M KOH, how many moles of H₂SO₄ remain unreacted?',
    questionPl: 'Jeśli 35.0 mL 0.250 M H₂SO₄ miesza się ze 120.0 mL 0.100 M KOH, ile moli H₂SO₄ pozostaje nieprzereagowanych?',
    answer: 0.00275,
    unit: 'mól',
    tolerance: 0.0001,
    steps: [
      {
        step: '1. Finndu mól beggja',
        stepEn: '1. Find moles of both',
        calculation: 'n(H₂SO₄) = 0.250 × 0.035 = 0.00875 mól\nn(KOH) = 0.100 × 0.120 = 0.0120 mól',
      },
      {
        step: '2. Ákvarðaðu takmörkunarefni',
        stepEn: '2. Determine limiting reagent',
        calculation: 'Þarf 2×0.00875 = 0.0175 mól KOH, en aðeins 0.012 mól eru til\nKOH er takmörkunarefni',
      },
      {
        step: '3. Reiknaðu ónotað H₂SO₄',
        stepEn: '3. Calculate unreacted H₂SO₄',
        calculation: 'Notað H₂SO₄ = 0.0120/2 = 0.00600 mól\nÓnotað = 0.00875 - 0.00600 = 0.00275 mól',
      },
    ],
    hints: [
      'Þetta er umframverkefni - ekki allt hvarfast',
      'Berðu saman hversu mikið þarf og hversu mikið er til',
      'Mundu 2:1 hlutfallið: 2 KOH á hvert H₂SO₄',
    ],
    hintsEn: [
      'This is an excess problem - not everything reacts',
      'Compare how much is needed vs how much is available',
      'Remember the 2:1 ratio: 2 KOH per H₂SO₄',
    ],
  },
  {
    id: 'stoich9',
    type: 'precipitation',
    difficulty: 'easy',
    equation: '2AgNO₃ + CaCl₂ → 2AgCl + Ca(NO₃)₂',
    equationBalanced: '2AgNO₃(aq) + CaCl₂(aq) → 2AgCl(s) + Ca(NO₃)₂(aq)',
    reactant1: {
      formula: 'AgNO₃',
      name: 'Silfurnítrat',
      nameEn: 'Silver nitrate',
      molarity: 0.200,
      volume: 30.0,
    },
    reactant2: {
      formula: 'CaCl₂',
      name: 'Kalsíumklóríð',
      nameEn: 'Calcium chloride',
      isExcess: true,
    },
    product: {
      formula: 'AgCl',
      name: 'Silfurklóríð',
      nameEn: 'Silver chloride',
      molarMass: 143.32,
    },
    findWhat: 'mass',
    question: 'Hvaða massi af AgCl myndast þegar 30.0 mL af 0.200 M AgNO₃ hvarfast við umframmagn af CaCl₂?',
    questionEn: 'What mass of AgCl forms when 30.0 mL of 0.200 M AgNO₃ reacts with excess CaCl₂?',
    questionPl: 'Jaka masa AgCl tworzy się gdy 30.0 mL 0.200 M AgNO₃ reaguje z nadmiarem CaCl₂?',
    answer: 0.860,
    unit: 'g',
    tolerance: 0.01,
    steps: [
      {
        step: '1. Finndu mól AgNO₃',
        stepEn: '1. Find moles of AgNO₃',
        calculation: 'n = 0.200 M × 0.0300 L = 0.00600 mól',
      },
      {
        step: '2. Stuðlar: 2AgNO₃ → 2AgCl',
        stepEn: '2. Coefficients: 2AgNO₃ → 2AgCl',
        calculation: 'n(AgCl) = n(AgNO₃) = 0.00600 mól',
      },
      {
        step: '3. Massi AgCl',
        stepEn: '3. Mass of AgCl',
        calculation: 'm = 0.00600 × 143.32 = 0.860 g',
      },
    ],
    hints: [
      'Stuðlar sýna 2:2 hlutfall fyrir AgNO₃ og AgCl',
      'Þetta jafngildir 1:1 hlutfalli',
      'Mólmassi AgCl = 143.32 g/mol',
    ],
    hintsEn: [
      'Coefficients show 2:2 ratio for AgNO₃ and AgCl',
      'This equals a 1:1 ratio',
      'Molar mass AgCl = 143.32 g/mol',
    ],
  },
  {
    id: 'stoich10',
    type: 'mass_volume',
    difficulty: 'medium',
    equation: 'Zn + 2HCl → ZnCl₂ + H₂',
    equationBalanced: 'Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)',
    reactant1: {
      formula: 'Zn',
      name: 'Sink',
      nameEn: 'Zinc',
      mass: 3.27,
      molarMass: 65.38,
    },
    reactant2: {
      formula: 'HCl',
      name: 'Saltsýra',
      nameEn: 'Hydrochloric acid',
      molarity: 1.00,
    },
    findWhat: 'volume',
    question: 'Hversu mörg mL af 1.00 M HCl þarf til að leysa upp 3.27 g af sinki?',
    questionEn: 'How many mL of 1.00 M HCl are needed to dissolve 3.27 g of zinc?',
    questionPl: 'Ile mL 1.00 M HCl potrzeba do rozpuszczenia 3.27 g cynku?',
    answer: 100.0,
    unit: 'mL',
    tolerance: 1,
    steps: [
      {
        step: '1. Finndu mól Zn',
        stepEn: '1. Find moles of Zn',
        calculation: 'n(Zn) = 3.27 g / 65.38 g/mol = 0.0500 mól',
      },
      {
        step: '2. Hlutfall 1:2',
        stepEn: '2. Ratio 1:2',
        calculation: 'n(HCl) = 2 × 0.0500 = 0.100 mól',
      },
      {
        step: '3. Rúmmál HCl',
        stepEn: '3. Volume of HCl',
        calculation: 'V = 0.100 mól / 1.00 M = 0.100 L = 100 mL',
      },
    ],
    hints: [
      'Byrjaðu á n = m/M fyrir sink',
      '1 mól Zn þarf 2 mól HCl',
      'V = n/M gefur rúmmálið',
    ],
    hintsEn: [
      'Start with n = m/M for zinc',
      '1 mol Zn needs 2 mol HCl',
      'V = n/M gives the volume',
    ],
  },
  {
    id: 'stoich11',
    type: 'neutralization',
    difficulty: 'easy',
    equation: 'NaOH + CH₃COOH → CH₃COONa + H₂O',
    equationBalanced: 'NaOH + CH₃COOH → CH₃COONa + H₂O',
    reactant1: {
      formula: 'CH₃COOH',
      name: 'Edikssýra',
      nameEn: 'Acetic acid',
      molarity: 0.100,
      volume: 50.0,
    },
    reactant2: {
      formula: 'NaOH',
      name: 'Natríumhýdroxíð',
      nameEn: 'Sodium hydroxide',
      molarity: 0.100,
    },
    findWhat: 'volume',
    question: 'Hversu mörg mL af 0.100 M NaOH þarf til að hlutleysa 50.0 mL af 0.100 M edikssýru?',
    questionEn: 'How many mL of 0.100 M NaOH are needed to neutralize 50.0 mL of 0.100 M acetic acid?',
    questionPl: 'Ile mL 0.100 M NaOH potrzeba do zobojętnienia 50.0 mL 0.100 M kwasu octowego?',
    answer: 50.0,
    unit: 'mL',
    tolerance: 0.5,
    steps: [
      {
        step: '1. Finndu mól CH₃COOH',
        stepEn: '1. Find moles of CH₃COOH',
        calculation: 'n = 0.100 M × 0.0500 L = 0.00500 mól',
      },
      {
        step: '2. 1:1 hlutfall',
        stepEn: '2. 1:1 ratio',
        calculation: 'n(NaOH) = 0.00500 mól',
      },
      {
        step: '3. Rúmmál NaOH',
        stepEn: '3. Volume of NaOH',
        calculation: 'V = 0.00500 / 0.100 = 0.0500 L = 50.0 mL',
      },
    ],
    hints: [
      'Þetta er 1:1 hlutleysingarverkefni',
      'Sama mólstyrkur þýðir sama rúmmál',
      'V₁ × M₁ = V₂ × M₂ virkar hér líka',
    ],
    hintsEn: [
      'This is a 1:1 neutralization problem',
      'Same molarity means same volume',
      'V₁ × M₁ = V₂ × M₂ works here too',
    ],
  },
  {
    id: 'stoich12',
    type: 'precipitation',
    difficulty: 'hard',
    equation: 'FeCl₃ + 3NaOH → Fe(OH)₃ + 3NaCl',
    equationBalanced: 'FeCl₃(aq) + 3NaOH(aq) → Fe(OH)₃(s) + 3NaCl(aq)',
    reactant1: {
      formula: 'FeCl₃',
      name: 'Járnklóríð',
      nameEn: 'Iron(III) chloride',
      molarity: 0.150,
      volume: 40.0,
    },
    reactant2: {
      formula: 'NaOH',
      name: 'Natríumhýdroxíð',
      nameEn: 'Sodium hydroxide',
      molarity: 0.300,
      volume: 80.0,
    },
    product: {
      formula: 'Fe(OH)₃',
      name: 'Járnhýdroxíð',
      nameEn: 'Iron(III) hydroxide',
      molarMass: 106.87,
    },
    findWhat: 'mass',
    question: 'Hvaða massi af Fe(OH)₃ fellur út þegar 40.0 mL af 0.150 M FeCl₃ blandast við 80.0 mL af 0.300 M NaOH?',
    questionEn: 'What mass of Fe(OH)₃ precipitates when 40.0 mL of 0.150 M FeCl₃ mixes with 80.0 mL of 0.300 M NaOH?',
    questionPl: 'Jaka masa Fe(OH)₃ wytrąca się gdy 40.0 mL 0.150 M FeCl₃ miesza się z 80.0 mL 0.300 M NaOH?',
    answer: 0.641,
    unit: 'g',
    tolerance: 0.01,
    steps: [
      {
        step: '1. Finndu mól beggja',
        stepEn: '1. Find moles of both',
        calculation: 'n(FeCl₃) = 0.150 × 0.040 = 0.00600 mól\nn(NaOH) = 0.300 × 0.080 = 0.0240 mól',
      },
      {
        step: '2. Þarf 3:1 hlutfall',
        stepEn: '2. Need 3:1 ratio',
        calculation: 'Þarf 3 × 0.00600 = 0.0180 mól NaOH\nErum með 0.0240 mól, NaOH er í umframmagni',
      },
      {
        step: '3. FeCl₃ er takmörkunarefni',
        stepEn: '3. FeCl₃ is limiting reagent',
        calculation: 'n(Fe(OH)₃) = n(FeCl₃) = 0.00600 mól\nm = 0.00600 × 106.87 = 0.641 g',
      },
    ],
    hints: [
      '1 mól FeCl₃ þarf 3 mól NaOH',
      'Berðu saman: hvað þarf vs. hvað er til',
      'Mólmassi Fe(OH)₃ = 106.87 g/mol',
    ],
    hintsEn: [
      '1 mol FeCl₃ needs 3 mol NaOH',
      'Compare: what is needed vs. what is available',
      'Molar mass Fe(OH)₃ = 106.87 g/mol',
    ],
  },
];

// Get problems by difficulty
export function getStoichiometryProblemsByDifficulty(
  difficulty: 'easy' | 'medium' | 'hard'
): StoichiometryProblem[] {
  return STOICHIOMETRY_PROBLEMS.filter(p => p.difficulty === difficulty);
}

// Get shuffled problems for game
export function getStoichiometryProblemsForGame(count: number = 10): StoichiometryProblem[] {
  const shuffled = [...STOICHIOMETRY_PROBLEMS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, STOICHIOMETRY_PROBLEMS.length));
}

// Get problems by type
export function getStoichiometryProblemsByType(
  type: StoichiometryProblem['type']
): StoichiometryProblem[] {
  return STOICHIOMETRY_PROBLEMS.filter(p => p.type === type);
}
