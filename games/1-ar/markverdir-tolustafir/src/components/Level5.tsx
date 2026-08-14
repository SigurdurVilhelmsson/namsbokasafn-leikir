import { useState, useCallback } from 'react';
import {
  EXACT_NUMBER_TYPES,
  EXACT_NUMBER_EXAMPLES,
  IDENTIFICATION_PROBLEMS,
  MIXED_CALCULATIONS,
  EXACT_NUMBER_CONCEPT,
  COMMON_MISCONCEPTIONS,
  IdentificationProblem,
  MixedCalculation,
} from '../data/exactNumbers';

interface Level5Props {
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
}

type Phase = 'learn' | 'quiz-identify' | 'quiz-calculate';
type QuizProblem = {
  type: 'identify';
  problem: IdentificationProblem;
} | {
  type: 'calculate';
  problem: MixedCalculation;
};

export function Level5({ onComplete, onBack }: Level5Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState<Set<string>>(new Set());

  // Build quiz items: mix identification and calculation problems
  const quizItems: QuizProblem[] = [
    // 4 identification problems
    ...IDENTIFICATION_PROBLEMS.filter(p => p.difficulty === 'easy').slice(0, 2).map(p => ({
      type: 'identify' as const,
      problem: p,
    })),
    ...IDENTIFICATION_PROBLEMS.filter(p => p.difficulty === 'medium').slice(0, 2).map(p => ({
      type: 'identify' as const,
      problem: p,
    })),
    // 6 calculation problems
    ...MIXED_CALCULATIONS.filter(p => p.difficulty === 'easy').slice(0, 3).map(p => ({
      type: 'calculate' as const,
      problem: p,
    })),
    ...MIXED_CALCULATIONS.filter(p => p.difficulty === 'medium').slice(0, 2).map(p => ({
      type: 'calculate' as const,
      problem: p,
    })),
    ...MIXED_CALCULATIONS.filter(p => p.difficulty === 'hard').slice(0, 1).map(p => ({
      type: 'calculate' as const,
      problem: p,
    })),
  ];

  const currentItem = quizItems[quizIndex];
  const isLastQuestion = quizIndex >= quizItems.length - 1;
  const maxScore = quizItems.length * 100;

  // Handle identification answer
  const handleIdentifySubmit = useCallback(() => {
    if (showResult || currentItem.type !== 'identify') return;

    const problem = currentItem.problem;
    const exactValues = problem.numbers
      .filter(n => n.isExact)
      .map(n => n.value);

    const correctSelection = exactValues.every(v => selectedNumbers.has(v)) &&
      selectedNumbers.size === exactValues.length;

    setIsCorrect(correctSelection);
    setShowResult(true);

    if (correctSelection) {
      setScore(prev => prev + 100);
    }
  }, [showResult, currentItem, selectedNumbers]);

  // Handle calculation answer
  const handleCalcSubmit = useCallback(() => {
    if (showResult || !userAnswer.trim() || currentItem.type !== 'calculate') return;

    const problem = currentItem.problem;
    const normalized = userAnswer.replace(/\s+/g, '').replace(/,/g, '.').toLowerCase();
    const correctNormalized = problem.correctAnswer.replace(/\s+/g, '').replace(/,/g, '.').toLowerCase();

    // Allow numeric comparison with tolerance
    const userNum = parseFloat(normalized);
    const correctNum = parseFloat(correctNormalized);
    const numericMatch = !isNaN(userNum) && !isNaN(correctNum) &&
      Math.abs(userNum - correctNum) < 0.001;

    const correct = normalized === correctNormalized || numericMatch;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prev => prev + 100);
    }
  }, [showResult, userAnswer, currentItem]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, maxScore);
    } else {
      setQuizIndex(prev => prev + 1);
      setShowResult(false);
      setUserAnswer('');
      setSelectedNumbers(new Set());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showResult) {
        handleNext();
      } else if (currentItem.type === 'calculate') {
        handleCalcSubmit();
      }
    }
  };

  const toggleNumberSelection = (value: string) => {
    if (showResult) return;
    const newSet = new Set(selectedNumbers);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setSelectedNumbers(newSet);
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
                <span>←</span> Til baka
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-amber-700">
                Stig 5: Nákvæmar tölur
              </h1>
              <div></div>
            </div>
          </div>

          {/* Key Concept */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              {EXACT_NUMBER_CONCEPT.titleIs}
            </h2>

            <div className="bg-amber-50 p-4 rounded-xl mb-6">
              <p className="text-gray-700 whitespace-pre-line">
                {EXACT_NUMBER_CONCEPT.explanationIs}
              </p>
            </div>

            {/* Types of exact numbers */}
            <div className="grid md:grid-cols-3 gap-4">
              {EXACT_NUMBER_TYPES.map(type => (
                <div
                  key={type.id}
                  className={`p-4 rounded-xl ${
                    type.id === 'counting' ? 'bg-blue-50 border-2 border-blue-200' :
                    type.id === 'defined' ? 'bg-green-50 border-2 border-green-200' :
                    'bg-purple-50 border-2 border-purple-200'
                  }`}
                >
                  <h3 className={`font-bold mb-2 ${
                    type.id === 'counting' ? 'text-blue-700' :
                    type.id === 'defined' ? 'text-green-700' :
                    'text-purple-700'
                  }`}>
                    {type.id === 'counting' ? '🔢 ' :
                     type.id === 'defined' ? '📐 ' : '⚗️ '}
                    {type.nameIs}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                  <div className="space-y-1">
                    {type.examples.map((ex, i) => (
                      <div key={i} className="bg-white px-2 py-1 rounded text-sm font-mono">
                        {ex}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Dæmi um nákvæmar tölur
            </h2>

            <div className="space-y-3">
              {EXACT_NUMBER_EXAMPLES.slice(0, 6).map(example => (
                <div
                  key={example.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-gray-50"
                >
                  <div className={`px-3 py-1 rounded-lg font-mono font-bold ${
                    example.type === 'counting' ? 'bg-blue-200 text-blue-800' :
                    example.type === 'defined' ? 'bg-green-200 text-green-800' :
                    'bg-purple-200 text-purple-800'
                  }`}>
                    {example.value}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{example.context}</p>
                    <p className="text-sm text-gray-500">{example.whyExact}</p>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    example.type === 'counting' ? 'bg-blue-100 text-blue-700' :
                    example.type === 'defined' ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {example.type === 'counting' ? 'Talið' :
                     example.type === 'defined' ? 'Skilgreint' : 'Stuðull'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Misconceptions */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              ⚠️ Algeng mistök
            </h2>

            <div className="space-y-4">
              {COMMON_MISCONCEPTIONS.map(misc => (
                <div key={misc.id} className="border-l-4 border-red-400 pl-4">
                  <div className="bg-red-50 p-3 rounded-r-xl mb-2">
                    <p className="text-red-700 line-through">{misc.misconception}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-xl">
                    <p className="text-green-700">✓ {misc.truth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz-identify')}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              Hefja æfingar →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phase - Identification Problem
  if (currentItem.type === 'identify') {
    const problem = currentItem.problem;

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
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
                <h1 className="text-xl font-bold text-amber-700">Finndu nákvæmu tölurnar</h1>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-amber-600">{score} stig</div>
                <div className="text-xs text-gray-500">{quizIndex + 1} / {quizItems.length}</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((quizIndex + 1) / quizItems.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="text-center mb-6">
              <div className="inline-block px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 mb-4">
                Veldu nákvæmar tölur
              </div>

              <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <p className="text-lg text-gray-800">{problem.scenario}</p>
              </div>

              <p className="text-gray-600 text-sm">
                Smelltu á allar tölur sem eru <strong>nákvæmar</strong> (taldar, skilgreindar, eða stuðlar)
              </p>
            </div>

            {/* Numbers to select */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {problem.numbers.map((num, i) => (
                <button
                  key={i}
                  onClick={() => toggleNumberSelection(num.value)}
                  disabled={showResult}
                  className={`px-6 py-4 text-xl font-mono font-bold rounded-xl transition-all ${
                    showResult
                      ? num.isExact
                        ? 'bg-green-500 text-white'
                        : selectedNumbers.has(num.value)
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-400'
                      : selectedNumbers.has(num.value)
                        ? 'bg-amber-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {num.value}
                </button>
              ))}
            </div>

            {!showResult && (
              <button
                onClick={handleIdentifySubmit}
                disabled={selectedNumbers.size === 0}
                className="w-full px-6 py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Staðfesta val
              </button>
            )}
          </div>

          {/* Result & Next */}
          {showResult && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Rétt! +100 stig' : 'Rangt'}
                </div>
              </div>

              {/* Explanation for each number */}
              <div className="space-y-2 mb-4">
                {problem.numbers.map((num, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg ${
                      num.isExact ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono font-bold ${num.isExact ? 'text-green-700' : 'text-gray-700'}`}>
                        {num.value}
                      </span>
                      <span className={`text-sm ${num.isExact ? 'text-green-600' : 'text-gray-600'}`}>
                        {num.isExact ? '✓ Nákvæm' : '✗ Mæld'}: {num.reason}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors"
              >
                {isLastQuestion ? 'Ljúka stigi' : 'Næsta spurning'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Quiz Phase - Calculation Problem
  const problem = currentItem.problem;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
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
              <h1 className="text-xl font-bold text-amber-700">Útreikningur</h1>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-amber-600">{score} stig</div>
              <div className="text-xs text-gray-500">{quizIndex + 1} / {quizItems.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((quizIndex + 1) / quizItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <div className="inline-block px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700 mb-4">
              Reiknaðu með nákvæmum og mældum tölum
            </div>

            <p className="text-xl text-gray-800 mb-4">
              {problem.problem}
            </p>

            {/* Show which numbers are exact vs measured */}
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {problem.exactNumbers.length > 0 && (
                <div className="bg-green-50 px-4 py-2 rounded-lg">
                  <span className="text-sm text-green-600">Nákvæmar: </span>
                  <span className="font-mono font-bold text-green-700">
                    {problem.exactNumbers.join(', ')}
                  </span>
                </div>
              )}
              <div className="bg-gray-50 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-600">Mældar: </span>
                <span className="font-mono font-bold text-gray-700">
                  {problem.measuredNumbers.join(', ')}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm">
              Gefðu svar með réttum fjölda markverðra tölustafa
            </p>
          </div>

          {/* Answer input */}
          <div className="flex gap-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={showResult}
              placeholder="Svarið þitt..."
              className="flex-1 px-4 py-4 text-2xl font-mono border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none text-center disabled:bg-gray-100"
              autoFocus
            />
            {!showResult && (
              <button
                onClick={handleCalcSubmit}
                disabled={!userAnswer.trim()}
                className="px-6 py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Staðfesta
              </button>
            )}
          </div>
        </div>

        {/* Result & Next */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? 'Rétt! +100 stig' : 'Rangt'}
              </div>
              {!isCorrect && (
                <div className="mb-2">
                  <span className="text-gray-600">Rétt svar: </span>
                  <span className="font-mono font-bold text-lg">{problem.correctAnswer}</span>
                </div>
              )}
              <p className="text-gray-700">{problem.explanation}</p>
              <p className="text-sm text-gray-500 mt-2">
                Markverðir tölustafir: {problem.correctSigFigs}
              </p>
            </div>

            {/* Key insight */}
            {problem.exactNumbers.length > 0 && (
              <div className="bg-amber-50 p-3 rounded-xl mb-4 text-sm">
                <p className="text-amber-800">
                  <strong>Mundu:</strong> Nákvæmar tölur ({problem.exactNumbers.join(', ')}) takmarka ekki fjölda markverðra tölustafa.
                  Aðeins mældu gildin ({problem.measuredNumbers.join(', ')}) ráða nákvæmni svarsins.
                </p>
              </div>
            )}

            <button
              onClick={handleNext}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ljúka stigi' : 'Næsta spurning'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
