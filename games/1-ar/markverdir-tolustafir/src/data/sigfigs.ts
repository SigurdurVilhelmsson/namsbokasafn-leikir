/**
 * Significant Figures (Markverðir tölustafir) Data
 * Level 1: Count sig figs
 * Level 2: Calculations with sig figs
 * Level 3: Scientific notation
 */

export interface SigFigNumber {
  id: string;
  value: string;
  sigFigs: number;
  explanation: string;
  explanationEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SigFigCalculation {
  id: string;
  expression: string;
  operands: number[];
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
  rawResult: number;
  correctAnswer: string;
  sigFigs: number;
  explanation: string;
  explanationEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SciNotationProblem {
  id: string;
  type: 'to-scientific' | 'from-scientific' | 'calculation';
  question: string;
  questionEn: string;
  value?: string;
  correctAnswer: string;
  explanation: string;
  explanationEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Level 1: Counting Significant Figures
export const SIG_FIG_NUMBERS: SigFigNumber[] = [
  // Easy - Non-zero digits
  {
    id: 'sf1',
    value: '123',
    sigFigs: 3,
    explanation: 'Allir tölustafir sem eru ekki núll eru markverðir.',
    explanationEn: 'All non-zero digits are significant.',
    difficulty: 'easy',
  },
  {
    id: 'sf2',
    value: '45.6',
    sigFigs: 3,
    explanation: 'Allir tölustafir sem eru ekki núll eru markverðir.',
    explanationEn: 'All non-zero digits are significant.',
    difficulty: 'easy',
  },
  {
    id: 'sf3',
    value: '7.89',
    sigFigs: 3,
    explanation: 'Allir tölustafir sem eru ekki núll eru markverðir.',
    explanationEn: 'All non-zero digits are significant.',
    difficulty: 'easy',
  },
  {
    id: 'sf4',
    value: '56',
    sigFigs: 2,
    explanation: 'Allir tölustafir sem eru ekki núll eru markverðir.',
    explanationEn: 'All non-zero digits are significant.',
    difficulty: 'easy',
  },
  // Easy - Captive zeros
  {
    id: 'sf5',
    value: '101',
    sigFigs: 3,
    explanation: 'Núll á milli tveggja markverðra tölustafa er markvert (captive zero).',
    explanationEn: 'Zeros between two significant digits are significant (captive zeros).',
    difficulty: 'easy',
  },
  {
    id: 'sf6',
    value: '1.05',
    sigFigs: 3,
    explanation: 'Núll á milli tveggja markverðra tölustafa er markvert.',
    explanationEn: 'Zeros between two significant digits are significant.',
    difficulty: 'easy',
  },
  {
    id: 'sf7',
    value: '20.08',
    sigFigs: 4,
    explanation: 'Núll á milli markverðra tölustafa eru markverð.',
    explanationEn: 'Zeros between significant digits are significant.',
    difficulty: 'easy',
  },
  // Medium - Leading zeros (not significant)
  {
    id: 'sf8',
    value: '0.045',
    sigFigs: 2,
    explanation: 'Núll framarlega (leading zeros) eru EKKI markverð. Aðeins 4 og 5 eru markverð.',
    explanationEn: 'Leading zeros are NOT significant. Only 4 and 5 are significant.',
    difficulty: 'medium',
  },
  {
    id: 'sf9',
    value: '0.00123',
    sigFigs: 3,
    explanation: 'Núll framarlega eru ekki markverð. Aðeins 1, 2 og 3 eru markverð.',
    explanationEn: 'Leading zeros are not significant. Only 1, 2, and 3 are significant.',
    difficulty: 'medium',
  },
  {
    id: 'sf10',
    value: '0.0050',
    sigFigs: 2,
    explanation: 'Núll framarlega eru ekki markverð, en núll aftarlega (trailing zero) eftir kommu ER markvert.',
    explanationEn: 'Leading zeros are not significant, but trailing zeros after decimal point ARE significant.',
    difficulty: 'medium',
  },
  // Medium - Trailing zeros with decimal
  {
    id: 'sf11',
    value: '2.50',
    sigFigs: 3,
    explanation: 'Núll aftarlega eftir kommu ER markvert.',
    explanationEn: 'Trailing zeros after decimal point ARE significant.',
    difficulty: 'medium',
  },
  {
    id: 'sf12',
    value: '100.',
    sigFigs: 3,
    explanation: 'Komma gefur til kynna að núllin séu markverð.',
    explanationEn: 'The decimal point indicates the zeros are significant.',
    difficulty: 'medium',
  },
  {
    id: 'sf13',
    value: '50.00',
    sigFigs: 4,
    explanation: 'Núll aftarlega eftir kommu eru markverð.',
    explanationEn: 'Trailing zeros after decimal point are significant.',
    difficulty: 'medium',
  },
  // Hard - Trailing zeros without decimal (ambiguous)
  {
    id: 'sf14',
    value: '1000',
    sigFigs: 1,
    explanation: 'Núll aftarlega án kommu eru EKKI markverð. Aðeins 1 er markvert.',
    explanationEn: 'Trailing zeros without decimal are NOT significant. Only 1 is significant.',
    difficulty: 'hard',
  },
  {
    id: 'sf15',
    value: '2500',
    sigFigs: 2,
    explanation: 'Núll aftarlega án kommu eru ekki markverð. Aðeins 2 og 5 eru markverð.',
    explanationEn: 'Trailing zeros without decimal are not significant. Only 2 and 5 are significant.',
    difficulty: 'hard',
  },
  {
    id: 'sf16',
    value: '0.002030',
    sigFigs: 4,
    explanation: 'Núll framarlega: ekki markverð. Núll á milli: markvert. Núll aftarlega eftir kommu: markvert.',
    explanationEn: 'Leading zeros: not significant. Captive zeros: significant. Trailing zeros after decimal: significant.',
    difficulty: 'hard',
  },
  {
    id: 'sf17',
    value: '6.022 × 10²³',
    sigFigs: 4,
    explanation: 'Í vísindarithátt teljum við aðeins tölustafina í stuðlinum (6.022).',
    explanationEn: 'In scientific notation, count only digits in the coefficient (6.022).',
    difficulty: 'hard',
  },
  {
    id: 'sf18',
    value: '3.00 × 10⁸',
    sigFigs: 3,
    explanation: 'Núll aftarlega í stuðlinum eru markverð.',
    explanationEn: 'Trailing zeros in the coefficient are significant.',
    difficulty: 'hard',
  },
  {
    id: 'sf19',
    value: '1.0 × 10⁻⁵',
    sigFigs: 2,
    explanation: 'Í vísindarithátt teljum við tölustafina í stuðlinum: 1 og 0.',
    explanationEn: 'In scientific notation, count digits in the coefficient: 1 and 0.',
    difficulty: 'hard',
  },
  {
    id: 'sf20',
    value: '40300',
    sigFigs: 3,
    explanation: 'Núll á milli markverð. Núll aftarlega án kommu: ekki markverð.',
    explanationEn: 'Captive zeros significant. Trailing zeros without decimal: not significant.',
    difficulty: 'hard',
  },
];

// Level 2: Calculations with Significant Figures
export const SIG_FIG_CALCULATIONS: SigFigCalculation[] = [
  // Addition/Subtraction - use least decimal places
  {
    id: 'calc1',
    expression: '12.5 + 1.32',
    operands: [12.5, 1.32],
    operation: 'add',
    rawResult: 13.82,
    correctAnswer: '13.8',
    sigFigs: 3,
    explanation: 'Við samlagningu/frádrátt notum við fjölda aukastafa. 12.5 hefur 1 aukastaf → svar: 1 aukastafur.',
    explanationEn: 'In addition/subtraction, use decimal places. 12.5 has 1 decimal place → answer: 1 decimal place.',
    difficulty: 'easy',
  },
  {
    id: 'calc2',
    expression: '25.0 + 3.456',
    operands: [25.0, 3.456],
    operation: 'add',
    rawResult: 28.456,
    correctAnswer: '28.5',
    sigFigs: 3,
    explanation: '25.0 hefur 1 aukastaf, 3.456 hefur 3. Notum 1 aukastaf.',
    explanationEn: '25.0 has 1 decimal place, 3.456 has 3. Use 1 decimal place.',
    difficulty: 'easy',
  },
  {
    id: 'calc3',
    expression: '100.5 − 25.23',
    operands: [100.5, 25.23],
    operation: 'subtract',
    rawResult: 75.27,
    correctAnswer: '75.3',
    sigFigs: 3,
    explanation: '100.5 hefur 1 aukastaf → svar með 1 aukastaf.',
    explanationEn: '100.5 has 1 decimal place → answer with 1 decimal place.',
    difficulty: 'easy',
  },
  {
    id: 'calc4',
    expression: '1.234 + 5.6',
    operands: [1.234, 5.6],
    operation: 'add',
    rawResult: 6.834,
    correctAnswer: '6.8',
    sigFigs: 2,
    explanation: '5.6 hefur aðeins 1 aukastaf. Svarið verður 6.8.',
    explanationEn: '5.6 has only 1 decimal place. Answer becomes 6.8.',
    difficulty: 'easy',
  },
  // Multiplication/Division - use least sig figs
  {
    id: 'calc5',
    expression: '2.5 × 3.42',
    operands: [2.5, 3.42],
    operation: 'multiply',
    rawResult: 8.55,
    correctAnswer: '8.6',
    sigFigs: 2,
    explanation: 'Við margföldun/deilingu notum við fjölda markverðra tölustafa. 2.5 hefur 2 markverða → svar: 2 markverðir.',
    explanationEn: 'In multiplication/division, use sig figs. 2.5 has 2 sig figs → answer: 2 sig figs.',
    difficulty: 'medium',
  },
  {
    id: 'calc6',
    expression: '4.56 × 1.2',
    operands: [4.56, 1.2],
    operation: 'multiply',
    rawResult: 5.472,
    correctAnswer: '5.5',
    sigFigs: 2,
    explanation: '1.2 hefur 2 markverða tölustafi → svar: 2 markverðir.',
    explanationEn: '1.2 has 2 sig figs → answer: 2 sig figs.',
    difficulty: 'medium',
  },
  {
    id: 'calc7',
    expression: '8.4 ÷ 2.1',
    operands: [8.4, 2.1],
    operation: 'divide',
    rawResult: 4.0,
    correctAnswer: '4.0',
    sigFigs: 2,
    explanation: 'Báðar tölur hafa 2 markverða. Svarið er 4.0 (með 2 markverðum).',
    explanationEn: 'Both numbers have 2 sig figs. Answer is 4.0 (with 2 sig figs).',
    difficulty: 'medium',
  },
  {
    id: 'calc8',
    expression: '45.67 ÷ 3.2',
    operands: [45.67, 3.2],
    operation: 'divide',
    rawResult: 14.271875,
    correctAnswer: '14',
    sigFigs: 2,
    explanation: '3.2 hefur 2 markverða → svar: 2 markverðir (14).',
    explanationEn: '3.2 has 2 sig figs → answer: 2 sig figs (14).',
    difficulty: 'medium',
  },
  {
    id: 'calc9',
    expression: '12.34 × 5.678',
    operands: [12.34, 5.678],
    operation: 'multiply',
    rawResult: 70.06652,
    correctAnswer: '70.07',
    sigFigs: 4,
    explanation: '12.34 hefur 4 markverða, 5.678 hefur 4. Svar: 4 markverðir.',
    explanationEn: '12.34 has 4 sig figs, 5.678 has 4. Answer: 4 sig figs.',
    difficulty: 'hard',
  },
  {
    id: 'calc10',
    expression: '0.0045 × 120',
    operands: [0.0045, 120],
    operation: 'multiply',
    rawResult: 0.54,
    correctAnswer: '0.54',
    sigFigs: 2,
    explanation: '0.0045 hefur 2 markverða, 120 hefur 2. Svar: 0.54 (2 markverðir).',
    explanationEn: '0.0045 has 2 sig figs, 120 has 2. Answer: 0.54 (2 sig figs).',
    difficulty: 'hard',
  },
  {
    id: 'calc11',
    expression: '2.000 × 3.00',
    operands: [2.0, 3.0],
    operation: 'multiply',
    rawResult: 6.0,
    correctAnswer: '6.00',
    sigFigs: 3,
    explanation: '2.000 hefur 4, 3.00 hefur 3. Notum 3 markverða → 6.00.',
    explanationEn: '2.000 has 4, 3.00 has 3. Use 3 sig figs → 6.00.',
    difficulty: 'hard',
  },
  {
    id: 'calc12',
    expression: '567 ÷ 4.5',
    operands: [567, 4.5],
    operation: 'divide',
    rawResult: 126,
    correctAnswer: '1.3 × 10²',
    sigFigs: 2,
    explanation: '4.5 hefur 2 markverða → svar: 2 markverðir. Best að nota vísindarithátt.',
    explanationEn: '4.5 has 2 sig figs → answer: 2 sig figs. Best in scientific notation.',
    difficulty: 'hard',
  },
];

// Level 3: Scientific Notation
export const SCI_NOTATION_PROBLEMS: SciNotationProblem[] = [
  // To scientific notation
  {
    id: 'sci1',
    type: 'to-scientific',
    question: 'Skrifaðu 4500 í vísindarithátt',
    questionEn: 'Write 4500 in scientific notation',
    value: '4500',
    correctAnswer: '4.5 × 10³',
    explanation: 'Færum kommuna 3 sæti til vinstri: 4.5 × 10³',
    explanationEn: 'Move decimal 3 places left: 4.5 × 10³',
    difficulty: 'easy',
  },
  {
    id: 'sci2',
    type: 'to-scientific',
    question: 'Skrifaðu 0.0032 í vísindarithátt',
    questionEn: 'Write 0.0032 in scientific notation',
    value: '0.0032',
    correctAnswer: '3.2 × 10⁻³',
    explanation: 'Færum kommuna 3 sæti til hægri: 3.2 × 10⁻³',
    explanationEn: 'Move decimal 3 places right: 3.2 × 10⁻³',
    difficulty: 'easy',
  },
  {
    id: 'sci3',
    type: 'to-scientific',
    question: 'Skrifaðu 6020000 í vísindarithátt',
    questionEn: 'Write 6020000 in scientific notation',
    value: '6020000',
    correctAnswer: '6.02 × 10⁶',
    explanation: 'Færum kommuna 6 sæti til vinstri: 6.02 × 10⁶',
    explanationEn: 'Move decimal 6 places left: 6.02 × 10⁶',
    difficulty: 'medium',
  },
  {
    id: 'sci4',
    type: 'to-scientific',
    question: 'Skrifaðu 0.000000045 í vísindarithátt',
    questionEn: 'Write 0.000000045 in scientific notation',
    value: '0.000000045',
    correctAnswer: '4.5 × 10⁻⁸',
    explanation: 'Færum kommuna 8 sæti til hægri: 4.5 × 10⁻⁸',
    explanationEn: 'Move decimal 8 places right: 4.5 × 10⁻⁸',
    difficulty: 'medium',
  },
  // From scientific notation
  {
    id: 'sci5',
    type: 'from-scientific',
    question: 'Skrifaðu 2.5 × 10⁴ sem venjulega tölu',
    questionEn: 'Write 2.5 × 10⁴ as a regular number',
    value: '2.5 × 10⁴',
    correctAnswer: '25000',
    explanation: 'Færum kommuna 4 sæti til hægri: 25000',
    explanationEn: 'Move decimal 4 places right: 25000',
    difficulty: 'easy',
  },
  {
    id: 'sci6',
    type: 'from-scientific',
    question: 'Skrifaðu 8.1 × 10⁻³ sem venjulega tölu',
    questionEn: 'Write 8.1 × 10⁻³ as a regular number',
    value: '8.1 × 10⁻³',
    correctAnswer: '0.0081',
    explanation: 'Færum kommuna 3 sæti til vinstri: 0.0081',
    explanationEn: 'Move decimal 3 places left: 0.0081',
    difficulty: 'easy',
  },
  {
    id: 'sci7',
    type: 'from-scientific',
    question: 'Skrifaðu 1.23 × 10⁵ sem venjulega tölu',
    questionEn: 'Write 1.23 × 10⁵ as a regular number',
    value: '1.23 × 10⁵',
    correctAnswer: '123000',
    explanation: 'Færum kommuna 5 sæti til hægri: 123000',
    explanationEn: 'Move decimal 5 places right: 123000',
    difficulty: 'medium',
  },
  // Calculations in scientific notation
  {
    id: 'sci8',
    type: 'calculation',
    question: 'Reiknaðu: (3.0 × 10²) × (2.0 × 10³)',
    questionEn: 'Calculate: (3.0 × 10²) × (2.0 × 10³)',
    correctAnswer: '6.0 × 10⁵',
    explanation: 'Margföldum stuðlana: 3.0 × 2.0 = 6.0. Leggjum saman veldisvísa: 2 + 3 = 5.',
    explanationEn: 'Multiply coefficients: 3.0 × 2.0 = 6.0. Add exponents: 2 + 3 = 5.',
    difficulty: 'medium',
  },
  {
    id: 'sci9',
    type: 'calculation',
    question: 'Reiknaðu: (4.5 × 10⁴) ÷ (1.5 × 10²)',
    questionEn: 'Calculate: (4.5 × 10⁴) ÷ (1.5 × 10²)',
    correctAnswer: '3.0 × 10²',
    explanation: 'Deilum stuðlum: 4.5 ÷ 1.5 = 3.0. Drögum frá veldisvísa: 4 - 2 = 2.',
    explanationEn: 'Divide coefficients: 4.5 ÷ 1.5 = 3.0. Subtract exponents: 4 - 2 = 2.',
    difficulty: 'medium',
  },
  {
    id: 'sci10',
    type: 'calculation',
    question: 'Reiknaðu: (2.4 × 10⁻²) × (5.0 × 10⁻³)',
    questionEn: 'Calculate: (2.4 × 10⁻²) × (5.0 × 10⁻³)',
    correctAnswer: '1.2 × 10⁻⁴',
    explanation: 'Stuðlar: 2.4 × 5.0 = 12 = 1.2 × 10¹. Veldisvísar: (-2) + (-3) + 1 = -4.',
    explanationEn: 'Coefficients: 2.4 × 5.0 = 12 = 1.2 × 10¹. Exponents: (-2) + (-3) + 1 = -4.',
    difficulty: 'hard',
  },
  {
    id: 'sci11',
    type: 'calculation',
    question: 'Reiknaðu: (6.0 × 10²³) × (1.5 × 10⁻²³)',
    questionEn: 'Calculate: (6.0 × 10²³) × (1.5 × 10⁻²³)',
    correctAnswer: '9.0',
    explanation: 'Stuðlar: 6.0 × 1.5 = 9.0. Veldisvísar: 23 + (-23) = 0. Svar: 9.0 × 10⁰ = 9.0.',
    explanationEn: 'Coefficients: 6.0 × 1.5 = 9.0. Exponents: 23 + (-23) = 0. Answer: 9.0 × 10⁰ = 9.0.',
    difficulty: 'hard',
  },
  {
    id: 'sci12',
    type: 'calculation',
    question: 'Reiknaðu: (8.0 × 10⁻⁵) ÷ (2.0 × 10⁻⁸)',
    questionEn: 'Calculate: (8.0 × 10⁻⁵) ÷ (2.0 × 10⁻⁸)',
    correctAnswer: '4.0 × 10³',
    explanation: 'Stuðlar: 8.0 ÷ 2.0 = 4.0. Veldisvísar: (-5) - (-8) = 3.',
    explanationEn: 'Coefficients: 8.0 ÷ 2.0 = 4.0. Exponents: (-5) - (-8) = 3.',
    difficulty: 'hard',
  },
];

// Sig fig rules for reference
export const SIG_FIG_RULES = [
  {
    id: 'rule1',
    rule: 'Allir tölustafir sem eru ekki núll eru markverðir',
    ruleEn: 'All non-zero digits are significant',
    example: '123 → 3 markverðir',
    exampleEn: '123 → 3 sig figs',
  },
  {
    id: 'rule2',
    rule: 'Núll á milli markverðra tölustafa eru markverð',
    ruleEn: 'Zeros between significant digits are significant',
    example: '101 → 3 markverðir',
    exampleEn: '101 → 3 sig figs',
  },
  {
    id: 'rule3',
    rule: 'Núll framarlega eru EKKI markverð',
    ruleEn: 'Leading zeros are NOT significant',
    example: '0.045 → 2 markverðir',
    exampleEn: '0.045 → 2 sig figs',
  },
  {
    id: 'rule4',
    rule: 'Núll aftarlega eftir kommu ERU markverð',
    ruleEn: 'Trailing zeros after decimal ARE significant',
    example: '2.50 → 3 markverðir',
    exampleEn: '2.50 → 3 sig figs',
  },
  {
    id: 'rule5',
    rule: 'Núll aftarlega án kommu eru EKKI markverð',
    ruleEn: 'Trailing zeros without decimal are NOT significant',
    example: '1000 → 1 markverður',
    exampleEn: '1000 → 1 sig fig',
  },
];
