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

  if (activeLevel === 'level1') {
    return <Level1 onComplete={handleLevel1Complete} onBack={() => setActiveLevel('menu')} />;
  }

  if (activeLevel === 'level2') {
    return <Level2 onComplete={handleLevel2Complete} onBack={() => setActiveLevel('menu')} />;
  }

  if (activeLevel === 'level3') {
    return <Level3 onComplete={handleLevel3Complete} onBack={() => setActiveLevel('menu')} />;
  }

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
            <div className="bg-purple-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-purple-800">Stig 1: Tegundir</div>
                <div className="text-sm text-purple-600">Greina millisameindakrafta</div>
              </div>
              <div className="text-2xl font-bold text-purple-600">{scores.level1 || 0}</div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-blue-800">Stig 2: Röðun</div>
                <div className="text-sm text-blue-600">Raða efnum eftir eiginleikum</div>
              </div>
              <div className="text-2xl font-bold text-blue-600">{scores.level2 || 0}</div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-green-800">Stig 3: Greining</div>
                <div className="text-sm text-green-600">Flókin samanburður</div>
              </div>
              <div className="text-2xl font-bold text-green-600">{scores.level3 || 0}</div>
            </div>

            <div className="bg-indigo-100 p-4 rounded-xl flex justify-between items-center border-2 border-indigo-400">
              <div className="font-bold text-indigo-800 text-lg">Heildarstig</div>
              <div className="text-3xl font-bold text-indigo-600">{totalScore}</div>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-xl mb-6">
            <h2 className="font-bold text-indigo-800 mb-3">Hvað lærðir þú?</h2>
            <ul className="space-y-2 text-indigo-900 text-sm">
              <li>✓ <strong>London kraftar:</strong> Til staðar í öllum sameindum, eykst með stærð</li>
              <li>✓ <strong>Tvípól-tvípól:</strong> Milli skauttaðra sameinda</li>
              <li>✓ <strong>Vetnistengi:</strong> H við F, O, eða N — sterkasta tegund</li>
              <li>✓ <strong>Áhrif:</strong> Sterkari IMF → hærra suðumark, seigja, yfirborðsspenna</li>
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
          🔍 Millisameindakraftar
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Lærðu að greina krafta milli sameinda og áhrif þeirra á eðliseiginleika
        </p>

        {/* Pedagogical explanation */}
        <div className="bg-indigo-50 p-6 rounded-xl mb-8">
          <h2 className="font-bold text-indigo-800 mb-3">Hvað eru millisameindakraftar (IMF)?</h2>
          <p className="text-indigo-900 text-sm mb-4">
            <strong>Millisameindakraftar</strong> eru aðdráttarkraftar milli sameinda sem ákvarða
            eðliseiginleika eins og suðumark, bræðslumark og seigju. Þeir eru veikari en efnatengi
            en afar mikilvægir fyrir hegðun efna.
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-purple-100 p-2 rounded-lg">
              <div className="font-bold text-purple-800">London</div>
              <div className="text-purple-600">Veikastur</div>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <div className="font-bold text-blue-800">Tvípól-tvípól</div>
              <div className="text-blue-600">Meðal</div>
            </div>
            <div className="bg-red-100 p-2 rounded-lg">
              <div className="font-bold text-red-800">Vetnistengi</div>
              <div className="text-red-600">Sterkastur</div>
            </div>
          </div>
        </div>

        {/* Level selection */}
        <div className="space-y-4">
          <button
            onClick={() => setActiveLevel('level1')}
            className="w-full p-6 rounded-xl border-4 border-purple-400 bg-purple-50 hover:bg-purple-100 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">🔬</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-purple-800">Stig 1: Greina IMF tegundir</span>
                  {scores.level1 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      ✓ {scores.level1} stig
                    </span>
                  )}
                </div>
                <div className="text-sm text-purple-600 mt-1">
                  Lærðu að greina hvaða kraftar eru til staðar í sameind
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveLevel('level2')}
            className={`w-full p-6 rounded-xl border-4 transition-all text-left ${
              scores.level1 !== null
                ? 'border-blue-400 bg-blue-50 hover:bg-blue-100'
                : 'border-gray-200 bg-gray-50 opacity-75'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">📊</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-bold ${scores.level1 !== null ? 'text-blue-800' : 'text-gray-600'}`}>
                    Stig 2: Raða eftir eiginleikum
                  </span>
                  {scores.level2 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      ✓ {scores.level2} stig
                    </span>
                  )}
                </div>
                <div className={`text-sm mt-1 ${scores.level1 !== null ? 'text-blue-600' : 'text-gray-500'}`}>
                  Raðaðu efnum eftir suðumarki, seigju o.fl.
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveLevel('level3')}
            className={`w-full p-6 rounded-xl border-4 transition-all text-left ${
              scores.level2 !== null
                ? 'border-green-400 bg-green-50 hover:bg-green-100'
                : 'border-gray-200 bg-gray-50 opacity-75'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">🧠</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-bold ${scores.level2 !== null ? 'text-green-800' : 'text-gray-600'}`}>
                    Stig 3: Flókin greining
                  </span>
                  {scores.level3 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      ✓ {scores.level3} stig
                    </span>
                  )}
                </div>
                <div className={`text-sm mt-1 ${scores.level2 !== null ? 'text-green-600' : 'text-gray-500'}`}>
                  Berðu saman efni og útskýrðu áhrif á eiginleika
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* IMF Reference */}
        <div className="mt-8 bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-3">📋 Tegundir millisameindakrafta</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
              <span className="font-bold text-purple-700 w-32">London (LDF)</span>
              <span className="text-purple-600">Öll efni — eykst með mólmassa og yfirborðsflatarmáli</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
              <span className="font-bold text-blue-700 w-32">Tvípól-tvípól</span>
              <span className="text-blue-600">Skautaðar sameindir — δ+ laðar að δ-</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-red-50 rounded">
              <span className="font-bold text-red-700 w-32">Vetnistengi</span>
              <span className="text-red-600">H bundið við F, O, eða N — sterkasta IMF</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          Kafli 11 — Chemistry: The Central Science (Brown et al.)
        </div>
      </div>
    </div>
  );
}

export default App;
