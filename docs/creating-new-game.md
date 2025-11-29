# Creating a New Game - Quick Reference

This guide provides a quick reference for creating a new chemistry game using the template system.

---

## 🚀 Quick Start (3 Steps)

### 1. Create Game from Template

```bash
cd tools
./create-game.sh <year> <game-name> "<Title>" "<Description>"
```

**Examples:**
```bash
# Year 1 game
./create-game.sh 1-ar acid-base "Sýru-Basa Leikur" "Learn about acids and bases"

# Year 3 game
./create-game.sh 3-ar redox "Afoxun og Hrun" "Oxidation and reduction reactions"
```

**This creates:**
```
games/<year>/<game-name>/
├── src/
│   ├── App.tsx           # Main game component
│   ├── main.tsx          # Entry point
│   ├── data/             # Game data (questions, etc.)
│   ├── components/       # React components
│   └── utils/            # Utility functions
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### 2. Define Game Data

Create your game data in `src/data/`:

```typescript
// src/data/questions.ts
export interface Question {
  id: string;
  promptIs: string;      // Icelandic prompt
  promptEn: string;      // English prompt
  options: string[];
  correct: number;       // Index of correct answer
  difficulty?: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

export const questions: Question[] = [
  {
    id: 'q1',
    promptIs: 'Hver er formúla vatns?',
    promptEn: 'What is the formula for water?',
    options: ['H₂O', 'CO₂', 'NaCl', 'O₂'],
    correct: 0,
    difficulty: 'easy'
  },
  // ... more questions
];
```

### 3. Implement Game Logic

Edit `src/App.tsx`:

```typescript
import { useState } from 'react';
import { useI18n, useProgress } from '@shared/hooks';
import { questions } from './data/questions';

function App() {
  const { t, language } = useI18n();
  const { progress, updateProgress } = useProgress({
    gameId: 'your-game-name'
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (answerIndex: number) => {
    const question = questions[currentQuestion];
    const isCorrect = answerIndex === question.correct;

    if (isCorrect) {
      setScore(score + 10);
      updateProgress({
        problemsCompleted: progress.problemsCompleted + 1
      });
    }

    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-kvenno-orange">
        {t('game.title')}
      </h1>
      {/* Your game UI here */}
    </div>
  );
}

export default App;
```

---

## 🎨 Using Shared Components

The template automatically imports shared components from `@shared/`:

### Hooks

```typescript
import { useI18n, useProgress, useAccessibility } from '@shared/hooks';

// Internationalization
const { t, language, setLanguage } = useI18n();

// Progress tracking (auto-saves to localStorage)
const { progress, updateProgress, resetProgress } = useProgress({
  gameId: 'my-game',
  initialProgress: {
    currentLevel: 1,
    problemsCompleted: 0,
    score: 0
  }
});

// Accessibility features
const { settings, toggleHighContrast, setTextSize } = useAccessibility();
```

### Utilities

```typescript
import {
  validateSignificantFigures,
  calculateCompositeScore,
  exportProgress,
  saveProgress
} from '@shared/utils';
```

---

## 📝 Adding Translations

All text must be in the shared i18n files:

```json
// shared/i18n/is.json
{
  "yourGame": {
    "title": "Titill á íslensku",
    "start": "Byrja",
    "submit": "Staðfesta",
    "correct": "Rétt!",
    "incorrect": "Rangt. Reyndu aftur."
  }
}

// shared/i18n/en.json
{
  "yourGame": {
    "title": "Title in English",
    "start": "Start",
    "submit": "Submit",
    "correct": "Correct!",
    "incorrect": "Incorrect. Try again."
  }
}
```

**Usage:**
```typescript
const { t } = useI18n();
<button>{t('yourGame.start')}</button>
```

---

## 🧪 Development Workflow

```bash
# Navigate to your game
cd games/1-ar/your-game

# Install dependencies (if not already done)
pnpm install

# Start development server
pnpm dev

# Open browser at http://localhost:5173
```

---

## 🏗️ Building for Production

```bash
# From your game directory
pnpm build

# Output goes to ../../<year>/<game-name>.html
# Example: ../../1-ar/acid-base.html
```

**Build output is a single HTML file:**
- Self-contained (no external dependencies)
- Typically 150-220KB
- Ready for deployment

---

## ✅ Pre-Deployment Checklist

Before building for production:

- [ ] All game modes work correctly
- [ ] Scoring calculates properly
- [ ] Progress saves and loads
- [ ] Language switching works (test both IS and EN)
- [ ] Accessibility features work
- [ ] Mobile responsive (test at 375px width)
- [ ] No console errors
- [ ] Keyboard navigation works
- [ ] All translations are added to `shared/i18n/`
- [ ] Run `pnpm check-all` from repo root (passes linting and type-check)

---

## 🎯 Common Patterns

### Question-Answer Game
```typescript
const [currentQ, setCurrentQ] = useState(0);
const [score, setScore] = useState(0);

const handleAnswer = (answer: string) => {
  if (answer === questions[currentQ].correct) {
    setScore(score + 10);
  }
  setCurrentQ(currentQ + 1);
};
```

### Timer-Based Game
```typescript
const [timeRemaining, setTimeRemaining] = useState(90);

useEffect(() => {
  if (timeRemaining <= 0) return;

  const timer = setInterval(() => {
    setTimeRemaining(prev => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeRemaining]);
```

### Multi-Level Game
```typescript
const [level, setLevel] = useState(1);
const [levelProgress, setLevelProgress] = useState(0);

const completeLevel = () => {
  updateProgress({ currentLevel: level + 1 });
  setLevel(level + 1);
  setLevelProgress(0);
};
```

### Hint System
```typescript
const [hintsUsed, setHintsUsed] = useState(0);
const [showHint, setShowHint] = useState(false);
const maxHints = 3;

const handleShowHint = () => {
  if (hintsUsed < maxHints) {
    setShowHint(true);
    setHintsUsed(hintsUsed + 1);
  }
};

// Deduct points for hints
const finalScore = baseScore - (hintsUsed * 2);
```

---

## 🎨 Styling with Tailwind

The template includes Tailwind CSS via CDN. Use utility classes:

```typescript
<div className="min-h-screen bg-gray-50 p-8">
  <h1 className="text-3xl font-bold text-kvenno-orange mb-4">
    {t('game.title')}
  </h1>

  <button className="bg-kvenno-orange text-white px-6 py-2 rounded hover:opacity-90">
    {t('game.start')}
  </button>
</div>
```

**Brand color:** `text-kvenno-orange` or `bg-kvenno-orange` (#f36b22)

---

## 🐛 Debugging

```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Format
pnpm format
```

**VSCode debugging:**
- Press F5 to start debugger
- Set breakpoints by clicking line numbers
- Use browser DevTools for React inspection

See [DEBUGGING.md](../DEBUGGING.md) for comprehensive debugging guide.

---

## 📚 Additional Resources

- **Template Documentation:** [tools/game-template/README.md](../tools/game-template/README.md)
- **Shared Library API:** [shared/README.md](../shared/README.md)
- **Development Guide:** [DEVELOPMENT.md](../DEVELOPMENT.md)
- **Example Games:** Browse `games/1-ar/` or `games/3-ar/` for patterns
- **Review Guidelines:** [GAME-REVIEW-PROMPT.md](../GAME-REVIEW-PROMPT.md)

---

## 🆘 Common Issues

### Issue: Translation not showing
**Solution:**
1. Check key exists in both `is.json` and `en.json`
2. Verify correct dot notation: `t('game.title')` not `t('title')`
3. Check for typos in translation key

### Issue: Progress not saving
**Solution:**
1. Ensure consistent `gameId` in `useProgress()`
2. Check browser localStorage quota
3. Verify `updateProgress()` is called

### Issue: Build fails
**Solution:**
1. Run `pnpm type-check` to find TypeScript errors
2. Run `pnpm lint` to find code issues
3. Check all imports are correct
4. Verify `vite.config.ts` is not modified incorrectly

---

**Quick Reference Version:** 1.0
**Last Updated:** 2025-11-29
**Maintained by:** Sigurður E. Vilhelmsson, Kvennaskólinn í Reykjavík
