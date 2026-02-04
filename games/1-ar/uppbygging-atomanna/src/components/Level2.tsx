import { useState, useCallback, useMemo } from 'react';
import { LEVEL2_ISOTOPES, shuffleArray } from '../data';

interface Level2Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

type Phase = 'learn' | 'quiz';

/**
 * Isotope notation component
 * Renders proper isotope notation with superscript mass number and subscript atomic number
 */
function IsotopeNotation({
  symbol,
  massNumber,
  atomicNumber,
  size = 'large',
}: {
  symbol: string;
  massNumber: number;
  atomicNumber: number;
  size?: 'small' | 'large';
}) {
  const textSize = size === 'large' ? 'text-4xl' : 'text-xl';
  const superSize = size === 'large' ? 'text-xl' : 'text-sm';

  return (
    <span className="inline-flex items-baseline font-serif">
      <span className="flex flex-col items-end mr-0.5">
        <span className={`${superSize} font-semibold leading-tight`}>{massNumber}</span>
        <span className={`${superSize} font-semibold leading-tight text-gray-500`}>{atomicNumber}</span>
      </span>
      <span className={`${textSize} font-bold`}>{symbol}</span>
    </span>
  );
}

export function Level2({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level2Props) {
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
  const quizItems = useMemo(() => shuffleArray(LEVEL2_ISOTOPES), []);
  const currentIsotope = quizItems[quizIndex];
  const isLastQuestion = quizIndex >= quizItems.length - 1;
  const maxScore = quizItems.length * 100;

  const correctProtons = currentIsotope.atomicNumber;
  const correctNeutrons = currentIsotope.massNumber - currentIsotope.atomicNumber;
  const correctElectrons = currentIsotope.atomicNumber; // neutral atom

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
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4 md:p-8">
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
              <h1 className="text-xl md:text-2xl font-bold text-emerald-700">
                Stig 2: Samaeetur
              </h1>
              <div></div>
            </div>
          </div>

          {/* What are isotopes? */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Hvad eru samaeetur?
            </h2>

            <div className="bg-emerald-50 p-4 rounded-xl mb-6">
              <p className="text-gray-700">
                Samaeetur eru atom sama frumefnis sem hafa mismunandi fjolda nifteinda.
                Thaer hafa somu saetistolu (Z) en mismunandi massatolu (A).
              </p>
            </div>

            {/* Isotope notation explanation */}
            <div className="bg-white border-2 border-emerald-200 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-emerald-700 mb-4 text-center">Taknmal samaeetu</h3>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <IsotopeNotation symbol="C" massNumber={12} atomicNumber={6} size="large" />
                    <p className="text-sm text-gray-500 mt-2">Kolefni-12</p>
                    <p className="text-xs text-gray-400">6p+, 6n, 6e-</p>
                  </div>
                  <div className="text-center">
                    <IsotopeNotation symbol="C" massNumber={14} atomicNumber={6} size="large" />
                    <p className="text-sm text-gray-500 mt-2">Kolefni-14</p>
                    <p className="text-xs text-gray-400">6p+, 8n, 6e-</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 text-center max-w-md">
                  <p>Badar samaeetur hafa <strong>6 roteindir</strong> (thaer eru badar kolefni!)</p>
                  <p className="mt-1">En C-14 hefur <strong>2 nifteindir meira</strong> en C-12.</p>
                </div>
              </div>
            </div>

            {/* Examples grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {LEVEL2_ISOTOPES.slice(0, 6).map(iso => (
                <div key={iso.id} className="bg-gray-50 p-3 rounded-xl text-center">
                  <IsotopeNotation
                    symbol={iso.symbol}
                    massNumber={iso.massNumber}
                    atomicNumber={iso.atomicNumber}
                    size="small"
                  />
                  <div className="text-xs text-gray-500 mt-1">{iso.nameIs}</div>
                  <div className="text-xs text-gray-400">
                    {iso.atomicNumber}p+, {iso.massNumber - iso.atomicNumber}n
                  </div>
                </div>
              ))}
            </div>

            {/* Key misconception */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
              <div className="font-bold text-amber-800 text-sm">Mikilvaeaegt:</div>
              <p className="text-sm text-gray-700 mt-1">
                Nifteindir skipta mali! Thaer akvarda hvaada samaeeta frumefnisins thetta er.
                Somu roteindir og rafeindir, en mismunandi nifteindir.
              </p>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4 md:p-8">
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
              <h1 className="text-xl font-bold text-emerald-700">Samaeetur</h1>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-emerald-600">{score} stig</div>
              <div className="text-xs text-gray-500">
                {quizIndex + 1} / {quizItems.length}
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(quizIndex / quizItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {/* Isotope notation display */}
          <div className="text-center mb-6">
            <div className="inline-block bg-emerald-50 rounded-xl px-8 py-4 mb-3">
              <IsotopeNotation
                symbol={currentIsotope.symbol}
                massNumber={currentIsotope.massNumber}
                atomicNumber={currentIsotope.atomicNumber}
                size="large"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {currentIsotope.nameIs}
            </h2>
            <p className="text-sm text-gray-500">{currentIsotope.nameEn}</p>
            <div className="mt-3 flex justify-center gap-4 text-sm">
              <div className="bg-emerald-100 px-4 py-2 rounded-lg">
                <span className="font-bold text-emerald-700">A =</span>{' '}
                <span className="text-emerald-900 font-mono text-lg">{currentIsotope.massNumber}</span>
              </div>
              <div className="bg-teal-100 px-4 py-2 rounded-lg">
                <span className="font-bold text-teal-700">Z =</span>{' '}
                <span className="text-teal-900 font-mono text-lg">{currentIsotope.atomicNumber}</span>
              </div>
            </div>
          </div>

          {/* Hint */}
          {!showResult && !showHint && (
            <button
              onClick={handleHint}
              className="text-sm text-emerald-600 hover:text-emerald-700 mb-4 block mx-auto"
            >
              Syna visbendingu (-50 stig)
            </button>
          )}

          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-center">
              {currentIsotope.hintIs}
            </div>
          )}

          <p className="text-center text-lg font-medium text-gray-700 mb-4">
            Hversu margar agnir eru i thessu atomi?
          </p>

          {/* Input fields */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-bold text-red-700 mb-2 text-center">
                Roteindir (p+)
              </label>
              <input
                type="number"
                min="0"
                max="200"
                value={protonsInput}
                onChange={e => setProtonsInput(e.target.value)}
                disabled={showResult}
                className={`w-full text-center text-2xl font-mono p-3 rounded-xl border-2 transition-colors ${
                  showResult
                    ? parseInt(protonsInput) === correctProtons
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-emerald-400'
                }`}
                placeholder="?"
              />
              {showResult && (
                <div className="text-center text-sm mt-1 font-semibold">
                  {parseInt(protonsInput) === correctProtons ? (
                    <span className="text-green-600">Rett!</span>
                  ) : (
                    <span className="text-red-600">Rett: {correctProtons}</span>
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
                    : 'border-gray-200 focus:border-emerald-400'
                }`}
                placeholder="?"
              />
              {showResult && (
                <div className="text-center text-sm mt-1 font-semibold">
                  {parseInt(neutronsInput) === correctNeutrons ? (
                    <span className="text-green-600">Rett!</span>
                  ) : (
                    <span className="text-red-600">Rett: {correctNeutrons}</span>
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
                max="200"
                value={electronsInput}
                onChange={e => setElectronsInput(e.target.value)}
                disabled={showResult}
                className={`w-full text-center text-2xl font-mono p-3 rounded-xl border-2 transition-colors ${
                  showResult
                    ? parseInt(electronsInput) === correctElectrons
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-emerald-400'
                }`}
                placeholder="?"
              />
              {showResult && (
                <div className="text-center text-sm mt-1 font-semibold">
                  {parseInt(electronsInput) === correctElectrons ? (
                    <span className="text-green-600">Rett!</span>
                  ) : (
                    <span className="text-red-600">Rett: {correctElectrons}</span>
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
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
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
                <p>{currentIsotope.hintIs}</p>
                <p className="mt-2">
                  <strong>p+ = {correctProtons}</strong> (saetistala = Z),{' '}
                  <strong>n = {correctNeutrons}</strong> ({currentIsotope.massNumber} - {currentIsotope.atomicNumber}),{' '}
                  <strong>e- = {correctElectrons}</strong> (hlutlaust atom)
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-colors"
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
