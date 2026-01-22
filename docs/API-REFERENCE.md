# Kvennaskólinn Chemistry Games - API Reference

**Version:** 1.0.0
**Last Updated:** 2025-12-28

This document provides comprehensive API documentation for the shared component library used across all Kvennaskólinn Chemistry Games.

---

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Hooks](#hooks)
   - [useI18n](#usei18n)
   - [useProgress](#useprogress)
   - [useAccessibility](#useaccessibility)
   - [useAchievements](#useachievements)
4. [Components](#components)
   - [ErrorBoundary](#errorboundary)
   - [MoleculeViewer3D](#moleculeviewer3d)
   - [DragDropBuilder](#dragdropbuilder)
   - [FeedbackPanel](#feedbackpanel)
   - [HintSystem](#hintsystem)
   - [ParticleSimulation](#particlesimulation)
   - [InteractiveGraph](#interactivegraph)
5. [Utilities](#utilities)
   - [Storage](#storage)
   - [Scoring](#scoring)
   - [Export](#export)
   - [Achievements](#achievements)
6. [Types](#types)
7. [Theme](#theme)

---

## Overview

The `@shared` library provides reusable components, hooks, utilities, and types for all chemistry educational games. It enables:

- **85% code reduction** across games
- **Centralized internationalization** (Icelandic, English, Polish)
- **Consistent accessibility** features
- **Unified progress tracking** with localStorage persistence

### Import Syntax

```typescript
import {
  useI18n,
  useProgress,
  useAccessibility,
  ErrorBoundary,
  saveProgress,
  calculateCompositeScore,
  theme
} from '@shared';
```

---

## Installation

The shared library is automatically available to all games in the monorepo via pnpm workspaces. No additional installation required.

```json
// In game's package.json
{
  "dependencies": {
    "@shared": "workspace:*"
  }
}
```

---

## Hooks

### useI18n

Hook for internationalization support with dynamic translation loading.

#### Signature

```typescript
function useI18n(): {
  t: (key: string, fallback?: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
  availableLanguages: Language[];
}

type Language = 'is' | 'en' | 'pl';
```

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `t` | `(key: string, fallback?: string) => string` | Translation function using dot notation |
| `language` | `Language` | Current active language |
| `setLanguage` | `(lang: Language) => void` | Switch to a different language |
| `availableLanguages` | `Language[]` | List of supported languages |

#### Example

```tsx
import { useI18n } from '@shared';

function GameHeader() {
  const { t, language, setLanguage, availableLanguages } = useI18n();

  return (
    <header>
      <h1>{t('mainMenu.title')}</h1>
      <p>{t('mainMenu.subtitle', 'Welcome to the game')}</p>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
      >
        {availableLanguages.map(lang => (
          <option key={lang} value={lang}>{lang.toUpperCase()}</option>
        ))}
      </select>
    </header>
  );
}
```

#### Translation Key Format

Translations use dot notation to access nested objects:

```json
// shared/i18n/is.json
{
  "mainMenu": {
    "title": "Efnafræði Leikur",
    "start": "Byrja",
    "settings": "Stillingar"
  },
  "feedback": {
    "correct": "Rétt!",
    "incorrect": "Rangt"
  }
}
```

```typescript
t('mainMenu.title')     // "Efnafræði Leikur"
t('feedback.correct')   // "Rétt!"
t('missing.key')        // "missing.key" (returns key if not found)
t('missing.key', 'Default') // "Default" (uses fallback)
```

---

### useProgress

Hook for managing game progress with automatic localStorage persistence.

#### Signature

```typescript
function useProgress(options: UseProgressOptions): {
  progress: GameProgress;
  updateProgress: (updates: Partial<GameProgress>) => void;
  resetProgress: () => void;
  incrementProblems: () => void;
  setLevel: (level: GameLevel) => void;
}

interface UseProgressOptions {
  gameId: string;
  initialProgress?: Partial<GameProgress>;
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `gameId` | `string` | Yes | Unique identifier for the game |
| `initialProgress` | `Partial<GameProgress>` | No | Initial progress state |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `progress` | `GameProgress` | Current progress state |
| `updateProgress` | `(updates: Partial<GameProgress>) => void` | Update progress partially |
| `resetProgress` | `() => void` | Reset all progress to initial state |
| `incrementProblems` | `() => void` | Increment problems completed by 1 |
| `setLevel` | `(level: GameLevel) => void` | Set current game level |

#### Example

```tsx
import { useProgress } from '@shared';

function GameScreen() {
  const {
    progress,
    updateProgress,
    incrementProblems,
    setLevel,
    resetProgress
  } = useProgress({
    gameId: 'dimensional-analysis',
    initialProgress: { currentLevel: 1 }
  });

  const handleCorrectAnswer = () => {
    incrementProblems();

    // Or with more updates:
    updateProgress({
      problemsCompleted: progress.problemsCompleted + 1,
      levelProgress: {
        ...progress.levelProgress,
        level1: {
          ...progress.levelProgress.level1,
          questionsCorrect: (progress.levelProgress.level1?.questionsCorrect || 0) + 1
        }
      }
    });
  };

  const advanceLevel = () => {
    if (progress.currentLevel < 3) {
      setLevel((progress.currentLevel + 1) as GameLevel);
    }
  };

  return (
    <div>
      <p>Problems completed: {progress.problemsCompleted}</p>
      <p>Current level: {progress.currentLevel}</p>
      <button onClick={handleCorrectAnswer}>Submit Answer</button>
      <button onClick={advanceLevel}>Next Level</button>
      <button onClick={resetProgress}>Reset</button>
    </div>
  );
}
```

#### Storage Details

Progress is automatically saved to localStorage with the key pattern:
```
kvenno-chemistry-{gameId}
```

---

### useAccessibility

Hook for managing accessibility settings with localStorage persistence.

#### Signature

```typescript
function useAccessibility(): {
  settings: AccessibilitySettings;
  updateSettings: (updates: Partial<AccessibilitySettings>) => void;
  toggleHighContrast: () => void;
  setTextSize: (size: 'small' | 'medium' | 'large') => void;
  toggleReducedMotion: () => void;
  toggleKeyboardShortcuts: () => void;
  resetSettings: () => void;
}
```

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `settings` | `AccessibilitySettings` | Current accessibility settings |
| `updateSettings` | `(updates: Partial<AccessibilitySettings>) => void` | Update settings partially |
| `toggleHighContrast` | `() => void` | Toggle high contrast mode |
| `setTextSize` | `(size) => void` | Set text size |
| `toggleReducedMotion` | `() => void` | Toggle reduced motion |
| `toggleKeyboardShortcuts` | `() => void` | Toggle keyboard shortcuts |
| `resetSettings` | `() => void` | Reset to defaults |

#### Example

```tsx
import { useAccessibility } from '@shared';

function SettingsPanel() {
  const {
    settings,
    toggleHighContrast,
    setTextSize,
    toggleReducedMotion
  } = useAccessibility();

  return (
    <div className="settings-panel">
      <label>
        <input
          type="checkbox"
          checked={settings.highContrast}
          onChange={toggleHighContrast}
        />
        High Contrast Mode
      </label>

      <label>
        Text Size:
        <select
          value={settings.textSize}
          onChange={(e) => setTextSize(e.target.value as 'small' | 'medium' | 'large')}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          checked={settings.reducedMotion}
          onChange={toggleReducedMotion}
        />
        Reduce Motion
      </label>
    </div>
  );
}
```

#### CSS Classes Applied

The hook automatically applies CSS classes to `<html>`:

| Setting | CSS Class |
|---------|-----------|
| High Contrast | `.high-contrast` |
| Text Size | `.text-small`, `.text-medium`, `.text-large` |
| Reduced Motion | `.reduced-motion` |

---

### useAchievements

Hook for managing the achievement system with automatic unlocking and persistence.

#### Signature

```typescript
function useAchievements(options: UseAchievementsOptions): {
  achievements: PlayerAchievements;
  unlocked: Achievement[];
  progress: Record<string, AchievementProgress>;
  totalPoints: number;
  checkAchievement: (event: AchievementEvent) => AchievementNotification[];
  getAchievement: (id: string) => Achievement | undefined;
  resetAchievements: () => void;
}

interface UseAchievementsOptions {
  gameId: string;
  customAchievements?: Achievement[];
}
```

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `achievements` | `PlayerAchievements` | Full achievement state |
| `unlocked` | `Achievement[]` | List of unlocked achievements |
| `progress` | `Record<string, AchievementProgress>` | Progress for all achievements |
| `totalPoints` | `number` | Total achievement points earned |
| `checkAchievement` | `(event) => AchievementNotification[]` | Check for new unlocks |
| `getAchievement` | `(id) => Achievement` | Get achievement by ID |
| `resetAchievements` | `() => void` | Reset all achievements |

#### Example

```tsx
import { useAchievements } from '@shared';

function GameScreen() {
  const {
    unlocked,
    totalPoints,
    checkAchievement
  } = useAchievements({ gameId: 'my-game' });

  const handleCorrectAnswer = () => {
    const newUnlocks = checkAchievement({
      type: 'answer_correct',
      gameId: 'my-game',
      level: 1,
      firstAttempt: true
    });

    // Show notification for each new unlock
    newUnlocks.forEach(notification => {
      showToast(`Achievement: ${notification.achievement.name}`);
    });
  };

  return (
    <div>
      <p>Points: {totalPoints}</p>
      <p>Achievements: {unlocked.length}</p>
    </div>
  );
}
```

---

## Components

### ErrorBoundary

React error boundary component that catches JavaScript errors and displays a fallback UI.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | Child components to wrap |
| `fallback` | `ReactNode` | No | Custom fallback UI |
| `onError` | `(error: Error, errorInfo: ErrorInfo) => void` | No | Error callback |

#### Basic Usage

```tsx
import { ErrorBoundary } from '@shared';

function App() {
  return (
    <ErrorBoundary>
      <GameContent />
    </ErrorBoundary>
  );
}
```

#### With Custom Fallback

```tsx
<ErrorBoundary fallback={<CustomErrorScreen />}>
  <GameContent />
</ErrorBoundary>
```

#### With Error Handler

```tsx
<ErrorBoundary onError={(error, errorInfo) => {
  // Log to external service
  logErrorToService(error, errorInfo);
}}>
  <GameContent />
</ErrorBoundary>
```

### useErrorHandler

Hook to manually trigger error boundary (useful for testing).

```tsx
import { useErrorHandler } from '@shared';

function TestComponent() {
  const throwError = useErrorHandler();

  return (
    <button onClick={() => throwError(new Error('Test error'))}>
      Trigger Error
    </button>
  );
}
```

---

### MoleculeViewer3D

Interactive 3D molecule visualization with 2D/3D toggle. Uses lazy loading for performance.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `formula` | `string` | Yes | - | Chemical formula (e.g., 'H2O') |
| `name` | `string` | No | - | Molecule name for accessibility |
| `initialView` | `'2d' \| '3d'` | No | `'2d'` | Initial view mode |
| `width` | `number` | No | `400` | Canvas width |
| `height` | `number` | No | `300` | Canvas height |
| `showToggle` | `boolean` | No | `true` | Show 2D/3D toggle button |
| `rotatable` | `boolean` | No | `true` | Enable 3D rotation |
| `className` | `string` | No | - | Additional CSS classes |

#### Example

```tsx
import { MoleculeViewer3D } from '@shared/components';

function MoleculeDisplay() {
  return (
    <MoleculeViewer3D
      formula="H2O"
      name="Water"
      initialView="3d"
      width={500}
      height={400}
      rotatable={true}
    />
  );
}
```

---

### DragDropBuilder

Flexible drag-and-drop interface for building sequences, equations, or ordered compositions.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | `DraggableItemData[]` | Yes | Pool of draggable items |
| `zones` | `DropZoneConfig[]` | Yes | Drop zone configurations |
| `initialState` | `ZoneState` | No | Pre-populated zone state |
| `onDrop` | `(result: DropResult) => void` | No | Callback when item is dropped |
| `onReorder` | `(zoneId: string, newOrder: string[]) => void` | No | Callback on reorder |
| `validateDrop` | `(itemId: string, zoneId: string) => boolean` | No | Custom validation |
| `orientation` | `'horizontal' \| 'vertical'` | No | Item layout direction |
| `disabled` | `boolean` | No | Disable all interactions |

#### Example

```tsx
import { DragDropBuilder } from '@shared/components';

function ChemicalEquation() {
  return (
    <DragDropBuilder
      items={[
        { id: 'h2', content: 'H₂' },
        { id: 'o2', content: 'O₂' },
        { id: 'h2o', content: 'H₂O' },
      ]}
      zones={[
        { id: 'reactants', label: 'Reactants', maxItems: 2 },
        { id: 'products', label: 'Products', maxItems: 1 },
      ]}
      onDrop={(result) => console.log('Dropped:', result)}
      validateDrop={(itemId, zoneId) => true}
    />
  );
}
```

---

### FeedbackPanel

Rich feedback display component with explanations, misconceptions, and related concepts.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `feedback` | `DetailedFeedback` | Yes | Feedback data to display |
| `severity` | `FeedbackSeverity` | No | Visual style (auto-detected) |
| `config` | `FeedbackPanelConfig` | No | Display options |
| `onDismiss` | `() => void` | No | Callback on dismiss |
| `onConceptClick` | `(conceptId: string) => void` | No | Callback for concept links |

#### Example

```tsx
import { FeedbackPanel } from '@shared/components';

function AnswerFeedback() {
  return (
    <FeedbackPanel
      feedback={{
        isCorrect: false,
        explanation: 'The molar mass of H₂O is 18 g/mol, not 16 g/mol.',
        misconception: 'Remember to count ALL hydrogen atoms (2×1 = 2).',
        relatedConcepts: ['atomic mass', 'molar mass calculation'],
        nextSteps: 'Review the periodic table values for H and O.'
      }}
      config={{
        showExplanation: true,
        showMisconceptions: true,
        showRelatedConcepts: true
      }}
    />
  );
}
```

---

### HintSystem

4-tier progressive hint system with score penalties.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `hints` | `TieredHints` | Yes | Hint content for all 4 tiers |
| `onReveal` | `(tier: number, multiplier: number) => void` | No | Callback on hint reveal |
| `disabled` | `boolean` | No | Disable hint buttons |
| `showMultiplier` | `boolean` | No | Show score impact |

#### Hint Tiers

| Tier | Key | Description | Score Multiplier |
|------|-----|-------------|-----------------|
| 1 | `topic` | General concept area | 80% |
| 2 | `strategy` | Approach to solve | 60% |
| 3 | `method` | Specific formula/technique | 40% |
| 4 | `solution` | Full worked example | 40% |

#### Example

```tsx
import { HintSystem } from '@shared/components';

function ProblemWithHints() {
  const [multiplier, setMultiplier] = useState(1.0);

  return (
    <HintSystem
      hints={{
        topic: 'This problem involves molar mass calculations.',
        strategy: 'Add up atomic masses for each element.',
        method: 'M = Σ(atoms × atomic mass). Use H=1, O=16.',
        solution: 'H₂O: 2(1) + 1(16) = 18 g/mol'
      }}
      onReveal={(tier, mult) => setMultiplier(mult)}
      showMultiplier={true}
    />
  );
}
```

---

### ParticleSimulation

Canvas-based particle physics simulation for kinetic theory visualizations.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `container` | `ContainerConfig` | Yes | Simulation container settings |
| `particleTypes` | `ParticleType[]` | Yes | Particle type definitions |
| `particles` | `ParticleGroup[]` | Yes | Initial particle configuration |
| `physics` | `PhysicsConfig` | No | Physics settings |
| `reactions` | `ReactionConfig[]` | No | Chemical reactions |
| `temperature` | `number` | No | Kelvin temperature (affects speed) |
| `running` | `boolean` | No | Start/stop simulation |
| `onParticleCountChange` | `(counts) => void` | No | Callback on count change |
| `showLabels` | `boolean` | No | Show particle labels |
| `showVelocityVectors` | `boolean` | No | Show velocity vectors |

#### Example

```tsx
import { ParticleSimulation } from '@shared/components';

function GasSimulation() {
  return (
    <ParticleSimulation
      container={{ width: 400, height: 300, pressure: 'normal' }}
      particleTypes={[
        { id: 'n2', color: '#3b82f6', label: 'N₂', mass: 28 },
        { id: 'o2', color: '#ef4444', label: 'O₂', mass: 32 }
      ]}
      particles={[
        { typeId: 'n2', count: 30 },
        { typeId: 'o2', count: 10 }
      ]}
      temperature={300}
      running={true}
      physics={{ enableCollisions: true, speedMultiplier: 1 }}
    />
  );
}
```

---

### InteractiveGraph

Canvas-based graph component with hover interactions, markers, and regions.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `width` | `number` | No | Canvas width (default: 600) |
| `height` | `number` | No | Canvas height (default: 400) |
| `series` | `DataSeries[]` | Yes | Data series to plot |
| `xAxis` | `AxisConfig` | Yes | X-axis configuration |
| `yAxis` | `AxisConfig` | Yes | Y-axis configuration |
| `markers` | `Marker[]` | No | Point markers |
| `regions` | `Region[]` | No | Shaded regions |
| `horizontalLines` | `ReferenceLine[]` | No | Horizontal reference lines |
| `verticalLines` | `ReferenceLine[]` | No | Vertical reference lines |
| `showGrid` | `boolean` | No | Show grid lines |
| `onPointHover` | `(point, series) => void` | No | Hover callback |
| `onPointClick` | `(point, series) => void` | No | Click callback |
| `currentPoint` | `DataPoint` | No | Highlighted point |

#### Example

```tsx
import { InteractiveGraph } from '@shared/components';

function TitrationCurve() {
  return (
    <InteractiveGraph
      series={[{
        id: 'titration',
        data: titrationData,
        color: '#3b82f6',
        lineWidth: 3
      }]}
      xAxis={{ min: 0, max: 50, label: 'Volume (mL)', tickInterval: 10 }}
      yAxis={{ min: 0, max: 14, label: 'pH', tickInterval: 2 }}
      horizontalLines={[
        { y: 7, color: '#22c55e', label: 'Neutral', lineDash: [5, 5] }
      ]}
      markers={[
        { x: 25, y: 7, color: '#f59e0b', label: 'Equivalence Point' }
      ]}
      regions={[
        { yMin: 0, yMax: 7, color: 'rgba(239,68,68,0.1)', label: 'Acidic' },
        { yMin: 7, yMax: 14, color: 'rgba(59,130,246,0.1)', label: 'Basic' }
      ]}
    />
  );
}
```

---

## Utilities

### Storage

Functions for managing game progress in localStorage.

#### saveProgress

```typescript
function saveProgress(gameId: string, progress: GameProgress): void
```

Saves game progress to localStorage.

```typescript
import { saveProgress } from '@shared';

saveProgress('molmassi', {
  currentLevel: 2,
  problemsCompleted: 15,
  lastPlayedDate: new Date().toISOString(),
  totalTimeSpent: 3600,
  levelProgress: {}
});
```

#### loadProgress

```typescript
function loadProgress(gameId: string): GameProgress | null
```

Loads game progress from localStorage.

```typescript
import { loadProgress } from '@shared';

const progress = loadProgress('molmassi');
if (progress) {
  console.log(`Last played: ${progress.lastPlayedDate}`);
}
```

#### clearProgress

```typescript
function clearProgress(gameId: string): void
```

Clears game progress from localStorage.

#### getAllProgressKeys

```typescript
function getAllProgressKeys(): string[]
```

Returns all game IDs with saved progress.

#### clearAllProgress

```typescript
function clearAllProgress(): void
```

Clears all saved game progress.

#### exportAllProgress

```typescript
function exportAllProgress(): Record<string, GameProgress>
```

Exports all progress data as an object.

---

### Scoring

Functions for calculating and validating scores.

#### calculateCompositeScore

```typescript
function calculateCompositeScore(
  answerScore: number,
  methodScore: number,
  explanationScore: number,
  efficiencyScore: number,
  config?: ScoringConfig
): number
```

Calculates a weighted composite score from individual components.

**Default Weights:**
- Answer: 40%
- Method: 30%
- Explanation: 20%
- Efficiency: 10%

```typescript
import { calculateCompositeScore } from '@shared';

const score = calculateCompositeScore(
  1.0,   // Perfect answer
  0.8,   // Good method
  0.6,   // Partial explanation
  1.0    // Efficient
);
// Returns: 0.88
```

#### isPassing

```typescript
function isPassing(score: number, config?: ScoringConfig): boolean
```

Checks if a score meets the passing threshold (default: 70%).

#### calculateAverage

```typescript
function calculateAverage(scores: number[]): number
```

Calculates the average of an array of scores.

#### countSignificantFigures

```typescript
function countSignificantFigures(numStr: string): number
```

Counts significant figures in a numeric string.

```typescript
countSignificantFigures('0.00340')  // 3
countSignificantFigures('1.50e6')   // 3
countSignificantFigures('1000')     // 4
```

#### validateSignificantFigures

```typescript
function validateSignificantFigures(
  answer: string,
  expected: number,
  tolerance?: number
): boolean
```

Validates that an answer has the expected number of significant figures.

#### calculateEfficiencyScore

```typescript
function calculateEfficiencyScore(stepsTaken: number, optimalSteps: number): number
```

Calculates efficiency score based on steps taken vs optimal.

```typescript
calculateEfficiencyScore(3, 3)  // 1.0 (optimal)
calculateEfficiencyScore(5, 3)  // 0.8 (2 extra steps = 20% penalty)
```

#### scoreExplanation

```typescript
function scoreExplanation(
  explanationText: string,
  qualityKeywords: string[],
  typeSpecificKeywords: string[],
  minLength?: number
): number
```

Scores a text explanation based on keywords and quality.

---

### Export

Functions for exporting game data.

#### exportProgressAsJSON

```typescript
function exportProgressAsJSON(
  gameId: string,
  gameName: string,
  gameVersion: string,
  progress: GameProgress,
  summary: Record<string, any>
): void
```

Downloads game progress as a JSON file.

```typescript
import { exportProgressAsJSON } from '@shared';

exportProgressAsJSON(
  'dimensional-analysis',
  'Dimensional Analysis Challenge',
  '1.0.0',
  progress,
  { totalProblems: 35, accuracy: 87 }
);
// Downloads: dimensional-analysis-progress-2025-12-28.json
```

#### exportProgressAsCSV

```typescript
function exportProgressAsCSV(
  gameId: string,
  rows: Array<Record<string, string | number>>
): void
```

Downloads data as a CSV file.

#### formatTimeSpent

```typescript
function formatTimeSpent(seconds: number): string
```

Formats time in seconds to human-readable string.

```typescript
formatTimeSpent(3665)   // "1h 1m"
formatTimeSpent(125)    // "2m 5s"
formatTimeSpent(45)     // "45s"
```

#### calculatePercentage

```typescript
function calculatePercentage(correct: number, total: number): number
```

Calculates and rounds percentage.

---

### Achievements

Functions for managing the achievement system.

#### checkAchievementUnlock

```typescript
function checkAchievementUnlock(
  achievement: Achievement,
  state: PlayerAchievements,
  event: AchievementEvent
): boolean
```

Checks if an achievement should be unlocked based on the event.

#### getAchievementProgress

```typescript
function getAchievementProgress(
  achievement: Achievement,
  state: PlayerAchievements
): AchievementProgress
```

Gets the current progress for an achievement.

#### createDefaultPlayerAchievements

```typescript
function createDefaultPlayerAchievements(): PlayerAchievements
```

Creates a new player achievements state with default values.

#### getUnlockedAchievements

```typescript
function getUnlockedAchievements(
  state: PlayerAchievements,
  achievements: Achievement[]
): Achievement[]
```

Returns all unlocked achievements.

---

## Types

### GameLevel

```typescript
type GameLevel = 0 | 1 | 2 | 3;
```

### GameProgress

```typescript
interface GameProgress extends BaseProgress {
  levelProgress: LevelProgress;
}

interface BaseProgress {
  currentLevel: GameLevel;
  problemsCompleted: number;
  lastPlayedDate: string;
  totalTimeSpent: number; // in seconds
}

interface LevelProgress {
  level1?: Level1Progress;
  level2?: Level2Progress;
  level3?: Level3Progress;
}
```

### Level Progress Types

```typescript
interface Level1Progress {
  questionsAnswered: number;
  questionsCorrect: number;
  explanationsProvided: number;
  explanationScores: number[];
  mastered: boolean;
}

interface Level2Progress {
  problemsCompleted: number;
  predictionsMade: number;
  predictionsCorrect: number;
  finalAnswersCorrect: number;
  mastered: boolean;
}

interface Level3Progress {
  problemsCompleted: number;
  compositeScores: number[];
  achievements: string[];
  mastered: boolean;
  hintsUsed: number;
}
```

### AccessibilitySettings

```typescript
interface AccessibilitySettings {
  highContrast: boolean;
  textSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  keyboardShortcutsEnabled: boolean;
}
```

### ScoringConfig

```typescript
interface ScoringConfig {
  answerWeight: number;
  methodWeight: number;
  explanationWeight: number;
  efficiencyWeight: number;
  passingThreshold: number;
}
```

### QuestionType

```typescript
type QuestionType =
  | 'equivalence'
  | 'cancellation_prediction'
  | 'multi_step'
  | 'reverse'
  | 'synthesis'
  | 'derivation';
```

### FeedbackMessage

```typescript
interface FeedbackMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  details?: string;
}
```

### HintConfig

```typescript
interface HintConfig {
  enabled: boolean;
  cost?: number;           // percentage penalty
  maxHints?: number;
  requiresFailedAttempt?: boolean;
}
```

### TieredHints

```typescript
interface TieredHints {
  topic: string;      // Tier 1: General concept area
  strategy: string;   // Tier 2: Approach to solve
  method: string;     // Tier 3: Specific formula/technique
  solution: string;   // Tier 4: Full worked example
}
```

### HintState

```typescript
interface HintState {
  currentTier: 0 | 1 | 2 | 3 | 4;  // Highest tier revealed
  pointMultiplier: number;         // Score multiplier (1.0, 0.8, 0.6, 0.4)
  revealedTiers: number[];         // Tiers that have been shown
}
```

### DetailedFeedback

```typescript
interface DetailedFeedback {
  isCorrect: boolean;
  explanation: string;
  misconception?: string;
  relatedConcepts?: string[];
  nextSteps?: string;
}
```

### FeedbackSeverity

```typescript
type FeedbackSeverity = 'success' | 'error' | 'warning' | 'info';
```

### Achievement

```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  criteria: AchievementCriteria;
  points: number;
  secret?: boolean;
}

type AchievementCategory =
  | 'performance'   // Score-based
  | 'streak'        // Consecutive correct
  | 'speed'         // Time-based
  | 'mastery'       // Level completion
  | 'dedication'    // Playing regularly
  | 'special';      // Unique

type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
```

### PlayerAchievements

```typescript
interface PlayerAchievements {
  unlocked: string[];
  progress: Record<string, AchievementProgress>;
  totalPoints: number;
  currentStreak: number;
  bestStreak: number;
  daysPlayed: string[];
  totalProblemsSolved: number;
  totalGamesCompleted: number;
  lastUpdated: string;
}
```

### AchievementEvent

```typescript
interface AchievementEvent {
  type: 'answer_correct' | 'answer_incorrect' | 'level_complete' |
        'game_complete' | 'hint_used' | 'game_start';
  gameId: string;
  level?: 1 | 2 | 3;
  score?: number;
  maxScore?: number;
  timeTaken?: number;
  hintsUsed?: number;
  firstAttempt?: boolean;
}
```

---

## Theme

The theme module provides design tokens for consistent styling.

### Colors

```typescript
import { colors } from '@shared';

colors.primary       // '#f36b22' - Kvenno orange
colors.primaryDark   // '#d95a1a'
colors.primaryLight  // '#ff8c4d'

colors.success       // '#10b981' - Green
colors.warning       // '#f59e0b' - Yellow
colors.error         // '#ef4444' - Red
colors.info          // '#3b82f6' - Blue

// Neutral scale
colors.gray50  through  colors.gray900

// High contrast mode
colors.highContrast.bg     // '#000000'
colors.highContrast.text   // '#ffffff'
colors.highContrast.border // '#ffff00'
```

### Spacing

```typescript
import { spacing } from '@shared';

spacing.xs   // '0.25rem' (4px)
spacing.sm   // '0.5rem'  (8px)
spacing.md   // '1rem'    (16px)
spacing.lg   // '1.5rem'  (24px)
spacing.xl   // '2rem'    (32px)
spacing['2xl'] // '3rem'  (48px)
spacing['3xl'] // '4rem'  (64px)
```

### Font Sizes

```typescript
import { fontSize } from '@shared';

// Three size variants for accessibility
fontSize.small.base   // '0.875rem' (14px)
fontSize.medium.base  // '1rem'     (16px)
fontSize.large.base   // '1.125rem' (18px)
```

### Shadows

```typescript
import { shadows } from '@shared';

shadows.sm  // Subtle shadow
shadows.md  // Medium shadow
shadows.lg  // Large shadow
shadows.xl  // Extra large shadow
```

### Transitions

```typescript
import { transitions } from '@shared';

transitions.fast   // '150ms ease-in-out'
transitions.normal // '300ms ease-in-out'
transitions.slow   // '500ms ease-in-out'
```

### generateCSSVariables

```typescript
import { generateCSSVariables } from '@shared';

// Returns CSS string with all theme variables
const cssVars = generateCSSVariables();
```

---

## Best Practices

### 1. Always Use Hooks at Top Level

```tsx
// Good
function MyComponent() {
  const { t } = useI18n();
  const { progress } = useProgress({ gameId: 'my-game' });
  // ...
}

// Bad - hooks in conditions
function MyComponent({ showTranslations }) {
  if (showTranslations) {
    const { t } = useI18n(); // Error!
  }
}
```

### 2. Use Fallbacks for Translations

```tsx
const title = t('game.title', 'Default Game Title');
```

### 3. Wrap Apps in ErrorBoundary

```tsx
function main() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
```

### 4. Save Progress on Important Actions

```tsx
const handleAnswer = (isCorrect: boolean) => {
  if (isCorrect) {
    incrementProblems(); // Auto-saves
  }
};
```

### 5. Apply Theme Consistently

Use Tailwind classes that reference CSS variables:

```tsx
<button className="bg-[var(--color-primary)] text-white">
  Submit
</button>
```

---

## Changelog

### v1.1.0 (2025-01-22)
- Added useAchievements hook
- Added MoleculeViewer3D component (3D molecule visualization)
- Added DragDropBuilder component (drag-and-drop interface)
- Added FeedbackPanel component (rich feedback display)
- Added HintSystem component (4-tier progressive hints)
- Added ParticleSimulation component (kinetic theory visualizations)
- Added InteractiveGraph component (canvas-based graphing)
- Added achievement system utilities
- Added new types: TieredHints, HintState, DetailedFeedback, Achievement, PlayerAchievements

### v1.0.0 (2025-12-28)
- Initial release
- Added useI18n, useProgress, useAccessibility hooks
- Added ErrorBoundary component
- Added storage, scoring, and export utilities
- Added comprehensive type definitions
- Added theme configuration
