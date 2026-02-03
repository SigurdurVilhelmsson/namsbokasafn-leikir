export type ActiveLevel = 'menu' | 'level1' | 'level2' | 'level3';

export interface GameProgress {
  level1Completed: boolean;
  level1Score: number;
  level2Completed: boolean;
  level2Score: number;
  level3Completed: boolean;
  level3Score: number;
  totalGamesPlayed: number;
}

export interface AcidBase {
  id: string;
  formula: string;
  name: string;
  nameIs: string;
  type: 'weak-acid' | 'weak-base';
  Ka?: number;
  Kb?: number;
  pKa?: number;
  pKb?: number;
  conjugate: string;
  conjugateName: string;
  context?: string;
}

export interface Level1Problem {
  id: number;
  type: 'write-ka' | 'write-kb' | 'ka-kb-relationship' | 'compare-strength';
  acidBase: AcidBase;
  question: string;
  questionIs: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  explanationIs: string;
  hint?: string;
  hintIs?: string;
}

export interface Level2Problem {
  id: number;
  type: 'ph-from-ka' | 'ph-from-kb' | 'concentration-from-ph' | 'ka-from-ph';
  acidBase: AcidBase;
  initialConcentration: number;
  givenValue?: number; // pH or Ka depending on problem type
  question: string;
  questionIs: string;
  correctAnswer: number;
  tolerance: number; // percentage tolerance for answer
  steps: string[];
  stepsIs: string[];
  hint?: string;
  hintIs?: string;
}

export interface Level3Problem {
  id: number;
  type: 'percent-ionization' | 'pka-pkb-conversion' | 'dilution-effect' | 'compare-ionization';
  acidBase: AcidBase;
  concentration?: number;
  question: string;
  questionIs: string;
  correctAnswer: number | string;
  tolerance?: number;
  explanation: string;
  explanationIs: string;
  hint?: string;
  hintIs?: string;
}
