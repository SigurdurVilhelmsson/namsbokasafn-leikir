# Gas Law Challenge - Quick Reference for Claude Code

## 🎯 Core Mission
Build an interactive chemistry game teaching the ideal gas law (PV = nRT) for 17-18 year old students using React + Tailwind in a single HTML file.

## 🔑 Critical Requirements

### Must-Have Features
1. **Particle Animation**: Canvas-based visualization showing gas behavior
   - Particle count ∝ moles (n)
   - Particle speed ∝ temperature (T)
   - Container size ∝ volume (V)
   - Border color/thickness indicates pressure (P)

2. **Two Game Modes**:
   - **Practice**: Unlimited hints, no timer, step-by-step solutions
   - **Challenge**: Timed (90s), limited hints (3), scoring, streaks

3. **Three Difficulty Levels**:
   - Easy: Simple scenarios (balloons, bike tires) - 10 points
   - Medium: Practical apps (scuba, hot air balloon) - 20 points
   - Hard: Extreme conditions (weather balloon, industrial) - 30 points

4. **Smart Problem Generator**:
   - Mix which variable is unknown (P, V, T, n)
   - 30+ unique questions across three difficulties
   - Realistic values for each scenario type
   - 2% tolerance on answers

5. **Progressive Hint System**:
   - Hint 1: Which equation form to use
   - Hint 2: Show rearranged equation
   - Hint 3: Show substitution with numbers
   - Hint 4: Partial calculation (Practice only)

6. **Step-by-Step Solutions**:
   - Show formula
   - Show rearrangement
   - Show substitution
   - Show calculation
   - Compare to student answer

## 🎨 Visual Design

### Brand Colors
```css
--kvenno-orange: #f36b22;
--kvenno-orange-dark: #d95a1a;
```

### Layout Structure
```
Header: [Logo] [Title] [Nav Buttons]
Game Area:
  - Stats bar (score, streak, timer, difficulty)
  - Scenario card with context
  - Particle canvas (left) | Problem setup (right)
  - Input field with units
  - Action buttons (Submit, Hint, Show Solution)
```

### Responsive Breakpoints
- Mobile (<768px): Stacked layout, animation on top
- Tablet (768-1024px): Side-by-side starting
- Desktop (>1024px): Full side-by-side, max-width 1200px

## 📊 Scoring System

### Points Awarded
- Base: 10 (easy), 20 (medium), 30 (hard)
- No hints bonus: +10
- Speed bonus (<30s): +5
- Streak bonus: +5, +10, +15, +20 (consecutive)
- Perfect precision (±0.5%): +5

### Penalties
- Each hint: -10 points (Challenge mode)
- Wrong attempt: -5 points

## 🧪 Gas Law Calculations

### The Formula
```
PV = nRT
where R = 0.08206 L·atm/(mol·K)
```

### Value Ranges by Difficulty

**Easy:**
- P: 0.5-3.0 atm
- V: 0.5-10.0 L
- T: 250-350 K (-23°C to 77°C)
- n: 0.1-2.0 mol

**Medium:**
- P: 1-10 atm
- V: 5-50 L
- T: 200-400 K (-73°C to 127°C)
- n: 0.5-5.0 mol

**Hard:**
- P: 0.1-200 atm
- V: 1-500 L
- T: 150-500 K (-123°C to 227°C)
- n: 0.1-20 mol

## 🌐 Icelandic UI Text

### Essential Translations
```javascript
const translations = {
  // Modes
  practiceMode: "Æfingarhamur",
  challengeMode: "Keppnishamur",
  
  // Stats
  score: "Stig",
  streak: "Runa",
  time: "Tími",
  difficulty: "Erfiðleikastig",
  
  // Actions
  checkAnswer: "Athuga svar",
  nextQuestion: "Næsta spurning",
  showSolution: "Sýna lausn",
  hint: "Vísbending",
  tryAgain: "Reyndu aftur",
  
  // Feedback
  correct: "Rétt! Vel gert!",
  incorrect: "Rangt",
  timeout: "Tíminn rann út!",
  
  // Navigation
  instructions: "Leiðbeiningar",
  settings: "Stillingar",
  help: "Hjálp",
  back: "Til baka"
};
```

### Keep in English
- Chemical formulas (PV = nRT)
- Units (atm, L, K, mol)
- Variable names (P, V, T, n, R)

## 🎬 Example Scenarios

### Easy: Birthday Balloon 🎈
```
Icelandic: "Þú ert að blása upp blöðru fyrir afmælisveislu."
English: "You're blowing up a balloon for a birthday party."
Values: P=1.0 atm, T=310 K (37°C), n=0.15 mol, Find: V
```

### Medium: Scuba Diving 🤿
```
Icelandic: "Kafari fer niður á 20 metra dýpi."
English: "A scuba diver descends to 20 meters depth."
Values: P=4.0 atm, V=12 L, T=283 K (10°C), Find: n
```

### Hard: Weather Balloon 🎈☁️
```
Icelandic: "Veðurblöðra hækkar í 30 km hæð."
English: "A weather balloon rises to 30 km altitude."
Values: P=0.012 atm, V=500 L, n=2.5 mol, Find: T
```

## 🎮 Particle Animation Logic

### Canvas Drawing Pseudocode
```javascript
// Initialize particles based on n (moles)
numParticles = Math.floor(n * 50); // 50 particles per mole

// Update each frame
particles.forEach(particle => {
  // Speed proportional to √T (kinetic theory)
  speed = baseSpeed * Math.sqrt(T / 273);
  
  // Update position
  particle.x += particle.vx * speed;
  particle.y += particle.vy * speed;
  
  // Bounce off walls
  if (hitWall) particle.vx *= -1;
});

// Container size based on V
containerWidth = 200 + (V * 10); // scale factor

// Border style based on P
if (P < 1) borderColor = 'blue', borderWidth = 2;
else if (P < 5) borderColor = 'green', borderWidth = 3;
else borderColor = 'red', borderWidth = 5;
```

## 📱 Technical Stack

### Required CDN Links
```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
```

### File Type
Single HTML file: `gas-law-challenge.html`

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## ✅ Pre-Launch Checklist

### Functionality
- [ ] All 30+ questions generate correctly
- [ ] Calculations accurate (±2% tolerance)
- [ ] Particle animation smooth (60fps)
- [ ] Timer counts down correctly
- [ ] Hints reveal progressively
- [ ] Solutions show step-by-step
- [ ] Score/streak track properly

### UI/UX
- [ ] Mobile responsive (tested on phone)
- [ ] Kvenno colors applied consistently
- [ ] Icelandic text throughout
- [ ] Feedback animations work
- [ ] Buttons have clear states
- [ ] Accessibility labels present

### Educational Value
- [ ] Scenarios are realistic and engaging
- [ ] Explanations are clear and pedagogical
- [ ] Visual aids support understanding
- [ ] Difficulty progression feels natural
- [ ] Students can learn from mistakes

## 🚀 Deployment Command
```bash
# Upload to server
scp gas-law-challenge.html user@linode:/var/www/kvenno.app/games/

# Set permissions
chmod 644 gas-law-challenge.html
```

## 📞 Key Contact Info
- Student age: 17-18 years old
- School: Kvennaskólinn í Reykjavík
- Textbook: Chemistry, the Central Science (Brown et al.)
- Chapter: 10 (Gases)
- Website: kvenno.app

---

**Remember**: This is for LEARNING, not just testing. Every interaction should teach something!
