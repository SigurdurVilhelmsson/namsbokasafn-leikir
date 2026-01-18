---
name: game-development
description: Creating and structuring games. Triggers for new games, game structure.
---

# Game Development

## Creating a New Game

Use the scaffolding script:

```bash
cd tools
./create-game.sh <year> <slug> "<Title>" "<Description>"
# Example:
./create-game.sh 2-ar kinetics "Reaction Kinetics" "Rate laws and mechanisms"
```

## Game Structure

```
games/<year>/<game>/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
└── src/
    ├── App.tsx           # Main component
    ├── data/             # Game data (questions, levels)
    ├── components/       # Game-specific components
    └── hooks/            # Game-specific hooks
```

## Standard Game Features

All games should have:

- 3 difficulty levels (progressive)
- i18n support (is, en, pl)
- Accessibility options
- Progress saving
- Achievement integration

## Using Shared Library

```tsx
// i18n
import { useI18n } from '@shared/hooks/useI18n';
const { t, locale, setLocale } = useI18n();

// Progress
import { useProgress } from '@shared/hooks/useProgress';
const { progress, saveProgress } = useProgress('game-id');

// Accessibility
import { useAccessibility } from '@shared/hooks/useAccessibility';
const { highContrast, textSize } = useAccessibility();

// Achievements
import { useAchievements } from '@shared/hooks/useAchievements';
const { unlock } = useAchievements();
```

## Building

```bash
cd games/<year>/<game>
pnpm build
# Output: ../../<year>/<game>.html (single file, <300KB ideal)
```
