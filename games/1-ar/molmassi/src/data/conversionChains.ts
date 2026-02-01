// Mole Conversion Chain Problems
// Mass → Moles → Molecules → Atoms

export interface ConversionStep {
  from: 'mass' | 'moles' | 'molecules' | 'atoms';
  to: 'mass' | 'moles' | 'molecules' | 'atoms';
  conversionFactor: string;
  conversionFactorEn: string;
}

export interface ConversionChainProblem {
  id: string;
  compound: {
    formula: string;
    name: string;
    nameEn: string;
    molarMass: number;
    atomsPerMolecule: number; // Total atoms in one molecule
  };
  givenValue: number;
  givenUnit: 'mass' | 'moles' | 'molecules' | 'atoms';
  targetUnit: 'mass' | 'moles' | 'molecules' | 'atoms';
  difficulty: 'easy' | 'medium' | 'hard';
  steps: ConversionStep[];
}

export const AVOGADRO = 6.022e23;

// Conversion factors explanations
export const CONVERSION_EXPLANATIONS = {
  mass_to_moles: {
    is: 'Deila með mólmassa (g/mól)',
    en: 'Divide by molar mass (g/mol)',
    formula: 'n = m / M',
  },
  moles_to_mass: {
    is: 'Margfalda með mólmassa (g/mól)',
    en: 'Multiply by molar mass (g/mol)',
    formula: 'm = n × M',
  },
  moles_to_molecules: {
    is: 'Margfalda með Avogadro tölu',
    en: 'Multiply by Avogadro\'s number',
    formula: 'N = n × Nₐ',
  },
  molecules_to_moles: {
    is: 'Deila með Avogadro tölu',
    en: 'Divide by Avogadro\'s number',
    formula: 'n = N / Nₐ',
  },
  molecules_to_atoms: {
    is: 'Margfalda með fjölda atóma í sameind',
    en: 'Multiply by atoms per molecule',
    formula: 'atoms = molecules × atoms/molecule',
  },
  atoms_to_molecules: {
    is: 'Deila með fjölda atóma í sameind',
    en: 'Divide by atoms per molecule',
    formula: 'molecules = atoms / atoms/molecule',
  },
};

// Unit labels
export const UNIT_LABELS = {
  mass: { is: 'grömm (g)', en: 'grams (g)', short: 'g' },
  moles: { is: 'mól', en: 'moles', short: 'mól' },
  molecules: { is: 'sameindir', en: 'molecules', short: 'sam.' },
  atoms: { is: 'atóm', en: 'atoms', short: 'atóm' },
};

// Calculate intermediate and final values
export function calculateChainValues(
  problem: ConversionChainProblem
): { unit: string; value: number }[] {
  const results: { unit: string; value: number }[] = [];
  let currentValue = problem.givenValue;
  let currentUnit = problem.givenUnit;

  results.push({ unit: currentUnit, value: currentValue });

  for (const step of problem.steps) {
    if (step.from === 'mass' && step.to === 'moles') {
      currentValue = currentValue / problem.compound.molarMass;
    } else if (step.from === 'moles' && step.to === 'mass') {
      currentValue = currentValue * problem.compound.molarMass;
    } else if (step.from === 'moles' && step.to === 'molecules') {
      currentValue = currentValue * AVOGADRO;
    } else if (step.from === 'molecules' && step.to === 'moles') {
      currentValue = currentValue / AVOGADRO;
    } else if (step.from === 'molecules' && step.to === 'atoms') {
      currentValue = currentValue * problem.compound.atomsPerMolecule;
    } else if (step.from === 'atoms' && step.to === 'molecules') {
      currentValue = currentValue / problem.compound.atomsPerMolecule;
    }
    currentUnit = step.to;
    results.push({ unit: currentUnit, value: currentValue });
  }

  return results;
}

// Problems database
export const CONVERSION_CHAIN_PROBLEMS: ConversionChainProblem[] = [
  // EASY: Two-step conversions
  {
    id: 'cc1',
    compound: { formula: 'H₂O', name: 'Vatn', nameEn: 'Water', molarMass: 18.015, atomsPerMolecule: 3 },
    givenValue: 18.015,
    givenUnit: 'mass',
    targetUnit: 'molecules',
    difficulty: 'easy',
    steps: [
      { from: 'mass', to: 'moles', conversionFactor: '÷ 18.015 g/mól', conversionFactorEn: '÷ 18.015 g/mol' },
      { from: 'moles', to: 'molecules', conversionFactor: '× 6.022×10²³', conversionFactorEn: '× 6.022×10²³' },
    ],
  },
  {
    id: 'cc2',
    compound: { formula: 'CO₂', name: 'Koltvísýringur', nameEn: 'Carbon dioxide', molarMass: 44.01, atomsPerMolecule: 3 },
    givenValue: 88.02,
    givenUnit: 'mass',
    targetUnit: 'moles',
    difficulty: 'easy',
    steps: [
      { from: 'mass', to: 'moles', conversionFactor: '÷ 44.01 g/mól', conversionFactorEn: '÷ 44.01 g/mol' },
    ],
  },
  {
    id: 'cc3',
    compound: { formula: 'NaCl', name: 'Borðsalt', nameEn: 'Table salt', molarMass: 58.44, atomsPerMolecule: 2 },
    givenValue: 2,
    givenUnit: 'moles',
    targetUnit: 'molecules',
    difficulty: 'easy',
    steps: [
      { from: 'moles', to: 'molecules', conversionFactor: '× 6.022×10²³', conversionFactorEn: '× 6.022×10²³' },
    ],
  },
  {
    id: 'cc4',
    compound: { formula: 'O₂', name: 'Súrefni', nameEn: 'Oxygen', molarMass: 32.00, atomsPerMolecule: 2 },
    givenValue: 6.022e23,
    givenUnit: 'molecules',
    targetUnit: 'mass',
    difficulty: 'easy',
    steps: [
      { from: 'molecules', to: 'moles', conversionFactor: '÷ 6.022×10²³', conversionFactorEn: '÷ 6.022×10²³' },
      { from: 'moles', to: 'mass', conversionFactor: '× 32.00 g/mól', conversionFactorEn: '× 32.00 g/mol' },
    ],
  },

  // MEDIUM: Three-step conversions
  {
    id: 'cc5',
    compound: { formula: 'H₂O', name: 'Vatn', nameEn: 'Water', molarMass: 18.015, atomsPerMolecule: 3 },
    givenValue: 36.03,
    givenUnit: 'mass',
    targetUnit: 'atoms',
    difficulty: 'medium',
    steps: [
      { from: 'mass', to: 'moles', conversionFactor: '÷ 18.015 g/mól', conversionFactorEn: '÷ 18.015 g/mol' },
      { from: 'moles', to: 'molecules', conversionFactor: '× 6.022×10²³', conversionFactorEn: '× 6.022×10²³' },
      { from: 'molecules', to: 'atoms', conversionFactor: '× 3 atóm/sameind', conversionFactorEn: '× 3 atoms/molecule' },
    ],
  },
  {
    id: 'cc6',
    compound: { formula: 'CH₄', name: 'Metan', nameEn: 'Methane', molarMass: 16.04, atomsPerMolecule: 5 },
    givenValue: 32.08,
    givenUnit: 'mass',
    targetUnit: 'atoms',
    difficulty: 'medium',
    steps: [
      { from: 'mass', to: 'moles', conversionFactor: '÷ 16.04 g/mól', conversionFactorEn: '÷ 16.04 g/mol' },
      { from: 'moles', to: 'molecules', conversionFactor: '× 6.022×10²³', conversionFactorEn: '× 6.022×10²³' },
      { from: 'molecules', to: 'atoms', conversionFactor: '× 5 atóm/sameind', conversionFactorEn: '× 5 atoms/molecule' },
    ],
  },
  {
    id: 'cc7',
    compound: { formula: 'NH₃', name: 'Ammóníak', nameEn: 'Ammonia', molarMass: 17.03, atomsPerMolecule: 4 },
    givenValue: 2.4088e24,
    givenUnit: 'atoms',
    targetUnit: 'mass',
    difficulty: 'medium',
    steps: [
      { from: 'atoms', to: 'molecules', conversionFactor: '÷ 4 atóm/sameind', conversionFactorEn: '÷ 4 atoms/molecule' },
      { from: 'molecules', to: 'moles', conversionFactor: '÷ 6.022×10²³', conversionFactorEn: '÷ 6.022×10²³' },
      { from: 'moles', to: 'mass', conversionFactor: '× 17.03 g/mól', conversionFactorEn: '× 17.03 g/mol' },
    ],
  },
  {
    id: 'cc8',
    compound: { formula: 'C₂H₆', name: 'Etan', nameEn: 'Ethane', molarMass: 30.07, atomsPerMolecule: 8 },
    givenValue: 1.5,
    givenUnit: 'moles',
    targetUnit: 'atoms',
    difficulty: 'medium',
    steps: [
      { from: 'moles', to: 'molecules', conversionFactor: '× 6.022×10²³', conversionFactorEn: '× 6.022×10²³' },
      { from: 'molecules', to: 'atoms', conversionFactor: '× 8 atóm/sameind', conversionFactorEn: '× 8 atoms/molecule' },
    ],
  },

  // HARD: Complex conversions with larger molecules
  {
    id: 'cc9',
    compound: { formula: 'C₆H₁₂O₆', name: 'Glúkósi', nameEn: 'Glucose', molarMass: 180.16, atomsPerMolecule: 24 },
    givenValue: 90.08,
    givenUnit: 'mass',
    targetUnit: 'atoms',
    difficulty: 'hard',
    steps: [
      { from: 'mass', to: 'moles', conversionFactor: '÷ 180.16 g/mól', conversionFactorEn: '÷ 180.16 g/mol' },
      { from: 'moles', to: 'molecules', conversionFactor: '× 6.022×10²³', conversionFactorEn: '× 6.022×10²³' },
      { from: 'molecules', to: 'atoms', conversionFactor: '× 24 atóm/sameind', conversionFactorEn: '× 24 atoms/molecule' },
    ],
  },
  {
    id: 'cc10',
    compound: { formula: 'H₂SO₄', name: 'Brennisteinssýra', nameEn: 'Sulfuric acid', molarMass: 98.08, atomsPerMolecule: 7 },
    givenValue: 4.2154e25,
    givenUnit: 'atoms',
    targetUnit: 'mass',
    difficulty: 'hard',
    steps: [
      { from: 'atoms', to: 'molecules', conversionFactor: '÷ 7 atóm/sameind', conversionFactorEn: '÷ 7 atoms/molecule' },
      { from: 'molecules', to: 'moles', conversionFactor: '÷ 6.022×10²³', conversionFactorEn: '÷ 6.022×10²³' },
      { from: 'moles', to: 'mass', conversionFactor: '× 98.08 g/mól', conversionFactorEn: '× 98.08 g/mol' },
    ],
  },
  {
    id: 'cc11',
    compound: { formula: 'Ca(OH)₂', name: 'Kalsíumhýdroxíð', nameEn: 'Calcium hydroxide', molarMass: 74.09, atomsPerMolecule: 5 },
    givenValue: 3.011e24,
    givenUnit: 'molecules',
    targetUnit: 'mass',
    difficulty: 'hard',
    steps: [
      { from: 'molecules', to: 'moles', conversionFactor: '÷ 6.022×10²³', conversionFactorEn: '÷ 6.022×10²³' },
      { from: 'moles', to: 'mass', conversionFactor: '× 74.09 g/mól', conversionFactorEn: '× 74.09 g/mol' },
    ],
  },
  {
    id: 'cc12',
    compound: { formula: 'C₁₂H₂₂O₁₁', name: 'Súkrósi', nameEn: 'Sucrose', molarMass: 342.30, atomsPerMolecule: 45 },
    givenValue: 171.15,
    givenUnit: 'mass',
    targetUnit: 'atoms',
    difficulty: 'hard',
    steps: [
      { from: 'mass', to: 'moles', conversionFactor: '÷ 342.30 g/mól', conversionFactorEn: '÷ 342.30 g/mol' },
      { from: 'moles', to: 'molecules', conversionFactor: '× 6.022×10²³', conversionFactorEn: '× 6.022×10²³' },
      { from: 'molecules', to: 'atoms', conversionFactor: '× 45 atóm/sameind', conversionFactorEn: '× 45 atoms/molecule' },
    ],
  },
];

// Format scientific notation for display
export function formatScientific(num: number): string {
  if (Math.abs(num) >= 1e6 || (Math.abs(num) < 0.001 && num !== 0)) {
    const exp = Math.floor(Math.log10(Math.abs(num)));
    const mantissa = num / Math.pow(10, exp);
    const superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
    const expStr = Math.abs(exp).toString().split('').map(d => superscripts[parseInt(d)]).join('');
    const sign = exp < 0 ? '⁻' : '';
    return `${mantissa.toFixed(2)} × 10${sign}${expStr}`;
  }
  return num.toFixed(2);
}
