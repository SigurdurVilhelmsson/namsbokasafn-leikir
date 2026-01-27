import { useState, useEffect, useCallback } from 'react';
import { Molecule } from './Molecule';

interface ReactantData {
  formula: string;
  coeff: number;
  color: string;
}

interface ProductData {
  formula: string;
  coeff: number;
  color: string;
}

interface ReactionAnimationProps {
  reactant1: ReactantData;
  reactant2: ReactantData;
  products: ProductData[];
  r1Count: number;
  r2Count: number;
  autoPlay?: boolean;
  showResult?: boolean;
  onAnimationComplete?: () => void;
}

interface AnimatedMolecule {
  id: number;
  formula: string;
  color: string;
  x: number;
  y: number;
  targetX?: number;
  targetY?: number;
  opacity: number;
  scale: number;
  isProduct: boolean;
  isExcess: boolean;
  reactionIndex: number;
}

interface Trail {
  id: number;
  x: number;
  y: number;
  color: string;
  createdAt: number;
}

interface BondLine {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: number;
}

export function ReactionAnimation({
  reactant1,
  reactant2,
  products,
  r1Count,
  r2Count,
  autoPlay = false,
  showResult = false,
  onAnimationComplete
}: ReactionAnimationProps) {
  const [animationStep, setAnimationStep] = useState<'initial' | 'combining' | 'reacting' | 'products' | 'complete'>('initial');
  const [molecules, setMolecules] = useState<AnimatedMolecule[]>([]);
  const [currentReaction, setCurrentReaction] = useState(0);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [bondLines, setBondLines] = useState<BondLine[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const trailIdRef = { current: 0 };

  // Calculate reaction amounts
  const timesR1 = Math.floor(r1Count / reactant1.coeff);
  const timesR2 = Math.floor(r2Count / reactant2.coeff);
  const timesReactionRuns = Math.min(timesR1, timesR2);
  const limitingIsR1 = timesR1 <= timesR2;

  const excessR1 = r1Count - (timesReactionRuns * reactant1.coeff);
  const excessR2 = r2Count - (timesReactionRuns * reactant2.coeff);

  // Play sound effect
  const playSound = useCallback((type: 'combine' | 'react' | 'complete') => {
    if (!soundEnabled) return;

    // Use Web Audio API for simple sounds
    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (type === 'combine') {
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
      } else if (type === 'react') {
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.2);
      } else {
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      }

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      // Audio not supported, ignore
    }
  }, [soundEnabled]);

  // Initialize molecules
  const initializeMolecules = useCallback(() => {
    const newMolecules: AnimatedMolecule[] = [];
    let id = 0;

    // Determine which molecules will be excess
    const r1ExcessStart = timesReactionRuns * reactant1.coeff;
    const r2ExcessStart = timesReactionRuns * reactant2.coeff;

    // Reactant 1 molecules (left side)
    for (let i = 0; i < r1Count; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      newMolecules.push({
        id: id++,
        formula: reactant1.formula,
        color: reactant1.color,
        x: 10 + col * 15,
        y: 20 + row * 18,
        opacity: 1,
        scale: 1,
        isProduct: false,
        isExcess: i >= r1ExcessStart,
        reactionIndex: Math.floor(i / reactant1.coeff)
      });
    }

    // Reactant 2 molecules (right side)
    for (let i = 0; i < r2Count; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      newMolecules.push({
        id: id++,
        formula: reactant2.formula,
        color: reactant2.color,
        x: 70 + col * 15,
        y: 20 + row * 18,
        opacity: 1,
        scale: 1,
        isProduct: false,
        isExcess: i >= r2ExcessStart,
        reactionIndex: Math.floor(i / reactant2.coeff)
      });
    }

    setMolecules(newMolecules);
    setAnimationStep('initial');
    setCurrentReaction(0);
    setTrails([]);
    setBondLines([]);
  }, [r1Count, r2Count, reactant1, reactant2, timesReactionRuns]);

  useEffect(() => {
    initializeMolecules();
  }, [initializeMolecules]);

  // Clean up old trails
  useEffect(() => {
    if (trails.length === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      setTrails(prev => prev.filter(t => now - t.createdAt < 800));
    }, 50);

    return () => clearInterval(interval);
  }, [trails.length]);

  // Animate bond lines during reacting phase
  useEffect(() => {
    if (animationStep !== 'reacting') {
      setBondLines([]);
      return;
    }

    // Create bond formation lines at center
    const newBonds: BondLine[] = [];
    for (let i = 0; i < 3; i++) {
      newBonds.push({
        id: i,
        x1: 40 + Math.random() * 20,
        y1: 45 + Math.random() * 10,
        x2: 40 + Math.random() * 20,
        y2: 45 + Math.random() * 10,
        progress: 0
      });
    }
    setBondLines(newBonds);

    // Animate bond progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.1;
      if (progress >= 1) {
        clearInterval(interval);
        setBondLines([]);
        return;
      }
      setBondLines(prev => prev.map(b => ({ ...b, progress })));
    }, 50);

    return () => clearInterval(interval);
  }, [animationStep]);

  // Run animation step
  const runReaction = useCallback(() => {
    if (currentReaction >= timesReactionRuns) {
      setAnimationStep('complete');
      playSound('complete');

      // Animate excess molecules to the side
      setMolecules(prev => prev.map(mol => {
        if (mol.isExcess && !mol.isProduct && mol.opacity > 0) {
          const isR1 = mol.formula === reactant1.formula;
          return {
            ...mol,
            x: isR1 ? 15 : 85,  // Move to respective sides
            y: 75 + (mol.id % 3) * 8,  // Stack vertically
            scale: 0.9  // Slightly smaller to indicate "leftover"
          };
        }
        return mol;
      }));

      onAnimationComplete?.();
      return;
    }

    setAnimationStep('combining');
    playSound('combine');

    // Get molecules that will move and create trails from their starting positions
    const movingMolecules = molecules.filter(
      mol => mol.reactionIndex === currentReaction && !mol.isProduct && !mol.isExcess
    );

    // Generate initial trails at starting positions
    const newTrails: Trail[] = movingMolecules.map(mol => ({
      id: trailIdRef.current++,
      x: mol.x,
      y: mol.y,
      color: mol.color,
      createdAt: Date.now()
    }));
    setTrails(prev => [...prev, ...newTrails]);

    // Generate intermediate trails during movement
    const trailInterval = setInterval(() => {
      setMolecules(currentMols => {
        const moving = currentMols.filter(
          mol => mol.reactionIndex === currentReaction && !mol.isProduct && !mol.isExcess && mol.opacity > 0
        );
        if (moving.length > 0) {
          const intermediateTrails: Trail[] = moving.map(mol => ({
            id: trailIdRef.current++,
            x: mol.x + (Math.random() * 4 - 2),
            y: mol.y + (Math.random() * 4 - 2),
            color: mol.color,
            createdAt: Date.now()
          }));
          setTrails(prev => [...prev, ...intermediateTrails]);
        }
        return currentMols;
      });
    }, 100);

    // Clear trail interval after combining phase
    setTimeout(() => clearInterval(trailInterval), 500);

    // Move reactants to center
    setMolecules(prev => prev.map(mol => {
      if (mol.reactionIndex === currentReaction && !mol.isProduct && !mol.isExcess) {
        return {
          ...mol,
          targetX: 45 + (Math.random() * 10 - 5),
          targetY: 50 + (Math.random() * 10 - 5),
          x: 45 + (Math.random() * 10 - 5),
          y: 50 + (Math.random() * 10 - 5)
        };
      }
      return mol;
    }));

    // After combining, create products
    setTimeout(() => {
      setAnimationStep('reacting');
      playSound('react');

      setMolecules(prev => {
        const updated = prev.map(mol => {
          if (mol.reactionIndex === currentReaction && !mol.isProduct && !mol.isExcess) {
            return { ...mol, opacity: 0, scale: 0 };
          }
          return mol;
        });

        // Add products
        const newProducts: AnimatedMolecule[] = [];
        let productId = prev.length + currentReaction * 100;

        products.forEach((product, pIdx) => {
          for (let i = 0; i < product.coeff; i++) {
            newProducts.push({
              id: productId++,
              formula: product.formula,
              color: product.color,
              x: 45 + (pIdx * 10) + (i * 5),
              y: 80 + currentReaction * 12,
              opacity: 1,
              scale: 1,
              isProduct: true,
              isExcess: false,
              reactionIndex: currentReaction
            });
          }
        });

        return [...updated, ...newProducts];
      });

      setAnimationStep('products');
      setCurrentReaction(prev => prev + 1);
    }, 600);
  }, [currentReaction, timesReactionRuns, products, onAnimationComplete, playSound, reactant1.formula]);

  // Auto-play animation
  useEffect(() => {
    if (autoPlay && animationStep === 'initial') {
      const timer = setTimeout(runReaction, 500);
      return () => clearTimeout(timer);
    }
    if (autoPlay && animationStep === 'products' && currentReaction < timesReactionRuns) {
      const timer = setTimeout(runReaction, 800);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, animationStep, currentReaction, runReaction, timesReactionRuns]);

  // Get animation class
  const getAnimationClass = (mol: AnimatedMolecule) => {
    if (animationStep === 'combining' && mol.reactionIndex === currentReaction && !mol.isProduct) {
      return 'transition-all duration-500 ease-in-out';
    }
    if (mol.isProduct) {
      return 'animate-bounce-in';
    }
    if (mol.isExcess && animationStep === 'complete') {
      return 'transition-all duration-700 ease-out';
    }
    return 'transition-all duration-300';
  };

  // Get excess styling
  const getExcessStyle = (mol: AnimatedMolecule) => {
    if (mol.isExcess && animationStep === 'complete') {
      return 'ring-2 ring-yellow-400 ring-offset-1 animate-pulse';
    }
    return '';
  };

  // Count excess molecules
  const excessMolecules = molecules.filter(m => m.isExcess && m.opacity > 0 && !m.isProduct);

  // Count visible molecules
  const visibleR1 = molecules.filter(m => m.formula === reactant1.formula && m.opacity > 0).length;
  const visibleR2 = molecules.filter(m => m.formula === reactant2.formula && m.opacity > 0).length;
  const visibleProducts = molecules.filter(m => m.isProduct && m.opacity > 0).length;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
      {/* Animation area */}
      <div className="relative w-full h-48 bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
        {/* Particle trails */}
        {trails.map(trail => {
          const age = Date.now() - trail.createdAt;
          const opacity = Math.max(0, 1 - age / 800);
          const scale = 0.3 + (1 - age / 800) * 0.4;
          return (
            <div
              key={trail.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${trail.x}%`,
                top: `${trail.y}%`,
                width: 8 * scale,
                height: 8 * scale,
                backgroundColor: trail.color,
                opacity: opacity * 0.6,
                transform: 'translate(-50%, -50%)',
                filter: 'blur(2px)'
              }}
            />
          );
        })}

        {/* Bond formation lines */}
        {bondLines.length > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {bondLines.map(bond => (
              <line
                key={bond.id}
                x1={`${bond.x1}%`}
                y1={`${bond.y1}%`}
                x2={`${bond.x1 + (bond.x2 - bond.x1) * bond.progress}%`}
                y2={`${bond.y1 + (bond.y2 - bond.y1) * bond.progress}%`}
                stroke="#f97316"
                strokeWidth="3"
                strokeLinecap="round"
                opacity={0.8 - bond.progress * 0.3}
                className="animate-pulse"
              />
            ))}
            {/* Energy burst at center */}
            <circle
              cx="50%"
              cy="50%"
              r={bondLines[0]?.progress ? bondLines[0].progress * 30 : 0}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
              opacity={bondLines[0]?.progress ? 1 - bondLines[0].progress : 0}
            />
          </svg>
        )}

        {/* Reaction zone indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-24 h-24 rounded-full border-4 border-dashed transition-all duration-500 ${
            animationStep === 'combining' || animationStep === 'reacting'
              ? 'border-orange-400 bg-orange-50/50 scale-110'
              : 'border-gray-200 bg-gray-50/30'
          }`}>
            {animationStep === 'reacting' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl animate-pulse">💥</span>
              </div>
            )}
          </div>
        </div>

        {/* Molecules */}
        {molecules.map(mol => (
          <div
            key={mol.id}
            className={`absolute ${getAnimationClass(mol)}`}
            style={{
              left: `${mol.x}%`,
              top: `${mol.y}%`,
              transform: `translate(-50%, -50%) scale(${mol.scale})`,
              opacity: mol.opacity,
            }}
          >
            <Molecule
              formula={mol.formula}
              color={mol.color}
              size={mol.isProduct ? 35 : 30}
              className={mol.isProduct ? 'ring-2 ring-green-400 ring-offset-1' : getExcessStyle(mol)}
            />
          </div>
        ))}

        {/* Excess/Leftover labels */}
        {animationStep === 'complete' && excessMolecules.length > 0 && (
          <>
            {excessR1 > 0 && (
              <div className="absolute left-2 bottom-8 bg-yellow-100 border border-yellow-400 rounded-lg px-2 py-1 text-xs font-bold text-yellow-800 animate-fade-in">
                <span className="block text-center">Afgangur</span>
                <span className="block text-center">{excessR1} {reactant1.formula}</span>
              </div>
            )}
            {excessR2 > 0 && (
              <div className="absolute right-2 bottom-8 bg-yellow-100 border border-yellow-400 rounded-lg px-2 py-1 text-xs font-bold text-yellow-800 animate-fade-in">
                <span className="block text-center">Afgangur</span>
                <span className="block text-center">{excessR2} {reactant2.formula}</span>
              </div>
            )}
          </>
        )}

        {/* Labels */}
        <div className="absolute top-1 left-2 text-xs text-gray-500 font-medium">
          {reactant1.formula}
        </div>
        <div className="absolute top-1 right-2 text-xs text-gray-500 font-medium">
          {reactant2.formula}
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-medium">
          Afurðir
        </div>
      </div>

      {/* Status display */}
      <div className="grid grid-cols-3 gap-2 text-center text-sm mb-3">
        <div className={`p-2 rounded-lg ${limitingIsR1 && showResult ? 'bg-red-100 border border-red-300' : 'bg-blue-50'}`}>
          <div className="font-bold text-blue-700">{visibleR1}</div>
          <div className="text-xs text-gray-600">{reactant1.formula}</div>
          {limitingIsR1 && showResult && <div className="text-xs text-red-600 font-bold">Takmarkandi!</div>}
        </div>
        <div className={`p-2 rounded-lg ${!limitingIsR1 && showResult ? 'bg-red-100 border border-red-300' : 'bg-red-50'}`}>
          <div className="font-bold text-red-700">{visibleR2}</div>
          <div className="text-xs text-gray-600">{reactant2.formula}</div>
          {!limitingIsR1 && showResult && <div className="text-xs text-red-600 font-bold">Takmarkandi!</div>}
        </div>
        <div className="bg-green-50 p-2 rounded-lg">
          <div className="font-bold text-green-700">{visibleProducts}</div>
          <div className="text-xs text-gray-600">Afurðir</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={runReaction}
          disabled={animationStep === 'combining' || animationStep === 'reacting' || currentReaction >= timesReactionRuns}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            currentReaction >= timesReactionRuns
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          {currentReaction >= timesReactionRuns ? '✓ Búið' : `🔬 Hvarf ${currentReaction + 1}/${timesReactionRuns}`}
        </button>
        <button
          onClick={() => setSoundEnabled(prev => !prev)}
          className={`py-2 px-4 rounded-lg font-medium transition-colors ${
            soundEnabled
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          title={soundEnabled ? 'Slökkva á hljóði' : 'Kveikja á hljóði'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
        <button
          onClick={initializeMolecules}
          className="py-2 px-4 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
        >
          🔄
        </button>
      </div>

      {/* Result summary */}
      {showResult && animationStep === 'complete' && (
        <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-sm font-bold text-yellow-800 mb-1">Niðurstaða:</div>
          <div className="text-xs text-gray-700 space-y-1">
            <div>Hvörfin gátu gerst <strong>{timesReactionRuns}</strong> sinnum</div>
            <div>
              Afgangur: <strong>{limitingIsR1 ? excessR2 : excessR1}</strong>{' '}
              {limitingIsR1 ? reactant2.formula : reactant1.formula}
            </div>
            <div>
              Afurðir mynduðust:{' '}
              {products.map((p, i) => (
                <span key={p.formula}>
                  <strong>{p.coeff * timesReactionRuns}</strong> {p.formula}
                  {i < products.length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes bounce-in {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          50% { transform: translate(-50%, -50%) scale(1.2); }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.4s ease-out forwards;
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 5px rgba(250, 204, 21, 0.5); }
          50% { box-shadow: 0 0 15px rgba(250, 204, 21, 0.8); }
        }
        .excess-glow {
          animation: glow-pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
