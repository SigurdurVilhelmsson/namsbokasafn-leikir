import { useState } from 'react';
import { Reaction } from '../types';
import { REACTIONS } from '../data/reactions';
import { Molecule } from './Molecule';

interface Level2Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

type Step = 'times_r1' | 'times_r2' | 'limiting' | 'products' | 'excess' | 'complete';

interface Problem {
  reaction: Reaction;
  r1Count: number;
  r2Count: number;
  // Correct answers
  timesR1: number;
  timesR2: number;
  limitingReactant: string;
  productsFormed: number;
  excessRemaining: number;
}

// Use easy and medium reactions for Level 2
const LEVEL2_REACTIONS = REACTIONS.filter(r => r.difficulty === 'easy' || r.difficulty === 'medium');

function generateProblem(): Problem {
  const reaction = LEVEL2_REACTIONS[Math.floor(Math.random() * LEVEL2_REACTIONS.length)];

  // Generate counts that create a clear limiting reactant
  let r1Count: number, r2Count: number;

  // Randomize which is limiting
  if (Math.random() < 0.5) {
    // R1 is limiting
    r1Count = reaction.reactant1.coeff * (Math.floor(Math.random() * 3) + 2); // 2-4 times
    r2Count = reaction.reactant2.coeff * (Math.floor(Math.random() * 3) + 4); // 4-6 times
  } else {
    // R2 is limiting
    r1Count = reaction.reactant1.coeff * (Math.floor(Math.random() * 3) + 4);
    r2Count = reaction.reactant2.coeff * (Math.floor(Math.random() * 3) + 2);
  }

  // Calculate correct answers
  const timesR1 = r1Count / reaction.reactant1.coeff;
  const timesR2 = r2Count / reaction.reactant2.coeff;
  const limitingReactant = timesR1 <= timesR2 ? reaction.reactant1.formula : reaction.reactant2.formula;
  const timesReactionRuns = Math.floor(Math.min(timesR1, timesR2));
  const productsFormed = reaction.products[0].coeff * timesReactionRuns;

  const excessRemaining = limitingReactant === reaction.reactant1.formula
    ? r2Count - (timesReactionRuns * reaction.reactant2.coeff)
    : r1Count - (timesReactionRuns * reaction.reactant1.coeff);

  return {
    reaction,
    r1Count,
    r2Count,
    timesR1,
    timesR2,
    limitingReactant,
    productsFormed,
    excessRemaining
  };
}

export function Level2({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level2Props) {
  const [problemIndex, setProblemIndex] = useState(0);
  const [problem, setProblem] = useState<Problem>(() => generateProblem());
  const [currentStep, setCurrentStep] = useState<Step>('times_r1');
  const [score, setScore] = useState(0);
  const [correctProblems, setCorrectProblems] = useState(0);
  const [input, setInput] = useState('');
  const [selectedLimiting, setSelectedLimiting] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isStepCorrect, setIsStepCorrect] = useState(false);
  const [problemCorrectSoFar, setProblemCorrectSoFar] = useState(true);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);

  const totalProblems = 8;
  const masteryThreshold = 6;
  const hasMastery = correctProblems >= masteryThreshold;
  const isComplete = problemIndex >= totalProblems || hasMastery;

  const checkStep = () => {
    let correct = false;
    const numInput = parseFloat(input);

    switch (currentStep) {
      case 'times_r1':
        correct = numInput === problem.timesR1;
        break;
      case 'times_r2':
        correct = numInput === problem.timesR2;
        break;
      case 'limiting':
        correct = selectedLimiting === problem.limitingReactant;
        break;
      case 'products':
        correct = numInput === problem.productsFormed;
        break;
      case 'excess':
        correct = numInput === problem.excessRemaining;
        break;
    }

    setIsStepCorrect(correct);
    setShowFeedback(true);

    if (!correct) {
      setProblemCorrectSoFar(false);
      onIncorrectAnswer?.();
    }

    if (correct) {
      setScore(prev => prev + 5);
      onCorrectAnswer?.();
    }
  };

  const nextStep = () => {
    setShowFeedback(false);
    setInput('');
    setSelectedLimiting(null);

    const stepOrder: Step[] = ['times_r1', 'times_r2', 'limiting', 'products', 'excess', 'complete'];
    const currentIndex = stepOrder.indexOf(currentStep);

    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const nextProblem = () => {
    if (problemCorrectSoFar) {
      setCorrectProblems(prev => prev + 1);
    }

    const next = problemIndex + 1;
    setProblemIndex(next);

    if (next < totalProblems) {
      setProblem(generateProblem());
      setCurrentStep('times_r1');
      setInput('');
      setSelectedLimiting(null);
      setShowFeedback(false);
      setProblemCorrectSoFar(true);
    }
  };

  // Complete screen
  if (isComplete) {
    const passedLevel = hasMastery;

    return (
      <div className={`min-h-screen bg-gradient-to-b ${passedLevel ? 'from-green-50' : 'from-yellow-50'} to-white p-4`}>
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">{passedLevel ? '🎓' : '📚'}</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {passedLevel ? 'Vel gert!' : 'Góð æfing!'}
            </h2>
            <p className="text-gray-600 mb-6">
              {passedLevel
                ? `Þú náðir ${correctProblems}+ fullkomnum verkefnum og hefur lokið Stigi 2!`
                : `Þú þarft ${masteryThreshold} fullkomin verkefni til að opna Stig 3. Reyndu aftur!`}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">{correctProblems}/{problemIndex + 1}</div>
                <div className="text-xs text-gray-600">Fullkomin</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-600">{score}</div>
                <div className="text-xs text-gray-600">Stig</div>
              </div>
            </div>

            {/* Mastery progress */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Framvinda í lærdómi</span>
                <span>{correctProblems}/{masteryThreshold} fullkomin</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${passedLevel ? 'bg-green-500' : 'bg-yellow-500'}`}
                  style={{ width: `${Math.min((correctProblems / masteryThreshold) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* What you learned */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-bold text-blue-800 mb-3">Aðferðin:</h3>
              <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                <li>Reikna hversu oft R1 getur hvarfast: sameindir ÷ stuðull</li>
                <li>Reikna hversu oft R2 getur hvarfast: sameindir ÷ stuðull</li>
                <li>Takmarkandi = sá með FÆRRI skipti</li>
                <li>Afurðir = fjöldi skipta × stuðull afurðar</li>
                <li>Afgangur = upphafleg - notuð</li>
              </ol>
            </div>

            <div className="space-y-3">
              {passedLevel ? (
                <button
                  onClick={() => onComplete(score, totalProblems * 25, totalHintsUsed)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  Halda áfram í Stig 3 →
                </button>
              ) : (
                <button
                  onClick={() => {
                    setProblemIndex(0);
                    setScore(0);
                    setCorrectProblems(0);
                    setProblem(generateProblem());
                    setCurrentStep('times_r1');
                    setInput('');
                    setSelectedLimiting(null);
                    setShowFeedback(false);
                    setProblemCorrectSoFar(true);
                    setTotalHintsUsed(0);
                  }}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  Reyna aftur
                </button>
              )}
              <button
                onClick={onBack}
                className="w-full text-gray-500 hover:text-gray-700 font-semibold py-2"
              >
                Til baka í valmynd
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Problem complete - show summary before next
  if (currentStep === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-gray-800">Takmarkandi - Stig 2</h1>
                <p className="text-sm text-gray-600">Verkefni {problemIndex + 1}/{totalProblems}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{score}</div>
                <div className="text-xs text-gray-600">Stig</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">{problemCorrectSoFar ? '✅' : '📝'}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {problemCorrectSoFar ? 'Fullkomið!' : 'Verkefni lokið'}
              </h2>
              <p className="text-gray-600">
                {problemCorrectSoFar
                  ? 'Þú svaraðir öllum skrefum rétt!'
                  : 'Þú lærðir af mistökunum. Haltu áfram að æfa!'}
              </p>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Samantekt:</h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Hvörf:</span>
                  <span className="font-mono">{problem.reaction.equation}</span>
                </div>
                <div className="flex justify-between">
                  <span>{problem.reaction.reactant1.formula} sinnum:</span>
                  <span className="font-bold">{problem.timesR1}</span>
                </div>
                <div className="flex justify-between">
                  <span>{problem.reaction.reactant2.formula} sinnum:</span>
                  <span className="font-bold">{problem.timesR2}</span>
                </div>
                <div className="flex justify-between">
                  <span>Takmarkandi:</span>
                  <span className="font-bold text-orange-600">{problem.limitingReactant}</span>
                </div>
                <div className="flex justify-between">
                  <span>{problem.reaction.products[0].formula} myndast:</span>
                  <span className="font-bold text-green-600">{problem.productsFormed}</span>
                </div>
                <div className="flex justify-between">
                  <span>Afgangur:</span>
                  <span className="font-bold text-blue-600">{problem.excessRemaining}</span>
                </div>
              </div>
            </div>

            <button
              onClick={nextProblem}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              {problemIndex + 1 < totalProblems ? 'Næsta verkefni →' : 'Sjá niðurstöður →'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get step info
  const getStepInfo = () => {
    switch (currentStep) {
      case 'times_r1':
        return {
          stepNumber: 1,
          title: `Skref 1: Hversu oft getur ${problem.reaction.reactant1.formula} hvarfast?`,
          instruction: `Þú hefur ${problem.r1Count} ${problem.reaction.reactant1.formula} og stuðullinn er ${problem.reaction.reactant1.coeff}`,
          formula: `Fjöldi skipta = sameindir ÷ stuðull = ${problem.r1Count} ÷ ${problem.reaction.reactant1.coeff} = ?`,
          correctAnswer: problem.timesR1
        };
      case 'times_r2':
        return {
          stepNumber: 2,
          title: `Skref 2: Hversu oft getur ${problem.reaction.reactant2.formula} hvarfast?`,
          instruction: `Þú hefur ${problem.r2Count} ${problem.reaction.reactant2.formula} og stuðullinn er ${problem.reaction.reactant2.coeff}`,
          formula: `Fjöldi skipta = sameindir ÷ stuðull = ${problem.r2Count} ÷ ${problem.reaction.reactant2.coeff} = ?`,
          correctAnswer: problem.timesR2
        };
      case 'limiting':
        return {
          stepNumber: 3,
          title: 'Skref 3: Hvort er takmarkandi hvarfefnið?',
          instruction: `${problem.reaction.reactant1.formula} getur hvarfast ${problem.timesR1} sinnum. ${problem.reaction.reactant2.formula} getur hvarfast ${problem.timesR2} sinnum. Hvort takmarkar hvörfin?`,
          formula: 'Takmarkandi = hvarfefnið með FÆRRI skipti',
          correctAnswer: problem.limitingReactant
        };
      case 'products':
        return {
          stepNumber: 4,
          title: `Skref 4: Hversu margar ${problem.reaction.products[0].formula} myndast?`,
          instruction: `Hvörfin geta gerst ${Math.min(problem.timesR1, problem.timesR2)} sinnum. Stuðull ${problem.reaction.products[0].formula} er ${problem.reaction.products[0].coeff}`,
          formula: `Afurðir = fjöldi skipta × stuðull = ${Math.min(problem.timesR1, problem.timesR2)} × ${problem.reaction.products[0].coeff} = ?`,
          correctAnswer: problem.productsFormed
        };
      case 'excess':
        const excessReactant = problem.limitingReactant === problem.reaction.reactant1.formula
          ? problem.reaction.reactant2
          : problem.reaction.reactant1;
        const excessStartCount = problem.limitingReactant === problem.reaction.reactant1.formula
          ? problem.r2Count
          : problem.r1Count;
        const timesRun = Math.min(problem.timesR1, problem.timesR2);
        const used = timesRun * excessReactant.coeff;
        return {
          stepNumber: 5,
          title: `Skref 5: Hversu margar ${excessReactant.formula} verða eftir?`,
          instruction: `Þú byrjaðir með ${excessStartCount} ${excessReactant.formula}. Hvörfin notuðu ${timesRun} × ${excessReactant.coeff} = ${used} sameindir`,
          formula: `Afgangur = upphafs - notuð = ${excessStartCount} - ${used} = ?`,
          correctAnswer: problem.excessRemaining
        };
      default:
        return { stepNumber: 0, title: '', instruction: '', formula: '', correctAnswer: 0 };
    }
  };

  const stepInfo = getStepInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Takmarkandi - Stig 2</h1>
              <p className="text-sm text-gray-600">Leiðbeind æfing</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{score}</div>
              <div className="text-xs text-gray-600">Stig</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Verkefni {problemIndex + 1}/{totalProblems}</span>
              <span>{correctProblems}/{masteryThreshold} fullkomin</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-500"
                style={{ width: `${((problemIndex + 1) / totalProblems) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Equation display */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <div className="text-center text-xl font-mono bg-gray-50 p-3 rounded-lg">
            {problem.reaction.equation}
          </div>
        </div>

        {/* Reactants visualization */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${
              currentStep === 'times_r1' ? 'bg-orange-50 border-2 border-orange-300' :
              currentStep === 'limiting' && selectedLimiting === problem.reaction.reactant1.formula ? 'bg-orange-100 border-2 border-orange-500' :
              'bg-gray-50'
            }`}>
              <div className="text-center mb-2">
                <div className="text-lg font-bold">{problem.reaction.reactant1.formula}</div>
                <div className="text-sm text-gray-600">{problem.r1Count} sameindur</div>
                <div className="text-xs text-gray-500">Stuðull: {problem.reaction.reactant1.coeff}</div>
              </div>
              <div className="flex flex-wrap justify-center gap-1">
                {Array.from({ length: Math.min(problem.r1Count, 8) }).map((_, i) => (
                  <Molecule
                    key={i}
                    formula={problem.reaction.reactant1.formula}
                    color={problem.reaction.reactant1.color}
                    size={25}
                  />
                ))}
                {problem.r1Count > 8 && <span className="text-gray-500 text-sm">+{problem.r1Count - 8}</span>}
              </div>
            </div>

            <div className={`p-4 rounded-xl ${
              currentStep === 'times_r2' ? 'bg-orange-50 border-2 border-orange-300' :
              currentStep === 'limiting' && selectedLimiting === problem.reaction.reactant2.formula ? 'bg-orange-100 border-2 border-orange-500' :
              'bg-gray-50'
            }`}>
              <div className="text-center mb-2">
                <div className="text-lg font-bold">{problem.reaction.reactant2.formula}</div>
                <div className="text-sm text-gray-600">{problem.r2Count} sameindur</div>
                <div className="text-xs text-gray-500">Stuðull: {problem.reaction.reactant2.coeff}</div>
              </div>
              <div className="flex flex-wrap justify-center gap-1">
                {Array.from({ length: Math.min(problem.r2Count, 8) }).map((_, i) => (
                  <Molecule
                    key={i}
                    formula={problem.reaction.reactant2.formula}
                    color={problem.reaction.reactant2.color}
                    size={25}
                  />
                ))}
                {problem.r2Count > 8 && <span className="text-gray-500 text-sm">+{problem.r2Count - 8}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Step progress */}
        <div className="bg-white rounded-xl shadow-md p-3 mb-4">
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step < stepInfo.stepNumber
                    ? 'bg-green-500 text-white'
                    : step === stepInfo.stepNumber
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step < stepInfo.stepNumber ? '✓' : step}
              </div>
            ))}
          </div>
        </div>

        {/* Current step */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">{stepInfo.title}</h2>
          <p className="text-gray-600 mb-4">{stepInfo.instruction}</p>

          {/* Formula hint */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4">
            <p className="font-mono text-sm text-gray-700">{stepInfo.formula}</p>
          </div>

          {/* Input or selection */}
          {currentStep === 'limiting' ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => !showFeedback && setSelectedLimiting(problem.reaction.reactant1.formula)}
                disabled={showFeedback}
                className={`p-4 rounded-xl border-4 font-bold text-lg transition-all ${
                  showFeedback && selectedLimiting === problem.reaction.reactant1.formula
                    ? isStepCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700'
                    : showFeedback && problem.limitingReactant === problem.reaction.reactant1.formula
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : selectedLimiting === problem.reaction.reactant1.formula
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                {problem.reaction.reactant1.formula}
                <div className="text-sm font-normal text-gray-600">{problem.timesR1} skipti</div>
              </button>

              <button
                onClick={() => !showFeedback && setSelectedLimiting(problem.reaction.reactant2.formula)}
                disabled={showFeedback}
                className={`p-4 rounded-xl border-4 font-bold text-lg transition-all ${
                  showFeedback && selectedLimiting === problem.reaction.reactant2.formula
                    ? isStepCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700'
                    : showFeedback && problem.limitingReactant === problem.reaction.reactant2.formula
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : selectedLimiting === problem.reaction.reactant2.formula
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                {problem.reaction.reactant2.formula}
                <div className="text-sm font-normal text-gray-600">{problem.timesR2} skipti</div>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={showFeedback}
                className={`flex-1 px-4 py-3 border-2 rounded-xl text-xl text-center ${
                  showFeedback
                    ? isStepCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-300 focus:border-orange-500'
                } outline-none`}
                placeholder="Sláðu inn svar..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && input && !showFeedback) {
                    checkStep();
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`rounded-xl p-4 mb-4 ${isStepCorrect ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{isStepCorrect ? '✓' : '✗'}</span>
              <p className="text-lg font-bold">{isStepCorrect ? 'Rétt!' : 'Rangt'}</p>
            </div>
            {isStepCorrect ? (
              <p className="text-green-700 text-sm">+5 stig!</p>
            ) : (
              <p className="text-gray-700 text-sm">
                Rétt svar: <span className="font-bold">{stepInfo.correctAnswer}</span>
              </p>
            )}
            <button
              onClick={nextStep}
              className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              {stepInfo.stepNumber < 5 ? 'Næsta skref →' : 'Sjá samantekt →'}
            </button>
          </div>
        )}

        {/* Submit button */}
        {!showFeedback && (
          <button
            onClick={checkStep}
            disabled={currentStep === 'limiting' ? !selectedLimiting : !input}
            className={`w-full font-bold py-3 px-6 rounded-xl transition-colors ${
              (currentStep === 'limiting' ? selectedLimiting : input)
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Athuga svar
          </button>
        )}

        {/* Back button */}
        <button
          onClick={onBack}
          className="w-full text-gray-500 hover:text-gray-700 font-semibold py-3 mt-4"
        >
          ← Til baka í valmynd
        </button>
      </div>
    </div>
  );
}

export default Level2;
