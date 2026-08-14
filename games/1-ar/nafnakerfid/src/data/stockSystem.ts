/**
 * Stock System (Roman Numeral) Database
 * Data for Level 6 - Stock System Mastery
 */

export interface VariableChargeMetal {
  symbol: string;
  nameIs: string;
  nameEn: string;
  namePl: string;
  commonCharges: number[];
  chargeInfo: string;
}

export const VARIABLE_CHARGE_METALS: VariableChargeMetal[] = [
  {
    symbol: 'Fe',
    nameIs: 'Járn',
    nameEn: 'Iron',
    namePl: 'Żelazo',
    commonCharges: [2, 3],
    chargeInfo: 'Fe²⁺ (járn(II)) er grænleitt, Fe³⁺ (járn(III)) er rauðbrúnt (ryð)'
  },
  {
    symbol: 'Cu',
    nameIs: 'Kopar',
    nameEn: 'Copper',
    namePl: 'Miedź',
    commonCharges: [1, 2],
    chargeInfo: 'Cu⁺ (kopar(I)) er hvítt, Cu²⁺ (kopar(II)) er blátt'
  },
  {
    symbol: 'Mn',
    nameIs: 'Mangan',
    nameEn: 'Manganese',
    namePl: 'Mangan',
    commonCharges: [2, 4, 7],
    chargeInfo: 'Mangan hefur mörg oxunarstig, algengast er +2, +4, og +7'
  },
  {
    symbol: 'Pb',
    nameIs: 'Blý',
    nameEn: 'Lead',
    namePl: 'Ołów',
    commonCharges: [2, 4],
    chargeInfo: 'Pb²⁺ (blý(II)) er algengara, Pb⁴⁺ (blý(IV)) er sjaldgæfara'
  },
  {
    symbol: 'Sn',
    nameIs: 'Tin',
    nameEn: 'Tin',
    namePl: 'Cyna',
    commonCharges: [2, 4],
    chargeInfo: 'Sn²⁺ (tin(II)) og Sn⁴⁺ (tin(IV)) eru bæði algeng'
  },
  {
    symbol: 'Cr',
    nameIs: 'Króm',
    nameEn: 'Chromium',
    namePl: 'Chrom',
    commonCharges: [2, 3, 6],
    chargeInfo: 'Cr³⁺ (króm(III)) er grænt, Cr⁶⁺ (króm(VI)) er gult/appelsínugult'
  },
  {
    symbol: 'Co',
    nameIs: 'Kóbolt',
    nameEn: 'Cobalt',
    namePl: 'Kobalt',
    commonCharges: [2, 3],
    chargeInfo: 'Co²⁺ (kóbolt(II)) er bleikt/blátt, Co³⁺ (kóbolt(III)) er sjaldgæft'
  },
  {
    symbol: 'Ni',
    nameIs: 'Nikkel',
    nameEn: 'Nickel',
    namePl: 'Nikiel',
    commonCharges: [2, 3],
    chargeInfo: 'Ni²⁺ (nikkel(II)) er algengast, grænt í lausn'
  },
  {
    symbol: 'Hg',
    nameIs: 'Kvikasilfur',
    nameEn: 'Mercury',
    namePl: 'Rtęć',
    commonCharges: [1, 2],
    chargeInfo: 'Hg₂²⁺ (kvikasilfur(I)) er par, Hg²⁺ (kvikasilfur(II)) er einfalt'
  },
  {
    symbol: 'Au',
    nameIs: 'Gull',
    nameEn: 'Gold',
    namePl: 'Złoto',
    commonCharges: [1, 3],
    chargeInfo: 'Au⁺ (gull(I)) og Au³⁺ (gull(III)) eru bæði þekkt'
  }
];

// Roman numeral conversion
export const ROMAN_NUMERALS: { [key: number]: string } = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII'
};

export const ROMAN_TO_NUMBER: { [key: string]: number } = {
  'I': 1,
  'II': 2,
  'III': 3,
  'IV': 4,
  'V': 5,
  'VI': 6,
  'VII': 7,
  'VIII': 8
};

// Stock system compounds for practice
export interface StockCompound {
  formula: string;
  nameIs: string;
  nameEn: string;
  metalSymbol: string;
  metalCharge: number;
  anionFormula: string;
  anionName: string;
  anionCharge: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const STOCK_COMPOUNDS: StockCompound[] = [
  // Iron compounds
  {
    formula: 'FeO',
    nameIs: 'Járn(II)oxíð',
    nameEn: 'Iron(II) oxide',
    metalSymbol: 'Fe',
    metalCharge: 2,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: 'O²⁻ = -2. Samtals jafngildi: Fe + (-2) = 0, svo Fe = +2',
    difficulty: 'easy'
  },
  {
    formula: 'Fe₂O₃',
    nameIs: 'Járn(III)oxíð',
    nameEn: 'Iron(III) oxide',
    metalSymbol: 'Fe',
    metalCharge: 3,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: '3 × O²⁻ = -6. 2Fe + (-6) = 0, svo 2Fe = +6, Fe = +3',
    difficulty: 'easy'
  },
  {
    formula: 'FeCl₂',
    nameIs: 'Járn(II)klóríð',
    nameEn: 'Iron(II) chloride',
    metalSymbol: 'Fe',
    metalCharge: 2,
    anionFormula: 'Cl⁻',
    anionName: 'klóríð',
    anionCharge: -1,
    explanation: '2 × Cl⁻ = -2. Fe + (-2) = 0, svo Fe = +2',
    difficulty: 'easy'
  },
  {
    formula: 'FeCl₃',
    nameIs: 'Járn(III)klóríð',
    nameEn: 'Iron(III) chloride',
    metalSymbol: 'Fe',
    metalCharge: 3,
    anionFormula: 'Cl⁻',
    anionName: 'klóríð',
    anionCharge: -1,
    explanation: '3 × Cl⁻ = -3. Fe + (-3) = 0, svo Fe = +3',
    difficulty: 'easy'
  },
  {
    formula: 'Fe(NO₃)₃',
    nameIs: 'Járn(III)nítrat',
    nameEn: 'Iron(III) nitrate',
    metalSymbol: 'Fe',
    metalCharge: 3,
    anionFormula: 'NO₃⁻',
    anionName: 'nítrat',
    anionCharge: -1,
    explanation: '3 × NO₃⁻ = -3. Fe + (-3) = 0, svo Fe = +3',
    difficulty: 'medium'
  },

  // Copper compounds
  {
    formula: 'CuO',
    nameIs: 'Kopar(II)oxíð',
    nameEn: 'Copper(II) oxide',
    metalSymbol: 'Cu',
    metalCharge: 2,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: 'O²⁻ = -2. Cu + (-2) = 0, svo Cu = +2',
    difficulty: 'easy'
  },
  {
    formula: 'Cu₂O',
    nameIs: 'Kopar(I)oxíð',
    nameEn: 'Copper(I) oxide',
    metalSymbol: 'Cu',
    metalCharge: 1,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: '1 × O²⁻ = -2. 2Cu + (-2) = 0, svo 2Cu = +2, Cu = +1',
    difficulty: 'easy'
  },
  {
    formula: 'CuCl₂',
    nameIs: 'Kopar(II)klóríð',
    nameEn: 'Copper(II) chloride',
    metalSymbol: 'Cu',
    metalCharge: 2,
    anionFormula: 'Cl⁻',
    anionName: 'klóríð',
    anionCharge: -1,
    explanation: '2 × Cl⁻ = -2. Cu + (-2) = 0, svo Cu = +2',
    difficulty: 'easy'
  },
  {
    formula: 'CuCl',
    nameIs: 'Kopar(I)klóríð',
    nameEn: 'Copper(I) chloride',
    metalSymbol: 'Cu',
    metalCharge: 1,
    anionFormula: 'Cl⁻',
    anionName: 'klóríð',
    anionCharge: -1,
    explanation: '1 × Cl⁻ = -1. Cu + (-1) = 0, svo Cu = +1',
    difficulty: 'easy'
  },
  {
    formula: 'CuSO₄',
    nameIs: 'Kopar(II)súlfat',
    nameEn: 'Copper(II) sulfate',
    metalSymbol: 'Cu',
    metalCharge: 2,
    anionFormula: 'SO₄²⁻',
    anionName: 'súlfat',
    anionCharge: -2,
    explanation: 'SO₄²⁻ = -2. Cu + (-2) = 0, svo Cu = +2',
    difficulty: 'medium'
  },

  // Lead compounds
  {
    formula: 'PbO',
    nameIs: 'Blý(II)oxíð',
    nameEn: 'Lead(II) oxide',
    metalSymbol: 'Pb',
    metalCharge: 2,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: 'O²⁻ = -2. Pb + (-2) = 0, svo Pb = +2',
    difficulty: 'medium'
  },
  {
    formula: 'PbO₂',
    nameIs: 'Blý(IV)oxíð',
    nameEn: 'Lead(IV) oxide',
    metalSymbol: 'Pb',
    metalCharge: 4,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: '2 × O²⁻ = -4. Pb + (-4) = 0, svo Pb = +4',
    difficulty: 'medium'
  },
  {
    formula: 'Pb(NO₃)₂',
    nameIs: 'Blý(II)nítrat',
    nameEn: 'Lead(II) nitrate',
    metalSymbol: 'Pb',
    metalCharge: 2,
    anionFormula: 'NO₃⁻',
    anionName: 'nítrat',
    anionCharge: -1,
    explanation: '2 × NO₃⁻ = -2. Pb + (-2) = 0, svo Pb = +2',
    difficulty: 'medium'
  },

  // Tin compounds
  {
    formula: 'SnO',
    nameIs: 'Tin(II)oxíð',
    nameEn: 'Tin(II) oxide',
    metalSymbol: 'Sn',
    metalCharge: 2,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: 'O²⁻ = -2. Sn + (-2) = 0, svo Sn = +2',
    difficulty: 'medium'
  },
  {
    formula: 'SnO₂',
    nameIs: 'Tin(IV)oxíð',
    nameEn: 'Tin(IV) oxide',
    metalSymbol: 'Sn',
    metalCharge: 4,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: '2 × O²⁻ = -4. Sn + (-4) = 0, svo Sn = +4',
    difficulty: 'medium'
  },
  {
    formula: 'SnCl₂',
    nameIs: 'Tin(II)klóríð',
    nameEn: 'Tin(II) chloride',
    metalSymbol: 'Sn',
    metalCharge: 2,
    anionFormula: 'Cl⁻',
    anionName: 'klóríð',
    anionCharge: -1,
    explanation: '2 × Cl⁻ = -2. Sn + (-2) = 0, svo Sn = +2',
    difficulty: 'medium'
  },
  {
    formula: 'SnCl₄',
    nameIs: 'Tin(IV)klóríð',
    nameEn: 'Tin(IV) chloride',
    metalSymbol: 'Sn',
    metalCharge: 4,
    anionFormula: 'Cl⁻',
    anionName: 'klóríð',
    anionCharge: -1,
    explanation: '4 × Cl⁻ = -4. Sn + (-4) = 0, svo Sn = +4',
    difficulty: 'medium'
  },

  // Chromium compounds
  {
    formula: 'Cr₂O₃',
    nameIs: 'Króm(III)oxíð',
    nameEn: 'Chromium(III) oxide',
    metalSymbol: 'Cr',
    metalCharge: 3,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: '3 × O²⁻ = -6. 2Cr + (-6) = 0, svo 2Cr = +6, Cr = +3',
    difficulty: 'hard'
  },
  {
    formula: 'CrCl₃',
    nameIs: 'Króm(III)klóríð',
    nameEn: 'Chromium(III) chloride',
    metalSymbol: 'Cr',
    metalCharge: 3,
    anionFormula: 'Cl⁻',
    anionName: 'klóríð',
    anionCharge: -1,
    explanation: '3 × Cl⁻ = -3. Cr + (-3) = 0, svo Cr = +3',
    difficulty: 'hard'
  },

  // Cobalt compounds
  {
    formula: 'CoO',
    nameIs: 'Kóbolt(II)oxíð',
    nameEn: 'Cobalt(II) oxide',
    metalSymbol: 'Co',
    metalCharge: 2,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: 'O²⁻ = -2. Co + (-2) = 0, svo Co = +2',
    difficulty: 'hard'
  },
  {
    formula: 'Co(NO₃)₂',
    nameIs: 'Kóbolt(II)nítrat',
    nameEn: 'Cobalt(II) nitrate',
    metalSymbol: 'Co',
    metalCharge: 2,
    anionFormula: 'NO₃⁻',
    anionName: 'nítrat',
    anionCharge: -1,
    explanation: '2 × NO₃⁻ = -2. Co + (-2) = 0, svo Co = +2',
    difficulty: 'hard'
  },

  // Manganese compounds
  {
    formula: 'MnO',
    nameIs: 'Mangan(II)oxíð',
    nameEn: 'Manganese(II) oxide',
    metalSymbol: 'Mn',
    metalCharge: 2,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: 'O²⁻ = -2. Mn + (-2) = 0, svo Mn = +2',
    difficulty: 'hard'
  },
  {
    formula: 'MnO₂',
    nameIs: 'Mangan(IV)oxíð',
    nameEn: 'Manganese(IV) oxide',
    metalSymbol: 'Mn',
    metalCharge: 4,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: '2 × O²⁻ = -4. Mn + (-4) = 0, svo Mn = +4',
    difficulty: 'hard'
  },
  {
    formula: 'Mn₂O₇',
    nameIs: 'Mangan(VII)oxíð',
    nameEn: 'Manganese(VII) oxide',
    metalSymbol: 'Mn',
    metalCharge: 7,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: '7 × O²⁻ = -14. 2Mn + (-14) = 0, svo 2Mn = +14, Mn = +7',
    difficulty: 'hard'
  },

  // Mercury compounds
  {
    formula: 'HgCl₂',
    nameIs: 'Kvikasilfur(II)klóríð',
    nameEn: 'Mercury(II) chloride',
    metalSymbol: 'Hg',
    metalCharge: 2,
    anionFormula: 'Cl⁻',
    anionName: 'klóríð',
    anionCharge: -1,
    explanation: '2 × Cl⁻ = -2. Hg + (-2) = 0, svo Hg = +2',
    difficulty: 'hard'
  },
  {
    formula: 'HgO',
    nameIs: 'Kvikasilfur(II)oxíð',
    nameEn: 'Mercury(II) oxide',
    metalSymbol: 'Hg',
    metalCharge: 2,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: 'O²⁻ = -2. Hg + (-2) = 0, svo Hg = +2',
    difficulty: 'hard'
  },

  // Nickel compounds
  {
    formula: 'NiO',
    nameIs: 'Nikkel(II)oxíð',
    nameEn: 'Nickel(II) oxide',
    metalSymbol: 'Ni',
    metalCharge: 2,
    anionFormula: 'O²⁻',
    anionName: 'oxíð',
    anionCharge: -2,
    explanation: 'O²⁻ = -2. Ni + (-2) = 0, svo Ni = +2',
    difficulty: 'hard'
  },
  {
    formula: 'NiCl₂',
    nameIs: 'Nikkel(II)klóríð',
    nameEn: 'Nickel(II) chloride',
    metalSymbol: 'Ni',
    metalCharge: 2,
    anionFormula: 'Cl⁻',
    anionName: 'klóríð',
    anionCharge: -1,
    explanation: '2 × Cl⁻ = -2. Ni + (-2) = 0, svo Ni = +2',
    difficulty: 'hard'
  }
];

// Helper functions
export function getStockCompoundsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): StockCompound[] {
  return STOCK_COMPOUNDS.filter(c => c.difficulty === difficulty);
}

export function getStockCompoundsByMetal(metalSymbol: string): StockCompound[] {
  return STOCK_COMPOUNDS.filter(c => c.metalSymbol === metalSymbol);
}

// Get metal info by symbol
export function getMetalInfo(symbol: string): VariableChargeMetal | undefined {
  return VARIABLE_CHARGE_METALS.find(m => m.symbol === symbol);
}

// Calculate charge from formula
export function calculateMetalCharge(
  numMetalAtoms: number,
  anionCharge: number,
  numAnions: number
): number {
  // Total charge must be 0
  // numMetalAtoms * metalCharge + numAnions * anionCharge = 0
  // metalCharge = -(numAnions * anionCharge) / numMetalAtoms
  return Math.round(-(numAnions * anionCharge) / numMetalAtoms);
}

// Fisher-Yates shuffle
export function shuffleCompounds<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
