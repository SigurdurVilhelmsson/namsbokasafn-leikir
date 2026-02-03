# Year 3 Chemistry Games — Development Plan

**Date:** 2026-01-30 | **Updated:** 2026-02-03
**Curriculum Reference:** Brown et al, *Chemistry: The Central Science*, Chapters 10, 15-17, 19
**Status:** ✅ Phases 1-6 Complete

---

## Executive Summary

Year 3 games cover advanced equilibrium, acid-base chemistry, thermodynamics, and gas laws. The 6 existing games are conceptually sophisticated with strong interactive visualizations. **All core enhancements complete:** ICE tables in Equilibrium Shifter, new Ksp/Solubility game, Ka determination in pH Titration, entropy/ΔG-K in Thermodynamics Predictor, Dalton's Law in Gas Law Challenge, and Buffer Recipe Creator with all 3 levels (conceptual, calculations, stock solutions).

---

## Current Game Coverage Matrix

| Chapter | Topic | Coverage | Game(s) | Priority |
|---------|-------|----------|---------|----------|
| Ch. 10 | Ideal Gas Law | ✅ Strong | Gas Law Challenge | — |
| Ch. 10 | Dalton's Law (Partial Pressures) | ✅ Complete | Gas Law Challenge | — |
| Ch. 10 | Real Gases/Deviations | ❌ Missing | None | Low |
| Ch. 15 | Le Chatelier's Principle | ✅ Excellent | Equilibrium Shifter | — |
| Ch. 15 | Equilibrium Constants (K) | ✅ Complete | Equilibrium Shifter (ICE mode) | — |
| Ch. 15 | ICE Table Calculations | ✅ Complete | Equilibrium Shifter (ICE mode) | — |
| Ch. 15 | Ksp (Solubility Equilibrium) | ✅ Complete | Leysnisjafnvægi | — |
| Ch. 16 | Acid-Base Equilibrium | ✅ Strong | pH Titration | — |
| Ch. 16 | Ka/Kb Calculations | ✅ Complete | pH Titration (Level 4) | — |
| Ch. 17 | Buffers | ✅ Complete | Buffer Recipe Creator (3 levels) | — |
| Ch. 17 | Titration Curves | ✅ Strong | pH Titration | — |
| Ch. 19 | Entropy (ΔS) | ✅ Complete | Thermodynamics Predictor | — |
| Ch. 19 | Gibbs Free Energy | ✅ Strong | Thermodynamics Predictor | — |
| Ch. 19 | Equilibrium & ΔG | ✅ Complete | Thermodynamics Predictor | — |

---

## Part A: Detailed Game Assessments

### 1. Equilibrium Shifter (Jafnvægisstjóri)

**Current Rating:** ★★★★★

**Strengths:**
- Exceptional Le Chatelier's principle implementation
- 30 diverse equilibrium systems across 3 difficulty levels
- Q vs K comparison visualization
- Real industrial chemistry examples (Haber, Contact processes)
- Particle animations showing equilibrium states
- Thermodynamic data (ΔH) integration for temperature effects

**Educational Gaps:**
- No quantitative equilibrium constant calculations
- Missing ICE table methodology
- No calculation of new equilibrium concentrations after stress
- Q vs K shown visually but not calculated numerically

#### Enhancement E1: ICE Table Integration
**Effort:** High | **Impact:** Critical | **Status:** ✅ Complete (2026-02-02)

Add quantitative equilibrium module:
- Given initial concentrations and K, calculate equilibrium concentrations
- Interactive ICE table builder
- Solve for x using K expression
- Validate approximations (5% rule)

**Implementation spec:**
```typescript
interface ICETableProblem {
  reaction: string;
  K: number;
  initialConcentrations: { species: string; concentration: number }[];
  targetSpecies: string; // What to solve for
  equilibriumConcentrations?: { species: string; concentration: number }[]; // Answer
}

// Example problem
const example: ICETableProblem = {
  reaction: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)',
  K: 4.34e-3,
  initialConcentrations: [
    { species: 'N₂', concentration: 1.00 },
    { species: 'H₂', concentration: 1.00 },
    { species: 'NH₃', concentration: 0 }
  ],
  targetSpecies: 'NH₃'
};
```

#### Enhancement E2: Numerical Q vs K Calculation
**Effort:** Medium | **Impact:** High

Currently Q vs K is shown conceptually. Add numerical calculation:
- Given current concentrations, calculate Q
- Compare Q to K numerically
- Predict direction of shift
- Calculate new equilibrium state

#### Enhancement E3: Reaction Quotient Problems
**Effort:** Medium | **Impact:** Medium

Add problem set where students:
1. Calculate Q from given concentrations
2. Compare to K
3. Predict which direction reaction shifts
4. Explain at molecular level

---

### 2. pH Titration (pH Títrun)

**Current Rating:** ★★★★☆

**Strengths:**
- Interactive titration simulation with real-time pH meter
- Titration curve visualization for different acid-base pairs
- Indicator selection with color changes
- Equivalence point identification
- Henderson-Hasselbalch application in buffer region

**Educational Gaps:**
- No Ka/Kb from titration curve analysis
- Missing weak polyprotic acid titrations with multiple equivalence points
- No reverse task (given curve, identify the acid)

#### Enhancement T1: Ka Determination from Titration Curve
**Effort:** Medium | **Impact:** High | **Status:** ✅ Complete (2026-02-02)

Added Level 4 with Ka analysis mode:
- At half-equivalence point, pH = pKa
- Students identify this point on curve
- Calculate Ka from pH reading
- Compare to tabulated values

#### Enhancement T2: Polyprotic Acid Titrations
**Effort:** High | **Impact:** Medium

Add H₂SO₃, H₃PO₄ titrations:
- Multiple equivalence points
- Multiple buffer regions
- pKa1, pKa2, pKa3 determination
- Speciation diagrams (α plots)

#### Enhancement T3: Curve Interpretation Challenge
**Effort:** Medium | **Impact:** High

Reverse the typical problem:
- Given a titration curve (no labels)
- Identify: strong/weak acid? Mono/diprotic?
- Estimate Ka from curve features
- Match to known acid

---

### 3. Buffer Recipe Creator (Stuðpúðasmíði)

**Current Rating:** ★★★★★ (Complete)

**Strengths:**
- Excellent Level 1 visualization of acid/base ratio effects
- Real-time pH calculation from Henderson-Hasselbalch
- Intuitive molecular manipulation interface
- Good conceptual foundation
- Hint system with tiered hints
- Ratio visualization bar
- **Level 2 fully implemented**: Henderson-Hasselbalch 3-step calculations (direction → ratio → mass)
- **Level 3 fully implemented**: Stock solution preparation with volume calculations

**Status:**
- ✅ Level 1 implemented and functional (visual molecule manipulation)
- ✅ Level 2 implemented (6 puzzles with Henderson-Hasselbalch calculations)
- ✅ Level 3 implemented (6 puzzles with stock solution calculations)
- ✅ 30 buffer problems across 3 difficulty levels (beginner, intermediate, advanced)

#### Enhancement B1: Henderson-Hasselbalch Calculation Mode (Level 2)
**Status:** ✅ COMPLETE

Implemented features:
- 3-step reasoning: direction → ratio → mass
- 6 puzzles with real-world buffer systems (blood, phosphate, TRIS, citrate, ammonia, formic acid)
- Step-by-step guided calculation with feedback

#### Enhancement B2: Stock Solution Preparation (Level 3)
**Status:** ✅ COMPLETE

Implemented features:
- Design constraints (stock solutions, target volume, target concentration)
- 6 puzzles with stock solutions
- 3-step flow: ratio → moles → volumes
- Visual recipe cards showing preparation steps

#### Enhancement B3: Buffer Capacity Visualization
**Effort:** Medium | **Impact:** Medium | **Status:** ⬜ OPTIONAL (component exists but not integrated into levels)

Potential future enhancement:
- β vs pH curve visualization
- Acid/base addition simulation showing buffering effect

---

### 4. Thermodynamics Predictor (Varmafræði Spámaður)

**Current Rating:** ★★★★☆

**Strengths:**
- Excellent interactive ΔG vs T graph
- Clear visualization of spontaneity regions
- Four thermodynamic scenarios well-presented
- Crossover temperature calculation
- Real-time ΔG = ΔH - TΔS display

**Educational Gaps:**
- Entropy (ΔS) is treated qualitatively only
- No actual entropy calculations from data
- Missing ΔG° = -RT ln K connection
- No non-standard conditions treatment

#### Enhancement D1: Entropy Calculation Problems
**Effort:** Medium | **Impact:** High | **Status:** ✅ Complete (2026-02-02)

Added quantitative entropy via CalculationChallenges component:
- Calculate ΔS° from standard molar entropies (S°)
- ΔS° = Σ S°(products) - Σ S°(reactants)
- Predict sign of ΔS from molecular changes (phase, moles of gas)

**Data table needed:**
```typescript
const standardEntropies: Record<string, number> = {
  'H₂O(l)': 69.9,   // J/(mol·K)
  'H₂O(g)': 188.8,
  'CO₂(g)': 213.8,
  'O₂(g)': 205.2,
  'N₂(g)': 191.6,
  // ... more compounds
};
```

#### Enhancement D2: ΔG and Equilibrium Connection
**Effort:** Medium | **Impact:** High | **Status:** ✅ Complete (2026-02-02)

Added module connecting thermodynamics to equilibrium via CalculationChallenges:
- ΔG° = -RT ln K
- Calculate K from ΔG° (and vice versa)
- Explain why large negative ΔG° means large K
- Non-standard ΔG = ΔG° + RT ln Q

#### Enhancement D3: Coupled Reactions
**Effort:** Medium | **Impact:** Medium

Show how non-spontaneous reactions can be driven by coupling:
- ATP hydrolysis driving unfavorable reactions
- Industrial examples (aluminum production)
- Sum of ΔG values must be negative

---

### 5. Gas Law Challenge

**Current Rating:** ★★★★☆

**Strengths:**
- Comprehensive ideal gas law coverage (PV = nRT)
- Practice and Challenge modes with good difficulty scaling
- Particle simulation visualization
- Real-world contexts (scuba, balloons, tires)
- Law selection step helps students identify which law applies

**Educational Gaps:**
- No combined gas law problems
- Missing gas mixture problems (Dalton's law)
- No molar volume at STP emphasis
- Real gas deviations not covered

#### Enhancement G1: Combined Gas Law Problems
**Effort:** Low | **Impact:** Medium

Add problems where multiple variables change:
- P₁V₁/T₁ = P₂V₂/T₂
- Identify what's constant and what changes
- Multi-step reasoning required

#### Enhancement G2: Dalton's Law of Partial Pressures
**Effort:** Medium | **Impact:** High | **Status:** ✅ Complete (2026-02-02)

Added gas mixture module with 8 Dalton's Law problems:
- Total pressure = sum of partial pressures
- Mole fraction and partial pressure relationship
- Vapor pressure of water in gas collection
- Real applications (atmosphere, diving gases)

**Problem types:**
```typescript
interface DaltonProblem {
  gases: { name: string; moles?: number; partialPressure?: number; moleFraction?: number }[];
  totalPressure?: number;
  totalMoles?: number;
  solveFor: 'partialPressure' | 'moleFraction' | 'totalPressure' | 'moles';
}
```

#### Enhancement G3: Molar Volume Emphasis
**Effort:** Low | **Impact:** Medium

Add dedicated section on:
- At STP: 1 mol gas = 22.4 L
- Quick conversions without full PV = nRT
- Stoichiometry with gas volumes

---

## Part B: New Games Needed

### Priority 1: Leysnisjafnvægi (Solubility Equilibrium / Ksp)

**Curriculum:** Brown Chapter 17.4-17.5
**Effort:** High | **Impact:** Critical | **Status:** ✅ Complete (2026-02-02)

New game built with 3 levels covering Ksp concepts, solubility calculations, and precipitation predictions.

#### Game Specification

**Level 1: Ksp Concepts**
- Write Ksp expressions for ionic compounds
- Understand saturated vs unsaturated solutions
- Qualitative solubility comparisons using Ksp
- 10 conceptual problems

**Level 2: Solubility Calculations**
- Calculate molar solubility from Ksp
- Calculate Ksp from solubility data
- Handle common ion effect
- 12 calculation problems

**Level 3: Precipitation Predictions**
- Calculate Q and compare to Ksp
- Predict if precipitate forms when solutions mix
- Selective precipitation problems
- 8 complex problems

**Bonus: Qualitative Analysis Simulation**
- Identify unknown cations through selective precipitation
- Classic qual analysis scheme

**Sample problems:**
```typescript
const kspProblems = [
  {
    compound: 'AgCl',
    Ksp: 1.8e-10,
    type: 'solubility_from_Ksp',
    question: 'Calculate the molar solubility of AgCl in pure water.'
  },
  {
    compound: 'PbCl₂',
    Ksp: 1.7e-5,
    type: 'common_ion',
    commonIon: { ion: 'Cl⁻', concentration: 0.10 },
    question: 'Calculate the molar solubility of PbCl₂ in 0.10 M NaCl.'
  }
];
```

---

### Priority 2: Ka/Kb Jafnvægisreikningar (Acid-Base Equilibrium Calculations)

**Curriculum:** Brown Chapter 16.5-16.8
**Effort:** High | **Impact:** High

Currently pH Titration assumes students know Ka/Kb calculations, but these aren't taught.

#### Game Specification

**Level 1: Ka and Kb Expressions**
- Write Ka expressions for weak acids
- Write Kb expressions for weak bases
- Relationship: Ka × Kb = Kw
- 10 expression problems

**Level 2: pH of Weak Acid/Base Solutions**
- ICE table approach for weak acids
- Calculate pH from Ka and initial concentration
- Approximation validity (5% rule)
- 12 calculation problems

**Level 3: Percent Ionization and pKa**
- Calculate percent ionization
- Effect of concentration on ionization
- pKa/pKb conversions and comparisons
- 8 problems

**Bonus: Polyprotic Acid Calculations**
- Sequential Ka values
- Dominant species at given pH
- Speciation diagrams

---

### Priority 3: ICE Töfluleikur (ICE Table Game)

**Curriculum:** Brown Chapter 15.5
**Effort:** Medium | **Impact:** High

This could be standalone or integrated into Equilibrium Shifter.

#### Game Specification

**Level 1: Setting Up ICE Tables**
- Identify Initial concentrations
- Write Change row using stoichiometry
- Express Equilibrium in terms of x
- 8 setup problems (no solving)

**Level 2: Solving for x**
- Substitute into K expression
- Solve quadratic (or use approximation)
- Check approximation validity
- 10 full calculation problems

**Level 3: Complex Equilibria**
- Reactions with non-zero initial product concentrations
- Multiple equilibria
- Gas-phase equilibria with Kp
- 6 challenging problems

---

## Part C: Cross-Game Integration Opportunities

### Integration 1: Equilibrium → Thermodynamics Connection
Link Equilibrium Shifter to Thermodynamics Predictor:
- After determining K from equilibrium, calculate ΔG°
- Show that spontaneous reactions (ΔG° < 0) have K > 1
- Temperature effects on K through van 't Hoff equation

### Integration 2: Buffer → Titration Connection
Link Buffer Recipe Creator to pH Titration:
- After creating a buffer, see its titration curve
- Identify buffer region on titration curve
- Show buffer capacity visually

### Integration 3: Gas Laws → Equilibrium Connection
Link Gas Law Challenge to Equilibrium Shifter:
- Kp = Kc(RT)^Δn
- Pressure effects on gas-phase equilibria
- Partial pressure calculations in equilibrium

---

## Implementation Priority & Timeline

### Phase 1: Critical Completion ✅ COMPLETE
1. ✅ **Complete Buffer Recipe Creator Levels 2-3** (B1, B2) — COMPLETE (all 3 levels implemented)
2. ✅ **Add ICE table integration to Equilibrium Shifter** (E1) — COMPLETE (2026-02-02)

### Phase 2: New Critical Game ✅ COMPLETE
3. ✅ **Build Leysnisjafnvægi (Ksp/Solubility Equilibrium)** — COMPLETE (2026-02-02)

### Phase 3: High-Priority Enhancements ✅ COMPLETE
4. ✅ **Add Ka determination to pH Titration** (T1) — COMPLETE (2026-02-02)
5. ✅ **Add entropy calculations to Thermodynamics Predictor** (D1) — COMPLETE (2026-02-02)
6. ✅ **Add ΔG-K connection to Thermodynamics Predictor** (D2) — COMPLETE (2026-02-02)
7. ✅ **Add Dalton's Law to Gas Law Challenge** (G2) — COMPLETE (2026-02-02)

### Phase 4: Additional Game ✅ COMPLETE
8. ✅ Build Ka/Kb Jafnvægisreikningar (Acid-Base Equilibrium) — COMPLETE (2026-02-03)

### Phase 5: Medium-Priority Enhancements ✅ COMPLETE
9. ✅ Add numerical Q vs K to Equilibrium Shifter (E2) — COMPLETE (2026-02-03)
10. ✅ Add polyprotic titrations to pH Titration (T2) — COMPLETE (2026-02-03)
11. ✅ Add curve interpretation challenge (T3) — COMPLETE (2026-02-03)

### Phase 6: Cross-Game Integration ✅ COMPLETE
12. ✅ Implement Equilibrium ↔ Thermodynamics connection — COMPLETE (2026-02-03)
13. ✅ Implement Buffer ↔ Titration connection — COMPLETE (2026-02-03)

---

## Notes for Next Session

**Status Update (2026-02-03):** ✅ ALL PHASES COMPLETE!

**Accomplishments:**
- ✅ ICE tables added to Equilibrium Shifter (10 problems across 3 difficulties)
- ✅ New Ksp/Solubility game built (Leysnisjafnvægi) with 3 complete levels
- ✅ Ka determination added to pH Titration as Level 4 (6 problems with titration curve analysis)
- ✅ Entropy calculations (S°) and ΔG-K connection added to Thermodynamics Predictor
- ✅ Dalton's Law of Partial Pressures added to Gas Law Challenge (8 problems)
- ✅ Buffer Recipe Creator all 3 levels implemented (6 puzzles each in Levels 2-3)
- ✅ Ka/Kb Jafnvægisreikningar game built (3 levels: Ka/Kb expressions, pH calculations, ionization %)
- ✅ Numerical Q vs K mode added to Equilibrium Shifter (12 problems across 3 difficulties)
- ✅ Polyprotic acid titrations added to pH Titration Level 4 (6 challenges for diprotic/triprotic)
- ✅ Curve interpretation challenges added to pH Titration Level 4 (6 multiple choice challenges)
- ✅ Cross-game Equilibrium ↔ Thermodynamics: Added K, ΔG, ΔS to all 30 equilibria + ThermodynamicsConnection UI
- ✅ Cross-game Buffer ↔ Titration: Added buffer region highlighting + cross-game connection to Buffer Recipe Creator

**Year 3 Development Complete!** All 6 phases implemented, covering the entire Brown Chemistry curriculum for Year 3.
