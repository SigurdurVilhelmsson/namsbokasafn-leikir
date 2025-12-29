import { useState } from 'react';

interface Level1Props {
  onComplete: (score: number, maxScore: number, hintsUsed: number) => void;
  onBack: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

interface Challenge {
  id: number;
  title: string;
  type: 'count_valence' | 'total_electrons' | 'octet_rule' | 'electron_need';
  question: string;
  molecule?: string;
  elements?: { symbol: string; count: number; valence: number }[];
  charge?: number;
  correctAnswer: number | string;
  options?: { id: string; text: string; correct: boolean; explanation: string }[];
  hint: string;
  explanation: string;
}

// Valence electron data
const VALENCE_ELECTRONS: Record<string, number> = {
  'H': 1, 'Li': 1, 'Na': 1, 'K': 1,
  'Be': 2, 'Mg': 2, 'Ca': 2,
  'B': 3, 'Al': 3,
  'C': 4, 'Si': 4,
  'N': 5, 'P': 5,
  'O': 6, 'S': 6,
  'F': 7, 'Cl': 7, 'Br': 7, 'I': 7,
  'He': 2, 'Ne': 8, 'Ar': 8,
};

const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Gildisrafeindir í hópi',
    type: 'count_valence',
    question: 'Hversu margar gildisrafeindir hefur kolefni (C)?',
    correctAnswer: 4,
    hint: 'Kolefni er í hópi 14 (IV A)',
    explanation: 'C er í hópi 14, sem þýðir 4 gildisrafeindir. Hópnúmerið (1-8 fyrir aðalflokka) segir beint til um gildisrafeindafjöldann.'
  },
  {
    id: 2,
    title: 'Súrefni og halógenar',
    type: 'count_valence',
    question: 'Hversu margar gildisrafeindir hefur klór (Cl)?',
    correctAnswer: 7,
    hint: 'Klór er halógen í hópi 17',
    explanation: 'Cl er í hópi 17 (VII A), sem þýðir 7 gildisrafeindir. Halógenar þurfa 1 rafeind til að ná áttureglunni.'
  },
  {
    id: 3,
    title: 'Heildarfjöldi í sameind',
    type: 'total_electrons',
    question: 'Hversu margar gildisrafeindir eru alls í H₂O?',
    molecule: 'H₂O',
    elements: [
      { symbol: 'H', count: 2, valence: 1 },
      { symbol: 'O', count: 1, valence: 6 },
    ],
    correctAnswer: 8,
    hint: 'Leggðu saman: 2×H + 1×O',
    explanation: 'H₂O: 2(1) + 1(6) = 2 + 6 = 8 gildisrafeindir. Þetta er lykilskref áður en þú teiknar Lewis-formúlu.'
  },
  {
    id: 4,
    title: 'Ammóníak',
    type: 'total_electrons',
    question: 'Hversu margar gildisrafeindir eru alls í NH₃?',
    molecule: 'NH₃',
    elements: [
      { symbol: 'N', count: 1, valence: 5 },
      { symbol: 'H', count: 3, valence: 1 },
    ],
    correctAnswer: 8,
    hint: '1×N + 3×H',
    explanation: 'NH₃: 1(5) + 3(1) = 5 + 3 = 8 gildisrafeindir. Nitur hefur 5 og hvert vetni 1.'
  },
  {
    id: 5,
    title: 'Koltvísýringur',
    type: 'total_electrons',
    question: 'Hversu margar gildisrafeindir eru alls í CO₂?',
    molecule: 'CO₂',
    elements: [
      { symbol: 'C', count: 1, valence: 4 },
      { symbol: 'O', count: 2, valence: 6 },
    ],
    correctAnswer: 16,
    hint: '1×C + 2×O',
    explanation: 'CO₂: 1(4) + 2(6) = 4 + 12 = 16 gildisrafeindir. Þetta eru 8 rafeindarapör til að skipta á milli atóma.'
  },
  {
    id: 6,
    title: 'Jónir og hleðsla',
    type: 'total_electrons',
    question: 'Hversu margar gildisrafeindir eru alls í OH⁻?',
    molecule: 'OH⁻',
    elements: [
      { symbol: 'O', count: 1, valence: 6 },
      { symbol: 'H', count: 1, valence: 1 },
    ],
    charge: -1,
    correctAnswer: 8,
    hint: 'Neikvæð hleðsla bætir við rafeindum',
    explanation: 'OH⁻: 6 + 1 + 1 (vegna -1 hleðslu) = 8 gildisrafeindir. Neikvæð hleðsla = fleiri rafeindir.'
  },
  {
    id: 7,
    title: 'Áttureglann',
    type: 'octet_rule',
    question: 'Hversu margar rafeindir vill súrefni hafa í ystu skel sinni?',
    correctAnswer: 8,
    options: [
      { id: 'a', text: '2 rafeindir', correct: false, explanation: 'Þetta á við um vetni (H) og helíum (He).' },
      { id: 'b', text: '6 rafeindir', correct: false, explanation: 'Súrefni HEFUR 6 gildisrafeindir, en það VILL hafa 8.' },
      { id: 'c', text: '8 rafeindir', correct: true, explanation: 'Rétt! Áttureglan segir að atóm vilja hafa 8 rafeindir í ystu skel.' },
      { id: 'd', text: '18 rafeindir', correct: false, explanation: '18 er fyrir d-undirskeljar, ekki s og p.' },
    ],
    hint: 'Þetta er "áttureglan" (octet rule)',
    explanation: 'Áttureglan: Atóm vilja hafa 8 rafeindir í ystu skel til að vera stöðug (eins og eðalgastegundir).'
  },
  {
    id: 8,
    title: 'Rafeindir sem vantar',
    type: 'electron_need',
    question: 'Ef klór hefur 7 gildisrafeindir, hversu margar rafeindir vantar til að uppfylla átturegluna?',
    correctAnswer: 1,
    hint: '8 - 7 = ?',
    explanation: 'Klór þarf 8 - 7 = 1 rafeind til að uppfylla átturegluna. Þess vegna myndar Cl gjarnan eitt efnatengi.'
  },
];

// Calculate max score: 8 challenges * 15 points each = 120
const MAX_SCORE = 120;

export function Level1({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: Level1Props) {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);

  const challenge = challenges[currentChallenge];

  const checkAnswer = () => {
    let correct = false;

    if (challenge.options) {
      const selected = challenge.options.find(opt => opt.id === selectedOption);
      correct = selected?.correct ?? false;
    } else {
      const numAnswer = parseInt(userAnswer);
      correct = numAnswer === challenge.correctAnswer;
    }

    setIsCorrect(correct);
    if (correct) {
      onCorrectAnswer?.();
      if (!showHint) {
        setScore(prev => prev + 15);
      } else {
        setScore(prev => prev + 8);
      }
    } else {
      onIncorrectAnswer?.();
    }
    setShowResult(true);
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
      setUserAnswer('');
      setSelectedOption(null);
      setShowResult(false);
      setShowHint(false);
      setIsCorrect(false);
    } else {
      onComplete(score, MAX_SCORE, totalHintsUsed);
    }
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
            <div className="text-sm text-gray-600">Stig 1 / Þraut {currentChallenge + 1} af {challenges.length}</div>
            <div className="text-lg font-bold text-blue-600">{score} stig</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%` }}
          />
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            {challenge.title}
          </h2>

          {/* Molecule display if applicable */}
          {challenge.molecule && (
            <div className="bg-indigo-50 p-4 rounded-xl mb-4">
              <div className="text-center font-mono text-3xl font-bold text-indigo-800">
                {challenge.molecule}
              </div>
              {challenge.elements && (
                <div className="flex justify-center gap-4 mt-3">
                  {challenge.elements.map((el, idx) => (
                    <div key={idx} className="text-center">
                      <div className="font-bold text-indigo-600">{el.symbol}</div>
                      <div className="text-sm text-gray-600">
                        {el.count} × {el.valence} = {el.count * el.valence}
                      </div>
                    </div>
                  ))}
                  {challenge.charge && (
                    <div className="text-center">
                      <div className="font-bold text-red-600">Hleðsla</div>
                      <div className="text-sm text-gray-600">
                        {challenge.charge > 0 ? `-${challenge.charge}` : `+${Math.abs(challenge.charge)}`}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <p className="text-gray-700 text-lg mb-6">{challenge.question}</p>

          {/* Multiple choice options */}
          {challenge.options ? (
            <div className="space-y-3 mb-6">
              {challenge.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => !showResult && setSelectedOption(option.id)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    showResult
                      ? option.correct
                        ? 'border-green-500 bg-green-50'
                        : selectedOption === option.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-gray-50 opacity-50'
                      : selectedOption === option.id
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-gray-500 uppercase">{option.id}.</span>
                    <span className="flex-1">{option.text}</span>
                  </div>
                  {showResult && selectedOption === option.id && (
                    <div className={`mt-2 text-sm ${option.correct ? 'text-green-700' : 'text-red-700'}`}>
                      {option.explanation}
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            /* Number input */
            <div className="mb-6">
              <div className="flex gap-4 items-center">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={showResult}
                  className="flex-1 p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-2xl font-mono text-center"
                  placeholder="?"
                />
                <span className="text-gray-600 font-medium">rafeindir</span>
              </div>
            </div>
          )}

          {/* Hint button */}
          {!showResult && !showHint && (
            <button
              onClick={() => {
                setShowHint(true);
                setTotalHintsUsed(prev => prev + 1);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm underline mb-4"
            >
              Sýna vísbendingu (-7 stig)
            </button>
          )}

          {showHint && !showResult && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-4">
              <span className="font-bold text-yellow-800">Vísbending: </span>
              <span className="text-yellow-900">{challenge.hint}</span>
            </div>
          )}

          {/* Check answer button */}
          {!showResult && (
            <button
              onClick={checkAnswer}
              disabled={challenge.options ? !selectedOption : !userAnswer}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              Athuga svar
            </button>
          )}

          {/* Result feedback */}
          {showResult && (
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? 'Rétt!' : 'Rangt'}
              </div>
              {!isCorrect && (
                <div className="text-gray-700 mb-2">
                  Rétt svar: <strong>{challenge.correctAnswer}</strong>
                </div>
              )}
              <div className="text-sm text-gray-600">
                {challenge.explanation}
              </div>
            </div>
          )}

          {/* Next button */}
          {showResult && (
            <button
              onClick={nextChallenge}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              {currentChallenge < challenges.length - 1 ? 'Næsta þraut' : 'Ljúka stigi 1'}
            </button>
          )}
        </div>

        {/* Valence electron reference */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow">
          <h3 className="font-bold text-gray-700 mb-3">Gildisrafeindatafla</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-sm">
            {Object.entries(VALENCE_ELECTRONS).slice(0, 16).map(([symbol, valence]) => (
              <div key={symbol} className="bg-gray-50 p-2 rounded text-center border">
                <div className="font-bold text-gray-800">{symbol}</div>
                <div className="text-blue-600">{valence}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
