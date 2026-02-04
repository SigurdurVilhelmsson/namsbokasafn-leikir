# Year 2 Games — Pedagogical Review

**Reviewer perspective:** Secondary-school chemistry teacher, 20 years' experience, specializing in educational games.

**Curriculum reference:** Brown et al., *Chemistry: The Central Science*, Chapters 5, 6, 8, 9, 11, 14; Icelandic texts on organic nomenclature and oxidation/reduction.

---

## Executive Summary

The 10 year-2 games cover thermochemistry, bonding, molecular geometry, intermolecular forces, kinetics, organic chemistry, and redox/electrochemistry. The strongest games (Hess's Law, Calorimetry, Redox Reactions) show excellent pedagogical design with real-world context, tiered hints, and accurate chemistry. However, there is one glaring curriculum gap: **Chapter 6 (Electronic Structure of Atoms) has no game at all** — no electron configurations, no quantum numbers, no orbital theory. Several games also stop short of the quantitative depth that Brown requires: Kinetics lacks integrated rate laws and the Arrhenius equation, Electrochemistry lacks cell potential calculations, and Organic Nomenclature covers only the simplest hydrocarbons.

---

## Part 1: Game-by-Game Review

### 1. Hitalitun (Calorimetry) — Chapter 5.5

**What works well:**
- Three-level progression from heat capacity (q = mcΔT) to coffee-cup calorimetry (constant P, ΔH) to bomb calorimetry (constant V, ΔU) mirrors Brown's exact treatment.
- The distinction between heat and temperature is addressed explicitly in Level 1 — this is one of the most persistent misconceptions in all of chemistry.
- Real specific heat data (water 4.18, copper 0.385, aluminum 0.897 J/g·°C) with a reference table available during problems.
- Coffee-cup and bomb calorimeter diagrams with labeled components give students a visual anchor.
- The fuel energy comparison in Level 3 (methane 55, gasoline 47, ethanol 27, coal 30 kJ/g) uses accurate values and provides real-world motivation.

**Suggestions for improvement:**

1. **Add enthalpy of formation problems.** Brown Section 5.7 introduces standard enthalpies of formation (ΔH°f) and uses them to calculate ΔH°rxn via the formula: ΔH°rxn = Σ ΔH°f(products) − Σ ΔH°f(reactants). This is heavily tested and is currently absent. A Level 4 with a ΔH°f reference table and 8–10 problems would complete the thermochemistry coverage.

2. **Connect calorimetry to Hess's Law more explicitly.** Students should understand that calorimetry is how we *measure* ΔH values, and Hess's Law is how we *calculate* ΔH for reactions we can't measure directly. Currently the two games are independent — a bridging note or shared problem would reinforce this relationship.

3. **Add a sign-convention drill.** Students routinely confuse the sign of q for the system vs. the surroundings. Problems like "The solution temperature rises 5°C. Is the reaction exothermic or endothermic? What is the sign of ΔH?" seem simple but need repetitive practice. Currently addressed in 2 of 10 Level 1 problems — this deserves more emphasis.

4. **Include a calorimeter constant (Ccal) problem type.** Bomb calorimetry problems in Brown often use the calorimeter heat capacity directly (q = Ccal × ΔT rather than q = mcΔT). The game has one such problem in Level 3, but this should be more prominent since it is a distinct calculation pattern.

---

### 2. Lögmál Hess (Hess's Law) — Chapter 5.6

**What works well:**
- This is one of the best-designed games in the entire suite. The Level 1 interactive energy diagrams — where students can reverse reactions (flip sign) and multiply by factors (scale ΔH) — build the core operations before applying them.
- The six Level 2 puzzles use real industrial chemistry: CO production, hydrogen fuel cells, ethanol biofuel (E85), NO₂ air pollution, SO₃ contact process, and the thermite reaction. Each problem includes context about why the reaction matters industrially.
- All ΔH values are literature-accurate.
- The drag-and-drop equation selection with reversibility toggle and multiplication controls makes the abstract manipulation of equations tangible.
- The explicit teaching that "Leiðin skiptir engu" (the pathway doesn't matter) — the state function concept — is handled well.

**Suggestions for improvement:**

1. **Add standard enthalpy of formation as an alternative method.** Hess's Law and ΔH°f calculations are two routes to the same answer. Students should see both. A Level 3 or 4 where students use ΔH°f values from a table to calculate ΔH°rxn (via Σ products − Σ reactants) would complete the thermochemistry picture and connect back to Calorimetry.

2. **Add more "wrong path" feedback.** When students select equations in the wrong order or forget to reverse, the feedback should explain *why* their combination fails (e.g., "You have CO₂ on both sides — it doesn't cancel. Try reversing equation 2."). Currently feedback is binary (correct/incorrect with hint available).

3. **Include a problem requiring three or more given equations.** Most Level 2 puzzles use two given equations. Brown includes problems requiring combination of three or more, which adds complexity in tracking what cancels. The ethanol combustion problem (3 equations) is the only one — adding 1–2 more of similar complexity would strengthen this skill.

4. **Add bond enthalpy estimation.** Brown Section 5.8 (in some editions 8.8) introduces estimating ΔH from bond enthalpies (ΔH ≈ Σ D(bonds broken) − Σ D(bonds formed)). This is a conceptually different approach from Hess's Law but uses similar additive logic. Even a bonus level with 4–5 problems and a bond enthalpy table would be valuable.

---

### 3. Lewis-formúlur (Lewis Structures) — Chapter 8.5–8.7

**What works well:**
- Level 1 builds systematically: count valence electrons → count total electrons in molecule → apply octet rule → determine electron needs. This mirrors the textbook algorithm.
- Valence electron data for all main group elements is present and accurate.
- The progression from single atoms (C = 4 valence e⁻) to molecules (H₂O = 8 total e⁻) to complex formulas (H₂CO₃ = 24 e⁻) is well scaffolded.

**Suggestions for improvement:**

1. **Add formal charge calculation.** This is a critical chapter 8 skill that appears to be missing or underdeveloped. Students need to calculate formal charge = (valence e⁻) − (lone pair e⁻) − ½(bonding e⁻) to choose the best Lewis structure when multiple valid structures exist. For example, choosing between O=C=O (all formal charges 0) vs. O−C≡O⁺ with a negative on the left oxygen. This is heavily tested.

2. **Add resonance structures explicitly.** Brown Section 8.6 devotes significant space to resonance. Students should draw multiple valid Lewis structures for NO₃⁻, CO₃²⁻, O₃, and benzene, then understand that the real structure is a hybrid. This is conceptually difficult and needs dedicated practice.

3. **Add octet rule exceptions.** Brown Section 8.7 covers three categories of exceptions:
   - **Odd-electron species:** NO, NO₂ (radicals)
   - **Incomplete octets:** BF₃ (B has 6 e⁻), BeCl₂ (Be has 4 e⁻)
   - **Expanded octets:** PCl₅, SF₆, XeF₂ (elements in period 3+ can exceed 8)

   These appear to be referenced in later levels but need explicit teaching with clear explanations of *when* exceptions occur (only for elements in period 3 or higher for expanded, only for Be/B/Al for incomplete).

4. **Connect Lewis structures to VSEPR.** After drawing a correct Lewis structure, offer a button to "See the 3D shape" that links to the VSEPR game. This pipeline (Lewis → electron domains → geometry → polarity) is how Brown teaches it, and the games should mirror that flow.

5. **Add a "draw from scratch" mode.** Currently the game appears to be primarily question-answer format. A mode where students interactively place bonds and lone pairs (drag-and-drop electron pairs onto an atom scaffold) would develop the procedural skill that exams test.

---

### 4. VSEPR Rúmfræði (VSEPR & Molecular Geometry) — Chapter 9.1–9.3

**What works well:**
- All 8 standard geometries are covered (linear through octahedral), with correct bond angles.
- The critical distinction between *electron geometry* and *molecular geometry* is explicit — students see that 4 electron domains give tetrahedral electron geometry but the molecular geometry depends on lone pairs (tetrahedral, trigonal pyramidal, or bent).
- Level 2 includes non-trivial shapes: SF₄ (seesaw), XeF₄ (square planar), ClF₃ (T-shaped). These are exactly the molecules Brown uses.
- Level 3 covers hybridization (sp, sp², sp³, sp³d, sp³d²) and molecular polarity, including the important examples of CCl₄ (nonpolar despite polar bonds) and NF₃ vs NH₃ (both pyramidal but NH₃ is more polar because lone pair reinforces bond dipoles).
- 3D animated molecular structures with rotation are a significant pedagogical advantage over static diagrams.

**Suggestions for improvement:**

1. **Add a systematic VSEPR prediction workflow.** Students should practice the full sequence: (1) draw Lewis structure → (2) count electron domains → (3) determine electron geometry → (4) account for lone pairs → (5) name molecular geometry → (6) predict bond angle. A guided walkthrough mode for the first 3–4 molecules before independent practice would reduce frustration.

2. **Strengthen the polarity prediction section.** Molecular polarity is one of the most-missed exam topics. Students need to understand that polarity depends on both bond polarity AND geometry. A dedicated set of problems where students are given the shape and must determine if dipole moments cancel (symmetric = nonpolar) or reinforce (asymmetric = polar) would help. Include: CO₂ (linear, nonpolar), H₂O (bent, polar), BF₃ (trigonal planar, nonpolar), NH₃ (pyramidal, polar), CHCl₃ (tetrahedral asymmetric, polar).

3. **Add dipole moment vector visualization.** Show individual bond dipoles as arrows, then show whether they cancel or produce a net dipole. This visual makes the abstract concept of "dipoles canceling by symmetry" concrete.

4. **Include multi-center molecules.** Brown covers molecules like C₂H₄ (each C is sp², overall planar) and C₂H₂ (each C is sp, overall linear). The game includes these in Level 3 but should emphasize that different atoms within the same molecule can have different hybridizations — for instance, acetic acid CH₃COOH has an sp³ carbon and an sp² carbon.

---

### 5. Millisameindakraftar (Intermolecular Forces) — Chapter 11

**What works well:**
- Clear classification of London dispersion, dipole-dipole, and hydrogen bonding with correct identification criteria.
- The misconception that "London forces only exist in nonpolar molecules" is explicitly addressed — all molecules have London forces.
- The hydrogen bonding criterion (H bonded to F, O, or N only) is correctly stated and applied. The game correctly identifies that HCl does NOT have hydrogen bonding despite containing H.
- Level 2 ranking problems (boiling point, vapor pressure, viscosity, surface tension) connect IMF type/strength to observable physical properties.
- Level 3 comparisons are sophisticated: ethanol vs. dimethyl ether (same formula, different H-bonding), H₂O vs. H₂S (anomalous water properties), n-octane vs. 2,2,4-trimethylpentane (molecular shape effect on London forces).
- Level 4 adds ion-dipole forces with dissolution context — an important bridge to solution chemistry.
- The gecko adhesion example (London forces, many small contacts) is memorable and pedagogically effective.

**Suggestions for improvement:**

1. **Add colligative properties.** This is the largest gap in Chapter 11 coverage. Brown Chapter 11 devotes major sections to:
   - **Vapor pressure lowering** (Raoult's law: P = χ × P°)
   - **Boiling point elevation** (ΔTb = Kb × m × i)
   - **Freezing point depression** (ΔTf = Kf × m × i)
   - **Osmotic pressure** (π = iMRT)

   These are heavily tested and require understanding of the van't Hoff factor (i) for electrolytes. A dedicated Level 5 or a separate game ("Sameginleikar lausna" / Colligative Properties) is needed.

2. **Add phase diagrams.** Brown Section 11.6 (or equivalent) covers phase diagrams with triple point, critical point, and normal boiling/melting points. An interactive phase diagram where students click regions to identify solid/liquid/gas and trace paths (e.g., "What happens when you heat ice at 1 atm from -20°C to 120°C?") would be highly effective.

3. **Add the solution process.** Why do some substances dissolve and others don't? The "like dissolves like" principle, the energetics of dissolution (lattice energy vs. hydration energy), and the entropy-driven dissolution of some endothermic processes are all Chapter 11 content that is currently absent.

4. **Explain why H-bonding is so strong.** The game correctly identifies which molecules have H-bonds but doesn't explain *why* H bonded to F/O/N is special. The key factors — small atomic radius, high electronegativity, lone pairs on F/O/N — should be stated explicitly so students understand the criterion rather than memorizing it.

---

### 6. Hvarfhraði (Kinetics) — Chapter 14

**What works well:**
- Level 1 covers the five major factors affecting reaction rate (concentration, temperature, catalysts, surface area, molecular orientation) with clear conceptual explanations.
- The misconception that "temperature decreases activation energy" is explicitly corrected — temperature increases the fraction of molecules exceeding Ea, but Ea itself doesn't change (only catalysts change Ea).
- The misconception that "catalysts increase temperature or change ΔH" is directly addressed.
- The Maxwell-Boltzmann distribution visualization showing the Ea threshold is excellent — students can see how temperature shifts the curve and changes the fraction above Ea.
- Collision theory is properly presented: successful reaction requires both sufficient energy AND correct orientation.

**Suggestions for improvement:**

1. **Add rate laws and reaction order.** This is a critical gap. Brown Section 14.3 teaches students to determine rate = k[A]^m[B]^n from experimental data. Students need to:
   - Determine reaction order from initial rate data (method of initial rates)
   - Calculate rate constants
   - Distinguish zero, first, and second order kinetics

   A Level 2 with 6–8 problems using initial rate tables would address this. Include a problem where doubling [A] has no effect (zero order), doubles rate (first order), and quadruples rate (second order).

2. **Add integrated rate laws and graphing.** Brown Section 14.4 covers:
   - Zero order: [A] = -kt + [A]₀ (linear [A] vs. t)
   - First order: ln[A] = -kt + ln[A]₀ (linear ln[A] vs. t)
   - Second order: 1/[A] = kt + 1/[A]₀ (linear 1/[A] vs. t)

   An interactive graphing level where students plot data, determine which linearization works, and extract k would directly prepare them for exams. Include half-life for first order: t₁/₂ = 0.693/k.

3. **Add the Arrhenius equation.** Brown Section 14.5: k = Ae^(-Ea/RT) and its two-point form ln(k₂/k₁) = (Ea/R)(1/T₁ − 1/T₂). Students should solve problems like "Given k at two temperatures, calculate Ea." This is a standard exam question. 6–8 problems with a reference for R = 8.314 J/mol·K.

4. **Add reaction mechanisms.** Brown Section 14.6 covers elementary steps, molecularity, rate-determining step, and how the mechanism connects to the rate law. Even conceptual questions — "If step 1 is slow and step 2 is fast, which step determines the rate?" — would build understanding. Include the distinction between the overall reaction and the mechanism (overall reaction = sum of elementary steps).

5. **Add a catalyst comparison mode.** Show the same reaction with and without catalyst — identical ΔH but different Ea. Students should see that catalysts provide an alternative reaction pathway. Include biological catalysts (enzymes) for cross-disciplinary connection.

---

### 7. Oxun og afoxun (Redox Reactions) — Icelandic text on oxidation/reduction

**What works well:**
- Level 1 teaches all six oxidation state rules systematically with 10 practice problems of increasing complexity (from NaCl to Cr₂O₇²⁻). The progression from simple ionic compounds to polyatomic ions with variable-state metals is well done.
- Level 2 analyzes 8 redox reactions with 4 questions each (32 total), covering identification of oxidized species, reduced species, oxidizing agent, and reducing agent. The distinction between "the substance that IS oxidized" and "the oxidizing agent" (which is the one that gets reduced) is correctly addressed — this trips up students constantly.
- Level 3 teaches the half-reaction method with a 5-step process and includes LCM-based electron balancing. The progression from simple 1:1 exchange (Zn/Cu²⁺) to complex LCM-requiring balancing (Al/H⁺, LCM of 3 and 2 = 6) is well scaffolded.
- The tiered hint system with mathematical guidance for multiplier calculations is effective.

**Suggestions for improvement:**

1. **Add half-reaction balancing in acidic/basic solution.** The current game balances simple half-reactions but doesn't cover the full method required for aqueous redox: (1) separate into half-reactions, (2) balance atoms other than O and H, (3) balance O with H₂O, (4) balance H with H⁺, (5) balance charge with electrons, (6) for basic solution add OH⁻. This is one of the most challenging procedural skills in the curriculum and needs dedicated practice.

2. **Add oxidation number practice for organic molecules.** Students struggle to assign oxidation states to carbon in organic compounds (methane C is -4, CO₂ C is +4, methanol C is -2). Including 3–4 organic molecules in the Level 1 problem set would bridge to organic chemistry.

3. **Add the activity series as a predictive tool.** Currently the game identifies what happens in given reactions, but students also need to *predict* whether a reaction will occur. "Will Cu reduce Ag⁺?" → Yes (Cu is above Ag in activity series). "Will Cu reduce Zn²⁺?" → No. A sub-level with an activity series reference and 8 prediction problems would be valuable.

4. **Connect more explicitly to electrochemistry.** The redox game and electrochemistry game cover overlapping concepts but feel disconnected. Adding a transition problem — "This reaction is spontaneous. How could we build a galvanic cell from it?" — would bridge them.

---

### 8. Rafefnafræði (Electrochemistry) — Extension of redox

**What works well:**
- Level 1 correctly teaches galvanic cell fundamentals: anode (oxidation), cathode (reduction), electron flow through wire, ion flow through salt bridge.
- The Zn-Cu Daniell cell is the standard teaching example, and the game uses it well.
- The salt bridge function ("maintain electrical neutrality by allowing ion flow") is correctly explained.
- Multiple cell combinations (Zn-Cu, Mg-Ag, Pb-Cu, Ni-Ag) give students practice with different metals.

**Suggestions for improvement:**

1. **Add standard reduction potential (E°) calculations.** This is the most critical gap. Students need to:
   - Read E° values from a table
   - Calculate E°cell = E°cathode − E°anode
   - Predict spontaneity (E°cell > 0 → spontaneous)
   - Rank metals by reducing strength

   A Level 2 with a standard reduction potential table and 10 calculation problems is essential. Include: "Calculate E° for Zn-Cu cell" (E° = +0.34 − (−0.76) = +1.10 V).

2. **Add electrolytic cells.** Brown covers both galvanic (spontaneous) and electrolytic (non-spontaneous, driven by external power) cells. Students should understand the differences: in electrolysis the anode is positive (opposite of galvanic), the process is non-spontaneous, and external voltage must exceed E°cell. Applications: electroplating, electrolysis of water, aluminum production (Hall-Héroult process).

3. **Add the Nernst equation** (if covered in curriculum). E = E° − (RT/nF)ln(Q), or at 25°C: E = E° − (0.0592/n)log(Q). Even 4–5 problems would introduce non-standard conditions.

4. **Add Faraday's law problems.** "How many grams of Cu are deposited by passing 3.00 A of current through CuSO₄ solution for 2.00 hours?" This requires: charge = current × time, moles of e⁻ = charge / 96485, then stoichiometry. These problems integrate electrochemistry with stoichiometry and are commonly tested.

5. **Add a cell diagram notation exercise.** The standard shorthand (Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s)) has specific conventions that students must learn. A matching exercise between cell diagrams and written descriptions would build fluency.

---

### 9. Lífræn nafnagift (Organic Nomenclature) — Icelandic text

**What works well:**
- The IUPAC prefix system (meth- through dec-) is taught systematically.
- The suffix system (-an, -en, -yn) correctly maps to bond types.
- Quiz questions test both directions: prefix → meaning and meaning → prefix.
- The progression from naming to structure-building is sound.

**Suggestions for improvement:**

1. **Add functional group nomenclature.** The current game covers only hydrocarbons (alkanes, alkenes, alkynes). Year 2 organic chemistry must include at least:
   - **Alcohols** (-ól / -ol): methanol, ethanol, propan-1-ol, propan-2-ol
   - **Carboxylic acids** (-sýra / -oic acid): methanoic acid, ethanoic acid (acetic acid)
   - **Aldehydes** (-al): methanal (formaldehyde), ethanal (acetaldehyde)
   - **Ketones** (-ón / -one): propanone (acetone), butanone
   - **Amines** (-amín / -amine): methanamine, ethanamine
   - **Esters** (-ester): ethyl ethanoate (ethyl acetate)
   - **Ethers** (-eter / -ether): diethyl ether

   Each functional group needs a dedicated set of naming problems (name → formula and formula → name). This is a significant expansion but essential for the curriculum.

2. **Add substituent naming and numbering.** The IUPAC system requires:
   - Identifying the longest carbon chain
   - Numbering from the end closest to the first substituent
   - Naming substituents (methyl, ethyl, propyl, etc.)
   - Using locant numbers (2-methylbutane, 3-ethylhexane)
   - Alphabetical ordering of multiple substituents
   - Using di-, tri-, tetra- prefixes for identical substituents (2,3-dimethylpentane)

   A level where students build names step-by-step (find chain → number → name substituents → assemble full name) would teach the procedure.

3. **Add cyclic compound nomenclature.** Cycloalkanes (cyclopentane, cyclohexane) and cycloalkenes follow slightly different rules. Include numbering around the ring and substituent placement.

4. **Add cis/trans and E/Z isomerism.** For alkenes with two different groups on each carbon of the double bond, students need to identify geometric isomers. This is part of the standard organic chemistry curriculum:
   - cis-2-butene vs. trans-2-butene
   - (E) and (Z) notation using Cahn-Ingold-Prelog priority rules

5. **Add aromatic compound names.** Benzene derivatives (toluene, phenol, aniline, benzoic acid) and ortho/meta/para nomenclature for disubstituted benzene rings.

6. **Add a "common name ↔ IUPAC name" matching exercise.** Students must know both: acetone = propanone, formaldehyde = methanal, acetic acid = ethanoic acid, acetylene = ethyne. Include Icelandic common names.

---

### 10. Lífrænir hvarfgangar (Organic Reactions) — Icelandic text

**What works well:**
- The three major reaction categories (addition, substitution, elimination) are correctly defined and exemplified.
- 10 problems cover representative reactions from each category.
- The recognition criteria are clear: addition opens a π bond, substitution replaces one group with another, elimination removes atoms to form a π bond.
- Including a tertiary alkyl halide E2 elimination ((CH₃)₃CBr + NaOC₂H₅) is good — it shows that substrate structure matters.

**Suggestions for improvement:**

1. **Add Markovnikov's rule for addition reactions.** When HBr adds to propene, why does it form 2-bromopropane (not 1-bromopropane)? Markovnikov's rule ("H adds to the carbon with more H's") is one of the most important organic chemistry concepts. Include 4–5 problems predicting the major product of HX addition to unsymmetrical alkenes.

2. **Add SN1 vs. SN2 comparison.** The game treats all substitution as one category, but students need to understand:
   - SN2: primary substrate, strong nucleophile, one-step, inversion
   - SN1: tertiary substrate, weak nucleophile, two-step (via carbocation), racemization
   Even a conceptual level where students predict "SN1 or SN2?" based on substrate and nucleophile would build important reasoning.

3. **Add E1 vs. E2 comparison.** Similarly:
   - E2: strong base, one-step, anti-periplanar geometry
   - E1: weak base/heat, two-step (via carbocation)
   This parallels the SN1/SN2 distinction and students need to see both.

4. **Add substitution vs. elimination competition.** A key organic chemistry insight is that substitution and elimination compete. Strong nucleophile + primary substrate → SN2. Strong base + tertiary substrate → E2. Weak nucleophile + tertiary + heat → E1. This decision framework is heavily tested.

5. **Add arrow-pushing notation for mechanisms.** Drawing curved arrows showing electron movement is the language of organic chemistry. Even for simple reactions (SN2: nucleophile attacks carbon, leaving group departs), practicing arrow-pushing builds mechanistic thinking. An interactive mode where students drag arrows from electron-rich to electron-poor sites would be ideal.

6. **Add oxidation/reduction in organic context.** Connect to the redox game: oxidation of alcohols (primary → aldehyde → carboxylic acid; secondary → ketone), reduction of carbonyls. Use oxidation state of carbon as the tracking metric.

---

## Part 2: The Missing Chapter — Electronic Structure of Atoms (Chapter 6)

**This is the single largest curriculum gap in the year 2 games.**

Brown Chapter 6 covers:
- Electromagnetic radiation (wavelength, frequency, speed of light: c = λν)
- Quantized energy and photons (E = hν)
- Line spectra and the Bohr model
- Wave behavior of matter (de Broglie)
- Quantum mechanics and atomic orbitals
- Quantum numbers (n, l, ml, ms)
- Representations of orbitals (s, p, d, f shapes)
- Many-electron atoms (shielding, effective nuclear charge)
- Electron configurations (Aufbau principle, Hund's rule, Pauli exclusion)
- Electron configurations and the periodic table

This chapter is the conceptual bridge between "atoms have protons, neutrons, and electrons" (Chapter 2) and "atoms form bonds" (Chapter 8). Without it, Lewis structures lack theoretical grounding — students learn *rules* for bonding without understanding *why* atoms bond.

### Proposed Game: "Rafeindabygging" (Electron Configuration)

**Level 1: Quantum Numbers**
- Define and identify n, l, ml, ms for given electrons
- n = 1, 2, 3... (shell); l = 0 to n−1 (subshell: s, p, d, f); ml = −l to +l (orbital); ms = ±½ (spin)
- 12 problems: "What are the valid quantum numbers for a 3p electron?"
- Misconception target: "l can equal n" (no, l goes from 0 to n−1)

**Level 2: Orbital Shapes and Energy**
- Interactive visualization of s (sphere), p (dumbbell), d (cloverleaf) orbitals
- Energy ordering: 1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p...
- Explain shielding and why 4s fills before 3d
- 8 ordering/identification challenges

**Level 3: Electron Configurations**
- Write full electron configurations using Aufbau principle
- Apply Hund's rule (maximize unpaired electrons in degenerate orbitals)
- Apply Pauli exclusion (max 2 electrons per orbital, opposite spins)
- 15 elements: H through Kr, including transition metals
- Include noble gas shorthand notation: [Ar] 3d¹⁰ 4s² for Zn
- Misconception target: "Cr is [Ar] 3d⁴4s²" (actual: [Ar] 3d⁵4s¹ — half-filled stability)

**Level 4: Configurations and the Periodic Table**
- Connect electron configuration to position in periodic table
- s-block (groups 1–2), p-block (groups 13–18), d-block (groups 3–12), f-block (lanthanides/actinides)
- Predict valence electron count from configuration
- Connect to Lewis dot symbols (valence electrons → dots)
- 10 problems bridging to bonding (Chapter 8)

**Level 5 (Bonus): Electromagnetic Radiation**
- Calculate wavelength from frequency (c = λν, c = 3.00 × 10⁸ m/s)
- Calculate photon energy (E = hν, h = 6.626 × 10⁻³⁴ J·s)
- Identify electromagnetic spectrum regions (radio → microwave → IR → visible → UV → X-ray → gamma)
- Connect to atomic spectra: "Why do elements produce specific colors when heated?"
- 8 calculation problems

---

## Part 3: Coverage Gap Analysis

### Full Curriculum Mapping

| Chapter | Topic | Current Game | Coverage | Priority |
|---------|-------|-------------|----------|----------|
| **Ch. 5** | q = mcΔT, calorimetry | Hitalitun | ✅ Strong | — |
| **Ch. 5** | Hess's Law | Lögmál Hess | ✅ Excellent | — |
| **Ch. 5** | Standard enthalpies of formation | None | ❌ Missing | **High** |
| **Ch. 5** | Bond enthalpies | None | ❌ Missing | Medium |
| **Ch. 6** | Electromagnetic radiation | None | ❌ Missing | Medium |
| **Ch. 6** | Quantum numbers | None | ❌ Missing | **High** |
| **Ch. 6** | Electron configurations | None | ❌ Missing | **Critical** |
| **Ch. 6** | Periodic table and e⁻ config | None | ❌ Missing | **High** |
| **Ch. 8** | Lewis structures (basic) | Lewis-formúlur | ✅ Good | — |
| **Ch. 8** | Formal charge | Lewis-formúlur | ⚠️ Weak | **High** |
| **Ch. 8** | Resonance | Lewis-formúlur | ⚠️ Weak | **High** |
| **Ch. 8** | Octet exceptions | Lewis-formúlur | ⚠️ Weak | **High** |
| **Ch. 8** | Bond length and strength | None | ❌ Missing | Medium |
| **Ch. 9** | VSEPR model | VSEPR Rúmfræði | ✅ Excellent | — |
| **Ch. 9** | Hybridization | VSEPR Rúmfræði | ✅ Good | — |
| **Ch. 9** | Molecular polarity | VSEPR Rúmfræði | ⚠️ Adequate | Medium |
| **Ch. 11** | IMF types | Millisameindakraftar | ✅ Excellent | — |
| **Ch. 11** | Properties of liquids | Millisameindakraftar | ✅ Good | — |
| **Ch. 11** | Phase diagrams | None | ❌ Missing | Medium |
| **Ch. 11** | Colligative properties | None | ❌ Missing | **Critical** |
| **Ch. 14** | Factors affecting rate | Hvarfhraði | ✅ Good | — |
| **Ch. 14** | Rate laws & reaction order | Hvarfhraði | ❌ Missing | **Critical** |
| **Ch. 14** | Integrated rate laws | Hvarfhraði | ❌ Missing | **High** |
| **Ch. 14** | Arrhenius equation | Hvarfhraði | ❌ Missing | **High** |
| **Ch. 14** | Reaction mechanisms | Hvarfhraði | ❌ Missing | Medium |
| Organic | Hydrocarbon nomenclature | Lífræn nafnagift | ✅ Basic | — |
| Organic | Functional groups | Lífræn nafnagift | ❌ Missing | **Critical** |
| Organic | Substituent naming/numbering | Lífræn nafnagift | ❌ Missing | **High** |
| Organic | Stereochemistry (E/Z) | None | ❌ Missing | Medium |
| Organic | Reaction types | Lífrænir hvarfgangar | ✅ Basic | — |
| Organic | Mechanisms (SN1/SN2/E1/E2) | Lífrænir hvarfgangar | ❌ Missing | Medium |
| Organic | Markovnikov's rule | Lífrænir hvarfgangar | ❌ Missing | **High** |
| Redox | Oxidation states | Oxun og afoxun | ✅ Excellent | — |
| Redox | Half-reactions | Oxun og afoxun | ✅ Good | — |
| Redox | Balancing in acid/base | Oxun og afoxun | ❌ Missing | Medium |
| Redox | Activity series | Oxun og afoxun | ⚠️ Implicit | Medium |
| Electro | Galvanic cells | Rafefnafræði | ✅ Good | — |
| Electro | Cell potential (E°) | Rafefnafræði | ❌ Missing | **Critical** |
| Electro | Electrolysis | Rafefnafræði | ❌ Missing | Medium |

---

## Part 4: Cross-Cutting Recommendations

### 1. Build the Lewis → VSEPR → IMF → Properties Pipeline

These four games teach concepts that are tightly connected in Brown's narrative:
- Lewis structure → determines electron domains
- Electron domains → determines geometry (VSEPR)
- Geometry → determines polarity
- Polarity → determines IMF type
- IMF type → determines physical properties (BP, MP, viscosity)

Currently each game is independent. Adding a "pipeline mode" where students trace a molecule from Lewis structure through to predicted boiling point would test integrated understanding. Even linking one game's completion to the next (e.g., "You drew the Lewis structure for CHCl₃ — now predict its shape") would reinforce the connections.

### 2. Unify the Hint System

The tiered hint system (topic → strategy → method → solution) is well implemented in Hess's Law, Calorimetry, and Redox, but some games have weaker feedback. All games should provide:
- Misconception-specific feedback when a student gives a particular wrong answer
- Step-by-step solution reveal (not just the final answer)
- Point penalty that encourages attempting before using hints (the 10 → 5 → 2 pattern works well)

### 3. Add Worked Example Mode

For calculation-heavy games (Calorimetry, Kinetics, Electrochemistry), a "worked example" mode where students see a complete solution, then solve an isomorphic problem, would apply the cognitive science principle of example-problem pairs. This is especially important for:
- Hess's Law equation manipulation
- Rate law determination from initial rates
- E°cell calculations

### 4. Connect Redox and Electrochemistry

These two games cover the same conceptual territory (electron transfer) but feel like separate entities. The redox game should end with a bridge problem: "This spontaneous redox reaction can generate electricity. How?" And the electrochemistry game should begin with a callback: "Remember the reaction Zn + Cu²⁺ → Zn²⁺ + Cu? Now let's build a cell from it."

### 5. Thermochemistry Integration

Calorimetry and Hess's Law should share problems. After a calorimetry experiment yields ΔH for a reaction, students should use that value in a Hess's Law cycle. This mirrors how experimental and theoretical thermochemistry work together.

---

## Part 5: Proposed New Games

### A. "Rafeindabygging" (Electron Configuration) — CRITICAL

Described in Part 2 above. This is the highest-priority addition — Chapter 6 has zero game coverage.

### B. "Sameginleikar lausna" (Colligative Properties) — CRITICAL

**Level 1:** Qualitative predictions. "Adding salt to water: does the boiling point increase or decrease? Does the freezing point increase or decrease?" 10 conceptual questions.

**Level 2:** Freezing point depression and boiling point elevation calculations. ΔT = Kf/b × m × i. Include the van't Hoff factor i: NaCl → i = 2, CaCl₂ → i = 3, glucose → i = 1. Provide Kf and Kb reference values. 10 problems.

**Level 3:** Osmotic pressure. π = iMRT. Include biological context (cell membranes, IV fluids must be isotonic). 6 problems.

**Level 4 (Bonus):** Raoult's law (vapor pressure lowering). P = χ × P°. Mole fraction calculations. 6 problems.

### C. "Hraðalögmál" (Rate Laws & Arrhenius) — CRITICAL

A companion game to Hvarfhraði, focusing on the quantitative aspects.

**Level 1:** Method of initial rates. Given experimental data tables, determine reaction order for each reactant and the rate constant k. 8 problems.

**Level 2:** Integrated rate laws. Given concentration-time data, determine reaction order from plots (which is linear: [A] vs. t, ln[A] vs. t, or 1/[A] vs. t?). 6 interactive graphing problems.

**Level 3:** Half-life calculations. First order: t₁/₂ = 0.693/k. Include radioactive decay and drug metabolism examples. 6 problems.

**Level 4:** Arrhenius equation. Given k at two temperatures, calculate Ea. Given Ea and k at one temperature, predict k at another. 6 problems.

### D. "Rafspenna" (Cell Potentials) — HIGH PRIORITY

A companion to Rafefnafræði, focusing on calculations.

**Level 1:** Read E° values from a standard reduction potential table. Identify strongest oxidizing agents (most positive E°) and strongest reducing agents (most negative E°). 10 problems.

**Level 2:** Calculate E°cell = E°cathode − E°anode. Predict spontaneity. 10 problems.

**Level 3:** Connect ΔG° = −nFE° to spontaneity. Calculate ΔG° from E°cell. 6 problems.

**Level 4:** Electrolysis calculations with Faraday's law. charge = current × time; moles e⁻ = charge / F. 6 problems.

---

## Part 6: Priority Ranking

### Must-Have (critical curriculum gaps)

1. **Rafeindabygging** — Electron configurations (entire Chapter 6 is missing)
2. **Sameginleikar lausna** — Colligative properties (major Chapter 11 topic)
3. **Hraðalögmál** — Rate laws, integrated rates, Arrhenius (quantitative Ch. 14)
4. Improve **Lewis-formúlur** — formal charge, resonance, octet exceptions
5. Improve **Lífræn nafnagift** — functional groups, substituent naming
6. **Rafspenna** — Cell potential calculations (quantitative electrochemistry)

### Should-Have (important for exam readiness)

7. Improve **Hvarfhraði** — reaction mechanisms, catalysis depth
8. Improve **Hitalitun** — ΔH°f calculations, sign convention drill
9. Improve **Lögmál Hess** — ΔH°f as alternative method, bond enthalpies
10. Improve **Lífrænir hvarfgangar** — Markovnikov, SN1/SN2 framework
11. Improve **VSEPR** — polarity prediction strengthening, dipole vectors
12. Improve **Rafefnafræði** — electrolysis, cell diagram notation

### Nice-to-Have (enrichment)

13. Improve **Millisameindakraftar** — phase diagrams, solution process
14. Improve **Oxun og afoxun** — balancing in acid/base, organic oxidation states
15. Lewis → VSEPR → IMF pipeline mode
16. Cross-game worked example mode
17. Stereochemistry (E/Z isomers) in organic nomenclature
18. Arrow-pushing mechanism mode in organic reactions

---

## Conclusion

The year 2 game suite has a strong foundation with accurate chemistry and good pedagogical design in the best games (Hess's Law, Redox, Calorimetry). The primary concern is that **Chapter 6 is entirely absent** — students cannot properly understand bonding and electron behavior without electron configurations. The secondary concern is that several games cover conceptual foundations but stop before the quantitative depth that Brown requires: Kinetics needs rate laws and Arrhenius, Electrochemistry needs cell potentials, and Organic Nomenclature needs functional groups. Addressing the 6 "must-have" items would bring the year 2 suite to comprehensive curriculum coverage.
