/**
 * Exact Numbers (Nákvæmar tölur) Data
 * Level 5: Understanding which numbers have infinite significant figures
 */

export interface ExactNumberExample {
  id: string;
  value: string;
  context: string;
  contextEn: string;
  contextPl: string;
  whyExact: string;
  whyExactEn: string;
  whyExactPl: string;
  type: 'counting' | 'defined' | 'coefficient';
}

export interface MixedCalculation {
  id: string;
  problem: string;
  problemEn: string;
  problemPl: string;
  exactNumbers: string[];
  measuredNumbers: string[];
  rawResult: number;
  correctAnswer: string;
  correctSigFigs: number;
  explanation: string;
  explanationEn: string;
  explanationPl: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface IdentificationProblem {
  id: string;
  scenario: string;
  scenarioEn: string;
  scenarioPl: string;
  numbers: NumberInScenario[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface NumberInScenario {
  value: string;
  isExact: boolean;
  reason: string;
  reasonEn: string;
  reasonPl: string;
  type: 'counting' | 'defined' | 'coefficient' | 'measured';
}

// Types of exact numbers with examples
export const EXACT_NUMBER_TYPES = [
  {
    id: 'counting',
    nameIs: 'Taldar tölur',
    nameEn: 'Counting numbers',
    namePl: 'Liczby zliczone',
    description: 'Hlutir sem eru taldir, ekki mældir',
    descriptionEn: 'Objects that are counted, not measured',
    descriptionPl: 'Obiekty, które są zliczane, nie mierzone',
    examples: ['12 egg', '3 nemendur', '6 mólekúl'],
    examplesEn: ['12 eggs', '3 students', '6 molecules'],
    examplesPl: ['12 jaj', '3 studentów', '6 cząsteczek'],
  },
  {
    id: 'defined',
    nameIs: 'Skilgreindar tölur',
    nameEn: 'Defined numbers',
    namePl: 'Liczby zdefiniowane',
    description: 'Einingaumreikningar og skilgreiningar',
    descriptionEn: 'Unit conversions and definitions',
    descriptionPl: 'Konwersje jednostek i definicje',
    examples: ['1 km = 1000 m', '1 inch = 2.54 cm', '1 mol = 6.022 × 10²³'],
    examplesEn: ['1 km = 1000 m', '1 inch = 2.54 cm', '1 mol = 6.022 × 10²³'],
    examplesPl: ['1 km = 1000 m', '1 cal = 2,54 cm', '1 mol = 6,022 × 10²³'],
  },
  {
    id: 'coefficient',
    nameIs: 'Stuðlar í jöfnum',
    nameEn: 'Coefficients in equations',
    namePl: 'Współczynniki w równaniach',
    description: 'Stuðlar í efnajöfnum og stærðfræðiformúlum',
    descriptionEn: 'Coefficients in chemical equations and mathematical formulas',
    descriptionPl: 'Współczynniki w równaniach chemicznych i wzorach matematycznych',
    examples: ['2H₂O', 'C = 2πr', '½mv²'],
    examplesEn: ['2H₂O', 'C = 2πr', '½mv²'],
    examplesPl: ['2H₂O', 'C = 2πr', '½mv²'],
  },
];

// Exact number examples
export const EXACT_NUMBER_EXAMPLES: ExactNumberExample[] = [
  // Counting numbers
  {
    id: 'ex1',
    value: '12',
    context: '12 egg í öskju',
    contextEn: '12 eggs in a carton',
    contextPl: '12 jaj w kartonie',
    whyExact: 'Við töldum eggin - þetta er nákvæm tala, ekki mæling.',
    whyExactEn: 'We counted the eggs - this is an exact number, not a measurement.',
    whyExactPl: 'Policzyliśmy jaja - to dokładna liczba, nie pomiar.',
    type: 'counting',
  },
  {
    id: 'ex2',
    value: '5',
    context: '5 nemendur í hóp',
    contextEn: '5 students in a group',
    contextPl: '5 studentów w grupie',
    whyExact: 'Fjöldi nemenda er talinn, ekki mældur.',
    whyExactEn: 'Number of students is counted, not measured.',
    whyExactPl: 'Liczba studentów jest zliczona, nie zmierzona.',
    type: 'counting',
  },
  {
    id: 'ex3',
    value: '3',
    context: '3 kúlur í glasi',
    contextEn: '3 balls in a jar',
    contextPl: '3 kulki w słoiku',
    whyExact: 'Við getum talið kúlurnar nákvæmlega.',
    whyExactEn: 'We can count the balls exactly.',
    whyExactPl: 'Możemy policzyć kulki dokładnie.',
    type: 'counting',
  },
  // Defined conversions
  {
    id: 'ex4',
    value: '1000',
    context: '1 km = 1000 m',
    contextEn: '1 km = 1000 m',
    contextPl: '1 km = 1000 m',
    whyExact: 'Þetta er skilgreining - nákvæmlega 1000 metrar í einum kílómetra.',
    whyExactEn: 'This is a definition - exactly 1000 meters in one kilometer.',
    whyExactPl: 'To jest definicja - dokładnie 1000 metrów w jednym kilometrze.',
    type: 'defined',
  },
  {
    id: 'ex5',
    value: '2.54',
    context: '1 inch = 2.54 cm (skilgreining)',
    contextEn: '1 inch = 2.54 cm (definition)',
    contextPl: '1 cal = 2,54 cm (definicja)',
    whyExact: 'Þetta er skilgreint umreikningsgildi, ekki mæling.',
    whyExactEn: 'This is a defined conversion value, not a measurement.',
    whyExactPl: 'To jest zdefiniowana wartość konwersji, nie pomiar.',
    type: 'defined',
  },
  {
    id: 'ex6',
    value: '100',
    context: '1 °C = 100 gráður á Celsius kvarða',
    contextEn: '1 °C = 100 degrees on Celsius scale',
    contextPl: '1 °C = 100 stopni w skali Celsjusza',
    whyExact: 'Celsius kvarðinn er skilgreindur með nákvæmum gildum.',
    whyExactEn: 'The Celsius scale is defined with exact values.',
    whyExactPl: 'Skala Celsjusza jest zdefiniowana dokładnymi wartościami.',
    type: 'defined',
  },
  // Coefficients
  {
    id: 'ex7',
    value: '2',
    context: '2H₂O (í efnajöfnu)',
    contextEn: '2H₂O (in chemical equation)',
    contextPl: '2H₂O (w równaniu chemicznym)',
    whyExact: 'Stuðullinn 2 þýðir nákvæmlega 2 mólekúl af vatni.',
    whyExactEn: 'The coefficient 2 means exactly 2 molecules of water.',
    whyExactPl: 'Współczynnik 2 oznacza dokładnie 2 cząsteczki wody.',
    type: 'coefficient',
  },
  {
    id: 'ex8',
    value: '2',
    context: 'C = 2πr (ummál hrings)',
    contextEn: 'C = 2πr (circumference)',
    contextPl: 'C = 2πr (obwód koła)',
    whyExact: 'Talan 2 í formúlunni er nákvæm stærðfræðileg staðreynd.',
    whyExactEn: 'The number 2 in the formula is an exact mathematical fact.',
    whyExactPl: 'Liczba 2 w formule jest dokładnym faktem matematycznym.',
    type: 'coefficient',
  },
  {
    id: 'ex9',
    value: '½',
    context: 'KE = ½mv² (hreyfiorka)',
    contextEn: 'KE = ½mv² (kinetic energy)',
    contextPl: 'KE = ½mv² (energia kinetyczna)',
    whyExact: 'Brotin ½ er nákvæm í stærðfræðilegri formúlu.',
    whyExactEn: 'The fraction ½ is exact in the mathematical formula.',
    whyExactPl: 'Ułamek ½ jest dokładny w formule matematycznej.',
    type: 'coefficient',
  },
];

// Identification problems - identify exact vs measured
export const IDENTIFICATION_PROBLEMS: IdentificationProblem[] = [
  {
    id: 'id1',
    scenario: 'Nemi vigtar 12 egg og finnur að þau vega samtals 720.5 g.',
    scenarioEn: 'A student weighs 12 eggs and finds they weigh 720.5 g total.',
    scenarioPl: 'Student waży 12 jaj i stwierdza, że ważą łącznie 720,5 g.',
    numbers: [
      {
        value: '12',
        isExact: true,
        reason: 'Eggin eru talin, ekki mæld',
        reasonEn: 'The eggs are counted, not measured',
        reasonPl: 'Jaja są policzone, nie zmierzone',
        type: 'counting',
      },
      {
        value: '720.5',
        isExact: false,
        reason: 'Þyngdin er mæld á vog með takmarkaðri nákvæmni',
        reasonEn: 'The mass is measured on a scale with limited precision',
        reasonPl: 'Masa jest zmierzona na wadze z ograniczoną precyzją',
        type: 'measured',
      },
    ],
    difficulty: 'easy',
  },
  {
    id: 'id2',
    scenario: 'Umbreyttu 5.25 km í metra með 1 km = 1000 m.',
    scenarioEn: 'Convert 5.25 km to meters using 1 km = 1000 m.',
    scenarioPl: 'Zamień 5,25 km na metry używając 1 km = 1000 m.',
    numbers: [
      {
        value: '5.25',
        isExact: false,
        reason: 'Þetta er mæld vegalengd',
        reasonEn: 'This is a measured distance',
        reasonPl: 'To jest zmierzona odległość',
        type: 'measured',
      },
      {
        value: '1000',
        isExact: true,
        reason: 'Þetta er skilgreining á kílómetra',
        reasonEn: 'This is the definition of a kilometer',
        reasonPl: 'To jest definicja kilometra',
        type: 'defined',
      },
    ],
    difficulty: 'easy',
  },
  {
    id: 'id3',
    scenario: 'Í tilrauninni 2H₂ + O₂ → 2H₂O brenna 0.56 g af vetni.',
    scenarioEn: 'In the reaction 2H₂ + O₂ → 2H₂O, 0.56 g of hydrogen burns.',
    scenarioPl: 'W reakcji 2H₂ + O₂ → 2H₂O, 0,56 g wodoru się spala.',
    numbers: [
      {
        value: '2',
        isExact: true,
        reason: 'Stuðullinn 2 í efnajöfnunni er nákvæmur',
        reasonEn: 'The coefficient 2 in the equation is exact',
        reasonPl: 'Współczynnik 2 w równaniu jest dokładny',
        type: 'coefficient',
      },
      {
        value: '0.56',
        isExact: false,
        reason: 'Massi vetnis er mældur',
        reasonEn: 'The mass of hydrogen is measured',
        reasonPl: 'Masa wodoru jest zmierzona',
        type: 'measured',
      },
    ],
    difficulty: 'medium',
  },
  {
    id: 'id4',
    scenario: 'Reiknaðu ummál hrings með radíus 4.5 cm með C = 2πr.',
    scenarioEn: 'Calculate circumference of circle with radius 4.5 cm using C = 2πr.',
    scenarioPl: 'Oblicz obwód koła o promieniu 4,5 cm używając C = 2πr.',
    numbers: [
      {
        value: '2',
        isExact: true,
        reason: 'Stuðullinn 2 í formúlunni er nákvæmur',
        reasonEn: 'The coefficient 2 in the formula is exact',
        reasonPl: 'Współczynnik 2 w formule jest dokładny',
        type: 'coefficient',
      },
      {
        value: 'π',
        isExact: true,
        reason: 'π er stærðfræðileg fasti, ekki mæling',
        reasonEn: 'π is a mathematical constant, not a measurement',
        reasonPl: 'π jest stałą matematyczną, nie pomiarem',
        type: 'coefficient',
      },
      {
        value: '4.5',
        isExact: false,
        reason: 'Radíus er mældur',
        reasonEn: 'The radius is measured',
        reasonPl: 'Promień jest zmierzony',
        type: 'measured',
      },
    ],
    difficulty: 'medium',
  },
  {
    id: 'id5',
    scenario: '3 nemendur mæla sömu vegalengd: 15.2 m, 15.3 m, 15.1 m.',
    scenarioEn: '3 students measure the same distance: 15.2 m, 15.3 m, 15.1 m.',
    scenarioPl: '3 studentów mierzy tę samą odległość: 15,2 m, 15,3 m, 15,1 m.',
    numbers: [
      {
        value: '3',
        isExact: true,
        reason: 'Fjöldi nemenda er talinn',
        reasonEn: 'Number of students is counted',
        reasonPl: 'Liczba studentów jest zliczona',
        type: 'counting',
      },
      {
        value: '15.2',
        isExact: false,
        reason: 'Mæld vegalengd með óvissu',
        reasonEn: 'Measured distance with uncertainty',
        reasonPl: 'Zmierzona odległość z niepewnością',
        type: 'measured',
      },
      {
        value: '15.3',
        isExact: false,
        reason: 'Mæld vegalengd með óvissu',
        reasonEn: 'Measured distance with uncertainty',
        reasonPl: 'Zmierzona odległość z niepewnością',
        type: 'measured',
      },
      {
        value: '15.1',
        isExact: false,
        reason: 'Mæld vegalengd með óvissu',
        reasonEn: 'Measured distance with uncertainty',
        reasonPl: 'Zmierzona odległość z niepewnością',
        type: 'measured',
      },
    ],
    difficulty: 'hard',
  },
];

// Mixed calculations - exact + measured
export const MIXED_CALCULATIONS: MixedCalculation[] = [
  {
    id: 'mc1',
    problem: 'Hver er massi eins eggs ef 12 egg vega 720.5 g?',
    problemEn: 'What is the mass of one egg if 12 eggs weigh 720.5 g?',
    problemPl: 'Jaka jest masa jednego jaja, jeśli 12 jaj waży 720,5 g?',
    exactNumbers: ['12'],
    measuredNumbers: ['720.5'],
    rawResult: 60.041666667,
    correctAnswer: '60.04',
    correctSigFigs: 4,
    explanation: '720.5 ÷ 12 = 60.04 g. 12 er nákvæm tala, svo 720.5 (4 markverðir) ræður.',
    explanationEn: '720.5 ÷ 12 = 60.04 g. 12 is exact, so 720.5 (4 sig figs) determines precision.',
    explanationPl: '720,5 ÷ 12 = 60,04 g. 12 jest dokładne, więc 720,5 (4 cyfry znaczące) określa precyzję.',
    difficulty: 'easy',
  },
  {
    id: 'mc2',
    problem: 'Umbreyttu 2.45 km í metra. (1 km = 1000 m)',
    problemEn: 'Convert 2.45 km to meters. (1 km = 1000 m)',
    problemPl: 'Zamień 2,45 km na metry. (1 km = 1000 m)',
    exactNumbers: ['1000'],
    measuredNumbers: ['2.45'],
    rawResult: 2450,
    correctAnswer: '2450',
    correctSigFigs: 3,
    explanation: '2.45 × 1000 = 2450 m. 1000 er skilgreining (nákvæm), svo 2.45 (3 sf) ræður.',
    explanationEn: '2.45 × 1000 = 2450 m. 1000 is a definition (exact), so 2.45 (3 sf) determines precision.',
    explanationPl: '2,45 × 1000 = 2450 m. 1000 to definicja (dokładna), więc 2,45 (3 cz) określa precyzję.',
    difficulty: 'easy',
  },
  {
    id: 'mc3',
    problem: 'Í 2H₂O, hvert er heildarmassinn ef 1.008 g vetnis er notað?',
    problemEn: 'In 2H₂O, what is the total mass if 1.008 g of hydrogen is used?',
    problemPl: 'W 2H₂O, jaka jest całkowita masa, jeśli użyto 1,008 g wodoru?',
    exactNumbers: ['2'],
    measuredNumbers: ['1.008'],
    rawResult: 2.016,
    correctAnswer: '2.016',
    correctSigFigs: 4,
    explanation: '2 × 1.008 = 2.016 g. Stuðullinn 2 er nákvæmur, svo 1.008 (4 sf) ræður.',
    explanationEn: '2 × 1.008 = 2.016 g. The coefficient 2 is exact, so 1.008 (4 sf) determines precision.',
    explanationPl: '2 × 1.008 = 2,016 g. Współczynnik 2 jest dokładny, więc 1,008 (4 cz) określa precyzję.',
    difficulty: 'medium',
  },
  {
    id: 'mc4',
    problem: 'Hreyfiorka: KE = ½mv². m = 2.50 kg, v = 3.2 m/s. Reiknaðu KE.',
    problemEn: 'Kinetic energy: KE = ½mv². m = 2.50 kg, v = 3.2 m/s. Calculate KE.',
    problemPl: 'Energia kinetyczna: KE = ½mv². m = 2,50 kg, v = 3,2 m/s. Oblicz KE.',
    exactNumbers: ['½'],
    measuredNumbers: ['2.50', '3.2'],
    rawResult: 12.8,
    correctAnswer: '13',
    correctSigFigs: 2,
    explanation: '½ × 2.50 × (3.2)² = 12.8 → 13 J. v hefur 2 sf (minnst) → svar með 2 sf.',
    explanationEn: '½ × 2.50 × (3.2)² = 12.8 → 13 J. v has 2 sf (least) → answer with 2 sf.',
    explanationPl: '½ × 2,50 × (3,2)² = 12,8 → 13 J. v ma 2 cz (najmniej) → odpowiedź z 2 cz.',
    difficulty: 'medium',
  },
  {
    id: 'mc5',
    problem: 'Þéttni: d = m/V. m = 45.67 g, V = 25.0 mL. Reiknaðu þéttni.',
    problemEn: 'Density: d = m/V. m = 45.67 g, V = 25.0 mL. Calculate density.',
    problemPl: 'Gęstość: d = m/V. m = 45,67 g, V = 25,0 mL. Oblicz gęstość.',
    exactNumbers: [],
    measuredNumbers: ['45.67', '25.0'],
    rawResult: 1.8268,
    correctAnswer: '1.83',
    correctSigFigs: 3,
    explanation: '45.67 ÷ 25.0 = 1.8268 → 1.83 g/mL. 25.0 hefur 3 sf → svar með 3 sf.',
    explanationEn: '45.67 ÷ 25.0 = 1.8268 → 1.83 g/mL. 25.0 has 3 sf → answer with 3 sf.',
    explanationPl: '45,67 ÷ 25,0 = 1,8268 → 1,83 g/mL. 25,0 ma 3 cz → odpowiedź z 3 cz.',
    difficulty: 'hard',
  },
  {
    id: 'mc6',
    problem: 'Ummál hrings: C = 2πr. r = 5.25 cm. Reiknaðu C.',
    problemEn: 'Circumference: C = 2πr. r = 5.25 cm. Calculate C.',
    problemPl: 'Obwód koła: C = 2πr. r = 5,25 cm. Oblicz C.',
    exactNumbers: ['2', 'π'],
    measuredNumbers: ['5.25'],
    rawResult: 32.98672,
    correctAnswer: '33.0',
    correctSigFigs: 3,
    explanation: '2 × π × 5.25 = 32.99 → 33.0 cm. 2 og π eru nákvæm, 5.25 (3 sf) ræður.',
    explanationEn: '2 × π × 5.25 = 32.99 → 33.0 cm. 2 and π are exact, 5.25 (3 sf) determines precision.',
    explanationPl: '2 × π × 5,25 = 32,99 → 33,0 cm. 2 i π są dokładne, 5,25 (3 cz) określa precyzję.',
    difficulty: 'hard',
  },
  {
    id: 'mc7',
    problem: 'Meðalmassi 5 glerperla er 2.34 g. Hver er heildarmassi?',
    problemEn: 'The average mass of 5 glass beads is 2.34 g. What is the total mass?',
    problemPl: 'Średnia masa 5 szklanych koralików to 2,34 g. Jaka jest całkowita masa?',
    exactNumbers: ['5'],
    measuredNumbers: ['2.34'],
    rawResult: 11.7,
    correctAnswer: '11.7',
    correctSigFigs: 3,
    explanation: '5 × 2.34 = 11.7 g. 5 er talið (nákvæmt), 2.34 (3 sf) ræður.',
    explanationEn: '5 × 2.34 = 11.7 g. 5 is counted (exact), 2.34 (3 sf) determines precision.',
    explanationPl: '5 × 2,34 = 11,7 g. 5 jest zliczone (dokładne), 2,34 (3 cz) określa precyzję.',
    difficulty: 'easy',
  },
  {
    id: 'mc8',
    problem: 'Umbreyttu 3.5 tommur í cm. (1 tomma = 2.54 cm nákvæmlega)',
    problemEn: 'Convert 3.5 inches to cm. (1 inch = 2.54 cm exactly)',
    problemPl: 'Zamień 3,5 cala na cm. (1 cal = 2,54 cm dokładnie)',
    exactNumbers: ['2.54'],
    measuredNumbers: ['3.5'],
    rawResult: 8.89,
    correctAnswer: '8.9',
    correctSigFigs: 2,
    explanation: '3.5 × 2.54 = 8.89 → 8.9 cm. 2.54 er skilgreining (nákvæm), 3.5 (2 sf) ræður.',
    explanationEn: '3.5 × 2.54 = 8.89 → 8.9 cm. 2.54 is a definition (exact), 3.5 (2 sf) determines precision.',
    explanationPl: '3,5 × 2,54 = 8,89 → 8,9 cm. 2,54 to definicja (dokładna), 3,5 (2 cz) określa precyzję.',
    difficulty: 'medium',
  },
];

// Key concept: Why exact numbers don't limit sig figs
export const EXACT_NUMBER_CONCEPT = {
  titleIs: 'Hvers vegna takmarka nákvæmar tölur ekki markverða tölustafi?',
  titleEn: 'Why don\'t exact numbers limit significant figures?',
  titlePl: 'Dlaczego dokładne liczby nie ograniczają cyfr znaczących?',
  explanationIs: `
Nákvæmar tölur hafa óendanlega marga markverða tölustafi vegna þess að þær eru ekki mældar - þær eru annaðhvort:
• Taldar (12 egg þýðir nákvæmlega 12.000000... egg)
• Skilgreindar (1 km = 1000.000000... m)
• Stærðfræðilegar staðreyndir (stuðullinn 2 í 2H₂O er nákvæmlega 2.000000...)

Þegar við reiknum, takmarkar aðeins mælda gildið fjölda markverðra tölustafa í svarinu.
  `,
  explanationEn: `
Exact numbers have infinite significant figures because they are not measured - they are either:
• Counted (12 eggs means exactly 12.000000... eggs)
• Defined (1 km = 1000.000000... m)
• Mathematical facts (the coefficient 2 in 2H₂O is exactly 2.000000...)

When calculating, only the measured value limits the number of significant figures in the answer.
  `,
  explanationPl: `
Dokładne liczby mają nieskończenie wiele cyfr znaczących, ponieważ nie są mierzone - są albo:
• Zliczone (12 jaj oznacza dokładnie 12,000000... jaj)
• Zdefiniowane (1 km = 1000,000000... m)
• Faktami matematycznymi (współczynnik 2 w 2H₂O to dokładnie 2,000000...)

Przy obliczeniach tylko zmierzona wartość ogranicza liczbę cyfr znaczących w odpowiedzi.
  `,
};

// Common misconception to address
export const COMMON_MISCONCEPTIONS = [
  {
    id: 'misc1',
    misconception: 'Talan 2 í "2H₂O" takmarkar svarið við 1 markverðan tölustaf',
    misconceptionEn: 'The 2 in "2H₂O" limits the answer to 1 significant figure',
    misconceptionPl: 'Cyfra 2 w "2H₂O" ogranicza odpowiedź do 1 cyfry znaczącej',
    truth: 'Stuðullinn 2 er nákvæmur (óendanlega margir sf), svo hann takmarkar ekki svarið.',
    truthEn: 'The coefficient 2 is exact (infinite sf), so it doesn\'t limit the answer.',
    truthPl: 'Współczynnik 2 jest dokładny (nieskończenie wiele cz), więc nie ogranicza odpowiedzi.',
  },
  {
    id: 'misc2',
    misconception: '1000 í "1 km = 1000 m" hefur bara 1 markverðan tölustaf',
    misconceptionEn: '1000 in "1 km = 1000 m" has only 1 significant figure',
    misconceptionPl: '1000 w "1 km = 1000 m" ma tylko 1 cyfrę znaczącą',
    truth: 'Þetta er skilgreining, ekki mæling. 1000 er nákvæmt (óendanlega margir sf).',
    truthEn: 'This is a definition, not a measurement. 1000 is exact (infinite sf).',
    truthPl: 'To jest definicja, nie pomiar. 1000 jest dokładne (nieskończenie wiele cz).',
  },
  {
    id: 'misc3',
    misconception: 'Ef ég tel 12 egg, hefur "12" bara 2 markverða tölustafi',
    misconceptionEn: 'If I count 12 eggs, "12" has only 2 significant figures',
    misconceptionPl: 'Jeśli policzę 12 jaj, "12" ma tylko 2 cyfry znaczące',
    truth: 'Taldar tölur eru nákvæmar. 12 egg = 12.000000... egg.',
    truthEn: 'Counted numbers are exact. 12 eggs = 12.000000... eggs.',
    truthPl: 'Liczby zliczone są dokładne. 12 jaj = 12,000000... jaj.',
  },
];
