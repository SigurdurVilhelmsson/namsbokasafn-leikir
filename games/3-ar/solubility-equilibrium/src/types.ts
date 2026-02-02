/**
 * Types for Solubility Equilibrium (Ksp) Game
 */

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type ProblemType =
  | 'write_ksp'           // Write Ksp expression
  | 'compare_solubility'  // Compare solubility using Ksp
  | 'calculate_solubility'// Calculate molar solubility from Ksp
  | 'calculate_ksp'       // Calculate Ksp from solubility data
  | 'common_ion'          // Common ion effect
  | 'predict_precipitate' // Will precipitate form? (Q vs Ksp)
  | 'selective_precipitation'; // Which precipitates first?

export interface IonicCompound {
  formula: string;        // e.g., "AgCl"
  name: string;           // English name
  nameIs: string;         // Icelandic name
  cation: string;         // e.g., "Ag+"
  anion: string;          // e.g., "Cl-"
  cationCoeff: number;    // Stoichiometric coefficient
  anionCoeff: number;     // Stoichiometric coefficient
  Ksp: number;            // Solubility product constant at 25°C
  molarMass: number;      // g/mol
  color?: string;         // Color of precipitate
}

export interface KspProblem {
  id: number;
  type: ProblemType;
  difficulty: DifficultyLevel;
  compound: IonicCompound;
  questionIs: string;
  question: string;
  // For calculation problems
  givenData?: {
    solubility?: number;      // mol/L or g/L
    solubilityUnit?: 'mol/L' | 'g/L';
    commonIon?: {
      ion: string;
      concentration: number;  // M
    };
    mixingVolumes?: {
      solution1: { ion: string; concentration: number; volume: number }; // mL
      solution2: { ion: string; concentration: number; volume: number }; // mL
    };
  };
  answer: number | string | boolean;
  answerUnit?: string;
  tolerance?: number;       // For numerical answers (relative tolerance)
  explanation: string;
  explanationIs: string;
  hints: {
    topic: string;
    strategy: string;
    method: string;
    solution: string;
  };
}

export interface Level1Challenge {
  id: number;
  compound: IonicCompound;
  type: 'write_ksp' | 'compare_solubility';
  questionIs: string;
  question: string;
  // For write_ksp: correct expression
  correctExpression?: string;
  // For compare_solubility: compounds to compare
  compoundsToCompare?: IonicCompound[];
  correctOrder?: string[];  // Formula order from least to most soluble
  explanation: string;
  explanationIs: string;
}

export interface Level2Problem {
  id: number;
  compound: IonicCompound;
  type: 'calculate_solubility' | 'calculate_ksp' | 'common_ion';
  difficulty: 'basic' | 'with_stoichiometry' | 'common_ion';
  questionIs: string;
  question: string;
  givenData: {
    Ksp?: number;
    solubility?: number;
    solubilityUnit?: 'mol/L' | 'g/L';
    commonIon?: {
      ion: string;
      concentration: number;
    };
  };
  answer: number;
  answerUnit: string;
  tolerance: number;
  steps: string[];        // Step-by-step solution
  stepsIs: string[];      // Icelandic steps
  hints: {
    topic: string;
    strategy: string;
    method: string;
    solution: string;
  };
}

export interface Level3Problem {
  id: number;
  type: 'predict_precipitate' | 'selective_precipitation';
  difficulty: DifficultyLevel;
  questionIs: string;
  question: string;
  compounds: IonicCompound[];
  mixingData: {
    solution1: {
      ion: string;
      concentration: number; // M
      volume: number;        // mL
    };
    solution2: {
      ion: string;
      concentration: number; // M
      volume: number;        // mL
    };
  };
  // For predict_precipitate
  willPrecipitate?: boolean;
  Q?: number;
  // For selective_precipitation
  precipitationOrder?: string[]; // Formula order
  explanation: string;
  explanationIs: string;
  hints: {
    topic: string;
    strategy: string;
    method: string;
    solution: string;
  };
}

export interface GameProgress {
  level1Completed: boolean;
  level1Score: number;
  level2Completed: boolean;
  level2Score: number;
  level3Completed: boolean;
  level3Score: number;
  totalGamesPlayed: number;
}

export type ActiveLevel = 'menu' | 'level1' | 'level2' | 'level3';
