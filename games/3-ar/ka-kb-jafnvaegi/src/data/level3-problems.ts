import type { Level3Problem } from '../types';
import { getAcidBaseById } from './acids-bases';

export const LEVEL3_PROBLEMS: Level3Problem[] = [
  // Percent ionization calculations
  {
    id: 1,
    type: 'percent-ionization',
    acidBase: getAcidBaseById('acetic')!,
    concentration: 0.10,
    question:
      'Calculate the percent ionization of 0.10 M acetic acid. Ka = 1.8 × 10⁻⁵',
    questionIs:
      'Reiknaðu jónunarprósentu 0.10 M edikssýru. Ka = 1.8 × 10⁻⁵',
    correctAnswer: 1.3,
    tolerance: 0.1,
    explanation:
      '[H⁺] = √(Ka × C₀) = √(1.8 × 10⁻⁵ × 0.10) = 1.34 × 10⁻³ M. Percent ionization = (1.34 × 10⁻³/0.10) × 100% = 1.34%',
    explanationIs:
      '[H⁺] = √(Ka × C₀) = √(1.8 × 10⁻⁵ × 0.10) = 1.34 × 10⁻³ M. Jónunarprósentu = (1.34 × 10⁻³/0.10) × 100% = 1.34%',
    hint: '% ionization = ([H⁺]/C₀) × 100%',
    hintIs: '% jónun = ([H⁺]/C₀) × 100%',
  },
  {
    id: 2,
    type: 'percent-ionization',
    acidBase: getAcidBaseById('acetic')!,
    concentration: 0.010,
    question:
      'Calculate the percent ionization of 0.010 M acetic acid. Ka = 1.8 × 10⁻⁵',
    questionIs:
      'Reiknaðu jónunarprósentu 0.010 M edikssýru. Ka = 1.8 × 10⁻⁵',
    correctAnswer: 4.2,
    tolerance: 0.2,
    explanation:
      '[H⁺] = √(1.8 × 10⁻⁵ × 0.010) = 4.24 × 10⁻⁴ M. Percent ionization = (4.24 × 10⁻⁴/0.010) × 100% = 4.2%',
    explanationIs:
      '[H⁺] = √(1.8 × 10⁻⁵ × 0.010) = 4.24 × 10⁻⁴ M. Jónunarprósentu = (4.24 × 10⁻⁴/0.010) × 100% = 4.2%',
    hint: 'Notice how dilution affects percent ionization',
    hintIs: 'Taktu eftir hvernig þynning hefur áhrif á jónunarprósentu',
  },
  {
    id: 3,
    type: 'percent-ionization',
    acidBase: getAcidBaseById('formic')!,
    concentration: 0.050,
    question:
      'Calculate the percent ionization of 0.050 M formic acid. Ka = 1.8 × 10⁻⁴',
    questionIs:
      'Reiknaðu jónunarprósentu 0.050 M maurasýru. Ka = 1.8 × 10⁻⁴',
    correctAnswer: 6.0,
    tolerance: 0.3,
    explanation:
      '[H⁺] = √(1.8 × 10⁻⁴ × 0.050) = 3.0 × 10⁻³ M. Percent ionization = (3.0 × 10⁻³/0.050) × 100% = 6.0%',
    explanationIs:
      '[H⁺] = √(1.8 × 10⁻⁴ × 0.050) = 3.0 × 10⁻³ M. Jónunarprósentu = (3.0 × 10⁻³/0.050) × 100% = 6.0%',
    hint: 'Formic acid is stronger than acetic acid',
    hintIs: 'Maurasýra er sterkari en edikssýra',
  },

  // pKa/pKb conversions
  {
    id: 4,
    type: 'pka-pkb-conversion',
    acidBase: getAcidBaseById('acetic')!,
    question:
      'If pKa = 4.74 for acetic acid, what is the pKb of the acetate ion?',
    questionIs:
      'Ef pKa = 4.74 fyrir edikssýru, hvað er pKb asetratjónarinnar?',
    correctAnswer: 9.26,
    tolerance: 0.02,
    explanation:
      'pKa + pKb = 14. So pKb = 14 - 4.74 = 9.26. This shows that the conjugate base of a weak acid is a weak base.',
    explanationIs:
      'pKa + pKb = 14. Þannig pKb = 14 - 4.74 = 9.26. Þetta sýnir að samstæður basi veikrar sýru er veikur basi.',
    hint: 'Remember: pKa + pKb = 14 (at 25°C)',
    hintIs: 'Mundu: pKa + pKb = 14 (við 25°C)',
  },
  {
    id: 5,
    type: 'pka-pkb-conversion',
    acidBase: getAcidBaseById('ammonia')!,
    question:
      'If pKb = 4.74 for ammonia, what is the pKa of the ammonium ion (NH₄⁺)?',
    questionIs:
      'Ef pKb = 4.74 fyrir ammoníak, hvað er pKa ammóníumjónarinnar (NH₄⁺)?',
    correctAnswer: 9.26,
    tolerance: 0.02,
    explanation:
      'pKa + pKb = 14. So pKa = 14 - 4.74 = 9.26. The ammonium ion is the conjugate acid of ammonia.',
    explanationIs:
      'pKa + pKb = 14. Þannig pKa = 14 - 4.74 = 9.26. Ammóníumjónin er samstæð sýra ammoníaks.',
    hint: 'The relationship pKa + pKb = 14 applies to conjugate pairs',
    hintIs: 'Sambandið pKa + pKb = 14 gildir um samstæð pör',
  },

  // Dilution effect on ionization
  {
    id: 6,
    type: 'dilution-effect',
    acidBase: getAcidBaseById('acetic')!,
    question:
      'When 0.10 M acetic acid is diluted to 0.010 M, how does percent ionization change?',
    questionIs:
      'Þegar 0.10 M edikssýra er þynnt í 0.010 M, hvernig breytist jónunarprósentan?',
    correctAnswer: 'increases',
    explanation:
      'At 0.10 M: % ionization ≈ 1.3%. At 0.010 M: % ionization ≈ 4.2%. Dilution increases percent ionization because Le Chatelier\'s principle favors the forward (dissociation) reaction when concentration decreases.',
    explanationIs:
      'Við 0.10 M: % jónun ≈ 1.3%. Við 0.010 M: % jónun ≈ 4.2%. Þynning eykur jónunarprósentu vegna þess að regla Le Chateliers styður fram (sundrrunar) hvarf þegar þéttni minnkar.',
    hint: 'Think about Le Chatelier\'s principle',
    hintIs: 'Hugsaðu um reglu Le Chateliers',
  },

  // Compare ionization
  {
    id: 7,
    type: 'compare-ionization',
    acidBase: getAcidBaseById('formic')!,
    question:
      'At the same concentration, which has greater percent ionization: formic acid (Ka = 1.8 × 10⁻⁴) or acetic acid (Ka = 1.8 × 10⁻⁵)?',
    questionIs:
      'Við sama styrk, hvor hefur hærri jónunarprósentu: maurasýra (Ka = 1.8 × 10⁻⁴) eða edikssýra (Ka = 1.8 × 10⁻⁵)?',
    correctAnswer: 'formic',
    explanation:
      'Formic acid has a larger Ka, meaning it dissociates more. Higher Ka = higher percent ionization at the same concentration.',
    explanationIs:
      'Maurasýra hefur stærra Ka, sem þýðir að hún sundrast meira. Hærra Ka = hærri jónunarprósentu við sama styrk.',
    hint: 'Larger Ka means more dissociation',
    hintIs: 'Stærra Ka þýðir meiri sundrun',
  },
  {
    id: 8,
    type: 'compare-ionization',
    acidBase: getAcidBaseById('methylamine')!,
    question:
      'At 0.10 M, which has greater percent ionization: ammonia (Kb = 1.8 × 10⁻⁵) or methylamine (Kb = 4.4 × 10⁻⁴)?',
    questionIs:
      'Við 0.10 M, hvor hefur hærri jónunarprósentu: ammoníak (Kb = 1.8 × 10⁻⁵) eða metýlamín (Kb = 4.4 × 10⁻⁴)?',
    correctAnswer: 'methylamine',
    explanation:
      'Methylamine has a larger Kb (4.4 × 10⁻⁴ vs 1.8 × 10⁻⁵), so it produces more OH⁻ and has greater percent ionization.',
    explanationIs:
      'Metýlamín hefur stærra Kb (4.4 × 10⁻⁴ vs 1.8 × 10⁻⁵), þannig að það myndar meira OH⁻ og hefur hærri jónunarprósentu.',
    hint: 'Compare the Kb values',
    hintIs: 'Berðu saman Kb gildin',
  },
];
