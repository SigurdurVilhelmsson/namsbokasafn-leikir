# Tiered Hint System Design

**Date:** 2025-12-30
**Status:** Approved
**Scope:** All 17 chemistry games

---

## Overview

Replace the single-hint system with a 4-tier progressive hint system that guides students from general reminders to full worked solutions. The system uses a "specificity ladder" approach and gentle score decay to encourage hint usage while rewarding independence.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Progression model | Specificity ladder | Matches educational best practices, reduces cognitive load gradually |
| Scoring | Gentle decay (100%→80%→60%→40%) | Encourages learning over guessing |
| UI behavior | Unlock sequence | Simple single button with tier preview labels |
| Data structure | Named object keys | Self-documenting, reduces errors |
| Migration | Full migration | Clean, consistent codebase |
| API | Component only | Consistent UX, simpler integration |

## Component Specification

### `<HintSystem />` Component

**Location:** `shared/components/HintSystem/HintSystem.tsx`

```typescript
interface HintSystemProps {
  hints: {
    topic: string;      // Tier 1: Topic reminder
    strategy: string;   // Tier 2: Strategy hint
    method: string;     // Tier 3: Formula/method
    solution: string;   // Tier 4: Worked example
  };
  basePoints?: number;           // Default: 20
  onHintUsed?: (tier: 1|2|3|4, pointMultiplier: number) => void;
  onPointsChange?: (multiplier: number) => void;
  disabled?: boolean;            // Hide when showing feedback
  className?: string;            // Custom styling
}
```

### Point Multipliers

| Hints Used | Multiplier | Points (base 20) |
|------------|------------|------------------|
| None | 1.0 | 20 |
| Tier 1 | 0.8 | 16 |
| Tier 2 | 0.6 | 12 |
| Tier 3+ | 0.4 | 8 |

## UI Design

### Visual Layout

```
┌─────────────────────────────────────────────────┐
│  [💡 Vísbending 2/4: Aðferð]                    │  ← Button (next tier)
├─────────────────────────────────────────────────┤
│  ┌─ Tier 1 ─────────────────────────────────┐   │
│  │ 📌 Topic hint text                       │   │
│  └──────────────────────────────────────────┘   │
│  ┌─ Tier 2 ─────────────────────────────────┐   │
│  │ 🎯 Strategy hint text                    │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Color Scheme

| Tier | Icon | Background | Border | Label (IS) |
|------|------|------------|--------|------------|
| 1 | 📌 | yellow-50 | yellow-400 | Efni |
| 2 | 🎯 | orange-50 | orange-400 | Aðferð |
| 3 | 🔧 | amber-50 | amber-500 | Formúla |
| 4 | ✅ | green-50 | green-500 | Lausn |

### Button States

- **Available:** Yellow background, shows next tier label
- **All used:** Gray, disabled, "Allar vísbendingar notaðar"
- **Disabled prop:** Hidden entirely

## Type Definitions

**Location:** `shared/types/hint.types.ts`

```typescript
export interface TieredHints {
  topic: string;      // Tier 1: Efni
  strategy: string;   // Tier 2: Aðferð
  method: string;     // Tier 3: Formúla
  solution: string;   // Tier 4: Lausn
}

export interface HintState {
  currentTier: 0 | 1 | 2 | 3 | 4;
  pointMultiplier: number;
  revealedTiers: number[];
}

export const HINT_MULTIPLIERS: Record<number, number> = {
  0: 1.0,
  1: 0.8,
  2: 0.6,
  3: 0.4,
  4: 0.4,
};

export const HINT_TIER_LABELS = {
  topic: 'Efni',
  strategy: 'Aðferð',
  method: 'Formúla',
  solution: 'Lausn',
} as const;

export const HINT_TIER_ICONS = {
  topic: '📌',
  strategy: '🎯',
  method: '🔧',
  solution: '✅',
} as const;
```

## Integration Pattern

### Before (current)

```tsx
const [showHint, setShowHint] = useState(false);
const [hintsUsed, setHintsUsed] = useState(0);

<button onClick={() => { setShowHint(true); setHintsUsed(h => h + 1); }}>
  💡 Sýna vísbendingu
</button>
{showHint && <div>{challenge.hint}</div>}

const points = showHint ? 10 : 20;
```

### After (new)

```tsx
const [hintMultiplier, setHintMultiplier] = useState(1.0);
const [hintsUsed, setHintsUsed] = useState(0);

<HintSystem
  hints={challenge.hints}
  onHintUsed={(tier) => setHintsUsed(tier)}
  onPointsChange={setHintMultiplier}
  disabled={showFeedback}
/>

const points = Math.round(20 * hintMultiplier);
```

### Challenge Data Migration

```typescript
// Before:
{ hint: "Finndu hvaða hvarfefni eyðist fyrst" }

// After:
{
  hints: {
    topic: "Þetta snýst um takmarkandi hvarfefni",
    strategy: "Berðu saman hversu oft hvert hvarfefni getur brugðist",
    method: "Reiknaðu: mól ÷ stuðull fyrir hvort hvarfefni",
    solution: "H₂: 4÷2=2 skipti. O₂: 3÷1=3 skipti. 2<3, svo H₂ er takmarkandi."
  }
}
```

## File Structure

```
shared/
├── components/
│   └── HintSystem/
│       ├── HintSystem.tsx
│       ├── HintTier.tsx
│       ├── index.ts
│       └── styles.ts
├── types/
│   └── hint.types.ts
└── components/index.ts (update)
```

## Implementation Order

1. Create type definitions (`shared/types/hint.types.ts`)
2. Build HintSystem component (`shared/components/HintSystem/*`)
3. Update shared exports (`shared/components/index.ts`)
4. Migrate Year 1 games (5): takmarkandi, molmassi, nafnakerfid, lausnir, dimensional-analysis
5. Migrate Year 2 games (7): hess-law, kinetics, lewis-structures, vsepr-geometry, intermolecular-forces, organic-nomenclature, redox-reactions
6. Migrate Year 3 games (5): ph-titration, gas-law-challenge, equilibrium-shifter, thermodynamics-predictor, buffer-recipe-creator

## Scope Estimate

- Shared component: ~150 lines
- Per game migration: ~20 lines changed + hint data
- Total challenges to update: ~200+ across all games
