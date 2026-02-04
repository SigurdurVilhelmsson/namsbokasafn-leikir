/**
 * Element data for the Atomic Structure game
 * Each element includes atomic number, symbol, name (IS/EN), and mass number
 * for building atoms in Level 1.
 */

export interface ElementData {
  id: string;
  symbol: string;
  nameIs: string;
  nameEn: string;
  atomicNumber: number; // protons
  massNumber: number;   // protons + neutrons
  // Electron shell configuration for Bohr model [K, L, M]
  electronShells: number[];
}

/**
 * Level 1: 12 atoms to build
 * Students determine protons, neutrons, and electrons from
 * the element name and mass number.
 *
 * For neutral atoms: protons = electrons = atomic number
 * neutrons = mass number - atomic number
 */
export const LEVEL1_ELEMENTS: ElementData[] = [
  {
    id: 'hydrogen',
    symbol: 'H',
    nameIs: 'Vetni',
    nameEn: 'Hydrogen',
    atomicNumber: 1,
    massNumber: 1,
    electronShells: [1],
  },
  {
    id: 'helium',
    symbol: 'He',
    nameIs: 'Helín',
    nameEn: 'Helium',
    atomicNumber: 2,
    massNumber: 4,
    electronShells: [2],
  },
  {
    id: 'lithium',
    symbol: 'Li',
    nameIs: 'Litín',
    nameEn: 'Lithium',
    atomicNumber: 3,
    massNumber: 7,
    electronShells: [2, 1],
  },
  {
    id: 'carbon',
    symbol: 'C',
    nameIs: 'Kolefni',
    nameEn: 'Carbon',
    atomicNumber: 6,
    massNumber: 12,
    electronShells: [2, 4],
  },
  {
    id: 'nitrogen',
    symbol: 'N',
    nameIs: 'Nitur',
    nameEn: 'Nitrogen',
    atomicNumber: 7,
    massNumber: 14,
    electronShells: [2, 5],
  },
  {
    id: 'oxygen',
    symbol: 'O',
    nameIs: 'Súrefni',
    nameEn: 'Oxygen',
    atomicNumber: 8,
    massNumber: 16,
    electronShells: [2, 6],
  },
  {
    id: 'sodium',
    symbol: 'Na',
    nameIs: 'Natrín',
    nameEn: 'Sodium',
    atomicNumber: 11,
    massNumber: 23,
    electronShells: [2, 8, 1],
  },
  {
    id: 'magnesium',
    symbol: 'Mg',
    nameIs: 'Magnesín',
    nameEn: 'Magnesium',
    atomicNumber: 12,
    massNumber: 24,
    electronShells: [2, 8, 2],
  },
  {
    id: 'aluminium',
    symbol: 'Al',
    nameIs: 'Ál',
    nameEn: 'Aluminium',
    atomicNumber: 13,
    massNumber: 27,
    electronShells: [2, 8, 3],
  },
  {
    id: 'silicon',
    symbol: 'Si',
    nameIs: 'Kísill',
    nameEn: 'Silicon',
    atomicNumber: 14,
    massNumber: 28,
    electronShells: [2, 8, 4],
  },
  {
    id: 'phosphorus',
    symbol: 'P',
    nameIs: 'Fosfór',
    nameEn: 'Phosphorus',
    atomicNumber: 15,
    massNumber: 31,
    electronShells: [2, 8, 5],
  },
  {
    id: 'chlorine',
    symbol: 'Cl',
    nameIs: 'Klór',
    nameEn: 'Chlorine',
    atomicNumber: 17,
    massNumber: 35,
    electronShells: [2, 8, 7],
  },
];

/**
 * Helper to shuffle an array (Fisher-Yates)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
