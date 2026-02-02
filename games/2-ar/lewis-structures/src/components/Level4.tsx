import { useState } from 'react';

interface Level4Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface OctetExceptionProblem {
  id: number;
  molecule: string;
  formula: string;
  type: 'incomplete' | 'expanded' | 'radical';
  centralAtom: string;
  electronCount: number;
  explanation: string;
  structure: string;
  hint: string;
  question: string;
  options: { text: string; correct: boolean }[];
}

const problems: OctetExceptionProblem[] = [
  {
    id: 1,
    molecule: 'Bórflúoríð',
    formula: 'BF₃',
    type: 'incomplete',
    centralAtom: 'B',
    electronCount: 6,
    structure: `
       F
       |
    F—B—F
    `,
    question: 'Hversu margar rafeindir umhverfis bórið?',
    options: [
      { text: '6 rafeindir', correct: true },
      { text: '8 rafeindir', correct: false },
      { text: '4 rafeindir', correct: false },
      { text: '10 rafeindir', correct: false },
    ],
    hint: 'Bór hefur 3 gildisrafeindir og myndar 3 tengsl við flúor.',
    explanation: 'Bór hefur aðeins 3 gildisrafeindir og myndar 3 einföldar bindingar við flúor. Hver binding gefur 2 rafeindir, svo B hefur 6 rafeindir. Þetta er kallað "ófullnægjandi áttund" og er stöðugt fyrir bór vegna lágrar rafeindaþéttni.'
  },
  {
    id: 2,
    molecule: 'Beryllíumklóríð',
    formula: 'BeCl₂',
    type: 'incomplete',
    centralAtom: 'Be',
    electronCount: 4,
    structure: `
    Cl—Be—Cl
    `,
    question: 'Af hverju er BeCl₂ stöðugt þó beryllíum hafi aðeins 4 rafeindir?',
    options: [
      { text: 'Be er í lotu 2 og hefur ekki d-svigrúm', correct: true },
      { text: 'Be vill hafa 8 rafeindir', correct: false },
      { text: 'Be myndar þrefalda bindingu', correct: false },
      { text: 'Þetta er villa í Lewis-formúlunni', correct: false },
    ],
    hint: 'Beryllíum er lítið atóm og getur ekki hýst 8 rafeindir.',
    explanation: 'Beryllíum er í lotu 2 og hefur aðeins s-svigrúm. Það hefur 2 gildisrafeindir og myndar 2 bindingar, sem gefur 4 rafeindir umhverfis Be. Þetta er leyfilegt "ófullnægjandi áttund".'
  },
  {
    id: 3,
    molecule: 'Fosfórpentaklóríð',
    formula: 'PCl₅',
    type: 'expanded',
    centralAtom: 'P',
    electronCount: 10,
    structure: `
         Cl
          |
    Cl—Cl-P-Cl—Cl
    `,
    question: 'Hversu margar rafeindir umhverfis fosfór í PCl₅?',
    options: [
      { text: '10 rafeindir', correct: true },
      { text: '8 rafeindir', correct: false },
      { text: '12 rafeindir', correct: false },
      { text: '6 rafeindir', correct: false },
    ],
    hint: 'P myndar 5 bindingar við Cl atóm.',
    explanation: 'Fosfór er í lotu 3 og hefur d-svigrúm í boði. Það getur "stækkað" áttundina og haft meira en 8 rafeindir. Í PCl₅ myndar P 5 bindingar, sem gefur 10 rafeindir umhverfis miðatómið.'
  },
  {
    id: 4,
    molecule: 'Brennisteinshexaflúoríð',
    formula: 'SF₆',
    type: 'expanded',
    centralAtom: 'S',
    electronCount: 12,
    structure: `
          F
          |
       F—S—F
      /  |  \\
     F   F   F
    `,
    question: 'Af hverju getur brennisteinn haft 12 rafeindir?',
    options: [
      { text: 'Brennisteinn er í lotu 3 og hefur d-svigrúm', correct: true },
      { text: 'Brennisteinn er sérstaklega stórt atóm', correct: false },
      { text: 'Flúor gefur aukarafeindir', correct: false },
      { text: 'Þetta er villa', correct: false },
    ],
    hint: 'Lota 3 og hærri hafa d-svigrúm.',
    explanation: 'Brennisteinn er í lotu 3 og hefur aðgengilegt 3d-svigrúm. Þetta leyfir S að hýsa meira en 8 rafeindir. Í SF₆ myndar S 6 bindingar, sem gefur 12 rafeindir umhverfis miðatómið.'
  },
  {
    id: 5,
    molecule: 'Nituroxíð',
    formula: 'NO',
    type: 'radical',
    centralAtom: 'N',
    electronCount: 11,
    structure: `
    N═O·
    `,
    question: 'Hvað er sérstakt við NO sameind?',
    options: [
      { text: 'Hún hefur oddatölu rafeinda (11) — radíkal', correct: true },
      { text: 'Hún fylgir ættureglunni', correct: false },
      { text: 'N hefur 8 rafeindir', correct: false },
      { text: 'Engin óparuð rafeind', correct: false },
    ],
    hint: 'N hefur 5 og O hefur 6 gildisrafeindir. 5+6=?',
    explanation: 'NO hefur samtals 11 gildisrafeindir (5 frá N + 6 frá O). Þar sem 11 er oddatala, verður ein rafeind óparuð. Þetta er kallað "radíkal" og gerir sameindina hvarfgjarnt.'
  },
  {
    id: 6,
    molecule: 'Niturtvíoxíð',
    formula: 'NO₂',
    type: 'radical',
    centralAtom: 'N',
    electronCount: 17,
    structure: `
    ·O═N═O
    `,
    question: 'Af hverju er NO₂ brúnt gas sem er mjög hvarfgjarn?',
    options: [
      { text: 'Það er radíkal með óparaðri rafeind', correct: true },
      { text: 'Það fylgir ættureglunni', correct: false },
      { text: 'Það hefur of margar rafeindir', correct: false },
      { text: 'N hefur stækkað áttund', correct: false },
    ],
    hint: 'N: 5 + O: 6 + O: 6 = ?',
    explanation: 'NO₂ hefur 17 gildisrafeindir (5 + 6 + 6). Oddatalan þýðir að ein rafeind er óparuð, sem gerir NO₂ að radíkali. Radíkalar eru yfirleitt mjög hvarfgjarnir.'
  },
  {
    id: 7,
    molecule: 'Xenontetraflúoríð',
    formula: 'XeF₄',
    type: 'expanded',
    centralAtom: 'Xe',
    electronCount: 12,
    structure: `
       F   F
        \\ /
         Xe
        / \\
       F   F
    `,
    question: 'Xe er eðalgas. Hversu margar rafeindir umhverfis Xe í XeF₄?',
    options: [
      { text: '12 rafeindir (4 bindingar + 2 einstæð pör)', correct: true },
      { text: '8 rafeindir', correct: false },
      { text: '10 rafeindir', correct: false },
      { text: 'Xe getur ekki myndað bindingar', correct: false },
    ],
    hint: 'Xe myndar 4 bindingar og hefur 2 einstæð pör.',
    explanation: 'Xenon er í lotu 5 og hefur d-svigrúm. Í XeF₄ myndar Xe 4 bindingar (8 raf.) og hefur 2 einstæð pör (4 raf.), samtals 12 rafeindir. Þetta er stækkað áttund.'
  },
  {
    id: 8,
    molecule: 'Klórpentaflúoríð',
    formula: 'ClF₅',
    type: 'expanded',
    centralAtom: 'Cl',
    electronCount: 12,
    structure: `
          F
          |
       F—Cl—F
         |\\
         F F
    `,
    question: 'Klór í ClF₅ hefur 12 rafeindir. Af hverju er þetta mögulegt?',
    options: [
      { text: 'Cl er í lotu 3 og hefur aðgengilegt d-svigrúm', correct: true },
      { text: 'Cl hefur 8 rafeindir eins og venjulega', correct: false },
      { text: 'F lánar rafeindir til Cl', correct: false },
      { text: 'Þetta brýtur efnafræðilegar reglur', correct: false },
    ],
    hint: 'Klór er í lotu 3, líkt og brennisteinn og fosfór.',
    explanation: 'Klór er í lotu 3 og hefur tóm 3d-svigrúm sem geta hýst aukarafeindir. Í ClF₅ myndar Cl 5 bindingar og hefur 1 einstætt par, samtals 12 rafeindir.'
  }
];

export function Level4({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level4Props) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [phase, setPhase] = useState<'learn' | 'practice'>('learn');

  const problem = problems[currentProblem];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = problem.options[selectedAnswer].correct;
    setShowResult(true);

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
  };

  const handleShowHint = () => {
    setShowHint(true);
    setTotalHintsUsed(prev => prev + 1);
  };

  const nextProblem = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      onComplete(score, 160, totalHintsUsed);
    }
  };

  const startPractice = () => {
    setPhase('practice');
  };

  const getTypeLabel = (type: 'incomplete' | 'expanded' | 'radical') => {
    switch (type) {
      case 'incomplete': return 'Ófullnægjandi áttund';
      case 'expanded': return 'Útvíkkað áttund';
      case 'radical': return 'Radíkal';
    }
  };

  const getTypeColor = (type: 'incomplete' | 'expanded' | 'radical') => {
    switch (type) {
      case 'incomplete': return 'text-orange-600 bg-orange-50';
      case 'expanded': return 'text-purple-600 bg-purple-50';
      case 'radical': return 'text-blue-600 bg-blue-50';
    }
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
            <div className="text-sm text-gray-600">Stig 4: Undantekningar frá ættureglunni</div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">
              Undantekningar frá ættureglunni
            </h2>

            <div className="bg-orange-50 p-6 rounded-xl mb-6">
              <p className="text-orange-900 mb-4">
                Flest atóm vilja hafa <strong>8 rafeindir</strong> (áttureglan), en sum atóm hafa
                undantekningar! Í þessum kafla lærðu um þrjár gerðir undantekninga.
              </p>
            </div>

            {/* Exception type 1: Incomplete octet */}
            <div className="bg-orange-50 p-4 rounded-xl mb-4 border-l-4 border-orange-500">
              <h3 className="font-bold text-orange-700 mb-2">1. Ófullnægjandi áttund</h3>
              <p className="text-sm text-orange-900 mb-2">
                Sum atóm eru stöðug með <strong>færri en 8 rafeindir</strong>:
              </p>
              <ul className="text-sm text-orange-800 space-y-1 ml-4 list-disc">
                <li><strong>H</strong> — vill hafa 2 rafeindir</li>
                <li><strong>Be</strong> — getur haft 4 rafeindir (BeCl₂)</li>
                <li><strong>B</strong> — getur haft 6 rafeindir (BF₃, BH₃)</li>
              </ul>
            </div>

            {/* Exception type 2: Expanded octet */}
            <div className="bg-purple-50 p-4 rounded-xl mb-4 border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-700 mb-2">2. Útvíkkað áttund</h3>
              <p className="text-sm text-purple-900 mb-2">
                Atóm í <strong>lotu 3 og hærri</strong> geta haft meira en 8 rafeindir vegna d-svigrúms:
              </p>
              <ul className="text-sm text-purple-800 space-y-1 ml-4 list-disc">
                <li><strong>P</strong> — PCl₅ (10 raf.), PF₅</li>
                <li><strong>S</strong> — SF₆ (12 raf.), SF₄ (10 raf.)</li>
                <li><strong>Cl</strong> — ClF₅ (12 raf.)</li>
                <li><strong>Xe</strong> — XeF₄ (12 raf.), XeF₆ (14 raf.)</li>
              </ul>
            </div>

            {/* Exception type 3: Radicals */}
            <div className="bg-blue-50 p-4 rounded-xl mb-6 border-l-4 border-blue-500">
              <h3 className="font-bold text-blue-700 mb-2">3. Radíkalar (oddatala rafeinda)</h3>
              <p className="text-sm text-blue-900 mb-2">
                Sameindir með <strong>oddatölu rafeinda</strong> hafa óparaða rafeind:
              </p>
              <ul className="text-sm text-blue-800 space-y-1 ml-4 list-disc">
                <li><strong>NO</strong> — 11 rafeindir (5+6)</li>
                <li><strong>NO₂</strong> — 17 rafeindir (5+6+6)</li>
                <li><strong>ClO₂</strong> — 19 rafeindir</li>
              </ul>
              <p className="text-xs text-blue-700 mt-2">
                Radíkalar eru yfirleitt mjög hvarfgjarnir vegna óparaðrar rafeindar.
              </p>
            </div>

            {/* Summary table */}
            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <h3 className="font-bold text-gray-700 mb-3">Yfirlit</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Tegund</th>
                    <th className="pb-2">Atóm</th>
                    <th className="pb-2">Dæmi</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b">
                    <td className="py-2 text-orange-600">Ófullnægjandi</td>
                    <td>H, Be, B</td>
                    <td>BF₃, BeCl₂, BH₃</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-purple-600">Útvíkkað</td>
                    <td>P, S, Cl, Xe</td>
                    <td>PCl₅, SF₆, XeF₄</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-blue-600">Radíkalar</td>
                    <td>Oddatala raf.</td>
                    <td>NO, NO₂, ClO₂</td>
                  </tr>
                </tbody>
              </table>
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
          {/* Molecule info */}
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {problem.molecule}
            </h2>
            <span className="text-3xl font-mono text-teal-600">{problem.formula}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(problem.type)}`}>
              {getTypeLabel(problem.type)}
            </span>
          </div>

          {/* Structure display */}
          <div className="bg-slate-800 p-6 rounded-xl mb-6">
            <pre className="text-center text-green-400 font-mono text-xl whitespace-pre">
              {problem.structure}
            </pre>
            <div className="text-center mt-3">
              <span className="text-gray-400 text-sm">
                Miðatóm: <span className="text-yellow-400 font-bold">{problem.centralAtom}</span>
                {' — '}
                <span className="text-cyan-400">{problem.electronCount} rafeindir</span>
              </span>
            </div>
          </div>

          {/* Question */}
          <div className="bg-orange-50 p-4 rounded-xl mb-6">
            <p className="text-lg text-orange-900 font-medium">{problem.question}</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {problem.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedAnswer === index
                    ? showResult
                      ? option.correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-orange-500 bg-orange-50'
                    : showResult && option.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                }`}
              >
                <span className="font-medium">{option.text}</span>
              </button>
            ))}
          </div>

          {/* Check button */}
          {!showResult && (
            <div className="flex gap-4 items-center">
              <button
                onClick={checkAnswer}
                disabled={selectedAnswer === null}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                Athuga svar
              </button>
              {!showHint && (
                <button
                  onClick={handleShowHint}
                  className="text-orange-600 hover:text-orange-800 text-sm underline"
                >
                  Vísbending (-10 stig)
                </button>
              )}
            </div>
          )}

          {/* Hint */}
          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-4">
              <span className="font-bold text-yellow-800">Vísbending: </span>
              <span className="text-yellow-900">{problem.hint}</span>
            </div>
          )}

          {/* Result feedback */}
          {showResult && (
            <>
              <div className={`p-4 rounded-xl mb-4 ${
                problem.options[selectedAnswer!].correct
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className={`font-bold text-lg mb-2 ${
                  problem.options[selectedAnswer!].correct ? 'text-green-700' : 'text-red-700'
                }`}>
                  {problem.options[selectedAnswer!].correct ? 'Rétt!' : 'Rangt'}
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl mb-6">
                <div className="font-bold text-orange-800 mb-2">Útskýring:</div>
                <p className="text-orange-900 text-sm">{problem.explanation}</p>
              </div>

              <button
                onClick={nextProblem}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
              >
                {currentProblem < problems.length - 1 ? 'Næsta þraut' : 'Ljúka stigi 4'}
              </button>
            </>
          )}
        </div>

        {/* Key concepts */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="font-bold text-gray-700 mb-2">Lykilatriði</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>Lota 2:</strong> B, Be geta haft færri en 8 rafeindir</li>
            <li>• <strong>Lota 3+:</strong> P, S, Cl, Xe geta haft fleiri en 8 rafeindir (d-svigrúm)</li>
            <li>• <strong>Oddatala:</strong> Sameindir með oddatölu rafeinda eru radíkalar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
