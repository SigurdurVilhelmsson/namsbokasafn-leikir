import { useState, useCallback } from 'react';
import { SIG_FIG_NUMBERS, SIG_FIG_RULES, SigFigNumber } from '../data/sigfigs';

interface Level1Props {
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
}

type Phase = 'learn' | 'quiz';

export function Level1({ onComplete, onBack }: Level1Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Quiz items: 10 questions from easy to hard
  const quizItems: SigFigNumber[] = [
    ...SIG_FIG_NUMBERS.filter(n => n.difficulty === 'easy').slice(0, 4),
    ...SIG_FIG_NUMBERS.filter(n => n.difficulty === 'medium').slice(0, 3),
    ...SIG_FIG_NUMBERS.filter(n => n.difficulty === 'hard').slice(0, 3),
  ];

  const currentItem = quizItems[quizIndex];
  const isLastQuestion = quizIndex >= quizItems.length - 1;
  const maxScore = quizItems.length * 100;

  // Generate answer options (correct answer ± some)
  const getAnswerOptions = useCallback((correct: number): number[] => {
    const options = new Set<number>();
    options.add(correct);
    // Add nearby values
    if (correct > 1) options.add(correct - 1);
    if (correct > 2) options.add(correct - 2);
    options.add(correct + 1);
    options.add(correct + 2);
    // Ensure we have 4 options
    const arr = Array.from(options).slice(0, 4).sort((a, b) => a - b);
    while (arr.length < 4) {
      arr.push(arr[arr.length - 1] + 1);
    }
    return arr;
  }, []);

  const answerOptions = currentItem ? getAnswerOptions(currentItem.sigFigs) : [];

  const handleAnswer = useCallback((answer: number) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    const correct = answer === currentItem.sigFigs;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prev => prev + 100);
    }
  }, [showResult, currentItem]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, maxScore);
    } else {
      setQuizIndex(prev => prev + 1);
      setShowResult(false);
      setSelectedAnswer(null);
    }
  };

  // Learning Phase
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
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
              <h1 className="text-xl md:text-2xl font-bold text-indigo-700">
                Stig 1: Reglur um markverða tölustafi
              </h1>
              <div></div>
            </div>
          </div>

          {/* Rules */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              {SIG_FIG_RULES.length} reglur sem þú þarft að kunna
            </h2>

            <div className="space-y-4">
              {SIG_FIG_RULES.map((rule, index) => (
                <div
                  key={rule.id}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border-l-4 border-indigo-500"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{rule.rule}</p>
                      <p className="text-sm text-gray-500 mt-1">{rule.ruleEn}</p>
                      <div className="mt-2 inline-block bg-white px-3 py-1 rounded-lg font-mono text-indigo-700">
                        {rule.example}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual examples */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl">
              <h3 className="font-bold text-amber-800 mb-3">Dæmi til að æfa sig á:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: '456', sf: 3, note: 'Allir eru markverðir' },
                  { value: '0.0034', sf: 2, note: 'Núll framarlega teljast ekki' },
                  { value: '1.050', sf: 4, note: 'Núll aftarlega eftir kommu' },
                  { value: '2000', sf: 1, note: 'Núll aftarlega án kommu' },
                ].map((ex, i) => (
                  <div key={i} className="bg-white p-3 rounded-lg text-center">
                    <div className="font-mono text-xl text-indigo-700">{ex.value}</div>
                    <div className="text-2xl font-bold text-green-600">{ex.sf}</div>
                    <div className="text-xs text-gray-500">{ex.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              Hefja spurningakeppni →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
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
              <h1 className="text-xl font-bold text-indigo-700">Telja markverða tölustafi</h1>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-indigo-600">{score} stig</div>
              <div className="text-xs text-gray-500">{quizIndex + 1} / {quizItems.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((quizIndex + 1) / quizItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-4">Hvað eru margir markverðir tölustafir?</p>
            <div className="text-5xl md:text-6xl font-mono font-bold text-indigo-700 py-4">
              {currentItem.value}
            </div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm ${
              currentItem.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              currentItem.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentItem.difficulty === 'easy' ? 'Auðvelt' :
               currentItem.difficulty === 'medium' ? 'Miðlungs' : 'Erfitt'}
            </div>
          </div>

          {/* Answer options */}
          <div className="grid grid-cols-4 gap-3">
            {answerOptions.map(option => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                className={`py-6 rounded-xl text-3xl font-bold transition-all ${
                  showResult
                    ? option === currentItem.sigFigs
                      ? 'bg-green-500 text-white'
                      : selectedAnswer === option
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-400'
                    : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Result & Next */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? 'Rétt! +100 stig' : `Rangt - rétt svar er ${currentItem.sigFigs}`}
              </div>
              <p className="text-gray-700">{currentItem.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ljúka stigi' : 'Næsta spurning'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
