# Dimensional Analysis Game Evaluation

## Executive Summary

**Critical Finding**: The current implementation has an **inverted pedagogical structure** where "Beginners" (Level 3) face the most complex calculations, while "Advanced" (Level 1) does conceptual questions. This is the opposite of the evidence-based "conceptual-first" approach used in the Buffer Builder game.

---

## Current State Analysis

### Level Structure (INVERTED!)

| Current Label | Content | Should Be |
|---------------|---------|-----------|
| Level 3 "Byrjendur" | Synthesis, error analysis, derivations | Level 3 (hardest) |
| Level 2 "Millistig" | Unit prediction with calculations | Level 2 |
| Level 1 "Framhaldsstig" | Conceptual multiple choice | Level 1 (easiest) |

### What Students Currently Do

**Level 3 (labeled "Beginners"):**
- Solve multi-step calculation problems
- Identify errors in worked solutions
- Choose "efficient" conversion paths
- Write text explanations
- Use hints (with 15% penalty)

**Level 2:**
- Select conversion factors
- Type unit predictions
- Enter numerical answers
- View passive unit visualization

**Level 1 (labeled "Advanced"):**
- Answer multiple-choice conceptual questions
- Select explanations from options
- No manipulation, just selection

### Problems Identified

| Issue | Current | Buffer Game (Target) |
|-------|---------|---------------------|
| Learning progression | Calculations first | Concepts first |
| Interaction | Select/type answers | Manipulate molecules |
| Feedback | Submit-then-check | Real-time updates |
| Visualization | Passive display | Active manipulation |
| Cheating | Hints reveal answers | No solution bypass |
| Mobile-friendly | Keyboard required | Touch buttons |

---

## What Students Should Understand BEFORE Calculating

### Core Concepts for Dimensional Analysis

1. **Unit Equivalence**: 1000 mL and 1 L represent the SAME amount
   - Visual: Two containers with same liquid, different labels

2. **Conversion Factor = 1**: (1000 mL / 1 L) = 1 because numerator equals denominator
   - Visual: Balance scale showing equivalence

3. **Multiplying by 1 Doesn't Change Amount**: Only changes how we express it
   - Visual: Same beaker, numbers transform while liquid stays constant

4. **Unit Cancellation**: Same units above and below the line disappear
   - Visual: Drag matching units together, they animate away

5. **Factor Orientation**: The unit you want to cancel goes in the denominator
   - Visual: Try wrong orientation, see error; try right, see success

---

## Proposed Level 1 Redesign: Visual-First Approach

### Design Philosophy
Following the Buffer Builder model:
- **No calculations required**
- **Visual manipulation** instead of text selection
- **Immediate feedback** - see results as you interact
- **Discovery learning** - students figure out principles
- **Cheat-proof** - can't succeed without understanding

### New Level 1 Challenges

#### Challenge 1: Unit Equivalence Discovery
**What student sees**: Two beakers with the same colored liquid
- Left beaker: Shows "1000 mL"
- Right beaker: Empty label

**What student does**: Tap buttons to change right beaker's unit/number
- Buttons: "mL" / "L" / "dL" and "+100" / "-100" / "+1" / "-1"

**Immediate feedback**:
- Balance scale between beakers tips when unequal
- Scale levels when equal (1000 mL = 1 L)
- Green glow when correct

**Concept learned**: Different numbers + different units = same amount

#### Challenge 2: Building a Conversion Factor
**What student sees**: Empty fraction bar with slots above/below

**What student does**: Drag unit tiles into numerator and denominator
- Available tiles: "1000 mL", "1 L", "1000 g", "1 kg"

**Immediate feedback**:
- When equal amounts placed (1000 mL over 1 L): "= 1" appears, green highlight
- When unequal: Red X, tilted display

**Concept learned**: Conversion factors equal 1

#### Challenge 3: Unit Cancellation (Visual)
**What student sees**:
- Starting value: "500 mL" as a blue block
- Conversion factor slot
- Result area

**What student does**: Drag conversion factor tiles to the slot
- Tiles: "(1 L / 1000 mL)" and "(1000 mL / 1 L)"

**Immediate feedback**:
- Matching units (mL with mL) animate: shrink, flash, disappear
- Result shows remaining unit with new number
- Wrong orientation: "mL" blocks don't align, no cancellation

**Concept learned**: Same units cancel; orientation matters

#### Challenge 4: Factor Orientation Practice
**What student sees**:
- Start: "2 L"
- Target: "? mL"
- Two factor buttons (flipped versions)

**What student does**: Tap to try each factor orientation

**Immediate feedback**:
- Correct (1000 mL / 1 L): L blocks connect and vanish, mL remains
- Wrong (1 L / 1000 mL): L blocks don't connect, error animation

**Concept learned**: Unit to cancel must be in denominator

#### Challenge 5: Chain Conversion (2 steps)
**What student sees**:
- Start: "5000 mg"
- Target: "? kg"
- Factor tiles: (1 g/1000 mg), (1 kg/1000 g), (1000 mg/1 g), (1000 g/1 kg)

**What student does**: Drag factors into slots (2 slots available)

**Immediate feedback**:
- Real-time cancellation animation
- Intermediate result shown between factors
- Final result updates live

**Concept learned**: Multiple conversions chain together

#### Challenge 6: Free Play Sandbox
**What student sees**:
- Starting value input
- Multiple factor slots
- Unit tile library

**What student does**: Build any conversion path

**Immediate feedback**:
- Live cancellation
- Final result updates in real-time
- "Try different paths to same answer" prompt

**Concept learned**: Same answer from different paths

---

## Visual Feedback System

### Color Coding (matching Buffer Builder)
- **Blue**: Starting units/values
- **Green**: Correctly placed, matched, cancelled
- **Red**: Error, wrong orientation
- **Orange**: Interactive, touchable elements
- **Gray**: Cancelled/inactive units

### Animations
1. **Cancellation**: Units shrink toward center, flash, fade out
2. **Multiplication**: Numbers morph/transform
3. **Balance**: Scale tilts and levels
4. **Success**: Gentle pulse, checkmark appears

### Status Messages (Icelandic)
- "Rétt! Einingarnar strikast út" (Correct! The units cancel)
- "Rangt snúinn stuðull" (Wrong orientation factor)
- "Jafnvægi! Þetta jafngildir 1" (Balance! This equals 1)

---

## Cheat-Proof Design

| Old Vulnerability | New Safeguard |
|-------------------|---------------|
| Text hints reveal answers | Visual hints show concept, not solution |
| Can guess multiple choice | Must manipulate to correct position |
| Can skip to calculation | Must complete conceptual level first |
| Can copy friend's answer | Different random starting values |

---

## Icelandic Terminology Check

| English | Current in Code | Glossary | Status |
|---------|-----------------|----------|--------|
| numerator | teljari | (standard) | OK |
| denominator | nefnari | (standard) | OK |
| conversion factor | umbreytingarstuðull | (standard) | OK |
| unit | eining | (standard) | OK |
| cancel/cancellation | strikast út | (standard) | OK |
| significant figures | markverðir tölustafir | markverðir stafir | NEEDS FIX |
| density | eðlismassi | eðlismassi | OK |
| molar mass | mólmassi | mólmassi | OK |
| volume | rúmmál | rúmmál | OK |

**Terminology Fix Needed**: "markverðir tölustafir" should be "markverðir stafir"

---

## Implementation Priority (Impact vs. Effort)

### High Impact, Low Effort
1. Fix inverted level numbering (rename levels correctly)
2. Fix "markverðir tölustafir" → "markverðir stafir"
3. Add real-time feedback to existing visualizers

### High Impact, Medium Effort
4. Create interactive UnitBlock component with drag-and-drop
5. Build Challenge 1-3 (unit equivalence, factor building, cancellation)
6. Add cancellation animation

### High Impact, High Effort
7. Complete Challenge 4-6
8. Add sandbox mode
9. Full progression system with gates

---

## Technical Implementation Notes

### New Components Needed
- `UnitBlock.tsx` - Draggable unit tile with state
- `ConversionSlot.tsx` - Drop target for factors
- `CancellationAnimator.tsx` - Handles visual cancellation
- `EquivalenceScale.tsx` - Shows unit equivalence visually
- `Level1Conceptual.tsx` - New conceptual level

### State Management
- Track unit blocks with positions
- Real-time calculation as blocks move
- Animation state for cancellation sequences

### Mobile Considerations
- Large touch targets (min 44x44px)
- Drag-and-drop with touch events
- No keyboard required

---

## Success Metrics

After implementing conceptual Level 1:
- Students can explain WHY unit cancellation works (not just HOW)
- Time to complete conceptual level: 3-5 minutes
- Retention: Concepts remain after 1 week
- Transfer: Can apply to unfamiliar unit pairs
