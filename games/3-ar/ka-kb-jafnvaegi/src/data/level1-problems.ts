import type { Level1Problem } from '../types';
import { getAcidBaseById } from './acids-bases';

export const LEVEL1_PROBLEMS: Level1Problem[] = [
  // Write Ka expressions
  {
    id: 1,
    type: 'write-ka',
    acidBase: getAcidBaseById('acetic')!,
    question: 'Write the Ka expression for acetic acid (CH₃COOH).',
    questionIs: 'Skrifaðu Ka tjáningu fyrir edikssýru (CH₃COOH).',
    options: [
      'Ka = [CH₃COO⁻][H⁺]/[CH₃COOH]',
      'Ka = [CH₃COOH]/[CH₃COO⁻][H⁺]',
      'Ka = [CH₃COO⁻][H⁺]',
      'Ka = [CH₃COOH][H₂O]',
    ],
    correctAnswer: 'Ka = [CH₃COO⁻][H⁺]/[CH₃COOH]',
    explanation:
      'For the equilibrium CH₃COOH ⇌ CH₃COO⁻ + H⁺, Ka = [products]/[reactants] = [CH₃COO⁻][H⁺]/[CH₃COOH]. Water is not included as it is the solvent.',
    explanationIs:
      'Fyrir jafnvægið CH₃COOH ⇌ CH₃COO⁻ + H⁺, Ka = [afurðir]/[hvarfefni] = [CH₃COO⁻][H⁺]/[CH₃COOH]. Vatn er ekki tekið með þar sem það er leysiefnið.',
    hint: 'Ka = [products]/[reactants], excluding water',
    hintIs: 'Ka = [afurðir]/[hvarfefni], án vatns',
  },
  {
    id: 2,
    type: 'write-ka',
    acidBase: getAcidBaseById('hf')!,
    question: 'Write the Ka expression for hydrofluoric acid (HF).',
    questionIs: 'Skrifaðu Ka tjáningu fyrir flúorvetni (HF).',
    options: [
      'Ka = [F⁻][H⁺]/[HF]',
      'Ka = [HF]/[F⁻][H⁺]',
      'Ka = [H⁺][F⁻]',
      'Ka = [HF][H₂O]/[F⁻]',
    ],
    correctAnswer: 'Ka = [F⁻][H⁺]/[HF]',
    explanation:
      'For HF ⇌ H⁺ + F⁻, Ka = [H⁺][F⁻]/[HF]. This is a simple 1:1:1 dissociation.',
    explanationIs:
      'Fyrir HF ⇌ H⁺ + F⁻, Ka = [H⁺][F⁻]/[HF]. Þetta er einföld 1:1:1 sundrun.',
    hint: 'HF dissociates into H⁺ and F⁻',
    hintIs: 'HF sundrast í H⁺ og F⁻',
  },
  {
    id: 3,
    type: 'write-ka',
    acidBase: getAcidBaseById('hno2')!,
    question: 'Write the Ka expression for nitrous acid (HNO₂).',
    questionIs: 'Skrifaðu Ka tjáningu fyrir saltpéturssýrling (HNO₂).',
    options: [
      'Ka = [NO₂⁻][H⁺]/[HNO₂]',
      'Ka = [HNO₂]/[NO₂⁻][H⁺]',
      'Ka = [H⁺][NO₂⁻]',
      'Ka = [HNO₂][H₂O]',
    ],
    correctAnswer: 'Ka = [NO₂⁻][H⁺]/[HNO₂]',
    explanation:
      'For HNO₂ ⇌ H⁺ + NO₂⁻, Ka = [H⁺][NO₂⁻]/[HNO₂]. The nitrite ion is the conjugate base.',
    explanationIs:
      'Fyrir HNO₂ ⇌ H⁺ + NO₂⁻, Ka = [H⁺][NO₂⁻]/[HNO₂]. Nítrat jónin er samstæður basi.',
    hint: 'The conjugate base of HNO₂ is NO₂⁻',
    hintIs: 'Samstæður basi HNO₂ er NO₂⁻',
  },

  // Write Kb expressions
  {
    id: 4,
    type: 'write-kb',
    acidBase: getAcidBaseById('ammonia')!,
    question: 'Write the Kb expression for ammonia (NH₃).',
    questionIs: 'Skrifaðu Kb tjáningu fyrir ammoníak (NH₃).',
    options: [
      'Kb = [NH₄⁺][OH⁻]/[NH₃]',
      'Kb = [NH₃]/[NH₄⁺][OH⁻]',
      'Kb = [NH₄⁺][OH⁻]',
      'Kb = [NH₃][H₂O]',
    ],
    correctAnswer: 'Kb = [NH₄⁺][OH⁻]/[NH₃]',
    explanation:
      'For NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, Kb = [NH₄⁺][OH⁻]/[NH₃]. Water is the solvent and not included.',
    explanationIs:
      'Fyrir NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, Kb = [NH₄⁺][OH⁻]/[NH₃]. Vatn er leysiefnið og er ekki tekið með.',
    hint: 'A base accepts H⁺ from water to form OH⁻',
    hintIs: 'Basi tekur við H⁺ frá vatni og myndar OH⁻',
  },
  {
    id: 5,
    type: 'write-kb',
    acidBase: getAcidBaseById('methylamine')!,
    question: 'Write the Kb expression for methylamine (CH₃NH₂).',
    questionIs: 'Skrifaðu Kb tjáningu fyrir metýlamín (CH₃NH₂).',
    options: [
      'Kb = [CH₃NH₃⁺][OH⁻]/[CH₃NH₂]',
      'Kb = [CH₃NH₂]/[CH₃NH₃⁺][OH⁻]',
      'Kb = [CH₃NH₃⁺][OH⁻]',
      'Kb = [CH₃NH₂][H₂O]',
    ],
    correctAnswer: 'Kb = [CH₃NH₃⁺][OH⁻]/[CH₃NH₂]',
    explanation:
      'For CH₃NH₂ + H₂O ⇌ CH₃NH₃⁺ + OH⁻, Kb = [CH₃NH₃⁺][OH⁻]/[CH₃NH₂].',
    explanationIs:
      'Fyrir CH₃NH₂ + H₂O ⇌ CH₃NH₃⁺ + OH⁻, Kb = [CH₃NH₃⁺][OH⁻]/[CH₃NH₂].',
    hint: 'The nitrogen atom accepts a proton',
    hintIs: 'Köfnunarefnisatómið tekur við róteind',
  },
  {
    id: 6,
    type: 'write-kb',
    acidBase: getAcidBaseById('pyridine')!,
    question: 'Write the Kb expression for pyridine (C₅H₅N).',
    questionIs: 'Skrifaðu Kb tjáningu fyrir pýridín (C₅H₅N).',
    options: [
      'Kb = [C₅H₅NH⁺][OH⁻]/[C₅H₅N]',
      'Kb = [C₅H₅N]/[C₅H₅NH⁺][OH⁻]',
      'Kb = [C₅H₅NH⁺][OH⁻]',
      'Kb = [C₅H₅N][H₂O]',
    ],
    correctAnswer: 'Kb = [C₅H₅NH⁺][OH⁻]/[C₅H₅N]',
    explanation:
      'For C₅H₅N + H₂O ⇌ C₅H₅NH⁺ + OH⁻, Kb = [C₅H₅NH⁺][OH⁻]/[C₅H₅N]. Pyridine is an aromatic base.',
    explanationIs:
      'Fyrir C₅H₅N + H₂O ⇌ C₅H₅NH⁺ + OH⁻, Kb = [C₅H₅NH⁺][OH⁻]/[C₅H₅N]. Pýridín er arómatískur basi.',
    hint: 'The nitrogen in the ring accepts a proton',
    hintIs: 'Köfnunarefnið í hringnum tekur við róteind',
  },

  // Ka × Kb = Kw relationship
  {
    id: 7,
    type: 'ka-kb-relationship',
    acidBase: getAcidBaseById('acetic')!,
    question: 'If Ka for acetic acid is 1.8 × 10⁻⁵, what is Kb for the acetate ion (CH₃COO⁻)?',
    questionIs:
      'Ef Ka fyrir edikssýru er 1.8 × 10⁻⁵, hvað er Kb fyrir asetratjónina (CH₃COO⁻)?',
    options: ['5.6 × 10⁻¹⁰', '1.8 × 10⁻⁵', '1.0 × 10⁻¹⁴', '5.6 × 10⁻⁵'],
    correctAnswer: '5.6 × 10⁻¹⁰',
    explanation:
      'Ka × Kb = Kw = 1.0 × 10⁻¹⁴. So Kb = Kw/Ka = (1.0 × 10⁻¹⁴)/(1.8 × 10⁻⁵) = 5.6 × 10⁻¹⁰',
    explanationIs:
      'Ka × Kb = Kw = 1.0 × 10⁻¹⁴. Þannig Kb = Kw/Ka = (1.0 × 10⁻¹⁴)/(1.8 × 10⁻⁵) = 5.6 × 10⁻¹⁰',
    hint: 'Remember: Ka × Kb = Kw = 1.0 × 10⁻¹⁴',
    hintIs: 'Mundu: Ka × Kb = Kw = 1.0 × 10⁻¹⁴',
  },
  {
    id: 8,
    type: 'ka-kb-relationship',
    acidBase: getAcidBaseById('ammonia')!,
    question:
      'If Kb for ammonia is 1.8 × 10⁻⁵, what is Ka for the ammonium ion (NH₄⁺)?',
    questionIs:
      'Ef Kb fyrir ammoníak er 1.8 × 10⁻⁵, hvað er Ka fyrir ammóníumjónina (NH₄⁺)?',
    options: ['5.6 × 10⁻¹⁰', '1.8 × 10⁻⁵', '1.0 × 10⁻¹⁴', '1.8 × 10⁻⁹'],
    correctAnswer: '5.6 × 10⁻¹⁰',
    explanation:
      'Ka × Kb = Kw = 1.0 × 10⁻¹⁴. So Ka = Kw/Kb = (1.0 × 10⁻¹⁴)/(1.8 × 10⁻⁵) = 5.6 × 10⁻¹⁰',
    explanationIs:
      'Ka × Kb = Kw = 1.0 × 10⁻¹⁴. Þannig Ka = Kw/Kb = (1.0 × 10⁻¹⁴)/(1.8 × 10⁻⁵) = 5.6 × 10⁻¹⁰',
    hint: 'Remember: Ka × Kb = Kw = 1.0 × 10⁻¹⁴',
    hintIs: 'Mundu: Ka × Kb = Kw = 1.0 × 10⁻¹⁴',
  },

  // Compare acid strength
  {
    id: 9,
    type: 'compare-strength',
    acidBase: getAcidBaseById('formic')!,
    question:
      'Which acid is stronger: formic acid (Ka = 1.8 × 10⁻⁴) or acetic acid (Ka = 1.8 × 10⁻⁵)?',
    questionIs:
      'Hvor sýran er sterkari: maurasýra (Ka = 1.8 × 10⁻⁴) eða edikssýra (Ka = 1.8 × 10⁻⁵)?',
    options: [
      'Formic acid (higher Ka)',
      'Acetic acid (higher Ka)',
      'They are equally strong',
      'Cannot determine from Ka values',
    ],
    correctAnswer: 'Formic acid (higher Ka)',
    explanation:
      'A larger Ka indicates a stronger acid. Formic acid (Ka = 1.8 × 10⁻⁴) has a Ka that is 10 times larger than acetic acid (Ka = 1.8 × 10⁻⁵), so formic acid is the stronger acid.',
    explanationIs:
      'Stærra Ka gildi gefur til kynna sterkari sýru. Maurasýra (Ka = 1.8 × 10⁻⁴) hefur Ka sem er 10 sinnum stærra en edikssýra (Ka = 1.8 × 10⁻⁵), þannig maurasýra er sterkari sýran.',
    hint: 'Higher Ka means more dissociation, which means a stronger acid',
    hintIs: 'Hærra Ka þýðir meiri sundrun, sem þýðir sterkari sýra',
  },
  {
    id: 10,
    type: 'compare-strength',
    acidBase: getAcidBaseById('methylamine')!,
    question:
      'Which base is stronger: methylamine (Kb = 4.4 × 10⁻⁴) or ammonia (Kb = 1.8 × 10⁻⁵)?',
    questionIs:
      'Hvor basinn er sterkari: metýlamín (Kb = 4.4 × 10⁻⁴) eða ammoníak (Kb = 1.8 × 10⁻⁵)?',
    options: [
      'Methylamine (higher Kb)',
      'Ammonia (higher Kb)',
      'They are equally strong',
      'Cannot determine from Kb values',
    ],
    correctAnswer: 'Methylamine (higher Kb)',
    explanation:
      'A larger Kb indicates a stronger base. Methylamine (Kb = 4.4 × 10⁻⁴) is stronger than ammonia (Kb = 1.8 × 10⁻⁵). The methyl group donates electron density, making the nitrogen more willing to accept a proton.',
    explanationIs:
      'Stærra Kb gildi gefur til kynna sterkari basa. Metýlamín (Kb = 4.4 × 10⁻⁴) er sterkari en ammoníak (Kb = 1.8 × 10⁻⁵). Metýl hópurinn gefur rafeindaþéttleika, sem gerir köfnunarefnið viljugra til að taka við róteind.',
    hint: 'Higher Kb means more OH⁻ production, which means a stronger base',
    hintIs: 'Hærra Kb þýðir meiri OH⁻ myndun, sem þýðir sterkari basa',
  },
];
