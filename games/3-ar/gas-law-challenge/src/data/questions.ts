import { GasLawQuestion } from '../types';

/**
 * Complete bank of gas law questions
 * Based on Ideal Gas Law: PV = nRT where R = 0.08206 L·atm/(mol·K)
 */
export const questions: GasLawQuestion[] = [
  // ===== EASY LEVEL (10 Questions) =====
  {
    id: 1,
    emoji: '🎈',
    scenario_is: 'Þú ert að blása upp blöðru fyrir afmælisveislu. Loftið í andanum þínum er um 37°C.',
    scenario_en: "You're blowing up a balloon for a birthday party. The air from your breath is about 37°C.",
    difficulty: 'Auðvelt',
    gasLaw: 'ideal',
    given: {
      P: { value: 1.0, unit: 'atm' },
      T: { value: 310, unit: 'K' },
      n: { value: 0.15, unit: 'mol' }
    },
    find: 'V',
    answer: 3.82,
    tolerance: 0.08,
    hints: [
      'Solve for V. Rearrange PV = nRT',
      'Use: V = nRT/P',
      'Substitute: V = (0.15)(0.08206)(310)/(1.0)',
      'Calculate: V = 3.82 L'
    ],
    solution: {
      formula: 'V = nRT/P',
      substitution: 'V = (0.15 mol)(0.08206 L·atm/mol·K)(310 K) / (1.0 atm)',
      calculation: 'V = 3.82 L',
      steps: [
        'Start with PV = nRT',
        'Rearrange to solve for V: V = nRT/P',
        'Substitute values: V = (0.15)(0.08206)(310)/(1.0)',
        'Calculate: V = 3.82 L'
      ]
    }
  },
  
  {
    id: 2,
    emoji: '🚴',
    scenario_is: 'Þú ert að athuga loftþrýsting í hjólbarða hjólreiðarinnar þinnar að morgni.',
    scenario_en: "You're checking the tire pressure on your bicycle in the morning.",
    difficulty: 'Auðvelt',
    gasLaw: 'ideal',
    given: {
      P: { value: 2.5, unit: 'atm' },
      V: { value: 2.0, unit: 'L' },
      T: { value: 288, unit: 'K' }
    },
    find: 'n',
    answer: 0.211,
    tolerance: 0.004,
    hints: [
      'Solve for n (moles). Rearrange PV = nRT',
      'Use: n = PV/RT',
      'Substitute: n = (2.5)(2.0)/[(0.08206)(288)]',
      'Calculate: n = 0.211 mol'
    ],
    solution: {
      formula: 'n = PV/RT',
      substitution: 'n = (2.5 atm)(2.0 L) / [(0.08206 L·atm/mol·K)(288 K)]',
      calculation: 'n = 0.211 mol',
      steps: [
        'Start with PV = nRT',
        'Rearrange to solve for n: n = PV/RT',
        'Substitute values: n = (2.5)(2.0)/(0.08206 × 288)',
        'Calculate: n = 0.211 mol'
      ]
    }
  },
  
  {
    id: 3,
    emoji: '🥤',
    scenario_is: 'Kólaflaska inniheldur koltvísýring undir þrýstingi.',
    scenario_en: 'A soda bottle contains carbon dioxide under pressure.',
    difficulty: 'Auðvelt',
    gasLaw: 'ideal',
    given: {
      V: { value: 2.0, unit: 'L' },
      T: { value: 298, unit: 'K' },
      n: { value: 0.30, unit: 'mol' }
    },
    find: 'P',
    answer: 3.67,
    tolerance: 0.07,
    hints: [
      'Solve for P (pressure). Rearrange PV = nRT',
      'Use: P = nRT/V',
      'Substitute: P = (0.30)(0.08206)(298)/(2.0)',
      'Calculate: P = 3.67 atm'
    ],
    solution: {
      formula: 'P = nRT/V',
      substitution: 'P = (0.30 mol)(0.08206 L·atm/mol·K)(298 K) / (2.0 L)',
      calculation: 'P = 3.67 atm',
      steps: [
        'Start with PV = nRT',
        'Rearrange to solve for P: P = nRT/V',
        'Substitute values: P = (0.30)(0.08206)(298)/(2.0)',
        'Calculate: P = 3.67 atm'
      ]
    }
  },
  
  {
    id: 4,
    emoji: '🧪',
    scenario_is: 'Í efnafræðistofu ertu að vinna með lofteinangrun við staðalskilyrði.',
    scenario_en: "In the chemistry lab, you're working with a gas sample at standard conditions.",
    difficulty: 'Auðvelt',
    gasLaw: 'ideal',
    given: {
      P: { value: 1.0, unit: 'atm' },
      V: { value: 5.0, unit: 'L' },
      n: { value: 0.20, unit: 'mol' }
    },
    find: 'T',
    answer: 305,
    tolerance: 6,
    hints: [
      'Solve for T (temperature). Rearrange PV = nRT',
      'Use: T = PV/nR',
      'Substitute: T = (1.0)(5.0)/[(0.20)(0.08206)]',
      'Calculate: T = 305 K'
    ],
    solution: {
      formula: 'T = PV/nR',
      substitution: 'T = (1.0 atm)(5.0 L) / [(0.20 mol)(0.08206 L·atm/mol·K)]',
      calculation: 'T = 305 K',
      steps: [
        'Start with PV = nRT',
        'Rearrange to solve for T: T = PV/nR',
        'Substitute values: T = (1.0)(5.0)/(0.20 × 0.08206)',
        'Calculate: T = 305 K'
      ]
    }
  },
  
  // ===== MEDIUM LEVEL (6 Questions) =====
  {
    id: 5,
    emoji: '🤿',
    scenario_is: 'Köfunarílát við 10m dýpi þar sem þrýstingur er 2.0 atm.',
    scenario_en: 'A scuba tank at 10m depth where the pressure is 2.0 atm.',
    difficulty: 'Miðlungs',
    gasLaw: 'ideal',
    given: {
      P: { value: 2.0, unit: 'atm' },
      V: { value: 12.0, unit: 'L' },
      T: { value: 283, unit: 'K' }
    },
    find: 'n',
    answer: 1.03,
    tolerance: 0.02,
    hints: [
      'Solve for moles at depth. Use n = PV/RT',
      'Notice pressure is doubled at this depth',
      'Substitute: n = (2.0)(12.0)/[(0.08206)(283)]',
      'Calculate: n = 1.03 mol'
    ],
    solution: {
      formula: 'n = PV/RT',
      substitution: 'n = (2.0 atm)(12.0 L) / [(0.08206 L·atm/mol·K)(283 K)]',
      calculation: 'n = 1.03 mol',
      steps: [
        'At 10m depth, pressure = 2.0 atm',
        'Start with PV = nRT',
        'Rearrange: n = PV/RT',
        'Substitute: n = (2.0)(12.0)/(0.08206 × 283)',
        'Calculate: n = 1.03 mol'
      ]
    }
  },
  
  {
    id: 6,
    emoji: '🎈',
    scenario_is: 'Loftbelgur er hitaður upp úr 300K í 400K við fast þrýsðing.',
    scenario_en: 'A hot air balloon is heated from 300K to 400K at constant pressure.',
    difficulty: 'Miðlungs',
    gasLaw: 'ideal',
    given: {
      P: { value: 1.0, unit: 'atm' },
      T: { value: 400, unit: 'K' },
      n: { value: 150, unit: 'mol' }
    },
    find: 'V',
    answer: 4924,
    tolerance: 98,
    hints: [
      'Large balloon needs large volume',
      'Use V = nRT/P with many moles',
      'Substitute: V = (150)(0.08206)(400)/(1.0)',
      'Calculate: V = 4924 L'
    ],
    solution: {
      formula: 'V = nRT/P',
      substitution: 'V = (150 mol)(0.08206 L·atm/mol·K)(400 K) / (1.0 atm)',
      calculation: 'V = 4924 L',
      steps: [
        'Hot air balloon at high temperature',
        'Use ideal gas law: PV = nRT',
        'Solve for V: V = nRT/P',
        'Substitute: V = (150)(0.08206)(400)/(1.0)',
        'Calculate: V = 4924 L (≈ 4.9 m³)'
      ]
    }
  },
  
  // ===== HARD LEVEL (4 Questions) =====
  {
    id: 7,
    emoji: '🏭',
    scenario_is: 'Iðnaðargastankur með mjög háum þrýstingi.',
    scenario_en: 'Industrial gas cylinder with very high pressure.',
    difficulty: 'Erfitt',
    gasLaw: 'ideal',
    given: {
      V: { value: 50.0, unit: 'L' },
      T: { value: 298, unit: 'K' },
      n: { value: 82.0, unit: 'mol' }
    },
    find: 'P',
    answer: 40.1,
    tolerance: 0.8,
    hints: [
      'High moles in small volume = high pressure',
      'Use P = nRT/V',
      'Substitute: P = (82.0)(0.08206)(298)/(50.0)',
      'Calculate: P = 40.1 atm'
    ],
    solution: {
      formula: 'P = nRT/V',
      substitution: 'P = (82.0 mol)(0.08206 L·atm/mol·K)(298 K) / (50.0 L)',
      calculation: 'P = 40.1 atm',
      steps: [
        'Industrial cylinder has high pressure',
        'Start with PV = nRT',
        'Solve for P: P = nRT/V',
        'Substitute: P = (82.0)(0.08206)(298)/(50.0)',
        'Calculate: P = 40.1 atm (very high!)'
      ]
    }
  },
  
  {
    id: 8,
    emoji: '🌊',
    scenario_is: 'Djúpköfun á 100m dýpi þar sem þrýstingur er 11 atm.',
    scenario_en: 'Deep sea dive at 100m depth where pressure is 11 atm.',
    difficulty: 'Erfitt',
    gasLaw: 'ideal',
    given: {
      P: { value: 11.0, unit: 'atm' },
      V: { value: 3.0, unit: 'L' },
      n: { value: 1.5, unit: 'mol' }
    },
    find: 'T',
    answer: 268,
    tolerance: 5,
    hints: [
      'Deep ocean = high pressure, cold temperature',
      'Use T = PV/nR',
      'Substitute: T = (11.0)(3.0)/[(1.5)(0.08206)]',
      'Calculate: T = 268 K'
    ],
    solution: {
      formula: 'T = PV/nR',
      substitution: 'T = (11.0 atm)(3.0 L) / [(1.5 mol)(0.08206 L·atm/mol·K)]',
      calculation: 'T = 268 K',
      steps: [
        'At 100m depth, pressure is very high (11 atm)',
        'Start with PV = nRT',
        'Solve for T: T = PV/nR',
        'Substitute: T = (11.0)(3.0)/(1.5 × 0.08206)',
        'Calculate: T = 268 K (≈ -5°C, cold!)'
      ]
    }
  },

  // ===== ATMOSPHERIC APPLICATIONS =====
  {
    id: 9,
    emoji: '🏔️',
    scenario_is: 'Á toppi Everest (8849m) er loftþrýstingur aðeins 0.33 atm. Hversu mikið loft (mól) er í 5L lungum?',
    scenario_en: 'At the summit of Everest (8849m), air pressure is only 0.33 atm. How much air (moles) is in 5L lungs?',
    difficulty: 'Miðlungs',
    gasLaw: 'ideal',
    given: {
      P: { value: 0.33, unit: 'atm' },
      V: { value: 5.0, unit: 'L' },
      T: { value: 243, unit: 'K' }
    },
    find: 'n',
    answer: 0.083,
    tolerance: 0.002,
    hints: [
      'High altitude = low pressure = less air per breath',
      'Use n = PV/RT',
      'Substitute: n = (0.33)(5.0)/[(0.08206)(243)]',
      'Calculate: n = 0.083 mol (only 1/3 of sea level!)'
    ],
    solution: {
      formula: 'n = PV/RT',
      substitution: 'n = (0.33 atm)(5.0 L) / [(0.08206 L·atm/mol·K)(243 K)]',
      calculation: 'n = 0.083 mol',
      steps: [
        'At 8849m, atmospheric pressure is only 33% of sea level',
        'Temperature at summit: about -30°C = 243 K',
        'Rearrange PV = nRT to n = PV/RT',
        'Substitute: n = (0.33)(5.0)/(0.08206 × 243)',
        'Calculate: n = 0.083 mol (explains why climbers need oxygen!)'
      ]
    }
  },

  {
    id: 10,
    emoji: '✈️',
    scenario_is: 'Farþegaflugvél flýgur á 10.000m hæð þar sem þrýstingur er 0.26 atm og hitastig -50°C.',
    scenario_en: 'A passenger aircraft flies at 10,000m altitude where pressure is 0.26 atm and temperature is -50°C.',
    difficulty: 'Miðlungs',
    gasLaw: 'ideal',
    given: {
      P: { value: 0.26, unit: 'atm' },
      T: { value: 223, unit: 'K' },
      n: { value: 0.50, unit: 'mol' }
    },
    find: 'V',
    answer: 35.2,
    tolerance: 0.7,
    hints: [
      'Low pressure and temperature affect gas volume',
      'Use V = nRT/P',
      'Substitute: V = (0.50)(0.08206)(223)/(0.26)',
      'Calculate: V = 35.2 L'
    ],
    solution: {
      formula: 'V = nRT/P',
      substitution: 'V = (0.50 mol)(0.08206 L·atm/mol·K)(223 K) / (0.26 atm)',
      calculation: 'V = 35.2 L',
      steps: [
        'At cruising altitude (10 km), pressure is very low',
        'Temperature: -50°C = 223 K',
        'Use PV = nRT, solve for V',
        'Substitute: V = (0.50)(0.08206)(223)/(0.26)',
        'Calculate: V = 35.2 L (this is why planes are pressurized!)'
      ]
    }
  },

  {
    id: 11,
    emoji: '🌡️',
    scenario_is: 'Veðurspá: Lágþrýstingssvæði nálgast. Hvað gerist við loftþrýsting þegar hitastigið lækkar?',
    scenario_en: 'Weather forecast: Low pressure system approaching. A weather balloon has 100 mol of gas.',
    difficulty: 'Miðlungs',
    gasLaw: 'ideal',
    given: {
      V: { value: 2500, unit: 'L' },
      T: { value: 288, unit: 'K' },
      n: { value: 100, unit: 'mol' }
    },
    find: 'P',
    answer: 0.946,
    tolerance: 0.019,
    hints: [
      'Weather balloons measure atmospheric conditions',
      'Use P = nRT/V',
      'Substitute: P = (100)(0.08206)(288)/(2500)',
      'Calculate: P = 0.946 atm (low pressure = stormy weather!)'
    ],
    solution: {
      formula: 'P = nRT/V',
      substitution: 'P = (100 mol)(0.08206 L·atm/mol·K)(288 K) / (2500 L)',
      calculation: 'P = 0.946 atm',
      steps: [
        'Weather balloon carries instruments to measure atmosphere',
        'Low pressure systems often bring clouds and rain',
        'Use PV = nRT, solve for P',
        'Substitute: P = (100)(0.08206)(288)/(2500)',
        'Calculate: P = 0.946 atm (below standard 1.0 atm = low pressure system)'
      ]
    }
  },

  {
    id: 12,
    emoji: '🚀',
    scenario_is: 'Geimferð: Í geimskipi er þrýstingi haldið við 0.7 atm (eins og á 3000m hæð á jörðu).',
    scenario_en: 'Space travel: A spacecraft cabin is maintained at 0.7 atm (like 3000m altitude on Earth).',
    difficulty: 'Erfitt',
    gasLaw: 'ideal',
    given: {
      P: { value: 0.7, unit: 'atm' },
      V: { value: 50.0, unit: 'L' },
      T: { value: 295, unit: 'K' }
    },
    find: 'n',
    answer: 1.45,
    tolerance: 0.03,
    hints: [
      'Spacecraft cabins use lower pressure to reduce stress on hull',
      'Use n = PV/RT',
      'Substitute: n = (0.7)(50.0)/[(0.08206)(295)]',
      'Calculate: n = 1.45 mol'
    ],
    solution: {
      formula: 'n = PV/RT',
      substitution: 'n = (0.7 atm)(50.0 L) / [(0.08206 L·atm/mol·K)(295 K)]',
      calculation: 'n = 1.45 mol',
      steps: [
        'Spacecraft use lower cabin pressure (0.7 atm) for safety',
        'Astronauts adapt to this like being at 3000m altitude',
        'Use n = PV/RT to find moles of air',
        'Substitute: n = (0.7)(50.0)/(0.08206 × 295)',
        'Calculate: n = 1.45 mol of breathing gas'
      ]
    }
  },

  {
    id: 13,
    emoji: '🎿',
    scenario_is: 'Skíðasvæði á 2500m hæð. Loftþrýstingur er 0.74 atm. Á hvaða hitastigi er loftið?',
    scenario_en: 'Ski resort at 2500m altitude. Air pressure is 0.74 atm. What is the air temperature?',
    difficulty: 'Erfitt',
    gasLaw: 'ideal',
    given: {
      P: { value: 0.74, unit: 'atm' },
      V: { value: 10.0, unit: 'L' },
      n: { value: 0.35, unit: 'mol' }
    },
    find: 'T',
    answer: 258,
    tolerance: 5,
    hints: [
      'Mountain resorts have lower pressure and temperature',
      'Use T = PV/nR',
      'Substitute: T = (0.74)(10.0)/[(0.35)(0.08206)]',
      'Calculate: T = 258 K (about -15°C, perfect for skiing!)'
    ],
    solution: {
      formula: 'T = PV/nR',
      substitution: 'T = (0.74 atm)(10.0 L) / [(0.35 mol)(0.08206 L·atm/mol·K)]',
      calculation: 'T = 258 K',
      steps: [
        'At 2500m, pressure drops to about 74% of sea level',
        'Use PV = nRT, solve for T',
        'Substitute: T = (0.74)(10.0)/(0.35 × 0.08206)',
        'Calculate: T = 258 K',
        'Convert: 258 K - 273 = -15°C (typical ski resort temperature)'
      ]
    }
  }
];

// ===== DALTON'S LAW QUESTIONS =====
const daltonQuestions: GasLawQuestion[] = [
  {
    id: 101,
    emoji: '🌊',
    scenario_is: 'Köfunaröndunarloft inniheldur súrefni og köfnunarefni. Heildarþrýstingur er 2.0 atm. Súrefnið hefur 0.4 mólhlutfall.',
    scenario_en: "Scuba diving air contains oxygen and nitrogen. Total pressure is 2.0 atm. Oxygen has a mole fraction of 0.4.",
    difficulty: 'Miðlungs',
    gasLaw: 'dalton',
    given: {
      P: { value: 2.0, unit: 'atm' }
    },
    find: 'P_partial',
    answer: 0.8,
    tolerance: 0.016,
    hints: [
      'Notaðu lögmál Daltons: Pᵢ = Xᵢ × P_heildar',
      'Xᵢ er mólhlutfall (0.4 fyrir O₂)',
      'P_O₂ = 0.4 × 2.0 atm',
      'P_O₂ = 0.8 atm'
    ],
    solution: {
      formula: 'Pᵢ = Xᵢ × P_heildar',
      substitution: 'P_O₂ = 0.4 × 2.0 atm',
      calculation: 'P_O₂ = 0.8 atm',
      steps: [
        'Lögmál Daltons: Pᵢ = Xᵢ × P_heildar',
        'Mólhlutfall súrefnis: X_O₂ = 0.4',
        'Setjum inn gildi: P_O₂ = 0.4 × 2.0',
        'Reiknum: P_O₂ = 0.8 atm'
      ]
    },
    daltonData: {
      gases: [
        { name: 'Súrefni', formula: 'O₂', moleFraction: 0.4 },
        { name: 'Köfnunarefni', formula: 'N₂', moleFraction: 0.6 }
      ],
      totalPressure: 2.0,
      findGas: 'O₂',
      findWhat: 'partial_pressure'
    }
  },
  {
    id: 102,
    emoji: '🎈',
    scenario_is: 'Loftblaðra inniheldur 0.5 mól helíum og 1.5 mól köfnunarefni við 1.0 atm heildarþrýsting. Hver er hlutþrýstingur helíums?',
    scenario_en: 'A balloon contains 0.5 mol helium and 1.5 mol nitrogen at 1.0 atm total pressure. What is the partial pressure of helium?',
    difficulty: 'Auðvelt',
    gasLaw: 'dalton',
    given: {
      P: { value: 1.0, unit: 'atm' }
    },
    find: 'P_partial',
    answer: 0.25,
    tolerance: 0.01,
    hints: [
      'Fyrst, finndu mólhlutfall: Xᵢ = nᵢ/n_heildar',
      'n_heildar = 0.5 + 1.5 = 2.0 mól',
      'X_He = 0.5/2.0 = 0.25',
      'P_He = 0.25 × 1.0 = 0.25 atm'
    ],
    solution: {
      formula: 'Pᵢ = Xᵢ × P_heildar = (nᵢ/n_heildar) × P_heildar',
      substitution: 'P_He = (0.5/2.0) × 1.0 atm',
      calculation: 'P_He = 0.25 atm',
      steps: [
        'Heildar mólfjöldi: n = 0.5 + 1.5 = 2.0 mól',
        'Mólhlutfall He: X_He = 0.5/2.0 = 0.25',
        'Hlutþrýstingur: P_He = X_He × P_heildar',
        'P_He = 0.25 × 1.0 = 0.25 atm'
      ]
    },
    daltonData: {
      gases: [
        { name: 'Helíum', formula: 'He', moles: 0.5 },
        { name: 'Köfnunarefni', formula: 'N₂', moles: 1.5 }
      ],
      totalPressure: 1.0,
      totalMoles: 2.0,
      findGas: 'He',
      findWhat: 'partial_pressure'
    }
  },
  {
    id: 103,
    emoji: '🏥',
    scenario_is: 'Sjúkrahúsloft: Íláti inniheldur 20% O₂, 78% N₂, og 2% Ar við heildarþrýsting 3.0 atm. Hver er hlutþrýstingur súrefnis?',
    scenario_en: 'Hospital air: A tank contains 20% O₂, 78% N₂, and 2% Ar at 3.0 atm total pressure. What is the partial pressure of oxygen?',
    difficulty: 'Auðvelt',
    gasLaw: 'dalton',
    given: {
      P: { value: 3.0, unit: 'atm' }
    },
    find: 'P_partial',
    answer: 0.6,
    tolerance: 0.012,
    hints: [
      'Prósentur eru mólhlutföll: 20% = 0.20',
      'P_O₂ = X_O₂ × P_heildar',
      'P_O₂ = 0.20 × 3.0',
      'P_O₂ = 0.6 atm'
    ],
    solution: {
      formula: 'Pᵢ = Xᵢ × P_heildar',
      substitution: 'P_O₂ = 0.20 × 3.0 atm',
      calculation: 'P_O₂ = 0.6 atm',
      steps: [
        'Mólhlutfall súrefnis: 20% = 0.20',
        'Hlutþrýstingur: P_O₂ = X_O₂ × P_heildar',
        'Setjum inn: P_O₂ = 0.20 × 3.0',
        'P_O₂ = 0.6 atm'
      ]
    },
    daltonData: {
      gases: [
        { name: 'Súrefni', formula: 'O₂', moleFraction: 0.20 },
        { name: 'Köfnunarefni', formula: 'N₂', moleFraction: 0.78 },
        { name: 'Argon', formula: 'Ar', moleFraction: 0.02 }
      ],
      totalPressure: 3.0,
      findGas: 'O₂',
      findWhat: 'partial_pressure'
    }
  },
  {
    id: 104,
    emoji: '🔬',
    scenario_is: 'Í rannsóknarstofu er gasblöndu hlutþrýstingur CO₂ 0.3 atm og hlutþrýstingur O₂ 0.5 atm. Hver er heildarþrýstingur?',
    scenario_en: 'In a lab, a gas mixture has CO₂ partial pressure of 0.3 atm and O₂ partial pressure of 0.5 atm. What is the total pressure?',
    difficulty: 'Auðvelt',
    gasLaw: 'dalton',
    given: {},
    find: 'P',
    answer: 0.8,
    tolerance: 0.016,
    hints: [
      'Lögmál Daltons: P_heildar = P₁ + P₂ + ...',
      'P_heildar = P_CO₂ + P_O₂',
      'P_heildar = 0.3 + 0.5',
      'P_heildar = 0.8 atm'
    ],
    solution: {
      formula: 'P_heildar = P₁ + P₂',
      substitution: 'P_heildar = 0.3 atm + 0.5 atm',
      calculation: 'P_heildar = 0.8 atm',
      steps: [
        'Lögmál Daltons: Heildarþrýstingur = summa hlutþrýstinga',
        'P_heildar = P_CO₂ + P_O₂',
        'P_heildar = 0.3 + 0.5',
        'P_heildar = 0.8 atm'
      ]
    },
    daltonData: {
      gases: [
        { name: 'Koldíoxíð', formula: 'CO₂', partialPressure: 0.3 },
        { name: 'Súrefni', formula: 'O₂', partialPressure: 0.5 }
      ],
      findWhat: 'total_pressure'
    }
  },
  {
    id: 105,
    emoji: '🧪',
    scenario_is: 'Gasblöndu inniheldur N₂, O₂, og CO₂. Heildarþrýstingur er 1.2 atm. Hlutþrýstingur N₂ er 0.6 atm og O₂ er 0.4 atm. Hver er hlutþrýstingur CO₂?',
    scenario_en: 'A gas mixture contains N₂, O₂, and CO₂. Total pressure is 1.2 atm. Partial pressures: N₂ = 0.6 atm, O₂ = 0.4 atm. What is CO₂ partial pressure?',
    difficulty: 'Miðlungs',
    gasLaw: 'dalton',
    given: {
      P: { value: 1.2, unit: 'atm' }
    },
    find: 'P_partial',
    answer: 0.2,
    tolerance: 0.01,
    hints: [
      'P_heildar = P_N₂ + P_O₂ + P_CO₂',
      'Einangraðu P_CO₂: P_CO₂ = P_heildar - P_N₂ - P_O₂',
      'P_CO₂ = 1.2 - 0.6 - 0.4',
      'P_CO₂ = 0.2 atm'
    ],
    solution: {
      formula: 'P_CO₂ = P_heildar - P_N₂ - P_O₂',
      substitution: 'P_CO₂ = 1.2 - 0.6 - 0.4',
      calculation: 'P_CO₂ = 0.2 atm',
      steps: [
        'Lögmál Daltons: P_heildar = P_N₂ + P_O₂ + P_CO₂',
        'Einangraðu óþekkta: P_CO₂ = P_heildar - P_N₂ - P_O₂',
        'Setjum inn: P_CO₂ = 1.2 - 0.6 - 0.4',
        'P_CO₂ = 0.2 atm'
      ]
    },
    daltonData: {
      gases: [
        { name: 'Köfnunarefni', formula: 'N₂', partialPressure: 0.6 },
        { name: 'Súrefni', formula: 'O₂', partialPressure: 0.4 },
        { name: 'Koldíoxíð', formula: 'CO₂' }
      ],
      totalPressure: 1.2,
      findGas: 'CO₂',
      findWhat: 'partial_pressure'
    }
  },
  {
    id: 106,
    emoji: '⛽',
    scenario_is: 'Bensíngufa og loft. Íláti inniheldur 2 mól C₈H₁₈ gufu og 8 mól lofts. Ef heildarþrýstingur er 1.5 atm, hver er hlutþrýstingur bensíngufunnar?',
    scenario_en: 'Gasoline vapor and air. A container has 2 mol C₈H₁₈ vapor and 8 mol air. If total pressure is 1.5 atm, what is the partial pressure of gasoline vapor?',
    difficulty: 'Miðlungs',
    gasLaw: 'dalton',
    given: {
      P: { value: 1.5, unit: 'atm' }
    },
    find: 'P_partial',
    answer: 0.3,
    tolerance: 0.01,
    hints: [
      'Fyrst, reiknaðu mólhlutfall',
      'X_bensín = n_bensín/n_heildar = 2/(2+8) = 0.2',
      'P_bensín = X × P_heildar = 0.2 × 1.5',
      'P_bensín = 0.3 atm'
    ],
    solution: {
      formula: 'P_bensín = (n_bensín/n_heildar) × P_heildar',
      substitution: 'P_bensín = (2/10) × 1.5 atm',
      calculation: 'P_bensín = 0.3 atm',
      steps: [
        'Heildar mólfjöldi: n = 2 + 8 = 10 mól',
        'Mólhlutfall: X = 2/10 = 0.2',
        'Hlutþrýstingur: P = X × P_heildar',
        'P_bensín = 0.2 × 1.5 = 0.3 atm'
      ]
    },
    daltonData: {
      gases: [
        { name: 'Bensíngufa', formula: 'C₈H₁₈', moles: 2 },
        { name: 'Loft', formula: 'loft', moles: 8 }
      ],
      totalPressure: 1.5,
      totalMoles: 10,
      findGas: 'C₈H₁₈',
      findWhat: 'partial_pressure'
    }
  },
  {
    id: 107,
    emoji: '🌡️',
    scenario_is: 'Andrúmsloftið: 78% N₂, 21% O₂, 1% Ar. Við sjávarmál er loftþrýstingur 1.0 atm. Hver er hlutþrýstingur köfnunarefnis?',
    scenario_en: 'Atmosphere: 78% N₂, 21% O₂, 1% Ar. At sea level, air pressure is 1.0 atm. What is the partial pressure of nitrogen?',
    difficulty: 'Auðvelt',
    gasLaw: 'dalton',
    given: {
      P: { value: 1.0, unit: 'atm' }
    },
    find: 'P_partial',
    answer: 0.78,
    tolerance: 0.016,
    hints: [
      '78% þýðir mólhlutfall 0.78',
      'P_N₂ = X_N₂ × P_heildar',
      'P_N₂ = 0.78 × 1.0',
      'P_N₂ = 0.78 atm'
    ],
    solution: {
      formula: 'P_N₂ = X_N₂ × P_heildar',
      substitution: 'P_N₂ = 0.78 × 1.0 atm',
      calculation: 'P_N₂ = 0.78 atm',
      steps: [
        'Mólhlutfall köfnunarefnis: 78% = 0.78',
        'Hlutþrýstingur: P = X × P_heildar',
        'P_N₂ = 0.78 × 1.0',
        'P_N₂ = 0.78 atm (mestur hluti loftþrýstings!)'
      ]
    },
    daltonData: {
      gases: [
        { name: 'Köfnunarefni', formula: 'N₂', moleFraction: 0.78 },
        { name: 'Súrefni', formula: 'O₂', moleFraction: 0.21 },
        { name: 'Argon', formula: 'Ar', moleFraction: 0.01 }
      ],
      totalPressure: 1.0,
      findGas: 'N₂',
      findWhat: 'partial_pressure'
    }
  },
  {
    id: 108,
    emoji: '🏔️',
    scenario_is: 'Á 5000m hæð er heildarþrýstingur 0.5 atm. Súrefni er 21% af loftinu. Hver er hlutþrýstingur súrefnis? (Útskýrir hví fólk þreytist á hásléttu!)',
    scenario_en: 'At 5000m altitude, total pressure is 0.5 atm. Oxygen is 21% of air. What is the partial pressure of oxygen? (Explains altitude sickness!)',
    difficulty: 'Miðlungs',
    gasLaw: 'dalton',
    given: {
      P: { value: 0.5, unit: 'atm' }
    },
    find: 'P_partial',
    answer: 0.105,
    tolerance: 0.003,
    hints: [
      'Þó prósentan sé sú sama, er heildarþrýstingur lægri',
      'P_O₂ = 0.21 × 0.5 atm',
      'P_O₂ = 0.105 atm',
      'Þetta er helmingur af sjávarmálsgildi!'
    ],
    solution: {
      formula: 'P_O₂ = X_O₂ × P_heildar',
      substitution: 'P_O₂ = 0.21 × 0.5 atm',
      calculation: 'P_O₂ = 0.105 atm',
      steps: [
        'Mólhlutfall súrefnis: 21% = 0.21 (sama og við sjávarmál)',
        'En heildarþrýstingur er aðeins 0.5 atm',
        'P_O₂ = 0.21 × 0.5 = 0.105 atm',
        'Við sjávarmál: P_O₂ = 0.21 × 1.0 = 0.21 atm',
        'Þess vegna fær fólk hásléttuveiki - minna súrefni!'
      ]
    },
    daltonData: {
      gases: [
        { name: 'Súrefni', formula: 'O₂', moleFraction: 0.21 },
        { name: 'Köfnunarefni', formula: 'N₂', moleFraction: 0.78 },
        { name: 'Annað', formula: 'Ar', moleFraction: 0.01 }
      ],
      totalPressure: 0.5,
      findGas: 'O₂',
      findWhat: 'partial_pressure'
    }
  }
];

// Combine all questions
export const allQuestions: GasLawQuestion[] = [...questions, ...daltonQuestions];

/**
 * Get questions filtered by difficulty
 */
export function getQuestionsByDifficulty(difficulty: string): GasLawQuestion[] {
  return allQuestions.filter(q => q.difficulty === difficulty);
}

/**
 * Get a random question
 */
export function getRandomQuestion(): GasLawQuestion {
  return allQuestions[Math.floor(Math.random() * allQuestions.length)];
}

/**
 * Get question by ID
 */
export function getQuestionById(id: number): GasLawQuestion | undefined {
  return allQuestions.find(q => q.id === id);
}

/**
 * Get questions by gas law type
 */
export function getQuestionsByGasLaw(gasLaw: string): GasLawQuestion[] {
  return allQuestions.filter(q => q.gasLaw === gasLaw);
}

/**
 * Get Dalton's Law questions only
 */
export function getDaltonQuestions(): GasLawQuestion[] {
  return daltonQuestions;
}
