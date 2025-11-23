# pH Titration Master - Development Instructions for Claude Code

## Project Overview
Create an educational chemistry game for 3rd year students (ages 17-18) at Kvennaskólinn í Reykjavík. The game teaches acid-base titrations through virtual experiments where students must hit exact endpoints, plot titration curves, and identify equivalence points.

## Technical Stack
- **Frontend**: React 18 with Babel (standalone, in-browser JSX transformation)
- **Styling**: Tailwind CSS (CDN)
- **Deployment**: Single HTML file for Linode Ubuntu server
- **No build process required** - everything runs in the browser

## File Structure
Create a single file: `ph-titration-master.html`

## Educational Context
Students are learning from "Chemistry, the Central Science" by Brown et al., Chapters 16-17 (Acid-Base Equilibria). They understand:
- pH calculations and pH scale
- Strong vs weak acids/bases
- Titration curves and equivalence points
- Indicators and their color ranges
- Buffer regions
- Henderson-Hasselbalch equation
- Ka, Kb, pKa, pKb relationships

## Kvenno Brand Guidelines
- Primary color: `--kvenno-orange: #f36b22`
- Dark variant: `--kvenno-orange-dark: #d95a1a`
- Use these colors for buttons, accents, and the logo
- White background for main content areas
- Gray (#f9fafb) for page background

## Core Game Mechanics

### 1. Virtual Titration Setup

**Visual Elements:**
- **Burette** (vertical tube) containing titrant
  - Shows volume added (0-50 mL scale)
  - Animated liquid level
  - Drip animation when adding
  
- **Erlenmeyer Flask** containing analyte
  - Color changes as pH changes
  - Swirling animation when mixing
  - Volume display
  
- **pH Meter** (digital readout)
  - Shows current pH (to 2 decimal places)
  - Updates in real-time
  - Color-coded (red→yellow→green→blue)

- **Titration Curve Plot** (real-time graph)
  - X-axis: Volume added (mL)
  - Y-axis: pH (0-14)
  - Live updating as titrant is added
  - Equivalence point marker
  - Buffer region highlighted

### 2. Titration Types

**Strong Acid + Strong Base:**
- Example: HCl + NaOH
- Sharp endpoint at pH 7
- Steep curve near equivalence
- Any indicator works (methyl red, phenolphthalein, etc.)

**Weak Acid + Strong Base:**
- Example: CH₃COOH + NaOH
- Endpoint at pH > 7 (basic)
- Buffer region visible (pH = pKa at half-equivalence)
- Use phenolphthalein (pH 8-10)
- Less steep at equivalence

**Strong Acid + Weak Base:**
- Example: HCl + NH₃
- Endpoint at pH < 7 (acidic)
- Buffer region visible
- Use methyl red (pH 4-6)
- Less steep at equivalence

**Polyprotic Acids:**
- Example: H₂SO₄, H₃PO₄
- Multiple equivalence points
- Multiple buffer regions
- Complex curves

### 3. Student Interactions

**Addition Controls:**
- **Coarse Add** (+5 mL): Fast addition for early stages
- **Fine Add** (+1 mL): Approaching endpoint
- **Drop-by-Drop** (+0.1 mL): Near endpoint (precision mode)
- **Reset**: Start titration over
- **Auto-Complete**: Shows ideal curve (Learning mode)

**Precision Challenge:**
- Student must hit equivalence point within ±0.2 mL
- Closer = more points
- Perfect hit (±0.05 mL) = bonus points
- Overshooting = penalty

### 4. Indicator Selection

**Available Indicators:**
- **Methyl Orange**: pH 3.1-4.4 (red→yellow)
- **Methyl Red**: pH 4.4-6.2 (red→yellow)
- **Bromothymol Blue**: pH 6.0-7.6 (yellow→blue)
- **Phenolphthalein**: pH 8.3-10.0 (colorless→pink)
- **Thymol Blue**: pH 8.0-9.6 (yellow→blue)
- **Alizarin Yellow**: pH 10.0-12.0 (yellow→red)

**Student must:**
- Choose appropriate indicator for titration type
- Wrong indicator = no clear endpoint (game teaches this!)
- Score bonus for correct indicator choice

### 5. Titration Curve Features

**Student Identifies:**
- **Equivalence Point**: Where moles acid = moles base
- **Half-Equivalence Point**: pH = pKa (buffer region)
- **Buffer Region**: Flat portion of curve
- **Initial pH**: Starting pH of solution
- **Final pH**: pH after excess titrant

**Calculations Required:**
- Molarity of unknown from volume at equivalence
- Ka or Kb from half-equivalence point pH
- Percent completion at various points

### 6. Game Modes

**Practice Mode:**
- See pH continuously
- Unlimited resets
- Hints available
- Curve visible during titration
- No time pressure
- Focus: Understanding curves and endpoints

**Challenge Mode:**
- Limited additions (must be efficient)
- pH hidden near endpoint (use indicator!)
- Time bonus for fast completion
- Accuracy scoring (±0.2 mL tolerance)
- No hints
- Curve revealed after completion
- Leaderboard integration

**Expert Mode:**
- Unknown titrant concentration
- Must determine both equivalence point AND concentration
- Multiple titrations required
- Statistical analysis (average, std dev)
- Real lab simulation

## Visual Design Specifications

### Burette Design
```
╔════╗
║ 0  ║ ← Scale markings (0, 10, 20, 30, 40, 50 mL)
║    ║
║ 10 ║
║    ║    Animated liquid level
║ 20 ║
║████║ ← Current level (blue liquid)
║████║
╚════╝
  ↓     Drip animation
```

**Features:**
- Gradient fill (darker at bottom)
- Scale on left side
- Current volume label
- Dripping animation when adding
- Tip at bottom for drops

### Flask Design
```
    ╱────╲
   ╱      ╲
  │   💧   │ ← Solution (color changes with pH)
  │  ████  │
  │  ████  │
   ╲      ╱
    ╲____╱
```

**Features:**
- Conical shape (Erlenmeyer)
- Solution color based on pH and indicator:
  - Acidic pH + phenolphthalein: Colorless
  - Basic pH + phenolphthalein: Pink
  - Acidic pH + methyl red: Red
  - Basic pH + methyl red: Yellow
- Swirling animation when adding titrant
- Volume label below flask
- Magnetic stirrer animation (rotating bar)

### pH Meter Display
```
┌─────────────┐
│   pH METER  │
│             │
│    7.42     │ ← Digital readout (large)
│             │
│  ●●●●●●●    │ ← pH scale indicator
└─────────────┘
```

**Features:**
- Digital 7-segment style numbers
- Large, easy to read
- Color-coded background:
  - Red (pH < 4)
  - Yellow (pH 4-6)
  - Green (pH 6-8)
  - Blue (pH > 8)
- Small horizontal pH scale (0-14) with moving indicator

### Titration Curve Graph
```
pH
14 │
   │                    ╱────
   │                ╱╱╱
 7 │            ╱╱╱  ← Equivalence point
   │        ╱╱╱╱
   │    ╱╱╱╱
 0 │╱╱╱╱─────────────────────
   └──────────────────────── Volume (mL)
   0    10   20   30   40   50
```

**Features:**
- Real-time plotting
- Grid lines (major and minor)
- Axis labels clear
- Equivalence point marked with star ⭐
- Half-equivalence point marked with diamond ◆
- Buffer region shaded (light blue)
- Color-coded curve (gradient from red→blue)
- Hover shows exact values

## Scoring System

### Base Points
- **Hit equivalence point** (±0.2 mL): 100 points
- **Perfect hit** (±0.05 mL): +50 bonus
- **Correct indicator chosen**: +20 points
- **Identify equivalence point**: +30 points
- **Identify half-equivalence point**: +20 points
- **Calculate Ka/Kb correctly**: +40 points
- **Determine unknown molarity**: +50 points

### Time Bonuses
- Complete in <2 min: +30 points
- Complete in <3 min: +20 points
- Complete in <4 min: +10 points

### Efficiency Bonuses
- Minimal additions (within 10% of optimal): +25 points
- No overshooting: +15 points
- Smooth approach to endpoint: +10 points

### Penalties
- Wrong indicator: -20 points
- Overshoot by >1 mL: -10 points
- Multiple resets (Challenge mode): -5 each

## Titration Problems (30+ Scenarios)

### Beginner (10):
1. **HCl (0.100 M) + NaOH (0.100 M)**
   - Strong acid/strong base
   - 25.0 mL analyte
   - pH 7.00 endpoint
   - Any indicator works

2. **HNO₃ + KOH**
   - Strong/strong
   - Different concentrations
   - Practice precision

3-10: Variations with different volumes and concentrations

### Intermediate (12):
11. **CH₃COOH (0.100 M) + NaOH (0.100 M)**
    - Weak acid/strong base
    - Ka = 1.8 × 10⁻⁵
    - pH 8.72 endpoint
    - Use phenolphthalein
    - Buffer region at pH 4.74

12. **HF + NaOH**
    - Weak/strong
    - Calculate Ka from curve

13. **NH₃ + HCl**
    - Weak base/strong acid
    - pH < 7 endpoint
    - Use methyl red

14-22: Various weak acid/base combinations

### Advanced (8):
23. **H₃PO₄ + NaOH (polyprotic)**
    - Three equivalence points
    - pKa₁ = 2.15, pKa₂ = 7.20, pKa₃ = 12.35
    - Complex curve interpretation

24. **H₂SO₄ + NaOH**
    - Polyprotic (first is strong)
    - Two-stage curve

25. **Unknown weak acid**
    - Determine Ka AND concentration
    - Multiple measurements needed

26-30: Complex scenarios, mixtures, buffer preparation

## Calculations and Feedback

### Show After Titration:

**1. Equivalence Point Analysis**
```
Equivalence Point Reached at: 24.95 mL
Your addition: 25.03 mL
Accuracy: ±0.08 mL ✓ (within tolerance)

At equivalence point:
- Moles of acid = Moles of base
- 0.100 M × 0.02500 L = M_base × 0.02495 L
- M_base = 0.100 M ✓
```

**2. pH Curve Interpretation**
```
Half-Equivalence Point: 12.48 mL
pH at half-equivalence: 4.76
Therefore: pKa = 4.76

Using Henderson-Hasselbalch:
pH = pKa + log([A⁻]/[HA])
At half-equivalence: [A⁻] = [HA]
So: pH = pKa = 4.76

Calculate Ka:
Ka = 10^(-pKa) = 10^(-4.76) = 1.74 × 10⁻⁵
```

**3. Indicator Choice Evaluation**
```
Indicator: Phenolphthalein (pH 8.3-10.0) ✓
Equivalence Point pH: 8.72

Good choice! The endpoint pH falls within 
the indicator's color change range.

Alternative acceptable indicators:
- Thymol Blue (pH 8.0-9.6) ✓
- Phenol Red (pH 6.8-8.4) ⚠️ (marginal)

Poor choices:
- Methyl Red (pH 4.4-6.2) ✗ (too acidic)
```

**4. Titration Quality Assessment**
```
Your Performance:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Accuracy:      ████████░░  8/10
Efficiency:    ██████████  10/10
Speed:         ███████░░░  7/10
Technique:     █████████░  9/10

Overall Score: 245 / 300 points

Strengths:
✓ Efficient additions (minimal waste)
✓ Smooth approach to endpoint

Areas to improve:
⚠ Could be slightly more accurate
💡 Practice drop-by-drop near endpoint
```

## Icelandic Translation

### UI Text
- "Þéttigreining" / Titration
- "Súrur / Sasar" / Acids / Bases
- "Sýrustig (pH)" / pH Level
- "Jafngildistaður" / Equivalence Point
- "Litskiptur" / Indicator
- "Buretta" / Burette
- "Kólfur" / Flask
- "Bæta við" / Add
- "Dropaforði" / Drop Mode
- "Endurstilla" / Reset
- "Nákvæmni" / Accuracy
- "Púffersvæði" / Buffer Region
- "Titrunarferill" / Titration Curve

### Keep English
- pH (universal)
- pKa, pKb (scientific notation)
- Chemical formulas (HCl, NaOH, etc.)
- Indicator names (phenolphthalein, etc.)

## Implementation Details

### pH Calculation

**Strong Acid + Strong Base:**
```javascript
const calculatePH = (volumeAcid, molarityAcid, volumeBase, molarityBase) => {
  const molesAcid = volumeAcid * molarityAcid;
  const molesBase = volumeBase * molarityBase;
  const totalVolume = volumeAcid + volumeBase;
  
  if (molesAcid > molesBase) {
    // Excess acid
    const excessH = (molesAcid - molesBase) / totalVolume;
    return -Math.log10(excessH);
  } else if (molesBase > molesAcid) {
    // Excess base
    const excessOH = (molesBase - molesAcid) / totalVolume;
    const pOH = -Math.log10(excessOH);
    return 14 - pOH;
  } else {
    // Equivalence point
    return 7.00;
  }
};
```

**Weak Acid + Strong Base:**
```javascript
const calculateWeakAcidPH = (volumeAcid, molarityAcid, Ka, volumeBase, molarityBase) => {
  const molesAcid = volumeAcid * molarityAcid;
  const molesBase = volumeBase * molarityBase;
  const totalVolume = volumeAcid + volumeBase;
  
  if (molesBase === 0) {
    // Initial pH (weak acid)
    return 0.5 * (pKa - Math.log10(molarityAcid));
  } else if (molesBase < molesAcid) {
    // Buffer region (Henderson-Hasselbalch)
    const molesA = molesBase; // conjugate base formed
    const molesHA = molesAcid - molesBase; // acid remaining
    return pKa + Math.log10(molesA / molesHA);
  } else if (molesBase === molesAcid) {
    // Equivalence point (weak base solution)
    const Cb = molesBase / totalVolume;
    const Kb = 1e-14 / Ka;
    const pOH = 0.5 * (pKb - Math.log10(Cb));
    return 14 - pOH;
  } else {
    // Excess strong base
    const excessOH = (molesBase - molesAcid) / totalVolume;
    return 14 + Math.log10(excessOH);
  }
};
```

### Color Changes

```javascript
const getIndicatorColor = (pH, indicator) => {
  const indicators = {
    'methyl-orange': {
      acidColor: '#ff4444',  // red
      baseColor: '#ffff44',   // yellow
      pHRange: [3.1, 4.4]
    },
    'methyl-red': {
      acidColor: '#ff0000',   // red
      baseColor: '#ffff00',   // yellow
      pHRange: [4.4, 6.2]
    },
    'phenolphthalein': {
      acidColor: 'transparent', // colorless
      baseColor: '#ff69b4',     // pink
      pHRange: [8.3, 10.0]
    }
    // ... more indicators
  };
  
  const ind = indicators[indicator];
  const [pHLow, pHHigh] = ind.pHRange;
  
  if (pH < pHLow) return ind.acidColor;
  if (pH > pHHigh) return ind.baseColor;
  
  // Transition zone (gradient)
  const fraction = (pH - pHLow) / (pHHigh - pHLow);
  return blendColors(ind.acidColor, ind.baseColor, fraction);
};
```

### Curve Plotting

```javascript
const plotTitrationCurve = (dataPoints) => {
  // dataPoints: [{volume: 0, pH: 2.0}, {volume: 1, pH: 2.1}, ...]
  
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  
  // Clear and draw axes
  drawAxes(ctx);
  
  // Plot points and curve
  ctx.beginPath();
  dataPoints.forEach((point, index) => {
    const x = volumeToX(point.volume);
    const y = pHToY(point.pH);
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Mark equivalence point
  const eqPoint = findEquivalencePoint(dataPoints);
  drawStar(ctx, eqPoint.x, eqPoint.y);
};
```

## Success Criteria

The game succeeds if:
- Students understand titration curves visually
- They can identify equivalence points
- They learn to choose appropriate indicators
- pH calculations become intuitive
- Buffer regions are understood
- Real lab technique is practiced (precision)
- Teachers use it to demonstrate concepts

## Deployment

**File:** `ph-titration-master.html`

**Upload:**
```bash
scp ph-titration-master.html user@linode:/var/www/kvenno.app/games/
chmod 644 ph-titration-master.html
```

---

## Implementation Checklist

- [ ] Set up HTML structure with React and Tailwind
- [ ] Create Kvenno-branded header
- [ ] Implement virtual lab equipment visuals (burette, flask, pH meter)
- [ ] Build pH calculation engine (strong/weak acids/bases)
- [ ] Create titration curve plotting system
- [ ] Implement indicator color changes
- [ ] Build addition controls (coarse, fine, drop-by-drop)
- [ ] Create 30+ titration scenarios
- [ ] Implement equivalence point detection
- [ ] Add indicator selection interface
- [ ] Build feedback and analysis system
- [ ] Create Practice and Challenge modes
- [ ] Implement scoring system
- [ ] Add real-time curve plotting
- [ ] Design responsive layout
- [ ] Add Icelandic translations
- [ ] Implement calculation explanations
- [ ] Add animations (dripping, swirling, color changes)
- [ ] Polish visual effects
- [ ] Test all calculations
- [ ] Verify educational accuracy
- [ ] Test on multiple devices
- [ ] Final QA

---

**Ready for Claude Code to implement!** 🧪📊
