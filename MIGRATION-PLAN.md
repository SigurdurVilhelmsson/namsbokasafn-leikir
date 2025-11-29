# Game Migration Plan

## Status Overview

This document tracks the migration of all chemistry games to the new monorepo architecture.

## Year 1 Games (1-ar)

### ✅ dimensional-analysis-game.html (3113 lines)
**Status**: COMPLETED  
**Location**: `/games/1-ar/dimensional-analysis/`  
**Output**: `dimensional-analysis-game-new.html` (168KB)

**Features Migrated**:
- 3 interactive lessons
- 10 Level 1 questions (5 types)
- 15 Level 2 problems (scaffolded)
- 10 Level 3 challenges (6 types)
- Complete scoring system
- Accessibility features
- i18n support

### ✅ dimensional-analysis.html (1269 lines)
**Status**: COMPLETED
**Location**: `/games/1-ar/dimensional-analysis-simple/`
**Output**: `dimensional-analysis-simple.html` (190KB)

**Features Migrated**:
- Tutorial module with worked examples
- Interactive sandbox playground
- Concept check quiz
- Reference library with conversion factors
- Progress tracking with badges and checklist
- Complete localStorage persistence

### ✅ molmassi.html (1833 lines)
**Status**: COMPLETED
**Location**: `/games/1-ar/molmassi/`
**Output**: `molmassi.html` (184KB)

**Features Migrated**:
- Two game modes: Practice (untimed) and Competition (90s timer)
- Four difficulty levels: Easy, Medium, Hard, Mixed
- 29 chemical compounds across difficulties
- Periodic table reference with 20 elements
- Step-by-step calculation breakdown
- Hint system with point penalty
- Scoring system with streak tracking
- Progress tracking with localStorage
- Input validation with contextual feedback
- Real-time statistics display

### ✅ nafnakerfid.html (1734 lines)
**Status**: COMPLETED
**Location**: `/games/1-ar/nafnakerfid/`
**Output**: `nafnakerfid.html` (172KB)

**Features Migrated**:
- Card matching game with 3D flip animations
- 59 chemical compounds across three difficulty levels (easy, medium, hard)
- Configurable pair count (6, 8, or 10 pairs per game)
- Compound organization by type (ionic, molecular) and category
- Move counter and best score tracking per difficulty/pair combination
- localStorage persistence for game progress
- Match detection with visual feedback
- CSS perspective-based card flip mechanics
- Accessibility features with keyboard navigation

### ✅ lausnir.html (1745 lines)
**Status**: COMPLETED
**Location**: `/games/1-ar/lausnir/`
**Output**: `lausnir.html` (201KB)

**Features Migrated**:
- Interactive beaker visualizations with SVG and CSS animations (pour, mix, dissolve)
- 5 problem types: dilution, molarity, molarity from mass, mass from molarity, mixing
- Two game modes: Competition (scoring) and Practice (unlimited hints)
- Three difficulty levels (easy: 8, medium: 10, hard: 12 questions)
- 9 real chemicals across difficulty levels with accurate molar masses
- Step-by-step solution breakdowns for all problem types
- 3-level hint system with point penalties
- Streak system with bonuses (+5 at 3, +10 at 5 correct)
- Optional timer mode with speed bonuses
- Formula reference card (toggle with 'F')
- 7 chemistry facts shown randomly
- Input validation with contextual error feedback
- Keyboard shortcuts (H=hint, F=formulas, R=replay animation, S=solution, ?=help)
- Achievement notifications for streaks

### ✅ takmarkandi.html (1835 lines)
**Status**: COMPLETED
**Location**: `/games/1-ar/takmarkandi/`
**Output**: `takmarkandi.html` (188KB)

**Features Migrated**:
- Visual molecule displays with colored circular badges
- 20 chemical reactions across three difficulty levels (easy: 8, medium: 5, hard: 7)
- Multi-product reaction support (up to 2 products per reaction)
- Limiting reactant identification with click/keyboard selection (1/2 keys)
- Product formation calculations with individual inputs
- Excess reactant calculation
- Detailed step-by-step solution breakdowns
- Hint system explaining stoichiometry calculations
- Streak system with celebration sound effects (every 5 correct)
- Optional timer mode (120 seconds per question)
- Points system with difficulty and streak bonuses
- Web Audio API sound effects (correct, incorrect, streak, pop)
- Progress tracking with mistake categorization
- Keyboard shortcuts (1/2=select reactant, H=hint, S=solution, Enter=submit/next)
- CSS animations (moleculePop, celebration, pulse, bounce, shake)
- localStorage persistence for game statistics

## Year 3 Games (3-ar)

### ✅ ph-titration-practice.html (1324 lines)
**Status**: COMPLETED
**Location**: `/games/3-ar/ph-titration-practice/`
**Output**: `ph-titration-practice.html` (179KB)
**Complexity**: Medium
**Topic**: pH and titrations

**Features Migrated**:
- 4 titration types (strong-strong, weak-strong, strong-weak, weak-weak)
- Interactive virtual laboratory with burette, Erlenmeyer flask, and pH meter
- Real-time pH calculations for all titration types
- Canvas-based titration curve plotting with helper lines
- Universal indicator color changes based on pH
- Animated dripping effect and stirring bar
- Setup screen with preset configurations (typical, dilute, concentrated)
- 5 weak acids and 4 weak bases with Ka/Kb values
- Keyboard shortcuts for precise titrant addition
- Data export to CSV functionality
- Equivalence point detection and notification
- pKa/pKb visualization on titration curve
- Complete TypeScript type safety

### ✅ ph-titration-master/ (2375 lines)
**Status**: COMPLETED
**Location**: `/games/3-ar/ph-titration-master/`
**Output**: `ph-titration-master.html` (191KB, 59KB gzipped)
**Complexity**: High
**Topic**: Advanced pH and titrations

**Features Migrated**:
- 13 titration problems (4 beginner: strong-strong, 6 intermediate: weak acid/base, 3 advanced: polyprotic)
- Virtual lab equipment: animated burette, color-changing flask, digital pH meter
- Real-time titration curve with buffer region visualization
- pH calculation engine for all titration types (Henderson-Hasselbalch, polyprotic)
- 5 acid-base indicators with accurate pH ranges
- Two game modes: Practice (untimed) and Challenge (timed with bonuses)
- Scoring system: volume accuracy (±0.05/0.2/0.5 mL), indicator bonus (+20), time bonus (+30)
- Equivalence point detection and markers on curve
- pKa visualization on titration curves
- Keyboard shortcuts for precision control
- Complete TypeScript type safety

### ✅ gas-law-challenge.html (1852 lines)
**Status**: COMPLETED
**Location**: `/games/3-ar/gas-law-challenge/`
**Output**: `gas-law-challenge.html` (178KB, 55.8KB gzipped)
**Complexity**: Medium-High
**Topic**: Gas laws

**Features Migrated**:
- 8 gas law problems (4 easy, 2 medium, 2 hard) with real-world scenarios
- Ideal Gas Law calculator (PV = nRT) solving for all four variables (P, V, T, n)
- Real-time particle visualization with Canvas API (count ∝ moles, speed ∝ √temperature)
- Dynamic container visualization with pressure-based border color/thickness
- Two game modes: Practice (untimed, unlimited hints) and Challenge (90s timer, -10 points/hint)
- Progressive 4-level hint system with step-by-step guidance
- Complete solution display with formula, substitution, and calculation steps
- Scoring system: base points (100), accuracy bonus (+50), time bonus (+50), hint penalty (-10)
- Streak tracking and best streak recording
- Answer validation with tolerance checking (±2% default)
- Keyboard shortcuts (Enter=submit, H=hint, S=solution)
- Difficulty-based visual indicators (easy/medium/hard color coding)
- Complete TypeScript type safety

### ⏳ equilibrium-shifter.html (2770 lines)
**Status**: PENDING  
**Complexity**: High  
**Topic**: Chemical equilibrium

### ✅ thermodynamics-predictor.html (1221 lines)
**Status**: COMPLETED
**Location**: `/games/3-ar/thermodynamics-predictor/`
**Output**: `thermodynamics-predictor.html` (180KB)
**Complexity**: Medium
**Topic**: Thermodynamics

**Features Migrated**:
- 30 thermodynamics problems across three difficulty levels (beginner: 10, intermediate: 12, advanced: 8)
- Two game modes: Learning (untimed) and Challenge (90s timer with scoring)
- Gibbs free energy calculations (ΔG = ΔH - TΔS)
- Interactive temperature slider (200-1200 K)
- Real-time ΔG vs Temperature graph with canvas rendering
- Spontaneity prediction (spontaneous, equilibrium, non-spontaneous)
- Entropy visualization with animated particles (ordered vs. disordered)
- Four thermodynamic scenarios with color-coded badges
- Detailed step-by-step solution breakdowns
- Streak system with point bonuses
- Crossover temperature hints
- Formula reference card
- Complete TypeScript type safety

### ✅ buffer-recipe-creator.html (1516 lines)
**Status**: COMPLETED
**Location**: `/games/3-ar/buffer-recipe-creator/`
**Output**: `buffer-recipe-creator.html` (185KB)
**Complexity**: Medium
**Topic**: Buffer solutions

**Features Migrated**:
- 30 buffer recipe problems across three difficulty levels (beginner: 10, intermediate: 12, advanced: 8)
- Henderson-Hasselbalch equation calculator
- Interactive flask visualization with fill and swirl animations
- pH scale with animated marker
- Difficulty filter system (all, beginner, intermediate, advanced)
- Step-by-step solution breakdowns (5 calculation steps)
- Special problem types: stock solutions, pH adjustment, buffer range questions
- Context scenarios for each problem (lab, medical, industrial applications)
- 5% tolerance checking for answers
- Scoring system with difficulty-based points (100/150/200)
- Statistics tracking (score, problems solved, attempts, accuracy)
- Instructions toggle with Henderson-Hasselbalch guide
- Random problem generator
- Flask color changes based on pH
- Complete TypeScript type safety

## Template Files

### ✅ Game Template
**Status**: COMPLETED  
**Location**: `/tools/game-template/`  
**Script**: `/tools/create-game.sh`

**Includes**:
- Vite + React + TypeScript setup
- Tailwind CSS configuration
- i18n integration
- Accessibility features
- Progress tracking
- Single-file build output

## Migration Strategy

### Phase 1: Foundation (COMPLETED)
- [x] Create shared component library
- [x] Set up monorepo structure
- [x] Migrate one complex game (dimensional-analysis)
- [x] Create game template

### Phase 2: Remaining Games (IN PROGRESS)
- [ ] Migrate Year 1 games (5 remaining)
- [ ] Migrate Year 3 games (6 remaining)

### Phase 3: Documentation & Quality
- [ ] Update all repository documentation
- [ ] Add migration guides
- [ ] Create development workflows
- [ ] Set up debugging tools

## Estimated Effort

| Game | Lines | Complexity | Est. Time |
|------|-------|------------|-----------|
| dimensional-analysis-game | 3113 | High | ✅ Done |
| dimensional-analysis | 1269 | Medium | 2-3 hours |
| molmassi | 1833 | Medium | 3-4 hours |
| nafnakerfid | 1734 | Medium | 3-4 hours |
| lausnir | 1745 | Medium | 3-4 hours |
| takmarkandi | 1835 | Medium | 3-4 hours |
| ph-titration-practice | 1324 | Medium | 2-3 hours |
| ph-titration-master | 2375 | High | 4-5 hours |
| gas-law-challenge | 1852 | Medium-High | 3-4 hours |
| equilibrium-shifter | 2770 | High | 4-5 hours |
| thermodynamics-predictor | 1221 | Medium | 2-3 hours |
| buffer-recipe-creator | 1516 | Medium | 3-4 hours |

**Total Remaining**: ~35-45 hours of migration work

## Benefits of Migration

### Code Reduction
- **Before**: ~20,000 lines across 12 games
- **After**: ~3,000-6,000 lines (70-85% reduction)
- **Shared Library**: ~2,000 lines (reused by all games)

### Maintainability
- **i18n**: Update 1 file → affects all games
- **Accessibility**: Fix once → all games benefit
- **Bug Fixes**: Centralized utilities
- **Type Safety**: Full TypeScript coverage

### Consistency
- Automatic UI/UX consistency
- Standardized progress tracking
- Unified accessibility features
- Common scoring algorithms

## Next Steps

1. **Immediate** (this session if time permits):
   - Create directory structures for all games
   - Migrate 1-2 simpler games as examples
   - Update documentation

2. **Short-term** (future sessions):
   - Migrate remaining Year 1 games
   - Migrate remaining Year 3 games
   - Add comprehensive tests

3. **Long-term**:
   - Add more shared components
   - Create teacher dashboard
   - Implement analytics
   - Add more languages

