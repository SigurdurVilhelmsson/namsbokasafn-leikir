/**
 * Level 3 Challenges for Dimensional Analysis Game
 * Contains advanced challenges with multiple problem types requiring synthesis and analysis
 */

/**
 * Common option structure for reverse and other multiple-choice challenges
 */
interface ChallengeOption {
  /** Display text for the option */
  text: string;
  /** Array of conversion factors in this option */
  factors: string[];
  /** Whether this option is correct */
  correct: boolean;
  /** Number of steps in this solution path */
  steps: number;
}

/**
 * Reverse challenge: Identify conversion factors used to transform one unit to another
 */
export interface Level3ChallengeReverse {
  /** Unique identifier */
  id: string;
  /** Challenge type */
  type: 'reverse';
  /** Question prompt in Icelandic */
  prompt: string;
  /** Setup with starting and ending values/units */
  setup: {
    start: string;
    end: string;
    startValue: number;
    endValue: number;
  };
  /** Multiple choice options */
  options: ChallengeOption[];
  /** Prompt for student explanation */
  explanationPrompt: string;
}

/**
 * Error analysis challenge: Identify and correct calculation mistakes
 */
export interface Level3ChallengeErrorAnalysis {
  /** Unique identifier */
  id: string;
  /** Challenge type */
  type: 'error_analysis';
  /** Question prompt in Icelandic */
  prompt: string;
  /** The incorrect work shown */
  incorrectWork: string;
  /** Correct numerical answer */
  correctAnswer: number;
  /** Unit for correct answer */
  correctUnit: string;
  /** Explanation of the error */
  errorExplanation: string;
  /** Correct conversion factors/method */
  correctMethod: string[];
}

/**
 * Efficiency challenge: Find the most efficient solution path
 */
export interface Level3ChallengeEfficiency {
  /** Unique identifier */
  id: string;
  /** Challenge type */
  type: 'efficiency';
  /** Question prompt in Icelandic */
  prompt: string;
  /** Starting numerical value */
  startValue: number;
  /** Starting unit */
  startUnit: string;
  /** Target unit */
  targetUnit: string;
  /** Possible solution paths with efficiency ratings */
  possiblePaths: Array<{
    /** Array of conversion factors in this path */
    steps: string[];
    /** Number of steps */
    stepCount: number;
    /** Whether this is an efficient path */
    efficient: boolean;
  }>;
  /** Target numerical answer */
  targetAnswer: number;
}

/**
 * Synthesis challenge: Combine multiple skills (conversions, density, significant figures)
 */
export interface Level3ChallengeSynthesis {
  /** Unique identifier */
  id: string;
  /** Challenge type */
  type: 'synthesis';
  /** Question prompt in Icelandic */
  prompt: string;
  /** Starting numerical value */
  startValue: number;
  /** Starting unit */
  startUnit: string;
  /** Target unit */
  targetUnit: string;
  /** Density value (optional, for density-based problems) */
  density?: number;
  /** Unit for density (optional) */
  densityUnit?: string;
  /** Expected answer */
  expectedAnswer: number;
  /** Required significant figures (optional) */
  significantFigures?: number;
  /** Required steps for solution */
  requiredSteps: string[];
}

/**
 * Real-world challenge: Apply conversions to practical scenarios
 */
export interface Level3ChallengeRealWorld {
  /** Unique identifier */
  id: string;
  /** Challenge type */
  type: 'real_world';
  /** Question prompt in Icelandic */
  prompt: string;
  /** Starting numerical value */
  startValue: number;
  /** Starting unit */
  startUnit: string;
  /** Size/amount of each portion */
  portionSize: number;
  /** Unit for portion size */
  portionUnit: string;
  /** Expected answer */
  expectedAnswer: number;
  /** Whether answer must be an integer */
  requireInteger: boolean;
  /** Explanation for constraints */
  explanation: string;
}

/**
 * Derivation challenge: Convert large-scale or scientific notation values
 */
export interface Level3ChallengeDerivation {
  /** Unique identifier */
  id: string;
  /** Challenge type */
  type: 'derivation';
  /** Question prompt in Icelandic */
  prompt: string;
  /** Starting numerical value */
  startValue: number;
  /** Starting unit */
  startUnit: string;
  /** Target unit */
  targetUnit: string;
  /** Expected answer */
  expectedAnswer: number;
  /** Whether answer should use scientific notation */
  scientificNotation: boolean;
  /** Correct conversion method */
  correctMethod: string[];
}

/**
 * Union type for all Level 3 challenge types
 */
export type Level3Challenge =
  | Level3ChallengeReverse
  | Level3ChallengeErrorAnalysis
  | Level3ChallengeEfficiency
  | Level3ChallengeSynthesis
  | Level3ChallengeRealWorld
  | Level3ChallengeDerivation;

/**
 * Level 3 Challenges: Advanced multi-step problems requiring synthesis and analysis
 * Includes reverse engineering, error analysis, efficiency optimization, and real-world applications
 */
export const level3Challenges: Level3Challenge[] = [
  {
    id: 'L3-1',
    type: 'reverse',
    prompt: 'Nemandi byrjaði með 5000 mg og endaði með 0.005 kg. Hvaða umbreytingarstuðla notaði hann líklega?',
    setup: { start: '5000 mg', end: '0.005 kg', startValue: 5000, endValue: 0.005 },
    options: [
      {
        text: '1 g / 1000 mg, síðan 1 kg / 1000 g',
        factors: ['1 g / 1000 mg', '1 kg / 1000 g'],
        correct: true,
        steps: 2
      },
      {
        text: '1 kg / 1000000 mg',
        factors: ['1 kg / 1000000 mg'],
        correct: true,
        steps: 1
      },
      {
        text: '1000 g / 1 kg, síðan 1000 mg / 1 g',
        factors: ['1000 g / 1 kg', '1000 mg / 1 g'],
        correct: false,
        steps: 2
      }
    ],
    explanationPrompt: 'Útskýrðu hvernig umbreytingin virkar:'
  },
  {
    id: 'L3-2',
    type: 'error_analysis',
    prompt: 'María reyndi að breyta 250 mL í L. Hún fékk 250000 L. Hvað fór úrskeiðis og hvað er rétta svarið?',
    incorrectWork: '250 mL × (1000 mL / 1 L) = 250000 L',
    correctAnswer: 0.25,
    correctUnit: 'L',
    errorExplanation: 'María notaði stuðulinn öfugan - hún margfaldaði með mL í stað þess að deila',
    correctMethod: ['1 L / 1000 mL']
  },
  {
    id: 'L3-3',
    type: 'efficiency',
    prompt: 'Breyttu 0.000005 km í mm. Finndu skilvirkustu leiðina (fæst skref).',
    startValue: 0.000005,
    startUnit: 'km',
    targetUnit: 'mm',
    possiblePaths: [
      { steps: ['1000 m / 1 km', '1000 mm / 1 m'], stepCount: 2, efficient: true },
      { steps: ['1000 m / 1 km', '100 cm / 1 m', '10 mm / 1 cm'], stepCount: 3, efficient: false },
      { steps: ['100000 cm / 1 km', '10 mm / 1 cm'], stepCount: 2, efficient: true }
    ],
    targetAnswer: 5
  },
  {
    id: 'L3-4',
    type: 'synthesis',
    prompt: 'Þú mælir 50.0 mL af lausn með eðlismassa 2.50 g/mL. Hversu mörg kg er þetta? Gefðu svar í 3 markverðum stöfum.',
    startValue: 50.0,
    startUnit: 'mL',
    density: 2.50,
    densityUnit: 'g/mL',
    targetUnit: 'kg',
    expectedAnswer: 0.125,
    significantFigures: 3,
    requiredSteps: ['multiply by density', 'convert g to kg']
  },
  {
    id: 'L3-5',
    type: 'real_world',
    prompt: 'Þú átt 2.0 L af stofnlausn og þarft að útbúa 150 mL skammta. Hversu marga skammta getur þú útbúið?',
    startValue: 2.0,
    startUnit: 'L',
    portionSize: 150,
    portionUnit: 'mL',
    expectedAnswer: 13,
    requireInteger: true,
    explanation: 'Svar verður að vera heiltala vegna þess að ekki er hægt að útbúa hluta af skammti'
  },
  {
    id: 'L3-6',
    type: 'derivation',
    prompt: 'Hraði ljóss er 3.00 × 10⁸ m/s. Birtu svarið í km/klst.',
    startValue: 3.00e8,
    startUnit: 'm/s',
    targetUnit: 'km/klst',
    expectedAnswer: 1.08e12,
    scientificNotation: true,
    correctMethod: ['1 km / 1000 m', '3600 s / 1 klst']
  },
  {
    id: 'L3-7',
    type: 'reverse',
    prompt: 'Nemandi byrjaði með 72 km/klst og endaði með 20 m/s. Hvaða stuðla notaði hann?',
    setup: { start: '72 km/klst', end: '20 m/s', startValue: 72, endValue: 20 },
    options: [
      {
        text: '1000 m / 1 km, síðan 1 klst / 3600 s',
        factors: ['1000 m / 1 km', '1 klst / 3600 s'],
        correct: true,
        steps: 2
      },
      {
        text: '1 km / 1000 m, síðan 3600 s / 1 klst',
        factors: ['1 km / 1000 m', '3600 s / 1 klst'],
        correct: false,
        steps: 2
      }
    ],
    explanationPrompt: 'Útskýrðu umbreytinguna:'
  },
  {
    id: 'L3-8',
    type: 'synthesis',
    prompt: 'Eðlismassi kopar er 8.96 g/cm³. Breyttu þessu í kg/m³.',
    startValue: 8.96,
    startUnit: 'g/cm³',
    targetUnit: 'kg/m³',
    expectedAnswer: 8960,
    significantFigures: 3,
    requiredSteps: ['convert g to kg', 'convert cm³ to m³']
  },
  {
    id: 'L3-9',
    type: 'error_analysis',
    prompt: 'Jón reyndi að breyta 3 klst í sekúndur. Hann fékk 180 s. Hvað fór úrskeiðis?',
    incorrectWork: '3 klst × (60 mín / 1 klst) = 180',
    correctAnswer: 10800,
    correctUnit: 's',
    errorExplanation: 'Jón gleymdi að breyta mínútum í sekúndur',
    correctMethod: ['60 mín / 1 klst', '60 s / 1 mín']
  },
  {
    id: 'L3-10',
    type: 'efficiency',
    prompt: 'Breyttu 500000 mg í kg. Veldu skilvirkustu leiðina.',
    startValue: 500000,
    startUnit: 'mg',
    targetUnit: 'kg',
    possiblePaths: [
      { steps: ['1 g / 1000 mg', '1 kg / 1000 g'], stepCount: 2, efficient: true },
      { steps: ['1 kg / 1000000 mg'], stepCount: 1, efficient: true },
      { steps: ['1000 g / 1 kg'], stepCount: 1, efficient: false }
    ],
    targetAnswer: 0.5
  }
];
