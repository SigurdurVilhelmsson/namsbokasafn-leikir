# Game Improvement Implementation Checklist

**Created:** 2025-12-29
**Status Legend:** ⬜ Not Started | 🟡 In Progress | ✅ Completed | ❌ Blocked

---

## Implementation Matrix

### Shared Infrastructure Improvements

| Task | Status | Priority | Effort | Impact | Notes |
|------|--------|----------|--------|--------|-------|
| Create AnimatedMolecule component | ⬜ | High | High | High | Reusable for Lewis, VSEPR, IMF, Organic |
| Create InteractiveGraph component | ⬜ | Medium | Medium | Medium | For titration, thermodynamics, kinetics |
| Create DragDropBuilder component | ⬜ | Medium | High | High | For equations, nomenclature |
| Add shared audio utilities | ⬜ | Low | Medium | Medium | TTS for pronunciations |
| Implement tiered hint system | ⬜ | High | Medium | High | 4-level progressive hints |
| Add detailed feedback explanations | ⬜ | High | Medium | High | Why correct/incorrect |
| Create particle simulation library | ⬜ | Medium | High | High | For solutions, gas laws, kinetics |
| Add 3D molecule viewer (Three.js) | ⬜ | Medium | High | High | For VSEPR, Lewis, IMF |

---

### Year 1 Games

#### Dimensional Analysis (Einingagreining)

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Unit cancellation animation | ⬜ | High | Medium | Show units "crossing out" |
| Drag-and-drop unit builder | ⬜ | High | High | Build conversions visually |
| Real-world context scenarios | ⬜ | Medium | Low | Cooking, pharmacy examples |
| Step-by-step solution display | ⬜ | Medium | Low | Show factor-label method |

#### Molar Mass (Mólmassi)

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Periodic table integration | ⬜ | High | Medium | Look up atomic masses |
| 3D molecule viewer | ⬜ | Medium | High | For complex compounds |
| Mystery molecule mode | ⬜ | Low | Medium | Deduce formula from mass |
| Animated mass calculation | ⬜ | Medium | Medium | Show addition of atomic masses |

#### Nomenclature (Nafnakerfið)

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Molecular structure on cards | ⬜ | High | Medium | Visual structure diagrams |
| Audio pronunciation | ⬜ | Medium | Medium | TTS for compound names |
| Build-the-name mode | ⬜ | Medium | High | Construct systematic names |
| Structural formula display | ⬜ | High | Medium | Alongside molecular formula |

#### Solutions (Lausnir)

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Particle animation (Brownian) | ⬜ | High | High | Moving molecules |
| Pipette/dropper tool | ⬜ | Medium | Medium | Lab-realistic interaction |
| Concentration-based color | ⬜ | Low | Low | Like adding indicator |
| Temperature effects | ⬜ | Low | Medium | Solubility changes |

#### Limiting Reactants (Takmarkandi)

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Reaction animation | ⬜ | High | High | Molecules using up reactants |
| Visual stoichiometry | ⬜ | High | Medium | Particle count representation |
| Factory game mode | ⬜ | Medium | Medium | Production optimization |
| Excess reactant display | ⬜ | Medium | Low | Show what remains |

---

### Year 2 Games

#### Hess's Law

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Energy pathway animation | ⬜ | High | Medium | Animated energy diagram |
| Drag-drop equation builder | ⬜ | High | High | Combine equations visually |
| State function path comparison | ⬜ | Medium | Medium | Show different routes |
| Industrial examples | ⬜ | Low | Low | Real-world applications |

#### Kinetics

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Collision simulation | ⬜ | High | High | Activation energy visual |
| Maxwell-Boltzmann visualization | ⬜ | High | Medium | Distribution curve |
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
| 3D molecule viewer | ⬜ | High | High | Rotatable molecules |
| Electron repulsion animation | ⬜ | High | Medium | Show domains separating |
| Bond angle measurement | ⬜ | Medium | Low | Interactive tool |
| Shape transition animation | ⬜ | Medium | Medium | Adding/removing domains |

#### Intermolecular Forces

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Boiling point prediction | ⬜ | High | Medium | Based on IMF analysis |
| Force strength animation | ⬜ | High | Medium | Visual comparison |
| Solubility prediction | ⬜ | Medium | Medium | "Like dissolves like" |
| Surface tension demo | ⬜ | Low | High | Physical property link |

#### Organic Nomenclature

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Interactive molecule builder | ⬜ | High | High | With auto-naming |
| Draw structure from name | ⬜ | High | High | Reverse challenge |
| Carbon chain numbering | ⬜ | Medium | Medium | Visual annotation |
| Functional group highlighting | ⬜ | Medium | Low | Color-coded groups |

#### Redox Reactions

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Electron transfer animation | ⬜ | High | High | Visual electron flow |
| Oxidation state highlighting | ⬜ | High | Medium | Show changes |
| Electrochemical cell sim | ⬜ | Medium | High | Galvanic cell animation |
| Half-reaction balancer | ⬜ | Medium | Medium | Step-by-step tool |

---

### Year 3 Games

#### pH Titration Practice

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Indicator selection | ⬜ | Medium | Low | Multiple indicators |
| Virtual pH paper | ⬜ | Low | Medium | Alternative measurement |
| Endpoint prediction challenge | ⬜ | Medium | Medium | Guess volume game |
| Derivative curve display | ⬜ | Low | Medium | dPH/dV analysis |

#### pH Titration Master

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Polyprotic acid curves | ⬜ | Medium | Medium | H2SO4, H3PO4 |
| Buffer region identification | ⬜ | High | Low | Highlight on curve |
| Equivalence volume prediction | ⬜ | Medium | Low | Accuracy game |
| Indicator optimization | ⬜ | Medium | Medium | Best indicator selection |

#### Gas Law Challenge

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Interactive PVT simulation | ⬜ | High | High | Slider-controlled |
| Particle KE visualization | ⬜ | High | High | Temperature-speed link |
| Real gas deviation | ⬜ | Low | Medium | Van der Waals comparison |
| Atmospheric applications | ⬜ | Medium | Low | Weather, altitude |

#### Equilibrium Shifter

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Q vs K visualization | ⬜ | High | Medium | Direction indicator |
| Dynamic equilibrium animation | ⬜ | High | High | Forward/reverse rates |
| Industrial process scenarios | ⬜ | Medium | Low | Haber, Contact process |
| K expression builder | ⬜ | Medium | Medium | Interactive formula |

#### Thermodynamics Predictor

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Phase diagram integration | ⬜ | Medium | High | Link to phases |
| Coupled reaction examples | ⬜ | Medium | Medium | ATP hydrolysis |
| Bio thermodynamics | ⬜ | Low | Low | Life science connections |
| Crossover temp finder | ⬜ | Medium | Low | Interactive game |

#### Buffer Recipe Creator

| Improvement | Status | Priority | Effort | Notes |
|-------------|--------|----------|--------|-------|
| Buffer capacity visualization | ⬜ | High | Medium | Graph of capacity |
| Acid/base addition sim | ⬜ | High | Medium | See pH changes |
| Biological buffer examples | ⬜ | Medium | Low | Blood, cellular |
| HH equation builder | ⬜ | Medium | Low | Interactive formula |

---

## Progress Summary

### By Priority

| Priority | Total | Completed | Percentage |
|----------|-------|-----------|------------|
| High | 42 | 1 | 2.4% |
| Medium | 45 | 0 | 0% |
| Low | 21 | 0 | 0% |
| **Total** | **108** | **1** | **0.9%** |

### By Year

| Year | Total | Completed | Percentage |
|------|-------|-----------|------------|
| Shared | 8 | 0 | 0% |
| Year 1 | 20 | 0 | 0% |
| Year 2 | 40 | 1 | 2.5% |
| Year 3 | 32 | 0 | 0% |

### By Category

| Category | Total | Completed | Percentage |
|----------|-------|-----------|------------|
| Visualization | 45 | 1 | 2.2% |
| Interactivity | 30 | 0 | 0% |
| Content | 18 | 0 | 0% |
| Gamification | 15 | 0 | 0% |

---

## Quick Wins (Low Effort, High Impact)

These improvements can be implemented quickly:

1. ⬜ Add step-by-step solution display to Dimensional Analysis
2. ⬜ Show excess reactant in Limiting Reactants
3. ⬜ Add buffer region highlight to pH Titration Master
4. ⬜ Add industrial examples to Hess's Law
5. ⬜ Add functional group highlighting to Organic Nomenclature
6. ⬜ Add atmospheric applications to Gas Laws
7. ⬜ Add crossover temperature finder to Thermodynamics
8. ⬜ Add biological buffer examples to Buffer Creator

---

## High-Impact Shared Components

Building these once benefits multiple games:

1. ⬜ **AnimatedMolecule** → Lewis, VSEPR, IMF, Organic, Molar Mass
2. ⬜ **ParticleSimulation** → Solutions, Gas Laws, Kinetics, Equilibrium
3. ⬜ **DragDropBuilder** → Hess's Law, Nomenclature, Redox
4. ⬜ **InteractiveGraph** → Titration, Thermodynamics, Kinetics
5. ⬜ **3DMoleculeViewer** → VSEPR, Lewis, IMF, Organic

---

## Version History

| Date | Changes |
|------|---------|
| 2025-12-29 | Initial checklist created |
| 2025-12-29 | Lewis Structures electron animation marked complete |

---

## Notes

- Prioritize shared components as they benefit multiple games
- Test on tablets after implementing touch interactions
- Consider performance impact of complex animations
- Ensure all new features maintain accessibility standards
