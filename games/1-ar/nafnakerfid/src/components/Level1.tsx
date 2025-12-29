import { useState } from 'react';

interface Level1Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface NamingRule {
  id: string;
  title: string;
  description: string;
  rules: string[];
  examples: { formula: string; name: string; explanation: string }[];
  color: string;
}

const namingRules: NamingRule[] = [
  {
    id: 'ionic-simple',
    title: 'Einföld jónefni',
    description: 'Málmur + málmleysingi (hópar 1, 2, 13)',
    rules: [
      'Málmurinn kemur fyrst og heldur nafni sínu',
      'Málmleysinginn fær endinguna -íð',
      'Dæmi: klór → klóríð, súrefni → oxíð, brennisteinn → súlfíð'
    ],
    examples: [
      { formula: 'NaCl', name: 'Natríumklóríð', explanation: 'Natríum (málmur) + klór → klóríð' },
      { formula: 'MgO', name: 'Magnesíumoxíð', explanation: 'Magnesíum + súrefni → oxíð' },
      { formula: 'CaF₂', name: 'Kalsíumflúoríð', explanation: 'Kalsíum + flúor → flúoríð' },
      { formula: 'Al₂O₃', name: 'Áloxíð', explanation: 'Ál + súrefni → oxíð' }
    ],
    color: 'blue'
  },
  {
    id: 'ionic-variable',
    title: 'Málmar með breytilega hleðslu',
    description: 'Járn, kopar, tin, blý og fleiri',
    rules: [
      'Notaðu rómverskar tölur til að sýna hleðslu málmsins',
      'Talan kemur í sviga á eftir nafni málmsins',
      'Dæmi: Fe²⁺ = járn(II), Fe³⁺ = járn(III), Cu⁺ = kopar(I)'
    ],
    examples: [
      { formula: 'FeCl₂', name: 'Járn(II)klóríð', explanation: 'Fe²⁺ + 2Cl⁻ → járn(II) + klóríð' },
      { formula: 'FeCl₃', name: 'Járn(III)klóríð', explanation: 'Fe³⁺ + 3Cl⁻ → járn(III) + klóríð' },
      { formula: 'CuO', name: 'Kopar(II)oxíð', explanation: 'Cu²⁺ + O²⁻ → kopar(II) + oxíð' },
      { formula: 'Cu₂O', name: 'Kopar(I)oxíð', explanation: '2Cu⁺ + O²⁻ → kopar(I) + oxíð' }
    ],
    color: 'purple'
  },
  {
    id: 'ionic-polyatomic',
    title: 'Fjölatóma jónir',
    description: 'Samsettar jónir með sérstök nöfn',
    rules: [
      'Sumar jónir eru samsettar úr mörgum atómum',
      'Þær hafa föst nöfn sem þarf að læra',
      'Algengastar: súlfat (SO₄²⁻), nítrat (NO₃⁻), karbónat (CO₃²⁻), hýdroxíð (OH⁻)'
    ],
    examples: [
      { formula: 'Na₂SO₄', name: 'Natríumsúlfat', explanation: 'Natríum + súlfat (SO₄²⁻)' },
      { formula: 'KNO₃', name: 'Kalíumnítrat', explanation: 'Kalíum + nítrat (NO₃⁻)' },
      { formula: 'CaCO₃', name: 'Kalsíumkarbónat', explanation: 'Kalsíum + karbónat (CO₃²⁻)' },
      { formula: 'NaOH', name: 'Natríumhýdroxíð', explanation: 'Natríum + hýdroxíð (OH⁻)' }
    ],
    color: 'green'
  },
  {
    id: 'molecular',
    title: 'Sameindir (málmleysingjar)',
    description: 'Tveir eða fleiri málmleysingjar',
    rules: [
      'Notaðu grískar forskeytir til að sýna fjölda atóma',
      'Forskeytir: mono (1), dí (2), trí (3), tetra (4), penta (5), hexa (6)',
      'Fyrra frumefnið fær ekki "mono-" en það síðara fær alltaf forsetið',
      'Síðara frumefnið fær endinguna -íð'
    ],
    examples: [
      { formula: 'CO₂', name: 'Koldíoxíð', explanation: 'C (eitt) + O₂ (tvö) = kol + dí + oxíð' },
      { formula: 'N₂O₄', name: 'Díniturtetroxíð', explanation: 'N₂ (tvö) + O₄ (fjögur) = dí + nitur + tetra + oxíð' },
      { formula: 'SF₆', name: 'Brennisteinshexaflúoríð', explanation: 'S (eitt) + F₆ (sex) = brennisteinn + hexa + flúoríð' },
      { formula: 'PCl₅', name: 'Fosforpentaklóríð', explanation: 'P (eitt) + Cl₅ (fimm) = fosfor + penta + klóríð' }
    ],
    color: 'orange'
  }
];

interface QuizQuestion {
  id: number;
  question: string;
  formula?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  ruleId: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Hvaða ending fær klór í jónefnum?',
    options: ['-íð (klóríð)', '-at (klórat)', '-ít (klórít)', '-an (klóran)'],
    correctIndex: 0,
    explanation: 'Einatóma málmleysingjar fá endinguna -íð. Klór → klóríð.',
    ruleId: 'ionic-simple'
  },
  {
    id: 2,
    question: 'Hvað heitir MgO?',
    formula: 'MgO',
    options: ['Magnesíumoxíð', 'Magnesíumoxat', 'Dímagnesíumoxíð', 'Magnesíum(II)oxíð'],
    correctIndex: 0,
    explanation: 'Mg er í hópi 2 og hefur alltaf +2 hleðslu, svo við notum ekki rómverskar tölur.',
    ruleId: 'ionic-simple'
  },
  {
    id: 3,
    question: 'Af hverju heitir FeCl₂ "Járn(II)klóríð" en ekki bara "Járnklóríð"?',
    formula: 'FeCl₂',
    options: [
      'Járn getur haft mismunandi hleðslu',
      'Það eru tvö klór atóm',
      'Járn er í hópi 2',
      'Klór er tvígilt'
    ],
    correctIndex: 0,
    explanation: 'Járn getur verið Fe²⁺ eða Fe³⁺. Rómverska talan (II) sýnir að þetta er Fe²⁺.',
    ruleId: 'ionic-variable'
  },
  {
    id: 4,
    question: 'Hvað heitir CuO?',
    formula: 'CuO',
    options: ['Kopar(II)oxíð', 'Kopar(I)oxíð', 'Koparoxíð', 'Díkoparoxíð'],
    correctIndex: 0,
    explanation: 'O er -2, svo Cu verður að vera +2. Þess vegna kopar(II).',
    ruleId: 'ionic-variable'
  },
  {
    id: 5,
    question: 'Hver er formúlan fyrir natríumsúlfat?',
    options: ['Na₂SO₄', 'NaSO₄', 'Na₂SO₃', 'NaS'],
    correctIndex: 0,
    explanation: 'Súlfat er SO₄²⁻. Natríum er Na⁺. Þarf 2 Na⁺ til að jafna -2 hleðsluna.',
    ruleId: 'ionic-polyatomic'
  },
  {
    id: 6,
    question: 'Hvað þýðir "dí-" í nafni sameindar?',
    options: ['Tvö atóm', 'Eitt atóm', 'Þrjú atóm', 'Fjögur atóm'],
    correctIndex: 0,
    explanation: 'Grísku forskeytirnar: mono=1, dí=2, trí=3, tetra=4, penta=5, hexa=6.',
    ruleId: 'molecular'
  },
  {
    id: 7,
    question: 'Hvað heitir N₂O₅?',
    formula: 'N₂O₅',
    options: ['Díniturpentoxíð', 'Niturpentoxíð', 'Dínituroxíð', 'Niturdíoxíð'],
    correctIndex: 0,
    explanation: 'N₂ = dínitur, O₅ = pentoxíð. Sameind = grísk forskeyti fyrir bæði.',
    ruleId: 'molecular'
  },
  {
    id: 8,
    question: 'Af hverju heitir CO₂ "koldíoxíð" en ekki "monokoldíoxíð"?',
    formula: 'CO₂',
    options: [
      'Fyrra frumefnið fær ekki "mono-"',
      'Kol er undantekning',
      'Það er aðeins eitt kol',
      'Dí þýðir líka eitt'
    ],
    correctIndex: 0,
    explanation: 'Í sameindum sleppum við "mono-" fyrir fyrra frumefnið, en síðara frumefnið fær alltaf forskeyti.',
    ruleId: 'molecular'
  },
  {
    id: 9,
    question: 'Hvernig þekkir þú hvort efnasamband er jónefni eða sameind?',
    options: [
      'Jónefni: málmur + málmleysingi. Sameind: tveir málmleysingjar.',
      'Jónefni eru alltaf föst, sameindir alltaf gas',
      'Jónefni hafa fleiri atóm',
      'Það er engin leið að sjá það'
    ],
    correctIndex: 0,
    explanation: 'Jónefni myndast þegar málmur (gefur e⁻) bindst málmleysingi (tekur e⁻). Sameindir eru málmleysingjar sem deila e⁻.',
    ruleId: 'ionic-simple'
  },
  {
    id: 10,
    question: 'Hvað heitir Ca(OH)₂?',
    formula: 'Ca(OH)₂',
    options: ['Kalsíumhýdroxíð', 'Kalsíumdíhýdroxíð', 'Kalsíum(II)hýdroxíð', 'Díkalsíumhýdroxíð'],
    correctIndex: 0,
    explanation: 'OH⁻ er hýdroxíð jónin. Við notum ekki grísk forskeyti í jónefnum, bara í sameindum.',
    ruleId: 'ionic-polyatomic'
  }
];

export function Level1({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level1Props) {
  const [phase, setPhase] = useState<'learn' | 'quiz'>('learn');
  const [currentRule, setCurrentRule] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [totalHintsUsed] = useState(0); // Level1 has no hints in quiz phase

  const rule = namingRules[currentRule];
  const question = quizQuestions[currentQuestion];

  const handleNextRule = () => {
    if (currentRule < namingRules.length - 1) {
      setCurrentRule(prev => prev + 1);
    } else {
      setPhase('quiz');
    }
  };

  const handlePrevRule = () => {
    if (currentRule > 0) {
      setCurrentRule(prev => prev - 1);
    }
  };

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);

    if (index === question.correctIndex) {
      setScore(prev => prev + 1);
      onCorrectAnswer?.();
    } else {
      onIncorrectAnswer?.();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onComplete(score, quizQuestions.length, totalHintsUsed);
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; light: string }> = {
      blue: { bg: 'bg-blue-500', border: 'border-blue-400', text: 'text-blue-800', light: 'bg-blue-50' },
      purple: { bg: 'bg-purple-500', border: 'border-purple-400', text: 'text-purple-800', light: 'bg-purple-50' },
      green: { bg: 'bg-green-500', border: 'border-green-400', text: 'text-green-800', light: 'bg-green-50' },
      orange: { bg: 'bg-orange-500', border: 'border-orange-400', text: 'text-orange-800', light: 'bg-orange-50' }
    };
    return colors[color] || colors.blue;
  };

  if (phase === 'learn') {
    const colors = getColorClasses(rule.color);

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700 flex items-center gap-2">
              <span>←</span> Til baka
            </button>
            <div className="text-sm text-gray-500">
              Regla {currentRule + 1} af {namingRules.length}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-indigo-600">
            Reglur um nafnagift
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Lærðu hvernig efnasambönd eru nefnd
          </p>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-8">
            {namingRules.map((r, idx) => (
              <button
                key={r.id}
                onClick={() => setCurrentRule(idx)}
                className={`w-4 h-4 rounded-full transition-all ${
                  idx === currentRule
                    ? `${getColorClasses(r.color).bg} scale-125`
                    : idx < currentRule
                      ? 'bg-green-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Regla ${idx + 1}: ${r.title}`}
              />
            ))}
          </div>

          {/* Rule card */}
          <div className={`${colors.light} border-2 ${colors.border} rounded-2xl p-6 mb-6`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`${colors.bg} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold`}>
                {currentRule + 1}
              </div>
              <div>
                <h2 className={`text-xl font-bold ${colors.text}`}>{rule.title}</h2>
                <p className="text-gray-600 text-sm">{rule.description}</p>
              </div>
            </div>

            {/* Rules list */}
            <div className="bg-white rounded-xl p-4 mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Reglur:</h3>
              <ul className="space-y-2">
                {rule.rules.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className={`${colors.text} font-bold mt-0.5`}>•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Examples */}
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-gray-700 mb-3">Dæmi:</h3>
              <div className="grid gap-3">
                {rule.examples.map((ex, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-mono font-bold text-gray-800 min-w-[80px]">
                      {ex.formula}
                    </div>
                    <div className="text-2xl text-gray-400">→</div>
                    <div className="flex-1">
                      <div className={`font-bold ${colors.text}`}>{ex.name}</div>
                      <div className="text-sm text-gray-600">{ex.explanation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePrevRule}
              disabled={currentRule === 0}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
                currentRule === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-500 hover:bg-gray-600 text-white'
              }`}
            >
              ← Fyrri regla
            </button>
            <button
              onClick={handleNextRule}
              className={`flex-1 ${colors.bg} hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all`}
            >
              {currentRule === namingRules.length - 1 ? 'Hefja próf →' : 'Næsta regla →'}
            </button>
          </div>

          {/* Quick reference */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Yfirlit yfir reglur:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              {namingRules.map((r, idx) => (
                <div
                  key={r.id}
                  className={`p-2 rounded-lg ${idx === currentRule ? getColorClasses(r.color).light : 'bg-white'} border`}
                >
                  <div className={`font-bold ${getColorClasses(r.color).text} text-xs`}>{r.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz phase
  const ruleForQuestion = namingRules.find(r => r.id === question.ruleId);
  const questionColors = ruleForQuestion ? getColorClasses(ruleForQuestion.color) : getColorClasses('blue');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            ← Til baka
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Spurning {currentQuestion + 1} af {quizQuestions.length}
            </div>
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-bold">
              Stig: {score}
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-indigo-600">
          Próf: Nafnareglur
        </h1>

        {/* Question */}
        <div className={`${questionColors.light} border-2 ${questionColors.border} rounded-xl p-6 mb-6`}>
          <div className="text-sm font-medium text-gray-500 mb-2">
            {ruleForQuestion?.title}
          </div>
          <div className="text-xl font-bold text-gray-800 mb-4">
            {question.question}
          </div>
          {question.formula && (
            <div className="text-3xl font-mono font-bold text-center text-gray-800 bg-white rounded-lg py-4">
              {question.formula}
            </div>
          )}
        </div>

        {/* Options */}
        <div className="grid gap-3 mb-6">
          {question.options.map((option, idx) => {
            let buttonClass = 'bg-white border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50';

            if (showFeedback) {
              if (idx === question.correctIndex) {
                buttonClass = 'bg-green-100 border-2 border-green-500 text-green-800';
              } else if (idx === selectedAnswer && idx !== question.correctIndex) {
                buttonClass = 'bg-red-100 border-2 border-red-500 text-red-800';
              } else {
                buttonClass = 'bg-gray-100 border-2 border-gray-200 text-gray-500';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showFeedback}
                className={`p-4 rounded-xl font-medium text-left transition-all ${buttonClass}`}
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`p-4 rounded-xl mb-6 ${
            selectedAnswer === question.correctIndex
              ? 'bg-green-100 border-2 border-green-400'
              : 'bg-amber-100 border-2 border-amber-400'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">
                {selectedAnswer === question.correctIndex ? '✓' : '💡'}
              </span>
              <span className={`font-bold ${
                selectedAnswer === question.correctIndex ? 'text-green-800' : 'text-amber-800'
              }`}>
                {selectedAnswer === question.correctIndex ? 'Rétt!' : 'Útskýring:'}
              </span>
            </div>
            <p className={selectedAnswer === question.correctIndex ? 'text-green-700' : 'text-amber-700'}>
              {question.explanation}
            </p>
          </div>
        )}

        {/* Next button */}
        {showFeedback && (
          <button
            onClick={handleNextQuestion}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
          >
            {currentQuestion < quizQuestions.length - 1 ? 'Næsta spurning →' : 'Ljúka stigi →'}
          </button>
        )}

        {/* Progress bar */}
        <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>

        {/* Quick reference */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-700 mb-2 text-sm">Minnisblað:</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-blue-50 p-2 rounded">
              <span className="font-bold text-blue-700">Jónefni:</span> málmur + -íð
            </div>
            <div className="bg-purple-50 p-2 rounded">
              <span className="font-bold text-purple-700">Breytileg:</span> rómverskar tölur
            </div>
            <div className="bg-green-50 p-2 rounded">
              <span className="font-bold text-green-700">Fjölatóma:</span> sérstök nöfn
            </div>
            <div className="bg-orange-50 p-2 rounded">
              <span className="font-bold text-orange-700">Sameindir:</span> grísk forskeyti
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
