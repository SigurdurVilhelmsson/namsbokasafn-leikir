# Gas Law Challenge - Development Instructions for Claude Code

## Project Overview
Create an educational chemistry game for 3rd year students (ages 17-18) at Kvennaskólinn í Reykjavík. The game teaches the ideal gas law (PV = nRT) through interactive problem-solving with visual particle representations.

## Technical Stack
- **Frontend**: React 18 with Babel (standalone, in-browser JSX transformation)
- **Styling**: Tailwind CSS (CDN)
- **Deployment**: Single HTML file for Linode Ubuntu server
- **No build process required** - everything runs in the browser

## File Structure
Create a single file: `gas-law-challenge.html`

## Educational Context
Students are learning from "Chemistry, the Central Science" by Brown et al., Chapter 10 (Gases). They understand:
- The ideal gas law: PV = nRT
- Gas constant R = 0.08206 L·atm/(mol·K)
- Temperature conversions (°C to K)
- Pressure units (atm, kPa, mmHg)
- Volume units (L, mL)
- Mole concepts

## Kvenno Brand Guidelines
- Primary color: `--kvenno-orange: #f36b22`
- Dark variant: `--kvenno-orange-dark: #d95a1a`
- Use these colors for buttons, accents, and the logo
- White background for main content areas
- Gray (#f9fafb) for page background

## Core Game Mechanics

### 1. Problem Generation
Each problem presents:
- Three known variables from {P, V, T, n}
- One unknown variable to calculate
- Context-specific scenarios with realistic values

**Scenarios by Difficulty:**

**Easy (Beginner scenarios):**
- Birthday balloon inflation
- Bicycle tire pressure
- Soda bottle carbonation
- Simple laboratory experiments

Value ranges:
- P: 0.5-3.0 atm
- V: 0.5-10.0 L
- T: 250-350 K (also show in °C)
- n: 0.1-2.0 mol

**Medium (Practical applications):**
- Scuba diving (depth-related pressure changes)
- Hot air balloons
- Car airbags deployment
- Propane tanks

Value ranges:
- P: 1-10 atm
- V: 5-50 L
- T: 200-400 K
- n: 0.5-5.0 mol

**Hard (Extreme conditions):**
- Weather balloons at high altitude
- Compressed gas cylinders
- Deep sea diving
- Industrial processes

Value ranges:
- P: 0.1-200 atm
- V: 1-500 L
- T: 150-500 K
- n: 0.1-20 mol

### 2. Input System
- Provide an input field for the answer
- Show units clearly next to the input
- Accept reasonable precision (±2% tolerance)
- Validate input in real-time (show if format is valid)

### 3. Visual Particle Representation
Create an animated canvas showing gas particles:

**Particle Visualization Rules:**
- Number of particles ∝ number of moles (n)
- Particle speed ∝ temperature (T)
- Container size ∝ volume (V)
- Particle density shows pressure (P = nRT/V)

**Animation Details:**
- Use HTML5 Canvas (300x300px minimum)
- Particles as small circles (3-5px radius)
- Random motion with velocity based on temperature
- Particles bounce off container walls
- Container border thickness/color indicates pressure
  - Low pressure (<1 atm): thin, blue border
  - Normal pressure (1-5 atm): medium, green border
  - High pressure (>5 atm): thick, red border

**Visual Updates:**
- When T increases: particles move faster
- When V increases: container expands
- When n increases: more particles appear
- When P increases: particles move more densely

### 4. Calculation Display
After submission, show:
1. **Given values** clearly labeled
2. **Formula rearrangement** step-by-step
3. **Substitution** with actual numbers
4. **Calculation** process
5. **Final answer** with correct units
6. **Student's answer** for comparison

Example:
```
Given: P = 2.0 atm, V = 5.0 L, T = 300 K
Find: n (moles)

Step 1: Start with ideal gas law
PV = nRT

Step 2: Solve for n
n = PV/(RT)

Step 3: Substitute values
n = (2.0 atm)(5.0 L) / [(0.08206 L·atm/mol·K)(300 K)]

Step 4: Calculate
n = 10.0 / 24.618
n = 0.406 mol

Your answer: 0.41 mol ✓ (within acceptable range)
```

## Game Features

### 1. Two Game Modes

**Practice Mode:**
- Unlimited time
- Unlimited hints (no point penalty)
- Show solution button available
- Detailed step-by-step explanations
- No score tracking
- Focus: Learning and understanding

**Challenge Mode:**
- Time pressure (90 seconds per question)
- Limited hints (3 total, -10 points each)
- Score tracking
- Streak bonuses (consecutive correct: +5, +10, +15, +20 points)
- Difficulty progression
- Leaderboard integration

### 2. Hint System

**Hint 1:** Identify which form of the equation to use
- "You need to solve for [variable]. Rearrange PV = nRT to get [variable] alone."

**Hint 2:** Show the rearranged equation
- "The equation becomes: [rearranged formula]"

**Hint 3:** Show the substitution
- "Substitute the values: [variable] = [numbers with units]"

**Hint 4:** Show partial calculation (Practice mode only)
- "Numerator: [calculation]"
- "Denominator: [calculation]"

### 3. Scoring System

**Points awarded:**
- Easy question: 10 points
- Medium question: 20 points
- Hard question: 30 points

**Bonuses:**
- No hints used: +10 points
- Fast answer (<30s): +5 points
- Streak bonus: +5 to +20 points
- Perfect precision (±0.5%): +5 points

**Penalties:**
- Each hint: -10 points (Challenge mode)
- Each wrong attempt: -5 points

### 4. Progress Tracking

Display:
- Current streak
- Total score
- Questions answered
- Accuracy percentage
- Average time per question
- Best score in session

### 5. Question Bank
Generate at least 30 unique problems:
- 10 easy
- 12 medium
- 8 hard

Mix which variable is unknown (P, V, T, n) equally.

## UI Components

### Header
```
- Kvenno logo (top-left, links to kvenno.app)
- Game title: "Gas Law Challenge - Lögmálið um lofttegundir"
- Navigation buttons:
  - Back to games list
  - Instructions (Leiðbeiningar)
  - Settings (Stillingar)
```

### Main Game Area Layout
```
┌─────────────────────────────────────────┐
│  [Score] [Streak] [Timer] [Difficulty]  │
├─────────────────────────────────────────┤
│                                         │
│     [Scenario Description Card]         │
│                                         │
├──────────────┬──────────────────────────┤
│              │                          │
│   Particle   │    Problem Setup:        │
│  Animation   │    Given: P = 2.0 atm    │
│   (Canvas)   │           V = ? L        │
│              │           T = 300 K      │
│              │           n = 0.5 mol    │
│              │                          │
├──────────────┴──────────────────────────┤
│                                         │
│  Answer Input: [______] L [Submit]     │
│                                         │
│  [Hint Button] [Show Solution]          │
│                                         │
└─────────────────────────────────────────┘
```

### Scenario Cards
Each scenario should have:
- Title in Icelandic and English
- Relevant emoji/icon
- Brief 2-3 sentence context
- Real-world connection

Example scenarios:

**Easy: Birthday Balloon (Afmælisblöðra)**
"Þú ert að blása upp blöðru fyrir afmælisveislu. Loftið í andanum þínum er um 37°C. / You're blowing up a balloon for a birthday party. The air from your breath is about 37°C."

**Medium: Scuba Diving (Köfun)**
"Kafari fer niður á 20 metra dýpi þar sem þrýstingur er þrisvar sinnum meiri en við yfirborðið. / A scuba diver descends to 20 meters depth where pressure is three times surface pressure."

**Hard: Weather Balloon (Veðurblöðra)**
"Veðurblöðra hækkar í 30 km hæð þar sem þrýstingur er aðeins 1% af þrýstingi við sjávarmál. / A weather balloon rises to 30 km altitude where pressure is only 1% of sea-level pressure."

### Feedback Messages

**Correct Answer:**
- Celebratory animation (particle "celebration" - particles jump/bounce)
- Green checkmark ✓
- "Rétt! Vel gert!" (Correct! Well done!)
- Show earned points
- Show solution steps
- "Næsta spurning..." button

**Incorrect Answer:**
- Red X animation
- "Reyndu aftur" (Try again)
- Show what they calculated vs. what was expected
- Don't reveal answer immediately in Challenge mode
- In Practice mode: offer to show solution

**Timeout (Challenge mode):**
- Yellow warning
- "Tíminn rann út!" (Time ran out!)
- Show correct answer with explanation
- Continue to next question

## Responsive Design

### Mobile (< 768px)
- Single column layout
- Particle animation above problem setup
- Larger touch targets for buttons
- Simplified header (hamburger menu)

### Tablet (768px - 1024px)
- Two-column layout (animation left, problem right)
- Full header visible

### Desktop (> 1024px)
- Wider container (max-width: 1200px)
- Side-by-side layout optimized
- Larger particle animation canvas

## Accessibility

- High contrast text
- Clear button states (hover, active, disabled)
- Keyboard navigation support
- Screen reader labels (aria-labels)
- Focus indicators
- Error messages in clear language

## Icelandic Translation

### UI Text (Icelandic / English)
- "Æfingarhamur" / Practice Mode
- "Keppnishamur" / Challenge Mode
- "Stig" / Score
- "Runa" / Streak
- "Tími" / Time
- "Erfðleikastig" / Difficulty
- "Vísbending" / Hint
- "Sýna lausn" / Show Solution
- "Athuga svar" / Check Answer
- "Næsta spurning" / Next Question
- "Byrja að nýju" / Start Over
- "Leiðbeiningar" / Instructions
- "Stillingar" / Settings
- "Bestu skor" / High Scores

### Keep English:
- Chemical formulas (PV = nRT)
- Units (atm, L, K, mol)
- Variable names (P, V, T, n, R)
- Scientific terms in context (as per textbook)

## Particle Animation Implementation

### Canvas Setup
```javascript
const canvas = document.getElementById('gasCanvas');
const ctx = canvas.getContext('2d');

class Particle {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = 4;
    this.color = '#3b82f6'; // blue
  }
  
  update(containerWidth, containerHeight, temperature) {
    // Update position
    this.x += this.vx * (temperature / 300); // scale by temperature
    this.y += this.vy * (temperature / 300);
    
    // Bounce off walls
    if (this.x - this.radius < 0 || this.x + this.radius > containerWidth) {
      this.vx *= -1;
      this.x = Math.max(this.radius, Math.min(containerWidth - this.radius, this.x));
    }
    if (this.y - this.radius < 0 || this.y + this.radius > containerHeight) {
      this.vy *= -1;
      this.y = Math.max(this.radius, Math.min(containerHeight - this.radius, this.y));
    }
  }
  
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
```

### Animation Loop
- Use requestAnimationFrame
- Update particle positions based on temperature
- Adjust container size based on volume
- Update border color/thickness based on pressure
- Smooth transitions when values change

## State Management

Use React state to track:
```javascript
const [gameState, setGameState] = useState({
  mode: 'menu', // 'menu', 'practice', 'challenge'
  difficulty: 'easy', // 'easy', 'medium', 'hard'
  currentQuestion: null,
  score: 0,
  streak: 0,
  questionNumber: 0,
  hintsUsed: 0,
  hintsRemaining: 3,
  showHint: false,
  hintLevel: 0,
  timeRemaining: 90,
  userAnswer: '',
  isCorrect: null,
  showSolution: false,
  feedback: null,
  startTime: null,
});
```

## Game Flow

1. **Menu Screen**
   - Welcome message
   - Explain game concept
   - Two large buttons: "Æfingarhamur" / "Keppnishamur"
   - Instructions link

2. **Difficulty Selection** (Challenge mode only)
   - Three buttons: Easy, Medium, Hard
   - Description of each level
   - Can skip (auto-progression)

3. **Game Play**
   - Show scenario
   - Display known values
   - Animate particles
   - Wait for answer
   - Provide feedback
   - Show solution
   - Load next question

4. **End Game** (Challenge mode)
   - After 10 questions or quit
   - Show final score
   - Show statistics
   - Leaderboard (if implemented)
   - "Play Again" button

## Testing Scenarios

Create test cases for:
1. All four unknowns (P, V, T, n)
2. Extreme values (very small/large)
3. Unit conversions (°C to K)
4. Precision testing (±2% acceptance)
5. Mobile responsiveness
6. Timer accuracy
7. Hint system progression
8. Particle animation at different conditions

## File Delivery

Create `gas-law-challenge.html` that:
- Works standalone (no external dependencies except CDN links)
- Includes all inline CSS
- Contains complete React app in script tag
- Is production-ready for deployment
- Has no console errors
- Includes helpful code comments

## Code Quality Standards

- **Clean, readable code** with clear variable names
- **Comprehensive comments** explaining game logic
- **Error handling** for edge cases
- **Consistent formatting** (2-space indentation)
- **Modular components** (separate particle system, UI components)
- **Performance optimized** (efficient animation loop)
- **Mobile-first** responsive design

## Additional Features to Consider

1. **Sound effects** (optional, togglable)
   - Correct answer chime
   - Wrong answer buzz
   - Tick-tock for low time

2. **Keyboard shortcuts**
   - Enter to submit
   - H for hint
   - N for next question

3. **Data persistence** (localStorage)
   - Save high scores
   - Remember mode preference
   - Track progress over sessions

4. **Export results**
   - Share score on social media
   - Print summary for teacher

## Deployment Notes

To deploy on Linode:
1. Upload `gas-law-challenge.html` to web directory
2. No compilation or build step needed
3. Ensure proper file permissions (644)
4. Test on mobile devices
5. Link from main kvenno.app games page

## Success Criteria

The game is successful if:
- Students can solve ideal gas law problems accurately
- Visual feedback helps understanding of gas behavior
- Game is engaging and educational
- No technical errors or bugs
- Responsive on all devices
- Loads quickly (<2 seconds)
- Matches Kvenno brand aesthetic
- Teachers can track student progress

---

## Implementation Checklist for Claude Code

- [ ] Set up HTML structure with React and Tailwind CDN links
- [ ] Create Kvenno-branded header with navigation
- [ ] Implement game state management
- [ ] Build question generation system with 30+ problems
- [ ] Create particle animation system with Canvas
- [ ] Implement input validation and answer checking
- [ ] Build hint system with progressive help
- [ ] Create feedback animations and messages
- [ ] Add timer for Challenge mode
- [ ] Implement scoring and streak tracking
- [ ] Design responsive layout (mobile-first)
- [ ] Add Icelandic translations throughout
- [ ] Create instructions/help modal
- [ ] Test all calculations and edge cases
- [ ] Add solution display with step-by-step breakdown
- [ ] Implement scenario descriptions for context
- [ ] Polish animations and transitions
- [ ] Test on multiple devices and browsers
- [ ] Add accessibility features
- [ ] Final QA and bug fixes

---

## Example Question Structure

```javascript
{
  id: 1,
  scenario: {
    title: "Afmælisblöðra / Birthday Balloon",
    icon: "🎈",
    description: "Þú ert að blása upp blöðru fyrir afmælisveislu. Loftið í andanum þínum er um 37°C.",
    descriptionEn: "You're blowing up a balloon for a birthday party. The air from your breath is about 37°C."
  },
  difficulty: "easy",
  given: {
    P: { value: 1.0, unit: "atm" },
    T: { value: 310, unit: "K", displayCelsius: 37 },
    n: { value: 0.15, unit: "mol" }
  },
  find: "V",
  answer: {
    value: 3.82,
    unit: "L",
    tolerance: 0.08, // ±2%
    calculation: "V = nRT/P = (0.15)(0.08206)(310)/(1.0) = 3.82 L"
  }
}
```

## Visual Design References

Colors:
- Primary: #f36b22 (Kvenno Orange)
- Success: #22c55e (Green)
- Error: #ef4444 (Red)
- Warning: #eab308 (Yellow)
- Info: #3b82f6 (Blue)

Animations:
- Smooth transitions (0.3s ease)
- Particle physics (realistic motion)
- Feedback pulses (celebrate correct)
- Shake animation (incorrect)

Typography:
- Headers: Bold, 1.5-2rem
- Body: Regular, 1rem
- Chemical formulas: Monospace
- Numbers: Tabular figures

---

**Ready for Claude Code to implement!** 🚀

This specification provides everything needed to create a polished, educational, and engaging gas law game that matches the quality of your existing chemistry games at kvenno.app.
