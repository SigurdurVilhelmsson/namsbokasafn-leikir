import { useState } from 'react';

interface Level4Props {
  onComplete: (score: number, maxScore?: number, hintsUsed?: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface BondEnthalpy {
  bond: string;
  displayBond: string;
  enthalpy: number; // kJ/mol
}

interface BondEnthalpyProblem {
  id: number;
  title: string;
  description: string;
  equation: string;
  bondsInReactants: { bond: string; count: number }[];
  bondsInProducts: { bond: string; count: number }[];
  expectedDeltaH: number;
  hessLawValue?: number; // For comparison
  hint: string;
  explanation: string;
}

// Average bond enthalpies (kJ/mol)
const BOND_ENTHALPIES: BondEnthalpy[] = [
  { bond: 'C-H', displayBond: 'C—H', enthalpy: 413 },
  { bond: 'C-C', displayBond: 'C—C', enthalpy: 348 },
  { bond: 'C=C', displayBond: 'C═C', enthalpy: 614 },
  { bond: 'C≡C', displayBond: 'C≡C', enthalpy: 839 },
  { bond: 'C-O', displayBond: 'C—O', enthalpy: 358 },
  { bond: 'C=O', displayBond: 'C═O', enthalpy: 799 },
  { bond: 'C≡O', displayBond: 'C≡O', enthalpy: 1072 },
  { bond: 'C-N', displayBond: 'C—N', enthalpy: 293 },
  { bond: 'C=N', displayBond: 'C═N', enthalpy: 615 },
  { bond: 'C≡N', displayBond: 'C≡N', enthalpy: 891 },
  { bond: 'C-Cl', displayBond: 'C—Cl', enthalpy: 328 },
  { bond: 'C-Br', displayBond: 'C—Br', enthalpy: 276 },
  { bond: 'H-H', displayBond: 'H—H', enthalpy: 436 },
  { bond: 'H-O', displayBond: 'H—O', enthalpy: 463 },
  { bond: 'H-N', displayBond: 'H—N', enthalpy: 391 },
  { bond: 'H-Cl', displayBond: 'H—Cl', enthalpy: 431 },
  { bond: 'H-Br', displayBond: 'H—Br', enthalpy: 366 },
  { bond: 'H-F', displayBond: 'H—F', enthalpy: 567 },
  { bond: 'O-O', displayBond: 'O—O', enthalpy: 146 },
  { bond: 'O=O', displayBond: 'O═O', enthalpy: 495 },
  { bond: 'N-N', displayBond: 'N—N', enthalpy: 163 },
  { bond: 'N=N', displayBond: 'N═N', enthalpy: 418 },
  { bond: 'N≡N', displayBond: 'N≡N', enthalpy: 941 },
  { bond: 'Cl-Cl', displayBond: 'Cl—Cl', enthalpy: 242 },
  { bond: 'Br-Br', displayBond: 'Br—Br', enthalpy: 193 },
  { bond: 'F-F', displayBond: 'F—F', enthalpy: 155 },
];

const BOND_ENTHALPY_MAP: Record<string, number> = Object.fromEntries(
  BOND_ENTHALPIES.map(b => [b.bond, b.enthalpy])
);

const BOND_DISPLAY_MAP: Record<string, string> = Object.fromEntries(
  BOND_ENTHALPIES.map(b => [b.bond, b.displayBond])
);

const problems: BondEnthalpyProblem[] = [
  {
    id: 1,
    title: 'Brennsla metans',
    description: 'Áætlaðu ΔH fyrir brennslu metans með bindiorku.',
    equation: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)',
    bondsInReactants: [
      { bond: 'C-H', count: 4 },
      { bond: 'O=O', count: 2 },
    ],
    bondsInProducts: [
      { bond: 'C=O', count: 2 },
      { bond: 'H-O', count: 4 },
    ],
    expectedDeltaH: -818,
    hessLawValue: -802,
    hint: 'ΔH ≈ Σ(bindingar rofnar) - Σ(bindingar myndaðar)',
    explanation: 'Rofið: 4(C-H) + 2(O=O) = 4(413) + 2(495) = 2642 kJ\nMyndað: 2(C=O) + 4(H-O) = 2(799) + 4(463) = 3450 kJ\nΔH ≈ 2642 - 3450 = -808 kJ'
  },
  {
    id: 2,
    title: 'Myndun HCl',
    description: 'Reiknaðu ΔH fyrir myndun HCl úr frumefnum.',
    equation: 'H₂(g) + Cl₂(g) → 2HCl(g)',
    bondsInReactants: [
      { bond: 'H-H', count: 1 },
      { bond: 'Cl-Cl', count: 1 },
    ],
    bondsInProducts: [
      { bond: 'H-Cl', count: 2 },
    ],
    expectedDeltaH: -184,
    hessLawValue: -185,
    hint: 'Mundu: Þú myndrar 2 HCl sameindir!',
    explanation: 'Rofið: 1(H-H) + 1(Cl-Cl) = 436 + 242 = 678 kJ\nMyndað: 2(H-Cl) = 2(431) = 862 kJ\nΔH ≈ 678 - 862 = -184 kJ'
  },
  {
    id: 3,
    title: 'Etýlen og vetni',
    description: 'Áætlaðu ΔH fyrir viðbótarhvarf etýlens og vetnis.',
    equation: 'C₂H₄(g) + H₂(g) → C₂H₆(g)',
    bondsInReactants: [
      { bond: 'C=C', count: 1 },
      { bond: 'C-H', count: 4 },
      { bond: 'H-H', count: 1 },
    ],
    bondsInProducts: [
      { bond: 'C-C', count: 1 },
      { bond: 'C-H', count: 6 },
    ],
    expectedDeltaH: -124,
    hessLawValue: -137,
    hint: 'C=C tvöföld binding verður C-C einföld binding og 2 nýjar C-H bindingar myndast.',
    explanation: 'Rofið: 1(C=C) + 4(C-H) + 1(H-H) = 614 + 4(413) + 436 = 2702 kJ\nMyndað: 1(C-C) + 6(C-H) = 348 + 6(413) = 2826 kJ\nΔH ≈ 2702 - 2826 = -124 kJ'
  },
  {
    id: 4,
    title: 'Myndun ammóníaks',
    description: 'Reiknaðu ΔH fyrir Haber-ferlið.',
    equation: 'N₂(g) + 3H₂(g) → 2NH₃(g)',
    bondsInReactants: [
      { bond: 'N≡N', count: 1 },
      { bond: 'H-H', count: 3 },
    ],
    bondsInProducts: [
      { bond: 'H-N', count: 6 },
    ],
    expectedDeltaH: -93,
    hessLawValue: -92,
    hint: 'N≡N þreföld binding er mjög sterk (941 kJ/mol).',
    explanation: 'Rofið: 1(N≡N) + 3(H-H) = 941 + 3(436) = 2249 kJ\nMyndað: 6(H-N) = 6(391) = 2346 kJ\nΔH ≈ 2249 - 2346 = -97 kJ'
  },
  {
    id: 5,
    title: 'Myndun HBr',
    description: 'Reiknaðu ΔH fyrir myndun HBr úr frumefnum.',
    equation: 'H₂(g) + Br₂(g) → 2HBr(g)',
    bondsInReactants: [
      { bond: 'H-H', count: 1 },
      { bond: 'Br-Br', count: 1 },
    ],
    bondsInProducts: [
      { bond: 'H-Br', count: 2 },
    ],
    expectedDeltaH: -103,
    hessLawValue: -103,
    hint: 'Svipað og HCl myndun, en Br-Br er veikari en Cl-Cl.',
    explanation: 'Rofið: 1(H-H) + 1(Br-Br) = 436 + 193 = 629 kJ\nMyndað: 2(H-Br) = 2(366) = 732 kJ\nΔH ≈ 629 - 732 = -103 kJ'
  },
  {
    id: 6,
    title: 'Brennsla etans',
    description: 'Áætlaðu ΔH fyrir brennslu etans.',
    equation: 'C₂H₆(g) + 7/2 O₂(g) → 2CO₂(g) + 3H₂O(g)',
    bondsInReactants: [
      { bond: 'C-C', count: 1 },
      { bond: 'C-H', count: 6 },
      { bond: 'O=O', count: 3.5 },
    ],
    bondsInProducts: [
      { bond: 'C=O', count: 4 },
      { bond: 'H-O', count: 6 },
    ],
    expectedDeltaH: -1396,
    hessLawValue: -1428,
    hint: '7/2 O₂ þýðir 3.5 O=O bindingar.',
    explanation: 'Rofið: 1(C-C) + 6(C-H) + 3.5(O=O) = 348 + 6(413) + 3.5(495) = 3058.5 kJ\nMyndað: 4(C=O) + 6(H-O) = 4(799) + 6(463) = 5974 kJ\nΔH ≈ 3059 - 5974 = -2915 kJ/2mol = -1396 kJ/mol'
  },
  {
    id: 7,
    title: 'Myndun HF',
    description: 'Reiknaðu ΔH fyrir myndun HF úr frumefnum.',
    equation: 'H₂(g) + F₂(g) → 2HF(g)',
    bondsInReactants: [
      { bond: 'H-H', count: 1 },
      { bond: 'F-F', count: 1 },
    ],
    bondsInProducts: [
      { bond: 'H-F', count: 2 },
    ],
    expectedDeltaH: -543,
    hessLawValue: -537,
    hint: 'H-F binding er mjög sterk (567 kJ/mol), F-F er veik (155 kJ/mol).',
    explanation: 'Rofið: 1(H-H) + 1(F-F) = 436 + 155 = 591 kJ\nMyndað: 2(H-F) = 2(567) = 1134 kJ\nΔH ≈ 591 - 1134 = -543 kJ'
  },
  {
    id: 8,
    title: 'Niðurbrot ammoníaks',
    description: 'Áætlaðu ΔH fyrir sundrun ammóníaks í frumefni.',
    equation: '2NH₃(g) → N₂(g) + 3H₂(g)',
    bondsInReactants: [
      { bond: 'H-N', count: 6 },
    ],
    bondsInProducts: [
      { bond: 'N≡N', count: 1 },
      { bond: 'H-H', count: 3 },
    ],
    expectedDeltaH: 97,
    hessLawValue: 92,
    hint: 'Þetta er öfugt hvarf við Haber-ferlið!',
    explanation: 'Rofið: 6(H-N) = 6(391) = 2346 kJ\nMyndað: 1(N≡N) + 3(H-H) = 941 + 3(436) = 2249 kJ\nΔH ≈ 2346 - 2249 = +97 kJ (innhitað hvarf)'
  },
];

export function Level4({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level4Props) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);
  const [phase, setPhase] = useState<'learn' | 'practice'>('learn');

  const problem = problems[currentProblem];

  // Calculate totals for current problem
  const calculateBondEnergies = (bonds: { bond: string; count: number }[]) => {
    return bonds.reduce((sum, { bond, count }) => {
      return sum + (BOND_ENTHALPY_MAP[bond] || 0) * count;
    }, 0);
  };

  const reactantsEnergy = calculateBondEnergies(problem.bondsInReactants);
  const productsEnergy = calculateBondEnergies(problem.bondsInProducts);

  const checkAnswer = () => {
    const userNum = parseFloat(userAnswer);
    const tolerance = Math.abs(problem.expectedDeltaH * 0.1); // 10% tolerance for bond enthalpies
    const correct = Math.abs(userNum - problem.expectedDeltaH) <= Math.max(tolerance, 20);

    setIsCorrect(correct);
    if (correct) {
      onCorrectAnswer?.();
      if (!showHint) {
        setScore(prev => prev + 20);
      } else {
        setScore(prev => prev + 10);
      }
    } else {
      onIncorrectAnswer?.();
    }
    setShowExplanation(true);
  };

  const handleShowHint = () => {
    setShowHint(true);
    setTotalHintsUsed(prev => prev + 1);
  };

  const nextProblem = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(prev => prev + 1);
      setUserAnswer('');
      setShowHint(false);
      setShowExplanation(false);
      setIsCorrect(null);
    } else {
      onComplete(score, 160, totalHintsUsed);
    }
  };

  const startPractice = () => {
    setPhase('practice');
  };

  // Learn phase
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <span>&larr;</span> Til baka
            </button>
            <div className="text-sm text-gray-600">Stig 4: Bindiorka</div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">
              Reikna ΔH með bindiorku
            </h2>

            <div className="bg-orange-50 p-6 rounded-xl mb-6">
              <h3 className="font-bold text-orange-700 mb-3">Hvað er bindiorka?</h3>
              <p className="text-orange-900 mb-4">
                <strong>Bindiorka</strong> (bond enthalpy) er orkan sem þarf til að rjúfa eina mól af
                tiltekinni bindingu í gasfasa. Hún er alltaf jákvæð (orka þarf til að rjúfa bindingar).
              </p>

              <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                <p className="font-mono text-center text-orange-800 text-lg">
                  ΔH ≈ Σ(bindingar rofnar) − Σ(bindingar myndaðar)
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-900">
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="font-bold text-red-700 mb-1">Bindingar rofnar (+ orka)</div>
                  <p>Orka þarf til að rjúfa bindingar í hvarfefnum. Þetta er <strong>innhitað</strong> ferli.</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="font-bold text-green-700 mb-1">Bindingar myndaðar (− orka)</div>
                  <p>Orka losnar þegar nýjar bindingar myndast í afurðum. Þetta er <strong>úthitað</strong> ferli.</p>
                </div>
              </div>
            </div>

            {/* Visual example */}
            <div className="bg-gray-50 p-6 rounded-xl mb-6">
              <h3 className="font-bold text-gray-700 mb-4">Dæmi: H₂ + Cl₂ → 2HCl</h3>

              <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-4">
                {/* Reactants */}
                <div className="text-center">
                  <div className="text-4xl mb-2">H—H + Cl—Cl</div>
                  <div className="text-sm text-red-600 font-bold">Rjúfa bindingar</div>
                  <div className="text-sm">436 + 242 = 678 kJ</div>
                </div>

                <div className="text-3xl">→</div>

                {/* Products */}
                <div className="text-center">
                  <div className="text-4xl mb-2">2 × H—Cl</div>
                  <div className="text-sm text-green-600 font-bold">Mynda bindingar</div>
                  <div className="text-sm">2 × 431 = 862 kJ</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <p className="font-mono text-center">
                  ΔH ≈ 678 − 862 = <span className="text-blue-600 font-bold">−184 kJ</span>
                </p>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Neikvætt ΔH → Úthitað hvarf (losnar orka)
                </p>
              </div>
            </div>

            {/* Important note about approximation */}
            <div className="bg-yellow-50 p-4 rounded-xl mb-6 border border-yellow-200">
              <h3 className="font-bold text-yellow-800 mb-2">Mikilvægt: Nálgun</h3>
              <p className="text-yellow-900 text-sm">
                Bindiorka er <strong>meðalgildi</strong> — raunveruleg orka fer eftir sameindaumhverfi.
                Þess vegna er þessi aðferð <em>nálgun</em> og getur verið frábrugðin nákvæmum
                mælingum eða ΔH°f útreikningum.
              </p>
            </div>

            {/* Bond enthalpy reference table */}
            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <h3 className="font-bold text-gray-700 mb-3">Algengar bindiorkuldi (kJ/mol)</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-sm">
                {BOND_ENTHALPIES.slice(0, 18).map(b => (
                  <div key={b.bond} className="bg-white p-2 rounded border text-center">
                    <div className="font-mono font-bold">{b.displayBond}</div>
                    <div className="text-gray-600">{b.enthalpy}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={startPractice}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              Hefja æfingu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Practice phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <span>&larr;</span> Til baka
          </button>
          <div className="text-right">
            <div className="text-sm text-gray-600">Stig 4 / Þraut {currentProblem + 1} af {problems.length}</div>
            <div className="text-lg font-bold text-orange-600">{score} stig</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
          />
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-orange-800 mb-2">
            {problem.title}
          </h2>
          <p className="text-gray-600 mb-6">{problem.description}</p>

          {/* Chemical equation display */}
          <div className="bg-orange-50 p-4 rounded-xl mb-6">
            <div className="text-center font-mono text-xl">
              {problem.equation}
            </div>
          </div>

          {/* Toggle bond enthalpy table */}
          <button
            onClick={() => setShowTable(!showTable)}
            className="mb-4 text-orange-600 hover:text-orange-800 underline text-sm"
          >
            {showTable ? 'Fela bindiorku töflu' : 'Sýna bindiorku töflu'}
          </button>

          {/* Bond enthalpy table */}
          {showTable && (
            <div className="bg-gray-50 p-4 rounded-xl mb-6 max-h-48 overflow-y-auto">
              <h3 className="font-bold text-gray-700 mb-3">Bindiorka (kJ/mol)</h3>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2 text-sm">
                {BOND_ENTHALPIES.map(b => (
                  <div key={b.bond} className="bg-white p-2 rounded border text-center">
                    <div className="font-mono font-bold">{b.displayBond}</div>
                    <div className="text-gray-600">{b.enthalpy}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calculation workspace */}
          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <h3 className="font-bold text-gray-700 mb-3">Útreikningur</h3>

            {/* Formula reminder */}
            <div className="bg-white p-3 rounded-lg border border-orange-200 mb-4">
              <p className="font-mono text-sm text-center text-orange-800">
                ΔH ≈ Σ(bindingar rofnar) − Σ(bindingar myndaðar)
              </p>
            </div>

            {/* Bonds broken (reactants) */}
            <div className="mb-4">
              <div className="font-semibold text-red-700 mb-2">Bindingar rofnar (hvarfefni):</div>
              <div className="space-y-1 text-sm font-mono bg-red-50 p-3 rounded-lg">
                {problem.bondsInReactants.map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span>{b.count} × {BOND_DISPLAY_MAP[b.bond]} = {b.count} × {BOND_ENTHALPY_MAP[b.bond]} = </span>
                    <span className="font-bold">{b.count * BOND_ENTHALPY_MAP[b.bond]} kJ</span>
                  </div>
                ))}
                <div className="border-t border-red-300 pt-1 font-bold">
                  Samtals rofið: {reactantsEnergy} kJ
                </div>
              </div>
            </div>

            {/* Bonds formed (products) */}
            <div className="mb-4">
              <div className="font-semibold text-green-700 mb-2">Bindingar myndaðar (afurðir):</div>
              <div className="space-y-1 text-sm font-mono bg-green-50 p-3 rounded-lg">
                {problem.bondsInProducts.map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span>{b.count} × {BOND_DISPLAY_MAP[b.bond]} = {b.count} × {BOND_ENTHALPY_MAP[b.bond]} = </span>
                    <span className="font-bold">{b.count * BOND_ENTHALPY_MAP[b.bond]} kJ</span>
                  </div>
                ))}
                <div className="border-t border-green-300 pt-1 font-bold">
                  Samtals myndað: {productsEnergy} kJ
                </div>
              </div>
            </div>
          </div>

          {/* Answer input */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ΔH ≈
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="1"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="flex-1 p-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none text-lg font-mono"
                  placeholder="Sláðu inn svar..."
                  disabled={isCorrect !== null}
                />
                <span className="flex items-center text-gray-600 font-mono">
                  kJ
                </span>
              </div>
            </div>

            {isCorrect === null && (
              <button
                onClick={checkAnswer}
                disabled={!userAnswer}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-3 px-8 rounded-xl transition-colors"
              >
                Athuga
              </button>
            )}
          </div>

          {/* Hint button */}
          {isCorrect === null && !showHint && (
            <button
              onClick={handleShowHint}
              className="text-orange-600 hover:text-orange-800 text-sm underline mb-4"
            >
              Sýna vísbendingu (-10 stig)
            </button>
          )}

          {showHint && !showExplanation && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-4">
              <span className="font-bold text-yellow-800">Vísbending: </span>
              <span className="text-yellow-900">{problem.hint}</span>
            </div>
          )}

          {/* Result feedback */}
          {isCorrect !== null && (
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? 'Rétt!' : 'Rangt'}
              </div>
              <div className={`font-mono ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                Áætlað svar: {problem.expectedDeltaH} kJ
              </div>
              {problem.hessLawValue && (
                <div className="text-sm text-gray-600 mt-2">
                  (Samanburður: ΔH°rxn frá myndunarvarmum ≈ {problem.hessLawValue} kJ)
                </div>
              )}
            </div>
          )}

          {/* Explanation */}
          {showExplanation && (
            <div className="bg-orange-50 p-4 rounded-xl mb-6">
              <div className="font-bold text-orange-800 mb-2">Útskýring:</div>
              <div className="text-orange-900 font-mono text-sm whitespace-pre-line">
                {problem.explanation}
              </div>
            </div>
          )}

          {/* Next button */}
          {isCorrect !== null && (
            <button
              onClick={nextProblem}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              {currentProblem < problems.length - 1 ? 'Næsta þraut' : 'Ljúka stigi 4'}
            </button>
          )}
        </div>

        {/* Key concepts reminder */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="font-bold text-gray-700 mb-2">Lykilatriði</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Bindiorka er alltaf jákvæð (orka þarf til að rjúfa)</li>
            <li>• ΔH neikvætt = sterkar bindingar myndast en rofnar</li>
            <li>• Þetta er nálgun — raunveruleg gildi geta verið öðruvísi</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
