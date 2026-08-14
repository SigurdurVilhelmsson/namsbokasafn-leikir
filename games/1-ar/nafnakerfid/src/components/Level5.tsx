import { useState, useCallback, useMemo } from 'react';
import { AudioButton } from './AudioButton';
import { POLYATOMIC_IONS } from '../data/polyatomicIons';

/**
 * Level 5: Formula from Name (Formúla úr nafni)
 * Given IUPAC name, write the formula - requires understanding charge balancing
 */

interface Level5Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

type CompoundCategory = 'ionic' | 'molecular' | 'acid' | 'polyatomic';

interface FormulaChallenge {
  id: number;
  nameIs: string;
  nameEn: string;
  formula: string;
  category: CompoundCategory;
  hints: {
    step1: string;
    step2: string;
    step3: string;
  };
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const CHALLENGES: FormulaChallenge[] = [
  // Easy - Simple ionic
  {
    id: 1,
    nameIs: 'Natríumklóríð',
    nameEn: 'Sodium chloride',
    formula: 'NaCl',
    category: 'ionic',
    hints: {
      step1: 'Natríum = Na, Klór = Cl',
      step2: 'Na⁺ og Cl⁻ - báðar einfaldar hleðslur',
      step3: '1 Na⁺ + 1 Cl⁻ = hlutlaust'
    },
    explanation: 'Na⁺ (1+) og Cl⁻ (1-) jafnast, 1:1 hlutfall',
    difficulty: 'easy'
  },
  {
    id: 2,
    nameIs: 'Magnesíumoxíð',
    nameEn: 'Magnesium oxide',
    formula: 'MgO',
    category: 'ionic',
    hints: {
      step1: 'Magnesíum = Mg, Oxíð = O',
      step2: 'Mg²⁺ og O²⁻ - báðar 2 hleðslur',
      step3: '1 Mg²⁺ + 1 O²⁻ = hlutlaust'
    },
    explanation: 'Mg²⁺ (2+) og O²⁻ (2-) jafnast, 1:1 hlutfall',
    difficulty: 'easy'
  },
  {
    id: 3,
    nameIs: 'Kalsíumklóríð',
    nameEn: 'Calcium chloride',
    formula: 'CaCl₂',
    category: 'ionic',
    hints: {
      step1: 'Kalsíum = Ca, Klór = Cl',
      step2: 'Ca²⁺ og Cl⁻',
      step3: '1 Ca²⁺ + 2 Cl⁻ = 2+ og 2- = hlutlaust'
    },
    explanation: 'Ca²⁺ (2+) þarf 2 Cl⁻ (2 × 1-) til að jafnast',
    difficulty: 'easy'
  },
  {
    id: 4,
    nameIs: 'Áloxíð',
    nameEn: 'Aluminum oxide',
    formula: 'Al₂O₃',
    category: 'ionic',
    hints: {
      step1: 'Ál = Al, Oxíð = O',
      step2: 'Al³⁺ og O²⁻',
      step3: '2 Al³⁺ (6+) + 3 O²⁻ (6-) = hlutlaust'
    },
    explanation: '2 × 3+ = 6+ og 3 × 2- = 6-, finndu minnsta samnefnara',
    difficulty: 'easy'
  },

  // Medium - Polyatomic ions
  {
    id: 5,
    nameIs: 'Kalsíumfosfat',
    nameEn: 'Calcium phosphate',
    formula: 'Ca₃(PO₄)₂',
    category: 'polyatomic',
    hints: {
      step1: 'Kalsíum = Ca²⁺, Fosfat = PO₄³⁻',
      step2: 'Finndu minnsta samnefnara: 2 og 3 → 6',
      step3: '3 Ca²⁺ (6+) + 2 PO₄³⁻ (6-) = hlutlaust'
    },
    explanation: 'Ca²⁺ og PO₄³⁻: þarf 3 Ca og 2 PO₄ til að jafnast',
    difficulty: 'medium'
  },
  {
    id: 6,
    nameIs: 'Natríumsúlfat',
    nameEn: 'Sodium sulfate',
    formula: 'Na₂SO₄',
    category: 'polyatomic',
    hints: {
      step1: 'Natríum = Na⁺, Súlfat = SO₄²⁻',
      step2: 'Súlfat hefur 2- hleðslu',
      step3: '2 Na⁺ (2+) + 1 SO₄²⁻ (2-) = hlutlaust'
    },
    explanation: 'SO₄²⁻ (2-) þarf 2 Na⁺ (2 × 1+)',
    difficulty: 'medium'
  },
  {
    id: 7,
    nameIs: 'Ammóníumnítrat',
    nameEn: 'Ammonium nitrate',
    formula: 'NH₄NO₃',
    category: 'polyatomic',
    hints: {
      step1: 'Ammóníum = NH₄⁺, Nítrat = NO₃⁻',
      step2: 'Báðar jónir hafa 1 hleðslu',
      step3: '1 NH₄⁺ + 1 NO₃⁻ = hlutlaust'
    },
    explanation: 'NH₄⁺ (1+) og NO₃⁻ (1-) jafnast, 1:1 hlutfall',
    difficulty: 'medium'
  },
  {
    id: 8,
    nameIs: 'Magnesíumhýdroxíð',
    nameEn: 'Magnesium hydroxide',
    formula: 'Mg(OH)₂',
    category: 'polyatomic',
    hints: {
      step1: 'Magnesíum = Mg²⁺, Hýdroxíð = OH⁻',
      step2: 'Mg hefur 2+ hleðslu, OH hefur 1-',
      step3: '1 Mg²⁺ + 2 OH⁻ = hlutlaust'
    },
    explanation: 'Mg²⁺ (2+) þarf 2 OH⁻ (2 × 1-), notaðu sviga',
    difficulty: 'medium'
  },

  // Medium - Stock system
  {
    id: 9,
    nameIs: 'Járn(III)oxíð',
    nameEn: 'Iron(III) oxide',
    formula: 'Fe₂O₃',
    category: 'ionic',
    hints: {
      step1: 'Járn(III) = Fe³⁺, Oxíð = O²⁻',
      step2: 'Finndu minnsta samnefnara: 3 og 2 → 6',
      step3: '2 Fe³⁺ (6+) + 3 O²⁻ (6-) = hlutlaust'
    },
    explanation: 'Fe³⁺ og O²⁻: þarf 2 Fe og 3 O til að jafnast',
    difficulty: 'medium'
  },
  {
    id: 10,
    nameIs: 'Kopar(II)súlfat',
    nameEn: 'Copper(II) sulfate',
    formula: 'CuSO₄',
    category: 'polyatomic',
    hints: {
      step1: 'Kopar(II) = Cu²⁺, Súlfat = SO₄²⁻',
      step2: 'Báðar jónir hafa 2 hleðslu',
      step3: '1 Cu²⁺ + 1 SO₄²⁻ = hlutlaust'
    },
    explanation: 'Cu²⁺ (2+) og SO₄²⁻ (2-) jafnast, 1:1 hlutfall',
    difficulty: 'medium'
  },

  // Medium - Molecular
  {
    id: 11,
    nameIs: 'Koldíoxíð',
    nameEn: 'Carbon dioxide',
    formula: 'CO₂',
    category: 'molecular',
    hints: {
      step1: 'Kol = C, díoxíð = 2 súrefni',
      step2: 'dí = 2 (gríska forskeytið)',
      step3: '1 C + 2 O = CO₂'
    },
    explanation: 'Í sameindum segja grísk forskeyti fjölda atóma: dí = 2',
    difficulty: 'medium'
  },
  {
    id: 12,
    nameIs: 'Díniturtetroxíð',
    nameEn: 'Dinitrogen tetroxide',
    formula: 'N₂O₄',
    category: 'molecular',
    hints: {
      step1: 'Dí = 2, tetra = 4',
      step2: 'Dínitur = 2 köfnunarefni, tetroxíð = 4 súrefni',
      step3: '2 N + 4 O = N₂O₄'
    },
    explanation: 'Grísk forskeyti: dí = 2, tetra = 4',
    difficulty: 'medium'
  },

  // Hard - Complex polyatomic
  {
    id: 13,
    nameIs: 'Ál(III)súlfat',
    nameEn: 'Aluminum sulfate',
    formula: 'Al₂(SO₄)₃',
    category: 'polyatomic',
    hints: {
      step1: 'Ál = Al³⁺, Súlfat = SO₄²⁻',
      step2: 'Finndu minnsta samnefnara: 3 og 2 → 6',
      step3: '2 Al³⁺ (6+) + 3 SO₄²⁻ (6-) = hlutlaust'
    },
    explanation: 'Al³⁺ og SO₄²⁻: þarf 2 Al og 3 SO₄ til að jafnast',
    difficulty: 'hard'
  },
  {
    id: 14,
    nameIs: 'Ammóníumsúlfat',
    nameEn: 'Ammonium sulfate',
    formula: '(NH₄)₂SO₄',
    category: 'polyatomic',
    hints: {
      step1: 'Ammóníum = NH₄⁺, Súlfat = SO₄²⁻',
      step2: 'Súlfat hefur 2- hleðslu',
      step3: '2 NH₄⁺ (2+) + 1 SO₄²⁻ (2-) = hlutlaust'
    },
    explanation: 'SO₄²⁻ (2-) þarf 2 NH₄⁺, notaðu sviga: (NH₄)₂',
    difficulty: 'hard'
  },
  {
    id: 15,
    nameIs: 'Brennisteinshexaflúoríð',
    nameEn: 'Sulfur hexafluoride',
    formula: 'SF₆',
    category: 'molecular',
    hints: {
      step1: 'Brennisteinn = S, hexa = 6, flúoríð = F',
      step2: 'Hexa = 6 (gríska forskeytið)',
      step3: '1 S + 6 F = SF₆'
    },
    explanation: 'Grísk forskeyti: hexa = 6',
    difficulty: 'hard'
  },
  {
    id: 16,
    nameIs: 'Blý(II)nítrat',
    nameEn: 'Lead(II) nitrate',
    formula: 'Pb(NO₃)₂',
    category: 'polyatomic',
    hints: {
      step1: 'Blý(II) = Pb²⁺, Nítrat = NO₃⁻',
      step2: 'Pb hefur 2+ hleðslu, NO₃ hefur 1-',
      step3: '1 Pb²⁺ + 2 NO₃⁻ = hlutlaust'
    },
    explanation: 'Pb²⁺ (2+) þarf 2 NO₃⁻, notaðu sviga: (NO₃)₂',
    difficulty: 'hard'
  },
  {
    id: 17,
    nameIs: 'Kalsíumkarbónat',
    nameEn: 'Calcium carbonate',
    formula: 'CaCO₃',
    category: 'polyatomic',
    hints: {
      step1: 'Kalsíum = Ca²⁺, Karbónat = CO₃²⁻',
      step2: 'Báðar jónir hafa 2 hleðslu',
      step3: '1 Ca²⁺ + 1 CO₃²⁻ = hlutlaust'
    },
    explanation: 'Ca²⁺ (2+) og CO₃²⁻ (2-) jafnast, 1:1 hlutfall',
    difficulty: 'medium'
  },
  {
    id: 18,
    nameIs: 'Fosforpentaklóríð',
    nameEn: 'Phosphorus pentachloride',
    formula: 'PCl₅',
    category: 'molecular',
    hints: {
      step1: 'Fosfor = P, penta = 5, klóríð = Cl',
      step2: 'Penta = 5 (gríska forskeytið)',
      step3: '1 P + 5 Cl = PCl₅'
    },
    explanation: 'Grísk forskeyti: penta = 5',
    difficulty: 'hard'
  }
];

// Shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function Level5({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level5Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [currentHintLevel, setCurrentHintLevel] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Shuffle challenges and take 15
  const challenges = useMemo(() => {
    return shuffleArray(CHALLENGES).slice(0, 15);
  }, []);

  const challenge = challenges[currentIndex];

  // Normalize formula for comparison
  const normalizeFormula = (formula: string): string => {
    return formula
      .replace(/\s+/g, '')
      .replace(/₂/g, '2')
      .replace(/₃/g, '3')
      .replace(/₄/g, '4')
      .replace(/₅/g, '5')
      .replace(/₆/g, '6')
      .replace(/₇/g, '7')
      .replace(/⁺/g, '+')
      .replace(/⁻/g, '-')
      .replace(/²/g, '2')
      .replace(/³/g, '3');
  };

  // Check answer
  const checkAnswer = useCallback(() => {
    if (!challenge || showFeedback) return;

    const normalizedUser = normalizeFormula(userAnswer);
    const normalizedCorrect = normalizeFormula(challenge.formula);

    const correct = normalizedUser === normalizedCorrect;
    setIsCorrect(correct);
    setShowFeedback(true);
    setAttempts(prev => prev + 1);

    if (correct) {
      const points = Math.max(10 - currentHintLevel * 2 - (attempts * 2), 3);
      setScore(prev => prev + points);
      onCorrectAnswer?.();
    } else {
      onIncorrectAnswer?.();
    }
  }, [challenge, userAnswer, showFeedback, currentHintLevel, attempts, onCorrectAnswer, onIncorrectAnswer]);

  // Show next hint
  const showHint = useCallback(() => {
    if (currentHintLevel < 3) {
      setCurrentHintLevel(prev => prev + 1);
      setHintsUsed(prev => prev + 1);
    }
  }, [currentHintLevel]);

  // Move to next challenge
  const nextChallenge = useCallback(() => {
    if (currentIndex + 1 < challenges.length) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setShowFeedback(false);
      setIsCorrect(false);
      setCurrentHintLevel(0);
      setAttempts(0);
    } else {
      onComplete(score, challenges.length * 10, hintsUsed);
    }
  }, [currentIndex, challenges.length, score, hintsUsed, onComplete]);

  // Try again
  const tryAgain = useCallback(() => {
    setUserAnswer('');
    setShowFeedback(false);
    setIsCorrect(false);
  }, []);

  // Get category info
  const getCategoryInfo = (category: CompoundCategory) => {
    const info = {
      ionic: { name: 'Jónefni', color: 'blue', description: 'Málmur + málmleysingi' },
      molecular: { name: 'Sameind', color: 'orange', description: 'Grísk forskeyti' },
      acid: { name: 'Sýra', color: 'red', description: 'Vetni + anjon' },
      polyatomic: { name: 'Fjölatóma jón', color: 'purple', description: 'Inniheldur fjölatóma jón' }
    };
    return info[category];
  };

  const categoryInfo = getCategoryInfo(challenge.category);

  // Common polyatomic ions for reference
  const commonIons = useMemo(() => {
    return POLYATOMIC_IONS.filter(ion =>
      ['Súlfat', 'Nítrat', 'Karbónat', 'Fosfat', 'Hýdroxíð', 'Ammóníum'].includes(ion.nameIs)
    );
  }, []);

  // Completion screen
  if (currentIndex >= challenges.length) {
    const accuracy = Math.round((score / (challenges.length * 10)) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
              {accuracy >= 80 ? '🏆' : accuracy >= 60 ? '🎉' : '📝'}
            </div>
            <h1 className="text-3xl font-bold text-emerald-600 mb-2">Stigi lokið!</h1>
            <p className="text-gray-600">Þú hefur lokið formúluæfingu</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-emerald-600">{score}</div>
              <div className="text-sm text-gray-600">Stig</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{accuracy}%</div>
              <div className="text-sm text-gray-600">Nákvæmni</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600">{hintsUsed}</div>
              <div className="text-sm text-gray-600">Vísbendingar</div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-emerald-800 mb-2">Hvað lærðir þú?</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Jafna hleðslur í jónefnum</li>
              <li>• Nota grísk forskeyti í sameindum</li>
              <li>• Þekkja helstu fjölatóma jónir</li>
              <li>• Nota sviga fyrir margar fjölatóma jónir</li>
            </ul>
          </div>

          <button
            onClick={() => onComplete(score, challenges.length * 10, hintsUsed)}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl"
          >
            Ljúka stigi →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
              ← Til baka
            </button>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-emerald-600">{currentIndex + 1}/{challenges.length}</div>
                <div className="text-xs text-gray-500">Spurning</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{score}</div>
                <div className="text-xs text-gray-500">Stig</div>
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${((currentIndex + (showFeedback && isCorrect ? 1 : 0)) / challenges.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-center mb-2 text-emerald-600">
            Skrifaðu formúluna
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Þýddu nafnið yfir í efnaformúlu
          </p>

          {/* Challenge */}
          <div className={`bg-${categoryInfo.color}-50 rounded-xl p-6 mb-6`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className={`bg-${categoryInfo.color}-200 text-${categoryInfo.color}-800 text-xs px-2 py-1 rounded-full`}>
                {categoryInfo.name}
              </span>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-center text-gray-800 flex items-center justify-center gap-3">
              {challenge.nameIs}
              <AudioButton text={challenge.nameIs} size="medium" />
            </div>
            <div className="text-center text-gray-500 text-sm mt-2">
              ({challenge.nameEn})
            </div>
          </div>

          {/* Hints */}
          {currentHintLevel > 0 && !showFeedback && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
              <div className="space-y-2">
                {currentHintLevel >= 1 && (
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">1.</span>
                    <span className="text-yellow-800">{challenge.hints.step1}</span>
                  </div>
                )}
                {currentHintLevel >= 2 && (
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">2.</span>
                    <span className="text-yellow-800">{challenge.hints.step2}</span>
                  </div>
                )}
                {currentHintLevel >= 3 && (
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">3.</span>
                    <span className="text-yellow-800">{challenge.hints.step3}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Answer input */}
          {!showFeedback ? (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && userAnswer && checkAnswer()}
                  placeholder="Skrifaðu formúluna, t.d. NaCl, H₂O..."
                  className="w-full text-center text-2xl font-mono font-bold p-4 border-2 border-emerald-300 rounded-xl focus:border-emerald-500 focus:outline-none"
                  autoFocus
                />
                <p className="text-center text-xs text-gray-500 mt-2">
                  Notaðu venjulegar tölur (2, 3, 4) - kerfið þekkir þær
                </p>
              </div>

              <div className="flex gap-3">
                {currentHintLevel < 3 && (
                  <button
                    onClick={showHint}
                    className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-bold py-3 px-4 rounded-xl"
                  >
                    💡 Vísbending ({3 - currentHintLevel} eftir)
                  </button>
                )}
                <button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className={`flex-1 font-bold py-3 px-4 rounded-xl ${
                    !userAnswer.trim()
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  }`}
                >
                  Athuga svar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Result */}
              <div className={`p-6 rounded-xl text-center ${
                isCorrect ? 'bg-green-100 border-2 border-green-400' : 'bg-red-100 border-2 border-red-400'
              }`}>
                <div className="text-4xl mb-2">{isCorrect ? '✓' : '✗'}</div>
                <div className={`text-xl font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Rétt!' : 'Ekki alveg'}
                </div>
                {!isCorrect && (
                  <div className="mt-2 text-red-700">
                    Þú skrifaðir: <strong className="font-mono">{userAnswer}</strong>
                  </div>
                )}
                <div className="mt-2 text-2xl font-mono font-bold text-gray-800">
                  {challenge.formula}
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="font-bold text-blue-800 mb-1">Útskýring:</div>
                <div className="text-blue-700">{challenge.explanation}</div>
              </div>

              <div className="flex gap-3">
                {!isCorrect && attempts < 3 && (
                  <button
                    onClick={tryAgain}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-xl"
                  >
                    Reyna aftur
                  </button>
                )}
                <button
                  onClick={nextChallenge}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl"
                >
                  {currentIndex + 1 < challenges.length ? 'Næsta efni →' : 'Sjá niðurstöður →'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick reference */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-3 text-sm">Fjölatóma jónir:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {commonIons.map(ion => (
              <div key={ion.formula} className="bg-gray-50 p-2 rounded flex justify-between">
                <span className="font-mono font-bold">{ion.formula}</span>
                <span className="text-gray-600">{ion.nameIs}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="bg-orange-50 p-2 rounded text-center">
              <span className="font-bold text-orange-700">dí = 2</span>
            </div>
            <div className="bg-orange-50 p-2 rounded text-center">
              <span className="font-bold text-orange-700">trí = 3</span>
            </div>
            <div className="bg-orange-50 p-2 rounded text-center">
              <span className="font-bold text-orange-700">tetra = 4</span>
            </div>
            <div className="bg-orange-50 p-2 rounded text-center">
              <span className="font-bold text-orange-700">penta = 5</span>
            </div>
            <div className="bg-orange-50 p-2 rounded text-center">
              <span className="font-bold text-orange-700">hexa = 6</span>
            </div>
            <div className="bg-orange-50 p-2 rounded text-center">
              <span className="font-bold text-orange-700">hepta = 7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
