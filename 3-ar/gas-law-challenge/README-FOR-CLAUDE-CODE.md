# Gas Law Challenge - Complete Build Instructions

## 📦 What You've Been Given

You have **three essential files** to build the Gas Law Challenge game:

1. **`gas-law-challenge-instructions.md`** - Comprehensive 100+ page specification
   - Complete game mechanics
   - Educational requirements
   - Visual design specs
   - All features in detail

2. **`gas-law-challenge-quick-reference.md`** - Executive summary
   - Must-have features at a glance
   - Key requirements
   - Quick lookup for critical info

3. **`gas-law-challenge-starter-template.html`** - Working foundation
   - Pre-configured structure
   - Kvenno branding applied
   - Particle system skeleton
   - React + Tailwind setup complete

## 🎯 Your Mission

Build a **polished, educational chemistry game** for 17-18 year old students that teaches the ideal gas law (PV = nRT) through interactive problem-solving with real-time particle visualization.

## 🏗️ Build Approach

### Phase 1: Foundation (Use Starter Template)
The starter template provides:
- ✅ HTML structure with CDN links
- ✅ Kvenno brand styling
- ✅ Header and navigation
- ✅ Basic React component structure
- ✅ Particle class skeleton
- ✅ Canvas setup
- ✅ Menu screen framework

**Start here** and expand upon it!

### Phase 2: Core Mechanics (30+ Questions)

**Priority 1: Question Bank**
```javascript
// Create comprehensive question generator
const generateQuestions = () => {
  // 10 easy questions
  // 12 medium questions
  // 8 hard questions
  
  // Mix which variable is unknown:
  // - 8 questions finding P
  // - 8 questions finding V
  // - 8 questions finding T
  // - 6 questions finding n
  
  // Each with realistic scenario context
};
```

**Priority 2: Calculation Engine**
```javascript
// Implement PV = nRT solver
const solveGasLaw = (given, findVar) => {
  // Rearrange formula based on unknown
  // Calculate with R = 0.08206 L·atm/(mol·K)
  // Return answer with proper units
  // Show step-by-step work
};
```

**Priority 3: Answer Validation**
```javascript
const checkAnswer = (userAnswer, correctAnswer, tolerance = 0.02) => {
  // Compare within ±2% tolerance
  // Provide specific feedback
  // Update score/streak
  // Show calculation steps
};
```

### Phase 3: Visual Features

**Particle Animation (Critical!)**
- Particle count proportional to moles (n)
- Particle speed proportional to √temperature (T)
- Container size proportional to volume (V)
- Border color/thickness based on pressure (P)
  - Blue border (thin): P < 1 atm
  - Green border (medium): 1-5 atm
  - Red border (thick): P > 5 atm

**Canvas Updates:**
```javascript
// Update particles based on current question
useEffect(() => {
  if (currentQuestion) {
    // Recreate particles based on n
    const numParticles = Math.floor(currentQuestion.given.n.value * 50);
    
    // Initialize particle positions
    // Set container dimensions based on V
    // Apply border style based on P
    // Start animation loop
  }
}, [currentQuestion]);
```

### Phase 4: Game Modes

**Practice Mode Features:**
- No timer
- Unlimited hints (no penalty)
- Show solution button
- Step-by-step explanations
- Focus on learning

**Challenge Mode Features:**
- 90-second timer per question
- 3 hints total (-10 points each)
- Score tracking
- Streak bonuses
- Progressive difficulty

### Phase 5: Hint & Solution Systems

**Progressive Hints:**
```javascript
const getHint = (level, question) => {
  switch(level) {
    case 1: return `Solve for ${question.find}. Rearrange PV = nRT.`;
    case 2: return `Use: ${getRearrangedFormula(question.find)}`;
    case 3: return `Substitute: ${getSubstitution(question)}`;
    case 4: return `Calculate: ${getPartialCalculation(question)}`;
  }
};
```

**Solution Display:**
Show complete work:
1. Given values
2. Formula rearrangement
3. Substitution with numbers
4. Step-by-step calculation
5. Final answer with units
6. Comparison to student answer

### Phase 6: Polish & Testing

**Must Test:**
- [ ] All 30+ questions generate correctly
- [ ] Calculations accurate (test edge cases)
- [ ] Particle animation smooth at 60fps
- [ ] Mobile responsive (test on phone)
- [ ] Timer counts down correctly
- [ ] Hints reveal progressively
- [ ] Score/streak calculations
- [ ] Scenario descriptions display properly
- [ ] Unit conversions (°C to K)

**Browser Testing:**
- Chrome (desktop & mobile)
- Firefox
- Safari (iOS & macOS)
- Edge

## 📋 Implementation Checklist

### Essential Features (Must Have)
- [x] Starter template provided
- [ ] 30+ question bank created
- [ ] PV = nRT calculation engine
- [ ] Answer validation (±2% tolerance)
- [ ] Particle animation system
- [ ] Practice mode implemented
- [ ] Challenge mode implemented
- [ ] Progressive hint system
- [ ] Step-by-step solutions
- [ ] Scenario descriptions
- [ ] Mobile responsive design
- [ ] Timer for Challenge mode
- [ ] Scoring system
- [ ] Streak tracking

### Enhanced Features (Should Have)
- [ ] Temperature conversions (°C ↔ K)
- [ ] Visual feedback animations
- [ ] Particle "celebration" on correct answer
- [ ] Smooth transitions between questions
- [ ] Help/Instructions modal
- [ ] Settings panel
- [ ] Keyboard shortcuts (Enter to submit, H for hint)
- [ ] Sound effects (toggleable)

### Optional Features (Nice to Have)
- [ ] LocalStorage for high scores
- [ ] Leaderboard system
- [ ] Share score feature
- [ ] Export results to PDF
- [ ] Multiple language support
- [ ] Accessibility enhancements (ARIA labels)
- [ ] Dark mode toggle

## 🎨 Design Requirements

**Must Match Kvenno Brand:**
- Orange primary: `#f36b22`
- Orange hover: `#d95a1a`
- Clean, modern interface
- Consistent with existing games

**Color Scheme:**
- Primary actions: Kvenno orange
- Success: Green (#22c55e)
- Error: Red (#ef4444)
- Warning: Yellow (#eab308)
- Info: Blue (#3b82f6)

**Typography:**
- Headers: Bold, large (1.5-2rem)
- Body: Regular (1rem)
- Chemical formulas: Clear, prominent
- Numbers: Tabular (aligned)

**Animations:**
- Smooth transitions (0.3s ease)
- Particle physics (realistic bouncing)
- Success pulse animation
- Error shake animation

## 🧪 Example Scenarios to Include

### Easy Scenarios (10 questions)
1. 🎈 Birthday Balloon - inflating at room temp
2. 🚴 Bicycle Tire - checking pressure
3. 🥤 Soda Bottle - carbonation pressure
4. 🧪 Lab Experiment - standard conditions
5. 🎈 Party Balloon - helium vs air
6. 🏀 Basketball - pumping air
7. 🚗 Car Tire - seasonal changes
8. 🧯 Fire Extinguisher - contents
9. 🎈 Mylar Balloon - staying inflated
10. 🌡️ Temperature Effect - warming gas

### Medium Scenarios (12 questions)
1. 🤿 Scuba Tank - depth effects
2. 🎈 Hot Air Balloon - heating to rise
3. 💥 Car Airbag - rapid inflation
4. 🏔️ Mountain Climb - altitude effects
5. ⛽ Propane Tank - BBQ usage
6. 🌊 Underwater Pressure - submarines
7. 🚀 Rocket Fuel - compression
8. ❄️ Cryogenic Storage - ultra-cold
9. 🏥 Oxygen Tank - medical use
10. 🔥 Bunsen Burner - gas flow
11. 🎿 Ski Lift - altitude pressure
12. 🌡️ Thermal Expansion - heating systems

### Hard Scenarios (8 questions)
1. 🎈☁️ Weather Balloon - 30km altitude
2. 🏭 Industrial Cylinder - high pressure
3. 🌊 Deep Sea Dive - extreme depth
4. 🚀 Space Suit - life support
5. ⚗️ Chemical Synthesis - industrial scale
6. 🔬 Supercritical Fluid - extreme conditions
7. 🏭 Ammonia Synthesis - Haber process
8. ❄️ Liquid Nitrogen - phase changes

## 📝 Key Educational Notes

**Students Should Learn:**
1. How to rearrange PV = nRT for any variable
2. When to convert °C to K (always!)
3. Proper unit management
4. Real-world applications of gas laws
5. Relationship between variables:
   - Pressure ↑ when Volume ↓ (Boyle's Law)
   - Pressure ↑ when Temperature ↑ (Gay-Lussac)
   - Volume ↑ when Temperature ↑ (Charles's Law)
   - All proportional to moles (Avogadro)

**Common Student Mistakes to Address:**
- Forgetting to convert °C to K
- Wrong unit conversions
- Rounding errors
- Using wrong gas constant R value
- Not understanding which variable to solve for

## 🚀 Deployment

**File to Create:**
`gas-law-challenge.html` - Single, self-contained file

**Upload to Server:**
```bash
scp gas-law-challenge.html user@linode:/var/www/kvenno.app/games/
chmod 644 gas-law-challenge.html
```

**Link from Main Site:**
Add to games list at `kvenno.app/games`

## ✅ Definition of Done

The game is **complete** when:

1. **Functional Requirements:**
   - All 30+ questions work correctly
   - Both game modes function properly
   - Particle animation runs smoothly
   - Calculations are accurate
   - Hints progress logically
   - Solutions show step-by-step work

2. **Educational Requirements:**
   - Students can learn from mistakes
   - Scenarios are engaging and realistic
   - Explanations are clear and pedagogical
   - Visual aids enhance understanding

3. **Technical Requirements:**
   - No console errors
   - Works on all modern browsers
   - Mobile responsive (tested)
   - Loads quickly (<2 seconds)
   - Clean, commented code

4. **Design Requirements:**
   - Matches Kvenno brand
   - Consistent with existing games
   - Professional appearance
   - Smooth animations
   - Clear feedback

## 🎓 Educational Context Reminder

**Students:**
- Age: 17-18 years old
- School: Kvennaskólinn í Reykjavík
- Level: 3rd year chemistry
- Textbook: Chemistry, the Central Science (Brown et al.)
- Chapter: 10 (Gases)
- Background: Understand basic chemistry, algebra, unit conversions

**Teacher (Siggi):**
- Wants engaging, visual learning tools
- Values accuracy and pedagogical quality
- Needs Icelandic UI but English chemical terms
- Appreciates clean, maintainable code
- Plans to deploy on kvenno.app

## 💡 Pro Tips for Claude Code

1. **Start with the template** - It's already configured with everything you need
2. **Build incrementally** - Get one question working perfectly before generating all 30
3. **Test calculations manually** - Verify PV = nRT math with a calculator
4. **Watch the particle animation** - Make sure it's smooth and responsive
5. **Think like a student** - What would confuse them? What would help?
6. **Keep it simple first** - Core features before polish
7. **Comment your code** - Siggi may modify it later
8. **Test on mobile** - Many students use phones
9. **Make it fun** - Learning chemistry should be engaging!
10. **Ask questions** - If unsure about a feature, clarify before building

## 🎯 Success Metrics

**The game succeeds if:**
- Students say "that was actually fun!"
- Students understand gas laws better after playing
- Teachers want to use it in their classes
- Siggi can deploy it without major revisions
- Students voluntarily practice outside class

## 📞 Questions?

If you're unsure about any requirement:
1. Check the comprehensive instructions document
2. Refer to the quick reference guide
3. Look at the starter template comments
4. Consider what would help students learn best

---

**Remember: This is a learning tool first, a game second. Every feature should teach something!**

Good luck building! 🚀🧪
