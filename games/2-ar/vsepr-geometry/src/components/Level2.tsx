import { useState } from 'react';
import { AnimatedMolecule } from '@shared/components';
import { vseprToMolecule } from '../utils/vseprConverter';

interface Level2Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface GeometryOption {
  id: string;
  name: string;
  bondAngle: string;
}

const GEOMETRY_OPTIONS: GeometryOption[] = [
  { id: 'linear', name: 'Línuleg', bondAngle: '180°' },
  { id: 'bent', name: 'Beygð', bondAngle: '<120° eða <109.5°' },
  { id: 'trigonal-planar', name: 'Þríhyrnd slétt', bondAngle: '120°' },
  { id: 'trigonal-pyramidal', name: 'Þríhyrnd pýramída', bondAngle: '107°' },
  { id: 'tetrahedral', name: 'Fjórflötungur', bondAngle: '109.5°' },
  { id: 'seesaw', name: 'Sjáldruslögun', bondAngle: '90° og 120°' },
  { id: 't-shaped', name: 'T-lögun', bondAngle: '90°' },
  { id: 'trigonal-bipyramidal', name: 'Þríhyrnd tvípýramída', bondAngle: '90° og 120°' },
  { id: 'square-planar', name: 'Ferningsslétt', bondAngle: '90°' },
  { id: 'octahedral', name: 'Áttflötungur', bondAngle: '90°' },
];

interface Molecule {
  id: number;
  formula: string;
  name: string;
  lewisStructure: string;
  centralAtom: string;
  bondingPairs: number;
  lonePairs: number;
  electronDomains: number;
  electronGeometry: string;
  molecularGeometry: string;
  correctGeometryId: string;
  bondAngle: string;
  isPolar: boolean;
  explanation: string;
}

const molecules: Molecule[] = [
  {
    id: 1,
    formula: 'H₂O',
    name: 'Vatn',
    lewisStructure: '  ::  ::\n   \\ /\nH — O — H',
    centralAtom: 'O',
    bondingPairs: 2,
    lonePairs: 2,
    electronDomains: 4,
    electronGeometry: 'Fjórflötungur',
    molecularGeometry: 'Beygð',
    correctGeometryId: 'bent',
    bondAngle: '104.5°',
    isPolar: true,
    explanation: 'Súrefni hefur 6 gildisrafeindir. 2 fara í tengsl við H, 4 mynda 2 einstæð pör. 4 rafeinasvið = fjórflötungs rafeinalögun, en 2 einstæð pör gera sameindarlögunina beygða.'
  },
  {
    id: 2,
    formula: 'NH₃',
    name: 'Ammóníak',
    lewisStructure: '    ::\n    |\nH — N — H\n    |\n    H',
    centralAtom: 'N',
    bondingPairs: 3,
    lonePairs: 1,
    electronDomains: 4,
    electronGeometry: 'Fjórflötungur',
    molecularGeometry: 'Þríhyrnd pýramída',
    correctGeometryId: 'trigonal-pyramidal',
    bondAngle: '107°',
    isPolar: true,
    explanation: 'Nitur hefur 5 gildisrafeindir. 3 fara í tengsl við H, 2 mynda einstætt par. 4 rafeinasvið gefa fjórflötungs rafeinalögun, en 1 einstætt par gerir sameindarlögunina þríhyrnda pýramídu.'
  },
  {
    id: 3,
    formula: 'CH₄',
    name: 'Metan',
    lewisStructure: '    H\n    |\nH — C — H\n    |\n    H',
    centralAtom: 'C',
    bondingPairs: 4,
    lonePairs: 0,
    electronDomains: 4,
    electronGeometry: 'Fjórflötungur',
    molecularGeometry: 'Fjórflötungur',
    correctGeometryId: 'tetrahedral',
    bondAngle: '109.5°',
    isPolar: false,
    explanation: 'Kolefni hefur 4 gildisrafeindir sem allar fara í tengsl við H. 4 rafeinasvið, engin einstæð pör — fullkomin fjórflötungs lögun.'
  },
  {
    id: 4,
    formula: 'CO₂',
    name: 'Koltvísýringur',
    lewisStructure: 'O = C = O',
    centralAtom: 'C',
    bondingPairs: 2,
    lonePairs: 0,
    electronDomains: 2,
    electronGeometry: 'Línuleg',
    molecularGeometry: 'Línuleg',
    correctGeometryId: 'linear',
    bondAngle: '180°',
    isPolar: false,
    explanation: 'Tvöfaldar tengingar telja sem eitt rafeinasvið hvor. 2 rafeinasvið = línuleg lögun með 180° horn.'
  },
  {
    id: 5,
    formula: 'BF₃',
    name: 'Bórþríflúoríð',
    lewisStructure: '    F\n    |\n F — B — F',
    centralAtom: 'B',
    bondingPairs: 3,
    lonePairs: 0,
    electronDomains: 3,
    electronGeometry: 'Þríhyrnd slétt',
    molecularGeometry: 'Þríhyrnd slétt',
    correctGeometryId: 'trigonal-planar',
    bondAngle: '120°',
    isPolar: false,
    explanation: 'Bór hefur aðeins 3 gildisrafeindir og myndar 3 tengsl án einstæðra para. 3 rafeinasvið = þríhyrnd slétt lögun.'
  },
  {
    id: 6,
    formula: 'PCl₅',
    name: 'Fosfórpentaklóríð',
    lewisStructure: '    Cl\n    |\nCl-P-Cl\n   /|\\\n Cl Cl',
    centralAtom: 'P',
    bondingPairs: 5,
    lonePairs: 0,
    electronDomains: 5,
    electronGeometry: 'Þríhyrnd tvípýramída',
    molecularGeometry: 'Þríhyrnd tvípýramída',
    correctGeometryId: 'trigonal-bipyramidal',
    bondAngle: '90° og 120°',
    isPolar: false,
    explanation: 'Fosfór getur rúmað 5 tengsl vegna d-skelja. 5 rafeinasvið = þríhyrnd tvípýramída með 3 á miðsléttunni (120°) og 2 á ásnum (90°).'
  },
  {
    id: 7,
    formula: 'SF₄',
    name: 'Brennisteinstetraflúoríð',
    lewisStructure: '  :: F\n   \\|\nF-S-F\n   /\n  F',
    centralAtom: 'S',
    bondingPairs: 4,
    lonePairs: 1,
    electronDomains: 5,
    electronGeometry: 'Þríhyrnd tvípýramída',
    molecularGeometry: 'Sjáldruslögun',
    correctGeometryId: 'seesaw',
    bondAngle: '90° og 120°',
    isPolar: true,
    explanation: 'Brennisteinn hefur 6 gildisrafeindir. 4 í tengsl, 2 mynda einstætt par. 5 rafeinasvið = þríhyrnd tvípýramída en einstæða parið veldur sjáldruslögun.'
  },
  {
    id: 8,
    formula: 'SF₆',
    name: 'Brennisteinshexaflúoríð',
    lewisStructure: '    F\n    |\nF-S-F\n   /|\\\n F F F',
    centralAtom: 'S',
    bondingPairs: 6,
    lonePairs: 0,
    electronDomains: 6,
    electronGeometry: 'Áttflötungur',
    molecularGeometry: 'Áttflötungur',
    correctGeometryId: 'octahedral',
    bondAngle: '90°',
    isPolar: false,
    explanation: 'Brennisteinn getur rúmað 6 tengsl vegna d-skelja. 6 rafeinasvið í samhverfri áttflötungsröðun með öll horn 90°.'
  },
  {
    id: 9,
    formula: 'XeF₄',
    name: 'Xenontetraflúoríð',
    lewisStructure: '::  F  ::\n    |   \nF - Xe - F\n    |   \n    F',
    centralAtom: 'Xe',
    bondingPairs: 4,
    lonePairs: 2,
    electronDomains: 6,
    electronGeometry: 'Áttflötungur',
    molecularGeometry: 'Ferningsslétt',
    correctGeometryId: 'square-planar',
    bondAngle: '90°',
    isPolar: false,
    explanation: 'Xenon hefur 8 gildisrafeindir. 4 í tengsl, 4 mynda 2 einstæð pör. 6 rafeinasvið = áttflötungs rafeinalögun, en 2 einstæð pör (í andstæðum stöðum) gefa ferningssléttu lögun.'
  },
  {
    id: 10,
    formula: 'ClF₃',
    name: 'Klórþríflúoríð',
    lewisStructure: '    F\n    |\n::Cl::\n   / \\\n  F   F',
    centralAtom: 'Cl',
    bondingPairs: 3,
    lonePairs: 2,
    electronDomains: 5,
    electronGeometry: 'Þríhyrnd tvípýramída',
    molecularGeometry: 'T-lögun',
    correctGeometryId: 't-shaped',
    bondAngle: '90°',
    isPolar: true,
    explanation: 'Klór hefur 7 gildisrafeindir. 3 í tengsl, 4 mynda 2 einstæð pör. 5 rafeinasvið = þríhyrnd tvípýramída en 2 einstæð pör á miðsléttunni gefa T-lögun.'
  }
];

interface Step {
  id: 'count' | 'geometry' | 'angle' | 'explanation';
  label: string;
}

const STEPS: Step[] = [
  { id: 'count', label: 'Telja rafeinasvið' },
  { id: 'geometry', label: 'Velja lögun' },
  { id: 'angle', label: 'Tengihorn' },
  { id: 'explanation', label: 'Útskýra' }
];

export function Level2({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level2Props) {
  const [currentMolecule, setCurrentMolecule] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);

  // Step answers
  const [bondingPairsAnswer, setBondingPairsAnswer] = useState('');
  const [lonePairsAnswer, setLonePairsAnswer] = useState('');
  const [selectedGeometry, setSelectedGeometry] = useState<string | null>(null);
  const [selectedAngle, setSelectedAngle] = useState('');
  const [explanation, setExplanation] = useState('');

  // Feedback states
  const [stepResult, setStepResult] = useState<'correct' | 'incorrect' | null>(null);

  const molecule = molecules[currentMolecule];
  const step = STEPS[currentStep];
  const maxScore = molecules.length * STEPS.length * 10; // 10 points per step without hints

  const checkStep = () => {
    let correct = false;

    if (step.id === 'count') {
      correct = parseInt(bondingPairsAnswer) === molecule.bondingPairs &&
                parseInt(lonePairsAnswer) === molecule.lonePairs;
    } else if (step.id === 'geometry') {
      correct = selectedGeometry === molecule.correctGeometryId;
    } else if (step.id === 'angle') {
      // Accept approximate answers
      const normalizedAnswer = selectedAngle.replace(/\s/g, '').toLowerCase();
      const normalizedCorrect = molecule.bondAngle.replace(/\s/g, '').toLowerCase();
      correct = normalizedAnswer === normalizedCorrect ||
                normalizedAnswer.includes(normalizedCorrect.replace('°', '')) ||
                (molecule.correctGeometryId === 'bent' && (normalizedAnswer.includes('104') || normalizedAnswer.includes('105')));
    } else if (step.id === 'explanation') {
      // Always correct for explanation step - it's about learning
      correct = explanation.length > 20;
    }

    setStepResult(correct ? 'correct' : 'incorrect');

    if (correct) {
      onCorrectAnswer?.();
      if (!showHint) {
        setScore(prev => prev + 10);
      } else {
        setScore(prev => prev + 5);
      }
    } else {
      onIncorrectAnswer?.();
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      setStepResult(null);
      setShowHint(false);
    } else {
      // Move to next molecule
      if (currentMolecule < molecules.length - 1) {
        setCurrentMolecule(prev => prev + 1);
        resetStepAnswers();
      } else {
        onComplete(score, maxScore, totalHintsUsed);
      }
    }
  };

  const resetStepAnswers = () => {
    setCurrentStep(0);
    setBondingPairsAnswer('');
    setLonePairsAnswer('');
    setSelectedGeometry(null);
    setSelectedAngle('');
    setExplanation('');
    setStepResult(null);
    setShowHint(false);
  };

  const getHint = () => {
    if (step.id === 'count') {
      return `${molecule.centralAtom} hefur ${molecule.bondingPairs + molecule.lonePairs * 2} gildisrafeindir. Hversu margar fara í tengsl?`;
    } else if (step.id === 'geometry') {
      return `${molecule.electronDomains} rafeinasvið með ${molecule.lonePairs} einstæð pör gefur þessa lögun.`;
    } else if (step.id === 'angle') {
      return `Þessi lögun hefur venjulega horn nálægt ${molecule.bondAngle}.`;
    }
    return 'Útskýrðu af hverju þessi lögun myndast út frá fjölda rafeinasviða.';
  };

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
            <div className="text-sm text-gray-600">
              Sameind {currentMolecule + 1} af {molecules.length}
            </div>
            <div className="text-lg font-bold text-teal-600">{score} stig</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-teal-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentMolecule * STEPS.length + currentStep + 1) / (molecules.length * STEPS.length)) * 100}%` }}
          />
        </div>

        {/* Steps indicator */}
        <div className="flex gap-2 mb-6">
          {STEPS.map((s, idx) => (
            <div
              key={s.id}
              className={`flex-1 text-center py-2 rounded-lg text-sm font-medium ${
                idx === currentStep
                  ? 'bg-teal-500 text-white'
                  : idx < currentStep
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {s.label}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {/* Molecule display */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1 bg-gray-900 rounded-xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{molecule.formula}</div>
                <div className="text-gray-400 mb-4">{molecule.name}</div>
                <div className="flex justify-center py-4">
                  <AnimatedMolecule
                    molecule={vseprToMolecule({
                      formula: molecule.formula,
                      name: molecule.name,
                      centralAtom: molecule.centralAtom,
                      bondingPairs: molecule.bondingPairs,
                      lonePairs: molecule.lonePairs,
                      electronDomains: molecule.electronDomains,
                      correctGeometryId: molecule.correctGeometryId,
                      isPolar: molecule.isPolar,
                    })}
                    mode="vsepr"
                    size="lg"
                    animation="scale-in"
                    showLonePairs={true}
                    ariaLabel={`${molecule.name} VSEPR lögun`}
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-700 mb-4">Miðatóm: {molecule.centralAtom}</h3>

              {/* Step content */}
              {step.id === 'count' && (
                <div className="space-y-4">
                  <p className="text-gray-600">Teldu rafeinasvið í kringum miðatómið:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Bindandi pör
                      </label>
                      <input
                        type="number"
                        value={bondingPairsAnswer}
                        onChange={(e) => setBondingPairsAnswer(e.target.value)}
                        disabled={stepResult !== null}
                        className="w-full p-3 border-2 border-gray-300 rounded-xl text-center text-xl"
                        min="0"
                        max="6"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Einstæð pör
                      </label>
                      <input
                        type="number"
                        value={lonePairsAnswer}
                        onChange={(e) => setLonePairsAnswer(e.target.value)}
                        disabled={stepResult !== null}
                        className="w-full p-3 border-2 border-gray-300 rounded-xl text-center text-xl"
                        min="0"
                        max="3"
                      />
                    </div>
                  </div>
                  {stepResult === 'correct' && (
                    <div className="bg-teal-50 p-3 rounded-lg">
                      <span className="font-bold text-teal-700">Samtals rafeinasvið: </span>
                      <span className="text-teal-600">{molecule.electronDomains}</span>
                    </div>
                  )}
                </div>
              )}

              {step.id === 'geometry' && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Með {molecule.bondingPairs} bindandi pör og {molecule.lonePairs} einstæð pör,
                    hvaða <strong>sameindarlögun</strong> hefur þessi sameind?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {GEOMETRY_OPTIONS.map(geo => (
                      <button
                        key={geo.id}
                        onClick={() => !stepResult && setSelectedGeometry(geo.id)}
                        disabled={stepResult !== null}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          stepResult
                            ? geo.id === molecule.correctGeometryId
                              ? 'border-green-500 bg-green-50'
                              : selectedGeometry === geo.id
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 opacity-50'
                            : selectedGeometry === geo.id
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-gray-200 hover:border-teal-300'
                        }`}
                      >
                        <div className="font-bold text-sm">{geo.name}</div>
                        <div className="text-xs text-gray-500">{geo.bondAngle}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step.id === 'angle' && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Hvert er (eru) tengihornið/-in í {molecule.formula}?
                  </p>
                  <input
                    type="text"
                    value={selectedAngle}
                    onChange={(e) => setSelectedAngle(e.target.value)}
                    disabled={stepResult !== null}
                    placeholder="t.d. 109.5° eða 90° og 120°"
                    className="w-full p-3 border-2 border-gray-300 rounded-xl"
                  />
                  {stepResult === 'correct' && (
                    <div className="bg-green-50 p-3 rounded-lg text-green-700">
                      Rétt! Tengihornið er {molecule.bondAngle}
                    </div>
                  )}
                  {stepResult === 'incorrect' && (
                    <div className="bg-red-50 p-3 rounded-lg text-red-700">
                      Rétt svar: {molecule.bondAngle}
                    </div>
                  )}
                </div>
              )}

              {step.id === 'explanation' && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Útskýrðu af hverju {molecule.formula} hefur {molecule.molecularGeometry.toLowerCase()} lögun:
                  </p>
                  <textarea
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    disabled={stepResult !== null}
                    placeholder="Skrifaðu útskýringu..."
                    rows={4}
                    className="w-full p-3 border-2 border-gray-300 rounded-xl resize-none"
                  />
                  {stepResult !== null && (
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <div className="font-bold text-teal-800 mb-2">Dæmi um útskýringu:</div>
                      <p className="text-teal-700 text-sm">{molecule.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Hint and buttons */}
          {!stepResult && !showHint && (
            <button
              onClick={() => {
                setShowHint(true);
                setTotalHintsUsed(prev => prev + 1);
              }}
              className="text-teal-600 hover:text-teal-800 text-sm underline mb-4"
            >
              Syna visbendingu (-5 stig)
            </button>
          )}

          {showHint && !stepResult && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-4">
              <span className="font-bold text-yellow-800">Vísbending: </span>
              <span className="text-yellow-900">{getHint()}</span>
            </div>
          )}

          {stepResult && (
            <div className={`p-4 rounded-xl mb-4 ${
              stepResult === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className={`font-bold ${stepResult === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                {stepResult === 'correct' ? 'Rétt!' : 'Rangt — Sjáðu rétt svar hér að ofan'}
              </div>
            </div>
          )}

          {!stepResult ? (
            <button
              onClick={checkStep}
              disabled={
                (step.id === 'count' && (!bondingPairsAnswer || !lonePairsAnswer)) ||
                (step.id === 'geometry' && !selectedGeometry) ||
                (step.id === 'angle' && !selectedAngle) ||
                (step.id === 'explanation' && explanation.length < 10)
              }
              className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              Athuga svar
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              {currentStep < STEPS.length - 1
                ? 'Næsta skref'
                : currentMolecule < molecules.length - 1
                  ? 'Næsta sameind'
                  : 'Ljúka stigi 2'}
            </button>
          )}
        </div>

        {/* Reference table */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="font-bold text-gray-700 mb-3">Lögunartafla</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left">Rafeinasvið</th>
                  <th className="p-2 text-left">BP</th>
                  <th className="p-2 text-left">LP</th>
                  <th className="p-2 text-left">Lögun</th>
                  <th className="p-2 text-left">Horn</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t"><td className="p-2">2</td><td>2</td><td>0</td><td>Línuleg</td><td>180°</td></tr>
                <tr className="border-t"><td className="p-2">3</td><td>3</td><td>0</td><td>Þríhyrnd slétt</td><td>120°</td></tr>
                <tr className="border-t"><td className="p-2">3</td><td>2</td><td>1</td><td>Beygð</td><td>&lt;120°</td></tr>
                <tr className="border-t"><td className="p-2">4</td><td>4</td><td>0</td><td>Fjórflötungur</td><td>109.5°</td></tr>
                <tr className="border-t"><td className="p-2">4</td><td>3</td><td>1</td><td>Þríhyrnd pýramída</td><td>107°</td></tr>
                <tr className="border-t"><td className="p-2">4</td><td>2</td><td>2</td><td>Beygð</td><td>104.5°</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
