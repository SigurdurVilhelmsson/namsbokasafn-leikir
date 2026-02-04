# Year 1 Chemistry Games — Development Plan

**Date:** 2026-01-30 | **Updated:** 2026-02-03
**Curriculum Reference:** Brown et al, *Chemistry: The Central Science*, Chapters 1-4
**Status:** Phases 1–4 ✅ Complete | Phase 5 ⬜ Planned

---

## Executive Summary

Year 1 games cover most core topics from Chapters 1-4. Phases 1–4 addressed the original gaps (balancing equations, percent composition, reaction types, significant figures, matter classification). A [pedagogical review](YEAR-1-PEDAGOGICAL-REVIEW.md) identified remaining gaps: **atomic structure** (Ch. 2.3–2.4), **periodic table** (Ch. 2.5), **precipitation/solubility rules** (Ch. 4.2), and **acid-base reactions** (Ch. 4.3). Phase 5 addresses these gaps with 4 new games, 7 game enhancements, and 6 cross-cutting improvements.

---

## Current Game Coverage Matrix

| Chapter | Topic | Coverage | Game(s) | Phase 5 Action |
|---------|-------|----------|---------|----------------|
| Ch. 1 | Measurement & Units | ✅ Strong | Dimensional Analysis | Density problems (#D3) |
| Ch. 1 | Significant Figures | ✅ Complete | Markverðir tölustafir | Add measurement reading (#20) |
| Ch. 1 | Classification of Matter | ✅ Complete | Flokkun efna | — |
| Ch. 2 | Nomenclature | ✅ Strong | Nafnakerfið | Polyatomic drill, formula-from-name (#16) |
| Ch. 2 | Atomic Structure | ❌ Missing | None | **New game: Uppbygging atómanna (#12)** |
| Ch. 2 | Periodic Table | ❌ Missing | None | **New game: Lotukerfið (#13)** |
| Ch. 3 | Molar Mass | ✅ Strong | Mólmassi | Isotope problems, comparisons (#21) |
| Ch. 3 | Balancing Equations | ✅ Complete | Stilltu efnajöfnur | Strategy tutorial, atom inventory (#17) |
| Ch. 3 | Stoichiometry | ✅ Strong | Takmarkandi | — |
| Ch. 3 | Percent Composition | ✅ Complete | Hlutfallsgreining | Combustion analysis (#22) |
| Ch. 3 | Percent Yield | ✅ Complete | Takmarkandi L4 | — |
| Ch. 4 | Molarity/Dilution | ✅ Strong | Lausnir | Electrolytes, solution stoich (#19) |
| Ch. 4 | Reaction Types | ✅ Complete | Gerðir efnahvarfa | Driving forces, activity series (#18) |
| Ch. 4 | Precipitation/Net Ionic | ❌ Missing | None | **New game: Jónir í lausn (#14)** |
| Ch. 4 | Acid-Base Reactions | ⚠️ Minimal | Gerðir efnahvarfa (1 example) | **New game: Sýrur og basar (#15)** |

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

## Phase 5: Deepening & Gap-Filling (from Pedagogical Review)

Based on the [Year 1 Pedagogical Review](YEAR-1-PEDAGOGICAL-REVIEW.md), the following work addresses remaining curriculum gaps and strengthens existing games. Items are grouped by priority.

### 5A: New Games — Critical Curriculum Gaps

These topics are taught in Brown Chapters 1–4 but have no game coverage.

#### 12. Build "Uppbygging atómanna" (Atomic Structure) — Ch. 2.3–2.4
**Effort:** High | **Impact:** Critical | **Status:** ⬜ Not started

Atomic structure is foundational — ions, isotopes, and the periodic table cannot be understood without it.

**Level 1: Build Atoms**
- Given element + mass number, place correct number of protons, neutrons, electrons into a Bohr model
- 12 atoms across periods 1–3
- Misconception target: "Protons and electrons are always equal" (not in ions)

**Level 2: Isotope Identification**
- Given atomic number and mass number, determine subatomic particles
- Include isotope notation (e.g., ¹⁴₆C, ²³⁵₉₂U)
- 10 problems
- Misconception target: "Mass number = atomic mass on periodic table"

**Level 3: Average Atomic Mass**
- Calculate weighted average from isotope abundances
- Example: Cl — 75.77% ³⁵Cl + 24.23% ³⁷Cl = 35.45 amu
- 8 problems with real isotope data (Cl, Cu, B, Mg, Si, Ag, Br, Li)

**Level 4 (Bonus): Ion Formation**
- Remove/add electrons to form cations and anions
- Connect ion charges to periodic table groups
- Bridge to Nafnakerfið

---

#### 13. Build "Lotukerfið" (Periodic Table Explorer) — Ch. 2.5
**Effort:** Medium | **Impact:** High | **Status:** ⬜ Not started

Students need fluency with the periodic table as an organizing framework.

**Level 1: Element Lookup**
- Timed challenges: find elements by symbol, name, or atomic number on an interactive table
- 20 elements across all regions (alkali metals, halogens, transition metals, noble gases)

**Level 2: Classification**
- Sort elements into metals, nonmetals, metalloids
- Identify group families: alkali metals (1), alkaline earth (2), halogens (17), noble gases (18), transition metals
- 15 sorting challenges
- Misconception target: "Metals are always solid" (Hg is liquid)

**Level 3: Periodic Trends (Qualitative)**
- Compare atomic radius, ionization energy, electronegativity across periods and down groups
- "Which is larger: Na or Cl?" / "Which has higher IE: Li or F?"
- 12 comparison problems

**Level 4 (Bonus): Predict Ion Charges**
- Group 1 → +1, Group 2 → +2, Group 16 → -2, Group 17 → -1
- Predict charges for main group elements from position
- Feeds directly into nomenclature skills

---

#### 14. Build "Jónir í lausn" (Ions in Solution) — Ch. 4.1–4.2
**Effort:** High | **Impact:** Critical | **Status:** ⬜ Not started

Precipitation reactions and solubility rules are among the most heavily tested chapter 4 topics.

**Level 1: Electrolyte Classification**
- Sort substances into strong electrolyte, weak electrolyte, non-electrolyte
- Include conductivity-tester visual (bright bulb, dim bulb, no bulb)
- Items: NaCl, HCl, NaOH (strong); CH₃COOH, NH₃ (weak); C₆H₁₂O₆, C₂H₅OH (non)
- 12 items

**Level 2: Solubility Rules**
- Given a solubility rules reference table, predict whether ionic compounds are soluble
- Start with simple cases (NaCl — soluble), build to exceptions (PbCl₂ — insoluble)
- 15 problems
- Misconception target: "All ionic compounds dissolve in water"

**Level 3: Precipitation Prediction**
- Mix two aqueous solutions, predict products, identify precipitate
- "Mix Pb(NO₃)₂(aq) + KI(aq) → ?" → PbI₂(s) + KNO₃(aq)
- 10 mixing scenarios with visual precipitate animation

**Level 4: Net Ionic Equations**
- Write molecular → complete ionic → net ionic equation
- Identify spectator ions
- 8 problems
- Misconception target: "Spectator ions participate in the reaction"

---

#### 15. Build "Sýrur og basar" (Acids & Bases) — Ch. 4.3
**Effort:** Medium | **Impact:** High | **Status:** ⬜ Not started

Acid-base neutralization is inadequately represented (only one example in Gerðir efnahvarfa).

**Level 1: Identify Acids and Bases**
- Recognize patterns: acids = H + anion; Arrhenius bases = metal + OH
- Sort common substances (HCl, NaOH, H₂SO₄, Ca(OH)₂, HNO₃, KOH, CH₃COOH)
- 10 items
- Misconception target: "All acids are dangerous" (vinegar, citric acid)

**Level 2: Write Neutralization Equations**
- acid + base → salt + water
- Identify the salt produced: HCl + NaOH → NaCl + H₂O
- Include diprotic/triprotic acids: H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O
- 10 problems

**Level 3: Neutralization Stoichiometry**
- "How many mL of 0.10 M NaOH to neutralize 25.0 mL of 0.15 M HCl?"
- Integrates molarity (Lausnir) with stoichiometry (Takmarkandi)
- 8 problems

**Level 4 (Bonus): Strong vs. Weak**
- Classify acids/bases as strong or weak
- Connect to electrolyte concept from Jónir í lausn
- 6 problems

---

### 5B: Enhancements to Existing Games

#### 16. Nafnakerfið — Add polyatomic ion drill + formula-from-name
**Effort:** Medium | **Impact:** High | **Status:** ⬜ Not started

- Add rapid-fire polyatomic ion matching (SO₄²⁻, NO₃⁻, PO₄³⁻, CO₃²⁻, OH⁻, NH₄⁺, ClO₃⁻, CrO₄²⁻, MnO₄⁻, C₂O₄²⁻) with spaced repetition
- Add "formula from name" mode: "Write the formula for calcium phosphate" → Ca₃(PO₄)₂
- Add dedicated Stock system (Roman numeral) level for variable-charge metals
- Add explicit Greek prefix exercise for molecular compounds (mono-, di-, tri-, tetra-, penta-, hexa-)

#### 17. Stilltu efnajöfnur — Add balancing strategy tutorial + atom inventory
**Effort:** Medium | **Impact:** High | **Status:** ⬜ Not started

- Add guided tutorial teaching systematic approach: balance metals → nonmetals → H → O
- Show live atom inventory table (atoms left | atoms right) updating as student changes coefficients
- Add conservation-of-mass verification step after balancing (calculate total mass both sides)
- Include fractional coefficient → integer technique (e.g., ½O₂ → multiply through)

#### 18. Gerðir efnahvarfa — Add driving forces + activity series
**Effort:** High | **Impact:** High | **Status:** ⬜ Not started

- Add driving force analysis for double replacement: precipitation, gas formation, water formation
- Add solubility rules sub-level for precipitation prediction
- Add activity series for single replacement prediction (Zn above Cu → displaces)
- Separate neutralization as a specific subtype of double replacement
- Add oxidation-state identification for single replacement reactions (preview of Year 2 redox)

#### 19. Lausnir — Add electrolyte classification + solution stoichiometry
**Effort:** Medium | **Impact:** Medium | **Status:** ⬜ Not started

- Add strong/weak/non-electrolyte sorting exercise with conductivity visual
- Add solution preparation simulation: "Prepare 250 mL of 0.100 M NaCl"
- Add solution stoichiometry: "How many mL of 0.200 M NaOH to neutralize 25.0 mL of 0.150 M HCl?"
- Explain retrograde solubility of CaSO₄ explicitly (currently present but unexplained)

#### 20. Markverðir tölustafir — Add measurement reading + exact numbers
**Effort:** Low | **Impact:** Medium | **Status:** ⬜ Not started

- Add level with graduated cylinder / ruler / balance images — record measurement to correct sig figs
- Add "exact numbers" exception questions (counting numbers, defined conversions, coefficients)
- Add mixed-operation problems (multiplication then addition in same calculation)

#### 21. Molmassi — Add isotope-aware problems + "which has more?" comparisons
**Effort:** Medium | **Impact:** Medium | **Status:** ⬜ Not started

- Add isotope abundance → average atomic mass calculation problems
- Add hydrate molar masses (CuSO₄·5H₂O = 249.7 g/mol)
- Add comparison problems: "Which has more molecules: 10 g H₂O or 10 g CO₂?"
- Add visual "road map" for conversion chains (grams ↔ moles ↔ molecules ↔ atoms with conversion factors on arrows)

#### 22. Hlutfallsgreining — Add combustion analysis + non-obvious rounding
**Effort:** Medium | **Impact:** Medium | **Status:** ⬜ Not started

- Add combustion analysis problems (mass of CO₂ + H₂O → empirical formula)
- Add problems where mole ratio requires multiplying by 2 or 3 (e.g., 1:1.5 → 2:3)
- Add step-by-step validation at each conversion step, not just final answer
- Frame some problems in real-world context (forensic lab, pharmaceutical analysis)

---

### 5C: Cross-Cutting Improvements

#### 23. Adopt Takmarkandi-style feedback across all games
**Effort:** High | **Impact:** High | **Status:** ⬜ Not started

Takmarkandi's tiered hint system (topic → strategy → method → solution) with misconception-specific wrong-answer feedback is the gold standard. Apply this pattern to all games, especially:
- Gerðir efnahvarfa (currently adequate, needs misconception feedback)
- Flokkun efna (currently simple correct/incorrect)
- Lausnir (currently weak feedback)

#### 24. Add adaptive difficulty
**Effort:** High | **Impact:** High | **Status:** ⬜ Not started

If a student misses 3 consecutive questions, offer easier problems or additional scaffolding. If a student answers 5 in a row correctly, advance to harder content. Implement across all games.

#### 25. Add spaced repetition review mode
**Effort:** High | **Impact:** High | **Status:** ⬜ Not started

A "daily review" mode pulling 5–10 questions from previously completed games, weighted toward items the student previously got wrong. Especially important for nomenclature and polyatomic ions.

#### 26. Add error analysis mode
**Effort:** Medium | **Impact:** Medium | **Status:** ⬜ Not started

Students are shown a wrong solution and must find the error. Example: "A student calculated the molar mass of Ca(OH)₂ as 57 g/mol. What did they do wrong?" Develops deeper understanding than solving correctly.

#### 27. Add cross-game capstone challenges
**Effort:** High | **Impact:** Medium | **Status:** ⬜ Not started

Problems requiring skills from multiple games. Example: "Given 5.00 g Na₂CO₃ and 100 mL of 0.200 M HCl — identify reaction type, determine limiting reactant, calculate theoretical yield of CO₂, express answer to correct sig figs."

#### 28. Add Icelandic-English chemistry glossary
**Effort:** Low | **Impact:** Medium | **Status:** ⬜ Not started

Popup accessible from any game mapping Icelandic terms ↔ English terms ↔ chemical symbols. Supports students using Brown (English textbook) alongside Icelandic-medium instruction.

---

### Phase 5 Implementation Priority

| Priority | Items | Rationale |
|----------|-------|-----------|
| **Must-have** | 14 (Jónir í lausn), 12 (Uppbygging atómanna), 15 (Sýrur og basar), 18 (Gerðir efnahvarfa enhancements) | Directly tested, currently missing |
| **Should-have** | 13 (Lotukerfið), 19 (Lausnir enhancements), 16 (Nafnakerfið enhancements), 17 (Stilltu efnajöfnur enhancements) | Important supporting topics |
| **Nice-to-have** | 23–28 (cross-cutting), 20–22 (minor enhancements) | Enrichment and polish |

---

## Notes for Next Session

- Phases 1–4 complete — all 10 core games built
- Phase 5 defined — 4 new games + 7 game enhancements + 6 cross-cutting improvements
- See [YEAR-1-PEDAGOGICAL-REVIEW.md](YEAR-1-PEDAGOGICAL-REVIEW.md) for the full analysis behind these recommendations
- Priority: Jónir í lausn and Uppbygging atómanna are the most critical gaps
