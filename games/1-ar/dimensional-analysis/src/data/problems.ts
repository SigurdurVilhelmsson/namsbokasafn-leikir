/**
 * Level 2 Problems for Dimensional Analysis Game
 * Contains scaffolded problems for learning dimensional analysis with unit conversion
 * Enhanced with real-world contexts from cooking, pharmacy, engineering, and everyday life
 */

/**
 * Represents a Level 2 problem - single or multi-step unit conversion with scaffolding
 */
export interface Level2Problem {
  /** Unique identifier for the problem */
  id: string;
  /** Difficulty level: scaffolded_high (most support), medium, or advanced (least support) */
  difficulty: 'scaffolded_high' | 'medium' | 'advanced';
  /** Context or question in Icelandic for the problem */
  context: string;
  /** Category for the real-world scenario */
  category?: 'pharmacy' | 'cooking' | 'engineering' | 'sports' | 'science' | 'everyday';
  /** Starting numerical value */
  startValue: number;
  /** Starting unit */
  startUnit: string;
  /** Target unit for conversion */
  targetUnit: string;
  /** Array of conversion factors in the correct sequence */
  correctPath: string[];
  /** Scaffolding level: 3 (most support), 2 (medium), or 1 (least support) */
  scaffoldingLevel: number;
}

/**
 * Level 2 Problems: Unit conversion exercises with varying difficulty levels
 * Problems progress from single-step conversions with high scaffolding to multi-step conversions with minimal support
 */
export const level2Problems: Level2Problem[] = [
  // PHARMACY / MEDICINE CONTEXTS
  {
    id: 'L2-1',
    difficulty: 'scaffolded_high',
    category: 'pharmacy',
    context: '💊 Læknirinn ávísar 500 mg af paracetamol. Lyfjapakkinn sýnir styrk í grömmum. Hvað eru 500 mg í grömmum?',
    startValue: 500,
    startUnit: 'mg',
    targetUnit: 'g',
    correctPath: ['1 g / 1000 mg'],
    scaffoldingLevel: 3
  },
  {
    id: 'L2-2',
    difficulty: 'scaffolded_high',
    category: 'pharmacy',
    context: '🧪 Lyfjafræðingur þarf að mæla 2500 mL af sýrufyrstu lausn. Glasið er merkt í lítrum. Hversu margir lítrar?',
    startValue: 2500,
    startUnit: 'mL',
    targetUnit: 'L',
    correctPath: ['1 L / 1000 mL'],
    scaffoldingLevel: 3
  },
  {
    id: 'L2-pharmacy-3',
    difficulty: 'medium',
    category: 'pharmacy',
    context: '💉 Sjúklingur þarf 0.25 mg af morfíni. Lyfjastofninn hefur 250 μg skammta. Er þetta rétt skammtur? Breyttu mg í μg.',
    startValue: 0.25,
    startUnit: 'mg',
    targetUnit: 'μg',
    correctPath: ['1000 μg / 1 mg'],
    scaffoldingLevel: 2
  },

  // COOKING / BAKING CONTEXTS
  {
    id: 'L2-cooking-1',
    difficulty: 'scaffolded_high',
    category: 'cooking',
    context: '🍰 Uppskrift segir 3500 g af hveiti. Þú hefur aðeins kg-vigt. Hversu mörg kg þarftu?',
    startValue: 3500,
    startUnit: 'g',
    targetUnit: 'kg',
    correctPath: ['1 kg / 1000 g'],
    scaffoldingLevel: 3
  },
  {
    id: 'L2-cooking-2',
    difficulty: 'scaffolded_high',
    category: 'cooking',
    context: '🥛 Uppskriftin segir 2.5 L af mjólk en mælibolla þín er í mL. Hversu mörg mL þarftu?',
    startValue: 2.5,
    startUnit: 'L',
    targetUnit: 'mL',
    correctPath: ['1000 mL / 1 L'],
    scaffoldingLevel: 3
  },
  {
    id: 'L2-cooking-3',
    difficulty: 'medium',
    category: 'cooking',
    context: '🍕 Pizzadeigið þarf að hvíla í 90 mínútur. Hversu margar klukkustundir er það?',
    startValue: 90,
    startUnit: 'mín',
    targetUnit: 'klst',
    correctPath: ['1 klst / 60 mín'],
    scaffoldingLevel: 2
  },
  {
    id: 'L2-cooking-4',
    difficulty: 'medium',
    category: 'cooking',
    context: '🧁 Bakpúðurinn vegur 5 g en amerískt uppskrift segir oz (auns). 1 oz = 28.35 g. Hvað eru 5 g í oz?',
    startValue: 5,
    startUnit: 'g',
    targetUnit: 'oz',
    correctPath: ['1 oz / 28.35 g'],
    scaffoldingLevel: 2
  },

  // ENGINEERING / CONSTRUCTION CONTEXTS
  {
    id: 'L2-3',
    difficulty: 'scaffolded_high',
    category: 'engineering',
    context: '🔧 Verkfræðingur mælir borð sem er 250 cm langt. Teikningin notar metra. Hvað er það í metrum?',
    startValue: 250,
    startUnit: 'cm',
    targetUnit: 'm',
    correctPath: ['1 m / 100 cm'],
    scaffoldingLevel: 3
  },
  {
    id: 'L2-eng-2',
    difficulty: 'medium',
    category: 'engineering',
    context: '🏗️ Byggingarefni vegur 5 tonn. Kraninn sýnir burðargetu í kg. Hvað eru 5 tonn í kg?',
    startValue: 5,
    startUnit: 'tonn',
    targetUnit: 'kg',
    correctPath: ['1000 kg / 1 tonn'],
    scaffoldingLevel: 2
  },
  {
    id: 'L2-6',
    difficulty: 'medium',
    category: 'engineering',
    context: '📏 Arkitekt þarf að breyta 0.5 km göngubraut í cm fyrir nákvæma teikningu. Hversu margir cm?',
    startValue: 0.5,
    startUnit: 'km',
    targetUnit: 'cm',
    correctPath: ['1000 m / 1 km', '100 cm / 1 m'],
    scaffoldingLevel: 2
  },
  {
    id: 'L2-eng-3',
    difficulty: 'advanced',
    category: 'engineering',
    context: '⚡ Rafmagnsnotkun er 2.4 kW. Heimilistæki sýnir vatt (W). Hvað eru 2.4 kW í wöttum?',
    startValue: 2.4,
    startUnit: 'kW',
    targetUnit: 'W',
    correctPath: ['1000 W / 1 kW'],
    scaffoldingLevel: 1
  },

  // SPORTS / FITNESS CONTEXTS
  {
    id: 'L2-sports-1',
    difficulty: 'medium',
    category: 'sports',
    context: '🏃 Maraþon er 42.195 km. Hlaupari vill vita hversu margir metrar það er.',
    startValue: 42.195,
    startUnit: 'km',
    targetUnit: 'm',
    correctPath: ['1000 m / 1 km'],
    scaffoldingLevel: 2
  },
  {
    id: 'L2-8',
    difficulty: 'medium',
    category: 'sports',
    context: '🚴 Hjólreiðamaður hjólar á 90 km/klst. Hraðamælir sýnir m/s. Hvað er hraðinn í m/s?',
    startValue: 90,
    startUnit: 'km/klst',
    targetUnit: 'm/s',
    correctPath: ['1000 m / 1 km', '1 klst / 3600 s'],
    scaffoldingLevel: 2
  },
  {
    id: 'L2-sports-2',
    difficulty: 'advanced',
    category: 'sports',
    context: '⚽ Usain Bolt hljóp 100m á 9.58 sekúndum (~10.44 m/s). Hvað er það í km/klst?',
    startValue: 10.44,
    startUnit: 'm/s',
    targetUnit: 'km/klst',
    correctPath: ['1 km / 1000 m', '3600 s / 1 klst'],
    scaffoldingLevel: 1
  },

  // SCIENCE / LAB CONTEXTS
  {
    id: 'L2-5',
    difficulty: 'scaffolded_high',
    category: 'science',
    context: '🔬 Efnafræðingur mælir 2.5 kg af salti. Jafnan notar grömm. Breyttu í grömm.',
    startValue: 2.5,
    startUnit: 'kg',
    targetUnit: 'g',
    correctPath: ['1000 g / 1 kg'],
    scaffoldingLevel: 3
  },
  {
    id: 'L2-7',
    difficulty: 'medium',
    category: 'science',
    context: '⚗️ Tilraun notar 5000 mg af efni. Uppskriftin segir kg. Breyttu mg í kg.',
    startValue: 5000,
    startUnit: 'mg',
    targetUnit: 'kg',
    correctPath: ['1 g / 1000 mg', '1 kg / 1000 g'],
    scaffoldingLevel: 2
  },
  {
    id: 'L2-15',
    difficulty: 'advanced',
    category: 'science',
    context: '🧫 Eðlismassi lausnar er 1.5 g/mL. Breyttu í kg/L til samanburðar við vatn (1.0 kg/L).',
    startValue: 1.5,
    startUnit: 'g/mL',
    targetUnit: 'kg/L',
    correctPath: ['1 kg / 1000 g', '1000 mL / 1 L'],
    scaffoldingLevel: 1
  },

  // EVERYDAY LIFE CONTEXTS
  {
    id: 'L2-9',
    difficulty: 'medium',
    category: 'everyday',
    context: '✈️ Flug til London tekur 2 klukkustundir. Barnið vill vita hversu margar sekúndur það er.',
    startValue: 2,
    startUnit: 'klst',
    targetUnit: 's',
    correctPath: ['3600 s / 1 klst'],
    scaffoldingLevel: 2
  },
  {
    id: 'L2-10',
    difficulty: 'medium',
    category: 'everyday',
    context: '🚗 GPS segir að þú sért 5.000.000 mm frá áfangastað. Hvað er það í km?',
    startValue: 5000000,
    startUnit: 'mm',
    targetUnit: 'km',
    correctPath: ['1 m / 1000 mm', '1 km / 1000 m'],
    scaffoldingLevel: 2
  },
  {
    id: 'L2-12',
    difficulty: 'advanced',
    category: 'everyday',
    context: '🏠 Garðslanga er 150.000 cm löng. Hversu mörg km er það?',
    startValue: 150000,
    startUnit: 'cm',
    targetUnit: 'km',
    correctPath: ['1 m / 100 cm', '1 km / 1000 m'],
    scaffoldingLevel: 1
  },
  {
    id: 'L2-14',
    difficulty: 'advanced',
    category: 'everyday',
    context: '⏰ Kvikmynd er 7200 sekúndur löng. Hversu margar klukkustundir er hún?',
    startValue: 7200,
    startUnit: 's',
    targetUnit: 'klst',
    correctPath: ['1 klst / 3600 s'],
    scaffoldingLevel: 1
  },
  {
    id: 'L2-everyday-1',
    difficulty: 'scaffolded_high',
    category: 'everyday',
    context: '📱 Gönguskref mæla appið segir að þú hafir gengið 5.5 km. Hversu margir metrar er það?',
    startValue: 5.5,
    startUnit: 'km',
    targetUnit: 'm',
    correctPath: ['1000 m / 1 km'],
    scaffoldingLevel: 3
  }
];
