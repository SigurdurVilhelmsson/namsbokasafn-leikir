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

interface ProgressDisplayProps {
  stats: Stats;
  checklist: ChecklistItem[];
  onChecklistToggle: (index: number) => void;
  badges: Badge[];
}

export function ProgressDisplay({ stats, checklist, onChecklistToggle, badges }: ProgressDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto p-4 animate-slide-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Mín framvinda</h2>

      {/* Exploration stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Könnunarskrá</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {stats.conversionsExplored}
            </div>
            <div className="text-sm text-gray-600">
              Umbreytingar skoðaðar
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {stats.pathsTried}
            </div>
            <div className="text-sm text-gray-600">
              Leiðir reyndar
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {stats.timeSpent}
            </div>
            <div className="text-sm text-gray-600">
              Mínútur í leik
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Merki</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`text-center p-4 rounded-lg transition-all ${
                badge.earned
                  ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <div className="font-semibold text-sm">{badge.name}</div>
              {badge.earned && (
                <div className="text-xs mt-1 opacity-90">✓ Unnið!</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Self-assessment checklist */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Skilningslisti - sjálfsmat</h3>
        <p className="text-sm text-gray-600 mb-4">
          Hakaðu við þegar þú finnur þér öryggi í hverjum lið:
        </p>
        <div className="space-y-3">
          {checklist.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => onChecklistToggle(index)}
                className="w-5 h-5 text-primary focus:ring-primary rounded"
              />
              <span className={`flex-1 ${item.checked ? 'text-gray-700 font-medium' : 'text-gray-600'}`}>
                {item.text}
              </span>
              {item.checked && (
                <span className="text-green-600 text-xl">✓</span>
              )}
            </label>
          ))}
        </div>

        {checklist.every(item => item.checked) && (
          <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-800 font-bold text-lg mb-2">
              🎉 Frábært! Þú hefur unnið í gegnum alla liðina!
            </p>
            <p className="text-green-700 text-sm">
              Þú ert tilbúin/n til að prófa skoruð æfingaverkefni!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
