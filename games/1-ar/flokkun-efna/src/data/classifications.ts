// Classification of Matter data

export type MatterCategory =
  | 'frumefni'      // Element
  | 'efnasamband'   // Compound
  | 'einsleit'      // Homogeneous mixture
  | 'misleit';      // Heterogeneous mixture

export interface MatterSample {
  id: string;
  name: string;
  nameEn: string;
  formula?: string;
  emoji: string;
  category: MatterCategory;
  description: string;
  descriptionEn: string;
  hint: string;
  hintEn: string;
}

// Category definitions with descriptions
export const CATEGORIES: Record<MatterCategory, {
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  color: string;
  emoji: string;
}> = {
  frumefni: {
    name: 'Frumefni',
    nameEn: 'Element',
    description: 'Hrein efni sem samanstanda af einni tegund af atómum',
    descriptionEn: 'Pure substances made of only one type of atom',
    color: '#3b82f6', // blue
    emoji: '⚛️',
  },
  efnasamband: {
    name: 'Efnasamband',
    nameEn: 'Compound',
    description: 'Hrein efni sem samanstanda af tveimur eða fleiri frumefnum í föstu hlutfalli',
    descriptionEn: 'Pure substances made of two or more elements in fixed ratios',
    color: '#8b5cf6', // purple
    emoji: '🔗',
  },
  einsleit: {
    name: 'Einsleit blanda',
    nameEn: 'Homogeneous mixture',
    description: 'Blöndur þar sem efnin eru jafnt dreifð og ólíka efnin eru ekki greinileg',
    descriptionEn: 'Mixtures where substances are evenly distributed and appear uniform',
    color: '#22c55e', // green
    emoji: '🫗',
  },
  misleit: {
    name: 'Misleit blanda',
    nameEn: 'Heterogeneous mixture',
    description: 'Blöndur þar sem ólíka efnin eru greinilega sjáanleg',
    descriptionEn: 'Mixtures where different substances are visibly distinguishable',
    color: '#f59e0b', // amber
    emoji: '🥗',
  },
};

// Sample matter items for classification
export const MATTER_SAMPLES: MatterSample[] = [
  // Elements (Frumefni)
  {
    id: 'gold',
    name: 'Gull',
    nameEn: 'Gold',
    formula: 'Au',
    emoji: '🥇',
    category: 'frumefni',
    description: 'Gulur málmur sem finnst í náttúrunni',
    descriptionEn: 'Yellow metal found in nature',
    hint: 'Hefur aðeins eina tegund af atómum (Au)',
    hintEn: 'Has only one type of atom (Au)',
  },
  {
    id: 'oxygen',
    name: 'Súrefni',
    nameEn: 'Oxygen',
    formula: 'O₂',
    emoji: '💨',
    category: 'frumefni',
    description: 'Lofttegundin sem við öndum að okkur',
    descriptionEn: 'The gas we breathe',
    hint: 'Þótt það sé O₂ eru öll atómin súrefnisatóm',
    hintEn: 'Even though it\'s O₂, all atoms are oxygen atoms',
  },
  {
    id: 'iron',
    name: 'Járn',
    nameEn: 'Iron',
    formula: 'Fe',
    emoji: '🔩',
    category: 'frumefni',
    description: 'Sterkur grár málmur',
    descriptionEn: 'Strong gray metal',
    hint: 'Aðeins ein tegund af atómum (Fe)',
    hintEn: 'Only one type of atom (Fe)',
  },
  {
    id: 'copper',
    name: 'Kopar',
    nameEn: 'Copper',
    formula: 'Cu',
    emoji: '🟤',
    category: 'frumefni',
    description: 'Rauðgulur málmur sem leiðir vel rafmagn',
    descriptionEn: 'Reddish metal that conducts electricity well',
    hint: 'Hreinn málmur með eina tegund atóma',
    hintEn: 'Pure metal with one type of atom',
  },
  {
    id: 'carbon',
    name: 'Kolefni (demantur)',
    nameEn: 'Carbon (diamond)',
    formula: 'C',
    emoji: '💎',
    category: 'frumefni',
    description: 'Harðasta náttúrulega efnið',
    descriptionEn: 'Hardest natural substance',
    hint: 'Aðeins kolefnisatóm í kristallbyggingu',
    hintEn: 'Only carbon atoms in crystal structure',
  },
  {
    id: 'helium',
    name: 'Helíum',
    nameEn: 'Helium',
    formula: 'He',
    emoji: '🎈',
    category: 'frumefni',
    description: 'Létt lofttegundin í blöðrum',
    descriptionEn: 'Light gas used in balloons',
    hint: 'Eðalgas með eina tegund atóma',
    hintEn: 'Noble gas with one type of atom',
  },

  // Compounds (Efnasambönd)
  {
    id: 'water',
    name: 'Vatn',
    nameEn: 'Water',
    formula: 'H₂O',
    emoji: '💧',
    category: 'efnasamband',
    description: 'Lífsnauðsynlegt vökvi',
    descriptionEn: 'Essential liquid for life',
    hint: 'Tvö frumefni (H og O) í föstu hlutfalli 2:1',
    hintEn: 'Two elements (H and O) in fixed ratio 2:1',
  },
  {
    id: 'salt',
    name: 'Borðsalt',
    nameEn: 'Table salt',
    formula: 'NaCl',
    emoji: '🧂',
    category: 'efnasamband',
    description: 'Hvítt kristallað efni til að bragðbæta mat',
    descriptionEn: 'White crystalline substance for seasoning food',
    hint: 'Natríum og klór í föstu hlutfalli 1:1',
    hintEn: 'Sodium and chlorine in fixed ratio 1:1',
  },
  {
    id: 'sugar',
    name: 'Sykur',
    nameEn: 'Sugar',
    formula: 'C₁₂H₂₂O₁₁',
    emoji: '🍬',
    category: 'efnasamband',
    description: 'Sætt hvítt duft',
    descriptionEn: 'Sweet white powder',
    hint: 'Kolefni, vetni og súrefni í ákveðnum hlutföllum',
    hintEn: 'Carbon, hydrogen and oxygen in specific ratios',
  },
  {
    id: 'co2',
    name: 'Koltvísýringur',
    nameEn: 'Carbon dioxide',
    formula: 'CO₂',
    emoji: '🫧',
    category: 'efnasamband',
    description: 'Gas sem við öndum frá okkur',
    descriptionEn: 'Gas we exhale',
    hint: 'Kolefni og súrefni í föstu hlutfalli 1:2',
    hintEn: 'Carbon and oxygen in fixed ratio 1:2',
  },
  {
    id: 'ammonia',
    name: 'Ammóníak',
    nameEn: 'Ammonia',
    formula: 'NH₃',
    emoji: '🧪',
    category: 'efnasamband',
    description: 'Sterk lykt, notað í hreinsiefni',
    descriptionEn: 'Strong smell, used in cleaning products',
    hint: 'Köfnunarefni og vetni í föstu hlutfalli 1:3',
    hintEn: 'Nitrogen and hydrogen in fixed ratio 1:3',
  },
  {
    id: 'rust',
    name: 'Ryð',
    nameEn: 'Rust',
    formula: 'Fe₂O₃',
    emoji: '🟫',
    category: 'efnasamband',
    description: 'Rauðbrúnt efni sem myndast á járni',
    descriptionEn: 'Reddish-brown substance that forms on iron',
    hint: 'Járn og súrefni í föstu hlutfalli',
    hintEn: 'Iron and oxygen in fixed ratio',
  },

  // Homogeneous mixtures (Einsleit blanda)
  {
    id: 'saltwater',
    name: 'Saltvatn',
    nameEn: 'Salt water',
    emoji: '🌊',
    category: 'einsleit',
    description: 'Sjór eða salt leyst upp í vatni',
    descriptionEn: 'Seawater or salt dissolved in water',
    hint: 'Salt og vatn - jafnt dreifð, engin sýnileg mörk',
    hintEn: 'Salt and water - evenly distributed, no visible boundaries',
  },
  {
    id: 'air',
    name: 'Loft',
    nameEn: 'Air',
    emoji: '🌬️',
    category: 'einsleit',
    description: 'Blanda af lofttegundum sem við öndum',
    descriptionEn: 'Mixture of gases we breathe',
    hint: 'Köfnunarefni, súrefni, argon o.fl. - jafnt dreifð',
    hintEn: 'Nitrogen, oxygen, argon etc. - evenly distributed',
  },
  {
    id: 'vinegar',
    name: 'Edik',
    nameEn: 'Vinegar',
    emoji: '🫙',
    category: 'einsleit',
    description: 'Súr vökvi notaður í matreiðslu',
    descriptionEn: 'Sour liquid used in cooking',
    hint: 'Ediksýra leyst í vatni - jafnt dreifð',
    hintEn: 'Acetic acid dissolved in water - evenly distributed',
  },
  {
    id: 'bronze',
    name: 'Brons',
    nameEn: 'Bronze',
    emoji: '🥉',
    category: 'einsleit',
    description: 'Málmblöndun af kopar og tini',
    descriptionEn: 'Metal alloy of copper and tin',
    hint: 'Málmblöndun - atómin dreifð jafnt á atómstigi',
    hintEn: 'Metal alloy - atoms evenly distributed at atomic level',
  },
  {
    id: 'sugar_water',
    name: 'Sykurlausn',
    nameEn: 'Sugar solution',
    emoji: '🥤',
    category: 'einsleit',
    description: 'Sykur leystur upp í vatni',
    descriptionEn: 'Sugar dissolved in water',
    hint: 'Sykur og vatn - ekki hægt að sjá sykurkornin',
    hintEn: 'Sugar and water - cannot see sugar crystals',
  },
  {
    id: 'steel',
    name: 'Stál',
    nameEn: 'Steel',
    emoji: '🔧',
    category: 'einsleit',
    description: 'Járn blandað við kolefni',
    descriptionEn: 'Iron mixed with carbon',
    hint: 'Málmblöndun - járn og kolefni dreifð jafnt',
    hintEn: 'Metal alloy - iron and carbon evenly distributed',
  },

  // Heterogeneous mixtures (Misleit blanda)
  {
    id: 'salad',
    name: 'Salat',
    nameEn: 'Salad',
    emoji: '🥗',
    category: 'misleit',
    description: 'Blanda af grænmeti',
    descriptionEn: 'Mixture of vegetables',
    hint: 'Hægt að sjá ólíka hlutina (tómatar, salat, o.s.frv.)',
    hintEn: 'Can see different parts (tomatoes, lettuce, etc.)',
  },
  {
    id: 'granite',
    name: 'Granít',
    nameEn: 'Granite',
    emoji: '🪨',
    category: 'misleit',
    description: 'Berg með mismunandi steinefnum',
    descriptionEn: 'Rock with different minerals',
    hint: 'Hægt að sjá mismunandi litaða steina/steinefni',
    hintEn: 'Can see different colored grains/minerals',
  },
  {
    id: 'oil_water',
    name: 'Olía og vatn',
    nameEn: 'Oil and water',
    emoji: '🫗',
    category: 'misleit',
    description: 'Olía sem flýtur ofan á vatni',
    descriptionEn: 'Oil floating on water',
    hint: 'Tvö greinileg lög - blandast ekki',
    hintEn: 'Two visible layers - don\'t mix',
  },
  {
    id: 'sand_water',
    name: 'Sandur í vatni',
    nameEn: 'Sand in water',
    emoji: '🏖️',
    category: 'misleit',
    description: 'Sandkorn sem setjast á botn',
    descriptionEn: 'Sand grains settling at bottom',
    hint: 'Sandkornin eru sjáanleg og setjast',
    hintEn: 'Sand grains are visible and settle',
  },
  {
    id: 'cereal_milk',
    name: 'Morgunkornaflögur í mjólk',
    nameEn: 'Cereal in milk',
    emoji: '🥣',
    category: 'misleit',
    description: 'Morgunmatur',
    descriptionEn: 'Breakfast food',
    hint: 'Sjáanleg kornin fljóta í mjólkinni',
    hintEn: 'Visible flakes floating in milk',
  },
  {
    id: 'pizza',
    name: 'Pizza',
    nameEn: 'Pizza',
    emoji: '🍕',
    category: 'misleit',
    description: 'Bökuð réttur með mismunandi áleggi',
    descriptionEn: 'Baked dish with different toppings',
    hint: 'Sjáanleg álegg: ostur, tómatsósa, pepperóní...',
    hintEn: 'Visible toppings: cheese, sauce, pepperoni...',
  },
];

// Get samples by category
export function getSamplesByCategory(category: MatterCategory): MatterSample[] {
  return MATTER_SAMPLES.filter(s => s.category === category);
}

// Shuffle array helper
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get random samples for a quiz
export function getRandomSamples(count: number): MatterSample[] {
  return shuffleArray(MATTER_SAMPLES).slice(0, count);
}
