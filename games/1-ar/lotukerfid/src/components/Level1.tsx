import { useState, useCallback, useMemo } from 'react';
import {
  ELEMENTS,
  GROUP_COLORS,
  GROUP_NAMES_IS,
  CATEGORY_NAMES_IS,
  shuffleArray,
  type Element,
} from '../data/elements';

interface Level1Props {
  onComplete: (score: number, maxScore: number) => void;
  onBack: () => void;
}

type Phase = 'learn' | 'quiz';

type ClueType = 'atomic-number' | 'symbol' | 'name';

interface LookupChallenge {
  element: Element;
  clueType: ClueType;
  clueText: string;
}

/**
 * Generate 15 lookup challenges from different elements with varied clue types
 */
function generateChallenges(): LookupChallenge[] {
  const clueTypes: ClueType[] = ['atomic-number', 'symbol', 'name'];
  const shuffled = shuffleArray(ELEMENTS).slice(0, 15);

  return shuffled.map((element, i) => {
    const clueType = clueTypes[i % 3];
    let clueText = '';

    switch (clueType) {
      case 'atomic-number':
        clueText = `Saetistala: ${element.atomicNumber}`;
        break;
      case 'symbol':
        clueText = `Efnatakn: ${element.symbol}`;
        break;
      case 'name':
        clueText = `Nafn: ${element.nameIs}`;
        break;
    }

    return { element, clueType, clueText };
  });
}

/**
 * Mini Periodic Table Component
 * Renders first 4 periods with correct column positions
 */
function MiniPeriodicTable({
  onElementClick,
  highlightedElement,
  correctElement,
  wrongElement,
  disabled,
}: {
  onElementClick: (element: Element) => void;
  highlightedElement?: number | null;
  correctElement?: number | null;
  wrongElement?: number | null;
  disabled: boolean;
}) {
  // Build a grid: 4 rows x 18 columns
  const grid: (Element | null)[][] = Array.from({ length: 4 }, () =>
    Array.from({ length: 18 }, () => null)
  );

  ELEMENTS.forEach(el => {
    grid[el.period - 1][el.column - 1] = el;
  });

  return (
    <div className="overflow-x-auto">
      <div
        className="inline-grid gap-0.5"
        style={{
          gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
          minWidth: '640px',
        }}
      >
        {grid.flatMap((row, rowIdx) =>
          row.map((el, colIdx) => {
            if (!el) {
              return (
                <div
                  key={`empty-${rowIdx}-${colIdx}`}
                  className="w-full aspect-square"
                />
              );
            }

            const isCorrect = correctElement === el.atomicNumber;
            const isWrong = wrongElement === el.atomicNumber;
            const isHighlighted = highlightedElement === el.atomicNumber;
            const groupColor = GROUP_COLORS[el.group];

            return (
              <button
                key={el.symbol}
                onClick={() => onElementClick(el)}
                disabled={disabled}
                className={`
                  w-full aspect-square rounded-sm text-center flex flex-col items-center justify-center
                  transition-all border
                  ${isCorrect
                    ? 'bg-green-400 border-green-600 ring-2 ring-green-500 scale-110 z-10'
                    : isWrong
                      ? 'bg-red-400 border-red-600 ring-2 ring-red-500'
                      : isHighlighted
                        ? 'ring-2 ring-yellow-400 scale-105 z-10 border-yellow-500'
                        : `${groupColor.bg} border-gray-300 hover:border-emerald-500 hover:shadow-md`
                  }
                  ${disabled && !isCorrect && !isWrong ? 'opacity-60 cursor-default' : 'cursor-pointer'}
                `}
                title={`${el.nameIs} (${el.symbol})`}
              >
                <span className="text-[8px] leading-none text-gray-500">{el.atomicNumber}</span>
                <span className={`text-xs font-bold leading-none ${groupColor.text}`}>
                  {el.symbol}
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export function Level1({ onComplete, onBack }: Level1Props) {
  const [phase, setPhase] = useState<Phase>('learn');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongElement, setWrongElement] = useState<number | null>(null);

  const challenges = useMemo(() => generateChallenges(), []);
  const currentChallenge = challenges[quizIndex];
  const isLastQuestion = quizIndex >= challenges.length - 1;
  const maxScore = challenges.length * 100;

  const handleElementClick = useCallback((element: Element) => {
    if (showResult) return;

    const correct = element.atomicNumber === currentChallenge.element.atomicNumber;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prev => prev + 100);
      setWrongElement(null);
    } else {
      setWrongElement(element.atomicNumber);
    }
  }, [showResult, currentChallenge]);

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score, maxScore);
    } else {
      setQuizIndex(prev => prev + 1);
      setShowResult(false);
      setIsCorrect(false);
      setWrongElement(null);
    }
  };

  // Learning Phase: interactive periodic table exploration
  if (phase === 'learn') {
    const groupKeys = ['alkali', 'alkaline-earth', 'transition', 'halogen', 'noble-gas', 'other-nonmetal', 'metalloid', 'other-metal'] as const;

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center">
              <button
                onClick={onBack}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <span>&larr;</span> Til baka
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-emerald-700">
                Stig 1: Kynntu ther lotukerfid
              </h1>
              <div></div>
            </div>
          </div>

          {/* Interactive Periodic Table */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">
              Lotukerfid / The Periodic Table
            </h2>

            {/* The periodic table */}
            <MiniPeriodicTable
              onElementClick={(el) => setSelectedGroup(el.group)}
              highlightedElement={null}
              correctElement={null}
              wrongElement={null}
              disabled={false}
            />

            {/* Color legend */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {groupKeys.map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGroup(selectedGroup === g ? null : g)}
                  className={`text-xs px-2 py-1 rounded-lg transition-all ${
                    selectedGroup === g
                      ? `${GROUP_COLORS[g].bg} ${GROUP_COLORS[g].text} ring-2 ring-offset-1`
                      : `${GROUP_COLORS[g].bg} ${GROUP_COLORS[g].text} opacity-70 hover:opacity-100`
                  }`}
                  style={{ borderColor: GROUP_COLORS[g].hex }}
                >
                  {GROUP_NAMES_IS[g]}
                </button>
              ))}
            </div>

            {/* Selected group info */}
            {selectedGroup && (
              <div className="mt-4 p-4 rounded-xl bg-gray-50">
                <h3 className="font-bold text-lg mb-2" style={{ color: GROUP_COLORS[selectedGroup as keyof typeof GROUP_COLORS]?.hex }}>
                  {GROUP_NAMES_IS[selectedGroup as keyof typeof GROUP_NAMES_IS]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ELEMENTS.filter(el => el.group === selectedGroup).map(el => (
                    <div
                      key={el.symbol}
                      className={`px-3 py-2 rounded-lg ${GROUP_COLORS[el.group].bg} ${GROUP_COLORS[el.group].text}`}
                    >
                      <div className="font-bold">{el.symbol}</div>
                      <div className="text-xs">{el.nameIs}</div>
                      <div className="text-xs opacity-70">#{el.atomicNumber}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!selectedGroup && (
              <p className="text-center text-gray-500 mt-4 text-sm">
                Smelltu a hop til ad sja frumefnin i honum
              </p>
            )}
          </div>

          {/* Key concepts */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
            <h3 className="font-bold text-gray-700 mb-3">Lykilhugtok:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-blue-50 p-3 rounded-xl">
                <div className="font-bold text-blue-700">Saetistala</div>
                <p className="text-gray-600">Fjoldi roteindir i kjarna. Akvardar hvar frumefnid er.</p>
              </div>
              <div className="bg-green-50 p-3 rounded-xl">
                <div className="font-bold text-green-700">Efnatakn</div>
                <p className="text-gray-600">Einn eda tveir stafir sem standa fyrir frumefnid (t.d. Fe = Jarn).</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-xl">
                <div className="font-bold text-purple-700">Lotur og hopar</div>
                <p className="text-gray-600">Radirnar (lotur) og dalkirnar (hopar) skipa frumefnunum eftir eiginleikum.</p>
              </div>
            </div>
          </div>

          {/* Misconception busters */}
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
            <h3 className="font-bold text-gray-700 mb-3">Vissir thu?</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-yellow-50 p-3 rounded-xl border-l-4 border-yellow-400">
                <span className="font-bold text-yellow-700">Ranghugmynd:</span> &quot;Lotukerfid er bara til ad fletta upp atommassa.&quot;
                <br />
                <span className="text-gray-600">Lotukerfid spair fyrir um eiginleika frumefna - ekki bara massa!</span>
              </div>
              <div className="bg-yellow-50 p-3 rounded-xl border-l-4 border-yellow-400">
                <span className="font-bold text-yellow-700">Ranghugmynd:</span> &quot;Edalgos gera ekkert.&quot;
                <br />
                <span className="text-gray-600">Edalgos syna mynstur rafeindauppbyggingar og hafa mikilvaeg not!</span>
              </div>
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setPhase('quiz')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              Hefja spurningakeppni &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Phase: Element lookup challenges
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setPhase('learn')}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <span>&larr;</span> Til baka
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-emerald-700">Frumefnaleit</h1>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-emerald-600">{score} stig</div>
              <div className="text-xs text-gray-500">{quizIndex + 1} / {challenges.length}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(quizIndex / challenges.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Clue Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-4">
            <p className="text-gray-600 mb-2">Finndu frumefnid:</p>
            <div className="inline-block bg-emerald-100 px-6 py-3 rounded-xl">
              <p className="text-2xl font-bold text-emerald-800">
                {currentChallenge.clueText}
              </p>
              {currentChallenge.clueType !== 'name' && (
                <p className="text-sm text-gray-500 mt-1">
                  Smelltu a retta frumefnid i lotukerfinu
                </p>
              )}
            </div>
          </div>

          {/* Interactive periodic table for quiz */}
          <MiniPeriodicTable
            onElementClick={handleElementClick}
            highlightedElement={null}
            correctElement={showResult ? currentChallenge.element.atomicNumber : null}
            wrongElement={showResult ? wrongElement : null}
            disabled={showResult}
          />
        </div>

        {/* Result & Next */}
        {showResult && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? 'Rett! +100 stig' : 'Rangt'}
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center ${GROUP_COLORS[currentChallenge.element.group].bg}`}>
                  <span className="text-xs text-gray-500">{currentChallenge.element.atomicNumber}</span>
                  <span className={`font-bold ${GROUP_COLORS[currentChallenge.element.group].text}`}>
                    {currentChallenge.element.symbol}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">{currentChallenge.element.nameIs}</div>
                  <div className="text-sm text-gray-500">{currentChallenge.element.nameEn}</div>
                  <div className="text-xs text-gray-400">
                    {CATEGORY_NAMES_IS[currentChallenge.element.category]} &middot; {GROUP_NAMES_IS[currentChallenge.element.group]}
                  </div>
                </div>
              </div>
              {currentChallenge.element.funFact && (
                <p className="text-sm text-gray-600 mt-2 italic">
                  {currentChallenge.element.funFact}
                </p>
              )}
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-colors"
            >
              {isLastQuestion ? 'Ljuka stigi' : 'Naesta spurning'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
