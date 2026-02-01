import { useState, useCallback } from 'react';
import { SIG_FIG_CALCULATIONS, SigFigCalculation } from '../data/sigfigs';

interface Level2Props {
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
}

type Phase = 'learn' | 'quiz';

export function Level2({ onComplete, onBack }: Level2Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  // Quiz items: 10 questions
  const quizItems: SigFigCalculation[] = [
    ...SIG_FIG_CALCULATIONS.filter(c => c.difficulty === 'easy').slice(0, 4),
    ...SIG_FIG_CALCULATIONS.filter(c => c.difficulty === 'medium').slice(0, 4),
    ...SIG_FIG_CALCULATIONS.filter(c => c.difficulty === 'hard').slice(0, 2),
  ];

  const currentItem = quizItems[quizIndex];
  const isLastQuestion = quizIndex >= quizItems.length - 1;
  const maxScore = quizItems.length * 100;

  // Normalize answer for comparison
  const normalizeAnswer = (answer: string): string => {
    return answer
      .replace(/\s+/g, '')
      .replace(/×/g, 'x')
      .replace(/\*/g, 'x')
      .replace(/\^/g, '')
      .toLowerCase();
  };

  const handleSubmit = useCallback(() => {
    if (showResult || !userAnswer.trim()) return;

    const normalized = normalizeAnswer(userAnswer);
    const correctNormalized = normalizeAnswer(currentItem.correctAnswer);

    // Also check if numeric value matches (for simpler answers like "13.8")
    const numericMatch = parseFloat(userAnswer) === parseFloat(currentItem.correctAnswer);

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4 md:p-8">
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
              <h1 className="text-xl md:text-2xl font-bold text-teal-700">
                Stig 2: Reikningar með markverða tölustafi
              </h1>
              <div></div>
            </div>
          </div>

          {/* Rules */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Tvær mismunandi reglur
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Addition/Subtraction */}
              <div className="bg-blue-50 p-5 rounded-xl">
                <h3 className="font-bold text-blue-700 text-lg mb-3 flex items-center gap-2">
                  <span className="text-2xl">+−</span>
                  Samlagning og frádráttur
                </h3>
                <p className="text-gray-700 mb-3">
                  Notum <strong>fjölda aukastafa</strong> (decimal places).
                </p>
                <div className="bg-white p-3 rounded-lg font-mono text-sm">
                  <div>12.<span className="text-blue-600 font-bold">5</span> + 1.<span className="text-blue-600">32</span> = 13.82</div>
                  <div className="text-gray-500">↓</div>
                  <div>= 13.<span className="text-green-600 font-bold">8</span></div>
                  <div className="text-xs text-gray-500 mt-1">12.5 hefur 1 aukastaf → svar með 1 aukastaf</div>
                </div>
              </div>

              {/* Multiplication/Division */}
              <div className="bg-purple-50 p-5 rounded-xl">
                <h3 className="font-bold text-purple-700 text-lg mb-3 flex items-center gap-2">
                  <span className="text-2xl">×÷</span>
                  Margföldun og deiling
                </h3>
                <p className="text-gray-700 mb-3">
                  Notum <strong>fjölda markverðra tölustafa</strong>.
                </p>
                <div className="bg-white p-3 rounded-lg font-mono text-sm">
                  <div><span className="text-purple-600 font-bold">2.5</span> × <span className="text-purple-600">3.42</span> = 8.55</div>
                  <div className="text-gray-500">↓</div>
                  <div>= <span className="text-green-600 font-bold">8.6</span></div>
                  <div className="text-xs text-gray-500 mt-1">2.5 hefur 2 markverða → svar með 2 markverðum</div>
                </div>
              </div>
            </div>

            {/* Key principle */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border-l-4 border-amber-500">
              <p className="font-medium text-amber-800">
                <strong>Mikilvægt:</strong> Nákvæmni svarsins ræðst af þeirri mælingu sem er <em>minnst</em> nákvæm.
              </p>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              Hefja æfingar →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4 md:p-8">
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
              <h1 className="text-xl font-bold text-teal-700">Reikningar</h1>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-teal-600">{score} stig</div>
              <div className="text-xs text-gray-500">{quizIndex + 1} / {quizItems.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((quizIndex + 1) / quizItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <div className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
              currentItem.operation === 'add' || currentItem.operation === 'subtract'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-purple-100 text-purple-700'
            }`}>
              {currentItem.operation === 'add' ? 'Samlagning' :
               currentItem.operation === 'subtract' ? 'Frádráttur' :
               currentItem.operation === 'multiply' ? 'Margföldun' : 'Deiling'}
            </div>

            <div className="text-4xl md:text-5xl font-mono font-bold text-gray-800 py-4">
              {currentItem.expression}
            </div>

            <p className="text-gray-600 mt-2">
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
              className="flex-1 px-4 py-4 text-2xl font-mono border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-center disabled:bg-gray-100"
              autoFocus
            />
            {!showResult && (
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="px-6 py-4 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <span className="font-mono font-bold text-lg">{currentItem.correctAnswer}</span>
                </div>
              )}
              <p className="text-gray-700">{currentItem.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ljúka stigi' : 'Næsta spurning'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
