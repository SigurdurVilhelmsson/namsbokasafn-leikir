// Periodic Trend Comparison Questions
// Covers: atomic radius, ionization energy, electronegativity
// Teaches trends across periods (left to right) and down groups

export type TrendType = 'atomic-radius' | 'ionization-energy' | 'electronegativity';

export interface TrendQuestion {
  id: string;
  trendType: TrendType;
  element1Symbol: string;
  element2Symbol: string;
  /** Which element has the larger/higher value for this trend */
  answerSymbol: string;
  questionIs: string;
  questionEn: string;
  explanationIs: string;
  explanationEn: string;
}

export const TREND_TYPE_INFO: Record<TrendType, {
  nameIs: string;
  nameEn: string;
  descriptionIs: string;
  descriptionEn: string;
  ruleIs: string;
  ruleEn: string;
  emoji: string;
}> = {
  'atomic-radius': {
    nameIs: 'Atómgeisli',
    nameEn: 'Atomic Radius',
    descriptionIs: 'Stærð atómsins (fjarlægð frá kjarna til ystu rafeindaskelja).',
    descriptionEn: 'Size of the atom (distance from nucleus to outermost electron shell).',
    ruleIs: 'Atómgeisli minnkar eftir lotu (til hægri) og stækkar niður hópa.',
    ruleEn: 'Atomic radius decreases across a period (left to right) and increases down a group.',
    emoji: '🔴',
  },
  'ionization-energy': {
    nameIs: 'Jónunarorka',
    nameEn: 'Ionization Energy',
    descriptionIs: 'Orkan sem þarf til að fjarlægja rafeind úr atómi.',
    descriptionEn: 'Energy required to remove an electron from an atom.',
    ruleIs: 'Jónunarorka eykst eftir lotu (til hægri) og minnkar niður hópa.',
    ruleEn: 'Ionization energy increases across a period (left to right) and decreases down a group.',
    emoji: '⚡',
  },
  'electronegativity': {
    nameIs: 'Rafneikvæðni',
    nameEn: 'Electronegativity',
    descriptionIs: 'Hversu sterklega atóm dregur að sér rafeindir í efnatengi.',
    descriptionEn: 'How strongly an atom attracts electrons in a chemical bond.',
    ruleIs: 'Rafneikvæðni eykst eftir lotu (til hægri) og minnkar niður hópa (eðalgös undanskilin).',
    ruleEn: 'Electronegativity increases across a period (left to right) and decreases down a group (noble gases excluded).',
    emoji: '🧲',
  },
};

/**
 * 12 trend comparison questions - 4 per trend type
 * All chemically accurate based on standard periodic trends
 */
export const TREND_QUESTIONS: TrendQuestion[] = [
  // Atomic Radius - across period (left to right decreases)
  {
    id: 'ar-1',
    trendType: 'atomic-radius',
    element1Symbol: 'Na',
    element2Symbol: 'Cl',
    answerSymbol: 'Na',
    questionIs: 'Hvort hefur stærri atómgeisla: Na eða Cl?',
    questionEn: 'Which has a larger atomic radius: Na or Cl?',
    explanationIs: 'Na hefur stærri atómgeisla. Eftir lotunni (til hægri) minnkar atómgeisli vegna sterkari kjarnakrafts.',
    explanationEn: 'Na has a larger atomic radius. Across a period (left to right), atomic radius decreases due to stronger nuclear charge.',
  },
  {
    id: 'ar-2',
    trendType: 'atomic-radius',
    element1Symbol: 'Li',
    element2Symbol: 'Na',
    answerSymbol: 'Na',
    questionIs: 'Hvort hefur stærri atómgeisla: Li eða Na?',
    questionEn: 'Which has a larger atomic radius: Li or Na?',
    explanationIs: 'Na hefur stærri atómgeisla. Niður hópinn bætast nýjar rafeindaskeljar sem stækka atómið.',
    explanationEn: 'Na has a larger atomic radius. Going down a group, new electron shells are added, increasing atom size.',
  },
  {
    id: 'ar-3',
    trendType: 'atomic-radius',
    element1Symbol: 'O',
    element2Symbol: 'S',
    answerSymbol: 'S',
    questionIs: 'Hvort hefur stærri atómgeisla: O eða S?',
    questionEn: 'Which has a larger atomic radius: O or S?',
    explanationIs: 'S hefur stærri atómgeisla. S er neðar í sama hóp og hefur fleiri rafeindaskeljar.',
    explanationEn: 'S has a larger atomic radius. S is lower in the same group and has more electron shells.',
  },
  {
    id: 'ar-4',
    trendType: 'atomic-radius',
    element1Symbol: 'C',
    element2Symbol: 'F',
    answerSymbol: 'C',
    questionIs: 'Hvort hefur stærri atómgeisla: C eða F?',
    questionEn: 'Which has a larger atomic radius: C or F?',
    explanationIs: 'C hefur stærri atómgeisla. F er lengra til hægri í sömu lotu og hefur sterkari kjarnakraft.',
    explanationEn: 'C has a larger atomic radius. F is further right in the same period and has stronger nuclear charge.',
  },

  // Ionization Energy - across period increases, down group decreases
  {
    id: 'ie-1',
    trendType: 'ionization-energy',
    element1Symbol: 'Li',
    element2Symbol: 'F',
    answerSymbol: 'F',
    questionIs: 'Hvort hefur hærri jónunarorku: Li eða F?',
    questionEn: 'Which has a higher ionization energy: Li or F?',
    explanationIs: 'F hefur hærri jónunarorku. Eftir lotunni eykst jónunarorka vegna sterkara kjarnakrafts.',
    explanationEn: 'F has a higher ionization energy. Across a period, ionization energy increases due to stronger nuclear charge.',
  },
  {
    id: 'ie-2',
    trendType: 'ionization-energy',
    element1Symbol: 'Na',
    element2Symbol: 'K',
    answerSymbol: 'Na',
    questionIs: 'Hvort hefur hærri jónunarorku: Na eða K?',
    questionEn: 'Which has a higher ionization energy: Na or K?',
    explanationIs: 'Na hefur hærri jónunarorku. Niður hópinn minnkar jónunarorka vegna þess að ystu rafeindir eru fjær kjarnanum.',
    explanationEn: 'Na has a higher ionization energy. Down a group, ionization energy decreases because outer electrons are farther from the nucleus.',
  },
  {
    id: 'ie-3',
    trendType: 'ionization-energy',
    element1Symbol: 'Mg',
    element2Symbol: 'Ca',
    answerSymbol: 'Mg',
    questionIs: 'Hvort hefur hærri jónunarorku: Mg eða Ca?',
    questionEn: 'Which has a higher ionization energy: Mg or Ca?',
    explanationIs: 'Mg hefur hærri jónunarorku. Mg er ofar í hóp 2 og ysta rafeind er nær kjarnanum.',
    explanationEn: 'Mg has a higher ionization energy. Mg is higher in group 2 and its outer electron is closer to the nucleus.',
  },
  {
    id: 'ie-4',
    trendType: 'ionization-energy',
    element1Symbol: 'B',
    element2Symbol: 'N',
    answerSymbol: 'N',
    questionIs: 'Hvort hefur hærri jónunarorku: B eða N?',
    questionEn: 'Which has a higher ionization energy: B or N?',
    explanationIs: 'N hefur hærri jónunarorku. N er lengra til hægri í lotu 2 og hefur sterkari kjarnakraft.',
    explanationEn: 'N has a higher ionization energy. N is further right in period 2 and has stronger nuclear charge.',
  },

  // Electronegativity - increases across period, decreases down group
  {
    id: 'en-1',
    trendType: 'electronegativity',
    element1Symbol: 'Na',
    element2Symbol: 'Cl',
    answerSymbol: 'Cl',
    questionIs: 'Hvort er rafneikvæðara: Na eða Cl?',
    questionEn: 'Which is more electronegative: Na or Cl?',
    explanationIs: 'Cl er rafneikvæðara. Eftir lotunni eykst rafneikvæðni vegna þess að atóm eru nær því að fylla ystu skel.',
    explanationEn: 'Cl is more electronegative. Across a period, electronegativity increases because atoms are closer to filling their outer shell.',
  },
  {
    id: 'en-2',
    trendType: 'electronegativity',
    element1Symbol: 'F',
    element2Symbol: 'Cl',
    answerSymbol: 'F',
    questionIs: 'Hvort er rafneikvæðara: F eða Cl?',
    questionEn: 'Which is more electronegative: F or Cl?',
    explanationIs: 'F er rafneikvæðast allra frumefna. Ofar í hópnum er sterkari rafneikvæðni.',
    explanationEn: 'F is the most electronegative of all elements. Higher in the group means stronger electronegativity.',
  },
  {
    id: 'en-3',
    trendType: 'electronegativity',
    element1Symbol: 'C',
    element2Symbol: 'O',
    answerSymbol: 'O',
    questionIs: 'Hvort er rafneikvæðara: C eða O?',
    questionEn: 'Which is more electronegative: C or O?',
    explanationIs: 'O er rafneikvæðara. O er lengra til hægri í sömu lotu og dregur sterkar að sér rafeindir.',
    explanationEn: 'O is more electronegative. O is further right in the same period and attracts electrons more strongly.',
  },
  {
    id: 'en-4',
    trendType: 'electronegativity',
    element1Symbol: 'K',
    element2Symbol: 'Br',
    answerSymbol: 'Br',
    questionIs: 'Hvort er rafneikvæðara: K eða Br?',
    questionEn: 'Which is more electronegative: K or Br?',
    explanationIs: 'Br er rafneikvæðara. Br er halógen og nærri fullu ystu skel, en K er alkalí málmur.',
    explanationEn: 'Br is more electronegative. Br is a halogen near a full outer shell, while K is an alkali metal.',
  },
];
