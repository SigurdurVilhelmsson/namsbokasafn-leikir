# Game Improvement Implementation Checklist

**Created:** 2025-12-29
**Status Legend:** ⬜ Not Started | 🟡 In Progress | ✅ Completed | ❌ Blocked

---

## Implementation Matrix

### Shared Infrastructure Improvements

| Task | Status | Priority | Effort | Impact | Notes |
|------|--------|----------|--------|--------|-------|
| Create AnimatedMolecule component | ✅ | High | High | High | All 5 phases complete. Integrated into: Molmassi, Lewis Structures, VSEPR Geometry, IMF, Organic Nomenclature |
| Create InteractiveGraph component | ✅ | Medium | Medium | Medium | Canvas-based reusable graph. Integrated into: ph-titration (Level 1 & TitrationCurve), thermodynamics-predictor |
| Create DragDropBuilder component | ✅ | Medium | High | High | For equations, nomenclature. HTML5 drag-drop with touch support |
| Add shared audio utilities | ⬜ | Low | Medium | Medium | TTS for pronunciations |
| Implement tiered hint system | ✅ | High | Medium | High | 4-level progressive hints. All 17 games migrated |
| Add detailed feedback explanations | ✅ | High | Medium | High | FeedbackPanel component with expandable "Why?" section |
| Create particle simulation library | ✅ | Medium | High | High | ParticleSimulation component with physics, presets, reactions. Integrated into: gas-law-challenge, lausnir, kinetics, equilibrium-shifter, thermodynamics-predictor |
| Add 3D molecule viewer (Three.js) | ✅ | Medium | High | High | MoleculeViewer3D with lazy loading, ball-stick/space-fill modes |

---

### Year 1 Games

#### Dimensional Analysis (Einingagreining)

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Unit cancellation animation | ✅ | High | Medium | Enhanced UnitCancellationVisualizer with auto-animate, strikethrough, connecting lines |
| Drag-and-drop unit builder | ⬜ | High | High | Build conversions visually |
| Real-world context scenarios | ⬜ | Medium | Low | Cooking, pharmacy examples |
| Step-by-step solution display | ✅ | Medium | Low | Shows factor-label method with correctMethod/requiredSteps in feedback |

#### Molar Mass (Mólmassi)

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Periodic table integration | ✅ | High | Medium | PeriodicTable component in Level 1 & 2 with search, grid/list views, element highlighting |
| 3D molecule viewer | ✅ | Medium | High | MoleculeViewer3DLazy integrated in Level 1 with 2D/3D toggle |
| Mystery molecule mode | ⬜ | Low | Medium | Deduce formula from mass |
| Animated mass calculation | ⬜ | Medium | Medium | Show addition of atomic masses |

#### Nomenclature (Nafnakerfið)

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Molecular structure on cards | ✅ | High | Medium | CompoundVisualization on Level 3 memory cards with 15+ structural formulas |
| Audio pronunciation | ⬜ | Medium | Medium | TTS for compound names |
| Build-the-name mode | ✅ | Medium | High | Name builder mode in Level 4 for constructing systematic names |
| Structural formula display | ✅ | High | Medium | SVG-based StructuralFormula component with bonds, ionic charges |

#### Solutions (Lausnir)

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Particle animation (Brownian) | ✅ | High | High | ParticleBeaker with animated solute particles |
| Prediction step in Level 1 | ✅ | High | Medium | "Hugsaðu fyrst!" prediction prompts before slider adjustment |
| Pipette/dropper tool | ⬜ | Medium | Medium | Lab-realistic interaction |
| Concentration-based color | ⬜ | Low | Low | Like adding indicator |
| Temperature effects | ⬜ | Low | Medium | Solubility changes |

#### Limiting Reactants (Takmarkandi)

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Reaction animation | ✅ | High | High | ReactionAnimation component integrated in Level 2 showing before/reacting/after phases |
| Visual stoichiometry | ⬜ | High | Medium | Particle count representation |
| Factory game mode | ⬜ | Medium | Medium | Production optimization |
| Excess reactant display | ✅ | Medium | Low | Visual display with molecules showing what remains after reaction |

---

### Year 2 Games

#### Hess's Law

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Energy pathway animation | ✅ | High | Medium | EnergyPathwayDiagram component with animated staircase, cumulative ΔH |
| Drag-drop equation builder | ⬜ | High | High | Combine equations visually |
| State function path comparison | ⬜ | Medium | Medium | Show different routes |
| Industrial examples | ✅ | Low | Low | Real-world applications (CO, H₂O fuel cells, ethanol, NO₂, Contact Process, Thermite) |

#### Kinetics

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Collision simulation | ✅ | High | High | CollisionDemo with activation energy visual |
| Maxwell-Boltzmann visualization | ✅ | High | Medium | Interactive distribution curve synced with CollisionDemo, shaded Ea region, percentage display |
| Concentration vs time graph | ⬜ | Medium | Medium | Interactive builder |
| Catalyst effect demo | ⬜ | Medium | Medium | Before/after comparison |

#### Lewis Structures

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Electron animation | ✅ | High | Medium | Bond formation animation |
| Guided mode for beginners | ⬜ | Medium | Medium | Step-by-step assistance |
| Octet violation detection | ⬜ | Medium | Low | With explanations |
| Expanded octet examples | ⬜ | Low | Low | SF6, PCl5 |

#### VSEPR Geometry

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| AnimatedMolecule integration | ✅ | High | Medium | VSEPR mode with depth styling, dipoles, lone pairs |
| 3D molecule viewer | ✅ | High | High | MoleculeViewer3DLazy in Level1 & Level2 with 2D/3D toggle |
| Electron repulsion animation | ⬜ | Medium | Medium | Show domains separating |
| Bond angle measurement | ⬜ | Medium | Low | Interactive tool |
| Shape transition animation | ⬜ | Medium | Medium | Adding/removing domains |

#### Intermolecular Forces

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| AnimatedMolecule integration | ✅ | High | Medium | Partial charges, dipole moments, polar bond indicators |
| Boiling point prediction | ✅ | High | Medium | Level 2 ranking problems with real BP data, bar chart visualization |
| Force strength animation | ⬜ | Medium | Medium | Visual comparison |
| Solubility prediction | ⬜ | Medium | Medium | "Like dissolves like" |
| Surface tension demo | ⬜ | Low | High | Physical property link |

#### Organic Nomenclature

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| AnimatedMolecule integration | ✅ | High | Medium | Organic mode with chain layout, carbon numbering, colored bonds |
| Interactive molecule builder | ⬜ | High | High | With auto-naming |
| Draw structure from name | ⬜ | High | High | Reverse challenge |
| Carbon chain numbering | ✅ | Medium | Medium | Visual annotation (integrated with AnimatedMolecule) |
| Functional group highlighting | ✅ | Medium | Low | Double/triple bonds highlighted with colors |

#### Redox Reactions

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Electron transfer animation | ⬜ | High | High | Visual electron flow |
| Oxidation state highlighting | ⬜ | High | Medium | Show changes |
| Electrochemical cell sim | ⬜ | Medium | High | Galvanic cell animation |
| Half-reaction balancer | ⬜ | Medium | Medium | Step-by-step tool |

---

### Year 3 Games

#### pH Titration (Unified) - **CONSOLIDATED**

**Note:** Former `ph-titration-practice` and `ph-titration-master` games were consolidated into a single unified three-level game (`ph-titration`). Original games archived to `games/archive/`.

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Three-level structure | ✅ | High | High | Level 1: Concepts, Level 2: Interactive, Level 3: Calculations |
| Indicator selection | ✅ | Medium | Low | Multiple indicators in Level 2 |
| Endpoint prediction challenge | ✅ | Medium | Medium | Level 2 volume accuracy game (±1.0 mL) |
| Buffer region identification | ✅ | High | Low | Highlighted pKa ± 1 region on curve |
| Polyprotic acid problems | ✅ | Medium | Medium | H₂SO₃, H₃PO₄ in Level 3 |
| Henderson-Hasselbalch | ✅ | Medium | Medium | Buffer calculations in Level 3 |
| Worked solutions | ✅ | Medium | Medium | Step-by-step solutions in Level 3 |
| Virtual pH paper | ⬜ | Low | Medium | Alternative measurement (future) |
| Derivative curve display | ⬜ | Low | Medium | dPH/dV analysis (future) |

#### Gas Law Challenge

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Interactive PVT simulation | ⬜ | High | High | Slider-controlled |
| Particle KE visualization | ⬜ | High | High | Temperature-speed link |
| Real gas deviation | ⬜ | Low | Medium | Van der Waals comparison |
| Atmospheric applications | ✅ | Medium | Low | Mt. Everest, aircraft, weather balloons, spacecraft, ski resorts |

#### Equilibrium Shifter

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Q vs K visualization | ✅ | High | Medium | QKComparison component with visual bars, stress-specific explanations |
| Dynamic equilibrium animation | ✅ | High | High | ParticleEquilibrium showing reactant/product particles |
| Industrial process scenarios | ⬜ | Medium | Low | Haber, Contact process |
| K expression builder | ⬜ | Medium | Medium | Interactive formula |

#### Thermodynamics Predictor

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Phase diagram integration | ⬜ | Medium | High | Link to phases |
| Coupled reaction examples | ⬜ | Medium | Medium | ATP hydrolysis |
| Bio thermodynamics | ✅ | Low | Low | Photosynthesis (#14), protein denaturation (#26), ATP hydrolysis (#27) |
| Crossover temp finder | ✅ | Medium | Low | Visual T_cross marker on graph, scenario-specific hints, solution steps |

#### Buffer Recipe Creator

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Buffer capacity visualization | ✅ | High | Medium | BufferCapacityVisualization component with β vs pH curve, optimal range shading |
| Acid/base addition sim | ✅ | High | Medium | Interactive acid/base addition with pH tracking, buffer vs water comparison |
| Biological buffer examples | ✅ | Medium | Low | Blood pH, cellular phosphate buffer, DNA/RNA TRIS buffer, citrate blood bank |
| HH equation builder | ⬜ | Medium | Low | Interactive formula |

---

## Progress Summary

### By Priority

| Priority | Total | Completed | Percentage |
|----------|-------|-----------|------------|
| High | 43 | 24 | 55.8% |
| Medium | 45 | 12 | 26.7% |
| Low | 21 | 2 | 9.5% |
| **Total** | **109** | **38** | **34.9%** |

### By Year

| Year | Total | Completed | Percentage |
|------|-------|-----------|------------|
| Shared | 8 | 8 | 100% |
| Year 1 | 21 | 11 | 52.4% |
| Year 2 | 40 | 8 | 20% |
| Year 3 | 32 | 9 | 28.1% |

### By Category

| Category | Total | Completed | Percentage |
|----------|-------|-----------|------------|
| Visualization | 45 | 6 | 13.3% |
| Interactivity | 30 | 0 | 0% |
| Content | 18 | 3 | 16.7% |
| Gamification | 15 | 2 | 13.3% |

### Developer Tooling

| Category | Total | Completed | Percentage |
|----------|-------|-----------|------------|
| Infrastructure | 9 | 9 | 100% |
| Testing & Automation | 10 | 3 | 30% |

---

## Quick Wins (Low Effort, High Impact)

These improvements can be implemented quickly:

1. ✅ Add step-by-step solution display to Dimensional Analysis
2. ✅ Show excess reactant in Limiting Reactants
3. ✅ Add buffer region highlight to pH Titration Master
4. ✅ Add industrial examples to Hess's Law
5. ✅ Add functional group highlighting to Organic Nomenclature
6. ✅ Add atmospheric applications to Gas Laws
7. ✅ Add crossover temperature finder to Thermodynamics
8. ✅ Add biological buffer examples to Buffer Creator

---

## High-Impact Shared Components

Building these once benefits multiple games:

1. ✅ **AnimatedMolecule** → Lewis, VSEPR, IMF, Organic, Molar Mass
2. ✅ **ParticleSimulation** → Gas Laws (integrated), Solutions, Kinetics, Equilibrium
3. ✅ **DragDropBuilder** → Hess's Law, Nomenclature, Redox
4. ✅ **InteractiveGraph** → Titration, Thermodynamics, Kinetics
5. ✅ **3DMoleculeViewer** → VSEPR, Lewis, IMF, Organic
6. ✅ **FeedbackPanel** → Detailed feedback with explanations, misconceptions, related concepts

---

## Version History

| Date | Changes |
|------|---------|
| 2025-12-29 | Initial checklist created |
| 2025-12-29 | Lewis Structures electron animation marked complete |
| 2025-12-29 | Added atmospheric applications to Gas Laws (5 new questions) |
| 2025-12-29 | Added biological buffer examples to Buffer Creator |
| 2025-12-29 | Added industrial examples to Hess's Law (6 puzzles enhanced) |
| 2025-12-29 | Added step-by-step solution display to Dimensional Analysis (correctMethod in feedback) |
| 2025-12-29 | Added visual excess reactant display to Limiting Reactants |
| 2025-12-29 | Added functional group highlighting to Organic Nomenclature (double/triple bonds with colors) |
| 2025-12-29 | Marked buffer region highlight as complete (already implemented in TitrationCurve) |
| 2025-12-29 | Consolidated Developer Tooling improvements from IMPROVEMENTS.md |
| 2025-12-29 | **MAJOR:** Consolidated ph-titration-practice and ph-titration-master into unified three-level pH Titration game |
| 2025-12-29 | pH Titration now includes: Level 1 (6 conceptual challenges), Level 2 (6 interactive puzzles), Level 3 (8 calculation problems with polyprotic acids and Henderson-Hasselbalch) |
| 2025-12-29 | Archived original games to games/archive/ |
| 2025-12-29 | Added crossover temperature finder to Thermodynamics Predictor (visual T_cross marker, scenario hints, solution steps) |
| 2025-12-29 | AnimatedMolecule Phase 1: SVG atoms, bonds, layouts, size variants |
| 2025-12-29 | AnimatedMolecule Phase 2: MoleculeLonePair component for Lewis mode with smart angle positioning |
| 2025-12-29 | AnimatedMolecule Phase 3: useMoleculeAnimation hook for orchestrated timing, onAnimationComplete callback |
| 2025-12-29 | AnimatedMolecule Phase 4: MoleculeDipole arrows, useMoleculeLayout hook, VSEPR depth styling |
| 2025-12-29 | AnimatedMolecule Phase 5: Organic mode with carbon chain layout, colored bonds, glow effects |
| 2025-12-29 | **AnimatedMolecule COMPLETE** - All 5 phases implemented, ready for game migrations |
| 2025-12-31 | **Tiered Hint System COMPLETE** - HintSystem component created, all 17 games migrated |
| 2025-12-31 | **InteractiveGraph COMPLETE** - Canvas-based reusable graph component with series, markers, regions, reference lines |
| 2025-12-31 | InteractiveGraph integrated into: ph-titration Level 1, ph-titration TitrationCurve (Level 2), thermodynamics-predictor |
| 2025-12-31 | **ParticleSimulation COMPLETE** - Canvas-based physics simulation with collisions, temperature, reactions, presets |
| 2025-12-31 | ParticleSimulation integrated into: gas-law-challenge (replaces custom Particle class) |
| 2025-12-31 | ParticleSimulation integrated into: lausnir (ParticleBeaker with Brownian motion) |
| 2025-12-31 | ParticleSimulation integrated into: kinetics (CollisionDemo with activation energy visual) |
| 2025-12-31 | ParticleSimulation integrated into: equilibrium-shifter (ParticleEquilibrium with shift direction feedback) |
| 2025-12-31 | ParticleSimulation integrated into: thermodynamics-predictor (EntropyVisualization replaced CSS with canvas) |
| 2026-01-01 | **Maxwell-Boltzmann visualization COMPLETE** - Interactive energy distribution curve for Kinetics game |
| 2026-01-01 | MaxwellBoltzmann.tsx: SVG-based curve with shaded Ea region, percentage display, synced with CollisionDemo |
| 2026-01-21 | **Developer Tooling COMPLETE** - Husky pre-commit hooks, lint-staged, commitlint with conventional commits |
| 2026-01-21 | **Vitest Coverage** - Configured with v8 provider, 80% threshold for utils, 70% for hooks |
| 2026-01-21 | **FeedbackPanel COMPLETE** - DetailedFeedback type, expandable "Why?" section, misconception warnings |
| 2026-01-21 | **DragDropBuilder COMPLETE** - HTML5 drag-drop API with touch support, snap-to-zone, reordering |
| 2026-01-21 | **MoleculeViewer3D COMPLETE** - Three.js lazy-loaded 3D viewer, ball-stick/space-fill modes, orbital controls |
| 2026-01-25 | **Takmarkandi Reaction Animation COMPLETE** - ReactionAnimation component with before/reacting/after phases in Level 2 |
| 2026-01-25 | **Nafnakerfid Molecular Structures ENHANCED** - Added 15+ structural formulas to MolecularStructure.tsx for Level 3 cards |
| 2026-01-25 | **Dimensional Analysis Unit Cancellation ENHANCED** - Auto-animate unit crossing out with strikethrough, connecting lines |
| 2026-01-25 | Year 1 progress: 15% → 40% (8/20 improvements completed) |
| 2026-01-25 | **Molmassi Periodic Table COMPLETE** - Added PeriodicTable to Level 1, already in Level 2 |
| 2026-01-25 | Marked Molmassi 3D molecule viewer as complete (MoleculeViewer3DLazy already integrated) |
| 2026-01-25 | Year 1 progress: 40% → 50% (10/20 improvements completed) |
| 2026-01-25 | **Lausnir Prediction Prompts VERIFIED** - Already implemented with "Hugsaðu fyrst!" prediction phase |
| 2026-01-25 | Year 1 progress: 50% → 52.4% (11/21 improvements completed) |
| 2026-01-25 | **Hess's Law Energy Pathway COMPLETE** - EnergyPathwayDiagram component with animated staircase showing cumulative ΔH |
| 2026-01-25 | Year 2 progress: 12.5% → 15% (6/40 improvements completed) |
| 2026-01-25 | **Intermolecular Forces Boiling Point VERIFIED** - Already implemented with ranking problems and bar chart visualization |
| 2026-01-25 | Year 2 progress: 15% → 17.5% (7/40 improvements completed) |
| 2026-01-25 | **VSEPR Geometry 3D Viewer VERIFIED** - Already implemented with MoleculeViewer3DLazy and 2D/3D toggle |
| 2026-01-25 | Year 2 progress: 17.5% → 20% (8/40 improvements completed) |
| 2026-01-25 | **Equilibrium Shifter Q vs K VERIFIED** - QKComparison component with visual bars, stress explanations |
| 2026-01-25 | Year 3 progress: 15.6% → 18.8% (6/32 improvements completed) |
| 2026-01-25 | **Buffer Capacity Visualization COMPLETE** - BufferCapacityVisualization component with β vs pH curve, optimal range |
| 2026-01-25 | **Acid/Base Addition Simulation COMPLETE** - Interactive addition with pH tracking, buffer vs water comparison |
| 2026-01-25 | Year 3 progress: 18.8% → 25% (8/32 improvements completed) |
| 2026-01-25 | **Thermodynamics Bio Examples VERIFIED** - Already has photosynthesis, protein denaturation, ATP hydrolysis |
| 2026-01-25 | Year 3 progress: 25% → 28.1% (9/32 improvements completed) |

---

## Developer Tooling Improvements

*Consolidated from IMPROVEMENTS.md*

### Completed Infrastructure

| Item | Status | Notes |
|------|--------|-------|
| Error Boundaries | ✅ | `shared/components/ErrorBoundary.tsx` with bilingual messages |
| ESLint Configuration | ✅ | TypeScript + React hooks rules |
| Prettier Configuration | ✅ | Consistent formatting rules |
| TypeScript Strict Mode | ✅ | Enabled in `tsconfig.base.json` |
| VSCode Debugging | ✅ | Chrome/Firefox debugging configs |
| GitHub Actions CI/CD | ✅ | Type check, lint, build on push |
| Source Maps | ✅ | Development and production |
| Documentation Structure | ✅ | Organized `docs/` directory |
| Achievement System | ✅ | 23 badges, 5 rarity levels, cross-game tracking |

### Planned Tooling

| Item | Status | Priority | Effort | Notes |
|------|--------|----------|--------|-------|
| Git Hooks (Husky) | ✅ | High | Low | Pre-commit lint-staged, commit-msg hooks |
| Conventional Commits | ✅ | High | Low | Commitlint with conventional commits config |
| Unit Testing (Vitest) | ✅ | High | Medium | Coverage configured (80% utils, 70% hooks) |
| Component Testing | ⬜ | Medium | Medium | React Testing Library for shared components |
| E2E Testing (Playwright) | ⬜ | Medium | High | Game flow testing |
| Automated Changelog | ⬜ | Medium | Low | conventional-changelog-cli |
| PWA Support | ⬜ | Low | Medium | Offline game access |
| Error Tracking (Sentry) | ⬜ | Low | Medium | Production monitoring |
| Usage Analytics | ⬜ | Low | Medium | Privacy-focused local analytics |
| Performance Monitoring | ⬜ | Low | Low | usePerformance hook |

---

## Notes

- Prioritize shared components as they benefit multiple games
- Test on tablets after implementing touch interactions
- Consider performance impact of complex animations
- Ensure all new features maintain accessibility standards
- Developer tooling improvements enhance maintainability and code quality
