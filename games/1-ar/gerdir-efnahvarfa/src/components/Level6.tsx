import { useState, useCallback, useMemo } from 'react';
import {
  IONIC_EQUATION_RULES,
  getIonicEquationProblems,
  IonicEquationProblem,
} from '../data/ionicEquations';
import { useGameI18n } from '@shared/hooks/useGameI18n';
import { gameTranslations } from '../i18n';

interface Level6Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

type Phase = 'learn' | 'quiz';
type Step = 'spectator' | 'netIonic';

export function Level6({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level6Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [step, setStep] = useState<Step>('spectator');
  const [selectedSpectators, setSelectedSpectators] = useState<Set<string>>(new Set());
  const [selectedNetIonic, setSelectedNetIonic] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const { t, language } = useGameI18n({ gameTranslations });

  const questions = useMemo(() => getIonicEquationProblems(8), []);
  const currentItem = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;
  const maxScore = questions.length * 150; // More points for harder level

  // Extract all ions from complete ionic equation for spectator selection
  const extractIons = (equation: string): string[] => {
    const ions: string[] = [];
    // Match patterns like Na⁺, Cl⁻, SO₄²⁻, etc.
    const matches = equation.match(/[A-Z][a-z]?(?:₂|₃|₄)?(?:[⁺⁻]|²⁺|²⁻|³⁺|³⁻)/g);
    if (matches) {
      // Get unique ions
      const seen = new Set<string>();
      matches.forEach(ion => {
        if (!seen.has(ion)) {
          seen.add(ion);
          ions.push(ion);
        }
      });
    }
    return ions;
  };

  // Generate wrong net ionic options
  const generateNetIonicOptions = (problem: IonicEquationProblem): string[] => {
    const options = [problem.netIonicEquation];

    // Add some plausible wrong answers based on the problem
    const wrongOptions = [
      // Wrong: Include spectator ions
      problem.completeIonicEquation.split('→')[0].trim() + ' → ' + problem.completeIonicEquation.split('→')[1]?.trim(),
      // Wrong: Just swap some products
      problem.netIonicEquation.replace('→', '←'),
      // Generate based on product type
      ...(problem.productType === 'precipitate'
        ? ['Na⁺(aq) + Cl⁻(aq) → NaCl(s)', 'K⁺(aq) + Br⁻(aq) → KBr(s)']
        : problem.productType === 'water'
        ? ['H⁺(aq) + Cl⁻(aq) → HCl(aq)', 'Na⁺(aq) + OH⁻(aq) → NaOH(aq)']
        : ['H⁺(aq) + CO₃²⁻(aq) → H₂CO₃(aq)', 'Na⁺(aq) + S²⁻(aq) → Na₂S(s)']),
    ];

    // Filter to get 3 unique wrong options
    wrongOptions.forEach(opt => {
      if (options.length < 4 && opt !== problem.netIonicEquation && !options.includes(opt)) {
        options.push(opt);
      }
    });

    // Shuffle
    return options.sort(() => Math.random() - 0.5);
  };

  const netIonicOptions = useMemo(
    () => currentItem ? generateNetIonicOptions(currentItem) : [],
    [currentItem]
  );

  const handleSpectatorToggle = (ion: string) => {
    setSelectedSpectators(prev => {
      const newSet = new Set(prev);
      if (newSet.has(ion)) {
        newSet.delete(ion);
      } else {
        newSet.add(ion);
      }
      return newSet;
    });
  };

  const checkSpectators = useCallback(() => {
    const correctSet = new Set(currentItem.spectatorIons);
    const isMatch =
      selectedSpectators.size === correctSet.size &&
      [...selectedSpectators].every(ion => correctSet.has(ion));

    if (isMatch) {
      setScore(prev => prev + 50);
      setStep('netIonic');
    } else {
      setSelectedSpectators(new Set(currentItem.spectatorIons));
      setStep('netIonic');
    }
  }, [currentItem, selectedSpectators]);

  const handleNetIonicAnswer = useCallback((answer: string) => {
    if (showResult) return;

    setSelectedNetIonic(answer);
    const correct = answer === currentItem.netIonicEquation;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const basePoints = showHint ? 50 : 100;
      const streakBonus = Math.min(streak * 10, 50);
      setScore(prev => prev + basePoints + streakBonus);
      setStreak(prev => prev + 1);
      onCorrectAnswer();
    } else {
      setStreak(0);
      onIncorrectAnswer();
    }
  }, [showResult, currentItem, showHint, streak, onCorrectAnswer, onIncorrectAnswer]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, maxScore, hintsUsed);
    } else {
      setCurrentIndex(prev => prev + 1);
      setShowResult(false);
      setSelectedNetIonic(null);
      setSelectedSpectators(new Set());
      setStep('spectator');
      setShowHint(false);
    }
  };

  const handleHint = () => {
    if (!showHint) {
      setHintsUsed(prev => prev + 1);
      setShowHint(true);
    }
  };

  const rules = IONIC_EQUATION_RULES[language as keyof typeof IONIC_EQUATION_RULES] || IONIC_EQUATION_RULES.en;

  // Learning Phase
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <span>←</span> {t('gameplay.back') || 'Til baka'}
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-rose-700">
                {t('levels.level6.name')}
              </h1>
              <div></div>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-rose-700 mb-4">
              {t('level6.intro.title')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('level6.intro.description')}
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-6">
              <div className="bg-rose-50 p-4 rounded-xl border-l-4 border-rose-400">
                <h3 className="font-bold text-rose-700">1. {t('level6.steps.molecular')}</h3>
                <div className="font-mono text-lg mt-2">NaCl(aq) + AgNO₃(aq) → NaNO₃(aq) + AgCl(s)</div>
              </div>
              <div className="flex justify-center text-2xl text-gray-400">↓</div>
              <div className="bg-pink-50 p-4 rounded-xl border-l-4 border-pink-400">
                <h3 className="font-bold text-pink-700">2. {t('level6.steps.completeIonic')}</h3>
                <div className="font-mono text-sm mt-2">
                  Na⁺(aq) + Cl⁻(aq) + Ag⁺(aq) + NO₃⁻(aq) → Na⁺(aq) + NO₃⁻(aq) + AgCl(s)
                </div>
                <p className="text-xs text-gray-500 mt-1">{t('level6.steps.splitAqueous')}</p>
              </div>
              <div className="flex justify-center text-2xl text-gray-400">↓</div>
              <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-400">
                <h3 className="font-bold text-purple-700">3. {t('level6.steps.spectators')}</h3>
                <div className="flex gap-2 mt-2">
                  <span className="bg-gray-200 px-2 py-1 rounded line-through">Na⁺</span>
                  <span className="bg-gray-200 px-2 py-1 rounded line-through">NO₃⁻</span>
                  <span className="text-sm text-gray-500 self-center">← {t('level6.steps.removeThese')}</span>
                </div>
              </div>
              <div className="flex justify-center text-2xl text-gray-400">↓</div>
              <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                <h3 className="font-bold text-green-700">4. {t('level6.steps.netIonic')}</h3>
                <div className="font-mono text-lg mt-2 text-green-700">
                  Ag⁺(aq) + Cl⁻(aq) → AgCl(s)
                </div>
              </div>
            </div>

            {/* Rules */}
            <details className="bg-rose-50 rounded-xl p-4">
              <summary className="font-semibold text-rose-700 cursor-pointer">
                {t('level6.rules.title')}
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                {rules.map((rule, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-rose-500">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              {t('gameplay.startQuiz')} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phase
  const availableIons = extractIons(currentItem.completeIonicEquation);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setPhase('learn')}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <span>←</span> {t('gameplay.back') || 'Til baka'}
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-rose-700">{t('levels.level6.name')}</h1>
              {streak > 1 && (
                <div className="text-sm text-orange-500 font-bold">🔥 {streak} {t('gameplay.inARow') || 'í röð'}!</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-rose-600">{score} {t('gameplay.score') || 'stig'}</div>
              <div className="text-xs text-gray-500">{currentIndex + 1} / {questions.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-rose-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {/* Difficulty badge */}
          <div className="flex justify-between items-center mb-4">
            <span className={`text-xs px-2 py-1 rounded-full ${
              currentItem.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              currentItem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentItem.difficulty === 'easy' ? (t('difficulty.easy') || 'Auðvelt') :
               currentItem.difficulty === 'medium' ? (t('difficulty.medium') || 'Miðlungs') :
               (t('difficulty.hard') || 'Erfitt')}
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-rose-100 text-rose-700">
              {step === 'spectator' ? t('level6.step1of2') : t('level6.step2of2')}
            </span>
          </div>

          {/* Molecular Equation */}
          <div className="bg-gray-50 rounded-xl p-3 mb-3">
            <div className="text-xs text-gray-500 mb-1">{t('level6.molecularEq')}:</div>
            <div className="font-mono text-lg text-center">{currentItem.molecularEquation}</div>
          </div>

          {/* Complete Ionic Equation */}
          <div className="bg-pink-50 rounded-xl p-3 mb-4">
            <div className="text-xs text-gray-500 mb-1">{t('level6.completeIonicEq')}:</div>
            <div className="font-mono text-sm text-center overflow-x-auto">
              {currentItem.completeIonicEquation}
            </div>
          </div>

          {step === 'spectator' ? (
            <>
              {/* Spectator Ion Selection */}
              <p className="text-center text-lg font-medium text-gray-700 mb-4">
                {t('level6.selectSpectators')}
              </p>

              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {availableIons.map(ion => (
                  <button
                    key={ion}
                    onClick={() => handleSpectatorToggle(ion)}
                    className={`px-4 py-2 rounded-lg font-mono text-lg transition-all ${
                      selectedSpectators.has(ion)
                        ? 'bg-rose-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {ion}
                  </button>
                ))}
              </div>

              <button
                onClick={checkSpectators}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition-colors"
              >
                {t('level6.checkSpectators')}
              </button>
            </>
          ) : (
            <>
              {/* Net Ionic Selection */}
              <p className="text-center text-lg font-medium text-gray-700 mb-2">
                {t('level6.selectNetIonic')}
              </p>

              <div className="bg-gray-100 p-2 rounded-lg mb-4 text-center text-sm">
                <span className="text-gray-500">{t('level6.spectatorsRemoved')}:</span>
                <span className="font-mono ml-2">{currentItem.spectatorIons.join(', ')}</span>
              </div>

              {/* Hint button */}
              {!showResult && !showHint && (
                <button
                  onClick={handleHint}
                  className="text-sm text-rose-600 hover:text-rose-700 mb-4 block mx-auto"
                >
                  💡 {t('gameplay.showHint') || 'Sýna vísbendingu'} (-50 stig)
                </button>
              )}

              {/* Hint display */}
              {showHint && !showResult && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-center">
                  💡 {currentItem.productType === 'precipitate'
                    ? t('level6.hint.precipitate')
                    : currentItem.productType === 'water'
                    ? t('level6.hint.water')
                    : t('level6.hint.gas')}
                </div>
              )}

              {/* Net Ionic Options */}
              <div className="space-y-2">
                {netIonicOptions.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNetIonicAnswer(option)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl border-2 font-mono text-left transition-all ${
                      showResult
                        ? option === currentItem.netIonicEquation
                          ? 'border-green-500 bg-green-100'
                          : selectedNetIonic === option
                            ? 'border-red-500 bg-red-100'
                            : 'border-gray-200 opacity-40'
                        : 'border-gray-200 hover:border-rose-400 hover:bg-rose-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Result */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-xl mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? (
                  <>
                    ✓ {t('gameplay.correct') || 'Rétt'}!
                    <span className="ml-2 text-sm font-normal">
                      +{showHint ? 50 : 100}{streak > 0 && !showHint ? ` +${Math.min(streak * 10, 50)} ` + (t('gameplay.streakBonus') || 'röð bónus') : ''} {t('gameplay.points') || 'stig'}
                    </span>
                  </>
                ) : (
                  `✗ ${t('gameplay.incorrect') || 'Rangt'}`
                )}
              </div>

              {/* Show correct net ionic equation */}
              <div className="bg-white rounded-lg p-4 font-mono text-center mt-3">
                <div className="text-xs text-gray-500 mb-1">{t('level6.correctNetIonic')}:</div>
                <div className="text-lg text-green-700">{currentItem.netIonicEquation}</div>
              </div>

              <p className="text-sm text-gray-600 mt-3">
                {language === 'en' ? currentItem.explanationEn : currentItem.explanation}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? (t('gameplay.finishLevel') || 'Ljúka stigi') : (t('gameplay.next') || 'Næsta spurning') + ' →'}
            </button>
          </div>
        )}

        {/* Quick reference */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">{t('level6.quickRef')}:</h3>
          <div className="text-xs text-gray-500 space-y-1">
            <p>• {t('level6.ref.precipitate')}: (s)</p>
            <p>• {t('level6.ref.gas')}: (g)</p>
            <p>• {t('level6.ref.water')}: H₂O(l)</p>
            <p>• {t('level6.ref.spectator')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
