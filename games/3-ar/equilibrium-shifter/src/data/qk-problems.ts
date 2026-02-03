/**
 * Numerical Q vs K Problems
 *
 * Students calculate the reaction quotient Q from given concentrations,
 * compare Q to K, and predict the shift direction.
 *
 * Problem types:
 * - calculate-q: Given concentrations, calculate Q
 * - compare-qk: Given Q and K, predict shift direction
 * - full-analysis: Calculate Q and predict shift
 */

import type { Equilibrium } from '../types';
import { equilibria } from './equilibria';

// Helper to get equilibrium by ID
function getEquilibrium(id: number): Equilibrium {
  const eq = equilibria.find((e) => e.id === id);
  if (!eq) throw new Error(`Equilibrium ${id} not found`);
  return eq;
}

export interface QKProblem {
  id: number;
  equilibrium: Equilibrium;
  K: number;
  Ktype: 'Kc' | 'Kp';
  initialConcentrations: Record<string, number>;
  correctQ: number;
  correctShift: 'left' | 'right' | 'none';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questionIs: string;
  question: string;
  hints: {
    topic: string;
    strategy: string;
    method: string;
    solution: string;
  };
}

export const qkProblems: QKProblem[] = [
  // =====================
  // BEGINNER PROBLEMS
  // =====================
  {
    id: 1,
    equilibrium: getEquilibrium(1), // N2O4 <-> 2NO2
    K: 4.63e-3,
    Ktype: 'Kc',
    initialConcentrations: {
      N2O4: 0.1,
      NO2: 0.02,
    },
    correctQ: 4.0e-3, // (0.02)^2 / 0.1 = 0.004
    correctShift: 'right', // Q < K
    difficulty: 'beginner',
    questionIs:
      'Reiknaðu Q fyrir N₂O₄ ⇌ 2NO₂ þar sem [N₂O₄] = 0.100 M og [NO₂] = 0.020 M. K = 4.63 × 10⁻³. Í hvaða átt hliðrast hvarfið?',
    question:
      'Calculate Q for N₂O₄ ⇌ 2NO₂ where [N₂O₄] = 0.100 M and [NO₂] = 0.020 M. K = 4.63 × 10⁻³. Which way does the reaction shift?',
    hints: {
      topic: 'Q = [myndefni]/[hvarfefni] með veldum úr stuðlum.',
      strategy: 'Fyrir N₂O₄ ⇌ 2NO₂: Q = [NO₂]²/[N₂O₄].',
      method: 'Q = (0.020)²/(0.100) = 4.0 × 10⁻³. Berðu saman við K = 4.63 × 10⁻³.',
      solution: 'Q = 4.0 × 10⁻³ < K = 4.63 × 10⁻³, svo hvarfið hliðrast TIL HÆGRI að myndefnum.',
    },
  },
  {
    id: 2,
    equilibrium: getEquilibrium(2), // H2 + I2 <-> 2HI
    K: 54.3,
    Ktype: 'Kc',
    initialConcentrations: {
      H2: 0.1,
      I2: 0.1,
      HI: 0.5,
    },
    correctQ: 25.0, // (0.5)^2 / (0.1 * 0.1) = 25
    correctShift: 'right', // Q < K
    difficulty: 'beginner',
    questionIs:
      'H₂ + I₂ ⇌ 2HI með K = 54.3. [H₂] = 0.10 M, [I₂] = 0.10 M, [HI] = 0.50 M. Reiknaðu Q og spáðu fyrir um stefnu.',
    question:
      'H₂ + I₂ ⇌ 2HI with K = 54.3. [H₂] = 0.10 M, [I₂] = 0.10 M, [HI] = 0.50 M. Calculate Q and predict direction.',
    hints: {
      topic: 'Q tjáning fyrir þetta hvarf: Q = [HI]²/([H₂][I₂]).',
      strategy: 'Reiknaðu Q fyrst, berðu svo saman við K = 54.3.',
      method: 'Q = (0.50)²/((0.10)(0.10)) = 0.25/0.01 = 25.',
      solution: 'Q = 25 < K = 54.3, svo hvarfið hliðrast TIL HÆGRI.',
    },
  },
  {
    id: 3,
    equilibrium: getEquilibrium(8), // CH3COOH <-> CH3COO- + H+
    K: 1.8e-5,
    Ktype: 'Kc',
    initialConcentrations: {
      CH3COOH: 0.1,
      'CH3COO-': 0.001,
      'H+': 0.001,
    },
    correctQ: 1.0e-5, // (0.001 * 0.001) / 0.1 = 1e-5
    correctShift: 'right', // Q < K
    difficulty: 'beginner',
    questionIs:
      'CH₃COOH ⇌ CH₃COO⁻ + H⁺ með Ka = 1.8 × 10⁻⁵. [CH₃COOH] = 0.10 M, [CH₃COO⁻] = [H⁺] = 1.0 × 10⁻³ M. Er kerfið í jafnvægi?',
    question:
      'CH₃COOH ⇌ CH₃COO⁻ + H⁺ with Ka = 1.8 × 10⁻⁵. [CH₃COOH] = 0.10 M, [CH₃COO⁻] = [H⁺] = 1.0 × 10⁻³ M. Is the system at equilibrium?',
    hints: {
      topic: 'Sýru-basa jafnvægi: Ka = [H⁺][A⁻]/[HA].',
      strategy: 'Reiknaðu Q og berðu saman við Ka.',
      method: 'Q = (1.0 × 10⁻³)(1.0 × 10⁻³)/(0.10) = 1.0 × 10⁻⁵.',
      solution: 'Q = 1.0 × 10⁻⁵ < Ka = 1.8 × 10⁻⁵, svo meira sýra mun jónast (hliðrun til hægri).',
    },
  },
  {
    id: 4,
    equilibrium: getEquilibrium(1), // N2O4 <-> 2NO2
    K: 4.63e-3,
    Ktype: 'Kc',
    initialConcentrations: {
      N2O4: 0.05,
      NO2: 0.03,
    },
    correctQ: 1.8e-2, // (0.03)^2 / 0.05 = 0.018
    correctShift: 'left', // Q > K
    difficulty: 'beginner',
    questionIs:
      'N₂O₄ ⇌ 2NO₂ með K = 4.63 × 10⁻³. [N₂O₄] = 0.050 M, [NO₂] = 0.030 M. Í hvaða átt hliðrast hvarfið?',
    question:
      'N₂O₄ ⇌ 2NO₂ with K = 4.63 × 10⁻³. [N₂O₄] = 0.050 M, [NO₂] = 0.030 M. Which way does the reaction shift?',
    hints: {
      topic: 'Q = [NO₂]²/[N₂O₄] fyrir þetta hvarf.',
      strategy: 'Berðu saman Q og K til að ákvarða stefnu.',
      method: 'Q = (0.030)²/(0.050) = 0.0009/0.050 = 0.018.',
      solution: 'Q = 0.018 > K = 4.63 × 10⁻³, svo hvarfið hliðrast TIL VINSTRI að hvarfefnum.',
    },
  },

  // =====================
  // INTERMEDIATE PROBLEMS
  // =====================
  {
    id: 5,
    equilibrium: getEquilibrium(3), // PCl5 <-> PCl3 + Cl2
    K: 0.042,
    Ktype: 'Kc',
    initialConcentrations: {
      PCl5: 0.2,
      PCl3: 0.05,
      Cl2: 0.05,
    },
    correctQ: 0.0125, // (0.05 * 0.05) / 0.2 = 0.0125
    correctShift: 'right', // Q < K
    difficulty: 'intermediate',
    questionIs:
      'PCl₅ ⇌ PCl₃ + Cl₂ með K = 0.042. [PCl₅] = 0.20 M, [PCl₃] = [Cl₂] = 0.050 M. Reiknaðu Q og ákvarðaðu stefnu.',
    question:
      'PCl₅ ⇌ PCl₃ + Cl₂ with K = 0.042. [PCl₅] = 0.20 M, [PCl₃] = [Cl₂] = 0.050 M. Calculate Q and determine direction.',
    hints: {
      topic: 'Q = [PCl₃][Cl₂]/[PCl₅] fyrir þetta niðurbrot.',
      strategy: 'Reiknaðu Q og berðu saman við K = 0.042.',
      method: 'Q = (0.050)(0.050)/(0.20) = 0.0025/0.20 = 0.0125.',
      solution: 'Q = 0.0125 < K = 0.042, svo hvarfið hliðrast TIL HÆGRI (meira niðurbrot).',
    },
  },
  {
    id: 6,
    equilibrium: getEquilibrium(11), // N2 + 3H2 <-> 2NH3 (Haber)
    K: 4.34e-3,
    Ktype: 'Kc',
    initialConcentrations: {
      N2: 1.0,
      H2: 1.0,
      NH3: 0.1,
    },
    correctQ: 0.01, // (0.1)^2 / (1.0 * 1.0^3) = 0.01
    correctShift: 'left', // Q > K
    difficulty: 'intermediate',
    questionIs:
      'Haber-ferli: N₂ + 3H₂ ⇌ 2NH₃ með K = 4.34 × 10⁻³. [N₂] = [H₂] = 1.0 M, [NH₃] = 0.10 M. Í hvaða átt hliðrast?',
    question:
      'Haber process: N₂ + 3H₂ ⇌ 2NH₃ with K = 4.34 × 10⁻³. [N₂] = [H₂] = 1.0 M, [NH₃] = 0.10 M. Which way does it shift?',
    hints: {
      topic: 'Q = [NH₃]²/([N₂][H₂]³) - athugaðu stuðlana!',
      strategy: 'Mundu að [H₂] er í þriðja veldi vegna stuðulsins 3.',
      method: 'Q = (0.10)²/((1.0)(1.0)³) = 0.01/1.0 = 0.01.',
      solution: 'Q = 0.01 > K = 4.34 × 10⁻³, svo hvarfið hliðrast TIL VINSTRI (minna ammoníak).',
    },
  },
  {
    id: 7,
    equilibrium: getEquilibrium(12), // 2SO2 + O2 <-> 2SO3 (Contact)
    K: 1.7e6,
    Ktype: 'Kc',
    initialConcentrations: {
      SO2: 0.2,
      O2: 0.1,
      SO3: 0.1,
    },
    correctQ: 2.5, // (0.1)^2 / ((0.2)^2 * 0.1) = 0.01 / 0.004 = 2.5
    correctShift: 'right', // Q << K (1.7e6 is much larger)
    difficulty: 'intermediate',
    questionIs:
      'Snertiferlið: 2SO₂ + O₂ ⇌ 2SO₃ með K = 1.7 × 10⁶. [SO₂] = 0.20 M, [O₂] = 0.10 M, [SO₃] = 0.10 M. Hvað gerist?',
    question:
      'Contact process: 2SO₂ + O₂ ⇌ 2SO₃ with K = 1.7 × 10⁶. [SO₂] = 0.20 M, [O₂] = 0.10 M, [SO₃] = 0.10 M. What happens?',
    hints: {
      topic: 'Q = [SO₃]²/([SO₂]²[O₂]) - tveir stuðlar 2!',
      strategy: 'K er mjög hátt (1.7 × 10⁶), svo hvarf fer nánast alveg til hægri.',
      method: 'Q = (0.10)²/((0.20)²(0.10)) = 0.01/(0.04 × 0.1) = 2.5.',
      solution: 'Q = 2.5 << K = 1.7 × 10⁶, svo hvarfið hliðrast MJÖG til hægri.',
    },
  },
  {
    id: 8,
    equilibrium: getEquilibrium(2), // H2 + I2 <-> 2HI
    K: 54.3,
    Ktype: 'Kc',
    initialConcentrations: {
      H2: 0.02,
      I2: 0.02,
      HI: 0.3,
    },
    correctQ: 225.0, // (0.3)^2 / (0.02 * 0.02) = 0.09 / 0.0004 = 225
    correctShift: 'left', // Q > K
    difficulty: 'intermediate',
    questionIs:
      'H₂ + I₂ ⇌ 2HI með K = 54.3. [H₂] = [I₂] = 0.020 M, [HI] = 0.30 M. Í hvaða átt hliðrast hvarfið?',
    question:
      'H₂ + I₂ ⇌ 2HI with K = 54.3. [H₂] = [I₂] = 0.020 M, [HI] = 0.30 M. Which way does the reaction shift?',
    hints: {
      topic: 'Q = [HI]²/([H₂][I₂]) eins og áður.',
      strategy: 'Þegar Q > K hliðrast hvarfið til vinstri.',
      method: 'Q = (0.30)²/((0.020)(0.020)) = 0.09/0.0004 = 225.',
      solution: 'Q = 225 > K = 54.3, svo hvarfið hliðrast TIL VINSTRI (HI sundrast).',
    },
  },

  // =====================
  // ADVANCED PROBLEMS
  // =====================
  {
    id: 9,
    equilibrium: getEquilibrium(1), // N2O4 <-> 2NO2 (Kp problem)
    K: 0.115, // Kp at 373 K
    Ktype: 'Kp',
    initialConcentrations: {
      N2O4: 0.8, // atm
      NO2: 0.4, // atm
    },
    correctQ: 0.2, // (0.4)^2 / 0.8 = 0.16 / 0.8 = 0.2
    correctShift: 'left', // Q > Kp
    difficulty: 'advanced',
    questionIs:
      'N₂O₄(g) ⇌ 2NO₂(g) við 100°C með Kp = 0.115 atm. P(N₂O₄) = 0.80 atm, P(NO₂) = 0.40 atm. Reiknaðu Qp og ákvarðaðu stefnu.',
    question:
      'N₂O₄(g) ⇌ 2NO₂(g) at 100°C with Kp = 0.115 atm. P(N₂O₄) = 0.80 atm, P(NO₂) = 0.40 atm. Calculate Qp and determine direction.',
    hints: {
      topic: 'Kp notar hlutþrýsting í stað styrks. Qp = P(NO₂)²/P(N₂O₄).',
      strategy: 'Sama aðferð og Kc, en notaðu atm í stað M.',
      method: 'Qp = (0.40)²/(0.80) = 0.16/0.80 = 0.20 atm.',
      solution: 'Qp = 0.20 > Kp = 0.115, svo hvarfið hliðrast TIL VINSTRI.',
    },
  },
  {
    id: 10,
    equilibrium: getEquilibrium(11), // Haber process
    K: 4.34e-3,
    Ktype: 'Kc',
    initialConcentrations: {
      N2: 0.5,
      H2: 1.5,
      NH3: 0.2,
    },
    correctQ: 0.0237, // (0.2)^2 / (0.5 * 1.5^3) = 0.04 / 1.6875 ≈ 0.0237
    correctShift: 'left', // Q > K
    difficulty: 'advanced',
    questionIs:
      'N₂ + 3H₂ ⇌ 2NH₃ með K = 4.34 × 10⁻³. [N₂] = 0.50 M, [H₂] = 1.50 M, [NH₃] = 0.20 M. Hvert stefnir kerfið?',
    question:
      'N₂ + 3H₂ ⇌ 2NH₃ with K = 4.34 × 10⁻³. [N₂] = 0.50 M, [H₂] = 1.50 M, [NH₃] = 0.20 M. Which way does the system shift?',
    hints: {
      topic: 'Q = [NH₃]²/([N₂][H₂]³) - þriðja veldi [H₂]!',
      strategy: '[H₂]³ = (1.50)³ = 3.375.',
      method: 'Q = (0.20)²/((0.50)(3.375)) = 0.04/1.6875 ≈ 0.0237.',
      solution: 'Q ≈ 0.024 > K = 4.34 × 10⁻³, svo hvarfið hliðrast TIL VINSTRI.',
    },
  },
  {
    id: 11,
    equilibrium: getEquilibrium(3), // PCl5 <-> PCl3 + Cl2
    K: 0.042,
    Ktype: 'Kc',
    initialConcentrations: {
      PCl5: 0.1,
      PCl3: 0.08,
      Cl2: 0.06,
    },
    correctQ: 0.048, // (0.08 * 0.06) / 0.1 = 0.0048 / 0.1 = 0.048
    correctShift: 'left', // Q > K (0.048 > 0.042)
    difficulty: 'advanced',
    questionIs:
      'PCl₅ ⇌ PCl₃ + Cl₂ með K = 0.042. [PCl₅] = 0.10 M, [PCl₃] = 0.080 M, [Cl₂] = 0.060 M. Er kerfið í jafnvægi?',
    question:
      'PCl₅ ⇌ PCl₃ + Cl₂ with K = 0.042. [PCl₅] = 0.10 M, [PCl₃] = 0.080 M, [Cl₂] = 0.060 M. Is the system at equilibrium?',
    hints: {
      topic: 'Q = [PCl₃][Cl₂]/[PCl₅].',
      strategy: 'Ef Q = K, þá er kerfið í jafnvægi. Ef ekki, hliðrast það.',
      method: 'Q = (0.080)(0.060)/(0.10) = 0.0048/0.10 = 0.048.',
      solution:
        'Q = 0.048 > K = 0.042 (rétt nálægt, en ekki jafnvægi). Hvarfið hliðrast ÖRLÍTIÐ til vinstri.',
    },
  },
  {
    id: 12,
    equilibrium: getEquilibrium(2), // H2 + I2 <-> 2HI (near equilibrium)
    K: 54.3,
    Ktype: 'Kc',
    initialConcentrations: {
      H2: 0.107,
      I2: 0.107,
      HI: 0.786,
    },
    correctQ: 54.0, // (0.786)^2 / (0.107 * 0.107) ≈ 54
    correctShift: 'none', // Q ≈ K
    difficulty: 'advanced',
    questionIs:
      'H₂ + I₂ ⇌ 2HI með K = 54.3. [H₂] = [I₂] = 0.107 M, [HI] = 0.786 M. Er þetta jafnvægi?',
    question:
      'H₂ + I₂ ⇌ 2HI with K = 54.3. [H₂] = [I₂] = 0.107 M, [HI] = 0.786 M. Is this equilibrium?',
    hints: {
      topic: 'Jafnvægi þýðir Q = K (innan skekkjumarka).',
      strategy: 'Reiknaðu Q og berðu saman við K = 54.3.',
      method: 'Q = (0.786)²/((0.107)(0.107)) = 0.618/0.01145 ≈ 54.0.',
      solution: 'Q ≈ 54.0 ≈ K = 54.3. Kerfið er NÆR jafnvægi (engin veruleg hliðrun).',
    },
  },
];

// Get problems by difficulty
export function getQKProblemsByDifficulty(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): QKProblem[] {
  return qkProblems.filter((p) => p.difficulty === difficulty);
}

// Get a random problem
export function getRandomQKProblem(
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
): QKProblem {
  const pool = difficulty ? getQKProblemsByDifficulty(difficulty) : qkProblems;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Export counts
export const qkProblemCounts = {
  beginner: qkProblems.filter((p) => p.difficulty === 'beginner').length,
  intermediate: qkProblems.filter((p) => p.difficulty === 'intermediate').length,
  advanced: qkProblems.filter((p) => p.difficulty === 'advanced').length,
  total: qkProblems.length,
};
