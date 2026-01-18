# Chemistry Game Review Prompt — Monorepo Edition

## Context

I am Siggi, a chemistry teacher at Kvennaskólinn í Reykjavík (Icelandic secondary school, students aged 15-19). My textbook is "Chemistry: The Central Science" by Brown et al.

**Repository:** ChemistryGames (Vite + React + TypeScript monorepo)

---

## Repository Structure Reference

```
ChemistryGames/
├── shared/                    # DON'T MODIFY without good reason
│   ├── components/            # MainMenu, LevelCard, ProgressBar, UI elements
│   ├── hooks/                 # useProgress, useAccessibility, useI18n
│   ├── utils/                 # scoring, storage, export
│   ├── i18n/                  # is.json, en.json translations
│   └── types/                 # game.types.ts, progress.types.ts
│
├── games/
│   ├── 1-ar/                  # 1st year games
│   ├── 2-ar/                  # 2nd year games
│   └── 3-ar/                  # 3rd year games
│       └── [game-name]/
│           └── src/
│               ├── data/      # lessons.ts, problems.ts ← GAME CONTENT
│               ├── components/
│               │   ├── Level1.tsx  ← Conceptual Foundation
│               │   ├── Level2.tsx  ← Application/Reasoning
│               │   └── Level3.tsx  ← Analysis/Calculation
│               └── App.tsx
```

**Key principle:** Shared components handle UI/UX, accessibility, progress, and i18n. Game-specific code focuses purely on chemistry content and pedagogy.

---

## Game Details (Fill in)

| Field | Value |
|-------|-------|
| **Game path** | `games/[X]-ar/[game-name]/` |
| **Topic** | |
| **Icelandic name** | |
| **Year level** | 1st / 2nd / 3rd |
| **Textbook chapters** | |
| **Common misconceptions** | *(what students typically get wrong)* |

---

## Review Type

### Option A: Quick Review

Look at the game and tell me:
1. **Pedagogical issues** — Can students succeed without understanding? What's missing from each level?
2. **Content quality** — Are problems in `data/` well-designed? Good progression?
3. **Level balance** — Does each Level file (1/2/3) match its pedagogical purpose?

Then ask what I want implemented.

---

### Option B: Full Pedagogical Review

#### Part 1: Level-by-Level Analysis

For each level component, evaluate against its purpose:

**Level1.tsx — Conceptual Foundation**
- Does it teach BEFORE testing?
- Are there interactive demonstrations?
- Do students learn WHY, not just WHAT?
- Check: explanation-based questions, not just answer-checking

**Level2.tsx — Application with Reasoning**
- Must students predict AND explain?
- Is trial-and-error success prevented?
- Is there progressive difficulty?
- Are underlying principles reinforced?

**Level3.tsx — Analysis and Calculation**
- Quantitative applications present?
- Reverse problems (given outcome → find cause)?
- Real-world scenarios?
- Multi-concept synthesis?

#### Part 2: Data Quality Check

Review `src/data/`:
- **lessons.ts** — Are explanations accurate? Appropriate depth? Good examples?
- **problems.ts** — Good variety? Cover common misconceptions? Appropriate difficulty curve?

#### Part 3: Architecture Check

- Is the game using shared components properly? (`@shared/components`, `@shared/hooks`)
- Any redundant code that should use shared utilities?
- Are translations complete in `shared/i18n/is.json`?

#### Part 4: Prioritized Improvements

| Priority | Issue | Location | Complexity |
|----------|-------|----------|------------|
| Critical | | | |
| Important | | | |
| Nice-to-have | | | |

---

### Option C: Full Review + Implementation

Do Option B, then:
1. Present improvement table
2. Ask which I want done
3. Implement, following monorepo patterns
4. Test that game still builds and runs

---

## Implementation Guidelines

When implementing changes:

**DO:**
- Use existing shared components (`@shared/components/UI/Button`, etc.)
- Use `useI18n()` hook — all student-facing text in `is.json`
- Use `useProgress()` for tracking
- Follow existing Level component patterns from other games
- Keep game logic in `data/` files, presentation in `components/`

**DON'T:**
- Create one-off components that should be shared
- Hardcode Icelandic strings (use i18n)
- Modify `shared/` without discussing first
- Duplicate utilities that exist in `shared/utils/`

**Check before implementing:**
```bash
# Look at similar games for patterns
ls games/[same-year]-ar/

# Check what shared components exist
ls shared/components/
```

---

## Three-Level Framework Quick Reference

| Level | File | Focus | Student must... |
|-------|------|-------|-----------------|
| 1 | Level1.tsx | Understand/Create | Build mental model through guided exploration |
| 2 | Level2.tsx | Predict/Explain | Predict outcomes AND justify reasoning |
| 3 | Level3.tsx | Analyze/Calculate | Apply quantitatively, solve reverse problems |

**Core test:** A student who doesn't understand the concept should NOT be able to score well through guessing or pattern recognition.

---

## Example Usage

### Quick review:
```
Quick review: games/2-ar/hess-law/

Topic: Hess's Law
Icelandic: Lögmál Hess
Year: 2nd
Chapters: Chapter 5 (Thermochemistry)
Misconceptions: Students add ΔH values without flipping signs when reversing reactions
```

### New game scaffold:
```
Create scaffold for new game:
Path: games/3-ar/equilibrium-constants/
Topic: Equilibrium constant expressions (K)
Icelandic: Jafnvægisfastar
Year: 3rd
Chapters: Chapter 15 (Chemical Equilibrium)

Set up the folder structure with placeholder Level components and empty data files.
I'll fill in the chemistry content.
```

---

## Default Behavior

- If I paste a game path without specifying review type → **Quick Review (Option A)**
- If I mention "implement" or "fix" → **Option C**
- If game doesn't exist yet → Offer to create scaffold
