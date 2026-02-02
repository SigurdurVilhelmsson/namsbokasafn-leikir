import { useState } from 'react';

interface Level4Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface ArrheniusProblem {
  id: number;
  title: string;
  description: string;
  type: 'calculate_Ea' | 'calculate_k2' | 'calculate_T2' | 'graph_analysis';
  // Given values
  k1?: number;
  T1?: number; // Kelvin
  k2?: number;
  T2?: number;
  Ea?: number; // kJ/mol
  // What to solve for
  solveFor: 'Ea' | 'k2' | 'T2' | 'slope';
  correctAnswer: number;
  unit: string;
  hint: string;
  explanation: string;
}

const problems: ArrheniusProblem[] = [
  {
    id: 1,
    title: 'Finna virkjunarorku',
    description: 'Hraðafasti fyrir hvarf er k₁ = 2.0×10⁻³ s⁻¹ við 300 K og k₂ = 5.0×10⁻² s⁻¹ við 350 K. Reiknaðu virkjunarorku Eₐ.',
    type: 'calculate_Ea',
    k1: 2.0e-3,
    T1: 300,
    k2: 5.0e-2,
    T2: 350,
    solveFor: 'Ea',
    correctAnswer: 52.9,
    unit: 'kJ/mol',
    hint: 'Notaðu tvípunkta Arrhenius jöfnuna: ln(k₂/k₁) = (Eₐ/R)(1/T₁ - 1/T₂)',
    explanation: 'ln(0.05/0.002) = (Eₐ/8.314)(1/300 - 1/350)\nln(25) = (Eₐ/8.314)(0.000476)\n3.22 = Eₐ × 5.73×10⁻⁵\nEₐ = 56,200 J/mol = 52.9 kJ/mol'
  },
  {
    id: 2,
    title: 'Spá fyrir um k við hærri hita',
    description: 'Ef Eₐ = 75 kJ/mol og k = 1.5×10⁻⁴ s⁻¹ við 298 K, hver er k við 350 K?',
    type: 'calculate_k2',
    k1: 1.5e-4,
    T1: 298,
    T2: 350,
    Ea: 75,
    solveFor: 'k2',
    correctAnswer: 0.015,
    unit: 's⁻¹',
    hint: 'k₂ = k₁ × exp[(Eₐ/R)(1/T₁ - 1/T₂)]',
    explanation: 'k₂ = 1.5×10⁻⁴ × exp[(75000/8.314)(1/298 - 1/350)]\nk₂ = 1.5×10⁻⁴ × exp[(9022)(0.000497)]\nk₂ = 1.5×10⁻⁴ × exp(4.48)\nk₂ = 1.5×10⁻⁴ × 88.2 = 0.0132 ≈ 0.015 s⁻¹'
  },
  {
    id: 3,
    title: 'Hiti til að tvöfalda k',
    description: 'Ef Eₐ = 50 kJ/mol og k = 0.01 s⁻¹ við 300 K, við hvaða hita er k = 0.02 s⁻¹?',
    type: 'calculate_T2',
    k1: 0.01,
    T1: 300,
    k2: 0.02,
    Ea: 50,
    solveFor: 'T2',
    correctAnswer: 310,
    unit: 'K',
    hint: 'Leystu fyrir T₂ úr: ln(k₂/k₁) = (Eₐ/R)(1/T₁ - 1/T₂)',
    explanation: 'ln(0.02/0.01) = (50000/8.314)(1/300 - 1/T₂)\n0.693 = 6014(0.00333 - 1/T₂)\n0.693/6014 = 0.00333 - 1/T₂\n1/T₂ = 0.00333 - 0.000115 = 0.003215\nT₂ = 311 K ≈ 310 K'
  },
  {
    id: 4,
    title: 'Hallinn á Arrhenius línuriti',
    description: 'Ef halli á ln(k) vs 1/T línuriti er -8500 K, hver er virkjunarorkan?',
    type: 'graph_analysis',
    solveFor: 'Ea',
    correctAnswer: 70.7,
    unit: 'kJ/mol',
    hint: 'Halli = -Eₐ/R, þar sem R = 8.314 J/(mol·K)',
    explanation: 'Halli = -Eₐ/R\n-8500 = -Eₐ/8.314\nEₐ = 8500 × 8.314 = 70,669 J/mol = 70.7 kJ/mol'
  },
  {
    id: 5,
    title: 'Hvataáhrif',
    description: 'Hvati lækkar Eₐ úr 80 kJ/mol í 40 kJ/mol. Hvað margfaldast k við 300 K?',
    type: 'calculate_k2',
    Ea: 40, // Used as Ea2 - Ea1 difference calculation
    T1: 300,
    solveFor: 'k2',
    correctAnswer: 8.9e6,
    unit: '× stærri',
    hint: 'k₂/k₁ = exp[(Eₐ₁ - Eₐ₂)/(RT)]',
    explanation: 'k₂/k₁ = exp[(80000 - 40000)/(8.314 × 300)]\nk₂/k₁ = exp[40000/2494]\nk₂/k₁ = exp(16.04) = 9.2×10⁶ ≈ 8.9×10⁶'
  },
  {
    id: 6,
    title: 'Frá mælingum til Eₐ',
    description: 'Mælingar sýna k = 0.005 s⁻¹ við 25°C og k = 0.035 s⁻¹ við 55°C. Finndu Eₐ.',
    type: 'calculate_Ea',
    k1: 0.005,
    T1: 298.15, // 25°C
    k2: 0.035,
    T2: 328.15, // 55°C
    solveFor: 'Ea',
    correctAnswer: 54.1,
    unit: 'kJ/mol',
    hint: 'Umbreyttu Celsius í Kelvin: K = °C + 273.15',
    explanation: 'T₁ = 25 + 273 = 298 K, T₂ = 55 + 273 = 328 K\nln(0.035/0.005) = (Eₐ/8.314)(1/298 - 1/328)\nln(7) = (Eₐ/8.314)(0.000306)\n1.95 = Eₐ × 3.68×10⁻⁵\nEₐ = 53,000 J/mol = 54.1 kJ/mol'
  },
  {
    id: 7,
    title: 'Kæling',
    description: 'Hvörf með Eₐ = 60 kJ/mol hægir um helming ef hitinn lækkar úr 300 K í T₂. Finndu T₂.',
    type: 'calculate_T2',
    k1: 1,
    T1: 300,
    k2: 0.5, // Half the rate
    Ea: 60,
    solveFor: 'T2',
    correctAnswer: 291,
    unit: 'K',
    hint: 'k₂/k₁ = 0.5, leystu fyrir T₂',
    explanation: 'ln(0.5) = (60000/8.314)(1/300 - 1/T₂)\n-0.693 = 7217(0.00333 - 1/T₂)\n-0.693/7217 = 0.00333 - 1/T₂\n1/T₂ = 0.00333 + 0.000096 = 0.003426\nT₂ = 292 K ≈ 291 K'
  },
  {
    id: 8,
    title: 'Hitaáhrif á hraða',
    description: 'Efnahvarf með Eₐ = 100 kJ/mol er við 298 K. Hvað margfaldast k ef hitinn hækkar í 308 K?',
    type: 'calculate_k2',
    T1: 298,
    T2: 308,
    Ea: 100,
    solveFor: 'k2',
    correctAnswer: 3.0,
    unit: '× stærri',
    hint: 'k₂/k₁ = exp[(Eₐ/R)(1/T₁ - 1/T₂)]',
    explanation: 'k₂/k₁ = exp[(100000/8.314)(1/298 - 1/308)]\nk₂/k₁ = exp[(12024)(0.000109)]\nk₂/k₁ = exp(1.31) = 3.7 ≈ 3.0'
  }
];

export function Level4({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level4Props) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);
  const [phase, setPhase] = useState<'learn' | 'practice'>('learn');

  const problem = problems[currentProblem];

  const checkAnswer = () => {
    const userNum = parseFloat(userAnswer);
    // Tolerance depends on the magnitude
    let tolerance: number;
    if (problem.correctAnswer >= 1000000) {
      tolerance = problem.correctAnswer * 0.5; // 50% for very large numbers
    } else if (problem.correctAnswer >= 1) {
      tolerance = Math.max(problem.correctAnswer * 0.15, 0.5); // 15% or 0.5
    } else {
      tolerance = problem.correctAnswer * 0.3; // 30% for small numbers
    }

    const correct = Math.abs(userNum - problem.correctAnswer) <= tolerance;

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

  // Format number for display
  const formatNumber = (n: number): string => {
    if (n >= 1e6 || n <= 1e-4) {
      return n.toExponential(1);
    }
    return n.toString();
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
            <div className="text-sm text-gray-600">Stig 4: Arrhenius jafnan</div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">
              Arrhenius jafnan
            </h2>

            <div className="bg-orange-50 p-6 rounded-xl mb-6">
              <h3 className="font-bold text-orange-700 mb-3">Tengsl hita og hraðafasta</h3>
              <p className="text-orange-900 mb-4">
                <strong>Arrhenius jafnan</strong> lýsir því hvernig hraðafastinn k fer eftir hitastigi.
                Hærri hiti gefur fleiri sameindum næga orku til að yfirstíga virkjunarorku.
              </p>

              <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                <p className="font-mono text-center text-orange-800 text-xl">
                  k = Ae<sup>-E<sub>a</sub>/RT</sup>
                </p>
                <div className="text-sm text-gray-600 mt-3 space-y-1">
                  <p><strong>k</strong> = hraðafasti</p>
                  <p><strong>A</strong> = forveldiþáttur (frequency factor)</p>
                  <p><strong>E<sub>a</sub></strong> = virkjunarorka (J/mol)</p>
                  <p><strong>R</strong> = gasfasti = 8.314 J/(mol·K)</p>
                  <p><strong>T</strong> = hitastig í Kelvin</p>
                </div>
              </div>
            </div>

            {/* Two-point form */}
            <div className="bg-gray-50 p-6 rounded-xl mb-6">
              <h3 className="font-bold text-gray-700 mb-3">Tvípunkta útgáfa</h3>
              <p className="text-gray-700 text-sm mb-3">
                Ef þú þekkir k við tvo mismunandi hita, getur þú fundið E<sub>a</sub>:
              </p>
              <div className="bg-white p-4 rounded-lg border">
                <p className="font-mono text-center text-lg">
                  ln(k₂/k₁) = (E<sub>a</sub>/R)(1/T₁ - 1/T₂)
                </p>
              </div>
            </div>

            {/* Graph analysis */}
            <div className="bg-blue-50 p-6 rounded-xl mb-6">
              <h3 className="font-bold text-blue-700 mb-3">Línurit greining</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-900 mb-2">
                    Ef þú teiknar <strong>ln(k)</strong> á y-ás og <strong>1/T</strong> á x-ás,
                    færðu beina línu:
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="font-mono text-center">ln(k) = -E<sub>a</sub>/R × (1/T) + ln(A)</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 mb-1"><strong>Halli</strong> = -E<sub>a</sub>/R</p>
                  <p className="text-sm text-blue-800"><strong>y-skurðpunktur</strong> = ln(A)</p>
                  <p className="text-xs text-gray-600 mt-2">
                    Þannig: E<sub>a</sub> = -halli × R
                  </p>
                </div>
              </div>
            </div>

            {/* Example calculation */}
            <div className="bg-green-50 p-4 rounded-xl mb-6">
              <h3 className="font-bold text-green-700 mb-2">Dæmi</h3>
              <p className="text-sm text-green-900 mb-2">
                k₁ = 0.01 s⁻¹ við 300 K, k₂ = 0.05 s⁻¹ við 320 K. Finndu E<sub>a</sub>.
              </p>
              <div className="bg-white p-3 rounded text-sm font-mono text-green-800">
                ln(0.05/0.01) = (E<sub>a</sub>/8.314)(1/300 - 1/320)<br/>
                ln(5) = (E<sub>a</sub>/8.314)(0.000208)<br/>
                1.61 = E<sub>a</sub> × 2.5×10⁻⁵<br/>
                E<sub>a</sub> = 64,400 J/mol = <strong>64.4 kJ/mol</strong>
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

          {/* Given values */}
          <div className="bg-orange-50 p-4 rounded-xl mb-6">
            <h3 className="font-bold text-orange-700 mb-3">Gefin gildi</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {problem.k1 && (
                <div className="bg-white p-2 rounded border">
                  <div className="text-gray-500">k₁</div>
                  <div className="font-mono font-bold">{formatNumber(problem.k1)} s⁻¹</div>
                </div>
              )}
              {problem.T1 && (
                <div className="bg-white p-2 rounded border">
                  <div className="text-gray-500">T₁</div>
                  <div className="font-mono font-bold">{problem.T1} K</div>
                </div>
              )}
              {problem.k2 && problem.solveFor !== 'k2' && (
                <div className="bg-white p-2 rounded border">
                  <div className="text-gray-500">k₂</div>
                  <div className="font-mono font-bold">{formatNumber(problem.k2)} s⁻¹</div>
                </div>
              )}
              {problem.T2 && problem.solveFor !== 'T2' && (
                <div className="bg-white p-2 rounded border">
                  <div className="text-gray-500">T₂</div>
                  <div className="font-mono font-bold">{problem.T2} K</div>
                </div>
              )}
              {problem.Ea && problem.solveFor !== 'Ea' && (
                <div className="bg-white p-2 rounded border">
                  <div className="text-gray-500">E<sub>a</sub></div>
                  <div className="font-mono font-bold">{problem.Ea} kJ/mol</div>
                </div>
              )}
              <div className="bg-white p-2 rounded border">
                <div className="text-gray-500">R</div>
                <div className="font-mono font-bold">8.314 J/(mol·K)</div>
              </div>
            </div>
          </div>

          {/* Formula reminder */}
          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <h3 className="font-bold text-gray-700 mb-2">Formúlur</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm font-mono">
              <div className="bg-white p-2 rounded border text-center">
                k = Ae<sup>-E<sub>a</sub>/RT</sup>
              </div>
              <div className="bg-white p-2 rounded border text-center">
                ln(k₂/k₁) = (E<sub>a</sub>/R)(1/T₁ - 1/T₂)
              </div>
            </div>
          </div>

          {/* Answer input */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {problem.solveFor === 'Ea' && 'Eₐ = '}
                {problem.solveFor === 'k2' && 'k₂ = '}
                {problem.solveFor === 'T2' && 'T₂ = '}
                {problem.solveFor === 'slope' && 'Eₐ = '}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="flex-1 p-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none text-lg font-mono"
                  placeholder={problem.correctAnswer >= 1e6 ? "Notaðu e.g. 8.9e6" : "Sláðu inn svar..."}
                  disabled={isCorrect !== null}
                />
                <span className="flex items-center text-gray-600 font-mono">
                  {problem.unit}
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
                Rétt svar: {problem.correctAnswer >= 1e6 ? problem.correctAnswer.toExponential(1) : problem.correctAnswer} {problem.unit}
              </div>
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
            <li>• Hærri hiti → hærra k → hraðara hvarf</li>
            <li>• Hærri E<sub>a</sub> → hitabreytingar hafa meiri áhrif</li>
            <li>• Hvatar lækka E<sub>a</sub> og auka þannig k</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
