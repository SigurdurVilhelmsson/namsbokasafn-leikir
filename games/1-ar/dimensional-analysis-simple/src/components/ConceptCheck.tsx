import { useState } from 'react';
import { CONCEPT_QUESTIONS } from '../data/concept-questions';

export function ConceptCheck() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = CONCEPT_QUESTIONS[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentQuestion((currentQuestion + 1) % CONCEPT_QUESTIONS.length);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 animate-slide-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Skilningsspurningar</h2>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <span className="text-sm text-gray-500">
            Spurning {currentQuestion + 1} af {CONCEPT_QUESTIONS.length}
          </span>
          <h3 className="text-xl font-bold text-gray-800 mt-2">
            {question.question}
          </h3>
        </div>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showFeedback}
              className={`w-full text-left p-4 rounded-lg font-medium transition-colors ${
                showFeedback
                  ? option.correct
                    ? 'bg-green-100 border-2 border-green-500 text-green-800'
                    : selectedAnswer === index
                    ? 'bg-red-100 border-2 border-red-500 text-red-800'
                    : 'bg-gray-100 text-gray-600'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option.text}</span>
                {showFeedback && option.correct && (
                  <span className="ml-auto text-2xl">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {showFeedback && selectedAnswer !== null && (
          <div className="mb-6 animate-slide-in">
            {question.options[selectedAnswer].correct ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-800 font-semibold">
                  ✓ Rétt svar! Vel gert!
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="text-yellow-800 font-semibold mb-2">
                  Ekki alveg rétt, en það er allt í lagi!
                </p>
                <p className="text-yellow-700">
                  {question.options[selectedAnswer].feedback}
                </p>
              </div>
            )}
          </div>
        )}

        {showFeedback && (
          <button
            onClick={nextQuestion}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Næsta spurning →
          </button>
        )}
      </div>
    </div>
  );
}
