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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-orange-600">
            🏆 Til hamingju!
          </h1>

          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              Þú hefur lokið öllum stigum!
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-blue-800">Stigur 1: Hugtök</div>
                <div className="text-sm text-blue-600">Sjónræn meðhöndlun</div>
              </div>
              <div className="text-2xl font-bold text-blue-600">{scores.level1 || 0}</div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-green-800">Stigur 2: Rökstuðningur</div>
                <div className="text-sm text-green-600">Spá fyrir um breytingar</div>
              </div>
              <div className="text-2xl font-bold text-green-600">{scores.level2 || 0}</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-purple-800">Stigur 3: Útreikningar</div>
                <div className="text-sm text-purple-600">Nota formúlur</div>
              </div>
              <div className="text-2xl font-bold text-purple-600">{scores.level3 || 0}</div>
            </div>

            <div className="bg-orange-100 p-4 rounded-xl flex justify-between items-center border-2 border-orange-400">
              <div className="font-bold text-orange-800 text-lg">Heildarstig</div>
              <div className="text-3xl font-bold text-orange-600">{totalScore}</div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-xl mb-6">
            <h2 className="font-bold text-yellow-800 mb-3">Hvað lærðir þú?</h2>
            <ul className="space-y-2 text-yellow-900 text-sm">
              <li>✓ <strong>Stigur 1:</strong> Styrkur = sameindir / rúmmál (sjónrænt)</li>
              <li>✓ <strong>Stigur 2:</strong> Spá fyrir um hvernig breytingar hafa áhrif á styrk</li>
              <li>✓ <strong>Stigur 3:</strong> Nota M₁V₁ = M₂V₂ og aðrar formúlur</li>
            </ul>
          </div>

          <button
            onClick={resetGame}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
          >
            Spila aftur
          </button>
        </div>
      </div>
    );
  }

  // Main menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-orange-600">
          💧 Lausnir
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Lærðu um mólstyrk, útþynningu og lausnir
        </p>

        {/* Pedagogical explanation */}
        <div className="bg-orange-50 p-6 rounded-xl mb-8">
          <h2 className="font-bold text-orange-800 mb-3">Hvernig virkar þetta?</h2>
          <p className="text-orange-900 text-sm mb-4">
            Þessi leikur notar <strong>hugtakamiðaða nálgun</strong> sem byggir á rannsóknum
            í kennslu raunvísinda. Þú byrjar á að <em>skilja</em> hugtökin sjónrænt,
            síðan <em>spáir þú</em> fyrir um breytingar, og að lokum <em>reiknar þú</em>
            með formúlum.
          </p>
          <div className="text-xs text-orange-700">
            Innblásið af PhET Interactive Simulations (University of Colorado Boulder)
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
              <div className="text-4xl">🔬</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-blue-800">Stigur 1: Hugtök</span>
                  {scores.level1 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      ✓ {scores.level1} stig
                    </span>
                  )}
                </div>
                <div className="text-sm text-blue-600 mt-1">
                  Sjónræn meðhöndlun - ENGIN útreikningar
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  Dragðu, smelltu og sjáðu hvernig styrkur breytist í rauntíma.
                  Byggðu innsæi fyrir M = n/V.
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
              <div className="text-4xl">🤔</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-bold ${scores.level1 !== null ? 'text-green-800' : 'text-gray-600'}`}>
                    Stigur 2: Rökstuðningur
                  </span>
                  {scores.level2 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      ✓ {scores.level2} stig
                    </span>
                  )}
                </div>
                <div className={`text-sm mt-1 ${scores.level1 !== null ? 'text-green-600' : 'text-gray-500'}`}>
                  Spáðu fyrir um breytingar - fjölval
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  "Hvað gerist ef...?" spurningar. Notaðu hugtökin sem þú lærðir.
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
              <div className="text-4xl">📐</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-bold ${scores.level2 !== null ? 'text-purple-800' : 'text-gray-600'}`}>
                    Stigur 3: Útreikningar
                  </span>
                  {scores.level3 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      ✓ {scores.level3} stig
                    </span>
                  )}
                </div>
                <div className={`text-sm mt-1 ${scores.level2 !== null ? 'text-purple-600' : 'text-gray-500'}`}>
                  Notaðu formúlur til að reikna
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  M₁V₁ = M₂V₂, mól = massi/mólmassi. Nú skilur þú HVERS VEGNA þær virka!
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Formula reference */}
        <div className="mt-8 bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-2">📐 Formúlur (Stigur 3)</h3>
          <div className="font-mono text-sm space-y-1 text-gray-600">
            <p>M = mól / L (mólstyrkur)</p>
            <p>M₁V₁ = M₂V₂ (útþynning)</p>
            <p>mól = massi(g) / mólmassi(g/mol)</p>
            <p>M = (M₁V₁ + M₂V₂) / (V₁ + V₂) (blöndun)</p>
          </div>
        </div>

        {/* Credits */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Hönnuð með hugtakamiðaðri nálgun innblásinni af PhET Simulations
        </div>
      </div>
    </div>
  );
}

export default App;
