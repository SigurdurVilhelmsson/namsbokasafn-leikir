/**
 * Types for Gas Law Challenge Game
 * Based on Ideal Gas Law: PV = nRT
 */

export type Variable = 'P' | 'V' | 'T' | 'n';

export type DifficultyLevel = 'Auðvelt' | 'Miðlungs' | 'Erfitt';

export type GameMode = 'practice' | 'challenge';

export interface GasValue {
  value: number;
  unit: string;
}

export interface GasLawQuestion {
  id: number;
  scenario_is: string; // Icelandic scenario
  scenario_en: string; // English scenario
  emoji: string;
  difficulty: DifficultyLevel;
  given: {
    P?: GasValue; // Pressure (atm)
    V?: GasValue; // Volume (L)
    T?: GasValue; // Temperature (K)
    n?: GasValue; // Moles (mol)
  };
  find: Variable; // Which variable to solve for
  answer: number; // Correct answer
  tolerance: number; // ±tolerance for correct answer
  hints: string[]; // Progressive hints
  solution: {
    formula: string;
    substitution: string;
    calculation: string;
    steps: string[];
  };
}

export interface GameStats {
  score: number;
  questionsAnswered: number;
  correctAnswers: number;
  streak: number;
  bestStreak: number;
  hintsUsed: number;
  totalTime: number; // in seconds
}

export interface GameState {
  mode: GameMode;
  currentQuestion: GasLawQuestion | null;
  questionIndex: number;
  userAnswer: string;
  showHint: number; // Current hint level (0-4)
  showSolution: boolean;
  feedback: QuestionFeedback | null;
  stats: GameStats;
  timeRemaining: number | null; // For challenge mode
}

export interface QuestionFeedback {
  isCorrect: boolean;
  message: string;
  points: number;
  userAnswer: number;
  correctAnswer: number;
  difference: number;
  explanation: string;
}

// Gas constant
export const R = 0.08206; // L·atm/(mol·K)
