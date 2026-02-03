# Year 1 Chemistry Games — Development Plan

**Date:** 2026-01-30 | **Updated:** 2026-02-03
**Curriculum Reference:** Brown et al, *Chemistry: The Central Science*, Chapters 1-4
**Status:** ✅ All Phases Complete

---

## Executive Summary

Year 1 games cover most core topics from Chapters 1-4, but have gaps in **balancing equations**, **percent composition/empirical formulas**, and **reaction type classification**. Existing games are pedagogically strong but would benefit from targeted enhancements to deepen concept connections.

---

## Current Game Coverage Matrix

| Chapter | Topic | Coverage | Game(s) | Priority |
|---------|-------|----------|---------|----------|
| Ch. 1 | Measurement & Units | ✅ Strong | Dimensional Analysis | — |
| Ch. 1 | Significant Figures | ❌ Missing | None | Medium |
| Ch. 1 | Classification of Matter | ❌ Missing | None | Medium |
| Ch. 2 | Nomenclature | ✅ Strong | Nafnakerfið | — |
| Ch. 2 | Atomic Structure | ⚠️ Partial | Mólmassi (periodic table) | Low |
| Ch. 3 | Molar Mass | ✅ Strong | Mólmassi | — |
| Ch. 3 | Balancing Equations | ❌ Missing | None | **High** |
| Ch. 3 | Stoichiometry | ✅ Good | Takmarkandi | — |
| Ch. 3 | Percent Composition | ❌ Missing | None | **High** |
| Ch. 3 | Percent Yield | ❌ Missing | None | High |
| Ch. 4 | Molarity/Dilution | ✅ Strong | Lausnir | — |
| Ch. 4 | Reaction Types | ❌ Missing | None | Medium |

---

## Part A: Improvements to Existing Games

### 1. Nafnakerfið (Nomenclature)

**Current Rating:** ★★★★☆

#### Enhancement A1: Add Acid Nomenclature
**Effort:** Medium | **Impact:** High

Add acids to the compound database. Students need to master the distinct naming patterns for:
- Binary acids: HCl → saltsýra (hydrochloric acid)
- Oxyacids: HNO₃ → nítursýra, H₂SO₄ → brennisteinssýra, H₃PO₄ → fosfórsýra
- Pattern: -ate → -ic acid, -ite → -ous acid

**Implementation:**
```typescript
// Add to compounds.ts
{ formula: 'HCl', name: 'Saltsýra', nameEn: 'Hydrochloric acid', type: 'acid', difficulty: 'medium' },
{ formula: 'HNO₃', name: 'Nítursýra', nameEn: 'Nitric acid', type: 'acid', difficulty: 'medium' },
{ formula: 'H₂SO₄', name: 'Brennisteinssýra', nameEn: 'Sulfuric acid', type: 'acid', difficulty: 'medium' },
{ formula: 'H₃PO₄', name: 'Fosfórsýra', nameEn: 'Phosphoric acid', type: 'acid', difficulty: 'hard' },
{ formula: 'HNO₂', name: 'Nítursýrlingur', nameEn: 'Nitrous acid', type: 'acid', difficulty: 'hard' },
{ formula: 'H₂SO₃', name: 'Brennisteinssýrlingur', nameEn: 'Sulfurous acid', type: 'acid', difficulty: 'hard' },
```

#### Enhancement A2: Cation-Anion Identification Step
**Effort:** Medium | **Impact:** Medium

Before naming, add a step asking students to identify:
1. Which is the cation? Which is the anion?
2. What is the charge on each ion?

This scaffolds the "why" behind nomenclature rules.

#### Enhancement A3: Common Name ↔ Systematic Name
**Effort:** Low | **Impact:** Low

Add a bonus challenge matching common names to systematic names:
- Vatn ↔ Dívetni monoxíð
- Ammoníak ↔ Köfnunarefnis þrívetni
- Metangas ↔ Kolefnis fjórvetni

---

### 2. Lausnir (Solutions)

**Current Rating:** ★★★★★

#### Enhancement B1: Saturation/Supersaturation Visualization
**Effort:** High | **Impact:** High

Add visual demonstration of solubility limits:
- Show what happens when dissolving exceeds saturation point
- Crystals forming at bottom of beaker
- Temperature dependence of saturation

#### Enhancement B2: Percent Concentration Mode
**Effort:** Medium | **Impact:** Medium

Add mass percent (w/w%) calculations alongside molarity:
- "A 5.0% NaCl solution contains how many grams of NaCl per 100 g solution?"
- Real-world labels often use percent

#### Enhancement B3: Precipitation Preview
**Effort:** High | **Impact:** High

When mixing two solutions, predict and visualize precipitate formation:
- Use solubility rules to predict
- Animate precipitate forming and settling
- Bridge to net ionic equations (Year 2 content)

---

### 3. Mólmassi (Molar Mass)

**Current Rating:** ★★★★☆

#### Enhancement C1: Avogadro's Number Integration
**Effort:** Medium | **Impact:** High

Add problems connecting moles to particle count:
- "How many molecules are in 2.0 mol of H₂O?"
- "How many atoms of oxygen are in 1.5 mol of CO₂?"
- Visual: Show 6.02 × 10²³ scale with analogies

#### Enhancement C2: Mole Conversion Chains
**Effort:** Medium | **Impact:** High

Add multi-step conversion problems:
```
Mass → Moles → Molecules → Atoms
18.0 g H₂O → 1.0 mol → 6.02×10²³ molecules → 1.81×10²⁴ atoms
```

Interactive chain builder where students construct the conversion pathway.

#### Enhancement C3: Percent Composition Calculator
**Effort:** Medium | **Impact:** High

Add percent composition problems:
- "What is the percent oxygen in H₂O?" (88.9%)
- "What is the percent nitrogen in NH₄NO₃?" (35.0%)

This prepares students for empirical formula determination.

---

### 4. Dimensional Analysis (Einingagreining)

**Current Rating:** ★★★★★

#### Enhancement D1: Significant Figures Emphasis
**Effort:** Low | **Impact:** Medium

Add sig fig tracking to calculations:
- Highlight which digits are significant
- Show rounding at each step
- Flag answers with incorrect precision

#### Enhancement D2: Chemistry-Specific Conversions
**Effort:** Medium | **Impact:** High

Add mole-related conversions to prepare for stoichiometry:
- Grams ↔ Moles (using molar mass)
- Moles ↔ Particles (using Avogadro's number)
- Liters of gas ↔ Moles (at STP, 22.4 L/mol)

#### Enhancement D3: Density as Conversion Factor
**Effort:** Low | **Impact:** Medium

Add density problems:
- "Gold has density 19.3 g/cm³. What is the mass of 2.5 cm³ of gold?"
- "Water has density 1.00 g/mL. What volume does 250 g of water occupy?"

---

### 5. Takmarkandi (Limiting Reactants)

**Current Rating:** ★★★★☆

#### Enhancement E1: Percent Yield Calculator
**Effort:** Medium | **Impact:** High

**This is the highest-priority enhancement for Year 1.**

After calculating theoretical yield, add:
1. "You actually obtained X grams. What is your percent yield?"
2. Formula: (actual yield / theoretical yield) × 100%
3. Discussion of why yields < 100% (side reactions, incomplete reaction, loss during transfer)

**Implementation spec:**
```typescript
interface YieldProblem {
  reaction: Reaction;
  givenAmounts: { reactant1: number; reactant2: number };
  actualYield: number;
  theoreticalYield: number; // calculated
  percentYield: number; // student calculates
}
```

#### Enhancement E2: Reaction Context Labels
**Effort:** Low | **Impact:** Medium

Label each reaction with its type and real-world application:
- 2H₂ + O₂ → 2H₂O — "Combustion in fuel cells"
- N₂ + 3H₂ → 2NH₃ — "Haber process for fertilizer production"
- 4Fe + 3O₂ → 2Fe₂O₃ — "Rusting of iron"

#### Enhancement E3: Equation Balancing Check
**Effort:** Medium | **Impact:** Medium

Add optional mode where students must balance the equation before solving:
- Present unbalanced equation
- Student adds coefficients
- Then proceeds to limiting reactant calculation

---

## Part B: New Games Needed

### Priority 1: Efnajafnir (Balancing Chemical Equations)

**Curriculum:** Brown Chapter 3.1
**Effort:** High | **Impact:** Critical

This is the most fundamental skill gap. Students cannot do stoichiometry without mastering equation balancing.

#### Game Specification

**Level 1: Visual Atom Balancing**
- Display atoms on left and right side of equation as colored circles
- Student drags coefficient selectors (1-6) to balance
- Visual feedback: atoms "light up" when balanced
- 10 simple equations (elements forming binary compounds)

**Level 2: Balancing by Inspection**
- Standard equation format with coefficient input boxes
- Hint system suggests which element to balance first
- 15 equations including combustion, synthesis, decomposition

**Level 3: Systematic Balancing**
- Complex equations requiring systematic approach
- Multi-step feedback showing balance state after each coefficient
- Includes equations with polyatomic ions (treat as unit)
- 10 challenging equations

**Bonus: Reaction Type Identification**
- After balancing, identify reaction type:
  - Synthesis (A + B → AB)
  - Decomposition (AB → A + B)
  - Single replacement (A + BC → AC + B)
  - Double replacement (AB + CD → AD + CB)
  - Combustion (fuel + O₂ → CO₂ + H₂O)

**Sample equations database:**
```typescript
const EQUATIONS = [
  // Level 1 - Simple
  { unbalanced: '_H₂ + _O₂ → _H₂O', balanced: '2H₂ + O₂ → 2H₂O', type: 'synthesis' },
  { unbalanced: '_Na + _Cl₂ → _NaCl', balanced: '2Na + Cl₂ → 2NaCl', type: 'synthesis' },
  { unbalanced: '_Fe + _O₂ → _Fe₂O₃', balanced: '4Fe + 3O₂ → 2Fe₂O₃', type: 'synthesis' },

  // Level 2 - Medium
  { unbalanced: '_C₃H₈ + _O₂ → _CO₂ + _H₂O', balanced: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O', type: 'combustion' },
  { unbalanced: '_KClO₃ → _KCl + _O₂', balanced: '2KClO₃ → 2KCl + 3O₂', type: 'decomposition' },

  // Level 3 - Hard
  { unbalanced: '_Fe₂O₃ + _CO → _Fe + _CO₂', balanced: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂', type: 'single-replacement' },
  { unbalanced: '_Ca₃(PO₄)₂ + _SiO₂ + _C → _CaSiO₃ + _P₄ + _CO', balanced: '2Ca₃(PO₄)₂ + 6SiO₂ + 10C → 6CaSiO₃ + P₄ + 10CO', type: 'complex' },
];
```

---

### Priority 2: Hlutfallsgreining (Percent Composition & Empirical Formulas)

**Curriculum:** Brown Chapter 3.5
**Effort:** High | **Impact:** Critical

#### Game Specification

**Level 1: Percent Composition**
- Given molecular formula, calculate mass percent of each element
- Step-by-step guided calculation
- 12 compounds of increasing complexity

**Level 2: Empirical Formula from Percent**
- Given percent composition, determine empirical formula
- Visual: convert % → grams → moles → ratio → formula
- 10 problems

**Level 3: Molecular Formula Determination**
- Given empirical formula AND molar mass, find molecular formula
- Example: Empirical CH₂O, molar mass 180 g/mol → C₆H₁₂O₆
- 8 problems

**Bonus: Combustion Analysis**
- Given mass of CO₂ and H₂O from combustion, determine formula
- Classic analytical chemistry technique
- 5 challenge problems

---

### Priority 3: Efnaflokkun (Classification of Matter)

**Curriculum:** Brown Chapter 1.2
**Effort:** Medium | **Impact:** Medium

#### Game Specification

**Level 1: Element, Compound, or Mixture?**
- Drag-and-drop sorting game
- Images and descriptions of common substances
- 20 items: gold, water, air, bronze, oxygen gas, salt water, etc.

**Level 2: Homogeneous vs Heterogeneous**
- Identify mixture type from description or image
- Solutions, alloys, suspensions, colloids
- 15 items

**Level 3: Physical vs Chemical Properties/Changes**
- Classify properties (density, flammability, color, reactivity)
- Classify changes (melting, burning, dissolving, rusting)
- 20 scenarios

---

### Priority 4: Efnahvarfategundir (Aqueous Reaction Types)

**Curriculum:** Brown Chapter 4.2-4.4
**Effort:** High | **Impact:** Medium

#### Game Specification

**Level 1: Precipitation Reactions**
- Given two ionic compounds, predict if precipitate forms
- Use provided solubility rules table
- Write complete ionic and net ionic equations
- 15 reactions

**Level 2: Acid-Base Reactions**
- Identify acid and base in reaction
- Write neutralization equations
- Calculate amounts in titration problems
- 12 reactions

**Level 3: Redox Reactions**
- Assign oxidation numbers
- Identify oxidizing and reducing agents
- Basic half-reaction concept
- 10 reactions

---

### Priority 5: Markverðir tölustafir (Significant Figures)

**Curriculum:** Brown Chapter 1.5
**Effort:** Low | **Impact:** Medium

#### Game Specification

**Level 1: Counting Sig Figs**
- Given a number, identify significant figures
- Rules for zeros (leading, trailing, captive)
- 20 numbers

**Level 2: Calculations with Sig Figs**
- Perform calculations and round to correct sig figs
- Addition/subtraction (decimal place rule)
- Multiplication/division (sig fig rule)
- 15 problems

**Level 3: Scientific Notation**
- Convert between standard and scientific notation
- Perform calculations in scientific notation
- 12 problems

---

## Implementation Priority & Timeline

### Phase 1: Critical Enhancements (Immediate) ✅ COMPLETED
1. ✅ Add percent yield to Takmarkandi (E1)
2. ✅ Add Avogadro problems to Mólmassi (C1)
3. ✅ Add acids to Nafnakerfið (A1)

### Phase 2: New Critical Games ✅ COMPLETED
4. ✅ Build Efnajafnir (Balancing Equations) → Stilltu efnajöfnur
5. ✅ Build Hlutfallsgreining (Percent Composition)

### Phase 3: Remaining Enhancements ✅ COMPLETED
6. ✅ Add mole conversion chains to Mólmassi (C2) → Level 5
7. ✅ Add chemistry conversions to Dimensional Analysis (D2) → Level 4
8. ✅ Add saturation visualization to Lausnir (B1) → Level 4

### Phase 4: Additional Games ✅ COMPLETED
9. ✅ Build Flokkun efna (Classification of Matter)
10. ✅ Build Gerðir efnahvarfa (Reaction Types)
11. ✅ Build Markverðir tölustafir (Significant Figures)

---

## Notes for Next Session

- All phases are now complete!
- Year 1 curriculum coverage is comprehensive
- Consider: Year 2 development plan or refinement of existing games
- All new games follow consistent 3-level pattern with localization
