# Migration Guide: Legacy to Monorepo Architecture

This guide walks you through migrating a legacy chemistry game (monolithic HTML file) to the new monorepo architecture with React, TypeScript, and the shared component library.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Migration Process](#migration-process)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Code Examples](#code-examples)
6. [Common Patterns](#common-patterns)
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)

---

## Overview

### Why Migrate?

**Before Migration (Legacy):**
- ❌ 1500-3000 lines of monolithic HTML
- ❌ Hard-coded translations
- ❌ Duplicated code across games
- ❌ No type safety
- ❌ Difficult to maintain
- ❌ No shared components

**After Migration (New Architecture):**
- ✅ 300-500 lines of clean code
- ✅ Automatic i18n support
- ✅ Shared components & utilities
- ✅ Full TypeScript type safety
- ✅ Easy to maintain & extend
- ✅ Consistent UI/UX

### Code Reduction Example

| Game | Legacy Lines | New Lines | Reduction |
|------|-------------|-----------|-----------|
| molmassi | 1833 | 400 | 78% |
| nafnakerfid | 1734 | 350 | 80% |
| lausnir | 1745 | 450 | 74% |
| takmarkandi | 1835 | 420 | 77% |

**Average reduction: ~77% (70-85% across all games)**

---

## Prerequisites

Before migrating a game, ensure you have:

1. **Development Environment:**
   ```bash
   node --version  # v18 or higher
   pnpm --version  # v8 or higher
   ```

2. **Repository Setup:**
   ```bash
   git clone https://github.com/SigurdurVilhelmsson/ChemistryGames.git
   cd ChemistryGames
   pnpm install
   ```

3. **Understanding of:**
   - React hooks and component patterns
   - TypeScript basics
   - The shared component library (`shared/README.md`)

---

## Migration Process

### High-Level Steps

```
1. Create game structure       (using template)
2. Extract game data           (questions, compounds, etc.)
3. Identify game logic         (scoring, validation, etc.)
4. Migrate to components       (React components)
5. Add translations            (i18n)
6. Integrate shared hooks      (useI18n, useProgress, etc.)
7. Test thoroughly             (all game modes)
8. Build and deploy            (single HTML file)
```

### Estimated Timeline

| Complexity | Lines | Estimated Time |
|-----------|-------|----------------|
| Simple | <1500 | 2-3 hours |
| Medium | 1500-2000 | 3-4 hours |
| Complex | 2000-3000 | 4-6 hours |
| Very Complex | 3000+ | 6-8 hours |

---

## Step-by-Step Guide

### Step 1: Create Game Structure

Use the game template to create the base structure:

```bash
cd tools
./create-game.sh <year> <game-name> "<Title>" "<Description>"

# Example:
./create-game.sh 1-ar molmassi "Mólmassi Leikur" "Calculate molar mass of compounds"
```

This creates:
```
games/1-ar/molmassi/
├── src/
│   ├── App.tsx           # Main game component
│   ├── main.tsx          # Entry point
│   ├── data/             # Game data
│   ├── components/       # React components
│   └── utils/            # Utility functions
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### Step 2: Extract Game Data

Identify and extract all game data from the legacy HTML:

**Legacy HTML (inline data):**
```html
<script>
const compounds = [
  { name: "Vatn", formula: "H₂O", mass: 18.015, difficulty: "easy" },
  { name: "Koltvísýringur", formula: "CO₂", mass: 44.009, difficulty: "medium" },
  // ... 50 more compounds mixed with logic
];
</script>
```

**New Architecture (separate data file):**
```typescript
// src/data/compounds.ts
export interface Compound {
  id: string;
  nameIs: string;
  nameEn: string;
  formula: string;
  molarMass: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
}

export const compounds: Compound[] = [
  {
    id: 'water',
    nameIs: 'Vatn',
    nameEn: 'Water',
    formula: 'H₂O',
    molarMass: 18.015,
    difficulty: 'easy',
    category: 'molecular'
  },
  // ... more compounds
];

export const getRandomCompound = (difficulty?: Difficulty): Compound => {
  const filtered = difficulty
    ? compounds.filter(c => c.difficulty === difficulty)
    : compounds;
  return filtered[Math.floor(Math.random() * filtered.length)];
};
```

**Key Benefits:**
- ✅ Type-safe data structures
- ✅ Easy to add/modify compounds
- ✅ Helper functions for data access
- ✅ Separation of concerns

### Step 3: Identify Game Logic

Extract core game logic into utility functions:

**Legacy HTML (mixed logic):**
```html
<script>
function checkAnswer() {
  let userVal = parseFloat(document.getElementById('answer').value);
  let correctVal = currentCompound.mass;
  let tolerance = 0.05;

  if (Math.abs(userVal - correctVal) <= tolerance) {
    score += 10;
    showFeedback("Rétt! ✓", "green");
  } else {
    showFeedback("Rangt! ✗", "red");
  }
}
</script>
```

**New Architecture (clean utilities):**
```typescript
// src/utils/validation.ts
export interface ValidationResult {
  isCorrect: boolean;
  message: string;
  difference: number;
}

export const validateAnswer = (
  userAnswer: number,
  correctAnswer: number,
  tolerance: number = 0.05
): ValidationResult => {
  const difference = Math.abs(userAnswer - correctAnswer);
  const isCorrect = difference <= tolerance;

  return {
    isCorrect,
    difference,
    message: isCorrect
      ? 'feedback.correct'
      : `feedback.incorrect`
  };
};

export const calculatePoints = (
  isCorrect: boolean,
  difficulty: string,
  hintsUsed: number,
  streak: number
): number => {
  if (!isCorrect) return 0;

  const basePoints = {
    easy: 10,
    medium: 15,
    hard: 20
  }[difficulty] || 10;

  const hintPenalty = hintsUsed * 2;
  const streakBonus = streak >= 5 ? 10 : streak >= 3 ? 5 : 0;

  return Math.max(0, basePoints - hintPenalty + streakBonus);
};
```

### Step 4: Migrate to React Components

Convert DOM manipulation to React components:

**Legacy HTML (DOM manipulation):**
```html
<div id="game">
  <div id="question"></div>
  <input type="text" id="answer">
  <button onclick="checkAnswer()">Staðfesta</button>
  <div id="feedback"></div>
</div>

<script>
function displayQuestion() {
  document.getElementById('question').innerHTML =
    `<h3>${currentCompound.name}</h3>
     <p>Formula: ${currentCompound.formula}</p>`;
}

function checkAnswer() {
  let answer = document.getElementById('answer').value;
  // ... logic
  document.getElementById('feedback').innerHTML =
    `<div class="correct">Rétt!</div>`;
}
</script>
```

**New Architecture (React components):**
```typescript
// src/App.tsx
import { useState } from 'react';
import { useI18n } from '@shared/hooks';
import { validateAnswer } from './utils/validation';

function App() {
  const { t } = useI18n();
  const [compound, setCompound] = useState(getRandomCompound());
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = () => {
    const result = validateAnswer(
      parseFloat(answer),
      compound.molarMass
    );

    setFeedback(result.isCorrect ? t('feedback.correct') : t('feedback.incorrect'));
  };

  return (
    <div className="game">
      <QuestionDisplay compound={compound} />
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={t('input.enterAnswer')}
      />
      <button onClick={handleSubmit}>
        {t('common.submit')}
      </button>
      {feedback && <Feedback message={feedback} />}
    </div>
  );
}

// src/components/QuestionDisplay.tsx
interface Props {
  compound: Compound;
}

export function QuestionDisplay({ compound }: Props) {
  const { t, language } = useI18n();

  return (
    <div className="question">
      <h3>{language === 'is' ? compound.nameIs : compound.nameEn}</h3>
      <p className="formula">{compound.formula}</p>
      <p className="prompt">{t('game.calculateMolarMass')}</p>
    </div>
  );
}
```

### Step 5: Add Translations

Create translation keys for all text:

**Legacy HTML (hard-coded text):**
```html
<h1>Mólmassi Leikur</h1>
<button>Byrja</button>
<p>Rétt svar!</p>
```

**New Architecture (i18n):**

```json
// shared/i18n/is.json
{
  "molmassi": {
    "title": "Mólmassi Leikur",
    "start": "Byrja",
    "calculateMolarMass": "Reiknaðu mólmassa efnisins",
    "yourAnswer": "Þitt svar",
    "feedback": {
      "correct": "Rétt svar! 🎉",
      "incorrect": "Rangt svar. Reyndu aftur!",
      "close": "Næstum því! Aðeins {diff} frá."
    }
  }
}

// shared/i18n/en.json
{
  "molmassi": {
    "title": "Molar Mass Game",
    "start": "Start",
    "calculateMolarMass": "Calculate the molar mass",
    "yourAnswer": "Your answer",
    "feedback": {
      "correct": "Correct answer! 🎉",
      "incorrect": "Incorrect. Try again!",
      "close": "Almost! Only {diff} off."
    }
  }
}
```

**Usage in component:**
```typescript
const { t } = useI18n();
<h1>{t('molmassi.title')}</h1>
<button>{t('molmassi.start')}</button>
```

### Step 6: Integrate Shared Hooks

Replace custom implementations with shared hooks:

**Legacy HTML (custom localStorage):**
```javascript
function saveProgress() {
  localStorage.setItem('molmassiScore', score.toString());
  localStorage.setItem('molmassiBestStreak', bestStreak.toString());
}

function loadProgress() {
  score = parseInt(localStorage.getItem('molmassiScore') || '0');
  bestStreak = parseInt(localStorage.getItem('molmassiBestStreak') || '0');
}
```

**New Architecture (useProgress hook):**
```typescript
import { useProgress } from '@shared/hooks';

function App() {
  const { progress, updateProgress, incrementProblems } = useProgress({
    gameId: 'molmassi',
    initialProgress: {
      currentLevel: 1,
      problemsCompleted: 0,
      bestStreak: 0
    }
  });

  const handleCorrectAnswer = () => {
    incrementProblems();
    updateProgress({
      bestStreak: Math.max(progress.bestStreak || 0, currentStreak)
    });
  };

  // Progress automatically saved to localStorage!
}
```

**Legacy HTML (custom accessibility):**
```javascript
let highContrast = false;

function toggleContrast() {
  highContrast = !highContrast;
  document.body.className = highContrast ? 'high-contrast' : '';
}
```

**New Architecture (useAccessibility hook):**
```typescript
import { useAccessibility } from '@shared/hooks';

function SettingsMenu() {
  const { settings, toggleHighContrast, setTextSize } = useAccessibility();

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={settings.highContrast}
          onChange={toggleHighContrast}
        />
        {t('settings.highContrast')}
      </label>
      {/* Settings automatically applied to DOM! */}
    </div>
  );
}
```

### Step 7: Test Thoroughly

Test all game functionality:

```bash
# Start development server
cd games/1-ar/molmassi
pnpm dev

# Test checklist:
# ✓ All game modes work
# ✓ Scoring calculates correctly
# ✓ Progress saves/loads
# ✓ Language switching works
# ✓ Accessibility features work
# ✓ Mobile responsive
# ✓ No console errors
```

### Step 8: Build and Deploy

Build the game to a single HTML file:

```bash
pnpm build
# Output: ../../1-ar/molmassi.html (184KB)
```

**Verify build:**
```bash
# Check file size
ls -lh ../../1-ar/molmassi.html

# Open in browser
open ../../1-ar/molmassi.html
```

---

## Code Examples

### Example 1: Simple Question-Answer Game

**Before (Legacy HTML - 1200 lines):**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Chemistry Game</title>
  <style>
    /* 500 lines of CSS */
  </style>
</head>
<body>
  <div id="game">
    <!-- Complex HTML structure -->
  </div>

  <script>
    // 600 lines of JavaScript
    let score = 0;
    let currentQuestion = null;

    function startGame() { /* ... */ }
    function displayQuestion() { /* ... */ }
    function checkAnswer() { /* ... */ }
    // ... many more functions
  </script>
</body>
</html>
```

**After (New Architecture - 250 lines total):**

```typescript
// src/App.tsx (~150 lines)
import { useState } from 'react';
import { useI18n, useProgress } from '@shared/hooks';
import { questions } from './data/questions';
import { QuestionDisplay } from './components/QuestionDisplay';

function App() {
  const { t } = useI18n();
  const { progress, incrementProblems } = useProgress({ gameId: 'my-game' });
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQ].correct) {
      setScore(score + 10);
      incrementProblems();
    }
    setCurrentQ(currentQ + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-kvenno-orange">
        {t('game.title')}
      </h1>
      <QuestionDisplay
        question={questions[currentQ]}
        onAnswer={handleAnswer}
      />
      <div>Score: {score}</div>
    </div>
  );
}
```

```typescript
// src/data/questions.ts (~50 lines)
export interface Question {
  id: string;
  promptIs: string;
  promptEn: string;
  options: string[];
  correct: string;
}

export const questions: Question[] = [
  {
    id: 'q1',
    promptIs: 'Hver er formúla vatns?',
    promptEn: 'What is the formula for water?',
    options: ['H₂O', 'CO₂', 'NaCl', 'O₂'],
    correct: 'H₂O'
  },
  // ... more questions
];
```

```typescript
// src/components/QuestionDisplay.tsx (~50 lines)
interface Props {
  question: Question;
  onAnswer: (answer: string) => void;
}

export function QuestionDisplay({ question, onAnswer }: Props) {
  const { language } = useI18n();
  const prompt = language === 'is' ? question.promptIs : question.promptEn;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl mb-4">{prompt}</h3>
      <div className="grid grid-cols-2 gap-4">
        {question.options.map(option => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className="bg-kvenno-orange text-white py-2 px-4 rounded hover:opacity-90"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
```

**Result:** 1200 lines → 250 lines (79% reduction!)

### Example 2: Timer-Based Game

**Legacy approach:**
```javascript
let timeRemaining = 90;
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--;
    document.getElementById('timer').textContent = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function pauseGame() {
  clearInterval(timerInterval);
}
```

**New approach (cleaner with React):**
```typescript
function App() {
  const [timeRemaining, setTimeRemaining] = useState(90);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setGameState('gameOver');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, timeRemaining]);

  return (
    <div>
      <Timer seconds={timeRemaining} />
      <button onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  );
}
```

### Example 3: Progress Tracking

**Legacy approach:**
```javascript
// Scattered throughout code
localStorage.setItem('game-level', level.toString());
localStorage.setItem('game-score', score.toString());
localStorage.setItem('game-completed', completed.toString());

// Load on page load
let level = parseInt(localStorage.getItem('game-level') || '1');
let score = parseInt(localStorage.getItem('game-score') || '0');
```

**New approach (centralized):**
```typescript
const { progress, updateProgress, resetProgress } = useProgress({
  gameId: 'my-game',
  initialProgress: {
    currentLevel: 1,
    score: 0,
    problemsCompleted: 0
  }
});

// Update progress (auto-saves!)
updateProgress({
  score: progress.score + 10,
  problemsCompleted: progress.problemsCompleted + 1
});

// Reset if needed
<button onClick={resetProgress}>Reset Progress</button>
```

---

## Common Patterns

### Pattern 1: Multi-Step Games

Games with multiple screens/states:

```typescript
type GameMode = 'menu' | 'playing' | 'results';

function App() {
  const [mode, setMode] = useState<GameMode>('menu');

  return (
    <div>
      {mode === 'menu' && <Menu onStart={() => setMode('playing')} />}
      {mode === 'playing' && <Game onComplete={() => setMode('results')} />}
      {mode === 'results' && <Results onRestart={() => setMode('menu')} />}
    </div>
  );
}
```

### Pattern 2: Difficulty Selection

```typescript
type Difficulty = 'easy' | 'medium' | 'hard';

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  useEffect(() => {
    setCurrentQuestion(getRandomQuestion(difficulty));
  }, [difficulty]);

  return (
    <div>
      <DifficultySelector
        selected={difficulty}
        onChange={setDifficulty}
      />
      {currentQuestion && <Question data={currentQuestion} />}
    </div>
  );
}
```

### Pattern 3: Hint System

```typescript
function App() {
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const maxHints = 3;

  const handleShowHint = () => {
    if (hintsUsed < maxHints) {
      setShowHint(true);
      setHintsUsed(hintsUsed + 1);
    }
  };

  const calculateScore = (baseScore: number) => {
    const hintPenalty = hintsUsed * 2;
    return Math.max(0, baseScore - hintPenalty);
  };

  return (
    <div>
      <button
        onClick={handleShowHint}
        disabled={hintsUsed >= maxHints}
      >
        {t('game.showHint')} ({maxHints - hintsUsed} left)
      </button>
      {showHint && <Hint content={currentQuestion.hint} />}
    </div>
  );
}
```

### Pattern 4: Answer Validation

```typescript
// src/utils/validation.ts
export const validateNumericAnswer = (
  userAnswer: string,
  correctAnswer: number,
  tolerance: number = 0.05
): ValidationResult => {
  const parsed = parseFloat(userAnswer.replace(',', '.'));

  if (isNaN(parsed)) {
    return {
      isValid: false,
      isCorrect: false,
      error: 'validation.notANumber'
    };
  }

  const difference = Math.abs(parsed - correctAnswer);
  const isCorrect = difference <= tolerance;

  return {
    isValid: true,
    isCorrect,
    difference,
    accuracy: 1 - (difference / correctAnswer)
  };
};
```

### Pattern 5: Streak Tracking

```typescript
function App() {
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(Math.max(bestStreak, newStreak));

      // Bonus at milestones
      if (newStreak === 5) {
        showAchievement('5 in a row! 🔥');
      }
    } else {
      setStreak(0);
    }
  };

  return (
    <div>
      <StreakDisplay current={streak} best={bestStreak} />
    </div>
  );
}
```

---

## Troubleshooting

### Issue 1: Build Output Too Large

**Problem:** Built HTML file is >500KB

**Solution:**
1. Check for duplicate dependencies
2. Remove unused imports
3. Optimize images (use SVG when possible)
4. Enable tree-shaking in Vite config

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Ensure single file
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
      }
    }
  }
});
```

### Issue 2: Translations Not Loading

**Problem:** `t('key.name')` returns the key instead of translation

**Solution:**
1. Check translation file path: `shared/i18n/${lang}.json`
2. Verify key exists in translation file
3. Check for typos in dot notation
4. Ensure translation files are properly formatted JSON

```typescript
// Debug helper
const { t, language } = useI18n();
console.log('Current language:', language);
console.log('Translation:', t('game.title', 'FALLBACK'));
```

### Issue 3: Progress Not Persisting

**Problem:** Progress resets on page reload

**Solution:**
1. Ensure `gameId` is consistent
2. Check browser localStorage quota
3. Verify useProgress hook is used correctly

```typescript
// Check localStorage
console.log('Saved progress:', localStorage.getItem('kvenno-chemistry-molmassi'));

// Use consistent gameId
const { progress } = useProgress({
  gameId: 'molmassi', // Must be same every time!
});
```

### Issue 4: TypeScript Errors

**Problem:** Type errors with shared library

**Solution:**
1. Ensure `@shared` path alias is configured in `tsconfig.json`
2. Import types explicitly:

```typescript
import type { GameProgress, Compound } from '@shared/types';
```

3. Check that shared library is built:

```bash
cd shared
pnpm type-check
```

### Issue 5: Styles Not Applying

**Problem:** Tailwind classes not working

**Solution:**
1. Verify Tailwind is configured in `tailwind.config.js`
2. Check PostCSS config
3. Import Tailwind CSS in main.tsx:

```typescript
// main.tsx
import './index.css';
```

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Best Practices

### 1. Data Separation

✅ **DO:**
```typescript
// src/data/questions.ts
export const questions = [ /* data */ ];

// src/App.tsx
import { questions } from './data/questions';
```

❌ **DON'T:**
```typescript
// src/App.tsx
const questions = [ /* data mixed with component */ ];
```

### 2. Component Organization

✅ **DO:** Create small, reusable components
```typescript
// src/components/
├── QuestionDisplay.tsx
├── AnswerInput.tsx
├── Feedback.tsx
├── ScoreBoard.tsx
└── Timer.tsx
```

❌ **DON'T:** Put everything in App.tsx

### 3. Use Shared Utilities

✅ **DO:**
```typescript
import { validateSignificantFigures, calculateCompositeScore } from '@shared/utils/scoring';
```

❌ **DON'T:** Reimplement existing utilities

### 4. Accessibility

✅ **DO:**
- Use semantic HTML
- Add ARIA labels
- Support keyboard navigation
- Use useAccessibility hook

```typescript
<button
  onClick={handleSubmit}
  aria-label={t('game.submitAnswer')}
  className="bg-kvenno-orange hover:opacity-90 focus:ring-2"
>
  {t('common.submit')}
</button>
```

### 5. Error Handling

✅ **DO:**
```typescript
try {
  const result = calculateAnswer(input);
  setResult(result);
} catch (error) {
  console.error('Calculation failed:', error);
  setError(t('errors.calculationFailed'));
}
```

### 6. Type Everything

✅ **DO:**
```typescript
interface GameState {
  mode: GameMode;
  score: number;
  currentQuestion: Question | null;
}

const [state, setState] = useState<GameState>(initialState);
```

❌ **DON'T:**
```typescript
const [state, setState] = useState({} as any);
```

### 7. Use Meaningful Names

✅ **DO:**
```typescript
const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('medium');
```

❌ **DON'T:**
```typescript
const [flag, setFlag] = useState(false);
const [val, setVal] = useState('medium');
```

### 8. Progressive Enhancement

Build games that work with:
- ✅ Different screen sizes (mobile, tablet, desktop)
- ✅ Different languages (is, en, pl)
- ✅ Accessibility features enabled
- ✅ Keyboard-only navigation

---

## Migration Checklist

Use this checklist when migrating a game:

### Setup
- [ ] Create game structure with `create-game.sh`
- [ ] Install dependencies (`pnpm install`)
- [ ] Verify dev server works (`pnpm dev`)

### Data Migration
- [ ] Extract all game data to `src/data/`
- [ ] Create TypeScript interfaces for data
- [ ] Add helper functions for data access
- [ ] Remove hard-coded data from components

### Component Migration
- [ ] Identify main game screens/modes
- [ ] Create component structure
- [ ] Migrate each screen to React component
- [ ] Remove DOM manipulation code

### Translations
- [ ] Extract all text to translation files
- [ ] Add Icelandic translations (is.json)
- [ ] Add English translations (en.json)
- [ ] Test language switching

### Integration
- [ ] Replace custom localStorage with `useProgress`
- [ ] Replace custom translations with `useI18n`
- [ ] Add accessibility with `useAccessibility`
- [ ] Use shared utilities where applicable

### Testing
- [ ] Test all game modes
- [ ] Test all difficulty levels
- [ ] Test progress saving/loading
- [ ] Test on mobile device
- [ ] Test with keyboard only
- [ ] Test language switching
- [ ] Test accessibility features
- [ ] Verify no console errors

### Build & Deploy
- [ ] Build to production (`pnpm build`)
- [ ] Verify file size (<250KB)
- [ ] Test built HTML file in browser
- [ ] Verify all features work in production
- [ ] Deploy to appropriate directory

### Documentation
- [ ] Add game README in game directory
- [ ] Update main MIGRATION-PLAN.md
- [ ] Document any special features
- [ ] Add troubleshooting notes if needed

---

## Getting Help

If you encounter issues during migration:

1. **Check Examples:** Look at successfully migrated games:
   - Simple: `games/1-ar/dimensional-analysis-simple/`
   - Medium: `games/1-ar/molmassi/`
   - Complex: `games/3-ar/equilibrium-shifter/`

2. **Review Documentation:**
   - Shared library: `shared/README.md`
   - Game template: `tools/game-template/README.md`
   - This guide: `MIGRATION-GUIDE.md`

3. **Common Resources:**
   - TypeScript types in `shared/types/`
   - Utility functions in `shared/utils/`
   - Translation examples in `shared/i18n/`

4. **Ask for Help:**
   - Open an issue on GitHub
   - Review existing migrations for patterns
   - Check commit history for examples

---

## Summary

### Key Takeaways

1. **Use the Template:** Always start with `create-game.sh`
2. **Separate Concerns:** Data, logic, and UI should be separate
3. **Leverage Shared Library:** Don't reinvent the wheel
4. **Type Everything:** TypeScript catches bugs early
5. **Test Thoroughly:** All modes, languages, and features
6. **Follow Patterns:** Look at existing migrations

### Migration Benefits

- **70-85% code reduction**
- **Automatic i18n support**
- **Built-in accessibility**
- **Type safety**
- **Easier maintenance**
- **Consistent UI/UX**
- **Faster development**

---

**Ready to migrate? Start with a simple game and work your way up!** 🚀

For questions or help, see existing games or open an issue on GitHub.
