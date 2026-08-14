// Separation Methods data for Level 4
// Connects to Brown Section 1.3 - Separation of Mixtures

import { shuffleArray } from './classifications';

export type SeparationMethodId =
  | 'siun'          // Filtration
  | 'eiming'        // Distillation
  | 'uppgufun'      // Evaporation
  | 'litskiljun'    // Chromatography
  | 'afhelling'     // Decanting
  | 'segulmagnadur' // Magnetic separation
  | 'skilvinduafl'; // Centrifugation

export interface SeparationMethod {
  id: SeparationMethodId;
  nameIs: string;
  nameEn: string;
  namePl: string;
  description: string;
  descriptionEn: string;
  descriptionPl: string;
  principle: string;
  principleEn: string;
  principlePl: string;
  examples: {
    mixture: string;
    mixtureEn: string;
    result: string;
    resultEn: string;
  }[];
  emoji: string;
  color: string;
}

export interface SeparationProblem {
  id: string;
  mixture: string;
  mixtureEn: string;
  mixturePl: string;
  components: string[];
  componentsEn: string[];
  correctMethod: SeparationMethodId;
  hint: string;
  hintEn: string;
  hintPl: string;
  emoji: string;
  // For property-based questions
  propertyQuestion?: string;
  propertyQuestionEn?: string;
  propertyAnswer?: string;
  propertyAnswerEn?: string;
}

// Separation method definitions
export const SEPARATION_METHODS: Record<SeparationMethodId, SeparationMethod> = {
  siun: {
    id: 'siun',
    nameIs: 'Síun',
    nameEn: 'Filtration',
    namePl: 'Filtracja',
    description: 'Aðskilur fast efni frá vökva með síu eða síupappír',
    descriptionEn: 'Separates solid from liquid using a filter or filter paper',
    descriptionPl: 'Oddziela ciała stałe od cieczy za pomocą filtra lub bibuły',
    principle: 'Stærðarmismunur agna',
    principleEn: 'Particle size difference',
    principlePl: 'Różnica wielkości cząstek',
    examples: [
      {
        mixture: 'Sandur í vatni',
        mixtureEn: 'Sand in water',
        result: 'Hreint vatn + sandur',
        resultEn: 'Clean water + sand',
      },
      {
        mixture: 'Kaffigrjón í kaffi',
        mixtureEn: 'Coffee grounds in coffee',
        result: 'Kaffidrykkur + grjón',
        resultEn: 'Coffee drink + grounds',
      },
    ],
    emoji: '🧫',
    color: '#3b82f6', // blue
  },
  eiming: {
    id: 'eiming',
    nameIs: 'Eiming',
    nameEn: 'Distillation',
    namePl: 'Destylacja',
    description: 'Aðskilur vökva eftir mismunandi suðumarki',
    descriptionEn: 'Separates liquids by different boiling points',
    descriptionPl: 'Rozdziela ciecze o różnych temperaturach wrzenia',
    principle: 'Mismunur í suðumarki',
    principleEn: 'Boiling point difference',
    principlePl: 'Różnica temperatur wrzenia',
    examples: [
      {
        mixture: 'Saltvatn',
        mixtureEn: 'Salt water',
        result: 'Hreint vatn + salt',
        resultEn: 'Pure water + salt',
      },
      {
        mixture: 'Hráolía',
        mixtureEn: 'Crude oil',
        result: 'Bensín, dísel, o.fl.',
        resultEn: 'Gasoline, diesel, etc.',
      },
    ],
    emoji: '🧪',
    color: '#8b5cf6', // purple
  },
  uppgufun: {
    id: 'uppgufun',
    nameIs: 'Uppgufun',
    nameEn: 'Evaporation',
    namePl: 'Odparowanie',
    description: 'Fjarlægir vökva og skilur eftir fast efni',
    descriptionEn: 'Removes liquid leaving solid behind',
    descriptionPl: 'Usuwa ciecz pozostawiając ciało stałe',
    principle: 'Rokgirni vökvans',
    principleEn: 'Volatility of liquid',
    principlePl: 'Lotność cieczy',
    examples: [
      {
        mixture: 'Sjávarvatn',
        mixtureEn: 'Seawater',
        result: 'Sjávarsalt',
        resultEn: 'Sea salt',
      },
      {
        mixture: 'Sykurlausn',
        mixtureEn: 'Sugar solution',
        result: 'Sykurkristallar',
        resultEn: 'Sugar crystals',
      },
    ],
    emoji: '☀️',
    color: '#f59e0b', // amber
  },
  litskiljun: {
    id: 'litskiljun',
    nameIs: 'Litskiljun',
    nameEn: 'Chromatography',
    namePl: 'Chromatografia',
    description: 'Aðskilur efni eftir mismunandi ferðahraða í lausn',
    descriptionEn: 'Separates substances by differential movement through medium',
    descriptionPl: 'Rozdziela substancje na podstawie różnic w ruchu',
    principle: 'Mismunandi sækni í fastan og fljótandi fasa',
    principleEn: 'Different affinities for stationary/mobile phase',
    principlePl: 'Różne powinowactwo do fazy stałej/ruchomej',
    examples: [
      {
        mixture: 'Blek',
        mixtureEn: 'Ink',
        result: 'Ólíkir litarefnisþættir',
        resultEn: 'Different dye components',
      },
      {
        mixture: 'Jurtarlitarefni',
        mixtureEn: 'Plant pigments',
        result: 'Aðskildir litaþættir',
        resultEn: 'Separated pigment components',
      },
    ],
    emoji: '🌈',
    color: '#ec4899', // pink
  },
  afhelling: {
    id: 'afhelling',
    nameIs: 'Afhelling',
    nameEn: 'Decanting',
    namePl: 'Dekantacja',
    description: 'Hella vökva varlega af setu efni',
    descriptionEn: 'Carefully pour liquid off settled material',
    descriptionPl: 'Ostrożnie zlać ciecz z osadu',
    principle: 'Þyngdarmismunur (eðlismassi)',
    principleEn: 'Density difference',
    principlePl: 'Różnica gęstości',
    examples: [
      {
        mixture: 'Olía og vatn',
        mixtureEn: 'Oil and water',
        result: 'Aðskilin lög',
        resultEn: 'Separated layers',
      },
      {
        mixture: 'Vín með botnfalli',
        mixtureEn: 'Wine with sediment',
        result: 'Hreint vín',
        resultEn: 'Clear wine',
      },
    ],
    emoji: '🫗',
    color: '#22c55e', // green
  },
  segulmagnadur: {
    id: 'segulmagnadur',
    nameIs: 'Segulskilja',
    nameEn: 'Magnetic separation',
    namePl: 'Separacja magnetyczna',
    description: 'Notar segul til að draga að segulræn efni',
    descriptionEn: 'Uses magnet to attract magnetic materials',
    descriptionPl: 'Wykorzystuje magnes do przyciągania materiałów magnetycznych',
    principle: 'Segulræni',
    principleEn: 'Magnetism',
    principlePl: 'Magnetyzm',
    examples: [
      {
        mixture: 'Járnspan í sandi',
        mixtureEn: 'Iron filings in sand',
        result: 'Járnspan + sandur',
        resultEn: 'Iron filings + sand',
      },
      {
        mixture: 'Málmbrot í rusli',
        mixtureEn: 'Metal scraps in waste',
        result: 'Aðskilið málm',
        resultEn: 'Separated metal',
      },
    ],
    emoji: '🧲',
    color: '#ef4444', // red
  },
  skilvinduafl: {
    id: 'skilvinduafl',
    nameIs: 'Skilvinduafl',
    nameEn: 'Centrifugation',
    namePl: 'Wirowanie',
    description: 'Notar snúningskraft til að aðskilja efni eftir þyngd',
    descriptionEn: 'Uses spinning force to separate by weight',
    descriptionPl: 'Wykorzystuje siłę wirowania do rozdzielenia według masy',
    principle: 'Þyngdarmismunur með snúningi',
    principleEn: 'Density difference with spinning',
    principlePl: 'Różnica gęstości z wirowaniem',
    examples: [
      {
        mixture: 'Blóð',
        mixtureEn: 'Blood',
        result: 'Plasma, hvít og rauð blóðkorn',
        resultEn: 'Plasma, white and red cells',
      },
      {
        mixture: 'Mjólk',
        mixtureEn: 'Milk',
        result: 'Rjómi og undanrenna',
        resultEn: 'Cream and skim milk',
      },
    ],
    emoji: '🌀',
    color: '#06b6d4', // cyan
  },
};

// Separation problems for quizzes
export const SEPARATION_PROBLEMS: SeparationProblem[] = [
  // Filtration problems
  {
    id: 'sand_water',
    mixture: 'Sandur í vatni',
    mixtureEn: 'Sand in water',
    mixturePl: 'Piasek w wodzie',
    components: ['sandur', 'vatn'],
    componentsEn: ['sand', 'water'],
    correctMethod: 'siun',
    hint: 'Sandkornin eru stærri en síugatirnar',
    hintEn: 'Sand grains are larger than filter holes',
    hintPl: 'Ziarna piasku są większe niż otwory w filtrze',
    emoji: '🏖️',
    propertyQuestion: 'Hvaða eiginleiki er nýttur?',
    propertyQuestionEn: 'What property is exploited?',
    propertyAnswer: 'Stærð agna',
    propertyAnswerEn: 'Particle size',
  },
  {
    id: 'coffee_grounds',
    mixture: 'Kaffigrjón í kaffi',
    mixtureEn: 'Coffee grounds in coffee',
    mixturePl: 'Fusy kawy w kawie',
    components: ['kaffigrjón', 'kaffidrykkur'],
    componentsEn: ['coffee grounds', 'coffee drink'],
    correctMethod: 'siun',
    hint: 'Síupappír heldur grjónunum eftir',
    hintEn: 'Filter paper catches the grounds',
    hintPl: 'Bibuła zatrzymuje fusy',
    emoji: '☕',
  },
  {
    id: 'flour_water',
    mixture: 'Mjöl í vatni',
    mixtureEn: 'Flour in water',
    mixturePl: 'Mąka w wodzie',
    components: ['mjöl', 'vatn'],
    componentsEn: ['flour', 'water'],
    correctMethod: 'siun',
    hint: 'Mjölagnirnar eru of stórar til að fara í gegnum síuna',
    hintEn: 'Flour particles are too large to pass through filter',
    hintPl: 'Cząstki mąki są zbyt duże, by przejść przez filtr',
    emoji: '🌾',
  },

  // Distillation problems
  {
    id: 'saltwater_pure',
    mixture: 'Saltvatn (viltu hreint vatn)',
    mixtureEn: 'Salt water (want pure water)',
    mixturePl: 'Woda morska (chcemy czystą wodę)',
    components: ['salt', 'vatn'],
    componentsEn: ['salt', 'water'],
    correctMethod: 'eiming',
    hint: 'Vatn gufar upp við 100°C en salt ekki',
    hintEn: 'Water evaporates at 100°C but salt does not',
    hintPl: 'Woda paruje w 100°C, ale sól nie',
    emoji: '🌊',
    propertyQuestion: 'Hvaða eiginleiki er nýttur?',
    propertyQuestionEn: 'What property is exploited?',
    propertyAnswer: 'Suðumark',
    propertyAnswerEn: 'Boiling point',
  },
  {
    id: 'alcohol_water',
    mixture: 'Áfengi og vatn',
    mixtureEn: 'Alcohol and water',
    mixturePl: 'Alkohol i woda',
    components: ['etanól', 'vatn'],
    componentsEn: ['ethanol', 'water'],
    correctMethod: 'eiming',
    hint: 'Etanól suður við 78°C, vatn við 100°C',
    hintEn: 'Ethanol boils at 78°C, water at 100°C',
    hintPl: 'Etanol wrze w 78°C, woda w 100°C',
    emoji: '🍷',
  },
  {
    id: 'crude_oil',
    mixture: 'Hráolía',
    mixtureEn: 'Crude oil',
    mixturePl: 'Ropa naftowa',
    components: ['bensín', 'steinolía', 'dísel'],
    componentsEn: ['gasoline', 'kerosene', 'diesel'],
    correctMethod: 'eiming',
    hint: 'Þættir olíu hafa mismunandi suðumark',
    hintEn: 'Oil components have different boiling points',
    hintPl: 'Składniki ropy mają różne temperatury wrzenia',
    emoji: '🛢️',
  },

  // Evaporation problems
  {
    id: 'sea_salt',
    mixture: 'Sjávarvatn (viltu saltið)',
    mixtureEn: 'Seawater (want the salt)',
    mixturePl: 'Woda morska (chcemy sól)',
    components: ['salt', 'vatn'],
    componentsEn: ['salt', 'water'],
    correctMethod: 'uppgufun',
    hint: 'Vatnið gufar upp í sólarhitanum',
    hintEn: 'Water evaporates in the sun heat',
    hintPl: 'Woda odparowuje w cieple słońca',
    emoji: '🧂',
    propertyQuestion: 'Af hverju virkar þetta?',
    propertyQuestionEn: 'Why does this work?',
    propertyAnswer: 'Vatn er rokgjarnt en salt er ekki',
    propertyAnswerEn: 'Water is volatile but salt is not',
  },
  {
    id: 'sugar_crystals',
    mixture: 'Sykurlausn',
    mixtureEn: 'Sugar solution',
    mixturePl: 'Roztwór cukru',
    components: ['sykur', 'vatn'],
    componentsEn: ['sugar', 'water'],
    correctMethod: 'uppgufun',
    hint: 'Vatnið gufar upp og sykurkristallar myndast',
    hintEn: 'Water evaporates and sugar crystals form',
    hintPl: 'Woda paruje i tworzą się kryształy cukru',
    emoji: '🍬',
  },

  // Chromatography problems
  {
    id: 'ink_colors',
    mixture: 'Blek',
    mixtureEn: 'Ink',
    mixturePl: 'Atrament',
    components: ['litarefni A', 'litarefni B', 'litarefni C'],
    componentsEn: ['dye A', 'dye B', 'dye C'],
    correctMethod: 'litskiljun',
    hint: 'Ólíkir litaþættir ferðast á mismunandi hraða',
    hintEn: 'Different dye components travel at different speeds',
    hintPl: 'Różne składniki barwników poruszają się z różną szybkością',
    emoji: '🖊️',
    propertyQuestion: 'Hvaða eiginleiki er nýttur?',
    propertyQuestionEn: 'What property is exploited?',
    propertyAnswer: 'Sækni í lausn/pappír',
    propertyAnswerEn: 'Affinity for solvent/paper',
  },
  {
    id: 'plant_pigments',
    mixture: 'Jurtarlitarefni',
    mixtureEn: 'Plant pigments',
    mixturePl: 'Barwniki roślinne',
    components: ['blaðgræna', 'karótenóíðar'],
    componentsEn: ['chlorophyll', 'carotenoids'],
    correctMethod: 'litskiljun',
    hint: 'Ólík litarefni hafa mismunandi sækni',
    hintEn: 'Different pigments have different affinities',
    hintPl: 'Różne barwniki mają różne powinowactwo',
    emoji: '🌿',
  },

  // Decanting problems
  {
    id: 'oil_water',
    mixture: 'Olía og vatn',
    mixtureEn: 'Oil and water',
    mixturePl: 'Olej i woda',
    components: ['olía', 'vatn'],
    componentsEn: ['oil', 'water'],
    correctMethod: 'afhelling',
    hint: 'Olía flýtur ofan á vatni - hægt að hella frá',
    hintEn: 'Oil floats on water - can pour off',
    hintPl: 'Olej pływa na wodzie - można zlać',
    emoji: '🫗',
    propertyQuestion: 'Hvaða eiginleiki er nýttur?',
    propertyQuestionEn: 'What property is exploited?',
    propertyAnswer: 'Eðlismassi (þyngd)',
    propertyAnswerEn: 'Density (weight)',
  },
  {
    id: 'wine_sediment',
    mixture: 'Vín með botnfalli',
    mixtureEn: 'Wine with sediment',
    mixturePl: 'Wino z osadem',
    components: ['vín', 'botnfall'],
    componentsEn: ['wine', 'sediment'],
    correctMethod: 'afhelling',
    hint: 'Botnfallið sest niður og hægt er að hella víninu af',
    hintEn: 'Sediment settles and wine can be poured off',
    hintPl: 'Osad opada i wino można zlać',
    emoji: '🍷',
  },

  // Magnetic separation problems
  {
    id: 'iron_sand',
    mixture: 'Járnspan í sandi',
    mixtureEn: 'Iron filings in sand',
    mixturePl: 'Opiłki żelaza w piasku',
    components: ['járnspan', 'sandur'],
    componentsEn: ['iron filings', 'sand'],
    correctMethod: 'segulmagnadur',
    hint: 'Járn er segulrænt, sandur er það ekki',
    hintEn: 'Iron is magnetic, sand is not',
    hintPl: 'Żelazo jest magnetyczne, piasek nie',
    emoji: '🧲',
    propertyQuestion: 'Hvaða eiginleiki er nýttur?',
    propertyQuestionEn: 'What property is exploited?',
    propertyAnswer: 'Segulræni',
    propertyAnswerEn: 'Magnetism',
  },
  {
    id: 'metal_recycling',
    mixture: 'Málmbrot í rusli',
    mixtureEn: 'Metal scraps in waste',
    mixturePl: 'Złom metalowy w odpadach',
    components: ['járnbrot', 'annað rusl'],
    componentsEn: ['iron scraps', 'other waste'],
    correctMethod: 'segulmagnadur',
    hint: 'Stórir seglar draga að járnbrotum í endurvinnslu',
    hintEn: 'Large magnets attract iron scraps in recycling',
    hintPl: 'Duże magnesy przyciągają żelazne odpady przy recyklingu',
    emoji: '♻️',
  },

  // Centrifugation problems
  {
    id: 'blood_components',
    mixture: 'Blóð',
    mixtureEn: 'Blood',
    mixturePl: 'Krew',
    components: ['plasma', 'hvít blóðkorn', 'rauð blóðkorn'],
    componentsEn: ['plasma', 'white blood cells', 'red blood cells'],
    correctMethod: 'skilvinduafl',
    hint: 'Snúningur aðskilur eftir þyngd - þyngri hlutir fara út',
    hintEn: 'Spinning separates by weight - heavier parts go outward',
    hintPl: 'Wirowanie rozdziela według masy - cięższe części na zewnątrz',
    emoji: '🩸',
    propertyQuestion: 'Hvers vegna virkar þetta betur en að bíða?',
    propertyQuestionEn: 'Why does this work better than waiting?',
    propertyAnswer: 'Snúningur eykur aðskilnað - hraðar en þyngdarafl',
    propertyAnswerEn: 'Spinning increases separation - faster than gravity',
  },
  {
    id: 'cream_milk',
    mixture: 'Mjólk',
    mixtureEn: 'Milk',
    mixturePl: 'Mleko',
    components: ['rjómi', 'undanrenna'],
    componentsEn: ['cream', 'skim milk'],
    correctMethod: 'skilvinduafl',
    hint: 'Rjómi er léttari og safnast í miðjuna',
    hintEn: 'Cream is lighter and collects in the center',
    hintPl: 'Śmietana jest lżejsza i gromadzi się w środku',
    emoji: '🥛',
  },
];

// Get all separation method IDs
export function getAllMethodIds(): SeparationMethodId[] {
  return Object.keys(SEPARATION_METHODS) as SeparationMethodId[];
}

// Get randomized problems
export function getRandomProblems(count: number): SeparationProblem[] {
  return shuffleArray(SEPARATION_PROBLEMS).slice(0, count);
}

// Get problems by method
export function getProblemsByMethod(method: SeparationMethodId): SeparationProblem[] {
  return SEPARATION_PROBLEMS.filter(p => p.correctMethod === method);
}

// Get method by ID
export function getMethod(id: SeparationMethodId): SeparationMethod {
  return SEPARATION_METHODS[id];
}
