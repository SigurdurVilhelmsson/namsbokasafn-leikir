import { useState, useCallback, useRef, useEffect } from 'react';

interface PipetteProps {
  /** Current volume in the pipette (mL) */
  volume: number;
  /** Maximum volume the pipette can hold */
  maxVolume?: number;
  /** Volume per drop (mL) */
  dropVolume?: number;
  /** Color of the solution in pipette */
  solutionColor?: string;
  /** Callback when solution is dispensed */
  onDispense?: (drops: number, volume: number) => void;
  /** Callback when pipette draws solution */
  onDraw?: (volume: number) => void;
  /** Whether the pipette is active/enabled */
  enabled?: boolean;
  /** Label for the pipette */
  label?: string;
}

interface Drop {
  id: number;
  x: number;
  y: number;
  startTime: number;
}

/**
 * Pipette Component
 * An interactive pipette/dropper tool for lab simulations
 */
export function Pipette({
  volume,
  maxVolume = 5,
  dropVolume = 0.05,
  solutionColor = '#ff6b35',
  onDispense,
  onDraw: _onDraw, // Reserved for future draw functionality
  enabled = true,
  label
}: PipetteProps) {
  void _onDraw; // Suppress unused warning
  const [isHolding, setIsHolding] = useState(false);
  const [drops, setDrops] = useState<Drop[]>([]);
  const dropIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const fillPercent = Math.min(100, (volume / maxVolume) * 100);

  // Clean up old drops
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setDrops(prev => prev.filter(d => now - d.startTime < 1500));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Handle dispensing a drop
  const handleDispense = useCallback(() => {
    if (!enabled || volume < dropVolume) return;

    // Create drop animation
    const dropId = dropIdRef.current++;
    const newDrop: Drop = {
      id: dropId,
      x: 50, // Center of pipette tip
      y: 100, // Start at tip
      startTime: Date.now()
    };
    setDrops(prev => [...prev, newDrop]);

    // Notify parent
    onDispense?.(1, dropVolume);
  }, [enabled, volume, dropVolume, onDispense]);

  // Handle holding/clicking to dispense
  const handleMouseDown = useCallback(() => {
    if (!enabled) return;
    setIsHolding(true);
    handleDispense();
  }, [enabled, handleDispense]);

  const handleMouseUp = useCallback(() => {
    setIsHolding(false);
  }, []);

  // Continuous dispensing while holding
  useEffect(() => {
    if (!isHolding || !enabled) return;

    const interval = setInterval(() => {
      if (volume >= dropVolume) {
        handleDispense();
      }
    }, 300); // Dispense every 300ms while holding

    return () => clearInterval(interval);
  }, [isHolding, enabled, volume, dropVolume, handleDispense]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${enabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
      style={{ width: 60, height: 180 }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* Pipette SVG */}
      <svg
        viewBox="0 0 60 180"
        className="w-full h-full"
      >
        {/* Bulb (top) */}
        <ellipse
          cx="30"
          cy="25"
          rx="18"
          ry="20"
          fill="#e5e5e5"
          stroke="#9ca3af"
          strokeWidth="2"
          className={`transition-transform ${isHolding ? 'scale-95' : ''}`}
          style={{ transformOrigin: '30px 25px' }}
        />

        {/* Bulb highlight */}
        <ellipse
          cx="24"
          cy="18"
          rx="6"
          ry="8"
          fill="white"
          opacity="0.5"
        />

        {/* Stem */}
        <rect
          x="26"
          y="42"
          width="8"
          height="100"
          fill="#d4d4d4"
          stroke="#9ca3af"
          strokeWidth="1"
        />

        {/* Solution fill in stem */}
        <rect
          x="27"
          y={42 + (100 - fillPercent)}
          width="6"
          height={fillPercent}
          fill={solutionColor}
          opacity="0.8"
          className="transition-all duration-200"
        />

        {/* Tip */}
        <polygon
          points="26,142 34,142 31,175 29,175"
          fill="#d4d4d4"
          stroke="#9ca3af"
          strokeWidth="1"
        />

        {/* Tip solution */}
        {volume > 0 && (
          <polygon
            points="27,142 33,142 31,172 29,172"
            fill={solutionColor}
            opacity="0.8"
          />
        )}

        {/* Forming drop at tip */}
        {isHolding && volume > 0 && (
          <ellipse
            cx="30"
            cy="177"
            rx="3"
            ry="4"
            fill={solutionColor}
            className="animate-pulse"
          />
        )}

        {/* Volume marks on stem */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((frac, i) => (
          <g key={i}>
            <line
              x1="35"
              y1={142 - frac * 100}
              x2="40"
              y2={142 - frac * 100}
              stroke="#6b7280"
              strokeWidth="1"
            />
            <text
              x="42"
              y={142 - frac * 100 + 3}
              fontSize="8"
              fill="#6b7280"
            >
              {(frac * maxVolume).toFixed(1)}
            </text>
          </g>
        ))}
      </svg>

      {/* Animated drops */}
      {drops.map(drop => {
        const elapsed = Date.now() - drop.startTime;
        const progress = Math.min(1, elapsed / 1000);
        const y = drop.y + progress * 100;
        const opacity = 1 - progress;
        const scale = 1 - progress * 0.3;

        return (
          <div
            key={drop.id}
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: y,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity
            }}
          >
            <div
              className="w-2 h-3 rounded-full"
              style={{ backgroundColor: solutionColor }}
            />
          </div>
        );
      })}

      {/* Volume display */}
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white rounded px-1 py-0.5 text-xs font-semibold shadow border border-gray-200">
        {volume.toFixed(2)} mL
      </div>

      {/* Label */}
      {label && (
        <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-600">
          {label}
        </div>
      )}

      {/* Instructions */}
      {enabled && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
          {isHolding ? 'Slepptu til að hætta' : 'Haltu til að dreypa'}
        </div>
      )}
    </div>
  );
}

export default Pipette;
