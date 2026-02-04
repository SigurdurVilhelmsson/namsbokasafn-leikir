import { useState, useCallback } from 'react';
import { SUBSTANCES, ELECTROLYTE_CATEGORIES, ElectrolyteType, shuffleArray } from '../data/substances';

interface Level1Props {
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
}

type Phase = 'learn' | 'quiz';

// Conductivity visual component
function ConductivityTester({ type }: { type: ElectrolyteType }) {
  const bulbColors: Record<ElectrolyteType, { glow: string; bulb: string; label: string }> = {
    strong: { glow: '#fbbf24', bulb: '#f59e0b', label: 'Björt pera' },
    weak: { glow: '#c4b5fd', bulb: '#8b5cf6', label: 'Dauf pera' },
    non: { glow: '#d1d5db', bulb: '#6b7280', label: 'Slökkt' },
  };

  const { glow, bulb } = bulbColors[type];

  return (
    <div className="flex flex-col items-center">
      <svg width="60" height="80" viewBox="0 0 60 80">
        {/* Glow effect for strong/weak */}
        {type !== 'non' && (
          <circle
            cx="30"
            cy="30"
            r={type === 'strong' ? 25 : 18}
            fill={glow}
            opacity={type === 'strong' ? 0.4 : 0.2}
          />
        )}
        {/* Bulb */}
        <circle cx="30" cy="30" r="15" fill={bulb} opacity={type === 'non' ? 0.3 : 1} />
        {/* Base */}
        <rect x="24" y="45" width="12" height="8" rx="2" fill="#9ca3af" />
        <rect x="22" y="53" width="16" height="4" rx="1" fill="#6b7280" />
        {/* Wires */}
        <line x1="10" y1="70" x2="26" y2="53" stroke="#6b7280" strokeWidth="2" />
        <line x1="50" y1="70" x2="34" y2="53" stroke="#6b7280" strokeWidth="2" />
        {/* Beaker outline */}
        <path d="M5,65 L5,78 Q5,80 7,80 L53,80 Q55,80 55,78 L55,65" fill="none" stroke="#93c5fd" strokeWidth="2" />
        {/* Water */}
        <rect x="6" y="66" width="48" height="13" rx="1" fill="#bfdbfe" opacity="0.5" />
      </svg>
    </div>
  );
}

export function Level1({ onComplete, onBack }: Level1Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [selectedCategory, setSelectedCategory] = useState<ElectrolyteType | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<ElectrolyteType | null>(null);

  // Get sample items for each category for learning
  const getSamplesForCategory = (cat: ElectrolyteType) =>
    SUBSTANCES.filter(s => s.type === cat).slice(0, 3);

  // Quiz questions - 15 items shuffled
  const [quizItems] = useState(() => shuffleArray(SUBSTANCES).slice(0, 15));

  const currentQuizItem = quizItems[quizIndex];
  const isLastQuestion = quizIndex >= quizItems.length - 1;
  const maxScore = quizItems.length * 100;

  const handleAnswer = useCallback((type: ElectrolyteType) => {
    if (showResult) return;

    setSelectedAnswer(type);
    const correct = type === currentQuizItem.type;
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 p-4 md:p-8">
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
              <h1 className="text-xl md:text-2xl font-bold text-amber-700">
                Stig 1: Rafleiðarar
              </h1>
              <div></div>
            </div>
          </div>

          {/* Conductivity Overview */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Rafleiðnipróf / Conductivity Test
            </h2>
            <p className="text-center text-gray-600 mb-6 text-sm">
              Þegar efni er leyst upp í vatni, leiðir lausnin rafstraum ef jónir eru til staðar.
              Perubirtinn sýnir styrk rafleiðarans.
            </p>

            {/* Visual conductivity testers */}
            <div className="flex justify-center gap-8 md:gap-16 mb-6">
              {(Object.keys(ELECTROLYTE_CATEGORIES) as ElectrolyteType[]).map(type => (
                <div
                  key={type}
                  className={`flex flex-col items-center cursor-pointer p-4 rounded-xl transition-all ${
                    selectedCategory === type
                      ? 'bg-gray-100 scale-105 shadow-md'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === type ? null : type)}
                >
                  <ConductivityTester type={type} />
                  <div
                    className="font-semibold text-sm mt-2 text-center"
                    style={{ color: ELECTROLYTE_CATEGORIES[type].color }}
                  >
                    {ELECTROLYTE_CATEGORIES[type].name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {ELECTROLYTE_CATEGORIES[type].nameEn}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected category details */}
            {selectedCategory && (
              <div
                className="p-4 rounded-xl mt-4 transition-all"
                style={{ backgroundColor: `${ELECTROLYTE_CATEGORIES[selectedCategory].color}15` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{ELECTROLYTE_CATEGORIES[selectedCategory].emoji}</span>
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: ELECTROLYTE_CATEGORIES[selectedCategory].color }}>
                      {ELECTROLYTE_CATEGORIES[selectedCategory].name}
                    </h3>
                    <p className="text-sm text-gray-500">{ELECTROLYTE_CATEGORIES[selectedCategory].nameEn}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{ELECTROLYTE_CATEGORIES[selectedCategory].description}</p>

                <h4 className="font-semibold text-gray-700 mb-2">D&aelig;mi:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {getSamplesForCategory(selectedCategory).map(sample => (
                    <div key={sample.id} className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <div>
                          <div className="font-medium">{sample.name}</div>
                          <div className="text-sm text-gray-500 font-mono">{sample.formula}</div>
                        </div>
                      </div>
                      {sample.dissociation && (
                        <div className="text-xs font-mono text-gray-600 bg-gray-50 p-1 rounded mt-1">
                          {sample.dissociation}
                        </div>
                      )}
                      <p className="text-xs text-gray-600 mt-1">{sample.hint}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!selectedCategory && (
              <p className="text-center text-gray-500 mt-4">
                Smelltu &aacute; raflei&eth;arategund til a&eth; sj&aacute; n&aacute;nari uppl&yacute;singar og d&aelig;mi
              </p>
            )}
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 p-4 md:p-8">
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
              <h1 className="text-xl font-bold text-amber-700">Spurningakeppni</h1>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-amber-600">{score} stig</div>
              <div className="text-xs text-gray-500">{quizIndex + 1} / {quizItems.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(quizIndex / quizItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <div className="mb-4">
              <ConductivityTester type={showResult ? currentQuizItem.type : 'non'} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{currentQuizItem.name}</h2>
            <p className="text-lg font-mono text-amber-600">{currentQuizItem.formula}</p>
            <p className="text-gray-600 mt-2">{currentQuizItem.description}</p>
          </div>

          <p className="text-center text-lg font-medium text-gray-700 mb-4">
            Hva&eth;a tegund raflei&eth;ara er &thorn;etta efni?
          </p>

          {/* Answer options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(Object.keys(ELECTROLYTE_CATEGORIES) as ElectrolyteType[]).map(type => (
              <button
                key={type}
                onClick={() => handleAnswer(type)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  showResult
                    ? type === currentQuizItem.type
                      ? 'border-green-500 bg-green-50'
                      : selectedAnswer === type
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 opacity-50'
                    : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{ELECTROLYTE_CATEGORIES[type].emoji}</span>
                  <div
                    className="font-bold"
                    style={{
                      color: showResult && type === currentQuizItem.type
                        ? '#22c55e'
                        : ELECTROLYTE_CATEGORIES[type].color
                    }}
                  >
                    {ELECTROLYTE_CATEGORIES[type].name}
                  </div>
                  <div className="text-xs text-gray-500">{ELECTROLYTE_CATEGORIES[type].nameEn}</div>
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
                {isCorrect ? 'R\u00e9tt! +100 stig' : 'Rangt'}
              </div>
              <p className="text-gray-700">{currentQuizItem.hint}</p>
              {currentQuizItem.dissociation && (
                <p className="font-mono text-sm text-gray-600 mt-2 bg-white p-2 rounded">
                  {currentQuizItem.dissociation}
                </p>
              )}
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Lj\u00faka stigi' : 'N\u00e6sta spurning'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
