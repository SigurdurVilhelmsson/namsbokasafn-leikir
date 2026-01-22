# Kvennaskólinn Chemistry Games - Architecture Documentation

**Version:** 1.0.0
**Last Updated:** 2025-12-28

This document describes the architecture, design decisions, and component relationships of the Chemistry Games platform.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Diagrams](#architecture-diagrams)
3. [Monorepo Structure](#monorepo-structure)
4. [Shared Library Architecture](#shared-library-architecture)
5. [Game Architecture](#game-architecture)
6. [Data Flow](#data-flow)
7. [Build System](#build-system)
8. [Deployment Architecture](#deployment-architecture)
9. [Design Decisions](#design-decisions)

---

## System Overview

The Chemistry Games platform is an educational web application consisting of 17 interactive chemistry games organized by academic year level. It follows a monorepo architecture with a centralized shared library.

### Key Characteristics

| Aspect | Description |
|--------|-------------|
| **Type** | Static web application (SPA) |
| **Deployment** | Self-contained HTML files |
| **State** | Client-side only (localStorage) |
| **Backend** | None required |
| **Languages** | Icelandic (primary), English, Polish |

---

## Architecture Diagrams

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CHEMISTRY GAMES PLATFORM                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    GAME APPLICATIONS                      │   │
│  ├──────────────┬──────────────┬──────────────────────────┬─┤   │
│  │   Year 1     │    Year 2    │         Year 3           │ │   │
│  │  (5 games)   │   (7 games)  │        (5 games)         │ │   │
│  │              │              │                          │ │   │
│  │ dimensional  │  hess-law    │  buffer-recipe-creator   │ │   │
│  │ molmassi     │  kinetics    │  equilibrium-shifter     │ │   │
│  │ nafnakerfid  │  lewis-      │  gas-law-challenge       │ │   │
│  │ lausnir      │   structures │  ph-titration            │ │   │
│  │ takmarkandi  │  vsepr-      │  thermodynamics-predictor│ │   │
│  │              │   geometry   │                          │ │   │
│  │              │  intermol-   │                          │ │   │
│  │              │   forces     │                          │ │   │
│  │              │  organic-    │                          │ │   │
│  │              │   nomencl.   │                          │ │   │
│  │              │  redox       │                          │ │   │
│  └──────────────┴──────────────┴──────────────────────────┴─┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    SHARED LIBRARY                         │   │
│  ├──────────────┬──────────────┬──────────────┬─────────────┤   │
│  │    Hooks     │  Components  │   Utilities  │    Types    │   │
│  │              │              │              │             │   │
│  │  useI18n     │ ErrorBound.  │  storage     │ GameLevel   │   │
│  │  useProgress │              │  scoring     │ Progress    │   │
│  │  useAccess.  │              │  export      │ Settings    │   │
│  ├──────────────┴──────────────┴──────────────┴─────────────┤   │
│  │                         Theme                             │   │
│  │            colors | spacing | fontSize | shadows          │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │                    Internationalization                   │   │
│  │              is.json | en.json | pl.json                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BUILD SYSTEM                              │
│                                                                  │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────────┐   │
│  │    Vite     │ → │  React 18   │ → │  Single HTML File   │   │
│  │  + plugins  │   │ TypeScript  │   │  (self-contained)   │   │
│  └─────────────┘   └─────────────┘   └─────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DEPLOYMENT                                │
│                                                                  │
│   kvenno.app/1-ar/games/*.html                                  │
│   kvenno.app/2-ar/games/*.html                                  │
│   kvenno.app/3-ar/games/*.html                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Component Dependency Graph

```
┌────────────────────────────────────────────────────────────────┐
│                         GAME (App.tsx)                          │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Level1    │  │   Level2    │  │        Level3           │ │
│  │  Component  │  │  Component  │  │       Component         │ │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘ │
│         │                │                      │               │
│         └────────────────┼──────────────────────┘               │
│                          │                                      │
│                          ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    SHARED HOOKS                           │  │
│  │                                                           │  │
│  │  ┌──────────┐   ┌────────────┐   ┌──────────────────┐    │  │
│  │  │ useI18n  │   │useProgress │   │ useAccessibility │    │  │
│  │  └────┬─────┘   └─────┬──────┘   └────────┬─────────┘    │  │
│  │       │               │                    │              │  │
│  └───────┼───────────────┼────────────────────┼──────────────┘  │
│          │               │                    │                 │
└──────────┼───────────────┼────────────────────┼─────────────────┘
           │               │                    │
           ▼               ▼                    ▼
┌──────────────────────────────────────────────────────────────────┐
│                        SHARED UTILITIES                           │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                      Browser APIs                            │ │
│  │                                                              │ │
│  │  ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐    │ │
│  │  │localStorage │   │    fetch    │   │ document/window │    │ │
│  │  │  (storage)  │   │    (i18n)   │   │   (export)      │    │ │
│  │  └─────────────┘   └─────────────┘   └─────────────────┘    │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### Data Flow Diagram

```
┌───────────────────────────────────────────────────────────────────┐
│                         USER INTERACTION                           │
└───────────────────────────────┬───────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────┐
│                         REACT COMPONENTS                           │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                      App.tsx (State)                         │  │
│  │                                                              │  │
│  │  currentLevel: GameLevel  ───┐                               │  │
│  │  score: number                │                               │  │
│  │  currentProblem: Problem     ├──▶ Level Components           │  │
│  │  feedbackMessage: string      │                               │  │
│  │                           ───┘                               │  │
│  └─────────────────────────────────────────────────────────────┘  │
└───────────────────────────────┬───────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
┌───────────────────────────────┐  ┌────────────────────────────────┐
│         HOOKS (State)         │  │        UTILITIES (Side Effects)│
│                               │  │                                │
│  useProgress()                │  │  saveProgress()                │
│    ├─ progress (read)         │──│    └─▶ localStorage.setItem()  │
│    ├─ updateProgress()        │  │                                │
│    └─ resetProgress()         │  │  loadProgress()                │
│                               │  │    └─▶ localStorage.getItem()  │
│  useI18n()                    │  │                                │
│    ├─ t() (translate)         │  │  exportProgressAsJSON()        │
│    └─ setLanguage()           │  │    └─▶ Download file           │
│                               │  │                                │
│  useAccessibility()           │  │  calculateCompositeScore()     │
│    ├─ settings                │  │    └─▶ Returns score           │
│    └─ toggleHighContrast()    │  │                                │
└───────────────────────────────┘  └────────────────────────────────┘
                    │                       │
                    └───────────┬───────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────┐
│                         LOCAL STORAGE                              │
│                                                                    │
│  kvenno-chemistry-{gameId}    ──▶ GameProgress JSON                │
│  kvenno-language              ──▶ "is" | "en" | "pl"              │
│  kvenno-accessibility         ──▶ AccessibilitySettings JSON       │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

### Game State Machine

```
                     ┌─────────────┐
                     │    START    │
                     └──────┬──────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │    MAIN MENU        │
                 │  (currentLevel: 0)  │
                 └──────────┬──────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │   LEVEL 1   │ │   LEVEL 2   │ │   LEVEL 3   │
    │ Conceptual  │ │  Practice   │ │  Challenge  │
    │ Questions   │ │  Problems   │ │   Mode      │
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │  Question   │ │   Problem   │ │  Challenge  │
    │  Answered   │ │   Solved    │ │  Completed  │
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │  FEEDBACK   │ │  FEEDBACK   │ │   SCORE     │
    │  Display    │ │  Display    │ │  Summary    │
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
           └───────────────┼───────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  NEXT PROBLEM   │◀───┐
                  │  or LEVEL UP    │    │
                  └────────┬────────┘    │
                           │             │
                           └─────────────┘
```

---

## Monorepo Structure

```
ChemistryGames/
├── games/                          # Game implementations
│   ├── 1-ar/                      # Year 1 games
│   │   ├── dimensional-analysis/
│   │   ├── molmassi/
│   │   ├── nafnakerfid/
│   │   ├── lausnir/
│   │   └── takmarkandi/
│   ├── 2-ar/                      # Year 2 games
│   │   ├── hess-law/
│   │   ├── kinetics/
│   │   └── lewis-structures/
│   └── 3-ar/                      # Year 3 games
│       ├── buffer-recipe-creator/
│       ├── equilibrium-shifter/
│       ├── gas-law-challenge/
│       ├── ph-titration-master/
│       ├── ph-titration-practice/
│       └── thermodynamics-predictor/
│
├── shared/                         # Shared library
│   ├── components/                # React components
│   ├── hooks/                     # Custom React hooks
│   ├── utils/                     # Utility functions
│   ├── types/                     # TypeScript definitions
│   ├── i18n/                      # Translation files
│   ├── styles/                    # Theme configuration
│   └── index.ts                   # Library exports
│
├── tools/                          # Development tools
│   ├── game-template/             # New game boilerplate
│   └── create-game.sh             # Game creation script
│
├── 1-ar/                           # Built Year 1 HTML files
├── 2-ar/                           # Built Year 2 HTML files
├── 3-ar/                           # Built Year 3 HTML files
│
├── docs/                           # Documentation
│
├── package.json                    # Root package.json
├── pnpm-workspace.yaml            # Workspace config
├── tsconfig.base.json             # Base TypeScript config
└── .eslintrc.js                   # ESLint config
```

---

## Shared Library Architecture

### Module Structure

```
shared/
├── index.ts              # Main entry - exports all modules
│
├── hooks/
│   ├── index.ts          # Hook exports
│   ├── useI18n.ts        # Internationalization
│   ├── useProgress.ts    # Progress management
│   └── useAccessibility.ts # Accessibility settings
│
├── components/
│   ├── index.ts          # Component exports
│   └── ErrorBoundary.tsx # Error handling component
│
├── utils/
│   ├── index.ts          # Utility exports
│   ├── storage.ts        # localStorage helpers
│   ├── scoring.ts        # Scoring algorithms
│   └── export.ts         # Data export functions
│
├── types/
│   ├── index.ts          # Type exports
│   └── game.types.ts     # Core type definitions
│
├── i18n/
│   ├── is.json           # Icelandic translations
│   ├── en.json           # English translations
│   └── pl.json           # Polish translations
│
└── styles/
    └── theme.ts          # Design tokens
```

### Import Path Resolution

The `@shared` alias is configured in `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@shared": ["./shared"],
      "@shared/*": ["./shared/*"]
    }
  }
}
```

Games import using the alias:

```typescript
import { useI18n, useProgress, theme } from '@shared';
```

---

## Game Architecture

### Standard Game Structure

```
games/1-ar/dimensional-analysis/
├── src/
│   ├── App.tsx               # Main component (state management)
│   ├── main.tsx              # React entry point
│   ├── styles.css            # Game-specific styles
│   │
│   ├── components/           # UI components
│   │   ├── Level1.tsx        # Conceptual questions
│   │   ├── Level2.tsx        # Practice problems
│   │   ├── Level3.tsx        # Challenge mode
│   │   └── [GameSpecific].tsx
│   │
│   └── data/                 # Game content
│       ├── lessons.ts        # Tutorial content
│       ├── problems.ts       # Practice problems
│       ├── questions.ts      # Quiz questions
│       └── index.ts          # Data exports
│
├── public/                   # Static assets
├── index.html                # HTML template
├── package.json              # Dependencies
├── vite.config.ts            # Build configuration
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # Tailwind config
└── postcss.config.js         # PostCSS config
```

### Component Hierarchy

```
<ErrorBoundary>
  <App>
    ├── MainMenu (currentLevel === 0)
    │   ├── LanguageSelector
    │   ├── AccessibilityPanel
    │   └── LevelButtons
    │
    ├── Level1 (currentLevel === 1)
    │   ├── QuestionDisplay
    │   ├── AnswerOptions
    │   └── FeedbackMessage
    │
    ├── Level2 (currentLevel === 2)
    │   ├── ProblemDisplay
    │   ├── InputFields
    │   ├── HintSystem
    │   └── FeedbackMessage
    │
    └── Level3 (currentLevel === 3)
        ├── ChallengeDisplay
        ├── TimerComponent
        ├── ScoreTracker
        └── ResultsSummary
  </App>
</ErrorBoundary>
```

---

## Data Flow

### State Management Pattern

Games use React's built-in state management with a predictable pattern:

```typescript
// App.tsx
function App() {
  // UI State
  const [currentLevel, setCurrentLevel] = useState<GameLevel>(0);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessage | null>(null);

  // Persistent State (via hooks)
  const { progress, updateProgress, incrementProblems } = useProgress({
    gameId: 'dimensional-analysis'
  });
  const { t, language, setLanguage } = useI18n();
  const { settings, toggleHighContrast } = useAccessibility();

  // Derived State
  const currentProblem = problems[currentProblemIndex];
  const isComplete = currentProblemIndex >= problems.length;

  // Event Handlers
  const handleAnswer = (answer: string) => {
    const isCorrect = validateAnswer(answer, currentProblem);
    if (isCorrect) {
      incrementProblems();
      setFeedbackMessage({ type: 'success', message: t('feedback.correct') });
    } else {
      setFeedbackMessage({ type: 'error', message: t('feedback.incorrect') });
    }
  };

  // Render based on currentLevel
  return (
    <div>
      {currentLevel === 0 && <MainMenu onStart={setCurrentLevel} />}
      {currentLevel === 1 && <Level1 ... />}
      {currentLevel === 2 && <Level2 ... />}
      {currentLevel === 3 && <Level3 ... />}
    </div>
  );
}
```

### Persistence Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  User       │ ──▶ │  useProgress │ ──▶ │ localStorage│
│  Action     │     │  Hook        │     │             │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           │ Auto-save on
                           │ state change
                           ▼
                    ┌──────────────┐
                    │ saveProgress │
                    │ (storage.ts) │
                    └──────────────┘
```

---

## Build System

### Build Process Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         SOURCE FILES                             │
│  .tsx, .ts, .css, .json                                         │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                            VITE                                  │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ @vitejs/        │  │    TypeScript   │  │   PostCSS +     │  │
│  │ plugin-react    │  │    Compiler     │  │   Tailwind      │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │           │
│           └────────────────────┼────────────────────┘           │
│                                │                                 │
│                                ▼                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                   vite-plugin-singlefile                    ││
│  │         Inlines all JS, CSS, and assets into HTML          ││
│  └─────────────────────────────────────────────────────────────┘│
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       OUTPUT (Single HTML)                       │
│                                                                  │
│   1-ar/dimensional-analysis.html  (~250KB, self-contained)     │
│                                                                  │
│   Contains:                                                      │
│   - React runtime                                                │
│   - Game components                                              │
│   - Shared library code                                          │
│   - Tailwind CSS (purged)                                       │
│   - All translations                                             │
│   - Embedded assets (data URIs)                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../../shared'),
    },
  },
  build: {
    outDir: '../../1-ar',
    emptyOutDir: false,
  },
});
```

---

## Deployment Architecture

### Static File Deployment

```
┌─────────────────────────────────────────────────────────────────┐
│                         kvenno.app                               │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Static File Server                      │  │
│  │                 (No backend required)                      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Directory Structure:                                            │
│                                                                  │
│  /                                                               │
│  ├── index.html           (Landing page)                        │
│  ├── 1-ar/                                                       │
│  │   ├── games/                                                  │
│  │   │   ├── dimensional-analysis.html                          │
│  │   │   ├── molmassi.html                                      │
│  │   │   ├── nafnakerfid.html                                   │
│  │   │   ├── lausnir.html                                       │
│  │   │   └── takmarkandi.html                                   │
│  │   └── index.html       (Year 1 menu)                         │
│  │                                                               │
│  ├── 2-ar/                                                       │
│  │   ├── games/                                                  │
│  │   │   ├── hess-law.html                                      │
│  │   │   └── kinetics.html                                      │
│  │   └── index.html       (Year 2 menu)                         │
│  │                                                               │
│  └── 3-ar/                                                       │
│      ├── games/                                                  │
│      │   ├── buffer-recipe-creator.html                         │
│      │   ├── equilibrium-shifter.html                           │
│      │   ├── gas-law-challenge.html                             │
│      │   ├── ph-titration-master.html                           │
│      │   ├── ph-titration-practice.html                         │
│      │   └── thermodynamics-predictor.html                      │
│      └── index.html       (Year 3 menu)                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Deployment Benefits

| Benefit | Description |
|---------|-------------|
| **Simplicity** | Just copy HTML files to server |
| **No Backend** | Pure static hosting (GitHub Pages, S3, etc.) |
| **Offline Support** | Games work without internet after load |
| **No CORS Issues** | All resources embedded |
| **Easy Sharing** | Single file can be downloaded/shared |
| **Cache Friendly** | Entire game in one cacheable file |

---

## Design Decisions

### Why Monorepo?

| Decision | Rationale |
|----------|-----------|
| **Code Sharing** | 85% reduction in duplicate code |
| **Consistency** | Single source of truth for UI/UX |
| **Maintenance** | Fix bugs once, benefit all games |
| **Type Safety** | Shared TypeScript types prevent errors |
| **Centralized i18n** | One update affects all games |

### Why pnpm Workspaces?

| Decision | Rationale |
|----------|-----------|
| **Performance** | Faster than npm/yarn for monorepos |
| **Disk Efficiency** | Symbolic links reduce storage |
| **Strict Isolation** | Prevents phantom dependencies |
| **Clear Boundaries** | Explicit workspace definitions |

### Why Single-File HTML Output?

| Decision | Rationale |
|----------|-----------|
| **Deployment** | Simple file copy, no build pipeline on server |
| **Reliability** | No broken asset links |
| **Offline Use** | Works without network after load |
| **Distribution** | Easy to share via email/USB |
| **Portability** | Runs on any static host |

### Why React + TypeScript?

| Decision | Rationale |
|----------|-----------|
| **Component Model** | Natural fit for game UI structure |
| **Type Safety** | Catch errors at compile time |
| **Ecosystem** | Large library selection |
| **Developer Experience** | Hot reload, excellent tooling |
| **Long-term Support** | Stable, well-maintained |

### Why Tailwind CSS?

| Decision | Rationale |
|----------|-----------|
| **Rapid Development** | Utility-first speeds prototyping |
| **Consistency** | Built-in design system |
| **Small Bundle** | PurgeCSS removes unused styles |
| **Accessibility** | Easy focus, color contrast utilities |
| **Responsive** | Built-in breakpoints |

### Why Client-Side Only (No Backend)?

| Decision | Rationale |
|----------|-----------|
| **Simplicity** | No server infrastructure |
| **Privacy** | Student data stays on device |
| **Offline** | Works without internet |
| **Cost** | Free static hosting |
| **GDPR** | No data collection issues |

---

## Performance Considerations

### Bundle Size Optimization

```
┌──────────────────────────────────────────────────────────────┐
│                    OPTIMIZATION PIPELINE                      │
│                                                               │
│  1. Tree Shaking                                              │
│     └─ Remove unused exports from shared library              │
│                                                               │
│  2. CSS Purging (Tailwind)                                    │
│     └─ Remove unused CSS classes                              │
│                                                               │
│  3. Minification (esbuild via Vite)                          │
│     └─ Minify JS and CSS                                      │
│                                                               │
│  4. Asset Inlining (vite-plugin-singlefile)                  │
│     └─ Convert images to data URIs                            │
│                                                               │
│  Result: ~170-250KB per game (gzipped: ~50-80KB)             │
└──────────────────────────────────────────────────────────────┘
```

### Typical Game Sizes

| Game | Raw Size | Gzipped |
|------|----------|---------|
| Dimensional Analysis | 252KB | ~75KB |
| Molar Mass | 184KB | ~55KB |
| pH Titration | 195KB | ~60KB |

---

## Future Architecture Considerations

### Potential Enhancements

1. **Service Worker** - Enable true offline PWA support
2. **Shared Progress Sync** - Optional cloud sync for teacher dashboards
3. **Micro-Frontend** - Load games as separate chunks for faster initial load
4. **WebAssembly** - Compute-intensive chemistry simulations
5. **React Server Components** - When static export supports them

### Scalability Path

```
Current:  17 games × 230KB = 3.9MB total
Future:   50 games × 200KB = 10MB total (still manageable)

If needed, implement:
- Lazy loading of game data
- Progressive asset loading
- Code splitting by level
```

---

## Summary

The Chemistry Games architecture prioritizes:

1. **Developer Experience** - Monorepo with shared library
2. **Maintainability** - TypeScript, centralized code
3. **Simplicity** - Static files, no backend
4. **Performance** - Single-file bundles, optimized builds
5. **Accessibility** - Built-in accessibility features
6. **Internationalization** - Multi-language support

This architecture successfully supports 17 games while maintaining consistency and enabling rapid development of new educational content.
