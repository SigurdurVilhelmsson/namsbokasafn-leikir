/**
 * ICE Table Problems for Equilibrium Calculations
 *
 * Each problem provides:
 * - An equilibrium system from the existing data
 * - Initial concentrations
 * - The equilibrium constant K
 * - Difficulty level and hints
 */

import type { ICETableProblem, Equilibrium } from '../types';
import { equilibria } from './equilibria';

// Helper to get equilibrium by ID
function getEquilibrium(id: number): Equilibrium {
  const eq = equilibria.find((e) => e.id === id);
  if (!eq) throw new Error(`Equilibrium ${id} not found`);
  return eq;
}

export const iceProblems: ICETableProblem[] = [
  // =====================
  // BEGINNER PROBLEMS
  // =====================
  {
    id: 1,
    equilibrium: getEquilibrium(1), // N2O4 <-> 2NO2
    K: 4.63e-3,
    Ktype: 'Kc',
    initialConcentrations: {
      'N2O4': 0.100,
      'NO2': 0,
    },
    temperature: 298,
    difficulty: 'beginner',
    descriptionIs:
      'Dikofnunarefnisoxid (N2O4) er sett i 1.0 L ilat vid 25C. Reiknadhu jafnvaegisstyrkleika.',
    description:
      'Dinitrogen tetroxide (N2O4) is placed in a 1.0 L container at 25C. Calculate equilibrium concentrations.',
    hints: {
      topic: 'Thetta er ICE tafla vandamal med einfalt 1:2 hlutfall',
      strategy:
        'Settu upp ICE toflu: I = upphafs, C = breyting, E = jafnvaegi. Breyting er -x fyrir hvarfefni og +2x fyrir myndefni.',
      method:
        'K = [NO2]^2/[N2O4] = (2x)^2/(0.100-x). Leystu med thvi ad nota 5% nalgun eda ferningsjofnu.',
      solution:
        'x = 0.0215 M. [N2O4] = 0.0785 M, [NO2] = 0.0430 M. Athugadu: (0.0430)^2/0.0785 = 0.00463',
    },
  },
  {
    id: 2,
    equilibrium: getEquilibrium(2), // H2 + I2 <-> 2HI
    K: 54.3,
    Ktype: 'Kc',
    initialConcentrations: {
      'H2': 0.500,
      'I2': 0.500,
      'HI': 0,
    },
    temperature: 448,
    difficulty: 'beginner',
    descriptionIs:
      'Vetni og jod eru blandad i jofnum styrk (0.500 M hvor) vid 448C. Finndu jafnvaegisstyrkleika allra efna.',
    description:
      'Hydrogen and iodine are mixed at equal concentrations (0.500 M each) at 448C. Find equilibrium concentrations of all species.',
    hints: {
      topic: 'H2 + I2 <-> 2HI med K = 54.3. Hatt K thydur ad hvarf id fer langt til haegri.',
      strategy:
        'Settu upp ICE: H2 og I2 byrja a 0.500 M, HI a 0. Breyting: -x, -x, +2x',
      method:
        'K = [HI]^2/([H2][I2]) = (2x)^2/((0.500-x)(0.500-x)) = (2x)^2/(0.500-x)^2. Taktu kvadratrót beggja vegna.',
      solution:
        'sqrt(54.3) = 2x/(0.500-x), x = 0.393 M. [H2] = [I2] = 0.107 M, [HI] = 0.786 M',
    },
  },
  {
    id: 3,
    equilibrium: getEquilibrium(8), // CH3COOH <-> CH3COO- + H+
    K: 1.8e-5,
    Ktype: 'Kc',
    initialConcentrations: {
      'CH3COOH': 0.100,
      'CH3COO-': 0,
      'H+': 0,
    },
    temperature: 298,
    difficulty: 'beginner',
    descriptionIs:
      'Ediksyra (0.100 M) er leyst i vatni. Reiknadhu pH lausnarinnar med Ka = 1.8e-5.',
    description:
      'Acetic acid (0.100 M) is dissolved in water. Calculate the pH using Ka = 1.8e-5.',
    targetSpecies: 'H+',
    hints: {
      topic: 'Veik syra jafnvaegis vandamal. Ka er litid svo 5% nalgun virkar.',
      strategy:
        'Settu upp ICE: CH3COOH byrjar a 0.100 M, myndefni a 0. Breyting: -x, +x, +x',
      method:
        'Ka = x^2/(0.100-x) approx x^2/0.100 (5% nalgun). x = sqrt(Ka * 0.100)',
      solution:
        'x = sqrt(1.8e-5 * 0.100) = 1.34e-3 M = [H+]. pH = -log(1.34e-3) = 2.87',
    },
  },

  // =====================
  // INTERMEDIATE PROBLEMS
  // =====================
  {
    id: 4,
    equilibrium: getEquilibrium(3), // PCl5 <-> PCl3 + Cl2
    K: 0.042,
    Ktype: 'Kc',
    initialConcentrations: {
      'PCl5': 0.200,
      'PCl3': 0.050,
      'Cl2': 0.050,
    },
    temperature: 523,
    difficulty: 'intermediate',
    descriptionIs:
      'PCl5 hvarf byrjar med oll thrju efnin til stadar. Reiknadhu jafnvaegisstyrkleika og akvardhadu hvora leidh hvarf id faer ist.',
    description:
      'PCl5 reaction starts with all three species present. Calculate equilibrium concentrations and determine shift direction.',
    hints: {
      topic:
        'Q vs K samanburdhur akvardar stefnu. Reiknadhu Q fyrst, berdhu saman vid K.',
      strategy:
        'Q = [PCl3][Cl2]/[PCl5] = (0.050)(0.050)/0.200 = 0.0125. Q < K svo hvarf id faer ist til haegri.',
      method:
        'ICE: PCl5 minnkar um x, PCl3 og Cl2 aukast um x. K = (0.050+x)^2/(0.200-x) = 0.042',
      solution:
        'Leysa ferningsjofnu: x = 0.0386 M. [PCl5] = 0.161 M, [PCl3] = [Cl2] = 0.0886 M',
    },
  },
  {
    id: 5,
    equilibrium: getEquilibrium(11), // N2 + 3H2 <-> 2NH3 (Haber)
    K: 4.34e-3,
    Ktype: 'Kc',
    initialConcentrations: {
      'N2': 1.00,
      'H2': 1.00,
      'NH3': 0,
    },
    temperature: 673,
    difficulty: 'intermediate',
    descriptionIs:
      'Haber ferlid: N2 og H2 (1.00 M hvor) hvarfast vid 400C. Reiknadhu magn ammonlaks sem myndast.',
    description:
      'Haber process: N2 and H2 (1.00 M each) react at 400C. Calculate the amount of ammonia formed.',
    targetSpecies: 'NH3',
    hints: {
      topic:
        'Haber ferli med 1:3:2 hlutfall. Litid K thydur litid NH3 vid jafnvaegi.',
      strategy:
        'ICE: N2 minnkar um x, H2 um 3x, NH3 eykst um 2x. Thetta er floknara hlutfall.',
      method:
        'K = [NH3]^2/([N2][H2]^3) = (2x)^2/((1-x)(1-3x)^3) = 4.34e-3. Notadhu nalgun thar sem K er litid.',
      solution:
        'Med nalgun: 4x^2/(1)(1)^3 approx 4.34e-3, x approx 0.033 M. [NH3] approx 0.066 M',
    },
  },
  {
    id: 6,
    equilibrium: getEquilibrium(12), // 2SO2 + O2 <-> 2SO3 (Contact)
    K: 1.7e6,
    Ktype: 'Kc',
    initialConcentrations: {
      'SO2': 0.200,
      'O2': 0.100,
      'SO3': 0,
    },
    temperature: 700,
    difficulty: 'intermediate',
    descriptionIs:
      'Snertiferli: Brennisteinsdioxid og surefni hvarfast. Mjog hatt K thydur naestum algjora umbreytingu.',
    description:
      'Contact process: Sulfur dioxide and oxygen react. Very high K means nearly complete conversion.',
    hints: {
      topic: 'Mjog hatt K (1.7e6) thydur ad hvarf id fer naestum alveg til haegri.',
      strategy:
        'Thegar K er mjog hatt, gerum radh fyrir naestum fullkominni umbreytingu og vinnum afturabak.',
      method:
        'Takmarkandi hvarfefni: O2 (0.100 M gerir 0.200 M SO3). Notadhu x fyrir thad sem er eftir.',
      solution:
        '[SO3] approx 0.200 M, [O2] approx 0 M (mjog litid), [SO2] approx 0 M (mjog litid)',
    },
  },

  // =====================
  // ADVANCED PROBLEMS
  // =====================
  {
    id: 7,
    equilibrium: getEquilibrium(1), // N2O4 <-> 2NO2 (pressure problem)
    K: 0.115, // Kp at different conditions
    Ktype: 'Kp',
    initialConcentrations: {
      'N2O4': 1.0, // atm
      'NO2': 0,
    },
    temperature: 373,
    difficulty: 'advanced',
    descriptionIs:
      'N2O4 hvarf vid 100C med Kp = 0.115 atm. Upphafsthrystingur N2O4 er 1.0 atm. Finndu jafnvaegisthrysking.',
    description:
      'N2O4 reaction at 100C with Kp = 0.115 atm. Initial pressure of N2O4 is 1.0 atm. Find equilibrium pressures.',
    hints: {
      topic: 'Kp vandamal med hlutthrysking i stadh styrks. Sama adhferd en med atm.',
      strategy:
        'Kp = P(NO2)^2/P(N2O4) = (2x)^2/(1.0-x). Heildarmolar breytast (1 -> 2).',
      method:
        '4x^2/(1-x) = 0.115. Thetta er ferningsjafna: 4x^2 + 0.115x - 0.115 = 0',
      solution:
        'x = 0.155 atm. P(N2O4) = 0.845 atm, P(NO2) = 0.310 atm. Heildarthrystingur = 1.155 atm',
    },
  },
  {
    id: 8,
    equilibrium: getEquilibrium(5), // CaCO3 <-> CaO + CO2 (heterogeneous)
    K: 1.9e-3, // Kp
    Ktype: 'Kp',
    initialConcentrations: {
      'CO2': 0,
      // CaCO3 and CaO are solids, not included in K
    },
    temperature: 1073,
    difficulty: 'advanced',
    descriptionIs:
      'Kalksteinn brotnar nidur: CaCO3(s) <-> CaO(s) + CO2(g). Kp = 1.9e-3 atm vid 800C. Finndu jafnvaegisthrysking CO2.',
    description:
      'Limestone decomposition: CaCO3(s) <-> CaO(s) + CO2(g). Kp = 1.9e-3 atm at 800C. Find equilibrium CO2 pressure.',
    targetSpecies: 'CO2',
    hints: {
      topic:
        'Misleitt jafnvaegi - fost efni eru ekki i K tjáningu. Kp = P(CO2) eingongu.',
      strategy: 'Fyrir misleitt jafnvaegi: Kp = P(CO2) beint.',
      method: 'Einfalt: Jafnvaegisthrystingur CO2 = Kp',
      solution: 'P(CO2) = 1.9e-3 atm = 1.9 mbar',
    },
  },
  {
    id: 9,
    equilibrium: getEquilibrium(11), // Haber with reverse
    K: 4.34e-3,
    Ktype: 'Kc',
    initialConcentrations: {
      'N2': 0,
      'H2': 0,
      'NH3': 1.00,
    },
    temperature: 673,
    difficulty: 'advanced',
    descriptionIs:
      'Ammoniak (1.00 M) er sett i tomt ilat og sundrast. Hversu mikid er eftir vid jafnvaegi?',
    description:
      'Ammonia (1.00 M) is placed in an empty container and decomposes. How much remains at equilibrium?',
    targetSpecies: 'NH3',
    hints: {
      topic:
        'Ofugt Haber ferli - ammoniak sundrast. Q = infinity (ekkert hvarfefni) svo hvarf id fer til vinstri.',
      strategy:
        'ICE: NH3 minnkar um 2x, N2 eykst um x, H2 eykst um 3x (ofug studlar)',
      method:
        'K = (2x)^2/((x)(3x)^3) = 4x^2/(27x^4) = 4/(27x^2) = 4.34e-3. Leysa fyrir x.',
      solution:
        'x^2 = 4/(27 * 4.34e-3) = 34.2, x = 5.85... en x <= 0.5 (takmarkar). Nota adra nalgun.',
    },
  },
  {
    id: 10,
    equilibrium: getEquilibrium(2), // H2 + I2 with initial HI
    K: 54.3,
    Ktype: 'Kc',
    initialConcentrations: {
      'H2': 0.100,
      'I2': 0.200,
      'HI': 0.300,
    },
    temperature: 448,
    difficulty: 'advanced',
    descriptionIs:
      'H2/I2/HI blanda med ojofnum styrk. Akvardhadu hvora leidh hvarf id faer ist og reiknadhu jafnvaegisstyrkleika.',
    description:
      'H2/I2/HI mixture with unequal concentrations. Determine shift direction and calculate equilibrium concentrations.',
    hints: {
      topic:
        'Thegar oll efni eru til stadar, reiknadhu Q fyrst til ad akvartha stefnu.',
      strategy:
        'Q = [HI]^2/([H2][I2]) = (0.300)^2/((0.100)(0.200)) = 4.5. Q < K = 54.3 svo hvarf id fer til haegri.',
      method:
        'ICE med jakvaedhri x (til haegri): K = (0.300+2x)^2/((0.100-x)(0.200-x)) = 54.3',
      solution:
        'Leysa ferningsjofnu: x approx 0.0733 M. [H2] = 0.027 M, [I2] = 0.127 M, [HI] = 0.447 M',
    },
  },
];

// Export problem counts by difficulty
export const problemCounts = {
  beginner: iceProblems.filter((p) => p.difficulty === 'beginner').length,
  intermediate: iceProblems.filter((p) => p.difficulty === 'intermediate').length,
  advanced: iceProblems.filter((p) => p.difficulty === 'advanced').length,
  total: iceProblems.length,
};

// Get problems by difficulty
export function getProblemsByDifficulty(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): ICETableProblem[] {
  return iceProblems.filter((p) => p.difficulty === difficulty);
}

// Get a random problem
export function getRandomProblem(
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
): ICETableProblem {
  const pool = difficulty ? getProblemsByDifficulty(difficulty) : iceProblems;
  return pool[Math.floor(Math.random() * pool.length)];
}
