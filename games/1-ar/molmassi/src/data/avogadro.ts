// Avogadro's number and particle count problems
export const AVOGADRO_NUMBER = 6.022e23;
export const AVOGADRO_NUMBER_DISPLAY = '6.022 × 10²³';

export type AvogadroProblemType = 'moles_to_particles' | 'particles_to_moles' | 'atoms_in_compound';

export interface AvogadroProblem {
  id: string;
  type: AvogadroProblemType;
  compound: {
    formula: string;
    name: string;
    nameEn: string;
    molarMass: number;
  };
  given: number;
  givenUnit: 'moles' | 'particles' | 'grams';
  askFor: 'molecules' | 'atoms' | 'moles' | 'atoms_of_element';
  targetElement?: string; // For atoms_in_compound problems
  targetElementCount?: number; // Number of that element in formula
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
  hintEn: string;
}

// Problems organized by difficulty
export const AVOGADRO_PROBLEMS: AvogadroProblem[] = [
  // Easy: Simple moles to molecules/atoms
  {
    id: 'av1',
    type: 'moles_to_particles',
    compound: { formula: 'H₂O', name: 'Vatn', nameEn: 'Water', molarMass: 18.015 },
    given: 1,
    givenUnit: 'moles',
    askFor: 'molecules',
    correctAnswer: 6.022e23,
    difficulty: 'easy',
    hint: '1 mól = 6.022 × 10²³ agnir',
    hintEn: '1 mol = 6.022 × 10²³ particles',
  },
  {
    id: 'av2',
    type: 'moles_to_particles',
    compound: { formula: 'O₂', name: 'Súrefni', nameEn: 'Oxygen', molarMass: 31.998 },
    given: 2,
    givenUnit: 'moles',
    askFor: 'molecules',
    correctAnswer: 1.2044e24,
    difficulty: 'easy',
    hint: 'Margfaldaðu mól með Avogadro tölu',
    hintEn: 'Multiply moles by Avogadro\'s number',
  },
  {
    id: 'av3',
    type: 'moles_to_particles',
    compound: { formula: 'NaCl', name: 'Borðsalt', nameEn: 'Table salt', molarMass: 58.44 },
    given: 0.5,
    givenUnit: 'moles',
    askFor: 'molecules',
    correctAnswer: 3.011e23,
    difficulty: 'easy',
    hint: '0.5 mól = hálft Avogadro talan',
    hintEn: '0.5 mol = half of Avogadro\'s number',
  },
  {
    id: 'av4',
    type: 'particles_to_moles',
    compound: { formula: 'CO₂', name: 'Koltvísýringur', nameEn: 'Carbon dioxide', molarMass: 44.009 },
    given: 6.022e23,
    givenUnit: 'particles',
    askFor: 'moles',
    correctAnswer: 1,
    difficulty: 'easy',
    hint: 'Deildu með Avogadro tölu',
    hintEn: 'Divide by Avogadro\'s number',
  },

  // Medium: Atoms in compound and decimal moles
  {
    id: 'av5',
    type: 'atoms_in_compound',
    compound: { formula: 'H₂O', name: 'Vatn', nameEn: 'Water', molarMass: 18.015 },
    given: 1,
    givenUnit: 'moles',
    askFor: 'atoms_of_element',
    targetElement: 'H',
    targetElementCount: 2,
    correctAnswer: 1.2044e24,
    difficulty: 'medium',
    hint: 'Hvert H₂O sameind hefur 2 H atóm',
    hintEn: 'Each H₂O molecule has 2 H atoms',
  },
  {
    id: 'av6',
    type: 'atoms_in_compound',
    compound: { formula: 'CO₂', name: 'Koltvísýringur', nameEn: 'Carbon dioxide', molarMass: 44.009 },
    given: 1.5,
    givenUnit: 'moles',
    askFor: 'atoms_of_element',
    targetElement: 'O',
    targetElementCount: 2,
    correctAnswer: 1.8066e24,
    difficulty: 'medium',
    hint: 'Hver CO₂ sameind hefur 2 súrefnisatóm',
    hintEn: 'Each CO₂ molecule has 2 oxygen atoms',
  },
  {
    id: 'av7',
    type: 'moles_to_particles',
    compound: { formula: 'NH₃', name: 'Ammóníak', nameEn: 'Ammonia', molarMass: 17.031 },
    given: 2.5,
    givenUnit: 'moles',
    askFor: 'molecules',
    correctAnswer: 1.5055e24,
    difficulty: 'medium',
    hint: 'Mól × NA = fjöldi sameinda',
    hintEn: 'Moles × NA = number of molecules',
  },
  {
    id: 'av8',
    type: 'particles_to_moles',
    compound: { formula: 'CH₄', name: 'Metan', nameEn: 'Methane', molarMass: 16.043 },
    given: 1.2044e24,
    givenUnit: 'particles',
    askFor: 'moles',
    correctAnswer: 2,
    difficulty: 'medium',
    hint: 'Agnir ÷ NA = mól',
    hintEn: 'Particles ÷ NA = moles',
  },

  // Hard: Multiple calculations and larger numbers
  {
    id: 'av9',
    type: 'atoms_in_compound',
    compound: { formula: 'C₆H₁₂O₆', name: 'Glúkósi', nameEn: 'Glucose', molarMass: 180.156 },
    given: 1,
    givenUnit: 'moles',
    askFor: 'atoms_of_element',
    targetElement: 'H',
    targetElementCount: 12,
    correctAnswer: 7.2264e24,
    difficulty: 'hard',
    hint: 'Hver glúkósasameind hefur 12 H atóm',
    hintEn: 'Each glucose molecule has 12 H atoms',
  },
  {
    id: 'av10',
    type: 'atoms_in_compound',
    compound: { formula: 'H₂SO₄', name: 'Brennisteinssýra', nameEn: 'Sulfuric acid', molarMass: 98.079 },
    given: 2,
    givenUnit: 'moles',
    askFor: 'atoms_of_element',
    targetElement: 'O',
    targetElementCount: 4,
    correctAnswer: 4.8176e24,
    difficulty: 'hard',
    hint: 'Hver H₂SO₄ sameind hefur 4 O atóm',
    hintEn: 'Each H₂SO₄ molecule has 4 O atoms',
  },
  {
    id: 'av11',
    type: 'particles_to_moles',
    compound: { formula: 'C₂H₅OH', name: 'Etanól', nameEn: 'Ethanol', molarMass: 46.069 },
    given: 3.011e24,
    givenUnit: 'particles',
    askFor: 'moles',
    correctAnswer: 5,
    difficulty: 'hard',
    hint: 'Deildu með 6.022 × 10²³',
    hintEn: 'Divide by 6.022 × 10²³',
  },
  {
    id: 'av12',
    type: 'moles_to_particles',
    compound: { formula: 'NaHCO₃', name: 'Matarsódi', nameEn: 'Baking soda', molarMass: 84.007 },
    given: 0.25,
    givenUnit: 'moles',
    askFor: 'molecules',
    correctAnswer: 1.5055e23,
    difficulty: 'hard',
    hint: '0.25 = 1/4, svo 1/4 × NA',
    hintEn: '0.25 = 1/4, so 1/4 × NA',
  },
];

// Format large numbers for display
export function formatScientificNotation(num: number): string {
  if (num >= 1e6 || num <= 1e-6) {
    const exp = Math.floor(Math.log10(num));
    const mantissa = num / Math.pow(10, exp);
    const superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];

    const expStr = exp.toString().split('').map(d => {
      if (d === '-') return '⁻';
      return superscripts[parseInt(d)];
    }).join('');

    return `${mantissa.toFixed(3)} × 10${expStr}`;
  }
  return num.toFixed(3);
}

// Check if answer is correct within tolerance (for scientific notation)
export function checkAnswer(userAnswer: number, correctAnswer: number): boolean {
  // Allow 5% tolerance for large numbers
  const tolerance = correctAnswer * 0.05;
  return Math.abs(userAnswer - correctAnswer) <= tolerance;
}

// Parse user input that might be in scientific notation
export function parseScientificInput(input: string): number | null {
  // Handle formats like "6.022e23", "6.022E23", "6.022 × 10^23", "6.022x10^23"
  let cleaned = input.trim()
    .replace(/×/g, 'e')
    .replace(/x/gi, 'e')
    .replace(/\s*\*\s*/g, 'e')
    .replace(/10\^/g, 'e')
    .replace(/10\s*\^/g, 'e')
    .replace(/\s+/g, '');

  // Handle superscript numbers
  const superscriptMap: Record<string, string> = {
    '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
    '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-'
  };

  Object.entries(superscriptMap).forEach(([sup, normal]) => {
    cleaned = cleaned.replace(new RegExp(sup, 'g'), normal);
  });

  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

// Avogadro analogies for visualization
export const AVOGADRO_ANALOGIES = [
  {
    analogy: 'Ef þú teldir 1 milljón atóm á sekúndu, myndi taka 19 milljón ár að telja 1 mól',
    analogyEn: 'If you counted 1 million atoms per second, it would take 19 million years to count 1 mole',
  },
  {
    analogy: '1 mól af pingpongkúlum myndi þekja yfirborð jarðar 60 km djúpu lagi',
    analogyEn: '1 mole of ping pong balls would cover Earth\'s surface 60 km deep',
  },
  {
    analogy: '1 mól af sekúndum = 19 billjón milljón ár (19 × 10¹⁵ ár)',
    analogyEn: '1 mole of seconds = 19 quadrillion years (19 × 10¹⁵ years)',
  },
];
