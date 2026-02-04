import { useState, useCallback, useMemo } from 'react';
import { LEVEL3_PROBLEMS, shuffleArray } from '../data';

interface Level3Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

type Phase = 'learn' | 'quiz';

export function Level3({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level3Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [answerInput, setAnswerInput] = useState('');

  // Shuffled quiz items
  const quizItems = useMemo(() => shuffleArray(LEVEL3_PROBLEMS), []);
  const currentProblem = quizItems[quizIndex];
  const isLastQuestion = quizIndex >= quizItems.length - 1;
  const maxScore = quizItems.length * 100;

  const handleCheck = useCallback(() => {
    if (showResult) return;

    const studentAnswer = parseFloat(answerInput);
    if (isNaN(studentAnswer)) return;

    const diff = Math.abs(studentAnswer - currentProblem.correctAnswer);
    const correct = diff <= currentProblem.tolerance;

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const basePoints = showHint ? 50 : 100;
      setScore(prev => prev + basePoints);
      onCorrectAnswer?.();
    } else {
      onIncorrectAnswer?.();
    }
  }, [showResult, answerInput, currentProblem, showHint, onCorrectAnswer, onIncorrectAnswer]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, maxScore, hintsUsed);
    } else {
      setQuizIndex(prev => prev + 1);
      setShowResult(false);
      setAnswerInput('');
      setShowHint(false);
    }
  };

  const handleHint = () => {
    if (!showHint) {
      setHintsUsed(prev => prev + 1);
      setShowHint(true);
    }
  };

  // Calculate the correct answer step by step for display
  const getCalculationSteps = () => {
    const problem = currentProblem;
    const steps = problem.isotopes.map(iso => {
      const fraction = iso.abundance / 100;
      const contribution = iso.exactMass * fraction;
      return {
        notation: iso.notation,
        mass: iso.exactMass,
        abundance: iso.abundance,
        fraction,
        contribution,
      };
    });
    const total = steps.reduce((sum, s) => sum + s.contribution, 0);
    return { steps, total };
  };

  // Learning Phase
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
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
              <h1 className="text-xl md:text-2xl font-bold text-amber-700">
                Stig 3: Medalatoemmmassi
              </h1>
              <div></div>
            </div>
          </div>

          {/* What is average atomic mass? */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Medalatoemmmassi
            </h2>

            <div className="bg-amber-50 p-4 rounded-xl mb-6">
              <p className="text-gray-700">
                Medalatommassi er <strong>vegid medaltal</strong> af massa allra samaeeta frumefnis,
                reiknoad ut fra natturulegu hlutfalli theirra. Thetta er toluna sem thu serd a lotukerfinu.
              </p>
            </div>

            {/* Formula */}
            <div className="bg-white border-2 border-amber-200 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-amber-700 mb-3 text-center">Formula:</h3>
              <div className="bg-amber-50 p-4 rounded-xl text-center font-mono text-lg">
                Medalatommassi = (massi&#8321; &times; hlutfall&#8321;) + (massi&#8322; &times; hlutfall&#8322;) + ...
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Mundu ad breyta prosentum i tugabrot (t.d. 75.77% &rarr; 0.7577)
              </p>
            </div>

            {/* Worked example: Chlorine */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-green-700 mb-3">Daemi: Klor (Cl)</h3>
              <div className="space-y-2 text-sm">
                <p>Klor hefur tvaer stodugar samaeetur:</p>
                <div className="grid grid-cols-2 gap-3 my-3">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="font-bold text-green-800">&sup3;&sup5;Cl</div>
                    <div className="text-gray-600">Massi: 34.97 u</div>
                    <div className="text-gray-600">Hlutfall: 75.77%</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <div className="font-bold text-green-800">&sup3;&sup7;Cl</div>
                    <div className="text-gray-600">Massi: 36.97 u</div>
                    <div className="text-gray-600">Hlutfall: 24.23%</div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg font-mono text-sm space-y-1">
                  <p>Medalatommassi = (34.97 &times; 0.7577) + (36.97 &times; 0.2423)</p>
                  <p className="ml-8">= 26.50 + 8.96</p>
                  <p className="ml-8 font-bold text-green-700">= 35.45 u</p>
                </div>
              </div>
            </div>

            {/* Common misconception */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
              <div className="font-bold text-amber-800 text-sm">Athugid:</div>
              <ul className="text-sm text-gray-700 mt-1 space-y-1">
                <li>&bull; Massatala er EKKI thad sama og atommassi a lotukerfinu!</li>
                <li>&bull; Atommassi a lotukerfinu er medaltal vegid eftir hlutfalli samaeeta.</li>
                <li>&bull; Thess vegna er atommassi klors 35.45 u, ekki 35 eda 37.</li>
              </ul>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              Hefja reikningsaefingar &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phase
  const calc = getCalculationSteps();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
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
              <h1 className="text-xl font-bold text-amber-700">Medalatommassi</h1>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-amber-600">{score} stig</div>
              <div className="text-xs text-gray-500">
                {quizIndex + 1} / {quizItems.length}
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(quizIndex / quizItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className="inline-block bg-amber-100 rounded-xl px-6 py-3 mb-3">
              <span className="text-3xl font-bold text-amber-800">{currentProblem.elementSymbol}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              {currentProblem.elementNameIs}
            </h2>
            <p className="text-sm text-gray-500">{currentProblem.elementNameEn}</p>
          </div>

          <p className="text-center text-gray-700 mb-4">
            Reiknaadu medalatommassa {currentProblem.elementNameIs.toLowerCase()} ut fra samaetunum:
          </p>

          {/* Isotope data table */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-600">
                  <th className="text-left pb-2">Samaeeta</th>
                  <th className="text-center pb-2">Massi (u)</th>
                  <th className="text-center pb-2">Hlutfall (%)</th>
                </tr>
              </thead>
              <tbody>
                {currentProblem.isotopes.map((iso, i) => (
                  <tr key={i} className="border-t border-gray-200">
                    <td className="py-2 font-mono font-bold text-amber-800">
                      {iso.notation}{currentProblem.elementSymbol}
                    </td>
                    <td className="py-2 text-center font-mono">{iso.exactMass.toFixed(2)}</td>
                    <td className="py-2 text-center font-mono">{iso.abundance.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Hint */}
          {!showResult && !showHint && (
            <button
              onClick={handleHint}
              className="text-sm text-amber-600 hover:text-amber-700 mb-4 block mx-auto"
            >
              Syna visbendingu (-50 stig)
            </button>
          )}

          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-center">
              {currentProblem.hintIs}
            </div>
          )}

          {/* Answer input */}
          <div className="flex items-center gap-3 mb-4">
            <label className="font-bold text-gray-700 whitespace-nowrap">
              Medalatommassi =
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="300"
              value={answerInput}
              onChange={e => setAnswerInput(e.target.value)}
              disabled={showResult}
              className={`flex-1 text-center text-xl font-mono p-3 rounded-xl border-2 transition-colors ${
                showResult
                  ? isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-amber-400'
              }`}
              placeholder="?.??"
            />
            <span className="font-bold text-gray-500">u</span>
          </div>

          <p className="text-xs text-gray-400 text-center mb-4">
            Skekkjumark: &plusmn;{currentProblem.tolerance} u
          </p>

          {/* Check button */}
          {!showResult && (
            <button
              onClick={handleCheck}
              disabled={!answerInput}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
            >
              Athuga svar
            </button>
          )}
        </div>

        {/* Result & Step-by-step solution */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? (
                  <>
                    Rett! +{showHint ? 50 : 100} stig
                  </>
                ) : (
                  <>
                    Rangt &mdash; Svar thitt: {parseFloat(answerInput).toFixed(2)} u
                  </>
                )}
              </div>

              {/* Step-by-step calculation */}
              <div className="bg-white p-3 rounded-lg text-sm font-mono space-y-1 mt-3">
                <p className="font-sans font-bold text-gray-700 mb-2">Utreikningur:</p>
                {calc.steps.map((step, i) => (
                  <p key={i}>
                    {step.notation}{currentProblem.elementSymbol}: {step.mass.toFixed(2)} &times; {step.fraction.toFixed(4)} = {step.contribution.toFixed(4)}
                  </p>
                ))}
                <div className="border-t border-gray-200 pt-1 mt-1">
                  <p className="font-bold">
                    Samtals = {calc.steps.map(s => s.contribution.toFixed(4)).join(' + ')} ={' '}
                    <span className="text-green-700">{calc.total.toFixed(2)} u</span>
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-2">{currentProblem.hintIs}</p>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ljuka stigi' : 'Naesta daemi'}
            </button>
          </div>
        )}

        {/* Formula reference */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Formula:</h3>
          <div className="text-xs text-center bg-amber-50 p-2 rounded-lg font-mono">
            Medalatommassi = &Sigma;(massi<sub>i</sub> &times; hlutfall<sub>i</sub>)
          </div>
          <p className="text-xs text-gray-400 text-center mt-1">
            Mundu ad breyta % i tugabrot (deild med 100)
          </p>
        </div>
      </div>
    </div>
  );
}
