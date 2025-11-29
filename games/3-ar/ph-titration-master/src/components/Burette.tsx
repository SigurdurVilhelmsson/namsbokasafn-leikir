import React from 'react';

interface BuretteProps {
  volumeAdded: number;
  maxVolume?: number;
  isAnimating?: boolean;
}

/**
 * Burette component - displays titrant delivery system
 */
export const Burette: React.FC<BuretteProps> = ({
  volumeAdded,
  maxVolume = 60,
  isAnimating = false
}) => {
  const fillPercentage = Math.min((volumeAdded / maxVolume) * 100, 100);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Burette container */}
        <div
          className="relative w-12 h-[500px] rounded-t-lg rounded-b-sm border-4 border-indigo-700"
          style={{
            background: 'linear-gradient(to bottom, #e0e7ff 0%, #c7d2fe 100%)',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Liquid level */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-b transition-all duration-300"
            style={{
              height: `${fillPercentage}%`,
              background: 'linear-gradient(to bottom, #3b82f6, #1e40af)',
            }}
          />

          {/* Dripping animation */}
          {isAnimating && (
            <div
              className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500 animate-drip"
            />
          )}

          {/* Volume scale marks */}
          <div className="absolute left-[-40px] top-2 bottom-2 flex flex-col justify-between text-xs font-bold text-indigo-700">
            {[0, 10, 20, 30, 40, 50, 60].reverse().map((vol) => (
              <div key={vol} className="relative">
                <span>{vol}</span>
                <div className="absolute left-full top-1/2 w-2 h-0.5 bg-indigo-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Burette tip */}
        <div
          className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '15px solid #4338ca'
          }}
        />

        {/* Stopcock */}
        <div
          className="absolute bottom-[-8px] right-[-20px] w-8 h-3 rounded-md border-2 border-indigo-900"
          style={{
            background: 'linear-gradient(to right, #6366f1, #4338ca)'
          }}
        />
      </div>

      {/* Volume display */}
      <div className="mt-6 bg-indigo-100 px-4 py-2 rounded-lg border-2 border-indigo-300">
        <p className="text-sm font-bold text-indigo-900">
          Rúmmál bætt við: <span className="text-lg">{volumeAdded.toFixed(2)}</span> mL
        </p>
      </div>
    </div>
  );
};
