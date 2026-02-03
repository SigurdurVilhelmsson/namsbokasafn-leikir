# Year 2 Chemistry Games — Development Plan

**Date:** 2026-01-30 | **Updated:** 2026-02-03
**Curriculum Reference:** Brown et al, *Chemistry: The Central Science*, Chapters 5-14, 20, 24-25
**Status:** ✅ All Phases Complete

---

## Executive Summary

Year 2 games comprehensively cover bonding, molecular structure, thermochemistry, kinetics, and organic chemistry. **All 10 games are now fully implemented** with strong visualizations and multi-level progression. Former gaps (electrochemistry, calorimetry, organic reactions) have been filled. Remaining work focuses on cross-game integration and polish enhancements.

---

## Current Game Coverage Matrix

| Chapter | Topic | Coverage | Game(s) | Priority |
|---------|-------|----------|---------|----------|
| Ch. 5 | Thermochemistry/Hess's Law | ✅ Strong | Hess's Law | — |
| Ch. 5 | Calorimetry | ✅ Complete | Calorimetry | — |
| Ch. 8 | Lewis Structures | ✅ Strong | Lewis Structures | — |
| Ch. 9 | VSEPR/Hybridization | ✅ Strong | VSEPR Geometry | — |
| Ch. 11 | Intermolecular Forces | ✅ Strong | Intermolecular Forces | — |
| Ch. 11 | Phase Diagrams | ❌ Missing | None | Low |
| Ch. 14 | Chemical Kinetics | ✅ Strong | Kinetics | — |
| Ch. 14 | Arrhenius Equation | ✅ Complete | Kinetics | — |
| Ch. 20 | Redox/Ox Numbers | ✅ Strong | Redox Reactions | — |
| Ch. 20 | Electrochemistry | ✅ Complete | Electrochemistry | — |
| Ch. 24 | Organic Nomenclature | ✅ Strong | Organic Nomenclature | — |
| Ch. 24-25 | Organic Reactions | ✅ Complete | Organic Reactions | — |

---

## Part A: Detailed Game Assessments

### 1. Hess's Law (Lögmál Hess)

**Current Rating:** ★★★★☆

**Strengths:**
- Excellent visual energy pathway diagrams showing cumulative enthalpy changes
- Equation manipulation (reversal/multiplication) with clear sign conventions
- State function concept is well-explained with pathway comparison
- Formation enthalpy (ΔH°f) table integration for real calculations

**Educational Gaps:**
- No connection to actual calorimetry measurements (how ΔH values are obtained)
- Missing standard state notation emphasis
- No treatment of bond enthalpies as alternative calculation method

#### Enhancement H1: Bond Enthalpy Calculator Mode
**Effort:** High | **Impact:** Medium

Add alternative calculation pathway using bond enthalpies:
- ΔH ≈ Σ(bonds broken) - Σ(bonds formed)
- Visual showing bonds breaking and forming
- Compare to Hess's Law result (discuss approximation)

**Sample implementation:**
```typescript
interface BondEnthalpyProblem {
  reaction: string;
  bondsInReactants: { bond: string; count: number; enthalpy: number }[];
  bondsInProducts: { bond: string; count: number; enthalpy: number }[];
  expectedDeltaH: number;
}
```

#### Enhancement H2: Standard State Emphasis
**Effort:** Low | **Impact:** Medium

Add visual indicators showing standard conditions (25°C, 1 atm, 1 M) and explain why standard states matter for tabulated values.

---

### 2. Lewis Structures (Lewis-formúlur)

**Current Rating:** ★★★★★

**Strengths:**
- Complete valence electron counting workflow
- Excellent drag-drop structure builder with validation
- Formal charge calculation with stability ranking
- Resonance structure comparison
- Integration with 3D visualization

**Educational Gaps:**
- Octet rule exceptions not fully covered (expanded octets, incomplete octets)
- No radical species (odd electron molecules)
- Missing connection to bond order from resonance

#### Enhancement L1: Octet Rule Exceptions Module
**Effort:** Medium | **Impact:** High

Add dedicated section for exceptions:
- **Incomplete octets:** BF₃, BeCl₂ (electron-deficient)
- **Expanded octets:** PCl₅, SF₆, XeF₄ (d-orbital involvement)
- **Odd-electron species:** NO, NO₂ (radicals)

Visual emphasis: Show why these exceptions occur (period 3+ for expansion, insufficient electrons for completion)

#### Enhancement L2: Bond Order from Resonance
**Effort:** Low | **Impact:** Medium

After drawing resonance structures, calculate average bond order:
- O₃: Average O-O bond order = 1.5
- NO₃⁻: Average N-O bond order = 1.33

Connect to bond length and strength predictions.

---

### 3. Kinetics (Hvarfhraði)

**Current Rating:** ★★★★☆

**Strengths:**
- Collision theory visualization with molecular animations
- Maxwell-Boltzmann distribution showing Ea threshold
- Rate law determination from experimental data
- Mechanism analysis with rate-determining step identification
- Catalyst effect demonstration

**Educational Gaps:**
- Arrhenius equation (k = Ae^(-Ea/RT)) is shown visually but not calculated
- No integrated rate law graphing (ln[A] vs t, 1/[A] vs t)
- Missing half-life calculations

#### Enhancement K1: Arrhenius Equation Calculator
**Effort:** Medium | **Impact:** High

Add quantitative Arrhenius problems:
- Given k at two temperatures, calculate Ea
- Given Ea and k at one temperature, predict k at another temperature
- Plot ln(k) vs 1/T to determine Ea from slope

**Interactive component:**
```typescript
interface ArrheniusProblem {
  k1: number;
  T1: number; // Kelvin
  k2?: number;
  T2?: number;
  Ea?: number; // kJ/mol
  solveFor: 'Ea' | 'k2' | 'T2';
}
```

#### Enhancement K2: Integrated Rate Law Graphing
**Effort:** Medium | **Impact:** Medium

Add graphical analysis module:
- Plot concentration vs time data
- Students determine if reaction is 0th, 1st, or 2nd order from graph shape
- Extract rate constant from slope of linearized plot
- Calculate half-life from rate constant

#### Enhancement K3: Enzyme Kinetics Context
**Effort:** Low | **Impact:** Medium

Add biological context problems:
- Michaelis-Menten kinetics (qualitative understanding)
- Drug metabolism rates
- Temperature effects on enzyme activity

---

### 4. VSEPR Geometry (VSEPR Rúmfræði)

**Current Rating:** ★★★★★

**Strengths:**
- Excellent 3D animated molecular structures
- Complete coverage of all common geometries
- Clear distinction between electron and molecular geometry
- Hybridization integration
- Polarity prediction with dipole visualization

**Educational Gaps:**
- No treatment of molecules with more than one central atom
- Missing connection to actual experimental methods (X-ray, spectroscopy)

#### Enhancement V1: Multi-Center Molecules
**Effort:** High | **Impact:** Medium

Add molecules with multiple central atoms:
- C₂H₆: Two tetrahedral carbons
- C₂H₄: Two trigonal planar carbons
- C₂H₂: Two linear carbons
- CH₃OH: Tetrahedral carbon, bent oxygen

Show how geometry at each center affects overall molecular shape.

#### Enhancement V2: Experimental Validation
**Effort:** Low | **Impact:** Low

Add brief notes showing how predicted geometries are confirmed:
- X-ray crystallography for solid compounds
- Electron diffraction for gases
- IR/Raman spectroscopy for bond angles

---

### 5. Intermolecular Forces (Millisameindakraftar)

**Current Rating:** ★★★★★

**Strengths:**
- Clear categorization of LDF, dipole-dipole, and H-bonding
- Boiling point ranking exercises with justification
- Solubility prediction ("like dissolves like")
- Excellent property prediction problems

**Educational Gaps:**
- Ion-dipole forces not covered (important for dissolution)
- No surface tension/viscosity demonstrations
- Missing phase diagram connection

#### Enhancement I1: Ion-Dipole Forces
**Effort:** Medium | **Impact:** High

Add ion-dipole interaction coverage:
- Explain dissolution of ionic compounds in polar solvents
- Visualize water molecules surrounding Na⁺ and Cl⁻
- Connect to hydration energy

#### Enhancement I2: Macroscopic Property Demonstrations
**Effort:** Medium | **Impact:** Medium

Add visual demonstrations of:
- Surface tension (water strider, droplet shape)
- Viscosity comparison (water vs glycerol)
- Capillary action

Connect to IMF strength explanations.

---

### 6. Organic Nomenclature (Lífræn Nafnagift)

**Current Rating:** ★★★★☆

**Strengths:**
- Comprehensive IUPAC prefix system (meth- through dec-)
- Bond type suffixes (-ane, -ene, -yne)
- Functional group priority and naming
- Branched chain naming with substituent locants

**Educational Gaps:**
- No reverse naming (name → structure drawing)
- Missing cyclic compounds
- Stereochemistry (cis/trans, E/Z) not included
- No aromatic compounds

#### Enhancement O1: Name-to-Structure Drawing
**Effort:** High | **Impact:** High

**This is the highest-priority enhancement for Organic Nomenclature.**

Add reverse challenge mode:
- Given IUPAC name, draw the structure
- Interactive carbon chain builder
- Drag-drop substituents to correct positions
- Validate against expected structure

#### Enhancement O2: Cyclic Compound Naming
**Effort:** Medium | **Impact:** Medium

Add cycloalkanes and cycloalkenes:
- Cyclopentane, cyclohexane, cyclohexene
- Substituted cyclic compounds (methylcyclohexane)
- Numbering rules for cyclic systems

#### Enhancement O3: Stereochemistry Introduction
**Effort:** High | **Impact:** Medium

Add geometric isomerism:
- Cis/trans nomenclature for cyclic compounds
- E/Z nomenclature for alkenes
- Visual distinction between isomers

---

### 7. Redox Reactions (Oxun og Afoxun)

**Current Rating:** ★★★★☆

**Strengths:**
- Thorough oxidation number rules with practice
- Clear oxidation/reduction identification
- Oxidizing/reducing agent distinction
- Half-reaction balancing method
- Acidic and basic solution balancing

**Educational Gaps:**
- No electrochemistry applications (galvanic cells, electrolysis)
- Missing standard reduction potential tables
- No cell notation or cell potential calculations

#### Enhancement R1: Galvanic Cell Introduction
**Effort:** High | **Impact:** High

**This is the highest-priority new content for Year 2.**

Add electrochemistry module:
- Visual galvanic cell with anode/cathode labels
- Electron flow direction
- Salt bridge purpose
- Standard reduction potential table (E°)
- Cell potential calculation: E°cell = E°cathode - E°anode

#### Enhancement R2: Electrolysis Basics
**Effort:** Medium | **Impact:** Medium

Add electrolysis concepts:
- Opposite of galvanic cell (non-spontaneous)
- Electrode reactions in electrolysis
- Faraday's laws (quantitative electrolysis)

---

## Part B: New Games Needed

### Priority 1: Rafefnafræði (Electrochemistry)

**Curriculum:** Brown Chapter 20.4-20.9
**Effort:** High | **Impact:** Critical

This is the major curriculum gap in Year 2.

#### Game Specification

**Level 1: Galvanic Cell Concepts**
- Build a galvanic cell by selecting electrodes
- Identify anode (oxidation) and cathode (reduction)
- Predict electron flow direction
- 10 cell combinations

**Level 2: Standard Reduction Potentials**
- Use E° table to predict spontaneity
- Calculate E°cell from half-reaction potentials
- Rank metals by reducing ability
- 12 problems

**Level 3: Quantitative Electrochemistry**
- Nernst equation introduction (qualitative)
- Faraday's laws: mass deposited from current and time
- 8 calculation problems

**Bonus: Battery Types**
- Compare common batteries (alkaline, lithium-ion, lead-acid)
- Explain why certain combinations produce higher voltage

---

### Priority 2: Hitalitun (Calorimetry)

**Curriculum:** Brown Chapter 5.5-5.7
**Effort:** Medium | **Impact:** Medium

#### Game Specification

**Level 1: Heat Capacity Concepts**
- q = mcΔT calculations
- Distinguish heat and temperature
- Specific heat comparisons
- 10 problems

**Level 2: Coffee-Cup Calorimetry**
- Simulate dissolution reactions
- Calculate ΔH from temperature change
- Understand assumptions (constant pressure)
- 8 problems

**Level 3: Bomb Calorimetry**
- Combustion reactions
- Constant volume conditions
- Energy content of fuels
- 6 problems

---

### Priority 3: Lífrænir Hvarfgangar (Organic Reactions Introduction)

**Curriculum:** Brown Chapters 24-25
**Effort:** High | **Impact:** Medium

#### Game Specification

**Level 1: Reaction Types**
- Identify addition, substitution, elimination reactions
- Recognize functional group transformations
- 12 reaction classifications

**Level 2: Mechanism Basics**
- Arrow-pushing fundamentals
- Nucleophile/electrophile identification
- Simple SN2 and E2 mechanisms
- 10 mechanism problems

**Level 3: Synthesis Planning**
- Given starting material and product, identify reagents needed
- Simple 2-3 step synthesis routes
- 6 synthesis challenges

---

## Part C: Cross-Game Integration Opportunities

### Integration 1: Lewis → VSEPR Pipeline
Add automatic link from Lewis Structures game: after completing a structure, offer to "See this molecule in 3D" which opens VSEPR game with that molecule.

### Integration 2: IMF → Organic Connection
When learning about hydrogen bonding in IMF game, link to Organic Nomenclature for functional groups capable of H-bonding (alcohols, carboxylic acids, amines).

### Integration 3: Kinetics → Hess's Law Connection
Energy diagrams in Kinetics (activation energy) should reference enthalpy diagrams in Hess's Law. Show how Ea relates to thermodynamic ΔH.

### Integration 4: Redox → Electrochemistry Preparation
Current Redox game should include "preview" problems that set up electrochemistry concepts (spontaneous electron transfer).

---

## Implementation Priority & Timeline

### Phase 1: Critical Enhancements ✅ COMPLETE
1. ✅ Add name-to-structure drawing to Organic Nomenclature (O1)
2. ✅ Add Arrhenius equation calculations to Kinetics (K1)
3. ✅ Add octet rule exceptions to Lewis Structures (L1)

### Phase 2: New Critical Game ✅ COMPLETE
4. ✅ Build Rafefnafræði (Electrochemistry) — 3 levels implemented

### Phase 3: Medium Priority Enhancements ✅ COMPLETE
5. ✅ Add ion-dipole forces to IMF (I1)
6. ✅ Add integrated rate law graphing to Kinetics (K2)
7. ✅ Add cyclic compounds to Organic Nomenclature (O2)
8. ✅ Add bond enthalpy mode to Hess's Law (H1)

### Phase 4: Additional Games ✅ COMPLETE
9. ✅ Build Hitalitun (Calorimetry) — 3 levels implemented
10. ✅ Build Lífrænir Hvarfgangar (Organic Reactions) — 3 levels implemented

### Phase 5: Cross-Game Integration
11. ⬜ Implement Lewis → VSEPR pipeline
12. ⬜ Add IMF → Organic functional group links
13. ⬜ Connect Kinetics energy diagrams to Hess's Law

---

## Notes for Next Session

**Sprint Summary (2026-02-03):** Phases 1-4 complete! All core games implemented:
- ✅ 10 games fully implemented with 3-4 levels each
- ✅ Electrochemistry game built (was critical gap)
- ✅ Calorimetry game built
- ✅ Organic Reactions game built

**Remaining work:**
- Phase 5: Cross-game integration (Lewis → VSEPR, IMF → Organic, Kinetics ↔ Hess's Law)
- Consider additional enhancements identified in Part A assessments
- Potential polish: Add more real-world examples and error analysis steps
