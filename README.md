# ChemistryGames 🧪

Interactive chemistry educational games for Kvennaskólinn í Reykjavík. Built with React, TypeScript, and Tailwind CSS, featuring multi-language support (Icelandic, English, Polish).

**Part of the Kvenno Efnafræði ecosystem** - Comprehensive chemistry learning platform

---

## 🏗️ Architecture

This repository uses a **monorepo architecture** with shared components for maintainability and consistency:

```
ChemistryGames/
├── shared/                 # Shared component library
│   ├── hooks/             # React hooks (i18n, progress, accessibility)
│   ├── utils/             # Utilities (storage, export, scoring)
│   ├── types/             # TypeScript type definitions
│   ├── i18n/              # Translation files (is, en, pl)
│   └── styles/            # Kvennaskólinn brand theme
├── games/                  # Individual game projects
│   ├── 1-ar/              # Year 1 games
│   ├── 2-ar/              # Year 2 games (planned)
│   └── 3-ar/              # Year 3 games
├── tools/                  # Development tools
│   ├── game-template/     # Template for new games
│   └── create-game.sh     # Game creation script
└── 1-ar/, 2-ar/, 3-ar/    # Built game HTML files (deployment)
```

### Why Monorepo?

- **85% Code Reduction**: Games are ~300-500 lines instead of 3000+
- **Centralized i18n**: Update 1 file → affects all games
- **Shared Components**: Fix bugs once → all games benefit
- **Type Safety**: Full TypeScript support
- **Consistency**: Automatic UI/UX uniformity

---

## 🚀 Quick Start

### Prerequisites

```bash
# Install pnpm (if not already installed)
npm install -g pnpm

# Install all dependencies
pnpm install
```

### Development

```bash
# Start development server for a specific game
cd games/1-ar/dimensional-analysis
pnpm dev  # Opens at http://localhost:5173

# Build a game to single HTML file
pnpm build  # Outputs to ../../1-ar/dimensional-analysis-game-new.html
```

### Create a New Game

```bash
cd tools
./create-game.sh <year> <game-name> "<Title>" "<Description>"

# Example:
./create-game.sh 1-ar molmassi "Mólmassi Leikur" "Læra um mólmassa efna"
```

See [tools/game-template/README.md](tools/game-template/README.md) for detailed template documentation.

---

## 🎮 Games

### Year 1 (1-ár) - Foundation Chemistry

#### ✅ Einingagreining (Dimensional Analysis) - **MIGRATED**
- **Topics**: Unit conversion, dimensional analysis, factor-label method
- **Levels**: 3 progressive difficulty levels
- **Features**: Interactive lessons, scaffolded practice, advanced challenges
- **Source**: `games/1-ar/dimensional-analysis/`
- **Build**: `dimensional-analysis-game-new.html` (168KB)

#### ⏳ Mólmassi (Molar Mass Challenge)
- **Topics**: Molar mass calculations, chemical formulas
- **Format**: Timed speed quiz (90 seconds)
- **Status**: Pending migration
- **Original**: `1-ar/molmassi.html` (1833 lines)

#### ⏳ Nafnakerfið (Compound Name Matchmaker)
- **Topics**: Chemical nomenclature, formula-name matching
- **Format**: Memory matching game
- **Status**: Pending migration
- **Original**: `1-ar/nafnakerfid.html` (1734 lines)

#### ⏳ Lausnir (Solution Lab)
- **Topics**: Molarity, dilution, solution mixing
- **Format**: Problem-solving game
- **Status**: Pending migration
- **Original**: `1-ar/lausnir.html` (1745 lines)

#### ⏳ Takmarkandi (Limiting Reactant Factory)
- **Topics**: Limiting reagents, stoichiometry
- **Format**: Problem-solving game
- **Status**: Pending migration
- **Original**: `1-ar/takmarkandi.html` (1835 lines)

### Year 3 (3-ár) - Advanced Chemistry

#### ⏳ pH Titration Practice
- **Topics**: Acid-base titrations, pH calculations
- **Status**: Pending migration
- **Original**: `3-ar/ph-titration-practice.html` (1324 lines)

#### ⏳ Thermodynamics Predictor
- **Topics**: Enthalpy, entropy, Gibbs free energy
- **Status**: Pending migration
- **Original**: `3-ar/thermodynamics-predictor.html` (1221 lines)

... [See MIGRATION-PLAN.md for complete list]

---

## 🛠️ Technology Stack

### Build System
- **pnpm Workspaces** - Monorepo package management
- **Vite** - Fast build tool and dev server
- **TypeScript 5.3+** - Type safety
- **vite-plugin-singlefile** - Single HTML output

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Utility-first styling
- **PostCSS + Autoprefixer** - CSS processing

### Shared Library
- **Custom Hooks**: `useI18n`, `useProgress`, `useAccessibility`
- **Utilities**: Storage, export, scoring algorithms
- **i18n**: Translation system with 3 languages

---

## 📖 Documentation

- **[MIGRATION-PLAN.md](MIGRATION-PLAN.md)** - Game migration status and plan
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment to kvenno.app
- **[KVENNO-STRUCTURE.md](KVENNO-STRUCTURE.md)** - Site structure and design
- **[tools/game-template/README.md](tools/game-template/README.md)** - Template guide
- **[shared/README.md](shared/README.md)** - Shared library API (coming soon)

---

## 🌍 Multi-Language Support

All games support:
- 🇮🇸 **Íslenska** (Icelandic) - Primary language
- 🇬🇧 **English** - Full translation
- 🇵🇱 **Polski** (Polish) - In progress

Add new languages by:
1. Adding translation file to `shared/i18n/<lang>.json`
2. Games automatically pick up new languages

---

## ♿ Accessibility Features

All games include:
- ✅ High contrast mode
- ✅ Adjustable text size (small, medium, large)
- ✅ Reduced motion option
- ✅ Keyboard navigation support
- ✅ Screen reader compatible (ARIA labels)
- ✅ Focus indicators
- ✅ Skip links

---

## 📊 Progress Tracking

### For Students
- Automatic progress saving to localStorage
- Level completion tracking
- Score history
- Achievement unlocking

### For Teachers
- Export student progress as JSON
- View statistics by level
- Track mastery status
- Download progress reports

---

## 🚢 Deployment

### Production Build

```bash
# Build all games
pnpm build

# Build specific game
cd games/1-ar/dimensional-analysis
pnpm build
```

### Deploy to kvenno.app

Built HTML files are placed in year directories (`1-ar/`, `2-ar/`, `3-ar/`) and can be deployed directly:

```bash
# Copy to deployment directory
cp 1-ar/*.html /path/to/kvenno.app/1-ar/games/
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

---

## 🔧 Development Workflow

### Adding a New Game

1. **Create from template**:
   ```bash
   cd tools
   ./create-game.sh 1-ar my-game "My Game Title" "Description"
   ```

2. **Define game data** in `src/data/`:
   ```typescript
   export const questions: Question[] = [
     { id: 'Q1', prompt: '...', options: [...], correct: 1 }
   ];
   ```

3. **Implement game logic** in `src/App.tsx`

4. **Test**:
   ```bash
   pnpm dev    # Development server
   pnpm build  # Production build
   ```

### Modifying Shared Components

Changes to `/shared` automatically affect all games:

```bash
cd shared
# Edit hooks, utils, types, or i18n files
# All games will use updated code on next build
```

### Type Checking

```bash
# Check types for all packages
pnpm type-check

# Check specific game
cd games/1-ar/dimensional-analysis
pnpm type-check
```

---

## 📈 Migration Status

| Status | Count | Description |
|--------|-------|-------------|
| ✅ Completed | 1 | Full migration to new architecture |
| 🚧 In Progress | 0 | Currently being migrated |
| ⏳ Pending | 11 | Awaiting migration |
| **Total** | **12** | **All games** |

See [MIGRATION-PLAN.md](MIGRATION-PLAN.md) for detailed status.

---

## 🤝 Contributing

### Code Structure
- Use TypeScript for all new code
- Follow existing patterns in shared library
- Add JSDoc comments to public APIs
- Export types alongside implementations

### Commit Messages
Follow conventional commits:
```
feat: Add new chemistry game template
fix: Correct sig fig validation in scoring
docs: Update migration plan with progress
refactor: Extract common util functions
```

---

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

---

## 🏫 About Kvennaskólinn

This project is developed for Kvennaskólinn í Reykjavík, supporting chemistry education across all three years of upper secondary school.

**Part of kvenno.app** - The comprehensive learning platform for Kvennaskólinn students

---

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Contact the development team
- See existing games for examples

---

**Built with ❤️ for chemistry students at Kvennaskólinn**
