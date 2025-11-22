# Lausnir Game - Enhanced Version Documentation

## Overview
This document provides comprehensive documentation for the enhanced Lausnir (Solutions) chemistry educational game designed for 1st year secondary school students (ages 15-16).

## 1. Beaker Animation System

### Architecture
The beaker visualization system uses **SVG-based graphics** with CSS animations to provide interactive visual representations of chemistry concepts.

### Components

#### Beaker Component
```javascript
<Beaker
  volume={number}           // Current solution volume in mL
  maxVolume={number}        // Maximum beaker capacity (default: 500 mL)
  concentration={number}    // Molarity (M) for color intensity
  color={string}           // Base color (hex)
  label={string}           // Text label below beaker
  animate={boolean}        // Enable animation
  animationType={string}   // 'fill', 'pour', 'mix', 'dissolve'
/>
```

#### Animation Types

**1. Pour Animation (Dilution)**
- Duration: 2 seconds
- Effect: Solution appears to pour from top, volume increases
- CSS: `@keyframes pour` with translateY and opacity
- Use case: Adding water to dilute a solution

**2. Dissolve Animation (Molarity from Mass)**
- Duration: 2 seconds
- Effect: Particles appear to dissolve and disperse
- CSS: `@keyframes dissolve` with scale and opacity
- Use case: Solid dissolving in solvent

**3. Mix Animation (Solution Mixing)**
- Duration: 2 seconds
- Effect: Gentle rotation/swirling motion
- CSS: `@keyframes mix` with rotation
- Use case: Combining two solutions

#### Color Intensity Calculation
```javascript
const getColorIntensity = (concentration) => {
  // Higher concentration = darker color
  const intensity = Math.min(Math.max(conc / 5, 0.2), 1);
  const lightness = 1 - (intensity * 0.7);
  return RGB color with adjusted lightness
}
```

- 0 M (pure water): Very light blue
- 1 M: Medium blue
- 5 M+: Dark blue (maximum intensity)

#### SVG Structure
```
<svg>
  ├── Beaker outline (path with stroke)
  ├── Graduation marks (lines + text at 100, 200, 300, 400, 500 mL)
  ├── Solution fill (path with calculated color)
  └── Meniscus (wavy line at solution surface)
</svg>
```

### Accessibility
- `role="img"` on beaker containers
- `aria-label` describing the chemical state
- Example: `"Útþynning: 2 M lausn þynnt niður í 0.5 M"`

### Responsive Design
- SVG scales proportionally on all screen sizes
- Beakers stack vertically on mobile (<768px)
- Touch-friendly "Replay Animation" button

---

## 2. localStorage Schema

### Structure
```javascript
{
  "lausnir_stats": {
    "gamesPlayed": number,              // Total games completed
    "totalCorrect": number,             // Total correct answers across all games

    "byType": {
      "dilution": {
        "attempts": number,             // Total dilution problems attempted
        "correct": number               // Correctly solved
      },
      "molarity": { ... },
      "molarityFromMass": { ... },
      "massFromMolarity": { ... },
      "mixing": { ... }
    },

    "byDifficulty": {
      "easy": {
        "games": number,                // Games played at this difficulty
        "bestScore": number             // Highest score achieved
      },
      "medium": { ... },
      "hard": { ... }
    },

    "bestStreak": number,               // Longest consecutive correct streak

    "commonMistakes": {
      "forgotMLtoL": number,            // Count of mL→L conversion errors
      "wrongFormula": number,           // Wrong formula selected
      "calculationError": number        // Arithmetic mistakes
    },

    "formulasMastered": [               // Array of mastered formula names
      "M1V1=M2V2",
      "M=mol/L"
    ]
  }
}
```

### Storage Methods
```javascript
// Get stats with error handling
const getStats = () => {
  try {
    const stats = localStorage.getItem('lausnir_stats');
    return stats ? JSON.parse(stats) : DEFAULT_STATS;
  } catch (e) {
    console.error('Error reading stats:', e);
    return DEFAULT_STATS;
  }
};

// Save stats with error handling
const saveStats = (stats) => {
  try {
    localStorage.setItem('lausnir_stats', JSON.stringify(stats));
  } catch (e) {
    console.error('Error saving stats:', e);
  }
};
```

### Error Handling
- All localStorage operations wrapped in try-catch
- Graceful degradation if localStorage unavailable
- Default values returned on parse errors

---

## 3. Chemical Compounds Database

### Simple Level (Auðvelt)
Used for easy difficulty problems - familiar household chemicals

| Chemical | Formula | Molar Mass (g/mol) | Display Name |
|----------|---------|-------------------|--------------|
| Borðsalt | NaCl | 58.5 | NaCl (borðsalt) |
| Glúkósi | C₆H₁₂O₆ | 180 | glúkósa (C₆H₁₂O₆) |
| Vetursperoxíð | H₂O₂ | 34 | H₂O₂ (vetursperoxíð) |

### Medium Level (Miðlungs)
Common laboratory chemicals

| Chemical | Formula | Molar Mass (g/mol) | Display Name |
|----------|---------|-------------------|--------------|
| Natríumhýdroxíð | NaOH | 40 | NaOH (natríumhýdroxíð) |
| Kalsíumklóríð | CaCl₂ | 111 | CaCl₂ (kalsíumklóríð) |
| Saltsýra | HCl | 36.5 | HCl (saltsýra) |

### Hard Level (Erfitt)
More complex compounds

| Chemical | Formula | Molar Mass (g/mol) | Display Name |
|----------|---------|-------------------|--------------|
| Kalíumnitrat | KNO₃ | 101 | KNO₃ (kalíumnitrat) |
| Magnesíumsúlfat | MgSO₄ | 120 | MgSO₄ (magnesíumsúlfat) |
| Brennisteinssýra | H₂SO₄ | 98 | H₂SO₄ (brennisteinssýra) |

### Rationale
- **Age-appropriate**: All chemicals are encountered in 1st year curriculum
- **Progressive difficulty**: From household (salt) to lab (acids)
- **Real-world context**: Students can relate to actual substances
- **Safety awareness**: Includes proper Icelandic chemical names

---

## 4. Example Problems by Difficulty

### Easy (Auðvelt) - 8 Problems

#### Example 1: Basic Dilution
**Question:** Þú ert með 50 mL af 3 M NaCl lausn. Þú bætir við vatni þannig að endanlegt rúmmál verður 150 mL. Hver er endanlegur mólstyrkur?

**Given:**
- M₁ = 3 M
- V₁ = 50 mL
- V₂ = 150 mL

**Formula:** M₁V₁ = M₂V₂

**Solution:**
- M₂ = (3 M × 50 mL) / 150 mL
- M₂ = 150 / 150
- **M₂ = 1.0 M**

#### Example 2: Simple Molarity
**Question:** Þú leysir 0.5 mól af glúkósa í 0.25 L af lausn. Hver er mólstyrkurinn?

**Given:**
- mól = 0.5 mol
- rúmmál = 0.25 L

**Formula:** M = mól / L

**Solution:**
- M = 0.5 mol / 0.25 L
- **M = 2.0 M**

#### Example 3: Molarity from Mass
**Question:** Þú leysir 29.25 g af NaCl (borðsalt) (mólþyngd 58.5 g/mol) í 250 mL af lausn. Hver er mólstyrkurinn?

**Given:**
- massi = 29.25 g
- mólþyngd = 58.5 g/mol
- rúmmál = 250 mL = 0.25 L

**Solution:**
- mól = 29.25 g / 58.5 g/mol = 0.5 mol
- M = 0.5 mol / 0.25 L
- **M = 2.0 M**

---

### Medium (Miðlungs) - 10 Problems

#### Example 1: Reverse Dilution
**Question:** Þú þarft að útbúa 500 mL af 0.6 M CaCl₂ lausn með því að þynna 2.5 M stofnlausn. Hversu mikið þarftu af stofnlausninni?

**Given:**
- M₁ = 2.5 M
- M₂ = 0.6 M
- V₂ = 500 mL

**Formula:** V₁ = (M₂ × V₂) / M₁

**Solution:**
- V₁ = (0.6 M × 500 mL) / 2.5 M
- V₁ = 300 / 2.5
- **V₁ = 120 mL**

#### Example 2: Mass from Molarity
**Question:** Þú ert með 200 mL af 1.5 M NaOH lausn. Hversu mörg grömm af NaOH eru í lausninni? (mólþyngd 40 g/mol)

**Given:**
- M = 1.5 M
- V = 200 mL = 0.2 L
- mólþyngd = 40 g/mol

**Solution:**
- mól = M × L = 1.5 M × 0.2 L = 0.3 mol
- massi = mól × mólþyngd = 0.3 mol × 40 g/mol
- **massi = 12.0 g**

#### Example 3: Molarity with Decimal Mass
**Question:** Þú leysir 55.5 g af CaCl₂ (mólþyngd 111 g/mol) í 400 mL af lausn. Hver er mólstyrkurinn?

**Given:**
- massi = 55.5 g
- mólþyngd = 111 g/mol
- rúmmál = 400 mL = 0.4 L

**Solution:**
- mól = 55.5 / 111 = 0.5 mol
- M = 0.5 / 0.4
- **M = 1.25 M**

---

### Hard (Erfitt) - 12 Problems

#### Example 1: Complex Mixing
**Question:** Þú blandar 75 mL af 2.5 M KNO₃ lausn með 125 mL af 1.2 M KNO₃ lausn. Hver er mólstyrkur blöndunnar?

**Given:**
- M₁ = 2.5 M, V₁ = 75 mL
- M₂ = 1.2 M, V₂ = 125 mL

**Solution:**
- mól₁ = 2.5 M × 0.075 L = 0.1875 mol
- mól₂ = 1.2 M × 0.125 L = 0.15 mol
- mól_alls = 0.1875 + 0.15 = 0.3375 mol
- V_alls = 75 + 125 = 200 mL = 0.2 L
- M = 0.3375 / 0.2
- **M = 1.688 M**

#### Example 2: Multi-Step Mass Calculation
**Question:** Til að búa til 500 mL af 0.15 M MgSO₄ lausn, hve mörg grömm þarftu? (mólþyngd 120 g/mol)

**Given:**
- M = 0.15 M
- V = 500 mL = 0.5 L
- mólþyngd = 120 g/mol

**Solution:**
- mól = M × L = 0.15 × 0.5 = 0.075 mol
- massi = 0.075 × 120
- **massi = 9.0 g**

#### Example 3: Precise Dilution
**Question:** Þú ert með 35 mL af 3.75 M H₂SO₄ stofnlausn. Þú þynnir hana í 450 mL. Hver er endanlegur mólstyrkur?

**Given:**
- M₁ = 3.75 M
- V₁ = 35 mL
- V₂ = 450 mL

**Solution:**
- M₂ = (3.75 × 35) / 450
- M₂ = 131.25 / 450
- **M₂ = 0.292 M**

---

## 5. Key Features Implementation

### Input Validation
- **Positive numbers only**: Rejects negative values and zero
- **Scientific notation**: Handles 1.5e-3 → 0.0015
- **Bounds checking**: 0 < answer < 1000
- **Real-time feedback**: Red border + error message
- **Auto-clear**: Error clears when valid input entered

### Step-by-Step Solutions
- **Comprehensive breakdown**: Every problem type has full worked solution
- **Icelandic terminology**: All mathematical steps in Icelandic
- **Visual formatting**: Color-coded steps with formulas
- **Always shown**: Appears after every answer (correct or incorrect)

### Contextual Feedback
Error magnitude determines feedback message:
- **>50% error**: "Athugaðu hvort þú valdir rétta formúlu"
- **20-50% error**: "Athugaðu hvort þú breyttir mL í L"
- **5-20% error**: "Kannski reiknivillla eða aukastafavilla"
- **2-5% error**: "Mjög nálægt en utan vikmarka"

### Streak System
- **Visual flame**: 🔥 grows with streak
- **Bonuses**: +5 at 3 streak, +10 at 5 streak
- **Achievements**:
  - "3 í röð!" at 3 correct
  - "5 réttar!" at 5 correct
  - "Fullkomin blöndun!" for mixing problems
  - "Útþynningar sérfræðingur!" for dilution problems

### Game Modes

#### Competition Mode (Keppnisstilling)
- Score tracking (10/15/20 points per problem)
- Hints cost points (-2, -2, -3)
- Timer optional (90s per question)
- Speed bonuses (+5 if <30s, +10 if <20s)
- Orange color scheme

#### Practice Mode (Æfingastilling)
- No scoring pressure
- Free unlimited hints
- No time limit
- "Show Solution" always available
- Green color scheme
- Focus on learning

### Keyboard Shortcuts
- **Enter**: Submit answer
- **H**: Next hint
- **S**: Show solution (if available)
- **F**: Toggle formula card
- **R**: Replay beaker animation
- **?**: Show help/instructions

### Accessibility Features
- **Screen reader support**: Aria-labels in Icelandic
- **Keyboard navigation**: Full keyboard control
- **Focus indicators**: 3px orange outline on focus
- **High contrast support**: CSS filters for beakers
- **Touch targets**: Minimum 48px on mobile
- **Semantic HTML**: Proper roles and labels

---

## 6. Mobile Optimization

### Responsive Breakpoints
- **<768px**: Mobile layout
  - Sticky header
  - Vertical beaker stacking
  - Single-column layout
  - Larger touch targets

- **768px-1024px**: Tablet layout
  - 2-column grids where appropriate
  - Moderate spacing

- **>1024px**: Desktop layout
  - Full multi-column layout
  - Side-by-side beakers
  - Fixed formula card

### Touch Optimizations
- `inputMode="decimal"` for numeric keyboards
- Minimum 48px touch targets
- No hover-dependent functionality
- Swipe-friendly spacing

---

## 7. Chemistry Facts System

### Implementation
```javascript
const CHEMISTRY_FACTS = [
  'Blóð er u.þ.b. 0.15 M NaCl lausn (isotonic)',
  'Við notum mólstyrk vegna þess að hann segir okkur fjölda sameinda',
  // ... 7 total facts
];
```

### Display Logic
- 30% chance after each answer
- Shown in blue info box between problems
- Age-appropriate content
- Connects chemistry to real life

---

## 8. Timer Challenge Mode

### Features
- Optional toggle in game setup
- 90 seconds per question
- Visual countdown timer
- Warning animation when <15s remain
- Speed bonuses:
  - +10 points if solved in <20s
  - +5 points if solved in <30s
- Auto-submit at 0 seconds

---

## 9. Problem Type Variants

### Implemented Types
1. **dilution**: Standard M₁V₁ = M₂V₂
2. **molarity**: M = mol / L (basic)
3. **molarityFromMass**: Calculate M from grams
4. **massFromMolarity**: Calculate grams from M
5. **mixing**: Combine two solutions
6. **unitConversion**: mL↔L, g↔mg (integrated into other types)

### Reverse Problems
- Finding initial volume (V₁) given final conditions
- Finding initial concentration (M₁)
- Working backwards from desired final solution

---

## 10. Enhanced Hint System

### Three-Tier Structure

**Hint 1** (-2 points in competition):
- Shows which formula to use
- Example: "Notaðu M₁V₁ = M₂V₂"

**Hint 2** (-2 points in competition):
- Shows first calculation step
- Example: "M₂ = (M₁ × V₁) / V₂ = (5 × 100) / 500"

**Hint 3** (-3 points in competition):
- Shows complete answer
- Example: "M₂ = 1.0 M"

### Practice Mode
- All hints are **free**
- No point deductions
- Encourages exploration and learning

---

## 11. Technical Implementation Notes

### Single-File Architecture
- Everything in one HTML file
- React via CDN (production build)
- Tailwind CSS via CDN
- Babel standalone for JSX transpilation
- No build step required

### Performance Optimizations
- React hooks (useState, useEffect, useCallback)
- Memoized callbacks for event handlers
- Efficient re-rendering with proper dependencies
- CSS animations (GPU-accelerated)
- Minimal JavaScript animations

### Browser Compatibility
- Modern browsers (ES6+)
- Tested on Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)
- Fallbacks for localStorage failures

---

## 12. Future Enhancement Ideas

### Not Yet Implemented (Could Add Later)
1. **Full Stats Dashboard**:
   - Charts showing improvement over time
   - Detailed breakdown by problem type
   - Weakness identification

2. **Sound Effects**:
   - Pouring water sound for dilution
   - Success chime for correct answers
   - Would require audio file hosting

3. **Calculation Workspace**:
   - Interactive scratchpad
   - Real-time calculation checking
   - Step-by-step guidance

4. **Multiplayer Mode**:
   - Race against classmates
   - Leaderboard system
   - Would require backend server

5. **Additional Problem Types** (2nd year+):
   - pH calculations
   - Buffer solutions
   - Titrations
   - Solubility products

---

## 13. Educational Alignment

### 1st Year Curriculum (Iceland)
✅ **Included:**
- Basic molarity (M = mol/L)
- Dilution (M₁V₁ = M₂V₂)
- Solution mixing
- Unit conversions (mL↔L, g→mol)
- Molar mass calculations
- Common laboratory chemicals

❌ **Excluded** (Too advanced):
- pH and pOH
- Buffer calculations
- Titration curves
- Serial dilutions
- Percent concentration (w/v, v/v)
- Colligative properties
- Solubility equilibria

### Pedagogical Approach
- **Visual learning**: Beaker animations show concepts
- **Immediate feedback**: Students learn from mistakes
- **Scaffolded hints**: Progressive support
- **Real chemicals**: Concrete rather than abstract
- **Low-stakes practice**: Practice mode reduces anxiety
- **Mastery-based**: Can retry until understood

---

## 14. Icelandic Terminology Reference

| English | Icelandic | Context |
|---------|-----------|---------|
| Solution | Lausn | Main concept |
| Molarity | Mólstyrkur | Concentration measure |
| Dilution | Útþynning | Making less concentrated |
| Mixing | Blöndun | Combining solutions |
| Mole | Mól | Unit of amount |
| Molar mass | Mólþyngd | g/mol |
| Volume | Rúmmál | Liters or milliliters |
| Mass | Massi | Grams |
| Answer | Svar | Student input |
| Hint | Ábending | Help system |
| Show solution | Sýna lausn | Full worked solution |
| Streak | Röð | Consecutive correct |
| Formula | Formúla | Mathematical equation |
| Competition | Keppni | Scored mode |
| Practice | Æfing | Learning mode |

---

## 15. File Structure

```
lausnir_refined.html
├── Head Section
│   ├── Meta tags (viewport, charset)
│   ├── External scripts (React, Babel, Tailwind)
│   └── CSS styles
│       ├── Root variables (Kvenno colors)
│       ├── Typography and layout
│       ├── Animation keyframes
│       ├── Component styles
│       └── Responsive media queries
│
├── Body Section
│   ├── Static header (Kvenno branding)
│   ├── Breadcrumb navigation
│   ├── Back button
│   └── React root div
│
└── Script Section (React Application)
    ├── Constants
    │   ├── CHEMICALS database
    │   └── CHEMISTRY_FACTS array
    │
    ├── Components
    │   ├── Beaker (SVG visualization)
    │   ├── BeakerVisualization (problem-specific layouts)
    │   └── StepBySolution (worked solutions)
    │
    └── Main Component: SolutionLab
        ├── State management (useState)
        ├── Game logic functions
        │   ├── generateProblem()
        │   ├── validateInput()
        │   ├── checkAnswer()
        │   ├── getContextualFeedback()
        │   └── Timer management
        ├── localStorage helpers
        └── Render logic
            ├── Instructions screen
            ├── Difficulty selection
            ├── Game play screen
            └── Results screen
```

---

## 16. Testing Checklist

### Functionality
- [ ] All problem types generate correctly
- [ ] Input validation catches errors
- [ ] Step-by-step solutions accurate
- [ ] Beaker animations play smoothly
- [ ] Streak counter increments/resets properly
- [ ] Keyboard shortcuts work
- [ ] Formula card toggles
- [ ] Timer counts down correctly
- [ ] Game mode switch works

### Responsive Design
- [ ] Mobile (320px, 375px, 414px)
- [ ] Tablet (768px, 1024px)
- [ ] Desktop (1280px, 1920px)
- [ ] Beakers stack on mobile
- [ ] Touch targets adequate
- [ ] Text readable at all sizes

### Accessibility
- [ ] Keyboard-only navigation
- [ ] Screen reader announces states
- [ ] Focus indicators visible
- [ ] Color contrast sufficient
- [ ] Aria labels present
- [ ] Alt text on beakers

### Cross-Browser
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Edge
- [ ] Mobile browsers

---

## Support & Maintenance

### Common Issues

**Problem**: Beakers not animating
- **Solution**: Check browser CSS animation support

**Problem**: localStorage not saving
- **Solution**: Check privacy settings, incognito mode

**Problem**: Keyboard shortcuts not working
- **Solution**: Check for conflicting browser extensions

### Contact
For issues or suggestions, refer to the Kvenno Efnafræði platform administrators.

---

**Version**: 1.0 Enhanced
**Last Updated**: 2025
**Language**: Icelandic (íslenska)
**Target Audience**: 1st year secondary students (15-16 years)
**Curriculum**: Icelandic national curriculum - Chemistry Year 1
