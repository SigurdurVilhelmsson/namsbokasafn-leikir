import { useState, useMemo } from 'react';
import { ParticleSimulation, PHYSICS_PRESETS } from '@shared/components';
import type { ParticleType, ReactionConfig } from '@shared/components';

interface CollisionDemoProps {
  temperature?: number;
  activationEnergy?: number;
  showLabels?: boolean;
  className?: string;
}

/**
 * CollisionDemo - Interactive visualization of collision theory for kinetics
 *
 * Shows:
 * - Particles moving at speeds based on temperature
 * - Collisions with energy tracking
 * - Successful reactions when energy >= activation energy
 * - Color-coded particles (reactants vs products)
 */
export function CollisionDemo({
  temperature = 300,
  activationEnergy = 50,
  showLabels = true,
  className = ''
}: CollisionDemoProps) {
  const [reactionCount, setReactionCount] = useState(0);

  // Particle types for reactants and products
  const particleTypes: ParticleType[] = useMemo(() => [
    {
      id: 'A',
      color: '#f97316', // Orange - reactant A
      radius: 6,
      label: 'A',
      strokeColor: '#c2410c',
      mass: 1
    },
    {
      id: 'B',
      color: '#3b82f6', // Blue - reactant B
      radius: 6,
      label: 'B',
      strokeColor: '#1d4ed8',
      mass: 1
    },
    {
      id: 'AB',
      color: '#22c55e', // Green - product
      radius: 8,
      label: 'AB',
      strokeColor: '#15803d',
      mass: 2
    }
  ], []);

  // Reaction configuration: A + B → AB
  const reactions: ReactionConfig[] = useMemo(() => [{
    reactants: ['A', 'B'],
    products: ['AB'],
    activationEnergy: activationEnergy,
    probability: 0.7,
    onReaction: () => {
      setReactionCount(prev => prev + 1);
    }
  }], [activationEnergy]);

  // Calculate effective activation energy region
  const energyThresholdY = useMemo(() => {
    // Higher activation energy = smaller "hot zone" at top
    const baseHeight = 200;
    const threshold = Math.max(10, Math.min(150, (activationEnergy / 100) * baseHeight));
    return threshold;
  }, [activationEnergy]);


  return (
    <div className={`bg-gray-900 rounded-xl p-4 ${className}`}>
      <div className="mb-3 flex justify-between items-center">
        <h3 className="text-white font-semibold text-sm">Árekstrarhermun</h3>
        <div className="flex gap-4 text-xs">
          <span className="text-green-400">
            Hvörf: {reactionCount}
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Activation energy region indicator */}
        <div
          className="absolute top-0 left-0 right-0 bg-red-500/10 border-b-2 border-red-500/30 z-10 pointer-events-none"
          style={{ height: `${(energyThresholdY / 200) * 100}%` }}
        >
          {showLabels && (
            <div className="absolute bottom-1 right-2 text-xs text-red-400/70">
              Ea = {activationEnergy} kJ/mol
            </div>
          )}
        </div>

        <ParticleSimulation
          container={{
            width: 350,
            height: 200,
            backgroundColor: '#0f172a',
            borderColor: '#374151',
            borderWidth: 2
          }}
          particleTypes={particleTypes}
          particles={[
            { typeId: 'A', count: 15 },
            { typeId: 'B', count: 15 }
          ]}
          physics={{
            ...PHYSICS_PRESETS.kinetics,
            speedMultiplier: 1.2,
            enableCollisions: true,
            activationEnergy: activationEnergy
          }}
          reactions={reactions}
          temperature={temperature}
          running={true}
          showLabels={showLabels}
          ariaLabel="Collision theory simulation showing particles reacting when they have sufficient energy"
        />
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span className="text-gray-300">Hvarfefni A</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-gray-300">Hvarfefni B</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-gray-300">Afurð AB</span>
        </div>
      </div>

      {/* Info text */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        Agnir þurfa næga orku (E ≥ Ea) og rétta stefnu til að hvarfast
      </div>
    </div>
  );
}
