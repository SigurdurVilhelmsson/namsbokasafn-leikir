import { useState, useCallback, useMemo } from 'react';
import { LEVEL1_ELEMENTS, shuffleArray } from '../data';
import type { ElementData } from '../data';

interface Level1Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

type Phase = 'learn' | 'quiz';

/**
 * Bohr Model SVG component
 * Draws concentric circles representing electron shells with dots for electrons
 */
function BohrModel({
  element,
  showElectrons,
  size = 200,
}: {
  element: ElementData;
  showElectrons: boolean;
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const nucleusRadius = size * 0.1;
  const shellRadii = [size * 0.22, size * 0.34, size * 0.46];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      {/* Shells (concentric circles) */}
      {element.electronShells.map((_, i) => (
        <circle
          key={`shell-${i}`}
          cx={cx}
          cy={cy}
          r={shellRadii[i]}
          fill="none"
          stroke="#c4b5fd"
          strokeWidth="1"
          strokeDasharray="4 2"
          opacity={0.6}
        />
      ))}

      {/* Nucleus */}
      <circle cx={cx} cy={cy} r={nucleusRadius} fill="#7c3aed" opacity={0.9} />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontSize={nucleusRadius * 0.8}
        fontWeight="bold"
      >
        {element.symbol}
      </text>

      {/* Proton/Neutron labels in nucleus area */}
      <text
        x={cx}
        y={cy + nucleusRadius + 10}
        textAnchor="middle"
        fill="#6d28d9"
        fontSize="9"
        fontWeight="600"
      >
        {element.atomicNumber}p+ {element.massNumber - element.atomicNumber}n
      </text>

      {/* Electrons on shells */}
      {showElectrons &&
        element.electronShells.map((electronCount, shellIndex) => {
          const electrons = [];
          for (let e = 0; e < electronCount; e++) {
            const angle = (2 * Math.PI * e) / electronCount - Math.PI / 2;
            const ex = cx + shellRadii[shellIndex] * Math.cos(angle);
            const ey = cy + shellRadii[shellIndex] * Math.sin(angle);
            electrons.push(
              <circle
                key={`e-${shellIndex}-${e}`}
                cx={ex}
                cy={ey}
                r={4}
                fill="#3b82f6"
                stroke="white"
                strokeWidth="1"
              />
            );
          }
          return electrons;
        })}
    </svg>
  );
}

export function Level1({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level1Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Input fields
  const [protonsInput, setProtonsInput] = useState('');
  const [neutronsInput, setNeutronsInput] = useState('');
  const [electronsInput, setElectronsInput] = useState('');

  // Shuffled quiz items
  const quizItems = useMemo(() => shuffleArray(LEVEL1_ELEMENTS), []);
  const currentElement = quizItems[quizIndex];
  const isLastQuestion = quizIndex >= quizItems.length - 1;
  const maxScore = quizItems.length * 100;

  const correctProtons = currentElement.atomicNumber;
  const correctNeutrons = currentElement.massNumber - currentElement.atomicNumber;
  const correctElectrons = currentElement.atomicNumber; // neutral atom

  const handleCheck = useCallback(() => {
    if (showResult) return;

    const p = parseInt(protonsInput, 10);
    const n = parseInt(neutronsInput, 10);
    const e = parseInt(electronsInput, 10);

    const correct = p === correctProtons && n === correctNeutrons && e === correctElectrons;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const basePoints = showHint ? 50 : 100;
      setScore(prev => prev + basePoints);
      onCorrectAnswer?.();
    } else {
      onIncorrectAnswer?.();
    }
  }, [
    showResult, protonsInput, neutronsInput, electronsInput,
    correctProtons, correctNeutrons, correctElectrons,
    showHint, onCorrectAnswer, onIncorrectAnswer,
  ]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, maxScore, hintsUsed);
    } else {
      setQuizIndex(prev => prev + 1);
      setShowResult(false);
      setProtonsInput('');
      setNeutronsInput('');
      setElectronsInput('');
      setShowHint(false);
    }
  };

  const handleHint = () => {
    if (!showHint) {
      setHintsUsed(prev => prev + 1);
      setShowHint(true);
    }
  };

  // Learning Phase
  if (phase === 'learn') {
    // Use Carbon as the example element
    const exampleElement = LEVEL1_ELEMENTS.find(e => e.id === 'carbon')!;

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <span>&larr;</span> Til baka
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-violet-700">
                Stig 1: Bygging atomsins
              </h1>
              <div></div>
            </div>
          </div>

          {/* Atom Structure Overview */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Bygging atomsins
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Bohr model example */}
              <div className="flex flex-col items-center">
                <BohrModel element={exampleElement} showElectrons={true} size={220} />
                <p className="text-sm text-gray-500 mt-2">
                  Kolefni ({exampleElement.symbol}) - Massatala: {exampleElement.massNumber}
                </p>
              </div>

              {/* Particle descriptions */}
              <div className="space-y-4">
                <div className="bg-red-50 p-3 rounded-xl">
                  <div className="font-bold text-red-700">
                    Roteindir (p+)
                  </div>
                  <p className="text-sm text-gray-600">
                    Jakvaett hladnar agnir i kjarnanum. Fjoldi roteinda = saetistala (Z).
                  </p>
                  <p className="text-xs text-red-600 mt-1 font-semibold">
                    Kolefni: Z = {exampleElement.atomicNumber} &rarr; {exampleElement.atomicNumber} roteindir
                  </p>
                </div>

                <div className="bg-gray-100 p-3 rounded-xl">
                  <div className="font-bold text-gray-700">
                    Nifteindir (n)
                  </div>
                  <p className="text-sm text-gray-600">
                    Hlutlausar agnir i kjarnanum. Nifteindir = massatala - saetistala.
                  </p>
                  <p className="text-xs text-gray-700 mt-1 font-semibold">
                    Kolefni: {exampleElement.massNumber} - {exampleElement.atomicNumber} = {exampleElement.massNumber - exampleElement.atomicNumber} nifteindir
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-xl">
                  <div className="font-bold text-blue-700">
                    Rafeindir (e-)
                  </div>
                  <p className="text-sm text-gray-600">
                    Neikvaett hladnar agnir sem fljuga utan um kjarnann. I hlutlausu atomi: rafeindir = roteindir.
                  </p>
                  <p className="text-xs text-blue-600 mt-1 font-semibold">
                    Kolefni: {exampleElement.atomicNumber} rafeindir
                  </p>
                </div>
              </div>
            </div>

            {/* Key formulas */}
            <div className="mt-6 bg-violet-50 p-4 rounded-xl">
              <h3 className="font-bold text-violet-700 mb-2">Lykilformulur:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="bg-white p-3 rounded-lg">
                  <span className="font-semibold text-violet-700">Saetistala (Z)</span>
                  <span className="text-gray-600"> = fjoldi roteinda</span>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <span className="font-semibold text-violet-700">Massatala (A)</span>
                  <span className="text-gray-600"> = roteindir + nifteindir</span>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <span className="font-semibold text-violet-700">Nifteindir</span>
                  <span className="text-gray-600"> = A - Z</span>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <span className="font-semibold text-violet-700">Rafeindir</span>
                  <span className="text-gray-600"> = roteindir (hlutlaust atom)</span>
                </div>
              </div>
            </div>

            {/* Common misconception callout */}
            <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
              <div className="font-bold text-amber-800 text-sm">Athugid:</div>
              <ul className="text-sm text-gray-700 mt-1 space-y-1">
                <li>&bull; I hlutlausu atomi er fjoldi rafeinda alltaf jafn fjolda roteinda.</li>
                <li>&bull; Massatala er EKKI thad sama og atommassi a lotukerfinu!</li>
                <li>&bull; Nifteindir skipta mali - thaer akvarda hvaada samaeeta thesser er.</li>
              </ul>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              Hefja spurningakeppni &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setPhase('learn')}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <span>&larr;</span> Til baka
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-violet-700">Byggdu atomid</h1>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-violet-600">{score} stig</div>
              <div className="text-xs text-gray-500">
                {quizIndex + 1} / {quizItems.length}
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-violet-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(quizIndex / quizItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {/* Element info */}
          <div className="text-center mb-6">
            <div className="inline-block bg-violet-100 rounded-xl px-6 py-3 mb-3">
              <span className="text-4xl font-bold text-violet-800">{currentElement.symbol}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {currentElement.nameIs}
            </h2>
            <p className="text-sm text-gray-500">{currentElement.nameEn}</p>
            <div className="mt-3 flex justify-center gap-4 text-sm">
              <div className="bg-purple-100 px-4 py-2 rounded-lg">
                <span className="font-bold text-purple-700">Massatala (A):</span>{' '}
                <span className="text-purple-900 font-mono text-lg">{currentElement.massNumber}</span>
              </div>
              <div className="bg-indigo-100 px-4 py-2 rounded-lg">
                <span className="font-bold text-indigo-700">Saetistala (Z):</span>{' '}
                <span className="text-indigo-900 font-mono text-lg">{currentElement.atomicNumber}</span>
              </div>
            </div>
          </div>

          {/* Bohr Model - shows filled after answer */}
          <div className="mb-6">
            <BohrModel
              element={currentElement}
              showElectrons={showResult && isCorrect}
              size={180}
            />
          </div>

          {/* Hint */}
          {!showResult && !showHint && (
            <button
              onClick={handleHint}
              className="text-sm text-violet-600 hover:text-violet-700 mb-4 block mx-auto"
            >
              Syna visbendingu (-50 stig)
            </button>
          )}

          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-center">
              Roteindir = saetistala. Nifteindir = massatala - saetistala. Rafeindir = roteindir (hlutlaust atom).
            </div>
          )}

          {/* Input fields */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-bold text-red-700 mb-2 text-center">
                Roteindir (p+)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={protonsInput}
                onChange={e => setProtonsInput(e.target.value)}
                disabled={showResult}
                className={`w-full text-center text-2xl font-mono p-3 rounded-xl border-2 transition-colors ${
                  showResult
                    ? parseInt(protonsInput) === correctProtons
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-violet-400'
                }`}
                placeholder="?"
              />
              {showResult && (
                <div className="text-center text-sm mt-1 font-semibold">
                  {parseInt(protonsInput) === correctProtons ? (
                    <span className="text-green-600">Rett!</span>
                  ) : (
                    <span className="text-red-600">Rett svar: {correctProtons}</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 text-center">
                Nifteindir (n)
              </label>
              <input
                type="number"
                min="0"
                max="200"
                value={neutronsInput}
                onChange={e => setNeutronsInput(e.target.value)}
                disabled={showResult}
                className={`w-full text-center text-2xl font-mono p-3 rounded-xl border-2 transition-colors ${
                  showResult
                    ? parseInt(neutronsInput) === correctNeutrons
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-violet-400'
                }`}
                placeholder="?"
              />
              {showResult && (
                <div className="text-center text-sm mt-1 font-semibold">
                  {parseInt(neutronsInput) === correctNeutrons ? (
                    <span className="text-green-600">Rett!</span>
                  ) : (
                    <span className="text-red-600">Rett svar: {correctNeutrons}</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-blue-700 mb-2 text-center">
                Rafeindir (e-)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={electronsInput}
                onChange={e => setElectronsInput(e.target.value)}
                disabled={showResult}
                className={`w-full text-center text-2xl font-mono p-3 rounded-xl border-2 transition-colors ${
                  showResult
                    ? parseInt(electronsInput) === correctElectrons
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-violet-400'
                }`}
                placeholder="?"
              />
              {showResult && (
                <div className="text-center text-sm mt-1 font-semibold">
                  {parseInt(electronsInput) === correctElectrons ? (
                    <span className="text-green-600">Rett!</span>
                  ) : (
                    <span className="text-red-600">Rett svar: {correctElectrons}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Check button */}
          {!showResult && (
            <button
              onClick={handleCheck}
              disabled={!protonsInput || !neutronsInput || !electronsInput}
              className="w-full bg-violet-500 hover:bg-violet-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
            >
              Athuga svar
            </button>
          )}
        </div>

        {/* Result & Next */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? (
                  <>
                    Rett! +{showHint ? 50 : 100} stig
                  </>
                ) : (
                  'Rangt'
                )}
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>{currentElement.nameIs} ({currentElement.symbol})</strong>: Saetistala = {currentElement.atomicNumber}, Massatala = {currentElement.massNumber}
                </p>
                <p>
                  Roteindir = {correctProtons}, Nifteindir = {correctNeutrons} ({currentElement.massNumber} - {currentElement.atomicNumber}), Rafeindir = {correctElectrons}
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ljuka stigi' : 'Naesta spurning'}
            </button>
          </div>
        )}

        {/* Quick reference */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Minnisblad:</h3>
          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            <div className="bg-red-50 rounded-lg p-2">
              <div className="font-bold text-red-700">p+ = Z</div>
              <div className="text-gray-500">Saetistala</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-2">
              <div className="font-bold text-gray-700">n = A - Z</div>
              <div className="text-gray-500">Massatala - Saetistala</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2">
              <div className="font-bold text-blue-700">e- = p+</div>
              <div className="text-gray-500">Hlutlaust atom</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
