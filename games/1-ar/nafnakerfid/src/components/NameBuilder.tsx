import { useState, useCallback, useMemo, DragEvent } from 'react';
import { Compound, COMPOUNDS } from '../data/compounds';
import { AudioButton } from './AudioButton';

/**
 * Name Builder Component
 * Students construct chemical names from prefixes, element roots, and suffixes
 */

// Prefixes for molecular compounds (Greek)
const PREFIXES: { [key: number]: string } = {
  1: 'mónó',
  2: 'dí',
  3: 'trí',
  4: 'tetra',
  5: 'penta',
  6: 'hexa',
  7: 'hepta',
  8: 'okta',
  9: 'nóna',
  10: 'deka'
};

// Common polyatomic ions
const POLYATOMIC_IONS: { [key: string]: string } = {
  'SO₄': 'súlfat',
  'NO₃': 'nítrat',
  'CO₃': 'karbónat',
  'PO₄': 'fosfat',
  'OH': 'hýdroxíð',
  'NH₄': 'ammóníum',
  'Cr₂O₇': 'díkrómat',
  'HCO₃': 'vetniskarbónat',
};

// Element names in Icelandic (roots for building names)
const ELEMENT_ROOTS: { [key: string]: { root: string; suffix: string; full: string } } = {
  'H': { root: 'vetni', suffix: 'vetni', full: 'Vetni' },
  'C': { root: 'kol', suffix: 'kol', full: 'Kolefni' },
  'N': { root: 'nitur', suffix: 'nitur', full: 'Köfnunarefni' },
  'O': { root: 'súr', suffix: 'oxíð', full: 'Súrefni' },
  'F': { root: 'flúor', suffix: 'flúoríð', full: 'Flúor' },
  'Cl': { root: 'klór', suffix: 'klóríð', full: 'Klór' },
  'Br': { root: 'bróm', suffix: 'brómíð', full: 'Bróm' },
  'I': { root: 'joð', suffix: 'joðíð', full: 'Joð' },
  'S': { root: 'brennisteins', suffix: 'súlfíð', full: 'Brennisteinn' },
  'P': { root: 'fosfor', suffix: 'fosfíð', full: 'Fosfór' },
  'Na': { root: 'natríum', suffix: 'natríum', full: 'Natríum' },
  'K': { root: 'kalíum', suffix: 'kalíum', full: 'Kalíum' },
  'Ca': { root: 'kalsíum', suffix: 'kalsíum', full: 'Kalsíum' },
  'Mg': { root: 'magnesíum', suffix: 'magnesíum', full: 'Magnesíum' },
  'Al': { root: 'ál', suffix: 'ál', full: 'Ál' },
  'Fe': { root: 'járn', suffix: 'járn', full: 'Járn' },
  'Cu': { root: 'kopar', suffix: 'kopar', full: 'Kopar' },
  'Zn': { root: 'sink', suffix: 'sink', full: 'Sink' },
  'Ag': { root: 'silfur', suffix: 'silfur', full: 'Silfur' },
  'Li': { root: 'litíum', suffix: 'litíum', full: 'Litíum' },
  'Ba': { root: 'baríum', suffix: 'baríum', full: 'Baríum' },
  'Xe': { root: 'xenon', suffix: 'xenon', full: 'Xenon' },
};

interface NamePart {
  id: string;
  text: string;
  type: 'prefix' | 'element' | 'suffix' | 'ion';
  isSelected: boolean;
  order: number;
}

interface NameBuilderProps {
  onComplete?: (score: number, maxScore: number) => void;
  onBack?: () => void;
  onCorrectAnswer?: () => void;
  onIncorrectAnswer?: () => void;
}

// Get compounds suitable for name building
function getNameBuildingCompounds(): Compound[] {
  // Include both ionic and molecular compounds, excluding special names and very complex ones
  return COMPOUNDS.filter(c =>
    c.difficulty !== 'hard' &&
    c.name !== 'Vatn' &&
    c.name !== 'Ammóníak' &&
    !c.name.includes('vetniskarbónat') && // Too complex
    c.elements.length <= 3
  ).slice(0, 20);
}

// Parse compound name into its parts for validation
function _parseCompoundName(name: string): string[] {
  const lowerName = name.toLowerCase();
  const parts: string[] = [];

  // Check for Greek prefixes at the start
  const prefixOrder = ['dí', 'trí', 'tetra', 'penta', 'hexa', 'hepta', 'okta'];
  let remaining = lowerName;

  for (const prefix of prefixOrder) {
    if (remaining.startsWith(prefix)) {
      parts.push(prefix);
      remaining = remaining.slice(prefix.length);
      break;
    }
  }

  // The rest is element roots and suffixes combined
  if (remaining.length > 0) {
    parts.push(remaining);
  }

  return parts;
}
// Reserved for future validation - suppress unused warning
void _parseCompoundName;

// Generate available parts for a compound based on its name
function generateParts(compound: Compound): NamePart[] {
  const parts: NamePart[] = [];
  let id = 0;
  const lowerName = compound.name.toLowerCase();

  // Find which prefixes are actually used in the name
  const usedPrefixes: string[] = [];
  Object.values(PREFIXES).forEach(prefix => {
    if (lowerName.includes(prefix)) {
      usedPrefixes.push(prefix);
    }
  });

  // Add used prefixes plus some distractors
  const allPrefixes = ['dí', 'trí', 'tetra', 'penta', 'hexa'];
  allPrefixes.forEach(prefix => {
    if (usedPrefixes.includes(prefix) || Math.random() > 0.6) {
      parts.push({
        id: `prefix-${id++}`,
        text: prefix,
        type: 'prefix',
        isSelected: false,
        order: -1
      });
    }
  });

  // For ionic compounds (metal + nonmetal)
  if (compound.type === 'ionic') {
    // Add metal name (first element is usually the metal)
    const metal = compound.elements[0];
    const metalRoot = ELEMENT_ROOTS[metal];
    if (metalRoot) {
      parts.push({
        id: `metal-${id++}`,
        text: metalRoot.root,
        type: 'element',
        isSelected: false,
        order: -1
      });
    }

    // Add nonmetal suffix
    if (compound.elements.length > 1) {
      const nonmetal = compound.elements[compound.elements.length - 1];
      const nonmetalRoot = ELEMENT_ROOTS[nonmetal];
      if (nonmetalRoot) {
        parts.push({
          id: `suffix-${id++}`,
          text: nonmetalRoot.suffix,
          type: 'suffix',
          isSelected: false,
          order: -1
        });
      }
    }

    // Check for polyatomic ions
    Object.entries(POLYATOMIC_IONS).forEach(([formula, ionName]) => {
      if (compound.formula.includes(formula.replace('₄', '4').replace('₃', '3').replace('₂', '2')) ||
          lowerName.includes(ionName)) {
        parts.push({
          id: `ion-${id++}`,
          text: ionName,
          type: 'ion',
          isSelected: false,
          order: -1
        });
      }
    });
  }

  // For molecular compounds
  if (compound.type === 'molecular') {
    compound.elements.forEach((el, idx) => {
      const elRoot = ELEMENT_ROOTS[el];
      if (elRoot) {
        // First element uses root, second uses suffix (-íð form)
        if (idx === 0) {
          parts.push({
            id: `element-${id++}`,
            text: elRoot.root,
            type: 'element',
            isSelected: false,
            order: -1
          });
        } else {
          parts.push({
            id: `suffix-${id++}`,
            text: elRoot.suffix,
            type: 'suffix',
            isSelected: false,
            order: -1
          });
        }
      }
    });
  }

  // Add distractors
  const distractors = ['súlfat', 'nítrat', 'karbónat', 'amid', 'hýdroxíð'];
  const usedTexts = parts.map(p => p.text);
  distractors.forEach(d => {
    if (!usedTexts.includes(d) && !lowerName.includes(d) && Math.random() > 0.7) {
      parts.push({
        id: `distractor-${id++}`,
        text: d,
        type: 'ion',
        isSelected: false,
        order: -1
      });
    }
  });

  // Shuffle parts
  return parts.sort(() => Math.random() - 0.5);
}

export function NameBuilder({ onComplete, onBack, onCorrectAnswer, onIncorrectAnswer }: NameBuilderProps) {
  const compounds = useMemo(() => getNameBuildingCompounds(), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedParts, setSelectedParts] = useState<NamePart[]>([]);
  const [availableParts, setAvailableParts] = useState<NamePart[]>(() =>
    generateParts(compounds[0])
  );
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [draggedPart, setDraggedPart] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const compound = compounds[currentIndex];
  const totalCompounds = Math.min(compounds.length, 10);

  // Build the current name from selected parts
  const builtName = selectedParts
    .sort((a, b) => a.order - b.order)
    .map(p => p.text)
    .join('');

  // Capitalize first letter
  const displayName = builtName.charAt(0).toUpperCase() + builtName.slice(1);

  // Select a part
  const selectPart = useCallback((part: NamePart) => {
    if (showFeedback) return;

    setSelectedParts(prev => {
      const newOrder = prev.length;
      return [...prev, { ...part, isSelected: true, order: newOrder }];
    });
    setAvailableParts(prev => prev.filter(p => p.id !== part.id));
  }, [showFeedback]);

  // Remove a part
  const removePart = useCallback((part: NamePart) => {
    if (showFeedback) return;

    setSelectedParts(prev => prev.filter(p => p.id !== part.id));
    setAvailableParts(prev => [...prev, { ...part, isSelected: false, order: -1 }]);
  }, [showFeedback]);

  // Drag and drop handlers
  const handleDragStart = useCallback((e: DragEvent<HTMLButtonElement>, part: NamePart) => {
    setDraggedPart(part.id);
    e.dataTransfer.setData('text/plain', part.id);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedPart(null);
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const partId = e.dataTransfer.getData('text/plain');
    const part = availableParts.find(p => p.id === partId);
    if (part) {
      selectPart(part);
    }
  }, [availableParts, selectPart]);

  // Check the answer
  const checkAnswer = useCallback(() => {
    const correct = displayName.toLowerCase() === compound.name.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    setAttempts(prev => prev + 1);

    if (correct) {
      const points = Math.max(10 - attempts * 2, 5);
      setScore(prev => prev + points);
      onCorrectAnswer?.();
    } else {
      onIncorrectAnswer?.();
    }
  }, [displayName, compound.name, attempts, onCorrectAnswer, onIncorrectAnswer]);

  // Next compound
  const nextCompound = useCallback(() => {
    if (currentIndex + 1 < totalCompounds) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedParts([]);
      setAvailableParts(generateParts(compounds[nextIdx]));
      setShowFeedback(false);
      setAttempts(0);
    } else {
      onComplete?.(score, totalCompounds * 10);
    }
  }, [currentIndex, totalCompounds, compounds, score, onComplete]);

  // Reset current
  const resetCurrent = useCallback(() => {
    setSelectedParts([]);
    setAvailableParts(generateParts(compound));
    if (showFeedback && !isCorrect) {
      setShowFeedback(false);
    }
  }, [compound, showFeedback, isCorrect]);

  // Completion screen
  if (currentIndex >= totalCompounds) {
    const accuracy = Math.round((score / (totalCompounds * 10)) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Frábært!</h2>
            <p className="text-gray-600 mb-6">Þú hefur lokið nafnasmiðju!</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-purple-600">{score}</div>
                <div className="text-sm text-gray-600">Stig</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
                <div className="text-sm text-gray-600">Nákvæmni</div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-bold text-blue-800 mb-2">Hvað lærðir þú?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Grísk forskeyti: dí-, trí-, tetra-, penta-...</li>
                <li>• Endi -íð fyrir tvíefni (oxíð, klóríð, flúoríð)</li>
                <li>• Málmurinn kemur fyrst í jónefnum</li>
              </ul>
            </div>

            <button
              onClick={onBack}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Til baka í valmynd
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Nafnasmiðja</h1>
              <p className="text-sm text-gray-600">Byggðu nafnið úr pörtum</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">{score}</div>
                <div className="text-xs text-gray-600">Stig</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{currentIndex + 1}/{totalCompounds}</div>
                <div className="text-xs text-gray-600">Efni</div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all duration-500"
              style={{ width: `${((currentIndex + (showFeedback ? 1 : 0)) / totalCompounds) * 100}%` }}
            />
          </div>
        </div>

        {/* Formula display */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 mb-2">Efnaformúla:</div>
            <div className="text-5xl font-mono font-bold text-gray-800">{compound.formula}</div>
            <div className="text-sm text-gray-500 mt-2">{compound.info}</div>
          </div>

          {/* Building area - Drop zone */}
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <span>Þitt nafn:</span>
              <span className="text-xs text-gray-400">(dragðu eða smelltu á parta)</span>
            </div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`min-h-20 p-4 rounded-xl border-3 border-dashed flex flex-wrap gap-2 items-center justify-center transition-all ${
                showFeedback
                  ? isCorrect ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'
                  : isDragOver
                    ? 'border-purple-500 bg-purple-100 scale-[1.02]'
                    : 'border-purple-300 bg-purple-50'
              }`}
            >
              {selectedParts.length === 0 ? (
                <div className="text-center">
                  <div className="text-3xl mb-1 opacity-50">📥</div>
                  <span className="text-gray-400 text-sm">Dragðu parta hingað eða smelltu á þá</span>
                </div>
              ) : (
                selectedParts.sort((a, b) => a.order - b.order).map((part, idx) => (
                  <button
                    key={part.id}
                    onClick={() => removePart(part)}
                    disabled={showFeedback}
                    className={`px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 transform hover:scale-105 ${
                      part.type === 'prefix'
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : part.type === 'suffix'
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : part.type === 'ion'
                            ? 'bg-amber-500 text-white hover:bg-amber-600'
                            : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    <span className="text-xs opacity-70 mr-1">{idx + 1}.</span>
                    {part.text}
                    {!showFeedback && <span className="ml-2 opacity-70">×</span>}
                  </button>
                ))
              )}
            </div>
            <div className="text-center mt-3 flex items-center justify-center gap-2">
              <span className="text-3xl font-bold text-gray-800">
                {displayName || '???'}
              </span>
              {displayName && !showFeedback && (
                <AudioButton text={displayName} size="small" />
              )}
            </div>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-yellow-100'}`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{isCorrect ? '🎉' : '💡'}</span>
                <div className="flex-1">
                  <div className="font-bold text-gray-800">
                    {isCorrect ? 'Rétt!' : 'Ekki alveg...'}
                  </div>
                  <div className="text-sm text-gray-700 flex items-center gap-2">
                    Rétt nafn: <strong>{compound.name}</strong>
                    <AudioButton text={compound.name} size="small" />
                  </div>
                  {!isCorrect && (
                    <div className="text-xs text-gray-600 mt-1">
                      Þú skrifaðir: {displayName}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Available parts */}
          <div>
            <div className="text-sm text-gray-600 mb-2">Tiltækir partar:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {/* Group parts by type */}
              {/* Prefixes first */}
              {availableParts.filter(p => p.type === 'prefix').map(part => (
                <button
                  key={part.id}
                  draggable={!showFeedback}
                  onDragStart={(e) => handleDragStart(e, part)}
                  onDragEnd={handleDragEnd}
                  onClick={() => selectPart(part)}
                  disabled={showFeedback}
                  className={`px-4 py-2 rounded-lg font-medium transition-all cursor-grab active:cursor-grabbing ${
                    draggedPart === part.id ? 'opacity-50 scale-95' : ''
                  } bg-blue-100 text-blue-700 hover:bg-blue-200 border-2 border-blue-200 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span className="text-xs text-blue-500 block">forskeyti</span>
                  {part.text}
                </button>
              ))}
              {/* Elements */}
              {availableParts.filter(p => p.type === 'element').map(part => (
                <button
                  key={part.id}
                  draggable={!showFeedback}
                  onDragStart={(e) => handleDragStart(e, part)}
                  onDragEnd={handleDragEnd}
                  onClick={() => selectPart(part)}
                  disabled={showFeedback}
                  className={`px-4 py-2 rounded-lg font-medium transition-all cursor-grab active:cursor-grabbing ${
                    draggedPart === part.id ? 'opacity-50 scale-95' : ''
                  } bg-purple-100 text-purple-700 hover:bg-purple-200 border-2 border-purple-200 hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span className="text-xs text-purple-500 block">frumefni</span>
                  {part.text}
                </button>
              ))}
              {/* Suffixes */}
              {availableParts.filter(p => p.type === 'suffix').map(part => (
                <button
                  key={part.id}
                  draggable={!showFeedback}
                  onDragStart={(e) => handleDragStart(e, part)}
                  onDragEnd={handleDragEnd}
                  onClick={() => selectPart(part)}
                  disabled={showFeedback}
                  className={`px-4 py-2 rounded-lg font-medium transition-all cursor-grab active:cursor-grabbing ${
                    draggedPart === part.id ? 'opacity-50 scale-95' : ''
                  } bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-200 hover:border-green-400 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span className="text-xs text-green-500 block">endi</span>
                  {part.text}
                </button>
              ))}
              {/* Polyatomic ions */}
              {availableParts.filter(p => p.type === 'ion').map(part => (
                <button
                  key={part.id}
                  draggable={!showFeedback}
                  onDragStart={(e) => handleDragStart(e, part)}
                  onDragEnd={handleDragEnd}
                  onClick={() => selectPart(part)}
                  disabled={showFeedback}
                  className={`px-4 py-2 rounded-lg font-medium transition-all cursor-grab active:cursor-grabbing ${
                    draggedPart === part.id ? 'opacity-50 scale-95' : ''
                  } bg-amber-100 text-amber-700 hover:bg-amber-200 border-2 border-amber-200 hover:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span className="text-xs text-amber-500 block">jón</span>
                  {part.text}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {!showFeedback ? (
            <>
              <button
                onClick={resetCurrent}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition-colors"
              >
                🔄 Hreinsa
              </button>
              <button
                onClick={checkAnswer}
                disabled={selectedParts.length === 0}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✓ Athuga
              </button>
            </>
          ) : (
            <>
              {!isCorrect && (
                <button
                  onClick={resetCurrent}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Reyna aftur
                </button>
              )}
              <button
                onClick={nextCompound}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition-colors"
              >
                {currentIndex + 1 < totalCompounds ? 'Næsta efni →' : 'Sjá niðurstöður'}
              </button>
            </>
          )}
        </div>

        {/* Naming rules hint */}
        <div className="mt-4 bg-blue-50 rounded-xl p-4">
          <h3 className="font-bold text-blue-800 mb-2">Nafnareglur:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>Jónefni:</strong> Málmur + málmleysingi → málmur + endi -íð</li>
            <li>• <strong>Sameindaefni:</strong> Notaðu forskeyti (dí-, trí-, tetra-...)</li>
            <li>• <strong>-íð:</strong> Endinn fyrir neikvæða jón (oxíð, klóríð, flúoríð)</li>
          </ul>
        </div>

        {/* Back button */}
        <button
          onClick={onBack}
          className="mt-4 w-full text-gray-500 hover:text-gray-700 font-semibold py-2"
        >
          ← Til baka í valmynd
        </button>
      </div>
    </div>
  );
}

export default NameBuilder;
