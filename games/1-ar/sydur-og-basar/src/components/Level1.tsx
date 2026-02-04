import { useState, useCallback, useMemo } from 'react';
import { SUBSTANCES, SUBSTANCE_TYPES, shuffleArray } from '../data/substances';
import type { SubstanceType } from '../data/substances';

interface Level1Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

type Phase = 'learn' | 'quiz';

export function Level1({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level1Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<SubstanceType | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);

  // Shuffle 15 substances for the quiz
  const quizItems = useMemo(() => shuffleArray(SUBSTANCES).slice(0, 15), []);

  const currentItem = quizItems[quizIndex];
  const isLastQuestion = quizIndex >= quizItems.length - 1;
  const maxScore = quizItems.length * 100;

  const acids = SUBSTANCES.filter(s => s.type === 'acid').slice(0, 4);
  const bases = SUBSTANCES.filter(s => s.type === 'base').slice(0, 4);

  const handleAnswer = useCallback((type: SubstanceType) => {
    if (showResult) return;

    setSelectedAnswer(type);
    const correct = type === currentItem.type;
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
  }, [showResult, currentItem, showHint, streak, onCorrectAnswer, onIncorrectAnswer]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, maxScore, hintsUsed);
    } else {
      setQuizIndex(prev => prev + 1);
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

  // Learning Phase
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 p-4 md:p-8">
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
              <h1 className="text-xl md:text-2xl font-bold text-red-700">
                Stig 1: Greindu s&yacute;rur og basa
              </h1>
              <div></div>
            </div>
          </div>

          {/* Acid-Base Overview */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              S&yacute;rur og basar / Acids and Bases
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Acids */}
              <div className="bg-red-50 rounded-xl p-5 border-2 border-red-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{SUBSTANCE_TYPES.acid.emoji}</span>
                  <div>
                    <h3 className="font-bold text-lg text-red-700">
                      S&yacute;rur (Acids)
                    </h3>
                    <p className="text-sm text-red-600">
                      S&yacute;rur hafa vetni (H) framan vi&eth; anj&oacute;n
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Mynstur: <strong>H + anj&oacute;n</strong> (t.d. HCl, H&#8322;SO&#8324;, HNO&#8323;)
                </p>
                <div className="space-y-2">
                  {acids.map(s => (
                    <div key={s.id} className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-red-600">{s.formula}</span>
                        <span className="text-sm text-gray-700">{s.name}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bases */}
              <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{SUBSTANCE_TYPES.base.emoji}</span>
                  <div>
                    <h3 className="font-bold text-lg text-blue-700">
                      Basar (Bases)
                    </h3>
                    <p className="text-sm text-blue-600">
                      Basar hafa m&aacute;lm og hydr&oacute;x&iacute;&eth; (OH)
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Mynstur: <strong>M&aacute;lmur + OH</strong> (t.d. NaOH, KOH, Ca(OH)&#8322;)
                </p>
                <div className="space-y-2">
                  {bases.map(s => (
                    <div key={s.id} className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-blue-600">{s.formula}</span>
                        <span className="text-sm text-gray-700">{s.name}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Misconceptions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
              <h3 className="font-bold text-yellow-800 mb-2">Algengt miskilningur:</h3>
              <p className="text-sm text-gray-700">
                Ekki eru allar s&yacute;rur h&aelig;ttulegar! Edikss&yacute;ra (CH&#8323;COOH) er &iacute; ediki,
                s&iacute;tr&oacute;nus&yacute;ra er &iacute; s&iacute;tr&oacute;num. &THORN;etta eru veiku s&yacute;rur sem vi&eth; notum daglega.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <h3 className="font-bold text-purple-800 mb-2">Athuga&eth;u:</h3>
              <p className="text-sm text-gray-700">
                CH&#8323;COOH l&iacute;tur &uacute;t eins og l&iacute;fr&aelig;nt efni, en H &iacute; COOH h&oacute;pnum er s&uacute;rt &mdash; &thorn;a&eth; er s&yacute;ra!
              </p>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-100 p-4 md:p-8">
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
              <h1 className="text-xl font-bold text-red-700">S&yacute;ra e&eth;a basi?</h1>
              {streak > 1 && (
                <div className="text-sm text-orange-500 font-bold">{streak} &iacute; r&ouml;&eth;!</div>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-red-600">{score} stig</div>
              <div className="text-xs text-gray-500">{quizIndex + 1} / {quizItems.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(quizIndex / quizItems.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <div className="text-5xl font-mono font-bold text-gray-800 mb-2">{currentItem.formula}</div>
            <h2 className="text-xl font-bold text-gray-700 mb-1">{currentItem.name}</h2>
            <p className="text-gray-600">{currentItem.description}</p>
          </div>

          {/* Hint button */}
          {!showResult && !showHint && (
            <button
              onClick={handleHint}
              className="text-sm text-purple-600 hover:text-purple-700 mb-4 block mx-auto"
            >
              S&yacute;na v&iacute;sbendingu (-50 stig)
            </button>
          )}

          {/* Hint display */}
          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 text-sm text-center">
              {currentItem.hint}
            </div>
          )}

          <p className="text-center text-lg font-medium text-gray-700 mb-4">
            Er &thorn;etta s&yacute;ra e&eth;a basi?
          </p>

          {/* Answer options */}
          <div className="grid grid-cols-2 gap-4">
            {(['acid', 'base'] as SubstanceType[]).map(type => (
              <button
                key={type}
                onClick={() => handleAnswer(type)}
                disabled={showResult}
                className={`p-6 rounded-xl border-3 transition-all transform hover:scale-102 ${
                  showResult
                    ? type === currentItem.type
                      ? 'border-green-500 bg-green-100 scale-105'
                      : selectedAnswer === type
                        ? 'border-red-500 bg-red-100'
                        : 'border-gray-200 opacity-40'
                    : type === 'acid'
                      ? 'border-red-200 hover:border-red-400 hover:bg-red-50 hover:shadow-md'
                      : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-4xl">{SUBSTANCE_TYPES[type].emoji}</span>
                  <div className="text-center">
                    <div
                      className="font-bold text-lg"
                      style={{ color: SUBSTANCE_TYPES[type].color }}
                    >
                      {SUBSTANCE_TYPES[type].name}
                    </div>
                    <div className="text-xs text-gray-500">{SUBSTANCE_TYPES[type].nameEn}</div>
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
                    Rett!
                    <span className="ml-2 text-sm font-normal">
                      +{showHint ? 50 : 100}{streak > 0 && !showHint ? ` +${Math.min(streak * 10, 50)} r&ouml;&eth; b&oacute;nus` : ''} stig
                    </span>
                  </>
                ) : (
                  'Rangt'
                )}
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{SUBSTANCE_TYPES[currentItem.type].emoji}</span>
                  <span className="font-semibold" style={{ color: SUBSTANCE_TYPES[currentItem.type].color }}>
                    {currentItem.formula} er {SUBSTANCE_TYPES[currentItem.type].name.toLowerCase()}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{currentItem.hint}</p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Lj&uacute;ka stigi' : 'N&aelig;sta spurning &rarr;'}
            </button>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Flokkar:</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {(['acid', 'base'] as SubstanceType[]).map(type => (
              <div key={type} className="flex items-center gap-1">
                <span>{SUBSTANCE_TYPES[type].emoji}</span>
                <span style={{ color: SUBSTANCE_TYPES[type].color }}>
                  {SUBSTANCE_TYPES[type].name}: {type === 'acid' ? 'H + anj\u00f3n' : 'M\u00e1lmur + OH'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
