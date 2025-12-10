import { useState, useCallback } from 'react';

// Level 2: Application/Reasoning - "What happens when..." questions
// Students predict outcomes without calculating

interface Scenario {
  id: number;
  title: string;
  setup: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  concept: string;
  visualBefore: {
    molecules: number;
    volumeML: number;
    concentration: number;
  };
  visualAfter: {
    molecules: number;
    volumeML: number;
    concentration: number;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: 'Útþynning með vatni',
    setup: 'Þú ert með 100 mL af 2.0 M NaCl lausn.',
    question: 'Hvað gerist við styrkinn ef þú bætir við 100 mL af vatni?',
    options: [
      { id: 'a', text: 'Styrkurinn tvöfaldast (4.0 M)', isCorrect: false, explanation: 'Nei - að bæta við vatni þynnir lausnina, eykur hana ekki.' },
      { id: 'b', text: 'Styrkurinn helst óbreyttur (2.0 M)', isCorrect: false, explanation: 'Nei - þegar rúmmál eykst en sameindir haldast, lækkar styrkur.' },
      { id: 'c', text: 'Styrkurinn helmingast (1.0 M)', isCorrect: true, explanation: 'Rétt! Tvöfalt rúmmál með sama fjölda sameinda = helmingur styrks.' },
      { id: 'd', text: 'Styrkurinn verður núll (0 M)', isCorrect: false, explanation: 'Nei - sameindir hverfa ekki, þær dreifast bara á stærra rúmmál.' }
    ],
    concept: 'Við útþynningu: sameindir haldast, rúmmál eykst → styrkur minnkar í réttu hlutfalli.',
    visualBefore: { molecules: 40, volumeML: 100, concentration: 2.0 },
    visualAfter: { molecules: 40, volumeML: 200, concentration: 1.0 }
  },
  {
    id: 2,
    title: 'Bæta við leysiefni',
    setup: 'Þú ert með 200 mL af 1.5 M glúkósalausn.',
    question: 'Þú leysir upp meira af glúkósu í lausninni (án þess að breyta rúmmáli). Hvað gerist?',
    options: [
      { id: 'a', text: 'Styrkurinn eykst', isCorrect: true, explanation: 'Rétt! Fleiri sameindir í sama rúmmáli = hærri styrkur.' },
      { id: 'b', text: 'Styrkurinn minnkar', isCorrect: false, explanation: 'Nei - að bæta við sameindum eykur styrk, ekki minnkar.' },
      { id: 'c', text: 'Styrkurinn helst óbreyttur', isCorrect: false, explanation: 'Nei - fleiri sameindir í sama rúmmáli breytir styrknum.' },
      { id: 'd', text: 'Lausnin verður ómöguleg', isCorrect: false, explanation: 'Nei - þú getur bætt við efni að vissu marki (mettunarpunkti).' }
    ],
    concept: 'Styrkur = sameindir/rúmmál. Fleiri sameindir í sama rúmmáli = hærri styrkur.',
    visualBefore: { molecules: 30, volumeML: 200, concentration: 1.5 },
    visualAfter: { molecules: 50, volumeML: 200, concentration: 2.5 }
  },
  {
    id: 3,
    title: 'Blanda tveggja lausna',
    setup: 'Þú blandar 100 mL af 3.0 M lausn við 100 mL af 1.0 M lausn (sama efni).',
    question: 'Hver verður endanlegur styrkur blöndunnar?',
    options: [
      { id: 'a', text: 'Nákvæmlega 2.0 M (meðaltal)', isCorrect: true, explanation: 'Rétt! Þegar rúmmálin eru jöfn er lokastyrkur meðaltal beggja.' },
      { id: 'b', text: 'Nákvæmlega 4.0 M (summa)', isCorrect: false, explanation: 'Nei - styrkur legst ekki saman svona. Sameindir dreifast á heildarrúmmálið.' },
      { id: 'c', text: 'Nákvæmlega 3.0 M (hærri styrkurinn)', isCorrect: false, explanation: 'Nei - veikari lausnin þynnir þá sterkari.' },
      { id: 'd', text: 'Nákvæmlega 1.0 M (lægri styrkurinn)', isCorrect: false, explanation: 'Nei - sterkari lausnin hækkar heildarstyrk.' }
    ],
    concept: 'Við blöndun: heildarsameindir / heildarrúmmál = lokastyrkur. Jöfn rúmmál → meðaltal.',
    visualBefore: { molecules: 30, volumeML: 100, concentration: 3.0 },
    visualAfter: { molecules: 40, volumeML: 200, concentration: 2.0 }
  },
  {
    id: 4,
    title: 'Uppgufun',
    setup: 'Þú hefur 500 mL af 0.5 M saltlausn í opinni skál. Helmingur vatnsins gufar upp.',
    question: 'Hvað gerist við styrkinn?',
    options: [
      { id: 'a', text: 'Styrkurinn helmingast (0.25 M)', isCorrect: false, explanation: 'Nei - minna rúmmál með sama fjölda sameinda = hærri styrkur.' },
      { id: 'b', text: 'Styrkurinn tvöfaldast (1.0 M)', isCorrect: true, explanation: 'Rétt! Helmingur rúmmáls með sama fjölda sameinda = tvöfaldur styrkur.' },
      { id: 'c', text: 'Styrkurinn helst óbreyttur', isCorrect: false, explanation: 'Nei - minna rúmmál þýðir meiri þéttleika sameinda.' },
      { id: 'd', text: 'Saltið gufar líka upp', isCorrect: false, explanation: 'Nei - salt (NaCl) gufar ekki upp við venjulegt hitastig.' }
    ],
    concept: 'Uppgufun er andstæða útþynningar: rúmmál minnkar en sameindir haldast → styrkur eykst.',
    visualBefore: { molecules: 25, volumeML: 500, concentration: 0.5 },
    visualAfter: { molecules: 25, volumeML: 250, concentration: 1.0 }
  },
  {
    id: 5,
    title: 'Þríföld útþynning',
    setup: 'Þú þarft að þynna 6.0 M sýru niður í 2.0 M.',
    question: 'Hversu mikið þarftu að auka rúmmálið?',
    options: [
      { id: 'a', text: 'Tvöfalda rúmmálið', isCorrect: false, explanation: 'Nei - tvöfalt rúmmál gefur 3.0 M (helmingur), ekki 2.0 M.' },
      { id: 'b', text: 'Þrífalda rúmmálið', isCorrect: true, explanation: 'Rétt! 6.0 M ÷ 3 = 2.0 M. Þrefalda rúmmálið = þriðjungur styrks.' },
      { id: 'c', text: 'Sexfalda rúmmálið', isCorrect: false, explanation: 'Nei - það myndi gefa 1.0 M (of þunnt).' },
      { id: 'd', text: 'Bæta við jafn miklu vatni', isCorrect: false, explanation: 'Nei - það tvöfaldar rúmmálið og gefur 3.0 M.' }
    ],
    concept: 'Til að þynna um ákveðið hlutfall þarftu að margfalda rúmmálið um sama hlutfall.',
    visualBefore: { molecules: 60, volumeML: 100, concentration: 6.0 },
    visualAfter: { molecules: 60, volumeML: 300, concentration: 2.0 }
  },
  {
    id: 6,
    title: 'Ósamhverf blöndun',
    setup: 'Þú blandar 300 mL af 2.0 M lausn við 100 mL af 6.0 M lausn.',
    question: 'Verður lokastyrkurinn nær 2.0 M eða 6.0 M?',
    options: [
      { id: 'a', text: 'Nær 2.0 M', isCorrect: true, explanation: 'Rétt! Meira rúmmál af veikari lausninni "dregur" lokastyrk nær henni.' },
      { id: 'b', text: 'Nær 6.0 M', isCorrect: false, explanation: 'Nei - þó sterkari lausnin hafi meiri styrk, þá er hennar rúmmál minna.' },
      { id: 'c', text: 'Nákvæmlega í miðjunni (4.0 M)', isCorrect: false, explanation: 'Nei - miðjugildi á bara við þegar rúmmálin eru jöfn.' },
      { id: 'd', text: 'Engin leið að vita', isCorrect: false, explanation: 'Nei - stærra rúmmálið hefur meiri áhrif á lokastyrk.' }
    ],
    concept: 'Við blöndun: stærra rúmmálið hefur meiri áhrif á lokastyrk (vegið meðaltal).',
    visualBefore: { molecules: 60, volumeML: 300, concentration: 2.0 },
    visualAfter: { molecules: 75, volumeML: 400, concentration: 3.0 }
  }
];

// Visual component showing before/after states
function BeforeAfterVisual({
  before,
  after,
  showAfter
}: {
  before: { molecules: number; volumeML: number; concentration: number };
  after: { molecules: number; volumeML: number; concentration: number };
  showAfter: boolean;
}) {
  const maxVolume = Math.max(before.volumeML, after.volumeML);

  const renderBeaker = (
    data: { molecules: number; volumeML: number; concentration: number },
    label: string,
    opacity: number = 1
  ) => {
    const fillPercent = (data.volumeML / maxVolume) * 80;
    const displayMolecules = Math.min(data.molecules, 50);

    // Beaker boundaries in SVG coordinates (viewBox 0 0 80 120)
    // Beaker inner walls: x=11 to x=69, liquid bottom at y=98
    const beakerLeft = 13;
    const beakerRight = 67;
    const beakerBottom = 98;
    const liquidTop = 100 - fillPercent + 2;
    const availableLiquidHeight = Math.max(5, beakerBottom - liquidTop);
    const liquidWidth = beakerRight - beakerLeft;

    // Calculate grid layout for even distribution
    const moleculeRadius = 1.5;
    const cols = Math.max(1, Math.floor(liquidWidth / Math.max(moleculeRadius * 3, Math.min(7, Math.sqrt((liquidWidth * availableLiquidHeight) / displayMolecules)))));
    const rows = Math.max(1, Math.ceil(displayMolecules / cols));

    const xSpacing = liquidWidth / (cols + 1);
    const ySpacing = availableLiquidHeight / (rows + 1);

    return (
      <div className="text-center" style={{ opacity }}>
        <div className="text-sm font-semibold mb-2 text-gray-700">{label}</div>
        <svg viewBox="0 0 80 120" className="w-24 h-32 mx-auto">
          {/* Beaker */}
          <path
            d="M10 10 L10 100 Q10 110 20 110 L60 110 Q70 110 70 100 L70 10"
            fill="none"
            stroke="#374151"
            strokeWidth="2"
          />
          {/* Solution fill */}
          <rect
            x="11"
            y={100 - fillPercent}
            width="58"
            height={fillPercent}
            fill="#3b82f6"
            opacity={Math.min(0.3 + data.concentration * 0.1, 0.8)}
            className="transition-all duration-500"
          />
          {/* Molecules - distributed evenly throughout liquid */}
          {Array.from({ length: displayMolecules }).map((_, i) => {
            const row = Math.floor(i / cols);
            const col = i % cols;

            // Deterministic jitter for natural look
            const jitterX = ((i * 7) % 5 - 2) * 0.4;
            const jitterY = ((i * 11) % 5 - 2) * 0.4;

            const x = beakerLeft + xSpacing * (col + 1) + jitterX;
            const y = liquidTop + ySpacing * (row + 1) + jitterY;

            // Clamp to stay within liquid boundaries
            const clampedX = Math.max(beakerLeft + moleculeRadius, Math.min(beakerRight - moleculeRadius, x));
            const clampedY = Math.max(liquidTop + moleculeRadius, Math.min(beakerBottom - moleculeRadius, y));

            return (
              <circle
                key={i}
                cx={clampedX}
                cy={clampedY}
                r={moleculeRadius}
                fill="#1d4ed8"
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        <div className="text-xs text-gray-600 mt-1">
          <div>{data.volumeML} mL</div>
          <div className="font-bold text-blue-600">{data.concentration.toFixed(1)} M</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center gap-4 my-4">
      {renderBeaker(before, 'Fyrir', 1)}
      <div className="text-2xl text-gray-400">→</div>
      {renderBeaker(after, 'Eftir', showAfter ? 1 : 0.3)}
    </div>
  );
}

interface Level2Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export function Level2({ onComplete, onBack }: Level2Props) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);

  const scenario = SCENARIOS[currentScenario];
  const selectedOption = scenario.options.find(o => o.id === selectedAnswer);
  const isCorrect = selectedOption?.isCorrect ?? false;

  const handleSubmit = useCallback(() => {
    if (!selectedAnswer) return;

    setShowResult(true);
    if (isCorrect) {
      setScore(prev => prev + 100);
      setCompleted(prev => [...prev, scenario.id]);
    }
  }, [selectedAnswer, isCorrect, scenario.id]);

  const handleNext = useCallback(() => {
    if (currentScenario < SCENARIOS.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onComplete(score + (isCorrect ? 100 : 0));
    }
  }, [currentScenario, score, isCorrect, onComplete]);

  const allComplete = currentScenario === SCENARIOS.length - 1 && showResult;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-green-600">
                Lausnir - Stigur 2
              </h1>
              <p className="text-sm text-gray-600">Spáðu fyrir um breytingar - ENGIN útreikningar!</p>
            </div>

            <div className="flex gap-4 items-center">
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                ← Til baka
              </button>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{score}</div>
                <div className="text-xs text-gray-600">Stig</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">
                  {completed.length}/{SCENARIOS.length}
                </div>
                <div className="text-xs text-gray-600">Rétt</div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentScenario + (showResult ? 1 : 0)) / SCENARIOS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Scenario card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="mb-6">
            <div className="inline-block bg-green-100 px-4 py-2 rounded-full text-sm font-semibold text-green-800 mb-2">
              Atburðarás {currentScenario + 1}: {scenario.title}
            </div>

            {/* Setup */}
            <div className="bg-gray-50 p-4 rounded-xl mb-4">
              <p className="text-lg text-gray-800">{scenario.setup}</p>
            </div>

            {/* Visual representation */}
            <BeforeAfterVisual
              before={scenario.visualBefore}
              after={scenario.visualAfter}
              showAfter={showResult}
            />

            {/* Question */}
            <div className="text-xl font-semibold text-gray-800 mb-4">
              {scenario.question}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {scenario.options.map((option) => {
              let bgColor = 'bg-white hover:bg-gray-50';
              let borderColor = 'border-gray-200';
              let textColor = 'text-gray-800';

              if (selectedAnswer === option.id && !showResult) {
                bgColor = 'bg-green-50';
                borderColor = 'border-green-500';
              }

              if (showResult) {
                if (option.isCorrect) {
                  bgColor = 'bg-green-100';
                  borderColor = 'border-green-500';
                  textColor = 'text-green-800';
                } else if (selectedAnswer === option.id) {
                  bgColor = 'bg-red-100';
                  borderColor = 'border-red-500';
                  textColor = 'text-red-800';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => !showResult && setSelectedAnswer(option.id)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${bgColor} ${borderColor} ${textColor} ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-lg">{option.id.toUpperCase()}.</span>
                    <span className="flex-1">{option.text}</span>
                  </div>
                  {showResult && (
                    <div className={`mt-2 text-sm ${option.isCorrect ? 'text-green-700' : 'text-gray-600'}`}>
                      {option.explanation}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Result and concept */}
          {showResult && (
            <div className={`p-4 rounded-xl mb-6 ${isCorrect ? 'bg-green-50 border-2 border-green-400' : 'bg-yellow-50 border-2 border-yellow-400'}`}>
              <div className="text-xl font-bold mb-2">
                {isCorrect ? '✓ Rétt!' : '✗ Ekki alveg rétt'}
              </div>
              <div className="text-gray-700">
                <strong>Lykilhugtak:</strong> {scenario.concept}
              </div>
            </div>
          )}

          {/* Action button */}
          <div className="flex justify-center">
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className={`px-8 py-3 rounded-xl font-bold transition-colors ${
                  selectedAnswer
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Staðfesta svar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 rounded-xl font-bold bg-green-500 hover:bg-green-600 text-white transition-colors"
              >
                {allComplete ? 'Ljúka Stigi 2 →' : 'Næsta spurning →'}
              </button>
            )}
          </div>
        </div>

        {/* Scenario navigation */}
        <div className="mt-6 flex justify-center gap-2">
          {SCENARIOS.map((s, i) => (
            <div
              key={s.id}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                completed.includes(s.id)
                  ? 'bg-green-500 text-white'
                  : i === currentScenario
                  ? 'bg-green-200 text-green-800 border-2 border-green-500'
                  : i < currentScenario
                  ? 'bg-red-200 text-red-800'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {completed.includes(s.id) ? '✓' : i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Level2;
