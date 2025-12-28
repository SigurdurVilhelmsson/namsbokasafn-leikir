import { useState } from 'react';

interface Level2Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface Compound {
  id: string;
  formula: string;
  name: string;
  molarMass: number;
  boilingPoint: number;
  imfs: string[];
}

interface RankingProblem {
  id: number;
  question: string;
  property: 'boilingPoint' | 'vaporPressure' | 'viscosity' | 'surfaceTension';
  propertyName: string;
  compounds: Compound[];
  correctOrder: string[]; // IDs in correct order (lowest to highest, or as specified)
  orderDirection: 'lowestFirst' | 'highestFirst';
  explanation: string;
  hint: string;
}

const problems: RankingProblem[] = [
  {
    id: 1,
    question: 'Raðaðu þessum efnum eftir SUÐUMARKI (lægst til hæst):',
    property: 'boilingPoint',
    propertyName: 'Suðumark',
    compounds: [
      { id: 'A', formula: 'CH₄', name: 'Metan', molarMass: 16, boilingPoint: -161, imfs: ['London'] },
      { id: 'B', formula: 'H₂O', name: 'Vatn', molarMass: 18, boilingPoint: 100, imfs: ['London', 'Tvípól', 'H-tengi'] },
      { id: 'C', formula: 'HCl', name: 'Saltsýra', molarMass: 36.5, boilingPoint: -85, imfs: ['London', 'Tvípól'] },
    ],
    correctOrder: ['A', 'C', 'B'],
    orderDirection: 'lowestFirst',
    explanation: 'CH₄ hefur aðeins veika London krafta. HCl hefur tvípól-tvípól líka. H₂O hefur vetnistengi sem eru sterkust → hæsta suðumarkið.',
    hint: 'Hugsaðu um tegundir IMF: London < Tvípól-tvípól < Vetnistengi'
  },
  {
    id: 2,
    question: 'Raðaðu eftir SUÐUMARKI (lægst til hæst):',
    property: 'boilingPoint',
    propertyName: 'Suðumark',
    compounds: [
      { id: 'A', formula: 'CH₃OH', name: 'Metanól', molarMass: 32, boilingPoint: 65, imfs: ['London', 'Tvípól', 'H-tengi'] },
      { id: 'B', formula: 'CH₃CH₃', name: 'Etan', molarMass: 30, boilingPoint: -89, imfs: ['London'] },
      { id: 'C', formula: 'CH₃Cl', name: 'Klórmetan', molarMass: 50.5, boilingPoint: -24, imfs: ['London', 'Tvípól'] },
    ],
    correctOrder: ['B', 'C', 'A'],
    orderDirection: 'lowestFirst',
    explanation: 'Etan er óskautað (aðeins London). Klórmetan er skautað. Metanól hefur vetnistengi og hæsta suðumark þrátt fyrir lægsta mólmassa.',
    hint: 'Vetnistengi (O-H hópur í metanóli) vinna yfir mólmassa.'
  },
  {
    id: 3,
    question: 'Raðaðu eftir GUFUÞRÝSTINGI við 25°C (lægst til hæst):',
    property: 'vaporPressure',
    propertyName: 'Gufuþrýstingur',
    compounds: [
      { id: 'A', formula: 'H₂O', name: 'Vatn', molarMass: 18, boilingPoint: 100, imfs: ['London', 'Tvípól', 'H-tengi'] },
      { id: 'B', formula: 'CH₃OCH₃', name: 'Dímetýleter', molarMass: 46, boilingPoint: -24, imfs: ['London', 'Tvípól'] },
      { id: 'C', formula: 'CH₃CH₂OH', name: 'Etanól', molarMass: 46, boilingPoint: 78, imfs: ['London', 'Tvípól', 'H-tengi'] },
    ],
    correctOrder: ['A', 'C', 'B'],
    orderDirection: 'lowestFirst',
    explanation: 'Gufuþrýstingur er ÖFUGUR við suðumark. Sterkari IMF → lægri gufuþrýstingur. H₂O hefur sterkustu vetnistenginn → lægstan gufuþrýsting.',
    hint: 'Gufuþrýstingur er öfugur við suðumark — sterkari kraftar = lægri gufuþrýstingur.'
  },
  {
    id: 4,
    question: 'Raðaðu eftir SUÐUMARKI (lægst til hæst):',
    property: 'boilingPoint',
    propertyName: 'Suðumark',
    compounds: [
      { id: 'A', formula: 'F₂', name: 'Flúor', molarMass: 38, boilingPoint: -188, imfs: ['London'] },
      { id: 'B', formula: 'Cl₂', name: 'Klór', molarMass: 71, boilingPoint: -34, imfs: ['London'] },
      { id: 'C', formula: 'Br₂', name: 'Bróm', molarMass: 160, boilingPoint: 59, imfs: ['London'] },
      { id: 'D', formula: 'I₂', name: 'Joð', molarMass: 254, boilingPoint: 184, imfs: ['London'] },
    ],
    correctOrder: ['A', 'B', 'C', 'D'],
    orderDirection: 'lowestFirst',
    explanation: 'Öll þessi efni hafa aðeins London krafta. Stærri atóm → meiri London kraftar → hærra suðumark. I₂ er stærst.',
    hint: 'Öll eru óskautuð tvíatóma sameindir — aðeins London kraftar. Hvað eykur London krafta?'
  },
  {
    id: 5,
    question: 'Raðaðu eftir SEIGJU (lægst til hæst):',
    property: 'viscosity',
    propertyName: 'Seigja',
    compounds: [
      { id: 'A', formula: 'H₂O', name: 'Vatn', molarMass: 18, boilingPoint: 100, imfs: ['London', 'Tvípól', 'H-tengi'] },
      { id: 'B', formula: 'CH₃CH₂OH', name: 'Etanól', molarMass: 46, boilingPoint: 78, imfs: ['London', 'Tvípól', 'H-tengi'] },
      { id: 'C', formula: 'Glyceról', name: 'Glýseról (C₃H₈O₃)', molarMass: 92, boilingPoint: 290, imfs: ['London', 'Tvípól', 'H-tengi×3'] },
    ],
    correctOrder: ['A', 'B', 'C'],
    orderDirection: 'lowestFirst',
    explanation: 'Seigja eykst með fleiri vetnistengjum. Glýseról hefur 3 O-H hópa og getur myndað margar vetnistengsl → mjög seigt.',
    hint: 'Glýseról hefur ÞRJÁ O-H hópa. Hvað gerir það við fjölda vetnistengsla?'
  },
  {
    id: 6,
    question: 'Raðaðu eftir SUÐUMARKI (lægst til hæst):',
    property: 'boilingPoint',
    propertyName: 'Suðumark',
    compounds: [
      { id: 'A', formula: 'CH₃CH₂CH₂CH₃', name: 'n-Bútan', molarMass: 58, boilingPoint: 0, imfs: ['London'] },
      { id: 'B', formula: '(CH₃)₃CH', name: 'Ísobútan', molarMass: 58, boilingPoint: -12, imfs: ['London'] },
    ],
    correctOrder: ['B', 'A'],
    orderDirection: 'lowestFirst',
    explanation: 'Sama mólmassi! En n-bútan er lengri keðja → meira yfirborðsflatarmál → sterkari London kraftar. Ísobútan er þéttara → minna yfirborð.',
    hint: 'Sama mólmassi en mismunandi lögun. Hvað ákvarðar styrk London krafta fyrir utan mólmassa?'
  },
  {
    id: 7,
    question: 'Raðaðu eftir SUÐUMARKI (lægst til hæst):',
    property: 'boilingPoint',
    propertyName: 'Suðumark',
    compounds: [
      { id: 'A', formula: 'NH₃', name: 'Ammóníak', molarMass: 17, boilingPoint: -33, imfs: ['London', 'Tvípól', 'H-tengi'] },
      { id: 'B', formula: 'PH₃', name: 'Fosfín', molarMass: 34, boilingPoint: -88, imfs: ['London', 'Tvípól'] },
      { id: 'C', formula: 'AsH₃', name: 'Arsín', molarMass: 78, boilingPoint: -62, imfs: ['London', 'Tvípól'] },
    ],
    correctOrder: ['B', 'C', 'A'],
    orderDirection: 'lowestFirst',
    explanation: 'PH₃ og AsH₃ hafa ekki vetnistengi (P og As eru ekki nógu rafneikvæð). NH₃ hefur vetnistengi → hæsta suðumarkið þrátt fyrir lægstan mólmassa.',
    hint: 'Vetnistengi myndast aðeins þegar H er bundið við F, O, eða N — ekki P eða As.'
  },
  {
    id: 8,
    question: 'Raðaðu eftir YFIRBORÐSSPENNU (lægst til hæst):',
    property: 'surfaceTension',
    propertyName: 'Yfirborðsspenna',
    compounds: [
      { id: 'A', formula: 'C₆H₁₄', name: 'Hexan', molarMass: 86, boilingPoint: 69, imfs: ['London'] },
      { id: 'B', formula: 'CH₃OH', name: 'Metanól', molarMass: 32, boilingPoint: 65, imfs: ['London', 'Tvípól', 'H-tengi'] },
      { id: 'C', formula: 'H₂O', name: 'Vatn', molarMass: 18, boilingPoint: 100, imfs: ['London', 'Tvípól', 'H-tengi'] },
    ],
    correctOrder: ['A', 'B', 'C'],
    orderDirection: 'lowestFirst',
    explanation: 'Yfirborðsspenna eykst með sterkari IMF. Hexan (aðeins London) < Metanól (vetnistengi) < Vatn (sterkari vetnistengi vegna 2 O-H).',
    hint: 'Yfirborðsspenna tengist styrk IMF — sterkari kraftar = meiri spenna.'
  }
];

export function Level2({ onComplete, onBack }: Level2Props) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);

  const problem = problems[currentProblem];
  const unplacedCompounds = problem.compounds.filter(c => !userOrder.includes(c.id));

  const addToOrder = (id: string) => {
    if (showResult) return;
    setUserOrder([...userOrder, id]);
  };

  const removeFromOrder = (id: string) => {
    if (showResult) return;
    setUserOrder(userOrder.filter(i => i !== id));
  };

  const checkAnswer = () => {
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(problem.correctOrder);
    if (isCorrect && !showHint) {
      setScore(prev => prev + 15);
    } else if (isCorrect && showHint) {
      setScore(prev => prev + 8);
    }
    setShowResult(true);
  };

  const nextProblem = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(prev => prev + 1);
      setUserOrder([]);
      setShowResult(false);
      setShowHint(false);
    } else {
      onComplete(score);
    }
  };

  const isCorrect = showResult && JSON.stringify(userOrder) === JSON.stringify(problem.correctOrder);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
            ← Til baka
          </button>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              Verkefni {currentProblem + 1} af {problems.length}
            </div>
            <div className="text-lg font-bold text-indigo-600">{score} stig</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentProblem + 1) / problems.length) * 100}%` }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {problem.propertyName}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-6">{problem.question}</h2>

          {/* Available compounds */}
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Tiltæk efni:</div>
            <div className="flex flex-wrap gap-2">
              {unplacedCompounds.map(compound => (
                <button
                  key={compound.id}
                  onClick={() => addToOrder(compound.id)}
                  disabled={showResult}
                  className="bg-white border-2 border-gray-300 hover:border-indigo-400 px-4 py-3 rounded-xl transition-all"
                >
                  <div className="font-bold text-gray-800">{compound.formula}</div>
                  <div className="text-xs text-gray-500">{compound.name}</div>
                  <div className="text-xs text-gray-400">M = {compound.molarMass}</div>
                </button>
              ))}
              {unplacedCompounds.length === 0 && !showResult && (
                <div className="text-gray-400 italic">Öll efni hafa verið raðað</div>
              )}
            </div>
          </div>

          {/* Ranking slots */}
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-600 mb-2">
              Röðunin þín ({problem.orderDirection === 'lowestFirst' ? 'lægst → hæst' : 'hæst → lægst'}):
            </div>
            <div className="flex gap-2 items-center">
              {problem.compounds.map((_, idx) => {
                const placedId = userOrder[idx];
                const placedCompound = placedId ? problem.compounds.find(c => c.id === placedId) : null;
                const correctId = problem.correctOrder[idx];

                return (
                  <div key={idx} className="flex items-center gap-2">
                    {idx > 0 && <span className="text-gray-400">→</span>}
                    <div
                      className={`min-w-24 p-3 rounded-xl border-2 text-center ${
                        showResult
                          ? placedId === correctId
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : placedCompound
                          ? 'border-indigo-500 bg-indigo-50 cursor-pointer'
                          : 'border-dashed border-gray-300'
                      }`}
                      onClick={() => placedId && removeFromOrder(placedId)}
                    >
                      {placedCompound ? (
                        <>
                          <div className="font-bold">{placedCompound.formula}</div>
                          <div className="text-xs text-gray-500">{placedCompound.name}</div>
                        </>
                      ) : (
                        <div className="text-gray-400 text-sm">{idx + 1}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {!showResult && userOrder.length > 0 && (
              <div className="text-xs text-gray-500 mt-2">Smelltu á efni til að fjarlægja úr röð</div>
            )}
          </div>

          {/* Compound info table */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Efni</th>
                  <th className="p-2 text-left">Mólmassi</th>
                  <th className="p-2 text-left">IMF</th>
                </tr>
              </thead>
              <tbody>
                {problem.compounds.map(compound => (
                  <tr key={compound.id} className="border-t">
                    <td className="p-2 font-bold">{compound.formula}</td>
                    <td className="p-2">{compound.molarMass} g/mol</td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1">
                        {compound.imfs.map(imf => (
                          <span key={imf} className={`px-1 py-0.5 rounded text-xs ${
                            imf === 'London' ? 'bg-purple-100 text-purple-700' :
                            imf === 'Tvípól' ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {imf}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Hint */}
          {!showResult && !showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="text-indigo-600 hover:text-indigo-800 text-sm underline mb-4"
            >
              Sýna vísbendingu (-7 stig)
            </button>
          )}

          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-4">
              <span className="font-bold text-yellow-800">Vísbending: </span>
              <span className="text-yellow-900">{problem.hint}</span>
            </div>
          )}

          {!showResult ? (
            <button
              onClick={checkAnswer}
              disabled={userOrder.length !== problem.compounds.length}
              className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-xl"
            >
              Athuga röðun
            </button>
          ) : (
            <>
              <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? 'Rétt röðun!' : 'Ekki rétt röðun'}
                </div>
                {!isCorrect && (
                  <div className="text-sm text-gray-600 mt-2">
                    Rétt: {problem.correctOrder.map(id => problem.compounds.find(c => c.id === id)?.formula).join(' → ')}
                  </div>
                )}
                <p className="text-sm text-gray-700 mt-2">{problem.explanation}</p>
              </div>
              <button
                onClick={nextProblem}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl"
              >
                {currentProblem < problems.length - 1 ? 'Næsta verkefni' : 'Ljúka stigi 2'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
