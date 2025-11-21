import React, { useState, useEffect, useRef } from 'react';
import { Beaker, Trophy, RotateCcw, HelpCircle, Droplet } from 'lucide-react';

interface Problem {
  id: string;
  type: 'dilution' | 'molarity' | 'mixing';
  description: string;
  given: { [key: string]: number | string };
  question: string;
  answer: number;
  unit: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hint?: string;
}

interface GameState {
  currentProblem: Problem | null;
  userAnswer: string;
  score: number;
  questionsAnswered: number;
  correctAnswers: number;
  isPlaying: boolean;
  gameOver: boolean;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  showFeedback: boolean;
  lastAnswerCorrect: boolean | null;
  showHint: boolean;
  problemsCompleted: number;
  totalProblems: number;
}

const SolutionLab: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentProblem: null,
    userAnswer: '',
    score: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    isPlaying: false,
    gameOver: false,
    difficulty: 'easy',
    showFeedback: false,
    lastAnswerCorrect: null,
    showHint: false,
    problemsCompleted: 0,
    totalProblems: 10
  });

  const [showInstructions, setShowInstructions] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateProblem = (difficulty: 'easy' | 'medium' | 'hard'): Problem => {
    const problemTypes = ['dilution', 'molarity', 'mixing'] as const;
    const type = problemTypes[Math.floor(Math.random() * (difficulty === 'easy' ? 2 : 3))];

    if (type === 'dilution') {
      // M1V1 = M2V2
      if (difficulty === 'easy') {
        const M1 = Math.round(Math.random() * 9 + 1); // 1-10 M
        const V1 = Math.round(Math.random() * 90 + 10); // 10-100 mL
        const V2 = Math.round(Math.random() * 400 + 100); // 100-500 mL
        const M2 = parseFloat(((M1 * V1) / V2).toFixed(3));

        return {
          id: Math.random().toString(),
          type: 'dilution',
          description: 'You dilute a solution',
          given: { M1, V1, V2 },
          question: `Þú ert með ${V1} mL af ${M1} M lausn. Þú bætir við vatni þannig að endanlegt rúmmál verður ${V2} mL. Hver er endanlegur mólstyrkur?`,
          answer: M2,
          unit: 'M',
          difficulty: 'easy',
          hint: 'Notaðu M₁V₁ = M₂V₂'
        };
      } else {
        const M1 = parseFloat((Math.random() * 4.5 + 0.5).toFixed(2)); // 0.5-5 M
        const V1 = Math.round(Math.random() * 45 + 5); // 5-50 mL
        const V2 = Math.round(Math.random() * 450 + 50); // 50-500 mL
        const M2 = parseFloat(((M1 * V1) / V2).toFixed(4));

        return {
          id: Math.random().toString(),
          type: 'dilution',
          description: 'Precision dilution',
          given: { M1, V1, V2 },
          question: `Þú þarft að útbúa ${V2} mL af ${M2.toFixed(3)} M lausn. Hversu mikið þarftu af ${M1} M stofnlausn?`,
          answer: V1,
          unit: 'mL',
          difficulty: difficulty,
          hint: 'V₁ = (M₂ × V₂) / M₁'
        };
      }
    } else if (type === 'molarity') {
      // Molarity = moles / liters
      if (difficulty === 'easy') {
        const moles = parseFloat((Math.random() * 1.9 + 0.1).toFixed(2)); // 0.1-2 mol
        const volume = parseFloat((Math.random() * 0.9 + 0.1).toFixed(2)); // 0.1-1 L
        const molarity = parseFloat((moles / volume).toFixed(3));

        return {
          id: Math.random().toString(),
          type: 'molarity',
          description: 'Calculate molarity',
          given: { moles, volume },
          question: `Þú leysir ${moles} mól af efni í ${volume} L af lausn. Hver er mólstyrkurinn?`,
          answer: molarity,
          unit: 'M',
          difficulty: 'easy',
          hint: 'Mólstyrkur (M) = mól / lítrar'
        };
      } else {
        const massInGrams = Math.round(Math.random() * 90 + 10); // 10-100 g
        const molarMass = Math.round(Math.random() * 140 + 60); // 60-200 g/mol
        const volumeInML = Math.round(Math.random() * 450 + 50); // 50-500 mL
        
        const moles = massInGrams / molarMass;
        const volumeInL = volumeInML / 1000;
        const molarity = parseFloat((moles / volumeInL).toFixed(3));

        return {
          id: Math.random().toString(),
          type: 'molarity',
          description: 'Calculate molarity from mass',
          given: { massInGrams, molarMass, volumeInML },
          question: `Þú leysir ${massInGrams} g af efni (mólþyngd ${molarMass} g/mol) í ${volumeInML} mL af lausn. Hver er mólstyrkurinn?`,
          answer: molarity,
          unit: 'M',
          difficulty: difficulty,
          hint: 'Fyrst reiknaðu mól = g / (g/mol), síðan M = mól / L'
        };
      }
    } else {
      // Mixing solutions
      const M1 = parseFloat((Math.random() * 4 + 1).toFixed(2)); // 1-5 M
      const V1 = Math.round(Math.random() * 90 + 10); // 10-100 mL
      const M2 = parseFloat((Math.random() * 4 + 1).toFixed(2)); // 1-5 M
      const V2 = Math.round(Math.random() * 90 + 10); // 10-100 mL
      
      const totalMoles = (M1 * V1 + M2 * V2) / 1000; // Convert to L
      const totalVolume = (V1 + V2) / 1000; // Convert to L
      const finalMolarity = parseFloat((totalMoles / totalVolume).toFixed(3));

      return {
        id: Math.random().toString(),
        type: 'mixing',
        description: 'Mixing two solutions',
        given: { M1, V1, M2, V2 },
        question: `Þú blandar ${V1} mL af ${M1} M lausn með ${V2} mL af ${M2} M lausn. Hver er mólstyrkur blöndunnar?`,
        answer: finalMolarity,
        unit: 'M',
        difficulty: difficulty,
        hint: 'M_lokal = (M₁V₁ + M₂V₂) / (V₁ + V₂)'
      };
    }
  };

  const startGame = () => {
    const problemsCount = gameState.difficulty === 'easy' ? 8 : 
                          gameState.difficulty === 'medium' ? 10 : 12;
    const firstProblem = generateProblem(gameState.difficulty);
    
    setGameState(prev => ({
      ...prev,
      currentProblem: firstProblem,
      userAnswer: '',
      score: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      isPlaying: true,
      gameOver: false,
      showFeedback: false,
      lastAnswerCorrect: null,
      showHint: false,
      problemsCompleted: 0,
      totalProblems: problemsCount
    }));
  };

  const checkAnswer = () => {
    if (!gameState.currentProblem || !gameState.userAnswer.trim()) return;

    const userValue = parseFloat(gameState.userAnswer);
    const correctAnswer = gameState.currentProblem.answer;
    
    // Allow 2% tolerance
    const tolerance = Math.abs(correctAnswer * 0.02) || 0.01;
    const isCorrect = Math.abs(userValue - correctAnswer) <= tolerance;

    const pointValue = gameState.currentProblem.difficulty === 'easy' ? 10 : 
                       gameState.currentProblem.difficulty === 'medium' ? 15 : 20;
    
    const hintPenalty = gameState.showHint ? 2 : 0;

    setGameState(prev => {
      const newProblemsCompleted = prev.problemsCompleted + 1;
      const isGameOver = newProblemsCompleted >= prev.totalProblems;

      return {
        ...prev,
        score: isCorrect ? prev.score + pointValue - hintPenalty : prev.score,
        questionsAnswered: prev.questionsAnswered + 1,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        showFeedback: true,
        lastAnswerCorrect: isCorrect,
        problemsCompleted: newProblemsCompleted,
        gameOver: isGameOver,
        isPlaying: !isGameOver
      };
    });

    setTimeout(() => {
      if (gameState.problemsCompleted + 1 < gameState.totalProblems) {
        const nextProblem = generateProblem(gameState.difficulty);
        setGameState(prev => ({
          ...prev,
          currentProblem: nextProblem,
          userAnswer: '',
          showFeedback: false,
          lastAnswerCorrect: null,
          showHint: false
        }));
        inputRef.current?.focus();
      }
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !gameState.showFeedback) {
      checkAnswer();
    }
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      currentProblem: null,
      userAnswer: '',
      score: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      isPlaying: false,
      gameOver: false,
      showFeedback: false,
      lastAnswerCorrect: null,
      showHint: false,
      problemsCompleted: 0
    }));
  };

  useEffect(() => {
    if (gameState.isPlaying && !gameState.showFeedback) {
      inputRef.current?.focus();
    }
  }, [gameState.isPlaying, gameState.showFeedback, gameState.currentProblem]);

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-6 text-cyan-600">
            💧 Solution Concentration Lab
          </h1>
          
          <div className="space-y-4 text-gray-700">
            <h2 className="text-2xl font-semibold text-cyan-500">Leiðbeiningar / Instructions</h2>
            
            <div className="bg-cyan-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Markmið / Goal:</h3>
              <p>Leysðu verkefni um mólstyrk og útþynningu lausna!</p>
              <p className="text-sm italic">Solve problems about molarity and dilution of solutions!</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Verkefnategundir / Problem Types:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li><strong>Útþynning / Dilution:</strong> M₁V₁ = M₂V₂</li>
                <li><strong>Mólstyrkur / Molarity:</strong> M = mól / lítrar</li>
                <li><strong>Blöndun / Mixing:</strong> Tvær lausnir blandaðar</li>
              </ol>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Formúlur / Formulas:</h3>
              <div className="font-mono text-sm space-y-1 bg-white p-3 rounded">
                <p>M₁V₁ = M₂V₂ (útþynning)</p>
                <p>M = mól / L (mólstyrkur)</p>
                <p>mól = massi(g) / mólþyngd(g/mol)</p>
                <p>M = (M₁V₁ + M₂V₂) / (V₁ + V₂) (blöndun)</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Stigagjöf / Scoring:</h3>
              <ul className="space-y-1">
                <li><strong>Auðvelt:</strong> 10 stig × 8 spurningar = 80 max</li>
                <li><strong>Miðlungs:</strong> 15 stig × 10 spurningar = 150 max</li>
                <li><strong>Erfitt:</strong> 20 stig × 12 spurningar = 240 max</li>
                <li><strong>Ábending:</strong> -2 stig ef notuð</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Ábendingar / Tips:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Breyttu alltaf mL í L þegar þörf krefur</li>
                <li>Passaðu einingarnar í formúlunum</li>
                <li>2% skekkja er leyfileg í svörum</li>
                <li>Notaðu ábendinguna ef þú festist</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setShowInstructions(false)}
            className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 text-lg"
          >
            Byrja að spila / Start Playing! 🚀
          </button>
        </div>
      </div>
    );
  }

  if (!gameState.isPlaying && !gameState.gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-6 text-cyan-600">
            💧 Solution Concentration Lab
          </h1>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">
                Veldu erfiðleikastig / Choose your difficulty:
              </p>
            </div>

            <div className="grid gap-4">
              <button
                onClick={() => {
                  setGameState(prev => ({ ...prev, difficulty: 'easy' }));
                  setTimeout(startGame, 100);
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-6 rounded-xl transition-colors"
              >
                <div className="text-2xl mb-2">😊</div>
                <div className="text-xl">Auðvelt / Easy</div>
                <div className="text-sm opacity-90 mt-2">8 spurningar - Einföld útþynning og mólstyrkur</div>
              </button>

              <button
                onClick={() => {
                  setGameState(prev => ({ ...prev, difficulty: 'medium' }));
                  setTimeout(startGame, 100);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-6 px-6 rounded-xl transition-colors"
              >
                <div className="text-2xl mb-2">🤔</div>
                <div className="text-xl">Miðlungs / Medium</div>
                <div className="text-sm opacity-90 mt-2">10 spurningar - Með massi og mólþyngd</div>
              </button>

              <button
                onClick={() => {
                  setGameState(prev => ({ ...prev, difficulty: 'hard' }));
                  setTimeout(startGame, 100);
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-6 px-6 rounded-xl transition-colors"
              >
                <div className="text-2xl mb-2">😰</div>
                <div className="text-xl">Erfitt / Hard</div>
                <div className="text-sm opacity-90 mt-2">12 spurningar - Blöndun og flókin verkefni</div>
              </button>
            </div>

            <button
              onClick={() => setShowInstructions(true)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              📖 Sjá leiðbeiningar / View Instructions
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState.gameOver) {
    const accuracy = gameState.questionsAnswered > 0 
      ? ((gameState.correctAnswers / gameState.questionsAnswered) * 100).toFixed(1)
      : '0';
    
    const maxScore = gameState.difficulty === 'easy' ? 80 : 
                     gameState.difficulty === 'medium' ? 150 : 240;
    const percentage = ((gameState.score / maxScore) * 100).toFixed(0);

    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-6 text-cyan-600">
            🎉 Til hamingju! / Congratulations!
          </h1>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-100 to-blue-100 p-6 rounded-xl">
              <div className="text-center">
                <div className="text-6xl font-bold text-cyan-600 mb-2">{gameState.score}</div>
                <div className="text-xl text-gray-700">af {maxScore} stigum mögulegum</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">{percentage}%</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-600">{gameState.totalProblems}</div>
                <div className="text-sm text-gray-700">Spurningar / Questions</div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl text-center">
                <div className="text-3xl font-bold text-green-600">{gameState.correctAnswers}</div>
                <div className="text-sm text-gray-700">Rétt / Correct</div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl text-center col-span-2">
                <div className="text-3xl font-bold text-yellow-600">{accuracy}%</div>
                <div className="text-sm text-gray-700">Nákvæmni / Accuracy</div>
              </div>
            </div>

            <div className="bg-cyan-50 p-4 rounded-xl">
              <h3 className="font-semibold text-center mb-2">
                {parseInt(percentage) >= 90 ? '🌟 Fullkomið! / Perfect!' :
                 parseInt(percentage) >= 75 ? '👍 Frábært! / Excellent!' :
                 parseInt(percentage) >= 60 ? '💪 Vel gert! / Well done!' :
                 '📚 Haltu áfram! / Keep practicing!'}
              </h3>
              <p className="text-center text-sm text-gray-700">
                {parseInt(percentage) >= 90 ? 'Þú skilur mólstyrk fullkomlega!' :
                 parseInt(percentage) >= 75 ? 'Mjög góð þekking á lausnum!' :
                 parseInt(percentage) >= 60 ? 'Á góðri leið!' :
                 'Æfðu meira með formúlunum!'}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetGame}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                Velja stig / Choose Level
              </button>
              <button
                onClick={() => startGame()}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-6 rounded-xl transition-colors"
              >
                Spila aftur / Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-cyan-600 flex items-center gap-2">
              <Droplet size={32} />
              Solution Lab
            </h1>
            
            <div className="flex gap-4 items-center">
              <div className="text-center">
                <div className="flex items-center gap-2 text-cyan-600 mb-1">
                  <Trophy size={20} />
                  <span className="text-2xl font-bold">{gameState.score}</span>
                </div>
                <div className="text-xs text-gray-600">Stig / Score</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {gameState.problemsCompleted}/{gameState.totalProblems}
                </div>
                <div className="text-xs text-gray-600">Framvinda / Progress</div>
              </div>
            </div>

            <button
              onClick={() => setShowInstructions(true)}
              className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
            >
              <HelpCircle size={24} />
            </button>
          </div>

          <div className="mt-4 bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(gameState.problemsCompleted / gameState.totalProblems) * 100}%` }}
            />
          </div>
        </div>

        {/* Problem Area */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {gameState.currentProblem && (
            <>
              <div className="mb-6">
                <div className="inline-block bg-cyan-100 px-4 py-2 rounded-full text-sm font-semibold text-cyan-700 mb-4">
                  {gameState.currentProblem.type === 'dilution' ? 'Útþynning / Dilution' :
                   gameState.currentProblem.type === 'molarity' ? 'Mólstyrkur / Molarity' :
                   'Blöndun / Mixing'}
                </div>
                
                <div className="text-xl text-gray-800 leading-relaxed">
                  {gameState.currentProblem.question}
                </div>
              </div>

              {gameState.showHint && (
                <div className="mb-4 bg-yellow-50 border-2 border-yellow-300 p-4 rounded-xl">
                  <h4 className="font-semibold text-yellow-800 mb-1 flex items-center gap-2">
                    <HelpCircle size={20} />
                    Ábending / Hint: (-2 stig)
                  </h4>
                  <p className="text-yellow-900">{gameState.currentProblem.hint}</p>
                </div>
              )}

              {/* Answer Input */}
              <div className="max-w-md mx-auto">
                {!gameState.showFeedback ? (
                  <div className="space-y-4">
                    <div className="flex gap-2 items-end">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Svar / Answer:
                        </label>
                        <input
                          ref={inputRef}
                          type="number"
                          step="0.001"
                          value={gameState.userAnswer}
                          onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
                          onKeyPress={handleKeyPress}
                          placeholder="0.000"
                          className="w-full p-3 text-xl border-2 border-cyan-300 rounded-lg focus:border-cyan-500 focus:outline-none text-center font-bold"
                          autoFocus
                        />
                      </div>
                      <div className="text-xl font-bold text-gray-600 pb-3">
                        {gameState.currentProblem.unit}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {!gameState.showHint && (
                        <button
                          onClick={() => setGameState(prev => ({ ...prev, showHint: true }))}
                          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                        >
                          Ábending 💡 (-2)
                        </button>
                      )}
                      <button
                        onClick={checkAnswer}
                        disabled={!gameState.userAnswer.trim()}
                        className={`${gameState.showHint ? 'flex-1' : 'flex-1'} bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-lg transition-colors`}
                      >
                        Athuga / Check ✓
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`p-6 rounded-xl ${gameState.lastAnswerCorrect ? 'bg-green-50 border-4 border-green-300' : 'bg-red-50 border-4 border-red-300'}`}>
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {gameState.lastAnswerCorrect ? '✅' : '❌'}
                      </div>
                      <div className="text-2xl font-bold mb-2">
                        {gameState.lastAnswerCorrect ? 'Rétt! / Correct!' : 'Rangt / Incorrect'}
                      </div>
                      <div className="text-lg text-gray-700">
                        Rétt svar: <span className="font-bold">{gameState.currentProblem.answer.toFixed(3)} {gameState.currentProblem.unit}</span>
                      </div>
                      {!gameState.lastAnswerCorrect && (
                        <div className="text-sm text-gray-600 mt-2">
                          Þitt svar: {gameState.userAnswer} {gameState.currentProblem.unit}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolutionLab;
