// Saturation and supersaturation data for Level 4

export interface SaturationCompound {
  id: string;
  formula: string;
  name: string;
  nameEn: string;
  emoji: string;
  color: string;
  // Solubility at different temperatures (g/100g H₂O)
  // [0°C, 20°C, 40°C, 60°C, 80°C, 100°C]
  solubility: [number, number, number, number, number, number];
}

export const SATURATION_COMPOUNDS: SaturationCompound[] = [
  {
    id: 'kno3',
    formula: 'KNO₃',
    name: 'Kalíumnítrat',
    nameEn: 'Potassium nitrate',
    emoji: '🧪',
    color: '#8b5cf6',
    solubility: [13, 32, 64, 110, 169, 246],
  },
  {
    id: 'nacl',
    formula: 'NaCl',
    name: 'Borðsalt',
    nameEn: 'Table salt',
    emoji: '🧂',
    color: '#3b82f6',
    solubility: [35.7, 36.0, 36.4, 37.1, 38.0, 39.2],
  },
  {
    id: 'sugar',
    formula: 'C₁₂H₂₂O₁₁',
    name: 'Sykur',
    nameEn: 'Sugar',
    emoji: '🍬',
    color: '#f59e0b',
    solubility: [179, 204, 238, 287, 362, 487],
  },
  {
    id: 'caso4',
    formula: 'CaSO₄',
    name: 'Gifs',
    nameEn: 'Gypsum',
    emoji: '⚪',
    color: '#64748b',
    solubility: [0.176, 0.209, 0.210, 0.193, 0.162, 0.114],
  },
];

// Interpolate solubility at any temperature
export function getSolubilityAtTemp(compound: SaturationCompound, temp: number): number {
  const temps = [0, 20, 40, 60, 80, 100];

  if (temp <= 0) return compound.solubility[0];
  if (temp >= 100) return compound.solubility[5];

  let lowerIdx = 0;
  for (let i = 0; i < temps.length - 1; i++) {
    if (temp >= temps[i] && temp < temps[i + 1]) {
      lowerIdx = i;
      break;
    }
  }

  const t1 = temps[lowerIdx];
  const t2 = temps[lowerIdx + 1];
  const s1 = compound.solubility[lowerIdx];
  const s2 = compound.solubility[lowerIdx + 1];

  return s1 + (s2 - s1) * ((temp - t1) / (t2 - t1));
}

export type SaturationState = 'unsaturated' | 'saturated' | 'supersaturated';

export function getSaturationState(
  dissolved: number,
  saturationLimit: number
): SaturationState {
  const ratio = dissolved / saturationLimit;
  if (ratio < 0.95) return 'unsaturated';
  if (ratio <= 1.05) return 'saturated';
  return 'supersaturated';
}

export interface SaturationProblem {
  id: string;
  type: 'add_solute' | 'change_temp' | 'predict';
  compound: SaturationCompound;
  initialTemp: number;
  initialDissolved: number; // grams per 100g water
  question: string;
  questionEn: string;
  targetTemp?: number; // for change_temp problems
  targetAdd?: number; // grams to add for add_solute problems
  correctAnswer: SaturationState | 'precipitate' | 'dissolve_more';
  explanation: string;
  explanationEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const SATURATION_PROBLEMS: SaturationProblem[] = [
  // Easy - Basic saturation concept
  {
    id: 'sat1',
    type: 'add_solute',
    compound: SATURATION_COMPOUNDS[1], // NaCl
    initialTemp: 20,
    initialDissolved: 20,
    question: 'Þú bætir 10g af salti við. Hvað gerist?',
    questionEn: 'You add 10g of salt. What happens?',
    targetAdd: 10,
    correctAnswer: 'unsaturated',
    explanation: 'Við 20°C getur vatn uppleyst 36g/100g. 20g + 10g = 30g < 36g, svo allt leysist upp.',
    explanationEn: 'At 20°C, water can dissolve 36g/100g. 20g + 10g = 30g < 36g, so everything dissolves.',
    difficulty: 'easy',
  },
  {
    id: 'sat2',
    type: 'add_solute',
    compound: SATURATION_COMPOUNDS[1], // NaCl
    initialTemp: 20,
    initialDissolved: 30,
    question: 'Þú bætir 10g af salti við. Hvað gerist?',
    questionEn: 'You add 10g of salt. What happens?',
    targetAdd: 10,
    correctAnswer: 'supersaturated',
    explanation: 'Við 20°C er hámarks leysanleiki 36g/100g. 30g + 10g = 40g > 36g, svo 4g setjast á botninn.',
    explanationEn: 'At 20°C, max solubility is 36g/100g. 30g + 10g = 40g > 36g, so 4g precipitates.',
    difficulty: 'easy',
  },
  {
    id: 'sat3',
    type: 'predict',
    compound: SATURATION_COMPOUNDS[0], // KNO₃
    initialTemp: 20,
    initialDissolved: 32,
    question: 'Lausnin er mettað. Hvað gerist ef þú kælir hana niður í 0°C?',
    questionEn: 'The solution is saturated. What happens if you cool it to 0°C?',
    targetTemp: 0,
    correctAnswer: 'precipitate',
    explanation: 'Við 0°C er leysanleiki aðeins 13g/100g. 32g - 13g = 19g mun falla úr lausn sem kristallar.',
    explanationEn: 'At 0°C, solubility is only 13g/100g. 32g - 13g = 19g will precipitate as crystals.',
    difficulty: 'easy',
  },
  // Medium - Temperature effects
  {
    id: 'sat4',
    type: 'change_temp',
    compound: SATURATION_COMPOUNDS[0], // KNO₃
    initialTemp: 60,
    initialDissolved: 80,
    question: 'Þú kælir lausnina úr 60°C niður í 40°C. Hvað gerist?',
    questionEn: 'You cool the solution from 60°C to 40°C. What happens?',
    targetTemp: 40,
    correctAnswer: 'precipitate',
    explanation: 'Við 60°C: leysanleiki = 110g, við 40°C: leysanleiki = 64g. 80g > 64g, svo 16g fellur úr lausn.',
    explanationEn: 'At 60°C: solubility = 110g, at 40°C: solubility = 64g. 80g > 64g, so 16g precipitates.',
    difficulty: 'medium',
  },
  {
    id: 'sat5',
    type: 'change_temp',
    compound: SATURATION_COMPOUNDS[2], // Sugar
    initialTemp: 20,
    initialDissolved: 180,
    question: 'Þú hitar lausnina úr 20°C upp í 60°C. Hvað gerist?',
    questionEn: 'You heat the solution from 20°C to 60°C. What happens?',
    targetTemp: 60,
    correctAnswer: 'dissolve_more',
    explanation: 'Við 20°C: leysanleiki = 204g, við 60°C: leysanleiki = 287g. Lausnin verður ómettað og getur uppleyst meira.',
    explanationEn: 'At 20°C: solubility = 204g, at 60°C: solubility = 287g. Solution becomes unsaturated and can dissolve more.',
    difficulty: 'medium',
  },
  {
    id: 'sat6',
    type: 'predict',
    compound: SATURATION_COMPOUNDS[3], // CaSO₄ - retrograde solubility
    initialTemp: 40,
    initialDissolved: 0.2,
    question: 'CaSO₄ hefur öfuga leysanleika. Hvað gerist ef þú hitar úr 40°C í 80°C?',
    questionEn: 'CaSO₄ has retrograde solubility. What happens if you heat from 40°C to 80°C?',
    targetTemp: 80,
    correctAnswer: 'precipitate',
    explanation: 'CaSO₄ er sérstakt - það verður minna leysanlegt þegar það hitnar! Við 40°C: 0.21g, við 80°C: 0.16g.',
    explanationEn: 'CaSO₄ is special - it becomes less soluble when heated! At 40°C: 0.21g, at 80°C: 0.16g.',
    difficulty: 'medium',
  },
  // Hard - Complex scenarios
  {
    id: 'sat7',
    type: 'add_solute',
    compound: SATURATION_COMPOUNDS[0], // KNO₃
    initialTemp: 80,
    initialDissolved: 150,
    question: 'Við 80°C hefur þú 150g KNO₃ uppleyst. Þú bætir við 30g. Hvað gerist?',
    questionEn: 'At 80°C you have 150g KNO₃ dissolved. You add 30g more. What happens?',
    targetAdd: 30,
    correctAnswer: 'supersaturated',
    explanation: 'Við 80°C er leysanleiki 169g. 150g + 30g = 180g > 169g. 11g mun falla úr lausn.',
    explanationEn: 'At 80°C, solubility is 169g. 150g + 30g = 180g > 169g. 11g will precipitate.',
    difficulty: 'hard',
  },
  {
    id: 'sat8',
    type: 'predict',
    compound: SATURATION_COMPOUNDS[2], // Sugar
    initialTemp: 100,
    initialDissolved: 400,
    question: 'Þú hefur heita sykurlausn (400g/100g H₂O við 100°C). Hvað gerist ef þú kælir hana niður í 20°C?',
    questionEn: 'You have a hot sugar solution (400g/100g H₂O at 100°C). What happens if you cool it to 20°C?',
    targetTemp: 20,
    correctAnswer: 'precipitate',
    explanation: 'Við 100°C: leysanleiki = 487g, við 20°C: leysanleiki = 204g. 400g - 204g = 196g af sykri fellur út sem kristallar.',
    explanationEn: 'At 100°C: solubility = 487g, at 20°C: solubility = 204g. 400g - 204g = 196g of sugar will crystallize.',
    difficulty: 'hard',
  },
  {
    id: 'sat9',
    type: 'change_temp',
    compound: SATURATION_COMPOUNDS[1], // NaCl
    initialTemp: 0,
    initialDissolved: 35,
    question: 'Þú hefur mettaða saltlausn við 0°C (35.7g). Hvað gerist ef þú hitar í 100°C?',
    questionEn: 'You have a saturated salt solution at 0°C (35.7g). What happens if you heat to 100°C?',
    targetTemp: 100,
    correctAnswer: 'dissolve_more',
    explanation: 'Salt hefur lítinn mun í leysanleika milli hitastiga. Við 100°C: 39.2g. Lausnin verður örlítið ómettað.',
    explanationEn: 'Salt has little change in solubility with temperature. At 100°C: 39.2g. Solution becomes slightly unsaturated.',
    difficulty: 'hard',
  },
  {
    id: 'sat10',
    type: 'predict',
    compound: SATURATION_COMPOUNDS[0], // KNO₃
    initialTemp: 100,
    initialDissolved: 200,
    question: 'Þú hefur 200g KNO₃ uppleyst við 100°C. Þú kælir hægt niður í 20°C. Hversu mikið fellur út?',
    questionEn: 'You have 200g KNO₃ dissolved at 100°C. You slowly cool to 20°C. How much precipitates?',
    targetTemp: 20,
    correctAnswer: 'precipitate',
    explanation: 'Við 100°C: leysanleiki = 246g (OK), við 20°C: leysanleiki = 32g. 200g - 32g = 168g fellur út sem kristallar!',
    explanationEn: 'At 100°C: solubility = 246g (OK), at 20°C: solubility = 32g. 200g - 32g = 168g crystallizes!',
    difficulty: 'hard',
  },
];

// Get problems by difficulty
export function getProblemsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): SaturationProblem[] {
  return SATURATION_PROBLEMS.filter(p => p.difficulty === difficulty);
}
