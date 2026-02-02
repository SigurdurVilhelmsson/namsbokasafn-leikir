import { StructureFromNameChallenge } from './StructureFromNameChallenge';

interface Level4Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

/**
 * Level 4: Name-to-Structure Drawing
 *
 * This level presents the reverse challenge: given an IUPAC name,
 * students must build the correct molecular structure.
 */
export function Level4({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level4Props) {
  return (
    <StructureFromNameChallenge
      onComplete={onComplete}
      onBack={onBack}
      onCorrectAnswer={onCorrectAnswer}
      onIncorrectAnswer={onIncorrectAnswer}
    />
  );
}
