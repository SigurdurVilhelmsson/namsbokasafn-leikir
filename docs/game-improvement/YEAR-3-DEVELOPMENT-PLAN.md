# Year 3 Chemistry Games — Development Plan

**Date:** 2026-01-30
**Curriculum Reference:** Brown et al, *Chemistry: The Central Science*, Chapters 10, 15-17, 19
**Status:** Planning Phase

---

## Executive Summary

Year 3 games cover advanced equilibrium, acid-base chemistry, thermodynamics, and gas laws. The 5 existing games are conceptually sophisticated with strong interactive visualizations. **Buffer Recipe Creator** is incomplete (only Level 1 implemented). Key gaps include **quantitative equilibrium calculations (ICE tables)**, **Ksp and solubility equilibria**, and **entropy calculations**. Priority should be completing incomplete games and adding quantitative depth.

---

## Current Game Coverage Matrix

| Chapter | Topic | Coverage | Game(s) | Priority |
|---------|-------|----------|---------|----------|
| Ch. 10 | Ideal Gas Law | ✅ Strong | Gas Law Challenge | — |
| Ch. 10 | Real Gases/Deviations | ❌ Missing | None | Low |
| Ch. 15 | Le Chatelier's Principle | ✅ Excellent | Equilibrium Shifter | — |
| Ch. 15 | Equilibrium Constants (K) | ⚠️ Qualitative only | Equilibrium Shifter | **High** |
| Ch. 15 | ICE Table Calculations | ❌ Missing | None | **High** |
| Ch. 15 | Ksp (Solubility Equilibrium) | ❌ Missing | None | **High** |
| Ch. 16 | Acid-Base Equilibrium | ⚠️ Partial | pH Titration | Medium |
| Ch. 16 | Ka/Kb Calculations | ❌ Missing | None | Medium |
| Ch. 17 | Buffers | ⚠️ Incomplete | Buffer Recipe Creator | **Critical** |
| Ch. 17 | Titration Curves | ✅ Strong | pH Titration | — |
| Ch. 19 | Entropy (ΔS) | ⚠️ Qualitative only | Thermodynamics Predictor | Medium |
| Ch. 19 | Gibbs Free Energy | ✅ Strong | Thermodynamics Predictor | — |
| Ch. 19 | Equilibrium & ΔG | ❌ Missing | None | Medium |

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
**Effort:** High | **Impact:** Critical

**This is the highest-priority enhancement for Year 3.**

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
**Effort:** Medium | **Impact:** High

Add analysis mode:
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

**Current Rating:** ★★☆☆☆ (Incomplete)

**Strengths:**
- Excellent Level 1 visualization of acid/base ratio effects
- Real-time pH calculation from Henderson-Hasselbalch
- Intuitive molecular manipulation interface
- Good conceptual foundation

**Critical Gap:**
- **Levels 2 and 3 are not implemented** — this must be completed

#### Enhancement B1: Complete Level 2 (Calculations)
**Effort:** High | **Impact:** Critical

**This is the most critical task for Year 3.**

Implement full Henderson-Hasselbalch calculation level:
1. Given target pH and pKa, calculate required [A⁻]/[HA] ratio
2. Given volumes and concentrations, calculate amounts to mix
3. Given mass of weak acid, calculate mass of conjugate base needed

**Problem types:**
```typescript
interface Level2Problem {
  type: 'ratio' | 'mass' | 'volume';
  acidName: string;
  pKa: number;
  targetPH: number;
  // Additional parameters based on type
  totalVolume?: number; // mL
  acidConcentration?: number; // M
  baseConcentration?: number; // M
}
```

#### Enhancement B2: Complete Level 3 (Design Constraints)
**Effort:** High | **Impact:** High

Implement practical buffer preparation:
- Work with stock solutions of known concentration
- Calculate volumes to pipette
- Consider buffer capacity requirements
- Work within tolerance bands (±0.1 pH)

**Real-world scenarios:**
- Biological buffers (phosphate, TRIS, HEPES)
- Laboratory preparation from solid reagents
- Buffer dilution calculations

#### Enhancement B3: Buffer Capacity Visualization
**Effort:** Medium | **Impact:** Medium

Add interactive demonstration:
- Add acid to buffer, watch pH change (small)
- Add same acid to unbuffered solution, watch pH change (large)
- Quantify buffer capacity β = Δn/ΔpH
- Show how capacity depends on concentration and ratio

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
**Effort:** Medium | **Impact:** High

Add quantitative entropy:
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
**Effort:** Medium | **Impact:** High

Add module connecting thermodynamics to equilibrium:
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
**Effort:** Medium | **Impact:** High

Add gas mixture module:
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
**Effort:** High | **Impact:** Critical

This is a major gap in Year 3 coverage.

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

### Phase 1: Critical Completion (Immediate)
1. ⬜ **Complete Buffer Recipe Creator Levels 2-3** (B1, B2) — HIGHEST PRIORITY
2. ⬜ Add ICE table integration to Equilibrium Shifter (E1)

### Phase 2: New Critical Game
3. ⬜ Build Leysnisjafnvægi (Ksp/Solubility Equilibrium) — major gap

### Phase 3: High-Priority Enhancements
4. ⬜ Add Ka determination to pH Titration (T1)
5. ⬜ Add entropy calculations to Thermodynamics Predictor (D1)
6. ⬜ Add ΔG-K connection to Thermodynamics Predictor (D2)
7. ⬜ Add Dalton's Law to Gas Law Challenge (G2)

### Phase 4: Additional Game
8. ⬜ Build Ka/Kb Jafnvægisreikningar (Acid-Base Equilibrium)

### Phase 5: Medium-Priority Enhancements
9. ⬜ Add numerical Q vs K to Equilibrium Shifter (E2)
10. ⬜ Add polyprotic titrations to pH Titration (T2)
11. ⬜ Add curve interpretation challenge (T3)

### Phase 6: Cross-Game Integration
12. ⬜ Implement Equilibrium ↔ Thermodynamics connection
13. ⬜ Implement Buffer ↔ Titration connection

---

## Notes for Next Session

- **Buffer Recipe Creator completion is the single most important task** — it's the only Year 3 game with unimplemented levels
- ICE tables are fundamental to all equilibrium calculations — this methodology gap affects multiple topics
- Ksp game would complete the equilibrium coverage (homogeneous + heterogeneous equilibria)
- Consider whether to add Ka/Kb as standalone game or as enhancement to pH Titration
- The Thermodynamics ↔ Equilibrium connection (ΔG° = -RT ln K) is crucial for Year 3 integration
- Year 3 games are more calculation-heavy than Years 1-2 — ensure calculator-friendly interfaces
