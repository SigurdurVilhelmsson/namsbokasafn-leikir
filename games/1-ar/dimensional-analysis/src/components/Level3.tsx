import { useState, useEffect } from 'react';
import { useI18n } from '@shared/hooks';
import { level3Challenges, Level3Challenge } from '../data/challenges';
import { scoreExplanation, calculateCompositeScore, countSignificantFigures } from '../utils/scoring';

interface Level3Progress {
  problemsCompleted: number;
  compositeScores: number[];
  totalSteps: number;
  achievements: string[];
  mastered: boolean;
}

interface Level3Props {
  onComplete: (progress: Level3Progress) => void;
  onBack: () => void;
  initialProgress?: Level3Progress;
}

export function Level3({ onComplete, onBack, initialProgress }: Level3Props) {
  const { t } = useI18n();
  const [currentProblemIndex, setCurrentProblemIndex] = useState(
    initialProgress?.problemsCompleted || 0
  );
  const [progress, setProgress] = useState<Level3Progress>(
    initialProgress || {
      problemsCompleted: 0,
      compositeScores: [],
      totalSteps: 0,
      achievements: [],
      mastered: false
    }
  );

  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedPath, setSelectedPath] = useState<number | null>(null);
  const [explanation, setExplanation] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [scores, setScores] = useState<any>(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const problem = level3Challenges[currentProblemIndex];

  useEffect(() => {
    if (problem) {
      setUserAnswer('');
      setSelectedOption(null);
      setSelectedPath(null);
      setExplanation('');
      setShowFeedback(false);
      setScores(null);
      setHintUsed(false);
      setShowHint(false);
    }
  }, [currentProblemIndex, problem]);

  const getHint = () => {
    const hints: Record<string, string> = {
      reverse: 'Byrjaðu með upphafsgildinu og spyrðu þig: Hvaða stuðlar myndu breyta því í lokagildið?',
      error_analysis: 'Athugaðu hvort stuðullinn sé snúinn rétt - einingin sem á að hverfa þarf að vera í nefnara.',
      efficiency: 'Leitaðu að beinum stuðlum í stað þess að fara í gegnum margar millistig.',
      synthesis: 'Byrjaðu á að margfalda rúmmál með eðlismassa til að fá massa, síðan umbreyttu einingum.',
      real_world: 'Umbreyttu öllum gildum í sömu einingar áður en þú reiknar fjölda skammta.',
      derivation: 'Notaðu vísindatölustafi (t.d. 3.00e8) fyrir mjög stórar eða litlar tölur.'
    };
    return hints[problem.type] || 'Hugsaðu vel um hvaða stuðla þú þarft og í hvaða röð.';
  };

  const handleSubmit = () => {
    let answerScore = 0;
    let methodScore = 0;
    const explanationScore = scoreExplanation(explanation, problem.type);
    let efficiencyScore = 0;
    let sigFigScore: number | null = null;
    let userSigFigs: number | null = null;

    // Score based on problem type
    if (problem.type === 'reverse' && problem.options) {
      const selected = problem.options[selectedOption!];
      if (selected && selected.correct) {
        answerScore = 1;
        methodScore = 1;
        // Efficiency bonus for fewer steps
        if (selected.steps === 1) efficiencyScore = 1;
        else if (selected.steps === 2) efficiencyScore = 0.8;
      }
    } else if (problem.type === 'error_analysis') {
      const userNum = parseFloat(userAnswer);
      if (Math.abs(userNum - (problem.correctAnswer || 0)) < 0.01) {
        answerScore = 1;
      }
      if (explanation.toLowerCase().includes('öfug') || explanation.toLowerCase().includes('rang')) {
        methodScore = 1;
      }
    } else if (problem.type === 'efficiency') {
      const userNum = parseFloat(userAnswer);
      if (Math.abs(userNum - (problem.targetAnswer || 0)) < 0.01) {
        answerScore = 1;
      }
      if (selectedPath !== null && problem.possiblePaths) {
        const path = problem.possiblePaths[selectedPath];
        if (path.efficient) {
          efficiencyScore = 1;
          methodScore = 1;
        } else {
          methodScore = 0.5;
        }
      }
    } else if (problem.type === 'synthesis' || problem.type === 'derivation') {
      const userNum = parseFloat(userAnswer);
      const tolerance = (problem.expectedAnswer || 0) * 0.01; // 1% tolerance
      if (Math.abs(userNum - (problem.expectedAnswer || 0)) < tolerance) {
        answerScore = 1;
      }

      // Check significant figures if required
      if (problem.significantFigures) {
        userSigFigs = countSignificantFigures(userAnswer);
        sigFigScore = userSigFigs === problem.significantFigures ? 1 : 0;
        // Weighted: 70% value, 30% sig figs
        answerScore = answerScore * 0.7 + sigFigScore * 0.3;
      }

      if (explanation.length > 20) {
        methodScore = 1;
      }
    } else if (problem.type === 'real_world') {
      const userNum = parseInt(userAnswer);
      if (userNum === problem.expectedAnswer) {
        answerScore = 1;
        methodScore = 1;
      }
    }

    let composite = calculateCompositeScore(answerScore, methodScore, explanationScore, efficiencyScore);

    // Hint penalty
    if (hintUsed) {
      composite = composite * 0.85;
    }

    setScores({
      answer: answerScore,
      method: methodScore,
      explanation: explanationScore,
      efficiency: efficiencyScore,
      composite: composite,
      sigFig: sigFigScore,
      userSigFigs: userSigFigs,
      hintPenalty: hintUsed ? 0.15 : 0
    });

    setShowFeedback(true);

    // Update progress
    const newProgress = {
      ...progress,
      compositeScores: [...progress.compositeScores, composite],
      totalSteps: progress.totalSteps + (selectedPath !== null && problem.possiblePaths ? problem.possiblePaths[selectedPath].stepCount : 2)
    };
    setProgress(newProgress);
  };

  const handleContinue = () => {
    const newProgress = {
      ...progress,
      problemsCompleted: progress.problemsCompleted + 1
    };

    // Check mastery after 10 problems
    if (newProgress.problemsCompleted >= 10) {
      const avgScore = newProgress.compositeScores.reduce((a, b) => a + b, 0) / newProgress.compositeScores.length;
      newProgress.mastered = avgScore >= 0.75;
    }

    setProgress(newProgress);

    if (currentProblemIndex < level3Challenges.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    } else {
      onComplete(newProgress);
    }
  };

  if (!problem) return null;

  const avgScore = progress.compositeScores.length > 0
    ? Math.round((progress.compositeScores.reduce((a, b) => a + b, 0) / progress.compositeScores.length) * 100)
    : 0;

  const problemTypeLabels: Record<string, string> = {
    reverse: 'Öfug greining',
    error_analysis: 'Villugreining',
    efficiency: 'Skilvirkni',
    synthesis: 'Samsetning',
    real_world: 'Raunveruleiki',
    derivation: 'Afleiðing'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← Til baka
          </button>
          <div className="text-sm text-gray-600">
            <span>Áskorun {progress.problemsCompleted + 1} / 10</span>
            <span className="ml-4">Meðaleinkunn: {avgScore}%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
              {problemTypeLabels[problem.type] || problem.type}
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-6">{problem.prompt}</h2>

          {/* Display problem-specific context */}
          {(problem.type === 'synthesis' || problem.type === 'derivation') && problem.density && (
            <div className="mb-6 p-4 bg-purple-50 border-l-4 border-purple-400 rounded">
              <p className="text-sm font-semibold text-purple-800 mb-2">📊 Gefnar upplýsingar:</p>
              <div className="space-y-1">
                {problem.startValue && problem.startUnit && (
                  <p className="text-sm text-purple-700">
                    <span className="font-semibold">Rúmmál:</span> {problem.startValue} {problem.startUnit}
                  </p>
                )}
                {problem.density && problem.densityUnit && (
                  <p className="text-sm text-purple-700">
                    <span className="font-semibold">Eðlismassi:</span> {problem.density} {problem.densityUnit}
                  </p>
                )}
                {problem.targetUnit && (
                  <p className="text-sm text-purple-700">
                    <span className="font-semibold">Markeining:</span> {problem.targetUnit}
                  </p>
                )}
                {problem.significantFigures && (
                  <p className="text-sm text-purple-700">
                    <span className="font-semibold">Markverðir tölustafir:</span> {problem.significantFigures}
                  </p>
                )}
              </div>
            </div>
          )}

          {problem.type === 'real_world' && (problem.startValue || problem.portionSize) && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded">
              <p className="text-sm font-semibold text-green-800 mb-2">📊 Gefnar upplýsingar:</p>
              <div className="space-y-1">
                {problem.startValue && problem.startUnit && (
                  <p className="text-sm text-green-700">
                    <span className="font-semibold">Heildarmagn:</span> {problem.startValue} {problem.startUnit}
                  </p>
                )}
                {problem.portionSize && problem.portionUnit && (
                  <p className="text-sm text-green-700">
                    <span className="font-semibold">Skammtastærð:</span> {problem.portionSize} {problem.portionUnit}
                  </p>
                )}
              </div>
            </div>
          )}

          {problem.type === 'error_analysis' && problem.incorrectWork && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400">
              <p className="text-sm text-gray-600 mb-1">Röng vinna:</p>
              <p className="font-mono text-red-800">{problem.incorrectWork}</p>
            </div>
          )}

          {!showFeedback && (
            <div className="space-y-6">
              {/* Reverse problem options */}
              {problem.type === 'reverse' && problem.options && (
                <div className="space-y-3">
                  <p className="font-semibold">Veldu rétta leið:</p>
                  {problem.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedOption === idx
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {option.text}
                      <span className="text-sm text-gray-500 ml-2">({option.steps} skref)</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Efficiency problem paths */}
              {problem.type === 'efficiency' && problem.possiblePaths && (
                <div className="space-y-3">
                  <p className="font-semibold">Veldu leið:</p>
                  {problem.possiblePaths.map((path, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPath(idx)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedPath === idx
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="space-y-1">
                        {path.steps.map((step, sidx) => (
                          <div key={sidx} className="font-mono text-sm">{step}</div>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 mt-2 block">
                        {path.stepCount} skref
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Answer input */}
              <div>
                <label className="block font-semibold mb-2">
                  {problem.type === 'error_analysis' ? 'Hvað er rétta svarið?' : 'Svar:'}
                </label>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={problem.scientificNotation ? 't.d. 1.08e12' : 'Sláðu inn svar'}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg font-mono"
                />
                {problem.targetUnit && (
                  <p className="text-sm text-gray-600 mt-1">Eining: {problem.targetUnit}</p>
                )}
              </div>

              {/* Explanation */}
              <div>
                <label className="block font-semibold mb-2">
                  Útskýring (hvernig leystir þú þetta?):
                </label>
                <textarea
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="T.d. 'Fyrst breytti ég X í Y með stuðlinum Z...'"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg h-24"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 Tip: Notaðu orð eins og "umbreyti", "stuðull", "eining" fyrir betri einkunn
                </p>
              </div>

              {/* Hint */}
              {showHint && (
                <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-sm font-semibold text-blue-800 mb-2">💡 Vísbending:</p>
                  <p className="text-sm text-blue-700">{getHint()}</p>
                  <p className="text-xs text-orange-600 mt-2">
                    ⚠️ Athugið: Notkun vísbendingar dregur 15% frá heildareinkunnnum.
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="space-y-3">
                {!showHint && (
                  <button
                    onClick={() => {
                      setShowHint(true);
                      setHintUsed(true);
                    }}
                    className="w-full border-2 border-blue-400 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50"
                  >
                    💡 Sýna vísbendingu (kostar 15% af einkunn)
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim() || !explanation.trim()}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  style={{ backgroundColor: !userAnswer.trim() || !explanation.trim() ? undefined : '#f36b22' }}
                >
                  Senda inn
                </button>
              </div>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && scores && (
            <>
              <div className={`mb-6 p-6 rounded-lg ${
                scores.composite >= 0.75 ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                <h3 className="text-xl font-bold mb-4">
                  {scores.composite >= 0.75 ? '✓ Vel gert!' : '○ Þú getur gert betur'}
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Svar</p>
                    <p className="text-2xl font-bold">{Math.round(scores.answer * 100)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Aðferð</p>
                    <p className="text-2xl font-bold">{Math.round(scores.method * 100)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Útskýring</p>
                    <p className="text-2xl font-bold">{Math.round(scores.explanation * 100)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Skilvirkni</p>
                    <p className="text-2xl font-bold">{Math.round(scores.efficiency * 100)}%</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-lg font-bold">
                    Heildareinkunn: {Math.round(scores.composite * 100)}%
                  </p>
                  {scores.hintPenalty > 0 && (
                    <p className="text-sm text-orange-600 mt-1">
                      (15% dregið frá vegna vísbendingar)
                    </p>
                  )}
                </div>

                {problem.type === 'error_analysis' && problem.errorExplanation && (
                  <div className="mt-4 p-3 bg-white rounded">
                    <p className="text-sm font-semibold mb-1">Útskýring á villunni:</p>
                    <p className="text-sm">{problem.errorExplanation}</p>
                  </div>
                )}

                {problem.significantFigures && scores.sigFig !== null && (
                  <div className={`mt-4 p-3 rounded ${scores.sigFig === 1 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    <p className="text-sm font-semibold mb-1">
                      {scores.sigFig === 1 ? '✓ Markverðir tölustafir réttir' : '✗ Markverðir tölustafir rangir'}
                    </p>
                    <p className="text-sm">
                      Þitt svar hefur {scores.userSigFigs} markverða tölustafi.
                      Ætti að hafa {problem.significantFigures}.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600"
                style={{ backgroundColor: '#f36b22' }}
              >
                {currentProblemIndex < level3Challenges.length - 1 ? 'Næsta áskorun →' : 'Ljúka stigi'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
