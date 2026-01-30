import { useState, useEffect, useCallback } from 'react';

// Atomic mass data
const ATOM_DATA: Record<string, { color: string; name: string; mass: number; approxMass: number }> = {
  H: { color: '#F3F4F6', name: 'Vetni', mass: 1.008, approxMass: 1 },
  C: { color: '#4B5563', name: 'Kolefni', mass: 12.011, approxMass: 12 },
  N: { color: '#3B82F6', name: 'Köfnunarefni', mass: 14.007, approxMass: 14 },
  O: { color: '#EF4444', name: 'Súrefni', mass: 15.999, approxMass: 16 },
  S: { color: '#EAB308', name: 'Brennisteinn', mass: 32.065, approxMass: 32 },
  Cl: { color: '#22C55E', name: 'Klór', mass: 35.453, approxMass: 35 },
  Na: { color: '#8B5CF6', name: 'Natríum', mass: 22.990, approxMass: 23 },
  Ca: { color: '#F97316', name: 'Kalsíum', mass: 40.078, approxMass: 40 },
  Fe: { color: '#78716C', name: 'Járn', mass: 55.845, approxMass: 56 },
  K: { color: '#EC4899', name: 'Kalíum', mass: 39.098, approxMass: 39 },
  Mg: { color: '#14B8A6', name: 'Magnesíum', mass: 24.305, approxMass: 24 },
  P: { color: '#F59E0B', name: 'Fosfór', mass: 30.974, approxMass: 31 },
  Al: { color: '#A1A1AA', name: 'Ál', mass: 26.982, approxMass: 27 },
  Cu: { color: '#B45309', name: 'Kopar', mass: 63.546, approxMass: 64 },
};

interface ElementStep {
  symbol: string;
  count: number;
  atomicMass: number;
  subtotal: number;
  runningTotal: number;
}

interface AnimatedMassCalculationProps {
  /** The elements in the compound */
  elements: { symbol: string; count: number }[];
  /** Whether to use approximate (integer) masses */
  useApproximate?: boolean;
  /** Auto-play animation on mount */
  autoPlay?: boolean;
  /** Delay between steps in ms */
  stepDelay?: number;
  /** Callback when animation completes */
  onComplete?: (totalMass: number) => void;
  /** Show controls for stepping through */
  showControls?: boolean;
  /** Compact mode for smaller display */
  compact?: boolean;
}

/**
 * AnimatedMassCalculation - Shows molar mass calculation step by step with animations
 */
export function AnimatedMassCalculation({
  elements,
  useApproximate = true,
  autoPlay = false,
  stepDelay = 800,
  onComplete,
  showControls = true,
  compact = false,
}: AnimatedMassCalculationProps) {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = not started
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [displayedTotal, setDisplayedTotal] = useState(0);

  // Build calculation steps
  const steps: ElementStep[] = [];
  let runningTotal = 0;
  for (const el of elements) {
    const atom = ATOM_DATA[el.symbol];
    const mass = useApproximate ? (atom?.approxMass || 0) : (atom?.mass || 0);
    const subtotal = mass * el.count;
    runningTotal += subtotal;
    steps.push({
      symbol: el.symbol,
      count: el.count,
      atomicMass: mass,
      subtotal,
      runningTotal,
    });
  }

  const totalMass = runningTotal;
  const isComplete = currentStep >= steps.length - 1;

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying || isComplete) return;

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, stepDelay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, isComplete, stepDelay]);

  // Update displayed total with animation
  useEffect(() => {
    if (currentStep < 0) {
      setDisplayedTotal(0);
      return;
    }

    const targetTotal = steps[currentStep]?.runningTotal || 0;
    const startTotal = currentStep > 0 ? steps[currentStep - 1].runningTotal : 0;
    const diff = targetTotal - startTotal;

    // Animate the counter
    const duration = 400;
    const frames = 20;
    const increment = diff / frames;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      if (frame >= frames) {
        setDisplayedTotal(targetTotal);
        clearInterval(interval);
      } else {
        setDisplayedTotal(startTotal + increment * frame);
      }
    }, duration / frames);

    return () => clearInterval(interval);
  }, [currentStep, steps]);

  // Notify on complete
  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete(totalMass);
    }
  }, [isComplete, onComplete, totalMass]);

  // Control functions
  const play = useCallback(() => {
    if (currentStep === -1) setCurrentStep(0);
    setIsPlaying(true);
  }, [currentStep]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const stepForward = useCallback(() => {
    if (!isComplete) {
      setCurrentStep(prev => prev + 1);
    }
  }, [isComplete]);

  const reset = useCallback(() => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setDisplayedTotal(0);
  }, []);

  const skipToEnd = useCallback(() => {
    setCurrentStep(steps.length - 1);
    setIsPlaying(false);
  }, [steps.length]);

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl ${compact ? 'p-3' : 'p-4'} border-2 border-blue-200`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-bold text-blue-800 ${compact ? 'text-sm' : 'text-base'}`}>
          📊 Mólmassa útreikningur
        </h3>
        {useApproximate && (
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
            ≈ Námundað
          </span>
        )}
      </div>

      {/* Calculation steps */}
      <div className={`space-y-2 ${compact ? 'mb-3' : 'mb-4'}`}>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isVisible = index <= currentStep;
          const atom = ATOM_DATA[step.symbol];

          return (
            <div
              key={`${step.symbol}-${index}`}
              className={`
                flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-300
                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                ${isActive ? 'bg-blue-100 border-2 border-blue-400 scale-105' : 'bg-white border border-gray-200'}
              `}
              style={{ transitionDelay: isVisible ? '0ms' : `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2">
                {/* Atom badge */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2"
                  style={{
                    backgroundColor: atom?.color || '#888',
                    borderColor: atom?.color === '#F3F4F6' ? '#CBD5E1' : 'transparent',
                    color: atom?.color === '#F3F4F6' || atom?.color === '#EAB308' ? '#1F2937' : '#FFFFFF',
                  }}
                >
                  {step.symbol}
                </div>

                {/* Calculation expression */}
                <div className={`font-mono ${compact ? 'text-xs' : 'text-sm'}`}>
                  <span className="text-gray-600">{step.count} × </span>
                  <span className="font-semibold">{useApproximate ? '≈' : ''}{step.atomicMass.toFixed(useApproximate ? 0 : 3)}</span>
                </div>
              </div>

              {/* Subtotal */}
              <div className={`font-bold ${isActive ? 'text-blue-700' : 'text-gray-700'} ${compact ? 'text-sm' : 'text-base'}`}>
                = {step.subtotal.toFixed(useApproximate ? 0 : 3)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Running total display */}
      <div className={`
        bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl px-4 py-3
        border-2 ${isComplete ? 'border-green-500' : 'border-green-300'}
        transition-all duration-500
      `}>
        <div className="flex items-center justify-between">
          <span className={`font-semibold text-gray-700 ${compact ? 'text-sm' : 'text-base'}`}>
            {isComplete ? '✓ Heildarmassi:' : 'Hlaupandi samtals:'}
          </span>
          <div className={`font-bold ${isComplete ? 'text-green-700' : 'text-emerald-600'} ${compact ? 'text-xl' : 'text-2xl'}`}>
            {useApproximate ? '≈ ' : ''}
            <span className="tabular-nums">
              {displayedTotal.toFixed(useApproximate ? 0 : 1)}
            </span>
            <span className={compact ? 'text-sm' : 'text-base'}> g/mol</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${(displayedTotal / totalMass) * 100}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={reset}
            disabled={currentStep === -1}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Byrja aftur"
          >
            ⏮️
          </button>

          {isPlaying ? (
            <button
              onClick={pause}
              className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition-colors"
              title="Gera hlé"
            >
              ⏸️
            </button>
          ) : (
            <button
              onClick={play}
              disabled={isComplete}
              className="p-2 rounded-lg bg-green-100 hover:bg-green-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Spila"
            >
              ▶️
            </button>
          )}

          <button
            onClick={stepForward}
            disabled={isComplete || isPlaying}
            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Næsta skref"
          >
            ⏭️
          </button>

          <button
            onClick={skipToEnd}
            disabled={isComplete}
            className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Sýna allt"
          >
            ⏩
          </button>
        </div>
      )}

      {/* Status text */}
      <div className="text-center mt-2 text-xs text-gray-500">
        {currentStep === -1 && 'Ýttu á ▶️ til að byrja'}
        {currentStep >= 0 && !isComplete && `Skref ${currentStep + 1} af ${steps.length}`}
        {isComplete && '✓ Útreikningur lokið!'}
      </div>
    </div>
  );
}

export default AnimatedMassCalculation;
