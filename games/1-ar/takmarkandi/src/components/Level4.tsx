import { useState, useEffect } from 'react';
import { REACTIONS } from '../data/reactions';
import {
  PERCENT_YIELD_PROBLEMS,
  MOLAR_MASSES,
  calculateTheoreticalYield,
  calculateActualYield,
  PercentYieldProblem,
} from '../data/molarMasses';

interface Level4Props {
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  t: (key: string, fallback?: string) => string;
  language: string;
}

interface ProblemState {
  problem: PercentYieldProblem;
  reaction: typeof REACTIONS[0];
  theoreticalGrams: number;
  actualGrams: number;
  limitingReagent: string;
  productFormula: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function Level4({
  onComplete,
  onBack,
  onCorrectAnswer,
  onIncorrectAnswer,
  t,
  language,
}: Level4Props) {
  const [problems, setProblems] = useState<ProblemState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);

  // Initialize problems when difficulty is selected
  useEffect(() => {
    if (difficulty) {
      const filteredProblems = PERCENT_YIELD_PROBLEMS.filter(p => p.difficulty === difficulty);
      const shuffled = shuffleArray(filteredProblems).slice(0, 5);

      const problemStates = shuffled.map(problem => {
        const reaction = REACTIONS.find(r => r.id === problem.reactionId)!;
        const { theoreticalGrams, limitingReagent, productFormula } = calculateTheoreticalYield(problem, reaction);
        const actualGrams = calculateActualYield(theoreticalGrams, problem.actualYieldPercent);

        return {
          problem,
          reaction,
          theoreticalGrams,
          actualGrams,
          limitingReagent,
          productFormula,
        };
      });

      setProblems(problemStates);
      setCurrentIndex(0);
      setScore(0);
    }
  }, [difficulty]);

  // Reset state when problem changes
  useEffect(() => {
    setAnswer('');
    setFeedback(null);
    setShowHint(false);
    setShowExplanation(false);
  }, [currentIndex]);

  const currentProblem = problems[currentIndex];

  const checkAnswer = () => {
    if (!currentProblem) return;

    const userValue = parseFloat(answer);
    const correctValue = currentProblem.problem.actualYieldPercent;

    // Allow 0.5% tolerance
    const isCorrect = !isNaN(userValue) && Math.abs(userValue - correctValue) < 0.5;

    if (isCorrect) {
      setFeedback('correct');
      onCorrectAnswer();
      const points = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;
      const bonusPoints = showHint ? 0 : 5;
      setScore(prev => prev + points + bonusPoints);

      setTimeout(() => {
        if (currentIndex < problems.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          const maxScore = problems.length * (difficulty === 'easy' ? 15 : difficulty === 'medium' ? 20 : 25);
          onComplete(score + points + bonusPoints, maxScore);
        }
      }, 2000);
    } else {
      setFeedback('incorrect');
      onIncorrectAnswer();
    }
  };

  // Difficulty selection screen
  if (!difficulty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              ← {t('common.back', 'Til baka')}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {t('level4.title', 'Stig 4: Prósentuheimta')}
            </h1>
            <p className="text-gray-600 mb-8">
              {t('level4.subtitle', 'Reiknaðu prósentuheimtu efnahvarfa')}
            </p>

            {/* Theory explanation */}
            <div className="bg-purple-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-bold text-purple-800 mb-3">
                {t('level4.whatIsPercentYield', 'Hvað er prósentuheimta?')}
              </h3>
              <p className="text-gray-700 mb-3">
                {language === 'en'
                  ? 'In real experiments, you rarely get 100% of the theoretical yield. Percent yield tells us how efficient a reaction was.'
                  : 'Í raunverulegum tilraunum fæst sjaldan 100% af fræðilegri heimtu. Prósentuheimta segir okkur hversu vel hvarfið gekk.'}
              </p>
              <div className="bg-white rounded p-3 font-mono text-center text-lg">
                {language === 'en'
                  ? '% Yield = (Actual Yield / Theoretical Yield) × 100%'
                  : '% Heimta = (Raunveruleg heimta / Fræðileg heimta) × 100%'}
              </div>
              <p className="text-sm text-gray-600 mt-3">
                {language === 'en'
                  ? 'Reasons for <100% yield: incomplete reactions, side reactions, product loss during purification, measurement errors.'
                  : 'Ástæður fyrir <100% heimtu: ófullkomin hvörf, aukaafurðir, tap við hreinsun, mæliskekkjur.'}
              </p>
            </div>

            <h3 className="font-semibold text-gray-700 mb-4">
              {t('level4.selectDifficulty', 'Veldu erfiðleikastig')}
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setDifficulty('easy')}
                className="bg-green-100 hover:bg-green-200 text-green-800 rounded-xl p-6 transition-colors"
              >
                <div className="text-2xl mb-2">🌱</div>
                <div className="font-bold">{t('difficulty.easy', 'Auðvelt')}</div>
                <div className="text-sm mt-1">
                  {language === 'en' ? 'Round percentages' : 'Heilar prósentur'}
                </div>
              </button>
              <button
                onClick={() => setDifficulty('medium')}
                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-xl p-6 transition-colors"
              >
                <div className="text-2xl mb-2">⚗️</div>
                <div className="font-bold">{t('difficulty.medium', 'Miðlungs')}</div>
                <div className="text-sm mt-1">
                  {language === 'en' ? 'Mixed values' : 'Blönduð gildi'}
                </div>
              </button>
              <button
                onClick={() => setDifficulty('hard')}
                className="bg-red-100 hover:bg-red-200 text-red-800 rounded-xl p-6 transition-colors"
              >
                <div className="text-2xl mb-2">🔬</div>
                <div className="font-bold">{t('difficulty.hard', 'Erfitt')}</div>
                <div className="text-sm mt-1">
                  {language === 'en' ? 'Decimal percentages' : 'Aukastafaprósent'}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProblem) {
    return <div>Loading...</div>;
  }

  const hint = language === 'en' ? currentProblem.problem.hintEn : currentProblem.problem.hint;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← {t('common.back', 'Til baka')}
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {t('level4.title', 'Stig 4: Prósentuheimta')}
            </h1>
            <div className={`inline-block px-3 py-1 rounded-full text-sm mt-1 ${
              difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {difficulty === 'easy' ? t('difficulty.easy', 'Auðvelt') :
               difficulty === 'medium' ? t('difficulty.medium', 'Miðlungs') :
               t('difficulty.hard', 'Erfitt')}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              {t('common.score', 'Stig')}: <span className="font-bold text-purple-600">{score}</span>
            </div>
            <div className="text-xs text-gray-500">
              {currentIndex + 1} / {problems.length}
            </div>
          </div>
        </div>

        {/* Problem card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          {/* Reaction equation */}
          <div className="text-center mb-6">
            <div className="text-2xl font-mono font-bold text-gray-800 mb-2">
              {currentProblem.reaction.equation}
            </div>
          </div>

          {/* Given information */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-600 mb-1">
                {currentProblem.reaction.reactant1.formula}
              </div>
              <div className="text-2xl font-bold font-mono text-blue-800">
                {currentProblem.problem.reactant1Amount.toFixed(2)} g
              </div>
              <div className="text-xs text-blue-500">
                ({(currentProblem.problem.reactant1Amount / MOLAR_MASSES[currentProblem.reaction.reactant1.formula]).toFixed(3)} mól)
              </div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-sm text-red-600 mb-1">
                {currentProblem.reaction.reactant2.formula}
              </div>
              <div className="text-2xl font-bold font-mono text-red-800">
                {currentProblem.problem.reactant2Amount.toFixed(2)} g
              </div>
              <div className="text-xs text-red-500">
                ({(currentProblem.problem.reactant2Amount / MOLAR_MASSES[currentProblem.reaction.reactant2.formula]).toFixed(3)} mól)
              </div>
            </div>
          </div>

          {/* Calculated values */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? 'Limiting Reagent' : 'Takmarkandi hvarfefni'}
                </div>
                <div className="text-xl font-bold text-orange-600">
                  {currentProblem.limitingReagent}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? 'Theoretical Yield' : 'Fræðileg heimta'} ({currentProblem.productFormula})
                </div>
                <div className="text-xl font-bold text-green-600">
                  {currentProblem.theoreticalGrams.toFixed(2)} g
                </div>
              </div>
            </div>
          </div>

          {/* Actual yield given */}
          <div className="bg-purple-100 rounded-lg p-4 mb-6 text-center">
            <div className="text-sm text-purple-700 mb-1">
              {language === 'en' ? 'Actual yield obtained in experiment:' : 'Raunveruleg heimta í tilrauninni:'}
            </div>
            <div className="text-3xl font-bold font-mono text-purple-800">
              {currentProblem.actualGrams.toFixed(2)} g
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-3">
              {language === 'en' ? 'What is the percent yield?' : 'Hver er prósentuheimtan?'}
            </label>
            <div className="flex items-center justify-center gap-3">
              <input
                type="number"
                step="0.1"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={feedback === 'correct'}
                placeholder="0.0"
                className={`w-32 px-4 py-3 text-2xl font-mono text-center border-2 rounded-lg ${
                  feedback === 'correct'
                    ? 'border-green-500 bg-green-50'
                    : feedback === 'incorrect'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 focus:border-purple-500'
                } focus:outline-none`}
              />
              <span className="text-2xl font-bold text-gray-600">%</span>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`text-center p-4 rounded-lg mb-4 ${
              feedback === 'correct'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {feedback === 'correct' ? (
              <div>
                <div className="font-bold text-lg">{t('feedback.correct', 'Rétt!')}</div>
                <div className="text-sm mt-1">
                  {language === 'en'
                    ? `Percent yield = (${currentProblem.actualGrams.toFixed(2)} / ${currentProblem.theoreticalGrams.toFixed(2)}) × 100% = ${currentProblem.problem.actualYieldPercent}%`
                    : `Prósentuheimta = (${currentProblem.actualGrams.toFixed(2)} / ${currentProblem.theoreticalGrams.toFixed(2)}) × 100% = ${currentProblem.problem.actualYieldPercent}%`}
                </div>
              </div>
            ) : (
              <div>
                <div className="font-bold">{t('feedback.tryAgain', 'Reyndu aftur!')}</div>
                <div className="text-sm mt-1">
                  {language === 'en'
                    ? 'Remember: % Yield = (Actual / Theoretical) × 100%'
                    : 'Mundu: % Heimta = (Raunveruleg / Fræðileg) × 100%'}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hint */}
        {showHint && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-center">
            <span className="text-yellow-800">💡 {hint}</span>
          </div>
        )}

        {/* Explanation button and panel */}
        {showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-bold text-blue-800 mb-2">
              {language === 'en' ? 'Why is yield less than 100%?' : 'Af hverju er heimtan undir 100%?'}
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• {language === 'en' ? 'Incomplete reactions - not all reactants convert' : 'Ófullkomin hvörf - ekki öll hvarfefni umbreytast'}</li>
              <li>• {language === 'en' ? 'Side reactions produce unwanted products' : 'Aukaafurðir myndast í hliðarhvörfum'}</li>
              <li>• {language === 'en' ? 'Product loss during purification/transfer' : 'Tap afurða við hreinsun og flutninga'}</li>
              <li>• {language === 'en' ? 'Measurement and handling errors' : 'Mæli- og meðhöndlunarskekkjur'}</li>
            </ul>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          {!showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
            >
              {t('common.hint', 'Vísbending')}
            </button>
          )}
          {!showExplanation && (
            <button
              onClick={() => setShowExplanation(true)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {language === 'en' ? 'Why < 100%?' : 'Af hverju < 100%?'}
            </button>
          )}
          <button
            onClick={checkAnswer}
            disabled={feedback === 'correct' || !answer.trim()}
            className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
          >
            {t('common.check', 'Athuga')}
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / problems.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
