import { useState, useEffect } from 'react';
import { isBalanced } from '../data/equations';
import {
  BALANCING_STRATEGY_STEPS,
  TUTORIAL_EXAMPLES,
  PRACTICE_EQUATIONS,
  POLYATOMIC_ION_TIP,
  COMMON_MISTAKES,
  TutorialStep,
  StrategyStep,
} from '../data/strategies';
import { AtomInventory } from './AtomInventory';

interface Level4Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  t: (key: string, fallback?: string) => string;
  language: string;
}

type Phase = 'intro' | 'strategy' | 'tutorial' | 'practice' | 'complete';

interface CoefficientInputProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  highlight?: boolean;
}

function CoefficientInput({ value, onChange, disabled, highlight }: CoefficientInputProps) {
  return (
    <input
      type="number"
      min="1"
      max="20"
      value={value}
      onChange={(e) => onChange(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
      disabled={disabled}
      className={`w-12 h-10 text-center text-xl font-bold border-2 rounded-lg focus:outline-none transition-all ${
        highlight
          ? 'border-green-500 bg-green-50'
          : 'border-gray-300 focus:border-orange-500'
      } ${disabled ? 'bg-gray-100' : ''}`}
    />
  );
}

export function Level4({
  onComplete,
  onBack,
  onCorrectAnswer,
  onIncorrectAnswer,
  t,
  language,
}: Level4Props) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [strategyStep, setStrategyStep] = useState(0);
  const [tutorialIndex, setTutorialIndex] = useState(0);
  const [tutorialStepIndex, setTutorialStepIndex] = useState(0);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [coefficients, setCoefficients] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const currentTutorial = TUTORIAL_EXAMPLES[tutorialIndex];
  const currentTutorialStep = currentTutorial?.steps[tutorialStepIndex];
  const currentPractice = PRACTICE_EQUATIONS[practiceIndex];

  const getTitle = (obj: StrategyStep | undefined) => {
    if (!obj) return '';
    return language === 'en' ? obj.titleEn : language === 'pl' ? obj.titlePl : obj.titleIs;
  };

  const getDescription = (obj: StrategyStep | undefined) => {
    if (!obj) return '';
    return language === 'en' ? obj.descriptionEn : language === 'pl' ? obj.descriptionPl : obj.descriptionIs;
  };

  const getTip = (obj: StrategyStep | undefined) => {
    if (!obj) return '';
    return language === 'en' ? obj.tipEn : language === 'pl' ? obj.tipPl : obj.tipIs;
  };

  const getExplanation = (step: TutorialStep | undefined) => {
    if (!step) return '';
    return language === 'en' ? step.explanationEn : language === 'pl' ? step.explanationPl : step.explanationIs;
  };

  const getCoefAfter = (step: TutorialStep | undefined) => {
    if (!step) return '';
    return language === 'en' ? step.coefficientsAfterEn : step.coefficientsAfterIs;
  };

  // Initialize practice coefficients
  useEffect(() => {
    if (phase === 'practice' && currentPractice) {
      const totalCoefs = currentPractice.reactants.length + currentPractice.products.length;
      setCoefficients(Array(totalCoefs).fill(1));
      setShowHint(false);
      setFeedback(null);
    }
  }, [phase, practiceIndex, currentPractice]);

  const updateCoefficient = (index: number, value: number) => {
    setCoefficients(prev => {
      const newCoefs = [...prev];
      newCoefs[index] = value;
      return newCoefs;
    });
    setFeedback(null);
  };

  const checkPracticeAnswer = () => {
    if (!currentPractice) return;

    const balanced = isBalanced(currentPractice, coefficients);

    if (balanced) {
      setFeedback('correct');
      onCorrectAnswer();
      const points = showHint ? 5 : 10;
      setScore(prev => prev + points);

      setTimeout(() => {
        if (practiceIndex < PRACTICE_EQUATIONS.length - 1) {
          setPracticeIndex(prev => prev + 1);
        } else {
          setPhase('complete');
        }
      }, 1500);
    } else {
      setFeedback('incorrect');
      onIncorrectAnswer();
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  // Labels
  const labels = {
    is: {
      introTitle: 'Námskeið í stillingu efnajafna',
      introDesc: 'Lærðu kerfisbundna aðferð til að stilla hvaða efnajöfnu sem er',
      start: 'Byrja',
      next: 'Næsta',
      previous: 'Til baka',
      strategy: 'Aðferðin',
      step: 'Skref',
      of: 'af',
      tutorial: 'Dæmi',
      practice: 'Æfing',
      tryIt: 'Reyndu sjálf/ur',
      check: 'Athuga',
      hint: 'Vísbending',
      tip: 'Ráð',
      correct: 'Rétt!',
      incorrect: 'Reyndu aftur',
      complete: 'Vel gert!',
      completeDesc: 'Þú hefur lokið námskeiðinu',
      finish: 'Ljúka',
      score: 'Stig',
      polyatomicTip: 'Ráð um fjölatóma jónir',
      commonMistakes: 'Algengar villur',
      wrong: 'Rangt',
      right: 'Rétt',
      startTutorial: 'Sjá dæmi',
      startPractice: 'Æfa',
      showExample: 'Sýna lausn',
    },
    en: {
      introTitle: 'Balancing Strategy Tutorial',
      introDesc: 'Learn a systematic approach to balance any chemical equation',
      start: 'Start',
      next: 'Next',
      previous: 'Back',
      strategy: 'The Method',
      step: 'Step',
      of: 'of',
      tutorial: 'Example',
      practice: 'Practice',
      tryIt: 'Try it yourself',
      check: 'Check',
      hint: 'Hint',
      tip: 'Tip',
      correct: 'Correct!',
      incorrect: 'Try again',
      complete: 'Well done!',
      completeDesc: 'You have completed the tutorial',
      finish: 'Finish',
      score: 'Score',
      polyatomicTip: 'Polyatomic ion tip',
      commonMistakes: 'Common mistakes',
      wrong: 'Wrong',
      right: 'Right',
      startTutorial: 'See examples',
      startPractice: 'Practice',
      showExample: 'Show solution',
    },
    pl: {
      introTitle: 'Samouczek strategii równoważenia',
      introDesc: 'Naucz się systematycznego podejścia do równoważenia dowolnego równania chemicznego',
      start: 'Start',
      next: 'Dalej',
      previous: 'Wstecz',
      strategy: 'Metoda',
      step: 'Krok',
      of: 'z',
      tutorial: 'Przykład',
      practice: 'Ćwiczenie',
      tryIt: 'Spróbuj sam',
      check: 'Sprawdź',
      hint: 'Wskazówka',
      tip: 'Rada',
      correct: 'Poprawnie!',
      incorrect: 'Spróbuj ponownie',
      complete: 'Świetnie!',
      completeDesc: 'Ukończyłeś samouczek',
      finish: 'Zakończ',
      score: 'Wynik',
      polyatomicTip: 'Wskazówka dla jonów wieloatomowych',
      commonMistakes: 'Częste błędy',
      wrong: 'Źle',
      right: 'Dobrze',
      startTutorial: 'Zobacz przykłady',
      startPractice: 'Ćwicz',
      showExample: 'Pokaż rozwiązanie',
    },
  };

  const l = labels[language as keyof typeof labels] || labels.is;

  // Introduction phase
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2 mb-6"
          >
            ← {t('common.back', 'Til baka')}
          </button>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎓</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {l.introTitle}
              </h1>
              <p className="text-gray-600">
                {l.introDesc}
              </p>
            </div>

            {/* 5-step overview */}
            <div className="space-y-3 mb-8">
              {BALANCING_STRATEGY_STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {getTitle(step)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {getTip(step)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPhase('strategy')}
              className="w-full py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-bold text-lg transition-colors"
            >
              {l.start} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Strategy explanation phase
  if (phase === 'strategy') {
    const currentStrategy = BALANCING_STRATEGY_STEPS[strategyStep];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => {
                if (strategyStep > 0) {
                  setStrategyStep(prev => prev - 1);
                } else {
                  setPhase('intro');
                }
              }}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              ← {l.previous}
            </button>
            <div className="text-sm text-gray-600">
              {l.step} {strategyStep + 1} {l.of} {BALANCING_STRATEGY_STEPS.length}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Step indicator */}
            <div className="flex justify-center gap-2 mb-8">
              {BALANCING_STRATEGY_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === strategyStep
                      ? 'bg-purple-500'
                      : i < strategyStep
                      ? 'bg-purple-300'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Step content */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full text-2xl font-bold mb-4">
                {strategyStep + 1}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {getTitle(currentStrategy)}
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                {getDescription(currentStrategy)}
              </p>
              <div className="inline-block bg-blue-50 text-blue-800 px-4 py-2 rounded-lg">
                <span className="font-semibold">💡 {l.tip}:</span> {getTip(currentStrategy)}
              </div>
            </div>

            {/* Special tips */}
            {strategyStep === BALANCING_STRATEGY_STEPS.length - 1 && (
              <div className="space-y-4 mb-8">
                {/* Polyatomic ion tip */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    🧪 {l.polyatomicTip}
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    {language === 'en' ? POLYATOMIC_ION_TIP.descriptionEn :
                     language === 'pl' ? POLYATOMIC_ION_TIP.descriptionPl :
                     POLYATOMIC_ION_TIP.descriptionIs}
                  </p>
                </div>

                {/* Common mistakes */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-3">
                    ⚠️ {l.commonMistakes}
                  </h4>
                  <div className="space-y-2">
                    {COMMON_MISTAKES.map((mistake, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-red-500">✗</span>
                        <div>
                          <span className="font-medium text-red-700">
                            {language === 'en' ? mistake.titleEn :
                             language === 'pl' ? mistake.titlePl :
                             mistake.titleIs}:
                          </span>
                          <span className="text-gray-600 ml-1">
                            {language === 'en' ? mistake.correctEn :
                             language === 'pl' ? mistake.correctPl :
                             mistake.correctIs}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-4">
              {strategyStep < BALANCING_STRATEGY_STEPS.length - 1 ? (
                <button
                  onClick={() => setStrategyStep(prev => prev + 1)}
                  className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-bold transition-colors"
                >
                  {l.next} →
                </button>
              ) : (
                <button
                  onClick={() => {
                    setPhase('tutorial');
                    setTutorialIndex(0);
                    setTutorialStepIndex(0);
                  }}
                  className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors"
                >
                  {l.startTutorial} →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tutorial walkthrough phase
  if (phase === 'tutorial') {
    if (!currentTutorial || !currentTutorialStep) {
      return <div>Loading...</div>;
    }

    const equation = currentTutorial.equation;
    const step = currentTutorialStep;
    const strategyInfo = BALANCING_STRATEGY_STEPS.find(s => s.id === step.strategyId);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => {
                if (tutorialStepIndex > 0) {
                  setTutorialStepIndex(prev => prev - 1);
                } else if (tutorialIndex > 0) {
                  setTutorialIndex(prev => prev - 1);
                  setTutorialStepIndex(TUTORIAL_EXAMPLES[tutorialIndex - 1].steps.length - 1);
                } else {
                  setPhase('strategy');
                  setStrategyStep(BALANCING_STRATEGY_STEPS.length - 1);
                }
              }}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              ← {l.previous}
            </button>
            <div className="text-sm text-gray-600">
              {l.tutorial} {tutorialIndex + 1}/{TUTORIAL_EXAMPLES.length} -
              {l.step} {tutorialStepIndex + 1}/{currentTutorial.steps.length}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
            {/* Strategy step indicator */}
            <div className="flex justify-center mb-4">
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {getTitle(strategyInfo)}
              </span>
            </div>

            {/* Equation display */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 flex-wrap text-2xl font-mono">
                {equation.reactants.map((formula, i) => (
                  <span key={`r-${i}`} className="flex items-center gap-1">
                    {i > 0 && <span className="text-gray-500 mx-1">+</span>}
                    <span className={`font-bold ${
                      step.highlightElements.some(el => formula.includes(el))
                        ? 'text-purple-600'
                        : 'text-gray-700'
                    }`}>
                      {step.coefficients[i] > 1 ? step.coefficients[i] : ''}
                    </span>
                    <span>{formula}</span>
                  </span>
                ))}
                <span className="text-gray-600 mx-3">→</span>
                {equation.products.map((formula, i) => {
                  const idx = equation.reactants.length + i;
                  return (
                    <span key={`p-${i}`} className="flex items-center gap-1">
                      {i > 0 && <span className="text-gray-500 mx-1">+</span>}
                      <span className={`font-bold ${
                        step.highlightElements.some(el => formula.includes(el))
                          ? 'text-purple-600'
                          : 'text-gray-700'
                      }`}>
                        {step.coefficients[idx] > 1 ? step.coefficients[idx] : ''}
                      </span>
                      <span>{formula}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Atom inventory */}
            <AtomInventory
              equation={equation}
              coefficients={step.coefficients}
              language={language}
              highlightElements={step.highlightElements}
            />

            {/* Step explanation */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <div className="text-sm font-semibold text-blue-800 mb-1">
                    {l.step} {step.stepNumber}
                  </div>
                  <p className="text-blue-700">{getExplanation(step)}</p>
                  {step.coefficientsAfterIs && (
                    <div className="mt-2 font-mono text-blue-600 text-sm">
                      {getCoefAfter(step)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            {tutorialStepIndex < currentTutorial.steps.length - 1 ? (
              <button
                onClick={() => setTutorialStepIndex(prev => prev + 1)}
                className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-bold transition-colors"
              >
                {l.next} →
              </button>
            ) : tutorialIndex < TUTORIAL_EXAMPLES.length - 1 ? (
              <button
                onClick={() => {
                  setTutorialIndex(prev => prev + 1);
                  setTutorialStepIndex(0);
                }}
                className="flex-1 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-bold transition-colors"
              >
                {l.tutorial} {tutorialIndex + 2} →
              </button>
            ) : (
              <button
                onClick={() => setPhase('practice')}
                className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors"
              >
                {l.startPractice} →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Practice phase
  if (phase === 'practice') {
    if (!currentPractice) {
      return <div>Loading...</div>;
    }

    const hint = language === 'en' ? currentPractice.hintEn : currentPractice.hint;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => {
                if (practiceIndex > 0) {
                  setPracticeIndex(prev => prev - 1);
                } else {
                  setPhase('tutorial');
                  setTutorialIndex(TUTORIAL_EXAMPLES.length - 1);
                  setTutorialStepIndex(TUTORIAL_EXAMPLES[TUTORIAL_EXAMPLES.length - 1].steps.length - 1);
                }
              }}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              ← {l.previous}
            </button>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                {l.practice} {practiceIndex + 1}/{PRACTICE_EQUATIONS.length}
              </div>
              <div className="text-sm font-semibold text-orange-600">
                {l.score}: {score}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
            <div className="flex justify-center mb-4">
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {l.tryIt}
              </span>
            </div>

            {/* Equation input */}
            <div className="flex items-center justify-center gap-2 flex-wrap text-xl mb-6">
              {currentPractice.reactants.map((formula, i) => (
                <span key={`reactant-${i}`} className="flex items-center gap-1">
                  {i > 0 && <span className="text-gray-500 mx-1">+</span>}
                  <CoefficientInput
                    value={coefficients[i] || 1}
                    onChange={(val) => updateCoefficient(i, val)}
                    disabled={feedback === 'correct'}
                    highlight={feedback === 'correct'}
                  />
                  <span className="font-mono">{formula}</span>
                </span>
              ))}

              <span className="text-gray-600 mx-3">→</span>

              {currentPractice.products.map((formula, i) => {
                const prodIndex = currentPractice.reactants.length + i;
                return (
                  <span key={`product-${i}`} className="flex items-center gap-1">
                    {i > 0 && <span className="text-gray-500 mx-1">+</span>}
                    <CoefficientInput
                      value={coefficients[prodIndex] || 1}
                      onChange={(val) => updateCoefficient(prodIndex, val)}
                      disabled={feedback === 'correct'}
                      highlight={feedback === 'correct'}
                    />
                    <span className="font-mono">{formula}</span>
                  </span>
                );
              })}
            </div>

            {/* Atom inventory */}
            <AtomInventory
              equation={currentPractice}
              coefficients={coefficients}
              language={language}
            />
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`text-center p-3 rounded-lg mb-4 ${
                feedback === 'correct'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {feedback === 'correct' ? l.correct : l.incorrect}
            </div>
          )}

          {/* Hint */}
          {showHint && hint && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-center text-sm">
              <span className="text-blue-800">💡 {hint}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center gap-3">
            {!showHint && (
              <button
                onClick={handleShowHint}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {l.hint}
              </button>
            )}
            <button
              onClick={checkPracticeAnswer}
              disabled={feedback === 'correct'}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              {l.check}
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${((practiceIndex + 1) / PRACTICE_EQUATIONS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Complete phase
  if (phase === 'complete') {
    const maxScore = PRACTICE_EQUATIONS.length * 10;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {l.complete}
            </h1>
            <p className="text-gray-600 mb-8">
              {l.completeDesc}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-600">{score}</div>
                <div className="text-sm text-gray-600">{l.score}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-600">
                  {TUTORIAL_EXAMPLES.length + PRACTICE_EQUATIONS.length}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en' ? 'Examples completed' :
                   language === 'pl' ? 'Ukończone przykłady' :
                   'Dæmi lokið'}
                </div>
              </div>
            </div>

            <button
              onClick={() => onComplete(score, maxScore, hintsUsed)}
              className="w-full py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-bold text-lg transition-colors"
            >
              {l.finish}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
