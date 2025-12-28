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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4 md:p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-600">
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
                <div className="font-bold text-blue-800">Stig 1: Hraðahugtök</div>
                <div className="text-sm text-blue-600">Hvað hefur áhrif á hraða?</div>
              </div>
              <div className="text-2xl font-bold text-blue-600">{scores.level1 || 0}</div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-green-800">Stig 2: Hraðalögmál</div>
                <div className="text-sm text-green-600">Byggja hraðajöfnur</div>
              </div>
              <div className="text-2xl font-bold text-green-600">{scores.level2 || 0}</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-purple-800">Stig 3: Hvarfgangsháttur</div>
                <div className="text-sm text-purple-600">Frumskref og millistig</div>
              </div>
              <div className="text-2xl font-bold text-purple-600">{scores.level3 || 0}</div>
            </div>

            <div className="bg-orange-100 p-4 rounded-xl flex justify-between items-center border-2 border-orange-400">
              <div className="font-bold text-orange-800 text-lg">Heildarstig</div>
              <div className="text-3xl font-bold text-orange-600">{totalScore}</div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl mb-6">
            <h2 className="font-bold text-green-800 mb-3">Hvað lærðir þú?</h2>
            <ul className="space-y-2 text-green-900 text-sm">
              <li>✓ <strong>Hraði:</strong> Rate = Δ[efni]/Δt — hversu hratt efnahvörf gerast</li>
              <li>✓ <strong>Hraðalögmál:</strong> Rate = k[A]<sup>m</sup>[B]<sup>n</sup> — tengsl við styrk</li>
              <li>✓ <strong>Röð hvörfunar:</strong> Veldisvísir segir hversu mikið styrkur hefur áhrif</li>
              <li>✓ <strong>Hvarfgangsháttur:</strong> Röð frumskref sem mynda heildarhvörf</li>
              <li>✓ <strong>Hraðaákvarðandi skref:</strong> Hægasta skrefið ræður heildarhraða</li>
            </ul>
          </div>

          <button
            onClick={resetGame}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
          >
            Spila aftur
          </button>
        </div>
      </div>
    );
  }

  // Main menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-green-600">
          ⏱️ Hvarfhraði
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Lærðu um hraða efnahvarfa, hraðalögmál og hvarfgangshátt
        </p>

        {/* Pedagogical explanation */}
        <div className="bg-green-50 p-6 rounded-xl mb-8">
          <h2 className="font-bold text-green-800 mb-3">Hvað er hvarfhraði?</h2>
          <p className="text-green-900 text-sm mb-4">
            <strong>Hvarfhraði (reaction rate)</strong> lýsir því hversu hratt hvarfefni breytast í afurðir.
            Hraðinn ákvarðast af mörgum þáttum: styrk hvarfefna, hitastigi, hvata og yfirborðsflatarmáli.
          </p>
          <div className="bg-white p-3 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 font-mono text-center">
              Rate = k[A]<sup>m</sup>[B]<sup>n</sup>
            </p>
            <p className="text-xs text-gray-600 text-center mt-1">
              þar sem k = hraðafasti, m og n = veldisvísir (röð hvörfunar)
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
              <div className="text-4xl">🔬</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-blue-800">Stig 1: Hraðahugtök</span>
                  {scores.level1 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      ✓ {scores.level1} stig
                    </span>
                  )}
                </div>
                <div className="text-sm text-blue-600 mt-1">
                  Hvað hefur áhrif á hvarfhraða?
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  Styrk, hitastig, hvatar, yfirborð — sjáðu hvernig þessir þættir breyta hraðanum.
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
              <div className="text-4xl">📊</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-bold ${scores.level1 !== null ? 'text-green-800' : 'text-gray-600'}`}>
                    Stig 2: Hraðalögmál
                  </span>
                  {scores.level2 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      ✓ {scores.level2} stig
                    </span>
                  )}
                </div>
                <div className={`text-sm mt-1 ${scores.level1 !== null ? 'text-green-600' : 'text-gray-500'}`}>
                  Byggja og túlka hraðalögmál
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  Notaðu gögn til að finna röð hvörfunar og hraðafast.
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
              <div className="text-4xl">⚙️</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-bold ${scores.level2 !== null ? 'text-purple-800' : 'text-gray-600'}`}>
                    Stig 3: Hvarfgangsháttur
                  </span>
                  {scores.level3 !== null && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      ✓ {scores.level3} stig
                    </span>
                  )}
                </div>
                <div className={`text-sm mt-1 ${scores.level2 !== null ? 'text-purple-600' : 'text-gray-500'}`}>
                  Frumskref og hraðaákvarðandi skref
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  Greindu hvarfgangshætti og finndu millistig.
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Formula reference */}
        <div className="mt-8 bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-2">📐 Lykilformúlur</h3>
          <div className="font-mono text-sm space-y-2 text-gray-600">
            <p><strong>Meðalhraði:</strong> Rate = -Δ[hvarfefni]/Δt = +Δ[afurð]/Δt</p>
            <p><strong>Hraðalögmál:</strong> Rate = k[A]<sup>m</sup>[B]<sup>n</sup></p>
            <p><strong>Röð hvörfunar:</strong> m + n = heildarröð</p>
            <p><strong>Arrhenius:</strong> k = Ae<sup>-E<sub>a</sub>/RT</sup></p>
          </div>
        </div>

        {/* Credits */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Kafli 14 — Chemistry: The Central Science (Brown et al.)
        </div>
      </div>
    </div>
  );
}

export default App;
