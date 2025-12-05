import { useState } from 'react';

/**
 * Level 1: Buffer Builder - Conceptual Foundation
 *
 * Learning Objectives:
 * - Understand buffers need BOTH weak acid and conjugate base
 * - Visualize how ratio affects pH
 * - Learn that equal amounts → pH ≈ pKa
 * - NO calculations - pure conceptual understanding
 */

interface BufferChallenge {
  id: number;
  system: string;
  acidFormula: string;
  baseFormula: string;
  acidName: string;
  baseName: string;
  pKa: number;
  targetPH: number;
  targetRatioMin: number;  // [Base]/[Acid] minimum
  targetRatioMax: number;  // [Base]/[Acid] maximum
  context: string;
  hint: string;
}

const LEVEL1_CHALLENGES: BufferChallenge[] = [
  {
    id: 1,
    system: 'CH₃COOH / CH₃COO⁻',
    acidFormula: 'CH₃COOH',
    baseFormula: 'CH₃COO⁻',
    acidName: 'Ediksýra',
    baseName: 'Asetat jón',
    pKa: 4.74,
    targetPH: 4.74,
    targetRatioMin: 0.9,
    targetRatioMax: 1.1,
    context: 'Þú þarft að búa til púffer við pH 4.74 fyrir rannsóknarstofu.',
    hint: 'Þegar pH = pKa, þarftu JAFNT af sýru og basa!'
  },
  {
    id: 2,
    system: 'CH₃COOH / CH₃COO⁻',
    acidFormula: 'CH₃COOH',
    baseFormula: 'CH₃COO⁻',
    acidName: 'Ediksýra',
    baseName: 'Asetat jón',
    pKa: 4.74,
    targetPH: 5.00,
    targetRatioMin: 1.6,
    targetRatioMax: 2.0,
    context: 'Þú þarft basískara púffer, pH 5.0',
    hint: 'Hærra pH þarf MEIRA basa en sýru!'
  },
  {
    id: 3,
    system: 'CH₃COOH / CH₃COO⁻',
    acidFormula: 'CH₃COOH',
    baseFormula: 'CH₃COO⁻',
    acidName: 'Ediksýra',
    baseName: 'Asetat jón',
    pKa: 4.74,
    targetPH: 4.50,
    targetRatioMin: 0.5,
    targetRatioMax: 0.65,
    context: 'Þú þarft sýrlegra púffer, pH 4.5',
    hint: 'Lægra pH þarf MEIRA sýru en basa!'
  },
  {
    id: 4,
    system: 'H₂PO₄⁻ / HPO₄²⁻',
    acidFormula: 'H₂PO₄⁻',
    baseFormula: 'HPO₄²⁻',
    acidName: 'Díhýdrógenfosfat',
    baseName: 'Hýdrógenfosfat',
    pKa: 7.20,
    targetPH: 7.20,
    targetRatioMin: 0.9,
    targetRatioMax: 1.1,
    context: 'Búa til blóðpúffer (pH 7.2) fyrir lækningafrumur',
    hint: 'pH = pKa → jafnt hlutfall!'
  },
  {
    id: 5,
    system: 'H₂PO₄⁻ / HPO₄²⁻',
    acidFormula: 'H₂PO₄⁻',
    baseFormula: 'HPO₄²⁻',
    acidName: 'Díhýdrógenfosfat',
    baseName: 'Hýdrógenfosfat',
    pKa: 7.20,
    targetPH: 7.40,
    targetRatioMin: 1.4,
    targetRatioMax: 1.7,
    context: 'Líffræðilegt púffer við pH 7.4',
    hint: 'Þarftu meira basa til að hækka pH yfir pKa'
  },
  {
    id: 6,
    system: 'NH₄⁺ / NH₃',
    acidFormula: 'NH₄⁺',
    baseFormula: 'NH₃',
    acidName: 'Ammóníum jón',
    baseName: 'Ammóníak',
    pKa: 9.25,
    targetPH: 9.25,
    targetRatioMin: 0.9,
    targetRatioMax: 1.1,
    context: 'Basískt púffer fyrir efnahvörf',
    hint: 'Sama reglan gildir: pH = pKa = jöfn hlutföll'
  }
];

export default function Level1() {
  const [currentChallenge, setCurrentChallenge] = useState<BufferChallenge>(LEVEL1_CHALLENGES[0]);
  const [acidCount, setAcidCount] = useState(5);
  const [baseCount, setBaseCount] = useState(5);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  // Calculate current ratio [Base]/[Acid]
  const currentRatio = acidCount > 0 ? baseCount / acidCount : 0;

  // Estimate pH using simplified Henderson-Hasselbalch
  // pH ≈ pKa + log([Base]/[Acid])
  const estimatedPH = acidCount > 0
    ? currentChallenge.pKa + Math.log10(currentRatio)
    : 7;

  // Get pH color
  const getPhColor = (pH: number): string => {
    if (pH < 4) return '#ef4444'; // red
    if (pH < 6) return '#f97316'; // orange
    if (pH < 8) return '#eab308'; // yellow
    if (pH < 10) return '#22c55e'; // green
    return '#3b82f6'; // blue
  };

  // Check if ratio is within target range
  const isCorrect = currentRatio >= currentChallenge.targetRatioMin &&
                    currentRatio <= currentChallenge.targetRatioMax;

  // Handle molecule addition
  const addAcid = () => {
    if (acidCount < 20) setAcidCount(acidCount + 1);
    setFeedback(null);
  };

  const removeAcid = () => {
    if (acidCount > 0) setAcidCount(acidCount - 1);
    setFeedback(null);
  };

  const addBase = () => {
    if (baseCount < 20) setBaseCount(baseCount + 1);
    setFeedback(null);
  };

  const removeBase = () => {
    if (baseCount > 0) setBaseCount(baseCount - 1);
    setFeedback(null);
  };

  // Check answer
  const checkBuffer = () => {
    if (acidCount === 0 || baseCount === 0) {
      setFeedback('❌ Púffer þarf BÆÐI sýru og basa!');
      return;
    }

    if (isCorrect) {
      const points = 100;
      setScore(score + points);
      setFeedback(`✅ Frábært! Púfferinn er tilbúinn! +${points} stig`);
      setChallengesCompleted(challengesCompleted + 1);
    } else {
      const phDiff = Math.abs(estimatedPH - currentChallenge.targetPH);
      if (phDiff < 0.5) {
        setFeedback('🟡 Næstum rétt! Fínstilltu hlutfallið aðeins.');
      } else if (estimatedPH > currentChallenge.targetPH) {
        setFeedback('📊 pH er of hátt. Bættu við SÝRU eða fjarlægðu BASE.');
      } else {
        setFeedback('📊 pH er of lágt. Bættu við BASA eða fjarlægðu SÝRU.');
      }
    }
  };

  // Next challenge
  const nextChallenge = () => {
    const currentIndex = LEVEL1_CHALLENGES.findIndex(c => c.id === currentChallenge.id);
    const nextIndex = (currentIndex + 1) % LEVEL1_CHALLENGES.length;
    setCurrentChallenge(LEVEL1_CHALLENGES[nextIndex]);
    setAcidCount(5);
    setBaseCount(5);
    setFeedback(null);
    setShowHint(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#f36b22' }}>
          🧪 Púfferbyggjari - Stig 1
        </h1>
        <p className="text-lg text-gray-600">
          Skildu hvernig hlutfall sýru/basa hefur áhrif á pH
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{score}</div>
          <div className="text-sm text-gray-600">Stig</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{challengesCompleted}</div>
          <div className="text-sm text-gray-600">Kláraðar</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {LEVEL1_CHALLENGES.length}
          </div>
          <div className="text-sm text-gray-600">Samtals</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Challenge & Instructions */}
        <div className="space-y-6">
          {/* Challenge Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Verkefni #{currentChallenge.id}
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-3">{currentChallenge.system}</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-gray-700">{currentChallenge.context}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">pKa</div>
                <div className="text-xl font-bold">{currentChallenge.pKa}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Markmið pH</div>
                <div className="text-xl font-bold" style={{ color: '#f36b22' }}>
                  {currentChallenge.targetPH}
                </div>
              </div>
            </div>

            {/* Hint Button */}
            <button
              onClick={() => setShowHint(!showHint)}
              className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors mb-3"
            >
              {showHint ? '🔒 Fela vísbendingu' : '💡 Sýna vísbendingu'}
            </button>

            {showHint && (
              <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4 mb-4">
                <p className="text-purple-800 font-medium">{currentChallenge.hint}</p>
              </div>
            )}

            {/* Key Concept */}
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
              <h3 className="font-bold text-yellow-900 mb-2">🔑 Lykilhugmynd:</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• pH = pKa þegar [Base] = [Acid]</li>
                <li>• Meira basi → Hærra pH</li>
                <li>• Meira sýra → Lægra pH</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Visual Flask & Controls */}
        <div className="space-y-6">
          {/* Flask Visualization */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center">⚗️ Þinn Púffer</h3>

            {/* pH Indicator */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Núverandi pH:</span>
                <span className="text-2xl font-bold" style={{ color: getPhColor(estimatedPH) }}>
                  {estimatedPH.toFixed(2)}
                </span>
              </div>
              <div className="h-8 rounded-full relative overflow-hidden"
                   style={{ background: getPhColor(estimatedPH) }}>
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                  {estimatedPH < currentChallenge.targetPH && '← Of sýrt'}
                  {estimatedPH > currentChallenge.targetPH && 'Of basískt →'}
                  {Math.abs(estimatedPH - currentChallenge.targetPH) < 0.1 && '✓ Fullkomið!'}
                </div>
              </div>
            </div>

            {/* Molecule Display */}
            <div className="border-4 rounded-lg p-6 mb-6"
                 style={{
                   borderColor: isCorrect ? '#22c55e' : '#cbd5e1',
                   backgroundColor: '#f8fafc',
                   minHeight: '300px'
                 }}>

              {/* Acid Molecules */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-red-600">🔴 {currentChallenge.acidName}</span>
                  <span className="text-sm font-mono bg-red-100 px-2 py-1 rounded">
                    Fjöldi: {acidCount}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[60px] bg-red-50 rounded-lg p-3">
                  {Array.from({ length: acidCount }).map((_, i) => (
                    <div key={`acid-${i}`}
                         className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                      HA
                    </div>
                  ))}
                </div>
              </div>

              {/* Base Molecules */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-blue-600">🔵 {currentChallenge.baseName}</span>
                  <span className="text-sm font-mono bg-blue-100 px-2 py-1 rounded">
                    Fjöldi: {baseCount}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[60px] bg-blue-50 rounded-lg p-3">
                  {Array.from({ length: baseCount }).map((_, i) => (
                    <div key={`base-${i}`}
                         className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                      A⁻
                    </div>
                  ))}
                </div>
              </div>

              {/* Ratio Display */}
              <div className="mt-4 bg-gray-100 rounded-lg p-3 text-center">
                <div className="text-sm text-gray-600 mb-1">Hlutfall [Base]/[Acid]</div>
                <div className="text-3xl font-bold" style={{ color: isCorrect ? '#22c55e' : '#f36b22' }}>
                  {currentRatio.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Markmið: {currentChallenge.targetRatioMin.toFixed(1)} - {currentChallenge.targetRatioMax.toFixed(1)}
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-center font-bold text-red-600 mb-2">Sýra</div>
                <div className="flex gap-2">
                  <button
                    onClick={removeAcid}
                    disabled={acidCount === 0}
                    className="flex-1 py-2 bg-red-100 hover:bg-red-200 disabled:bg-gray-100 disabled:text-gray-400 rounded-lg font-bold transition-colors"
                  >
                    − Fjarlægja
                  </button>
                  <button
                    onClick={addAcid}
                    disabled={acidCount >= 20}
                    className="flex-1 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white rounded-lg font-bold transition-colors"
                  >
                    + Bæta við
                  </button>
                </div>
              </div>

              <div>
                <div className="text-center font-bold text-blue-600 mb-2">Basi</div>
                <div className="flex gap-2">
                  <button
                    onClick={removeBase}
                    disabled={baseCount === 0}
                    className="flex-1 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 disabled:text-gray-400 rounded-lg font-bold transition-colors"
                  >
                    − Fjarlægja
                  </button>
                  <button
                    onClick={addBase}
                    disabled={baseCount >= 20}
                    className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg font-bold transition-colors"
                  >
                    + Bæta við
                  </button>
                </div>
              </div>
            </div>

            {/* Check Button */}
            <button
              onClick={checkBuffer}
              className="w-full py-3 px-6 text-white font-bold text-lg rounded-lg transition-colors mb-3"
              style={{ backgroundColor: '#f36b22' }}
            >
              ✓ Athuga Púffer
            </button>

            {/* Feedback */}
            {feedback && (
              <div className={`rounded-lg p-4 mb-3 ${
                feedback.includes('✅')
                  ? 'bg-green-100 border-2 border-green-500'
                  : feedback.includes('🟡')
                  ? 'bg-yellow-100 border-2 border-yellow-500'
                  : 'bg-red-100 border-2 border-red-500'
              }`}>
                <p className="font-bold text-lg">{feedback}</p>
              </div>
            )}

            {/* Next Button */}
            {isCorrect && feedback && (
              <button
                onClick={nextChallenge}
                className="w-full py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-lg transition-colors"
              >
                Næsta Verkefni →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Educational Footer */}
      <div className="mt-8 bg-gray-100 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-3">📚 Hvað ertu að læra?</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="font-bold mb-1">1. Samsetning Púffers</div>
            <p className="text-gray-600">Púffer þarf BÆÐI veika sýru og samstæðan basa hennar</p>
          </div>
          <div className="bg-white rounded p-3">
            <div className="font-bold mb-1">2. Hlutfall Skiptir Máli</div>
            <p className="text-gray-600">Hlutfall [Base]/[Acid] ákvarðar pH púffersins</p>
          </div>
          <div className="bg-white rounded p-3">
            <div className="font-bold mb-1">3. pKa er Miðpunktur</div>
            <p className="text-gray-600">Þegar pH = pKa, þá er jafnt af sýru og basa</p>
          </div>
        </div>
      </div>
    </div>
  );
}
