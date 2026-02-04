/**
 * Isotope data for Level 2 (Isotope Identification) and Level 3 (Average Atomic Mass)
 */

/**
 * Level 2: Isotope identification problems
 * Given atomic number (Z) and mass number (A), determine subatomic particles.
 * Includes isotope notation display.
 */
export interface IsotopeProblem {
  id: string;
  symbol: string;
  nameIs: string;
  nameEn: string;
  atomicNumber: number;  // Z = protons
  massNumber: number;    // A = protons + neutrons
  /** Notation display: superscript mass, subscript atomic number */
  notation: string;
  /** Educational hint about this isotope */
  hintIs: string;
  hintEn: string;
}

export const LEVEL2_ISOTOPES: IsotopeProblem[] = [
  {
    id: 'carbon-12',
    symbol: 'C',
    nameIs: 'Kolefni-12',
    nameEn: 'Carbon-12',
    atomicNumber: 6,
    massNumber: 12,
    notation: '\u00B9\u00B2\u2086C',
    hintIs: 'Kolefni-12 er algengasta samsæta kolefnis (98.9%). Hún er notuð sem viðmiðun fyrir atómmassaeininguna.',
    hintEn: 'Carbon-12 is the most common carbon isotope (98.9%). It is used as the reference for the atomic mass unit.',
  },
  {
    id: 'carbon-14',
    symbol: 'C',
    nameIs: 'Kolefni-14',
    nameEn: 'Carbon-14',
    atomicNumber: 6,
    massNumber: 14,
    notation: '\u00B9\u2074\u2086C',
    hintIs: 'Kolefni-14 er geislavirk samsæta sem notuð er í kolefnisaldursgreiningu. Hún hefur 2 nifteindir meira en C-12.',
    hintEn: 'Carbon-14 is a radioactive isotope used in carbon dating. It has 2 more neutrons than C-12.',
  },
  {
    id: 'hydrogen-1',
    symbol: 'H',
    nameIs: 'Vetni-1 (Prótín)',
    nameEn: 'Hydrogen-1 (Protium)',
    atomicNumber: 1,
    massNumber: 1,
    notation: '\u00B9\u2081H',
    hintIs: 'Venjulegt vetni hefur enga nifteindir - eina frumefnið sem getur það!',
    hintEn: 'Regular hydrogen has no neutrons - the only element that can have none!',
  },
  {
    id: 'hydrogen-2',
    symbol: 'H',
    nameIs: 'Vetni-2 (Dýterín)',
    nameEn: 'Hydrogen-2 (Deuterium)',
    atomicNumber: 1,
    massNumber: 2,
    notation: '\u00B2\u2081H',
    hintIs: 'Dýterín er samsæta vetnis með eina nifteind. Hún er notuð í kjarnorkuhvarfum.',
    hintEn: 'Deuterium is a hydrogen isotope with one neutron. It is used in nuclear reactions.',
  },
  {
    id: 'oxygen-16',
    symbol: 'O',
    nameIs: 'Súrefni-16',
    nameEn: 'Oxygen-16',
    atomicNumber: 8,
    massNumber: 16,
    notation: '\u00B9\u2076\u2088O',
    hintIs: 'Súrefni-16 er algengasta samsæta súrefnis (99.76%).',
    hintEn: 'Oxygen-16 is the most common oxygen isotope (99.76%).',
  },
  {
    id: 'oxygen-18',
    symbol: 'O',
    nameIs: 'Súrefni-18',
    nameEn: 'Oxygen-18',
    atomicNumber: 8,
    massNumber: 18,
    notation: '\u00B9\u2078\u2088O',
    hintIs: 'Súrefni-18 er notað í PET-skönnun í læknisfræði.',
    hintEn: 'Oxygen-18 is used in PET scanning in medicine.',
  },
  {
    id: 'sodium-23',
    symbol: 'Na',
    nameIs: 'Natrín-23',
    nameEn: 'Sodium-23',
    atomicNumber: 11,
    massNumber: 23,
    notation: '\u00B2\u00B3\u2081\u2081Na',
    hintIs: 'Natrín-23 er eina stöðuga samsæta natríns.',
    hintEn: 'Sodium-23 is the only stable sodium isotope.',
  },
  {
    id: 'chlorine-35',
    symbol: 'Cl',
    nameIs: 'Klór-35',
    nameEn: 'Chlorine-35',
    atomicNumber: 17,
    massNumber: 35,
    notation: '\u00B3\u2075\u2081\u2087Cl',
    hintIs: 'Klór-35 er algengari samsætan (75.77%). Hún hefur 18 nifteindir.',
    hintEn: 'Chlorine-35 is the more common isotope (75.77%). It has 18 neutrons.',
  },
  {
    id: 'chlorine-37',
    symbol: 'Cl',
    nameIs: 'Klór-37',
    nameEn: 'Chlorine-37',
    atomicNumber: 17,
    massNumber: 37,
    notation: '\u00B3\u2077\u2081\u2087Cl',
    hintIs: 'Klór-37 hefur 2 nifteindir meira en Cl-35. Saman gefa þær meðalatómmassa 35.45 u.',
    hintEn: 'Chlorine-37 has 2 more neutrons than Cl-35. Together they give average atomic mass of 35.45 u.',
  },
  {
    id: 'iron-56',
    symbol: 'Fe',
    nameIs: 'Járn-56',
    nameEn: 'Iron-56',
    atomicNumber: 26,
    massNumber: 56,
    notation: '\u2075\u2076\u2082\u2086Fe',
    hintIs: 'Járn-56 er algengasta samsæta járns (91.75%). Hún hefur 30 nifteindir.',
    hintEn: 'Iron-56 is the most common iron isotope (91.75%). It has 30 neutrons.',
  },
];


/**
 * Level 3: Average atomic mass calculation problems
 * Students calculate weighted average from isotope abundances.
 */
export interface AverageMassProblem {
  id: string;
  elementSymbol: string;
  elementNameIs: string;
  elementNameEn: string;
  isotopes: {
    massNumber: number;
    exactMass: number;
    abundance: number; // as percentage (e.g., 75.77)
    notation: string;
  }[];
  /** The correct average atomic mass (rounded to 2 decimals) */
  correctAnswer: number;
  /** Acceptable tolerance for student answers */
  tolerance: number;
  hintIs: string;
  hintEn: string;
}

export const LEVEL3_PROBLEMS: AverageMassProblem[] = [
  {
    id: 'chlorine-avg',
    elementSymbol: 'Cl',
    elementNameIs: 'Klór',
    elementNameEn: 'Chlorine',
    isotopes: [
      { massNumber: 35, exactMass: 34.97, abundance: 75.77, notation: '\u00B3\u2075Cl' },
      { massNumber: 37, exactMass: 36.97, abundance: 24.23, notation: '\u00B3\u2077Cl' },
    ],
    correctAnswer: 35.45,
    tolerance: 0.05,
    hintIs: 'Meðalatómmassi = (massi\u2081 \u00D7 hlutfall\u2081) + (massi\u2082 \u00D7 hlutfall\u2082). Mundu a\u00F0 breyta pr\u00F3sentum \u00ED tugabrot!',
    hintEn: 'Average atomic mass = (mass\u2081 \u00D7 fraction\u2081) + (mass\u2082 \u00D7 fraction\u2082). Remember to convert percentages to decimals!',
  },
  {
    id: 'boron-avg',
    elementSymbol: 'B',
    elementNameIs: 'Bór',
    elementNameEn: 'Boron',
    isotopes: [
      { massNumber: 10, exactMass: 10.01, abundance: 19.9, notation: '\u00B9\u2070B' },
      { massNumber: 11, exactMass: 11.01, abundance: 80.1, notation: '\u00B9\u00B9B' },
    ],
    correctAnswer: 10.81,
    tolerance: 0.05,
    hintIs: 'B\u00F3r-11 er mun algengari en B\u00F3r-10, svo me\u00F0altal er n\u00E1l\u00E6gt 11.',
    hintEn: 'Boron-11 is much more common than Boron-10, so the average is close to 11.',
  },
  {
    id: 'lithium-avg',
    elementSymbol: 'Li',
    elementNameIs: 'Lit\u00EDn',
    elementNameEn: 'Lithium',
    isotopes: [
      { massNumber: 6, exactMass: 6.02, abundance: 7.5, notation: '\u2076Li' },
      { massNumber: 7, exactMass: 7.02, abundance: 92.5, notation: '\u2077Li' },
    ],
    correctAnswer: 6.94,
    tolerance: 0.05,
    hintIs: 'N\u00E6stum allt lit\u00EDn er Li-7, svo me\u00F0almassi er n\u00E1l\u00E6gt 7.',
    hintEn: 'Almost all lithium is Li-7, so the average mass is close to 7.',
  },
  {
    id: 'copper-avg',
    elementSymbol: 'Cu',
    elementNameIs: 'Kopar',
    elementNameEn: 'Copper',
    isotopes: [
      { massNumber: 63, exactMass: 62.93, abundance: 69.17, notation: '\u2076\u00B3Cu' },
      { massNumber: 65, exactMass: 64.93, abundance: 30.83, notation: '\u2076\u2075Cu' },
    ],
    correctAnswer: 63.55,
    tolerance: 0.05,
    hintIs: 'Cu-63 er algengari, svo me\u00F0altal er n\u00E1l\u00E6gra 63 en 65.',
    hintEn: 'Cu-63 is more common, so the average is closer to 63 than 65.',
  },
  {
    id: 'silver-avg',
    elementSymbol: 'Ag',
    elementNameIs: 'Silfur',
    elementNameEn: 'Silver',
    isotopes: [
      { massNumber: 107, exactMass: 106.91, abundance: 51.84, notation: '\u00B9\u2070\u2077Ag' },
      { massNumber: 109, exactMass: 108.90, abundance: 48.16, notation: '\u00B9\u2070\u2079Ag' },
    ],
    correctAnswer: 107.87,
    tolerance: 0.05,
    hintIs: 'Sams\u00E6turnar eru n\u00E6stum jafn algengar, svo me\u00F0altal er n\u00E1l\u00E6gt mi\u00F0ju.',
    hintEn: 'The isotopes are nearly equally common, so the average is close to the middle.',
  },
  {
    id: 'magnesium-avg',
    elementSymbol: 'Mg',
    elementNameIs: 'Magnes\u00EDn',
    elementNameEn: 'Magnesium',
    isotopes: [
      { massNumber: 24, exactMass: 23.99, abundance: 78.99, notation: '\u00B2\u2074Mg' },
      { massNumber: 25, exactMass: 24.99, abundance: 10.00, notation: '\u00B2\u2075Mg' },
      { massNumber: 26, exactMass: 25.98, abundance: 11.01, notation: '\u00B2\u2076Mg' },
    ],
    correctAnswer: 24.31,
    tolerance: 0.05,
    hintIs: '\u00DEetta frumefni hefur 3 sams\u00E6tur! Margfalda\u00F0u hverja \u00ED s\u00EDnu lagi og legg\u00F0u saman.',
    hintEn: 'This element has 3 isotopes! Multiply each one separately and add them up.',
  },
  {
    id: 'neon-avg',
    elementSymbol: 'Ne',
    elementNameIs: 'Neon',
    elementNameEn: 'Neon',
    isotopes: [
      { massNumber: 20, exactMass: 19.99, abundance: 90.48, notation: '\u00B2\u2070Ne' },
      { massNumber: 21, exactMass: 20.99, abundance: 0.27, notation: '\u00B2\u00B9Ne' },
      { massNumber: 22, exactMass: 21.99, abundance: 9.25, notation: '\u00B2\u00B2Ne' },
    ],
    correctAnswer: 20.18,
    tolerance: 0.05,
    hintIs: 'Ne-20 er langt algengast (90.48%), svo me\u00F0almassi er n\u00E1l\u00E6gt 20.',
    hintEn: 'Ne-20 is by far the most common (90.48%), so the average mass is close to 20.',
  },
  {
    id: 'carbon-avg',
    elementSymbol: 'C',
    elementNameIs: 'Kolefni',
    elementNameEn: 'Carbon',
    isotopes: [
      { massNumber: 12, exactMass: 12.00, abundance: 98.93, notation: '\u00B9\u00B2C' },
      { massNumber: 13, exactMass: 13.00, abundance: 1.07, notation: '\u00B9\u00B3C' },
    ],
    correctAnswer: 12.01,
    tolerance: 0.05,
    hintIs: 'Kolefni-12 er vi\u00F0mi\u00F0un at\u00F3mmassaeiningarinnar. Me\u00F0almassi kolefnis er n\u00E1kv\u00E6mlega 12.01 u.',
    hintEn: 'Carbon-12 is the reference for the atomic mass unit. The average mass of carbon is exactly 12.01 u.',
  },
];
