import { useState } from 'react';

interface Level2Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface LewisStructure {
  centralAtom: string;
  surroundingAtoms: { symbol: string; bondType: 'single' | 'double' | 'triple'; lonePairs: number }[];
  centralLonePairs: number;
}

interface Challenge {
  id: number;
  title: string;
  molecule: string;
  totalElectrons: number;
  correctStructure: LewisStructure;
  steps: {
    question: string;
    type: 'central_atom' | 'bond_count' | 'lone_pairs_surrounding' | 'lone_pairs_central';
    options: { id: string; text: string; correct: boolean }[];
    explanation: string;
  }[];
  hint: string;
  finalExplanation: string;
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Vatn (H₂O)',
    molecule: 'H₂O',
    totalElectrons: 8,
    correctStructure: {
      centralAtom: 'O',
      surroundingAtoms: [
        { symbol: 'H', bondType: 'single', lonePairs: 0 },
        { symbol: 'H', bondType: 'single', lonePairs: 0 },
      ],
      centralLonePairs: 2,
    },
    steps: [
      {
        question: 'Hvert er miðatómið í H₂O?',
        type: 'central_atom',
        options: [
          { id: 'H', text: 'Vetni (H)', correct: false },
          { id: 'O', text: 'Súrefni (O)', correct: true },
        ],
        explanation: 'Súrefni er miðatómið - það hefur fleiri gildisrafeindir og getur myndað fleiri tengsl.',
      },
      {
        question: 'Hversu mörg einföld tengsl eru á milli O og H atómanna?',
        type: 'bond_count',
        options: [
          { id: '1', text: '1 tengi', correct: false },
          { id: '2', text: '2 tengsl', correct: true },
          { id: '3', text: '3 tengsl', correct: false },
        ],
        explanation: 'Tvö einföld tengsl - eitt til hvers vetnis. Þetta notar 4 rafeindir.',
      },
      {
        question: 'Hversu mörg einstæð rafeindarapör (lone pairs) eru á súrefninu?',
        type: 'lone_pairs_central',
        options: [
          { id: '0', text: '0 pör', correct: false },
          { id: '1', text: '1 par', correct: false },
          { id: '2', text: '2 pör', correct: true },
          { id: '3', text: '3 pör', correct: false },
        ],
        explanation: '8 heildarrafeindir - 4 í tengslum = 4 óbundnar, sem eru 2 einstæð rafeindarapör.',
      },
    ],
    hint: 'H getur aðeins myndað 1 tengi, þannig að O verður að vera miðatómið',
    finalExplanation: 'H₂O: O í miðju með 2 H tengd og 2 einstæð rafeindarapör. Þetta gefur 4 rafeindarapör í kringum O.',
  },
  {
    id: 2,
    title: 'Ammóníak (NH₃)',
    molecule: 'NH₃',
    totalElectrons: 8,
    correctStructure: {
      centralAtom: 'N',
      surroundingAtoms: [
        { symbol: 'H', bondType: 'single', lonePairs: 0 },
        { symbol: 'H', bondType: 'single', lonePairs: 0 },
        { symbol: 'H', bondType: 'single', lonePairs: 0 },
      ],
      centralLonePairs: 1,
    },
    steps: [
      {
        question: 'Hvert er miðatómið í NH₃?',
        type: 'central_atom',
        options: [
          { id: 'N', text: 'Nitur (N)', correct: true },
          { id: 'H', text: 'Vetni (H)', correct: false },
        ],
        explanation: 'Nitur er miðatómið með 5 gildisrafeindir.',
      },
      {
        question: 'Hversu mörg einföld N-H tengsl eru?',
        type: 'bond_count',
        options: [
          { id: '2', text: '2 tengsl', correct: false },
          { id: '3', text: '3 tengsl', correct: true },
          { id: '4', text: '4 tengsl', correct: false },
        ],
        explanation: 'Þrjú einföld tengsl - eitt til hvers vetnis. Þetta notar 6 rafeindir.',
      },
      {
        question: 'Hversu mörg einstæð rafeindarapör eru á nitrinu?',
        type: 'lone_pairs_central',
        options: [
          { id: '0', text: '0 pör', correct: false },
          { id: '1', text: '1 par', correct: true },
          { id: '2', text: '2 pör', correct: false },
        ],
        explanation: '8 heildarrafeindir - 6 í tengslum = 2 óbundnar, sem eru 1 einstætt rafeindarapar.',
      },
    ],
    hint: 'N hefur 5 gildisrafeindir, þannig að það getur myndað 3 tengsl og hefur 1 einstætt par',
    finalExplanation: 'NH₃: N í miðju með 3 H tengd og 1 einstætt rafeindarapar. Þetta gerir N tetrahedral en sameindina pýramídalaga.',
  },
  {
    id: 3,
    title: 'Koltvísýringur (CO₂)',
    molecule: 'CO₂',
    totalElectrons: 16,
    correctStructure: {
      centralAtom: 'C',
      surroundingAtoms: [
        { symbol: 'O', bondType: 'double', lonePairs: 2 },
        { symbol: 'O', bondType: 'double', lonePairs: 2 },
      ],
      centralLonePairs: 0,
    },
    steps: [
      {
        question: 'Hvert er miðatómið í CO₂?',
        type: 'central_atom',
        options: [
          { id: 'C', text: 'Kolefni (C)', correct: true },
          { id: 'O', text: 'Súrefni (O)', correct: false },
        ],
        explanation: 'Kolefni er miðatómið - það hefur færri rafeindir og stendur venjulega í miðjunni.',
      },
      {
        question: 'Hvers konar tengsl eru á milli C og O?',
        type: 'bond_count',
        options: [
          { id: 'single', text: 'Einföld tengsl (C-O)', correct: false },
          { id: 'double', text: 'Tvöföld tengsl (C=O)', correct: true },
          { id: 'triple', text: 'Þreföld tengsl (C≡O)', correct: false },
        ],
        explanation: 'Tvöföld tengsl til beggja súrefna. C myndar 4 tengsl alls (2+2) og hvert O hefur 8 rafeindir.',
      },
      {
        question: 'Hversu mörg einstæð rafeindarapör eru á HVERJU súrefni?',
        type: 'lone_pairs_surrounding',
        options: [
          { id: '1', text: '1 par', correct: false },
          { id: '2', text: '2 pör', correct: true },
          { id: '3', text: '3 pör', correct: false },
        ],
        explanation: 'Hvert O hefur 2 einstæð rafeindarapör. Ásamt tvöföldu tengslunum hefur hvert O 8 rafeindir.',
      },
    ],
    hint: 'C þarf 4 tengsl og hvert O þarf 2 tengsl (fyrir áttu)',
    finalExplanation: 'CO₂: O=C=O með tvöföldum tengslum. Hvert O hefur 2 einstæð pör. Þetta er línuleg sameind.',
  },
  {
    id: 4,
    title: 'Metan (CH₄)',
    molecule: 'CH₄',
    totalElectrons: 8,
    correctStructure: {
      centralAtom: 'C',
      surroundingAtoms: [
        { symbol: 'H', bondType: 'single', lonePairs: 0 },
        { symbol: 'H', bondType: 'single', lonePairs: 0 },
        { symbol: 'H', bondType: 'single', lonePairs: 0 },
        { symbol: 'H', bondType: 'single', lonePairs: 0 },
      ],
      centralLonePairs: 0,
    },
    steps: [
      {
        question: 'Hvert er miðatómið í CH₄?',
        type: 'central_atom',
        options: [
          { id: 'C', text: 'Kolefni (C)', correct: true },
          { id: 'H', text: 'Vetni (H)', correct: false },
        ],
        explanation: 'Kolefni er miðatómið með 4 gildisrafeindir.',
      },
      {
        question: 'Hversu mörg C-H tengsl eru í metan?',
        type: 'bond_count',
        options: [
          { id: '3', text: '3 tengsl', correct: false },
          { id: '4', text: '4 tengsl', correct: true },
          { id: '5', text: '5 tengsl', correct: false },
        ],
        explanation: '4 einföld C-H tengsl. Þetta notar allar 8 rafeindirnar.',
      },
      {
        question: 'Eru einhver einstæð rafeindarapör á kolefninu?',
        type: 'lone_pairs_central',
        options: [
          { id: '0', text: 'Nei, engin', correct: true },
          { id: '1', text: 'Já, 1 par', correct: false },
          { id: '2', text: 'Já, 2 pör', correct: false },
        ],
        explanation: 'Allar 8 rafeindir eru í tengslum. Kolefni hefur engin einstæð pör í metan.',
      },
    ],
    hint: 'C myndar 4 tengsl og H myndar 1 - þannig kemur CH₄',
    finalExplanation: 'CH₄: C í miðju með 4 H tengd. Engin einstæð rafeindarapör. Þetta er tetrahedal sameind.',
  },
  {
    id: 5,
    title: 'Nituroxíð (NO)',
    molecule: 'NO',
    totalElectrons: 11,
    correctStructure: {
      centralAtom: 'N',
      surroundingAtoms: [
        { symbol: 'O', bondType: 'double', lonePairs: 2 },
      ],
      centralLonePairs: 1,
    },
    steps: [
      {
        question: 'Þessi sameind hefur oddatölu rafeinda (11). Hvað þýðir það?',
        type: 'central_atom',
        options: [
          { id: 'radical', text: 'Hún hefur óparaða rafeind (radical)', correct: true },
          { id: 'normal', text: 'Ekkert sérstakt', correct: false },
        ],
        explanation: 'NO er róttæki (radical) með eina óparaða rafeind. Þetta gerir hana mjög hvarfgjarnan.',
      },
      {
        question: 'Hvers konar tengsl eru á milli N og O?',
        type: 'bond_count',
        options: [
          { id: 'single', text: 'Einföld tengsl', correct: false },
          { id: 'double', text: 'Tvöföld tengsl', correct: true },
          { id: 'triple', text: 'Þreföld tengsl', correct: false },
        ],
        explanation: 'Tvöföld tengsl (N=O) með óparaðri rafeind á nitrinu.',
      },
      {
        question: 'Hvar er óparaða rafeindin?',
        type: 'lone_pairs_central',
        options: [
          { id: 'N', text: 'Á nitrinu (N)', correct: true },
          { id: 'O', text: 'Á súrefninu (O)', correct: false },
        ],
        explanation: 'N hefur óparaða rafeind, sem gerir NO að róttæki.',
      },
    ],
    hint: 'Sameindir með oddatölu rafeinda eru róttæki',
    finalExplanation: 'NO: Tvöföld tengsl N=O með óparaðri rafeind á N. Þetta er róttæki og mjög hvarfgjarnt.',
  },
  {
    id: 6,
    title: 'Vetni klóríð (HCl)',
    molecule: 'HCl',
    totalElectrons: 8,
    correctStructure: {
      centralAtom: 'Cl',
      surroundingAtoms: [
        { symbol: 'H', bondType: 'single', lonePairs: 0 },
      ],
      centralLonePairs: 3,
    },
    steps: [
      {
        question: 'Hvers konar tengsl eru í HCl?',
        type: 'bond_count',
        options: [
          { id: 'single', text: 'Einföld tengsl (H-Cl)', correct: true },
          { id: 'double', text: 'Tvöföld tengsl', correct: false },
        ],
        explanation: 'Eitt einfalt tengi. Bæði H og Cl þurfa aðeins 1 rafeind.',
      },
      {
        question: 'Hversu mörg einstæð rafeindarapör eru á Cl?',
        type: 'lone_pairs_central',
        options: [
          { id: '2', text: '2 pör', correct: false },
          { id: '3', text: '3 pör', correct: true },
          { id: '4', text: '4 pör', correct: false },
        ],
        explanation: 'Cl hefur 7 gildisrafeindir. 1 í tengslum, 6 óbundnar = 3 einstæð pör.',
      },
      {
        question: 'Er áttureglan uppfyllt fyrir Cl?',
        type: 'central_atom',
        options: [
          { id: 'yes', text: 'Já', correct: true },
          { id: 'no', text: 'Nei', correct: false },
        ],
        explanation: 'Cl hefur 2 (frá tengi) + 6 (einstæð) = 8 rafeindir. Áttureglan er uppfyllt!',
      },
    ],
    hint: 'Cl þarf aðeins 1 rafeind til að ná áttureglunni',
    finalExplanation: 'HCl: Einfalt H-Cl tengi. Cl hefur 3 einstæð rafeindarapör. Bæði H og Cl hafa fulla ystu skel.',
  },
];

export function Level2({ onComplete, onBack }: Level2Props) {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showStepResult, setShowStepResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [stepCorrect, setStepCorrect] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);

  const challenge = challenges[currentChallenge];
  const step = challenge.steps[currentStep];
  const isLastStep = currentStep === challenge.steps.length - 1;
  const isLastChallenge = currentChallenge === challenges.length - 1;

  const checkStep = () => {
    const correct = step.options.find(opt => opt.id === selectedAnswer)?.correct ?? false;
    setStepCorrect(prev => [...prev, correct]);

    if (correct && !showHint) {
      setScore(prev => prev + 5);
    } else if (correct && showHint) {
      setScore(prev => prev + 2);
    }

    setShowStepResult(true);
  };

  const nextStep = () => {
    if (!isLastStep) {
      setCurrentStep(prev => prev + 1);
      setSelectedAnswer(null);
      setShowStepResult(false);
      setShowHint(false);
    }
  };

  const nextChallenge = () => {
    if (!isLastChallenge) {
      setCurrentChallenge(prev => prev + 1);
      setCurrentStep(0);
      setSelectedAnswer(null);
      setShowStepResult(false);
      setShowHint(false);
      setStepCorrect([]);
    } else {
      onComplete(score);
    }
  };

  // Visual Lewis structure renderer
  const renderLewisStructure = () => {
    const structure = challenge.correctStructure;
    const showFull = isLastStep && showStepResult;

    return (
      <div className="relative flex items-center justify-center py-8">
        {/* Surrounding atoms on left */}
        {structure.surroundingAtoms.slice(0, Math.ceil(structure.surroundingAtoms.length / 2)).map((atom, idx) => (
          <div key={`left-${idx}`} className="flex items-center">
            <div className={`w-12 h-12 rounded-full border-3 flex items-center justify-center font-bold ${
              atom.symbol === 'H' ? 'bg-gray-100 border-gray-400 text-gray-700 text-sm' : 'bg-green-100 border-green-500 text-green-800'
            }`}>
              {atom.symbol}
            </div>
            <div className={`w-8 h-1 ${atom.bondType === 'double' ? 'h-2 bg-gradient-to-b from-gray-800 via-transparent to-gray-800' : atom.bondType === 'triple' ? 'h-3' : 'bg-gray-800'}`} />
          </div>
        ))}

        {/* Central atom */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-blue-500 bg-blue-100 flex items-center justify-center font-bold text-xl text-blue-800">
            {structure.centralAtom}
          </div>
          {/* Lone pairs on central atom */}
          {showFull && structure.centralLonePairs > 0 && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1">
              {Array(Math.min(structure.centralLonePairs, 2)).fill(0).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              ))}
            </div>
          )}
        </div>

        {/* Surrounding atoms on right */}
        {structure.surroundingAtoms.slice(Math.ceil(structure.surroundingAtoms.length / 2)).map((atom, idx) => (
          <div key={`right-${idx}`} className="flex items-center">
            <div className={`w-8 h-1 ${atom.bondType === 'double' ? 'h-2 bg-gradient-to-b from-gray-800 via-transparent to-gray-800' : 'bg-gray-800'}`} />
            <div className={`w-12 h-12 rounded-full border-3 flex items-center justify-center font-bold ${
              atom.symbol === 'H' ? 'bg-gray-100 border-gray-400 text-gray-700 text-sm' : 'bg-green-100 border-green-500 text-green-800'
            }`}>
              {atom.symbol}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <span>&larr;</span> Til baka
          </button>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              Stig 2 / Sameind {currentChallenge + 1} af {challenges.length}
            </div>
            <div className="text-lg font-bold text-green-600">{score} stig</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentChallenge + (currentStep + 1) / challenge.steps.length) / challenges.length) * 100}%` }}
          />
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            {challenge.title}
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-3xl font-bold text-indigo-600">{challenge.molecule}</span>
            <span className="text-sm text-gray-600">({challenge.totalElectrons} gildisrafeindir)</span>
          </div>

          {/* Lewis structure visualization */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            {renderLewisStructure()}
          </div>

          {/* Step indicator */}
          <div className="flex gap-2 mb-4">
            {challenge.steps.map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 h-2 rounded-full ${
                  idx < currentStep
                    ? stepCorrect[idx]
                      ? 'bg-green-500'
                      : 'bg-red-400'
                    : idx === currentStep
                    ? 'bg-blue-500'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Current step question */}
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-800 mb-4">
              Skref {currentStep + 1}: {step.question}
            </p>

            <div className="space-y-3">
              {step.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => !showStepResult && setSelectedAnswer(option.id)}
                  disabled={showStepResult}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    showStepResult
                      ? option.correct
                        ? 'border-green-500 bg-green-50'
                        : selectedAnswer === option.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-gray-50 opacity-50'
                      : selectedAnswer === option.id
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                      : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>

          {/* Step result */}
          {showStepResult && (
            <div className={`p-4 rounded-xl mb-4 ${
              step.options.find(o => o.id === selectedAnswer)?.correct
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <p className="text-sm text-gray-700">{step.explanation}</p>
            </div>
          )}

          {/* Final explanation */}
          {isLastStep && showStepResult && (
            <div className="bg-indigo-50 p-4 rounded-xl mb-4">
              <div className="font-bold text-indigo-800 mb-2">Lewis-formúla:</div>
              <p className="text-indigo-900 text-sm">{challenge.finalExplanation}</p>
            </div>
          )}

          {/* Hint button */}
          {!showStepResult && !showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="text-green-600 hover:text-green-800 text-sm underline mb-4"
            >
              Sýna vísbendingu (-3 stig)
            </button>
          )}

          {showHint && !showStepResult && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-4">
              <span className="font-bold text-yellow-800">Vísbending: </span>
              <span className="text-yellow-900">{challenge.hint}</span>
            </div>
          )}

          {/* Action buttons */}
          {!showStepResult ? (
            <button
              onClick={checkStep}
              disabled={!selectedAnswer}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              Athuga
            </button>
          ) : isLastStep ? (
            <button
              onClick={nextChallenge}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              {isLastChallenge ? 'Ljúka stigi 2' : 'Næsta sameind'}
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              Næsta skref
            </button>
          )}
        </div>

        {/* Quick reference */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="font-bold text-gray-700 mb-2">Skref til að teikna Lewis-formúlu:</h3>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li className={currentStep >= 0 ? 'text-green-600 font-medium' : ''}>Veldu miðatóm (oftast það sem hefur flest tengsl)</li>
            <li className={currentStep >= 1 ? 'text-green-600 font-medium' : ''}>Teiknaðu einföld tengsl til allra ytri atóma</li>
            <li className={currentStep >= 2 ? 'text-green-600 font-medium' : ''}>Dreifðu eftirstandandi rafeindum sem einstæð pör</li>
            <li>Breyttu í tvöföld/þreföld tengsl ef þarf til að uppfylla átturegluna</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
