// Electrolyte classification data for Level 1
// Based on Brown Chemistry Ch. 4.2

export type ElectrolyteType = 'strong' | 'weak' | 'non';

export interface Substance {
  id: string;
  name: string;
  nameEn: string;
  formula: string;
  type: ElectrolyteType;
  description: string;
  descriptionEn: string;
  hint: string;
  hintEn: string;
  dissociation?: string;
}

export const ELECTROLYTE_CATEGORIES: Record<ElectrolyteType, {
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  color: string;
  emoji: string;
  conductivity: string;
  conductivityEn: string;
}> = {
  strong: {
    name: 'Sterkur rafleiðari',
    nameEn: 'Strong electrolyte',
    description: 'Leysist algjörlega upp í jónir í vatni. Leiðir rafstraum vel.',
    descriptionEn: 'Dissociates completely into ions in water. Conducts electricity well.',
    color: '#f59e0b',
    emoji: '💡',
    conductivity: 'Björt pera',
    conductivityEn: 'Bright bulb',
  },
  weak: {
    name: 'Veikur rafleiðari',
    nameEn: 'Weak electrolyte',
    description: 'Leysist að hluta upp í jónir í vatni. Leiðir rafstraum illa.',
    descriptionEn: 'Partially dissociates into ions in water. Conducts electricity poorly.',
    color: '#8b5cf6',
    emoji: '🔅',
    conductivity: 'Dauf pera',
    conductivityEn: 'Dim bulb',
  },
  non: {
    name: 'Órafleiðari',
    nameEn: 'Non-electrolyte',
    description: 'Leysist ekki upp í jónir í vatni. Leiðir ekki rafstraum.',
    descriptionEn: 'Does not dissociate into ions in water. Does not conduct electricity.',
    color: '#6b7280',
    emoji: '⚫',
    conductivity: 'Slökkt pera',
    conductivityEn: 'Bulb off',
  },
};

export const SUBSTANCES: Substance[] = [
  // Strong electrolytes
  {
    id: 'nacl',
    name: 'Natríumklóríð',
    nameEn: 'Sodium chloride',
    formula: 'NaCl',
    type: 'strong',
    description: 'Borðsalt - jónefnasamband',
    descriptionEn: 'Table salt - ionic compound',
    hint: 'Jónefnasambönd leysast algjörlega upp í jónir',
    hintEn: 'Ionic compounds dissociate completely into ions',
    dissociation: 'NaCl → Na⁺ + Cl⁻',
  },
  {
    id: 'hcl',
    name: 'Saltsýra',
    nameEn: 'Hydrochloric acid',
    formula: 'HCl',
    type: 'strong',
    description: 'Sterk sýra sem leysist algjörlega',
    descriptionEn: 'Strong acid that dissociates completely',
    hint: 'HCl er sterk sýra - gefur algjörlega frá sér H⁺',
    hintEn: 'HCl is a strong acid - completely donates H⁺',
    dissociation: 'HCl → H⁺ + Cl⁻',
  },
  {
    id: 'naoh',
    name: 'Natríumhýdroxíð',
    nameEn: 'Sodium hydroxide',
    formula: 'NaOH',
    type: 'strong',
    description: 'Sterk basi, notuð í hreinsiefni',
    descriptionEn: 'Strong base, used in cleaning products',
    hint: 'NaOH er sterk basi - leysist algjörlega upp',
    hintEn: 'NaOH is a strong base - dissociates completely',
    dissociation: 'NaOH → Na⁺ + OH⁻',
  },
  {
    id: 'kno3',
    name: 'Kalíumnítrat',
    nameEn: 'Potassium nitrate',
    formula: 'KNO₃',
    type: 'strong',
    description: 'Leysanlegt jónefnasamband',
    descriptionEn: 'Soluble ionic compound',
    hint: 'Öll leysanleg jónefnasambönd eru sterkir rafleiðarar',
    hintEn: 'All soluble ionic compounds are strong electrolytes',
    dissociation: 'KNO₃ → K⁺ + NO₃⁻',
  },
  {
    id: 'h2so4',
    name: 'Brennisteinssýra',
    nameEn: 'Sulfuric acid',
    formula: 'H₂SO₄',
    type: 'strong',
    description: 'Sterk sýra notuð í iðnaði',
    descriptionEn: 'Strong acid used in industry',
    hint: 'H₂SO₄ er sterk sýra - leysist algjörlega upp',
    hintEn: 'H₂SO₄ is a strong acid - dissociates completely',
    dissociation: 'H₂SO₄ → 2H⁺ + SO₄²⁻',
  },
  // Weak electrolytes
  {
    id: 'ch3cooh',
    name: 'Ediksýra',
    nameEn: 'Acetic acid',
    formula: 'CH₃COOH',
    type: 'weak',
    description: 'Veik sýra í ediki',
    descriptionEn: 'Weak acid found in vinegar',
    hint: 'Ediksýra er veik sýra - leysist að hluta upp',
    hintEn: 'Acetic acid is a weak acid - partially dissociates',
    dissociation: 'CH₃COOH ⇌ CH₃COO⁻ + H⁺',
  },
  {
    id: 'hf',
    name: 'Flúorsýra',
    nameEn: 'Hydrofluoric acid',
    formula: 'HF',
    type: 'weak',
    description: 'Veik sýra þrátt fyrir hættulega eiginleika',
    descriptionEn: 'Weak acid despite its dangerous properties',
    hint: 'HF er veik sýra - jafnvægi liggur til vinstri',
    hintEn: 'HF is a weak acid - equilibrium lies to the left',
    dissociation: 'HF ⇌ H⁺ + F⁻',
  },
  {
    id: 'nh3',
    name: 'Ammóníak',
    nameEn: 'Ammonia',
    formula: 'NH₃',
    type: 'weak',
    description: 'Veik basi notuð í hreinsiefni',
    descriptionEn: 'Weak base used in cleaning products',
    hint: 'NH₃ er veik basi - tekur að hluta við H⁺ frá vatni',
    hintEn: 'NH₃ is a weak base - partially accepts H⁺ from water',
    dissociation: 'NH₃ + H₂O ⇌ NH₄⁺ + OH⁻',
  },
  {
    id: 'h2co3',
    name: 'Kolsýra',
    nameEn: 'Carbonic acid',
    formula: 'H₂CO₃',
    type: 'weak',
    description: 'Veik sýra í gosdrykk',
    descriptionEn: 'Weak acid in carbonated drinks',
    hint: 'H₂CO₃ er veik sýra - leysist bara að hluta',
    hintEn: 'H₂CO₃ is a weak acid - only partially dissociates',
    dissociation: 'H₂CO₃ ⇌ H⁺ + HCO₃⁻',
  },
  {
    id: 'hno2',
    name: 'Saltpéturssýrulingur',
    nameEn: 'Nitrous acid',
    formula: 'HNO₂',
    type: 'weak',
    description: 'Veik sýra - ekki rugla saman við HNO₃',
    descriptionEn: 'Weak acid - do not confuse with HNO₃',
    hint: 'HNO₂ er veik sýra, ólíkt HNO₃ sem er sterk sýra',
    hintEn: 'HNO₂ is a weak acid, unlike HNO₃ which is a strong acid',
    dissociation: 'HNO₂ ⇌ H⁺ + NO₂⁻',
  },
  // Non-electrolytes
  {
    id: 'c6h12o6',
    name: 'Glúkósi',
    nameEn: 'Glucose',
    formula: 'C₆H₁₂O₆',
    type: 'non',
    description: 'Sykurtegund - sameindalegt efni',
    descriptionEn: 'Sugar type - molecular compound',
    hint: 'Sameindaefni sem leysast í vatni mynda ekki jónir',
    hintEn: 'Molecular compounds dissolved in water do not form ions',
  },
  {
    id: 'c2h5oh',
    name: 'Etanól',
    nameEn: 'Ethanol',
    formula: 'C₂H₅OH',
    type: 'non',
    description: 'Áfengi - sameindalegt efni',
    descriptionEn: 'Alcohol - molecular compound',
    hint: 'Þótt OH sé í formúlunni er etanól ekki basi',
    hintEn: 'Even though OH is in the formula, ethanol is not a base',
  },
  {
    id: 'ch3oh',
    name: 'Metanól',
    nameEn: 'Methanol',
    formula: 'CH₃OH',
    type: 'non',
    description: 'Viðarspritt - sameindalegt efni',
    descriptionEn: 'Wood alcohol - molecular compound',
    hint: 'Sameindalegt efni - myndar ekki jónir í lausn',
    hintEn: 'Molecular compound - does not form ions in solution',
  },
  {
    id: 'c12h22o11',
    name: 'Súkrósi',
    nameEn: 'Sucrose',
    formula: 'C₁₂H₂₂O₁₁',
    type: 'non',
    description: 'Borðsykur - sameindalegt efni',
    descriptionEn: 'Table sugar - molecular compound',
    hint: 'Sykur leysist í vatni en myndar ekki jónir',
    hintEn: 'Sugar dissolves in water but does not form ions',
  },
  {
    id: 'co(nh2)2',
    name: 'Þvagefni',
    nameEn: 'Urea',
    formula: 'CO(NH₂)₂',
    type: 'non',
    description: 'Sameindalegt efni - notað sem áburður',
    descriptionEn: 'Molecular compound - used as fertilizer',
    hint: 'Þvagefni er sameindaefni sem leysist í vatni en jónast ekki',
    hintEn: 'Urea is a molecular compound that dissolves but does not ionize',
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
