import { useState, useEffect } from 'react';

interface Liquid {
  id: string;
  name: string;
  formula: string;
  surfaceTension: number; // mN/m at 20°C
  imfType: 'london' | 'dipole' | 'hydrogen';
  imfDescription: string;
  color: string;
  moleculeColor: string;
}

const LIQUIDS: Liquid[] = [
  {
    id: 'water',
    name: 'Vatn',
    formula: 'H₂O',
    surfaceTension: 72.8,
    imfType: 'hydrogen',
    imfDescription: 'Sterk vetnistengi milli sameinda',
    color: '#3b82f6',
    moleculeColor: '#60a5fa',
  },
  {
    id: 'ethanol',
    name: 'Etanól',
    formula: 'C₂H₅OH',
    surfaceTension: 22.1,
    imfType: 'hydrogen',
    imfDescription: 'Vetnistengi (1 O-H hópur)',
    color: '#8b5cf6',
    moleculeColor: '#a78bfa',
  },
  {
    id: 'hexane',
    name: 'Hexan',
    formula: 'C₆H₁₄',
    surfaceTension: 18.4,
    imfType: 'london',
    imfDescription: 'Aðeins London dreifikraftar',
    color: '#f59e0b',
    moleculeColor: '#fbbf24',
  },
  {
    id: 'mercury',
    name: 'Kvikasilfur',
    formula: 'Hg',
    surfaceTension: 485.5,
    imfType: 'london', // metallic bonding, but simplified
    imfDescription: 'Málmtengi (mjög sterk)',
    color: '#6b7280',
    moleculeColor: '#9ca3af',
  },
];

interface SurfaceTensionDemoProps {
  /** Compact display mode */
  compact?: boolean;
  /** Enable animations */
  animate?: boolean;
  /** Show interactive mode */
  interactive?: boolean;
}

/**
 * SurfaceTensionDemo - Interactive demonstration of surface tension
 *
 * Shows how IMF strength affects surface tension through:
 * - Molecular-level visualization of unbalanced forces at surface
 * - Droplet formation comparison
 * - Water strider/paperclip floating demonstration
 */
export function SurfaceTensionDemo({
  compact = false,
  animate = true,
  interactive = true,
}: SurfaceTensionDemoProps) {
  const [selectedLiquid, setSelectedLiquid] = useState<Liquid>(LIQUIDS[0]);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showDemo, setShowDemo] = useState<'molecules' | 'droplet' | 'strider'>('molecules');
  const [objectFloating, setObjectFloating] = useState(true);

  // Animation loop
  useEffect(() => {
    if (!animate) return;

    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, [animate]);

  // Check if object floats based on surface tension
  useEffect(() => {
    // Simplified: objects float on water and mercury, sink in ethanol and hexane
    setObjectFloating(selectedLiquid.surfaceTension > 50);
  }, [selectedLiquid]);

  const svgWidth = compact ? 300 : 400;
  const svgHeight = compact ? 220 : 280;

  // Generate molecule positions for bulk and surface
  const generateMolecules = () => {
    const molecules: { x: number; y: number; isSurface: boolean }[] = [];

    // Bulk molecules (lower rows)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 6; col++) {
        molecules.push({
          x: 60 + col * 50 + (row % 2) * 25,
          y: 160 + row * 35,
          isSurface: false,
        });
      }
    }

    // Surface molecules (top row)
    for (let col = 0; col < 5; col++) {
      molecules.push({
        x: 85 + col * 50,
        y: 125,
        isSurface: true,
      });
    }

    return molecules;
  };

  const molecules = generateMolecules();

  // Oscillation for molecules
  const getOscillation = (baseOffset: number) => {
    const phase = (animationPhase + baseOffset) % 100;
    return Math.sin((phase / 100) * Math.PI * 2) * 2;
  };

  // Surface tension determines droplet shape
  const getDropletPath = (tension: number) => {
    // Higher tension = more spherical droplet
    const sphericity = Math.min(1, tension / 100);
    const width = 60 - sphericity * 20;
    const height = 40 + sphericity * 30;

    return `M 200 ${180 - height}
            Q ${200 - width} ${180 - height * 0.5} ${200 - width * 0.8} 180
            Q 200 ${180 + height * 0.3} ${200 + width * 0.8} 180
            Q ${200 + width} ${180 - height * 0.5} 200 ${180 - height}
            Z`;
  };

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-bold text-cyan-800 flex items-center gap-2 ${compact ? 'text-base' : 'text-lg'}`}>
          <span>💧</span> Yfirborðsspenna
        </h3>
        <div className="text-sm text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full">
          {selectedLiquid.surfaceTension} mN/m
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        Yfirborðsspenna myndast vegna ójafnvægis krafta á sameindum á yfirborði vökva.
      </div>

      {/* Liquid selector */}
      {interactive && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {LIQUIDS.map(liquid => (
            <button
              key={liquid.id}
              onClick={() => setSelectedLiquid(liquid)}
              className={`p-2 rounded-lg border-2 transition-all text-left ${
                selectedLiquid.id === liquid.id
                  ? 'border-cyan-500 bg-white shadow-md'
                  : 'border-gray-200 hover:border-cyan-300 bg-white'
              }`}
            >
              <div className="font-bold text-gray-800 text-sm">{liquid.formula}</div>
              <div className="text-xs text-gray-500">{liquid.name}</div>
              <div className="text-xs font-medium mt-1" style={{ color: liquid.color }}>
                {liquid.surfaceTension} mN/m
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Demo mode selector */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowDemo('molecules')}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            showDemo === 'molecules'
              ? 'bg-cyan-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sameindir
        </button>
        <button
          onClick={() => setShowDemo('droplet')}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            showDemo === 'droplet'
              ? 'bg-cyan-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Dropi
        </button>
        <button
          onClick={() => setShowDemo('strider')}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            showDemo === 'strider'
              ? 'bg-cyan-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Vatnstígull
        </button>
      </div>

      {/* SVG Visualization */}
      <svg
        width="100%"
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMid meet"
        className="bg-white rounded-lg border border-gray-200"
        role="img"
        aria-label={`Yfirborðsspenna sýning: ${selectedLiquid.name}`}
      >
        <defs>
          {/* Gradient for liquid */}
          <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={selectedLiquid.color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={selectedLiquid.color} stopOpacity="0.6" />
          </linearGradient>

          {/* Glow filter for highlighted elements */}
          <filter id="surfaceGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Water strider pattern */}
          <pattern id="striderPattern" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.5" fill="#374151" />
          </pattern>
        </defs>

        {showDemo === 'molecules' && (
          <>
            {/* Air region */}
            <rect x="0" y="0" width={svgWidth} height="100" fill="#f0f9ff" />
            <text x="30" y="30" className="fill-gray-400" style={{ fontSize: '12px' }}>
              Loft
            </text>

            {/* Liquid surface line */}
            <line
              x1="20"
              y1="100"
              x2={svgWidth - 20}
              y2="100"
              stroke={selectedLiquid.color}
              strokeWidth="3"
              strokeDasharray="8,4"
            />
            <text x={svgWidth - 80} y="95" className="fill-gray-500" style={{ fontSize: '10px' }}>
              Yfirborð
            </text>

            {/* Liquid region */}
            <rect x="0" y="100" width={svgWidth} height={svgHeight - 100} fill="url(#liquidGradient)" />
            <text x="30" y={svgHeight - 20} className="fill-gray-500" style={{ fontSize: '12px' }}>
              Vökvi
            </text>

            {/* Molecules with force arrows */}
            {molecules.map((mol, i) => {
              const osc = getOscillation(i * 15);
              const radius = 12;

              return (
                <g key={i}>
                  {/* Molecule */}
                  <circle
                    cx={mol.x + osc}
                    cy={mol.y}
                    r={radius}
                    fill={selectedLiquid.moleculeColor}
                    stroke={mol.isSurface ? '#ef4444' : selectedLiquid.color}
                    strokeWidth={mol.isSurface ? 3 : 1}
                    filter={mol.isSurface ? 'url(#surfaceGlow)' : undefined}
                  />

                  {/* Force arrows for surface molecule */}
                  {mol.isSurface && (
                    <>
                      {/* Downward and sideways forces (from liquid) - strong */}
                      <line
                        x1={mol.x + osc}
                        y1={mol.y + radius}
                        x2={mol.x + osc}
                        y2={mol.y + radius + 20}
                        stroke="#22c55e"
                        strokeWidth="2"
                        markerEnd="url(#arrowGreen)"
                      />
                      <polygon
                        points={`${mol.x + osc},${mol.y + radius + 25} ${mol.x + osc - 5},${mol.y + radius + 18} ${mol.x + osc + 5},${mol.y + radius + 18}`}
                        fill="#22c55e"
                      />

                      {/* Sideways forces */}
                      <line
                        x1={mol.x + osc - radius}
                        y1={mol.y}
                        x2={mol.x + osc - radius - 15}
                        y2={mol.y}
                        stroke="#22c55e"
                        strokeWidth="2"
                      />
                      <polygon
                        points={`${mol.x + osc - radius - 20},${mol.y} ${mol.x + osc - radius - 13},${mol.y - 4} ${mol.x + osc - radius - 13},${mol.y + 4}`}
                        fill="#22c55e"
                      />

                      <line
                        x1={mol.x + osc + radius}
                        y1={mol.y}
                        x2={mol.x + osc + radius + 15}
                        y2={mol.y}
                        stroke="#22c55e"
                        strokeWidth="2"
                      />
                      <polygon
                        points={`${mol.x + osc + radius + 20},${mol.y} ${mol.x + osc + radius + 13},${mol.y - 4} ${mol.x + osc + radius + 13},${mol.y + 4}`}
                        fill="#22c55e"
                      />

                      {/* Upward force (weak - only air) */}
                      <line
                        x1={mol.x + osc}
                        y1={mol.y - radius}
                        x2={mol.x + osc}
                        y2={mol.y - radius - 8}
                        stroke="#fca5a5"
                        strokeWidth="2"
                        strokeDasharray="2,2"
                      />
                    </>
                  )}

                  {/* Force arrows for bulk molecule - balanced */}
                  {!mol.isSurface && i === 8 && (
                    <>
                      {/* All directions - equal forces */}
                      {[0, 90, 180, 270].map(angle => {
                        const rad = (angle * Math.PI) / 180;
                        const x1 = mol.x + osc + Math.cos(rad) * radius;
                        const y1 = mol.y + Math.sin(rad) * radius;
                        const x2 = mol.x + osc + Math.cos(rad) * (radius + 15);
                        const y2 = mol.y + Math.sin(rad) * (radius + 15);
                        const tipX = mol.x + osc + Math.cos(rad) * (radius + 20);
                        const tipY = mol.y + Math.sin(rad) * (radius + 20);

                        return (
                          <g key={angle}>
                            <line
                              x1={x1}
                              y1={y1}
                              x2={x2}
                              y2={y2}
                              stroke="#22c55e"
                              strokeWidth="2"
                            />
                            <circle cx={tipX} cy={tipY} r="3" fill="#22c55e" />
                          </g>
                        );
                      })}
                    </>
                  )}
                </g>
              );
            })}

            {/* Legend */}
            <g transform={`translate(${svgWidth - 140}, 15)`}>
              <rect x="0" y="0" width="130" height="70" rx="5" fill="white" stroke="#e5e7eb" />
              <circle cx="15" cy="20" r="8" fill={selectedLiquid.moleculeColor} stroke={selectedLiquid.color} />
              <text x="30" y="24" className="fill-gray-600" style={{ fontSize: '10px' }}>
                Innri sameind
              </text>
              <circle cx="15" cy="45" r="8" fill={selectedLiquid.moleculeColor} stroke="#ef4444" strokeWidth="2" />
              <text x="30" y="49" className="fill-gray-600" style={{ fontSize: '10px' }}>
                Yfirborðssameind
              </text>
            </g>
          </>
        )}

        {showDemo === 'droplet' && (
          <>
            {/* Surface */}
            <rect x="50" y="180" width={svgWidth - 100} height="10" fill="#e5e7eb" rx="2" />
            <text x={svgWidth / 2} y="210" textAnchor="middle" className="fill-gray-500" style={{ fontSize: '11px' }}>
              Flötur
            </text>

            {/* Droplet shape based on surface tension */}
            <path
              d={getDropletPath(selectedLiquid.surfaceTension)}
              fill={selectedLiquid.color}
              opacity="0.6"
              stroke={selectedLiquid.color}
              strokeWidth="2"
            />

            {/* Contact angle indicator */}
            <text x={svgWidth / 2} y="40" textAnchor="middle" className="fill-gray-700 font-bold" style={{ fontSize: '14px' }}>
              {selectedLiquid.name} - {selectedLiquid.formula}
            </text>

            <text x={svgWidth / 2} y="60" textAnchor="middle" className="fill-gray-500" style={{ fontSize: '11px' }}>
              Yfirborðsspenna: {selectedLiquid.surfaceTension} mN/m
            </text>

            {/* Surface tension indicator scale */}
            <g transform="translate(50, 230)">
              <rect x="0" y="0" width={svgWidth - 100} height="15" rx="4" fill="#e5e7eb" />
              <rect
                x="0"
                y="0"
                width={((selectedLiquid.surfaceTension / 500) * (svgWidth - 100))}
                height="15"
                rx="4"
                fill={selectedLiquid.color}
              />
              <text x="0" y="30" className="fill-gray-500" style={{ fontSize: '9px' }}>
                0
              </text>
              <text x={svgWidth - 110} y="30" className="fill-gray-500" style={{ fontSize: '9px' }}>
                500 mN/m
              </text>
            </g>

            {/* Shape explanation */}
            <text x={svgWidth / 2} y={svgHeight - 10} textAnchor="middle" className="fill-gray-600" style={{ fontSize: '10px' }}>
              {selectedLiquid.surfaceTension > 50
                ? 'Há spenna → kúlulaga dropi'
                : 'Lág spenna → flatari dropi'}
            </text>
          </>
        )}

        {showDemo === 'strider' && (
          <>
            {/* Water surface */}
            <rect x="0" y="120" width={svgWidth} height={svgHeight - 120} fill="url(#liquidGradient)" />

            {/* Surface line with tension effect */}
            <path
              d={objectFloating
                ? `M 0 120
                   Q 100 120 ${svgWidth / 2 - 40} ${120 + (selectedLiquid.surfaceTension > 200 ? 5 : 15)}
                   Q ${svgWidth / 2} ${120 + (selectedLiquid.surfaceTension > 200 ? 8 : 25)} ${svgWidth / 2 + 40} ${120 + (selectedLiquid.surfaceTension > 200 ? 5 : 15)}
                   Q ${svgWidth - 100} 120 ${svgWidth} 120`
                : `M 0 120 L ${svgWidth} 120`}
              fill="none"
              stroke={selectedLiquid.color}
              strokeWidth="3"
            />

            {/* Water strider / object */}
            {objectFloating ? (
              <g transform={`translate(${svgWidth / 2}, ${115 + (selectedLiquid.surfaceTension > 200 ? 5 : 20)})`}>
                {/* Body */}
                <ellipse cx="0" cy="0" rx="25" ry="8" fill="#374151" />
                {/* Legs */}
                {[-35, -20, 20, 35].map((x, i) => (
                  <line
                    key={i}
                    x1={x > 0 ? 20 : -20}
                    y1="0"
                    x2={x}
                    y2="10"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                ))}
                {/* Dimples in water surface */}
                {[-35, -20, 20, 35].map((x, i) => (
                  <ellipse
                    key={i}
                    cx={x}
                    cy="12"
                    rx="8"
                    ry="3"
                    fill="none"
                    stroke={selectedLiquid.color}
                    strokeWidth="1"
                    opacity="0.5"
                  />
                ))}
              </g>
            ) : (
              // Sinking object
              <g transform={`translate(${svgWidth / 2}, ${150 + animationPhase * 0.5})`}>
                <ellipse cx="0" cy="0" rx="20" ry="8" fill="#374151" opacity={0.7} />
                {/* Bubbles */}
                {[...Array(3)].map((_, i) => (
                  <circle
                    key={i}
                    cx={-10 + i * 10}
                    cy={-20 - (animationPhase + i * 20) % 40}
                    r="3"
                    fill="white"
                    opacity={0.5}
                  />
                ))}
              </g>
            )}

            {/* Title and explanation */}
            <text x={svgWidth / 2} y="30" textAnchor="middle" className="fill-gray-700 font-bold" style={{ fontSize: '14px' }}>
              {selectedLiquid.name} ({selectedLiquid.surfaceTension} mN/m)
            </text>

            <text x={svgWidth / 2} y="55" textAnchor="middle" className="fill-gray-600" style={{ fontSize: '11px' }}>
              {objectFloating
                ? 'Yfirborðsspenna heldur skordýri á floti!'
                : 'Of lág spenna - skordýrið sökkur'}
            </text>

            {/* Force diagram when floating */}
            {objectFloating && (
              <g transform={`translate(${svgWidth - 100}, 70)`}>
                <rect x="0" y="0" width="90" height="45" rx="5" fill="white" stroke="#e5e7eb" />
                <text x="45" y="15" textAnchor="middle" className="fill-gray-600" style={{ fontSize: '9px' }}>
                  Kraftajafnvægi
                </text>
                <line x1="45" y1="22" x2="45" y2="32" stroke="#ef4444" strokeWidth="2" />
                <polygon points="45,35 42,30 48,30" fill="#ef4444" />
                <text x="55" y="32" className="fill-red-500" style={{ fontSize: '8px' }}>
                  þyngd
                </text>
                <line x1="35" y1="35" x2="35" y2="25" stroke="#22c55e" strokeWidth="2" />
                <polygon points="35,22 32,27 38,27" fill="#22c55e" />
              </g>
            )}

            {/* Result indicator */}
            <rect
              x={svgWidth / 2 - 60}
              y={svgHeight - 40}
              width="120"
              height="30"
              rx="15"
              fill={objectFloating ? '#dcfce7' : '#fee2e2'}
              stroke={objectFloating ? '#22c55e' : '#ef4444'}
              strokeWidth="2"
            />
            <text
              x={svgWidth / 2}
              y={svgHeight - 20}
              textAnchor="middle"
              className={objectFloating ? 'fill-green-700' : 'fill-red-700'}
              style={{ fontSize: '12px', fontWeight: 'bold' }}
            >
              {objectFloating ? 'Flýtur!' : 'Sökkur'}
            </text>
          </>
        )}
      </svg>

      {/* Explanation panel */}
      <div
        className="mt-4 p-4 rounded-lg"
        style={{ backgroundColor: `${selectedLiquid.color}15`, borderColor: `${selectedLiquid.color}30` }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: selectedLiquid.color }}
          />
          <div className="font-bold text-gray-800">{selectedLiquid.name} ({selectedLiquid.formula})</div>
        </div>
        <div className="text-sm text-gray-700 mb-2">
          <strong>IMF:</strong> {selectedLiquid.imfDescription}
        </div>
        <div className="text-sm text-gray-600">
          {selectedLiquid.surfaceTension > 50 ? (
            <>
              Há yfirborðsspenna vegna sterkra millisameindakrafta.
              Sameindir á yfirborði togast inn á við, sem myndar „húð" sem getur haldið uppi léttum hlutum.
            </>
          ) : (
            <>
              Lág yfirborðsspenna vegna veikra millisameindakrafta.
              Yfirborðið hefur litla „húð" og dropar flatnast út.
            </>
          )}
        </div>
      </div>

      {/* Comparison table */}
      {!compact && (
        <div className="mt-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-gray-600">Efni</th>
                <th className="px-3 py-2 text-left text-gray-600">Yfirborðsspenna</th>
                <th className="px-3 py-2 text-left text-gray-600">IMF</th>
              </tr>
            </thead>
            <tbody>
              {LIQUIDS.map(liquid => (
                <tr
                  key={liquid.id}
                  className={`border-t ${selectedLiquid.id === liquid.id ? 'bg-cyan-50' : ''}`}
                >
                  <td className="px-3 py-2 font-medium">{liquid.formula}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 rounded"
                        style={{
                          width: `${(liquid.surfaceTension / 500) * 100}px`,
                          backgroundColor: liquid.color,
                        }}
                      />
                      <span>{liquid.surfaceTension}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-gray-600 text-xs">{liquid.imfDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Key insight */}
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <div className="text-yellow-700 text-sm font-medium mb-1">Lykilatriði:</div>
        <ul className="text-gray-700 text-sm space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-blue-500">●</span>
            <span>Sterkari IMF → meiri yfirborðsspenna</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">●</span>
            <span>Vetnistengi gefa háa yfirborðsspennu (vatn: 72.8 mN/m)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500">●</span>
            <span>Aðeins London kraftar gefa lága spennu (hexan: 18.4 mN/m)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SurfaceTensionDemo;
