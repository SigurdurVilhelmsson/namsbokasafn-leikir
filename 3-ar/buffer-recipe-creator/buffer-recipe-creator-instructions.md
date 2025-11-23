# pH Titration Master - Quick Reference

## 🎯 Core Mission
Virtual acid-base titration lab teaching endpoint detection, curve interpretation, and indicator selection for 17-18 year olds.

## 🔑 Must-Have Features
1. **Virtual Lab Equipment**: Burette, flask, pH meter
2. **Real-time Titration Curve**: Live plotting
3. **Indicator System**: 6+ indicators with color changes
4. **Precision Controls**: Coarse (+5mL), Fine (+1mL), Drop (+0.1mL)
5. **Three Titration Types**: Strong/strong, weak/strong, strong/weak
6. **30+ Problems**: Beginner (10), Intermediate (12), Advanced (8)

## 🧪 Titration Types

### Strong Acid + Strong Base (pH 7 endpoint)
```
HCl + NaOH → NaCl + H₂O
Sharp endpoint | Any indicator works
```

### Weak Acid + Strong Base (pH > 7 endpoint)
```
CH₃COOH + NaOH → CH₃COONa + H₂O
Buffer region visible | Use phenolphthalein
```

### Strong Acid + Weak Base (pH < 7 endpoint)
```
HCl + NH₃ → NH₄Cl
Buffer region visible | Use methyl red
```

## 📊 Visual Components
- **Burette**: 0-50 mL scale, animated dripping
- **Flask**: Color-changing solution, swirling animation
- **pH Meter**: Digital readout (0.00-14.00), color-coded
- **Curve Plot**: Real-time graph with markers

## 🎨 Indicator Colors
```javascript
'phenolphthalein': colorless → pink (pH 8.3-10.0)
'methyl-red': red → yellow (pH 4.4-6.2)
'bromothymol-blue': yellow → blue (pH 6.0-7.6)
```

## 💯 Scoring
- Hit endpoint (±0.2 mL): 100 pts
- Perfect (±0.05 mL): +50 pts
- Correct indicator: +20 pts
- Time bonuses: +10-30 pts

---

# Buffer Recipe Creator - Instructions

## Project Overview
Create an educational game where students calculate amounts of weak acid/conjugate base needed to create buffers at target pH values using Henderson-Hasselbalch equation.

## Educational Context
Chapter 17 (Additional Aspects of Aqueous Equilibria) - Buffer systems, Henderson-Hasselbalch equation, buffer capacity.

## Core Game Mechanics

### 1. Buffer Challenge Structure

**Given to Student:**
- Target pH (e.g., 7.40 for blood)
- Total volume (e.g., 1.0 L)
- Weak acid and its conjugate base (e.g., H₂PO₄⁻/HPO₄²⁻)
- pKa value of the acid
- Desired total concentration (e.g., 0.100 M)

**Student Must Calculate:**
- Moles (or grams) of weak acid needed
- Moles (or grams) of conjugate base needed
- Ratio of [A⁻]/[HA] using Henderson-Hasselbalch

### 2. Henderson-Hasselbalch Equation

**Core Formula:**
```
pH = pKa + log([A⁻]/[HA])

Rearranged:
[A⁻]/[HA] = 10^(pH - pKa)
```

**Steps Students Follow:**
1. Calculate the ratio [A⁻]/[HA]
2. Set up system of equations:
   - [A⁻] + [HA] = Total concentration
   - [A⁻]/[HA] = calculated ratio
3. Solve for [A⁻] and [HA]
4. Convert to moles (multiply by volume)
5. Convert to grams (multiply by molar mass)

### 3. Real-World Scenarios

**Blood Buffer (pH 7.40):**
```
System: H₂PO₄⁻/HPO₄²⁻ (pKa = 7.20)
Application: IV solutions, medical buffers
Challenge: Match physiological pH exactly
```

**Pool Chemistry (pH 7.4-7.6):**
```
System: HCO₃⁻/CO₃²⁻
Application: Swimming pool maintenance
Challenge: Cost-effective buffer preparation
```

**Biological Buffers:**
```
TRIS (pKa 8.06): Biochemistry labs
HEPES (pKa 7.48): Cell culture
MES (pKa 6.15): Plant cell work
```

**Industrial Buffers:**
```
Fermentation: pH 4-5 (acetate)
Pharmaceutical: pH 7.4 (phosphate)
Dyeing: pH 9-10 (borate)
```

### 4. Game Modes

**Recipe Mode (Learning):**
- Step-by-step guidance
- Calculator tools provided
- Hints available
- See solution before submitting
- No time pressure

**Challenge Mode (Timed):**
- 3 minutes per buffer
- Must calculate without hints
- Accuracy required (±5% tolerance)
- Score based on speed and accuracy
- Progressive difficulty

**Lab Mode (Realistic):**
- Multiple buffers to prepare
- Stock solution calculations
- Dilution problems
- pH adjustment scenarios
- Buffer capacity considerations

### 5. Visual Design

**Virtual Lab Bench:**
```
┌─────────────────────────────────┐
│  Target: pH 7.40 (Blood Buffer) │
│  Volume: 1.0 L                  │
│  System: H₂PO₄⁻/HPO₄²⁻          │
│  pKa: 7.20                      │
└─────────────────────────────────┘

┌──────────────┐  ┌──────────────┐
│   Weak Acid  │  │ Conjugate    │
│   H₂PO₄⁻     │  │ Base HPO₄²⁻  │
│              │  │              │
│  Need: ___g  │  │  Need: ___g  │
└──────────────┘  └──────────────┘

[Calculate] [Check Answer] [Hint]
```

**pH Indicator:**
- Color-coded pH scale (0-14)
- Target pH marked clearly
- Current pH updates as recipe is "mixed"
- Tolerance zone shown (±0.1 pH units)

### 6. 30+ Buffer Problems

**Beginner (10):**
1. Acetate buffer (pH 4.74) - HAc/Ac⁻
2. Phosphate buffer (pH 7.20) - H₂PO₄⁻/HPO₄²⁻
3. Ammonia buffer (pH 9.25) - NH₄⁺/NH₃
4-10: Simple 1:1 or 2:1 ratios

**Intermediate (12):**
11. Blood buffer (pH 7.40) - requires calculation
12. Carbonate buffer (pH 10.33) - pool chemistry
13. TRIS buffer (pH 8.00) - biochemistry
14. Different total volumes (100 mL, 500 mL, 2 L)
15. Different total concentrations (0.05 M, 0.20 M)
16-22: Varied scenarios

**Advanced (8):**
23. Buffer capacity calculations
24. Dilution from stock solutions
25. pH adjustment with acid/base
26. Multi-component buffers
27. Temperature effects on pKa
28. Buffer range determination
29. Real pharmaceutical formulation
30. Industrial-scale buffer prep

### 7. Calculation Display

**Show Step-by-Step:**
```
Step 1: Calculate the ratio [A⁻]/[HA]
pH = pKa + log([A⁻]/[HA])
7.40 = 7.20 + log([HPO₄²⁻]/[H₂PO₄⁻])
0.20 = log([HPO₄²⁻]/[H₂PO₄⁻])
[HPO₄²⁻]/[H₂PO₄⁻] = 10^0.20 = 1.58

Step 2: Set up equations
Let x = [H₂PO₄⁻] and y = [HPO₄²⁻]
x + y = 0.100 M (total concentration)
y/x = 1.58 (ratio from Step 1)

Step 3: Solve
y = 1.58x
x + 1.58x = 0.100
2.58x = 0.100
x = 0.0388 M (H₂PO₄⁻)
y = 0.0612 M (HPO₄²⁻)

Step 4: Convert to moles
Moles H₂PO₄⁻ = 0.0388 M × 1.0 L = 0.0388 mol
Moles HPO₄²⁻ = 0.0612 M × 1.0 L = 0.0612 mol

Step 5: Convert to grams
Mass H₂PO₄⁻ = 0.0388 mol × 97.99 g/mol = 3.80 g
Mass HPO₄²⁻ = 0.0612 mol × 95.98 g/mol = 5.87 g

Your Answer: 3.80 g H₂PO₄⁻, 5.87 g HPO₄²⁻ ✓
```

### 8. Scoring System

**Points:**
- Correct ratio: 30 pts
- Correct acid amount (±5%): 35 pts
- Correct base amount (±5%): 35 pts
- Speed bonus (<2 min): +20 pts
- Perfect accuracy (±1%): +10 pts

**Penalties:**
- pH out of range: -20 pts
- Wrong ratio calculation: -10 pts
- Unit errors: -5 pts

### 9. Visual Feedback

**Mixing Animation:**
- Flask fills with solutions
- Color changes to indicate pH
- Swirling/mixing animation
- pH meter updates
- Success glow if pH matches target

**pH Comparison:**
```
Target pH:  7.40 ━━━━★━━━━
Your pH:    7.39 ━━━★━━━━━
            ✓ Within tolerance!
```

### 10. Icelandic UI

- "Púfferuppskrift" / Buffer Recipe
- "Markmiðs pH" / Target pH
- "Veikt sýra" / Weak Acid
- "Hlutleysingarbasi" / Conjugate Base
- "Rúmmál" / Volume
- "Styrkur" / Concentration
- "Reikna" / Calculate
- "Blanda" / Mix

## Implementation Checklist

- [ ] Henderson-Hasselbalch calculator
- [ ] 30+ buffer scenarios
- [ ] Step-by-step solution display
- [ ] Virtual mixing visualization
- [ ] pH indicator system
- [ ] Scoring and feedback
- [ ] Three game modes
- [ ] Real-world contexts
- [ ] Responsive design
- [ ] Icelandic translations

---

**Ready for implementation!** 🧪📊
