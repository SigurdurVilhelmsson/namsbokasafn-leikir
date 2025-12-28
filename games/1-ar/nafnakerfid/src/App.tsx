import { useState, useEffect, useCallback } from 'react';
import { getRandomCompounds, Difficulty } from './data/compounds';
import { Card as CardComponent } from './components/Card';
import { Card as CardType, GameState } from './types';

type Screen = 'menu' | 'difficulty' | 'playing' | 'win';

interface Progress {
  gamesPlayed: number;
  bestMoves: { [key: string]: number };
  totalMatches: number;
}

const STORAGE_KEY = 'nafnakerfidProgress';

// Fisher-Yates shuffle for reliable randomization
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function loadProgress(): Progress {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return { gamesPlayed: 0, bestMoves: {}, totalMatches: 0 };
    }
  }
  return { gamesPlayed: 0, bestMoves: {}, totalMatches: 0 };
}

function saveProgress(progress: Progress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function App() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [pairCount, setPairCount] = useState<6 | 8 | 10>(6);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [progress, setProgress] = useState<Progress>(loadProgress());

  const initializeGame = useCallback((diff: Difficulty, pairs: 6 | 8 | 10) => {
    const compounds = getRandomCompounds(pairs, diff);

    const cards: CardType[] = [];
    compounds.forEach((compound, index) => {
      cards.push({
        id: `formula-${index}`,
        type: 'formula',
        compound,
        isFlipped: false,
        isMatched: false,
      });
      cards.push({
        id: `name-${index}`,
        type: 'name',
        compound,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards using Fisher-Yates
    const shuffled = shuffle(cards);

    setGameState({
      cards: shuffled,
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      gameStarted: true,
      gameComplete: false,
      difficulty: diff,
      pairCount: pairs,
    });

    setDifficulty(diff);
    setPairCount(pairs);
    setScreen('playing');
  }, []);

  const handleCardClick = useCallback((cardId: string) => {
    if (!gameState) return;

    const card = gameState.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    if (gameState.flippedCards.length >= 2) return;

    const newFlippedCards = [...gameState.flippedCards, cardId];

    setGameState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        cards: prev.cards.map(c =>
          c.id === cardId ? { ...c, isFlipped: true } : c
        ),
        flippedCards: newFlippedCards,
      };
    });

    // Check for match when 2 cards are flipped
    if (newFlippedCards.length === 2) {
      const card1 = gameState.cards.find(c => c.id === newFlippedCards[0]);
      const card2 = gameState.cards.find(c => c.id === newFlippedCards[1]);

      if (card1 && card2 && card1.compound.formula === card2.compound.formula) {
        // Match!
        setTimeout(() => {
          setGameState(prev => {
            if (!prev) return prev;
            const newMatchedPairs = prev.matchedPairs + 1;
            const newState = {
              ...prev,
              cards: prev.cards.map(c =>
                c.id === card1.id || c.id === card2.id
                  ? { ...c, isMatched: true, isFlipped: true }
                  : c
              ),
              flippedCards: [],
              matchedPairs: newMatchedPairs,
              moves: prev.moves + 1,
              gameComplete: newMatchedPairs === prev.pairCount,
            };
            return newState;
          });
        }, 500);
      } else {
        // No match - flip back
        setTimeout(() => {
          setGameState(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              cards: prev.cards.map(c =>
                c.id === card1?.id || c.id === card2?.id
                  ? { ...c, isFlipped: false }
                  : c
              ),
              flippedCards: [],
              moves: prev.moves + 1,
            };
          });
        }, 1000);
      }
    }
  }, [gameState]);

  // Handle game completion
  useEffect(() => {
    if (gameState?.gameComplete) {
      const key = `${difficulty}-${pairCount}`;
      setProgress(prevProgress => {
        const newProgress = {
          gamesPlayed: prevProgress.gamesPlayed + 1,
          bestMoves: {
            ...prevProgress.bestMoves,
            [key]: Math.min(prevProgress.bestMoves[key] || Infinity, gameState.moves),
          },
          totalMatches: prevProgress.totalMatches + gameState.matchedPairs,
        };
        saveProgress(newProgress);
        return newProgress;
      });
      setScreen('win');
    }
  }, [gameState?.gameComplete, gameState?.moves, gameState?.matchedPairs, difficulty, pairCount]);

  // Menu Screen
  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">Nafnapör</h1>
          <p className="text-center text-gray-600 mb-8">Læra nöfn efnasambanda með minnisleik</p>

          <div className="space-y-4">
            <button
              onClick={() => setScreen('difficulty')}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-lg transition-colors"
            >
              Byrja Leik
            </button>
          </div>

          {progress.gamesPlayed > 0 && (
            <div className="mt-8 bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Snögg yfirlit:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Leikir: {progress.gamesPlayed}</div>
                <div>Samtals pör: {progress.totalMatches}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Difficulty Selection
  if (screen === 'difficulty') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Veldu erfiðleikastig</h2>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`p-6 rounded-lg font-bold transition-all ${
                    difficulty === diff
                      ? diff === 'easy' ? 'bg-green-500 text-white' :
                        diff === 'medium' ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {diff === 'easy' ? 'Auðvelt' :
                   diff === 'medium' ? 'Miðlungs' :
                   'Erfitt'}
                </button>
              ))}
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Fjöldi para:</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {([6, 8, 10] as const).map((count) => (
              <button
                key={count}
                onClick={() => setPairCount(count)}
                className={`p-4 rounded-lg font-bold transition-all ${
                  pairCount === count
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {count} pör
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setScreen('menu')}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Til baka
            </button>
            <button
              onClick={() => initializeGame(difficulty, pairCount)}
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Byrja →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Win Screen
  if (screen === 'win' && gameState) {
    const key = `${difficulty}-${pairCount}`;
    const bestMoves = progress.bestMoves[key];

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Til hamingju!</h2>
            <p className="text-gray-600">Þú fannt öll pörin!</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-600">{gameState.moves}</div>
              <div className="text-sm text-gray-600 mt-2">Fjöldi leikja</div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-600">{bestMoves || gameState.moves}</div>
              <div className="text-sm text-gray-600 mt-2">Besta árangur</div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => initializeGame(difficulty, pairCount)}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Spila aftur
            </button>
            <button
              onClick={() => setScreen('menu')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Aftur í valmynd
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing Screen
  if (screen === 'playing' && gameState) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with stats */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-4">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{gameState.moves}</div>
                  <div className="text-xs text-gray-600">Leikir</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {gameState.matchedPairs}/{pairCount}
                  </div>
                  <div className="text-xs text-gray-600">Pör fundinn</div>
                </div>
              </div>

              <button
                onClick={() => setScreen('menu')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Hætta við
              </button>
            </div>
          </div>

          {/* Game board */}
          <div className={`grid gap-3 ${
            pairCount === 6 ? 'grid-cols-3 sm:grid-cols-4' :
            pairCount === 8 ? 'grid-cols-4' :
            'grid-cols-4 sm:grid-cols-5'
          }`}>
            {gameState.cards.map((card) => (
              <CardComponent
                key={card.id}
                card={card}
                onClick={() => handleCardClick(card.id)}
                disabled={gameState.flippedCards.length >= 2}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
