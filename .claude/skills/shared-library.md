---
name: shared-library
description: Shared component library. Triggers when working with shared/.
---

# Shared Library

Located at `shared/` - used by ALL games.

## Hooks

### useI18n
```tsx
const { t, locale, setLocale, locales } = useI18n();
// t('key') returns translated string
// locale: 'is' | 'en' | 'pl'
```

### useProgress
```tsx
const { progress, saveProgress, clearProgress } = useProgress('game-id');
// Persists to localStorage
```

### useAccessibility
```tsx
const { highContrast, textSize, reducedMotion } = useAccessibility();
// textSize: 'small' | 'medium' | 'large'
```

### useAchievements
```tsx
const { achievements, unlock, isUnlocked } = useAchievements();
// 23 achievements, 5 rarity levels
```

## Utils

### storage.ts
```tsx
import { storage } from '@shared/utils/storage';
storage.set('key', value);
storage.get('key', defaultValue);
```

### scoring.ts
```tsx
import { calculateScore } from '@shared/utils/scoring';
const score = calculateScore(correct, total, timeMs, difficulty);
```

## i18n

Translations in `shared/i18n/`:

- `is.json` - Icelandic (primary)
- `en.json` - English
- `pl.json` - Polish

Adding a key:
```json
// is.json
{ "game.start": "Byrja" }
// en.json
{ "game.start": "Start" }
```

## Modifying Shared

Changes to shared/ affect ALL games!

1. Test thoroughly before committing
2. Check if change is backward compatible
3. Build several games to verify
