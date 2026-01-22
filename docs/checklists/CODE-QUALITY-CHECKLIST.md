# 💻 Code Quality Checklist

**Frequency**: Weekly (automated via CI/CD) + Monthly (manual review)
**Time Required**: 15-45 minutes
**Priority**: 🟡 HIGH

---

## Quick Check (5 minutes)

Run automated quality checks:

```bash
pnpm check:quality
```

This runs:
- TypeScript type checking
- ESLint linting
- Prettier format checking

---

## Comprehensive Check (45 minutes)

### 1. TypeScript (10 min)

- [ ] **Type check passes**:
  ```bash
  pnpm type-check
  # or
  pnpm tsc --noEmit
  ```

- [ ] **Strict mode enabled** (or working towards it):
  - Check `tsconfig.json` has `"strict": true`
  - If not, plan to enable incrementally

- [ ] **No `any` types** (or minimal):
  ```bash
  # Search for 'any' usage
  grep -r ": any" src/ --include="*.ts" --include="*.tsx"
  ```

- [ ] **Proper type exports**:
  - Types exported from `types/` or alongside components
  - No circular type dependencies

**Red Flags**:
- 🔴 Type errors in production code
- 🔴 Extensive use of `any` without `@ts-expect-error` comments
- 🔴 `skipLibCheck` masking type issues

---

### 2. ESLint (10 min)

- [ ] **Linting passes**:
  ```bash
  pnpm lint
  ```

- [ ] **Configuration is current**:
  - [ ] `.eslintrc.js` exists
  - [ ] Extends recommended configs
  - [ ] React hooks plugin enabled (if React)
  - [ ] TypeScript plugin enabled

- [ ] **No disabled rules without reason**:
  - Review any `eslint-disable` comments
  - Ensure they have justification

- [ ] **Auto-fix applied**:
  ```bash
  pnpm lint:fix
  ```

**Red Flags**:
- 🔴 Errors (not warnings) in production code
- 🔴 Many `eslint-disable` comments
- 🔴 Outdated ESLint version (< 8.x)

---

### 3. Prettier (5 min)

- [ ] **All files formatted**:
  ```bash
  pnpm format:check
  ```

- [ ] **Configuration exists**:
  - [ ] `.prettierrc` exists
  - [ ] `.prettierignore` exists
  - [ ] Settings consistent across team

- [ ] **Format all files if needed**:
  ```bash
  pnpm format
  ```

- [ ] **Editor integration**:
  - VSCode: "Format on Save" enabled
  - Settings in `.vscode/settings.json`

**Red Flags**:
- 🔴 Inconsistent formatting across files
- 🔴 No Prettier config
- 🔴 Format-on-save not working

---

### 4. Dead Code & Unused Dependencies (10 min)

- [ ] **No unused imports**:
  - ESLint should catch these
  - Use IDE's "Organize Imports" feature

- [ ] **No commented-out code**:
  ```bash
  # Search for large comment blocks
  grep -r "^[[:space:]]*//.*" src/ | wc -l
  ```

- [ ] **No unused dependencies**:
  ```bash
  pnpm add -D depcheck
  pnpm depcheck
  ```

- [ ] **Remove unused packages**:
  ```bash
  pnpm remove <package-name>
  ```

**Red Flags**:
- 🔴 100+ lines of commented code
- 🔴 5+ unused dependencies
- 🔴 Dev dependencies in production deps

---

### 5. Code Consistency (10 min)

- [ ] **Consistent naming conventions**:
  - Components: PascalCase (`UserProfile.tsx`)
  - Utilities: camelCase (`formatDate.ts`)
  - Constants: UPPER_SNAKE_CASE (`API_URL`)
  - Types: PascalCase (`User.types.ts`)

- [ ] **Consistent import order**:
  ```typescript
  // 1. External deps
  import { useState } from 'react';

  // 2. Internal absolute imports
  import { Button } from '@/components/Button';

  // 3. Relative imports
  import { helper } from './helper';

  // 4. Types
  import type { User } from '@/types';

  // 5. Styles
  import './styles.css';
  ```

- [ ] **Consistent file structure**:
  - All components in `components/`
  - All utilities in `utils/`
  - All types in `types/`
  - All hooks in `hooks/` (React)

- [ ] **No magic numbers/strings**:
  - Extract to constants
  - Use enums or const objects

**Red Flags**:
- 🔴 Inconsistent naming across files
- 🔴 Random file organization
- 🔴 Magic numbers everywhere

---

## Monthly Deep Check (Additional 30 min)

### 6. Code Complexity

- [ ] **Functions are focused**:
  - Ideally < 50 lines per function
  - Single responsibility

- [ ] **Components are simple** (React):
  - < 200 lines per component
  - Extract complex logic to hooks

- [ ] **Cyclomatic complexity is low**:
  - Few nested if/else statements
  - Use early returns
  - Extract complex logic

### 7. Performance Patterns

- [ ] **No unnecessary re-renders** (React):
  - Use `React.memo` where appropriate
  - Use `useMemo`/`useCallback` for expensive ops
  - Check with React DevTools Profiler

- [ ] **Efficient data structures**:
  - Use Maps for lookups
  - Use Sets for uniqueness
  - Avoid nested loops when possible

- [ ] **Bundle size reasonable**:
  ```bash
  pnpm build
  # Check dist/ folder size
  du -sh dist/
  ```

### 8. Error Handling

- [ ] **Errors are caught**:
  - Try/catch around async operations
  - Error boundaries (React)
  - Global error handlers (Node.js)

- [ ] **Errors are logged**:
  - console.error (development)
  - Error tracking service (production)

- [ ] **User-friendly error messages**:
  - No raw error objects shown to users
  - Helpful, actionable messages

---

## Automation

### CI/CD Integration

Already set up in `.github/workflows/ci.yml`:

```yaml
- name: Type check
  run: pnpm type-check

- name: Lint
  run: pnpm lint

- name: Format check
  run: pnpm format:check
```

### Pre-commit Hooks (Optional)

If using Husky + lint-staged:

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## Quick Wins

**If you have 5 minutes**:
- [ ] Run `pnpm lint:fix` and commit

**If you have 15 minutes**:
- [ ] Run all quality checks
- [ ] Fix critical issues
- [ ] Run `depcheck` and remove 1-2 unused deps

**If you have 30 minutes**:
- [ ] Enable stricter TypeScript rules
- [ ] Remove all commented code
- [ ] Organize imports across all files

**If you have 1 hour**:
- [ ] Full code quality audit
- [ ] Extract magic numbers to constants
- [ ] Refactor complex functions

---

## Tools & Resources

### VSCode Extensions

Recommended (in `.vscode/extensions.json`):
- `dbaeumer.vscode-eslint` - ESLint integration
- `esbenp.prettier-vscode` - Prettier integration
- `usernamehw.errorlens` - Inline error display
- `ms-vscode.vscode-typescript-next` - TypeScript support

### Commands Quick Reference

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint              # Check for issues
pnpm lint:fix          # Auto-fix issues

# Formatting
pnpm format            # Format all files
pnpm format:check      # Check formatting

# All quality checks
pnpm check:quality

# Find unused deps
pnpm depcheck

# Remove unused deps
pnpm remove <package>
```

---

## Red Flags Summary 🚨

Stop and fix immediately if you see:

- 🔴 TypeScript errors in production
- 🔴 ESLint errors (not warnings)
- 🔴 Inconsistent formatting
- 🔴 5+ unused dependencies
- 🔴 Extensive use of `any` type
- 🔴 No error handling
- 🔴 Magic numbers/strings everywhere

---

## Integration with Master Checklist

This checklist is referenced by:
- `REPOSITORY-STATUS.md` (Code Quality section)
- `docs/MASTER-CHECKLIST-SYSTEM.md`
- `pnpm check:quality` script

**Ask Claude**:
```
"Run code quality check"
"What's my code quality status?"
"Fix all linting issues"
```

---

## Performance Audit (Quarterly)

### Quick Lighthouse Check (15 min)

1. **Open Chrome DevTools** (F12) → Lighthouse tab
2. **Select "Performance"** only
3. **Click "Analyze page load"**

**Target Scores:**
- ✅ **90-100**: Excellent
- ⚠️ **50-89**: Needs improvement
- 🔴 **0-49**: Poor

### Core Web Vitals

| Metric | Target | Description |
|--------|--------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **FID** | < 100ms | First Input Delay |
| **CLS** | < 0.1 | Cumulative Layout Shift |

### Bundle Analysis

```bash
# Check file sizes after build
pnpm build
ls -lh dist/*.html  # Should be < 250KB
```

### Performance Checklist

- [ ] **Page load < 2 seconds** on fast connection
- [ ] **Page load < 5 seconds** on 3G throttled
- [ ] **Smooth animations** (60 FPS) - check with Performance tab
- [ ] **No long tasks** blocking main thread (>50ms)
- [ ] **Images optimized** (WebP, lazy loading)
- [ ] **Bundle size under budget** (HTML < 250KB)
- [ ] **No memory leaks** (run game, check Memory tab)

### Common Performance Fixes

**Large bundle?**
- Remove unused dependencies (`pnpm depcheck`)
- Use tree-shakeable imports
- Lazy load heavy components

**Slow image loading?**
- Convert to WebP format
- Add `loading="lazy"` attribute
- Use responsive images with srcset

**Layout shifts?**
- Always specify image dimensions
- Reserve space for dynamic content
- Use font-display: swap

**Poor animation FPS?**
```css
/* Use transform/opacity instead of top/left */
.animated {
  transform: translateX(100px);  /* ✅ GPU accelerated */
  /* NOT: left: 100px; */
}
```

---

## Status Update Template

After completing checklist:

```markdown
## Code Quality Status

**Date**: [Date]
**TypeScript**: ✅ 0 errors
**ESLint**: ✅ 0 errors, 2 warnings
**Prettier**: ✅ All files formatted
**Unused Deps**: ✅ 0 found
**Performance**: ✅ Lighthouse 95/100
**Overall**: 🟢 Excellent

**Actions Taken**:
- Fixed 3 linting issues
- Removed 2 unused dependencies
- Formatted all files
- Optimized images to WebP
```

---

**Last Updated**: 2025-01-22
**Next Review**: [Date + 1 week]
