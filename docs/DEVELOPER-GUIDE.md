# Kvennaskólinn Chemistry Games - Developer Guide

**Version:** 1.0.0
**Last Updated:** 2025-12-28

A comprehensive guide for developers working on the Chemistry Games platform.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Environment](#development-environment)
3. [Creating a New Game](#creating-a-new-game)
4. [Using the Shared Library](#using-the-shared-library)
5. [Styling Guide](#styling-guide)
6. [Internationalization](#internationalization)
7. [Testing](#testing)
8. [Building and Deployment](#building-and-deployment)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Getting Started

### Prerequisites

- **Node.js** 18.0.0 or higher
- **pnpm** 8.15.0 or higher
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Importer

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/your-org/ChemistryGames.git
cd ChemistryGames

# Install pnpm if not already installed
npm install -g pnpm

# Install all dependencies
pnpm install

# Verify installation
pnpm type-check
```

### Repository Structure Overview

```
ChemistryGames/
├── games/                 # Game implementations
│   ├── 1-ar/             # Year 1 games (5 games)
│   ├── 2-ar/             # Year 2 games (3 games)
│   └── 3-ar/             # Year 3 games (6 games)
├── shared/               # Shared library (hooks, utils, types)
├── tools/                # Development tools
├── docs/                 # Documentation
├── 1-ar/, 2-ar/, 3-ar/   # Built HTML files
├── package.json          # Root package.json
└── pnpm-workspace.yaml   # Workspace configuration
```

---

## Development Environment

### Running a Game in Development Mode

```bash
# Navigate to the game directory
cd games/1-ar/dimensional-analysis

# Start development server
pnpm dev

# Opens at http://localhost:5173 with hot reload
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint issues |
| `pnpm format` | Format with Prettier |
| `pnpm validate` | Run all checks |

### VS Code Configuration

Create `.vscode/settings.json` for optimal experience:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "tailwindCSS.experimental.classRegex": [
    ["className=\"([^\"]*)", "([^\"]*)"]
  ]
}
```

---

## Creating a New Game

### Using the Game Template Script

```bash
cd tools
./create-game.sh <year> <game-name> "<Title>" "<Description>"

# Example:
./create-game.sh 2-ar kinetics "Reaction Kinetics" "Learn about reaction rates"
```

This creates:
```
games/2-ar/kinetics/
├── src/
│   ├── App.tsx           # Main component
│   ├── main.tsx          # Entry point
│   ├── styles.css        # Styles
│   ├── components/       # Level components
│   └── data/             # Game data
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

### Manual Game Creation

1. **Copy the template**:
   ```bash
   cp -r tools/game-template games/2-ar/my-game
   ```

2. **Update `package.json`**:
   ```json
   {
     "name": "@games/my-game",
     "version": "1.0.0",
     "private": true
   }
   ```

3. **Configure `vite.config.ts`**:
   ```typescript
   export default defineConfig({
     plugins: [react(), viteSingleFile()],
     resolve: {
       alias: {
         '@shared': path.resolve(__dirname, '../../shared'),
       },
     },
     build: {
       outDir: '../../2-ar',
       rollupOptions: {
         output: {
           entryFileNames: 'my-game.html',
         },
       },
     },
   });
   ```

4. **Install dependencies**:
   ```bash
   cd games/2-ar/my-game
   pnpm install
   ```

### Game Structure Pattern

Every game follows this pattern:

```typescript
// App.tsx
import { useState } from 'react';
import { useI18n, useProgress, useAccessibility, ErrorBoundary } from '@shared';

function App() {
  // UI State
  const [currentLevel, setCurrentLevel] = useState<GameLevel>(0);
  const [currentProblem, setCurrentProblem] = useState(0);

  // Shared Hooks
  const { t, language, setLanguage } = useI18n();
  const { progress, incrementProblems } = useProgress({ gameId: 'my-game' });
  const { settings, toggleHighContrast } = useAccessibility();

  // Render based on level
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {currentLevel === 0 && <MainMenu onStart={setCurrentLevel} />}
        {currentLevel === 1 && <Level1 ... />}
        {currentLevel === 2 && <Level2 ... />}
        {currentLevel === 3 && <Level3 ... />}
      </div>
    </ErrorBoundary>
  );
}
```

### Defining Game Data

Create data files in `src/data/`:

```typescript
// src/data/questions.ts
export interface Question {
  id: string;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questions: Question[] = [
  {
    id: 'Q1',
    prompt: 'What is the molar mass of H2O?',
    options: ['18 g/mol', '16 g/mol', '20 g/mol', '17 g/mol'],
    correct: 0,
    explanation: 'H2O = 2(1) + 16 = 18 g/mol',
    difficulty: 'easy',
  },
  // More questions...
];
```

```typescript
// src/data/index.ts
export * from './questions';
export * from './problems';
export * from './lessons';
```

---

## Using the Shared Library

### Importing

```typescript
// Import specific items
import { useI18n, useProgress, useAccessibility } from '@shared';
import { saveProgress, calculateCompositeScore } from '@shared';
import { GameProgress, GameLevel } from '@shared';
import { theme, colors, spacing } from '@shared';

// Or import the hook modules
import { useI18n } from '@shared/hooks/useI18n';
```

### useI18n Hook

```typescript
function MyComponent() {
  const { t, language, setLanguage, availableLanguages } = useI18n();

  return (
    <div>
      {/* Basic translation */}
      <h1>{t('mainMenu.title')}</h1>

      {/* With fallback */}
      <p>{t('optional.key', 'Default text')}</p>

      {/* Language selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
      >
        {availableLanguages.map(lang => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
```

### useProgress Hook

```typescript
function GameScreen() {
  const {
    progress,
    updateProgress,
    incrementProblems,
    setLevel,
    resetProgress,
  } = useProgress({
    gameId: 'my-game',
    initialProgress: { currentLevel: 1 },
  });

  const handleCorrectAnswer = () => {
    incrementProblems();
  };

  const handleLevelComplete = () => {
    updateProgress({
      levelProgress: {
        ...progress.levelProgress,
        level1: {
          ...progress.levelProgress.level1,
          mastered: true,
        },
      },
    });
    setLevel(2);
  };

  return (
    <div>
      <p>Problems: {progress.problemsCompleted}</p>
      <p>Level: {progress.currentLevel}</p>
    </div>
  );
}
```

### useAccessibility Hook

```typescript
function SettingsPanel() {
  const {
    settings,
    toggleHighContrast,
    setTextSize,
    toggleReducedMotion,
    resetSettings,
  } = useAccessibility();

  return (
    <div className="settings-panel">
      <label>
        <input
          type="checkbox"
          checked={settings.highContrast}
          onChange={toggleHighContrast}
        />
        High Contrast
      </label>

      <select
        value={settings.textSize}
        onChange={(e) => setTextSize(e.target.value as 'small' | 'medium' | 'large')}
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>

      <button onClick={resetSettings}>Reset</button>
    </div>
  );
}
```

### ErrorBoundary Component

```typescript
import { ErrorBoundary } from '@shared';

function App() {
  return (
    <ErrorBoundary
      fallback={<CustomErrorScreen />}
      onError={(error, info) => {
        // Log to external service
        console.error(error, info);
      }}
    >
      <GameContent />
    </ErrorBoundary>
  );
}
```

### Utility Functions

```typescript
import {
  // Storage
  saveProgress,
  loadProgress,
  clearProgress,
  exportAllProgress,

  // Scoring
  calculateCompositeScore,
  countSignificantFigures,
  validateSignificantFigures,
  calculateEfficiencyScore,

  // Export
  exportProgressAsJSON,
  exportProgressAsCSV,
  formatTimeSpent,
  calculatePercentage,
} from '@shared';

// Example: Score calculation
const score = calculateCompositeScore(
  1.0,   // Answer score
  0.8,   // Method score
  0.6,   // Explanation score
  1.0    // Efficiency score
);

// Example: Export progress
const handleExport = () => {
  exportProgressAsJSON(
    'my-game',
    'My Chemistry Game',
    '1.0.0',
    progress,
    { totalProblems: 30, accuracy: 85 }
  );
};
```

---

## Styling Guide

### Tailwind CSS

Use Tailwind classes for styling:

```tsx
// Layout
<div className="min-h-screen flex flex-col items-center justify-center p-4">

// Card component
<div className="bg-white rounded-lg shadow-md p-6 max-w-xl w-full">

// Button styles
<button className="bg-[#f36b22] hover:bg-[#d95a1a] text-white px-6 py-2 rounded-md font-medium transition-colors">

// Grid layout
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
```

### Theme Colors

Use the Kvennaskólinn brand colors:

```tsx
// Primary orange (brand color)
className="bg-[#f36b22]"        // Primary
className="bg-[#d95a1a]"        // Primary dark (hover)
className="bg-[#ff8c4d]"        // Primary light

// Semantic colors
className="bg-green-500"        // Success
className="bg-yellow-500"       // Warning
className="bg-red-500"          // Error
className="bg-blue-500"         // Info

// Using CSS variables (recommended)
className="bg-[var(--color-primary)]"
```

### High Contrast Mode

Styles for high contrast mode are handled automatically via CSS classes:

```css
/* Applied when high contrast is enabled */
.high-contrast {
  --bg-primary: #000000;
  --text-primary: #ffffff;
  --border-color: #ffff00;
}

.high-contrast .card {
  background: #000;
  color: #fff;
  border: 2px solid #ffff00;
}
```

### Text Sizes

Use responsive text sizes:

```tsx
// Base sizes that respond to accessibility settings
<h1 className="text-2xl font-bold">Title</h1>
<p className="text-base">Body text</p>
<span className="text-sm">Small text</span>
```

### Reduced Motion

Respect user preference:

```css
/* Animations are automatically disabled when reduced motion is enabled */
.reduced-motion * {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
```

---

## Internationalization

### Adding Translations

Add keys to each language file in `shared/i18n/`:

```json
// shared/i18n/is.json
{
  "myGame": {
    "title": "Efnafræði Leikur",
    "instructions": "Veldu rétta svarið",
    "feedback": {
      "correct": "Rétt!",
      "incorrect": "Rangt, reyndu aftur"
    }
  }
}
```

```json
// shared/i18n/en.json
{
  "myGame": {
    "title": "Chemistry Game",
    "instructions": "Select the correct answer",
    "feedback": {
      "correct": "Correct!",
      "incorrect": "Wrong, try again"
    }
  }
}
```

### Using Translations

```typescript
const { t } = useI18n();

// Access nested keys with dot notation
<h1>{t('myGame.title')}</h1>
<p>{t('myGame.instructions')}</p>
<span>{t('myGame.feedback.correct')}</span>

// With fallback
<p>{t('myGame.optional', 'Default text')}</p>
```

### Adding a New Language

1. Create new translation file: `shared/i18n/de.json`

2. Copy structure from existing file:
   ```bash
   cp shared/i18n/en.json shared/i18n/de.json
   ```

3. Translate all values

4. Update the Language type in `useI18n.ts`:
   ```typescript
   type Language = 'is' | 'en' | 'pl' | 'de';
   ```

---

## Testing

### Type Checking

```bash
# Check all packages
pnpm type-check

# Check specific game
cd games/1-ar/my-game
npx tsc --noEmit
```

### Manual Testing Checklist

- [ ] All three levels work correctly
- [ ] Language switching works
- [ ] Progress is saved to localStorage
- [ ] High contrast mode works
- [ ] Text size changes work
- [ ] Reduced motion disables animations
- [ ] Keyboard navigation works
- [ ] Mobile responsive layout works
- [ ] Export functionality works

### Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## Building and Deployment

### Building a Game

```bash
# Navigate to game directory
cd games/1-ar/my-game

# Build for production
pnpm build

# Output: ../../1-ar/my-game.html
```

### Build All Games

```bash
# From root directory
pnpm build:all
```

### Deployment

Built HTML files are self-contained and can be deployed to any static hosting:

```bash
# Copy to deployment server
scp 1-ar/*.html user@server:/var/www/kvenno.app/1-ar/games/
scp 2-ar/*.html user@server:/var/www/kvenno.app/2-ar/games/
scp 3-ar/*.html user@server:/var/www/kvenno.app/3-ar/games/
```

### Verifying Build

```bash
# Check file size (should be ~150-250KB)
ls -lh 1-ar/my-game.html

# Open in browser
open 1-ar/my-game.html  # macOS
start 1-ar/my-game.html # Windows
```

---

## Troubleshooting

### Common Issues

#### 1. Module not found: @shared

```bash
# Ensure you're in a game directory with proper dependencies
pnpm install

# Check tsconfig.json has correct paths
{
  "compilerOptions": {
    "paths": {
      "@shared": ["../../shared"],
      "@shared/*": ["../../shared/*"]
    }
  }
}
```

#### 2. TypeScript errors in shared library

```bash
# Check for circular imports
pnpm type-check

# Ensure all exports are correct in shared/index.ts
```

#### 3. Build fails with asset errors

```bash
# Clear build cache
rm -rf node_modules/.vite
pnpm build
```

#### 4. Hot reload not working

```bash
# Restart dev server
pnpm dev

# Check for file watching limits (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
```

#### 5. localStorage not persisting

- Check browser privacy settings
- Ensure no localStorage clearing on close
- Test in incognito to verify

### Debug Mode

Enable debug logging:

```typescript
// In useProgress.ts, add logging
const saveProgress = (gameId: string, progress: GameProgress) => {
  console.log('Saving progress:', gameId, progress);
  localStorage.setItem(`kvenno-chemistry-${gameId}`, JSON.stringify(progress));
};
```

---

## Best Practices

### Code Organization

1. **Keep App.tsx focused** - State management and level routing only
2. **Separate data from components** - All questions/problems in `data/`
3. **One component per file** - Each level component in its own file
4. **Export types with implementations** - Helps IDE auto-imports

### Performance

1. **Memoize expensive calculations**:
   ```typescript
   const filteredProblems = useMemo(
     () => problems.filter(p => p.difficulty === difficulty),
     [problems, difficulty]
   );
   ```

2. **Avoid inline functions in render**:
   ```typescript
   // Good
   const handleClick = useCallback(() => {
     // handler
   }, [dependencies]);

   // Avoid
   <button onClick={() => doSomething()} />
   ```

3. **Lazy load heavy components** (if needed):
   ```typescript
   const Level3 = lazy(() => import('./components/Level3'));
   ```

### Accessibility

1. **Always provide alt text for images**
2. **Use semantic HTML** (`<button>`, `<nav>`, `<main>`)
3. **Ensure color contrast ratios** (WCAG AA minimum)
4. **Support keyboard navigation** (tab order, focus visible)
5. **Use ARIA labels for interactive elements**

### TypeScript

1. **Define interfaces for all props**:
   ```typescript
   interface Level1Props {
     problems: Problem[];
     onComplete: (score: number) => void;
   }
   ```

2. **Use strict types, avoid `any`**

3. **Export types for reuse**:
   ```typescript
   export interface Question {
     id: string;
     // ...
   }
   export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
   ```

### Git Workflow

1. **Use conventional commits**:
   ```
   feat: Add new scoring algorithm
   fix: Correct timer reset on level change
   docs: Update developer guide
   refactor: Extract common button component
   ```

2. **Create feature branches**:
   ```bash
   git checkout -b feature/add-kinetics-game
   ```

3. **Write descriptive PR descriptions**

### Security

1. **Never store sensitive data in localStorage**
2. **Sanitize any user input before display**
3. **Keep dependencies updated** (`pnpm update`)
4. **Review security advisories** (`pnpm audit`)

---

## Quick Reference

### File Locations

| File | Location |
|------|----------|
| Shared hooks | `shared/hooks/` |
| Shared utils | `shared/utils/` |
| Translations | `shared/i18n/` |
| Types | `shared/types/` |
| Theme | `shared/styles/theme.ts` |
| Game template | `tools/game-template/` |

### Key Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm type-check       # Type checking
pnpm lint             # Linting
pnpm format           # Formatting
```

### Useful Links

- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev/guide/)

---

## Getting Help

- Check existing games for examples
- Review the API Reference (`docs/API-REFERENCE.md`)
- Review the Architecture docs (`docs/ARCHITECTURE.md`)
- Open a GitHub issue for bugs
- Contact the development team

---

**Happy coding!**
