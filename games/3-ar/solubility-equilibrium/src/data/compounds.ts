/**
 * Ionic Compounds Data for Ksp/Solubility Equilibrium Game
 *
 * Ksp values at 25°C from standard reference tables
 */

import type { IonicCompound } from '../types';

export const compounds: IonicCompound[] = [
  // Silver halides (AB type)
  {
    formula: 'AgCl',
    name: 'Silver chloride',
    nameIs: 'Silfurklóríð',
    cation: 'Ag+',
    anion: 'Cl-',
    cationCoeff: 1,
    anionCoeff: 1,
    Ksp: 1.77e-10,
    molarMass: 143.32,
    color: 'white',
  },
  {
    formula: 'AgBr',
    name: 'Silver bromide',
    nameIs: 'Silfurbrómíð',
    cation: 'Ag+',
    anion: 'Br-',
    cationCoeff: 1,
    anionCoeff: 1,
    Ksp: 5.35e-13,
    molarMass: 187.77,
    color: 'pale yellow',
  },
  {
    formula: 'AgI',
    name: 'Silver iodide',
    nameIs: 'Silfurjóðíð',
    cation: 'Ag+',
    anion: 'I-',
    cationCoeff: 1,
    anionCoeff: 1,
    Ksp: 8.52e-17,
    molarMass: 234.77,
    color: 'yellow',
  },

  // Lead compounds (AB2 type)
  {
    formula: 'PbCl2',
    name: 'Lead(II) chloride',
    nameIs: 'Blýklóríð',
    cation: 'Pb2+',
    anion: 'Cl-',
    cationCoeff: 1,
    anionCoeff: 2,
    Ksp: 1.70e-5,
    molarMass: 278.11,
    color: 'white',
  },
  {
    formula: 'PbI2',
    name: 'Lead(II) iodide',
    nameIs: 'Blýjóðíð',
    cation: 'Pb2+',
    anion: 'I-',
    cationCoeff: 1,
    anionCoeff: 2,
    Ksp: 9.8e-9,
    molarMass: 461.01,
    color: 'golden yellow',
  },
  {
    formula: 'PbSO4',
    name: 'Lead(II) sulfate',
    nameIs: 'Blýsúlfat',
    cation: 'Pb2+',
    anion: 'SO4 2-',
    cationCoeff: 1,
    anionCoeff: 1,
    Ksp: 2.53e-8,
    molarMass: 303.26,
    color: 'white',
  },

  // Calcium compounds
  {
    formula: 'CaF2',
    name: 'Calcium fluoride',
    nameIs: 'Kalsíumflúoríð',
    cation: 'Ca2+',
    anion: 'F-',
    cationCoeff: 1,
    anionCoeff: 2,
    Ksp: 3.45e-11,
    molarMass: 78.07,
    color: 'white',
  },
  {
    formula: 'CaCO3',
    name: 'Calcium carbonate',
    nameIs: 'Kalsíumkarbónat',
    cation: 'Ca2+',
    anion: 'CO3 2-',
    cationCoeff: 1,
    anionCoeff: 1,
    Ksp: 3.36e-9,
    molarMass: 100.09,
    color: 'white',
  },
  {
    formula: 'CaSO4',
    name: 'Calcium sulfate',
    nameIs: 'Kalsíumsúlfat',
    cation: 'Ca2+',
    anion: 'SO4 2-',
    cationCoeff: 1,
    anionCoeff: 1,
    Ksp: 4.93e-5,
    molarMass: 136.14,
    color: 'white',
  },

  // Barium compounds
  {
    formula: 'BaSO4',
    name: 'Barium sulfate',
    nameIs: 'Baríumsúlfat',
    cation: 'Ba2+',
    anion: 'SO4 2-',
    cationCoeff: 1,
    anionCoeff: 1,
    Ksp: 1.08e-10,
    molarMass: 233.39,
    color: 'white',
  },
  {
    formula: 'BaCO3',
    name: 'Barium carbonate',
    nameIs: 'Baríumkarbónat',
    cation: 'Ba2+',
    anion: 'CO3 2-',
    cationCoeff: 1,
    anionCoeff: 1,
    Ksp: 2.58e-9,
    molarMass: 197.34,
    color: 'white',
  },

  // Magnesium compounds
  {
    formula: 'Mg(OH)2',
    name: 'Magnesium hydroxide',
    nameIs: 'Magnesíumhýdroxíð',
    cation: 'Mg2+',
    anion: 'OH-',
    cationCoeff: 1,
    anionCoeff: 2,
    Ksp: 5.61e-12,
    molarMass: 58.32,
    color: 'white',
  },
  {
    formula: 'MgCO3',
    name: 'Magnesium carbonate',
    nameIs: 'Magnesíumkarbónat',
    cation: 'Mg2+',
    anion: 'CO3 2-',
    cationCoeff: 1,
    anionCoeff: 1,
    Ksp: 6.82e-6,
    molarMass: 84.31,
    color: 'white',
  },

  // Iron compounds
  {
    formula: 'Fe(OH)2',
    name: 'Iron(II) hydroxide',
    nameIs: 'Járn(II)hýdroxíð',
    cation: 'Fe2+',
    anion: 'OH-',
    cationCoeff: 1,
    anionCoeff: 2,
    Ksp: 4.87e-17,
    molarMass: 89.86,
    color: 'green',
  },
  {
    formula: 'Fe(OH)3',
    name: 'Iron(III) hydroxide',
    nameIs: 'Járn(III)hýdroxíð',
    cation: 'Fe3+',
    anion: 'OH-',
    cationCoeff: 1,
    anionCoeff: 3,
    Ksp: 2.79e-39,
    molarMass: 106.87,
    color: 'rust brown',
  },

  // Copper compounds
  {
    formula: 'Cu(OH)2',
    name: 'Copper(II) hydroxide',
    nameIs: 'Kopar(II)hýdroxíð',
    cation: 'Cu2+',
    anion: 'OH-',
    cationCoeff: 1,
    anionCoeff: 2,
    Ksp: 2.2e-20,
    molarMass: 97.56,
    color: 'blue',
  },
  {
    formula: 'CuS',
    name: 'Copper(II) sulfide',
    nameIs: 'Kopar(II)súlfíð',
    cation: 'Cu2+',
    anion: 'S2-',
    cationCoeff: 1,
    anionCoeff: 1,
    Ksp: 6.3e-36,
    molarMass: 95.61,
    color: 'black',
  },

  // Zinc compounds
  {
    formula: 'Zn(OH)2',
    name: 'Zinc hydroxide',
    nameIs: 'Sinkhýdroxíð',
    cation: 'Zn2+',
    anion: 'OH-',
    cationCoeff: 1,
    anionCoeff: 2,
    Ksp: 3.0e-17,
    molarMass: 99.42,
    color: 'white',
  },
  {
    formula: 'ZnS',
    name: 'Zinc sulfide',
    nameIs: 'Sinksúlfíð',
    cation: 'Zn2+',
    anion: 'S2-',
    cationCoeff: 1,
    anionCoeff: 1,
    Ksp: 2.0e-25,
    molarMass: 97.47,
    color: 'white',
  },

  // Aluminum hydroxide (A(OH)3 type)
  {
    formula: 'Al(OH)3',
    name: 'Aluminum hydroxide',
    nameIs: 'Álhýdroxíð',
    cation: 'Al3+',
    anion: 'OH-',
    cationCoeff: 1,
    anionCoeff: 3,
    Ksp: 3.0e-34,
    molarMass: 78.00,
    color: 'white',
  },
];

/**
 * Get compounds by stoichiometry type
 */
export function getCompoundsByType(type: 'AB' | 'AB2' | 'AB3' | 'A3B' | 'A2B3'): IonicCompound[] {
  return compounds.filter((c) => {
    const { cationCoeff, anionCoeff } = c;
    switch (type) {
      case 'AB':
        return cationCoeff === 1 && anionCoeff === 1;
      case 'AB2':
        return cationCoeff === 1 && anionCoeff === 2;
      case 'AB3':
        return cationCoeff === 1 && anionCoeff === 3;
      case 'A3B':
        return cationCoeff === 3 && anionCoeff === 1;
      case 'A2B3':
        return cationCoeff === 2 && anionCoeff === 3;
      default:
        return false;
    }
  });
}

/**
 * Get compound by formula
 */
export function getCompoundByFormula(formula: string): IonicCompound | undefined {
  return compounds.find((c) => c.formula === formula);
}

/**
 * Get random compounds for comparison problems
 */
export function getRandomCompoundsForComparison(count: number = 3): IonicCompound[] {
  const shuffled = [...compounds].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get compounds with the same cation (for selective precipitation)
 */
export function getCompoundsWithSameCation(cation: string): IonicCompound[] {
  return compounds.filter((c) => c.cation === cation);
}

/**
 * Get compounds with the same anion (for common ion effect)
 */
export function getCompoundsWithSameAnion(anion: string): IonicCompound[] {
  return compounds.filter((c) => c.anion === anion);
}

/**
 * Calculate molar solubility from Ksp
 * For AxBy ⇌ xA^y+ + yB^x-
 * Ksp = (x·s)^x · (y·s)^y = x^x · y^y · s^(x+y)
 * s = (Ksp / (x^x · y^y))^(1/(x+y))
 */
export function calculateMolarSolubility(compound: IonicCompound): number {
  const { Ksp, cationCoeff, anionCoeff } = compound;
  const x = cationCoeff;
  const y = anionCoeff;
  const denominator = Math.pow(x, x) * Math.pow(y, y);
  return Math.pow(Ksp / denominator, 1 / (x + y));
}

/**
 * Calculate Ksp from molar solubility
 */
export function calculateKspFromSolubility(
  solubility: number,
  cationCoeff: number,
  anionCoeff: number
): number {
  const cationConc = cationCoeff * solubility;
  const anionConc = anionCoeff * solubility;
  return Math.pow(cationConc, cationCoeff) * Math.pow(anionConc, anionCoeff);
}

/**
 * Format Ksp expression for a compound
 * e.g., "Ksp = [Ag+][Cl-]" or "Ksp = [Pb2+][I-]²"
 */
export function formatKspExpression(compound: IonicCompound): string {
  const { cation, anion, cationCoeff, anionCoeff } = compound;
  const superscripts: Record<number, string> = { 2: '²', 3: '³', 4: '⁴' };

  let cationPart = `[${cation}]`;
  let anionPart = `[${anion}]`;

  if (cationCoeff > 1) {
    cationPart += superscripts[cationCoeff] || `^${cationCoeff}`;
  }
  if (anionCoeff > 1) {
    anionPart += superscripts[anionCoeff] || `^${anionCoeff}`;
  }

  return `Ksp = ${cationPart}${anionPart}`;
}

/**
 * Calculate Q (ion product) from given concentrations
 */
export function calculateQ(
  compound: IonicCompound,
  cationConc: number,
  anionConc: number
): number {
  return Math.pow(cationConc, compound.cationCoeff) * Math.pow(anionConc, compound.anionCoeff);
}

/**
 * Determine if precipitation will occur
 */
export function willPrecipitate(
  compound: IonicCompound,
  cationConc: number,
  anionConc: number
): { precipitates: boolean; Q: number; Ksp: number } {
  const Q = calculateQ(compound, cationConc, anionConc);
  return {
    precipitates: Q > compound.Ksp,
    Q,
    Ksp: compound.Ksp,
  };
}

export default compounds;
