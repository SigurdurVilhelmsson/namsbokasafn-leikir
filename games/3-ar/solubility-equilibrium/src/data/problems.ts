/**
 * Problem Sets for Ksp/Solubility Equilibrium Game
 */

import type { Level1Challenge, Level2Problem, Level3Problem } from '../types';
import { getCompoundByFormula } from './compounds';

// Helper to get compound or throw
const getCompound = (formula: string) => {
  const compound = getCompoundByFormula(formula);
  if (!compound) throw new Error(`Compound ${formula} not found`);
  return compound;
};

/**
 * Level 1 Challenges: Write Ksp expressions and compare solubility
 */
export const level1Challenges: Level1Challenge[] = [
  // Write Ksp expression challenges
  {
    id: 1,
    compound: getCompound('AgCl'),
    type: 'write_ksp',
    questionIs: 'Skrifaðu Ksp tjáningu fyrir silfurklóríð (AgCl).',
    question: 'Write the Ksp expression for silver chloride (AgCl).',
    correctExpression: 'Ksp = [Ag+][Cl-]',
    explanation:
      'AgCl dissolves as: AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq). The Ksp expression includes only the aqueous ions raised to their stoichiometric coefficients.',
    explanationIs:
      'AgCl leysist sem: AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq). Ksp tjáningin inniheldur aðeins vatnslausnajónir hækkaðar til stefnumetris stuðla.',
  },
  {
    id: 2,
    compound: getCompound('PbCl2'),
    type: 'write_ksp',
    questionIs: 'Skrifaðu Ksp tjáningu fyrir blýklóríð (PbCl₂).',
    question: 'Write the Ksp expression for lead(II) chloride (PbCl₂).',
    correctExpression: 'Ksp = [Pb2+][Cl-]²',
    explanation:
      'PbCl₂ dissolves as: PbCl₂(s) ⇌ Pb²⁺(aq) + 2Cl⁻(aq). The [Cl⁻] is squared because there are 2 chloride ions per formula unit.',
    explanationIs:
      'PbCl₂ leysist sem: PbCl₂(s) ⇌ Pb²⁺(aq) + 2Cl⁻(aq). [Cl⁻] er í öðru veldi vegna þess að það eru 2 klóríð jónir í hverri formúlu.',
  },
  {
    id: 3,
    compound: getCompound('CaF2'),
    type: 'write_ksp',
    questionIs: 'Skrifaðu Ksp tjáningu fyrir kalsíumflúoríð (CaF₂).',
    question: 'Write the Ksp expression for calcium fluoride (CaF₂).',
    correctExpression: 'Ksp = [Ca2+][F-]²',
    explanation:
      'CaF₂ dissolves as: CaF₂(s) ⇌ Ca²⁺(aq) + 2F⁻(aq). The fluoride concentration is squared.',
    explanationIs:
      'CaF₂ leysist sem: CaF₂(s) ⇌ Ca²⁺(aq) + 2F⁻(aq). Flúoríð styrkurinn er í öðru veldi.',
  },
  {
    id: 4,
    compound: getCompound('Fe(OH)3'),
    type: 'write_ksp',
    questionIs: 'Skrifaðu Ksp tjáningu fyrir járn(III)hýdroxíð (Fe(OH)₃).',
    question: 'Write the Ksp expression for iron(III) hydroxide (Fe(OH)₃).',
    correctExpression: 'Ksp = [Fe3+][OH-]³',
    explanation:
      'Fe(OH)₃ dissolves as: Fe(OH)₃(s) ⇌ Fe³⁺(aq) + 3OH⁻(aq). The hydroxide concentration is cubed.',
    explanationIs:
      'Fe(OH)₃ leysist sem: Fe(OH)₃(s) ⇌ Fe³⁺(aq) + 3OH⁻(aq). Hýdroxíð styrkurinn er í þriðja veldi.',
  },
  {
    id: 5,
    compound: getCompound('BaSO4'),
    type: 'write_ksp',
    questionIs: 'Skrifaðu Ksp tjáningu fyrir baríumsúlfat (BaSO₄).',
    question: 'Write the Ksp expression for barium sulfate (BaSO₄).',
    correctExpression: 'Ksp = [Ba2+][SO4 2-]',
    explanation:
      'BaSO₄ dissolves as: BaSO₄(s) ⇌ Ba²⁺(aq) + SO₄²⁻(aq). Both ions have coefficient 1.',
    explanationIs:
      'BaSO₄ leysist sem: BaSO₄(s) ⇌ Ba²⁺(aq) + SO₄²⁻(aq). Báðar jónir hafa stuðul 1.',
  },

  // Compare solubility challenges
  {
    id: 6,
    compound: getCompound('AgCl'),
    type: 'compare_solubility',
    questionIs: 'Raðaðu þessum efnasamböndum eftir leysni (lægsta fyrst):',
    question: 'Rank these compounds by solubility (least soluble first):',
    compoundsToCompare: [getCompound('AgCl'), getCompound('AgBr'), getCompound('AgI')],
    correctOrder: ['AgI', 'AgBr', 'AgCl'],
    explanation:
      'For compounds with the same stoichiometry, lower Ksp means lower solubility. AgI (8.52×10⁻¹⁷) < AgBr (5.35×10⁻¹³) < AgCl (1.77×10⁻¹⁰)',
    explanationIs:
      'Fyrir efnasambönd með sama stefnumetri, lægra Ksp þýðir lægri leysni. AgI (8.52×10⁻¹⁷) < AgBr (5.35×10⁻¹³) < AgCl (1.77×10⁻¹⁰)',
  },
  {
    id: 7,
    compound: getCompound('CaSO4'),
    type: 'compare_solubility',
    questionIs: 'Raðaðu þessum efnasamböndum eftir leysni (mest leysanlegt fyrst):',
    question: 'Rank these compounds by solubility (most soluble first):',
    compoundsToCompare: [getCompound('BaSO4'), getCompound('CaSO4'), getCompound('PbSO4')],
    correctOrder: ['CaSO4', 'PbSO4', 'BaSO4'],
    explanation:
      'CaSO₄ (Ksp = 4.93×10⁻⁵) is most soluble, followed by PbSO₄ (2.53×10⁻⁸), then BaSO₄ (1.08×10⁻¹⁰).',
    explanationIs:
      'CaSO₄ (Ksp = 4.93×10⁻⁵) er mest leysanlegt, þá PbSO₄ (2.53×10⁻⁸), svo BaSO₄ (1.08×10⁻¹⁰).',
  },
  {
    id: 8,
    compound: getCompound('Mg(OH)2'),
    type: 'compare_solubility',
    questionIs:
      'Hvaða hýdroxíð er mest leysanlegt: Mg(OH)₂, Fe(OH)₂, eða Cu(OH)₂?',
    question: 'Which hydroxide is most soluble: Mg(OH)₂, Fe(OH)₂, or Cu(OH)₂?',
    compoundsToCompare: [getCompound('Mg(OH)2'), getCompound('Fe(OH)2'), getCompound('Cu(OH)2')],
    correctOrder: ['Cu(OH)2', 'Fe(OH)2', 'Mg(OH)2'].reverse(),
    explanation:
      'Mg(OH)₂ (Ksp = 5.61×10⁻¹²) > Fe(OH)₂ (4.87×10⁻¹⁷) > Cu(OH)₂ (2.2×10⁻²⁰). Mg(OH)₂ is most soluble.',
    explanationIs:
      'Mg(OH)₂ (Ksp = 5.61×10⁻¹²) > Fe(OH)₂ (4.87×10⁻¹⁷) > Cu(OH)₂ (2.2×10⁻²⁰). Mg(OH)₂ er mest leysanlegt.',
  },
];

/**
 * Level 2 Problems: Calculate solubility and Ksp
 */
export const level2Problems: Level2Problem[] = [
  // Basic solubility calculations (AB type)
  {
    id: 1,
    compound: getCompound('AgCl'),
    type: 'calculate_solubility',
    difficulty: 'basic',
    questionIs:
      'Reiknaðu mólleysni silfurklóríðs (AgCl) í hreinu vatni. Ksp = 1.77×10⁻¹⁰',
    question: 'Calculate the molar solubility of silver chloride (AgCl) in pure water. Ksp = 1.77×10⁻¹⁰',
    givenData: {
      Ksp: 1.77e-10,
    },
    answer: 1.33e-5,
    answerUnit: 'M',
    tolerance: 0.05,
    steps: [
      'Write dissolution: AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq)',
      'Let s = molar solubility',
      'At equilibrium: [Ag⁺] = s, [Cl⁻] = s',
      'Ksp = [Ag⁺][Cl⁻] = s²',
      's = √(Ksp) = √(1.77×10⁻¹⁰) = 1.33×10⁻⁵ M',
    ],
    stepsIs: [
      'Skrifa upplausn: AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq)',
      'Látum s = mólleysni',
      'Við jafnvægi: [Ag⁺] = s, [Cl⁻] = s',
      'Ksp = [Ag⁺][Cl⁻] = s²',
      's = √(Ksp) = √(1.77×10⁻¹⁰) = 1.33×10⁻⁵ M',
    ],
    hints: {
      topic: 'Þetta er Ksp/leysni vandamál þar sem mólleysni er reiknuð.',
      strategy:
        'Settu upp jöfnuna fyrir leysni og notaðu Ksp til að finna mólleysni.',
      method: 'Fyrir AB efnasambönd: s = √(Ksp)',
      solution: 's = √(1.77×10⁻¹⁰) = 1.33×10⁻⁵ M',
    },
  },
  {
    id: 2,
    compound: getCompound('BaSO4'),
    type: 'calculate_solubility',
    difficulty: 'basic',
    questionIs:
      'Reiknaðu mólleysni baríumsúlfats (BaSO₄) í hreinu vatni. Ksp = 1.08×10⁻¹⁰',
    question: 'Calculate the molar solubility of barium sulfate (BaSO₄) in pure water. Ksp = 1.08×10⁻¹⁰',
    givenData: {
      Ksp: 1.08e-10,
    },
    answer: 1.04e-5,
    answerUnit: 'M',
    tolerance: 0.05,
    steps: [
      'Write dissolution: BaSO₄(s) ⇌ Ba²⁺(aq) + SO₄²⁻(aq)',
      'Let s = molar solubility',
      '[Ba²⁺] = s, [SO₄²⁻] = s',
      'Ksp = s² = 1.08×10⁻¹⁰',
      's = √(1.08×10⁻¹⁰) = 1.04×10⁻⁵ M',
    ],
    stepsIs: [
      'Skrifa upplausn: BaSO₄(s) ⇌ Ba²⁺(aq) + SO₄²⁻(aq)',
      'Látum s = mólleysni',
      '[Ba²⁺] = s, [SO₄²⁻] = s',
      'Ksp = s² = 1.08×10⁻¹⁰',
      's = √(1.08×10⁻¹⁰) = 1.04×10⁻⁵ M',
    ],
    hints: {
      topic: 'Þetta er AB tegund efnasamband (1:1 hlutfall).',
      strategy: 'Báðar jónir hafa stuðul 1, svo Ksp = s².',
      method: 's = √(Ksp)',
      solution: 's = √(1.08×10⁻¹⁰) = 1.04×10⁻⁵ M',
    },
  },

  // With stoichiometry (AB2 type)
  {
    id: 3,
    compound: getCompound('PbCl2'),
    type: 'calculate_solubility',
    difficulty: 'with_stoichiometry',
    questionIs:
      'Reiknaðu mólleysni blýklóríðs (PbCl₂) í hreinu vatni. Ksp = 1.70×10⁻⁵',
    question: 'Calculate the molar solubility of lead(II) chloride (PbCl₂) in pure water. Ksp = 1.70×10⁻⁵',
    givenData: {
      Ksp: 1.7e-5,
    },
    answer: 1.62e-2,
    answerUnit: 'M',
    tolerance: 0.05,
    steps: [
      'Write dissolution: PbCl₂(s) ⇌ Pb²⁺(aq) + 2Cl⁻(aq)',
      'Let s = molar solubility',
      '[Pb²⁺] = s, [Cl⁻] = 2s',
      'Ksp = [Pb²⁺][Cl⁻]² = (s)(2s)² = 4s³',
      's = ∛(Ksp/4) = ∛(1.70×10⁻⁵/4) = 1.62×10⁻² M',
    ],
    stepsIs: [
      'Skrifa upplausn: PbCl₂(s) ⇌ Pb²⁺(aq) + 2Cl⁻(aq)',
      'Látum s = mólleysni',
      '[Pb²⁺] = s, [Cl⁻] = 2s',
      'Ksp = [Pb²⁺][Cl⁻]² = (s)(2s)² = 4s³',
      's = ∛(Ksp/4) = ∛(1.70×10⁻⁵/4) = 1.62×10⁻² M',
    ],
    hints: {
      topic: 'Þetta er AB₂ tegund efnasamband.',
      strategy:
        'Ef 1 mól leysist gefur það 1 mól Pb²⁺ og 2 mól Cl⁻.',
      method: 'Ksp = (s)(2s)² = 4s³, svo s = ∛(Ksp/4)',
      solution: 's = ∛(1.70×10⁻⁵/4) = 1.62×10⁻² M',
    },
  },
  {
    id: 4,
    compound: getCompound('CaF2'),
    type: 'calculate_solubility',
    difficulty: 'with_stoichiometry',
    questionIs:
      'Reiknaðu mólleysni kalsíumflúoríðs (CaF₂). Ksp = 3.45×10⁻¹¹',
    question: 'Calculate the molar solubility of calcium fluoride (CaF₂). Ksp = 3.45×10⁻¹¹',
    givenData: {
      Ksp: 3.45e-11,
    },
    answer: 2.05e-4,
    answerUnit: 'M',
    tolerance: 0.05,
    steps: [
      'CaF₂(s) ⇌ Ca²⁺(aq) + 2F⁻(aq)',
      '[Ca²⁺] = s, [F⁻] = 2s',
      'Ksp = (s)(2s)² = 4s³',
      's = ∛(3.45×10⁻¹¹/4) = 2.05×10⁻⁴ M',
    ],
    stepsIs: [
      'CaF₂(s) ⇌ Ca²⁺(aq) + 2F⁻(aq)',
      '[Ca²⁺] = s, [F⁻] = 2s',
      'Ksp = (s)(2s)² = 4s³',
      's = ∛(3.45×10⁻¹¹/4) = 2.05×10⁻⁴ M',
    ],
    hints: {
      topic: 'CaF₂ er AB₂ tegund.',
      strategy: 'Notaðu sömu aðferð og fyrir PbCl₂.',
      method: 's = ∛(Ksp/4)',
      solution: 's = ∛(3.45×10⁻¹¹/4) = 2.05×10⁻⁴ M',
    },
  },

  // Calculate Ksp from solubility
  {
    id: 5,
    compound: getCompound('PbI2'),
    type: 'calculate_ksp',
    difficulty: 'with_stoichiometry',
    questionIs:
      'Mólleysni PbI₂ er 1.3×10⁻³ M. Reiknaðu Ksp.',
    question: 'The molar solubility of PbI₂ is 1.3×10⁻³ M. Calculate Ksp.',
    givenData: {
      solubility: 1.3e-3,
      solubilityUnit: 'mol/L',
    },
    answer: 8.8e-9,
    answerUnit: '',
    tolerance: 0.1,
    steps: [
      'PbI₂(s) ⇌ Pb²⁺(aq) + 2I⁻(aq)',
      's = 1.3×10⁻³ M',
      '[Pb²⁺] = s = 1.3×10⁻³ M',
      '[I⁻] = 2s = 2.6×10⁻³ M',
      'Ksp = [Pb²⁺][I⁻]² = (1.3×10⁻³)(2.6×10⁻³)² = 8.8×10⁻⁹',
    ],
    stepsIs: [
      'PbI₂(s) ⇌ Pb²⁺(aq) + 2I⁻(aq)',
      's = 1.3×10⁻³ M',
      '[Pb²⁺] = s = 1.3×10⁻³ M',
      '[I⁻] = 2s = 2.6×10⁻³ M',
      'Ksp = [Pb²⁺][I⁻]² = (1.3×10⁻³)(2.6×10⁻³)² = 8.8×10⁻⁹',
    ],
    hints: {
      topic: 'Þetta er öfugt vandamál - reikna Ksp frá leysni.',
      strategy: 'Finndu styrkinn á hverri jón út frá s.',
      method: 'Ksp = (s)(2s)² = 4s³',
      solution: 'Ksp = 4(1.3×10⁻³)³ = 8.8×10⁻⁹',
    },
  },

  // Common ion effect
  {
    id: 6,
    compound: getCompound('AgCl'),
    type: 'calculate_solubility',
    difficulty: 'common_ion',
    questionIs:
      'Reiknaðu mólleysni AgCl í 0.10 M NaCl lausn. Ksp(AgCl) = 1.77×10⁻¹⁰',
    question: 'Calculate the molar solubility of AgCl in 0.10 M NaCl solution. Ksp(AgCl) = 1.77×10⁻¹⁰',
    givenData: {
      Ksp: 1.77e-10,
      commonIon: {
        ion: 'Cl-',
        concentration: 0.1,
      },
    },
    answer: 1.77e-9,
    answerUnit: 'M',
    tolerance: 0.05,
    steps: [
      'AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq)',
      'Initial [Cl⁻] from NaCl = 0.10 M',
      'Let s = additional [Ag⁺] from AgCl dissolving',
      '[Cl⁻] total ≈ 0.10 M (s << 0.10)',
      'Ksp = [Ag⁺][Cl⁻] = (s)(0.10) = 1.77×10⁻¹⁰',
      's = 1.77×10⁻¹⁰ / 0.10 = 1.77×10⁻⁹ M',
    ],
    stepsIs: [
      'AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq)',
      'Upphafleg [Cl⁻] frá NaCl = 0.10 M',
      'Látum s = viðbótarstyrkur [Ag⁺] frá AgCl upplausn',
      '[Cl⁻] samtals ≈ 0.10 M (s << 0.10)',
      'Ksp = [Ag⁺][Cl⁻] = (s)(0.10) = 1.77×10⁻¹⁰',
      's = 1.77×10⁻¹⁰ / 0.10 = 1.77×10⁻⁹ M',
    ],
    hints: {
      topic: 'Þetta sýnir sameiginlegu jónu áhrifin.',
      strategy:
        'Klóríð jónin er nú þegar til staðar frá NaCl, sem dregur úr leysni AgCl.',
      method: 'Ksp = [Ag⁺][Cl⁻] þar sem [Cl⁻] ≈ 0.10 M',
      solution: 's = Ksp / [Cl⁻] = 1.77×10⁻⁹ M',
    },
  },
  {
    id: 7,
    compound: getCompound('CaF2'),
    type: 'calculate_solubility',
    difficulty: 'common_ion',
    questionIs:
      'Reiknaðu mólleysni CaF₂ í 0.050 M NaF lausn. Ksp = 3.45×10⁻¹¹',
    question: 'Calculate the molar solubility of CaF₂ in 0.050 M NaF solution. Ksp = 3.45×10⁻¹¹',
    givenData: {
      Ksp: 3.45e-11,
      commonIon: {
        ion: 'F-',
        concentration: 0.05,
      },
    },
    answer: 1.38e-8,
    answerUnit: 'M',
    tolerance: 0.1,
    steps: [
      'CaF₂(s) ⇌ Ca²⁺(aq) + 2F⁻(aq)',
      'Initial [F⁻] from NaF = 0.050 M',
      '[F⁻] ≈ 0.050 M (ignoring contribution from CaF₂)',
      'Ksp = [Ca²⁺][F⁻]² = (s)(0.050)²',
      's = Ksp / (0.050)² = 3.45×10⁻¹¹ / 0.0025 = 1.38×10⁻⁸ M',
    ],
    stepsIs: [
      'CaF₂(s) ⇌ Ca²⁺(aq) + 2F⁻(aq)',
      'Upphafleg [F⁻] frá NaF = 0.050 M',
      '[F⁻] ≈ 0.050 M (hunsa framlag frá CaF₂)',
      'Ksp = [Ca²⁺][F⁻]² = (s)(0.050)²',
      's = Ksp / (0.050)² = 3.45×10⁻¹¹ / 0.0025 = 1.38×10⁻⁸ M',
    ],
    hints: {
      topic: 'Sameiginleg jón vandamál með AB₂ efnasambandi.',
      strategy: 'Flúoríð jónin hefur áhrif á leysni CaF₂.',
      method: 'Ksp = s × [F⁻]², þar sem [F⁻] = 0.050 M',
      solution: 's = 3.45×10⁻¹¹ / (0.050)² = 1.38×10⁻⁸ M',
    },
  },
];

/**
 * Level 3 Problems: Precipitation prediction and selective precipitation
 */
export const level3Problems: Level3Problem[] = [
  // Predict precipitate (Q vs Ksp)
  {
    id: 1,
    type: 'predict_precipitate',
    difficulty: 'beginner',
    questionIs:
      'Ef 50.0 mL af 0.0020 M AgNO₃ er blandað við 50.0 mL af 0.0040 M NaCl, myndast botnfall?',
    question:
      'If 50.0 mL of 0.0020 M AgNO₃ is mixed with 50.0 mL of 0.0040 M NaCl, will a precipitate form?',
    compounds: [getCompound('AgCl')],
    mixingData: {
      solution1: {
        ion: 'Ag+',
        concentration: 0.002,
        volume: 50,
      },
      solution2: {
        ion: 'Cl-',
        concentration: 0.004,
        volume: 50,
      },
    },
    willPrecipitate: true,
    Q: 2.0e-6,
    explanation:
      'After mixing: [Ag⁺] = 0.001 M, [Cl⁻] = 0.002 M. Q = (0.001)(0.002) = 2.0×10⁻⁶. Since Q > Ksp (1.77×10⁻¹⁰), AgCl will precipitate.',
    explanationIs:
      'Eftir blöndun: [Ag⁺] = 0.001 M, [Cl⁻] = 0.002 M. Q = (0.001)(0.002) = 2.0×10⁻⁶. Þar sem Q > Ksp (1.77×10⁻¹⁰), mun AgCl fella úr lausn.',
    hints: {
      topic: 'Þetta er Q vs Ksp samanburður til að spá fyrir um botnfall.',
      strategy:
        'Reiknaðu styrk jóna eftir blöndun, svo Q, og berðu saman við Ksp.',
      method:
        '[jón] = (C₁V₁)/(V₁+V₂). Ef Q > Ksp, myndast botnfall.',
      solution: 'Q = 2.0×10⁻⁶ > Ksp = 1.77×10⁻¹⁰, já botnfall myndast.',
    },
  },
  {
    id: 2,
    type: 'predict_precipitate',
    difficulty: 'beginner',
    questionIs:
      'Ef 100.0 mL af 1.0×10⁻⁴ M Ba(NO₃)₂ er blandað við 100.0 mL af 1.0×10⁻⁴ M Na₂SO₄, myndast botnfall?',
    question:
      'If 100.0 mL of 1.0×10⁻⁴ M Ba(NO₃)₂ is mixed with 100.0 mL of 1.0×10⁻⁴ M Na₂SO₄, will a precipitate form?',
    compounds: [getCompound('BaSO4')],
    mixingData: {
      solution1: {
        ion: 'Ba2+',
        concentration: 1.0e-4,
        volume: 100,
      },
      solution2: {
        ion: 'SO4 2-',
        concentration: 1.0e-4,
        volume: 100,
      },
    },
    willPrecipitate: true,
    Q: 2.5e-9,
    explanation:
      'After mixing: [Ba²⁺] = 5.0×10⁻⁵ M, [SO₄²⁻] = 5.0×10⁻⁵ M. Q = 2.5×10⁻⁹ > Ksp (1.08×10⁻¹⁰). BaSO₄ precipitates.',
    explanationIs:
      'Eftir blöndun: [Ba²⁺] = 5.0×10⁻⁵ M, [SO₄²⁻] = 5.0×10⁻⁵ M. Q = 2.5×10⁻⁹ > Ksp (1.08×10⁻¹⁰). BaSO₄ fellur út.',
    hints: {
      topic: 'Spá fyrir um BaSO₄ botnfall.',
      strategy: 'Reiknaðu Q og berðu saman við Ksp.',
      method: 'Q = [Ba²⁺][SO₄²⁻]',
      solution: 'Q = 2.5×10⁻⁹ > Ksp, botnfall myndast.',
    },
  },
  {
    id: 3,
    type: 'predict_precipitate',
    difficulty: 'intermediate',
    questionIs:
      'Ef 25.0 mL af 2.0×10⁻³ M Pb(NO₃)₂ er blandað við 25.0 mL af 1.0×10⁻² M KI, myndast botnfall?',
    question:
      'If 25.0 mL of 2.0×10⁻³ M Pb(NO₃)₂ is mixed with 25.0 mL of 1.0×10⁻² M KI, will a precipitate form?',
    compounds: [getCompound('PbI2')],
    mixingData: {
      solution1: {
        ion: 'Pb2+',
        concentration: 2.0e-3,
        volume: 25,
      },
      solution2: {
        ion: 'I-',
        concentration: 1.0e-2,
        volume: 25,
      },
    },
    willPrecipitate: true,
    Q: 2.5e-8,
    explanation:
      'After mixing: [Pb²⁺] = 1.0×10⁻³ M, [I⁻] = 5.0×10⁻³ M. Q = [Pb²⁺][I⁻]² = (1.0×10⁻³)(5.0×10⁻³)² = 2.5×10⁻⁸ > Ksp (9.8×10⁻⁹). PbI₂ precipitates.',
    explanationIs:
      'Eftir blöndun: [Pb²⁺] = 1.0×10⁻³ M, [I⁻] = 5.0×10⁻³ M. Q = [Pb²⁺][I⁻]² = (1.0×10⁻³)(5.0×10⁻³)² = 2.5×10⁻⁸ > Ksp (9.8×10⁻⁹). PbI₂ fellur út.',
    hints: {
      topic: 'PbI₂ er AB₂ tegund, svo Q = [Pb²⁺][I⁻]².',
      strategy: 'Gleymdu ekki að í veldi fyrir jóðíð.',
      method: 'Q = [Pb²⁺][I⁻]²',
      solution: 'Q = 2.5×10⁻⁸ > Ksp (9.8×10⁻⁹), botnfall.',
    },
  },
  {
    id: 4,
    type: 'predict_precipitate',
    difficulty: 'intermediate',
    questionIs:
      'Myndast botnfall ef 75.0 mL af 1.0×10⁻⁶ M AgNO₃ er blandað við 75.0 mL af 1.0×10⁻⁶ M NaBr?',
    question:
      'Will a precipitate form if 75.0 mL of 1.0×10⁻⁶ M AgNO₃ is mixed with 75.0 mL of 1.0×10⁻⁶ M NaBr?',
    compounds: [getCompound('AgBr')],
    mixingData: {
      solution1: {
        ion: 'Ag+',
        concentration: 1.0e-6,
        volume: 75,
      },
      solution2: {
        ion: 'Br-',
        concentration: 1.0e-6,
        volume: 75,
      },
    },
    willPrecipitate: false,
    Q: 2.5e-13,
    explanation:
      'After mixing: [Ag⁺] = 5.0×10⁻⁷ M, [Br⁻] = 5.0×10⁻⁷ M. Q = 2.5×10⁻¹³ < Ksp (5.35×10⁻¹³). No precipitate forms - solution is unsaturated.',
    explanationIs:
      'Eftir blöndun: [Ag⁺] = 5.0×10⁻⁷ M, [Br⁻] = 5.0×10⁻⁷ M. Q = 2.5×10⁻¹³ < Ksp (5.35×10⁻¹³). Ekkert botnfall myndast - lausnin er ómetta.',
    hints: {
      topic: 'Berðu saman Q og Ksp fyrir AgBr.',
      strategy: 'Ef Q < Ksp, myndast ekkert botnfall.',
      method: 'Q = [Ag⁺][Br⁻]',
      solution: 'Q = 2.5×10⁻¹³ < Ksp (5.35×10⁻¹³), ekkert botnfall.',
    },
  },

  // Selective precipitation
  {
    id: 5,
    type: 'selective_precipitation',
    difficulty: 'advanced',
    questionIs:
      'Lausn inniheldur 0.010 M Cl⁻ og 0.010 M I⁻. Ef AgNO₃ lausn er bætt hægt við, hvort fellur fyrst út, AgCl eða AgI?',
    question:
      'A solution contains 0.010 M Cl⁻ and 0.010 M I⁻. If AgNO₃ solution is slowly added, which precipitates first, AgCl or AgI?',
    compounds: [getCompound('AgCl'), getCompound('AgI')],
    mixingData: {
      solution1: {
        ion: 'Cl-',
        concentration: 0.01,
        volume: 100,
      },
      solution2: {
        ion: 'I-',
        concentration: 0.01,
        volume: 100,
      },
    },
    precipitationOrder: ['AgI', 'AgCl'],
    explanation:
      'AgI precipitates first because it has a much smaller Ksp (8.52×10⁻¹⁷) compared to AgCl (1.77×10⁻¹⁰). The [Ag⁺] needed to precipitate AgI is Ksp/[I⁻] = 8.52×10⁻¹⁵ M, while for AgCl it is 1.77×10⁻⁸ M.',
    explanationIs:
      'AgI fellur fyrst út vegna þess að það hefur mun lægra Ksp (8.52×10⁻¹⁷) miðað við AgCl (1.77×10⁻¹⁰). [Ag⁺] sem þarf til að fella út AgI er Ksp/[I⁻] = 8.52×10⁻¹⁵ M, en fyrir AgCl er það 1.77×10⁻⁸ M.',
    hints: {
      topic: 'Þetta er sértækt botnfallsvandamál.',
      strategy:
        'Reiknið [Ag⁺] sem þarf til að hefja botnfall fyrir hvert efnasamband.',
      method: '[Ag⁺]þarf = Ksp / [anion]',
      solution:
        'AgI fellur fyrst vegna þess að það þarf lægri [Ag⁺] til að byrja botnfall.',
    },
  },
  {
    id: 6,
    type: 'selective_precipitation',
    difficulty: 'advanced',
    questionIs:
      'Lausn inniheldur bæði Ba²⁺ og Ca²⁺ (0.10 M hvort). Ef Na₂SO₄ lausn er bætt hægt við, hvort fellur fyrst út?',
    question:
      'A solution contains both Ba²⁺ and Ca²⁺ (0.10 M each). If Na₂SO₄ solution is slowly added, which precipitates first?',
    compounds: [getCompound('BaSO4'), getCompound('CaSO4')],
    mixingData: {
      solution1: {
        ion: 'Ba2+',
        concentration: 0.1,
        volume: 100,
      },
      solution2: {
        ion: 'Ca2+',
        concentration: 0.1,
        volume: 100,
      },
    },
    precipitationOrder: ['BaSO4', 'CaSO4'],
    explanation:
      'BaSO₄ precipitates first. Ksp(BaSO₄) = 1.08×10⁻¹⁰ requires [SO₄²⁻] = 1.08×10⁻⁹ M to start precipitation. Ksp(CaSO₄) = 4.93×10⁻⁵ requires [SO₄²⁻] = 4.93×10⁻⁴ M.',
    explanationIs:
      'BaSO₄ fellur fyrst út. Ksp(BaSO₄) = 1.08×10⁻¹⁰ þarf [SO₄²⁻] = 1.08×10⁻⁹ M til að hefja botnfall. Ksp(CaSO₄) = 4.93×10⁻⁵ þarf [SO₄²⁻] = 4.93×10⁻⁴ M.',
    hints: {
      topic: 'Sértækt botnfall súlfata.',
      strategy:
        '[SO₄²⁻] sem þarf = Ksp / [katjón]',
      method: 'Efnið með lægra Ksp fellur fyrst út.',
      solution:
        'BaSO₄ fellur fyrst vegna þess að það hefur lægra Ksp.',
    },
  },
];

// Export helpers
export function getRandomLevel1Challenge(): Level1Challenge {
  return level1Challenges[Math.floor(Math.random() * level1Challenges.length)];
}

export function getRandomLevel2Problem(
  difficulty?: 'basic' | 'with_stoichiometry' | 'common_ion'
): Level2Problem {
  const filtered = difficulty
    ? level2Problems.filter((p) => p.difficulty === difficulty)
    : level2Problems;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export function getRandomLevel3Problem(type?: 'predict_precipitate' | 'selective_precipitation'): Level3Problem {
  const filtered = type ? level3Problems.filter((p) => p.type === type) : level3Problems;
  return filtered[Math.floor(Math.random() * filtered.length)];
}
