import { useState, useMemo, useCallback } from 'react';
import {
  Electrolyte,
  ElectrolyteType,
  getElectrolytesForGame,
  getConductivityLevel,
} from '../data/electrolytes';

interface Level5Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

type GamePhase = 'learn' | 'play' | 'results';

// Conductivity Tester Visualization
function ConductivityTester({
  conductivity,
  substance,
  showResult,
}: {
  conductivity: 'bright' | 'dim' | 'off';
  substance: Electrolyte | null;
  showResult: boolean;
}) {
  const bulbColor = showResult
    ? conductivity === 'bright'
      ? '#fbbf24' // yellow
      : conductivity === 'dim'
      ? '#fde68a' // pale yellow
      : '#374151' // dark gray
    : '#374151';

  const glowOpacity = showResult
    ? conductivity === 'bright'
      ? 0.6
      : conductivity === 'dim'
      ? 0.3
      : 0
    : 0;

  return (
    <div className="relative">
      <svg viewBox="0 0 200 220" className="w-full max-w-xs mx-auto">
        {/* Battery */}
        <rect x="10" y="30" width="30" height="60" fill="#374151" rx="3" />
        <rect x="17" y="20" width="16" height="15" fill="#6b7280" rx="2" />
        <text x="25" y="65" textAnchor="middle" className="text-xs fill-white font-bold">+</text>
        <text x="25" y="80" textAnchor="middle" className="text-xs fill-white font-bold">−</text>

        {/* Wires */}
        <path
          d="M40 45 L70 45 L70 100"
          fill="none"
          stroke="#374151"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M40 75 L55 75 L55 120 L80 120 L80 180"
          fill="none"
          stroke="#374151"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Wire to bulb */}
        <path
          d="M70 100 L100 100 L100 80"
          fill="none"
          stroke="#374151"
          strokeWidth="3"
        />

        {/* Light bulb */}
        <ellipse
          cx="100"
          cy="50"
          rx="20"
          ry="25"
          fill={bulbColor}
          stroke="#374151"
          strokeWidth="2"
          className="transition-all duration-500"
        />
        {/* Bulb glow */}
        <ellipse
          cx="100"
          cy="50"
          rx="30"
          ry="35"
          fill="yellow"
          opacity={glowOpacity}
          className="transition-all duration-500"
        />
        {/* Bulb base */}
        <rect x="90" y="72" width="20" height="10" fill="#6b7280" />

        {/* Wire from bulb to other electrode */}
        <path
          d="M100 82 L100 100 L130 100 L130 180"
          fill="none"
          stroke="#374151"
          strokeWidth="3"
        />

        {/* Beaker */}
        <path
          d="M60 150 L60 210 Q60 220 70 220 L140 220 Q150 220 150 210 L150 150"
          fill="none"
          stroke="#374151"
          strokeWidth="3"
        />

        {/* Solution */}
        <rect
          x="61"
          y="160"
          width="88"
          height="58"
          fill={substance ? '#93c5fd' : '#e5e7eb'}
          opacity="0.5"
        />

        {/* Electrodes in solution */}
        <rect x="75" y="145" width="8" height="60" fill="#6b7280" rx="1" />
        <rect x="127" y="145" width="8" height="60" fill="#6b7280" rx="1" />

        {/* Ion animation when conducting */}
        {showResult && conductivity !== 'off' && (
          <>
            <circle cx="95" cy="180" r="4" fill="#3b82f6" opacity="0.8">
              <animate
                attributeName="cx"
                values="85;125"
                dur={conductivity === 'bright' ? '1s' : '2s'}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="115" cy="190" r="4" fill="#ef4444" opacity="0.8">
              <animate
                attributeName="cx"
                values="125;85"
                dur={conductivity === 'bright' ? '1s' : '2s'}
                repeatCount="indefinite"
              />
            </circle>
            {conductivity === 'bright' && (
              <>
                <circle cx="100" cy="175" r="3" fill="#3b82f6" opacity="0.6">
                  <animate
                    attributeName="cx"
                    values="85;125"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="110" cy="195" r="3" fill="#ef4444" opacity="0.6">
                  <animate
                    attributeName="cx"
                    values="125;85"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            )}
          </>
        )}

        {/* Labels */}
        <text x="100" y="15" textAnchor="middle" className="text-sm fill-gray-600 font-semibold">
          Peruljós
        </text>
      </svg>

      {/* Status indicator */}
      {showResult && (
        <div className="text-center mt-2">
          <div
            className={`inline-block px-4 py-2 rounded-full font-bold ${
              conductivity === 'bright'
                ? 'bg-yellow-100 text-yellow-800'
                : conductivity === 'dim'
                ? 'bg-yellow-50 text-yellow-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {conductivity === 'bright'
              ? 'Bjart ljós - Sterkur rafleiðari'
              : conductivity === 'dim'
              ? 'Daufur ljós - Veikur rafleiðari'
              : 'Ekkert ljós - Ekki rafleiðari'}
          </div>
        </div>
      )}
    </div>
  );
}

// Classification drop zones
function ClassificationZone({
  type,
  items,
  isActive,
  onDrop,
}: {
  type: ElectrolyteType;
  items: Electrolyte[];
  isActive: boolean;
  onDrop: (type: ElectrolyteType) => void;
}) {
  const config = {
    strong: {
      title: 'Sterkir rafleiðarar',
      titleEn: 'Strong electrolytes',
      color: 'bg-green-50 border-green-400',
      activeColor: 'bg-green-100 border-green-500',
      textColor: 'text-green-800',
      icon: '💡',
    },
    weak: {
      title: 'Veikir rafleiðarar',
      titleEn: 'Weak electrolytes',
      color: 'bg-yellow-50 border-yellow-400',
      activeColor: 'bg-yellow-100 border-yellow-500',
      textColor: 'text-yellow-800',
      icon: '🔅',
    },
    non: {
      title: 'Ekki rafleiðarar',
      titleEn: 'Non-electrolytes',
      color: 'bg-gray-50 border-gray-400',
      activeColor: 'bg-gray-100 border-gray-500',
      textColor: 'text-gray-800',
      icon: '⚫',
    },
  };

  const c = config[type];

  return (
    <button
      onClick={() => onDrop(type)}
      className={`p-4 rounded-xl border-3 transition-all min-h-[140px] w-full ${
        isActive ? c.activeColor : c.color
      } ${isActive ? 'ring-2 ring-offset-2 ring-blue-400 scale-105' : ''}`}
    >
      <div className="text-center mb-2">
        <span className="text-2xl">{c.icon}</span>
        <div className={`font-bold ${c.textColor}`}>{c.title}</div>
        <div className="text-xs text-gray-500">{c.titleEn}</div>
      </div>
      <div className="flex flex-wrap gap-1 justify-center">
        {items.map((item) => (
          <span
            key={item.id}
            className={`text-xs px-2 py-1 rounded ${c.color} ${c.textColor}`}
          >
            {item.formula}
          </span>
        ))}
      </div>
    </button>
  );
}

// Learn phase content
function LearnPhase({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);

  const lessons = [
    {
      title: 'Hvað eru rafleiðarar?',
      titleEn: 'What are electrolytes?',
      content: 'Rafleiðari (electrolyte) er efni sem myndar jónir þegar það leysist í vatni. Jónirnar geta borið rafstraum í gegnum lausnina.',
      contentEn: 'An electrolyte is a substance that forms ions when dissolved in water. These ions can carry electric current through the solution.',
      visual: (
        <div className="bg-blue-50 p-4 rounded-xl text-center">
          <div className="text-4xl mb-2">💧 → ⚡</div>
          <div className="text-sm">Efni leysist → Jónir myndast → Straumur flæðir</div>
        </div>
      ),
    },
    {
      title: 'Sterkir rafleiðarar',
      titleEn: 'Strong electrolytes',
      content: 'Sterkir rafleiðarar sundurgreinast 100% í jónir. Þetta eru sterkar sýrur (HCl, HNO₃, H₂SO₄), sterkar basur (NaOH, KOH) og leysanleg sölt (NaCl, KCl).',
      contentEn: 'Strong electrolytes completely (100%) dissociate into ions. These include strong acids, strong bases, and soluble salts.',
      visual: (
        <div className="bg-green-50 p-4 rounded-xl">
          <div className="text-center mb-2">
            <span className="text-3xl">💡</span>
            <div className="font-bold text-green-700">Bjart ljós!</div>
          </div>
          <div className="font-mono text-sm text-center">
            NaCl → Na⁺ + Cl⁻ (100%)
          </div>
        </div>
      ),
    },
    {
      title: 'Veikir rafleiðarar',
      titleEn: 'Weak electrolytes',
      content: 'Veikir rafleiðarar sundurgreinast aðeins að hluta (~1-5%). Þetta eru veikar sýrur (CH₃COOH, HF) og veikar basur (NH₃). Jafnvægi myndast.',
      contentEn: 'Weak electrolytes only partially dissociate (~1-5%). These include weak acids and weak bases. An equilibrium forms.',
      visual: (
        <div className="bg-yellow-50 p-4 rounded-xl">
          <div className="text-center mb-2">
            <span className="text-3xl">🔅</span>
            <div className="font-bold text-yellow-700">Daufur ljós</div>
          </div>
          <div className="font-mono text-sm text-center">
            CH₃COOH ⇌ H⁺ + CH₃COO⁻ (~1%)
          </div>
        </div>
      ),
    },
    {
      title: 'Ekki rafleiðarar',
      titleEn: 'Non-electrolytes',
      content: 'Sum efni mynda engar jónir þegar þau leysast. Sameindirnar haldast saman. Dæmi: sykur (C₆H₁₂O₆), áfengi (C₂H₅OH), vatn (H₂O).',
      contentEn: 'Some substances do not form ions when dissolved. The molecules stay intact. Examples: sugar, alcohol, water.',
      visual: (
        <div className="bg-gray-50 p-4 rounded-xl">
          <div className="text-center mb-2">
            <span className="text-3xl">⚫</span>
            <div className="font-bold text-gray-700">Ekkert ljós</div>
          </div>
          <div className="font-mono text-sm text-center">
            C₆H₁₂O₆ → C₆H₁₂O₆ (engar jónir)
          </div>
        </div>
      ),
    },
    {
      title: 'Hvernig munum við?',
      titleEn: 'How do we remember?',
      content: 'Sterkar sýrur: HCl, HNO₃, H₂SO₄, HBr, HI, HClO₄. Sterkar basur: NaOH, KOH, Ca(OH)₂, Ba(OH)₂. Öll leysanleg sölt eru sterkir rafleiðarar!',
      contentEn: 'Strong acids: HCl, HNO₃, H₂SO₄, HBr, HI, HClO₄. Strong bases: NaOH, KOH, Ca(OH)₂, Ba(OH)₂. All soluble salts are strong electrolytes!',
      visual: (
        <div className="bg-purple-50 p-4 rounded-xl">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-green-100 p-2 rounded">
              <div className="font-bold">Sterkar sýrur</div>
              HCl, HNO₃, H₂SO₄
            </div>
            <div className="bg-green-100 p-2 rounded">
              <div className="font-bold">Sterkar basur</div>
              NaOH, KOH
            </div>
            <div className="bg-green-100 p-2 rounded">
              <div className="font-bold">Sölt</div>
              NaCl, KNO₃
            </div>
          </div>
        </div>
      ),
    },
  ];

  const lesson = lessons[step];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            {step + 1} / {lessons.length}
          </div>
          <div className="flex gap-1">
            {lessons.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === step
                    ? 'bg-amber-500'
                    : i < step
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-amber-700 mb-1">{lesson.title}</h2>
        <h3 className="text-sm text-gray-500 mb-4">{lesson.titleEn}</h3>

        <p className="text-gray-700 mb-4">{lesson.content}</p>
        <p className="text-sm text-gray-500 mb-4">{lesson.contentEn}</p>

        {lesson.visual}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            ← Til baka
          </button>
          {step < lessons.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg"
            >
              Næst →
            </button>
          ) : (
            <button
              onClick={onContinue}
              className="px-6 py-2 bg-green-500 text-white rounded-lg font-bold"
            >
              Hefja leik!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function Level5({
  onComplete,
  onBack,
  onCorrectAnswer,
  onIncorrectAnswer,
}: Level5Props) {
  const [phase, setPhase] = useState<GamePhase>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [_selectedType, setSelectedType] = useState<ElectrolyteType | null>(null);
  const [classified, setClassified] = useState<{
    strong: Electrolyte[];
    weak: Electrolyte[];
    non: Electrolyte[];
  }>({ strong: [], weak: [], non: [] });

  // Get shuffled electrolytes
  const electrolytes = useMemo(() => getElectrolytesForGame(15), []);

  const currentElectrolyte = electrolytes[currentIndex];
  const isLastQuestion = currentIndex >= electrolytes.length - 1;
  const maxScore = electrolytes.length * 100;

  const handleClassify = useCallback(
    (type: ElectrolyteType) => {
      if (showResult) return;

      setSelectedType(type);
      const correct = type === currentElectrolyte.type;
      setIsCorrect(correct);
      setShowResult(true);

      if (correct) {
        const points = showHint ? 50 : 100;
        setScore((prev) => prev + points);
        onCorrectAnswer();
        setClassified((prev) => ({
          ...prev,
          [type]: [...prev[type], currentElectrolyte],
        }));
      } else {
        onIncorrectAnswer();
        // Add to correct category for feedback
        setClassified((prev) => ({
          ...prev,
          [currentElectrolyte.type]: [...prev[currentElectrolyte.type], currentElectrolyte],
        }));
      }
    },
    [showResult, currentElectrolyte, showHint, onCorrectAnswer, onIncorrectAnswer]
  );

  const handleNext = () => {
    if (isLastQuestion) {
      setPhase('results');
    } else {
      setCurrentIndex((prev) => prev + 1);
      setShowResult(false);
      setShowHint(false);
      setSelectedType(null);
    }
  };

  const handleShowHint = () => {
    if (!showHint) {
      setHintsUsed((prev) => prev + 1);
      setShowHint(true);
    }
  };

  // Learn phase
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
        <div className="flex justify-between items-center mb-6 max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Til baka
          </button>
          <h1 className="text-xl font-bold text-amber-700">
            Stig 5: Rafleiðaraflokkun
          </h1>
          <div />
        </div>
        <LearnPhase onContinue={() => setPhase('play')} />
      </div>
    );
  }

  // Results phase
  if (phase === 'results') {
    const accuracy = Math.round((score / maxScore) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6">
          <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
            Til hamingju!
          </h1>

          <div className="text-center mb-6">
            <div className="text-6xl mb-2">
              {accuracy >= 80 ? '🏆' : accuracy >= 60 ? '⭐' : '💪'}
            </div>
            <div className="text-4xl font-bold text-amber-600">{score} stig</div>
            <div className="text-gray-600">af {maxScore} mögulegum</div>
            <div className="text-2xl font-bold text-blue-600 mt-2">{accuracy}%</div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div className="bg-green-50 p-3 rounded-xl">
              <div className="text-2xl font-bold text-green-600">
                {classified.strong.length}
              </div>
              <div className="text-xs text-gray-600">Sterkir</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-xl">
              <div className="text-2xl font-bold text-yellow-600">
                {classified.weak.length}
              </div>
              <div className="text-xs text-gray-600">Veikir</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <div className="text-2xl font-bold text-gray-600">
                {classified.non.length}
              </div>
              <div className="text-xs text-gray-600">Ekki rafl.</div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl mb-6">
            <h3 className="font-bold text-amber-800 mb-2">Hvað lærðir þú?</h3>
            <ul className="text-sm text-amber-900 space-y-1">
              <li>✓ Sterkar sýrur og basur sundurgreinast 100%</li>
              <li>✓ Veikar sýrur og basur sundurgreinast að hluta</li>
              <li>✓ Sameindaefni (sykur, áfengi) leiða ekki straum</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              Til baka
            </button>
            <button
              onClick={() => onComplete(score, maxScore, hintsUsed)}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              Ljuka Stigi 5
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Play phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <span>←</span> Til baka
            </button>
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-bold text-amber-700">
                Stig 5: Rafleiðaraflokkun
              </h1>
              <p className="text-sm text-gray-600">Electrolyte Classification</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-amber-600">{score} stig</div>
              <div className="text-xs text-gray-500">
                {currentIndex + 1} / {electrolytes.length}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(currentIndex / electrolytes.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Conductivity tester */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Rafleiðnimælir
            </h2>
            <ConductivityTester
              conductivity={getConductivityLevel(currentElectrolyte.type)}
              substance={currentElectrolyte}
              showResult={showResult}
            />
          </div>

          {/* Question and classification */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {/* Current substance */}
            <div className="bg-blue-50 p-4 rounded-xl mb-4 text-center">
              <div className="text-4xl mb-2">{currentElectrolyte.emoji}</div>
              <div className="text-2xl font-bold text-blue-800">
                {currentElectrolyte.formula}
              </div>
              <div className="text-gray-600">{currentElectrolyte.name}</div>
              <div className="text-sm text-gray-500">
                {currentElectrolyte.nameEn}
              </div>
            </div>

            {/* Hint button */}
            {!showResult && !showHint && (
              <button
                onClick={handleShowHint}
                className="text-sm text-amber-600 hover:text-amber-700 mb-4 block mx-auto"
              >
                Syna visbendingu (-50 stig)
              </button>
            )}

            {/* Hint display */}
            {showHint && !showResult && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm">
                <span className="font-semibold">Visbending:</span>{' '}
                {currentElectrolyte.category === 'acid'
                  ? 'Þetta er sýra'
                  : currentElectrolyte.category === 'base'
                  ? 'Þetta er basa'
                  : currentElectrolyte.category === 'salt'
                  ? 'Þetta er salt'
                  : 'Þetta er sameindalegt efni'}
              </div>
            )}

            {/* Classification zones */}
            <div className="space-y-3">
              <ClassificationZone
                type="strong"
                items={classified.strong}
                isActive={!showResult}
                onDrop={handleClassify}
              />
              <ClassificationZone
                type="weak"
                items={classified.weak}
                isActive={!showResult}
                onDrop={handleClassify}
              />
              <ClassificationZone
                type="non"
                items={classified.non}
                isActive={!showResult}
                onDrop={handleClassify}
              />
            </div>

            {/* Result display */}
            {showResult && (
              <div
                className={`mt-4 p-4 rounded-xl ${
                  isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <div
                  className={`font-bold text-lg mb-2 ${
                    isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {isCorrect ? 'Rett!' : 'Rangt'}
                  {isCorrect && (
                    <span className="ml-2">+{showHint ? 50 : 100} stig</span>
                  )}
                </div>
                <p className="text-gray-700 text-sm mb-2">
                  {currentElectrolyte.explanation}
                </p>
                {currentElectrolyte.dissociationEquation && (
                  <div className="font-mono text-sm bg-white p-2 rounded mt-2">
                    {currentElectrolyte.dissociationEquation}
                  </div>
                )}
              </div>
            )}

            {/* Next button */}
            {showResult && (
              <button
                onClick={handleNext}
                className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors"
              >
                {isLastQuestion ? 'Sjá niðurstöður' : 'Næsta efni'}
              </button>
            )}
          </div>
        </div>

        {/* Quick reference */}
        <div className="mt-6 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="font-bold text-gray-700 mb-3">Flýtitilvísun</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-green-50 p-3 rounded-xl">
              <div className="font-semibold text-green-700 mb-1">
                Sterkir rafleiðarar 💡
              </div>
              <ul className="text-gray-600 text-xs space-y-1">
                <li>• Sterkar sýrur: HCl, HNO₃, H₂SO₄</li>
                <li>• Sterkar basur: NaOH, KOH</li>
                <li>• Leysanleg sölt: NaCl, KNO₃</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-3 rounded-xl">
              <div className="font-semibold text-yellow-700 mb-1">
                Veikir rafleiðarar 🔅
              </div>
              <ul className="text-gray-600 text-xs space-y-1">
                <li>• Veikar sýrur: CH₃COOH, HF</li>
                <li>• Veikar basur: NH₃</li>
                <li>• Hluta sundurgreining</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <div className="font-semibold text-gray-700 mb-1">
                Ekki rafleiðarar ⚫
              </div>
              <ul className="text-gray-600 text-xs space-y-1">
                <li>• Sykur: C₆H₁₂O₆</li>
                <li>• Áfengi: C₂H₅OH</li>
                <li>• Engar jónir myndast</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Level5;
