import { useState, useEffect, useMemo } from 'react';
import { PeriodicTable } from './PeriodicTable';

// Atomic mass data
const ATOMIC_MASSES: Record<string, { mass: number; approxMass: number; name: string; color: string }> = {
  H: { mass: 1.008, approxMass: 1, name: 'Vetni', color: '#F3F4F6' },
  C: { mass: 12.011, approxMass: 12, name: 'Kolefni', color: '#4B5563' },
  N: { mass: 14.007, approxMass: 14, name: 'Köfnunarefni', color: '#3B82F6' },
  O: { mass: 15.999, approxMass: 16, name: 'Súrefni', color: '#EF4444' },
  S: { mass: 32.065, approxMass: 32, name: 'Brennisteinn', color: '#EAB308' },
  Cl: { mass: 35.453, approxMass: 35, name: 'Klór', color: '#22C55E' },
  Na: { mass: 22.990, approxMass: 23, name: 'Natríum', color: '#8B5CF6' },
  Ca: { mass: 40.078, approxMass: 40, name: 'Kalsíum', color: '#F97316' },
  Fe: { mass: 55.845, approxMass: 56, name: 'Járn', color: '#78716C' },
  K: { mass: 39.098, approxMass: 39, name: 'Kalíum', color: '#EC4899' },
  Mg: { mass: 24.305, approxMass: 24, name: 'Magnesíum', color: '#14B8A6' },
  P: { mass: 30.974, approxMass: 31, name: 'Fosfór', color: '#F59E0B' },
};

// Mystery molecules with clues
interface MysteryCompound {
  formula: string;
  name: string;
  elements: { symbol: string; count: number }[];
  molarMass: number;
  clues: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

const MYSTERY_COMPOUNDS: MysteryCompound[] = [
  // Easy - common molecules
  {
    formula: 'H₂O',
    name: 'Vatn',
    elements: [{ symbol: 'H', count: 2 }, { symbol: 'O', count: 1 }],
    molarMass: 18.015,
    clues: ['Algengasta efnið á jörðinni', 'Inniheldur vetni og súrefni', '2 frumeindir af einni tegund'],
    difficulty: 'easy'
  },
  {
    formula: 'CO₂',
    name: 'Koltvísýringur',
    elements: [{ symbol: 'C', count: 1 }, { symbol: 'O', count: 2 }],
    molarMass: 44.009,
    clues: ['Gróðurhúsagas', 'Inniheldur kolefni', 'Tvær súrefnisfrumeindir'],
    difficulty: 'easy'
  },
  {
    formula: 'NaCl',
    name: 'Borðsalt',
    elements: [{ symbol: 'Na', count: 1 }, { symbol: 'Cl', count: 1 }],
    molarMass: 58.44,
    clues: ['Notað á mat', 'Jóntengi', 'Eitt af hvoru frumefni'],
    difficulty: 'easy'
  },
  {
    formula: 'CH₄',
    name: 'Metan',
    elements: [{ symbol: 'C', count: 1 }, { symbol: 'H', count: 4 }],
    molarMass: 16.043,
    clues: ['Jarðgas', 'Einfaldasta kolvatnsefnið', 'Fjögur vetnisatóm'],
    difficulty: 'easy'
  },
  // Medium
  {
    formula: 'NH₃',
    name: 'Ammóníak',
    elements: [{ symbol: 'N', count: 1 }, { symbol: 'H', count: 3 }],
    molarMass: 17.031,
    clues: ['Sterkur lykt', 'Notað í hreinsiefni', 'Eitt köfnunarefnisatóm'],
    difficulty: 'medium'
  },
  {
    formula: 'H₂SO₄',
    name: 'Brennisteinssýra',
    elements: [{ symbol: 'H', count: 2 }, { symbol: 'S', count: 1 }, { symbol: 'O', count: 4 }],
    molarMass: 98.079,
    clues: ['Sterk sýra', 'Inniheldur brennistein', 'Fjögur súrefnisatóm'],
    difficulty: 'medium'
  },
  {
    formula: 'CaCO₃',
    name: 'Kalsíumkarbónat',
    elements: [{ symbol: 'Ca', count: 1 }, { symbol: 'C', count: 1 }, { symbol: 'O', count: 3 }],
    molarMass: 100.09,
    clues: ['Krítskeljar', 'Inniheldur kalsíum', 'Þrjú frumefni'],
    difficulty: 'medium'
  },
  {
    formula: 'C₆H₁₂O₆',
    name: 'Glúkósi',
    elements: [{ symbol: 'C', count: 6 }, { symbol: 'H', count: 12 }, { symbol: 'O', count: 6 }],
    molarMass: 180.16,
    clues: ['Einfaldur sykur', '6 kolefnisatóm', 'Orkugjafi líkamans'],
    difficulty: 'hard'
  },
  {
    formula: 'Fe₂O₃',
    name: 'Járnoxíð',
    elements: [{ symbol: 'Fe', count: 2 }, { symbol: 'O', count: 3 }],
    molarMass: 159.69,
    clues: ['Ryð', 'Rauðbrúnn litur', 'Inniheldur járn'],
    difficulty: 'hard'
  },
  {
    formula: 'C₂H₅OH',
    name: 'Etanól',
    elements: [{ symbol: 'C', count: 2 }, { symbol: 'H', count: 6 }, { symbol: 'O', count: 1 }],
    molarMass: 46.07,
    clues: ['Áfengi', 'Tvö kolefnisatóm', 'Eitt súrefnisatóm'],
    difficulty: 'medium'
  },
];

type ChallengeType = 'identify' | 'build' | 'complete';

interface Challenge {
  type: ChallengeType;
  compound: MysteryCompound;
  options?: MysteryCompound[]; // For identify type
  partialFormula?: { symbol: string; count: number | null }[]; // For complete type
  revealedClues: number;
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function calculateMolarMass(elements: { symbol: string; count: number }[]): number {
  return elements.reduce((sum, el) => {
    const atom = ATOMIC_MASSES[el.symbol];
    return sum + (atom ? atom.mass * el.count : 0);
  }, 0);
}

function generateChallenge(challengeNumber: number): Challenge {
  const types: ChallengeType[] = ['identify', 'build', 'complete'];
  const type = types[challengeNumber % types.length];

  // Select difficulty based on challenge number
  const difficulties: ('easy' | 'medium' | 'hard')[] =
    challengeNumber < 3 ? ['easy'] :
    challengeNumber < 6 ? ['easy', 'medium'] :
    ['medium', 'hard'];

  const availableCompounds = MYSTERY_COMPOUNDS.filter(c =>
    difficulties.includes(c.difficulty)
  );
  const compound = availableCompounds[Math.floor(Math.random() * availableCompounds.length)];

  switch (type) {
    case 'identify': {
      // Create options including the correct answer
      const others = shuffle(MYSTERY_COMPOUNDS.filter(c => c.formula !== compound.formula)).slice(0, 3);
      const options = shuffle([compound, ...others]);
      return { type, compound, options, revealedClues: 0 };
    }

    case 'build': {
      return { type, compound, revealedClues: 0 };
    }

    case 'complete': {
      // Create partial formula with some counts hidden
      const partial = compound.elements.map((el, i) => ({
        symbol: el.symbol,
        count: i === 0 || Math.random() > 0.5 ? el.count : null
      }));
      return { type, compound, partialFormula: partial, revealedClues: 0 };
    }

    default:
      return { type: 'identify', compound, revealedClues: 0 };
  }
}

interface MysteryMoleculeProps {
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
}

export function MysteryMolecule({ onComplete, onBack }: MysteryMoleculeProps) {
  const [challengeNumber, setChallengeNumber] = useState(0);
  const [challenge, setChallenge] = useState<Challenge>(() => generateChallenge(0));
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showPeriodicTable, setShowPeriodicTable] = useState(false);

  // Build mode state
  const [builtElements, setBuiltElements] = useState<{ symbol: string; count: number }[]>([]);

  // Complete mode state
  const [completeCounts, setCompleteCounts] = useState<Record<string, number>>({});

  const totalChallenges = 8;
  const maxScore = totalChallenges * 15;
  const isComplete = challengeNumber >= totalChallenges;

  // Reset state when challenge changes
  useEffect(() => {
    setShowFeedback(false);
    setBuiltElements([]);
    setCompleteCounts({});
  }, [challenge]);

  const currentMass = useMemo(() =>
    calculateMolarMass(builtElements),
    [builtElements]
  );

  const revealClue = () => {
    if (challenge.revealedClues < challenge.compound.clues.length) {
      setChallenge(prev => ({ ...prev, revealedClues: prev.revealedClues + 1 }));
    }
  };

  const checkIdentify = (selected: MysteryCompound) => {
    const correct = selected.formula === challenge.compound.formula;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      // Bonus for fewer clues used
      const clueBonus = Math.max(0, 3 - challenge.revealedClues) * 3;
      setScore(prev => prev + 15 + clueBonus);
    }
  };

  const checkBuild = () => {
    const builtMass = calculateMolarMass(builtElements);
    const targetMass = challenge.compound.molarMass;
    const correct = Math.abs(builtMass - targetMass) < 1;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      const clueBonus = Math.max(0, 3 - challenge.revealedClues) * 3;
      setScore(prev => prev + 15 + clueBonus);
    }
  };

  const checkComplete = () => {
    let allCorrect = true;
    challenge.partialFormula?.forEach(el => {
      if (el.count === null) {
        const target = challenge.compound.elements.find(e => e.symbol === el.symbol);
        if (completeCounts[el.symbol] !== target?.count) {
          allCorrect = false;
        }
      }
    });
    setIsCorrect(allCorrect);
    setShowFeedback(true);
    if (allCorrect) {
      setScore(prev => prev + 15);
    }
  };

  const addElement = (symbol: string) => {
    const existing = builtElements.find(e => e.symbol === symbol);
    if (existing) {
      setBuiltElements(prev =>
        prev.map(e => e.symbol === symbol ? { ...e, count: e.count + 1 } : e)
      );
    } else {
      setBuiltElements(prev => [...prev, { symbol, count: 1 }]);
    }
  };

  const removeElement = (symbol: string) => {
    const existing = builtElements.find(e => e.symbol === symbol);
    if (existing && existing.count > 1) {
      setBuiltElements(prev =>
        prev.map(e => e.symbol === symbol ? { ...e, count: e.count - 1 } : e)
      );
    } else {
      setBuiltElements(prev => prev.filter(e => e.symbol !== symbol));
    }
  };

  const nextChallenge = () => {
    const next = challengeNumber + 1;
    setChallengeNumber(next);
    if (next < totalChallenges) {
      setChallenge(generateChallenge(next));
    }
  };

  // Complete screen
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🔮</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Leyndardómshamur Lokið!</h2>
          <p className="text-gray-600 mb-6">Þú ert orðinn meistari í að greina sameindir!</p>

          <div className="bg-indigo-50 rounded-xl p-4 mb-6">
            <div className="text-4xl font-bold text-indigo-600">{score}</div>
            <div className="text-sm text-gray-600">af {maxScore} stigum</div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onComplete(score, maxScore)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Til baka í valmynd
            </button>
            <button
              onClick={() => {
                setChallengeNumber(0);
                setScore(0);
                setChallenge(generateChallenge(0));
              }}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Spila aftur
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderChallenge = () => {
    switch (challenge.type) {
      case 'identify':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Hvaða sameind hefur þennan mólmassa?</p>
              <div className="text-5xl font-bold text-indigo-600 mb-4">
                ≈ {Math.round(challenge.compound.molarMass)} g/mol
              </div>
            </div>

            {/* Clues */}
            <div className="bg-yellow-50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-yellow-800">Vísbendingar:</span>
                {challenge.revealedClues < challenge.compound.clues.length && (
                  <button
                    onClick={revealClue}
                    className="text-xs bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-3 py-1 rounded-full transition-colors"
                  >
                    Sýna vísbendingu ({challenge.compound.clues.length - challenge.revealedClues} eftir)
                  </button>
                )}
              </div>
              <ul className="space-y-1">
                {challenge.compound.clues.slice(0, challenge.revealedClues).map((clue, i) => (
                  <li key={i} className="text-sm text-yellow-700 flex items-center gap-2">
                    <span>💡</span> {clue}
                  </li>
                ))}
                {challenge.revealedClues === 0 && (
                  <li className="text-sm text-yellow-600 italic">Smelltu á hnappinn til að fá vísbendingar</li>
                )}
              </ul>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
              {challenge.options?.map((opt) => (
                <button
                  key={opt.formula}
                  onClick={() => !showFeedback && checkIdentify(opt)}
                  disabled={showFeedback}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    showFeedback && opt.formula === challenge.compound.formula
                      ? 'border-green-500 bg-green-50'
                      : showFeedback
                        ? 'border-gray-200 opacity-50'
                        : 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50'
                  }`}
                >
                  <div className="text-2xl font-bold text-gray-800">{opt.formula}</div>
                  <div className="text-sm text-gray-600">{opt.name}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'build':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Byggðu sameind með þessum mólmassa:</p>
              <div className="text-5xl font-bold text-indigo-600 mb-2">
                ≈ {Math.round(challenge.compound.molarMass)} g/mol
              </div>
              <div className={`text-lg font-semibold ${
                Math.abs(currentMass - challenge.compound.molarMass) < 1
                  ? 'text-green-600'
                  : 'text-gray-500'
              }`}>
                Núverandi: {currentMass.toFixed(1)} g/mol
              </div>
            </div>

            {/* Clues */}
            <div className="bg-yellow-50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-yellow-800">Vísbendingar:</span>
                {challenge.revealedClues < challenge.compound.clues.length && (
                  <button
                    onClick={revealClue}
                    className="text-xs bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-3 py-1 rounded-full transition-colors"
                  >
                    Sýna vísbendingu
                  </button>
                )}
              </div>
              <ul className="space-y-1">
                {challenge.compound.clues.slice(0, challenge.revealedClues).map((clue, i) => (
                  <li key={i} className="text-sm text-yellow-700 flex items-center gap-2">
                    <span>💡</span> {clue}
                  </li>
                ))}
              </ul>
            </div>

            {/* Built formula display */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-2">Þín sameind:</div>
              <div className="flex flex-wrap items-center gap-2 min-h-[60px]">
                {builtElements.length === 0 ? (
                  <span className="text-gray-400 italic">Smelltu á frumefni til að bæta við</span>
                ) : (
                  builtElements.map(el => (
                    <div
                      key={el.symbol}
                      className="flex items-center gap-1 bg-white rounded-lg px-3 py-2 shadow-sm"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          backgroundColor: ATOMIC_MASSES[el.symbol]?.color || '#888',
                          color: el.symbol === 'H' || el.symbol === 'S' ? '#1F2937' : '#FFFFFF'
                        }}
                      >
                        {el.symbol}
                      </div>
                      <span className="text-lg font-semibold">{el.count > 1 ? el.count : ''}</span>
                      <button
                        onClick={() => removeElement(el.symbol)}
                        className="ml-1 w-5 h-5 rounded-full bg-red-100 hover:bg-red-200 text-red-600 text-xs flex items-center justify-center"
                      >
                        −
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Element buttons */}
            <div className="grid grid-cols-6 gap-2">
              {Object.entries(ATOMIC_MASSES).map(([symbol, data]) => (
                <button
                  key={symbol}
                  onClick={() => !showFeedback && addElement(symbol)}
                  disabled={showFeedback}
                  className="p-2 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all disabled:opacity-50"
                >
                  <div
                    className="w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      backgroundColor: data.color,
                      color: symbol === 'H' || symbol === 'S' ? '#1F2937' : '#FFFFFF'
                    }}
                  >
                    {symbol}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">≈{data.approxMass}</div>
                </button>
              ))}
            </div>

            {/* Check button */}
            {!showFeedback && builtElements.length > 0 && (
              <button
                onClick={checkBuild}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                Athuga svar
              </button>
            )}
          </div>
        );

      case 'complete':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Ljúktu við formúluna:</p>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {challenge.compound.name}
              </div>
              <div className="text-lg text-indigo-600">
                Mólmassi: ≈ {Math.round(challenge.compound.molarMass)} g/mol
              </div>
            </div>

            {/* Partial formula to complete */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {challenge.partialFormula?.map((el, i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: ATOMIC_MASSES[el.symbol]?.color || '#888',
                        color: el.symbol === 'H' || el.symbol === 'S' ? '#1F2937' : '#FFFFFF'
                      }}
                    >
                      {el.symbol}
                    </div>
                    {el.count !== null ? (
                      <span className="text-2xl font-bold ml-1">{el.count > 1 ? el.count : ''}</span>
                    ) : (
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={completeCounts[el.symbol] || ''}
                        onChange={(e) => setCompleteCounts(prev => ({
                          ...prev,
                          [el.symbol]: parseInt(e.target.value) || 0
                        }))}
                        disabled={showFeedback}
                        className="w-12 h-10 ml-1 text-2xl font-bold text-center border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        placeholder="?"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Check button */}
            {!showFeedback && (
              <button
                onClick={checkComplete}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                Athuga svar
              </button>
            )}

            {/* Show correct answer in feedback */}
            {showFeedback && (
              <div className={`p-4 rounded-xl ${isCorrect ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <p className={`font-bold ${isCorrect ? 'text-green-800' : 'text-yellow-800'}`}>
                  {isCorrect ? '✓ Rétt!' : 'Ekki alveg...'}
                </p>
                <p className="text-gray-700 mt-1">
                  Rétt formúla: {challenge.compound.formula}
                </p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">🔮 Leyndardómssameind</h1>
              <p className="text-sm text-gray-600">Greindu sameindina út frá mólmassanum</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{score}</div>
              <div className="text-xs text-gray-600">Stig</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Áskorun {challengeNumber + 1}/{totalChallenges}</span>
              <span>
                {challenge.type === 'identify' ? 'Þekkja' :
                 challenge.type === 'build' ? 'Byggja' : 'Ljúka'}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${((challengeNumber + 1) / totalChallenges) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Periodic table button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowPeriodicTable(true)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
          >
            📊 Lotukerfið
          </button>
        </div>

        {/* Challenge Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          {renderChallenge()}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`rounded-xl p-4 mb-4 ${isCorrect ? 'bg-green-100 border-2 border-green-500' : 'bg-yellow-100 border-2 border-yellow-500'}`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{isCorrect ? '🎉' : '💡'}</span>
              <div>
                <p className={`text-lg font-bold ${isCorrect ? 'text-green-800' : 'text-yellow-800'}`}>
                  {isCorrect ? 'Rétt!' : 'Ekki alveg...'}
                </p>
                {isCorrect && (
                  <p className="text-green-700 text-sm">
                    +{15 + Math.max(0, 3 - challenge.revealedClues) * 3} stig!
                  </p>
                )}
              </div>
            </div>

            {!isCorrect && (
              <p className="text-yellow-800 mt-2 text-sm">
                Rétt svar: <strong>{challenge.compound.formula}</strong> ({challenge.compound.name})
              </p>
            )}

            <button
              onClick={nextChallenge}
              className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              {challengeNumber + 1 < totalChallenges ? 'Næsta áskorun →' : 'Sjá niðurstöður →'}
            </button>
          </div>
        )}

        {/* Back button */}
        <button
          onClick={onBack}
          className="w-full text-gray-500 hover:text-gray-700 font-semibold py-2"
        >
          ← Til baka í valmynd
        </button>
      </div>

      {/* Periodic Table Modal */}
      {showPeriodicTable && (
        <PeriodicTable
          onClose={() => setShowPeriodicTable(false)}
          showApproximate={true}
        />
      )}
    </div>
  );
}

export default MysteryMolecule;
