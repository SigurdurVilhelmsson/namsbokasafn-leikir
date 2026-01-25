# ChemistryGames 🧪

Interactive chemistry educational games for Kvennaskólinn í Reykjavík. Built with React, TypeScript, and Tailwind CSS, featuring multi-language support (Icelandic, English, Polish).

**Part of the Kvenno Efnafræði ecosystem** - Comprehensive chemistry learning platform

---

## ✨ Key Features

- **17 Educational Games** across 3 years of chemistry curriculum
- **Cross-Game Achievement System** - 23 achievements with 5 rarity levels, streak tracking, persistent progress
- **Multi-Language Support** - Icelandic (primary), English, Polish
- **Accessibility Features** - High contrast, text scaling, reduced motion
- **Single-File Deployment** - Each game builds to a self-contained HTML file
- **Offline Capable** - All progress saved locally via localStorage

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
│   ├── 2-ar/              # Year 2 games
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
pnpm build  # Outputs to ../../1-ar/dimensional-analysis.html
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

#### ✅ Einingagreining (Dimensional Analysis) - **ENHANCED**
- **Topics**: Unit conversion, dimensional analysis, factor-label method
- **Levels**: 3 progressive difficulty levels (lessons, practice, challenges)
- **Features**: 35+ interactive questions including 8 real-world chemistry lab scenarios, enhanced unit cancellation animation, drag-and-drop unit chain building
- **Source**: `games/1-ar/dimensional-analysis/`
- **Build**: `dimensional-analysis.html` (168KB)

#### ✅ Mólmassi (Molar Mass Challenge) - **ENHANCED**
- **Topics**: Molar mass calculations, chemical formulas, periodic table
- **Format**: Practice & Competition modes with timer, Mystery Molecule mode
- **Features**: 29 compounds, 4 difficulty levels, hint system, streak tracking, proper periodic table with grid layout, 2D/3D molecule visualization
- **New**: Mystery Molecule mode - work backwards from molar mass to identify compounds
- **Source**: `games/1-ar/molmassi/`
- **Build**: `molmassi.html` (184KB)

#### ✅ Nafnakerfið (Compound Name Matchmaker) - **ENHANCED**
- **Topics**: Chemical nomenclature, formula-name matching
- **Format**: Card matching game with 3D animations, bonus Name Builder mode
- **Features**: 59 compounds, 3 difficulty levels, configurable pairs, best score tracking, molecular structure visualization on cards, structural formula display with bonds
- **New**: Name Builder (Nafnasmiðja) bonus mode - learn naming rules by building names from parts (prefixes, roots, suffixes)
- **Source**: `games/1-ar/nafnakerfid/`
- **Build**: `nafnakerfid.html` (172KB)

#### ✅ Lausnir (Solution Lab) - **ENHANCED**
- **Topics**: Molarity, dilution, solution mixing, concentration calculations, temperature effects on solubility
- **Format**: Interactive problem-solving with beaker animations
- **Features**: 5 problem types, 3 difficulty levels, step-by-step solutions, hint system, visual stoichiometry components
- **New**: Temperature-solubility visualization with real data for 6 compounds (KNO₃, NaCl, sugar, CaSO₄, O₂, CO₂), interactive temperature explorer
- **Source**: `games/1-ar/lausnir/`
- **Build**: `lausnir.html` (201KB)

#### ✅ Takmarkandi (Limiting Reactant Factory) - **ENHANCED**
- **Topics**: Limiting reagents, stoichiometry, product formation
- **Format**: Problem-solving game with molecule visualization
- **Features**: 20 reactions, 3 difficulty levels, detailed solutions, streak system
- **New**: Interactive reaction animation showing molecules combining step-by-step, visual feedback for limiting vs excess reactants
- **Source**: `games/1-ar/takmarkandi/`
- **Build**: `takmarkandi.html` (188KB)

### Year 2 (2-ár) - Intermediate Chemistry

#### ✅ Hess's Law - **ENHANCED**
- **Topics**: Thermochemistry, enthalpy calculations, Hess's Law
- **Format**: Puzzle-based learning with energy diagrams
- **Features**: Multi-step enthalpy problems, reaction pathway visualization
- **New**: State function path comparison - visualizes how multiple reaction pathways yield the same total ΔH (CO₂, H₂O, NH₃ formation examples)
- **New**: Industrial examples (CO, H₂O fuel cells, ethanol, NO₂, Contact Process, Thermite)
- **Source**: `games/2-ar/hess-law/`
- **Build**: `hess-law.html` (233KB)

#### ✅ Reaction Kinetics - **NEW**
- **Topics**: Rate laws, reaction mechanisms, kinetic theory
- **Format**: Interactive problem-solving with rate calculations
- **Features**: Rate law determination, activation energy, temperature effects
- **Source**: `games/2-ar/kinetics/`
- **Build**: `kinetics.html` (204KB)

#### ✅ Lewis Structures - **NEW**
- **Topics**: Electron dot structures, valence electrons, bonding
- **Format**: Interactive structure drawing
- **Features**: Step-by-step structure building, electron counting, resonance structures
- **Source**: `games/2-ar/lewis-structures/`
- **Build**: `lewis-structures.html` (238KB)

#### ✅ VSEPR Geometry - **ENHANCED**
- **Topics**: Molecular geometry, VSEPR theory, bond angles
- **Format**: 3D visualization with interactive molecules
- **Features**: Electron domain geometry, molecular shapes, hybridization
- **New**: Shape transition animation - interactive visualization showing how electron domains rearrange as they increase from 2 to 6, with trail effects and smooth morphing
- **Source**: `games/2-ar/vsepr-geometry/`
- **Build**: `vsepr-geometry.html` (245KB)

#### ✅ Intermolecular Forces - **NEW**
- **Topics**: London dispersion, dipole-dipole, hydrogen bonding
- **Format**: Comparative analysis and identification
- **Features**: Force strength ranking, boiling point predictions, molecular polarity
- **Source**: `games/2-ar/intermolecular-forces/`
- **Build**: `intermolecular-forces.html` (235KB)

#### ✅ Organic Nomenclature - **ENHANCED**
- **Topics**: IUPAC naming, functional groups, organic structures
- **Format**: Name-structure matching game with interactive building
- **Features**: Alkanes, alkenes, alcohols, carboxylic acids, naming rules
- **New**: Interactive Molecule Builder (Sameindasmiður) - build carbon chains (2-10 carbons), click bonds to cycle single→double→triple, auto-generates IUPAC names
- **New**: Structure from Name Challenge - 10 reverse challenges where students build structures matching given IUPAC names
- **Source**: `games/2-ar/organic-nomenclature/`
- **Build**: `organic-nomenclature.html` (229KB)

#### ✅ Redox Reactions - **ENHANCED**
- **Topics**: Oxidation-reduction, electron transfer, oxidation states
- **Format**: Reaction balancing and identification
- **Features**: Half-reactions, oxidation state changes, electrochemistry basics
- **New**: Interactive Electrochemical Cell - animated galvanic cell visualization with 4 metal pairs (Zn-Cu, Mg-Cu, Fe-Cu, Zn-Ag), electron flow animation, E°cell calculation
- **Source**: `games/2-ar/redox-reactions/`
- **Build**: `redox-reactions.html` (229KB)

### Year 3 (3-ár) - Advanced Chemistry

#### ✅ pH Titration - **UNIFIED**
- **Topics**: Acid-base titrations, pH calculations, titration curves, Henderson-Hasselbalch
- **Format**: Three-level pedagogical progression (Conceptual → Application → Calculation)
- **Levels**:
  - Level 1: Curve recognition, indicator colors, equivalence concepts (6 challenges)
  - Level 2: Interactive titration with Burette/Flask simulation (6 puzzles)
  - Level 3: Calculations including polyprotic acids & Henderson-Hasselbalch (8 problems)
- **Features**: 13 titrations, 5 indicators, real-time pH curves, worked solutions
- **Source**: `games/3-ar/ph-titration/`
- **Build**: `ph-titration.html` (265KB)
- **Note**: Consolidates previous ph-titration-practice and ph-titration-master (archived)

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
- **Vite 6.4+** - Fast build tool and dev server
- **TypeScript 5.3+** - Type safety
- **vite-plugin-singlefile** - Single HTML output

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Utility-first styling
- **PostCSS + Autoprefixer** - CSS processing

### Shared Library
- **Custom Hooks**: `useI18n`, `useProgress`, `useAccessibility`, `useAchievements`, `useGameI18n`
- **Utilities**: Storage, export, scoring algorithms, achievement tracking
- **Components**: FeedbackPanel, DragDropBuilder, MoleculeViewer3D, LanguageSwitcher
- **i18n**: Translation system with 3 languages
- **Achievement System**: Cross-game badges, streaks, and progress tracking

---

## 📖 Documentation

### Planning & Roadmap
- **[Improvement Recommendations](docs/game-improvement/recommendations.md)** - Research-based improvement plan (108 items)
- **[Improvement Checklist](docs/game-improvement/checklist.md)** - Implementation progress tracker
- **[Game Review Prompt](docs/game-improvement/review-prompt.md)** - Game review guidelines (three-level pedagogical framework)

### Development
- **[Developer Guide](docs/DEVELOPER-GUIDE.md)** - Complete development workflow
- **[API Reference](docs/API-REFERENCE.md)** - Shared library API documentation
- **[Architecture](docs/ARCHITECTURE.md)** - System architecture and design decisions
- **[Development Setup](docs/development.md)** - Scripts and tooling
- **[Debugging](docs/debugging.md)** - Debugging techniques

### Deployment & Infrastructure
- **[Deployment](docs/deployment.md)** - Deployment to kvenno.app
- **[Kvenno Structure](docs/kvenno-structure.md)** - Site structure and design system

### Reference
- **[Documentation Hub](docs/README.md)** - Complete documentation index
- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[shared/README.md](shared/README.md)** - Shared library overview

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

See [docs/deployment.md](docs/deployment.md) for complete deployment guide.

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

## 📈 Game Status

| Year | Count | Games |
|------|-------|-------|
| Year 1 (1-ár) | 5 | Dimensional Analysis, Molar Mass, Nomenclature, Solutions, Limiting Reactants |
| Year 2 (2-ár) | 7 | Hess's Law, Kinetics, Lewis Structures, VSEPR, Intermolecular Forces, Organic Nomenclature, Redox |
| Year 3 (3-ár) | 5 | **pH Titration (unified)**, Gas Laws, Equilibrium, Thermodynamics, Buffers |
| **Total** | **17** | **All games implemented with cross-game achievement system** |

All games have been migrated to the monorepo architecture and include the cross-game achievement system with 23 badges, streak tracking, and persistent progress. The pH Titration game consolidates the former practice and master games into a unified three-level pedagogical experience.

---

## 🎯 Development Roadmap

This project follows a research-based improvement plan for enhancing all 18 educational games.

### Planning Documents

| Document | Purpose |
|----------|---------|
| **[Recommendations](docs/game-improvement/recommendations.md)** | Comprehensive evaluation with 108 specific improvements based on 2024-2025 educational games research |
| **[Checklist](docs/game-improvement/checklist.md)** | Implementation tracker with progress status for each improvement |

### Improvement Categories

Based on Barry Fishman's principles of effective educational games and PhET-style simulation best practices:

1. **Enhanced Visualizations** - Animated, interactive content (High Priority)
2. **Deeper Feedback System** - Detailed explanations for learning (High Priority)
3. **3D Molecule Viewer** - WebGL-based visualization for Lewis/VSEPR/IMF (High Priority)
4. **Adaptive Difficulty** - Performance-based challenge adjustment (Medium Priority)
5. **Audio Support** - Pronunciations and narration (Medium Priority)

### Current Progress

See [docs/game-improvement/checklist.md](docs/game-improvement/checklist.md) for detailed progress tracking.

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
