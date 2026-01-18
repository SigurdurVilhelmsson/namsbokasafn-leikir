# ChemistryGames Monorepo

## Quick Context

17 educational chemistry games for Kvennaskólinn (years 1-3).
Monorepo with shared components, single-file HTML builds.

## Structure

```
games/              # Individual game projects
├── 1-ar/          # Year 1 games (5)
├── 2-ar/          # Year 2 games (7)
└── 3-ar/          # Year 3 games (5)

shared/            # Shared library
├── hooks/         # useI18n, useProgress, useAccessibility, useAchievements
├── utils/         # Storage, scoring, achievements
├── types/         # TypeScript types
├── i18n/          # Translations (is, en, pl)
└── styles/        # Kvennaskólinn theme

tools/             # Build tools
└── create-game.sh # Game scaffolding

1-ar/, 2-ar/, 3-ar/ # Built HTML files (deployment)
docs/              # Documentation
```

## Tech Stack

- React 18 + TypeScript
- pnpm workspaces
- Vite + vite-plugin-singlefile
- Tailwind CSS

## Key Patterns

### Creating a Game

```bash
cd tools
./create-game.sh <year> <slug> "<Title>" "<Description>"
```

### Building a Game

```bash
cd games/<year>/<game>
pnpm build  # Outputs to ../../<year>/<game>.html
```

### Using Shared Library

```tsx
import { useI18n } from '@shared/hooks/useI18n';
import { useProgress } from '@shared/hooks/useProgress';
import { useAchievements } from '@shared/hooks/useAchievements';
import { storage } from '@shared/utils/storage';
```

## Before Making Changes

1. Read relevant skill in `.claude/skills/`
2. Check if change affects shared/ (impacts all games)
3. Test both dev and build

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install all deps |
| `pnpm dev` | Dev server (in game dir) |
| `pnpm build` | Build single HTML |
| `pnpm type-check` | TypeScript check |
| `pnpm format` | Format code |

## Documentation

- [docs/README.md](docs/README.md) - Documentation hub
- [docs/DEVELOPER-GUIDE.md](docs/DEVELOPER-GUIDE.md) - Development workflow
- [docs/API-REFERENCE.md](docs/API-REFERENCE.md) - Shared library API
- [docs/game-improvement/](docs/game-improvement/) - Improvement roadmap
