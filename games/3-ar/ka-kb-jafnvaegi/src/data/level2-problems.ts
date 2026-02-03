import type { Level2Problem } from '../types';
import { getAcidBaseById } from './acids-bases';

export const LEVEL2_PROBLEMS: Level2Problem[] = [
  // pH from Ka
  {
    id: 1,
    type: 'ph-from-ka',
    acidBase: getAcidBaseById('acetic')!,
    initialConcentration: 0.10,
    question:
      'Calculate the pH of a 0.10 M acetic acid solution. Ka = 1.8 × 10⁻⁵',
    questionIs:
      'Reiknaðu pH 0.10 M edikssýrulausnar. Ka = 1.8 × 10⁻⁵',
    correctAnswer: 2.87,
    tolerance: 0.05,
    steps: [
      'Set up ICE table for CH₃COOH ⇌ CH₃COO⁻ + H⁺',
      'Initial: [CH₃COOH] = 0.10 M, [H⁺] = 0, [CH₃COO⁻] = 0',
      'Change: -x, +x, +x',
      'Equilibrium: (0.10-x), x, x',
      'Ka = x²/(0.10-x) = 1.8 × 10⁻⁵',
      'Assuming x << 0.10: x² = 1.8 × 10⁻⁶',
      'x = [H⁺] = 1.34 × 10⁻³ M',
      'pH = -log(1.34 × 10⁻³) = 2.87',
    ],
    stepsIs: [
      'Settu upp ICE töflu fyrir CH₃COOH ⇌ CH₃COO⁻ + H⁺',
      'Upphafs: [CH₃COOH] = 0.10 M, [H⁺] = 0, [CH₃COO⁻] = 0',
      'Breyting: -x, +x, +x',
      'Jafnvægi: (0.10-x), x, x',
      'Ka = x²/(0.10-x) = 1.8 × 10⁻⁵',
      'Gerum ráð fyrir x << 0.10: x² = 1.8 × 10⁻⁶',
      'x = [H⁺] = 1.34 × 10⁻³ M',
      'pH = -log(1.34 × 10⁻³) = 2.87',
    ],
    hint: 'Use the approximation x << C₀ if Ka/C₀ < 0.05',
    hintIs: 'Notaðu nálgunina x << C₀ ef Ka/C₀ < 0.05',
  },
  {
    id: 2,
    type: 'ph-from-ka',
    acidBase: getAcidBaseById('formic')!,
    initialConcentration: 0.050,
    question:
      'Calculate the pH of a 0.050 M formic acid solution. Ka = 1.8 × 10⁻⁴',
    questionIs:
      'Reiknaðu pH 0.050 M maurasýrulausnar. Ka = 1.8 × 10⁻⁴',
    correctAnswer: 2.52,
    tolerance: 0.05,
    steps: [
      'Set up ICE table for HCOOH ⇌ HCOO⁻ + H⁺',
      'Ka = x²/(0.050-x) = 1.8 × 10⁻⁴',
      'Checking approximation: Ka/C₀ = 0.0036 < 0.05 ✓',
      'x² = 9.0 × 10⁻⁶',
      'x = [H⁺] = 3.0 × 10⁻³ M',
      'pH = -log(3.0 × 10⁻³) = 2.52',
    ],
    stepsIs: [
      'Settu upp ICE töflu fyrir HCOOH ⇌ HCOO⁻ + H⁺',
      'Ka = x²/(0.050-x) = 1.8 × 10⁻⁴',
      'Athugum nálgun: Ka/C₀ = 0.0036 < 0.05 ✓',
      'x² = 9.0 × 10⁻⁶',
      'x = [H⁺] = 3.0 × 10⁻³ M',
      'pH = -log(3.0 × 10⁻³) = 2.52',
    ],
    hint: 'Formic acid is stronger than acetic acid',
    hintIs: 'Maurasýra er sterkari en edikssýra',
  },
  {
    id: 3,
    type: 'ph-from-ka',
    acidBase: getAcidBaseById('hf')!,
    initialConcentration: 0.20,
    question:
      'Calculate the pH of a 0.20 M HF solution. Ka = 6.8 × 10⁻⁴',
    questionIs: 'Reiknaðu pH 0.20 M HF lausnar. Ka = 6.8 × 10⁻⁴',
    correctAnswer: 1.93,
    tolerance: 0.05,
    steps: [
      'Set up ICE table for HF ⇌ H⁺ + F⁻',
      'Ka = x²/(0.20-x) = 6.8 × 10⁻⁴',
      'Checking: Ka/C₀ = 0.0034 < 0.05 ✓',
      'x² = 1.36 × 10⁻⁴',
      'x = [H⁺] = 1.17 × 10⁻² M',
      'pH = -log(1.17 × 10⁻²) = 1.93',
    ],
    stepsIs: [
      'Settu upp ICE töflu fyrir HF ⇌ H⁺ + F⁻',
      'Ka = x²/(0.20-x) = 6.8 × 10⁻⁴',
      'Athugum: Ka/C₀ = 0.0034 < 0.05 ✓',
      'x² = 1.36 × 10⁻⁴',
      'x = [H⁺] = 1.17 × 10⁻² M',
      'pH = -log(1.17 × 10⁻²) = 1.93',
    ],
    hint: 'HF has a relatively large Ka for a weak acid',
    hintIs: 'HF hefur tiltölulega hátt Ka fyrir veika sýru',
  },

  // pH from Kb (weak base)
  {
    id: 4,
    type: 'ph-from-kb',
    acidBase: getAcidBaseById('ammonia')!,
    initialConcentration: 0.15,
    question:
      'Calculate the pH of a 0.15 M ammonia solution. Kb = 1.8 × 10⁻⁵',
    questionIs: 'Reiknaðu pH 0.15 M ammoníaklausnar. Kb = 1.8 × 10⁻⁵',
    correctAnswer: 11.22,
    tolerance: 0.05,
    steps: [
      'Set up ICE table for NH₃ + H₂O ⇌ NH₄⁺ + OH⁻',
      'Kb = x²/(0.15-x) = 1.8 × 10⁻⁵',
      'Assuming x << 0.15: x² = 2.7 × 10⁻⁶',
      'x = [OH⁻] = 1.64 × 10⁻³ M',
      'pOH = -log(1.64 × 10⁻³) = 2.78',
      'pH = 14 - pOH = 11.22',
    ],
    stepsIs: [
      'Settu upp ICE töflu fyrir NH₃ + H₂O ⇌ NH₄⁺ + OH⁻',
      'Kb = x²/(0.15-x) = 1.8 × 10⁻⁵',
      'Gerum ráð fyrir x << 0.15: x² = 2.7 × 10⁻⁶',
      'x = [OH⁻] = 1.64 × 10⁻³ M',
      'pOH = -log(1.64 × 10⁻³) = 2.78',
      'pH = 14 - pOH = 11.22',
    ],
    hint: 'First find [OH⁻], then convert to pH using pH + pOH = 14',
    hintIs: 'Finndu fyrst [OH⁻], breyttu svo í pH með pH + pOH = 14',
  },
  {
    id: 5,
    type: 'ph-from-kb',
    acidBase: getAcidBaseById('methylamine')!,
    initialConcentration: 0.10,
    question:
      'Calculate the pH of a 0.10 M methylamine solution. Kb = 4.4 × 10⁻⁴',
    questionIs: 'Reiknaðu pH 0.10 M metýlamínlausnar. Kb = 4.4 × 10⁻⁴',
    correctAnswer: 11.82,
    tolerance: 0.05,
    steps: [
      'Set up ICE table for CH₃NH₂ + H₂O ⇌ CH₃NH₃⁺ + OH⁻',
      'Kb = x²/(0.10-x) = 4.4 × 10⁻⁴',
      'Assuming x << 0.10: x² = 4.4 × 10⁻⁵',
      'x = [OH⁻] = 6.6 × 10⁻³ M',
      'pOH = -log(6.6 × 10⁻³) = 2.18',
      'pH = 14 - 2.18 = 11.82',
    ],
    stepsIs: [
      'Settu upp ICE töflu fyrir CH₃NH₂ + H₂O ⇌ CH₃NH₃⁺ + OH⁻',
      'Kb = x²/(0.10-x) = 4.4 × 10⁻⁴',
      'Gerum ráð fyrir x << 0.10: x² = 4.4 × 10⁻⁵',
      'x = [OH⁻] = 6.6 × 10⁻³ M',
      'pOH = -log(6.6 × 10⁻³) = 2.18',
      'pH = 14 - 2.18 = 11.82',
    ],
    hint: 'Methylamine is a stronger base than ammonia',
    hintIs: 'Metýlamín er sterkari basi en ammoníak',
  },

  // Ka from pH
  {
    id: 6,
    type: 'ka-from-ph',
    acidBase: getAcidBaseById('benzoic')!,
    initialConcentration: 0.050,
    givenValue: 2.94,
    question:
      'A 0.050 M solution of benzoic acid has pH = 2.94. Calculate Ka.',
    questionIs:
      '0.050 M lausn af bensósýru hefur pH = 2.94. Reiknaðu Ka.',
    correctAnswer: 2.6e-5,
    tolerance: 0.2,
    steps: [
      '[H⁺] = 10⁻²·⁹⁴ = 1.15 × 10⁻³ M',
      'At equilibrium: [H⁺] = [C₆H₅COO⁻] = 1.15 × 10⁻³ M',
      '[C₆H₅COOH] = 0.050 - 1.15 × 10⁻³ = 0.049 M',
      'Ka = (1.15 × 10⁻³)²/0.049 = 2.7 × 10⁻⁵',
    ],
    stepsIs: [
      '[H⁺] = 10⁻²·⁹⁴ = 1.15 × 10⁻³ M',
      'Við jafnvægi: [H⁺] = [C₆H₅COO⁻] = 1.15 × 10⁻³ M',
      '[C₆H₅COOH] = 0.050 - 1.15 × 10⁻³ = 0.049 M',
      'Ka = (1.15 × 10⁻³)²/0.049 = 2.7 × 10⁻⁵',
    ],
    hint: 'Use [H⁺] = 10⁻ᵖᴴ to find the hydrogen ion concentration',
    hintIs: 'Notaðu [H⁺] = 10⁻ᵖᴴ til að finna vetnisefnajónaþéttni',
  },
  {
    id: 7,
    type: 'ka-from-ph',
    acidBase: getAcidBaseById('hocl')!,
    initialConcentration: 0.10,
    givenValue: 4.27,
    question:
      'A 0.10 M solution of hypochlorous acid (HOCl) has pH = 4.27. Calculate Ka.',
    questionIs:
      '0.10 M lausn af undirsýru klórs (HOCl) hefur pH = 4.27. Reiknaðu Ka.',
    correctAnswer: 2.9e-8,
    tolerance: 0.2,
    steps: [
      '[H⁺] = 10⁻⁴·²⁷ = 5.4 × 10⁻⁵ M',
      'At equilibrium: [H⁺] = [OCl⁻] = 5.4 × 10⁻⁵ M',
      '[HOCl] = 0.10 - 5.4 × 10⁻⁵ ≈ 0.10 M',
      'Ka = (5.4 × 10⁻⁵)²/0.10 = 2.9 × 10⁻⁸',
    ],
    stepsIs: [
      '[H⁺] = 10⁻⁴·²⁷ = 5.4 × 10⁻⁵ M',
      'Við jafnvægi: [H⁺] = [OCl⁻] = 5.4 × 10⁻⁵ M',
      '[HOCl] = 0.10 - 5.4 × 10⁻⁵ ≈ 0.10 M',
      'Ka = (5.4 × 10⁻⁵)²/0.10 = 2.9 × 10⁻⁸',
    ],
    hint: 'HOCl is a very weak acid, so the approximation works well',
    hintIs: 'HOCl er mjög veik sýra, þannig nálgunin virkar vel',
  },

  // Concentration from pH
  {
    id: 8,
    type: 'concentration-from-ph',
    acidBase: getAcidBaseById('acetic')!,
    initialConcentration: 0, // Will be calculated - this is the unknown
    givenValue: 3.02,
    question:
      'What concentration of acetic acid is needed to achieve pH = 3.02? Ka = 1.8 × 10⁻⁵',
    questionIs:
      'Hvaða styrk edikssýru þarf til að ná pH = 3.02? Ka = 1.8 × 10⁻⁵',
    correctAnswer: 0.050,
    tolerance: 0.1,
    steps: [
      '[H⁺] = 10⁻³·⁰² = 9.5 × 10⁻⁴ M',
      'Ka = [H⁺]²/C₀ (using approximation)',
      'C₀ = [H⁺]²/Ka = (9.5 × 10⁻⁴)²/(1.8 × 10⁻⁵)',
      'C₀ = 0.050 M',
    ],
    stepsIs: [
      '[H⁺] = 10⁻³·⁰² = 9.5 × 10⁻⁴ M',
      'Ka = [H⁺]²/C₀ (notum nálgun)',
      'C₀ = [H⁺]²/Ka = (9.5 × 10⁻⁴)²/(1.8 × 10⁻⁵)',
      'C₀ = 0.050 M',
    ],
    hint: 'Rearrange Ka = x²/C₀ to solve for C₀',
    hintIs: 'Endurraðaðu Ka = x²/C₀ til að leysa fyrir C₀',
  },
];
