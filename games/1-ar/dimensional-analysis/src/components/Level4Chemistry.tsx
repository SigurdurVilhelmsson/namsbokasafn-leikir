import { useState, useEffect } from 'react';
import { chemistryConversions } from '../data/conversionFactors';

interface Level4Props {
  onBack: () => void;
  onComplete: (score: number, maxScore: number) => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

interface ChemistryProblem {
  id: string;
  compound: string;
  formula: string;
  molarMass: number;
  givenValue: number;
  givenUnit: 'g' | 'mól' | 'agnir' | 'L';
  targetUnit: 'g' | 'mól' | 'agnir' | 'L';
  correctAnswer: number;
  conversionPath: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

const AVOGADRO = 6.022e23;
const GAS_MOLAR_VOLUME = 22.4; // L/mol at STP

function generateProblems(): ChemistryProblem[] {
  const problems: ChemistryProblem[] = [];

  // Easy: Mass to Moles (single step)
  const compound1 = chemistryConversions[0]; // Water
  problems.push({
    id: 'chem1',
    compound: compound1.compound,
    formula: compound1.formula,
    molarMass: compound1.molarMass,
    givenValue: 36.03,
    givenUnit: 'g',
    targetUnit: 'mól',
    correctAnswer: 36.03 / compound1.molarMass,
    conversionPath: ['g → mól: deila með mólmassa'],
    difficulty: 'easy',
  });

  // Easy: Moles to Mass
  const compound2 = chemistryConversions[4]; // O₂
  problems.push({
    id: 'chem2',
    compound: compound2.compound,
    formula: compound2.formula,
    molarMass: compound2.molarMass,
    givenValue: 2.5,
    givenUnit: 'mól',
    targetUnit: 'g',
    correctAnswer: 2.5 * compound2.molarMass,
    conversionPath: ['mól → g: margfalda með mólmassa'],
    difficulty: 'easy',
  });

  // Easy: Moles to Particles
  problems.push({
    id: 'chem3',
    compound: 'Hvað sem er',
    formula: 'X',
    molarMass: 0,
    givenValue: 1,
    givenUnit: 'mól',
    targetUnit: 'agnir',
    correctAnswer: AVOGADRO,
    conversionPath: ['mól → agnir: margfalda með Nₐ'],
    difficulty: 'easy',
  });

  // Medium: Mass to Particles (two steps)
  const compound3 = chemistryConversions[1]; // CO₂
  problems.push({
    id: 'chem4',
    compound: compound3.compound,
    formula: compound3.formula,
    molarMass: compound3.molarMass,
    givenValue: 44.01,
    givenUnit: 'g',
    targetUnit: 'agnir',
    correctAnswer: (44.01 / compound3.molarMass) * AVOGADRO,
    conversionPath: ['g → mól: deila með mólmassa', 'mól → agnir: margfalda með Nₐ'],
    difficulty: 'medium',
  });

  // Medium: Gas at STP - Liters to Moles
  problems.push({
    id: 'chem5',
    compound: 'Gas við STP',
    formula: 'gas',
    molarMass: 0,
    givenValue: 44.8,
    givenUnit: 'L',
    targetUnit: 'mól',
    correctAnswer: 44.8 / GAS_MOLAR_VOLUME,
    conversionPath: ['L (STP) → mól: deila með 22.4 L/mól'],
    difficulty: 'medium',
  });

  // Medium: Moles to Gas Liters at STP
  const compound4 = chemistryConversions[5]; // N₂
  problems.push({
    id: 'chem6',
    compound: compound4.compound,
    formula: compound4.formula,
    molarMass: compound4.molarMass,
    givenValue: 3,
    givenUnit: 'mól',
    targetUnit: 'L',
    correctAnswer: 3 * GAS_MOLAR_VOLUME,
    conversionPath: ['mól → L (STP): margfalda með 22.4 L/mól'],
    difficulty: 'medium',
  });

  // Hard: Particles to Mass
  const compound5 = chemistryConversions[2]; // NH₃
  problems.push({
    id: 'chem7',
    compound: compound5.compound,
    formula: compound5.formula,
    molarMass: compound5.molarMass,
    givenValue: 1.2044e24,
    givenUnit: 'agnir',
    targetUnit: 'g',
    correctAnswer: (1.2044e24 / AVOGADRO) * compound5.molarMass,
    conversionPath: ['agnir → mól: deila með Nₐ', 'mól → g: margfalda með mólmassa'],
    difficulty: 'hard',
  });

  // Hard: Mass to Gas Liters (for gaseous compound)
  const compound6 = chemistryConversions[3]; // CH₄
  problems.push({
    id: 'chem8',
    compound: compound6.compound,
    formula: compound6.formula,
    molarMass: compound6.molarMass,
    givenValue: 32.08,
    givenUnit: 'g',
    targetUnit: 'L',
    correctAnswer: (32.08 / compound6.molarMass) * GAS_MOLAR_VOLUME,
    conversionPath: ['g → mól: deila með mólmassa', 'mól → L (STP): margfalda með 22.4'],
    difficulty: 'hard',
  });

  return problems;
}

function formatNumber(num: number): string {
  if (Math.abs(num) >= 1e6 || (Math.abs(num) < 0.001 && num !== 0)) {
    const exp = Math.floor(Math.log10(Math.abs(num)));
    const mantissa = num / Math.pow(10, exp);
    const superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
    const expStr = Math.abs(exp).toString().split('').map(d => superscripts[parseInt(d)]).join('');
    const sign = exp < 0 ? '⁻' : '';
    return `${mantissa.toFixed(2)} × 10${sign}${expStr}`;
  }
  return num.toFixed(2);
}

function parseUserInput(input: string): number | null {
  let cleaned = input.trim()
    .replace(/×/g, 'e')
    .replace(/x/gi, 'e')
    .replace(/\s*\*\s*/g, 'e')
    .replace(/10\^/g, 'e')
    .replace(/\s+/g, '');

  const superscriptMap: Record<string, string> = {
    '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
    '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-'
  };

  Object.entries(superscriptMap).forEach(([sup, normal]) => {
    cleaned = cleaned.replace(new RegExp(sup, 'g'), normal);
  });

  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function Level4Chemistry({ onBack, onComplete, onCorrectAnswer, onIncorrectAnswer }: Level4Props) {
  const [problems, setProblems] = useState<ChemistryProblem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [language, setLanguage] = useState<'is' | 'en'>('is');

  useEffect(() => {
    const allProblems = generateProblems();
    setProblems(shuffleArray(allProblems).slice(0, 6));
  }, []);

  useEffect(() => {
    setAnswer('');
    setFeedback(null);
    setShowHint(false);
  }, [currentIndex]);

  const currentProblem = problems[currentIndex];

  const checkAnswer = () => {
    if (!currentProblem) return;

    const userValue = parseUserInput(answer);
    if (userValue === null) {
      setFeedback('incorrect');
      onIncorrectAnswer();
      return;
    }

    const tolerance = currentProblem.correctAnswer * 0.05;
    const isCorrect = Math.abs(userValue - currentProblem.correctAnswer) <= tolerance;

    if (isCorrect) {
      setFeedback('correct');
      onCorrectAnswer();
      const points = currentProblem.difficulty === 'easy' ? 10 :
                    currentProblem.difficulty === 'medium' ? 15 : 20;
      const bonus = showHint ? 0 : 5;
      setScore(prev => prev + points + bonus);

      setTimeout(() => {
        if (currentIndex < problems.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          const maxScore = problems.reduce((sum, p) => {
            const base = p.difficulty === 'easy' ? 10 : p.difficulty === 'medium' ? 15 : 20;
            return sum + base + 5;
          }, 0);
          onComplete(score + points + bonus, maxScore);
        }
      }, 2000);
    } else {
      setFeedback('incorrect');
      onIncorrectAnswer();
    }
  };

  // Intro screen
  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
              ← Til baka
            </button>
            <button
              onClick={() => setLanguage(language === 'is' ? 'en' : 'is')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {language === 'is' ? '🇬🇧 English' : '🇮🇸 Íslenska'}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">⚗️</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {language === 'en' ? 'Level 4: Chemistry Conversions' : 'Stig 4: Efnafræðilegar umbreytingar'}
            </h1>
            <p className="text-gray-600 mb-6">
              {language === 'en'
                ? 'Apply dimensional analysis to chemistry calculations'
                : 'Notaðu einingagreiningu á efnafræðireikninga'}
            </p>

            {/* Key conversion factors */}
            <div className="bg-green-50 rounded-xl p-6 mb-6 text-left">
              <h3 className="font-bold text-green-800 mb-3 text-center">
                {language === 'en' ? 'Key Chemistry Conversions' : 'Lykilumbreytingar í efnafræði'}
              </h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="bg-white rounded p-3">
                  <div className="text-gray-500 text-xs mb-1">
                    {language === 'en' ? 'Mass ↔ Moles' : 'Massi ↔ Mól'}
                  </div>
                  <div className="font-bold">n = m / M</div>
                  <div className="text-xs text-gray-600">
                    {language === 'en' ? 'M = molar mass (g/mol)' : 'M = mólmassi (g/mól)'}
                  </div>
                </div>
                <div className="bg-white rounded p-3">
                  <div className="text-gray-500 text-xs mb-1">
                    {language === 'en' ? 'Moles ↔ Particles' : 'Mól ↔ Agnir'}
                  </div>
                  <div className="font-bold">N = n × Nₐ</div>
                  <div className="text-xs text-gray-600">Nₐ = 6.022 × 10²³</div>
                </div>
                <div className="bg-white rounded p-3">
                  <div className="text-gray-500 text-xs mb-1">
                    {language === 'en' ? 'Gas at STP: Moles ↔ Liters' : 'Gas við STP: Mól ↔ Lítrar'}
                  </div>
                  <div className="font-bold">V = n × 22.4 L/mól</div>
                  <div className="text-xs text-gray-600">
                    {language === 'en' ? 'at STP (0°C, 1 atm)' : 'við STP (0°C, 1 atm)'}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIntro(false)}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              {language === 'en' ? 'Start Practice' : 'Byrja æfingu'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentProblem) {
    return <div>Loading...</div>;
  }

  const unitLabels: Record<string, { is: string; en: string }> = {
    g: { is: 'grömm', en: 'grams' },
    mól: { is: 'mól', en: 'moles' },
    agnir: { is: 'agnir', en: 'particles' },
    L: { is: 'lítrar (STP)', en: 'liters (STP)' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
            ← Til baka
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800">
              {language === 'en' ? 'Chemistry Conversions' : 'Efnafræðileg einingagreining'}
            </h1>
            <div className={`inline-block px-2 py-0.5 rounded-full text-xs mt-1 ${
              currentProblem.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              currentProblem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {currentProblem.difficulty === 'easy' ? (language === 'en' ? 'Easy' : 'Auðvelt') :
               currentProblem.difficulty === 'medium' ? (language === 'en' ? 'Medium' : 'Miðlungs') :
               (language === 'en' ? 'Hard' : 'Erfitt')}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              Stig: <span className="font-bold text-green-600">{score}</span>
            </div>
            <div className="text-xs text-gray-500">
              {currentIndex + 1} / {problems.length}
            </div>
          </div>
        </div>

        {/* Problem card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          {/* Compound info */}
          {currentProblem.formula !== 'X' && currentProblem.formula !== 'gas' && (
            <div className="text-center mb-4">
              <div className="text-3xl font-mono font-bold text-gray-800">
                {currentProblem.formula}
              </div>
              <div className="text-gray-600 text-sm">
                {currentProblem.compound}
                {currentProblem.molarMass > 0 && ` • M = ${currentProblem.molarMass} g/mól`}
              </div>
            </div>
          )}

          {/* Problem statement */}
          <div className="bg-green-50 rounded-xl p-4 mb-6 text-center">
            <div className="text-sm text-green-600 mb-2">
              {language === 'en' ? 'Convert:' : 'Umbreyttu:'}
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {formatNumber(currentProblem.givenValue)} {unitLabels[currentProblem.givenUnit][language]}
            </div>
            <div className="text-xl text-green-600 my-2">↓</div>
            <div className="text-lg text-gray-600">
              ? {unitLabels[currentProblem.targetUnit][language]}
            </div>
          </div>

          {/* Answer input */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'en' ? 'Your answer:' : 'Svarið þitt:'}
            </label>
            <div className="flex items-center justify-center gap-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={feedback === 'correct'}
                placeholder="0.00"
                className={`w-48 px-4 py-3 text-xl font-mono text-center border-2 rounded-lg ${
                  feedback === 'correct'
                    ? 'border-green-500 bg-green-50'
                    : feedback === 'incorrect'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 focus:border-green-500'
                } focus:outline-none`}
              />
              <span className="text-gray-600">{unitLabels[currentProblem.targetUnit][language]}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {language === 'en'
                ? 'For large numbers use: 6.022e23 or 6.022×10²³'
                : 'Fyrir stórar tölur: 6.022e23 eða 6.022×10²³'}
            </p>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`text-center p-4 rounded-lg mb-4 ${
            feedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {feedback === 'correct' ? (
              <div>
                <div className="font-bold text-lg">{language === 'en' ? 'Correct!' : 'Rétt!'}</div>
                <div className="text-sm mt-1">
                  {formatNumber(currentProblem.correctAnswer)} {unitLabels[currentProblem.targetUnit][language]}
                </div>
              </div>
            ) : (
              <div>
                <div className="font-bold">{language === 'en' ? 'Try again!' : 'Reyndu aftur!'}</div>
                <div className="text-sm mt-1">
                  {language === 'en' ? 'Check your conversion factors' : 'Athugaðu umbreytingarstuðlana'}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hint */}
        {showHint && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="font-bold text-yellow-800 mb-2">
              💡 {language === 'en' ? 'Conversion steps:' : 'Umbreytingarskref:'}
            </div>
            <ol className="text-sm text-yellow-700 list-decimal list-inside space-y-1">
              {currentProblem.conversionPath.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          {!showHint && feedback !== 'correct' && (
            <button
              onClick={() => setShowHint(true)}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
            >
              {language === 'en' ? 'Hint' : 'Vísbending'}
            </button>
          )}
          <button
            onClick={checkAnswer}
            disabled={feedback === 'correct' || !answer.trim()}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
          >
            {language === 'en' ? 'Check' : 'Athuga'}
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / problems.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
