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
  type: 'identify-half-eq' | 'read-pka' | 'calculate-ka' | 'full-analysis' | 'polyprotic-read-pka' | 'polyprotic-full-analysis' | 'curve-interpretation';
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

  // Key points (monoprotic)
  equivalenceVolume?: number;
  halfEquivalenceVolume?: number;
  halfEquivalencePH?: number;  // This equals pKa
  actualPKa?: number;
  actualKa?: number;

  // Key points (polyprotic)
  isPolyprotic?: boolean;
  equivalenceVolumes?: number[];
  halfEquivalenceVolumes?: number[];
  halfEquivalencePHs?: number[];  // pKa1, pKa2, etc.
  actualPKas?: number[];
  actualKas?: number[];

  // Question-specific (for numerical answers)
  correctAnswer: number | string;  // Can be number for calculations or string for curve interpretation
  answerUnit: string;
  tolerance: number;

  // For polyprotic questions asking for specific pKa
  targetPKa?: 1 | 2 | 3;  // Which pKa to find

  // For curve interpretation (multiple choice)
  isMultipleChoice?: boolean;
  options?: string[];
  optionsIs?: string[];

  // For hiding labels in curve interpretation
  hideLabels?: boolean;

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

// Generate titration curve data for diprotic acid + strong base
function generateDiproticAcidCurve(
  analyteVolume: number,
  analyteMolarity: number,
  titrantMolarity: number,
  pKa1: number,
  pKa2: number,
  initialPH: number
): Array<{ volume: number; pH: number }> {
  const eq1 = (analyteVolume * analyteMolarity) / titrantMolarity;
  const eq2 = eq1 * 2;
  const half1 = eq1 / 2;
  const half2 = eq1 + eq1 / 2;

  const points: Array<{ volume: number; pH: number }> = [];

  // Initial pH
  points.push({ volume: 0, pH: initialPH });

  // First buffer region (before first equivalence)
  for (let v = 2; v < eq1 * 0.9; v += 3) {
    const frac = v / eq1;
    if (frac < 0.9) {
      const ratio = frac / (1 - frac);
      const pH = pKa1 + Math.log10(ratio);
      points.push({ volume: v, pH: Math.round(pH * 100) / 100 });
    }
  }

  // First half-equivalence (pH = pKa1)
  points.push({ volume: half1, pH: pKa1 });

  // Approach first equivalence point
  points.push({ volume: eq1 * 0.95, pH: pKa1 + 1.2 });
  points.push({ volume: eq1 * 0.99, pH: pKa1 + 1.5 });

  // First equivalence point
  const eq1PH = (pKa1 + pKa2) / 2; // pH at first eq point is average of pKa1 and pKa2
  points.push({ volume: eq1, pH: Math.round(eq1PH * 100) / 100 });

  // Second buffer region
  for (let v = eq1 + 3; v < eq2 * 0.9; v += 3) {
    const excessBase = v - eq1;
    const frac = excessBase / eq1;
    if (frac > 0.1 && frac < 0.9) {
      const ratio = frac / (1 - frac);
      const pH = pKa2 + Math.log10(ratio);
      points.push({ volume: v, pH: Math.round(pH * 100) / 100 });
    }
  }

  // Second half-equivalence (pH = pKa2)
  points.push({ volume: half2, pH: pKa2 });

  // Approach second equivalence point
  points.push({ volume: eq2 * 0.95, pH: pKa2 + 1.2 });
  points.push({ volume: eq2 * 0.99, pH: pKa2 + 1.5 });

  // Second equivalence point
  const eq2PH = pKa2 + 2.5; // Approximate pH at second eq point
  points.push({ volume: eq2, pH: Math.min(eq2PH, 9.5) });

  // After second equivalence (excess base)
  points.push({ volume: eq2 * 1.05, pH: 10.5 });
  points.push({ volume: eq2 * 1.10, pH: 11.0 });
  points.push({ volume: eq2 * 1.20, pH: 11.5 });

  // Sort and dedupe
  const sorted = points.sort((a, b) => a.volume - b.volume);
  return sorted.filter((point, index, arr) =>
    index === 0 || point.volume !== arr[index - 1].volume
  );
}

// Generate titration curve data for triprotic acid + strong base
function generateTriproticAcidCurve(
  analyteVolume: number,
  analyteMolarity: number,
  titrantMolarity: number,
  pKa1: number,
  pKa2: number,
  pKa3: number,
  initialPH: number
): Array<{ volume: number; pH: number }> {
  const eq1 = (analyteVolume * analyteMolarity) / titrantMolarity;
  const eq2 = eq1 * 2;
  const eq3 = eq1 * 3;
  const half1 = eq1 / 2;
  const half2 = eq1 + eq1 / 2;
  const half3 = eq2 + eq1 / 2;

  const points: Array<{ volume: number; pH: number }> = [];

  // Initial pH
  points.push({ volume: 0, pH: initialPH });

  // First buffer region
  for (let v = 2; v < eq1 * 0.8; v += 4) {
    const frac = v / eq1;
    if (frac < 0.8) {
      const ratio = frac / (1 - frac);
      const pH = pKa1 + Math.log10(ratio);
      points.push({ volume: v, pH: Math.round(pH * 100) / 100 });
    }
  }

  // First half-eq (pH = pKa1)
  points.push({ volume: half1, pH: pKa1 });

  // First equivalence
  points.push({ volume: eq1 * 0.95, pH: pKa1 + 1.0 });
  const eq1PH = (pKa1 + pKa2) / 2;
  points.push({ volume: eq1, pH: Math.round(eq1PH * 100) / 100 });

  // Second buffer region
  for (let v = eq1 + 4; v < eq2 * 0.8; v += 4) {
    const excessBase = v - eq1;
    const frac = excessBase / eq1;
    if (frac > 0.2 && frac < 0.8) {
      const ratio = frac / (1 - frac);
      const pH = pKa2 + Math.log10(ratio);
      points.push({ volume: v, pH: Math.round(pH * 100) / 100 });
    }
  }

  // Second half-eq (pH = pKa2)
  points.push({ volume: half2, pH: pKa2 });

  // Second equivalence
  points.push({ volume: eq2 * 0.95, pH: pKa2 + 1.0 });
  const eq2PH = (pKa2 + pKa3) / 2;
  points.push({ volume: eq2, pH: Math.round(eq2PH * 100) / 100 });

  // Third buffer region
  for (let v = eq2 + 4; v < eq3 * 0.8; v += 4) {
    const excessBase = v - eq2;
    const frac = excessBase / eq1;
    if (frac > 0.2 && frac < 0.8) {
      const ratio = frac / (1 - frac);
      const pH = pKa3 + Math.log10(ratio);
      points.push({ volume: v, pH: Math.min(Math.round(pH * 100) / 100, 12.5) });
    }
  }

  // Third half-eq (pH = pKa3, but capped)
  points.push({ volume: half3, pH: Math.min(pKa3, 12.3) });

  // Third equivalence
  points.push({ volume: eq3, pH: 12.4 });

  // After third eq (excess base)
  points.push({ volume: eq3 * 1.1, pH: 12.8 });

  // Sort and dedupe
  const sorted = points.sort((a, b) => a.volume - b.volume);
  return sorted.filter((point, index, arr) =>
    index === 0 || point.volume !== arr[index - 1].volume
  );
}

// Generate titration curve data for strong acid + strong base
function generateStrongAcidCurve(
  analyteVolume: number,
  analyteMolarity: number,
  titrantMolarity: number
): Array<{ volume: number; pH: number }> {
  const equivalenceVolume = (analyteVolume * analyteMolarity) / titrantMolarity;

  // Initial pH (strong acid)
  const initialH = analyteMolarity;
  const initialPH = -Math.log10(initialH);

  const points: Array<{ volume: number; pH: number }> = [];

  // Initial pH
  points.push({ volume: 0, pH: Math.round(initialPH * 100) / 100 });

  // Before equivalence - gradual increase
  for (let v = 2; v < equivalenceVolume; v += 2) {
    const molesAcidLeft = analyteMolarity * analyteVolume - titrantMolarity * v;
    const totalVolume = analyteVolume + v;
    const H = molesAcidLeft / totalVolume;
    if (H > 0) {
      const pH = -Math.log10(H);
      points.push({ volume: v, pH: Math.round(pH * 100) / 100 });
    }
  }

  // Near equivalence - steep rise
  points.push({ volume: equivalenceVolume * 0.9, pH: 2.3 });
  points.push({ volume: equivalenceVolume * 0.95, pH: 3.0 });
  points.push({ volume: equivalenceVolume * 0.99, pH: 4.3 });

  // Equivalence point (pH = 7 for strong acid + strong base)
  points.push({ volume: equivalenceVolume, pH: 7.0 });

  // After equivalence - excess base
  points.push({ volume: equivalenceVolume * 1.01, pH: 9.7 });
  points.push({ volume: equivalenceVolume * 1.02, pH: 10.0 });
  points.push({ volume: equivalenceVolume * 1.05, pH: 10.7 });
  points.push({ volume: equivalenceVolume * 1.10, pH: 11.2 });
  points.push({ volume: equivalenceVolume * 1.20, pH: 11.5 });
  points.push({ volume: equivalenceVolume * 1.50, pH: 12.0 });

  // Sort by volume
  return points.sort((a, b) => a.volume - b.volume);
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
  },

  // ==================== POLYPROTIC CHALLENGES ====================

  // Challenge 7: Diprotic acid - Read pKa1 (Oxalic acid)
  {
    id: 'ka-7',
    type: 'polyprotic-read-pka',
    titleIs: 'Tvíprótónsýra: Finndu pKa₁',
    title: 'Diprotic Acid: Find pKa₁',
    descriptionIs: 'Títrunarkúrfan sýnir títrun á oxalsýru (H₂C₂O₄) með NaOH. Þetta er tvíprótónsýra með tvo jafngildispunkta. Finndu pKa₁ gildi sýrunnar.',
    description: 'The titration curve shows titration of oxalic acid (H₂C₂O₄) with NaOH. This is a diprotic acid with two equivalence points. Find the pKa₁ value of the acid.',

    acidName: 'Oxalic acid',
    acidNameIs: 'Oxalsýra',
    acidFormula: 'H₂C₂O₄',
    analyteVolume: 25.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateDiproticAcidCurve(25.0, 0.100, 0.100, 1.25, 4.27, 1.2),

    isPolyprotic: true,
    equivalenceVolumes: [25.0, 50.0],
    halfEquivalenceVolumes: [12.5, 37.5],
    halfEquivalencePHs: [1.25, 4.27],
    actualPKas: [1.25, 4.27],
    actualKas: [5.6e-2, 5.4e-5],

    targetPKa: 1,
    correctAnswer: 1.25,
    answerUnit: '',
    tolerance: 0.15,

    hintIs: 'Fyrsti hálfur jafngildispunktur er við hálft fyrsta jafngildisrúmmál. Við þann punkt er pH = pKa₁.',
    hint: 'The first half-equivalence point is at half of the first equivalence volume. At that point, pH = pKa₁.',
    explanationIs: 'Fyrsti jafngildispunktur er við 25 mL, svo fyrsti hálfur jafngildispunktur er við 12.5 mL. Við V = 12.5 mL, pH = pKa₁ = 1.25.',
    explanation: 'First equivalence point is at 25 mL, so first half-equivalence point is at 12.5 mL. At V = 12.5 mL, pH = pKa₁ = 1.25.',
    solutionStepsIs: [
      'Fyrsti jafngildispunktur = 25.0 mL',
      'Fyrsti hálfur jafngildispunktur = 25.0 ÷ 2 = 12.5 mL',
      'Við V = 12.5 mL, pH = 1.25',
      'pKa₁ = 1.25'
    ],
    solutionSteps: [
      'First equivalence point = 25.0 mL',
      'First half-equivalence point = 25.0 ÷ 2 = 12.5 mL',
      'At V = 12.5 mL, pH = 1.25',
      'pKa₁ = 1.25'
    ]
  },

  // Challenge 8: Diprotic acid - Read pKa2 (Oxalic acid)
  {
    id: 'ka-8',
    type: 'polyprotic-read-pka',
    titleIs: 'Tvíprótónsýra: Finndu pKa₂',
    title: 'Diprotic Acid: Find pKa₂',
    descriptionIs: 'Sama títrunarkúrfa fyrir oxalsýru (H₂C₂O₄). Fyrsti jafngildispunktur er við 25 mL og annar við 50 mL. Finndu pKa₂ gildi sýrunnar.',
    description: 'Same titration curve for oxalic acid (H₂C₂O₄). First equivalence point is at 25 mL and second at 50 mL. Find the pKa₂ value of the acid.',

    acidName: 'Oxalic acid',
    acidNameIs: 'Oxalsýra',
    acidFormula: 'H₂C₂O₄',
    analyteVolume: 25.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateDiproticAcidCurve(25.0, 0.100, 0.100, 1.25, 4.27, 1.2),

    isPolyprotic: true,
    equivalenceVolumes: [25.0, 50.0],
    halfEquivalenceVolumes: [12.5, 37.5],
    halfEquivalencePHs: [1.25, 4.27],
    actualPKas: [1.25, 4.27],
    actualKas: [5.6e-2, 5.4e-5],

    targetPKa: 2,
    correctAnswer: 4.27,
    answerUnit: '',
    tolerance: 0.15,

    hintIs: 'Annar hálfur jafngildispunktur er mitt á milli fyrsta og annars jafngildispunkts. Við þann punkt er pH = pKa₂.',
    hint: 'The second half-equivalence point is midway between the first and second equivalence points. At that point, pH = pKa₂.',
    explanationIs: 'Annar hálfur jafngildispunktur er við (25 + 50)/2 = 37.5 mL. Við V = 37.5 mL, pH = pKa₂ = 4.27.',
    explanation: 'Second half-equivalence point is at (25 + 50)/2 = 37.5 mL. At V = 37.5 mL, pH = pKa₂ = 4.27.',
    solutionStepsIs: [
      'Fyrsti jafngildispunktur = 25.0 mL',
      'Annar jafngildispunktur = 50.0 mL',
      'Annar hálfur jafngildispunktur = 25.0 + (50.0 - 25.0)/2 = 37.5 mL',
      'Við V = 37.5 mL, pH = 4.27',
      'pKa₂ = 4.27'
    ],
    solutionSteps: [
      'First equivalence point = 25.0 mL',
      'Second equivalence point = 50.0 mL',
      'Second half-equivalence point = 25.0 + (50.0 - 25.0)/2 = 37.5 mL',
      'At V = 37.5 mL, pH = 4.27',
      'pKa₂ = 4.27'
    ]
  },

  // Challenge 9: Diprotic acid - Full analysis (Carbonic acid)
  {
    id: 'ka-9',
    type: 'polyprotic-full-analysis',
    titleIs: 'Tvíprótónsýra: Heildargreining',
    title: 'Diprotic Acid: Full Analysis',
    descriptionIs: 'Kolsýra (H₂CO₃) er títruð með NaOH. Jafngildispunktar eru við 20 mL og 40 mL. Reiknaðu Ka₁ fyrir sýruna.',
    description: 'Carbonic acid (H₂CO₃) is titrated with NaOH. Equivalence points are at 20 mL and 40 mL. Calculate Ka₁ for the acid.',

    acidName: 'Carbonic acid',
    acidNameIs: 'Kolsýra',
    acidFormula: 'H₂CO₃',
    analyteVolume: 20.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateDiproticAcidCurve(20.0, 0.100, 0.100, 6.35, 10.33, 4.0),

    isPolyprotic: true,
    equivalenceVolumes: [20.0, 40.0],
    halfEquivalenceVolumes: [10.0, 30.0],
    halfEquivalencePHs: [6.35, 10.33],
    actualPKas: [6.35, 10.33],
    actualKas: [4.47e-7, 4.68e-11],

    targetPKa: 1,
    correctAnswer: 4.47e-7,
    answerUnit: '',
    tolerance: 0.20,

    hintIs: 'Finndu fyrsta hálfan jafngildispunkt (10 mL), lestu pH = pKa₁, og reiknaðu Ka₁ = 10^(-pKa₁).',
    hint: 'Find the first half-equivalence point (10 mL), read pH = pKa₁, then calculate Ka₁ = 10^(-pKa₁).',
    explanationIs: 'Við V = 10 mL, pH = pKa₁ = 6.35. Ka₁ = 10^(-6.35) = 4.47 × 10⁻⁷.',
    explanation: 'At V = 10 mL, pH = pKa₁ = 6.35. Ka₁ = 10^(-6.35) = 4.47 × 10⁻⁷.',
    solutionStepsIs: [
      'Fyrsti jafngildispunktur = 20.0 mL',
      'Fyrsti hálfur jafngildispunktur = 10.0 mL',
      'Við V = 10.0 mL, pH = 6.35',
      'pKa₁ = 6.35',
      'Ka₁ = 10^(-6.35) = 4.47 × 10⁻⁷'
    ],
    solutionSteps: [
      'First equivalence point = 20.0 mL',
      'First half-equivalence point = 10.0 mL',
      'At V = 10.0 mL, pH = 6.35',
      'pKa₁ = 6.35',
      'Ka₁ = 10^(-6.35) = 4.47 × 10⁻⁷'
    ]
  },

  // Challenge 10: Triprotic acid - Read pKa2 (Phosphoric acid)
  {
    id: 'ka-10',
    type: 'polyprotic-read-pka',
    titleIs: 'Þríprótónsýra: Finndu pKa₂',
    title: 'Triprotic Acid: Find pKa₂',
    descriptionIs: 'Fosfórsýra (H₃PO₄) er þríprótónsýra. Títrunarkúrfan sýnir þrjá jafngildispunkta við 15, 30 og 45 mL. Finndu pKa₂ gildi sýrunnar.',
    description: 'Phosphoric acid (H₃PO₄) is a triprotic acid. The titration curve shows three equivalence points at 15, 30, and 45 mL. Find the pKa₂ value of the acid.',

    acidName: 'Phosphoric acid',
    acidNameIs: 'Fosfórsýra',
    acidFormula: 'H₃PO₄',
    analyteVolume: 15.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateTriproticAcidCurve(15.0, 0.100, 0.100, 2.15, 7.20, 12.35, 1.5),

    isPolyprotic: true,
    equivalenceVolumes: [15.0, 30.0, 45.0],
    halfEquivalenceVolumes: [7.5, 22.5, 37.5],
    halfEquivalencePHs: [2.15, 7.20, 12.35],
    actualPKas: [2.15, 7.20, 12.35],
    actualKas: [7.08e-3, 6.31e-8, 4.47e-13],

    targetPKa: 2,
    correctAnswer: 7.20,
    answerUnit: '',
    tolerance: 0.15,

    hintIs: 'Annar hálfur jafngildispunktur er mitt á milli fyrsta og annars jafngildispunkts ((15+30)/2 = 22.5 mL).',
    hint: 'The second half-equivalence point is midway between the first and second equivalence points ((15+30)/2 = 22.5 mL).',
    explanationIs: 'Annar hálfur jafngildispunktur er við 22.5 mL. Við þetta rúmmál er pH = pKa₂ = 7.20.',
    explanation: 'Second half-equivalence point is at 22.5 mL. At this volume, pH = pKa₂ = 7.20.',
    solutionStepsIs: [
      'Fyrsti jafngildispunktur = 15.0 mL',
      'Annar jafngildispunktur = 30.0 mL',
      'Annar hálfur jafngildispunktur = 15.0 + (30.0 - 15.0)/2 = 22.5 mL',
      'Við V = 22.5 mL, pH = 7.20',
      'pKa₂ = 7.20'
    ],
    solutionSteps: [
      'First equivalence point = 15.0 mL',
      'Second equivalence point = 30.0 mL',
      'Second half-equivalence point = 15.0 + (30.0 - 15.0)/2 = 22.5 mL',
      'At V = 22.5 mL, pH = 7.20',
      'pKa₂ = 7.20'
    ]
  },

  // Challenge 11: Triprotic acid - Calculate Ka1 (Citric acid)
  {
    id: 'ka-11',
    type: 'polyprotic-full-analysis',
    titleIs: 'Þríprótónsýra: Reiknaðu Ka₁',
    title: 'Triprotic Acid: Calculate Ka₁',
    descriptionIs: 'Sítrónusýra (C₆H₈O₇) er þríprótónsýra. Fyrsti jafngildispunktur er við 20 mL. Reiknaðu Ka₁ úr títrunarkúrfunni.',
    description: 'Citric acid (C₆H₈O₇) is a triprotic acid. First equivalence point is at 20 mL. Calculate Ka₁ from the titration curve.',

    acidName: 'Citric acid',
    acidNameIs: 'Sítrónusýra',
    acidFormula: 'C₆H₈O₇',
    analyteVolume: 20.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateTriproticAcidCurve(20.0, 0.100, 0.100, 3.13, 4.76, 6.40, 1.8),

    isPolyprotic: true,
    equivalenceVolumes: [20.0, 40.0, 60.0],
    halfEquivalenceVolumes: [10.0, 30.0, 50.0],
    halfEquivalencePHs: [3.13, 4.76, 6.40],
    actualPKas: [3.13, 4.76, 6.40],
    actualKas: [7.41e-4, 1.74e-5, 3.98e-7],

    targetPKa: 1,
    correctAnswer: 7.41e-4,
    answerUnit: '',
    tolerance: 0.20,

    hintIs: 'Fyrsti hálfur jafngildispunktur = 20/2 = 10 mL. Lestu pH við þetta rúmmál og reiknaðu Ka₁ = 10^(-pH).',
    hint: 'First half-equivalence point = 20/2 = 10 mL. Read pH at this volume and calculate Ka₁ = 10^(-pH).',
    explanationIs: 'Við V = 10 mL, pH = pKa₁ = 3.13. Ka₁ = 10^(-3.13) = 7.41 × 10⁻⁴.',
    explanation: 'At V = 10 mL, pH = pKa₁ = 3.13. Ka₁ = 10^(-3.13) = 7.41 × 10⁻⁴.',
    solutionStepsIs: [
      'Fyrsti jafngildispunktur = 20.0 mL',
      'Fyrsti hálfur jafngildispunktur = 10.0 mL',
      'Við V = 10.0 mL, pH = 3.13',
      'pKa₁ = 3.13',
      'Ka₁ = 10^(-3.13) = 7.41 × 10⁻⁴'
    ],
    solutionSteps: [
      'First equivalence point = 20.0 mL',
      'First half-equivalence point = 10.0 mL',
      'At V = 10.0 mL, pH = 3.13',
      'pKa₁ = 3.13',
      'Ka₁ = 10^(-3.13) = 7.41 × 10⁻⁴'
    ]
  },

  // Challenge 12: Diprotic acid - Full analysis (Sulfurous acid)
  {
    id: 'ka-12',
    type: 'polyprotic-full-analysis',
    titleIs: 'Tvíprótónsýra: Ákvarðaðu Ka₂',
    title: 'Diprotic Acid: Determine Ka₂',
    descriptionIs: 'Brennisteinssýrling (H₂SO₃) er títruð með NaOH. Jafngildispunktar eru við 30 mL og 60 mL. Reiknaðu Ka₂.',
    description: 'Sulfurous acid (H₂SO₃) is titrated with NaOH. Equivalence points are at 30 mL and 60 mL. Calculate Ka₂.',

    acidName: 'Sulfurous acid',
    acidNameIs: 'Brennisteinssýrlingur',
    acidFormula: 'H₂SO₃',
    analyteVolume: 30.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateDiproticAcidCurve(30.0, 0.100, 0.100, 1.81, 6.91, 1.3),

    isPolyprotic: true,
    equivalenceVolumes: [30.0, 60.0],
    halfEquivalenceVolumes: [15.0, 45.0],
    halfEquivalencePHs: [1.81, 6.91],
    actualPKas: [1.81, 6.91],
    actualKas: [1.55e-2, 1.23e-7],

    targetPKa: 2,
    correctAnswer: 1.23e-7,
    answerUnit: '',
    tolerance: 0.20,

    hintIs: 'Annar hálfur jafngildispunktur = (30+60)/2 = 45 mL. Reiknaðu Ka₂ = 10^(-pKa₂).',
    hint: 'Second half-equivalence point = (30+60)/2 = 45 mL. Calculate Ka₂ = 10^(-pKa₂).',
    explanationIs: 'Við V = 45 mL, pH = pKa₂ = 6.91. Ka₂ = 10^(-6.91) = 1.23 × 10⁻⁷.',
    explanation: 'At V = 45 mL, pH = pKa₂ = 6.91. Ka₂ = 10^(-6.91) = 1.23 × 10⁻⁷.',
    solutionStepsIs: [
      'Fyrsti jafngildispunktur = 30.0 mL',
      'Annar jafngildispunktur = 60.0 mL',
      'Annar hálfur jafngildispunktur = 30.0 + (60.0 - 30.0)/2 = 45.0 mL',
      'Við V = 45.0 mL, pH = 6.91',
      'pKa₂ = 6.91',
      'Ka₂ = 10^(-6.91) = 1.23 × 10⁻⁷'
    ],
    solutionSteps: [
      'First equivalence point = 30.0 mL',
      'Second equivalence point = 60.0 mL',
      'Second half-equivalence point = 30.0 + (60.0 - 30.0)/2 = 45.0 mL',
      'At V = 45.0 mL, pH = 6.91',
      'pKa₂ = 6.91',
      'Ka₂ = 10^(-6.91) = 1.23 × 10⁻⁷'
    ]
  },

  // ==================== CURVE INTERPRETATION CHALLENGES ====================

  // Challenge 13: Identify acid type (strong vs weak)
  {
    id: 'ci-1',
    type: 'curve-interpretation',
    titleIs: 'Greining kúrfu: Tegund sýru',
    title: 'Curve Interpretation: Acid Type',
    descriptionIs: 'Skoðaðu títrunarkúrfuna. Kúrfan sýnir títrun á óþekktri sýru með NaOH. Hvort er þetta sterk eða veik sýra?',
    description: 'Examine the titration curve. The curve shows titration of an unknown acid with NaOH. Is this a strong or weak acid?',

    acidName: 'Unknown (Formic acid)',
    acidNameIs: 'Óþekkt (Maurasýra)',
    acidFormula: '?',
    analyteVolume: 20.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateWeakAcidCurve(20.0, 0.100, 0.100, 3.75, 8.35),

    equivalenceVolume: 20.0,
    halfEquivalenceVolume: 10.0,
    halfEquivalencePH: 3.75,
    actualPKa: 3.75,
    hideLabels: true,

    isMultipleChoice: true,
    options: ['Strong acid', 'Weak acid'],
    optionsIs: ['Sterk sýra', 'Veik sýra'],
    correctAnswer: 'Veik sýra',
    answerUnit: '',
    tolerance: 0,

    hintIs: 'Skoðaðu upphafspH og lögun kúrfunnar. Veik sýra hefur hærra upphafspH og breytilegri pH í stuðpúðasvæðinu.',
    hint: 'Look at the initial pH and curve shape. A weak acid has higher initial pH and gradual pH change in the buffer region.',
    explanationIs: 'Þetta er veik sýra vegna þess að: 1) UpphafspH (~2.4) er hærra en sterk sýra (væri ~1), 2) Það er greinilegur stuðpúðasvæði með hægri pH breytingu, 3) pH við jafngildispunkt er yfir 7 (um 8.4).',
    explanation: 'This is a weak acid because: 1) Initial pH (~2.4) is higher than a strong acid (would be ~1), 2) There is a distinct buffer region with gradual pH change, 3) pH at equivalence point is above 7 (around 8.4).',
    solutionStepsIs: [
      'Skoðaðu upphafspH: ~2.4 (sterk sýra væri ~1)',
      'Skoðaðu stuðpúðasvæðið: hægur pH hækkun fyrir jafngildispunkt',
      'Skoðaðu jafngildispunkt: pH > 7 (um 8.4)',
      'Niðurstaða: Veik sýra'
    ],
    solutionSteps: [
      'Check initial pH: ~2.4 (strong acid would be ~1)',
      'Check buffer region: gradual pH rise before equivalence',
      'Check equivalence point: pH > 7 (around 8.4)',
      'Conclusion: Weak acid'
    ]
  },

  // Challenge 14: Identify strong acid curve
  {
    id: 'ci-2',
    type: 'curve-interpretation',
    titleIs: 'Greining kúrfu: Þekktu sterku sýruna',
    title: 'Curve Interpretation: Identify Strong Acid',
    descriptionIs: 'Skoðaðu títrunarkúrfuna. Er þetta sterk eða veik sýra?',
    description: 'Examine the titration curve. Is this a strong or weak acid?',

    acidName: 'Unknown (HCl)',
    acidNameIs: 'Óþekkt (Saltsýra)',
    acidFormula: '?',
    analyteVolume: 25.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateStrongAcidCurve(25.0, 0.100, 0.100),

    equivalenceVolume: 25.0,
    hideLabels: true,

    isMultipleChoice: true,
    options: ['Strong acid', 'Weak acid'],
    optionsIs: ['Sterk sýra', 'Veik sýra'],
    correctAnswer: 'Sterk sýra',
    answerUnit: '',
    tolerance: 0,

    hintIs: 'Skoðaðu upphafspH og lögun kúrfunnar. Sterk sýra hefur lágt upphafspH og skarpa breytingu við jafngildispunkt.',
    hint: 'Look at the initial pH and curve shape. A strong acid has low initial pH and sharp change at equivalence.',
    explanationIs: 'Þetta er sterk sýra vegna þess að: 1) UpphafspH (~1) er mjög lágt, 2) Engin stuðpúðasvæði - lítil pH breyting fyrr en rétt fyrir jafngildispunkt, 3) pH við jafngildispunkt er nákvæmlega 7.',
    explanation: 'This is a strong acid because: 1) Initial pH (~1) is very low, 2) No buffer region - little pH change until just before equivalence, 3) pH at equivalence point is exactly 7.',
    solutionStepsIs: [
      'Skoðaðu upphafspH: ~1 (mjög lágt)',
      'Enginn stuðpúðasvæði: lítil pH breyting fyrr en nálægt jafngildispunkti',
      'Jafngildispunktur: pH = 7 nákvæmlega',
      'Niðurstaða: Sterk sýra'
    ],
    solutionSteps: [
      'Check initial pH: ~1 (very low)',
      'No buffer region: little pH change until near equivalence',
      'Equivalence point: pH = 7 exactly',
      'Conclusion: Strong acid'
    ]
  },

  // Challenge 15: Identify monoprotic vs diprotic
  {
    id: 'ci-3',
    type: 'curve-interpretation',
    titleIs: 'Greining kúrfu: Einprótón eða tvíprótón?',
    title: 'Curve Interpretation: Monoprotic or Diprotic?',
    descriptionIs: 'Skoðaðu títrunarkúrfuna. Er þetta einprótón (monoprotic) eða tvíprótón (diprotic) sýra?',
    description: 'Examine the titration curve. Is this a monoprotic or diprotic acid?',

    acidName: 'Unknown (Oxalic acid)',
    acidNameIs: 'Óþekkt (Oxalsýra)',
    acidFormula: '?',
    analyteVolume: 25.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateDiproticAcidCurve(25.0, 0.100, 0.100, 1.25, 4.27, 1.2),

    isPolyprotic: true,
    equivalenceVolumes: [25.0, 50.0],
    halfEquivalenceVolumes: [12.5, 37.5],
    halfEquivalencePHs: [1.25, 4.27],
    hideLabels: true,

    isMultipleChoice: true,
    options: ['Monoprotic (one equivalence point)', 'Diprotic (two equivalence points)'],
    optionsIs: ['Einprótón (einn jafngildispunktur)', 'Tvíprótón (tveir jafngildispunktar)'],
    correctAnswer: 'Tvíprótón (tveir jafngildispunktar)',
    answerUnit: '',
    tolerance: 0,

    hintIs: 'Teljið skarpu pH breytingarnar (jafngildispunktana) á kúrfunni. Einprótón sýra hefur einn, tvíprótón hefur tvo.',
    hint: 'Count the sharp pH changes (equivalence points) on the curve. A monoprotic acid has one, diprotic has two.',
    explanationIs: 'Þetta er tvíprótón sýra vegna þess að kúrfan sýnir tvo aðskilda jafngildispunkta - tvo skarpa pH stökk við ~25 mL og ~50 mL.',
    explanation: 'This is a diprotic acid because the curve shows two distinct equivalence points - two sharp pH jumps at ~25 mL and ~50 mL.',
    solutionStepsIs: [
      'Skoðaðu kúrfuna eftir skörtum pH breytingum',
      'Fyrsti jafngildispunktur: við ~25 mL',
      'Annar jafngildispunktur: við ~50 mL',
      'Niðurstaða: Tvíprótón sýra (2 jafngildispunktar)'
    ],
    solutionSteps: [
      'Look for sharp pH changes on the curve',
      'First equivalence point: at ~25 mL',
      'Second equivalence point: at ~50 mL',
      'Conclusion: Diprotic acid (2 equivalence points)'
    ]
  },

  // Challenge 16: Estimate pKa from curve
  {
    id: 'ci-4',
    type: 'curve-interpretation',
    titleIs: 'Greining kúrfu: Metið pKa',
    title: 'Curve Interpretation: Estimate pKa',
    descriptionIs: 'Skoðaðu títrunarkúrfuna fyrir óþekkta veika sýru. Jafngildispunkturinn er við 30 mL. Hvert er áætlað pKa gildi?',
    description: 'Examine the titration curve for an unknown weak acid. The equivalence point is at 30 mL. What is the estimated pKa value?',

    acidName: 'Unknown (Acetic acid)',
    acidNameIs: 'Óþekkt (Ediksýra)',
    acidFormula: '?',
    analyteVolume: 30.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateWeakAcidCurve(30.0, 0.100, 0.100, 4.74, 8.72),

    equivalenceVolume: 30.0,
    halfEquivalenceVolume: 15.0,
    halfEquivalencePH: 4.74,
    actualPKa: 4.74,
    hideLabels: true,

    isMultipleChoice: true,
    options: ['pKa ≈ 2-3', 'pKa ≈ 4-5', 'pKa ≈ 6-7', 'pKa ≈ 8-9'],
    optionsIs: ['pKa ≈ 2-3', 'pKa ≈ 4-5', 'pKa ≈ 6-7', 'pKa ≈ 8-9'],
    correctAnswer: 'pKa ≈ 4-5',
    answerUnit: '',
    tolerance: 0,

    hintIs: 'Finndu hálfan jafngildispunkt (15 mL) og lestu pH gildið þar. pH við hálfan jafngildispunkt = pKa.',
    hint: 'Find the half-equivalence point (15 mL) and read the pH there. pH at half-equivalence = pKa.',
    explanationIs: 'Hálfur jafngildispunktur er við 30/2 = 15 mL. Við þetta rúmmál er pH um 4.7, sem þýðir pKa ≈ 4-5.',
    explanation: 'Half-equivalence point is at 30/2 = 15 mL. At this volume, pH is about 4.7, meaning pKa ≈ 4-5.',
    solutionStepsIs: [
      'Jafngildispunktur = 30 mL',
      'Hálfur jafngildispunktur = 30 ÷ 2 = 15 mL',
      'Við V = 15 mL, pH ≈ 4.7',
      'Þar sem pH = pKa við hálfan jafngildispunkt: pKa ≈ 4-5'
    ],
    solutionSteps: [
      'Equivalence point = 30 mL',
      'Half-equivalence point = 30 ÷ 2 = 15 mL',
      'At V = 15 mL, pH ≈ 4.7',
      'Since pH = pKa at half-equivalence: pKa ≈ 4-5'
    ]
  },

  // Challenge 17: Match to known acid
  {
    id: 'ci-5',
    type: 'curve-interpretation',
    titleIs: 'Greining kúrfu: Þekktu sýruna',
    title: 'Curve Interpretation: Identify the Acid',
    descriptionIs: 'Títrunarkúrfan sýnir veika sýru með pKa um 3.8. Hvaða sýra gæti þetta verið?',
    description: 'The titration curve shows a weak acid with pKa around 3.8. Which acid could this be?',

    acidName: 'Unknown (Lactic acid)',
    acidNameIs: 'Óþekkt (Mjólkursýra)',
    acidFormula: '?',
    analyteVolume: 20.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateWeakAcidCurve(20.0, 0.100, 0.100, 3.86, 8.25),

    equivalenceVolume: 20.0,
    halfEquivalenceVolume: 10.0,
    halfEquivalencePH: 3.86,
    actualPKa: 3.86,
    hideLabels: true,

    isMultipleChoice: true,
    options: ['Acetic acid (pKa = 4.74)', 'Formic acid (pKa = 3.75)', 'Lactic acid (pKa = 3.86)', 'Benzoic acid (pKa = 4.19)'],
    optionsIs: ['Ediksýra (pKa = 4.74)', 'Maurasýra (pKa = 3.75)', 'Mjólkursýra (pKa = 3.86)', 'Bensoesýra (pKa = 4.19)'],
    correctAnswer: 'Mjólkursýra (pKa = 3.86)',
    answerUnit: '',
    tolerance: 0,

    hintIs: 'Við hálfan jafngildispunkt (10 mL) er pH um 3.9. Þetta pKa gildi passar best við mjólkursýru.',
    hint: 'At the half-equivalence point (10 mL), pH is around 3.9. This pKa value best matches lactic acid.',
    explanationIs: 'Við V = 10 mL (hálfur jafngildispunktur), pH ≈ 3.86. Þetta passar best við mjólkursýru (pKa = 3.86).',
    explanation: 'At V = 10 mL (half-equivalence point), pH ≈ 3.86. This best matches lactic acid (pKa = 3.86).',
    solutionStepsIs: [
      'Lestu pH við hálfan jafngildispunkt (10 mL): pH ≈ 3.86',
      'Berðu saman við gefin pKa gildi:',
      '- Ediksýra: 4.74 (of hátt)',
      '- Maurasýra: 3.75 (nálægt)',
      '- Mjólkursýra: 3.86 (passar best!)',
      '- Bensoesýra: 4.19 (of hátt)',
      'Niðurstaða: Mjólkursýra'
    ],
    solutionSteps: [
      'Read pH at half-equivalence point (10 mL): pH ≈ 3.86',
      'Compare to given pKa values:',
      '- Acetic acid: 4.74 (too high)',
      '- Formic acid: 3.75 (close)',
      '- Lactic acid: 3.86 (best match!)',
      '- Benzoic acid: 4.19 (too high)',
      'Conclusion: Lactic acid'
    ]
  },

  // Challenge 18: Identify triprotic acid
  {
    id: 'ci-6',
    type: 'curve-interpretation',
    titleIs: 'Greining kúrfu: Hversu marga prótón?',
    title: 'Curve Interpretation: How Many Protons?',
    descriptionIs: 'Skoðaðu títrunarkúrfuna vandlega. Hversu marga jafngildispunkta sérðu? Hvað segir þetta um sýruna?',
    description: 'Examine the titration curve carefully. How many equivalence points do you see? What does this tell you about the acid?',

    acidName: 'Unknown (Phosphoric acid)',
    acidNameIs: 'Óþekkt (Fosfórsýra)',
    acidFormula: '?',
    analyteVolume: 15.0,
    analyteMolarity: 0.100,
    titrantFormula: 'NaOH',
    titrantMolarity: 0.100,

    curveData: generateTriproticAcidCurve(15.0, 0.100, 0.100, 2.15, 7.20, 12.35, 1.5),

    isPolyprotic: true,
    equivalenceVolumes: [15.0, 30.0, 45.0],
    halfEquivalenceVolumes: [7.5, 22.5, 37.5],
    halfEquivalencePHs: [2.15, 7.20, 12.35],
    hideLabels: true,

    isMultipleChoice: true,
    options: ['Monoprotic (1 proton)', 'Diprotic (2 protons)', 'Triprotic (3 protons)'],
    optionsIs: ['Einprótón (1 prótón)', 'Tvíprótón (2 prótón)', 'Þríprótón (3 prótón)'],
    correctAnswer: 'Þríprótón (3 prótón)',
    answerUnit: '',
    tolerance: 0,

    hintIs: 'Teljið skarpu pH stökkin á kúrfunni. Hver jafngildispunktur táknar eitt prótón.',
    hint: 'Count the sharp pH jumps on the curve. Each equivalence point represents one proton.',
    explanationIs: 'Kúrfan sýnir þrjá aðskilda jafngildispunkta við ~15, ~30 og ~45 mL. Þetta þýðir að sýran hefur þrjú prótón (H₃A) - þríprótón sýra eins og H₃PO₄.',
    explanation: 'The curve shows three distinct equivalence points at ~15, ~30, and ~45 mL. This means the acid has three protons (H₃A) - a triprotic acid like H₃PO₄.',
    solutionStepsIs: [
      'Skoðaðu kúrfuna eftir skörtum pH stökkum:',
      'Fyrsti jafngildispunktur: ~15 mL',
      'Annar jafngildispunktur: ~30 mL',
      'Þriðji jafngildispunktur: ~45 mL',
      '3 jafngildispunktar = 3 prótón = Þríprótón sýra'
    ],
    solutionSteps: [
      'Look for sharp pH jumps on the curve:',
      'First equivalence point: ~15 mL',
      'Second equivalence point: ~30 mL',
      'Third equivalence point: ~45 mL',
      '3 equivalence points = 3 protons = Triprotic acid'
    ]
  }
];

export function getLevel4ChallengesByType(type: Level4Challenge['type']): Level4Challenge[] {
  return LEVEL4_CHALLENGES.filter(c => c.type === type);
}
