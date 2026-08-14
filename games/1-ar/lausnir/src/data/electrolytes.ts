// Electrolyte classification data for Level 5 (Rafleiðaraflokkun)

export type ElectrolyteType = 'strong' | 'weak' | 'non';

export interface Electrolyte {
  id: string;
  formula: string;
  name: string;
  nameEn: string;
  namePl: string;
  type: ElectrolyteType;
  category: 'acid' | 'base' | 'salt' | 'molecular';
  dissociationEquation?: string;
  explanation: string;
  explanationEn: string;
  explanationPl: string;
  emoji: string;
}

// Strong Electrolytes - Complete dissociation
export const STRONG_ELECTROLYTES: Electrolyte[] = [
  // Strong Acids
  {
    id: 'hcl',
    formula: 'HCl',
    name: 'Saltsýra',
    nameEn: 'Hydrochloric acid',
    namePl: 'Kwas solny',
    type: 'strong',
    category: 'acid',
    dissociationEquation: 'HCl → H⁺ + Cl⁻',
    explanation: 'Sterk sýra - sundurgreinist 100% í jónir',
    explanationEn: 'Strong acid - 100% dissociation into ions',
    explanationPl: 'Mocny kwas - 100% dysocjacji na jony',
    emoji: '⚗️',
  },
  {
    id: 'hno3',
    formula: 'HNO₃',
    name: 'Saltpéturssýra',
    nameEn: 'Nitric acid',
    namePl: 'Kwas azotowy',
    type: 'strong',
    category: 'acid',
    dissociationEquation: 'HNO₃ → H⁺ + NO₃⁻',
    explanation: 'Sterk sýra - fullkomlega jónuð',
    explanationEn: 'Strong acid - completely ionized',
    explanationPl: 'Mocny kwas - całkowicie zjonizowany',
    emoji: '⚗️',
  },
  {
    id: 'h2so4',
    formula: 'H₂SO₄',
    name: 'Brennisteinssýra',
    nameEn: 'Sulfuric acid',
    namePl: 'Kwas siarkowy',
    type: 'strong',
    category: 'acid',
    dissociationEquation: 'H₂SO₄ → 2H⁺ + SO₄²⁻',
    explanation: 'Sterk tvíprótónsýra - gefur 2 H⁺',
    explanationEn: 'Strong diprotic acid - yields 2 H⁺',
    explanationPl: 'Mocny kwas dwuprotonowy - daje 2 H⁺',
    emoji: '⚗️',
  },
  {
    id: 'hbr',
    formula: 'HBr',
    name: 'Vetnisbrómíð',
    nameEn: 'Hydrobromic acid',
    namePl: 'Kwas bromowodorowy',
    type: 'strong',
    category: 'acid',
    dissociationEquation: 'HBr → H⁺ + Br⁻',
    explanation: 'Sterk sýra - 100% sundurgreining',
    explanationEn: 'Strong acid - 100% dissociation',
    explanationPl: 'Mocny kwas - 100% dysocjacji',
    emoji: '⚗️',
  },
  {
    id: 'hi',
    formula: 'HI',
    name: 'Vetnisjóðíð',
    nameEn: 'Hydroiodic acid',
    namePl: 'Kwas jodowodorowy',
    type: 'strong',
    category: 'acid',
    dissociationEquation: 'HI → H⁺ + I⁻',
    explanation: 'Sterk sýra eins og önnur vetnishalógeníð',
    explanationEn: 'Strong acid like other hydrogen halides',
    explanationPl: 'Mocny kwas jak inne halogenowodory',
    emoji: '⚗️',
  },
  {
    id: 'hclo4',
    formula: 'HClO₄',
    name: 'Perklórsýra',
    nameEn: 'Perchloric acid',
    namePl: 'Kwas nadchlorowy',
    type: 'strong',
    category: 'acid',
    dissociationEquation: 'HClO₄ → H⁺ + ClO₄⁻',
    explanation: 'Ein sterkasta sýran - fullkomin sundurgreining',
    explanationEn: 'One of the strongest acids - complete dissociation',
    explanationPl: 'Jeden z najmocniejszych kwasów - całkowita dysocjacja',
    emoji: '⚗️',
  },
  // Strong Bases
  {
    id: 'naoh',
    formula: 'NaOH',
    name: 'Natríumhýdroxíð',
    nameEn: 'Sodium hydroxide',
    namePl: 'Wodorotlenek sodu',
    type: 'strong',
    category: 'base',
    dissociationEquation: 'NaOH → Na⁺ + OH⁻',
    explanation: 'Sterk basa - sundurgreinist algjörlega',
    explanationEn: 'Strong base - completely dissociates',
    explanationPl: 'Mocna zasada - całkowicie dysocjuje',
    emoji: '🧴',
  },
  {
    id: 'koh',
    formula: 'KOH',
    name: 'Kalíumhýdroxíð',
    nameEn: 'Potassium hydroxide',
    namePl: 'Wodorotlenek potasu',
    type: 'strong',
    category: 'base',
    dissociationEquation: 'KOH → K⁺ + OH⁻',
    explanation: 'Sterk basa - leiðir straum vel',
    explanationEn: 'Strong base - conducts electricity well',
    explanationPl: 'Mocna zasada - dobrze przewodzi prąd',
    emoji: '🧴',
  },
  {
    id: 'caoh2',
    formula: 'Ca(OH)₂',
    name: 'Kalsíumhýdroxíð',
    nameEn: 'Calcium hydroxide',
    namePl: 'Wodorotlenek wapnia',
    type: 'strong',
    category: 'base',
    dissociationEquation: 'Ca(OH)₂ → Ca²⁺ + 2OH⁻',
    explanation: 'Sterk basa - gefur 2 OH⁻ jónir',
    explanationEn: 'Strong base - yields 2 OH⁻ ions',
    explanationPl: 'Mocna zasada - daje 2 jony OH⁻',
    emoji: '🧴',
  },
  {
    id: 'baoh2',
    formula: 'Ba(OH)₂',
    name: 'Baríumhýdroxíð',
    nameEn: 'Barium hydroxide',
    namePl: 'Wodorotlenek baru',
    type: 'strong',
    category: 'base',
    dissociationEquation: 'Ba(OH)₂ → Ba²⁺ + 2OH⁻',
    explanation: 'Sterk basa - tvöfalt OH⁻ styrkur',
    explanationEn: 'Strong base - double OH⁻ concentration',
    explanationPl: 'Mocna zasada - podwójne stężenie OH⁻',
    emoji: '🧴',
  },
  // Soluble Salts
  {
    id: 'nacl',
    formula: 'NaCl',
    name: 'Natríumklóríð',
    nameEn: 'Sodium chloride',
    namePl: 'Chlorek sodu',
    type: 'strong',
    category: 'salt',
    dissociationEquation: 'NaCl → Na⁺ + Cl⁻',
    explanation: 'Leysanlegt salt - jónast fullkomlega',
    explanationEn: 'Soluble salt - completely ionizes',
    explanationPl: 'Rozpuszczalna sól - całkowicie jonizuje',
    emoji: '🧂',
  },
  {
    id: 'kcl',
    formula: 'KCl',
    name: 'Kalíumklóríð',
    nameEn: 'Potassium chloride',
    namePl: 'Chlorek potasu',
    type: 'strong',
    category: 'salt',
    dissociationEquation: 'KCl → K⁺ + Cl⁻',
    explanation: 'Leysanlegt salt - sterkur rafleiðari',
    explanationEn: 'Soluble salt - strong electrolyte',
    explanationPl: 'Rozpuszczalna sól - mocny elektrolit',
    emoji: '🧂',
  },
  {
    id: 'nano3',
    formula: 'NaNO₃',
    name: 'Natríumnítrat',
    nameEn: 'Sodium nitrate',
    namePl: 'Azotan sodu',
    type: 'strong',
    category: 'salt',
    dissociationEquation: 'NaNO₃ → Na⁺ + NO₃⁻',
    explanation: 'Nítröt eru öll leysanleg og sterkir rafleiðarar',
    explanationEn: 'All nitrates are soluble and strong electrolytes',
    explanationPl: 'Wszystkie azotany są rozpuszczalne i mocnymi elektrolitami',
    emoji: '🧂',
  },
];

// Weak Electrolytes - Partial dissociation
export const WEAK_ELECTROLYTES: Electrolyte[] = [
  // Weak Acids
  {
    id: 'ch3cooh',
    formula: 'CH₃COOH',
    name: 'Edikssýra',
    nameEn: 'Acetic acid',
    namePl: 'Kwas octowy',
    type: 'weak',
    category: 'acid',
    dissociationEquation: 'CH₃COOH ⇌ H⁺ + CH₃COO⁻',
    explanation: 'Veik sýra - aðeins ~1% sundurgreinist',
    explanationEn: 'Weak acid - only ~1% dissociates',
    explanationPl: 'Słaby kwas - tylko ~1% dysocjuje',
    emoji: '🍋',
  },
  {
    id: 'hf',
    formula: 'HF',
    name: 'Flúorsýra',
    nameEn: 'Hydrofluoric acid',
    namePl: 'Kwas fluorowodorowy',
    type: 'weak',
    category: 'acid',
    dissociationEquation: 'HF ⇌ H⁺ + F⁻',
    explanation: 'Veik sýra þrátt fyrir að vera halógensýra',
    explanationEn: 'Weak acid despite being a hydrogen halide',
    explanationPl: 'Słaby kwas mimo że jest halogenowodorem',
    emoji: '🍋',
  },
  {
    id: 'h2co3',
    formula: 'H₂CO₃',
    name: 'Kolsýra',
    nameEn: 'Carbonic acid',
    namePl: 'Kwas węglowy',
    type: 'weak',
    category: 'acid',
    dissociationEquation: 'H₂CO₃ ⇌ H⁺ + HCO₃⁻',
    explanation: 'Veik sýra - í gosdrykk og blóði',
    explanationEn: 'Weak acid - in soft drinks and blood',
    explanationPl: 'Słaby kwas - w napojach gazowanych i krwi',
    emoji: '🍋',
  },
  {
    id: 'h3po4',
    formula: 'H₃PO₄',
    name: 'Fosfórsýra',
    nameEn: 'Phosphoric acid',
    namePl: 'Kwas fosforowy',
    type: 'weak',
    category: 'acid',
    dissociationEquation: 'H₃PO₄ ⇌ H⁺ + H₂PO₄⁻',
    explanation: 'Veik þríprótónsýra - í kóladrykkjum',
    explanationEn: 'Weak triprotic acid - in cola drinks',
    explanationPl: 'Słaby kwas trójprotonowy - w napojach cola',
    emoji: '🍋',
  },
  {
    id: 'hcn',
    formula: 'HCN',
    name: 'Bláttósýra',
    nameEn: 'Hydrocyanic acid',
    namePl: 'Kwas cyjanowodorowy',
    type: 'weak',
    category: 'acid',
    dissociationEquation: 'HCN ⇌ H⁺ + CN⁻',
    explanation: 'Mjög veik sýra - litla sundurgreiningu',
    explanationEn: 'Very weak acid - minimal dissociation',
    explanationPl: 'Bardzo słaby kwas - minimalna dysocjacja',
    emoji: '🍋',
  },
  // Weak Bases
  {
    id: 'nh3',
    formula: 'NH₃',
    name: 'Ammoníak',
    nameEn: 'Ammonia',
    namePl: 'Amoniak',
    type: 'weak',
    category: 'base',
    dissociationEquation: 'NH₃ + H₂O ⇌ NH₄⁺ + OH⁻',
    explanation: 'Veik basa - tekur við H⁺ frá vatni',
    explanationEn: 'Weak base - accepts H⁺ from water',
    explanationPl: 'Słaba zasada - przyjmuje H⁺ od wody',
    emoji: '💨',
  },
  {
    id: 'ch3nh2',
    formula: 'CH₃NH₂',
    name: 'Metylamín',
    nameEn: 'Methylamine',
    namePl: 'Metyloamina',
    type: 'weak',
    category: 'base',
    dissociationEquation: 'CH₃NH₂ + H₂O ⇌ CH₃NH₃⁺ + OH⁻',
    explanation: 'Veik lífræn basa - amín',
    explanationEn: 'Weak organic base - an amine',
    explanationPl: 'Słaba zasada organiczna - amina',
    emoji: '💨',
  },
];

// Non-Electrolytes - No dissociation
export const NON_ELECTROLYTES: Electrolyte[] = [
  {
    id: 'c6h12o6',
    formula: 'C₆H₁₂O₆',
    name: 'Glúkósi',
    nameEn: 'Glucose',
    namePl: 'Glukoza',
    type: 'non',
    category: 'molecular',
    explanation: 'Sameindalegt efni - engin jónmyndun',
    explanationEn: 'Molecular compound - no ion formation',
    explanationPl: 'Związek molekularny - brak jonów',
    emoji: '🍬',
  },
  {
    id: 'c2h5oh',
    formula: 'C₂H₅OH',
    name: 'Etanól',
    nameEn: 'Ethanol',
    namePl: 'Etanol',
    type: 'non',
    category: 'molecular',
    explanation: 'Áfengi - sameindir haldast saman',
    explanationEn: 'Alcohol - molecules stay intact',
    explanationPl: 'Alkohol - cząsteczki pozostają nienaruszone',
    emoji: '🍷',
  },
  {
    id: 'c12h22o11',
    formula: 'C₁₂H₂₂O₁₁',
    name: 'Súkrósi',
    nameEn: 'Sucrose',
    namePl: 'Sacharoza',
    type: 'non',
    category: 'molecular',
    explanation: 'Borðsykur - sameindalegt efni',
    explanationEn: 'Table sugar - molecular compound',
    explanationPl: 'Cukier stołowy - związek molekularny',
    emoji: '🍬',
  },
  {
    id: 'co2',
    formula: 'CO₂',
    name: 'Koltvísýringur',
    nameEn: 'Carbon dioxide',
    namePl: 'Dwutlenek węgla',
    type: 'non',
    category: 'molecular',
    explanation: 'Óskautaður gas - leysist sem sameindir',
    explanationEn: 'Nonpolar gas - dissolves as molecules',
    explanationPl: 'Gaz niepolarny - rozpuszcza się jako cząsteczki',
    emoji: '💨',
  },
  {
    id: 'ch4',
    formula: 'CH₄',
    name: 'Metan',
    nameEn: 'Methane',
    namePl: 'Metan',
    type: 'non',
    category: 'molecular',
    explanation: 'Óskautað vetniskolefni - engir jónar',
    explanationEn: 'Nonpolar hydrocarbon - no ions',
    explanationPl: 'Niepolarny węglowodór - brak jonów',
    emoji: '💨',
  },
  {
    id: 'h2o',
    formula: 'H₂O',
    name: 'Vatn',
    nameEn: 'Water',
    namePl: 'Woda',
    type: 'non',
    category: 'molecular',
    explanation: 'Hreint vatn leiðir nánast ekki straum',
    explanationEn: 'Pure water barely conducts electricity',
    explanationPl: 'Czysta woda prawie nie przewodzi prądu',
    emoji: '💧',
  },
  {
    id: 'c3h8o3',
    formula: 'C₃H₈O₃',
    name: 'Glýseról',
    nameEn: 'Glycerol',
    namePl: 'Glicerol',
    type: 'non',
    category: 'molecular',
    explanation: 'Sameindalegt vökvi - í húðvörum',
    explanationEn: 'Molecular liquid - in skin products',
    explanationPl: 'Ciecz molekularna - w kosmetykach',
    emoji: '🧴',
  },
];

// Combined list for easy access
export const ALL_ELECTROLYTES: Electrolyte[] = [
  ...STRONG_ELECTROLYTES,
  ...WEAK_ELECTROLYTES,
  ...NON_ELECTROLYTES,
];

// Get a shuffled subset for the game
export function getElectrolytesForGame(count: number = 15): Electrolyte[] {
  const shuffled = [...ALL_ELECTROLYTES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, ALL_ELECTROLYTES.length));
}

// Get electrolytes by type
export function getElectrolytesByType(type: ElectrolyteType): Electrolyte[] {
  return ALL_ELECTROLYTES.filter(e => e.type === type);
}

// Conductivity level based on electrolyte type
export function getConductivityLevel(type: ElectrolyteType): 'bright' | 'dim' | 'off' {
  switch (type) {
    case 'strong':
      return 'bright';
    case 'weak':
      return 'dim';
    case 'non':
      return 'off';
  }
}
