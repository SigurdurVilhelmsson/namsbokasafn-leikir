import { useState, useCallback, useEffect } from 'react';
import { SCI_NOTATION_PROBLEMS, SciNotationProblem } from '../data/sigfigs';

interface Level3Props {
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
}

type Phase = 'learn' | 'quiz';

export function Level3({ onComplete, onBack }: Level3Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  // Quiz items: 10 questions
  const quizItems: SciNotationProblem[] = [
    ...SCI_NOTATION_PROBLEMS.filter(p => p.difficulty === 'easy').slice(0, 4),
    ...SCI_NOTATION_PROBLEMS.filter(p => p.difficulty === 'medium').slice(0, 4),
    ...SCI_NOTATION_PROBLEMS.filter(p => p.difficulty === 'hard').slice(0, 2),
  ];

  const currentItem = quizItems[quizIndex];
  const isLastQuestion = quizIndex >= quizItems.length - 1;
  const maxScore = quizItems.length * 100;

  // Timer
  useEffect(() => {
    if (!timerActive || showResult) return;

    if (timeLeft <= 0) {
      handleSubmit(true);
      return;
    }

    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive, showResult]);

  // Start timer when entering quiz phase
  useEffect(() => {
    if (phase === 'quiz') {
      setTimerActive(true);
    }
  }, [phase]);

  // Reset timer for each question
  useEffect(() => {
    if (phase === 'quiz' && !showResult) {
      setTimeLeft(30);
    }
  }, [quizIndex, phase, showResult]);

  // Normalize answer for comparison
  const normalizeAnswer = (answer: string): string => {
    return answer
      .replace(/\s+/g, '')
      .replace(/×/g, 'x')
      .replace(/\*/g, 'x')
      .replace(/X/g, 'x')
      .replace(/\^/g, '')
      .replace(/10/g, '10')
      .toLowerCase();
  };

  const handleSubmit = useCallback((timeout = false) => {
    if (showResult) return;

    if (timeout || !userAnswer.trim()) {
      setIsCorrect(false);
      setShowResult(true);
      return;
    }

    const normalized = normalizeAnswer(userAnswer);
    const correctNormalized = normalizeAnswer(currentItem.correctAnswer);

    // Handle numeric comparison for simple answers
    const userNum = parseFloat(userAnswer.replace(/[^\d.-]/g, ''));
    const correctNum = parseFloat(currentItem.correctAnswer.replace(/[^\d.-]/g, ''));
    const numericMatch = !isNaN(userNum) && !isNaN(correctNum) && Math.abs(userNum - correctNum) < 0.001;

    const correct = normalized === correctNormalized || numericMatch;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      // Bonus for quick answers
      const timeBonus = Math.floor(timeLeft / 5) * 10;
      setScore(prev => prev + 100 + timeBonus);
    }
  }, [showResult, userAnswer, currentItem, timeLeft]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, maxScore);
    } else {
      setQuizIndex(prev => prev + 1);
      setShowResult(false);
      setUserAnswer('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showResult) {
        handleNext();
      } else {
        handleSubmit();
      }
    }
  };

  // Learning Phase
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 md:p-8">
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
              <h1 className="text-xl md:text-2xl font-bold text-purple-700">
                Stig 3: Vísindaritháttur
              </h1>
              <div></div>
            </div>
          </div>

          {/* Scientific Notation Explanation */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Hvað er vísindaritháttur?
            </h2>

            <div className="text-center mb-6">
              <div className="inline-block bg-purple-100 px-6 py-4 rounded-xl">
                <span className="text-3xl font-mono">a × 10<sup>n</sup></span>
              </div>
              <p className="text-gray-600 mt-2">
                þar sem 1 ≤ a &lt; 10 og n er heiltala
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Large numbers */}
              <div className="bg-blue-50 p-5 rounded-xl">
                <h3 className="font-bold text-blue-700 text-lg mb-3">
                  Stórar tölur (jákvæður veldisvísir)
                </h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="bg-white p-2 rounded">
                    4500 = 4.5 × 10<sup>3</sup>
                    <span className="text-gray-500 ml-2">(komman færist 3 til vinstri)</span>
                  </div>
                  <div className="bg-white p-2 rounded">
                    6020000 = 6.02 × 10<sup>6</sup>
                  </div>
                </div>
              </div>

              {/* Small numbers */}
              <div className="bg-pink-50 p-5 rounded-xl">
                <h3 className="font-bold text-pink-700 text-lg mb-3">
                  Litlar tölur (neikvæður veldisvísir)
                </h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="bg-white p-2 rounded">
                    0.0032 = 3.2 × 10<sup>-3</sup>
                    <span className="text-gray-500 ml-2">(komman færist 3 til hægri)</span>
                  </div>
                  <div className="bg-white p-2 rounded">
                    0.000045 = 4.5 × 10<sup>-5</sup>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculations */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl">
              <h3 className="font-bold text-amber-800 mb-3">Reikningar í vísindarithátt:</h3>
              <div className="grid md:grid-cols-2 gap-4 font-mono text-sm">
                <div className="bg-white p-3 rounded">
                  <div className="text-gray-700 mb-1">Margföldun:</div>
                  <div>(3 × 10<sup>2</sup>) × (2 × 10<sup>3</sup>)</div>
                  <div>= (3 × 2) × 10<sup>2+3</sup></div>
                  <div className="text-green-600 font-bold">= 6 × 10<sup>5</sup></div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="text-gray-700 mb-1">Deiling:</div>
                  <div>(6 × 10<sup>4</sup>) ÷ (2 × 10<sup>2</sup>)</div>
                  <div>= (6 ÷ 2) × 10<sup>4-2</sup></div>
                  <div className="text-green-600 font-bold">= 3 × 10<sup>2</sup></div>
                </div>
              </div>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              Hefja tímaðar æfingar →
            </button>
            <p className="text-gray-500 mt-2">30 sekúndur á hverja spurningu</p>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => {
                setTimerActive(false);
                setPhase('learn');
              }}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <span>←</span> Til baka
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-purple-700">Vísindaritháttur</h1>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-purple-600">{score} stig</div>
              <div className="text-xs text-gray-500">{quizIndex + 1} / {quizItems.length}</div>
            </div>
          </div>

          {/* Timer bar */}
          <div className="relative w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${
                timeLeft > 20 ? 'bg-green-500' :
                timeLeft > 10 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-600">
              {timeLeft}s
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <div className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
              currentItem.type === 'to-scientific' ? 'bg-blue-100 text-blue-700' :
              currentItem.type === 'from-scientific' ? 'bg-pink-100 text-pink-700' :
              'bg-amber-100 text-amber-700'
            }`}>
              {currentItem.type === 'to-scientific' ? 'Umbreyta í vísindarithátt' :
               currentItem.type === 'from-scientific' ? 'Umbreyta úr vísindarithátt' :
               'Reikningur'}
            </div>

            <p className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
              {currentItem.question}
            </p>

            {currentItem.value && (
              <div className="text-4xl font-mono font-bold text-purple-700 py-2">
                {currentItem.value}
              </div>
            )}
          </div>

          {/* Answer input with special characters helper */}
          <div className="mb-3">
            <div className="flex gap-2 mb-2 justify-center flex-wrap">
              {['×', '⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '⁻'].map(char => (
                <button
                  key={char}
                  onClick={() => setUserAnswer(prev => prev + char)}
                  disabled={showResult}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg font-mono text-lg transition-colors disabled:opacity-50"
                >
                  {char}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={showResult}
              placeholder="Svarið þitt..."
              className="flex-1 px-4 py-4 text-2xl font-mono border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-center disabled:bg-gray-100"
              autoFocus
            />
            {!showResult && (
              <button
                onClick={() => handleSubmit()}
                disabled={!userAnswer.trim()}
                className="px-6 py-4 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                {isCorrect
                  ? `Rétt! +${100 + Math.floor(timeLeft / 5) * 10} stig`
                  : timeLeft === 0 ? 'Tíminn rann út!' : 'Rangt'}
              </div>
              {!isCorrect && (
                <div className="mb-2">
                  <span className="text-gray-600">Rétt svar: </span>
                  <span className="font-mono font-bold text-lg">{currentItem.correctAnswer}</span>
                </div>
              )}
              <p className="text-gray-700">{currentItem.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ljúka stigi' : 'Næsta spurning'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
