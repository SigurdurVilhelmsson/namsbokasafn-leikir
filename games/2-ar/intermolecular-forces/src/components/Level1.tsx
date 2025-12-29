import { useState } from 'react';

interface Level1Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface IMFType {
  id: 'london' | 'dipole' | 'hydrogen';
  name: string;
  nameEn: string;
  description: string;
  strength: string;
  examples: string[];
}

const IMF_TYPES: IMFType[] = [
  {
    id: 'london',
    name: 'London dreifikraftar',
    nameEn: 'London Dispersion Forces',
    description: 'Veikir, tímabundnir aðdráttarkraftar vegna tímabundinna tvípóla. Til staðar í ÖLLUM sameindum.',
    strength: 'Veikastur',
    examples: ['CH₄', 'Ar', 'CO₂', 'CCl₄', 'I₂']
  },
  {
    id: 'dipole',
    name: 'Tvípól-tvípól kraftar',
    nameEn: 'Dipole-Dipole Forces',
    description: 'Aðdráttarkraftar milli skauttaðra sameinda þar sem δ+ hluti einnar sameindar laðar að δ- hluta annarar.',
    strength: 'Meðal',
    examples: ['HCl', 'SO₂', 'CHCl₃', 'H₂S']
  },
  {
    id: 'hydrogen',
    name: 'Vetnistengi',
    nameEn: 'Hydrogen Bonding',
    description: 'Sérstakt sterk tvípól-tvípól kraftur þegar H er bundið við F, O, eða N. Sterkasta IMF.',
    strength: 'Sterkastur',
    examples: ['H₂O', 'NH₃', 'HF', 'CH₃OH', 'DNA']
  }
];

interface Molecule {
  id: number;
  formula: string;
  name: string;
  structure?: string;
  isPolar: boolean;
  hasHBond: boolean;
  molarMass: number;
  correctIMFs: ('london' | 'dipole' | 'hydrogen')[];
  explanation: string;
}

const molecules: Molecule[] = [
  {
    id: 1,
    formula: 'H₂O',
    name: 'Vatn',
    isPolar: true,
    hasHBond: true,
    molarMass: 18,
    correctIMFs: ['london', 'dipole', 'hydrogen'],
    explanation: 'Vatn hefur alla þrjá krafta: London (alltaf), tvípól-tvípól (skautuð), og vetnistengi (O-H tengsl).'
  },
  {
    id: 2,
    formula: 'CH₄',
    name: 'Metan',
    isPolar: false,
    hasHBond: false,
    molarMass: 16,
    correctIMFs: ['london'],
    explanation: 'Metan er óskautuð sameind svo hún hefur aðeins London krafta.'
  },
  {
    id: 3,
    formula: 'HCl',
    name: 'Saltsýra',
    isPolar: true,
    hasHBond: false,
    molarMass: 36.5,
    correctIMFs: ['london', 'dipole'],
    explanation: 'HCl er skautuð (Cl er rafneikvæðara) en H er ekki bundið við F, O, eða N — engin vetnistengi.'
  },
  {
    id: 4,
    formula: 'NH₃',
    name: 'Ammóníak',
    isPolar: true,
    hasHBond: true,
    molarMass: 17,
    correctIMFs: ['london', 'dipole', 'hydrogen'],
    explanation: 'Ammóníak hefur N-H tengsl sem geta myndað vetnistengi, auk þess að vera skautuð sameind.'
  },
  {
    id: 5,
    formula: 'CO₂',
    name: 'Koltvísýringur',
    isPolar: false,
    hasHBond: false,
    molarMass: 44,
    correctIMFs: ['london'],
    explanation: 'Þó C=O tengslin séu skautuð, er sameindin línuleg og óskautuð — aðeins London kraftar.'
  },
  {
    id: 6,
    formula: 'CH₃OH',
    name: 'Metanól',
    isPolar: true,
    hasHBond: true,
    molarMass: 32,
    correctIMFs: ['london', 'dipole', 'hydrogen'],
    explanation: 'Metanól hefur O-H hóp sem gerir kleift að mynda vetnistengi.'
  },
  {
    id: 7,
    formula: 'CCl₄',
    name: 'Kolefnistetraklóríð',
    isPolar: false,
    hasHBond: false,
    molarMass: 154,
    correctIMFs: ['london'],
    explanation: 'CCl₄ er samhverf fjórflötungur — óskautuð þrátt fyrir skautuð C-Cl tengisl.'
  },
  {
    id: 8,
    formula: 'CHCl₃',
    name: 'Klóróform',
    isPolar: true,
    hasHBond: false,
    molarMass: 119,
    correctIMFs: ['london', 'dipole'],
    explanation: 'Klóróform er ósamhverf og skautuð, en H er bundið við C — engin vetnistengi.'
  },
  {
    id: 9,
    formula: 'HF',
    name: 'Flúorsýra',
    isPolar: true,
    hasHBond: true,
    molarMass: 20,
    correctIMFs: ['london', 'dipole', 'hydrogen'],
    explanation: 'HF hefur H-F tengi sem myndar mjög sterk vetnistengi.'
  },
  {
    id: 10,
    formula: 'I₂',
    name: 'Joð',
    isPolar: false,
    hasHBond: false,
    molarMass: 254,
    correctIMFs: ['london'],
    explanation: 'I₂ er óskautuð tvíatóma sameind — aðeins London kraftar. En þeir eru sterkir vegna stórrar mólmassa.'
  }
];

// Max possible score: 10 molecules * 15 points = 150 points
const MAX_SCORE = 150;

export function Level1({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level1Props) {
  const [phase, setPhase] = useState<'learn' | 'quiz'>('learn');
  const [currentMolecule, setCurrentMolecule] = useState(0);
  const [selectedIMFs, setSelectedIMFs] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);

  const molecule = molecules[currentMolecule];

  const toggleIMF = (imfId: string) => {
    if (showResult) return;
    const newSet = new Set(selectedIMFs);
    if (newSet.has(imfId)) {
      newSet.delete(imfId);
    } else {
      newSet.add(imfId);
    }
    setSelectedIMFs(newSet);
  };

  const checkAnswer = () => {
    const correctSet = new Set(molecule.correctIMFs);
    const isCorrect =
      selectedIMFs.size === correctSet.size &&
      [...selectedIMFs].every(imf => correctSet.has(imf as any));

    if (isCorrect) {
      if (!showHint) {
        setScore(prev => prev + 15);
      } else {
        setScore(prev => prev + 8);
      }
      onCorrectAnswer?.();
    } else {
      onIncorrectAnswer?.();
    }
    setShowResult(true);
  };

  const nextMolecule = () => {
    if (currentMolecule < molecules.length - 1) {
      setCurrentMolecule(prev => prev + 1);
      setSelectedIMFs(new Set());
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
              ← Til baka
            </button>
            <div className="text-sm text-gray-600">Stig 1: Kynning</div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6">
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">
              Tegundir millisameindakrafta (IMF)
            </h2>

            <div className="space-y-6">
              {IMF_TYPES.map(imf => (
                <div key={imf.id} className={`p-6 rounded-xl border-2 ${
                  imf.id === 'london' ? 'bg-purple-50 border-purple-200' :
                  imf.id === 'dipole' ? 'bg-blue-50 border-blue-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                      imf.id === 'london' ? 'bg-purple-200' :
                      imf.id === 'dipole' ? 'bg-blue-200' :
                      'bg-red-200'
                    }`}>
                      {imf.id === 'london' ? '🌫️' : imf.id === 'dipole' ? '⚡' : '🔗'}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{imf.name}</h3>
                      <div className="text-sm text-gray-500 mb-2">{imf.nameEn}</div>
                      <p className="text-gray-700 mb-3">{imf.description}</p>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          imf.id === 'london' ? 'bg-purple-200 text-purple-800' :
                          imf.id === 'dipole' ? 'bg-blue-200 text-blue-800' :
                          'bg-red-200 text-red-800'
                        }`}>
                          {imf.strength}
                        </span>
                        <span className="text-sm text-gray-500">
                          Dæmi: {imf.examples.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-yellow-50 p-4 rounded-xl border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-2">🔑 Lykilatriði</h4>
              <ul className="space-y-1 text-yellow-900 text-sm">
                <li>• <strong>Öll efni</strong> hafa London krafta — þeir eru alltaf til staðar</li>
                <li>• <strong>Skautaðar sameindir</strong> hafa einnig tvípól-tvípól</li>
                <li>• <strong>H-F, H-O, eða H-N</strong> tengsl gefa vetnistengi</li>
                <li>• Stærra atóm / mólmassi = sterkari London kraftar</li>
              </ul>
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
  const isCorrect = showResult &&
    selectedIMFs.size === molecule.correctIMFs.length &&
    [...selectedIMFs].every(imf => molecule.correctIMFs.includes(imf as any));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setPhase('learn')} className="text-gray-600 hover:text-gray-800">
            ← Skoða kennslu
          </button>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              Sameind {currentMolecule + 1} af {molecules.length}
            </div>
            <div className="text-lg font-bold text-indigo-600">{score} stig</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentMolecule + 1) / molecules.length) * 100}%` }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {/* Molecule display */}
          <div className="bg-gray-900 rounded-xl p-6 mb-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">{molecule.formula}</div>
            <div className="text-gray-400">{molecule.name}</div>
            <div className="flex justify-center gap-4 mt-4">
              <span className={`px-3 py-1 rounded-full text-xs ${
                molecule.isPolar ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'
              }`}>
                {molecule.isPolar ? 'Skautuð' : 'Óskautuð'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-purple-500 text-white">
                M = {molecule.molarMass} g/mol
              </span>
            </div>
          </div>

          <p className="text-gray-700 text-lg mb-6">
            Hvaða millisameindakraftar eru til staðar í {molecule.formula}? (Veldu allt sem á við)
          </p>

          {/* IMF Selection */}
          <div className="space-y-3 mb-6">
            {IMF_TYPES.map(imf => {
              const isSelected = selectedIMFs.has(imf.id);
              const isCorrectChoice = molecule.correctIMFs.includes(imf.id);

              return (
                <button
                  key={imf.id}
                  onClick={() => toggleIMF(imf.id)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    showResult
                      ? isCorrectChoice
                        ? 'border-green-500 bg-green-50'
                        : isSelected
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 opacity-50'
                      : isSelected
                      ? `border-2 ring-2 ${
                          imf.id === 'london' ? 'border-purple-500 ring-purple-200 bg-purple-50' :
                          imf.id === 'dipole' ? 'border-blue-500 ring-blue-200 bg-blue-50' :
                          'border-red-500 ring-red-200 bg-red-50'
                        }`
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                      isSelected ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-gray-400'
                    }`}>
                      {isSelected && '✓'}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold">{imf.name}</div>
                      <div className="text-xs text-gray-500">{imf.nameEn}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      imf.id === 'london' ? 'bg-purple-100 text-purple-700' :
                      imf.id === 'dipole' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {imf.strength}
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
              <span className="text-yellow-900">
                {molecule.isPolar
                  ? 'Þessi sameind er skautuð — hvaða IMF eru til staðar í skautaðrar sameindum?'
                  : 'Þessi sameind er óskautuð — hvaða IMF er alltaf til staðar?'}
                {molecule.hasHBond && ' Athugaðu einnig hvort H-F, H-O, eða H-N séu til staðar.'}
              </span>
            </div>
          )}

          {!showResult ? (
            <button
              onClick={checkAnswer}
              disabled={selectedIMFs.size === 0}
              className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-xl"
            >
              Athuga svar
            </button>
          ) : (
            <>
              <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Rétt!' : 'Ekki alveg rétt'}
                </div>
                <p className="text-sm text-gray-700 mt-2">{molecule.explanation}</p>
              </div>
              <button
                onClick={nextMolecule}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl"
              >
                {currentMolecule < molecules.length - 1 ? 'Næsta sameind' : 'Ljúka stigi 1'}
              </button>
            </>
          )}
        </div>

        {/* Quick reference */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="font-bold text-gray-700 mb-2">Flýtileiðbeiningar</h3>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-purple-50 p-2 rounded">London = ALLTAF</div>
            <div className="bg-blue-50 p-2 rounded">Tvípól = Skautuð</div>
            <div className="bg-red-50 p-2 rounded">H-tengi = H-F/O/N</div>
          </div>
        </div>
      </div>
    </div>
  );
}
