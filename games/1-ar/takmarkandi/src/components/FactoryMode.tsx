import { useState, useEffect, useMemo } from 'react';
import { Reaction } from '../types';
import { REACTIONS } from '../data/reactions';
import { calculateCorrectAnswer } from '../utils/calculations';
import { Molecule } from './Molecule';

interface FactoryModeProps {
  onComplete: (score: number, profit: number) => void;
  onBack: () => void;
}

interface RawMaterial {
  formula: string;
  pricePerUnit: number;
  color: string;
}

interface FactoryChallenge {
  reaction: Reaction;
  targetProduct: string;
  targetAmount: number;
  rawMaterials: {
    r1: RawMaterial;
    r2: RawMaterial;
  };
  productValue: number;
  budget: number;
}

interface PurchaseOrder {
  r1Amount: number;
  r2Amount: number;
}

interface ProductionResult {
  productsMade: number;
  excessR1: number;
  excessR2: number;
  totalCost: number;
  revenue: number;
  profit: number;
  waste: number;
  metTarget: boolean;
}

// Generate factory challenges
function generateChallenge(difficulty: 'easy' | 'medium' | 'hard'): FactoryChallenge {
  const availableReactions = REACTIONS.filter(r => r.difficulty === difficulty || difficulty === 'easy');
  const reaction = availableReactions[Math.floor(Math.random() * availableReactions.length)];

  // Pick a product (first one for simplicity)
  const targetProduct = reaction.products[0].formula;
  const productCoeff = reaction.products[0].coeff;

  // Generate target amount based on difficulty
  const baseTarget = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 20;
  const targetAmount = baseTarget + Math.floor(Math.random() * baseTarget);

  // Calculate minimum raw materials needed
  const minReactionsNeeded = Math.ceil(targetAmount / productCoeff);
  const minR1 = minReactionsNeeded * reaction.reactant1.coeff;
  const minR2 = minReactionsNeeded * reaction.reactant2.coeff;

  // Set prices (make it interesting with different ratios)
  const r1Price = 10 + Math.floor(Math.random() * 20);
  const r2Price = 10 + Math.floor(Math.random() * 20);

  // Product value should make profit possible but require optimization
  const minCost = minR1 * r1Price + minR2 * r2Price;
  const productValue = Math.round((minCost / targetAmount) * 1.5); // 50% profit margin at optimal

  // Budget with some slack
  const budget = Math.round(minCost * 1.3);

  return {
    reaction,
    targetProduct,
    targetAmount,
    rawMaterials: {
      r1: { formula: reaction.reactant1.formula, pricePerUnit: r1Price, color: reaction.reactant1.color },
      r2: { formula: reaction.reactant2.formula, pricePerUnit: r2Price, color: reaction.reactant2.color }
    },
    productValue,
    budget
  };
}

function calculateProduction(challenge: FactoryChallenge, order: PurchaseOrder): ProductionResult {
  const { reaction, targetProduct, targetAmount, rawMaterials, productValue } = challenge;

  // Calculate using existing utility
  const result = calculateCorrectAnswer(reaction, order.r1Amount, order.r2Amount);

  const productsMade = result.productsFormed[targetProduct] || 0;
  const totalCost = order.r1Amount * rawMaterials.r1.pricePerUnit + order.r2Amount * rawMaterials.r2.pricePerUnit;
  const revenue = productsMade * productValue;
  const profit = revenue - totalCost;

  // Calculate waste (excess materials)
  const excessR1 = result.limitingReactant === reaction.reactant1.formula ? 0 : result.excessRemaining;
  const excessR2 = result.limitingReactant === reaction.reactant2.formula ? 0 : result.excessRemaining;
  const waste = result.limitingReactant === reaction.reactant1.formula
    ? excessR2 * rawMaterials.r2.pricePerUnit
    : excessR1 * rawMaterials.r1.pricePerUnit;

  return {
    productsMade,
    excessR1: result.limitingReactant === reaction.reactant1.formula ? 0 : result.excessRemaining,
    excessR2: result.limitingReactant === reaction.reactant2.formula ? 0 : result.excessRemaining,
    totalCost,
    revenue,
    profit,
    waste,
    metTarget: productsMade >= targetAmount
  };
}

export function FactoryMode({ onComplete, onBack }: FactoryModeProps) {
  const [screen, setScreen] = useState<'intro' | 'game' | 'results'>('intro');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [challenge, setChallenge] = useState<FactoryChallenge | null>(null);
  const [order, setOrder] = useState<PurchaseOrder>({ r1Amount: 0, r2Amount: 0 });
  const [showProduction, setShowProduction] = useState(false);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  // Start new challenge
  const startNewChallenge = () => {
    const newChallenge = generateChallenge(difficulty);
    setChallenge(newChallenge);
    setOrder({ r1Amount: 0, r2Amount: 0 });
    setShowProduction(false);
  };

  useEffect(() => {
    if (screen === 'game' && !challenge) {
      startNewChallenge();
    }
  }, [screen, challenge, difficulty]);

  // Calculate current production preview
  const production = useMemo(() => {
    if (!challenge || order.r1Amount === 0 || order.r2Amount === 0) return null;
    return calculateProduction(challenge, order);
  }, [challenge, order]);

  // Calculate total cost
  const totalCost = challenge
    ? order.r1Amount * challenge.rawMaterials.r1.pricePerUnit +
      order.r2Amount * challenge.rawMaterials.r2.pricePerUnit
    : 0;

  const overBudget = challenge ? totalCost > challenge.budget : false;

  // Handle production
  const handleProduce = () => {
    if (!production || !challenge) return;
    setShowProduction(true);

    // Calculate score
    let roundScore = 0;
    if (production.metTarget) {
      roundScore += 100; // Base score for meeting target
      roundScore += Math.max(0, production.profit); // Add profit
      roundScore -= production.waste; // Subtract waste cost
    }

    setTotalScore(prev => prev + Math.max(0, roundScore));
    setTotalProfit(prev => prev + production.profit);
    setRoundsPlayed(prev => prev + 1);
  };

  const handleNextRound = () => {
    if (roundsPlayed >= 5) {
      setScreen('results');
    } else {
      startNewChallenge();
    }
  };

  // Intro screen
  if (screen === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏭</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Verksmiðjuhamur</h1>
              <p className="text-gray-600">Stjórnaðu efnaverksmiðju og hámarka hagnaðinn!</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6 text-sm">
              <h3 className="font-bold text-blue-800 mb-2">Hvernig á að spila:</h3>
              <ul className="text-blue-700 space-y-1">
                <li>• Kauptu hráefni innan fjárhagsramma</li>
                <li>• Náðu framleiðslumarkmiði til að fá stig</li>
                <li>• Forðastu sóun - umframefni kosta peninga!</li>
                <li>• Hámarka hagnað á 5 umferðum</li>
              </ul>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="font-bold text-gray-700">Erfiðleikastig:</h3>
              {(['easy', 'medium', 'hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    difficulty === diff
                      ? diff === 'easy' ? 'border-green-500 bg-green-50' :
                        diff === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                        'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-bold">
                    {diff === 'easy' ? '🌱 Byrjandi' : diff === 'medium' ? '⚙️ Reynslumikill' : '🔥 Sérfræðingur'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {diff === 'easy' ? 'Einföld hlutföll, lágt markmið' :
                     diff === 'medium' ? 'Flóknari hlutföll, hærra markmið' :
                     'Hátt markmið, þröng fjárhagsrammi'}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setScreen('game')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-colors mb-4"
            >
              Byrja framleiðslu
            </button>

            <button
              onClick={onBack}
              className="w-full text-gray-500 hover:text-gray-700 font-semibold py-2"
            >
              ← Til baka
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (screen === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">
              {totalProfit > 0 ? '💰' : totalProfit === 0 ? '📊' : '📉'}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {totalProfit > 0 ? 'Hagnaður!' : totalProfit === 0 ? 'Jafnvægi' : 'Tap'}
            </h2>

            <div className="bg-emerald-50 rounded-xl p-6 mb-6">
              <div className="text-4xl font-bold text-emerald-600 mb-1">{totalScore}</div>
              <div className="text-sm text-gray-600">Heildarfjöldi stiga</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`rounded-xl p-4 ${totalProfit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalProfit >= 0 ? '+' : ''}{totalProfit} kr
                </div>
                <div className="text-xs text-gray-600">Heildarhagnaður</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">{roundsPlayed}</div>
                <div className="text-xs text-gray-600">Umferðir</div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setRoundsPlayed(0);
                  setTotalProfit(0);
                  setTotalScore(0);
                  setChallenge(null);
                  setScreen('game');
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                Spila aftur
              </button>
              <button
                onClick={() => onComplete(totalScore, totalProfit)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-colors"
              >
                Til baka í valmynd
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game screen
  if (!challenge) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-slate-700 rounded-xl p-4 mb-4 text-white">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-6">
              <div>
                <p className="text-sm text-slate-400">Umferð</p>
                <p className="text-2xl font-bold">{roundsPlayed + 1}/5</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Stig</p>
                <p className="text-2xl font-bold text-emerald-400">{totalScore}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Hagnaður</p>
                <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalProfit >= 0 ? '+' : ''}{totalProfit} kr
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Conveyor belt visual */}
        <div className="bg-slate-600 rounded-xl p-4 mb-4 overflow-hidden">
          <div className="flex items-center justify-between">
            {/* Raw materials */}
            <div className="flex flex-col items-center">
              <div className="bg-slate-700 rounded-lg p-3 mb-2">
                <Molecule formula={challenge.rawMaterials.r1.formula} color={challenge.rawMaterials.r1.color} size={40} />
              </div>
              <span className="text-white text-xs font-bold">{order.r1Amount}</span>
            </div>

            <div className="text-white text-2xl">+</div>

            <div className="flex flex-col items-center">
              <div className="bg-slate-700 rounded-lg p-3 mb-2">
                <Molecule formula={challenge.rawMaterials.r2.formula} color={challenge.rawMaterials.r2.color} size={40} />
              </div>
              <span className="text-white text-xs font-bold">{order.r2Amount}</span>
            </div>

            {/* Conveyor belt animation */}
            <div className="flex-1 mx-4 h-8 bg-slate-800 rounded relative overflow-hidden">
              <div className="absolute inset-0 flex items-center">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-1 bg-yellow-600 mx-2 rounded animate-pulse"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-yellow-400 text-lg">
                →→→
              </div>
            </div>

            {/* Products */}
            <div className="flex flex-col items-center">
              <div className="bg-emerald-700 rounded-lg p-3 mb-2">
                <Molecule formula={challenge.targetProduct} color={challenge.reaction.products[0].color} size={40} />
              </div>
              <span className="text-white text-xs font-bold">
                {production ? production.productsMade : '?'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Order panel */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              📦 Pöntun hráefna
            </h3>

            {/* Reaction equation */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4 text-center font-mono text-sm">
              {challenge.reaction.equation}
            </div>

            {/* R1 input */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Molecule formula={challenge.rawMaterials.r1.formula} color={challenge.rawMaterials.r1.color} size={30} />
                  <span className="font-semibold">{challenge.rawMaterials.r1.formula}</span>
                </div>
                <span className="text-sm text-gray-600">{challenge.rawMaterials.r1.pricePerUnit} kr/eining</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={order.r1Amount}
                onChange={(e) => setOrder(prev => ({ ...prev, r1Amount: parseInt(e.target.value) }))}
                disabled={showProduction}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-sm">
                <span>{order.r1Amount} einingar</span>
                <span className="text-blue-600 font-semibold">{order.r1Amount * challenge.rawMaterials.r1.pricePerUnit} kr</span>
              </div>
            </div>

            {/* R2 input */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Molecule formula={challenge.rawMaterials.r2.formula} color={challenge.rawMaterials.r2.color} size={30} />
                  <span className="font-semibold">{challenge.rawMaterials.r2.formula}</span>
                </div>
                <span className="text-sm text-gray-600">{challenge.rawMaterials.r2.pricePerUnit} kr/eining</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={order.r2Amount}
                onChange={(e) => setOrder(prev => ({ ...prev, r2Amount: parseInt(e.target.value) }))}
                disabled={showProduction}
                className="w-full accent-red-500"
              />
              <div className="flex justify-between text-sm">
                <span>{order.r2Amount} einingar</span>
                <span className="text-red-600 font-semibold">{order.r2Amount * challenge.rawMaterials.r2.pricePerUnit} kr</span>
              </div>
            </div>

            {/* Total cost */}
            <div className={`rounded-lg p-3 mb-4 ${overBudget ? 'bg-red-100 border border-red-300' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Heildarkostnaður:</span>
                <span className={`text-xl font-bold ${overBudget ? 'text-red-600' : 'text-gray-800'}`}>
                  {totalCost} kr
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Fjárhagsrammi:</span>
                <span>{challenge.budget} kr</span>
              </div>
              {overBudget && (
                <p className="text-red-600 text-sm mt-1">⚠️ Yfir fjárhagsramma!</p>
              )}
            </div>
          </div>

          {/* Target & Production panel */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              🎯 Framleiðslumarkmið
            </h3>

            {/* Target */}
            <div className="bg-emerald-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Molecule formula={challenge.targetProduct} color={challenge.reaction.products[0].color} size={35} />
                  <span className="font-semibold">{challenge.targetProduct}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">{challenge.targetAmount}</div>
                  <div className="text-xs text-gray-600">einingar þarf</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Verð á markaði: <span className="font-semibold">{challenge.productValue} kr/eining</span>
              </div>
            </div>

            {/* Production preview */}
            {production && !showProduction && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Forskoðun:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Framleiðsla:</span>
                    <span className={`font-bold ${production.productsMade >= challenge.targetAmount ? 'text-green-600' : 'text-orange-600'}`}>
                      {production.productsMade} {challenge.targetProduct}
                    </span>
                  </div>
                  {production.excessR1 > 0 && (
                    <div className="flex justify-between text-yellow-700">
                      <span>Sóun ({challenge.rawMaterials.r1.formula}):</span>
                      <span>{production.excessR1} einingar</span>
                    </div>
                  )}
                  {production.excessR2 > 0 && (
                    <div className="flex justify-between text-yellow-700">
                      <span>Sóun ({challenge.rawMaterials.r2.formula}):</span>
                      <span>{production.excessR2} einingar</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-1 mt-1">
                    <span>Áætlaður hagnaður:</span>
                    <span className={`font-bold ${production.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {production.profit >= 0 ? '+' : ''}{production.profit} kr
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Production result */}
            {showProduction && production && (
              <div className={`rounded-lg p-4 mb-4 ${production.metTarget ? 'bg-green-100 border-2 border-green-500' : 'bg-red-100 border-2 border-red-500'}`}>
                <h4 className={`font-bold mb-2 ${production.metTarget ? 'text-green-800' : 'text-red-800'}`}>
                  {production.metTarget ? '✓ Markmið náð!' : '✗ Markmið ekki náð'}
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Framleitt:</span>
                    <span className="font-bold">{production.productsMade} / {challenge.targetAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kostnaður:</span>
                    <span className="text-red-600">-{production.totalCost} kr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tekjur:</span>
                    <span className="text-green-600">+{production.revenue} kr</span>
                  </div>
                  {production.waste > 0 && (
                    <div className="flex justify-between text-yellow-700">
                      <span>Sóun:</span>
                      <span>-{production.waste} kr</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-1 mt-1 text-lg font-bold">
                    <span>Hagnaður:</span>
                    <span className={production.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {production.profit >= 0 ? '+' : ''}{production.profit} kr
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-4">
          {!showProduction ? (
            <button
              onClick={handleProduce}
              disabled={!production || overBudget || order.r1Amount === 0 || order.r2Amount === 0}
              className={`flex-1 font-bold py-4 px-6 rounded-xl transition-colors ${
                production && !overBudget && order.r1Amount > 0 && order.r2Amount > 0
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              🏭 Hefja framleiðslu
            </button>
          ) : (
            <button
              onClick={handleNextRound}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors"
            >
              {roundsPlayed >= 4 ? 'Sjá niðurstöður' : 'Næsta umferð'} →
            </button>
          )}
          <button
            onClick={() => setScreen('results')}
            className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-4 px-6 rounded-xl transition-colors"
          >
            Hætta
          </button>
        </div>
      </div>
    </div>
  );
}

export default FactoryMode;
