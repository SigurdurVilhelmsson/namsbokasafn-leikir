import { useState, useCallback, useMemo } from 'react';
import { AudioButton } from './AudioButton';
import {
  STOCK_COMPOUNDS,
  VARIABLE_CHARGE_METALS,
  ROMAN_NUMERALS,
  ROMAN_TO_NUMBER,
  getStockCompoundsByDifficulty,
  shuffleCompounds,
  type StockCompound,
  type VariableChargeMetal
} from '../data/stockSystem';

/**
 * Level 6: Stock System Mastery (Rómverskur tölustuðull)
 * Focus on variable-charge metals with Roman numerals
 */

interface Level6Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

type QuestionType = 'charge-from-formula' | 'name-from-formula' | 'formula-from-name';
type GamePhase = 'setup' | 'playing' | 'complete';

interface Question {
  compound: StockCompound;
  type: QuestionType;
  prompt: string;
  correctAnswer: string;
  options?: string[];
}

// Generate a question from a compound
function generateQuestion(compound: StockCompound, type: QuestionType): Question {
  switch (type) {
    case 'charge-from-formula':
      return {
        compound,
        type,
        prompt: `Hver er hleðsla ${compound.metalSymbol} í ${compound.formula}?`,
        correctAnswer: ROMAN_NUMERALS[compound.metalCharge],
        options: shuffleCompounds(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'].filter(r =>
          // Include correct answer and some plausible distractors
          r === ROMAN_NUMERALS[compound.metalCharge] ||
          ['I', 'II', 'III', 'IV'].includes(r)
        )).slice(0, 4)
      };
    case 'name-from-formula':
      return {
        compound,
        type,
        prompt: `Hvað heitir ${compound.formula}?`,
        correctAnswer: compound.nameIs,
        options: undefined // Free text input
      };
    case 'formula-from-name':
      return {
        compound,
        type,
        prompt: `Hver er formúla ${compound.nameIs}?`,
        correctAnswer: compound.formula,
        options: undefined // Free text input
      };
  }
}

export function Level6({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level6Props) {
  const [phase, setPhase] = useState<GamePhase>('setup');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'all'>('easy');
  const [questionCount, setQuestionCount] = useState(12);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Generate questions based on difficulty
  const questions = useMemo(() => {
    let compounds: StockCompound[];

    if (difficulty === 'all') {
      compounds = shuffleCompounds([...STOCK_COMPOUNDS]);
    } else {
      compounds = shuffleCompounds(getStockCompoundsByDifficulty(difficulty));
    }

    // Take questionCount compounds
    compounds = compounds.slice(0, questionCount);

    // Generate mixed question types
    const questionTypes: QuestionType[] = ['charge-from-formula', 'name-from-formula', 'formula-from-name'];

    return compounds.map((compound, idx) => {
      const type = questionTypes[idx % questionTypes.length];
      return generateQuestion(compound, type);
    });
  }, [difficulty, questionCount]);

  const question = questions[currentIndex];

  // Normalize answer for comparison
  const normalizeAnswer = (text: string): string => {
    return text.toLowerCase().trim()
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/ý/g, 'y')
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/ð/g, 'd')
      .replace(/þ/g, 'th')
      .replace(/æ/g, 'ae')
      .replace(/ö/g, 'o')
      .replace(/₂/g, '2')
      .replace(/₃/g, '3')
      .replace(/₄/g, '4')
      .replace(/₇/g, '7')
      .replace(/\s+/g, '')
      .replace(/[()]/g, '');
  };

  // Check answer
  const checkAnswer = useCallback((answer: string) => {
    if (!question || showFeedback) return;

    let correct: boolean;

    if (question.type === 'charge-from-formula') {
      // Multiple choice - exact match
      correct = answer === question.correctAnswer;
    } else {
      // Free text - normalized comparison
      correct = normalizeAnswer(answer) === normalizeAnswer(question.correctAnswer);
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const points = showHint ? 5 : 10;
      setScore(prev => prev + points);
      onCorrectAnswer?.();
    } else {
      onIncorrectAnswer?.();
    }
  }, [question, showFeedback, showHint, onCorrectAnswer, onIncorrectAnswer]);

  // Handle multiple choice selection
  const handleOptionClick = (option: string) => {
    setSelectedAnswer(option);
    checkAnswer(option);
  };

  // Handle free text submit
  const handleSubmit = () => {
    if (userInput.trim()) {
      checkAnswer(userInput);
    }
  };

  // Show hint
  const handleShowHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  // Move to next question
  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setUserInput('');
      setShowFeedback(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      setPhase('complete');
    }
  }, [currentIndex, questions.length]);

  // Start the game
  const startGame = () => {
    setPhase('playing');
    setCurrentIndex(0);
    setScore(0);
    setHintsUsed(0);
    setSelectedAnswer(null);
    setUserInput('');
    setShowFeedback(false);
    setShowHint(false);
  };

  // Get metal info
  const getMetalInfo = (symbol: string): VariableChargeMetal | undefined => {
    return VARIABLE_CHARGE_METALS.find(m => m.symbol === symbol);
  };

  // Setup screen
  if (phase === 'setup') {
    const easyCount = getStockCompoundsByDifficulty('easy').length;
    const mediumCount = getStockCompoundsByDifficulty('medium').length;
    const hardCount = getStockCompoundsByDifficulty('hard').length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
              ← Til baka
            </button>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-violet-600">
            Rómverskur tölustuðull
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Lærðu að nota rómverskar tölur fyrir málma með breytilega hleðslu
          </p>

          {/* Info about Stock system */}
          <div className="bg-violet-50 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-violet-800 mb-2">Hvað er kerfið?</h3>
            <p className="text-gray-700 text-sm mb-3">
              Sumir málmar geta haft mismunandi hleðslu. Rómverska talan í sviga segir
              okkur nákvæmlega hvaða hleðslu málmurinn hefur í efnasambandinu.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-lg p-2 text-center">
                <div className="font-mono font-bold">Fe²⁺</div>
                <div className="text-sm text-gray-600">Járn(II)</div>
              </div>
              <div className="bg-white rounded-lg p-2 text-center">
                <div className="font-mono font-bold">Fe³⁺</div>
                <div className="text-sm text-gray-600">Járn(III)</div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Erfiðleiki:</label>
              <div className="grid grid-cols-4 gap-2">
                {(['easy', 'medium', 'hard', 'all'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      difficulty === d
                        ? 'border-violet-500 bg-violet-50 text-violet-700'
                        : 'border-gray-200 hover:border-violet-300'
                    }`}
                  >
                    <div>
                      {d === 'easy' && 'Auðvelt'}
                      {d === 'medium' && 'Miðlungs'}
                      {d === 'hard' && 'Erfitt'}
                      {d === 'all' && 'Allt'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {d === 'easy' && `${easyCount} efni`}
                      {d === 'medium' && `${mediumCount} efni`}
                      {d === 'hard' && `${hardCount} efni`}
                      {d === 'all' && `${STOCK_COMPOUNDS.length} efni`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Fjöldi spurninga:</label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 12, 15].map(n => (
                  <button
                    key={n}
                    onClick={() => setQuestionCount(n)}
                    className={`p-3 rounded-xl border-2 font-medium transition-all ${
                      questionCount === n
                        ? 'border-violet-500 bg-violet-50 text-violet-700'
                        : 'border-gray-200 hover:border-violet-300'
                    }`}
                  >
                    {n} spurningar
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Variable charge metals reference */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm">Málmar með breytilega hleðslu:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm max-h-48 overflow-y-auto">
              {VARIABLE_CHARGE_METALS.slice(0, 8).map(metal => (
                <div key={metal.symbol} className="bg-white rounded-lg p-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold">{metal.symbol}</span>
                    <span className="text-gray-600">{metal.nameIs}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Hleðslur: {metal.commonCharges.map(c => `+${c}`).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-4 px-6 rounded-xl text-lg"
          >
            Byrja æfingu →
          </button>
        </div>
      </div>
    );
  }

  // Playing screen
  if (phase === 'playing' && question) {
    const metalInfo = getMetalInfo(question.compound.metalSymbol);

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
                ← Til baka
              </button>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-violet-600">{currentIndex + 1}/{questions.length}</div>
                  <div className="text-xs text-gray-500">Spurning</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">{score}</div>
                  <div className="text-xs text-gray-500">Stig</div>
                </div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 transition-all duration-300"
                style={{ width: `${((currentIndex + (showFeedback && isCorrect ? 1 : 0)) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-4">
            {/* Question type indicator */}
            <div className="flex justify-center mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                question.type === 'charge-from-formula'
                  ? 'bg-blue-100 text-blue-700'
                  : question.type === 'name-from-formula'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-orange-100 text-orange-700'
              }`}>
                {question.type === 'charge-from-formula' && 'Finndu hleðsluna'}
                {question.type === 'name-from-formula' && 'Nefndu efnið'}
                {question.type === 'formula-from-name' && 'Skrifaðu formúlu'}
              </span>
            </div>

            {/* Question */}
            <div className="bg-violet-50 rounded-xl p-6 mb-6 text-center">
              <div className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {question.prompt}
              </div>
              {question.type !== 'formula-from-name' && (
                <div className="text-3xl md:text-4xl font-mono font-bold text-violet-700">
                  {question.compound.formula}
                </div>
              )}
              {question.type === 'formula-from-name' && (
                <div className="text-2xl md:text-3xl font-bold text-violet-700 flex items-center justify-center gap-2">
                  {question.compound.nameIs}
                  <AudioButton text={question.compound.nameIs} size="medium" />
                </div>
              )}
            </div>

            {/* Hint */}
            {showHint && !showFeedback && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                <div className="text-yellow-800">
                  <div className="font-bold mb-1">💡 Vísbending:</div>
                  <div>{question.compound.explanation}</div>
                  {metalInfo && (
                    <div className="mt-2 text-sm">
                      {metalInfo.chargeInfo}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Answer section */}
            {!showFeedback ? (
              <div className="space-y-4">
                {question.options ? (
                  // Multiple choice for charge questions
                  <div className="grid grid-cols-2 gap-3">
                    {question.options.map(option => (
                      <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className="p-4 rounded-xl border-2 border-violet-200 hover:border-violet-400 hover:bg-violet-50 transition-all"
                      >
                        <div className="text-2xl font-bold text-gray-800">{option}</div>
                        <div className="text-sm text-gray-500">+{ROMAN_TO_NUMBER[option]} hleðsla</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  // Free text input
                  <div>
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && userInput && handleSubmit()}
                      placeholder={question.type === 'name-from-formula'
                        ? 'Skrifaðu nafnið, t.d. Járn(II)oxíð'
                        : 'Skrifaðu formúluna, t.d. FeO'}
                      className="w-full text-center text-xl font-bold p-4 border-2 border-violet-300 rounded-xl focus:border-violet-500 focus:outline-none"
                      autoFocus
                    />
                    <p className="text-center text-xs text-gray-500 mt-2">
                      {question.type === 'name-from-formula'
                        ? 'Notaðu sviga fyrir hleðslu, t.d. Járn(II)'
                        : 'Notaðu venjulegar tölur (2, 3, 4)'}
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  {!showHint && (
                    <button
                      onClick={handleShowHint}
                      className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-bold py-3 px-4 rounded-xl"
                    >
                      💡 Vísbending
                    </button>
                  )}
                  {!question.options && (
                    <button
                      onClick={handleSubmit}
                      disabled={!userInput.trim()}
                      className={`flex-1 font-bold py-3 px-4 rounded-xl ${
                        !userInput.trim()
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-violet-500 hover:bg-violet-600 text-white'
                      }`}
                    >
                      Athuga svar
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Result */}
                <div className={`p-6 rounded-xl text-center ${
                  isCorrect ? 'bg-green-100 border-2 border-green-400' : 'bg-red-100 border-2 border-red-400'
                }`}>
                  <div className="text-4xl mb-2">{isCorrect ? '✓' : '✗'}</div>
                  <div className={`text-xl font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Rétt!' : 'Ekki alveg'}
                  </div>
                  {!isCorrect && (
                    <div className="mt-2 text-red-700">
                      {question.options ? (
                        <>Þú valdir: <strong>{selectedAnswer}</strong></>
                      ) : (
                        <>Þú skrifaðir: <strong>{userInput}</strong></>
                      )}
                    </div>
                  )}
                  <div className="mt-2 text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                    {question.type === 'charge-from-formula' && (
                      <span>
                        {question.compound.metalSymbol} hefur hleðslu <span className="text-violet-600">+{question.compound.metalCharge}</span> ({question.correctAnswer})
                      </span>
                    )}
                    {question.type === 'name-from-formula' && (
                      <>
                        {question.correctAnswer}
                        <AudioButton text={question.correctAnswer} size="small" />
                      </>
                    )}
                    {question.type === 'formula-from-name' && (
                      <span className="font-mono">{question.correctAnswer}</span>
                    )}
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="font-bold text-blue-800 mb-1">Útskýring:</div>
                  <div className="text-blue-700">{question.compound.explanation}</div>
                </div>

                <button
                  onClick={nextQuestion}
                  className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-6 rounded-xl"
                >
                  {currentIndex + 1 < questions.length ? 'Næsta spurning →' : 'Sjá niðurstöður →'}
                </button>
              </div>
            )}
          </div>

          {/* Quick reference */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm">Rómverskar tölur:</h3>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              {Object.entries(ROMAN_NUMERALS).slice(0, 8).map(([num, roman]) => (
                <div key={num} className="bg-violet-50 p-2 rounded">
                  <span className="font-bold text-violet-700">{roman}</span>
                  <span className="text-gray-500"> = +{num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Complete screen
  if (phase === 'complete') {
    const accuracy = Math.round((score / (questions.length * 10)) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
              {accuracy >= 80 ? '🏆' : accuracy >= 60 ? '🎉' : '📚'}
            </div>
            <h1 className="text-3xl font-bold text-violet-600 mb-2">
              {accuracy >= 80 ? 'Frábært!' : accuracy >= 60 ? 'Vel gert!' : 'Haltu áfram að æfa!'}
            </h1>
            <p className="text-gray-600">Þú hefur lokið rómversku tölustuðlaæfingu</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-violet-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-violet-600">{score}</div>
              <div className="text-sm text-gray-600">Stig</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{accuracy}%</div>
              <div className="text-sm text-gray-600">Nákvæmni</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600">{hintsUsed}</div>
              <div className="text-sm text-gray-600">Vísbendingar</div>
            </div>
          </div>

          <div className="bg-violet-50 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-violet-800 mb-2">Hvað lærðir þú?</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Reikna hleðslu málms út frá formúlu</li>
              <li>• Nota rómverskar tölur í nafni (I, II, III...)</li>
              <li>• Þekkja málma með breytilega hleðslu</li>
              <li>• Skrifa formúlur fyrir efni með rómverskum tölustað</li>
            </ul>
          </div>

          {/* Variable charge metals summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm">Mundu þessa málma:</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {VARIABLE_CHARGE_METALS.slice(0, 6).map(metal => (
                <div key={metal.symbol} className="bg-white rounded-lg p-2 flex justify-between">
                  <span className="font-bold">{metal.nameIs}</span>
                  <span className="text-gray-500">
                    {metal.commonCharges.map(c => `+${c}`).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setPhase('setup');
              }}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl"
            >
              Æfa aftur
            </button>
            <button
              onClick={() => onComplete(score, questions.length * 10, hintsUsed)}
              className="flex-1 bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-6 rounded-xl"
            >
              Ljúka stigi →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
