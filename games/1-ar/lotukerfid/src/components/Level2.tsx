import { useState, useCallback, useMemo } from 'react';
import {
  ELEMENTS,
  CATEGORY_COLORS,
  CATEGORY_HEX,
  CATEGORY_NAMES_IS,
  CATEGORY_NAMES_EN,
  GROUP_COLORS,
  GROUP_NAMES_IS,
  GROUP_NAMES_EN,
  shuffleArray,
  type Element,
  type ElementCategory,
  type ElementGroup,
} from '../data/elements';

interface Level2Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

type Phase = 'learn' | 'quiz';
type QuestionType = 'category' | 'group';

interface ClassificationQuestion {
  element: Element;
  questionType: QuestionType;
  options: string[];
  correctAnswer: string;
}

/**
 * Generate 15 classification questions: mix of category and group questions
 */
function generateQuestions(): ClassificationQuestion[] {
  const shuffled = shuffleArray(ELEMENTS).slice(0, 15);

  return shuffled.map((element, i) => {
    // Alternate between category and group questions
    if (i % 3 === 0) {
      // Category question: metal/nonmetal/metalloid
      const categories: ElementCategory[] = ['metal', 'nonmetal', 'metalloid'];
      return {
        element,
        questionType: 'category' as QuestionType,
        options: shuffleArray(categories),
        correctAnswer: element.category,
      };
    } else {
      // Group question: specific group
      const allGroups: ElementGroup[] = [
        'alkali', 'alkaline-earth', 'transition', 'halogen',
        'noble-gas', 'other-nonmetal', 'metalloid', 'other-metal',
      ];
      // Include correct answer + 3 random wrong answers
      const wrongGroups = shuffleArray(
        allGroups.filter(g => g !== element.group)
      ).slice(0, 3);
      const options = shuffleArray([element.group, ...wrongGroups]);

      return {
        element,
        questionType: 'group' as QuestionType,
        options,
        correctAnswer: element.group,
      };
    }
  });
}

export function Level2({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level2Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);

  const questions = useMemo(() => generateQuestions(), []);
  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;
  const maxScore = questions.length * 100;

  const handleAnswer = useCallback((answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    const correct = answer === currentQ.correctAnswer;
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
  }, [showResult, currentQ, showHint, streak, onCorrectAnswer, onIncorrectAnswer]);

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

  // Get display name for category or group
  const getOptionName = (option: string, questionType: QuestionType) => {
    if (questionType === 'category') {
      return CATEGORY_NAMES_IS[option as ElementCategory] || option;
    }
    return GROUP_NAMES_IS[option as ElementGroup] || option;
  };

  const getOptionNameEn = (option: string, questionType: QuestionType) => {
    if (questionType === 'category') {
      return CATEGORY_NAMES_EN[option as ElementCategory] || option;
    }
    return GROUP_NAMES_EN[option as ElementGroup] || option;
  };

  const getOptionColor = (option: string, questionType: QuestionType) => {
    if (questionType === 'category') {
      return CATEGORY_HEX[option as ElementCategory] || '#666';
    }
    return GROUP_COLORS[option as ElementGroup]?.hex || '#666';
  };

  // Learning Phase
  if (phase === 'learn') {
    const categories: ElementCategory[] = ['metal', 'nonmetal', 'metalloid'];

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8">
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
              <h1 className="text-xl md:text-2xl font-bold text-green-700">
                Stig 2: Flokkun frumefna
              </h1>
              <div></div>
            </div>
          </div>

          {/* Category Overview: Metal / Nonmetal / Metalloid */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Thrir meginflokkar / Three main categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map(cat => {
                const elementsInCat = ELEMENTS.filter(e => e.category === cat).slice(0, 5);
                return (
                  <div
                    key={cat}
                    className={`p-4 rounded-xl ${CATEGORY_COLORS[cat].bg} border-2 ${CATEGORY_COLORS[cat].border}`}
                  >
                    <h3 className={`font-bold text-lg ${CATEGORY_COLORS[cat].text} mb-1`}>
                      {CATEGORY_NAMES_IS[cat]}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">{CATEGORY_NAMES_EN[cat]}</p>
                    <div className="flex flex-wrap gap-1">
                      {elementsInCat.map(el => (
                        <span key={el.symbol} className="bg-white px-2 py-1 rounded text-xs font-bold">
                          {el.symbol}
                        </span>
                      ))}
                      <span className="text-xs text-gray-400 self-center">...</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group Overview */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Hopar frumefna / Element groups
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['alkali', 'alkaline-earth', 'halogen', 'noble-gas', 'transition', 'other-nonmetal', 'metalloid', 'other-metal'] as ElementGroup[]).map(group => {
                const groupElements = ELEMENTS.filter(e => e.group === group).slice(0, 3);
                return (
                  <div
                    key={group}
                    className={`p-3 rounded-xl ${GROUP_COLORS[group].bg}`}
                  >
                    <div className={`font-bold text-sm ${GROUP_COLORS[group].text}`}>
                      {GROUP_NAMES_IS[group]}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{GROUP_NAMES_EN[group]}</div>
                    <div className="flex gap-1">
                      {groupElements.map(el => (
                        <span key={el.symbol} className="bg-white px-1.5 py-0.5 rounded text-xs font-bold">
                          {el.symbol}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Misconception buster */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
            <h3 className="font-bold text-gray-700 mb-3">Vissir thu?</h3>
            <div className="bg-yellow-50 p-3 rounded-xl border-l-4 border-yellow-400 text-sm">
              <span className="font-bold text-yellow-700">Ranghugmynd:</span> &quot;Malmar eru alltaf i fastu formi.&quot;
              <br />
              <span className="text-gray-600">
                Kvikasilfur (Hg) er malmur en er fljotandi vid stofuhita! Gallín (Ga) braednar vid 30&#176;C.
              </span>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8">
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
              <h1 className="text-xl font-bold text-green-700">Stig 2: Flokkun</h1>
              {streak > 1 && (
                <div className="text-sm text-orange-500 font-bold">&#128293; {streak} i rod!</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">{score} stig</div>
              <div className="text-xs text-gray-500">{currentIndex + 1} / {questions.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentIndex / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-xl mb-3 ${GROUP_COLORS[currentQ.element.group].bg}`}>
              <div className="text-center">
                <span className="text-xs text-gray-500">{currentQ.element.atomicNumber}</span>
                <div className={`text-2xl font-bold ${GROUP_COLORS[currentQ.element.group].text}`}>
                  {currentQ.element.symbol}
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{currentQ.element.nameIs}</h2>
            <p className="text-sm text-gray-500">{currentQ.element.nameEn}</p>
            <p className="text-xs text-gray-400 mt-1">Atommmassi: {currentQ.element.atomicMass}</p>
          </div>

          {/* Hint button */}
          {!showResult && !showHint && (
            <button
              onClick={handleHint}
              className="text-sm text-green-600 hover:text-green-700 mb-4 block mx-auto"
            >
              &#128161; Syna visbendingu (-50 stig)
            </button>
          )}

          {/* Hint display */}
          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-center">
              &#128161;{' '}
              {currentQ.questionType === 'category'
                ? `Thetta frumefni er i hopi: ${GROUP_NAMES_IS[currentQ.element.group]}`
                : `Thetta frumefni er: ${CATEGORY_NAMES_IS[currentQ.element.category]}`
              }
            </div>
          )}

          <p className="text-center text-lg font-medium text-gray-700 mb-4">
            {currentQ.questionType === 'category'
              ? 'Hvada flokkur er thetta frumefni?'
              : 'Hvada hopur tilheyrir thetta frumefni?'
            }
          </p>

          {/* Answer options */}
          <div className={`grid gap-3 ${currentQ.options.length <= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {currentQ.options.map(option => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 transition-all ${
                  showResult
                    ? option === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-100 scale-105'
                      : selectedAnswer === option
                        ? 'border-red-500 bg-red-100'
                        : 'border-gray-200 opacity-40'
                    : 'border-gray-200 hover:border-green-400 hover:bg-green-50 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-3 h-3 rounded-full`}
                    style={{ backgroundColor: getOptionColor(option, currentQ.questionType) }}
                  />
                  <div
                    className="font-bold text-sm"
                    style={{ color: getOptionColor(option, currentQ.questionType) }}
                  >
                    {getOptionName(option, currentQ.questionType)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getOptionNameEn(option, currentQ.questionType)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Result & Explanation */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-xl mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? (
                  <>
                    &#10003; Rett!
                    <span className="ml-2 text-sm font-normal">
                      +{showHint ? 50 : 100}{streak > 0 && !showHint ? ` +${Math.min(streak * 10, 50)} rod bonus` : ''} stig
                    </span>
                  </>
                ) : (
                  '&#10007; Rangt'
                )}
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getOptionColor(currentQ.correctAnswer, currentQ.questionType) }}
                  />
                  <span className="font-semibold" style={{ color: getOptionColor(currentQ.correctAnswer, currentQ.questionType) }}>
                    {getOptionName(currentQ.correctAnswer, currentQ.questionType)}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({getOptionNameEn(currentQ.correctAnswer, currentQ.questionType)})
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {currentQ.element.nameIs} ({currentQ.element.symbol}) er {CATEGORY_NAMES_IS[currentQ.element.category].toLowerCase()} og tilheyrir hopi: {GROUP_NAMES_IS[currentQ.element.group]}.
                </p>
                {currentQ.element.funFact && (
                  <p className="text-sm text-gray-500 italic">{currentQ.element.funFact}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ljuka stigi' : 'Naesta spurning &rarr;'}
            </button>
          </div>
        )}

        {/* Category Legend */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Flokkar:</h3>
          <div className="grid grid-cols-3 gap-2 text-xs mb-2">
            {(['metal', 'nonmetal', 'metalloid'] as ElementCategory[]).map(cat => (
              <div key={cat} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_HEX[cat] }} />
                <span style={{ color: CATEGORY_HEX[cat] }}>{CATEGORY_NAMES_IS[cat]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
