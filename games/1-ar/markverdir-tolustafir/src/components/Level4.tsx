import { useState, useCallback } from 'react';
import {
  INSTRUMENTS,
  MEASUREMENT_PROBLEMS,
  MENISCUS_RULES,
  UNCERTAINTY_RULES,
  MeasurementProblem,
  Instrument,
} from '../data/measurements';

interface Level4Props {
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
}

type Phase = 'learn' | 'quiz';

// Instrument SVG Components
function GraduatedCylinderSVG({
  minValue,
  maxValue,
  readingPosition,
}: {
  minValue: number;
  maxValue: number;
  readingPosition: number;
}) {
  const height = 200;
  const width = 80;
  const scale = height / (maxValue - minValue);
  const liquidHeight = (readingPosition - minValue) * scale;
  const divisions = 10;
  const majorStep = (maxValue - minValue) / divisions;

  return (
    <svg viewBox={`0 0 ${width} ${height + 40}`} className="w-full max-w-[120px] mx-auto">
      {/* Cylinder body */}
      <rect
        x="15"
        y="10"
        width="50"
        height={height}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        rx="3"
        className="text-gray-400"
      />
      {/* Base */}
      <ellipse cx="40" cy={height + 10} rx="25" ry="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400" />

      {/* Liquid */}
      <rect
        x="17"
        y={height + 8 - liquidHeight}
        width="46"
        height={liquidHeight}
        fill="url(#liquidGradient)"
        opacity="0.7"
      />

      {/* Meniscus curve */}
      <path
        d={`M 17 ${height + 8 - liquidHeight} Q 40 ${height + 2 - liquidHeight} 63 ${height + 8 - liquidHeight}`}
        fill="url(#liquidGradient)"
        opacity="0.7"
      />

      {/* Meniscus bottom line indicator */}
      <line
        x1="10"
        y1={height + 8 - liquidHeight}
        x2="70"
        y2={height + 8 - liquidHeight}
        stroke="#ef4444"
        strokeWidth="1"
        strokeDasharray="3,2"
      />

      {/* Scale markings */}
      {Array.from({ length: divisions + 1 }).map((_, i) => {
        const y = height + 8 - (i * majorStep * scale);
        const value = minValue + i * majorStep;
        const isMajor = i % 2 === 0;
        return (
          <g key={i}>
            <line
              x1={isMajor ? "10" : "12"}
              y1={y}
              x2="15"
              y2={y}
              stroke="currentColor"
              strokeWidth={isMajor ? 2 : 1}
              className="text-gray-600"
            />
            {isMajor && (
              <text
                x="5"
                y={y + 4}
                fontSize="8"
                textAnchor="end"
                className="fill-gray-600"
              >
                {value}
              </text>
            )}
          </g>
        );
      })}

      {/* Gradient definition */}
      <defs>
        <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BuretteSVG({
  minValue,
  maxValue,
  readingPosition,
}: {
  minValue: number;
  maxValue: number;
  readingPosition: number;
}) {
  const height = 220;
  const width = 60;
  const scale = height / (maxValue - minValue);
  const liquidTop = (readingPosition - minValue) * scale;
  const divisions = 25;
  const majorStep = (maxValue - minValue) / 5;

  return (
    <svg viewBox={`0 0 ${width} ${height + 30}`} className="w-full max-w-[90px] mx-auto">
      {/* Burette body */}
      <rect
        x="20"
        y="5"
        width="20"
        height={height}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-gray-400"
      />
      {/* Stopcock at bottom */}
      <circle cx="30" cy={height + 15} r="6" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
      <line x1="30" y1={height + 5} x2="30" y2={height + 9} stroke="currentColor" strokeWidth="2" className="text-gray-400" />

      {/* Liquid (from top to reading position) */}
      <rect
        x="22"
        y="7"
        width="16"
        height={liquidTop}
        fill="#3b82f6"
        opacity="0.6"
      />

      {/* Meniscus at bottom of liquid */}
      <path
        d={`M 22 ${7 + liquidTop} Q 30 ${12 + liquidTop} 38 ${7 + liquidTop}`}
        fill="#3b82f6"
        opacity="0.6"
      />

      {/* Reading line */}
      <line
        x1="5"
        y1={7 + liquidTop}
        x2="55"
        y2={7 + liquidTop}
        stroke="#ef4444"
        strokeWidth="1"
        strokeDasharray="3,2"
      />

      {/* Scale markings - burette reads from 0 at top */}
      {Array.from({ length: divisions + 1 }).map((_, i) => {
        const y = 7 + (i * (height / divisions));
        const value = minValue + i * (maxValue - minValue) / divisions;
        const isMajor = value % majorStep === 0;
        const isMinor = value % 1 === 0;
        return (
          <g key={i}>
            <line
              x1="40"
              y1={y}
              x2={isMajor ? "55" : isMinor ? "50" : "45"}
              y2={y}
              stroke="currentColor"
              strokeWidth={isMajor ? 1.5 : 0.5}
              className="text-gray-600"
            />
            {isMajor && (
              <text
                x="58"
                y={y + 3}
                fontSize="7"
                className="fill-gray-600"
              >
                {value}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function RulerSVG({
  minValue,
  maxValue,
  readingPosition,
}: {
  minValue: number;
  maxValue: number;
  readingPosition: number;
}) {
  const width = 240;
  const height = 60;
  const scale = width / (maxValue - minValue);
  const objectPosition = (readingPosition - minValue) * scale;

  return (
    <svg viewBox={`0 0 ${width} ${height + 20}`} className="w-full max-w-[300px] mx-auto">
      {/* Object being measured */}
      <rect
        x="10"
        y="5"
        width={objectPosition}
        height="15"
        fill="#22c55e"
        rx="2"
      />
      <circle cx={10 + objectPosition} cy="12" r="4" fill="#16a34a" />

      {/* Ruler body */}
      <rect
        x="5"
        y="25"
        width={width - 10}
        height="25"
        fill="#fef3c7"
        stroke="currentColor"
        strokeWidth="1"
        className="text-amber-600"
      />

      {/* Scale markings */}
      {Array.from({ length: (maxValue - minValue) * 10 + 1 }).map((_, i) => {
        const x = 10 + (i * scale / 10);
        const value = minValue + i / 10;
        const isCm = i % 10 === 0;
        const is5mm = i % 5 === 0;
        return (
          <g key={i}>
            <line
              x1={x}
              y1="25"
              x2={x}
              y2={isCm ? "40" : is5mm ? "35" : "30"}
              stroke="currentColor"
              strokeWidth={isCm ? 1.5 : 0.5}
              className="text-amber-800"
            />
            {isCm && (
              <text
                x={x}
                y="48"
                fontSize="8"
                textAnchor="middle"
                className="fill-amber-800"
              >
                {value}
              </text>
            )}
          </g>
        );
      })}

      {/* Reading indicator */}
      <line
        x1={10 + objectPosition}
        y1="0"
        x2={10 + objectPosition}
        y2="55"
        stroke="#ef4444"
        strokeWidth="1"
        strokeDasharray="3,2"
      />
    </svg>
  );
}

function ThermometerSVG({
  minValue,
  maxValue,
  readingPosition,
}: {
  minValue: number;
  maxValue: number;
  readingPosition: number;
}) {
  const height = 180;
  const width = 50;
  const scale = (height - 30) / (maxValue - minValue);
  const liquidHeight = (readingPosition - minValue) * scale;

  return (
    <svg viewBox={`0 0 ${width} ${height + 20}`} className="w-full max-w-[80px] mx-auto">
      {/* Thermometer body */}
      <rect
        x="20"
        y="10"
        width="10"
        height={height - 20}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        rx="5"
        className="text-gray-400"
      />
      {/* Bulb */}
      <circle cx="25" cy={height} r="12" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400" />

      {/* Mercury/alcohol column */}
      <rect
        x="22"
        y={height - 10 - liquidHeight}
        width="6"
        height={liquidHeight + 10}
        fill="#ef4444"
        rx="3"
      />
      <circle cx="25" cy={height} r="10" fill="#ef4444" />

      {/* Scale markings */}
      {Array.from({ length: (maxValue - minValue) / 2 + 1 }).map((_, i) => {
        const value = minValue + i * 2;
        const y = height - 10 - ((value - minValue) * scale);
        const isMajor = value % 10 === 0;
        return (
          <g key={i}>
            <line
              x1={isMajor ? "8" : "12"}
              y1={y}
              x2="20"
              y2={y}
              stroke="currentColor"
              strokeWidth={isMajor ? 1.5 : 0.5}
              className="text-gray-600"
            />
            {isMajor && (
              <text
                x="5"
                y={y + 3}
                fontSize="7"
                textAnchor="end"
                className="fill-gray-600"
              >
                {value}°
              </text>
            )}
          </g>
        );
      })}

      {/* Reading indicator */}
      <line
        x1="0"
        y1={height - 10 - liquidHeight}
        x2="50"
        y2={height - 10 - liquidHeight}
        stroke="#3b82f6"
        strokeWidth="1"
        strokeDasharray="3,2"
      />
    </svg>
  );
}

function BalanceDisplaySVG({ reading }: { reading: number }) {
  return (
    <svg viewBox="0 0 160 80" className="w-full max-w-[200px] mx-auto">
      {/* Balance body */}
      <rect
        x="10"
        y="10"
        width="140"
        height="60"
        fill="#1f2937"
        stroke="#374151"
        strokeWidth="2"
        rx="5"
      />
      {/* Display screen */}
      <rect
        x="20"
        y="20"
        width="120"
        height="35"
        fill="#064e3b"
        rx="3"
      />
      {/* Digital reading */}
      <text
        x="80"
        y="45"
        fontSize="20"
        fontFamily="monospace"
        fill="#34d399"
        textAnchor="middle"
      >
        {reading.toFixed(3)} g
      </text>
      {/* Status indicator */}
      <circle cx="130" cy="60" r="4" fill="#22c55e" />
    </svg>
  );
}

function VolumetricFlaskSVG({ volume }: { volume: number }) {
  return (
    <svg viewBox="0 0 80 160" className="w-full max-w-[100px] mx-auto">
      {/* Flask body - round bottom */}
      <ellipse cx="40" cy="120" rx="30" ry="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
      {/* Neck */}
      <rect x="33" y="20" width="14" height="70" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400" />
      {/* Liquid */}
      <ellipse cx="40" cy="120" rx="28" ry="28" fill="#3b82f6" opacity="0.5" />
      <rect x="35" y="50" width="10" height="70" fill="#3b82f6" opacity="0.5" />
      {/* Calibration mark */}
      <line x1="28" y1="50" x2="52" y2="50" stroke="#ef4444" strokeWidth="2" />
      {/* Volume label */}
      <text x="40" y="145" fontSize="10" textAnchor="middle" className="fill-gray-600">
        {volume} mL
      </text>
    </svg>
  );
}

// Render instrument based on type
function InstrumentVisual({ problem }: { problem: MeasurementProblem }) {
  const { svgData } = problem;

  switch (svgData.instrumentType) {
    case 'graduated-cylinder':
      return (
        <GraduatedCylinderSVG
          minValue={svgData.minValue}
          maxValue={svgData.maxValue}
          readingPosition={svgData.readingPosition}
        />
      );
    case 'burette':
      return (
        <BuretteSVG
          minValue={svgData.minValue}
          maxValue={svgData.maxValue}
          readingPosition={svgData.readingPosition}
        />
      );
    case 'ruler':
      return (
        <RulerSVG
          minValue={svgData.minValue}
          maxValue={svgData.maxValue}
          readingPosition={svgData.readingPosition}
        />
      );
    case 'thermometer':
      return (
        <ThermometerSVG
          minValue={svgData.minValue}
          maxValue={svgData.maxValue}
          readingPosition={svgData.readingPosition}
        />
      );
    case 'balance':
      return <BalanceDisplaySVG reading={svgData.readingPosition} />;
    case 'volumetric-flask':
      return <VolumetricFlaskSVG volume={svgData.maxValue} />;
    default:
      return null;
  }
}

export function Level4({ onComplete, onBack }: Level4Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  // Get instrument info
  const getInstrument = (id: string): Instrument | undefined => {
    return INSTRUMENTS.find(i => i.id === id);
  };

  // Quiz items: 10 questions from easy to hard
  const quizItems: MeasurementProblem[] = [
    ...MEASUREMENT_PROBLEMS.filter(p => p.difficulty === 'easy').slice(0, 4),
    ...MEASUREMENT_PROBLEMS.filter(p => p.difficulty === 'medium').slice(0, 4),
    ...MEASUREMENT_PROBLEMS.filter(p => p.difficulty === 'hard').slice(0, 2),
  ];

  const currentItem = quizItems[quizIndex];
  const currentInstrument = currentItem ? getInstrument(currentItem.instrumentId) : undefined;
  const isLastQuestion = quizIndex >= quizItems.length - 1;
  const maxScore = quizItems.length * 100;

  // Normalize and compare answers
  const normalizeAnswer = (answer: string): string => {
    return answer
      .replace(/\s+/g, '')
      .replace(/,/g, '.')
      .toLowerCase();
  };

  const handleSubmit = useCallback(() => {
    if (showResult || !userAnswer.trim()) return;

    const normalized = normalizeAnswer(userAnswer);
    const correctNormalized = normalizeAnswer(currentItem.correctAnswer);

    // Allow numeric comparison with tolerance
    const userNum = parseFloat(normalized);
    const correctNum = parseFloat(correctNormalized);
    const numericMatch = !isNaN(userNum) && !isNaN(correctNum) && Math.abs(userNum - correctNum) < 0.001;

    const correct = normalized === correctNormalized || numericMatch;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const hintPenalty = showHint ? 25 : 0;
      setScore(prev => prev + 100 - hintPenalty);
    }
  }, [showResult, userAnswer, currentItem, showHint]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, maxScore);
    } else {
      setQuizIndex(prev => prev + 1);
      setShowResult(false);
      setUserAnswer('');
      setShowHint(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showResult) {
        handleNext();
      } else {
        handleSubmit();
      }
    }
  };

  // Learning Phase
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <span>←</span> Til baka
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-cyan-700">
                Stig 4: Mælitækjalestur
              </h1>
              <div></div>
            </div>
          </div>

          {/* Instruments Overview */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Mælitæki í rannsóknastofu
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {INSTRUMENTS.map(instrument => (
                <div
                  key={instrument.id}
                  className={`p-4 rounded-xl border-2 ${
                    instrument.type === 'digital'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">
                      {instrument.id === 'graduated-cylinder' ? '🧪' :
                       instrument.id === 'burette' ? '🧫' :
                       instrument.id === 'ruler' ? '📏' :
                       instrument.id === 'thermometer' ? '🌡️' :
                       instrument.id === 'balance' ? '⚖️' : '🧬'}
                    </span>
                    <h3 className="font-bold text-gray-800">{instrument.nameIs}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{instrument.description}</p>
                  <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                    instrument.type === 'digital'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-blue-200 text-blue-800'
                  }`}>
                    {instrument.precision}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meniscus Reading Rules */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Meniskuslestur
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-3">
                {MENISCUS_RULES.map((rule, index) => (
                  <div
                    key={rule.id}
                    className="bg-cyan-50 p-3 rounded-xl border-l-4 border-cyan-500"
                  >
                    <div className="flex items-start gap-2">
                      <span className="bg-cyan-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">{rule.rule}</p>
                        <p className="text-xs text-gray-500">{rule.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual demo */}
              <div className="w-full md:w-48 bg-gray-50 rounded-xl p-4 flex items-center justify-center">
                <div className="text-center">
                  <svg viewBox="0 0 100 80" className="w-full max-w-[120px] mx-auto mb-2">
                    {/* Glass sides */}
                    <line x1="20" y1="10" x2="20" y2="70" stroke="#9ca3af" strokeWidth="3" />
                    <line x1="80" y1="10" x2="80" y2="70" stroke="#9ca3af" strokeWidth="3" />
                    {/* Liquid */}
                    <rect x="22" y="35" width="56" height="35" fill="#3b82f6" opacity="0.4" />
                    {/* Meniscus */}
                    <path d="M 22 35 Q 50 45 78 35" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="2" />
                    {/* Reading indicators */}
                    <line x1="10" y1="35" x2="90" y2="35" stroke="#ef4444" strokeWidth="1" strokeDasharray="4,2" />
                    <text x="92" y="38" fontSize="8" fill="#ef4444">← Les hér!</text>
                    <line x1="10" y1="25" x2="90" y2="25" stroke="#9ca3af" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="92" y="28" fontSize="8" fill="#9ca3af">← Ekki hér</text>
                  </svg>
                  <p className="text-xs text-gray-600">Les neðst á meniskusnum</p>
                </div>
              </div>
            </div>
          </div>

          {/* Uncertainty Rules */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Óvissa í mælingum
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {UNCERTAINTY_RULES.map(rule => (
                <div key={rule.id} className="bg-amber-50 p-4 rounded-xl">
                  <p className="font-medium text-amber-800 mb-2">{rule.rule}</p>
                  <div className="bg-white px-3 py-2 rounded-lg font-mono text-sm text-amber-700">
                    {rule.example}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              Hefja æfingar →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setPhase('learn')}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <span>←</span> Til baka
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-cyan-700">Mælitækjalestur</h1>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-cyan-600">{score} stig</div>
              <div className="text-xs text-gray-500">{quizIndex + 1} / {quizItems.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((quizIndex + 1) / quizItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {/* Instrument Info */}
          <div className="text-center mb-4">
            <div className={`inline-block px-3 py-1 rounded-full text-sm ${
              currentInstrument?.type === 'digital'
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {currentInstrument?.nameIs}
            </div>
          </div>

          {/* Instrument Visual */}
          <div className="bg-gray-50 rounded-xl p-6 mb-4">
            <InstrumentVisual problem={currentItem} />
          </div>

          <div className="text-center mb-4">
            <p className="text-gray-600 mb-2">
              Skráðu mælingu með réttum fjölda markverðra tölustafa
            </p>
            <p className="text-sm text-gray-500">
              Eining: {currentItem.unit}
            </p>
          </div>

          {/* Hint button */}
          {!showResult && (
            <div className="text-center mb-4">
              <button
                onClick={() => setShowHint(true)}
                disabled={showHint}
                className="text-sm text-cyan-600 hover:text-cyan-800 disabled:text-gray-400"
              >
                {showHint ? `💡 ${currentItem.hint}` : '💡 Sýna vísbendingu (-25 stig)'}
              </button>
            </div>
          )}

          {/* Answer input */}
          <div className="flex gap-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={showResult}
              placeholder={`Svarið þitt (${currentItem.unit})...`}
              className="flex-1 px-4 py-4 text-2xl font-mono border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none text-center disabled:bg-gray-100"
              autoFocus
            />
            {!showResult && (
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="px-6 py-4 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Staðfesta
              </button>
            )}
          </div>
        </div>

        {/* Result & Next */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect
                  ? `Rétt! +${showHint ? 75 : 100} stig`
                  : 'Rangt'}
              </div>
              {!isCorrect && (
                <div className="mb-2">
                  <span className="text-gray-600">Rétt svar: </span>
                  <span className="font-mono font-bold text-lg">{currentItem.correctAnswer} {currentItem.unit}</span>
                </div>
              )}
              <p className="text-gray-700">{currentItem.explanation}</p>
              <p className="text-sm text-gray-500 mt-2">
                Markverðir tölustafir: {currentItem.sigFigs}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ljúka stigi' : 'Næsta spurning'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
