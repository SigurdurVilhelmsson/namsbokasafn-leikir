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
  }
];

/**
 * Get questions filtered by difficulty
 */
export function getQuestionsByDifficulty(difficulty: string): GasLawQuestion[] {
  return questions.filter(q => q.difficulty === difficulty);
}

/**
 * Get a random question
 */
export function getRandomQuestion(): GasLawQuestion {
  return questions[Math.floor(Math.random() * questions.length)];
}

/**
 * Get question by ID
 */
export function getQuestionById(id: number): GasLawQuestion | undefined {
  return questions.find(q => q.id === id);
}
