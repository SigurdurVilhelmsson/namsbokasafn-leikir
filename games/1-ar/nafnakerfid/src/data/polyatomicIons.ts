/**
 * Polyatomic Ions Database
 * Complete database for Level 4 - Polyatomic Ion Drill
 */

export interface PolyatomicIon {
  formula: string;
  charge: string;
  chargeValue: number;
  nameIs: string;
  nameEn: string;
  namePl: string;
  category: 'nitrate' | 'sulfate' | 'carbonate' | 'phosphate' | 'halogen' | 'other';
  commonUse: string;
  mnemonicIs?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const POLYATOMIC_IONS: PolyatomicIon[] = [
  // Nitrate/Nitrite family
  {
    formula: 'NO₃⁻',
    charge: '1-',
    chargeValue: -1,
    nameIs: 'Nítrat',
    nameEn: 'Nitrate',
    namePl: 'Azotan',
    category: 'nitrate',
    commonUse: 'Áburður, sprengiefni',
    mnemonicIs: 'Nítrat: 3 súrefni, meira en nítrít',
    difficulty: 'easy'
  },
  {
    formula: 'NO₂⁻',
    charge: '1-',
    chargeValue: -1,
    nameIs: 'Nítrít',
    nameEn: 'Nitrite',
    namePl: 'Azotyn',
    category: 'nitrate',
    commonUse: 'Rotvarnarefni í mat',
    mnemonicIs: 'Nítrít: 2 súrefni, -ít = færri súrefni',
    difficulty: 'medium'
  },

  // Sulfate/Sulfite family
  {
    formula: 'SO₄²⁻',
    charge: '2-',
    chargeValue: -2,
    nameIs: 'Súlfat',
    nameEn: 'Sulfate',
    namePl: 'Siarczan',
    category: 'sulfate',
    commonUse: 'Gifs, þvottaefni',
    mnemonicIs: 'Súlfat: 4 súrefni',
    difficulty: 'easy'
  },
  {
    formula: 'SO₃²⁻',
    charge: '2-',
    chargeValue: -2,
    nameIs: 'Súlfít',
    nameEn: 'Sulfite',
    namePl: 'Siarczyn',
    category: 'sulfate',
    commonUse: 'Rotvarnarefni',
    mnemonicIs: 'Súlfít: 3 súrefni, -ít = færri',
    difficulty: 'medium'
  },

  // Carbonate/Bicarbonate family
  {
    formula: 'CO₃²⁻',
    charge: '2-',
    chargeValue: -2,
    nameIs: 'Karbónat',
    nameEn: 'Carbonate',
    namePl: 'Weglan',
    category: 'carbonate',
    commonUse: 'Kalksteinn, gluggar',
    mnemonicIs: 'Karbónat: kolefni + 3 súrefni',
    difficulty: 'easy'
  },
  {
    formula: 'HCO₃⁻',
    charge: '1-',
    chargeValue: -1,
    nameIs: 'Vetniskarbónat',
    nameEn: 'Bicarbonate',
    namePl: 'Wodoroweglan',
    category: 'carbonate',
    commonUse: 'Matarsódi, magasýrubindandi',
    mnemonicIs: 'Vetniskarbónat: H + karbónat, einn neikvæður',
    difficulty: 'medium'
  },

  // Phosphate family
  {
    formula: 'PO₄³⁻',
    charge: '3-',
    chargeValue: -3,
    nameIs: 'Fosfat',
    nameEn: 'Phosphate',
    namePl: 'Fosforan',
    category: 'phosphate',
    commonUse: 'Áburður, bein, tannáfæri',
    mnemonicIs: 'Fosfat: 4 súrefni, -3 hleðsla',
    difficulty: 'medium'
  },
  {
    formula: 'HPO₄²⁻',
    charge: '2-',
    chargeValue: -2,
    nameIs: 'Vetnisfosfat',
    nameEn: 'Hydrogen phosphate',
    namePl: 'Wodorofosforan',
    category: 'phosphate',
    commonUse: 'Stuðpúði í líkamanum',
    difficulty: 'hard'
  },
  {
    formula: 'H₂PO₄⁻',
    charge: '1-',
    chargeValue: -1,
    nameIs: 'Dívetnsfosfat',
    nameEn: 'Dihydrogen phosphate',
    namePl: 'Diwodorofosforan',
    category: 'phosphate',
    commonUse: 'Stuðpúði í líkamanum',
    difficulty: 'hard'
  },

  // Hydroxide and Ammonium
  {
    formula: 'OH⁻',
    charge: '1-',
    chargeValue: -1,
    nameIs: 'Hýdroxíð',
    nameEn: 'Hydroxide',
    namePl: 'Wodorotlenek',
    category: 'other',
    commonUse: 'Basar, sápa',
    mnemonicIs: 'Hýdroxíð: O-H, neikvæð jón',
    difficulty: 'easy'
  },
  {
    formula: 'NH₄⁺',
    charge: '1+',
    chargeValue: 1,
    nameIs: 'Ammóníum',
    nameEn: 'Ammonium',
    namePl: 'Amon',
    category: 'other',
    commonUse: 'Áburður, hreinsivörur',
    mnemonicIs: 'Ammóníum: eina jákvæða fjölatóma jónin!',
    difficulty: 'easy'
  },

  // Halogen oxyanions (Chlorate family)
  {
    formula: 'ClO₄⁻',
    charge: '1-',
    chargeValue: -1,
    nameIs: 'Perklórat',
    nameEn: 'Perchlorate',
    namePl: 'Nadchloran',
    category: 'halogen',
    commonUse: 'Eldsumbrot',
    mnemonicIs: 'Per- = mest súrefni (4)',
    difficulty: 'hard'
  },
  {
    formula: 'ClO₃⁻',
    charge: '1-',
    chargeValue: -1,
    nameIs: 'Klórat',
    nameEn: 'Chlorate',
    namePl: 'Chloran',
    category: 'halogen',
    commonUse: 'Oxari, illgresiseyðar',
    mnemonicIs: 'Klórat: -at = hefðbundin -3 súrefni',
    difficulty: 'medium'
  },
  {
    formula: 'ClO₂⁻',
    charge: '1-',
    chargeValue: -1,
    nameIs: 'Klórít',
    nameEn: 'Chlorite',
    namePl: 'Chloryn',
    category: 'halogen',
    commonUse: 'Vatnsótthreinsun',
    mnemonicIs: 'Klórít: -ít = færri súrefni (2)',
    difficulty: 'hard'
  },
  {
    formula: 'ClO⁻',
    charge: '1-',
    chargeValue: -1,
    nameIs: 'Hýpóklórít',
    nameEn: 'Hypochlorite',
    namePl: 'Podchloran',
    category: 'halogen',
    commonUse: 'Bleiking, klór í laug',
    mnemonicIs: 'Hýpó- = minnst súrefni (1)',
    difficulty: 'hard'
  },

  // Other important ions
  {
    formula: 'CH₃COO⁻',
    charge: '1-',
    chargeValue: -1,
    nameIs: 'Acetat',
    nameEn: 'Acetate',
    namePl: 'Octan',
    category: 'other',
    commonUse: 'Edik, lífræn efni',
    mnemonicIs: 'Acetat: úr ediksýru',
    difficulty: 'medium'
  },
  {
    formula: 'C₂H₃O₂⁻',
    charge: '1-',
    chargeValue: -1,
    nameIs: 'Acetat',
    nameEn: 'Acetate',
    namePl: 'Octan',
    category: 'other',
    commonUse: 'Edik, lífræn efni',
    mnemonicIs: 'Acetat: önnur ritun',
    difficulty: 'medium'
  },
  {
    formula: 'CN⁻',
    charge: '1-',
    chargeValue: -1,
    nameIs: 'Sýaníð',
    nameEn: 'Cyanide',
    namePl: 'Cyjanek',
    category: 'other',
    commonUse: 'Eitur, gullvinnsla',
    mnemonicIs: 'Sýaníð: C-N, mjög eitrað',
    difficulty: 'medium'
  },

  // Chromate family
  {
    formula: 'CrO₄²⁻',
    charge: '2-',
    chargeValue: -2,
    nameIs: 'Krómat',
    nameEn: 'Chromate',
    namePl: 'Chromian',
    category: 'other',
    commonUse: 'Gulur litur, málmhúðun',
    mnemonicIs: 'Krómat: gullgulur litur',
    difficulty: 'hard'
  },
  {
    formula: 'Cr₂O₇²⁻',
    charge: '2-',
    chargeValue: -2,
    nameIs: 'Díkrómat',
    nameEn: 'Dichromate',
    namePl: 'Dwuchromian',
    category: 'other',
    commonUse: 'Appelsínugulur litur, oxari',
    mnemonicIs: 'Díkrómat: tveir krómar, appelsínugult',
    difficulty: 'hard'
  },

  // Permanganate
  {
    formula: 'MnO₄⁻',
    charge: '1-',
    chargeValue: -1,
    nameIs: 'Permanganat',
    nameEn: 'Permanganate',
    namePl: 'Nadmanganian',
    category: 'other',
    commonUse: 'Fjólublár litur, sótthreinsun',
    mnemonicIs: 'Permanganat: fjólublátt, sterkur oxari',
    difficulty: 'hard'
  }
];

// Helper functions
export function getPolyatomicIonsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): PolyatomicIon[] {
  return POLYATOMIC_IONS.filter(ion => ion.difficulty === difficulty);
}

export function getPolyatomicIonsByCategory(category: PolyatomicIon['category']): PolyatomicIon[] {
  return POLYATOMIC_IONS.filter(ion => ion.category === category);
}

// Get unique ions (deduplicate acetate variants)
export function getUniquePolyatomicIons(): PolyatomicIon[] {
  const seen = new Set<string>();
  return POLYATOMIC_IONS.filter(ion => {
    const key = ion.nameIs.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Fisher-Yates shuffle
export function shuffleIons<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Get ions for spaced repetition based on performance
export interface IonPerformance {
  ionFormula: string;
  correctCount: number;
  incorrectCount: number;
  lastSeen: number;
}

export function getIonsForSpacedRepetition(
  ions: PolyatomicIon[],
  performance: IonPerformance[],
  count: number
): PolyatomicIon[] {
  const performanceMap = new Map(performance.map(p => [p.ionFormula, p]));

  // Score each ion: lower score = needs more practice
  const scoredIons = ions.map(ion => {
    const perf = performanceMap.get(ion.formula);
    let score = 0;

    if (!perf) {
      // Never seen - high priority
      score = 100;
    } else {
      // Calculate based on accuracy and recency
      const total = perf.correctCount + perf.incorrectCount;
      const accuracy = total > 0 ? perf.correctCount / total : 0;
      const timeSince = Date.now() - perf.lastSeen;
      const hoursSince = timeSince / (1000 * 60 * 60);

      // Lower accuracy = higher priority
      // More time since seen = higher priority
      score = (1 - accuracy) * 50 + Math.min(hoursSince, 24) * 2;
    }

    return { ion, score };
  });

  // Sort by score (descending) and take top count
  scoredIons.sort((a, b) => b.score - a.score);

  // Mix in some random variety
  const prioritized = scoredIons.slice(0, Math.ceil(count * 0.7));
  const random = shuffleIons(scoredIons.slice(Math.ceil(count * 0.7)));

  const selected = [...prioritized, ...random.slice(0, count - prioritized.length)];
  return shuffleIons(selected.map(s => s.ion));
}
