import { useState, useCallback, useMemo } from 'react';
import {
  SEPARATION_METHODS,
  SEPARATION_PROBLEMS,
  SeparationMethodId,
  SeparationMethod,
  getAllMethodIds,
} from '../data/separationMethods';
import { shuffleArray } from '../data/classifications';

interface Level4Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

type Phase = 'learn' | 'quiz-matching' | 'quiz-property' | 'complete';

export function Level4({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level4Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [selectedMethod, setSelectedMethod] = useState<SeparationMethodId | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<SeparationMethodId | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);

  // Quiz problems - 10 matching + 5 property-based = 15 total
  const matchingProblems = useMemo(() => shuffleArray(SEPARATION_PROBLEMS).slice(0, 10), []);
  const propertyProblems = useMemo(
    () => shuffleArray(SEPARATION_PROBLEMS.filter(p => p.propertyQuestion)).slice(0, 5),
    []
  );

  const currentProblem = phase === 'quiz-matching'
    ? matchingProblems[currentIndex]
    : propertyProblems[currentIndex];

  const totalProblems = matchingProblems.length + propertyProblems.length;
  const currentOverallIndex = phase === 'quiz-matching'
    ? currentIndex
    : matchingProblems.length + currentIndex;
  const maxScore = totalProblems * 100;

  // Get shuffled options for current question
  const options = useMemo(() => {
    if (!currentProblem) return [];
    const allMethods = getAllMethodIds();
    // Always include correct answer
    const otherMethods = allMethods.filter(m => m !== currentProblem.correctMethod);
    const selectedOthers = shuffleArray(otherMethods).slice(0, 3);
    return shuffleArray([currentProblem.correctMethod, ...selectedOthers]);
  }, [currentProblem, currentIndex, phase]);

  const handleAnswer = useCallback((methodId: SeparationMethodId) => {
    if (showResult || !currentProblem) return;

    setSelectedAnswer(methodId);
    const correct = methodId === currentProblem.correctMethod;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const basePoints = showHint ? 50 : 100;
      const streakBonus = Math.min(streak * 10, 50);
      setScore(prev => prev + basePoints + streakBonus);
      setStreak(prev => prev + 1);
      onCorrectAnswer();
    } else {
      setStreak(0);
      onIncorrectAnswer();
    }
  }, [showResult, currentProblem, showHint, streak, onCorrectAnswer, onIncorrectAnswer]);

  const handleNext = () => {
    if (phase === 'quiz-matching') {
      if (currentIndex >= matchingProblems.length - 1) {
        // Move to property-based questions
        setPhase('quiz-property');
        setCurrentIndex(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setShowHint(false);
      } else {
        setCurrentIndex(prev => prev + 1);
        setShowResult(false);
        setSelectedAnswer(null);
        setShowHint(false);
      }
    } else if (phase === 'quiz-property') {
      if (currentIndex >= propertyProblems.length - 1) {
        // Complete the level
        onComplete(score, maxScore, hintsUsed);
      } else {
        setCurrentIndex(prev => prev + 1);
        setShowResult(false);
        setSelectedAnswer(null);
        setShowHint(false);
      }
    }
  };

  const handleHint = () => {
    if (!showHint) {
      setHintsUsed(prev => prev + 1);
      setShowHint(true);
    }
  };

  const methods = Object.values(SEPARATION_METHODS);

  // Learning Phase
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <span>←</span> Til baka
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-teal-700">
                Stig 4: Aðskilnaðaraðferðir
              </h1>
              <div></div>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-3 text-center">
              Hvernig aðskilum við blöndur? / How do we separate mixtures?
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Smelltu á hverja aðferð til að sjá hvernig hún virkar og dæmi.
            </p>

            {/* Method Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {methods.map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(selectedMethod === method.id ? null : method.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedMethod === method.id
                      ? 'scale-105 shadow-lg'
                      : 'hover:scale-102 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: selectedMethod === method.id ? method.color : '#e5e7eb',
                    backgroundColor: selectedMethod === method.id ? `${method.color}15` : 'white',
                  }}
                >
                  <div className="text-3xl mb-2">{method.emoji}</div>
                  <div
                    className="font-bold text-sm"
                    style={{ color: method.color }}
                  >
                    {method.nameIs}
                  </div>
                  <div className="text-xs text-gray-500">{method.nameEn}</div>
                </button>
              ))}
            </div>

            {/* Selected Method Details */}
            {selectedMethod && (
              <MethodDetails method={SEPARATION_METHODS[selectedMethod]} />
            )}

            {!selectedMethod && (
              <p className="text-center text-gray-500 text-sm">
                Smelltu á aðferð til að sjá nánari upplýsingar
              </p>
            )}
          </div>

          {/* Summary Cards */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="font-bold text-gray-700 mb-4">Lykilhugtök / Key Concepts:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-50 p-3 rounded-lg">
                <span className="font-semibold text-blue-700">Stærð agna:</span>
                <span className="text-gray-600"> Síun notar mismun í stærð agna</span>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <span className="font-semibold text-purple-700">Suðumark:</span>
                <span className="text-gray-600"> Eiming notar mismunandi suðupunkt</span>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg">
                <span className="font-semibold text-amber-700">Rokgirni:</span>
                <span className="text-gray-600"> Uppgufun fjarlægir rokgjarn efni</span>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <span className="font-semibold text-green-700">Eðlismassi:</span>
                <span className="text-gray-600"> Afhelling/skilvindu nota þyngdarmismun</span>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <span className="font-semibold text-red-700">Segulræni:</span>
                <span className="text-gray-600"> Segulskilja dregur að segulrænum efnum</span>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg">
                <span className="font-semibold text-pink-700">Sækni:</span>
                <span className="text-gray-600"> Litskiljun notar mismunandi sækni</span>
              </div>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz-matching')}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              Hefja spurningakeppni →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phases (matching and property)
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
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
              <h1 className="text-xl font-bold text-teal-700">
                {phase === 'quiz-matching' ? 'Veldu rétta aðferð' : 'Hvaða eiginleiki?'}
              </h1>
              {streak > 1 && (
                <div className="text-sm text-orange-500 font-bold">🔥 {streak} í röð!</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-teal-600">{score} stig</div>
              <div className="text-xs text-gray-500">
                {currentOverallIndex + 1} / {totalProblems}
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentOverallIndex + 1) / totalProblems) * 100}%` }}
            />
          </div>
          <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
            <span className={phase === 'quiz-matching' ? 'font-bold text-teal-600' : ''}>
              1. Samsvarið
            </span>
            <span>→</span>
            <span className={phase === 'quiz-property' ? 'font-bold text-teal-600' : ''}>
              2. Eiginleikar
            </span>
          </div>
        </div>

        {currentProblem && (
          <>
            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="text-center mb-6">
                <span className="text-6xl mb-4 block">{currentProblem.emoji}</span>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{currentProblem.mixture}</h2>
                <p className="text-sm text-gray-500 mb-2">{currentProblem.mixtureEn}</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {currentProblem.components.map((comp, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hint button */}
              {!showResult && !showHint && (
                <button
                  onClick={handleHint}
                  className="text-sm text-teal-600 hover:text-teal-700 mb-4 block mx-auto"
                >
                  💡 Sýna vísbendingu (-50 stig)
                </button>
              )}

              {/* Hint display */}
              {showHint && !showResult && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-center">
                  💡 {currentProblem.hint}
                </div>
              )}

              <p className="text-center text-lg font-medium text-gray-700 mb-4">
                {phase === 'quiz-matching'
                  ? 'Hvaða aðferð myndir þú nota til að aðskilja þetta?'
                  : currentProblem.propertyQuestion}
              </p>

              {/* Answer options */}
              <div className="grid grid-cols-2 gap-3">
                {options.map(methodId => {
                  const method = SEPARATION_METHODS[methodId];
                  return (
                    <button
                      key={methodId}
                      onClick={() => handleAnswer(methodId)}
                      disabled={showResult}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        showResult
                          ? methodId === currentProblem.correctMethod
                            ? 'border-green-500 bg-green-50'
                            : selectedAnswer === methodId
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 opacity-40'
                          : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl">{method.emoji}</span>
                        <div className="text-center">
                          <div
                            className="font-bold"
                            style={{
                              color:
                                showResult && methodId === currentProblem.correctMethod
                                  ? '#22c55e'
                                  : method.color,
                            }}
                          >
                            {method.nameIs}
                          </div>
                          <div className="text-xs text-gray-500">{method.nameEn}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Result & Explanation */}
            {showResult && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                  <div className={`font-bold text-xl mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect ? (
                      <>
                        ✓ Rétt!
                        <span className="ml-2 text-sm font-normal">
                          +{showHint ? 50 : 100}
                          {streak > 0 && !showHint ? ` +${Math.min(streak * 10, 50)} röð bónus` : ''} stig
                        </span>
                      </>
                    ) : (
                      '✗ Rangt'
                    )}
                  </div>

                  {/* Explanation */}
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {SEPARATION_METHODS[currentProblem.correctMethod].emoji}
                      </span>
                      <span
                        className="font-semibold"
                        style={{ color: SEPARATION_METHODS[currentProblem.correctMethod].color }}
                      >
                        {SEPARATION_METHODS[currentProblem.correctMethod].nameIs}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{currentProblem.hint}</p>
                    <p className="text-gray-600 text-xs italic">
                      <strong>Meginregla:</strong>{' '}
                      {SEPARATION_METHODS[currentProblem.correctMethod].principle}
                    </p>
                    {phase === 'quiz-property' && currentProblem.propertyAnswer && (
                      <p className="text-teal-700 text-sm bg-teal-50 p-2 rounded">
                        <strong>Svar:</strong> {currentProblem.propertyAnswer}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-xl transition-colors"
                >
                  {phase === 'quiz-matching' && currentIndex >= matchingProblems.length - 1
                    ? 'Áfram í eiginleikaspurningar →'
                    : phase === 'quiz-property' && currentIndex >= propertyProblems.length - 1
                      ? 'Ljúka stigi'
                      : 'Næsta spurning →'}
                </button>
              </div>
            )}
          </>
        )}

        {/* Method Legend */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Aðferðir:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            {methods.slice(0, 4).map(method => (
              <div key={method.id} className="flex items-center gap-1">
                <span>{method.emoji}</span>
                <span style={{ color: method.color }}>{method.nameIs}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs mt-2">
            {methods.slice(4).map(method => (
              <div key={method.id} className="flex items-center gap-1">
                <span>{method.emoji}</span>
                <span style={{ color: method.color }}>{method.nameIs}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Method Details Component
function MethodDetails({ method }: { method: SeparationMethod }) {
  return (
    <div
      className="p-5 rounded-xl transition-all"
      style={{ backgroundColor: `${method.color}10` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="text-5xl">{method.emoji}</span>
        <div>
          <h3 className="font-bold text-xl" style={{ color: method.color }}>
            {method.nameIs}
          </h3>
          <p className="text-sm text-gray-500">{method.nameEn}</p>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{method.description}</p>

      <div className="bg-white rounded-lg p-3 mb-4">
        <div className="font-semibold text-gray-700 mb-1">Meginregla / Principle:</div>
        <div className="flex items-center gap-2">
          <span className="text-lg">⚙️</span>
          <span style={{ color: method.color }}>{method.principle}</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-500 text-sm">{method.principleEn}</span>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Dæmi / Examples:</h4>
        <div className="space-y-2">
          {method.examples.map((example, i) => (
            <div key={i} className="bg-white rounded-lg p-3 flex items-center gap-3">
              <div className="flex-1">
                <div className="font-medium text-gray-800">{example.mixture}</div>
                <div className="text-xs text-gray-500">{example.mixtureEn}</div>
              </div>
              <div className="text-xl">→</div>
              <div className="flex-1 text-right">
                <div className="font-medium" style={{ color: method.color }}>
                  {example.result}
                </div>
                <div className="text-xs text-gray-500">{example.resultEn}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
