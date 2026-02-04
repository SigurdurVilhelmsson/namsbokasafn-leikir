import { useState, useCallback, useMemo } from 'react';
import { REACTIONS } from '../data/reactions';
import { shuffleArray } from '../data/substances';

interface Level3Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

type QuizStep = 'predict' | 'formula' | 'result';

export function Level3({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level3Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);

  // For precipitation prediction
  const [predictedPrecipitate, setPredictedPrecipitate] = useState<boolean | null>(null);
  const [formulaInput, setFormulaInput] = useState('');
  const [quizStep, setQuizStep] = useState<QuizStep>('predict');
  const [predictionCorrect, setPredictionCorrect] = useState(false);
  const [formulaCorrect, setFormulaCorrect] = useState(false);

  // Randomize all questions
  const questions = useMemo(() => shuffleArray(REACTIONS).slice(0, 12), []);

  const currentItem = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;
  const maxScore = questions.length * 150; // 100 for prediction + 50 for formula

  // Normalize formula for comparison (remove spaces, lowercase, handle subscripts)
  const normalizeFormula = (formula: string): string => {
    return formula
      .replace(/\s+/g, '')
      .replace(/\(s\)/g, '')
      .replace(/\(aq\)/g, '')
      .trim();
  };

  const handlePrediction = useCallback((formsPrecipitate: boolean) => {
    if (quizStep !== 'predict') return;

    setPredictedPrecipitate(formsPrecipitate);
    const correct = formsPrecipitate === currentItem.formsPrecipitate;
    setPredictionCorrect(correct);

    if (correct && currentItem.formsPrecipitate && currentItem.precipitate) {
      // If correctly predicted precipitate, ask for formula
      setQuizStep('formula');
    } else {
      // Either wrong, or correctly predicted no precipitate
      setIsCorrect(correct);
      setShowResult(true);
      setQuizStep('result');

      if (correct) {
        setScore(prev => prev + 100);
        setStreak(prev => prev + 1);
        setTotalCorrect(prev => prev + 1);
        onCorrectAnswer?.();
      } else {
        setStreak(0);
        onIncorrectAnswer?.();
      }
    }
  }, [quizStep, currentItem, onCorrectAnswer, onIncorrectAnswer]);

  const handleFormulaSubmit = useCallback(() => {
    if (quizStep !== 'formula' || !currentItem.precipitate) return;

    const expectedFormula = normalizeFormula(currentItem.precipitate);
    const userFormula = normalizeFormula(formulaInput);

    const correct = userFormula === expectedFormula;
    setFormulaCorrect(correct);
    setIsCorrect(true); // Prediction was correct
    setShowResult(true);
    setQuizStep('result');

    // 100 for prediction + 50 for correct formula
    const formulaPoints = correct ? 50 : 0;
    const streakBonus = Math.min(streak * 10, 50);
    setScore(prev => prev + 100 + formulaPoints + streakBonus);
    setStreak(prev => prev + 1);
    setTotalCorrect(prev => prev + 1);
    onCorrectAnswer?.();
  }, [quizStep, currentItem, formulaInput, streak, onCorrectAnswer]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, maxScore, 0);
    } else {
      setCurrentIndex(prev => prev + 1);
      setShowResult(false);
      setPredictedPrecipitate(null);
      setFormulaInput('');
      setQuizStep('predict');
      setPredictionCorrect(false);
      setFormulaCorrect(false);
    }
  };

  // Mixing animation visual
  function MixingBeakers() {
    return (
      <div className="flex items-center justify-center gap-2 my-4">
        <div className="flex flex-col items-center">
          <svg width="70" height="80" viewBox="0 0 70 80">
            {/* Left beaker */}
            <path d="M10,20 L10,65 Q10,75 20,75 L50,75 Q60,75 60,65 L60,20" fill="none" stroke="#60a5fa" strokeWidth="2" />
            <rect x="11" y="35" width="48" height="39" rx="4" fill="#93c5fd" opacity="0.6" />
            <text x="35" y="15" textAnchor="middle" fontSize="10" fill="#1e40af" fontWeight="bold">
              {currentItem.reagent1.replace('(aq)', '')}
            </text>
          </svg>
        </div>
        <div className="text-3xl font-bold text-gray-400">+</div>
        <div className="flex flex-col items-center">
          <svg width="70" height="80" viewBox="0 0 70 80">
            {/* Right beaker */}
            <path d="M10,20 L10,65 Q10,75 20,75 L50,75 Q60,75 60,65 L60,20" fill="none" stroke="#a78bfa" strokeWidth="2" />
            <rect x="11" y="35" width="48" height="39" rx="4" fill="#c4b5fd" opacity="0.6" />
            <text x="35" y="15" textAnchor="middle" fontSize="10" fill="#5b21b6" fontWeight="bold">
              {currentItem.reagent2.replace('(aq)', '')}
            </text>
          </svg>
        </div>
        {showResult && currentItem.formsPrecipitate && (
          <>
            <div className="text-3xl font-bold text-gray-400">&rarr;</div>
            <div className="flex flex-col items-center">
              <svg width="70" height="80" viewBox="0 0 70 80">
                {/* Result beaker with precipitate */}
                <path d="M10,20 L10,65 Q10,75 20,75 L50,75 Q60,75 60,65 L60,20" fill="none" stroke="#14b8a6" strokeWidth="2" />
                <rect x="11" y="35" width="48" height="39" rx="4" fill="#99f6e4" opacity="0.6" />
                {/* Precipitate at bottom */}
                <ellipse cx="35" cy="70" rx="20" ry="5" fill="#f97316" opacity="0.7" />
                <text x="35" y="15" textAnchor="middle" fontSize="9" fill="#0f766e" fontWeight="bold">
                  &#x2B07; {currentItem.precipitate?.replace('(s)', '')}
                </text>
              </svg>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <span>&larr;</span> Til baka
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-teal-700">Stig 3: Botnfallshv&ouml;rf</h1>
              <div className="flex items-center justify-center gap-4 text-sm">
                {streak > 1 && (
                  <span className="text-orange-500 font-bold">&#x1F525; {streak} &iacute; r&ouml;&eth;!</span>
                )}
                <span className="text-gray-500">&#x2713; {totalCorrect}/{currentIndex + (showResult ? 1 : 0)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-teal-600">{score} stig</div>
              <div className="text-xs text-gray-500">{currentIndex + 1} / {questions.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {/* Beakers visual */}
          <MixingBeakers />

          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Blanda lausnum saman:</h2>
            <div className="flex justify-center items-center gap-3 mt-2">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-mono font-bold">
                {currentItem.reagent1}
              </div>
              <span className="text-xl font-bold text-gray-400">+</span>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-mono font-bold">
                {currentItem.reagent2}
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
              <span>{currentItem.reagent1Name}</span>
              <span>+</span>
              <span>{currentItem.reagent2Name}</span>
            </div>
          </div>

          {/* Step 1: Predict if precipitate forms */}
          {quizStep === 'predict' && (
            <>
              <p className="text-center text-lg font-medium text-gray-700 mb-4">
                Myndast botnfall?
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handlePrediction(true)}
                  className="p-6 rounded-xl border-2 border-gray-200 hover:border-teal-400 hover:bg-teal-50 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">&#x2B07;&#xFE0F;</span>
                    <div className="font-bold text-lg text-teal-700">J&aacute;, botnfall</div>
                    <div className="text-xs text-gray-500">Yes, precipitate</div>
                  </div>
                </button>
                <button
                  onClick={() => handlePrediction(false)}
                  className="p-6 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">&#x1F4A7;</span>
                    <div className="font-bold text-lg text-blue-700">Nei, engin</div>
                    <div className="text-xs text-gray-500">No precipitate</div>
                  </div>
                </button>
              </div>
            </>
          )}

          {/* Step 2: Write precipitate formula (if predicted correctly) */}
          {quizStep === 'formula' && (
            <>
              <div className="bg-green-100 rounded-xl p-3 mb-4 text-center">
                <span className="text-green-700 font-bold">&#x2713; R&eacute;tt! Botnfall myndast.</span>
              </div>
              <p className="text-center text-lg font-medium text-gray-700 mb-4">
                Hva&eth; er efnaform&uacute;la botnfallsins?
              </p>
              <div className="flex gap-3 items-center justify-center">
                <input
                  type="text"
                  value={formulaInput}
                  onChange={(e) => setFormulaInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && formulaInput.trim() && handleFormulaSubmit()}
                  placeholder="T.d. AgCl(s)"
                  className="border-2 border-gray-300 rounded-xl px-4 py-3 text-lg font-mono text-center focus:border-teal-500 focus:outline-none w-48"
                  autoFocus
                />
                <button
                  onClick={handleFormulaSubmit}
                  disabled={!formulaInput.trim()}
                  className="bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  Athuga
                </button>
              </div>
              <p className="text-center text-xs text-gray-500 mt-2">
                Skrifa&eth;u form&uacute;luna me&eth; (s) t.d. AgCl(s), BaSO&#x2084;(s)
              </p>
            </>
          )}
        </div>

        {/* Result */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-xl mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? (
                  <>
                    &#x2713; R&eacute;tt!
                    <span className="ml-2 text-sm font-normal">
                      +100 stig
                      {predictionCorrect && currentItem.formsPrecipitate && (
                        formulaCorrect ? ' +50 form\u00fala b\u00f3nus' : ''
                      )}
                      {streak > 1 && ` +${Math.min((streak - 1) * 10, 50)} r\u00f6\u00f0 b\u00f3nus`}
                    </span>
                  </>
                ) : (
                  predictedPrecipitate !== currentItem.formsPrecipitate
                    ? '&#x2717; Rangt - sp&aacute;in var r&ouml;ng'
                    : '&#x2717; Rangt'
                )}
              </div>

              {/* Explanation */}
              <div className="mt-3 space-y-2">
                {currentItem.formsPrecipitate ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">&#x2B07;&#xFE0F;</span>
                      <span className="font-semibold text-teal-700">
                        Botnfall myndast: {currentItem.precipitate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{currentItem.precipitateName}</p>

                    {/* Show formula feedback if they entered one */}
                    {predictionCorrect && !formulaCorrect && currentItem.precipitate && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-sm">
                        <span className="font-medium text-yellow-700">
                          R&eacute;tt form&uacute;la: <span className="font-mono">{currentItem.precipitate}</span>
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">&#x1F4A7;</span>
                    <span className="font-semibold text-blue-700">
                      Ekkert botnfall - &ouml;ll efni eru leysanleg
                    </span>
                  </div>
                )}

                <p className="text-gray-700 text-sm">{currentItem.explanation}</p>

                {/* Show equations if available */}
                {currentItem.molecularEquation && (
                  <div className="bg-gray-50 rounded-lg p-3 mt-2 space-y-1">
                    <div className="text-xs text-gray-500 font-semibold">Sameindarjafna:</div>
                    <div className="font-mono text-sm text-gray-700">{currentItem.molecularEquation}</div>
                    {currentItem.netIonicEquation && (
                      <>
                        <div className="text-xs text-gray-500 font-semibold mt-2">Nett&oacute; j&oacute;najafna:</div>
                        <div className="font-mono text-sm text-gray-700">{currentItem.netIonicEquation}</div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Lj\u00faka stigi' : 'N\u00e6sta spurning \u2192'}
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="bg-white rounded-xl p-3 shadow">
            <div className="text-2xl font-bold text-teal-600">{streak}</div>
            <div className="text-xs text-gray-500">R&ouml;&eth;</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow">
            <div className="text-2xl font-bold text-green-600">{totalCorrect}</div>
            <div className="text-xs text-gray-500">R&eacute;tt</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow">
            <div className="text-2xl font-bold text-blue-600">
              {totalCorrect > 0 ? Math.round((totalCorrect / (currentIndex + (showResult ? 1 : 0))) * 100) : 0}%
            </div>
            <div className="text-xs text-gray-500">N&aacute;kv&aelig;mni</div>
          </div>
        </div>
      </div>
    </div>
  );
}
