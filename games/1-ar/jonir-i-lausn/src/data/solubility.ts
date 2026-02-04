// Solubility rules and compound data for Level 2
// Based on Brown Chemistry Ch. 4.2 solubility guidelines

export interface SolubilityRule {
  id: string;
  rule: string;
  ruleEn: string;
  exceptions: string;
  exceptionsEn: string;
  result: 'soluble' | 'insoluble';
}

export interface IonicCompound {
  id: string;
  name: string;
  nameEn: string;
  formula: string;
  cation: string;
  anion: string;
  soluble: boolean;
  ruleId: string;
  explanation: string;
  explanationEn: string;
}

// Solubility rules reference
export const SOLUBILITY_RULES: SolubilityRule[] = [
  {
    id: 'rule1',
    rule: 'Flest nítröt (NO₃⁻) eru leysanleg.',
    ruleEn: 'Most nitrates (NO₃⁻) are soluble.',
    exceptions: 'Engar mikilvægar undantekningar.',
    exceptionsEn: 'No important exceptions.',
    result: 'soluble',
  },
  {
    id: 'rule2',
    rule: 'Flest sölt með Na⁺, K⁺ og NH₄⁺ eru leysanleg.',
    ruleEn: 'Most salts with Na⁺, K⁺, and NH₄⁺ are soluble.',
    exceptions: 'Engar mikilvægar undantekningar.',
    exceptionsEn: 'No important exceptions.',
    result: 'soluble',
  },
  {
    id: 'rule3',
    rule: 'Flest klóríð (Cl⁻), brómíð (Br⁻) og jódíð (I⁻) eru leysanleg.',
    ruleEn: 'Most chlorides (Cl⁻), bromides (Br⁻), and iodides (I⁻) are soluble.',
    exceptions: 'Nema: Ag⁺, Pb²⁺, Hg₂²⁺',
    exceptionsEn: 'Except: Ag⁺, Pb²⁺, Hg₂²⁺',
    result: 'soluble',
  },
  {
    id: 'rule4',
    rule: 'Flest súlföt (SO₄²⁻) eru leysanleg.',
    ruleEn: 'Most sulfates (SO₄²⁻) are soluble.',
    exceptions: 'Nema: Ba²⁺, Pb²⁺, Ca²⁺, Sr²⁺',
    exceptionsEn: 'Except: Ba²⁺, Pb²⁺, Ca²⁺, Sr²⁺',
    result: 'soluble',
  },
  {
    id: 'rule5',
    rule: 'Flest hýdroxíð (OH⁻) eru óleysanleg.',
    ruleEn: 'Most hydroxides (OH⁻) are insoluble.',
    exceptions: 'Nema: Na⁺, K⁺, Ba²⁺, Ca²⁺ (lítið leysanlegt)',
    exceptionsEn: 'Except: Na⁺, K⁺, Ba²⁺, Ca²⁺ (slightly soluble)',
    result: 'insoluble',
  },
  {
    id: 'rule6',
    rule: 'Flest súlfíð (S²⁻), karbónöt (CO₃²⁻) og fosföt (PO₄³⁻) eru óleysanleg.',
    ruleEn: 'Most sulfides (S²⁻), carbonates (CO₃²⁻), and phosphates (PO₄³⁻) are insoluble.',
    exceptions: 'Nema sölt með Na⁺, K⁺ og NH₄⁺',
    exceptionsEn: 'Except salts with Na⁺, K⁺, and NH₄⁺',
    result: 'insoluble',
  },
];

// Ionic compounds for classification
export const IONIC_COMPOUNDS: IonicCompound[] = [
  // Soluble compounds
  {
    id: 'nano3',
    name: 'Natríumnítrat',
    nameEn: 'Sodium nitrate',
    formula: 'NaNO₃',
    cation: 'Na⁺',
    anion: 'NO₃⁻',
    soluble: true,
    ruleId: 'rule1',
    explanation: 'Flest nítröt eru leysanleg, og Na⁺ sölt eru alltaf leysanleg.',
    explanationEn: 'Most nitrates are soluble, and Na⁺ salts are always soluble.',
  },
  {
    id: 'kcl',
    name: 'Kalíumklóríð',
    nameEn: 'Potassium chloride',
    formula: 'KCl',
    cation: 'K⁺',
    anion: 'Cl⁻',
    soluble: true,
    ruleId: 'rule2',
    explanation: 'K⁺ sölt eru alltaf leysanleg, og flest klóríð eru leysanleg.',
    explanationEn: 'K⁺ salts are always soluble, and most chlorides are soluble.',
  },
  {
    id: 'nh4cl',
    name: 'Ammóníumklóríð',
    nameEn: 'Ammonium chloride',
    formula: 'NH₄Cl',
    cation: 'NH₄⁺',
    anion: 'Cl⁻',
    soluble: true,
    ruleId: 'rule2',
    explanation: 'NH₄⁺ sölt eru alltaf leysanleg.',
    explanationEn: 'NH₄⁺ salts are always soluble.',
  },
  {
    id: 'cacl2',
    name: 'Kalsíumklóríð',
    nameEn: 'Calcium chloride',
    formula: 'CaCl₂',
    cation: 'Ca²⁺',
    anion: 'Cl⁻',
    soluble: true,
    ruleId: 'rule3',
    explanation: 'Flest klóríð eru leysanleg. Ca²⁺ er ekki undantekning.',
    explanationEn: 'Most chlorides are soluble. Ca²⁺ is not an exception.',
  },
  {
    id: 'na2so4',
    name: 'Natríumsúlfat',
    nameEn: 'Sodium sulfate',
    formula: 'Na₂SO₄',
    cation: 'Na⁺',
    anion: 'SO₄²⁻',
    soluble: true,
    ruleId: 'rule4',
    explanation: 'Na⁺ sölt eru alltaf leysanleg, og flest súlföt eru leysanleg.',
    explanationEn: 'Na⁺ salts are always soluble, and most sulfates are soluble.',
  },
  {
    id: 'na2co3',
    name: 'Natríumkarbónat',
    nameEn: 'Sodium carbonate',
    formula: 'Na₂CO₃',
    cation: 'Na⁺',
    anion: 'CO₃²⁻',
    soluble: true,
    ruleId: 'rule2',
    explanation: 'Na⁺ sölt eru alltaf leysanleg, jafnvel karbónöt.',
    explanationEn: 'Na⁺ salts are always soluble, even carbonates.',
  },
  {
    id: 'k3po4',
    name: 'Kalíumfosfat',
    nameEn: 'Potassium phosphate',
    formula: 'K₃PO₄',
    cation: 'K⁺',
    anion: 'PO₄³⁻',
    soluble: true,
    ruleId: 'rule2',
    explanation: 'K⁺ sölt eru alltaf leysanleg, jafnvel fosföt.',
    explanationEn: 'K⁺ salts are always soluble, even phosphates.',
  },
  {
    id: 'fecl3',
    name: 'Járnklóríð(III)',
    nameEn: 'Iron(III) chloride',
    formula: 'FeCl₃',
    cation: 'Fe³⁺',
    anion: 'Cl⁻',
    soluble: true,
    ruleId: 'rule3',
    explanation: 'Flest klóríð eru leysanleg. Fe³⁺ er ekki undantekning.',
    explanationEn: 'Most chlorides are soluble. Fe³⁺ is not an exception.',
  },
  // Insoluble compounds
  {
    id: 'agcl',
    name: 'Silfurklóríð',
    nameEn: 'Silver chloride',
    formula: 'AgCl',
    cation: 'Ag⁺',
    anion: 'Cl⁻',
    soluble: false,
    ruleId: 'rule3',
    explanation: 'Klóríð með Ag⁺ eru óleysanleg (undantekning frá klóríðreglunni).',
    explanationEn: 'Chlorides with Ag⁺ are insoluble (exception to the chloride rule).',
  },
  {
    id: 'pbcl2',
    name: 'Blýklóríð',
    nameEn: 'Lead(II) chloride',
    formula: 'PbCl₂',
    cation: 'Pb²⁺',
    anion: 'Cl⁻',
    soluble: false,
    ruleId: 'rule3',
    explanation: 'Klóríð með Pb²⁺ eru óleysanleg (undantekning frá klóríðreglunni).',
    explanationEn: 'Chlorides with Pb²⁺ are insoluble (exception to the chloride rule).',
  },
  {
    id: 'baso4',
    name: 'Baríumsúlfat',
    nameEn: 'Barium sulfate',
    formula: 'BaSO₄',
    cation: 'Ba²⁺',
    anion: 'SO₄²⁻',
    soluble: false,
    ruleId: 'rule4',
    explanation: 'Súlföt með Ba²⁺ eru óleysanleg (undantekning frá súlfatreglunni).',
    explanationEn: 'Sulfates with Ba²⁺ are insoluble (exception to the sulfate rule).',
  },
  {
    id: 'feoh3',
    name: 'Járnhýdroxíð(III)',
    nameEn: 'Iron(III) hydroxide',
    formula: 'Fe(OH)₃',
    cation: 'Fe³⁺',
    anion: 'OH⁻',
    soluble: false,
    ruleId: 'rule5',
    explanation: 'Flest hýdroxíð eru óleysanleg. Fe³⁺ er ekki undantekning.',
    explanationEn: 'Most hydroxides are insoluble. Fe³⁺ is not an exception.',
  },
  {
    id: 'caco3',
    name: 'Kalsíumkarbónat',
    nameEn: 'Calcium carbonate',
    formula: 'CaCO₃',
    cation: 'Ca²⁺',
    anion: 'CO₃²⁻',
    soluble: false,
    ruleId: 'rule6',
    explanation: 'Flest karbónöt eru óleysanleg. Ca²⁺ er ekki undantekning.',
    explanationEn: 'Most carbonates are insoluble. Ca²⁺ is not an exception.',
  },
  {
    id: 'ag2s',
    name: 'Silfursúlfíð',
    nameEn: 'Silver sulfide',
    formula: 'Ag₂S',
    cation: 'Ag⁺',
    anion: 'S²⁻',
    soluble: false,
    ruleId: 'rule6',
    explanation: 'Flest súlfíð eru óleysanleg.',
    explanationEn: 'Most sulfides are insoluble.',
  },
  {
    id: 'ca3po42',
    name: 'Kalsíumfosfat',
    nameEn: 'Calcium phosphate',
    formula: 'Ca₃(PO₄)₂',
    cation: 'Ca²⁺',
    anion: 'PO₄³⁻',
    soluble: false,
    ruleId: 'rule6',
    explanation: 'Flest fosföt eru óleysanleg. Ca²⁺ er ekki undantekning.',
    explanationEn: 'Most phosphates are insoluble. Ca²⁺ is not an exception.',
  },
];
