// Acids and Bases substance data

export type SubstanceType = 'acid' | 'base';

export interface Substance {
  id: string;
  formula: string;
  name: string;
  nameEn: string;
  type: SubstanceType;
  description: string;
  descriptionEn: string;
  hint: string;
  hintEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const SUBSTANCE_TYPES: Record<SubstanceType, {
  name: string;
  nameEn: string;
  namePl: string;
  description: string;
  descriptionEn: string;
  color: string;
  emoji: string;
}> = {
  acid: {
    name: 'Syra',
    nameEn: 'Acid',
    namePl: 'Kwas',
    description: 'Syrur hafa vetni (H) framan við anjon. Daeemi: HCl, H\u2082SO\u2084',
    descriptionEn: 'Acids have hydrogen (H) in front of an anion. Examples: HCl, H\u2082SO\u2084',
    color: '#ef4444', // red
    emoji: '\ud83e\uddea',
  },
  base: {
    name: 'Basi',
    nameEn: 'Base',
    namePl: 'Zasada',
    description: 'Basar hafa m\u00e1lm og hydr\u00f3x\u00edl (OH). D\u00e6mi: NaOH, Ca(OH)\u2082',
    descriptionEn: 'Bases have a metal and hydroxide (OH). Examples: NaOH, Ca(OH)\u2082',
    color: '#3b82f6', // blue
    emoji: '\ud83e\uddeb',
  },
};

export const SUBSTANCES: Substance[] = [
  // Acids
  {
    id: 'hcl',
    formula: 'HCl',
    name: 'Salts\u00fdra',
    nameEn: 'Hydrochloric acid',
    type: 'acid',
    description: 'Sterk s\u00fdra sem finnst \u00ed maganum',
    descriptionEn: 'Strong acid found in the stomach',
    hint: 'Byrjar \u00e1 H og hefur Cl\u207b anjon',
    hintEn: 'Starts with H and has Cl\u207b anion',
    difficulty: 'easy',
  },
  {
    id: 'naoh',
    formula: 'NaOH',
    name: 'Natr\u00edumhydr\u00f3x\u00ed\u00f0',
    nameEn: 'Sodium hydroxide',
    type: 'base',
    description: 'Sterkur basi, einnig kalla\u00f0ur vitis\u00e1pa',
    descriptionEn: 'Strong base, also called lye',
    hint: 'Hefur Na\u207a m\u00e1lmjon og OH\u207b h\u00fddr\u00f3x\u00ed\u00f0jon',
    hintEn: 'Has Na\u207a metal ion and OH\u207b hydroxide ion',
    difficulty: 'easy',
  },
  {
    id: 'h2so4',
    formula: 'H\u2082SO\u2084',
    name: 'Brennisteinss\u00fdra',
    nameEn: 'Sulfuric acid',
    type: 'acid',
    description: 'Sterk s\u00fdra, mikil notkun \u00ed i\u00f0na\u00f0i',
    descriptionEn: 'Strong acid, widely used in industry',
    hint: 'Byrjar \u00e1 H\u2082 \u2014 tveir vetnisar framan vi\u00f0 SO\u2084\u00b2\u207b',
    hintEn: 'Starts with H\u2082 \u2014 two hydrogens before SO\u2084\u00b2\u207b',
    difficulty: 'easy',
  },
  {
    id: 'caoh2',
    formula: 'Ca(OH)\u2082',
    name: 'Kals\u00edumhydr\u00f3x\u00ed\u00f0',
    nameEn: 'Calcium hydroxide',
    type: 'base',
    description: 'Nota\u00f0 \u00ed sement og \u00ed landb\u00fana\u00f0i',
    descriptionEn: 'Used in cement and agriculture',
    hint: 'Ca\u00b2\u207a m\u00e1lmur me\u00f0 tveimur OH\u207b j\u00f3num',
    hintEn: 'Ca\u00b2\u207a metal with two OH\u207b ions',
    difficulty: 'medium',
  },
  {
    id: 'hno3',
    formula: 'HNO\u2083',
    name: 'Salpeturss\u00fdra',
    nameEn: 'Nitric acid',
    type: 'acid',
    description: 'Sterk s\u00fdra notu\u00f0 \u00ed \u00e1bur\u00f0arframlei\u00f0slu',
    descriptionEn: 'Strong acid used in fertilizer production',
    hint: 'Byrjar \u00e1 H me\u00f0 NO\u2083\u207b anjon',
    hintEn: 'Starts with H with NO\u2083\u207b anion',
    difficulty: 'easy',
  },
  {
    id: 'koh',
    formula: 'KOH',
    name: 'Kal\u00edumhydr\u00f3x\u00ed\u00f0',
    nameEn: 'Potassium hydroxide',
    type: 'base',
    description: 'Sterkur basi, nota\u00f0ur \u00ed s\u00e1puger\u00f0',
    descriptionEn: 'Strong base, used in soap making',
    hint: 'K\u207a m\u00e1lmjon me\u00f0 OH\u207b h\u00fddr\u00f3x\u00ed\u00f0jon',
    hintEn: 'K\u207a metal ion with OH\u207b hydroxide ion',
    difficulty: 'easy',
  },
  {
    id: 'hbr',
    formula: 'HBr',
    name: 'Vetnisr\u00f3ms\u00fdra',
    nameEn: 'Hydrobromic acid',
    type: 'acid',
    description: 'Sterk s\u00fdra me\u00f0 br\u00f3m\u00ed\u00f0',
    descriptionEn: 'Strong acid with bromide',
    hint: 'Byrjar \u00e1 H me\u00f0 Br\u207b anjon',
    hintEn: 'Starts with H with Br\u207b anion',
    difficulty: 'medium',
  },
  {
    id: 'lioh',
    formula: 'LiOH',
    name: 'Lit\u00edumhydr\u00f3x\u00ed\u00f0',
    nameEn: 'Lithium hydroxide',
    type: 'base',
    description: 'Nota\u00f0 \u00ed CO\u2082 hreinsun \u00ed geimf\u00f6rum',
    descriptionEn: 'Used in CO\u2082 scrubbing in spacecraft',
    hint: 'Li\u207a m\u00e1lmjon me\u00f0 OH\u207b h\u00fddr\u00f3x\u00ed\u00f0jon',
    hintEn: 'Li\u207a metal ion with OH\u207b hydroxide ion',
    difficulty: 'medium',
  },
  {
    id: 'h3po4',
    formula: 'H\u2083PO\u2084',
    name: 'Fosf\u00f3rss\u00fdra',
    nameEn: 'Phosphoric acid',
    type: 'acid',
    description: 'Finnst \u00ed gosdrykkjum og \u00e1bur\u00f0arger\u00f0',
    descriptionEn: 'Found in soft drinks and fertilizer production',
    hint: 'Byrjar \u00e1 H\u2083 \u2014 \u00fer\u00edr vetnisar framan vi\u00f0 PO\u2084\u00b3\u207b',
    hintEn: 'Starts with H\u2083 \u2014 three hydrogens before PO\u2084\u00b3\u207b',
    difficulty: 'medium',
  },
  {
    id: 'baoh2',
    formula: 'Ba(OH)\u2082',
    name: 'Bar\u00edumhydr\u00f3x\u00ed\u00f0',
    nameEn: 'Barium hydroxide',
    type: 'base',
    description: 'Nota\u00f0 \u00ed efnagreiningum',
    descriptionEn: 'Used in chemical analysis',
    hint: 'Ba\u00b2\u207a m\u00e1lmur me\u00f0 tveimur OH\u207b j\u00f3num',
    hintEn: 'Ba\u00b2\u207a metal with two OH\u207b ions',
    difficulty: 'hard',
  },
  {
    id: 'hclo4',
    formula: 'HClO\u2084',
    name: 'Perklors\u00fdra',
    nameEn: 'Perchloric acid',
    type: 'acid',
    description: 'Sterkasta s\u00fdran, nota\u00f0 \u00ed ranns\u00f3knir',
    descriptionEn: 'Strongest acid, used in research',
    hint: 'Byrjar \u00e1 H me\u00f0 ClO\u2084\u207b anjon',
    hintEn: 'Starts with H with ClO\u2084\u207b anion',
    difficulty: 'hard',
  },
  {
    id: 'mgoh2',
    formula: 'Mg(OH)\u2082',
    name: 'Magnes\u00edumhydr\u00f3x\u00ed\u00f0',
    nameEn: 'Magnesium hydroxide',
    type: 'base',
    description: 'Nota\u00f0 sem magalyf (\"Magnesia mj\u00f3lk\")',
    descriptionEn: 'Used as antacid (\"Milk of Magnesia\")',
    hint: 'Mg\u00b2\u207a m\u00e1lmur me\u00f0 tveimur OH\u207b j\u00f3num',
    hintEn: 'Mg\u00b2\u207a metal with two OH\u207b ions',
    difficulty: 'medium',
  },
  {
    id: 'ch3cooh',
    formula: 'CH\u2083COOH',
    name: 'Edikss\u00fdra',
    nameEn: 'Acetic acid',
    type: 'acid',
    description: 'Veik s\u00fdra \u00ed ediki \u2014 l\u00edtur l\u00edfraenan\u00e1n \u00fat',
    descriptionEn: 'Weak acid in vinegar \u2014 looks organic',
    hint: '\u00deetta er s\u00fdra \u00fe\u00f3tt formunlan l\u00edti \u00fat eins og l\u00edfr\u00e6nt efni. H \u00ed COOH er s\u00fartt',
    hintEn: 'This is an acid despite looking organic. The H in COOH is acidic',
    difficulty: 'hard',
  },
  {
    id: 'h2co3',
    formula: 'H\u2082CO\u2083',
    name: 'Kolss\u00fdra',
    nameEn: 'Carbonic acid',
    type: 'acid',
    description: 'Veik s\u00fdra \u00ed kolss\u00fdru\u00f0um drykkjum',
    descriptionEn: 'Weak acid in carbonated drinks',
    hint: 'Byrjar \u00e1 H\u2082 me\u00f0 CO\u2083\u00b2\u207b anjon',
    hintEn: 'Starts with H\u2082 with CO\u2083\u00b2\u207b anion',
    difficulty: 'medium',
  },
  {
    id: 'sroh2',
    formula: 'Sr(OH)\u2082',
    name: 'Stront\u00edumhydr\u00f3x\u00ed\u00f0',
    nameEn: 'Strontium hydroxide',
    type: 'base',
    description: 'Nota\u00f0 \u00ed sykurframlei\u00f0slu',
    descriptionEn: 'Used in sugar refining',
    hint: 'Sr\u00b2\u207a m\u00e1lmur me\u00f0 tveimur OH\u207b j\u00f3num',
    hintEn: 'Sr\u00b2\u207a metal with two OH\u207b ions',
    difficulty: 'hard',
  },
];

// Shuffle array helper
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
