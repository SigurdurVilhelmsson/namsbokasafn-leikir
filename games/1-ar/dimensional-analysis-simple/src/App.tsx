import { useState, useEffect } from 'react';
import { TutorialModule } from './components/TutorialModule';
import { SandboxPlayground } from './components/SandboxPlayground';
import { ConceptCheck } from './components/ConceptCheck';
import { ReferenceLibrary } from './components/ReferenceLibrary';
import { ProgressDisplay } from './components/ProgressDisplay';

type Module = 'tutorial' | 'sandbox' | 'concepts' | 'library' | 'progress';

interface ChecklistItem {
  text: string;
  checked: boolean;
}

interface Badge {
  name: string;
  icon: string;
  earned: boolean;
  requirement?: string;
  count?: number;
}

interface Stats {
  conversionsExplored: number;
  pathsTried: number;
  timeSpent: number;
}

function App() {
  const [currentModule, setCurrentModule] = useState<Module>('tutorial');
  const [stats, setStats] = useState<Stats>({
    conversionsExplored: 0,
    pathsTried: 0,
    timeSpent: 0
  });
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { text: 'Ég skil af hverju umbreytingarstuðlar jafngilda 1', checked: false },
    { text: 'Ég skil hvernig einingar strikast út', checked: false },
    { text: 'Ég get valið rétta stefnu stuðla', checked: false },
    { text: 'Ég get keðjað saman marga stuðla', checked: false }
  ]);
  const [badges, setBadges] = useState<Badge[]>([
    { name: 'Byrjandi', icon: '🌱', earned: true },
    { name: 'Könnuður', icon: '🔍', earned: false, requirement: 'conversionsExplored', count: 10 },
    { name: 'Tilraunagjarn', icon: '🧪', earned: false, requirement: 'pathsTried', count: 20 },
    { name: 'Áhugasamur', icon: '⭐', earned: false, requirement: 'timeSpent', count: 30 }
  ]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dimensionalAnalysisProgress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.stats) setStats(data.stats);
        if (data.checklist) setChecklist(data.checklist);
        if (data.badges) setBadges(data.badges);
      } catch (e) {
        console.error('Failed to load progress:', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('dimensionalAnalysisProgress', JSON.stringify({
      stats,
      checklist,
      badges
    }));
  }, [stats, checklist, badges]);

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({ ...prev, timeSpent: prev.timeSpent + 1 }));
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, []);

  // Update badges based on stats
  useEffect(() => {
    setBadges(prev => prev.map(badge => {
      if (badge.requirement && badge.count && stats[badge.requirement as keyof Stats] >= badge.count) {
        return { ...badge, earned: true };
      }
      return badge;
    }));
  }, [stats]);

  const updateStats = (key: keyof Stats) => {
    setStats(prev => ({
      ...prev,
      [key]: prev[key] + 1
    }));
  };

  const toggleChecklistItem = (index: number) => {
    setChecklist(prev => prev.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    ));
  };

  const resetProgress = () => {
    if (confirm('Ertu viss um að þú viljir núllstilla alla framvindu?')) {
      setStats({
        conversionsExplored: 0,
        pathsTried: 0,
        timeSpent: 0
      });
      setChecklist(checklist.map(item => ({ ...item, checked: false })));
      setBadges(badges.map((badge, i) => ({ ...badge, earned: i === 0 })));
      localStorage.removeItem('dimensionalAnalysisProgress');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold">Einingagreining - Æfingasvæði</h1>
          <p className="text-sm md:text-base opacity-90 mt-2">
            Kannaðu og lærðu einingagreiningu í afslöppuðu umhverfi
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-4">
            <button
              onClick={() => setCurrentModule('tutorial')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentModule === 'tutorial'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Kynning
            </button>
            <button
              onClick={() => setCurrentModule('sandbox')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentModule === 'sandbox'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Leiksvæði
            </button>
            <button
              onClick={() => setCurrentModule('concepts')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentModule === 'concepts'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Skilningsspurningar
            </button>
            <button
              onClick={() => setCurrentModule('library')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentModule === 'library'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Uppflettirit
            </button>
            <button
              onClick={() => setCurrentModule('progress')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentModule === 'progress'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mín framvinda
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="py-8">
        {currentModule === 'tutorial' && <TutorialModule />}
        {currentModule === 'sandbox' && <SandboxPlayground onUpdateStats={updateStats} />}
        {currentModule === 'concepts' && <ConceptCheck />}
        {currentModule === 'library' && <ReferenceLibrary />}
        {currentModule === 'progress' && (
          <ProgressDisplay
            stats={stats}
            checklist={checklist}
            onChecklistToggle={toggleChecklistItem}
            badges={badges}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm opacity-75 mb-2">
            Einingagreining - Æfingasvæði | Kvennaskólinn
          </p>
          <button
            onClick={resetProgress}
            className="text-xs text-gray-400 hover:text-white transition-colors underline"
          >
            Núllstilla alla framvindu
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
