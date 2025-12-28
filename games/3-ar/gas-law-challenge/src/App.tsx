import { useState, useEffect, useRef } from 'react';
import { GasLawQuestion, GameMode, GameStats, QuestionFeedback } from './types';
import { questions, getRandomQuestion } from './data';
import { checkAnswer, calculateError, getUnit, getVariableName } from './utils/gas-calculations';

const STORAGE_KEY = 'gas-law-challenge-progress';

function loadStats(): GameStats {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return getDefaultStats();
    }
  }
  return getDefaultStats();
}

function getDefaultStats(): GameStats {
  return {
    score: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    streak: 0,
    bestStreak: 0,
    hintsUsed: 0,
    totalTime: 0
  };
}

function saveStats(stats: GameStats): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

/**
 * Particle class for gas visualization
 */
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;

  constructor(width: number, height: number, speed: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.radius = 4;
    this.color = '#3b82f6';
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off walls
    if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.vx *= -1;
      this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
    }
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.vy *= -1;
      this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function App() {
  // Game state
  const [screen, setScreen] = useState<'menu' | 'game' | 'feedback'>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('practice');
  const [currentQuestion, setCurrentQuestion] = useState<GasLawQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [feedback, setFeedback] = useState<QuestionFeedback | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  // Stats with localStorage persistence
  const [stats, setStats] = useState<GameStats>(loadStats);

  // Save stats whenever they change
  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  const resetStats = () => {
    const newStats = getDefaultStats();
    setStats(newStats);
    saveStats(newStats);
  };

  // Particle visualization
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  // Start new question
  const startNewQuestion = (mode: GameMode) => {
    const question = getRandomQuestion();
    setGameMode(mode);
    setCurrentQuestion(question);
    setUserAnswer('');
    setShowHint(0);
    setShowSolution(false);
    setFeedback(null);
    setTimeRemaining(mode === 'challenge' ? 90 : null);
    setScreen('game');

    // Initialize particles based on question
    if (question.given.n) {
      const numParticles = Math.floor(question.given.n.value * 50);
      const speed = question.given.T ? Math.sqrt(question.given.T.value) / 10 : 2;
      const canvas = canvasRef.current;
      if (canvas) {
        particlesRef.current = Array.from({ length: numParticles }, () =>
          new Particle(canvas.width, canvas.height, speed)
        );
      }
    }
  };

  // Timer for challenge mode
  useEffect(() => {
    if (screen === 'game' && gameMode === 'challenge' && timeRemaining !== null && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      checkUserAnswer();
    }
  }, [screen, gameMode, timeRemaining]);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || screen !== 'game') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw container
      ctx.strokeStyle = getPressureColor();
      ctx.lineWidth = getPressureThickness();
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [screen, currentQuestion]);

  // Get pressure-based color for container
  const getPressureColor = (): string => {
    if (!currentQuestion) return '#3b82f6';
    const pressure = currentQuestion.find === 'P'
      ? currentQuestion.answer
      : currentQuestion.given.P?.value || 1;

    if (pressure < 1) return '#3b82f6'; // Blue
    if (pressure < 5) return '#22c55e'; // Green
    return '#ef4444'; // Red
  };

  const getPressureThickness = (): number => {
    if (!currentQuestion) return 2;
    const pressure = currentQuestion.find === 'P'
      ? currentQuestion.answer
      : currentQuestion.given.P?.value || 1;

    if (pressure < 1) return 2;
    if (pressure < 5) return 4;
    return 6;
  };

  // Check user answer
  const checkUserAnswer = () => {
    if (!currentQuestion) return;

    const userNum = parseFloat(userAnswer);
    if (isNaN(userNum)) {
      alert('Vinsamlegast sláðu inn gilt númer');
      return;
    }

    const isCorrect = checkAnswer(userNum, currentQuestion.answer, currentQuestion.tolerance);
    const error = calculateError(userNum, currentQuestion.answer);

    let points = 0;
    let message = '';

    if (isCorrect) {
      points = 100;
      if (error < 1) points = 150; // Very accurate
      if (gameMode === 'challenge' && timeRemaining && timeRemaining > 60) points += 50; // Time bonus
      points -= showHint * 10; // Hint penalty

      message = error < 1
        ? 'Fullkomið! Mjög nákvæmt svar! ⭐'
        : 'Rétt! Innan vikmarka ✓';
    } else {
      message = error < 5
        ? 'Næstum rétt! Reyndu aftur.'
        : 'Ekki rétt. Athugaðu útreikninga þína.';
    }

    const newStats = {
      ...stats,
      questionsAnswered: stats.questionsAnswered + 1,
      correctAnswers: isCorrect ? stats.correctAnswers + 1 : stats.correctAnswers,
      streak: isCorrect ? stats.streak + 1 : 0,
      bestStreak: isCorrect ? Math.max(stats.bestStreak, stats.streak + 1) : stats.bestStreak,
      score: stats.score + points,
      hintsUsed: stats.hintsUsed + showHint
    };

    setStats(newStats);
    setFeedback({
      isCorrect,
      message,
      points,
      userAnswer: userNum,
      correctAnswer: currentQuestion.answer,
      difference: Math.abs(userNum - currentQuestion.answer),
      explanation: currentQuestion.solution.steps.join(' → ')
    });
    setScreen('feedback');
  };

  // Get next hint
  const getHint = () => {
    if (!currentQuestion || showHint >= currentQuestion.hints.length) return;
    setShowHint(showHint + 1);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (screen !== 'game') return;

      if (e.key === 'Enter') {
        e.preventDefault();
        checkUserAnswer();
      } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        getHint();
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        setShowSolution(!showSolution);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [screen, userAnswer, showSolution]);

  // ==================== RENDER ====================

  // Menu Screen
  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4" style={{ color: '#f36b22' }}>
                Gas Law Challenge
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                Læðu að leysa verkefni um tilvalin lofttegundalögmál: PV = nRT
              </p>
              <p className="text-sm text-gray-500">
                {questions.length} spurningar í boði • Auðvelt, Miðlungs, Erfitt
              </p>

              {/* Stats */}
              {stats.questionsAnswered > 0 && (
                <div className="mt-4">
                  <div className="flex justify-center gap-4 text-sm flex-wrap">
                    <div className="bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                      <span className="font-bold text-yellow-800">🏆 Stig: {stats.score}</span>
                    </div>
                    <div className="bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                      <span className="font-bold text-green-800">✓ Rétt: {stats.correctAnswers}/{stats.questionsAnswered}</span>
                    </div>
                    <div className="bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                      <span className="font-bold text-blue-800">🔥 Besta röð: {stats.bestStreak}</span>
                    </div>
                  </div>
                  <button
                    onClick={resetStats}
                    className="mt-3 text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Endurstilla framvindu
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Practice Mode */}
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                <h2 className="text-2xl font-bold mb-3 text-blue-900">Æfingahamur</h2>
                <ul className="text-gray-700 mb-4 space-y-2 text-sm">
                  <li>✓ Engin tímatakmörk</li>
                  <li>✓ Ótakmarkaðar vísbendingar</li>
                  <li>✓ Sjá lausnir skref fyrir skref</li>
                  <li>✓ Leggja áherslu á nám</li>
                </ul>
                <button
                  onClick={() => startNewQuestion('practice')}
                  className="w-full py-3 px-6 rounded-lg font-bold text-white transition hover:opacity-90"
                  style={{ backgroundColor: '#3b82f6' }}
                >
                  Byrja að Æfa
                </button>
              </div>

              {/* Challenge Mode */}
              <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                <h2 className="text-2xl font-bold mb-3 text-orange-900">Keppnishamur</h2>
                <ul className="text-gray-700 mb-4 space-y-2 text-sm">
                  <li>⏱️ 90 sekúndur á spurningu</li>
                  <li>🎯 Tíma bónus fyrir hraða</li>
                  <li>💡 Vísbendingar kosta stig (-10)</li>
                  <li>📊 Stigatafla og röð</li>
                </ul>
                <button
                  onClick={() => startNewQuestion('challenge')}
                  className="w-full py-3 px-6 rounded-lg font-bold text-white transition hover:opacity-90"
                  style={{ backgroundColor: '#f36b22' }}
                >
                  Byrja Keppni
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Leiðbeiningar:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p className="font-semibold">Tilvalin lofttegundalögmál:</p>
                  <p className="font-mono bg-white px-2 py-1 rounded mt-1">PV = nRT</p>
                  <p className="text-xs mt-1">þar sem R = 0.08206 L·atm/(mol·K)</p>
                </div>
                <div>
                  <p className="font-semibold">Lyklaborð:</p>
                  <p className="text-xs">• <kbd className="px-1 bg-gray-200 rounded">Enter</kbd> Athuga svar</p>
                  <p className="text-xs">• <kbd className="px-1 bg-gray-200 rounded">H</kbd> Vísbending</p>
                  <p className="text-xs">• <kbd className="px-1 bg-gray-200 rounded">S</kbd> Sýna lausn</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center text-sm text-gray-500 py-4">
          <p>© 2024 Kvennaskólinn - Efnafræðileikir</p>
        </footer>
      </div>
    );
  }

  // Game Screen
  if (screen === 'game' && currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#f36b22' }}>
                  Gas Law Challenge
                </h1>
                <p className="text-sm text-gray-600">
                  {gameMode === 'practice' ? 'Æfingahamur' : 'Keppnishamur'} • Spurning {currentQuestion.id}
                </p>
              </div>
              <div className="flex gap-2">
                {gameMode === 'challenge' && timeRemaining !== null && (
                  <div className={`px-4 py-2 rounded-lg font-bold ${timeRemaining < 30 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    ⏱️ {timeRemaining}s
                  </div>
                )}
                <button
                  onClick={() => setScreen('menu')}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  ← Valmynd
                </button>
              </div>
            </div>

            {/* Stats bar */}
            <div className="flex gap-4 mb-6 text-sm">
              <div className="bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
                <span className="font-bold text-yellow-800">🏆 {stats.score}</span>
              </div>
              <div className="bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                <span className="font-bold text-green-800">✓ {stats.correctAnswers}/{stats.questionsAnswered}</span>
              </div>
              <div className="bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                <span className="font-bold text-blue-800">🔥 {stats.streak}</span>
              </div>
              <div className={`px-3 py-2 rounded-lg border ${
                currentQuestion.difficulty === 'Auðvelt' ? 'bg-green-50 border-green-200 text-green-800' :
                currentQuestion.difficulty === 'Miðlungs' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                'bg-red-50 border-red-200 text-red-800'
              }`}>
                <span className="font-bold">{currentQuestion.difficulty}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Visualization */}
              <div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <h3 className="font-bold text-gray-800 mb-2">{currentQuestion.emoji} {currentQuestion.scenario_is}</h3>
                  <p className="text-sm text-gray-600">{currentQuestion.scenario_en}</p>
                </div>

                {/* Particle Canvas */}
                <div className="bg-gray-900 rounded-lg p-4">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={300}
                    className="w-full rounded"
                  />
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Lítlar agnir tákna lofttegundir • Litur: þrýstingur
                  </p>
                </div>

                {/* Given Values */}
                <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-2">Gefnar upplýsingar:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {currentQuestion.given.P && (
                      <div className="bg-white px-3 py-2 rounded">
                        <span className="font-semibold">P:</span> {currentQuestion.given.P.value} {currentQuestion.given.P.unit}
                      </div>
                    )}
                    {currentQuestion.given.V && (
                      <div className="bg-white px-3 py-2 rounded">
                        <span className="font-semibold">V:</span> {currentQuestion.given.V.value} {currentQuestion.given.V.unit}
                      </div>
                    )}
                    {currentQuestion.given.T && (
                      <div className="bg-white px-3 py-2 rounded">
                        <span className="font-semibold">T:</span> {currentQuestion.given.T.value} {currentQuestion.given.T.unit}
                      </div>
                    )}
                    {currentQuestion.given.n && (
                      <div className="bg-white px-3 py-2 rounded">
                        <span className="font-semibold">n:</span> {currentQuestion.given.n.value} {currentQuestion.given.n.unit}
                      </div>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-blue-800 font-mono bg-white px-2 py-1 rounded">
                    PV = nRT þar sem R = 0.08206 L·atm/(mol·K)
                  </div>
                </div>
              </div>

              {/* Right: Input and Hints */}
              <div>
                {/* Question */}
                <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200 mb-4">
                  <h3 className="font-bold text-orange-900 mb-2">
                    Finndu {getVariableName(currentQuestion.find)} ({currentQuestion.find}):
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Sláðu inn svar..."
                      className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none text-lg"
                      onKeyPress={(e) => e.key === 'Enter' && checkUserAnswer()}
                    />
                    <div className="bg-white px-4 py-3 rounded-lg border-2 border-gray-300 font-bold text-gray-700">
                      {getUnit(currentQuestion.find)}
                    </div>
                  </div>
                  <button
                    onClick={checkUserAnswer}
                    className="w-full mt-3 py-3 px-6 rounded-lg font-bold text-white transition hover:opacity-90"
                    style={{ backgroundColor: '#f36b22' }}
                  >
                    Athuga Svar (Enter)
                  </button>
                </div>

                {/* Hints */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-800">Vísbendingar:</h3>
                    <button
                      onClick={getHint}
                      disabled={showHint >= currentQuestion.hints.length}
                      className={`px-3 py-1 rounded-lg text-sm font-bold transition ${
                        showHint >= currentQuestion.hints.length
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      Vísbending (H) {gameMode === 'challenge' && '(-10 stig)'}
                    </button>
                  </div>
                  {showHint > 0 ? (
                    <div className="space-y-2">
                      {currentQuestion.hints.slice(0, showHint).map((hint, idx) => (
                        <div key={idx} className="bg-blue-50 px-3 py-2 rounded border border-blue-200 text-sm">
                          <span className="font-bold text-blue-800">💡 {idx + 1}:</span> {hint}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">Smelltu á "Vísbending" til að fá hjálp</p>
                  )}
                </div>

                {/* Solution Toggle */}
                {gameMode === 'practice' && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition font-bold text-sm"
                    >
                      {showSolution ? '🔒 Fela lausn' : '🔓 Sýna lausn (S)'}
                    </button>
                    {showSolution && (
                      <div className="mt-3 space-y-2 text-sm">
                        <div className="bg-white px-3 py-2 rounded border border-gray-300">
                          <span className="font-bold">Formúla:</span> {currentQuestion.solution.formula}
                        </div>
                        <div className="bg-white px-3 py-2 rounded border border-gray-300">
                          <span className="font-bold">Innsetning:</span> {currentQuestion.solution.substitution}
                        </div>
                        <div className="bg-white px-3 py-2 rounded border border-gray-300">
                          <span className="font-bold">Útreikningur:</span> {currentQuestion.solution.calculation}
                        </div>
                        <div className="bg-green-50 px-3 py-2 rounded border border-green-300 font-bold text-green-800">
                          Svar: {currentQuestion.answer.toFixed(2)} {getUnit(currentQuestion.find)}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Formula Reference */}
                <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs">
                  <p className="font-bold text-gray-700 mb-1">Upprifjun:</p>
                  <p className="text-gray-600">P = nRT/V • V = nRT/P • T = PV/nR • n = PV/RT</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Feedback Screen
  if (screen === 'feedback' && feedback && currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Result Header */}
            <div className={`text-center mb-6 p-6 rounded-xl ${
              feedback.isCorrect
                ? 'bg-green-50 border-2 border-green-300'
                : 'bg-red-50 border-2 border-red-300'
            }`}>
              <div className="text-6xl mb-2">{feedback.isCorrect ? '✅' : '❌'}</div>
              <h2 className={`text-3xl font-bold mb-2 ${
                feedback.isCorrect ? 'text-green-800' : 'text-red-800'
              }`}>
                {feedback.message}
              </h2>
              {feedback.isCorrect && (
                <div className="text-2xl font-bold text-yellow-600">
                  +{feedback.points} stig
                </div>
              )}
            </div>

            {/* Answer Comparison */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-900 mb-2">Þitt svar:</h3>
                <p className="text-2xl font-bold text-blue-800">
                  {feedback.userAnswer.toFixed(2)} {getUnit(currentQuestion.find)}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-900 mb-2">Rétt svar:</h3>
                <p className="text-2xl font-bold text-green-800">
                  {feedback.correctAnswer.toFixed(2)} {getUnit(currentQuestion.find)}
                </p>
              </div>
            </div>

            {/* Difference */}
            {!feedback.isCorrect && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
                <h3 className="font-bold text-yellow-900 mb-1">Mismunur:</h3>
                <p className="text-lg text-yellow-800">
                  {feedback.difference.toFixed(2)} {getUnit(currentQuestion.find)} frá réttum svari
                </p>
              </div>
            )}

            {/* Explanation */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Skref fyrir skref lausn:</h3>
              <div className="space-y-2 text-sm">
                {currentQuestion.solution.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="font-bold text-gray-600">{idx + 1}.</span>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-white p-3 rounded border border-gray-300">
                <p className="text-sm"><span className="font-bold">Formúla:</span> {currentQuestion.solution.formula}</p>
                <p className="text-sm"><span className="font-bold">Innsetning:</span> {currentQuestion.solution.substitution}</p>
                <p className="text-sm"><span className="font-bold">Útreikningur:</span> {currentQuestion.solution.calculation}</p>
              </div>
            </div>

            {/* Stats Update */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
              <h3 className="font-bold text-blue-900 mb-2">Árangur:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{stats.score}</div>
                  <div className="text-gray-600">Stig</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.correctAnswers}/{stats.questionsAnswered}</div>
                  <div className="text-gray-600">Rétt</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{stats.streak}</div>
                  <div className="text-gray-600">Núverandi röð</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{stats.bestStreak}</div>
                  <div className="text-gray-600">Besta röð</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <button
                onClick={() => startNewQuestion(gameMode)}
                className="flex-1 py-3 px-6 rounded-lg font-bold text-white transition hover:opacity-90"
                style={{ backgroundColor: '#f36b22' }}
              >
                ➡️ Næsta spurning
              </button>
              <button
                onClick={() => setScreen('menu')}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-bold"
              >
                📊 Valmynd
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
}

export default App;
