import { useState, useEffect } from 'react';
import { UnitBlock, ConversionFactorBlock, EquivalenceDisplay } from './UnitBlock';

interface Level1Progress {
  questionsAnswered: number;
  questionsCorrect: number;
  explanationsProvided: number;
  explanationScores: number[];
  mastered: boolean;
}

interface Level1Props {
  onComplete: (progress: Level1Progress) => void;
  onBack: () => void;
  initialProgress?: Level1Progress;
}

// Challenge definitions - visual, conceptual challenges
interface Challenge {
  id: string;
  type: 'equivalence' | 'factor_building' | 'cancellation' | 'orientation';
  title: string;
  instruction: string;
  hint?: string;
}

const challenges: Challenge[] = [
  {
    id: 'C1',
    type: 'equivalence',
    title: 'Jafngildi eininga',
    instruction: 'Stilltu hægri gildið þannig að vogin jafnist. 1000 mL er jafnt hverju?',
    hint: 'Mundu: Lítrar og millilítrar mæla sama rúmmál, bara með mismunandi tölum.'
  },
  {
    id: 'C2',
    type: 'factor_building',
    title: 'Byggja umbreytingarstuðul',
    instruction: 'Dragðu einingar í brotið til að búa til stuðul sem jafngildir 1.',
    hint: 'Stuðull jafngildir 1 þegar teljari og nefnari tákna sama magn.'
  },
  {
    id: 'C3',
    type: 'cancellation',
    title: 'Strikun eininga',
    instruction: 'Veldu réttan stuðul til að breyta mL í L. Horfðu á hvernig einingarnar strikast út!',
    hint: 'Einingin sem þú vilt losna við þarf að vera í nefnara stuðulsins.'
  },
  {
    id: 'C4',
    type: 'orientation',
    title: 'Snúningur stuðuls',
    instruction: 'Prófaðu báða stuðla. Hver virkar til að breyta km í m?',
    hint: 'Prófaðu og sjáðu hvað gerist! Rangur stuðull gefur vitlaust.'
  },
  {
    id: 'C5',
    type: 'cancellation',
    title: 'Keðjubreyting',
    instruction: 'Notaðu tvo stuðla til að breyta mg í kg.',
    hint: 'Fyrst mg → g, síðan g → kg. Fylgstu með hvernig einingarnar hverfa.'
  },
  {
    id: 'C6',
    type: 'equivalence',
    title: 'Áskorun - Tímaeiningar',
    instruction: 'Hversu margar sekúndur eru í 1 klukkustund?',
    hint: '1 klst = 60 mín, og 1 mín = 60 s'
  }
];

// Random starting values to prevent memorization
function getRandomStartValue(): number {
  const options = [250, 500, 750, 1500, 2000];
  return options[Math.floor(Math.random() * options.length)];
}

// Shuffle factor order to prevent memorization
function shuffleFactors<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Level 1 Conceptual - Visual learning with NO calculations
 * Students manipulate visual elements to understand dimensional analysis concepts
 */
export function Level1Conceptual({ onComplete, onBack, initialProgress }: Level1Props) {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(
    initialProgress?.questionsAnswered || 0
  );
  const [progress, setProgress] = useState<Level1Progress>(
    initialProgress || {
      questionsAnswered: 0,
      questionsCorrect: 0,
      explanationsProvided: 0,
      explanationScores: [],
      mastered: false
    }
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showIntro, setShowIntro] = useState(!initialProgress?.questionsAnswered);
  const [showSummary, setShowSummary] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const challenge = challenges[currentChallengeIndex];

  // Reset state when challenge changes
  useEffect(() => {
    setShowSuccess(false);
    setShowHint(false);
    setAttempts(0);
  }, [currentChallengeIndex]);

  const handleSuccess = () => {
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      setShowSuccess(true);
    }, 1200);

    const newProgress = {
      ...progress,
      questionsAnswered: progress.questionsAnswered + 1,
      questionsCorrect: progress.questionsCorrect + 1
    };
    setProgress(newProgress);
  };

  const handleContinue = () => {
    const newProgress = { ...progress };

    // Check mastery after 6 challenges
    if (newProgress.questionsAnswered >= 6) {
      newProgress.mastered = newProgress.questionsCorrect >= 5;
    }

    setProgress(newProgress);

    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
    } else {
      // Show summary before completing
      setShowSummary(true);
    }
  };

  const handleCompleteSummary = () => {
    onComplete(progress);
  };

  const handleAttempt = () => {
    setAttempts(attempts + 1);
    if (attempts >= 2 && !showHint) {
      setShowHint(true);
    }
  };

  if (!challenge && !showSummary) return null;

  // Intro Tutorial Screen
  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔬</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Velkomin í Einingagreiningu!</h1>
              <p className="text-lg text-gray-600">Stig 1: Hugtök</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <span className="text-2xl">👆</span>
                <div>
                  <p className="font-semibold text-green-800">Engar útreikninga!</p>
                  <p className="text-green-700 text-sm">Þú lærir með því að prófa og sjá hvað gerist.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-semibold text-blue-800">6 áskoranir</p>
                  <p className="text-blue-700 text-sm">Hver áskorun kennir þér nýtt hugtak um umbreytingar.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-semibold text-yellow-800">Vísbendingar birtast</p>
                  <p className="text-yellow-700 text-sm">Ef þú reynir nokkrum sinnum birtist hjálp.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIntro(false)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Byrja! →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Summary Screen
  if (showSummary) {
    const mastered = progress.questionsCorrect >= 5;
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{mastered ? '🎉' : '📚'}</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {mastered ? 'Frábært!' : 'Vel gert!'}
              </h1>
              <p className="text-lg text-gray-600">
                Þú svaraðir {progress.questionsCorrect} af {challenges.length} rétt
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Hvað þú lærðir:</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600 text-xl">✓</span>
                  <p className="text-green-800">Mismunandi tölur með mismunandi einingum geta táknað <strong>sama magn</strong></p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600 text-xl">✓</span>
                  <p className="text-green-800">Umbreytingarstuðlar <strong>jafngilda 1</strong> - þeir breyta ekki magninu</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600 text-xl">✓</span>
                  <p className="text-green-800">Eins einingar <strong>strikast út</strong> (teljari og nefnari)</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600 text-xl">✓</span>
                  <p className="text-green-800">Einingin sem á að hverfa þarf að vera í <strong>nefnara</strong></p>
                </div>
              </div>
            </div>

            {mastered ? (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-blue-800 font-semibold">Stig 2 er nú opið!</p>
                  <p className="text-blue-600 text-sm">Þar munt þú nota þessi hugtök til að spá fyrir um niðurstöður.</p>
                </div>
                <button
                  onClick={handleCompleteSummary}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition-colors"
                >
                  Halda áfram →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg text-center">
                  <p className="text-yellow-800 font-semibold">Þú þarft 5 af 6 til að opna Stig 2</p>
                  <p className="text-yellow-600 text-sm">Reyndu aftur til að styrkja skilninginn!</p>
                </div>
                <button
                  onClick={() => {
                    setCurrentChallengeIndex(0);
                    setShowSummary(false);
                    setProgress({
                      questionsAnswered: 0,
                      questionsCorrect: 0,
                      explanationsProvided: 0,
                      explanationScores: [],
                      mastered: false
                    });
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-colors"
                >
                  Reyna aftur
                </button>
                <button
                  onClick={handleCompleteSummary}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
                >
                  Til baka í valmynd
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="text-center animate-bounce">
            <div className="text-8xl mb-4">🎉</div>
            <div className="text-4xl font-bold text-green-600 animate-pulse">Rétt!</div>
          </div>
          {/* Confetti particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  backgroundColor: ['#22c55e', '#3b82f6', '#f97316', '#eab308', '#ec4899'][i % 5],
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2 text-lg"
          >
            ← Til baka
          </button>
          <div className="text-sm text-gray-600 flex items-center gap-2 sm:gap-4 flex-wrap">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
              Stig 1: Hugtök
            </span>
            <span>Áskorun {currentChallengeIndex + 1} / {challenges.length}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentChallengeIndex) / challenges.length) * 100}%` }}
          />
        </div>

        {/* Main challenge card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{challenge.title}</h2>
          <p className="text-lg text-gray-600 mb-6">{challenge.instruction}</p>

          {/* Challenge content - rendered based on type */}
          <div className="mb-6">
            {challenge.type === 'equivalence' && challenge.id === 'C1' && (
              <EquivalenceChallenge1 onSuccess={handleSuccess} onAttempt={handleAttempt} />
            )}
            {challenge.type === 'factor_building' && (
              <FactorBuildingChallenge onSuccess={handleSuccess} onAttempt={handleAttempt} />
            )}
            {challenge.type === 'cancellation' && challenge.id === 'C3' && (
              <CancellationChallenge1 onSuccess={handleSuccess} onAttempt={handleAttempt} />
            )}
            {challenge.type === 'orientation' && (
              <OrientationChallenge onSuccess={handleSuccess} onAttempt={handleAttempt} />
            )}
            {challenge.type === 'cancellation' && challenge.id === 'C5' && (
              <ChainConversionChallenge onSuccess={handleSuccess} onAttempt={handleAttempt} />
            )}
            {challenge.type === 'equivalence' && challenge.id === 'C6' && (
              <TimeEquivalenceChallenge onSuccess={handleSuccess} onAttempt={handleAttempt} />
            )}
          </div>

          {/* Hint */}
          {showHint && challenge.hint && !showSuccess && (
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
              <p className="text-sm font-semibold text-blue-800 mb-1">Vísbending:</p>
              <p className="text-blue-700">{challenge.hint}</p>
            </div>
          )}

          {/* Success message */}
          {showSuccess && (
            <div className="mb-6 p-6 bg-green-100 rounded-xl border-2 border-green-300">
              <h3 className="text-xl font-bold text-green-800 mb-2">Rétt!</h3>
              <p className="text-green-700 mb-4">
                {challenge.type === 'equivalence' && 'Þú skildir að mismunandi tölur með mismunandi einingum geta táknað sama magn!'}
                {challenge.type === 'factor_building' && 'Þú bjóst til stuðul sem jafngildir 1 - lykilhugtak í einingagreiningu!'}
                {challenge.type === 'cancellation' && 'Þú sást hvernig einingarnar strikast út þegar þær eru eins!'}
                {challenge.type === 'orientation' && 'Þú lærðir að einingin sem á að hverfa þarf að vera í nefnara!'}
              </p>
              <button
                onClick={handleContinue}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors"
              >
                {currentChallengeIndex < challenges.length - 1 ? 'Næsta áskorun →' : 'Ljúka stigi'}
              </button>
            </div>
          )}
        </div>

        {/* Conceptual reminder */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          Stig 1 snýst um að <strong>skilja hugtökin</strong> - engar útreikninga!
        </div>
      </div>
    </div>
  );
}

// ==================== Individual Challenge Components ====================

interface ChallengeComponentProps {
  onSuccess: () => void;
  onAttempt: () => void;
}

/**
 * Challenge 1: Unit Equivalence - Match mL to L
 */
function EquivalenceChallenge1({ onSuccess, onAttempt }: ChallengeComponentProps) {
  const [rightValue, setRightValue] = useState(100);
  const [selectedUnit, setSelectedUnit] = useState<'mL' | 'L'>('mL');
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Check if 1000 mL = X L (correct when X = 1 and unit is L)
    const correct = (selectedUnit === 'L' && rightValue === 1) ||
                   (selectedUnit === 'mL' && rightValue === 1000);
    setIsCorrect(correct);
    if (correct) {
      onSuccess();
    }
  }, [rightValue, selectedUnit, onSuccess]);

  const adjustValue = (delta: number) => {
    onAttempt();
    const newValue = Math.max(0.1, rightValue + delta);
    setRightValue(Number(newValue.toFixed(1)));
  };

  return (
    <div className="space-y-6">
      <EquivalenceDisplay
        leftValue={1000}
        leftUnit="mL"
        rightValue={rightValue}
        rightUnit={selectedUnit}
        isEqual={isCorrect}
      />

      {!isCorrect && (
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-xl">
          <p className="text-gray-700 font-semibold">Stilltu hægri hliðina:</p>

          {/* Unit selector */}
          <div className="flex gap-2">
            <button
              onClick={() => { setSelectedUnit('mL'); onAttempt(); }}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                selectedUnit === 'mL'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              mL
            </button>
            <button
              onClick={() => { setSelectedUnit('L'); onAttempt(); }}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                selectedUnit === 'L'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              L
            </button>
          </div>

          {/* Value adjuster - mobile responsive */}
          <div className="flex flex-col items-center gap-4">
            <span className="text-3xl font-bold text-gray-800">
              {rightValue}
            </span>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <button
                onClick={() => adjustValue(-100)}
                className="px-3 sm:px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors text-sm sm:text-base"
              >
                -100
              </button>
              <button
                onClick={() => adjustValue(-10)}
                className="px-3 sm:px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors text-sm sm:text-base"
              >
                -10
              </button>
              <button
                onClick={() => adjustValue(-1)}
                className="px-3 sm:px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 transition-colors text-sm sm:text-base"
              >
                -1
              </button>
              <button
                onClick={() => adjustValue(1)}
                className="px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold hover:bg-blue-200 transition-colors text-sm sm:text-base"
              >
                +1
              </button>
              <button
                onClick={() => adjustValue(10)}
                className="px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold hover:bg-blue-200 transition-colors text-sm sm:text-base"
              >
                +10
              </button>
              <button
                onClick={() => adjustValue(100)}
                className="px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold hover:bg-blue-200 transition-colors text-sm sm:text-base"
              >
                +100
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Challenge 2: Factor Building - Create a conversion factor that equals 1
 */
function FactorBuildingChallenge({ onSuccess, onAttempt }: ChallengeComponentProps) {
  const [numerator, setNumerator] = useState<{ value: number; unit: string } | null>(null);
  const [denominator, setDenominator] = useState<{ value: number; unit: string } | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const availableBlocks = [
    { value: 1000, unit: 'mL' },
    { value: 1, unit: 'L' },
    { value: 1000, unit: 'g' },
    { value: 1, unit: 'kg' }
  ];

  useEffect(() => {
    if (numerator && denominator) {
      // Check if they represent the same amount
      const correct =
        (numerator.value === 1000 && numerator.unit === 'mL' && denominator.value === 1 && denominator.unit === 'L') ||
        (numerator.value === 1 && numerator.unit === 'L' && denominator.value === 1000 && denominator.unit === 'mL') ||
        (numerator.value === 1000 && numerator.unit === 'g' && denominator.value === 1 && denominator.unit === 'kg') ||
        (numerator.value === 1 && numerator.unit === 'kg' && denominator.value === 1000 && denominator.unit === 'g');

      setIsCorrect(correct);
      if (correct) {
        onSuccess();
      }
    }
  }, [numerator, denominator, onSuccess]);

  const handleBlockClick = (block: { value: number; unit: string }) => {
    onAttempt();
    if (!numerator) {
      setNumerator(block);
    } else if (!denominator) {
      setDenominator(block);
    } else {
      // Reset
      setNumerator(block);
      setDenominator(null);
      setIsCorrect(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Fraction display */}
      <div className="flex flex-col items-center p-8 bg-gray-50 rounded-xl">
        {/* Numerator slot */}
        <div className={`
          min-w-[150px] min-h-[60px] p-4 rounded-lg border-2 border-dashed
          flex items-center justify-center text-lg font-bold
          ${numerator ? 'bg-blue-100 border-blue-400' : 'bg-gray-100 border-gray-300'}
        `}>
          {numerator ? `${numerator.value} ${numerator.unit}` : 'Teljari'}
        </div>

        {/* Fraction bar */}
        <div className="w-48 h-1 bg-gray-800 my-3" />

        {/* Denominator slot */}
        <div className={`
          min-w-[150px] min-h-[60px] p-4 rounded-lg border-2 border-dashed
          flex items-center justify-center text-lg font-bold
          ${denominator ? 'bg-green-100 border-green-400' : 'bg-gray-100 border-gray-300'}
        `}>
          {denominator ? `${denominator.value} ${denominator.unit}` : 'Nefnari'}
        </div>

        {/* Result */}
        {numerator && denominator && (
          <div className={`mt-6 text-2xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            = {isCorrect ? '1' : '≠ 1'}
          </div>
        )}
      </div>

      {/* Available blocks */}
      {!isCorrect && (
        <div className="p-4 bg-white rounded-xl border-2 border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Smelltu á einingar til að setja í brotið:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {availableBlocks.map((block, idx) => (
              <button
                key={idx}
                onClick={() => handleBlockClick(block)}
                className="px-6 py-3 bg-orange-100 text-orange-800 rounded-lg font-bold hover:bg-orange-200 transition-colors border-2 border-orange-300"
              >
                {block.value} {block.unit}
              </button>
            ))}
          </div>
          <button
            onClick={() => { setNumerator(null); setDenominator(null); setIsCorrect(false); }}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            Byrja upp á nýtt
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Challenge 3: Unit Cancellation - Select factor to convert mL to L
 */
function CancellationChallenge1({ onSuccess, onAttempt }: ChallengeComponentProps) {
  const [selectedFactor, setSelectedFactor] = useState<number | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [startValue] = useState(() => getRandomStartValue());
  const [factors] = useState(() => shuffleFactors([
    { num: 1000, numUnit: 'mL', den: 1, denUnit: 'L', correct: false },
    { num: 1, numUnit: 'L', den: 1000, denUnit: 'mL', correct: true }
  ]));

  const handleFactorSelect = (idx: number) => {
    onAttempt();
    setSelectedFactor(idx);
    setShowAnimation(true);

    setTimeout(() => {
      const correct = factors[idx].correct;
      setIsCorrect(correct);
      if (correct) {
        onSuccess();
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Starting value */}
      <div className="flex items-center justify-center gap-4 p-6 bg-gray-50 rounded-xl flex-wrap">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Byrjunargildi:</p>
          <UnitBlock value={startValue} unit="mL" color="blue" size="large" />
        </div>

        <div className="text-3xl text-gray-400">×</div>

        {/* Factor slot */}
        <div className={`
          min-w-[140px] min-h-[80px] p-4 rounded-xl border-2
          flex items-center justify-center
          ${selectedFactor !== null
            ? (isCorrect ? 'border-green-500 bg-green-50' : (showAnimation && !isCorrect ? 'border-red-500 bg-red-50' : 'border-orange-500 bg-orange-50'))
            : 'border-dashed border-gray-300 bg-gray-50'
          }
        `}>
          {selectedFactor !== null ? (
            <div className="text-center">
              <div className={`font-bold ${isCorrect && showAnimation ? 'text-gray-400 line-through' : 'text-blue-600'}`}>
                {factors[selectedFactor].num} {factors[selectedFactor].numUnit}
              </div>
              <div className="w-full h-0.5 bg-gray-800 my-1" />
              <div className={`font-bold ${isCorrect && showAnimation ? 'text-gray-400 line-through' : 'text-green-600'}`}>
                {factors[selectedFactor].den} {factors[selectedFactor].denUnit}
              </div>
            </div>
          ) : (
            <span className="text-gray-400">Veldu stuðul</span>
          )}
        </div>

        <div className="text-3xl text-gray-400">=</div>

        {/* Result */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Útkoma:</p>
          {showAnimation && (
            <UnitBlock
              value={isCorrect ? startValue / 1000 : startValue * 1000}
              unit={isCorrect ? 'L' : 'mL²/L'}
              color={isCorrect ? 'green' : 'red'}
              size="large"
            />
          )}
        </div>
      </div>

      {/* Cancellation animation explanation */}
      {showAnimation && isCorrect && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
          <p className="text-green-800">
            mL í teljaranum og mL í nefnaranum <strong>strikast út</strong>!
          </p>
          <p className="text-green-700 mt-2">
            {startValue} mL × (1 L / 1000 mL) = {startValue / 1000} L
          </p>
        </div>
      )}

      {showAnimation && !isCorrect && selectedFactor !== null && (
        <div className="p-4 bg-red-50 rounded-lg border border-red-200 text-center">
          <p className="text-red-800">
            mL er í teljara beggja - það strikast <strong>ekki</strong> út!
          </p>
          <button
            onClick={() => { setSelectedFactor(null); setShowAnimation(false); setIsCorrect(false); }}
            className="mt-2 text-red-600 underline"
          >
            Reyna aftur
          </button>
        </div>
      )}

      {/* Factor options */}
      {!isCorrect && !showAnimation && (
        <div className="flex justify-center gap-6">
          {factors.map((factor, idx) => (
            <ConversionFactorBlock
              key={idx}
              numeratorValue={factor.num}
              numeratorUnit={factor.numUnit}
              denominatorValue={factor.den}
              denominatorUnit={factor.denUnit}
              onClick={() => handleFactorSelect(idx)}
              size="large"
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Challenge 4: Orientation - Try both factor orientations
 */
function OrientationChallenge({ onSuccess, onAttempt }: ChallengeComponentProps) {
  const [triedWrong, setTriedWrong] = useState(false);
  const [triedCorrect, setTriedCorrect] = useState(false);
  const [selectedFactor, setSelectedFactor] = useState<'wrong' | 'correct' | null>(null);

  const handleTryFactor = (type: 'wrong' | 'correct') => {
    onAttempt();
    setSelectedFactor(type);

    if (type === 'wrong') {
      setTriedWrong(true);
    } else {
      setTriedCorrect(true);
    }

    if (type === 'correct' && triedWrong) {
      setTimeout(() => onSuccess(), 1000);
    } else if (type === 'correct') {
      setTimeout(() => onSuccess(), 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-lg font-semibold text-gray-800">Breyta 5 km → ? m</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Wrong factor */}
        <div className={`p-6 rounded-xl border-2 transition-all ${
          selectedFactor === 'wrong' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
        }`}>
          <ConversionFactorBlock
            numeratorValue={1}
            numeratorUnit="km"
            denominatorValue={1000}
            denominatorUnit="m"
            onClick={() => handleTryFactor('wrong')}
            isCorrect={selectedFactor === 'wrong' ? false : null}
            size="large"
          />

          {selectedFactor === 'wrong' && (
            <div className="mt-4 p-3 bg-red-100 rounded-lg">
              <p className="text-red-800 text-sm font-semibold">Rangt!</p>
              <p className="text-red-700 text-sm">km strikast ekki út - það er í teljara beggja!</p>
              <p className="text-red-600 text-xs mt-1">5 km × (1 km / 1000 m) = 0.005 km²/m</p>
            </div>
          )}
        </div>

        {/* Correct factor */}
        <div className={`p-6 rounded-xl border-2 transition-all ${
          selectedFactor === 'correct' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
        }`}>
          <ConversionFactorBlock
            numeratorValue={1000}
            numeratorUnit="m"
            denominatorValue={1}
            denominatorUnit="km"
            onClick={() => handleTryFactor('correct')}
            isCorrect={selectedFactor === 'correct' ? true : null}
            size="large"
          />

          {selectedFactor === 'correct' && (
            <div className="mt-4 p-3 bg-green-100 rounded-lg">
              <p className="text-green-800 text-sm font-semibold">Rétt!</p>
              <p className="text-green-700 text-sm">km er í nefnara - það strikast út!</p>
              <p className="text-green-600 text-xs mt-1">5 km × (1000 m / 1 km) = 5000 m</p>
            </div>
          )}
        </div>
      </div>

      {triedWrong && !triedCorrect && (
        <div className="text-center text-gray-600">
          Prófaðu hinn stuðulinn!
        </div>
      )}
    </div>
  );
}

/**
 * Challenge 5: Chain Conversion - mg to kg
 */
function ChainConversionChallenge({ onSuccess, onAttempt }: ChallengeComponentProps) {
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [selectedStep1, setSelectedStep1] = useState<number | null>(null);
  const [selectedStep2, setSelectedStep2] = useState<number | null>(null);

  const step1Factors = [
    { num: 1, numUnit: 'g', den: 1000, denUnit: 'mg', correct: true },
    { num: 1000, numUnit: 'mg', den: 1, denUnit: 'g', correct: false }
  ];

  const step2Factors = [
    { num: 1, numUnit: 'kg', den: 1000, denUnit: 'g', correct: true },
    { num: 1000, numUnit: 'g', den: 1, denUnit: 'kg', correct: false }
  ];

  const handleStep1 = (idx: number) => {
    onAttempt();
    setSelectedStep1(idx);
    if (step1Factors[idx].correct) {
      setTimeout(() => setStep1Done(true), 800);
    }
  };

  const handleStep2 = (idx: number) => {
    onAttempt();
    setSelectedStep2(idx);
    if (step2Factors[idx].correct) {
      setTimeout(() => {
        setStep2Done(true);
        onSuccess();
      }, 800);
    }
  };

  return (
    <div className="space-y-6">
      {/* Chain display */}
      <div className="flex items-center justify-center gap-3 p-6 bg-gray-50 rounded-xl flex-wrap">
        <UnitBlock value={5000} unit="mg" color="blue" size="medium" />
        <span className="text-2xl text-gray-400">→</span>

        <div className={`px-4 py-2 rounded-lg border-2 ${step1Done ? 'bg-green-100 border-green-400' : 'bg-white border-gray-300'}`}>
          {step1Done ? '5 g' : '?'}
        </div>

        <span className="text-2xl text-gray-400">→</span>

        <div className={`px-4 py-2 rounded-lg border-2 ${step2Done ? 'bg-green-100 border-green-400' : 'bg-white border-gray-300'}`}>
          {step2Done ? '0.005 kg' : '?'}
        </div>
      </div>

      {/* Step 1 */}
      {!step1Done && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="font-semibold text-blue-800 mb-3">Skref 1: Breyta mg í g</p>
          <div className="flex justify-center gap-4">
            {step1Factors.map((factor, idx) => (
              <ConversionFactorBlock
                key={idx}
                numeratorValue={factor.num}
                numeratorUnit={factor.numUnit}
                denominatorValue={factor.den}
                denominatorUnit={factor.denUnit}
                onClick={() => handleStep1(idx)}
                isCorrect={selectedStep1 === idx ? factor.correct : null}
              />
            ))}
          </div>
          {selectedStep1 !== null && !step1Factors[selectedStep1].correct && (
            <p className="text-red-600 text-sm mt-2 text-center">mg þarf að vera í nefnara til að strikast út!</p>
          )}
        </div>
      )}

      {/* Step 2 */}
      {step1Done && !step2Done && (
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="font-semibold text-green-800 mb-3">Skref 2: Breyta g í kg</p>
          <div className="flex justify-center gap-4">
            {step2Factors.map((factor, idx) => (
              <ConversionFactorBlock
                key={idx}
                numeratorValue={factor.num}
                numeratorUnit={factor.numUnit}
                denominatorValue={factor.den}
                denominatorUnit={factor.denUnit}
                onClick={() => handleStep2(idx)}
                isCorrect={selectedStep2 === idx ? factor.correct : null}
              />
            ))}
          </div>
          {selectedStep2 !== null && !step2Factors[selectedStep2].correct && (
            <p className="text-red-600 text-sm mt-2 text-center">g þarf að vera í nefnara til að strikast út!</p>
          )}
        </div>
      )}

      {step2Done && (
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <p className="text-green-800 font-semibold">Keðjan virkaði!</p>
          <p className="text-green-700 text-sm">5000 mg → 5 g → 0.005 kg</p>
        </div>
      )}
    </div>
  );
}

/**
 * Challenge 6: Time Equivalence
 */
function TimeEquivalenceChallenge({ onSuccess, onAttempt }: ChallengeComponentProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const options = [
    { value: 60, correct: false },
    { value: 360, correct: false },
    { value: 3600, correct: true },
    { value: 6000, correct: false }
  ];

  const handleSelect = (idx: number) => {
    onAttempt();
    setSelectedAnswer(idx);
    setShowResult(true);

    if (options[idx].correct) {
      setTimeout(() => onSuccess(), 500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4 p-6 bg-gray-50 rounded-xl">
        <UnitBlock value={1} unit="klst" color="blue" size="large" />
        <span className="text-3xl text-gray-400">=</span>
        <span className="text-3xl font-bold text-gray-600">?</span>
        <span className="text-2xl text-gray-600">s</span>
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg text-center">
        <p className="text-yellow-800">Muna: 1 klst = 60 mín, og 1 mín = 60 s</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            disabled={showResult}
            className={`p-6 rounded-xl border-2 font-bold text-2xl transition-all ${
              showResult && selectedAnswer === idx
                ? (option.correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800')
                : 'bg-white border-gray-300 hover:border-orange-400 hover:bg-orange-50'
            }`}
          >
            {option.value} s
          </button>
        ))}
      </div>

      {showResult && selectedAnswer !== null && !options[selectedAnswer].correct && (
        <div className="p-4 bg-red-50 rounded-lg text-center">
          <p className="text-red-800">Ekki rétt. Reiknaðu: 60 mín × 60 s/mín = ?</p>
          <button
            onClick={() => { setSelectedAnswer(null); setShowResult(false); }}
            className="mt-2 text-red-600 underline"
          >
            Reyna aftur
          </button>
        </div>
      )}

      {showResult && selectedAnswer !== null && options[selectedAnswer].correct && (
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <p className="text-green-800 font-semibold">Rétt! 60 × 60 = 3600 s</p>
        </div>
      )}
    </div>
  );
}

export default Level1Conceptual;
