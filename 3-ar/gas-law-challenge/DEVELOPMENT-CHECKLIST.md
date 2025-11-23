# Gas Law Challenge - Development Checklist

## 📋 Progress Tracking

Use this checklist to track your development progress. Check off items as you complete them.

---

## Phase 1: Foundation & Setup ✅

### File Structure
- [x] Starter template provided (`gas-law-challenge-starter-template.html`)
- [ ] Template reviewed and understood
- [ ] Development environment tested
- [ ] Canvas rendering confirmed working

### Dependencies
- [x] React 18 CDN configured
- [x] Babel standalone configured
- [x] Tailwind CSS CDN configured
- [x] All CDN links tested and loading

### Brand & Styling
- [x] Kvenno colors applied (--kvenno-orange)
- [x] Header with navigation
- [x] Responsive breakpoints defined
- [x] Animation keyframes defined
- [ ] All custom styles tested

---

## Phase 2: Question Bank & Calculations 🔢

### Question Generation
- [ ] Question data structure defined
- [ ] Easy questions created (10 minimum)
  - [ ] Finding P (2 questions)
  - [ ] Finding V (2 questions)
  - [ ] Finding T (3 questions)
  - [ ] Finding n (3 questions)
- [ ] Medium questions created (12 minimum)
  - [ ] Finding P (3 questions)
  - [ ] Finding V (3 questions)
  - [ ] Finding T (3 questions)
  - [ ] Finding n (3 questions)
- [ ] Hard questions created (8 minimum)
  - [ ] Finding P (2 questions)
  - [ ] Finding V (2 questions)
  - [ ] Finding T (2 questions)
  - [ ] Finding n (2 questions)

### Scenario Descriptions
- [ ] Easy scenario descriptions written (Icelandic + English)
- [ ] Medium scenario descriptions written (Icelandic + English)
- [ ] Hard scenario descriptions written (Icelandic + English)
- [ ] Appropriate emojis/icons selected
- [ ] Real-world context provided for each

### Calculation Engine
- [ ] Gas constant R defined (0.08206 L·atm/(mol·K))
- [ ] Temperature conversion (°C → K) implemented
- [ ] Solve for P function implemented
- [ ] Solve for V function implemented
- [ ] Solve for T function implemented
- [ ] Solve for n function implemented
- [ ] Answer validation function (±2% tolerance)
- [ ] Edge case handling (very small/large values)
- [ ] Unit consistency checks

### Manual Verification
- [ ] Test calculation: P = 1.0 atm, V = 5.0 L, T = 300 K → Find n
- [ ] Test calculation: P = 2.5 atm, n = 0.5 mol, T = 273 K → Find V
- [ ] Test calculation: V = 10.0 L, n = 1.0 mol, P = 0.5 atm → Find T
- [ ] Test calculation: V = 3.0 L, T = 350 K, n = 0.2 mol → Find P
- [ ] Verify all calculations with external calculator

---

## Phase 3: Game Mechanics 🎮

### State Management
- [ ] Game state object defined
- [ ] Menu screen state implemented
- [ ] Playing screen state implemented
- [ ] Results screen state implemented
- [ ] Mode switching (Practice/Challenge) works
- [ ] Question progression logic
- [ ] Answer submission handling
- [ ] Feedback system implemented

### Practice Mode
- [ ] No timer (confirmed)
- [ ] Unlimited hints (no point penalty)
- [ ] Show solution button works
- [ ] Step-by-step explanations display
- [ ] No score tracking (or optional)
- [ ] Focus on learning confirmed

### Challenge Mode
- [ ] 90-second countdown timer implemented
- [ ] Timer updates every second
- [ ] Timer triggers timeout action
- [ ] Limited hints (3 total)
- [ ] Hint penalty (-10 points) applied
- [ ] Score tracking implemented
- [ ] Streak tracking implemented
- [ ] Difficulty progression (optional auto-advance)

### Scoring System
- [ ] Base points: Easy (10), Medium (20), Hard (30)
- [ ] No hints bonus (+10 points)
- [ ] Speed bonus (<30s = +5 points)
- [ ] Streak bonuses (+5, +10, +15, +20)
- [ ] Perfect precision bonus (±0.5% = +5 points)
- [ ] Wrong attempt penalty (-5 points)
- [ ] Hint penalty (-10 points, Challenge mode)
- [ ] Score display updates correctly
- [ ] Streak resets on wrong answer
- [ ] Streak displays with 🔥 emoji

---

## Phase 4: Particle Animation System 🎨

### Particle Class
- [ ] Particle class defined
- [ ] Constructor with position and velocity
- [ ] Update method (position, wall bouncing)
- [ ] Draw method (circle with glow effect)
- [ ] Speed based on temperature (∝ √T)

### Canvas Setup
- [ ] Canvas element created (300x300 or larger)
- [ ] 2D context obtained
- [ ] Canvas ref connected to React
- [ ] Canvas resizes responsively

### Particle Management
- [ ] Particle count based on moles (n × 50)
- [ ] Particles initialized randomly in container
- [ ] Particle array updates when question changes
- [ ] Old particles cleared on new question

### Visual Effects
- [ ] Container size varies with volume (V)
- [ ] Border color based on pressure:
  - [ ] Blue (P < 1 atm)
  - [ ] Green (1-5 atm)
  - [ ] Red (P > 5 atm)
- [ ] Border thickness based on pressure
- [ ] Particle color customizable (white/blue)
- [ ] Glow effect on particles (shadow blur)

### Animation Loop
- [ ] requestAnimationFrame implemented
- [ ] Smooth animation (60fps target)
- [ ] Particles bounce realistically off walls
- [ ] Animation pauses when not playing
- [ ] Animation cleanup on unmount
- [ ] Performance optimized (no lag)

### Visual Testing
- [ ] Low moles (n=0.1): few particles
- [ ] High moles (n=5.0): many particles
- [ ] Low temperature (T=200K): slow movement
- [ ] High temperature (T=400K): fast movement
- [ ] Small volume: tight container
- [ ] Large volume: expanded container
- [ ] Low pressure: blue border, thin
- [ ] High pressure: red border, thick

---

## Phase 5: Hint & Solution Systems 💡

### Hint System
- [ ] Hint state management (level, show/hide)
- [ ] Hint button implemented
- [ ] Hint level 1: Identify equation form
- [ ] Hint level 2: Show rearranged formula
- [ ] Hint level 3: Show substitution
- [ ] Hint level 4: Partial calculation (Practice only)
- [ ] Hint display styling (yellow background)
- [ ] Hint counter updates correctly
- [ ] Hint limits enforced (Challenge mode)
- [ ] Hint progression makes sense

### Solution Display
- [ ] Show solution button implemented
- [ ] Solution visibility toggle
- [ ] Step 1: Display given values clearly
- [ ] Step 2: Show formula rearrangement
- [ ] Step 3: Show number substitution
- [ ] Step 4: Show calculation steps
- [ ] Step 5: Show final answer with units
- [ ] Step 6: Compare to student answer
- [ ] Solution styling (clear, readable)
- [ ] Solution available after wrong answers

### Educational Value
- [ ] Solutions teach, not just show answer
- [ ] Explanations are clear for 17-18 year olds
- [ ] Mathematical steps are logical
- [ ] Units are tracked throughout
- [ ] Common mistakes addressed in hints

---

## Phase 6: User Interface 🖥️

### Menu Screen
- [ ] Welcome message and game title
- [ ] Game description (Icelandic + English)
- [ ] Practice mode button
- [ ] Challenge mode button
- [ ] Button hover effects
- [ ] Instructions link (optional)
- [ ] Visual appeal (emojis, colors)

### Playing Screen - Layout
- [ ] Header with stats bar
- [ ] Two-column layout (desktop)
- [ ] Left column: Particle canvas
- [ ] Right column: Problem & input
- [ ] Single column on mobile (stacked)
- [ ] Responsive breakpoints work
- [ ] No overflow or scrolling issues

### Playing Screen - Scenario Card
- [ ] Scenario title (Icelandic)
- [ ] Scenario title (English subtitle)
- [ ] Scenario emoji/icon
- [ ] Scenario description (2-3 sentences)
- [ ] Gradient background
- [ ] Centered text
- [ ] Visually appealing

### Playing Screen - Problem Setup
- [ ] "Given:" label
- [ ] Display all known variables
- [ ] Show values with units
- [ ] Temperature shows both K and °C
- [ ] "Find:" label
- [ ] Highlight unknown variable
- [ ] Clear, organized layout

### Playing Screen - Input Area
- [ ] Input label: "Your Answer:"
- [ ] Number input field
- [ ] Unit display next to input
- [ ] Proper input validation (numbers only)
- [ ] Clear placeholder (e.g., "0.00")
- [ ] Large enough for touch (mobile)

### Playing Screen - Action Buttons
- [ ] Check Answer button (purple, prominent)
- [ ] Hint button (yellow)
- [ ] Show Solution button (blue, conditional)
- [ ] Next Question button (after correct)
- [ ] Button disabled states
- [ ] Button hover effects
- [ ] Mobile-friendly size

### Results Screen (Challenge Mode)
- [ ] Final score display
- [ ] Statistics summary:
  - [ ] Questions answered
  - [ ] Accuracy percentage
  - [ ] Average time
  - [ ] Best streak
- [ ] Play Again button
- [ ] Return to Menu button
- [ ] Share score option (optional)

### Feedback Messages
- [ ] Correct answer: Green, checkmark, celebration
- [ ] Incorrect answer: Red, X, shake animation
- [ ] Timeout: Yellow, warning message
- [ ] Feedback appears prominently
- [ ] Auto-dismisses or has dismiss button
- [ ] Clear, encouraging messages

---

## Phase 7: Responsive Design 📱

### Mobile (<768px)
- [ ] Single column layout
- [ ] Canvas above problem (stacked)
- [ ] Canvas scales down appropriately
- [ ] Text remains readable
- [ ] Buttons large enough for touch
- [ ] No horizontal scrolling
- [ ] Header simplified or hamburger menu
- [ ] Stats bar wraps nicely

### Tablet (768px - 1024px)
- [ ] Two-column layout begins
- [ ] Canvas and problem side-by-side
- [ ] Comfortable spacing
- [ ] All elements visible without scroll
- [ ] Touch targets adequate

### Desktop (>1024px)
- [ ] Full two-column layout
- [ ] Max-width: 1200px container
- [ ] Optimal canvas size
- [ ] Readable text sizes
- [ ] Hover effects functional
- [ ] Best visual experience

### Cross-Device Testing
- [ ] iPhone (Safari iOS)
- [ ] Android phone (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari
- [ ] Desktop Edge

---

## Phase 8: Icelandic Translations 🇮🇸

### UI Text Translated
- [ ] "Æfingarhamur" (Practice Mode)
- [ ] "Keppnishamur" (Challenge Mode)
- [ ] "Stig" (Score)
- [ ] "Runa" (Streak)
- [ ] "Tími" (Time)
- [ ] "Erfiðleikastig" (Difficulty)
- [ ] "Athuga svar" (Check Answer)
- [ ] "Næsta spurning" (Next Question)
- [ ] "Sýna lausn" (Show Solution)
- [ ] "Vísbending" (Hint)
- [ ] "Reyndu aftur" (Try Again)
- [ ] "Rétt! Vel gert!" (Correct! Well done!)
- [ ] "Rangt" (Incorrect)
- [ ] "Tíminn rann út!" (Time ran out!)
- [ ] "Leiðbeiningar" (Instructions)
- [ ] "Hjálp" (Help)
- [ ] "Til baka" (Back)
- [ ] "Auðvelt" (Easy)
- [ ] "Miðlungs" (Medium)
- [ ] "Erfitt" (Hard)

### English Retained
- [ ] Chemical formulas (PV = nRT)
- [ ] Units (atm, L, K, mol)
- [ ] Variable names (P, V, T, n, R)
- [ ] Scientific terms as in textbook
- [ ] Scenario subtitles (for clarity)

---

## Phase 9: Polish & Animations ✨

### Visual Animations
- [ ] Smooth transitions (0.3s ease)
- [ ] Pulse animation on correct answer
- [ ] Shake animation on incorrect answer
- [ ] Particle "celebration" on success
- [ ] Button hover transitions
- [ ] Modal fade in/out (if applicable)
- [ ] Loading animation (if needed)

### User Feedback
- [ ] Clear visual states (hover, active, disabled)
- [ ] Immediate response to clicks
- [ ] Progress indicators where needed
- [ ] Error messages are helpful
- [ ] Success messages are encouraging
- [ ] Timeout warnings are clear

### Performance
- [ ] No console errors or warnings
- [ ] Canvas animation runs at 60fps
- [ ] Page loads in <2 seconds
- [ ] Smooth on mobile devices
- [ ] No memory leaks
- [ ] Efficient re-renders

---

## Phase 10: Accessibility ♿

### Keyboard Navigation
- [ ] Tab order is logical
- [ ] Enter submits answer
- [ ] Escape closes modals (if any)
- [ ] All interactive elements focusable
- [ ] Focus indicators visible
- [ ] Keyboard shortcuts documented

### Screen Readers
- [ ] ARIA labels on buttons
- [ ] Alt text on icons (if images used)
- [ ] Form labels properly associated
- [ ] Live regions for dynamic content
- [ ] Meaningful heading structure

### Visual Accessibility
- [ ] High contrast text (WCAG AA)
- [ ] Color not sole indicator
- [ ] Text readable at all sizes
- [ ] Focus indicators clear
- [ ] Error messages descriptive

---

## Phase 11: Testing & Quality Assurance 🧪

### Calculation Testing
- [ ] Test all 30+ questions manually
- [ ] Verify each answer with calculator
- [ ] Test edge cases (very small values)
- [ ] Test edge cases (very large values)
- [ ] Test temperature conversions
- [ ] Verify 2% tolerance works correctly
- [ ] Test scientific notation handling

### Game Flow Testing
- [ ] Menu → Practice mode → Playing works
- [ ] Menu → Challenge mode → Playing works
- [ ] Question progression works (1→2→3...)
- [ ] Correct answer → Next question flows
- [ ] Incorrect answer → Try again works
- [ ] Timeout → Next question flows
- [ ] Complete game → Results screen works

### Mode-Specific Testing
- [ ] Practice: Unlimited time confirmed
- [ ] Practice: Unlimited hints confirmed
- [ ] Practice: No scoring confirmed
- [ ] Challenge: Timer counts down correctly
- [ ] Challenge: Limited hints enforced
- [ ] Challenge: Scoring accurate
- [ ] Challenge: Streak tracking accurate

### Animation Testing
- [ ] Particles move smoothly
- [ ] Particles bounce correctly
- [ ] Particle count matches moles
- [ ] Particle speed matches temperature
- [ ] Container size matches volume
- [ ] Border color matches pressure
- [ ] No animation lag or stutter
- [ ] Animation stops when not playing

### Browser Testing
- [ ] Chrome desktop (latest)
- [ ] Firefox desktop (latest)
- [ ] Safari desktop (latest)
- [ ] Edge desktop (latest)
- [ ] Chrome mobile Android
- [ ] Safari mobile iOS
- [ ] No browser-specific bugs

### Responsive Testing
- [ ] iPhone SE (375px width)
- [ ] iPhone 12/13 (390px width)
- [ ] iPad (768px width)
- [ ] Desktop 1920px width
- [ ] No layout breaks at any width
- [ ] All features work on all devices

---

## Phase 12: Final Polish & Deployment 🚀

### Code Quality
- [ ] Code is clean and readable
- [ ] Meaningful variable names
- [ ] Functions are well-commented
- [ ] No unused code or imports
- [ ] Consistent formatting (2-space indent)
- [ ] No console.log statements left
- [ ] Error handling implemented

### Documentation
- [ ] README included (if separate files)
- [ ] Code comments explain logic
- [ ] Complex calculations documented
- [ ] Known issues listed (if any)

### Final Checklist
- [ ] All features from spec implemented
- [ ] No known bugs remaining
- [ ] Performance is acceptable
- [ ] Educational value confirmed
- [ ] Matches Kvenno brand
- [ ] Ready for student use

### Pre-Deployment
- [ ] File size reasonable (<500KB)
- [ ] All CDN links working
- [ ] No external dependencies broken
- [ ] File can run standalone
- [ ] Tested on production-like environment

### Deployment
- [ ] File uploaded to server
- [ ] Permissions set (chmod 644)
- [ ] URL accessible
- [ ] Linked from main games page
- [ ] Tested live on server
- [ ] Mobile tested on server
- [ ] Shared with Siggi for review

---

## 📊 Progress Summary

**Total Items:** 250+
**Completed:** ___ / 250+
**In Progress:** ___
**Blocked:** ___

---

## 🎯 Success Criteria

Before marking complete, verify:
- ✅ All 30+ questions work perfectly
- ✅ Particle animation is smooth and educational
- ✅ Both game modes function as specified
- ✅ Mobile-responsive on real devices
- ✅ No console errors
- ✅ Calculations are accurate
- ✅ Educational value is clear
- ✅ Matches Kvenno brand aesthetic
- ✅ Students can learn from the game
- ✅ Teachers would use this in class

---

## 💡 Notes & Issues

Use this space to track issues or decisions:

```
Issue 1: [Description]
Solution: [How resolved]

Issue 2: [Description]
Status: [In progress / Blocked / Resolved]

Decision 1: [What was decided and why]

Performance note: [Any optimization notes]
```

---

**Good luck! You've got this! 🚀🧪**
