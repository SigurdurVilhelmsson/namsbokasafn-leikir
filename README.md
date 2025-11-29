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
- **Levels**: 3 progressive difficulty levels (lessons, practice, challenges)
- **Features**: 35 interactive questions, scaffolded practice, complete scoring system
- **Source**: `games/1-ar/dimensional-analysis/`
- **Build**: `dimensional-analysis-game-new.html` (168KB)

#### ✅ Einingagreining Einföld (Dimensional Analysis Simple) - **MIGRATED**
- **Topics**: Unit conversion fundamentals
- **Format**: Tutorial + sandbox + quiz
- **Features**: Worked examples, interactive playground, progress tracking
- **Source**: `games/1-ar/dimensional-analysis-simple/`
- **Build**: `dimensional-analysis-simple.html` (190KB)

#### ✅ Mólmassi (Molar Mass Challenge) - **MIGRATED**
- **Topics**: Molar mass calculations, chemical formulas, periodic table
- **Format**: Practice & Competition modes with timer
- **Features**: 29 compounds, 4 difficulty levels, hint system, streak tracking
- **Source**: `games/1-ar/molmassi/`
- **Build**: `molmassi.html` (184KB)

#### ✅ Nafnakerfið (Compound Name Matchmaker) - **MIGRATED**
- **Topics**: Chemical nomenclature, formula-name matching
- **Format**: Card matching game with 3D animations
- **Features**: 59 compounds, 3 difficulty levels, configurable pairs, best score tracking
- **Source**: `games/1-ar/nafnakerfid/`
- **Build**: `nafnakerfid.html` (172KB)

#### ✅ Lausnir (Solution Lab) - **MIGRATED**
- **Topics**: Molarity, dilution, solution mixing, concentration calculations
- **Format**: Interactive problem-solving with beaker animations
- **Features**: 5 problem types, 3 difficulty levels, step-by-step solutions, hint system
- **Source**: `games/1-ar/lausnir/`
- **Build**: `lausnir.html` (201KB)

#### ✅ Takmarkandi (Limiting Reactant Factory) - **MIGRATED**
- **Topics**: Limiting reagents, stoichiometry, product formation
- **Format**: Problem-solving game with molecule visualization
- **Features**: 20 reactions, 3 difficulty levels, detailed solutions, streak system
- **Source**: `games/1-ar/takmarkandi/`
- **Build**: `takmarkandi.html` (188KB)

### Year 3 (3-ár) - Advanced Chemistry

#### ✅ pH Titration Practice - **MIGRATED**
- **Topics**: Acid-base titrations, pH calculations, titration curves
- **Format**: Interactive virtual laboratory
- **Features**: 4 titration types, real-time pH curves, universal indicator, 5 weak acids/bases
- **Source**: `games/3-ar/ph-titration-practice/`
- **Build**: `ph-titration-practice.html` (179KB)

#### ✅ pH Titration Master - **MIGRATED**
- **Topics**: Advanced pH and titrations including polyprotic acids
- **Format**: Practice & Challenge modes with scoring
- **Features**: 13 titration problems, 5 indicators, volume accuracy scoring, curve visualization
- **Source**: `games/3-ar/ph-titration-master/`
- **Build**: `ph-titration-master.html` (191KB)

#### ✅ Gas Law Challenge - **MIGRATED**
- **Topics**: Ideal Gas Law (PV = nRT), gas properties
- **Format**: Problem-solving with particle visualization
- **Features**: 8 problems across 3 difficulties, canvas particle animations, 4-level hints
- **Source**: `games/3-ar/gas-law-challenge/`
- **Build**: `gas-law-challenge.html` (178KB)

#### ✅ Equilibrium Shifter - **MIGRATED**
- **Topics**: Chemical equilibrium, Le Chatelier's Principle
- **Format**: Learning & Challenge modes
- **Features**: 30 equilibrium systems, stress predictions, animated shifts, bilingual explanations
- **Source**: `games/3-ar/equilibrium-shifter/`
- **Build**: `equilibrium-shifter.html` (212KB)

#### ✅ Thermodynamics Predictor - **MIGRATED**
- **Topics**: Gibbs free energy (ΔG = ΔH - TΔS), spontaneity
- **Format**: Interactive problem-solving with graphing
- **Features**: 30 problems, temperature slider (200-1200 K), real-time ΔG graphs, entropy visualization
- **Source**: `games/3-ar/thermodynamics-predictor/`
- **Build**: `thermodynamics-predictor.html` (180KB)

#### ✅ Buffer Recipe Creator - **MIGRATED**
- **Topics**: Buffer solutions, Henderson-Hasselbalbalch equation
- **Format**: Recipe calculation game with flask visualization
- **Features**: 30 buffer problems, pH scale animation, difficulty filters, step-by-step solutions
- **Source**: `games/3-ar/buffer-recipe-creator/`
- **Build**: `buffer-recipe-creator.html` (185KB)

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

### Quick Links
- **[Documentation Hub](docs/README.md)** - Complete documentation index
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and changes
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development workflow and tools
- **[DEBUGGING.md](DEBUGGING.md)** - Debugging guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment to kvenno.app
- **[KVENNO-STRUCTURE.md](KVENNO-STRUCTURE.md)** - Site structure and design

### Additional Resources
- **[tools/game-template/README.md](tools/game-template/README.md)** - Template guide
- **[shared/README.md](shared/README.md)** - Shared library API
- **[GAME-REVIEW-PROMPT.md](GAME-REVIEW-PROMPT.md)** - Game review guidelines
- **[Archived Docs](docs/archive/)** - Historical documentation (completed migrations)

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
| ✅ Completed | 12 | Full migration to new architecture |
| 🚧 In Progress | 0 | Currently being migrated |
| ⏳ Pending | 0 | Awaiting migration |
| **Total** | **12** | **All games** |

**Phase 2 Complete!** All games have been successfully migrated to the monorepo architecture.

See [MIGRATION-PLAN.md](MIGRATION-PLAN.md) for detailed migration status and Phase 3 plans.

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
