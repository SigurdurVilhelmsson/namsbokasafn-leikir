import { useState, useEffect, useCallback } from 'react';

// Types for Level 1
interface Challenge {
  id: number;
  type: 'dilution' | 'mixing' | 'buildSolution' | 'concentrationMatch';
  title: string;
  description: string;
  targetConcentration: number;
  tolerance: number; // percentage tolerance for answer
  initialState: {
    molecules: number;
    volumeML: number;
    molecules2?: number;
    volumeML2?: number;
  };
  constraints: {
    minVolume: number;
    maxVolume: number;
    minMolecules: number;
    maxMolecules: number;
    canChangeMolecules: boolean;
    canChangeVolume: boolean;
  };
  hint: string;
  conceptMessage: string;
}

const CHALLENGES: Challenge[] = [
  // Challenge 1: Simple dilution - understand inverse relationship
  {
    id: 1,
    type: 'dilution',
    title: 'Útþynning - Skilja vensl',
    description: 'Bættu við vatni til að ná markmiðsstyrk. Fylgstu með hvernig sameindir dreifast.',
    targetConcentration: 2.0,
    tolerance: 5,
    initialState: { molecules: 50, volumeML: 100 },
    constraints: {
      minVolume: 100,
      maxVolume: 500,
      minMolecules: 50,
      maxMolecules: 50, // Can't change molecules in dilution!
      canChangeMolecules: false,
      canChangeVolume: true
    },
    hint: 'Þegar þú bætir við vatni, dreifast sameindir á stærra svæði. Styrkurinn lækkar!',
    conceptMessage: 'pH = pKa þegar [Base] = [Acid]'
  },
  // Challenge 2: Build concentration from scratch
  {
    id: 2,
    type: 'buildSolution',
    title: 'Byggja lausn',
    description: 'Bættu við sameindum og stilltu rúmmál til að ná 1.5 M styrk.',
    targetConcentration: 1.5,
    tolerance: 5,
    initialState: { molecules: 20, volumeML: 200 },
    constraints: {
      minVolume: 100,
      maxVolume: 400,
      minMolecules: 10,
      maxMolecules: 100,
      canChangeMolecules: true,
      canChangeVolume: true
    },
    hint: 'Styrkur = sameindir / rúmmál. Prófaðu að breyta báðum!',
    conceptMessage: 'Meira af sameindum í sama rúmmáli = hærri styrkur'
  },
  // Challenge 3: More dilution practice
  {
    id: 3,
    type: 'dilution',
    title: 'Nákvæm útþynning',
    description: 'Þú ert með sterka lausn. Þynntu hana niður í 0.8 M.',
    targetConcentration: 0.8,
    tolerance: 5,
    initialState: { molecules: 40, volumeML: 100 },
    constraints: {
      minVolume: 100,
      maxVolume: 600,
      minMolecules: 40,
      maxMolecules: 40,
      canChangeMolecules: false,
      canChangeVolume: true
    },
    hint: 'Sameindir haldast óbreyttar. Aðeins rúmmálið breytist!',
    conceptMessage: 'Við útþynningu: sameindir haldast, styrkur minnkar'
  },
  // Challenge 4: Concentration matching with molecules
  {
    id: 4,
    type: 'concentrationMatch',
    title: 'Styrkjamöt',
    description: 'Breyttu fjölda sameinda til að ná 3.0 M styrk í 150 mL.',
    targetConcentration: 3.0,
    tolerance: 5,
    initialState: { molecules: 30, volumeML: 150 },
    constraints: {
      minVolume: 150,
      maxVolume: 150, // Fixed volume
      minMolecules: 10,
      maxMolecules: 100,
      canChangeMolecules: true,
      canChangeVolume: false
    },
    hint: 'Rúmmálið er fast. Hversu margar sameindir þarftu fyrir 3.0 M?',
    conceptMessage: 'Fleiri sameindir í sama rúmmáli = hærri styrkur'
  },
  // Challenge 5: Advanced dilution
  {
    id: 5,
    type: 'dilution',
    title: 'Þrefalt þynnt',
    description: 'Þynntu 5 M lausnina niður í einn þriðja af upphaflega styrknum.',
    targetConcentration: 1.67,
    tolerance: 5,
    initialState: { molecules: 50, volumeML: 100 },
    constraints: {
      minVolume: 100,
      maxVolume: 500,
      minMolecules: 50,
      maxMolecules: 50,
      canChangeMolecules: false,
      canChangeVolume: true
    },
    hint: 'Til að þynna í þriðjung þarftu þrefalt meira rúmmál!',
    conceptMessage: 'Styrkur × rúmmál = fasti (heildarmagn sameinda)'
  },
  // Challenge 6: Build specific concentration
  {
    id: 6,
    type: 'buildSolution',
    title: 'Sérsmíðuð lausn',
    description: 'Búðu til nákvæmlega 2.5 M lausn með því að stilla bæði sameindir og rúmmál.',
    targetConcentration: 2.5,
    tolerance: 3,
    initialState: { molecules: 25, volumeML: 200 },
    constraints: {
      minVolume: 50,
      maxVolume: 500,
      minMolecules: 10,
      maxMolecules: 150,
      canChangeMolecules: true,
      canChangeVolume: true
    },
    hint: 'Margar samsetningar virka! Finndu eina þar sem sameindir/rúmmál = 2.5',
    conceptMessage: 'Sama styrkur getur orðið með mismunandi magni'
  }
];

// Visual molecule component
function MoleculeDisplay({
  count,
  volumeML,
  maxVolume,
  color = '#f97316'
}: {
  count: number;
  volumeML: number;
  maxVolume: number;
  color?: string;
}) {
  // Scale molecule size based on concentration (more concentrated = closer together visually)
  const concentration = count / (volumeML / 1000);
  const fillPercent = Math.min(100, (volumeML / maxVolume) * 100);

  // Beaker boundaries in SVG coordinates (viewBox 0 0 100 140)
  // Beaker inner walls: x=16 to x=84, liquid from y=120 downward
  const beakerLeft = 18;
  const beakerRight = 82;
  const beakerBottom = 118;
  const liquidHeight = fillPercent * 1.1;
  const liquidTop = 120 - liquidHeight + 2; // +2 for padding from meniscus

  // Create molecule positions - use seeded positions for consistency
  const moleculeElements = [];
  const displayCount = Math.min(count, 80); // Cap visual molecules at 80 for performance

  // Calculate grid dimensions based on liquid area
  const liquidWidth = beakerRight - beakerLeft;
  const availableLiquidHeight = Math.max(5, beakerBottom - liquidTop);

  // Determine grid layout - molecules should spread evenly throughout liquid
  const moleculeRadius = 2; // Smaller balls
  const spacing = Math.max(moleculeRadius * 2.5, Math.min(8, Math.sqrt((liquidWidth * availableLiquidHeight) / displayCount)));

  const cols = Math.max(1, Math.floor(liquidWidth / spacing));
  const rows = Math.max(1, Math.ceil(displayCount / cols));

  // Calculate actual spacing to fill the area evenly
  const xSpacing = liquidWidth / (cols + 1);
  const ySpacing = availableLiquidHeight / (rows + 1);

  for (let i = 0; i < displayCount; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;

    // Distribute evenly with small random jitter for natural look
    // Use deterministic jitter based on index for consistency
    const jitterX = ((i * 7) % 5 - 2) * 0.5;
    const jitterY = ((i * 11) % 5 - 2) * 0.5;

    const x = beakerLeft + xSpacing * (col + 1) + jitterX;
    const y = liquidTop + ySpacing * (row + 1) + jitterY;

    // Ensure molecule stays within liquid boundaries
    const clampedX = Math.max(beakerLeft + moleculeRadius, Math.min(beakerRight - moleculeRadius, x));
    const clampedY = Math.max(liquidTop + moleculeRadius, Math.min(beakerBottom - moleculeRadius, y));

    moleculeElements.push(
      <circle
        key={i}
        cx={clampedX}
        cy={clampedY}
        r={moleculeRadius}
        fill={color}
        opacity={0.9}
        className="transition-all duration-300"
      />
    );
  }

  // Show count indicator if we're capping display
  const showCountIndicator = count > displayCount;

  return (
    <div className="relative w-48 h-64 mx-auto">
      <svg viewBox="0 0 100 140" className="w-full h-full">
        {/* Beaker outline */}
        <path
          d="M15 10 L15 120 Q15 130 25 130 L75 130 Q85 130 85 120 L85 10"
          fill="none"
          stroke="#374151"
          strokeWidth="3"
        />

        {/* Volume graduations */}
        {[20, 40, 60, 80, 100].map((percent, i) => (
          <g key={i}>
            <line
              x1="85"
              y1={120 - (percent * 1.1)}
              x2="92"
              y2={120 - (percent * 1.1)}
              stroke="#9ca3af"
              strokeWidth="1"
            />
            <text
              x="94"
              y={120 - (percent * 1.1) + 3}
              fontSize="6"
              fill="#6b7280"
            >
              {percent}%
            </text>
          </g>
        ))}

        {/* Solution fill */}
        <rect
          x="16"
          y={120 - (fillPercent * 1.1)}
          width="68"
          height={fillPercent * 1.1}
          fill={color}
          opacity={Math.min(0.4, 0.1 + concentration * 0.05)}
          className="transition-all duration-300"
        />

        {/* Molecules */}
        <g className="molecules">
          {moleculeElements}
        </g>

        {/* Count indicator */}
        {showCountIndicator && (
          <text
            x="50"
            y={125}
            textAnchor="middle"
            fontSize="8"
            fill="#374151"
            fontWeight="bold"
          >
            +{count - displayCount} fleiri
          </text>
        )}
      </svg>

      {/* Volume label below beaker */}
      <div className="text-center mt-2 text-sm text-gray-600">
        {volumeML} mL
      </div>
    </div>
  );
}

// Concentration indicator with color feedback
function ConcentrationIndicator({
  current,
  target,
  tolerance
}: {
  current: number;
  target: number;
  tolerance: number;
}) {
  const difference = Math.abs(current - target);
  const percentOff = (difference / target) * 100;
  const isCorrect = percentOff <= tolerance;
  const isClose = percentOff <= tolerance * 2;

  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-700';
  let indicator = '';

  if (isCorrect) {
    bgColor = 'bg-green-100 border-green-400';
    textColor = 'text-green-700';
    indicator = '✓';
  } else if (isClose) {
    bgColor = 'bg-yellow-100 border-yellow-400';
    textColor = 'text-yellow-700';
    indicator = current < target ? '↑' : '↓';
  } else {
    bgColor = 'bg-red-50 border-red-300';
    textColor = 'text-red-700';
    indicator = current < target ? '↑↑' : '↓↓';
  }

  return (
    <div className={`p-4 rounded-xl border-2 ${bgColor} transition-all duration-300`}>
      <div className="text-center">
        <div className="text-sm text-gray-600 mb-1">Núverandi styrkur</div>
        <div className={`text-3xl font-bold ${textColor}`}>
          {current.toFixed(2)} M {indicator}
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Markmið: {target.toFixed(2)} M (±{tolerance}%)
        </div>
      </div>

      {/* Visual bar comparison */}
      <div className="mt-3 relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-gray-400 opacity-50"
          style={{
            left: `${Math.max(0, (target / (target * 2)) * 100 - 5)}%`,
            width: '10%'
          }}
        />
        <div
          className={`absolute h-full transition-all duration-300 ${isCorrect ? 'bg-green-500' : isClose ? 'bg-yellow-500' : 'bg-orange-500'}`}
          style={{
            width: `${Math.min(100, (current / (target * 2)) * 100)}%`
          }}
        />
      </div>
    </div>
  );
}

interface Level1Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

// Main Level1 component
export function Level1({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level1Props) {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [molecules, setMolecules] = useState(50);
  const [volumeML, setVolumeML] = useState(100);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showConcept, setShowConcept] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);

  const challenge = CHALLENGES[currentChallenge];

  // Calculate current concentration (molecules per liter)
  // Using a scale where 10 molecules = 0.1 mol for simplicity
  const moleFactor = 0.01; // Each "molecule" represents 0.01 mol
  const currentConcentration = (molecules * moleFactor) / (volumeML / 1000);

  // Check if answer is within tolerance
  const isCorrect = Math.abs(currentConcentration - challenge.targetConcentration) / challenge.targetConcentration * 100 <= challenge.tolerance;

  // Reset state when challenge changes
  useEffect(() => {
    if (challenge) {
      setMolecules(challenge.initialState.molecules);
      setVolumeML(challenge.initialState.volumeML);
      setShowHint(false);
      setShowConcept(false);
    }
  }, [currentChallenge, challenge]);

  // Handle molecule change
  const changeMolecules = useCallback((delta: number) => {
    if (!challenge.constraints.canChangeMolecules) return;
    setMolecules(prev => Math.max(
      challenge.constraints.minMolecules,
      Math.min(challenge.constraints.maxMolecules, prev + delta)
    ));
  }, [challenge]);

  // Handle volume change
  const changeVolume = useCallback((newVolume: number) => {
    if (!challenge.constraints.canChangeVolume) return;
    setVolumeML(Math.max(
      challenge.constraints.minVolume,
      Math.min(challenge.constraints.maxVolume, newVolume)
    ));
  }, [challenge]);

  // Submit answer
  const checkAnswer = useCallback(() => {
    if (isCorrect) {
      const pointsEarned = showHint ? 50 : 100;
      setScore(prev => prev + pointsEarned);
      setCompleted(prev => [...prev, challenge.id]);
      setShowConcept(true);
      onCorrectAnswer?.();

      // Move to next challenge after delay
      setTimeout(() => {
        if (currentChallenge < CHALLENGES.length - 1) {
          setCurrentChallenge(prev => prev + 1);
        } else {
          setGameComplete(true);
        }
      }, 2500);
    } else {
      onIncorrectAnswer?.();
    }
  }, [isCorrect, showHint, challenge.id, currentChallenge, onCorrectAnswer, onIncorrectAnswer]);

  // Game complete screen
  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-blue-600">
            Til hamingju!
          </h1>

          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              Þú hefur lokið Stigi 1!
            </div>
            <div className="text-lg text-gray-600">
              Stig: {score} / {CHALLENGES.length * 100}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl mb-6">
            <h2 className="font-bold text-blue-800 mb-3">Hvað lærðir þú?</h2>
            <ul className="space-y-2 text-blue-900">
              <li>✓ Styrkur = sameindir deilt með rúmmáli</li>
              <li>✓ Útþynning: sameindir haldast, rúmmál eykst → styrkur minnkar</li>
              <li>✓ Fleiri sameindir í sama rúmmáli = hærri styrkur</li>
              <li>✓ Styrkur og rúmmál hafa öfug tengsl við útþynningu</li>
            </ul>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => {
                setGameComplete(false);
                setCurrentChallenge(0);
                setScore(0);
                setCompleted([]);
              }}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Spila aftur
            </button>
            <button
              onClick={() => onComplete(score, CHALLENGES.length * 100, totalHintsUsed)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Áfram í Stig 2 →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
                Lausnir - Stigur 1
              </h1>
              <p className="text-sm text-gray-600">Skildu hugtökin - ENGIN útreikningar!</p>
            </div>

            <div className="flex gap-4 items-center">
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                ← Til baka
              </button>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{score}</div>
                <div className="text-xs text-gray-600">Stig</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">
                  {completed.length}/{CHALLENGES.length}
                </div>
                <div className="text-xs text-gray-600">Lokið</div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completed.length / CHALLENGES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Challenge area */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {/* Challenge header */}
          <div className="mb-6">
            <div className="inline-block bg-blue-100 px-4 py-2 rounded-full text-sm font-semibold text-blue-800 mb-2">
              Verkefni {currentChallenge + 1}: {challenge.title}
            </div>
            <p className="text-lg text-gray-700">{challenge.description}</p>
          </div>

          {/* Main interaction area */}
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            {/* Beaker visualization */}
            <div className="flex flex-col items-center">
              <MoleculeDisplay
                count={molecules}
                volumeML={volumeML}
                maxVolume={challenge.constraints.maxVolume}
                color={challenge.type === 'dilution' ? '#f97316' : '#3b82f6'}
              />

              <div className="mt-4 text-center">
                <div className="text-sm text-gray-600">
                  Sameindir: <span className="font-bold text-gray-800">{molecules}</span>
                </div>
              </div>
            </div>

            {/* Controls and feedback */}
            <div className="space-y-6">
              <ConcentrationIndicator
                current={currentConcentration}
                target={challenge.targetConcentration}
                tolerance={challenge.tolerance}
              />

              {/* Molecule controls */}
              {challenge.constraints.canChangeMolecules && (
                <div className="bg-orange-50 p-4 rounded-xl">
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    Sameindir
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => changeMolecules(-10)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-12 h-12 rounded-lg text-xl transition-colors"
                      disabled={molecules <= challenge.constraints.minMolecules}
                    >
                      -10
                    </button>
                    <button
                      onClick={() => changeMolecules(-1)}
                      className="bg-orange-400 hover:bg-orange-500 text-white font-bold w-10 h-10 rounded-lg transition-colors"
                      disabled={molecules <= challenge.constraints.minMolecules}
                    >
                      -1
                    </button>
                    <span className="text-2xl font-bold w-16 text-center">{molecules}</span>
                    <button
                      onClick={() => changeMolecules(1)}
                      className="bg-orange-400 hover:bg-orange-500 text-white font-bold w-10 h-10 rounded-lg transition-colors"
                      disabled={molecules >= challenge.constraints.maxMolecules}
                    >
                      +1
                    </button>
                    <button
                      onClick={() => changeMolecules(10)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-12 h-12 rounded-lg text-xl transition-colors"
                      disabled={molecules >= challenge.constraints.maxMolecules}
                    >
                      +10
                    </button>
                  </div>
                </div>
              )}

              {/* Volume controls */}
              {challenge.constraints.canChangeVolume && (
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    Rúmmál (mL)
                  </div>
                  <input
                    type="range"
                    min={challenge.constraints.minVolume}
                    max={challenge.constraints.maxVolume}
                    value={volumeML}
                    onChange={(e) => changeVolume(parseInt(e.target.value))}
                    className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{challenge.constraints.minVolume} mL</span>
                    <span className="font-bold text-blue-600">{volumeML} mL</span>
                    <span>{challenge.constraints.maxVolume} mL</span>
                  </div>
                </div>
              )}

              {/* Fixed parameter notice */}
              {!challenge.constraints.canChangeMolecules && (
                <div className="bg-gray-100 p-3 rounded-lg text-center text-sm text-gray-600">
                  Sameindir eru fastar við {molecules} (þetta er útþynning!)
                </div>
              )}
              {!challenge.constraints.canChangeVolume && (
                <div className="bg-gray-100 p-3 rounded-lg text-center text-sm text-gray-600">
                  Rúmmál er fast við {volumeML} mL
                </div>
              )}
            </div>
          </div>

          {/* Hint section */}
          {showHint && (
            <div className="mb-6 bg-yellow-50 border-2 border-yellow-300 p-4 rounded-xl">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 Vísbending:</h4>
              <p className="text-yellow-900">{challenge.hint}</p>
            </div>
          )}

          {/* Concept reveal after correct answer */}
          {showConcept && isCorrect && (
            <div className="mb-6 bg-green-50 border-2 border-green-400 p-4 rounded-xl animate-pulse">
              <h4 className="font-semibold text-green-800 mb-2">✓ Rétt!</h4>
              <p className="text-green-900 font-semibold">
                Lykilhugtak: {challenge.type === 'dilution'
                  ? 'Við útþynningu haldast sameindir óbreyttar. Meira rúmmál = lægri styrkur!'
                  : 'Styrkur = sameindir / rúmmál. Þú getur breytt hvoru tveggja til að ná markmiði!'}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            {!showHint && !showConcept && (
              <button
                onClick={() => {
                  setShowHint(true);
                  setTotalHintsUsed(prev => prev + 1);
                }}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Syna visbendingu (-50 stig)
              </button>
            )}

            <button
              onClick={checkAnswer}
              disabled={showConcept}
              className={`flex-1 font-bold py-3 px-6 rounded-xl transition-colors ${
                isCorrect && !showConcept
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : showConcept
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {showConcept ? 'Hleð næsta verkefni...' : 'Athuga lausn ✓'}
            </button>
          </div>

          {/* Key concept reminder */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-700 mb-2">🔑 Lykilhugmynd:</h4>
            <p className="text-gray-600">
              <strong>Styrkur</strong> segir til um hversu margar sameindir eru í hverju rúmmáli.
              <br />
              Meiri sameindir EÐA minna rúmmál = hærri styrkur.
            </p>
          </div>
        </div>

        {/* Challenge navigation */}
        <div className="mt-6 flex justify-center gap-2">
          {CHALLENGES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => !completed.includes(c.id) && i <= Math.max(...completed.map(id => CHALLENGES.findIndex(ch => ch.id === id)), 0) + 1 && setCurrentChallenge(i)}
              className={`w-10 h-10 rounded-full font-bold transition-colors ${
                completed.includes(c.id)
                  ? 'bg-green-500 text-white'
                  : i === currentChallenge
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              disabled={completed.includes(c.id)}
            >
              {completed.includes(c.id) ? '✓' : i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Level1;
