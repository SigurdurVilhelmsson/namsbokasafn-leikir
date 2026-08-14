// Activity Series (Virkniröð) data for single replacement reactions
// Metals higher in the series can displace metals lower in the series

export interface Metal {
  symbol: string;
  name: string;
  nameEn: string;
  namePl: string;
  position: number; // Lower number = more reactive
  canDisplaceH: boolean; // Can displace hydrogen from acids/water
  reactsWithColdWater: boolean;
  reactsWithSteam: boolean;
  reactsWithAcids: boolean;
}

// Activity series from most reactive to least reactive
// Position 1 = most reactive, higher number = less reactive
export const ACTIVITY_SERIES: Metal[] = [
  { symbol: 'Li', name: 'Litíum', nameEn: 'Lithium', namePl: 'Lit', position: 1, canDisplaceH: true, reactsWithColdWater: true, reactsWithSteam: true, reactsWithAcids: true },
  { symbol: 'K', name: 'Kalíum', nameEn: 'Potassium', namePl: 'Potas', position: 2, canDisplaceH: true, reactsWithColdWater: true, reactsWithSteam: true, reactsWithAcids: true },
  { symbol: 'Ba', name: 'Baríum', nameEn: 'Barium', namePl: 'Bar', position: 3, canDisplaceH: true, reactsWithColdWater: true, reactsWithSteam: true, reactsWithAcids: true },
  { symbol: 'Ca', name: 'Kalsíum', nameEn: 'Calcium', namePl: 'Wapń', position: 4, canDisplaceH: true, reactsWithColdWater: true, reactsWithSteam: true, reactsWithAcids: true },
  { symbol: 'Na', name: 'Natríum', nameEn: 'Sodium', namePl: 'Sód', position: 5, canDisplaceH: true, reactsWithColdWater: true, reactsWithSteam: true, reactsWithAcids: true },
  { symbol: 'Mg', name: 'Magnesíum', nameEn: 'Magnesium', namePl: 'Magnez', position: 6, canDisplaceH: true, reactsWithColdWater: false, reactsWithSteam: true, reactsWithAcids: true },
  { symbol: 'Al', name: 'Ál', nameEn: 'Aluminum', namePl: 'Glin', position: 7, canDisplaceH: true, reactsWithColdWater: false, reactsWithSteam: true, reactsWithAcids: true },
  { symbol: 'Zn', name: 'Sink', nameEn: 'Zinc', namePl: 'Cynk', position: 8, canDisplaceH: true, reactsWithColdWater: false, reactsWithSteam: true, reactsWithAcids: true },
  { symbol: 'Fe', name: 'Járn', nameEn: 'Iron', namePl: 'Żelazo', position: 9, canDisplaceH: true, reactsWithColdWater: false, reactsWithSteam: true, reactsWithAcids: true },
  { symbol: 'Ni', name: 'Nikkel', nameEn: 'Nickel', namePl: 'Nikiel', position: 10, canDisplaceH: true, reactsWithColdWater: false, reactsWithSteam: false, reactsWithAcids: true },
  { symbol: 'Sn', name: 'Tin', nameEn: 'Tin', namePl: 'Cyna', position: 11, canDisplaceH: true, reactsWithColdWater: false, reactsWithSteam: false, reactsWithAcids: true },
  { symbol: 'Pb', name: 'Blý', nameEn: 'Lead', namePl: 'Ołów', position: 12, canDisplaceH: true, reactsWithColdWater: false, reactsWithSteam: false, reactsWithAcids: true },
  { symbol: 'H', name: 'Vetni', nameEn: 'Hydrogen', namePl: 'Wodór', position: 13, canDisplaceH: false, reactsWithColdWater: false, reactsWithSteam: false, reactsWithAcids: false },
  { symbol: 'Cu', name: 'Kopar', nameEn: 'Copper', namePl: 'Miedź', position: 14, canDisplaceH: false, reactsWithColdWater: false, reactsWithSteam: false, reactsWithAcids: false },
  { symbol: 'Hg', name: 'Kvikasilfur', nameEn: 'Mercury', namePl: 'Rtęć', position: 15, canDisplaceH: false, reactsWithColdWater: false, reactsWithSteam: false, reactsWithAcids: false },
  { symbol: 'Ag', name: 'Silfur', nameEn: 'Silver', namePl: 'Srebro', position: 16, canDisplaceH: false, reactsWithColdWater: false, reactsWithSteam: false, reactsWithAcids: false },
  { symbol: 'Pt', name: 'Platína', nameEn: 'Platinum', namePl: 'Platyna', position: 17, canDisplaceH: false, reactsWithColdWater: false, reactsWithSteam: false, reactsWithAcids: false },
  { symbol: 'Au', name: 'Gull', nameEn: 'Gold', namePl: 'Złoto', position: 18, canDisplaceH: false, reactsWithColdWater: false, reactsWithSteam: false, reactsWithAcids: false },
];

export interface ActivitySeriesQuestion {
  id: string;
  metalAdded: string;
  solution: string;
  metalInSolution: string;
  equation: string;
  willReact: boolean;
  explanation: string;
  explanationEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const ACTIVITY_SERIES_QUESTIONS: ActivitySeriesQuestion[] = [
  // Easy - clear displacement cases
  {
    id: 'as1',
    metalAdded: 'Zn',
    solution: 'CuSO₄',
    metalInSolution: 'Cu',
    equation: 'Zn + CuSO₄ → ZnSO₄ + Cu',
    willReact: true,
    explanation: 'Sink (Zn) er ofar í virkniröðinni en kopar (Cu), svo sink víxlar við kopar',
    explanationEn: 'Zinc (Zn) is above copper (Cu) in the activity series, so zinc displaces copper',
    difficulty: 'easy',
  },
  {
    id: 'as2',
    metalAdded: 'Cu',
    solution: 'ZnSO₄',
    metalInSolution: 'Zn',
    equation: 'Cu + ZnSO₄ → NR',
    willReact: false,
    explanation: 'Kopar (Cu) er neðar í virkniröðinni en sink (Zn), svo ekkert hvarf á sér stað',
    explanationEn: 'Copper (Cu) is below zinc (Zn) in the activity series, so no reaction occurs',
    difficulty: 'easy',
  },
  {
    id: 'as3',
    metalAdded: 'Fe',
    solution: 'CuSO₄',
    metalInSolution: 'Cu',
    equation: 'Fe + CuSO₄ → FeSO₄ + Cu',
    willReact: true,
    explanation: 'Járn (Fe) er ofar í virkniröðinni en kopar (Cu)',
    explanationEn: 'Iron (Fe) is above copper (Cu) in the activity series',
    difficulty: 'easy',
  },
  {
    id: 'as4',
    metalAdded: 'Ag',
    solution: 'CuSO₄',
    metalInSolution: 'Cu',
    equation: 'Ag + CuSO₄ → NR',
    willReact: false,
    explanation: 'Silfur (Ag) er neðar en kopar (Cu) í virkniröðinni',
    explanationEn: 'Silver (Ag) is below copper (Cu) in the activity series',
    difficulty: 'easy',
  },

  // Medium - with acids
  {
    id: 'as5',
    metalAdded: 'Mg',
    solution: 'HCl',
    metalInSolution: 'H',
    equation: 'Mg + 2HCl → MgCl₂ + H₂',
    willReact: true,
    explanation: 'Magnesíum (Mg) er ofar en vetni (H) í virkniröðinni og leysir úr sýru',
    explanationEn: 'Magnesium (Mg) is above hydrogen (H) in the activity series and dissolves in acid',
    difficulty: 'medium',
  },
  {
    id: 'as6',
    metalAdded: 'Cu',
    solution: 'HCl',
    metalInSolution: 'H',
    equation: 'Cu + HCl → NR',
    willReact: false,
    explanation: 'Kopar (Cu) er neðar en vetni (H), svo hann leysist ekki í venjulegri sýru',
    explanationEn: 'Copper (Cu) is below hydrogen (H), so it does not dissolve in regular acid',
    difficulty: 'medium',
  },
  {
    id: 'as7',
    metalAdded: 'Pb',
    solution: 'AgNO₃',
    metalInSolution: 'Ag',
    equation: 'Pb + 2AgNO₃ → Pb(NO₃)₂ + 2Ag',
    willReact: true,
    explanation: 'Blý (Pb) er ofar en silfur (Ag) í virkniröðinni',
    explanationEn: 'Lead (Pb) is above silver (Ag) in the activity series',
    difficulty: 'medium',
  },
  {
    id: 'as8',
    metalAdded: 'Zn',
    solution: 'H₂SO₄',
    metalInSolution: 'H',
    equation: 'Zn + H₂SO₄ → ZnSO₄ + H₂',
    willReact: true,
    explanation: 'Sink er ofar en vetni og leysist í brennisteinssýru',
    explanationEn: 'Zinc is above hydrogen and dissolves in sulfuric acid',
    difficulty: 'medium',
  },

  // Hard - less common metals
  {
    id: 'as9',
    metalAdded: 'Ni',
    solution: 'PbCl₂',
    metalInSolution: 'Pb',
    equation: 'Ni + PbCl₂ → NiCl₂ + Pb',
    willReact: true,
    explanation: 'Nikkel (Ni) er ofar en blý (Pb) í virkniröðinni',
    explanationEn: 'Nickel (Ni) is above lead (Pb) in the activity series',
    difficulty: 'hard',
  },
  {
    id: 'as10',
    metalAdded: 'Sn',
    solution: 'FeCl₂',
    metalInSolution: 'Fe',
    equation: 'Sn + FeCl₂ → NR',
    willReact: false,
    explanation: 'Tin (Sn) er neðar en járn (Fe) í virkniröðinni',
    explanationEn: 'Tin (Sn) is below iron (Fe) in the activity series',
    difficulty: 'hard',
  },
  {
    id: 'as11',
    metalAdded: 'Al',
    solution: 'ZnCl₂',
    metalInSolution: 'Zn',
    equation: '2Al + 3ZnCl₂ → 2AlCl₃ + 3Zn',
    willReact: true,
    explanation: 'Ál (Al) er ofar en sink (Zn) í virkniröðinni',
    explanationEn: 'Aluminum (Al) is above zinc (Zn) in the activity series',
    difficulty: 'hard',
  },
  {
    id: 'as12',
    metalAdded: 'Au',
    solution: 'HCl',
    metalInSolution: 'H',
    equation: 'Au + HCl → NR',
    willReact: false,
    explanation: 'Gull (Au) er eðalasti málmurinn og hvarfast ekki við venjulegar sýrur',
    explanationEn: 'Gold (Au) is the noblest metal and does not react with regular acids',
    difficulty: 'hard',
  },
];

export function getMetalBySymbol(symbol: string): Metal | undefined {
  return ACTIVITY_SERIES.find(m => m.symbol === symbol);
}

export function canDisplace(metalA: string, metalB: string): boolean {
  const a = getMetalBySymbol(metalA);
  const b = getMetalBySymbol(metalB);
  if (!a || !b) return false;
  return a.position < b.position;
}

export function getActivitySeriesQuestions(count?: number): ActivitySeriesQuestion[] {
  const shuffled = [...ACTIVITY_SERIES_QUESTIONS].sort(() => Math.random() - 0.5);
  return count ? shuffled.slice(0, count) : shuffled;
}
