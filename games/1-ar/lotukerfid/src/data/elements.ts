// Periodic Table Element Data - First 36 Elements (H through Kr)

export type ElementCategory = 'metal' | 'nonmetal' | 'metalloid';

export type ElementGroup =
  | 'alkali'           // Alkalí málmar (Group 1, except H)
  | 'alkaline-earth'   // Jarðalkalí málmar (Group 2)
  | 'transition'       // Hliðarmálmar (Groups 3-12)
  | 'halogen'          // Halógen (Group 17)
  | 'noble-gas'        // Eðalgös (Group 18)
  | 'other-metal'      // Aðrir málmar
  | 'other-nonmetal'   // Aðrir málmleysingjar
  | 'metalloid';       // Hálfmálmar

export interface Element {
  atomicNumber: number;
  symbol: string;
  nameIs: string;       // Icelandic name
  nameEn: string;       // English name
  atomicMass: number;
  category: ElementCategory;
  group: ElementGroup;
  period: number;       // Row (1-4)
  column: number;       // Column (1-18)
  electronConfig: string;
  funFact?: string;     // Icelandic fun fact
  funFactEn?: string;   // English fun fact
}

// Color mapping for element categories
export const CATEGORY_COLORS: Record<ElementCategory, { bg: string; text: string; border: string }> = {
  metal: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-400' },
  nonmetal: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-400' },
  metalloid: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-400' },
};

export const CATEGORY_HEX: Record<ElementCategory, string> = {
  metal: '#3b82f6',
  nonmetal: '#22c55e',
  metalloid: '#f59e0b',
};

// Color mapping for element groups
export const GROUP_COLORS: Record<ElementGroup, { bg: string; text: string; hex: string }> = {
  'alkali':         { bg: 'bg-red-100',    text: 'text-red-800',    hex: '#ef4444' },
  'alkaline-earth': { bg: 'bg-orange-100', text: 'text-orange-800', hex: '#f97316' },
  'transition':     { bg: 'bg-blue-100',   text: 'text-blue-800',   hex: '#3b82f6' },
  'halogen':        { bg: 'bg-teal-100',   text: 'text-teal-800',   hex: '#14b8a6' },
  'noble-gas':      { bg: 'bg-purple-100', text: 'text-purple-800', hex: '#a855f7' },
  'other-metal':    { bg: 'bg-sky-100',    text: 'text-sky-800',    hex: '#0ea5e9' },
  'other-nonmetal': { bg: 'bg-green-100',  text: 'text-green-800',  hex: '#22c55e' },
  'metalloid':      { bg: 'bg-amber-100',  text: 'text-amber-800',  hex: '#f59e0b' },
};

export const GROUP_NAMES_IS: Record<ElementGroup, string> = {
  'alkali':         'Alkalí málmar',
  'alkaline-earth': 'Jarðalkalí málmar',
  'transition':     'Hliðarmálmar',
  'halogen':        'Halógen',
  'noble-gas':      'Eðalgös',
  'other-metal':    'Aðrir málmar',
  'other-nonmetal': 'Aðrir málmleysingjar',
  'metalloid':      'Hálfmálmar',
};

export const GROUP_NAMES_EN: Record<ElementGroup, string> = {
  'alkali':         'Alkali metals',
  'alkaline-earth': 'Alkaline earth metals',
  'transition':     'Transition metals',
  'halogen':        'Halogens',
  'noble-gas':      'Noble gases',
  'other-metal':    'Other metals',
  'other-nonmetal': 'Other nonmetals',
  'metalloid':      'Metalloids',
};

export const CATEGORY_NAMES_IS: Record<ElementCategory, string> = {
  metal: 'Málmur',
  nonmetal: 'Málmleysingi',
  metalloid: 'Hálfmálmur',
};

export const CATEGORY_NAMES_EN: Record<ElementCategory, string> = {
  metal: 'Metal',
  nonmetal: 'Nonmetal',
  metalloid: 'Metalloid',
};

/**
 * First 36 elements (H through Kr) with accurate chemical data
 * and correct periodic table positions (period = row, column = 1-18)
 */
export const ELEMENTS: Element[] = [
  // Period 1
  {
    atomicNumber: 1, symbol: 'H', nameIs: 'Vetni', nameEn: 'Hydrogen',
    atomicMass: 1.008, category: 'nonmetal', group: 'other-nonmetal',
    period: 1, column: 1, electronConfig: '1s1',
    funFact: 'Vetni er algengasta frumefnið í alheiminum.',
    funFactEn: 'Hydrogen is the most abundant element in the universe.',
  },
  {
    atomicNumber: 2, symbol: 'He', nameIs: 'Helín', nameEn: 'Helium',
    atomicMass: 4.003, category: 'nonmetal', group: 'noble-gas',
    period: 1, column: 18, electronConfig: '1s2',
    funFact: 'Helín er svo létt að það flýr úr andrúmslofti jarðar.',
    funFactEn: 'Helium is so light it escapes Earth\'s atmosphere.',
  },

  // Period 2
  {
    atomicNumber: 3, symbol: 'Li', nameIs: 'Litín', nameEn: 'Lithium',
    atomicMass: 6.941, category: 'metal', group: 'alkali',
    period: 2, column: 1, electronConfig: '[He] 2s1',
    funFact: 'Litín er léttasti málmurinn, það flýtur á vatni!',
    funFactEn: 'Lithium is the lightest metal, it floats on water!',
  },
  {
    atomicNumber: 4, symbol: 'Be', nameIs: 'Beryllín', nameEn: 'Beryllium',
    atomicMass: 9.012, category: 'metal', group: 'alkaline-earth',
    period: 2, column: 2, electronConfig: '[He] 2s2',
  },
  {
    atomicNumber: 5, symbol: 'B', nameIs: 'Bór', nameEn: 'Boron',
    atomicMass: 10.81, category: 'metalloid', group: 'metalloid',
    period: 2, column: 13, electronConfig: '[He] 2s2 2p1',
  },
  {
    atomicNumber: 6, symbol: 'C', nameIs: 'Kolefni', nameEn: 'Carbon',
    atomicMass: 12.01, category: 'nonmetal', group: 'other-nonmetal',
    period: 2, column: 14, electronConfig: '[He] 2s2 2p2',
    funFact: 'Kolefni er grundvöllur alls lífs á jörðinni.',
    funFactEn: 'Carbon is the basis of all life on Earth.',
  },
  {
    atomicNumber: 7, symbol: 'N', nameIs: 'Köfnunarefni', nameEn: 'Nitrogen',
    atomicMass: 14.01, category: 'nonmetal', group: 'other-nonmetal',
    period: 2, column: 15, electronConfig: '[He] 2s2 2p3',
    funFact: 'Köfnunarefni er 78% af andrúmslofti jarðar.',
    funFactEn: 'Nitrogen makes up 78% of Earth\'s atmosphere.',
  },
  {
    atomicNumber: 8, symbol: 'O', nameIs: 'Súrefni', nameEn: 'Oxygen',
    atomicMass: 16.00, category: 'nonmetal', group: 'other-nonmetal',
    period: 2, column: 16, electronConfig: '[He] 2s2 2p4',
    funFact: 'Súrefni er nauðsynlegt fyrir öndun og bruna.',
    funFactEn: 'Oxygen is essential for breathing and combustion.',
  },
  {
    atomicNumber: 9, symbol: 'F', nameIs: 'Flúor', nameEn: 'Fluorine',
    atomicMass: 19.00, category: 'nonmetal', group: 'halogen',
    period: 2, column: 17, electronConfig: '[He] 2s2 2p5',
    funFact: 'Flúor er rafneikvæðasta frumefnið.',
    funFactEn: 'Fluorine is the most electronegative element.',
  },
  {
    atomicNumber: 10, symbol: 'Ne', nameIs: 'Neon', nameEn: 'Neon',
    atomicMass: 20.18, category: 'nonmetal', group: 'noble-gas',
    period: 2, column: 18, electronConfig: '[He] 2s2 2p6',
    funFact: 'Neon ljós gefa frá sér rauðgult ljós.',
    funFactEn: 'Neon lights give off a red-orange glow.',
  },

  // Period 3
  {
    atomicNumber: 11, symbol: 'Na', nameIs: 'Natrín', nameEn: 'Sodium',
    atomicMass: 22.99, category: 'metal', group: 'alkali',
    period: 3, column: 1, electronConfig: '[Ne] 3s1',
    funFact: 'Natrín springur ef því er kastað í vatn!',
    funFactEn: 'Sodium explodes when thrown in water!',
  },
  {
    atomicNumber: 12, symbol: 'Mg', nameIs: 'Magnesín', nameEn: 'Magnesium',
    atomicMass: 24.31, category: 'metal', group: 'alkaline-earth',
    period: 3, column: 2, electronConfig: '[Ne] 3s2',
    funFact: 'Magnesín brennur með skærhvítu ljósi.',
    funFactEn: 'Magnesium burns with a brilliant white light.',
  },
  {
    atomicNumber: 13, symbol: 'Al', nameIs: 'Ál', nameEn: 'Aluminum',
    atomicMass: 26.98, category: 'metal', group: 'other-metal',
    period: 3, column: 13, electronConfig: '[Ne] 3s2 3p1',
    funFact: 'Ál er algengasti málmurinn í jarðskorpunni.',
    funFactEn: 'Aluminum is the most abundant metal in Earth\'s crust.',
  },
  {
    atomicNumber: 14, symbol: 'Si', nameIs: 'Kísill', nameEn: 'Silicon',
    atomicMass: 28.09, category: 'metalloid', group: 'metalloid',
    period: 3, column: 14, electronConfig: '[Ne] 3s2 3p2',
    funFact: 'Kísill er grundvöllur tölvukubba og flögur.',
    funFactEn: 'Silicon is the basis of computer chips.',
  },
  {
    atomicNumber: 15, symbol: 'P', nameIs: 'Fosfór', nameEn: 'Phosphorus',
    atomicMass: 30.97, category: 'nonmetal', group: 'other-nonmetal',
    period: 3, column: 15, electronConfig: '[Ne] 3s2 3p3',
  },
  {
    atomicNumber: 16, symbol: 'S', nameIs: 'Brennisteinn', nameEn: 'Sulfur',
    atomicMass: 32.07, category: 'nonmetal', group: 'other-nonmetal',
    period: 3, column: 16, electronConfig: '[Ne] 3s2 3p4',
    funFact: 'Brennisteinn hefur sterka lykt og er notaður í eldspýtur.',
    funFactEn: 'Sulfur has a strong smell and is used in matches.',
  },
  {
    atomicNumber: 17, symbol: 'Cl', nameIs: 'Klór', nameEn: 'Chlorine',
    atomicMass: 35.45, category: 'nonmetal', group: 'halogen',
    period: 3, column: 17, electronConfig: '[Ne] 3s2 3p5',
    funFact: 'Klór er notað til að sótthreinsa vatn.',
    funFactEn: 'Chlorine is used to disinfect water.',
  },
  {
    atomicNumber: 18, symbol: 'Ar', nameIs: 'Argon', nameEn: 'Argon',
    atomicMass: 39.95, category: 'nonmetal', group: 'noble-gas',
    period: 3, column: 18, electronConfig: '[Ne] 3s2 3p6',
    funFact: 'Argon er þriðja algengasta gasið í andrúmsloftinu.',
    funFactEn: 'Argon is the third most abundant gas in the atmosphere.',
  },

  // Period 4
  {
    atomicNumber: 19, symbol: 'K', nameIs: 'Kalín', nameEn: 'Potassium',
    atomicMass: 39.10, category: 'metal', group: 'alkali',
    period: 4, column: 1, electronConfig: '[Ar] 4s1',
    funFact: 'Kalín er nauðsynlegt fyrir taugaboð í líkamanum.',
    funFactEn: 'Potassium is essential for nerve signals in the body.',
  },
  {
    atomicNumber: 20, symbol: 'Ca', nameIs: 'Kalsín', nameEn: 'Calcium',
    atomicMass: 40.08, category: 'metal', group: 'alkaline-earth',
    period: 4, column: 2, electronConfig: '[Ar] 4s2',
    funFact: 'Kalsín er mikilvægur fyrir bein og tennur.',
    funFactEn: 'Calcium is important for bones and teeth.',
  },
  {
    atomicNumber: 21, symbol: 'Sc', nameIs: 'Skandín', nameEn: 'Scandium',
    atomicMass: 44.96, category: 'metal', group: 'transition',
    period: 4, column: 3, electronConfig: '[Ar] 3d1 4s2',
  },
  {
    atomicNumber: 22, symbol: 'Ti', nameIs: 'Títan', nameEn: 'Titanium',
    atomicMass: 47.87, category: 'metal', group: 'transition',
    period: 4, column: 4, electronConfig: '[Ar] 3d2 4s2',
    funFact: 'Títan er sterkur en léttur málmur, notaður í flugvélar.',
    funFactEn: 'Titanium is strong but light, used in aircraft.',
  },
  {
    atomicNumber: 23, symbol: 'V', nameIs: 'Vanadín', nameEn: 'Vanadium',
    atomicMass: 50.94, category: 'metal', group: 'transition',
    period: 4, column: 5, electronConfig: '[Ar] 3d3 4s2',
  },
  {
    atomicNumber: 24, symbol: 'Cr', nameIs: 'Króm', nameEn: 'Chromium',
    atomicMass: 52.00, category: 'metal', group: 'transition',
    period: 4, column: 6, electronConfig: '[Ar] 3d5 4s1',
    funFact: 'Króm gefur ryðfríu stáli gljáandi yfirborð.',
    funFactEn: 'Chromium gives stainless steel its shiny surface.',
  },
  {
    atomicNumber: 25, symbol: 'Mn', nameIs: 'Mangan', nameEn: 'Manganese',
    atomicMass: 54.94, category: 'metal', group: 'transition',
    period: 4, column: 7, electronConfig: '[Ar] 3d5 4s2',
  },
  {
    atomicNumber: 26, symbol: 'Fe', nameIs: 'Járn', nameEn: 'Iron',
    atomicMass: 55.85, category: 'metal', group: 'transition',
    period: 4, column: 8, electronConfig: '[Ar] 3d6 4s2',
    funFact: 'Járn er algengasti málmurinn á jörðinni og í blóðinu.',
    funFactEn: 'Iron is the most common metal on Earth and in blood.',
  },
  {
    atomicNumber: 27, symbol: 'Co', nameIs: 'Kóbalt', nameEn: 'Cobalt',
    atomicMass: 58.93, category: 'metal', group: 'transition',
    period: 4, column: 9, electronConfig: '[Ar] 3d7 4s2',
  },
  {
    atomicNumber: 28, symbol: 'Ni', nameIs: 'Nikkel', nameEn: 'Nickel',
    atomicMass: 58.69, category: 'metal', group: 'transition',
    period: 4, column: 10, electronConfig: '[Ar] 3d8 4s2',
  },
  {
    atomicNumber: 29, symbol: 'Cu', nameIs: 'Kopar', nameEn: 'Copper',
    atomicMass: 63.55, category: 'metal', group: 'transition',
    period: 4, column: 11, electronConfig: '[Ar] 3d10 4s1',
    funFact: 'Kopar er einn af fáum málmum sem er ekki silfurgrár.',
    funFactEn: 'Copper is one of few metals that is not silver-gray.',
  },
  {
    atomicNumber: 30, symbol: 'Zn', nameIs: 'Sink', nameEn: 'Zinc',
    atomicMass: 65.38, category: 'metal', group: 'transition',
    period: 4, column: 12, electronConfig: '[Ar] 3d10 4s2',
  },
  {
    atomicNumber: 31, symbol: 'Ga', nameIs: 'Gallín', nameEn: 'Gallium',
    atomicMass: 69.72, category: 'metal', group: 'other-metal',
    period: 4, column: 13, electronConfig: '[Ar] 3d10 4s2 4p1',
    funFact: 'Gallín bráðnar í höndum þér, en er ekki eitrað!',
    funFactEn: 'Gallium melts in your hand, but is not poisonous!',
  },
  {
    atomicNumber: 32, symbol: 'Ge', nameIs: 'Germanín', nameEn: 'Germanium',
    atomicMass: 72.63, category: 'metalloid', group: 'metalloid',
    period: 4, column: 14, electronConfig: '[Ar] 3d10 4s2 4p2',
  },
  {
    atomicNumber: 33, symbol: 'As', nameIs: 'Arsen', nameEn: 'Arsenic',
    atomicMass: 74.92, category: 'metalloid', group: 'metalloid',
    period: 4, column: 15, electronConfig: '[Ar] 3d10 4s2 4p3',
  },
  {
    atomicNumber: 34, symbol: 'Se', nameIs: 'Selen', nameEn: 'Selenium',
    atomicMass: 78.97, category: 'nonmetal', group: 'other-nonmetal',
    period: 4, column: 16, electronConfig: '[Ar] 3d10 4s2 4p4',
  },
  {
    atomicNumber: 35, symbol: 'Br', nameIs: 'Bróm', nameEn: 'Bromine',
    atomicMass: 79.90, category: 'nonmetal', group: 'halogen',
    period: 4, column: 17, electronConfig: '[Ar] 3d10 4s2 4p5',
    funFact: 'Bróm er eitt af tveimur frumefnum sem er fljótandi við stofuhita.',
    funFactEn: 'Bromine is one of only two elements that is liquid at room temperature.',
  },
  {
    atomicNumber: 36, symbol: 'Kr', nameIs: 'Krypton', nameEn: 'Krypton',
    atomicMass: 83.80, category: 'nonmetal', group: 'noble-gas',
    period: 4, column: 18, electronConfig: '[Ar] 3d10 4s2 4p6',
    funFact: 'Krypton er raunverulegt frumefni, ekki bara frá ofurhetjusögu!',
    funFactEn: 'Krypton is a real element, not just from superhero stories!',
  },
];

/**
 * Helper to get an element by atomic number
 */
export function getElementById(atomicNumber: number): Element | undefined {
  return ELEMENTS.find(e => e.atomicNumber === atomicNumber);
}

/**
 * Helper to get an element by symbol
 */
export function getElementBySymbol(symbol: string): Element | undefined {
  return ELEMENTS.find(e => e.symbol === symbol);
}

/**
 * Helper to shuffle an array (Fisher-Yates)
 */
export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
