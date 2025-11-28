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

### ⏳ molmassi.html (1833 lines)  
**Status**: PENDING
**Complexity**: Medium
**Topic**: Molar mass calculations

### ⏳ nafnakerfid.html (1734 lines)
**Status**: PENDING  
**Complexity**: Medium  
**Topic**: Chemical nomenclature

### ⏳ lausnir.html (1745 lines)
**Status**: PENDING  
**Complexity**: Medium  
**Topic**: Solutions and concentrations

### ⏳ takmarkandi.html (1835 lines)
**Status**: PENDING  
**Complexity**: Medium  
**Topic**: Limiting reactants

## Year 3 Games (3-ar)

### ⏳ ph-titration-practice.html (1324 lines)
**Status**: PENDING  
**Complexity**: Medium  
**Topic**: pH and titrations

### ⏳ ph-titration-master/ (2375 lines)
**Status**: PENDING  
**Complexity**: High  
**Topic**: Advanced pH and titrations

### ⏳ gas-law-challenge.html (1852 lines)
**Status**: PENDING  
**Complexity**: Medium-High  
**Topic**: Gas laws

### ⏳ equilibrium-shifter.html (2770 lines)
**Status**: PENDING  
**Complexity**: High  
**Topic**: Chemical equilibrium

### ⏳ thermodynamics-predictor.html (1221 lines)
**Status**: PENDING  
**Complexity**: Medium  
**Topic**: Thermodynamics

### ⏳ buffer-recipe-creator/ (1516 lines)
**Status**: PENDING  
**Complexity**: Medium  
**Topic**: Buffer solutions

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

