// Chemical elements database
export interface Element {
  symbol: string;
  name: string;
  atomicMass: number;
}

export const ELEMENTS: Element[] = [
  { symbol: 'H', name: 'Vetni', atomicMass: 1.008 },
  { symbol: 'C', name: 'Kolefni', atomicMass: 12.011 },
  { symbol: 'N', name: 'Köfnunarefni', atomicMass: 14.007 },
  { symbol: 'O', name: 'Súrefni', atomicMass: 15.999 },
  { symbol: 'F', name: 'Flúor', atomicMass: 18.998 },
  { symbol: 'Na', name: 'Natríum', atomicMass: 22.990 },
  { symbol: 'Mg', name: 'Magnesíum', atomicMass: 24.305 },
  { symbol: 'Al', name: 'Ál', atomicMass: 26.982 },
  { symbol: 'Si', name: 'Kísill', atomicMass: 28.086 },
  { symbol: 'P', name: 'Fosfór', atomicMass: 30.974 },
  { symbol: 'S', name: 'Brennisteinn', atomicMass: 32.06 },
  { symbol: 'Cl', name: 'Klór', atomicMass: 35.45 },
  { symbol: 'K', name: 'Kalíum', atomicMass: 39.098 },
  { symbol: 'Ca', name: 'Kalsíum', atomicMass: 40.078 },
  { symbol: 'Fe', name: 'Járn', atomicMass: 55.845 },
  { symbol: 'Cu', name: 'Kopar', atomicMass: 63.546 },
  { symbol: 'Zn', name: 'Sink', atomicMass: 65.38 },
  { symbol: 'Br', name: 'Bróm', atomicMass: 79.904 },
  { symbol: 'Ag', name: 'Silfur', atomicMass: 107.868 },
  { symbol: 'I', name: 'Joð', atomicMass: 126.904 },
];

// Helper to get element by symbol
export function getElementBySymbol(symbol: string): Element | undefined {
  return ELEMENTS.find(e => e.symbol === symbol);
}
