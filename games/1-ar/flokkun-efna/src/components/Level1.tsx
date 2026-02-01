import { useState, useCallback } from 'react';
import { CATEGORIES, MATTER_SAMPLES, MatterCategory, MatterSample } from '../data/classifications';

interface Level1Props {
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
}

type Phase = 'learn' | 'quiz';

export function Level1({ onComplete, onBack }: Level1Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [selectedCategory, setSelectedCategory] = useState<MatterCategory | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<MatterCategory | null>(null);

  // Get sample items for each category (2 per category for learning)
  const getSamplesForCategory = (cat: MatterCategory) =>
    MATTER_SAMPLES.filter(s => s.category === cat).slice(0, 3);

  // Quiz questions - 8 items (2 from each category)
  const quizItems: MatterSample[] = [
    MATTER_SAMPLES.find(s => s.id === 'gold')!,
    MATTER_SAMPLES.find(s => s.id === 'water')!,
    MATTER_SAMPLES.find(s => s.id === 'air')!,
    MATTER_SAMPLES.find(s => s.id === 'salad')!,
    MATTER_SAMPLES.find(s => s.id === 'oxygen')!,
    MATTER_SAMPLES.find(s => s.id === 'salt')!,
    MATTER_SAMPLES.find(s => s.id === 'saltwater')!,
    MATTER_SAMPLES.find(s => s.id === 'granite')!,
  ];

  const currentQuizItem = quizItems[quizIndex];
  const isLastQuestion = quizIndex >= quizItems.length - 1;
  const maxScore = quizItems.length * 100;

  const handleAnswer = useCallback((category: MatterCategory) => {
    if (showResult) return;

    setSelectedAnswer(category);
    const correct = category === currentQuizItem.category;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prev => prev + 100);
    }
  }, [showResult, currentQuizItem]);

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
              <h1 className="text-xl md:text-2xl font-bold text-indigo-700">
                Stig 1: Kynntu þér flokkana
              </h1>
              <div></div>
            </div>
          </div>

          {/* Classification Tree */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Flokkun efna / Classification of Matter
            </h2>

            {/* Visual tree */}
            <div className="flex flex-col items-center mb-6">
              <div className="bg-gray-100 px-6 py-3 rounded-xl font-bold text-gray-700 text-lg">
                🧪 Efni / Matter
              </div>
              <div className="w-0.5 h-6 bg-gray-300"></div>
              <div className="flex gap-8 md:gap-16">
                {/* Pure Substances */}
                <div className="flex flex-col items-center">
                  <div className="bg-purple-100 px-4 py-2 rounded-xl text-purple-700 font-semibold">
                    Hrein efni / Pure Substances
                  </div>
                  <div className="w-0.5 h-4 bg-purple-200"></div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div
                        className={`px-3 py-2 rounded-xl cursor-pointer transition-all ${
                          selectedCategory === 'frumefni'
                            ? 'bg-blue-500 text-white scale-105'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                        onClick={() => setSelectedCategory(selectedCategory === 'frumefni' ? null : 'frumefni')}
                      >
                        ⚛️ Frumefni
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`px-3 py-2 rounded-xl cursor-pointer transition-all ${
                          selectedCategory === 'efnasamband'
                            ? 'bg-purple-500 text-white scale-105'
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        }`}
                        onClick={() => setSelectedCategory(selectedCategory === 'efnasamband' ? null : 'efnasamband')}
                      >
                        🔗 Efnasamband
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mixtures */}
                <div className="flex flex-col items-center">
                  <div className="bg-amber-100 px-4 py-2 rounded-xl text-amber-700 font-semibold">
                    Blöndur / Mixtures
                  </div>
                  <div className="w-0.5 h-4 bg-amber-200"></div>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div
                        className={`px-3 py-2 rounded-xl cursor-pointer transition-all ${
                          selectedCategory === 'einsleit'
                            ? 'bg-green-500 text-white scale-105'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                        onClick={() => setSelectedCategory(selectedCategory === 'einsleit' ? null : 'einsleit')}
                      >
                        🫗 Einsleit
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`px-3 py-2 rounded-xl cursor-pointer transition-all ${
                          selectedCategory === 'misleit'
                            ? 'bg-amber-500 text-white scale-105'
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        }`}
                        onClick={() => setSelectedCategory(selectedCategory === 'misleit' ? null : 'misleit')}
                      >
                        🥗 Misleit
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected category details */}
            {selectedCategory && (
              <div
                className="p-4 rounded-xl mt-4 transition-all"
                style={{ backgroundColor: `${CATEGORIES[selectedCategory].color}15` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{CATEGORIES[selectedCategory].emoji}</span>
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: CATEGORIES[selectedCategory].color }}>
                      {CATEGORIES[selectedCategory].name}
                    </h3>
                    <p className="text-sm text-gray-600">{CATEGORIES[selectedCategory].nameEn}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{CATEGORIES[selectedCategory].description}</p>

                <h4 className="font-semibold text-gray-700 mb-2">Dæmi:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {getSamplesForCategory(selectedCategory).map(sample => (
                    <div key={sample.id} className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{sample.emoji}</span>
                        <div>
                          <div className="font-medium">{sample.name}</div>
                          {sample.formula && (
                            <div className="text-xs text-gray-500 font-mono">{sample.formula}</div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{sample.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!selectedCategory && (
              <p className="text-center text-gray-500 mt-4">
                Smelltu á flokk til að sjá nánari upplýsingar og dæmi
              </p>
            )}
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
              <h1 className="text-xl font-bold text-indigo-700">Spurningakeppni</h1>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-indigo-600">{score} stig</div>
              <div className="text-xs text-gray-500">{quizIndex + 1} / {quizItems.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(quizIndex / quizItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <span className="text-6xl mb-4 block">{currentQuizItem.emoji}</span>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{currentQuizItem.name}</h2>
            {currentQuizItem.formula && (
              <p className="text-lg font-mono text-gray-500">{currentQuizItem.formula}</p>
            )}
            <p className="text-gray-600 mt-2">{currentQuizItem.description}</p>
          </div>

          <p className="text-center text-lg font-medium text-gray-700 mb-4">
            Hvaða flokkur er þetta efni?
          </p>

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(CATEGORIES) as MatterCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => handleAnswer(cat)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  showResult
                    ? cat === currentQuizItem.category
                      ? 'border-green-500 bg-green-50'
                      : selectedAnswer === cat
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 opacity-50'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{CATEGORIES[cat].emoji}</span>
                  <div>
                    <div className="font-bold" style={{ color: showResult && cat === currentQuizItem.category ? '#22c55e' : CATEGORIES[cat].color }}>
                      {CATEGORIES[cat].name}
                    </div>
                    <div className="text-xs text-gray-500">{CATEGORIES[cat].nameEn}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Result & Next */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? 'Rétt! +100 stig' : 'Rangt'}
              </div>
              <p className="text-gray-700">{currentQuizItem.hint}</p>
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
