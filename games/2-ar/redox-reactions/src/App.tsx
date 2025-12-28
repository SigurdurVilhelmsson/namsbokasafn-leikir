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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-amber-600">
            Til hamingju!
          </h1>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <div className="text-2xl font-bold text-gray-800">Þú hefur lokið öllum stigum!</div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-blue-800">Stig 1: Oxunartölur</div>
                <div className="text-sm text-blue-600">Reglur og æfingar</div>
              </div>
              <div className="text-2xl font-bold text-blue-600">{scores.level1 || 0}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-green-800">Stig 2: Greina redox</div>
                <div className="text-sm text-green-600">Oxun og afoxun</div>
              </div>
              <div className="text-2xl font-bold text-green-600">{scores.level2 || 0}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-purple-800">Stig 3: Jafna jöfnur</div>
                <div className="text-sm text-purple-600">Hálf-hvörf aðferð</div>
              </div>
              <div className="text-2xl font-bold text-purple-600">{scores.level3 || 0}</div>
            </div>
            <div className="bg-amber-100 p-4 rounded-xl flex justify-between items-center border-2 border-amber-400">
              <div className="font-bold text-amber-800 text-lg">Heildarstig</div>
              <div className="text-3xl font-bold text-amber-600">{totalScore}</div>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-xl mb-6">
            <h2 className="font-bold text-amber-800 mb-3">Hvað lærðir þú?</h2>
            <ul className="space-y-2 text-amber-900 text-sm">
              <li>✓ <strong>Oxunartölur:</strong> Ímyndað hleðsla ef öll tengisl væru jónatengisl</li>
              <li>✓ <strong>Oxun:</strong> Tapa rafeindum = oxunartala hækkar</li>
              <li>✓ <strong>Afoxun:</strong> Öðlast rafeindir = oxunartala lækkar</li>
              <li>✓ <strong>Jafnvægi:</strong> Rafeinda-töp = rafeinda-ávöxtun</li>
            </ul>
          </div>

          <button onClick={resetGame} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-xl">
            Spila aftur
          </button>
        </div>
      </div>
    );
  }

  // Main menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-amber-600">
          ⚡ Oxun og Afoxun
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Lærðu um rafeindiflutning og redox-hvörf
        </p>

        <div className="bg-amber-50 p-6 rounded-xl mb-8">
          <h2 className="font-bold text-amber-800 mb-3">Hvað eru redox-hvörf?</h2>
          <p className="text-amber-900 text-sm mb-4">
            <strong>Redox-hvörf</strong> eru efnahvörf þar sem rafeindir flytjast milli atóma.
            Eitt efni <em>oxast</em> (tapar rafeindum) á meðan annað <em>afoxast</em> (öðlast rafeindir).
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-100 p-3 rounded-lg text-center">
              <div className="font-bold text-blue-800">Oxun</div>
              <div className="text-blue-600">Tapa e⁻ → ox# ↑</div>
            </div>
            <div className="bg-red-100 p-3 rounded-lg text-center">
              <div className="font-bold text-red-800">Afoxun</div>
              <div className="text-red-600">Öðlast e⁻ → ox# ↓</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setActiveLevel('level1')}
            className="w-full p-6 rounded-xl border-4 border-blue-400 bg-blue-50 hover:bg-blue-100 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">🔢</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-blue-800">Stig 1: Oxunartölur</span>
                  {scores.level1 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">✓ {scores.level1}</span>
                  )}
                </div>
                <div className="text-sm text-blue-600 mt-1">Lærðu reglurnar og æfðu þig</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveLevel('level2')}
            className={`w-full p-6 rounded-xl border-4 text-left ${
              scores.level1 !== null ? 'border-green-400 bg-green-50 hover:bg-green-100' : 'border-gray-200 bg-gray-50 opacity-75'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">🔄</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-bold ${scores.level1 !== null ? 'text-green-800' : 'text-gray-600'}`}>
                    Stig 2: Greina redox-hvörf
                  </span>
                  {scores.level2 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">✓ {scores.level2}</span>
                  )}
                </div>
                <div className={`text-sm mt-1 ${scores.level1 !== null ? 'text-green-600' : 'text-gray-500'}`}>
                  Greindu hvað oxast og afoxast
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveLevel('level3')}
            className={`w-full p-6 rounded-xl border-4 text-left ${
              scores.level2 !== null ? 'border-purple-400 bg-purple-50 hover:bg-purple-100' : 'border-gray-200 bg-gray-50 opacity-75'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">⚖️</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-bold ${scores.level2 !== null ? 'text-purple-800' : 'text-gray-600'}`}>
                    Stig 3: Jafna redox-jöfnur
                  </span>
                  {scores.level3 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">✓ {scores.level3}</span>
                  )}
                </div>
                <div className={`text-sm mt-1 ${scores.level2 !== null ? 'text-purple-600' : 'text-gray-500'}`}>
                  Notaðu hálf-hvörf aðferðina
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-2">📋 Reglur um oxunartölur</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-white p-2 rounded border">Hreint frumefni = 0</div>
            <div className="bg-white p-2 rounded border">Einatóma jón = hleðsla</div>
            <div className="bg-white p-2 rounded border">H = +1 (yfirleitt)</div>
            <div className="bg-white p-2 rounded border">O = -2 (yfirleitt)</div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          Sérsniðið námsefni — Redox efnafræði
        </div>
      </div>
    </div>
  );
}

export default App;
