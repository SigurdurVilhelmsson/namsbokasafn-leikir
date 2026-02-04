import { useState, useCallback, useMemo } from 'react';
import { IONIC_COMPOUNDS, SOLUBILITY_RULES } from '../data/solubility';
import { shuffleArray } from '../data/substances';

interface Level2Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

type Phase = 'learn' | 'quiz';

export function Level2({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level2Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showRulesRef, setShowRulesRef] = useState(false);

  // Randomize questions
  const questions = useMemo(() => shuffleArray(IONIC_COMPOUNDS).slice(0, 15), []);

  const currentItem = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;
  const maxScore = questions.length * 100;

  const handleAnswer = useCallback((soluble: boolean) => {
    if (showResult) return;

    setSelectedAnswer(soluble);
    const correct = soluble === currentItem.soluble;
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
  }, [showResult, currentItem, showHint, streak, onCorrectAnswer, onIncorrectAnswer]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, maxScore, hintsUsed);
    } else {
      setCurrentIndex(prev => prev + 1);
      setShowResult(false);
      setSelectedAnswer(null);
      setShowHint(false);
    }
  };

  const handleHint = () => {
    if (!showHint) {
      setHintsUsed(prev => prev + 1);
      setShowHint(true);
    }
  };

  // Learning Phase - Show solubility rules
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4 md:p-8">
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
              <h1 className="text-xl md:text-2xl font-bold text-blue-700">
                Stig 2: Leysanleikareglur
              </h1>
              <div></div>
            </div>
          </div>

          {/* Solubility Rules */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Leysanleikareglur / Solubility Rules
            </h2>
            <p className="text-center text-gray-600 mb-6 text-sm">
              &THORN;essar reglur hj&aacute;lpa &thorn;&eacute;r a&eth; sp&aacute; fyrir um hvort j&oacute;nefnasamband leysist &iacute; vatni.
            </p>

            <div className="space-y-3">
              {SOLUBILITY_RULES.map((rule, index) => (
                <div
                  key={rule.id}
                  className={`p-4 rounded-xl border-2 ${
                    rule.result === 'soluble'
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-2xl font-bold ${
                      rule.result === 'soluble' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{rule.rule}</p>
                      <p className="text-sm text-gray-500 italic">{rule.ruleEn}</p>
                      {rule.exceptions !== 'Engar mikilvægar undantekningar.' && (
                        <p className="text-sm mt-1 font-semibold text-gray-700">
                          &#x26A0; {rule.exceptions}
                        </p>
                      )}
                    </div>
                    <div className={`ml-auto px-3 py-1 rounded-full text-xs font-bold text-white ${
                      rule.result === 'soluble' ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {rule.result === 'soluble' ? 'Leysanlegt' : '\u00d3leysanlegt'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4 md:p-8">
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
              <h1 className="text-xl font-bold text-blue-700">Stig 2: Leysanleiki</h1>
              {streak > 1 && (
                <div className="text-sm text-orange-500 font-bold">&#x1F525; {streak} &iacute; r&ouml;&eth;!</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">{score} stig</div>
              <div className="text-xs text-gray-500">{currentIndex + 1} / {questions.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Solubility Rules Reference Toggle */}
        <div className="mb-4">
          <button
            onClick={() => setShowRulesRef(!showRulesRef)}
            className="w-full bg-white rounded-xl shadow p-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-blue-700">&#x1F4D6; Leysanleikareglur (uppfl&eacute;tting)</span>
            <span className="text-gray-400">{showRulesRef ? '&#x25B2;' : '&#x25BC;'}</span>
          </button>
          {showRulesRef && (
            <div className="bg-white rounded-b-xl shadow-lg p-4 space-y-2 text-sm border-t">
              {SOLUBILITY_RULES.map((rule, i) => (
                <div key={rule.id} className="flex items-start gap-2">
                  <span className={`font-bold ${rule.result === 'soluble' ? 'text-green-600' : 'text-red-600'}`}>
                    {i + 1}.
                  </span>
                  <div>
                    <span className="text-gray-700">{rule.rule}</span>
                    {rule.exceptions !== 'Engar mikilvægar undantekningar.' && (
                      <span className="text-red-600 ml-1 font-medium">({rule.exceptions})</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">&#x1F9EA;</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{currentItem.name}</h2>
            <p className="text-sm text-gray-500">{currentItem.nameEn}</p>
            <p className="text-xl font-mono text-blue-600 mt-2">{currentItem.formula}</p>
            <div className="flex justify-center gap-4 mt-3 text-sm">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                Katj&oacute;n: {currentItem.cation}
              </span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                Anj&oacute;n: {currentItem.anion}
              </span>
            </div>
          </div>

          {/* Hint button */}
          {!showResult && !showHint && (
            <button
              onClick={handleHint}
              className="text-sm text-blue-600 hover:text-blue-700 mb-4 block mx-auto"
            >
              &#x1F4A1; S&yacute;na v&iacute;sbendingu (-50 stig)
            </button>
          )}

          {/* Hint display */}
          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-center">
              &#x1F4A1; {currentItem.explanation}
            </div>
          )}

          <p className="text-center text-lg font-medium text-gray-700 mb-4">
            Er &thorn;etta efni leysanlegt &iacute; vatni?
          </p>

          {/* Answer options - Soluble / Insoluble */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(true)}
              disabled={showResult}
              className={`p-6 rounded-xl border-3 transition-all transform hover:scale-102 ${
                showResult
                  ? currentItem.soluble === true
                    ? 'border-green-500 bg-green-100 scale-105'
                    : selectedAnswer === true
                      ? 'border-red-500 bg-red-100'
                      : 'border-gray-200 opacity-40'
                  : 'border-gray-200 hover:border-green-400 hover:bg-green-50 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl">&#x2705;</span>
                <div className="text-center">
                  <div className="font-bold text-lg text-green-700">Leysanlegt</div>
                  <div className="text-xs text-gray-500">Soluble</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleAnswer(false)}
              disabled={showResult}
              className={`p-6 rounded-xl border-3 transition-all transform hover:scale-102 ${
                showResult
                  ? currentItem.soluble === false
                    ? 'border-green-500 bg-green-100 scale-105'
                    : selectedAnswer === false
                      ? 'border-red-500 bg-red-100'
                      : 'border-gray-200 opacity-40'
                  : 'border-gray-200 hover:border-red-400 hover:bg-red-50 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl">&#x274C;</span>
                <div className="text-center">
                  <div className="font-bold text-lg text-red-700">&Oacute;leysanlegt</div>
                  <div className="text-xs text-gray-500">Insoluble</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Result & Explanation */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-xl mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? (
                  <>
                    &#x2713; R&eacute;tt!
                    <span className="ml-2 text-sm font-normal">
                      +{showHint ? 50 : 100}{streak > 0 && !showHint ? ` +${Math.min(streak * 10, 50)} r\u00f6\u00f0 b\u00f3nus` : ''} stig
                    </span>
                  </>
                ) : (
                  '&#x2717; Rangt'
                )}
              </div>

              {/* Explanation */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${currentItem.soluble ? 'text-green-600' : 'text-red-600'}`}>
                    {currentItem.soluble ? '&#x2705;' : '&#x274C;'}
                  </span>
                  <span className="font-semibold">
                    {currentItem.formula} er {currentItem.soluble ? 'leysanlegt' : '\u00f3leysanlegt'}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{currentItem.explanation}</p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Lj\u00faka stigi' : 'N\u00e6sta spurning \u2192'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
