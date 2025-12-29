import { useState, useEffect, useRef } from 'react';
import { TITRATION_TYPES, WEAK_ACIDS, WEAK_BASES } from './data';
import {
  getUniversalIndicatorColor,
  getPHDisplayColor,
  calculateStrongStrongPH,
  calculateWeakStrongPH,
  calculateStrongBaseStrongAcidPH,
  calculateWeakBaseStrongAcidPH
} from './utils/ph-calculations';
import type { TitrationType, TitrationConfig, DataPoint } from './types';
import { useAchievements } from '@shared/hooks/useAchievements';
import { AchievementsButton, AchievementsPanel } from '@shared/components/AchievementsPanel';
import { AchievementNotificationsContainer } from '@shared/components/AchievementNotificationPopup';
import type { PlayerAchievements } from '@shared/types/achievement.types';

type Screen = 'menu' | 'setup' | 'titration';

function App() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [selectedType, setSelectedType] = useState<TitrationType | null>(null);
  const [titrationConfig, setTitrationConfig] = useState<TitrationConfig | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);

  // Achievement system
  const {
    achievements,
    allAchievements,
    notifications,
    trackCorrectAnswer,
    trackIncorrectAnswer,
    dismissNotification,
    resetAll: resetAchievements,
  } = useAchievements({ gameId: 'ph-titration-practice' });

  const handleTypeSelect = (typeId: TitrationType) => {
    setSelectedType(typeId);
    setScreen('setup');
  };

  const handleStartTitration = (config: TitrationConfig) => {
    setTitrationConfig(config);
    setScreen('titration');
  };

  const handleBackToMenu = () => {
    setScreen('menu');
    setSelectedType(null);
    setTitrationConfig(null);
  };

  const handleBackToSetup = () => {
    setScreen('setup');
    setTitrationConfig(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {screen === 'menu' && (
        <MainMenu
          onSelectType={handleTypeSelect}
          achievements={achievements}
          onShowAchievements={() => setShowAchievements(true)}
        />
      )}
      {screen === 'setup' && selectedType && (
        <SetupScreen
          type={TITRATION_TYPES[selectedType]}
          onStart={handleStartTitration}
          onBack={handleBackToMenu}
        />
      )}
      {screen === 'titration' && titrationConfig && (
        <TitrationScreen
          config={titrationConfig}
          onBack={handleBackToSetup}
          onMenu={handleBackToMenu}
          onCorrectAnswer={trackCorrectAnswer}
          onIncorrectAnswer={trackIncorrectAnswer}
        />
      )}

      {/* Achievements Panel Modal */}
      {showAchievements && (
        <AchievementsPanel
          achievements={achievements}
          allAchievements={allAchievements}
          onClose={() => setShowAchievements(false)}
          onReset={resetAchievements}
        />
      )}

      {/* Achievement Notifications */}
      <AchievementNotificationsContainer
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </div>
  );
}

// Main Menu Component
function MainMenu({
  onSelectType,
  achievements,
  onShowAchievements
}: {
  onSelectType: (typeId: TitrationType) => void;
  achievements: PlayerAchievements;
  onShowAchievements: () => void;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-start mb-8">
        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Títrun - Æfingabúðir
          </h1>
          <p className="text-xl text-gray-600">
            Veldu tegund títrunar til að æfa
          </p>
        </div>
        <AchievementsButton
          achievements={achievements}
          onClick={onShowAchievements}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Object.values(TITRATION_TYPES).map((type) => (
          <div
            key={type.id}
            onClick={() => onSelectType(type.id)}
            className="titration-card bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 hover:border-orange-500"
          >
            <div className="text-5xl mb-4">{type.icon}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {type.name}
            </h2>
            <p className="text-lg text-gray-600 mb-3">
              <strong>Dæmi:</strong> {type.example}
            </p>
            <p className="text-gray-700">{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Setup Screen Component
function SetupScreen({
  type,
  onStart,
  onBack
}: {
  type: typeof TITRATION_TYPES[keyof typeof TITRATION_TYPES];
  onStart: (config: TitrationConfig) => void;
  onBack: () => void;
}) {
  const [analyteVolume, setAnalyteVolume] = useState(25.0);
  const [analyteMolarity, setAnalyteMolarity] = useState(0.100);
  const [titrantMolarity, setTitrantMolarity] = useState(0.100);
  const [kaKb, setKaKb] = useState<number>(type.defaultKa || type.defaultKb || 1.8e-5);
  const [preset, setPreset] = useState('typical');

  const isWeakAcid = type.id === 'weak-acid-strong-base';
  const isWeakBase = type.id === 'weak-base-strong-acid';

  const handlePresetChange = (presetValue: string) => {
    setPreset(presetValue);
    if (presetValue === 'typical') {
      setAnalyteVolume(25.0);
      setAnalyteMolarity(0.100);
      setTitrantMolarity(0.100);
    } else if (presetValue === 'dilute') {
      setAnalyteVolume(25.0);
      setAnalyteMolarity(0.050);
      setTitrantMolarity(0.050);
    } else if (presetValue === 'concentrated') {
      setAnalyteVolume(25.0);
      setAnalyteMolarity(0.200);
      setTitrantMolarity(0.200);
    }
  };

  const handleStart = () => {
    const config: TitrationConfig = {
      type: type.id,
      typeName: type.name,
      analyteVolume: parseFloat(analyteVolume.toString()),
      analyteMolarity: parseFloat(analyteMolarity.toString()),
      titrantMolarity: parseFloat(titrantMolarity.toString()),
      analyteFormula: type.defaultAnalyte.formula,
      analyteName: type.defaultAnalyte.name,
      titrantFormula: type.defaultTitrant.formula,
      titrantName: type.defaultTitrant.name,
      kaKb: kaKb,
      expectedEquivPH: type.expectedEquivPH
    };
    onStart(config);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={onBack}
        className="mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Til baka á valmynd
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {type.name}
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Forstilling:
          </label>
          <select
            value={preset}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="typical">Dæmigerð uppsetning</option>
            <option value="dilute">Þynnt lausn (0.050 M)</option>
            <option value="concentrated">Sterk lausn (0.200 M)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div className="border-2 border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              {type.analyteLabel} í keiluflösku:
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rúmmál (mL):
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={analyteVolume}
                  onChange={(e) => setAnalyteVolume(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Styrkur (M):
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={analyteMolarity}
                  onChange={(e) => setAnalyteMolarity(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              {type.titrantLabel} í búrettu:
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Styrkur (M):
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={titrantMolarity}
                  onChange={(e) => setTitrantMolarity(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        {(isWeakAcid || isWeakBase) && (
          <div className="mb-6 border-2 border-orange-200 bg-orange-50 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isWeakAcid ? 'Ka gildi:' : 'Kb gildi:'}
            </label>
            <select
              value={kaKb}
              onChange={(e) => setKaKb(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              {isWeakAcid && WEAK_ACIDS.map((acid, idx) => (
                <option key={idx} value={acid.Ka}>
                  {acid.name} (Ka = {acid.Ka.toExponential(2)}, pKa = {acid.pKa})
                </option>
              ))}
              {isWeakBase && WEAK_BASES.map((base, idx) => (
                <option key={idx} value={base.Kb}>
                  {base.name} (Kb = {base.Kb.toExponential(2)}, pKb = {base.pKb})
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleStart}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          style={{ backgroundColor: '#f36b22' }}
        >
          Hefja títrun →
        </button>
      </div>
    </div>
  );
}

// Titration Screen Component (continuation in next message due to size)
function TitrationScreen({
  config,
  onBack,
  onMenu,
  onCorrectAnswer,
  onIncorrectAnswer
}: {
  config: TitrationConfig;
  onBack: () => void;
  onMenu: () => void;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
}) {
  const [volumeAdded, setVolumeAdded] = useState(0);
  const [additionCount, setAdditionCount] = useState(0);
  const [currentPH, setCurrentPH] = useState(0);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [showHelperLines, setShowHelperLines] = useState(true);
  const [showEquivNotification, setShowEquivNotification] = useState(false);
  const [equivalenceAchievementTracked, setEquivalenceAchievementTracked] = useState(false);
  const [dripping, setDripping] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const equivalenceVolume = (config.analyteVolume * config.analyteMolarity) / config.titrantMolarity;
  const maxVolume = equivalenceVolume * 1.3;

  const calculatePH = (volume: number): number => {
    switch (config.type) {
      case 'strong-acid-strong-base':
        return calculateStrongStrongPH(
          config.analyteVolume,
          config.analyteMolarity,
          volume,
          config.titrantMolarity
        );
      case 'weak-acid-strong-base':
        return calculateWeakStrongPH(
          config.analyteVolume,
          config.analyteMolarity,
          config.kaKb!,
          volume,
          config.titrantMolarity
        );
      case 'strong-base-strong-acid':
        return calculateStrongBaseStrongAcidPH(
          config.analyteVolume,
          config.analyteMolarity,
          volume,
          config.titrantMolarity
        );
      case 'weak-base-strong-acid':
        return calculateWeakBaseStrongAcidPH(
          config.analyteVolume,
          config.analyteMolarity,
          config.kaKb!,
          volume,
          config.titrantMolarity
        );
      default:
        return 7.0;
    }
  };

  useEffect(() => {
    const pH = calculatePH(volumeAdded);
    setCurrentPH(pH);
    setDataPoints(prev => [...prev, { volume: volumeAdded, pH }]);
  }, [volumeAdded]);

  useEffect(() => {
    drawCurve();
  }, [dataPoints, showHelperLines]);

  useEffect(() => {
    if (volumeAdded > equivalenceVolume && !showEquivNotification) {
      setShowEquivNotification(true);

      // Track achievement when student reaches equivalence point
      if (!equivalenceAchievementTracked) {
        // Calculate how close the student got to the exact equivalence volume
        // If they stopped within 0.5 mL of equivalence, consider it "correct"
        const volumeError = Math.abs(volumeAdded - equivalenceVolume);
        if (volumeError <= 0.5) {
          onCorrectAnswer();
        } else if (volumeError > 2.0) {
          // If they overshot by more than 2 mL, consider it a learning moment
          onIncorrectAnswer();
        }
        setEquivalenceAchievementTracked(true);
      }
    }
  }, [volumeAdded, equivalenceVolume, showEquivNotification, equivalenceAchievementTracked, onCorrectAnswer, onIncorrectAnswer]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (e.shiftKey) {
          addTitrant(1.0);
        } else if (e.ctrlKey || e.metaKey) {
          addTitrant(5.0);
        } else {
          addTitrant(0.1);
        }
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      } else if (e.key === 'g' || e.key === 'G') {
        setShowHelperLines(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [volumeAdded]);

  const addTitrant = (amount: number) => {
    setDripping(true);
    setTimeout(() => setDripping(false), 800);
    setVolumeAdded(prev => Math.min(prev + amount, maxVolume));
    setAdditionCount(prev => prev + 1);
  };

  const handleReset = () => {
    setVolumeAdded(0);
    setAdditionCount(0);
    setCurrentPH(0);
    setDataPoints([]);
    setShowEquivNotification(false);
    setEquivalenceAchievementTracked(false);
  };

  const exportData = () => {
    const date = new Date().toLocaleDateString('is-IS');
    let csv = `Títrun: ${config.typeName}\n`;
    csv += `Dagsetning: ${date}\n`;
    csv += `Sýni: ${config.analyteFormula}, ${config.analyteVolume} mL, ${config.analyteMolarity} M\n`;
    csv += `Hvarfefni: ${config.titrantFormula}, ${config.titrantMolarity} M\n`;
    csv += `Rúmmál (mL),pH\n`;
    dataPoints.forEach(point => {
      csv += `${point.volume.toFixed(2)},${point.pH.toFixed(2)}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `titrun_${config.type}_${Date.now()}.csv`;
    a.click();
  };

  const drawCurve = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(margin.left, margin.top, plotWidth, plotHeight);

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    for (let pH = 0; pH <= 14; pH += 2) {
      const y = margin.top + plotHeight - (pH / 14) * plotHeight;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + plotWidth, y);
      ctx.stroke();
    }

    for (let i = 0; i <= 10; i++) {
      const vol = (maxVolume / 10) * i;
      const x = margin.left + (vol / maxVolume) * plotWidth;
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, margin.top + plotHeight);
      ctx.stroke();
    }

    if (showHelperLines) {
      ctx.strokeStyle = '#9ca3af';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      const y7 = margin.top + plotHeight - (7 / 14) * plotHeight;
      ctx.beginPath();
      ctx.moveTo(margin.left, y7);
      ctx.lineTo(margin.left + plotWidth, y7);
      ctx.stroke();
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px sans-serif';
      ctx.fillText('pH 7 - hlutleysi', margin.left + 5, y7 - 5);

      const xEquiv = margin.left + (equivalenceVolume / maxVolume) * plotWidth;
      ctx.beginPath();
      ctx.moveTo(xEquiv, margin.top);
      ctx.lineTo(xEquiv, margin.top + plotHeight);
      ctx.stroke();
      ctx.fillText('Jafngildi', xEquiv + 5, margin.top + 15);

      if (config.type === 'weak-acid-strong-base' || config.type === 'weak-base-strong-acid') {
        const pKa = config.type === 'weak-acid-strong-base'
          ? -Math.log10(config.kaKb!)
          : 14 + Math.log10(config.kaKb!);
        const yPKa = margin.top + plotHeight - (pKa / 14) * plotHeight;
        ctx.strokeStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(margin.left, yPKa);
        ctx.lineTo(margin.left + plotWidth, yPKa);
        ctx.stroke();
        ctx.fillStyle = '#f59e0b';
        ctx.fillText(`pKa = ${pKa.toFixed(2)}`, margin.left + 5, yPKa - 5);
      }

      ctx.setLineDash([]);
    }

    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + plotHeight);
    ctx.lineTo(margin.left + plotWidth, margin.top + plotHeight);
    ctx.stroke();

    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px sans-serif';

    ctx.save();
    ctx.translate(20, margin.top + plotHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('pH', 0, 0);
    ctx.restore();

    ctx.textAlign = 'center';
    ctx.fillText('Rúmmál bætt við (mL)', margin.left + plotWidth / 2, height - 10);

    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';

    for (let pH = 0; pH <= 14; pH += 2) {
      const y = margin.top + plotHeight - (pH / 14) * plotHeight;
      ctx.fillText(pH.toString(), margin.left - 10, y + 4);
    }

    ctx.textAlign = 'center';
    for (let i = 0; i <= 10; i++) {
      const vol = (maxVolume / 10) * i;
      const x = margin.left + (vol / maxVolume) * plotWidth;
      ctx.fillText(vol.toFixed(1), x, margin.top + plotHeight + 20);
    }

    if (dataPoints.length > 1) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.beginPath();

      dataPoints.forEach((point, index) => {
        const x = margin.left + (point.volume / maxVolume) * plotWidth;
        const y = margin.top + plotHeight - (point.pH / 14) * plotHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      if (dataPoints.length > 0) {
        const lastPoint = dataPoints[dataPoints.length - 1];
        const x = margin.left + (lastPoint.volume / maxVolume) * plotWidth;
        const y = margin.top + plotHeight - (lastPoint.pH / 14) * plotHeight;

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  };

  const solutionColor = getUniversalIndicatorColor(currentPH);
  const phDisplayColor = getPHDisplayColor(currentPH);
  const solutionHeight = ((config.analyteVolume + volumeAdded) / (config.analyteVolume + maxVolume)) * 100;

  const pKaValue = config.type === 'weak-acid-strong-base'
    ? -Math.log10(config.kaKb!)
    : config.type === 'weak-base-strong-acid'
    ? 14 + Math.log10(config.kaKb!)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Til baka á uppsetningu
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {config.typeName}
          </h1>
          <button
            onClick={onMenu}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Aðalvalmynd
          </button>
        </div>

        {showEquivNotification && (
          <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
            <p className="font-medium">
              ✓ Þú hefur náð jafngildispunkti! Haltu áfram til að sjá hvað gerist eftir hann.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-white rounded-lg shadow-lg p-6">
            <div className="lab-container">
              <div className="titration-setup" style={{ marginBottom: '20px' }}>
                <div className="burette">
                  <div className="burette-scale">
                    <span>0</span>
                    <span>10</span>
                    <span>20</span>
                    <span>30</span>
                    <span>40</span>
                    <span>50</span>
                  </div>
                  <div
                    className="burette-liquid"
                    style={{
                      height: `${Math.max(0, 100 - (volumeAdded / 50) * 100)}%`
                    }}
                  />
                  <div className="burette-tip" />
                  <div className="burette-stopcock" />
                </div>

                {dripping && (
                  <div
                    className="drip"
                    style={{
                      left: '50%',
                      top: '415px',
                      transform: 'translateX(-50%)'
                    }}
                  />
                )}
              </div>

              <div className="erlenmeyer-flask">
                <div className="flask-neck" />
                <div className="flask-body">
                  <div
                    className="flask-solution"
                    style={{
                      height: `${Math.min(solutionHeight, 90)}%`,
                      background: solutionColor,
                      opacity: 0.7
                    }}
                  />
                  <div className="stir-bar" />
                </div>
                <div className="text-center mt-2 text-sm text-gray-600">
                  {config.analyteFormula} ({config.analyteVolume} mL)
                </div>
              </div>

              <div className="ph-meter mt-6">
                <div className="ph-display">
                  <div
                    className="ph-value"
                    style={{ color: phDisplayColor }}
                  >
                    {currentPH.toFixed(2)}
                  </div>
                  <div className="ph-label">pH gildi</div>
                </div>
                <div className="ph-scale-indicator">
                  <div
                    className="ph-marker"
                    style={{ left: `${(currentPH / 14) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Títrunarferill
              </h3>
              <canvas
                ref={canvasRef}
                width={500}
                height={400}
                className="curve-canvas w-full"
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Bæta við hvarfefni
              </h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  onClick={() => addTitrant(5.0)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded"
                >
                  +5.0 mL
                </button>
                <button
                  onClick={() => addTitrant(1.0)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded"
                >
                  +1.0 mL
                </button>
                <button
                  onClick={() => addTitrant(0.1)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded"
                >
                  +0.1 mL
                </button>
              </div>

              <h3 className="text-lg font-semibold mb-3 mt-4 text-gray-800">
                Aðgerðir
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleReset}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  ↺ Endurstilla
                </button>
                <button
                  onClick={exportData}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  disabled={dataPoints.length === 0}
                >
                  📊 Sækja gögn
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Núverandi gildi
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Rúmmál bætt við:</span>
                  <span className="font-bold">{volumeAdded.toFixed(1)} mL</span>
                </div>
                <div className="flex justify-between">
                  <span>Núverandi pH:</span>
                  <span className="font-bold">{currentPH.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fjöldi skammta:</span>
                  <span className="font-bold">{additionCount}</span>
                </div>
              </div>
            </div>

            {(config.type === 'weak-acid-strong-base' || config.type === 'weak-base-strong-acid') && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-blue-900">
                  ℹ️ Upplýsingar um þessa títrun
                </h3>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• {config.type === 'weak-acid-strong-base' ? 'pKa' : 'pKa'} = {pKaValue?.toFixed(2)}</li>
                  <li>• Áætlaður jafngildispunktur: {equivalenceVolume.toFixed(1)} mL</li>
                  <li>• Áætlað pH við jafngildispunkt: {config.expectedEquivPH.toFixed(2)}</li>
                  <li>• Miðpunktur: {(equivalenceVolume / 2).toFixed(1)} mL (pH ≈ pKa)</li>
                </ul>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-lg p-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showHelperLines}
                  onChange={(e) => setShowHelperLines(e.target.checked)}
                  className="mr-2 h-5 w-5"
                />
                <span className="text-gray-700">☑ Sýna hjálparlínur</span>
              </label>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <h4 className="font-semibold mb-2">Flýtilyklar:</h4>
              <ul className="space-y-1">
                <li>• Bil / ↑: +0.1 mL</li>
                <li>• Shift + Bil: +1.0 mL</li>
                <li>• Ctrl + Bil: +5.0 mL</li>
                <li>• R: Endurstilla</li>
                <li>• G: Víxla hjálparlínum</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
