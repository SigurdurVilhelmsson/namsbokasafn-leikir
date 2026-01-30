# Semester Priority Plan: Year 1 & Year 2 Focus

**Created:** 2026-01-29
**Status:** Active
**Scope:** Year 1 and Year 2 games only (Year 3 deferred)

---

## Current Status (Updated 2026-01-30)

| Year | Completed | Remaining | Progress |
|------|-----------|-----------|----------|
| **Year 1** | 20 | 1 | 95.2% |
| **Year 2** | 26 | 14 | 65% |

---

## Remaining Items by Priority

### 🔴 HIGH PRIORITY (3 items)

| Year | Game | Feature | Effort | Notes |
|------|------|---------|--------|-------|
| 1 | Dimensional Analysis | Drag-and-drop unit builder | High | Build conversions visually |
| 1 | Limiting Reactants | Visual stoichiometry | Medium | Particle count representation |
| 2 | Hess's Law | Drag-drop equation builder | High | `DragDropBuilder` component ready |

### 🟡 MEDIUM PRIORITY (6 items)

| Year | Game | Feature | Effort |
|------|------|---------|--------|
| 1 | Dimensional Analysis | Real-world context scenarios | Low |
| 1 | Molar Mass | Animated mass calculation | Medium |
| 1 | Nomenclature | Audio pronunciation | Medium |
| 1 | Solutions | Pipette/dropper tool | Medium |
| 1 | Limiting Reactants | Factory game mode | Medium |
| Shared | Audio utilities | TTS for pronunciations | Medium |

### 🟢 LOW PRIORITY (4 items)

| Year | Game | Feature | Effort |
|------|------|---------|--------|
| 1 | Molar Mass | Mystery molecule mode | Medium |
| 1 | Solutions | Concentration-based color | Low |
| 1 | Solutions | Temperature effects | Medium |
| 2 | IMF | Surface tension demo | High |

---

## Implementation Phases

### Phase 1: High-Priority Features

| # | Feature | Game | Status |
|---|---------|------|--------|
| 1 | Visual Stoichiometry | Limiting Reactants | ✅ |
| 2 | Drag-and-Drop Unit Builder | Dimensional Analysis | ✅ |
| 3 | Drag-Drop Equation Builder | Hess's Law | ✅ |

**1. Limiting Reactants → Visual Stoichiometry** (Medium effort)
- Particle count representation showing mole ratios visually
- Builds on existing `ReactionAnimation` component
- High pedagogical value for understanding stoichiometry

**2. Dimensional Analysis → Drag-and-Drop Unit Builder** (High effort)
- Visual conversion factor building
- Leverages existing `DragDropBuilder` component
- Core skill for Year 1 chemistry

**3. Hess's Law → Drag-Drop Equation Builder** (High effort)
- Combine thermochemical equations visually
- `DragDropBuilder` already built and ready
- Completes the Year 2 high-priority items

### Phase 2: Quick Wins (Low Effort, Medium Priority)

| # | Feature | Game | Status |
|---|---------|------|--------|
| 4 | Real-world context scenarios | Dimensional Analysis | ✅ |

- Add cooking, pharmacy, engineering examples
- Content addition only, no new components needed

### Phase 3: Enhanced Interactivity

| # | Feature | Game | Status |
|---|---------|------|--------|
| 5 | Pipette/Dropper Tool | Solutions | ✅ |
| 6 | Animated Mass Calculation | Molar Mass | ✅ |
| 7 | Factory Game Mode | Limiting Reactants | ✅ |

### Phase 4: Audio Support

| # | Feature | Game | Status |
|---|---------|------|--------|
| 8 | Audio Utilities | Shared | ⬜ |
| 9 | Audio Pronunciation | Nomenclature | ⬜ |

---

## Projected Progress After Each Phase

| Phase | Year 1 | Year 2 |
|-------|--------|--------|
| Current | 52.4% | 62.5% |
| After Phase 1 | 62% | 65% |
| After Phase 2 | 67% | 65% |
| After Phase 3 | 81% | 65% |
| After Phase 4 | 86% | 65% |

---

## Notes

- Year 3 games are deferred until next semester
- Focus on leveraging existing shared components (`DragDropBuilder`, `ReactionAnimation`)
- Prioritize features with highest pedagogical impact for current curriculum
