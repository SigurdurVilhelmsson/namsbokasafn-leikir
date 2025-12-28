import { useState } from 'react';

interface Level2Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface Molecule {
  id: number;
  type: 'alkane' | 'alkene' | 'alkyne';
  carbons: number;
  structure: string;
  formula: string;
  correctName: string;
  doublePosition?: number;
  triplePosition?: number;
  hint: string;
}

const molecules: Molecule[] = [
  // Alkanes
  { id: 1, type: 'alkane', carbons: 2, structure: "C-C", formula: "C₂H₆", correctName: "etan", hint: "2 kolefni + eintengi = eth + an" },
  { id: 2, type: 'alkane', carbons: 4, structure: "C-C-C-C", formula: "C₄H₁₀", correctName: "bútan", hint: "4 kolefni + eintengi = but + an" },
  { id: 3, type: 'alkane', carbons: 6, structure: "C-C-C-C-C-C", formula: "C₆H₁₄", correctName: "hexan", hint: "6 kolefni + eintengi = hex + an" },

  // Alkenes
  { id: 4, type: 'alkene', carbons: 2, structure: "C=C", formula: "C₂H₄", correctName: "eten", doublePosition: 1, hint: "2 kolefni + tvítengi = eth + en" },
  { id: 5, type: 'alkene', carbons: 3, structure: "C=C-C", formula: "C₃H₆", correctName: "propen", doublePosition: 1, hint: "3 kolefni + tvítengi = prop + en" },
  { id: 6, type: 'alkene', carbons: 4, structure: "C=C-C-C", formula: "C₄H₈", correctName: "1-búten", doublePosition: 1, hint: "4+ kolefni þarf staðsetningartölu" },
  { id: 7, type: 'alkene', carbons: 4, structure: "C-C=C-C", formula: "C₄H₈", correctName: "2-búten", doublePosition: 2, hint: "Tvítengi byrjar á kolefni 2" },

  // Alkynes
  { id: 8, type: 'alkyne', carbons: 2, structure: "C≡C", formula: "C₂H₂", correctName: "etyn", triplePosition: 1, hint: "2 kolefni + þrítengi = eth + yn" },
  { id: 9, type: 'alkyne', carbons: 3, structure: "C≡C-C", formula: "C₃H₄", correctName: "propyn", triplePosition: 1, hint: "3 kolefni + þrítengi = prop + yn" },
  { id: 10, type: 'alkyne', carbons: 4, structure: "C≡C-C-C", formula: "C₄H₆", correctName: "1-bútyn", triplePosition: 1, hint: "4+ kolefni þarf staðsetningartölu" },
  { id: 11, type: 'alkyne', carbons: 5, structure: "C-C≡C-C-C", formula: "C₅H₈", correctName: "2-pentyn", triplePosition: 2, hint: "Þrítengi byrjar á kolefni 2" },
  { id: 12, type: 'alkene', carbons: 5, structure: "C=C-C-C-C", formula: "C₅H₁₀", correctName: "1-penten", doublePosition: 1, hint: "5 kolefni, tvítengi á stað 1" }
];

export function Level2({ onComplete, onBack }: Level2Props) {
  const [currentMolecule, setCurrentMolecule] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const molecule = molecules[currentMolecule];

  const normalizeAnswer = (answer: string): string => {
    return answer.toLowerCase().trim()
      .replace(/í/g, 'i')
      .replace(/ú/g, 'u')
      .replace(/ý/g, 'y')
      .replace(/ó/g, 'o')
      .replace(/á/g, 'a')
      .replace(/é/g, 'e');
  };

  const handleSubmit = () => {
    const normalizedUser = normalizeAnswer(userAnswer);
    const normalizedCorrect = normalizeAnswer(molecule.correctName);
    const correct = normalizedUser === normalizedCorrect;

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const points = attempts === 0 ? 10 : attempts === 1 ? 5 : 2;
      setScore(prev => prev + points);
    }
  };

  const handleNext = () => {
    if (currentMolecule < molecules.length - 1) {
      setCurrentMolecule(prev => prev + 1);
      setUserAnswer('');
      setShowFeedback(false);
      setShowHint(false);
      setAttempts(0);
    } else {
      onComplete(score);
    }
  };

  const handleTryAgain = () => {
    setShowFeedback(false);
    setUserAnswer('');
    setAttempts(prev => prev + 1);
    setShowHint(true);
  };

  const renderStructure = () => {
    const elements: JSX.Element[] = [];

    for (let i = 0; i < molecule.carbons; i++) {
      elements.push(
        <div key={`c-${i}`} className="flex flex-col items-center">
          <div className="text-xs text-gray-400 mb-1">{i + 1}</div>
          <div className="w-10 h-10 rounded-full bg-gray-800 text-white font-bold text-sm flex items-center justify-center">
            C
          </div>
        </div>
      );

      if (i < molecule.carbons - 1) {
        const isDouble = molecule.type === 'alkene' && molecule.doublePosition === i + 1;
        const isTriple = molecule.type === 'alkyne' && molecule.triplePosition === i + 1;

        if (isTriple) {
          elements.push(
            <div key={`bond-${i}`} className="flex flex-col justify-center h-10">
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600 mt-0.5"></div>
              <div className="w-6 h-0.5 bg-gray-600 mt-0.5"></div>
            </div>
          );
        } else if (isDouble) {
          elements.push(
            <div key={`bond-${i}`} className="flex flex-col justify-center h-10">
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600 mt-1"></div>
            </div>
          );
        } else {
          elements.push(
            <div key={`bond-${i}`} className="w-6 h-1 bg-gray-600"></div>
          );
        }
      }
    }

    return elements;
  };

  const getTypeColor = () => {
    switch (molecule.type) {
      case 'alkane': return 'from-gray-50 to-slate-100 border-gray-300';
      case 'alkene': return 'from-green-50 to-emerald-100 border-green-300';
      case 'alkyne': return 'from-purple-50 to-violet-100 border-purple-300';
    }
  };

  const getTypeName = () => {
    switch (molecule.type) {
      case 'alkane': return 'Alkan (eintengi)';
      case 'alkene': return 'Alken (tvítengi)';
      case 'alkyne': return 'Alkyn (þrítengi)';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            ← Til baka
          </button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Sameind {currentMolecule + 1} af {molecules.length}
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
              Stig: {score}
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-green-600">
          🏷️ Nefndu sameindina
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Notaðu IUPAC reglurnar til að nefna þessa sameind
        </p>

        <div className={`bg-gradient-to-br ${getTypeColor()} p-6 rounded-xl border-2 mb-6`}>
          <div className="text-center mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-white">
              {getTypeName()}
            </span>
          </div>

          <div className="flex justify-center items-center gap-1 mb-4 overflow-x-auto py-2">
            {renderStructure()}
          </div>

          <div className="text-center">
            <span className="text-2xl font-mono font-bold text-gray-800">
              {molecule.formula}
            </span>
          </div>
        </div>

        {showHint && (
          <div className="bg-yellow-50 p-4 rounded-xl mb-4 border border-yellow-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <span className="text-yellow-800">{molecule.hint}</span>
            </div>
          </div>
        )}

        {!showFeedback ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hvert er nafn þessarar sameindar?
              </label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Sláðu inn nafnið..."
                className="w-full text-center text-xl font-bold p-4 border-2 border-green-300 rounded-xl focus:border-green-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && userAnswer && handleSubmit()}
              />
            </div>

            <div className="flex gap-4">
              {!showHint && (
                <button
                  onClick={() => setShowHint(true)}
                  className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-bold py-3 px-6 rounded-xl"
                >
                  💡 Vísbending
                </button>
              )}
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className={`flex-1 font-bold py-3 px-6 rounded-xl ${
                  !userAnswer.trim()
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                Athuga svar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-6 rounded-xl text-center ${
              isCorrect ? 'bg-green-100 border-2 border-green-400' : 'bg-red-100 border-2 border-red-400'
            }`}>
              <div className="text-4xl mb-2">{isCorrect ? '✓' : '✗'}</div>
              <div className={`text-xl font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Rétt!' : 'Rangt'}
              </div>
              {isCorrect ? (
                <div className="mt-2 text-green-700">
                  <span className="text-2xl font-bold">{molecule.correctName}</span> er rétt!
                </div>
              ) : (
                <div className="mt-2 text-red-700">
                  Rétt svar er: <span className="font-bold">{molecule.correctName}</span>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="font-bold text-gray-700 mb-2">Útskýring:</div>
              <div className="text-sm text-gray-600">
                <span className="text-blue-600 font-bold">
                  {molecule.carbons === 1 ? 'meth' :
                   molecule.carbons === 2 ? 'eth' :
                   molecule.carbons === 3 ? 'prop' :
                   molecule.carbons === 4 ? 'but' :
                   molecule.carbons === 5 ? 'pent' :
                   molecule.carbons === 6 ? 'hex' :
                   molecule.carbons === 7 ? 'hept' :
                   molecule.carbons === 8 ? 'oct' : 'non'}
                </span>
                <span className="text-gray-500"> ({molecule.carbons} kolefni) + </span>
                <span className="text-green-600 font-bold">
                  {molecule.type === 'alkane' ? 'an' : molecule.type === 'alkene' ? 'en' : 'yn'}
                </span>
                <span className="text-gray-500"> ({molecule.type === 'alkane' ? 'eintengi' : molecule.type === 'alkene' ? 'tvítengi' : 'þrítengi'})</span>
                {(molecule.doublePosition || molecule.triplePosition) && molecule.carbons >= 4 && (
                  <span className="text-gray-500">
                    {' '}+ staðsetningartala <span className="text-red-600 font-bold">{molecule.doublePosition || molecule.triplePosition}</span>
                  </span>
                )}
              </div>
            </div>

            {isCorrect ? (
              <button
                onClick={handleNext}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl"
              >
                {currentMolecule < molecules.length - 1 ? 'Næsta sameind →' : 'Ljúka stigi →'}
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={handleTryAgain}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl"
                >
                  Reyna aftur
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl"
                >
                  Halda áfram →
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-2">📋 Nafnareglur:</h3>
          <div className="text-xs space-y-1 text-gray-600">
            <div>• Forskeyti (kolefnisfjöldi) + viðskeyti (tengjategund)</div>
            <div>• Fyrir 4+ kolefni með tvítengi/þrítengi, bættu við staðsetningartölu</div>
            <div>• Númeraðu keðjuna svo tvítengi/þrítengi fái lægstu tölu</div>
          </div>
        </div>

        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentMolecule + 1) / molecules.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
