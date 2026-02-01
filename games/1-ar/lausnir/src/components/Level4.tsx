import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  SATURATION_PROBLEMS,
  SaturationProblem,
  getSolubilityAtTemp,
  getSaturationState,
  SaturationCompound,
} from '../data/saturation';

interface Level4Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

interface Crystal {
  id: number;
  x: number;
  size: number;
  falling: boolean;
  settled: boolean;
}

// Saturation Beaker Visualization Component
function SaturationBeaker({
  compound,
  temperature,
  dissolved,
  saturationLimit,
  showCrystals,
}: {
  compound: SaturationCompound;
  temperature: number;
  dissolved: number;
  saturationLimit: number;
  showCrystals: boolean;
}) {
  const [crystals, setCrystals] = useState<Crystal[]>([]);
  const [particles, setParticles] = useState<{ x: number; y: number }[]>([]);

  const excessAmount = Math.max(0, dissolved - saturationLimit);
  const saturationState = getSaturationState(dissolved, saturationLimit);

  // Generate dissolved particles
  useEffect(() => {
    const dissolvedAmount = Math.min(dissolved, saturationLimit);
    const particleCount = Math.min(30, Math.floor((dissolvedAmount / saturationLimit) * 30));
    setParticles(
      Array.from({ length: particleCount }).map(() => ({
        x: 15 + Math.random() * 50,
        y: 25 + Math.random() * 45,
      }))
    );
  }, [dissolved, saturationLimit]);

  // Generate crystals for excess
  useEffect(() => {
    if (showCrystals && excessAmount > 0) {
      const crystalCount = Math.min(10, Math.ceil(excessAmount / (saturationLimit * 0.1)));
      setCrystals(
        Array.from({ length: crystalCount }).map((_, i) => ({
          id: i,
          x: 20 + Math.random() * 40,
          size: 3 + Math.random() * 4,
          falling: true,
          settled: false,
        }))
      );

      // Animate crystals falling
      const timer = setTimeout(() => {
        setCrystals(prev =>
          prev.map(c => ({ ...c, falling: false, settled: true }))
        );
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setCrystals([]);
    }
  }, [showCrystals, excessAmount, saturationLimit]);

  // Parse hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const waterColor = hexToRgba(compound.color, 0.15 + Math.min(dissolved / saturationLimit, 1) * 0.35);

  return (
    <div className="text-center">
      <svg viewBox="0 0 80 110" className="w-32 h-44 mx-auto">
        {/* Beaker outline */}
        <path
          d="M10 15 L10 90 Q10 100 20 100 L60 100 Q70 100 70 90 L70 15"
          fill="none"
          stroke="#374151"
          strokeWidth="2.5"
        />

        {/* Beaker neck */}
        <path
          d="M5 15 L10 15 M70 15 L75 15"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
        />

        {/* Water */}
        <rect
          x="11"
          y="30"
          width="58"
          height="70"
          fill={waterColor}
          className="transition-all duration-500"
        />

        {/* Dissolved particles */}
        {particles.map((p, i) => (
          <circle
            key={`particle-${i}`}
            cx={p.x}
            cy={p.y}
            r="2"
            fill={compound.color}
            opacity="0.6"
            className="animate-pulse"
          >
            <animate
              attributeName="cy"
              values={`${p.y};${p.y + 3};${p.y}`}
              dur={`${2 + Math.random()}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Falling/Settled crystals */}
        {crystals.map(crystal => (
          <g key={crystal.id}>
            {/* Crystal shape - hexagonal */}
            <polygon
              points={`${crystal.x},${crystal.falling ? 40 : 92 - crystal.size}
                       ${crystal.x + crystal.size},${crystal.falling ? 43 : 95 - crystal.size}
                       ${crystal.x + crystal.size},${crystal.falling ? 47 : 99 - crystal.size}
                       ${crystal.x},${crystal.falling ? 50 : 102 - crystal.size}
                       ${crystal.x - crystal.size},${crystal.falling ? 47 : 99 - crystal.size}
                       ${crystal.x - crystal.size},${crystal.falling ? 43 : 95 - crystal.size}`}
              fill={compound.color}
              stroke={compound.color}
              strokeWidth="1"
              opacity={crystal.settled ? 1 : 0.7}
              className="transition-all duration-700"
            />
          </g>
        ))}

        {/* Sediment layer for large excess */}
        {showCrystals && excessAmount > saturationLimit * 0.2 && (
          <ellipse
            cx="40"
            cy="96"
            rx={Math.min(25, 10 + (excessAmount / saturationLimit) * 15)}
            ry={Math.min(6, 2 + (excessAmount / saturationLimit) * 4)}
            fill={compound.color}
            opacity="0.9"
          />
        )}

        {/* Temperature thermometer */}
        <rect x="72" y="20" width="6" height="70" fill="#e5e7eb" rx="3" />
        <rect
          x="72"
          y={90 - (temperature / 100) * 70}
          width="6"
          height={(temperature / 100) * 70}
          fill={temperature > 60 ? '#ef4444' : temperature > 30 ? '#f59e0b' : '#3b82f6'}
          rx="3"
          className="transition-all duration-500"
        />
        <circle cx="75" cy="93" r="5" fill="#ef4444" />

        {/* Temperature label */}
        <text x="75" y="15" textAnchor="middle" className="text-xs fill-gray-600 font-bold">
          {temperature}°C
        </text>
      </svg>

      {/* Status indicator */}
      <div className="mt-2 text-center">
        <div className="text-lg mb-1">{compound.emoji} {compound.formula}</div>
        <div className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${
          saturationState === 'unsaturated' ? 'bg-green-100 text-green-700' :
          saturationState === 'saturated' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {saturationState === 'unsaturated' ? 'Omettut' :
           saturationState === 'saturated' ? 'Mettut' : 'Ofmettut'}
        </div>
        <div className="text-xs text-gray-600 mt-1">
          {dissolved.toFixed(1)}g / {saturationLimit.toFixed(1)}g
        </div>
      </div>
    </div>
  );
}

// Solubility curve mini-chart
function SolubilityCurve({
  compound,
  currentTemp,
  showMarker = true,
}: {
  compound: SaturationCompound;
  currentTemp: number;
  showMarker?: boolean;
}) {
  const temps = [0, 20, 40, 60, 80, 100];
  const maxSol = Math.max(...compound.solubility) * 1.1;

  const width = 200;
  const height = 100;
  const padding = { top: 10, right: 20, bottom: 25, left: 35 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const xScale = (t: number) => padding.left + (t / 100) * graphWidth;
  const yScale = (s: number) => padding.top + graphHeight - (s / maxSol) * graphHeight;

  const pathData = temps.map((t, i) =>
    `${i === 0 ? 'M' : 'L'} ${xScale(t)},${yScale(compound.solubility[i])}`
  ).join(' ');

  const currentSol = getSolubilityAtTemp(compound, currentTemp);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-xs mx-auto">
      {/* Grid */}
      {[0, 50, 100].map(t => (
        <line key={t} x1={xScale(t)} y1={padding.top} x2={xScale(t)} y2={height - padding.bottom} stroke="#e5e7eb" />
      ))}

      {/* Axes */}
      <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="#374151" strokeWidth="1.5" />
      <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="#374151" strokeWidth="1.5" />

      {/* Curve */}
      <path d={pathData} fill="none" stroke={compound.color} strokeWidth="2.5" />

      {/* Current position marker */}
      {showMarker && (
        <>
          <line x1={xScale(currentTemp)} y1={padding.top} x2={xScale(currentTemp)} y2={height - padding.bottom} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx={xScale(currentTemp)} cy={yScale(currentSol)} r="5" fill="#ef4444" stroke="white" strokeWidth="2" />
        </>
      )}

      {/* Labels */}
      <text x={width / 2} y={height - 5} textAnchor="middle" className="text-xs fill-gray-600">Hitastig (°C)</text>
      <text x={10} y={height / 2} textAnchor="middle" transform={`rotate(-90, 10, ${height / 2})`} className="text-xs fill-gray-600">g/100g</text>

      {/* Temperature labels */}
      {[0, 50, 100].map(t => (
        <text key={t} x={xScale(t)} y={height - padding.bottom + 15} textAnchor="middle" className="text-xs fill-gray-500">{t}</text>
      ))}
    </svg>
  );
}

export function Level4({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level4Props) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);
  const [simulationTemp, setSimulationTemp] = useState(20);
  const [simulationDissolved, setSimulationDissolved] = useState(0);

  // Shuffle problems for variety
  const problems = useMemo(() => {
    const shuffled = [...SATURATION_PROBLEMS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 8); // 8 problems per session
  }, []);

  const currentProblem = problems[currentProblemIndex];
  const isLastProblem = currentProblemIndex >= problems.length - 1;
  const maxScore = problems.length * 100;

  // Initialize simulation with problem values
  useEffect(() => {
    if (currentProblem) {
      setSimulationTemp(currentProblem.initialTemp);
      setSimulationDissolved(currentProblem.initialDissolved);
      setShowSimulation(false);
    }
  }, [currentProblem]);

  const saturationLimit = useMemo(() => {
    if (!currentProblem) return 0;
    return getSolubilityAtTemp(currentProblem.compound, simulationTemp);
  }, [currentProblem, simulationTemp]);

  const handleAnswer = useCallback((answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    const correct = answer === currentProblem.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    setShowSimulation(true);

    // Update simulation to show result
    if (currentProblem.targetTemp !== undefined) {
      setSimulationTemp(currentProblem.targetTemp);
    }
    if (currentProblem.targetAdd !== undefined) {
      setSimulationDissolved(currentProblem.initialDissolved + currentProblem.targetAdd);
    }

    if (correct) {
      const points = showHint ? 50 : 100;
      setScore(prev => prev + points);
      onCorrectAnswer();
    } else {
      onIncorrectAnswer();
    }
  }, [showResult, currentProblem, showHint, onCorrectAnswer, onIncorrectAnswer]);

  const handleNext = () => {
    if (isLastProblem) {
      onComplete(score, maxScore, hintsUsed);
    } else {
      setCurrentProblemIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
      setShowSimulation(false);
    }
  };

  const handleHint = () => {
    if (!showHint) {
      setHintsUsed(prev => prev + 1);
      setShowHint(true);
    }
  };

  const getAnswerOptions = (problem: SaturationProblem) => {
    if (problem.type === 'add_solute') {
      return [
        { value: 'unsaturated', label: 'Allt leysist upp', labelEn: 'Everything dissolves' },
        { value: 'saturated', label: 'Nákvæmlega mettut', labelEn: 'Exactly saturated' },
        { value: 'supersaturated', label: 'Eitthvað fellur út', labelEn: 'Some precipitates' },
      ];
    } else {
      return [
        { value: 'dissolve_more', label: 'Getur uppleyst meira', labelEn: 'Can dissolve more' },
        { value: 'precipitate', label: 'Kristallar myndast', labelEn: 'Crystals form' },
        { value: 'saturated', label: 'Engin breyting', labelEn: 'No change' },
      ];
    }
  };

  if (!currentProblem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4 md:p-8">
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
              <h1 className="text-xl md:text-2xl font-bold text-cyan-700">
                Stig 4: Mettunarafl
              </h1>
              <p className="text-sm text-gray-600">
                Saturation & Crystallization
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-cyan-600">{score} stig</div>
              <div className="text-xs text-gray-500">
                {currentProblemIndex + 1} / {problems.length}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentProblemIndex) / problems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Visualization */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              {currentProblem.compound.emoji} {currentProblem.compound.name}
            </h2>

            <SaturationBeaker
              compound={currentProblem.compound}
              temperature={simulationTemp}
              dissolved={simulationDissolved}
              saturationLimit={saturationLimit}
              showCrystals={showSimulation}
            />

            <div className="mt-4">
              <SolubilityCurve
                compound={currentProblem.compound}
                currentTemp={simulationTemp}
              />
            </div>

            {/* Saturation info */}
            <div className="mt-4 bg-gray-50 rounded-xl p-3 text-sm">
              <div className="flex justify-between mb-1">
                <span>Hitastig:</span>
                <span className="font-bold">{simulationTemp}°C</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Leysanleiki:</span>
                <span className="font-bold">{saturationLimit.toFixed(1)} g/100g H₂O</span>
              </div>
              <div className="flex justify-between">
                <span>Uppleyst:</span>
                <span className="font-bold">{simulationDissolved.toFixed(1)} g</span>
              </div>
            </div>
          </div>

          {/* Question & Answers */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${
              currentProblem.difficulty === 'easy' ? 'bg-green-50' :
              currentProblem.difficulty === 'medium' ? 'bg-yellow-50' : 'bg-red-50'
            }`}>
              <div className="text-xs text-gray-500 mb-1">
                {currentProblem.difficulty === 'easy' ? 'Auðvelt' :
                 currentProblem.difficulty === 'medium' ? 'Miðlungs' : 'Erfitt'}
              </div>
              <p className="text-lg font-medium text-gray-800">
                {currentProblem.question}
              </p>
            </div>

            {/* Initial conditions */}
            <div className="bg-blue-50 rounded-xl p-3 mb-4 text-sm">
              <div className="font-semibold text-blue-800 mb-1">Upphafsaðstæður:</div>
              <div>Hitastig: {currentProblem.initialTemp}°C</div>
              <div>Uppleyst: {currentProblem.initialDissolved}g / 100g H₂O</div>
              <div>Leysanleiki: {getSolubilityAtTemp(currentProblem.compound, currentProblem.initialTemp).toFixed(1)}g</div>
            </div>

            {/* Answer options */}
            <div className="space-y-3 mb-4">
              {getAnswerOptions(currentProblem).map(option => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    showResult
                      ? option.value === currentProblem.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : selectedAnswer === option.value
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 opacity-50'
                      : selectedAnswer === option.value
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 hover:border-cyan-300 hover:bg-cyan-50'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.labelEn}</div>
                </button>
              ))}
            </div>

            {/* Hint button */}
            {!showResult && !showHint && (
              <button
                onClick={handleHint}
                className="text-sm text-cyan-600 hover:text-cyan-700 mb-4"
              >
                Syna visbendingu (-50 stig)
              </button>
            )}

            {/* Hint display */}
            {showHint && !showResult && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm">
                <span className="font-semibold">Visbending:</span>{' '}
                {currentProblem.type === 'change_temp' && currentProblem.targetTemp !== undefined && (
                  <>Við {currentProblem.targetTemp}°C er leysanleiki {getSolubilityAtTemp(currentProblem.compound, currentProblem.targetTemp).toFixed(1)}g</>
                )}
                {currentProblem.type === 'add_solute' && currentProblem.targetAdd !== undefined && (
                  <>Samtals eftir: {currentProblem.initialDissolved + currentProblem.targetAdd}g. Leysanleiki: {getSolubilityAtTemp(currentProblem.compound, currentProblem.initialTemp).toFixed(1)}g</>
                )}
                {currentProblem.type === 'predict' && (
                  <>Berdou uppleyst magn vid leysanleika vid nyja hitastiginu.</>
                )}
              </div>
            )}

            {/* Result display */}
            {showResult && (
              <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Rett!' : 'Rangt'}
                  {isCorrect && <span className="ml-2">+{showHint ? 50 : 100} stig</span>}
                </div>
                <p className="text-gray-700 text-sm">{currentProblem.explanation}</p>
              </div>
            )}

            {/* Next button */}
            {showResult && (
              <button
                onClick={handleNext}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl transition-colors"
              >
                {isLastProblem ? 'Ljuka stigi' : 'Næsta spurning'}
              </button>
            )}
          </div>
        </div>

        {/* Info panel */}
        <div className="mt-6 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="font-bold text-gray-700 mb-3">Lykilhugtök / Key Concepts</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-green-50 p-3 rounded-xl">
              <div className="font-semibold text-green-700">Omettut lausn</div>
              <div className="text-gray-600">Getur uppleyst meira efni</div>
              <div className="text-xs text-gray-500 mt-1">Unsaturated: Can dissolve more</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-xl">
              <div className="font-semibold text-yellow-700">Mettud lausn</div>
              <div className="text-gray-600">Vid leysanleikamork</div>
              <div className="text-xs text-gray-500 mt-1">Saturated: At solubility limit</div>
            </div>
            <div className="bg-red-50 p-3 rounded-xl">
              <div className="font-semibold text-red-700">Ofmettud lausn</div>
              <div className="text-gray-600">Umfram leysanleika - kristallar myndast</div>
              <div className="text-xs text-gray-500 mt-1">Supersaturated: Crystals form</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
