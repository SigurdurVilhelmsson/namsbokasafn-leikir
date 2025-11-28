// Practice problems
export type ProblemCategory = 'length' | 'mass' | 'volume' | 'time';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface PracticeProblem {
  value: number;
  from: string;
  to: string;
  category: ProblemCategory;
  difficulty: Difficulty;
}

export const PRACTICE_PROBLEMS: PracticeProblem[] = [
  { value: 5000, from: 'g', to: 'kg', category: 'mass', difficulty: 'easy' },
  { value: 2.5, from: 'kg', to: 'g', category: 'mass', difficulty: 'easy' },
  { value: 150, from: 'cm', to: 'm', category: 'length', difficulty: 'easy' },
  { value: 3.2, from: 'km', to: 'm', category: 'length', difficulty: 'easy' },
  { value: 2500, from: 'mL', to: 'L', category: 'volume', difficulty: 'easy' },
  { value: 1.5, from: 'h', to: 'min', category: 'time', difficulty: 'easy' },
  { value: 0.05, from: 'kg', to: 'mg', category: 'mass', difficulty: 'medium' },
  { value: 2.5, from: 'km', to: 'cm', category: 'length', difficulty: 'medium' },
  { value: 90, from: 'min', to: 'h', category: 'time', difficulty: 'medium' },
];
