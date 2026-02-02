import { useState } from 'react';
import { FeedbackPanel } from '@shared/components';

interface Level4Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface IonDipoleQuestion {
  id: number;
  type: 'identify' | 'solubility' | 'strength';
  scenario: string;
  substance: string;
  solvent: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint: string;
}

const questions: IonDipoleQuestion[] = [
  {
    id: 1,
    type: 'identify',
    scenario: 'NaCl er blandað í vatn',
    substance: 'NaCl',
    solvent: 'H₂O',
    question: 'Hvers konar aðdráttarkraftar myndast milli Na⁺ og vatns?',
    options: [
      'London dreifikraftar',
      'Tvípól-tvípól kraftar',
      'Vetnistengi',
      'Jón-tvípól kraftar'
    ],
    correctAnswer: 3,
    explanation: 'Na⁺ jón laðar að δ⁻ enda vatns (súrefnið). Þetta er jón-tvípól kraftur - aðdráttarkraftur milli jónar og skautaðrar sameindar.',
    hint: 'Jón hefur heildarrafhlöðu. Vatn er skautað (tvípól).'
  },
  {
    id: 2,
    type: 'identify',
    scenario: 'KBr er leyst upp í vatni',
    substance: 'KBr',
    solvent: 'H₂O',
    question: 'Hvernig samverka vatnssameindir við Br⁻ jónina?',
    options: [
      'δ⁻ súrefnið laðar að Br⁻',
      'δ⁺ vetnið laðar að Br⁻',
      'Vetnistengi myndast',
      'Ekkert samspil'
    ],
    correctAnswer: 1,
    explanation: 'Br⁻ er neikvætt hlaðin jón. Hún laðar að jákvætt skautaða hluta vatnsins (δ⁺ vetni).',
    hint: 'Neikvæð jón laðar að jákvæða hlutann af vatnssameind.'
  },
  {
    id: 3,
    type: 'solubility',
    scenario: 'Samanburður á leysanleika',
    substance: 'NaCl og I₂',
    solvent: 'H₂O',
    question: 'Hvers vegna leysist NaCl vel í vatni en I₂ leysist illa?',
    options: [
      'I₂ er of stórt',
      'NaCl hefur vetnistengi en I₂ ekki',
      'NaCl myndar sterka jón-tvípól krafta en I₂ er óskauttað',
      'I₂ er þyngra'
    ],
    correctAnswer: 2,
    explanation: 'NaCl skiptist í jónir sem mynda sterka jón-tvípól krafta við vatn. I₂ er óskauttað og hefur aðeins veika London krafta.',
    hint: 'Hugsaðu um hvaða kraftar geta myndast við vatn.'
  },
  {
    id: 4,
    type: 'strength',
    scenario: 'Styrkur aðdráttarkrafta',
    substance: 'Jón-tvípól',
    solvent: '',
    question: 'Hvar er jón-tvípól kraftur á styrkleikakvörðunum?',
    options: [
      'Veikari en allir millisameindakraftar',
      'Á milli vetnistengja og tvípól-tvípól',
      'Sterkari en vetnistengi',
      'Jafnt og London kraftar'
    ],
    correctAnswer: 2,
    explanation: 'Jón-tvípól kraftar eru almennt sterkari en vetnistengi vegna þess að jónir hafa heildar rafhlöðu í stað hlutarafhlöðu.',
    hint: 'Heildar rafhlöðu (+1, -1) er sterkari en hlutarafhlöðu (δ+, δ-).'
  },
  {
    id: 5,
    type: 'solubility',
    scenario: 'Leysimið val',
    substance: 'MgCl₂',
    solvent: '',
    question: 'Í hvaða leysi leysist MgCl₂ best?',
    options: [
      'Hexan (C₆H₁₄) - óskauttað',
      'Vatn (H₂O) - skauttað',
      'Kolefnistetraklóríð (CCl₄)',
      'Öll leysi eru jafngóð'
    ],
    correctAnswer: 1,
    explanation: 'MgCl₂ er jónasamband. Það leysist best í skauttuðum leysum eins og vatni þar sem sterkir jón-tvípól kraftar geta myndast.',
    hint: '"Like dissolves like" - jónir þurfa skauttuð leysi.'
  },
  {
    id: 6,
    type: 'identify',
    scenario: 'CaCl₂ í vatni',
    substance: 'CaCl₂',
    solvent: 'H₂O',
    question: 'Hversu margar vatnssameindur geta umkringið Ca²⁺ jón?',
    options: [
      'Aðeins 1 vegna stærðar',
      'Aðeins 2 vegna tvöfaldrar hlöðu',
      'Venjulega 6-8 í fyrstu skelinni',
      'Engar vegna jákvæðrar hlöðu'
    ],
    correctAnswer: 2,
    explanation: 'Ca²⁺ er umkringið af 6-8 vatnssameindum í fyrsta vatnshjúpi (hydration shell). Súrefni snýr að jóninni.',
    hint: 'Jónir í lausn eru umkringðar af mörgum leysissameindum.'
  },
  {
    id: 7,
    type: 'solubility',
    scenario: 'Vökvahitun',
    substance: 'NaCl lausn',
    solvent: '',
    question: 'Hvers vegna er leysnivarmi NaCl í vatni lítill?',
    options: [
      'Enginn kraftur rofnar',
      'Orka til að rjúfa kristalinn = orka sem losnar í jón-tvípól',
      'Vatn verður kaldara',
      'NaCl leysist ekki'
    ],
    correctAnswer: 1,
    explanation: 'Orkan sem þarf til að rjúfa jónagrindinina (kristallorkuna) er nánast jöfn orkunni sem losnar þegar jón-tvípól kraftar myndast (vatnshjúpsorka).',
    hint: 'Hugsaðu um orkujafnvægi: orka inn vs. orka út.'
  },
  {
    id: 8,
    type: 'strength',
    scenario: 'Styrkur eftir hlöðu',
    substance: 'Na⁺ vs Mg²⁺',
    solvent: 'H₂O',
    question: 'Hvor jónin myndar sterkari jón-tvípól krafta við vatn?',
    options: [
      'Na⁺ vegna stærðar',
      'Jafnt sterkir',
      'Mg²⁺ vegna meiri hlöðu og minni radíus',
      'Fer eftir hitastigi'
    ],
    correctAnswer: 2,
    explanation: 'Mg²⁺ hefur hærri hlöðu (+2 vs +1) og minni jónageisla. Báðir þessir þættir auka styrk jón-tvípól kraftanna.',
    hint: 'Hærri hlöðu og minni stærð = sterkari aðdráttur.'
  },
  {
    id: 9,
    type: 'identify',
    scenario: 'Líffræðilegt samhengi',
    substance: 'Prótein',
    solvent: 'Frumuvökvi',
    question: 'Hvaða hlutverki gegnir jón-tvípól kraftur í próteinvirkni?',
    options: [
      'Ekkert - prótein nota aðeins vetnistengi',
      'Hjálpar til við að halda formgerð og bindast subströtum',
      'Rjúfur próteinið',
      'Jón-tvípól kemur ekki fyrir í líffræði'
    ],
    correctAnswer: 1,
    explanation: 'Jón-tvípól kraftar hjálpa prótínum að halda réttri formgerð (t.d. saltbrýr milli hlaðinna amínósýra) og bindast jónuðum substötum.',
    hint: 'Mörg prótein innihalda hlaðnar amínósýrur.'
  },
  {
    id: 10,
    type: 'solubility',
    scenario: 'Blöndun lausna',
    substance: 'NaCl og etanól',
    solvent: '',
    question: 'Leysist NaCl jafnvel í etanóli (CH₃CH₂OH) og vatni?',
    options: [
      'Já - báðir eru skautaðir',
      'Nei - vatn hefur hærri tvípólstuðul og er betra jónaleysir',
      'Nei - etanól er óskauttað',
      'Já - etanól er jafnvel betra'
    ],
    correctAnswer: 1,
    explanation: 'Þótt etanól sé skauttað, hefur vatn hærri tvípólstuðul (1.85 D vs 1.69 D) og hærra rafstýri, sem gerir það að betra leysi fyrir jónir.',
    hint: 'Ekki öll skauttuð leysi eru jafn góð fyrir jónir.'
  }
];

const MAX_SCORE = questions.length * 15;

export function Level4({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level4Props) {
  const [phase, setPhase] = useState<'learn' | 'quiz'>('learn');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);

  const question = questions[currentQuestion];

  const checkAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === question.correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + (showHint ? 8 : 15));
      onCorrectAnswer?.();
    } else {
      onIncorrectAnswer?.();
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      onComplete(score, MAX_SCORE, totalHintsUsed);
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
    setTotalHintsUsed(prev => prev + 1);
  };

  // Learning phase
  if (phase === 'learn') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
              ← Til baka
            </button>
            <div className="text-sm text-gray-600">Stig 4: Jón-tvípól kraftar</div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">
              Jón-tvípól kraftar (Ion-Dipole Forces)
            </h2>

            {/* Main concept explanation */}
            <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-xl mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-orange-200">
                  ⚛️
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-orange-800">Hvað eru jón-tvípól kraftar?</h3>
                  <p className="text-orange-900 mt-2">
                    <strong>Jón-tvípól kraftar</strong> eru aðdráttarkraftar milli <em>jóna</em> (hlaðin eind) og
                    <em> skautaðra sameinda</em> (tvípól). Þessir kraftar skýra hvers vegna jónasambönd leysast í
                    skauttuðum leysum eins og vatni.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual diagram */}
            <div className="bg-gray-900 rounded-xl p-6 mb-6">
              <div className="text-center text-white mb-4 font-bold">
                NaCl leysist í vatni
              </div>
              <div className="flex justify-center items-center gap-8 flex-wrap">
                {/* Na+ with water */}
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      Na⁺
                    </div>
                    {/* Water molecules around Na+ */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-blue-300 text-xs">
                      <span className="text-red-400">O</span>-H
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-blue-300 text-xs">
                      <span className="text-red-400">O</span>-H
                    </div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue-300 text-xs">
                      <span className="text-red-400">O</span>-H
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-blue-300 text-xs">
                      <span className="text-red-400">O</span>-H
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm mt-2">
                    δ⁻ (O) snýr að Na⁺
                  </div>
                </div>

                <div className="text-white text-2xl">⟷</div>

                {/* Cl- with water */}
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      Cl⁻
                    </div>
                    {/* Water molecules around Cl- */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-blue-300 text-xs">
                      H-<span className="text-red-400">O</span>
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-blue-300 text-xs">
                      H-<span className="text-red-400">O</span>
                    </div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue-300 text-xs">
                      H-<span className="text-red-400">O</span>
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-blue-300 text-xs">
                      H-<span className="text-red-400">O</span>
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm mt-2">
                    δ⁺ (H) snýr að Cl⁻
                  </div>
                </div>
              </div>
            </div>

            {/* Strength comparison */}
            <div className="bg-gray-100 p-4 rounded-xl mb-6">
              <h4 className="font-bold text-gray-800 mb-3">Styrkur millisameindakrafta</h4>
              <div className="flex items-center gap-1 mb-2">
                <div className="flex-1 h-4 bg-purple-400 rounded-l-full text-center text-xs text-white font-medium flex items-center justify-center">
                  London
                </div>
                <div className="flex-1 h-4 bg-blue-400 text-center text-xs text-white font-medium flex items-center justify-center">
                  Tvípól
                </div>
                <div className="flex-1 h-4 bg-red-400 text-center text-xs text-white font-medium flex items-center justify-center">
                  H-tengi
                </div>
                <div className="flex-1 h-4 bg-orange-500 rounded-r-full text-center text-xs text-white font-medium flex items-center justify-center">
                  Jón-tvípól
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Veikastur</span>
                <span>Sterkastur</span>
              </div>
            </div>

            {/* Key points */}
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mb-6">
              <h4 className="font-bold text-yellow-800 mb-2">Lykilatriði um jón-tvípól</h4>
              <ul className="space-y-2 text-yellow-900 text-sm">
                <li>• <strong>Jákvæð jón</strong> (t.d. Na⁺) laðar að δ⁻ hluta sameindar</li>
                <li>• <strong>Neikvæð jón</strong> (t.d. Cl⁻) laðar að δ⁺ hluta sameindar</li>
                <li>• Sterkari en vetnistengi vegna fullrar rafhlöðu á jóninni</li>
                <li>• Skýrir leysanleika jónasambanda í vatni</li>
                <li>• <strong>Vatnshjúp</strong> (hydration shell) myndast í kringum jónir</li>
              </ul>
            </div>

            {/* Hydration shell concept */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">Vatnshjúp (Hydration Shell)</h4>
              <p className="text-blue-900 text-sm">
                Þegar jónasamband leysist í vatni umkringja vatnsameindir hverja jón og mynda <strong>vatnshjúp</strong>.
                Þetta gerist vegna jón-tvípól krafta og hjálpar til við að halda jónunum aðskildum í lausn.
              </p>
            </div>
          </div>

          <button
            onClick={() => setPhase('quiz')}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl"
          >
            Hefja æfingar →
          </button>
        </div>
      </div>
    );
  }

  // Quiz phase
  const isCorrect = showResult && selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setPhase('learn')} className="text-gray-600 hover:text-gray-800">
            ← Skoða kennslu
          </button>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              Spurning {currentQuestion + 1} af {questions.length}
            </div>
            <div className="text-lg font-bold text-indigo-600">{score} stig</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {/* Scenario */}
          <div className="bg-orange-50 p-4 rounded-xl mb-4">
            <div className="text-sm text-orange-600 font-medium mb-1">Aðstæður</div>
            <div className="text-lg font-bold text-orange-800">{question.scenario}</div>
            {question.substance && question.solvent && (
              <div className="text-orange-700 mt-1">
                {question.substance} + {question.solvent}
              </div>
            )}
          </div>

          {/* Question */}
          <p className="text-gray-800 text-lg mb-6 font-medium">{question.question}</p>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === question.correctAnswer;

              return (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    showResult
                      ? isCorrectOption
                        ? 'border-green-500 bg-green-50'
                        : isSelected
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 opacity-50'
                      : isSelected
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showResult
                        ? isCorrectOption
                          ? 'bg-green-500 border-green-500 text-white'
                          : isSelected
                          ? 'bg-red-500 border-red-500 text-white'
                          : 'border-gray-300'
                        : isSelected
                        ? 'bg-indigo-500 border-indigo-500 text-white'
                        : 'border-gray-400'
                    }`}>
                      {showResult && isCorrectOption && '✓'}
                      {showResult && isSelected && !isCorrectOption && '✗'}
                      {!showResult && isSelected && '●'}
                    </div>
                    <span className={showResult && !isCorrectOption && isSelected ? 'text-red-700' : ''}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Hint */}
          {!showResult && !showHint && (
            <button
              onClick={handleShowHint}
              className="text-indigo-600 hover:text-indigo-800 text-sm underline mb-4"
            >
              Sýna vísbendingu (-7 stig)
            </button>
          )}

          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-4">
              <span className="font-bold text-yellow-800">Vísbending: </span>
              <span className="text-yellow-900">{question.hint}</span>
            </div>
          )}

          {/* Submit/Next button */}
          {!showResult ? (
            <button
              onClick={checkAnswer}
              disabled={selectedAnswer === null}
              className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-xl"
            >
              Athuga svar
            </button>
          ) : (
            <>
              <div className="mb-4">
                <FeedbackPanel
                  feedback={{
                    isCorrect,
                    explanation: question.explanation,
                    misconception: isCorrect ? undefined : 'Mundu: Jón hefur HEILDAR rafhlöðu sem laðar að hlutarafhlöðu (δ+ eða δ-) skautaðra sameinda.',
                    relatedConcepts: ['Leysanleiki', 'Vatnshjúp', 'Jónir', 'Tvípólar'],
                    nextSteps: isCorrect
                      ? 'Frábært! Þú skilur jón-tvípól krafta.'
                      : 'Endurskoðaðu hvernig jónir og skautaðar sameindir hafa samskipti.'
                  }}
                  config={{
                    showExplanation: true,
                    showMisconceptions: !isCorrect,
                    showRelatedConcepts: true,
                    showNextSteps: true,
                  }}
                />
              </div>
              <button
                onClick={nextQuestion}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl"
              >
                {currentQuestion < questions.length - 1 ? 'Næsta spurning' : 'Ljúka stigi 4'}
              </button>
            </>
          )}
        </div>

        {/* Quick reference */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="font-bold text-gray-700 mb-2">Flýtileiðbeiningar</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-orange-50 p-2 rounded">
              <div className="font-bold text-orange-700">Jákvæð jón (+)</div>
              <div className="text-orange-600">Laðar að δ⁻ (O í vatni)</div>
            </div>
            <div className="bg-orange-50 p-2 rounded">
              <div className="font-bold text-orange-700">Neikvæð jón (−)</div>
              <div className="text-orange-600">Laðar að δ⁺ (H í vatni)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
