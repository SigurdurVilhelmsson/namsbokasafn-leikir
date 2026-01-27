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
  },
  // New real-world chemistry lab scenarios
  {
    id: 'L3-11',
    type: 'real_world',
    prompt: '🧪 Í tilraun þarftu að mæla út 25 mL skammta af sýru. Þú ert með 500 mL bikar. Hversu marga skammta getur þú útbúið?',
    startValue: 500,
    startUnit: 'mL',
    portionSize: 25,
    portionUnit: 'mL',
    expectedAnswer: 20,
    requireInteger: true,
    explanation: 'Deila heildarmagni með skammtastærð. 500 mL ÷ 25 mL = 20 skammtar'
  },
  {
    id: 'L3-12',
    type: 'synthesis',
    prompt: '🔬 Þú ert að undirbúa tilraun sem krefst 0.5 mol af NaCl. Mólmassi NaCl er 58.5 g/mol. Hversu mörg grömm þarftu?',
    startValue: 0.5,
    startUnit: 'mol',
    density: 58.5,
    densityUnit: 'g/mol',
    targetUnit: 'g',
    expectedAnswer: 29.25,
    significantFigures: 3,
    requiredSteps: ['multiply by molar mass']
  },
  {
    id: 'L3-13',
    type: 'real_world',
    prompt: '💊 Lyf inniheldur 250 mg af virka efninu per töflu. Sjúklingur þarf 1.5 g á dag. Hversu margar töflur þarf hann?',
    startValue: 1.5,
    startUnit: 'g',
    portionSize: 250,
    portionUnit: 'mg',
    expectedAnswer: 6,
    requireInteger: true,
    explanation: 'Fyrst breyta g í mg (1.5 g = 1500 mg), síðan deila með 250 mg/töflu = 6 töflur'
  },
  {
    id: 'L3-14',
    type: 'synthesis',
    prompt: '⚗️ Þú mælir 75.0 mL af etanóli með eðlismassa 0.789 g/mL. Hvað vegur þetta í grömm?',
    startValue: 75.0,
    startUnit: 'mL',
    density: 0.789,
    densityUnit: 'g/mL',
    targetUnit: 'g',
    expectedAnswer: 59.2,
    significantFigures: 3,
    requiredSteps: ['multiply by density']
  },
  {
    id: 'L3-15',
    type: 'real_world',
    prompt: '🧫 Þú ert að rækta bakteríur sem tvöfaldast á 20 mínútum. Ef þú byrjar með 100 bakteríur, hversu margar verða eftir 2 klukkustundir?',
    startValue: 2,
    startUnit: 'klst',
    portionSize: 20,
    portionUnit: 'mín',
    expectedAnswer: 6400,
    requireInteger: true,
    explanation: '2 klst = 120 mín ÷ 20 mín = 6 tvöföldunartímabil. 100 × 2⁶ = 100 × 64 = 6400 bakteríur'
  },
  {
    id: 'L3-16',
    type: 'derivation',
    prompt: '🌡️ Vatn suðar við 100°C á sjávarmáli. Breyttu þessu í Kelvin (K = °C + 273.15).',
    startValue: 100,
    startUnit: '°C',
    targetUnit: 'K',
    expectedAnswer: 373.15,
    scientificNotation: false,
    correctMethod: ['bæta við 273.15']
  },
  {
    id: 'L3-17',
    type: 'error_analysis',
    prompt: '🔴 Nemandi reyndi að reikna massa úr rúmmáli. Hann hafði 50 mL og eðlismassa 2.7 g/mL en fékk 18.5 g. Hvað fór úrskeiðis?',
    incorrectWork: '50 mL ÷ 2.7 g/mL = 18.5 g',
    correctAnswer: 135,
    correctUnit: 'g',
    errorExplanation: 'Nemandinn deildi í stað þess að margfalda. Rétt: m = ρ × V = 2.7 g/mL × 50 mL = 135 g',
    correctMethod: ['2.7 g/mL × 50 mL']
  },
  {
    id: 'L3-18',
    type: 'real_world',
    prompt: '💧 Efnafræðitilraun þarf 2.5 L af vatni. Þú hefur 250 mL flöskur. Hversu margar flöskur þarftu?',
    startValue: 2.5,
    startUnit: 'L',
    portionSize: 250,
    portionUnit: 'mL',
    expectedAnswer: 10,
    requireInteger: true,
    explanation: 'Umbreyta 2.5 L í mL: 2500 mL. Síðan 2500 ÷ 250 = 10 flöskur'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REAL-WORLD CONTEXT SCENARIOS
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── COOKING / RECIPE SCENARIOS ────────────────────────────────────────────
  {
    id: 'L3-COOK-1',
    type: 'real_world',
    prompt: '👨‍🍳 Uppskrift krefst 2 bolla af mjólk. Þú vilt nota mL mælikúlu. Hversu mörg mL þarftu? (1 bolli = 240 mL)',
    startValue: 2,
    startUnit: 'bollar',
    portionSize: 1,
    portionUnit: 'bolli',
    expectedAnswer: 480,
    requireInteger: true,
    explanation: '2 bollar × 240 mL/bolli = 480 mL'
  },
  {
    id: 'L3-COOK-2',
    type: 'synthesis',
    prompt: '🥧 Uppskrift þarf 4 oz af smjöri. Þú átt pakkninguna merkt í grömmum. Hversu mörg g þarftu? (1 oz = 28.35 g)',
    startValue: 4,
    startUnit: 'oz',
    density: 28.35,
    densityUnit: 'g/oz',
    targetUnit: 'g',
    expectedAnswer: 113.4,
    significantFigures: 4,
    requiredSteps: ['multiply by conversion factor']
  },
  {
    id: 'L3-COOK-3',
    type: 'real_world',
    prompt: '🍰 Þú ert að þrefalda uppskrift sem þarf 1.5 dl af sykri. Hversu mörg mL þarftu? (1 dl = 100 mL)',
    startValue: 4.5,
    startUnit: 'dl',
    portionSize: 1,
    portionUnit: 'dl',
    expectedAnswer: 450,
    requireInteger: true,
    explanation: '1.5 dl × 3 = 4.5 dl. 4.5 dl × 100 mL/dl = 450 mL'
  },
  {
    id: 'L3-COOK-4',
    type: 'efficiency',
    prompt: '🥄 Breyttu 3 matskeið (tbsp) í teskeið (tsp). (1 tbsp = 3 tsp)',
    startValue: 3,
    startUnit: 'tbsp',
    targetUnit: 'tsp',
    possiblePaths: [
      { steps: ['3 tsp / 1 tbsp'], stepCount: 1, efficient: true },
      { steps: ['15 mL / 1 tbsp', '1 tsp / 5 mL'], stepCount: 2, efficient: false }
    ],
    targetAnswer: 9
  },
  {
    id: 'L3-COOK-5',
    type: 'real_world',
    prompt: '🍕 Pizza deig krefst 500 g af hveiti. Þú átt 2 kg poka. Hversu mörg deig geturðu útbúið?',
    startValue: 2,
    startUnit: 'kg',
    portionSize: 500,
    portionUnit: 'g',
    expectedAnswer: 4,
    requireInteger: true,
    explanation: '2 kg = 2000 g. 2000 g ÷ 500 g/deig = 4 deig'
  },

  // ─── PHARMACY / MEDICAL SCENARIOS ──────────────────────────────────────────
  {
    id: 'L3-PHARM-1',
    type: 'synthesis',
    prompt: '💊 Barn sem vegur 25 kg þarf lyf í skammti 15 mg/kg líkamsþyngdar. Hversu mörg mg þarf barnið?',
    startValue: 25,
    startUnit: 'kg',
    density: 15,
    densityUnit: 'mg/kg',
    targetUnit: 'mg',
    expectedAnswer: 375,
    significantFigures: 3,
    requiredSteps: ['multiply weight by dosage rate']
  },
  {
    id: 'L3-PHARM-2',
    type: 'real_world',
    prompt: '💉 Lyfjaskammtur er 0.5 mL/kg. Sjúklingur vegur 70 kg. Hversu marga mL þarf hann?',
    startValue: 70,
    startUnit: 'kg',
    portionSize: 1,
    portionUnit: 'kg',
    expectedAnswer: 35,
    requireInteger: false,
    explanation: '70 kg × 0.5 mL/kg = 35 mL'
  },
  {
    id: 'L3-PHARM-3',
    type: 'synthesis',
    prompt: '🩺 Lyfjalausn inniheldur 125 mg/5 mL. Skammtur er 250 mg. Hversu marga mL þarf sjúklingur?',
    startValue: 250,
    startUnit: 'mg',
    density: 5,
    densityUnit: 'mL/125mg',
    targetUnit: 'mL',
    expectedAnswer: 10,
    significantFigures: 2,
    requiredSteps: ['calculate mL from concentration']
  },
  {
    id: 'L3-PHARM-4',
    type: 'real_world',
    prompt: '💊 Hvert hylki inniheldur 200 mg. Daglegt lágmark er 0.6 g. Hversu mörg hylki þarf að lágmarki?',
    startValue: 0.6,
    startUnit: 'g',
    portionSize: 200,
    portionUnit: 'mg',
    expectedAnswer: 3,
    requireInteger: true,
    explanation: '0.6 g = 600 mg. 600 mg ÷ 200 mg/hylki = 3 hylki'
  },
  {
    id: 'L3-PHARM-5',
    type: 'derivation',
    prompt: '🏥 Innrennslishraði er 2 mL/mín. Hversu mörg mL á klukkustund?',
    startValue: 2,
    startUnit: 'mL/mín',
    targetUnit: 'mL/klst',
    expectedAnswer: 120,
    scientificNotation: false,
    correctMethod: ['60 mín / 1 klst']
  },

  // ─── ENGINEERING / CONSTRUCTION SCENARIOS ──────────────────────────────────
  {
    id: 'L3-ENG-1',
    type: 'synthesis',
    prompt: '🏗️ Steypa hefur eðlismassa 2400 kg/m³. Þú þarft 0.5 m³. Hversu mörg kg verður steypan?',
    startValue: 0.5,
    startUnit: 'm³',
    density: 2400,
    densityUnit: 'kg/m³',
    targetUnit: 'kg',
    expectedAnswer: 1200,
    significantFigures: 4,
    requiredSteps: ['multiply by density']
  },
  {
    id: 'L3-ENG-2',
    type: 'real_world',
    prompt: '🔩 Skrúfupakki inniheldur 50 skrúfur. Verkefni þarf 325 skrúfur. Hversu marga pakka þarf?',
    startValue: 325,
    startUnit: 'skrúfur',
    portionSize: 50,
    portionUnit: 'skrúfur',
    expectedAnswer: 7,
    requireInteger: true,
    explanation: '325 ÷ 50 = 6.5, en þú þarft að kaupa heilan pakka, þannig 7 pakkar'
  },
  {
    id: 'L3-ENG-3',
    type: 'synthesis',
    prompt: '🪨 Sandur hefur eðlismassa 1.6 g/cm³. Breyttu í kg/m³.',
    startValue: 1.6,
    startUnit: 'g/cm³',
    targetUnit: 'kg/m³',
    expectedAnswer: 1600,
    significantFigures: 2,
    requiredSteps: ['convert g to kg', 'convert cm³ to m³']
  },
  {
    id: 'L3-ENG-4',
    type: 'real_world',
    prompt: '🧱 Múrsteinn vegur 2.5 kg. Flutningabíll getur borið 2 tonn. Hversu marga steina getur hann flutt?',
    startValue: 2,
    startUnit: 'tonn',
    portionSize: 2.5,
    portionUnit: 'kg',
    expectedAnswer: 800,
    requireInteger: true,
    explanation: '2 tonn = 2000 kg. 2000 kg ÷ 2.5 kg/steinn = 800 steinar'
  },
  {
    id: 'L3-ENG-5',
    type: 'derivation',
    prompt: '⚡ Rafmagnsnotkun er 1500 W. Hversu mörg kW er þetta?',
    startValue: 1500,
    startUnit: 'W',
    targetUnit: 'kW',
    expectedAnswer: 1.5,
    scientificNotation: false,
    correctMethod: ['1 kW / 1000 W']
  },

  // ─── SPORTS / FITNESS SCENARIOS ────────────────────────────────────────────
  {
    id: 'L3-SPORT-1',
    type: 'derivation',
    prompt: '🏃 Hlaupari hleypur 10 km á 50 mínútum. Hver er meðalhraðinn í km/klst?',
    startValue: 10,
    startUnit: 'km/50mín',
    targetUnit: 'km/klst',
    expectedAnswer: 12,
    scientificNotation: false,
    correctMethod: ['60 mín / 50 mín']
  },
  {
    id: 'L3-SPORT-2',
    type: 'synthesis',
    prompt: '🚴 Hjólreiðamaður keyrir með 25 km/klst. Breyttu í m/s.',
    startValue: 25,
    startUnit: 'km/klst',
    targetUnit: 'm/s',
    expectedAnswer: 6.94,
    significantFigures: 3,
    requiredSteps: ['1000 m / 1 km', '1 klst / 3600 s']
  },
  {
    id: 'L3-SPORT-3',
    type: 'real_world',
    prompt: '🏊 Sundlaugar lengd er 25 m. Sundþjálfari vill að nemendur syndi 1 km. Hversu margar langar þurfa þeir?',
    startValue: 1,
    startUnit: 'km',
    portionSize: 25,
    portionUnit: 'm',
    expectedAnswer: 40,
    requireInteger: true,
    explanation: '1 km = 1000 m. 1000 m ÷ 25 m/langa = 40 langur'
  },
  {
    id: 'L3-SPORT-4',
    type: 'efficiency',
    prompt: '⏱️ Hlaupari hleypur mílu (1609 m) á 4:30 mín. Breyttu tímann í sekúndur.',
    startValue: 4.5,
    startUnit: 'mín',
    targetUnit: 's',
    possiblePaths: [
      { steps: ['60 s / 1 mín'], stepCount: 1, efficient: true }
    ],
    targetAnswer: 270
  },
  {
    id: 'L3-SPORT-5',
    type: 'synthesis',
    prompt: '🎿 Skíðamaður fer 45 km/klst. Hvað er það í mín/km (hraði)?',
    startValue: 45,
    startUnit: 'km/klst',
    targetUnit: 'mín/km',
    expectedAnswer: 1.33,
    significantFigures: 3,
    requiredSteps: ['invert speed', 'convert hours to minutes']
  },

  // ─── TRAVEL / CURRENCY-LIKE SCENARIOS ──────────────────────────────────────
  {
    id: 'L3-TRAVEL-1',
    type: 'synthesis',
    prompt: '✈️ Flug varir 8.5 klst. Hversu margar mínútur er þetta?',
    startValue: 8.5,
    startUnit: 'klst',
    targetUnit: 'mín',
    expectedAnswer: 510,
    significantFigures: 3,
    requiredSteps: ['60 mín / 1 klst']
  },
  {
    id: 'L3-TRAVEL-2',
    type: 'real_world',
    prompt: '⛽ Bíll notar 7 L/100 km. Ferð er 350 km. Hversu marga lítra þarftu?',
    startValue: 350,
    startUnit: 'km',
    portionSize: 100,
    portionUnit: 'km',
    expectedAnswer: 24.5,
    requireInteger: false,
    explanation: '350 km ÷ 100 km × 7 L = 24.5 L'
  },
  {
    id: 'L3-TRAVEL-3',
    type: 'efficiency',
    prompt: '🌍 Breyttu 100 km í mílur (1 míla = 1.609 km).',
    startValue: 100,
    startUnit: 'km',
    targetUnit: 'mílu',
    possiblePaths: [
      { steps: ['1 míla / 1.609 km'], stepCount: 1, efficient: true },
      { steps: ['1000 m / 1 km', '1 míla / 1609 m'], stepCount: 2, efficient: false }
    ],
    targetAnswer: 62.15
  },
  {
    id: 'L3-TRAVEL-4',
    type: 'derivation',
    prompt: '🚂 Lest keyrir 200 km/klst. Hversu langt fer hún á 45 mínútum?',
    startValue: 200,
    startUnit: 'km/klst',
    targetUnit: 'km',
    expectedAnswer: 150,
    scientificNotation: false,
    correctMethod: ['200 km/klst × 0.75 klst']
  },
  {
    id: 'L3-TRAVEL-5',
    type: 'real_world',
    prompt: '🛫 Lengd flugvélarinnar er 73 m. Flugbraut er 3.5 km. Hversu margar flugvélar rúmast á brautinni?',
    startValue: 3.5,
    startUnit: 'km',
    portionSize: 73,
    portionUnit: 'm',
    expectedAnswer: 47,
    requireInteger: true,
    explanation: '3.5 km = 3500 m. 3500 m ÷ 73 m = 47.9, námundað niður í 47'
  }
];
