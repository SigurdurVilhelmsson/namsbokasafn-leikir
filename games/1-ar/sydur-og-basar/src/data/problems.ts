// Neutralization stoichiometry calculation problems

export interface StoichiometryProblem {
  id: string;
  questionIs: string;
  questionEn: string;
  /** Volume of acid in mL */
  acidVolume: number;
  /** Molarity of acid in M */
  acidMolarity: number;
  /** Volume of base in mL (if given) */
  baseVolume: number | null;
  /** Molarity of base in M (if given) */
  baseMolarity: number | null;
  /** What we are solving for: volume or molarity */
  solveFor: 'baseVolume' | 'acidVolume' | 'baseMolarity' | 'acidMolarity';
  /** The correct answer (numeric) */
  answer: number;
  /** Unit of the answer */
  unit: string;
  /** Acid coefficient in balanced equation */
  acidCoeff: number;
  /** Base coefficient in balanced equation */
  baseCoeff: number;
  /** The balanced equation for reference */
  equation: string;
  /** Hint explaining the steps */
  hintIs: string;
  hintEn: string;
  /** Solution steps */
  solutionIs: string[];
  solutionEn: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export const PROBLEMS: StoichiometryProblem[] = [
  {
    id: 'prob1',
    questionIs: 'Hversu marga mL af 0,10 M NaOH \u00fearf til a\u00f0 hlutleysa 25,0 mL af 0,15 M HCl?',
    questionEn: 'How many mL of 0.10 M NaOH are needed to neutralize 25.0 mL of 0.15 M HCl?',
    acidVolume: 25.0,
    acidMolarity: 0.15,
    baseVolume: null,
    baseMolarity: 0.10,
    solveFor: 'baseVolume',
    answer: 37.5,
    unit: 'mL',
    acidCoeff: 1,
    baseCoeff: 1,
    equation: 'HCl + NaOH \u2192 NaCl + H\u2082O',
    hintIs: 'Nota\u00f0u: M\u2081V\u2081 = M\u2082V\u2082 (\u00fear sem stuil eru 1:1)',
    hintEn: 'Use: M\u2081V\u2081 = M\u2082V\u2082 (since coefficients are 1:1)',
    solutionIs: [
      'n(HCl) = M \u00d7 V = 0,15 \u00d7 0,025 = 0,00375 mol',
      'Hlutfall: 1 HCl : 1 NaOH, svo n(NaOH) = 0,00375 mol',
      'V(NaOH) = n / M = 0,00375 / 0,10 = 0,0375 L = 37,5 mL',
    ],
    solutionEn: [
      'n(HCl) = M \u00d7 V = 0.15 \u00d7 0.025 = 0.00375 mol',
      'Ratio: 1 HCl : 1 NaOH, so n(NaOH) = 0.00375 mol',
      'V(NaOH) = n / M = 0.00375 / 0.10 = 0.0375 L = 37.5 mL',
    ],
    difficulty: 'easy',
  },
  {
    id: 'prob2',
    questionIs: 'Hversu marga mL af 0,20 M KOH \u00fearf til a\u00f0 hlutleysa 30,0 mL af 0,10 M H\u2082SO\u2084?',
    questionEn: 'How many mL of 0.20 M KOH are needed to neutralize 30.0 mL of 0.10 M H\u2082SO\u2084?',
    acidVolume: 30.0,
    acidMolarity: 0.10,
    baseVolume: null,
    baseMolarity: 0.20,
    solveFor: 'baseVolume',
    answer: 30.0,
    unit: 'mL',
    acidCoeff: 1,
    baseCoeff: 2,
    equation: 'H\u2082SO\u2084 + 2KOH \u2192 K\u2082SO\u2084 + 2H\u2082O',
    hintIs: 'H\u2082SO\u2084 er tv\u00edpr\u00f3t\u00f3n s\u00fdra: hlutfalli\u00f0 er 1:2',
    hintEn: 'H\u2082SO\u2084 is diprotic: the ratio is 1:2',
    solutionIs: [
      'n(H\u2082SO\u2084) = 0,10 \u00d7 0,030 = 0,003 mol',
      'Hlutfall: 1 H\u2082SO\u2084 : 2 KOH, svo n(KOH) = 2 \u00d7 0,003 = 0,006 mol',
      'V(KOH) = 0,006 / 0,20 = 0,030 L = 30,0 mL',
    ],
    solutionEn: [
      'n(H\u2082SO\u2084) = 0.10 \u00d7 0.030 = 0.003 mol',
      'Ratio: 1 H\u2082SO\u2084 : 2 KOH, so n(KOH) = 2 \u00d7 0.003 = 0.006 mol',
      'V(KOH) = 0.006 / 0.20 = 0.030 L = 30.0 mL',
    ],
    difficulty: 'medium',
  },
  {
    id: 'prob3',
    questionIs: 'Hversu marga mL af 0,25 M HCl \u00fearf til a\u00f0 hlutleysa 20,0 mL af 0,50 M NaOH?',
    questionEn: 'How many mL of 0.25 M HCl are needed to neutralize 20.0 mL of 0.50 M NaOH?',
    acidVolume: 0,
    acidMolarity: 0.25,
    baseVolume: 20.0,
    baseMolarity: 0.50,
    solveFor: 'acidVolume',
    answer: 40.0,
    unit: 'mL',
    acidCoeff: 1,
    baseCoeff: 1,
    equation: 'HCl + NaOH \u2192 NaCl + H\u2082O',
    hintIs: 'Nota\u00f0u: M\u2081V\u2081 = M\u2082V\u2082 til a\u00f0 finna r\u00famm\u00e1l s\u00fdrunnar',
    hintEn: 'Use: M\u2081V\u2081 = M\u2082V\u2082 to find the acid volume',
    solutionIs: [
      'n(NaOH) = 0,50 \u00d7 0,020 = 0,010 mol',
      'Hlutfall: 1:1, svo n(HCl) = 0,010 mol',
      'V(HCl) = 0,010 / 0,25 = 0,040 L = 40,0 mL',
    ],
    solutionEn: [
      'n(NaOH) = 0.50 \u00d7 0.020 = 0.010 mol',
      'Ratio: 1:1, so n(HCl) = 0.010 mol',
      'V(HCl) = 0.010 / 0.25 = 0.040 L = 40.0 mL',
    ],
    difficulty: 'easy',
  },
  {
    id: 'prob4',
    questionIs: 'Hversu marga mL af 0,30 M NaOH \u00fearf til a\u00f0 hlutleysa 50,0 mL af 0,12 M H\u2082SO\u2084?',
    questionEn: 'How many mL of 0.30 M NaOH are needed to neutralize 50.0 mL of 0.12 M H\u2082SO\u2084?',
    acidVolume: 50.0,
    acidMolarity: 0.12,
    baseVolume: null,
    baseMolarity: 0.30,
    solveFor: 'baseVolume',
    answer: 40.0,
    unit: 'mL',
    acidCoeff: 1,
    baseCoeff: 2,
    equation: 'H\u2082SO\u2084 + 2NaOH \u2192 Na\u2082SO\u2084 + 2H\u2082O',
    hintIs: 'H\u2082SO\u2084 er tv\u00edpr\u00f3t\u00f3n: \u00fearf 2 m\u00f3l NaOH fyrir hvert m\u00f3l H\u2082SO\u2084',
    hintEn: 'H\u2082SO\u2084 is diprotic: need 2 mol NaOH per mol H\u2082SO\u2084',
    solutionIs: [
      'n(H\u2082SO\u2084) = 0,12 \u00d7 0,050 = 0,006 mol',
      'Hlutfall: 1:2, svo n(NaOH) = 2 \u00d7 0,006 = 0,012 mol',
      'V(NaOH) = 0,012 / 0,30 = 0,040 L = 40,0 mL',
    ],
    solutionEn: [
      'n(H\u2082SO\u2084) = 0.12 \u00d7 0.050 = 0.006 mol',
      'Ratio: 1:2, so n(NaOH) = 2 \u00d7 0.006 = 0.012 mol',
      'V(NaOH) = 0.012 / 0.30 = 0.040 L = 40.0 mL',
    ],
    difficulty: 'medium',
  },
  {
    id: 'prob5',
    questionIs: 'Hver er m\u00f3lstyrkleiki (M) NaOH lausnar ef 35,0 mL af henni hlutleysa 25,0 mL af 0,14 M HCl?',
    questionEn: 'What is the molarity (M) of a NaOH solution if 35.0 mL of it neutralizes 25.0 mL of 0.14 M HCl?',
    acidVolume: 25.0,
    acidMolarity: 0.14,
    baseVolume: 35.0,
    baseMolarity: null,
    solveFor: 'baseMolarity',
    answer: 0.10,
    unit: 'M',
    acidCoeff: 1,
    baseCoeff: 1,
    equation: 'HCl + NaOH \u2192 NaCl + H\u2082O',
    hintIs: 'Reikna\u00f0u n(HCl), \u00fea\u00f0 jafngildir n(NaOH). Deili\u00f0 me\u00f0 r\u00famm\u00e1li.',
    hintEn: 'Calculate n(HCl), that equals n(NaOH). Divide by volume.',
    solutionIs: [
      'n(HCl) = 0,14 \u00d7 0,025 = 0,0035 mol',
      'Hlutfall: 1:1, svo n(NaOH) = 0,0035 mol',
      'M(NaOH) = 0,0035 / 0,035 = 0,10 M',
    ],
    solutionEn: [
      'n(HCl) = 0.14 \u00d7 0.025 = 0.0035 mol',
      'Ratio: 1:1, so n(NaOH) = 0.0035 mol',
      'M(NaOH) = 0.0035 / 0.035 = 0.10 M',
    ],
    difficulty: 'medium',
  },
  {
    id: 'prob6',
    questionIs: 'Hversu marga mL af 0,15 M Ca(OH)\u2082 \u00fearf til a\u00f0 hlutleysa 40,0 mL af 0,30 M HCl?',
    questionEn: 'How many mL of 0.15 M Ca(OH)\u2082 are needed to neutralize 40.0 mL of 0.30 M HCl?',
    acidVolume: 40.0,
    acidMolarity: 0.30,
    baseVolume: null,
    baseMolarity: 0.15,
    solveFor: 'baseVolume',
    answer: 40.0,
    unit: 'mL',
    acidCoeff: 2,
    baseCoeff: 1,
    equation: '2HCl + Ca(OH)\u2082 \u2192 CaCl\u2082 + 2H\u2082O',
    hintIs: 'Ca(OH)\u2082 hefur 2 OH\u207b: hlutfalli\u00f0 er 2 HCl : 1 Ca(OH)\u2082',
    hintEn: 'Ca(OH)\u2082 has 2 OH\u207b: ratio is 2 HCl : 1 Ca(OH)\u2082',
    solutionIs: [
      'n(HCl) = 0,30 \u00d7 0,040 = 0,012 mol',
      'Hlutfall: 2:1, svo n(Ca(OH)\u2082) = 0,012 / 2 = 0,006 mol',
      'V(Ca(OH)\u2082) = 0,006 / 0,15 = 0,040 L = 40,0 mL',
    ],
    solutionEn: [
      'n(HCl) = 0.30 \u00d7 0.040 = 0.012 mol',
      'Ratio: 2:1, so n(Ca(OH)\u2082) = 0.012 / 2 = 0.006 mol',
      'V(Ca(OH)\u2082) = 0.006 / 0.15 = 0.040 L = 40.0 mL',
    ],
    difficulty: 'hard',
  },
  {
    id: 'prob7',
    questionIs: 'Hversu marga mL af 0,20 M HNO\u2083 \u00fearf til a\u00f0 hlutleysa 15,0 mL af 0,40 M KOH?',
    questionEn: 'How many mL of 0.20 M HNO\u2083 are needed to neutralize 15.0 mL of 0.40 M KOH?',
    acidVolume: 0,
    acidMolarity: 0.20,
    baseVolume: 15.0,
    baseMolarity: 0.40,
    solveFor: 'acidVolume',
    answer: 30.0,
    unit: 'mL',
    acidCoeff: 1,
    baseCoeff: 1,
    equation: 'HNO\u2083 + KOH \u2192 KNO\u2083 + H\u2082O',
    hintIs: 'Finndu m\u00f3l KOH, \u00fea\u00f0 jafngildir m\u00f3l HNO\u2083 (\u00fear sem 1:1)',
    hintEn: 'Find mol KOH, that equals mol HNO\u2083 (since 1:1)',
    solutionIs: [
      'n(KOH) = 0,40 \u00d7 0,015 = 0,006 mol',
      'Hlutfall: 1:1, svo n(HNO\u2083) = 0,006 mol',
      'V(HNO\u2083) = 0,006 / 0,20 = 0,030 L = 30,0 mL',
    ],
    solutionEn: [
      'n(KOH) = 0.40 \u00d7 0.015 = 0.006 mol',
      'Ratio: 1:1, so n(HNO\u2083) = 0.006 mol',
      'V(HNO\u2083) = 0.006 / 0.20 = 0.030 L = 30.0 mL',
    ],
    difficulty: 'easy',
  },
  {
    id: 'prob8',
    questionIs: 'Hver er m\u00f3lstyrkleiki HCl lausnar ef 20,0 mL af henni hlutleysa 40,0 mL af 0,050 M NaOH?',
    questionEn: 'What is the molarity of an HCl solution if 20.0 mL of it neutralizes 40.0 mL of 0.050 M NaOH?',
    acidVolume: 20.0,
    acidMolarity: 0,
    baseVolume: 40.0,
    baseMolarity: 0.050,
    solveFor: 'acidMolarity',
    answer: 0.10,
    unit: 'M',
    acidCoeff: 1,
    baseCoeff: 1,
    equation: 'HCl + NaOH \u2192 NaCl + H\u2082O',
    hintIs: 'Reikna\u00f0u n(NaOH), \u00fea\u00f0 jafngildir n(HCl). Deili\u00f0 me\u00f0 r\u00famm\u00e1li HCl.',
    hintEn: 'Calculate n(NaOH), that equals n(HCl). Divide by HCl volume.',
    solutionIs: [
      'n(NaOH) = 0,050 \u00d7 0,040 = 0,002 mol',
      'Hlutfall: 1:1, svo n(HCl) = 0,002 mol',
      'M(HCl) = 0,002 / 0,020 = 0,10 M',
    ],
    solutionEn: [
      'n(NaOH) = 0.050 \u00d7 0.040 = 0.002 mol',
      'Ratio: 1:1, so n(HCl) = 0.002 mol',
      'M(HCl) = 0.002 / 0.020 = 0.10 M',
    ],
    difficulty: 'medium',
  },
];
