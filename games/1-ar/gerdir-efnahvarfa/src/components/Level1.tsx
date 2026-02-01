import { useState, useCallback } from 'react';
import { REACTION_TYPES, REACTION_EXAMPLES, ReactionType, ReactionExample } from '../data/reactions';

interface Level1Props {
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
}

type Phase = 'learn' | 'quiz';

export function Level1({ onComplete, onBack }: Level1Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [selectedType, setSelectedType] = useState<ReactionType | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<ReactionType | null>(null);

  // Get sample reactions for each type (2 per type for learning)
  const getExamplesForType = (type: ReactionType) =>
    REACTION_EXAMPLES.filter(r => r.type === type).slice(0, 2);

  // Quiz questions - 10 items (2 from each type)
  const quizItems: ReactionExample[] = [
    REACTION_EXAMPLES.find(r => r.id === 'syn1')!,
    REACTION_EXAMPLES.find(r => r.id === 'dec1')!,
    REACTION_EXAMPLES.find(r => r.id === 'sr1')!,
    REACTION_EXAMPLES.find(r => r.id === 'dr1')!,
    REACTION_EXAMPLES.find(r => r.id === 'comb1')!,
    REACTION_EXAMPLES.find(r => r.id === 'syn2')!,
    REACTION_EXAMPLES.find(r => r.id === 'dec2')!,
    REACTION_EXAMPLES.find(r => r.id === 'sr2')!,
    REACTION_EXAMPLES.find(r => r.id === 'dr2')!,
    REACTION_EXAMPLES.find(r => r.id === 'comb2')!,
  ];

  const currentQuizItem = quizItems[quizIndex];
  const isLastQuestion = quizIndex >= quizItems.length - 1;
  const maxScore = quizItems.length * 100;

  const handleAnswer = useCallback((type: ReactionType) => {
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

  const reactionTypes: ReactionType[] = ['samsetting', 'sundurlitur', 'einföld', 'tvöföld', 'bruni'];

  // Learning Phase
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4 md:p-8">
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
              <h1 className="text-xl md:text-2xl font-bold text-orange-700">
                Stig 1: Fimm gerðir efnahvarfa
              </h1>
              <div></div>
            </div>
          </div>

          {/* Reaction Types Grid */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Smelltu á gerð til að læra meira
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
              {reactionTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={`p-4 rounded-xl transition-all text-center ${
                    selectedType === type
                      ? 'scale-105 shadow-lg'
                      : 'hover:scale-102 hover:shadow-md'
                  }`}
                  style={{
                    backgroundColor: selectedType === type
                      ? REACTION_TYPES[type].color
                      : `${REACTION_TYPES[type].color}20`,
                    color: selectedType === type ? 'white' : REACTION_TYPES[type].color,
                  }}
                >
                  <div className="text-3xl mb-2">{REACTION_TYPES[type].emoji}</div>
                  <div className="font-bold text-sm">{REACTION_TYPES[type].name}</div>
                  <div className="text-xs opacity-80 mt-1 font-mono">
                    {REACTION_TYPES[type].formula}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected type details */}
            {selectedType && (
              <div
                className="p-5 rounded-xl mt-4 transition-all"
                style={{ backgroundColor: `${REACTION_TYPES[selectedType].color}10` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{REACTION_TYPES[selectedType].emoji}</span>
                  <div>
                    <h3 className="font-bold text-xl" style={{ color: REACTION_TYPES[selectedType].color }}>
                      {REACTION_TYPES[selectedType].name}
                    </h3>
                    <p className="text-sm text-gray-500">{REACTION_TYPES[selectedType].nameEn}</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 mb-4 font-mono text-center text-xl">
                  {REACTION_TYPES[selectedType].formula}
                </div>

                <p className="text-gray-700 mb-4">{REACTION_TYPES[selectedType].description}</p>

                <h4 className="font-semibold text-gray-700 mb-3">Dæmi:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getExamplesForType(selectedType).map(example => (
                    <div key={example.id} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="font-mono text-lg mb-2 text-center" style={{ color: REACTION_TYPES[selectedType].color }}>
                        {example.balancedEquation}
                      </div>
                      <div className="font-medium text-gray-800">{example.name}</div>
                      <p className="text-sm text-gray-600">{example.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!selectedType && (
              <p className="text-center text-gray-500 mt-4">
                Smelltu á gerð efnahvarfs hér að ofan til að sjá útskýringu og dæmi
              </p>
            )}
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4 md:p-8">
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
              <h1 className="text-xl font-bold text-orange-700">Spurningakeppni</h1>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-orange-600">{score} stig</div>
              <div className="text-xs text-gray-500">{quizIndex + 1} / {quizItems.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(quizIndex / quizItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-2">{currentQuizItem.name}</p>
            <div className="bg-gray-100 rounded-xl p-4 font-mono text-2xl">
              {currentQuizItem.balancedEquation}
            </div>
            <p className="text-gray-600 mt-3">{currentQuizItem.description}</p>
          </div>

          <p className="text-center text-lg font-medium text-gray-700 mb-4">
            Hvaða gerð hvarfs er þetta?
          </p>

          {/* Answer options */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {reactionTypes.map(type => (
              <button
                key={type}
                onClick={() => handleAnswer(type)}
                disabled={showResult}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  showResult
                    ? type === currentQuizItem.type
                      ? 'border-green-500 bg-green-100'
                      : selectedAnswer === type
                        ? 'border-red-500 bg-red-100'
                        : 'border-gray-200 opacity-50'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                <div className="text-2xl mb-1">{REACTION_TYPES[type].emoji}</div>
                <div
                  className="font-bold text-xs"
                  style={{
                    color: showResult && type === currentQuizItem.type ? '#22c55e' : REACTION_TYPES[type].color,
                  }}
                >
                  {REACTION_TYPES[type].name}
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
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{REACTION_TYPES[currentQuizItem.type].emoji}</span>
                <span className="font-semibold" style={{ color: REACTION_TYPES[currentQuizItem.type].color }}>
                  {REACTION_TYPES[currentQuizItem.type].name}
                </span>
                <span className="font-mono text-sm text-gray-500">
                  ({REACTION_TYPES[currentQuizItem.type].formula})
                </span>
              </div>
              <p className="text-gray-700">{currentQuizItem.hint}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ljúka stigi' : 'Næsta spurning'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
