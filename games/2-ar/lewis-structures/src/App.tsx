import { useState } from 'react';
import { Level1 } from './components/Level1';
import { Level2 } from './components/Level2';
import { Level3 } from './components/Level3';

type ActiveLevel = 'menu' | 'level1' | 'level2' | 'level3' | 'complete';

interface LevelScore {
  level1: number | null;
  level2: number | null;
  level3: number | null;
}

function App() {
  const [activeLevel, setActiveLevel] = useState<ActiveLevel>('menu');
  const [scores, setScores] = useState<LevelScore>({
    level1: null,
    level2: null,
    level3: null
  });

  const handleLevel1Complete = (score: number) => {
    setScores(prev => ({ ...prev, level1: score }));
    setActiveLevel('level2');
  };

  const handleLevel2Complete = (score: number) => {
    setScores(prev => ({ ...prev, level2: score }));
    setActiveLevel('level3');
  };

  const handleLevel3Complete = (score: number) => {
    setScores(prev => ({ ...prev, level3: score }));
    setActiveLevel('complete');
  };

  const resetGame = () => {
    setScores({ level1: null, level2: null, level3: null });
    setActiveLevel('menu');
  };

  // Render active level
  if (activeLevel === 'level1') {
    return <Level1 onComplete={handleLevel1Complete} onBack={() => setActiveLevel('menu')} />;
  }

  if (activeLevel === 'level2') {
    return <Level2 onComplete={handleLevel2Complete} onBack={() => setActiveLevel('menu')} />;
  }

  if (activeLevel === 'level3') {
    return <Level3 onComplete={handleLevel3Complete} onBack={() => setActiveLevel('menu')} />;
  }

  // Complete screen
  if (activeLevel === 'complete') {
    const totalScore = (scores.level1 || 0) + (scores.level2 || 0) + (scores.level3 || 0);

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-indigo-600">
            Til hamingju!
          </h1>

          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              Þú hefur lokið öllum stigum!
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-blue-800">Stig 1: Gildisrafeindir</div>
                <div className="text-sm text-blue-600">Telja og skilja</div>
              </div>
              <div className="text-2xl font-bold text-blue-600">{scores.level1 || 0}</div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-green-800">Stig 2: Teikna Lewis</div>
                <div className="text-sm text-green-600">Byggja formúlur</div>
              </div>
              <div className="text-2xl font-bold text-green-600">{scores.level2 || 0}</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-purple-800">Stig 3: Formhleðsla</div>
                <div className="text-sm text-purple-600">Samsvörunarformúlur</div>
              </div>
              <div className="text-2xl font-bold text-purple-600">{scores.level3 || 0}</div>
            </div>

            <div className="bg-orange-100 p-4 rounded-xl flex justify-between items-center border-2 border-orange-400">
              <div className="font-bold text-orange-800 text-lg">Heildarstig</div>
              <div className="text-3xl font-bold text-orange-600">{totalScore}</div>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-xl mb-6">
            <h2 className="font-bold text-indigo-800 mb-3">Hvað lærðir þú?</h2>
            <ul className="space-y-2 text-indigo-900 text-sm">
              <li>✓ <strong>Gildisrafeindir:</strong> Rafeindir í ystu skel ákvarða efnatengsl</li>
              <li>✓ <strong>Áttureglann:</strong> Atóm vilja hafa 8 rafeindir (H vill 2)</li>
              <li>✓ <strong>Lewis-formúlur:</strong> Sýna hvernig rafeindir dreifast í sameindum</li>
              <li>✓ <strong>Formhleðsla:</strong> FC = Gildisraf. - (óbundin + ½ bundin)</li>
              <li>✓ <strong>Samsvörun:</strong> Margar jafngildar formúlur fyrir sömu sameind</li>
            </ul>
          </div>

          <button
            onClick={resetGame}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
          >
            Spila aftur
          </button>
        </div>
      </div>
    );
  }

  // Main menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-indigo-600">
          ⚛️ Lewis-formúlur
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Lærðu að teikna rafeindasamsetningu sameinda
        </p>

        {/* Pedagogical explanation */}
        <div className="bg-indigo-50 p-6 rounded-xl mb-8">
          <h2 className="font-bold text-indigo-800 mb-3">Hvað eru Lewis-formúlur?</h2>
          <p className="text-indigo-900 text-sm mb-4">
            <strong>Lewis-formúlur</strong> (eða rafeinapunktaformúlur) sýna hvernig gildisrafeindir
            dreifast á milli atóma í sameind. Þær hjálpa okkur að skilja efnatengsl og
            lögun sameinda.
          </p>
          <div className="bg-white p-3 rounded-lg border border-indigo-200">
            <p className="text-sm text-indigo-800 font-mono text-center">
              Alls rafeindir = Σ gildisrafeindir - hleðsla
            </p>
          </div>
        </div>

        {/* Level selection */}
        <div className="space-y-4">
          {/* Level 1 */}
          <button
            onClick={() => setActiveLevel('level1')}
            className="w-full p-6 rounded-xl border-4 border-blue-400 bg-blue-50 hover:bg-blue-100 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">🔢</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-blue-800">Stig 1: Gildisrafeindir</span>
                  {scores.level1 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      ✓ {scores.level1} stig
                    </span>
                  )}
                </div>
                <div className="text-sm text-blue-600 mt-1">
                  Telja gildisrafeindir og skilja átturegluna
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  Hvaða rafeindir taka þátt í efnatengslum? Lærðu að telja þær.
                </div>
              </div>
            </div>
          </button>

          {/* Level 2 */}
          <button
            onClick={() => setActiveLevel('level2')}
            className={`w-full p-6 rounded-xl border-4 transition-all text-left ${
              scores.level1 !== null
                ? 'border-green-400 bg-green-50 hover:bg-green-100'
                : 'border-gray-200 bg-gray-50 opacity-75'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">✏️</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-bold ${scores.level1 !== null ? 'text-green-800' : 'text-gray-600'}`}>
                    Stig 2: Teikna Lewis-formúlur
                  </span>
                  {scores.level2 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      ✓ {scores.level2} stig
                    </span>
                  )}
                </div>
                <div className={`text-sm mt-1 ${scores.level1 !== null ? 'text-green-600' : 'text-gray-500'}`}>
                  Byggja Lewis-formúlur skref fyrir skref
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  Settu miðatóm, teiknaðu tengsl og einstæð rafeindarapör.
                </div>
              </div>
            </div>
          </button>

          {/* Level 3 */}
          <button
            onClick={() => setActiveLevel('level3')}
            className={`w-full p-6 rounded-xl border-4 transition-all text-left ${
              scores.level2 !== null
                ? 'border-purple-400 bg-purple-50 hover:bg-purple-100'
                : 'border-gray-200 bg-gray-50 opacity-75'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">⚖️</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-bold ${scores.level2 !== null ? 'text-purple-800' : 'text-gray-600'}`}>
                    Stig 3: Formhleðsla og samsvörun
                  </span>
                  {scores.level3 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      ✓ {scores.level3} stig
                    </span>
                  )}
                </div>
                <div className={`text-sm mt-1 ${scores.level2 !== null ? 'text-purple-600' : 'text-gray-500'}`}>
                  Reikna formhleðslu og finna samsvörunarformúlur
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  Hvernig finnur þú bestu Lewis-formúluna?
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Valence electron reference */}
        <div className="mt-8 bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-2">🔢 Gildisrafeindir eftir hópi</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-sm">
            <div className="bg-red-50 p-2 rounded text-center">
              <div className="font-bold text-red-700">1</div>
              <div className="text-xs text-red-600">H, Li, Na</div>
            </div>
            <div className="bg-orange-50 p-2 rounded text-center">
              <div className="font-bold text-orange-700">2</div>
              <div className="text-xs text-orange-600">Be, Mg</div>
            </div>
            <div className="bg-yellow-50 p-2 rounded text-center">
              <div className="font-bold text-yellow-700">3</div>
              <div className="text-xs text-yellow-600">B, Al</div>
            </div>
            <div className="bg-green-50 p-2 rounded text-center">
              <div className="font-bold text-green-700">4</div>
              <div className="text-xs text-green-600">C, Si</div>
            </div>
            <div className="bg-teal-50 p-2 rounded text-center">
              <div className="font-bold text-teal-700">5</div>
              <div className="text-xs text-teal-600">N, P</div>
            </div>
            <div className="bg-blue-50 p-2 rounded text-center">
              <div className="font-bold text-blue-700">6</div>
              <div className="text-xs text-blue-600">O, S</div>
            </div>
            <div className="bg-purple-50 p-2 rounded text-center">
              <div className="font-bold text-purple-700">7</div>
              <div className="text-xs text-purple-600">F, Cl, Br</div>
            </div>
            <div className="bg-gray-100 p-2 rounded text-center">
              <div className="font-bold text-gray-700">8</div>
              <div className="text-xs text-gray-600">Ne, Ar</div>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Kafli 8 — Chemistry: The Central Science (Brown et al.)
        </div>
      </div>
    </div>
  );
}

export default App;
