import { useState, useEffect } from 'react';
import {
  AVOGADRO_PROBLEMS,
  AVOGADRO_NUMBER_DISPLAY,
  AVOGADRO_ANALOGIES,
  formatScientificNotation,
  checkAnswer,
  parseScientificInput,
  AvogadroProblem,
} from '../data/avogadro';

interface Level4Props {
  onBack: () => void;
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getProblemQuestion(problem: AvogadroProblem, language: 'is' | 'en'): string {
  const compoundName = language === 'en' ? problem.compound.nameEn : problem.compound.name;

  if (problem.type === 'moles_to_particles') {
    if (language === 'en') {
      return `How many molecules are in ${problem.given} mol of ${compoundName} (${problem.compound.formula})?`;
    }
    return `Hversu margar sameindir eru í ${problem.given} mól af ${compoundName} (${problem.compound.formula})?`;
  }

  if (problem.type === 'particles_to_moles') {
    if (language === 'en') {
      return `How many moles is ${formatScientificNotation(problem.given)} molecules of ${compoundName}?`;
    }
    return `Hversu mörg mól eru ${formatScientificNotation(problem.given)} sameindir af ${compoundName}?`;
  }

  if (problem.type === 'atoms_in_compound') {
    if (language === 'en') {
      return `How many ${problem.targetElement} atoms are in ${problem.given} mol of ${compoundName} (${problem.compound.formula})?`;
    }
    return `Hversu mörg ${problem.targetElement} atóm eru í ${problem.given} mól af ${compoundName} (${problem.compound.formula})?`;
  }

  return '';
}

function getAnswerUnit(problem: AvogadroProblem, language: 'is' | 'en'): string {
  if (problem.askFor === 'molecules') {
    return language === 'en' ? 'molecules' : 'sameindir';
  }
  if (problem.askFor === 'moles') {
    return language === 'en' ? 'mol' : 'mól';
  }
  if (problem.askFor === 'atoms_of_element') {
    return language === 'en' ? 'atoms' : 'atóm';
  }
  return '';
}

export function Level4({ onBack, onComplete, onCorrectAnswer, onIncorrectAnswer }: Level4Props) {
  const [problems, setProblems] = useState<AvogadroProblem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [language, setLanguage] = useState<'is' | 'en'>('is');
  const [showIntro, setShowIntro] = useState(true);

  // Initialize problems
  useEffect(() => {
    const shuffled = shuffleArray(AVOGADRO_PROBLEMS).slice(0, 8);
    setProblems(shuffled);
  }, []);

  // Reset state when problem changes
  useEffect(() => {
    setAnswer('');
    setFeedback(null);
    setShowHint(false);
    setShowExplanation(false);
  }, [currentIndex]);

  const currentProblem = problems[currentIndex];

  const handleCheck = () => {
    if (!currentProblem) return;

    const parsedAnswer = parseScientificInput(answer);
    if (parsedAnswer === null) {
      setFeedback('incorrect');
      onIncorrectAnswer();
      return;
    }

    const isCorrect = checkAnswer(parsedAnswer, currentProblem.correctAnswer);

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
          onComplete(score + points + bonus, maxScore, hintsUsed);
        }
      }, 2000);
    } else {
      setFeedback('incorrect');
      onIncorrectAnswer();
    }
  };

  const handleHint = () => {
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  // Intro screen explaining Avogadro's number
  if (showIntro) {
    const randomAnalogy = AVOGADRO_ANALOGIES[Math.floor(Math.random() * AVOGADRO_ANALOGIES.length)];

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
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
            <div className="text-6xl mb-4">🔢</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {language === 'en' ? 'Level 4: Avogadro\'s Number' : 'Stig 4: Tala Avogadros'}
            </h1>
            <p className="text-gray-600 mb-6">
              {language === 'en'
                ? 'Learn to convert between moles and particles'
                : 'Lærðu að umbreyta milli móla og agna'}
            </p>

            {/* Avogadro's Number Display */}
            <div className="bg-blue-100 rounded-xl p-6 mb-6">
              <div className="text-sm text-blue-600 mb-2">
                {language === 'en' ? 'Avogadro\'s Number (Nₐ)' : 'Tala Avogadros (Nₐ)'}
              </div>
              <div className="text-4xl font-bold font-mono text-blue-800 mb-2">
                {AVOGADRO_NUMBER_DISPLAY}
              </div>
              <div className="text-sm text-blue-600">
                {language === 'en'
                  ? 'particles per mole'
                  : 'agnir í hverju móli'}
              </div>
            </div>

            {/* Key formulas */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
              <h3 className="font-bold text-gray-800 mb-3">
                {language === 'en' ? 'Key Formulas' : 'Lykilformúlur'}
              </h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="bg-white rounded p-2">
                  <span className="text-gray-600">{language === 'en' ? 'Moles → Particles:' : 'Mól → Agnir:'}</span>
                  <br />
                  <span className="font-bold">n × Nₐ = {language === 'en' ? 'particles' : 'agnir'}</span>
                </div>
                <div className="bg-white rounded p-2">
                  <span className="text-gray-600">{language === 'en' ? 'Particles → Moles:' : 'Agnir → Mól:'}</span>
                  <br />
                  <span className="font-bold">{language === 'en' ? 'particles' : 'agnir'} ÷ Nₐ = n</span>
                </div>
              </div>
            </div>

            {/* Fun fact */}
            <div className="bg-yellow-50 rounded-xl p-4 mb-6 text-left">
              <div className="text-yellow-800 text-sm">
                💡 {language === 'en' ? randomAnalogy.analogyEn : randomAnalogy.analogy}
              </div>
            </div>

            <button
              onClick={() => setShowIntro(false)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
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

  const hint = language === 'en' ? currentProblem.hintEn : currentProblem.hint;
  const question = getProblemQuestion(currentProblem, language);
  const unit = getAnswerUnit(currentProblem, language);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← Til baka
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800">
              {language === 'en' ? 'Avogadro\'s Number' : 'Tala Avogadros'}
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
              Stig: <span className="font-bold text-blue-600">{score}</span>
            </div>
            <div className="text-xs text-gray-500">
              {currentIndex + 1} / {problems.length}
            </div>
          </div>
        </div>

        {/* Reference card */}
        <div className="bg-blue-50 rounded-lg p-3 mb-4 text-center">
          <span className="text-sm text-blue-700">Nₐ = {AVOGADRO_NUMBER_DISPLAY}</span>
        </div>

        {/* Problem card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          {/* Compound info */}
          <div className="text-center mb-6">
            <div className="text-4xl font-mono font-bold text-gray-800 mb-2">
              {currentProblem.compound.formula}
            </div>
            <div className="text-gray-600">
              {language === 'en' ? currentProblem.compound.nameEn : currentProblem.compound.name}
            </div>
          </div>

          {/* Question */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-lg text-gray-800 text-center">{question}</p>
          </div>

          {/* Step-by-step hint for atoms in compound */}
          {showExplanation && currentProblem.type === 'atoms_in_compound' && (
            <div className="bg-purple-50 rounded-xl p-4 mb-4">
              <h4 className="font-bold text-purple-800 mb-2">
                {language === 'en' ? 'Step by step:' : 'Skref fyrir skref:'}
              </h4>
              <ol className="text-sm text-purple-700 space-y-1 list-decimal list-inside">
                <li>
                  {language === 'en'
                    ? `${currentProblem.given} mol × ${AVOGADRO_NUMBER_DISPLAY} = ${formatScientificNotation(currentProblem.given * 6.022e23)} molecules`
                    : `${currentProblem.given} mól × ${AVOGADRO_NUMBER_DISPLAY} = ${formatScientificNotation(currentProblem.given * 6.022e23)} sameindir`}
                </li>
                <li>
                  {language === 'en'
                    ? `Each molecule has ${currentProblem.targetElementCount} ${currentProblem.targetElement} atoms`
                    : `Hver sameind hefur ${currentProblem.targetElementCount} ${currentProblem.targetElement} atóm`}
                </li>
                <li>
                  {language === 'en'
                    ? `${formatScientificNotation(currentProblem.given * 6.022e23)} × ${currentProblem.targetElementCount} = ${formatScientificNotation(currentProblem.correctAnswer)}`
                    : `${formatScientificNotation(currentProblem.given * 6.022e23)} × ${currentProblem.targetElementCount} = ${formatScientificNotation(currentProblem.correctAnswer)}`}
                </li>
              </ol>
            </div>
          )}

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
                placeholder={currentProblem.askFor === 'moles' ? '0.00' : '0.00e23'}
                className={`w-48 px-4 py-3 text-xl font-mono text-center border-2 rounded-lg ${
                  feedback === 'correct'
                    ? 'border-green-500 bg-green-50'
                    : feedback === 'incorrect'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 focus:border-blue-500'
                } focus:outline-none`}
              />
              <span className="text-gray-600">{unit}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {language === 'en'
                ? 'Format: 6.022e23 or 6.022 × 10²³'
                : 'Snið: 6.022e23 eða 6.022 × 10²³'}
            </p>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`text-center p-4 rounded-lg mb-4 ${
              feedback === 'correct'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {feedback === 'correct' ? (
              <div>
                <div className="font-bold text-lg">
                  {language === 'en' ? 'Correct!' : 'Rétt!'}
                </div>
                <div className="text-sm mt-1">
                  {formatScientificNotation(currentProblem.correctAnswer)} {unit}
                </div>
              </div>
            ) : (
              <div>
                <div className="font-bold">
                  {language === 'en' ? 'Try again!' : 'Reyndu aftur!'}
                </div>
                <div className="text-sm mt-1">
                  {language === 'en'
                    ? 'Check your calculation'
                    : 'Athugaðu útreikninginn'}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hint */}
        {showHint && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-center">
            <span className="text-yellow-800">💡 {hint}</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          {!showHint && (
            <button
              onClick={handleHint}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
            >
              {language === 'en' ? 'Hint' : 'Vísbending'}
            </button>
          )}
          {currentProblem.type === 'atoms_in_compound' && !showExplanation && (
            <button
              onClick={() => setShowExplanation(true)}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              {language === 'en' ? 'Show steps' : 'Sýna skref'}
            </button>
          )}
          <button
            onClick={handleCheck}
            disabled={feedback === 'correct' || !answer.trim()}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
          >
            {language === 'en' ? 'Check' : 'Athuga'}
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / problems.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
