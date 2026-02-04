import { useState, useMemo } from 'react';
import { PROBLEMS } from '../data/problems';
import { shuffleArray } from '../data/substances';

interface Level3Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

type Phase = 'learn' | 'quiz';

const TOLERANCE = 0.5; // Allow +/- 0.5 for answers

export function Level3({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level3Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [streak, setStreak] = useState(0);

  // Shuffle and pick 8 problems
  const questions = useMemo(() => shuffleArray(PROBLEMS).slice(0, 8), []);

  const currentProblem = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;
  const maxScore = questions.length * 100;

  const handleSubmit = () => {
    if (showResult || !userAnswer.trim()) return;

    const numericAnswer = parseFloat(userAnswer.replace(',', '.'));
    if (isNaN(numericAnswer)) return;

    const correct = Math.abs(numericAnswer - currentProblem.answer) <= TOLERANCE;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const basePoints = showHint ? 50 : 100;
      const streakBonus = Math.min(streak * 10, 50);
      setScore(prev => prev + basePoints + streakBonus);
      setStreak(prev => prev + 1);
      onCorrectAnswer?.();
    } else {
      setStreak(0);
      onIncorrectAnswer?.();
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, maxScore, hintsUsed);
    } else {
      setCurrentIndex(prev => prev + 1);
      setShowResult(false);
      setUserAnswer('');
      setShowHint(false);
      setShowSolution(false);
    }
  };

  const handleHint = () => {
    if (!showHint) {
      setHintsUsed(prev => prev + 1);
      setShowHint(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Learning Phase
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <span>&larr;</span> Til baka
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-purple-700">
                Stig 3: St&oacute;iki&oacute;metr&iacute;a
              </h1>
              <div></div>
            </div>
          </div>

          {/* Stoichiometry Overview */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Hlutleysis&shy;st&oacute;iki&oacute;metr&iacute;a / Neutralization Stoichiometry
            </h2>

            {/* Key Formula */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-5 mb-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Grunnformula:</p>
              <div className="text-3xl font-mono font-bold text-purple-700 mb-2">
                n = M &times; V
              </div>
              <div className="text-sm text-gray-600">
                <p>n = fj&ouml;ldi m&oacute;la (mol)</p>
                <p>M = m&oacute;lst&yacute;rkleiki (mol/L)</p>
                <p>V = r&uacute;mm&aacute;l &iacute; l&iacute;trum (L)</p>
              </div>
            </div>

            {/* Steps */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-gray-700 mb-3">Skref til a&eth; leysa d&aelig;mi:</h3>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <span>Finna&eth;u fj&ouml;lda m&oacute;la efnisins sem er gefi&eth;: <strong>n = M &times; V</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <span>Nota&eth;u m&oacute;l-hlutfalli&eth; &uacute;r j&ouml;fnunni til a&eth; finna m&oacute;l &oacute;&thorn;ekkta efnisins</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <span>Reikna&eth;u r&uacute;mm&aacute;l e&eth;a m&oacute;lst&yacute;rkleika: <strong>V = n / M</strong> e&eth;a <strong>M = n / V</strong></span>
                </li>
              </ol>
            </div>

            {/* Example */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
              <h3 className="font-bold text-indigo-800 mb-3">D&aelig;mi:</h3>
              <p className="text-sm text-gray-700 mb-3">
                Hversu marga mL af 0,10 M NaOH &thorn;arf til a&eth; hlutleysa 25 mL af 0,15 M HCl?
              </p>
              <div className="bg-white rounded-lg p-3 space-y-1 text-sm font-mono text-gray-700">
                <p>HCl + NaOH &rarr; NaCl + H&#8322;O &nbsp; (hlutfall 1:1)</p>
                <p>n(HCl) = 0,15 &times; 0,025 = 0,00375 mol</p>
                <p>n(NaOH) = 0,00375 mol &nbsp; (1:1)</p>
                <p>V(NaOH) = 0,00375 / 0,10 = 0,0375 L = <strong>37,5 mL</strong></p>
              </div>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              Hefja reikni&shy;d&aelig;mi &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 md:p-8">
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
              <h1 className="text-xl font-bold text-purple-700">Reikni&shy;d&aelig;mi</h1>
              {streak > 1 && (
                <div className="text-sm text-orange-500 font-bold">{streak} &iacute; r&ouml;&eth;!</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-purple-600">{score} stig</div>
              <div className="text-xs text-gray-500">{currentIndex + 1} / {questions.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Problem Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {/* Equation reference */}
          <div className="bg-gray-50 rounded-xl p-3 mb-4 text-center">
            <span className="text-sm text-gray-500">Jafna: </span>
            <span className="font-mono font-bold text-gray-700">{currentProblem.equation}</span>
            {(currentProblem.acidCoeff !== 1 || currentProblem.baseCoeff !== 1) && (
              <span className="text-xs text-gray-500 ml-2">
                (hlutfall {currentProblem.acidCoeff}:{currentProblem.baseCoeff})
              </span>
            )}
          </div>

          {/* Question */}
          <div className="text-center mb-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              {currentProblem.questionIs}
            </p>
          </div>

          {/* Hint button */}
          {!showResult && !showHint && (
            <button
              onClick={handleHint}
              className="text-sm text-purple-600 hover:text-purple-700 mb-4 block mx-auto"
            >
              S&yacute;na v&iacute;sbendingu (-50 stig)
            </button>
          )}

          {/* Hint display */}
          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-center">
              {currentProblem.hintIs}
            </div>
          )}

          {/* Answer input */}
          {!showResult && (
            <div className="flex items-center gap-3 justify-center">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Svar..."
                className="w-40 text-center text-xl font-mono border-2 border-purple-300 rounded-xl p-3 focus:border-purple-500 focus:outline-none"
                autoFocus
              />
              <span className="text-lg font-bold text-gray-600">{currentProblem.unit}</span>
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                Sta&eth;festa
              </button>
            </div>
          )}

          {/* Tolerance note */}
          {!showResult && (
            <p className="text-xs text-gray-400 text-center mt-2">
              Svarsvid: &plusmn;{TOLERANCE} {currentProblem.unit}
            </p>
          )}
        </div>

        {/* Result & Solution */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-xl mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? (
                  <>
                    Rett!
                    <span className="ml-2 text-sm font-normal">
                      +{showHint ? 50 : 100}{streak > 0 && !showHint ? ` +${Math.min(streak * 10, 50)} r&ouml;&eth; b&oacute;nus` : ''} stig
                    </span>
                  </>
                ) : (
                  <>
                    Rangt
                    <span className="ml-2 text-sm font-normal">
                      Retta svari&eth;: <strong>{currentProblem.answer} {currentProblem.unit}</strong>
                    </span>
                  </>
                )}
              </div>

              {/* Show/hide solution */}
              {!showSolution ? (
                <button
                  onClick={() => setShowSolution(true)}
                  className="text-sm text-purple-600 hover:text-purple-700 underline"
                >
                  S&yacute;na lausn
                </button>
              ) : (
                <div className="mt-3 bg-white rounded-lg p-4">
                  <h4 className="font-bold text-gray-700 mb-2 text-sm">Lausn:</h4>
                  <div className="space-y-1">
                    {currentProblem.solutionIs.map((step, i) => (
                      <p key={i} className="text-sm font-mono text-gray-700">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Lj\u00faka stigi' : 'N\u00e6sta d\u00e6mi \u2192'}
            </button>
          </div>
        )}

        {/* Formula Reference */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Form&uacute;lur:</h3>
          <div className="grid grid-cols-3 gap-2 text-xs text-center font-mono">
            <div className="bg-purple-50 rounded-lg p-2">
              <div className="font-bold text-purple-700">n = M &times; V</div>
              <div className="text-gray-500">m&oacute;l</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-2">
              <div className="font-bold text-purple-700">V = n / M</div>
              <div className="text-gray-500">r&uacute;mm&aacute;l</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-2">
              <div className="font-bold text-purple-700">M = n / V</div>
              <div className="text-gray-500">m&oacute;lst&yacute;rkleiki</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
