import { useState, useEffect } from 'react';
import {
  CONVERSION_CHAIN_PROBLEMS,
  UNIT_LABELS,
  CONVERSION_EXPLANATIONS,
  calculateChainValues,
  formatScientific,
  ConversionChainProblem,
} from '../data/conversionChains';

interface Level5Props {
  onBack: () => void;
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

type ConversionType = 'mass_to_moles' | 'moles_to_mass' | 'moles_to_molecules' | 'molecules_to_moles' | 'molecules_to_atoms' | 'atoms_to_molecules';

const CONVERSION_CARDS: { type: ConversionType; from: string; to: string }[] = [
  { type: 'mass_to_moles', from: 'mass', to: 'moles' },
  { type: 'moles_to_mass', from: 'moles', to: 'mass' },
  { type: 'moles_to_molecules', from: 'moles', to: 'molecules' },
  { type: 'molecules_to_moles', from: 'molecules', to: 'moles' },
  { type: 'molecules_to_atoms', from: 'molecules', to: 'atoms' },
  { type: 'atoms_to_molecules', from: 'atoms', to: 'molecules' },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function Level5({ onBack, onComplete, onCorrectAnswer, onIncorrectAnswer }: Level5Props) {
  const [problems, setProblems] = useState<ConversionChainProblem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSteps, setSelectedSteps] = useState<ConversionType[]>([]);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [language, setLanguage] = useState<'is' | 'en'>('is');
  const [showIntro, setShowIntro] = useState(true);

  // Initialize problems
  useEffect(() => {
    const shuffled = shuffleArray(CONVERSION_CHAIN_PROBLEMS).slice(0, 6);
    setProblems(shuffled);
  }, []);

  // Reset state when problem changes
  useEffect(() => {
    setSelectedSteps([]);
    setFeedback(null);
    setShowHint(false);
    setShowSolution(false);
  }, [currentIndex]);

  const currentProblem = problems[currentIndex];

  // Check if the selected steps form a valid conversion path
  const checkAnswer = () => {
    if (!currentProblem) return;

    // Build expected path
    const expectedPath = currentProblem.steps.map(s => `${s.from}_to_${s.to}` as ConversionType);

    // Check if selected steps match expected
    const isCorrect = selectedSteps.length === expectedPath.length &&
      selectedSteps.every((step, i) => step === expectedPath[i]);

    if (isCorrect) {
      setFeedback('correct');
      onCorrectAnswer();
      const points = currentProblem.difficulty === 'easy' ? 10 :
                    currentProblem.difficulty === 'medium' ? 15 : 20;
      const bonus = showHint ? 0 : 5;
      setScore(prev => prev + points + bonus);

      setTimeout(() => {
        if (currentIndex < problems.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          const maxScore = problems.reduce((sum, p) => {
            const base = p.difficulty === 'easy' ? 10 : p.difficulty === 'medium' ? 15 : 20;
            return sum + base + 5;
          }, 0);
          onComplete(score + points + bonus, maxScore, hintsUsed);
        }
      }, 2500);
    } else {
      setFeedback('incorrect');
      onIncorrectAnswer();
    }
  };

  const addStep = (type: ConversionType) => {
    if (feedback === 'correct') return;
    setSelectedSteps(prev => [...prev, type]);
    setFeedback(null);
  };

  const removeLastStep = () => {
    if (feedback === 'correct') return;
    setSelectedSteps(prev => prev.slice(0, -1));
    setFeedback(null);
  };

  const clearSteps = () => {
    if (feedback === 'correct') return;
    setSelectedSteps([]);
    setFeedback(null);
  };

  // Get current position in chain based on selected steps
  const getCurrentUnit = (): string => {
    if (selectedSteps.length === 0) return currentProblem?.givenUnit || 'mass';
    const lastStep = selectedSteps[selectedSteps.length - 1];
    return lastStep.split('_to_')[1];
  };

  // Get available next conversions based on current position
  const getAvailableConversions = (): typeof CONVERSION_CARDS => {
    const currentUnit = getCurrentUnit();
    return CONVERSION_CARDS.filter(c => c.from === currentUnit);
  };

  // Intro screen
  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
              ← Til baka
            </button>
            <button
              onClick={() => setLanguage(language === 'is' ? 'en' : 'is')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {language === 'is' ? '🇬🇧 English' : '🇮🇸 Íslenska'}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🔗</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {language === 'en' ? 'Level 5: Conversion Chains' : 'Stig 5: Umbreytingakeðjur'}
            </h1>
            <p className="text-gray-600 mb-6">
              {language === 'en'
                ? 'Build the conversion path from start to finish'
                : 'Byggðu umbreytingarleiðina frá upphafi til enda'}
            </p>

            {/* Conversion chain diagram */}
            <div className="bg-indigo-50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-2 flex-wrap text-sm">
                <div className="bg-blue-500 text-white px-3 py-2 rounded-lg font-bold">
                  {language === 'en' ? 'Mass (g)' : 'Massi (g)'}
                </div>
                <span className="text-indigo-400">⟷</span>
                <div className="bg-green-500 text-white px-3 py-2 rounded-lg font-bold">
                  {language === 'en' ? 'Moles' : 'Mól'}
                </div>
                <span className="text-indigo-400">⟷</span>
                <div className="bg-purple-500 text-white px-3 py-2 rounded-lg font-bold">
                  {language === 'en' ? 'Molecules' : 'Sameindir'}
                </div>
                <span className="text-indigo-400">⟷</span>
                <div className="bg-orange-500 text-white px-3 py-2 rounded-lg font-bold">
                  {language === 'en' ? 'Atoms' : 'Atóm'}
                </div>
              </div>
            </div>

            {/* Key formulas */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
              <h3 className="font-bold text-gray-800 mb-3 text-center">
                {language === 'en' ? 'Conversion Factors' : 'Umbreytingarstuðlar'}
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm font-mono">
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500 text-xs mb-1">
                    {language === 'en' ? 'Mass ↔ Moles' : 'Massi ↔ Mól'}
                  </div>
                  <div>n = m / M</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500 text-xs mb-1">
                    {language === 'en' ? 'Moles ↔ Particles' : 'Mól ↔ Agnir'}
                  </div>
                  <div>N = n × Nₐ</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIntro(false)}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              {language === 'en' ? 'Start Building' : 'Byrja að byggja'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProblem) {
    return <div>Loading...</div>;
  }

  const chainValues = calculateChainValues(currentProblem);
  const availableConversions = getAvailableConversions();
  const currentUnit = getCurrentUnit();
  const targetReached = currentUnit === currentProblem.targetUnit;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
            ← Til baka
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800">
              {language === 'en' ? 'Conversion Chains' : 'Umbreytingakeðjur'}
            </h1>
            <div className={`inline-block px-2 py-0.5 rounded-full text-xs mt-1 ${
              currentProblem.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              currentProblem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentProblem.difficulty === 'easy' ? (language === 'en' ? 'Easy' : 'Auðvelt') :
               currentProblem.difficulty === 'medium' ? (language === 'en' ? 'Medium' : 'Miðlungs') :
               (language === 'en' ? 'Hard' : 'Erfitt')}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              Stig: <span className="font-bold text-indigo-600">{score}</span>
            </div>
            <div className="text-xs text-gray-500">
              {currentIndex + 1} / {problems.length}
            </div>
          </div>
        </div>

        {/* Problem card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          {/* Compound info */}
          <div className="text-center mb-4">
            <div className="text-3xl font-mono font-bold text-gray-800">
              {currentProblem.compound.formula}
            </div>
            <div className="text-gray-600 text-sm">
              {language === 'en' ? currentProblem.compound.nameEn : currentProblem.compound.name}
              {' • '}M = {currentProblem.compound.molarMass} g/mól
            </div>
          </div>

          {/* Task description */}
          <div className="bg-indigo-50 rounded-xl p-4 mb-4 text-center">
            <div className="text-sm text-indigo-600 mb-1">
              {language === 'en' ? 'Convert:' : 'Umbreyttu:'}
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold">
                {formatScientific(currentProblem.givenValue)} {UNIT_LABELS[currentProblem.givenUnit].short}
              </div>
              <span className="text-2xl text-indigo-400">→</span>
              <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold">
                ? {UNIT_LABELS[currentProblem.targetUnit].short}
              </div>
            </div>
          </div>

          {/* Chain builder */}
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">
              {language === 'en' ? 'Your conversion chain:' : 'Umbreytingakeðjan þín:'}
            </div>
            <div className="bg-gray-50 rounded-xl p-4 min-h-[60px] flex items-center gap-2 flex-wrap">
              <div className={`px-3 py-2 rounded-lg font-mono text-sm ${
                currentProblem.givenUnit === 'mass' ? 'bg-blue-100 text-blue-800' :
                currentProblem.givenUnit === 'moles' ? 'bg-green-100 text-green-800' :
                currentProblem.givenUnit === 'molecules' ? 'bg-purple-100 text-purple-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {formatScientific(currentProblem.givenValue)} {UNIT_LABELS[currentProblem.givenUnit].short}
              </div>

              {selectedSteps.map((step, i) => {
                const explanation = CONVERSION_EXPLANATIONS[step];
                const toUnit = step.split('_to_')[1] as keyof typeof UNIT_LABELS;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div className="text-gray-400 text-xs px-2 py-1 bg-white rounded border">
                      {explanation.formula}
                    </div>
                    <span className="text-gray-400">→</span>
                    <div className={`px-3 py-2 rounded-lg font-mono text-sm ${
                      toUnit === 'mass' ? 'bg-blue-100 text-blue-800' :
                      toUnit === 'moles' ? 'bg-green-100 text-green-800' :
                      toUnit === 'molecules' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {UNIT_LABELS[toUnit].short}
                    </div>
                  </div>
                );
              })}

              {selectedSteps.length === 0 && (
                <span className="text-gray-400 text-sm italic">
                  {language === 'en' ? 'Click conversions below to build chain' : 'Smelltu á umbreytingar hér að neðan'}
                </span>
              )}
            </div>
          </div>

          {/* Available conversions */}
          {!targetReached && feedback !== 'correct' && (
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Available conversions:' : 'Tiltækar umbreytingar:'}
              </div>
              <div className="flex flex-wrap gap-2">
                {availableConversions.map(conv => {
                  const explanation = CONVERSION_EXPLANATIONS[conv.type];
                  return (
                    <button
                      key={conv.type}
                      onClick={() => addStep(conv.type)}
                      className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg text-sm transition-colors"
                    >
                      {language === 'en' ? explanation.en : explanation.is}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Target reached indicator */}
          {targetReached && feedback !== 'correct' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-center">
              <span className="text-green-700">
                ✓ {language === 'en' ? 'Target unit reached! Click Check to verify.' : 'Markeiningu náð! Smelltu á Athuga til að staðfesta.'}
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center gap-3">
            {selectedSteps.length > 0 && feedback !== 'correct' && (
              <>
                <button
                  onClick={removeLastStep}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm transition-colors"
                >
                  {language === 'en' ? 'Undo' : 'Afturkalla'}
                </button>
                <button
                  onClick={clearSteps}
                  className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm transition-colors"
                >
                  {language === 'en' ? 'Clear' : 'Hreinsa'}
                </button>
              </>
            )}
            {!showHint && feedback !== 'correct' && (
              <button
                onClick={() => { setShowHint(true); setHintsUsed(prev => prev + 1); }}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm transition-colors"
              >
                {language === 'en' ? 'Hint' : 'Vísbending'}
              </button>
            )}
            <button
              onClick={checkAnswer}
              disabled={feedback === 'correct' || selectedSteps.length === 0}
              className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              {language === 'en' ? 'Check' : 'Athuga'}
            </button>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`text-center p-4 rounded-lg mb-4 ${
            feedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {feedback === 'correct' ? (
              <div>
                <div className="font-bold text-lg mb-2">
                  {language === 'en' ? 'Correct!' : 'Rétt!'}
                </div>
                <div className="text-sm">
                  {chainValues.map((v, i) => (
                    <span key={i}>
                      {formatScientific(v.value)} {UNIT_LABELS[v.unit as keyof typeof UNIT_LABELS]?.short}
                      {i < chainValues.length - 1 && ' → '}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="font-bold">
                  {language === 'en' ? 'Not quite right' : 'Ekki alveg rétt'}
                </div>
                <div className="text-sm">
                  {language === 'en'
                    ? 'Check your conversion steps and try again'
                    : 'Athugaðu umbreytingarskrefin og reyndu aftur'}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hint */}
        {showHint && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="font-bold text-yellow-800 mb-2">
              💡 {language === 'en' ? 'Hint' : 'Vísbending'}
            </div>
            <div className="text-yellow-700 text-sm">
              {language === 'en'
                ? `You need ${currentProblem.steps.length} step(s). Start by converting ${UNIT_LABELS[currentProblem.givenUnit].en} to ${UNIT_LABELS[currentProblem.steps[0].to].en}.`
                : `Þú þarft ${currentProblem.steps.length} skref. Byrjaðu á að umbreyta ${UNIT_LABELS[currentProblem.givenUnit].is} í ${UNIT_LABELS[currentProblem.steps[0].to].is}.`}
            </div>
          </div>
        )}

        {/* Show solution button */}
        {feedback === 'incorrect' && !showSolution && (
          <div className="text-center">
            <button
              onClick={() => setShowSolution(true)}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              {language === 'en' ? 'Show solution' : 'Sýna lausn'}
            </button>
          </div>
        )}

        {/* Solution */}
        {showSolution && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="font-bold text-blue-800 mb-2">
              {language === 'en' ? 'Solution' : 'Lausn'}
            </div>
            <div className="space-y-2 text-sm">
              {currentProblem.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-blue-700">
                  <span className="bg-blue-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span>{language === 'en' ? step.conversionFactorEn : step.conversionFactor}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / problems.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
