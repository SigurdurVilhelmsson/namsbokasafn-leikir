/**
 * Level 4: Ka Determination from Titration Curves
 *
 * Students learn to analyze titration curves to:
 * 1. Identify the half-equivalence point
 * 2. Understand that pH = pKa at half-equivalence
 * 3. Calculate Ka from pKa
 */

import { useState, useRef, useEffect } from 'react';
import { LEVEL4_CHALLENGES, Level4Challenge } from '../data/level4-challenges';

interface Level4Props {
  onComplete: (score: number, maxScore?: number, hintsUsed?: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface CurvePoint {
  volume: number;
  pH: number;
}

// Simple titration curve visualization component
function TitrationCurve({
  data,
  equivalenceVolume,
  halfEquivalenceVolume,
  highlightHalfEq
}: {
  data: CurvePoint[];
  equivalenceVolume: number;
  halfEquivalenceVolume: number;
  highlightHalfEq: boolean;
}) {
  const width = 400;
  const height = 300;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Scale functions
  const maxVolume = Math.max(...data.map(d => d.volume), equivalenceVolume * 1.5);
  const scaleX = (v: number) => padding.left + (v / maxVolume) * chartWidth;
  const scaleY = (pH: number) => padding.top + chartHeight - ((pH / 14) * chartHeight);

  // Generate path
  const sortedData = [...data].sort((a, b) => a.volume - b.volume);
  const pathD = sortedData
    .map((point, i) => {
      const x = scaleX(point.volume);
      const y = scaleY(point.pH);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Find half-equivalence point on curve
  const halfEqPoint = sortedData.find(p => Math.abs(p.volume - halfEquivalenceVolume) < 0.5);
  const halfEqX = scaleX(halfEquivalenceVolume);
  const halfEqY = halfEqPoint ? scaleY(halfEqPoint.pH) : scaleY(7);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md mx-auto">
      {/* Background */}
      <rect x={padding.left} y={padding.top} width={chartWidth} height={chartHeight} fill="#f8fafc" />

      {/* Grid lines */}
      {[0, 2, 4, 6, 7, 8, 10, 12, 14].map(pH => (
        <g key={pH}>
          <line
            x1={padding.left}
            y1={scaleY(pH)}
            x2={width - padding.right}
            y2={scaleY(pH)}
            stroke={pH === 7 ? '#94a3b8' : '#e2e8f0'}
            strokeDasharray={pH === 7 ? '4,4' : '2,2'}
          />
          <text
            x={padding.left - 5}
            y={scaleY(pH)}
            textAnchor="end"
            alignmentBaseline="middle"
            className="text-xs fill-gray-600"
          >
            {pH}
          </text>
        </g>
      ))}

      {/* Volume markers */}
      {Array.from({ length: Math.floor(maxVolume / 10) + 1 }, (_, i) => i * 10).map(vol => (
        <g key={vol}>
          <line
            x1={scaleX(vol)}
            y1={padding.top}
            x2={scaleX(vol)}
            y2={height - padding.bottom}
            stroke="#e2e8f0"
            strokeDasharray="2,2"
          />
          <text
            x={scaleX(vol)}
            y={height - padding.bottom + 15}
            textAnchor="middle"
            className="text-xs fill-gray-600"
          >
            {vol}
          </text>
        </g>
      ))}

      {/* Equivalence point marker */}
      <line
        x1={scaleX(equivalenceVolume)}
        y1={padding.top}
        x2={scaleX(equivalenceVolume)}
        y2={height - padding.bottom}
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="4,4"
      />

      {/* Half-equivalence point marker (if highlighted) */}
      {highlightHalfEq && (
        <>
          <line
            x1={halfEqX}
            y1={padding.top}
            x2={halfEqX}
            y2={height - padding.bottom}
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
          <circle
            cx={halfEqX}
            cy={halfEqY}
            r="6"
            fill="#3b82f6"
            stroke="white"
            strokeWidth="2"
          />
          <text
            x={halfEqX}
            y={halfEqY - 15}
            textAnchor="middle"
            className="text-xs font-bold fill-blue-600"
          >
            pH = pKa
          </text>
        </>
      )}

      {/* Titration curve */}
      <path
        d={pathD}
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Axis labels */}
      <text
        x={width / 2}
        y={height - 5}
        textAnchor="middle"
        className="text-sm fill-gray-700 font-semibold"
      >
        Rúmmál NaOH (mL)
      </text>
      <text
        x={15}
        y={height / 2}
        textAnchor="middle"
        className="text-sm fill-gray-700 font-semibold"
        transform={`rotate(-90, 15, ${height / 2})`}
      >
        pH
      </text>

      {/* Legend */}
      <g transform={`translate(${width - padding.right - 80}, ${padding.top + 10})`}>
        <line x1="0" y1="0" x2="20" y2="0" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />
        <text x="25" y="4" className="text-xs fill-gray-600">Jafngildi</text>
        {highlightHalfEq && (
          <>
            <line x1="0" y1="15" x2="20" y2="15" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" />
            <text x="25" y="19" className="text-xs fill-gray-600">Hálft jafngildi</text>
          </>
        )}
      </g>
    </svg>
  );
}

export function Level4({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level4Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [completed, setCompleted] = useState(0);
  const levelCompleteReported = useRef(false);

  // Answer state
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const challenge = LEVEL4_CHALLENGES[currentIndex];
  const maxScore = LEVEL4_CHALLENGES.length * 20;

  // Reset state when changing challenges
  useEffect(() => {
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
    setShowSolution(false);
    setIsCorrect(false);
  }, [currentIndex]);

  // Check completion
  useEffect(() => {
    if (completed >= LEVEL4_CHALLENGES.length && !levelCompleteReported.current) {
      levelCompleteReported.current = true;
      onComplete(score, maxScore, hintsUsed);
    }
  }, [completed, score, maxScore, hintsUsed, onComplete]);

  const parseAnswer = (input: string): number | null => {
    // Handle scientific notation
    const cleaned = input
      .replace(/\s/g, '')
      .replace(/×/g, 'x')
      .replace(/\^/g, '')
      .replace(/10/g, 'e')
      .replace(/x/gi, 'e')
      .replace(/ee/g, 'e')
      .replace(',', '.');

    const num = parseFloat(cleaned);
    if (isNaN(num)) {
      const direct = parseFloat(input.replace(',', '.'));
      return isNaN(direct) ? null : direct;
    }
    return num;
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const numericAnswer = parseAnswer(userAnswer);
    if (numericAnswer === null) return;

    const relativeError = Math.abs(numericAnswer - challenge.correctAnswer) / Math.abs(challenge.correctAnswer);
    const correct = relativeError <= challenge.tolerance;

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const points = showHint ? 10 : 20;
      setScore(prev => prev + points);
      onCorrectAnswer?.();
    } else {
      onIncorrectAnswer?.();
    }
  };

  const handleShowHint = () => {
    if (!showHint) {
      setShowHint(true);
      setHintsUsed(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setCompleted(prev => prev + 1);

    if (currentIndex < LEVEL4_CHALLENGES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showResult) {
      handleSubmit();
    }
  };

  const getChallengeTypeLabel = (type: Level4Challenge['type']): string => {
    switch (type) {
      case 'identify-half-eq': return 'Hálfur jafngildi';
      case 'read-pka': return 'Lesa pKa';
      case 'calculate-ka': return 'Reikna Ka';
      case 'full-analysis': return 'Heildargreining';
      default: return type;
    }
  };

  const getChallengeTypeColor = (type: Level4Challenge['type']): string => {
    switch (type) {
      case 'identify-half-eq': return 'bg-blue-500';
      case 'read-pka': return 'bg-green-500';
      case 'calculate-ka': return 'bg-orange-500';
      case 'full-analysis': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const formatAnswer = (value: number): string => {
    if (value < 0.001 || value > 1000) {
      return value.toExponential(2);
    }
    return value.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-4">
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              ← Til baka
            </button>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                {completed + 1} / {LEVEL4_CHALLENGES.length}
              </div>
              <div className="text-lg font-bold text-orange-600">
                Stig: {score}
              </div>
            </div>
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-orange-600 mt-2">
            🔬 Stig 4: Ka Ákvörðun
          </h1>
          <p className="text-sm text-gray-600">
            Lærðu að finna Ka frá títrunarkúrfum
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completed / LEVEL4_CHALLENGES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Challenge card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
          <div className="flex items-start gap-3 mb-4">
            <span className={`${getChallengeTypeColor(challenge.type)} text-white text-xs font-bold px-3 py-1 rounded-full`}>
              {getChallengeTypeLabel(challenge.type)}
            </span>
            <h2 className="text-lg font-bold text-gray-800">{challenge.titleIs}</h2>
          </div>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-4">
            <p className="text-orange-900 text-lg">{challenge.descriptionIs}</p>
          </div>

          {/* Titration info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <h3 className="font-bold text-gray-700 mb-2">Títrunarupplýsingar:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="font-semibold">Sýra:</span> {challenge.acidFormula} ({challenge.acidNameIs})</div>
              <div><span className="font-semibold">Rúmmál sýru:</span> {challenge.analyteVolume} mL</div>
              <div><span className="font-semibold">Styrkur sýru:</span> {challenge.analyteMolarity} M</div>
              <div><span className="font-semibold">Títrant:</span> {challenge.titrantFormula} ({challenge.titrantMolarity} M)</div>
              <div><span className="font-semibold text-red-600">Jafngildispunktur:</span> {challenge.equivalenceVolume} mL</div>
            </div>
          </div>

          {/* Titration curve visualization */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 mb-4">
            <h3 className="font-bold text-gray-700 mb-3 text-center">Títrunarkúrfa</h3>
            <TitrationCurve
              data={challenge.curveData}
              equivalenceVolume={challenge.equivalenceVolume}
              halfEquivalenceVolume={challenge.halfEquivalenceVolume}
              highlightHalfEq={showResult || showHint}
            />

            {/* pH values table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-1 text-left">V (mL)</th>
                    {challenge.curveData.slice(0, 10).map((point, i) => (
                      <th key={i} className="px-2 py-1">{point.volume.toFixed(1)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-1 font-semibold">pH</td>
                    {challenge.curveData.slice(0, 10).map((point, i) => (
                      <td
                        key={i}
                        className={`px-2 py-1 text-center ${
                          Math.abs(point.volume - challenge.halfEquivalenceVolume) < 0.5
                            ? 'bg-blue-100 font-bold text-blue-700'
                            : ''
                        }`}
                      >
                        {point.pH.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Key concept reminder */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
            <h4 className="font-bold text-purple-800 mb-2">Lykilhugtök:</h4>
            <ul className="text-sm text-purple-900 space-y-1">
              <li>• Við <strong>hálfan jafngildispunkt</strong>, helmingur sýrunnar hefur hvarfast</li>
              <li>• Við þennan punkt gildir: [HA] = [A⁻] og <strong>pH = pKa</strong></li>
              <li>• Ka = 10<sup>-pKa</sup></li>
            </ul>
          </div>

          {/* Answer input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Svar {challenge.answerUnit && `(${challenge.answerUnit})`}:
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={showResult}
                placeholder={
                  challenge.type === 'calculate-ka' || challenge.type === 'full-analysis'
                    ? 'T.d. 1.8e-5 eða 0.000018'
                    : 'Sláðu inn svar...'
                }
                className={`flex-1 px-4 py-3 border-2 rounded-xl text-lg font-mono ${
                  showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
                }`}
              />
              {challenge.answerUnit && (
                <span className="flex items-center px-4 py-3 bg-gray-100 rounded-xl font-semibold text-gray-700">
                  {challenge.answerUnit}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {challenge.type === 'calculate-ka' || challenge.type === 'full-analysis'
                ? 'Notaðu vísindalega rithætti (t.d. 1.8e-5)'
                : `Skekkjumörk: ±${(challenge.tolerance * 100).toFixed(0)}%`}
            </p>
          </div>

          {/* Hint */}
          {!showResult && (
            <div className="mb-4">
              {showHint ? (
                <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4">
                  <div className="font-bold text-yellow-800 mb-1">💡 Vísbending:</div>
                  <p className="text-yellow-900">{challenge.hintIs}</p>
                </div>
              ) : (
                <button
                  onClick={handleShowHint}
                  className="text-yellow-600 hover:text-yellow-800 text-sm flex items-center gap-2"
                >
                  💡 Sýna vísbendingu (-10 stig)
                </button>
              )}
            </div>
          )}

          {/* Submit button */}
          {!showResult && (
            <button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className={`w-full px-6 py-3 rounded-xl font-bold transition-colors ${
                userAnswer.trim()
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Staðfesta svar
            </button>
          )}

          {/* Result feedback */}
          {showResult && (
            <div className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-300' : 'bg-red-50 border border-red-300'}`}>
              <div className={`font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '✓ Rétt!' : '✗ Rangt'}
                {isCorrect && showHint && ' (10 stig)'}
                {isCorrect && !showHint && ' (+20 stig)'}
              </div>

              <div className="text-sm mb-2">
                <span className="font-semibold">Þitt svar:</span> {userAnswer} {challenge.answerUnit}
                <br />
                <span className="font-semibold">Rétt svar:</span> {formatAnswer(challenge.correctAnswer)} {challenge.answerUnit}
              </div>

              <p className={`text-sm ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                {challenge.explanationIs}
              </p>

              {/* Show solution button */}
              {!showSolution && (
                <button
                  onClick={() => setShowSolution(true)}
                  className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-semibold"
                >
                  📝 Sýna útreikningsgang
                </button>
              )}

              {/* Solution steps */}
              {showSolution && (
                <div className="mt-3 bg-white rounded-lg p-3 border border-gray-200">
                  <h4 className="font-bold text-gray-700 mb-2">Lausn:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm font-mono text-gray-800">
                    {challenge.solutionStepsIs.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              <button
                onClick={handleNext}
                className="mt-4 w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold"
              >
                {currentIndex < LEVEL4_CHALLENGES.length - 1 ? 'Næsta →' : 'Ljúka stigi →'}
              </button>
            </div>
          )}
        </div>

        {/* Reference section */}
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <h3 className="font-bold text-gray-700 mb-3">📋 Ka Ákvörðun - Samantekt</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Method */}
            <div className="bg-orange-50 rounded-xl p-3">
              <h4 className="font-semibold text-orange-800 mb-2">Aðferð</h4>
              <ol className="list-decimal list-inside text-sm text-orange-900 space-y-1">
                <li>Finndu jafngildispunkt (Veq)</li>
                <li>Reiknaðu hálfan jafngildispunkt (Veq/2)</li>
                <li>Lestu pH við þetta rúmmál</li>
                <li>Við hálfan jafngildispunkt: pH = pKa</li>
                <li>Reiknaðu Ka = 10<sup>-pKa</sup></li>
              </ol>
            </div>

            {/* Formula */}
            <div className="bg-purple-50 rounded-xl p-3">
              <h4 className="font-semibold text-purple-800 mb-2">Lykilformúlur</h4>
              <div className="space-y-2 text-sm text-purple-900">
                <div>
                  <span className="font-semibold">Hálfur jafngildispunktur:</span>
                  <div className="font-mono">V = V<sub>eq</sub> / 2</div>
                </div>
                <div>
                  <span className="font-semibold">Við hálfan jafngildispunkt:</span>
                  <div className="font-mono">[HA] = [A⁻] → pH = pKa</div>
                </div>
                <div>
                  <span className="font-semibold">Ka úr pKa:</span>
                  <div className="font-mono">Ka = 10<sup>-pKa</sup></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Level4;
