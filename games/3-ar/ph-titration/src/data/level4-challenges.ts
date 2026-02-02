/**
 * Level 4: Ka Determination from Titration Curves
 *
 * Students learn to:
 * 1. Identify the half-equivalence point on a titration curve
 * 2. Understand that at half-equivalence, pH = pKa
 * 3. Calculate Ka from pKa
 */

export interface Level4Challenge {
  id: string;
  type: 'identify-half-eq' | 'read-pka' | 'calculate-ka' | 'full-analysis';
  titleIs: string;
  title: string;
  descriptionIs: string;
  description: string;

  // Titration data
  acidName: string;
  acidNameIs: string;
  acidFormula: string;
  analyteVolume: number;
  analyteMolarity: number;
  titrantFormula: string;
  titrantMolarity: number;

  // Curve data points for display
  curveData: Array<{ volume: number; pH: number }>;

  // Key points
  equivalenceVolume: number;
  halfEquivalenceVolume: number;
  halfEquivalencePH: number;  // This equals pKa
  actualPKa: number;
  actualKa: number;

  // Question-specific
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

// Generate titration curve data for weak acid + strong base
function generateWeakAcidCurve(
  analyteVolume: number,
  analyteMolarity: number,
  titrantMolarity: number,
  pKa: number,
  equivalencePH: number
): Array<{ volume: number; pH: number }> {
  const Ka = Math.pow(10, -pKa);
  const equivalenceVolume = (analyteVolume * analyteMolarity) / titrantMolarity;
  const halfEquivalenceVolume = equivalenceVolume / 2;

  // Initial pH (weak acid alone)
  const initialH = Math.sqrt(Ka * analyteMolarity);
  const initialPH = -Math.log10(initialH);

  const points: Array<{ volume: number; pH: number }> = [];

  // Before titration starts
  points.push({ volume: 0, pH: Math.round(initialPH * 100) / 100 });

  // Buffer region (0 to equivalence)
  for (let v = 2; v < equivalenceVolume; v += 2) {
    const fractionTitrated = v / equivalenceVolume;

    if (fractionTitrated < 0.98) {
      // Henderson-Hasselbalch: pH = pKa + log([A-]/[HA])
      const ratio = fractionTitrated / (1 - fractionTitrated);
      const pH = pKa + Math.log10(ratio);
      points.push({ volume: v, pH: Math.round(pH * 100) / 100 });
    }
  }

  // Half-equivalence point (pH = pKa)
  points.push({ volume: halfEquivalenceVolume, pH: pKa });

  // Near equivalence (steep rise)
  points.push({ volume: equivalenceVolume * 0.95, pH: pKa + 1.3 });
  points.push({ volume: equivalenceVolume * 0.98, pH: pKa + 1.7 });
  points.push({ volume: equivalenceVolume * 0.99, pH: pKa + 2.0 });

  // Equivalence point
  points.push({ volume: equivalenceVolume, pH: equivalencePH });

  // After equivalence (excess base)
  points.push({ volume: equivalenceVolume * 1.01, pH: equivalencePH + 1.0 });
  points.push({ volume: equivalenceVolume * 1.02, pH: equivalencePH + 1.5 });
  points.push({ volume: equivalenceVolume * 1.05, pH: equivalencePH + 1.8 });
  points.push({ volume: equivalenceVolume * 1.10, pH: 11.0 });
  points.push({ volume: equivalenceVolume * 1.20, pH: 11.5 });
  points.push({ volume: equivalenceVolume * 1.50, pH: 12.0 });

  // Sort by volume and remove duplicates
  const sorted = points.sort((a, b) => a.volume - b.volume);
  return sorted.filter((point, index, arr) =>
    index === 0 || point.volume !== arr[index - 1].volume
  );
}

export const LEVEL4_CHALLENGES: Level4Challenge[] = [
  // Challenge 1: Identify half-equivalence point (Acetic acid)
  {
    id: 'ka-1',
    type: 'identify-half-eq',
    titleIs: 'Finndu hálfan jafngildispunkt',
    title: 'Find the Half-Equivalence Point',
    descriptionIs: 'Títrun á 25.0 mL af 0.100 M ediksýru (CH₃COOH) með 0.100 M NaOH. Jafngildispunkturinn er við 25.0 mL. Hvert er rúmmálið við hálfan jafngildispunkt?',
    description: 'Titration of 25.0 mL of 0.100 M acetic acid (CH₃COOH) with 0.100 M NaOH. The equivalence point is at 25.0 mL. What is the volume at the half-equivalence point?',

    acidName: 'Acetic acid',
    acidNameIs: 'Ediksýra',
    acidFormula: 'CH₃COOH',
    analyteVolume: 25.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateWeakAcidCurve(25.0, 0.100, 0.100, 4.74, 8.72),

    equivalenceVolume: 25.0,
    halfEquivalenceVolume: 12.5,
    halfEquivalencePH: 4.74,
    actualPKa: 4.74,
    actualKa: 1.8e-5,

    correctAnswer: 12.5,
    answerUnit: 'mL',
    tolerance: 0.05,

    hintIs: 'Hálfur jafngildispunktur er þegar helmingur sýrunnar hefur hvarfast, þ.e. við hálft jafngildisrúmmál.',
    hint: 'The half-equivalence point is when half the acid has reacted, i.e., at half the equivalence volume.',
    explanationIs: 'Við hálfan jafngildispunkt (V = 12.5 mL), helmingur sýrunnar hefur hvarfast. Þá er [HA] = [A⁻] og pH = pKa.',
    explanation: 'At the half-equivalence point (V = 12.5 mL), half the acid has reacted. Then [HA] = [A⁻] and pH = pKa.',
    solutionStepsIs: [
      'Jafngildisrúmmál = 25.0 mL',
      'Hálfur jafngildispunktur = 25.0 ÷ 2 = 12.5 mL'
    ],
    solutionSteps: [
      'Equivalence volume = 25.0 mL',
      'Half-equivalence point = 25.0 ÷ 2 = 12.5 mL'
    ]
  },

  // Challenge 2: Read pKa from titration curve (Formic acid)
  {
    id: 'ka-2',
    type: 'read-pka',
    titleIs: 'Lestu pKa af kúrfunni',
    title: 'Read pKa from the Curve',
    descriptionIs: 'Títrunarkúrfan sýnir títrun á maurasýru (HCOOH) með NaOH. Jafngildispunkturinn er við 40.0 mL. Lestu pKa gildi sýrunnar af kúrfunni.',
    description: 'The titration curve shows titration of formic acid (HCOOH) with NaOH. The equivalence point is at 40.0 mL. Read the pKa value of the acid from the curve.',

    acidName: 'Formic acid',
    acidNameIs: 'Maurasýra',
    acidFormula: 'HCOOH',
    analyteVolume: 20.0,
    analyteMolarity: 0.200,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateWeakAcidCurve(20.0, 0.200, 0.100, 3.75, 8.35),

    equivalenceVolume: 40.0,
    halfEquivalenceVolume: 20.0,
    halfEquivalencePH: 3.75,
    actualPKa: 3.75,
    actualKa: 1.8e-4,

    correctAnswer: 3.75,
    answerUnit: '',
    tolerance: 0.10,

    hintIs: 'Við hálfan jafngildispunkt er pH = pKa. Finndu pH gildið þegar V = 20 mL.',
    hint: 'At the half-equivalence point, pH = pKa. Find the pH value when V = 20 mL.',
    explanationIs: 'Við V = 20 mL (hálfur jafngildispunktur), pH = 3.75, sem þýðir að pKa = 3.75 fyrir maurasýru.',
    explanation: 'At V = 20 mL (half-equivalence point), pH = 3.75, which means pKa = 3.75 for formic acid.',
    solutionStepsIs: [
      'Hálfur jafngildispunktur = 40.0 ÷ 2 = 20.0 mL',
      'Við V = 20 mL, pH = 3.75',
      'Við hálfan jafngildispunkt: pH = pKa',
      'Þess vegna pKa = 3.75'
    ],
    solutionSteps: [
      'Half-equivalence point = 40.0 ÷ 2 = 20.0 mL',
      'At V = 20 mL, pH = 3.75',
      'At half-equivalence point: pH = pKa',
      'Therefore pKa = 3.75'
    ]
  },

  // Challenge 3: Calculate Ka from pKa (HF)
  {
    id: 'ka-3',
    type: 'calculate-ka',
    titleIs: 'Reiknaðu Ka úr pKa',
    title: 'Calculate Ka from pKa',
    descriptionIs: 'Títrun á flússýru (HF) með NaOH sýnir að við hálfan jafngildispunkt er pH = 3.17. Reiknaðu Ka fyrir flússýru.',
    description: 'Titration of hydrofluoric acid (HF) with NaOH shows that at the half-equivalence point, pH = 3.17. Calculate Ka for hydrofluoric acid.',

    acidName: 'Hydrofluoric acid',
    acidNameIs: 'Flússýra',
    acidFormula: 'HF',
    analyteVolume: 30.0,
    analyteMolarity: 0.150,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateWeakAcidCurve(30.0, 0.150, 0.100, 3.17, 8.08),

    equivalenceVolume: 45.0,
    halfEquivalenceVolume: 22.5,
    halfEquivalencePH: 3.17,
    actualPKa: 3.17,
    actualKa: 6.76e-4,

    correctAnswer: 6.76e-4,
    answerUnit: '',
    tolerance: 0.15,

    hintIs: 'Þegar pH = pKa, þá gildir Ka = 10^(-pKa). Notaðu veldisvísisfallið.',
    hint: 'When pH = pKa, Ka = 10^(-pKa). Use the exponential function.',
    explanationIs: 'Við hálfan jafngildispunkt, pH = pKa = 3.17. Ka = 10^(-3.17) = 6.76 × 10⁻⁴.',
    explanation: 'At half-equivalence point, pH = pKa = 3.17. Ka = 10^(-3.17) = 6.76 × 10⁻⁴.',
    solutionStepsIs: [
      'Við hálfan jafngildispunkt: pH = pKa = 3.17',
      'Ka = 10^(-pKa)',
      'Ka = 10^(-3.17)',
      'Ka = 6.76 × 10⁻⁴'
    ],
    solutionSteps: [
      'At half-equivalence point: pH = pKa = 3.17',
      'Ka = 10^(-pKa)',
      'Ka = 10^(-3.17)',
      'Ka = 6.76 × 10⁻⁴'
    ]
  },

  // Challenge 4: Full analysis (Benzoic acid)
  {
    id: 'ka-4',
    type: 'full-analysis',
    titleIs: 'Heildargreining: Bensoesýra',
    title: 'Full Analysis: Benzoic Acid',
    descriptionIs: 'Óþekkt veik sýra er títruð með NaOH. Jafngildispunktur er við 25.0 mL. Notaðu títrunarkúrfuna til að finna Ka sýrunnar.',
    description: 'An unknown weak acid is titrated with NaOH. The equivalence point is at 25.0 mL. Use the titration curve to find the Ka of the acid.',

    acidName: 'Benzoic acid',
    acidNameIs: 'Bensoesýra',
    acidFormula: 'C₆H₅COOH',
    analyteVolume: 25.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateWeakAcidCurve(25.0, 0.100, 0.100, 4.19, 8.60),

    equivalenceVolume: 25.0,
    halfEquivalenceVolume: 12.5,
    halfEquivalencePH: 4.19,
    actualPKa: 4.19,
    actualKa: 6.46e-5,

    correctAnswer: 6.46e-5,
    answerUnit: '',
    tolerance: 0.15,

    hintIs: 'Finndu fyrst hálfan jafngildispunkt (12.5 mL), lestu pH, og notaðu Ka = 10^(-pH).',
    hint: 'First find half-equivalence point (12.5 mL), read pH, then use Ka = 10^(-pH).',
    explanationIs: 'Hálfur jafngildispunktur er við 12.5 mL þar sem pH = 4.19. Þar sem pH = pKa við þennan punkt, Ka = 10^(-4.19) = 6.46 × 10⁻⁵.',
    explanation: 'Half-equivalence point is at 12.5 mL where pH = 4.19. Since pH = pKa at this point, Ka = 10^(-4.19) = 6.46 × 10⁻⁵.',
    solutionStepsIs: [
      'Jafngildisrúmmál = 25.0 mL',
      'Hálfur jafngildispunktur = 25.0 ÷ 2 = 12.5 mL',
      'Við V = 12.5 mL, pH = 4.19',
      'Við hálfan jafngildispunkt: pH = pKa = 4.19',
      'Ka = 10^(-4.19) = 6.46 × 10⁻⁵'
    ],
    solutionSteps: [
      'Equivalence volume = 25.0 mL',
      'Half-equivalence point = 25.0 ÷ 2 = 12.5 mL',
      'At V = 12.5 mL, pH = 4.19',
      'At half-equivalence point: pH = pKa = 4.19',
      'Ka = 10^(-4.19) = 6.46 × 10⁻⁵'
    ]
  },

  // Challenge 5: Identify from curve with calculation (Propanoic acid)
  {
    id: 'ka-5',
    type: 'full-analysis',
    titleIs: 'Ákvarðaðu Ka fyrir própansýru',
    title: 'Determine Ka for Propanoic Acid',
    descriptionIs: '20.0 mL af 0.150 M própansýru (CH₃CH₂COOH) er títruð með 0.100 M NaOH. Jafngildispunktur er við 30.0 mL. Finndu Ka.',
    description: '20.0 mL of 0.150 M propanoic acid (CH₃CH₂COOH) is titrated with 0.100 M NaOH. Equivalence point is at 30.0 mL. Find Ka.',

    acidName: 'Propanoic acid',
    acidNameIs: 'Própansýra',
    acidFormula: 'CH₃CH₂COOH',
    analyteVolume: 20.0,
    analyteMolarity: 0.150,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateWeakAcidCurve(20.0, 0.150, 0.100, 4.87, 8.80),

    equivalenceVolume: 30.0,
    halfEquivalenceVolume: 15.0,
    halfEquivalencePH: 4.87,
    actualPKa: 4.87,
    actualKa: 1.35e-5,

    correctAnswer: 1.35e-5,
    answerUnit: '',
    tolerance: 0.15,

    hintIs: 'Hálfur jafngildispunktur = 30 ÷ 2 = 15 mL. Lestu pH við þetta rúmmál og reiknaðu Ka = 10^(-pH).',
    hint: 'Half-equivalence point = 30 ÷ 2 = 15 mL. Read pH at this volume and calculate Ka = 10^(-pH).',
    explanationIs: 'Við 15 mL (hálfur jafngildispunktur), pH = 4.87. Ka = 10^(-4.87) = 1.35 × 10⁻⁵.',
    explanation: 'At 15 mL (half-equivalence point), pH = 4.87. Ka = 10^(-4.87) = 1.35 × 10⁻⁵.',
    solutionStepsIs: [
      'Hálfur jafngildispunktur = 30.0 ÷ 2 = 15.0 mL',
      'Við V = 15.0 mL, pH = 4.87',
      'pKa = 4.87',
      'Ka = 10^(-4.87) = 1.35 × 10⁻⁵'
    ],
    solutionSteps: [
      'Half-equivalence point = 30.0 ÷ 2 = 15.0 mL',
      'At V = 15.0 mL, pH = 4.87',
      'pKa = 4.87',
      'Ka = 10^(-4.87) = 1.35 × 10⁻⁵'
    ]
  },

  // Challenge 6: What is pKa (Lactic acid)
  {
    id: 'ka-6',
    type: 'read-pka',
    titleIs: 'Ákvarðaðu pKa fyrir mjólkursýru',
    title: 'Determine pKa for Lactic Acid',
    descriptionIs: 'Mjólkursýra (CH₃CHOHCOOH) er títruð með NaOH. Jafngildispunkturinn er við 20.0 mL. Hvert er pKa gildið?',
    description: 'Lactic acid (CH₃CHOHCOOH) is titrated with NaOH. The equivalence point is at 20.0 mL. What is the pKa value?',

    acidName: 'Lactic acid',
    acidNameIs: 'Mjólkursýra',
    acidFormula: 'CH₃CHOHCOOH',
    analyteVolume: 20.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateWeakAcidCurve(20.0, 0.100, 0.100, 3.86, 8.25),

    equivalenceVolume: 20.0,
    halfEquivalenceVolume: 10.0,
    halfEquivalencePH: 3.86,
    actualPKa: 3.86,
    actualKa: 1.38e-4,

    correctAnswer: 3.86,
    answerUnit: '',
    tolerance: 0.10,

    hintIs: 'Finndu pH gildið við hálfan jafngildispunkt (10 mL). Þetta gildi er pKa.',
    hint: 'Find the pH value at half-equivalence point (10 mL). This value is pKa.',
    explanationIs: 'Við 10 mL (hálfur jafngildispunktur), pH = pKa = 3.86 fyrir mjólkursýru.',
    explanation: 'At 10 mL (half-equivalence point), pH = pKa = 3.86 for lactic acid.',
    solutionStepsIs: [
      'Hálfur jafngildispunktur = 20.0 ÷ 2 = 10.0 mL',
      'Við V = 10.0 mL, pH = 3.86',
      'pKa = 3.86'
    ],
    solutionSteps: [
      'Half-equivalence point = 20.0 ÷ 2 = 10.0 mL',
      'At V = 10.0 mL, pH = 3.86',
      'pKa = 3.86'
    ]
  }
];

export function getLevel4ChallengesByType(type: Level4Challenge['type']): Level4Challenge[] {
  return LEVEL4_CHALLENGES.filter(c => c.type === type);
}
