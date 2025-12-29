import { useState } from 'react';
import Level1 from './components/Level1';
import { useAchievements } from '@shared/hooks/useAchievements';
import { AchievementsButton, AchievementsPanel } from '@shared/components/AchievementsPanel';
import { AchievementNotificationsContainer } from '@shared/components/AchievementNotificationPopup';
import './styles.css';

/**
 * Buffer Builder - Conceptual Chemistry Game
 *
 * Level 1: Visual molecule manipulation (NO calculations)
 * Level 2: Buffer defense scenarios (coming soon)
 * Level 3: Henderson-Hasselbalch calculations (see App-OLD-Calculation.tsx)
 */
function App() {
  const [showAchievements, setShowAchievements] = useState(false);

  // Achievement system
  const {
    achievements,
    allAchievements,
    notifications,
    trackCorrectAnswer,
    trackIncorrectAnswer,
    trackLevelComplete,
    dismissNotification,
    resetAll: resetAchievements,
  } = useAchievements({ gameId: 'buffer-recipe-creator' });

  // Handle level 1 completion (all 6 challenges completed)
  const handleLevel1Complete = (score: number, maxScore: number, hintsUsed: number) => {
    trackLevelComplete(1, score, maxScore, { hintsUsed });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Achievements button in top-right corner */}
      <div className="fixed top-4 right-4 z-40">
        <AchievementsButton
          achievements={achievements}
          onClick={() => setShowAchievements(true)}
        />
      </div>

      <Level1
        onCorrectAnswer={() => trackCorrectAnswer()}
        onIncorrectAnswer={() => trackIncorrectAnswer()}
        onLevelComplete={handleLevel1Complete}
      />

      <footer className="text-center text-sm text-gray-500 py-4 border-t border-gray-200 mt-8">
        <p>Kvennaskólinn í Reykjavík - Stuðpúðasmíði</p>
        <p className="text-xs mt-1">Stig 1: Hugmyndafræðilegur grunnur</p>
      </footer>

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

export default App;
