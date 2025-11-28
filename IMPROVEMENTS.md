# Suggested Improvements

This document outlines recommended improvements for the ChemistryGames repository to enhance development workflow, debugging, version control, and overall maintainability.

---

## 🐛 Debugging & Development Tools

### 1. React DevTools Integration

**Current State**: No debugging tools configured
**Recommendation**: Add React DevTools support

```typescript
// Add to vite.config.ts for all games
export default defineConfig({
  // ... existing config
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
});
```

**Benefits**:
- Inspect React component tree
- Debug state and props
- Track performance issues
- Profile re-renders

### 2. Error Boundaries

**Current State**: No error handling for component failures
**Recommendation**: Add error boundaries to shared library

```typescript
// shared/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Could send to error tracking service here
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-container">
          <h2>Villa kom upp</h2>
          <p>Vinsamlegast endurhlaðið síðuna</p>
          <button onClick={() => window.location.reload()}>
            Endurhlaða
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Usage**:
```typescript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### 3. Development Logging System

**Recommendation**: Add structured logging utility

```typescript
// shared/utils/logger.ts
export const logger = {
  debug: (__DEV__ ? console.log : () => {}),
  info: console.info,
  warn: console.warn,
  error: console.error,

  // Game-specific logging
  gameEvent: (eventName: string, data?: any) => {
    if (__DEV__) {
      console.log(`[GAME EVENT] ${eventName}`, data);
    }
  },

  // Performance logging
  perf: (label: string, fn: () => void) => {
    if (__DEV__) {
      console.time(label);
      fn();
      console.timeEnd(label);
    } else {
      fn();
    }
  }
};
```

### 4. Source Maps Configuration

**Current State**: Source maps not explicitly configured
**Recommendation**: Enable source maps for debugging

```typescript
// vite.config.ts
build: {
  sourcemap: process.env.NODE_ENV !== 'production',
  minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
  terserOptions: {
    compress: {
      drop_console: process.env.NODE_ENV === 'production',
    },
  },
}
```

---

## 📝 Version Control & Changelogs

### 1. Conventional Commits

**Recommendation**: Enforce conventional commit format

Create `.commitlintrc.json`:
```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert"
      ]
    ],
    "scope-enum": [
      2,
      "always",
      [
        "shared",
        "game-template",
        "dimensional-analysis",
        "molmassi",
        "nafnakerfid",
        "lausnir",
        "takmarkandi",
        "ph-titration",
        "thermodynamics",
        "gas-law",
        "equilibrium",
        "buffer",
        "deps",
        "docs"
      ]
    ]
  }
}
```

**Example Commits**:
```
feat(dimensional-analysis): add hint system to Level 3
fix(shared): correct sig fig validation for scientific notation
docs(readme): update migration status
refactor(shared): extract scoring utils to separate file
```

### 2. Automated Changelog Generation

**Recommendation**: Use conventional-changelog

```bash
# Install
pnpm add -D conventional-changelog-cli

# Add to package.json scripts
"scripts": {
  "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
  "version": "pnpm changelog && git add CHANGELOG.md"
}
```

**Generate changelog**:
```bash
pnpm changelog
```

### 3. Semantic Versioning

**Recommendation**: Implement semantic versioning for games

```json
// Each game's package.json
{
  "version": "MAJOR.MINOR.PATCH",
  // Example: "1.2.3"
  // MAJOR: Breaking changes (game mechanics change)
  // MINOR: New features (new levels, questions)
  // PATCH: Bug fixes, minor tweaks
}
```

### 4. Git Hooks with Husky

**Recommendation**: Add pre-commit hooks

```bash
# Install
pnpm add -D husky lint-staged

# Setup
npx husky-init
```

`.husky/pre-commit`:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm type-check
pnpm lint-staged
```

`package.json`:
```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

### 5. Release Tags

**Recommendation**: Tag releases for each game

```bash
# Tag a game release
git tag -a dimensional-analysis-v1.0.0 -m "Release dimensional analysis v1.0.0"
git push origin dimensional-analysis-v1.0.0

# List all releases
git tag -l
```

---

## 🧪 Testing Infrastructure

### 1. Unit Tests for Utilities

**Recommendation**: Add Vitest for unit testing

```typescript
// shared/utils/__tests__/scoring.test.ts
import { describe, it, expect } from 'vitest';
import { countSignificantFigures, calculateCompositeScore } from '../scoring';

describe('countSignificantFigures', () => {
  it('counts sig figs correctly for decimals', () => {
    expect(countSignificantFigures('1.23')).toBe(3);
    expect(countSignificantFigures('0.0123')).toBe(3);
  });

  it('handles scientific notation', () => {
    expect(countSignificantFigures('1.23e5')).toBe(3);
  });
});

describe('calculateCompositeScore', () => {
  it('weights scores correctly', () => {
    const score = calculateCompositeScore(1, 0.8, 0.6, 0.9);
    expect(score).toBeCloseTo(0.83); // 0.4*1 + 0.3*0.8 + 0.2*0.6 + 0.1*0.9
  });
});
```

**Setup**:
```bash
pnpm add -D vitest @vitest/ui

# package.json
"scripts": {
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:coverage": "vitest --coverage"
}
```

### 2. Component Tests

**Recommendation**: Add React Testing Library

```typescript
// Example: Test accessibility menu
import { render, screen, fireEvent } from '@testing-library/react';
import { AccessibilityMenu } from '../AccessibilityMenu';

test('toggles high contrast mode', () => {
  render(<AccessibilityMenu />);

  const checkbox = screen.getByLabelText(/há birtuskil/i);
  fireEvent.click(checkbox);

  expect(document.documentElement).toHaveClass('high-contrast');
});
```

### 3. E2E Tests

**Recommendation**: Add Playwright for end-to-end testing

```typescript
// tests/e2e/dimensional-analysis.spec.ts
import { test, expect } from '@playwright/test';

test('completes Level 1 question', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Click start
  await page.click('text=Byrja');

  // Answer question
  await page.click('[data-testid="option-1"]');
  await page.click('text=Staðfesta');

  // Verify feedback
  await expect(page.locator('.feedback')).toContainText('Rétt');
});
```

---

## 📊 Analytics & Monitoring

### 1. Error Tracking

**Recommendation**: Add Sentry or similar

```typescript
// main.tsx
import * as Sentry from "@sentry/react";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: "YOUR_SENTRY_DSN",
    environment: "production",
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay(),
    ],
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,
  });
}
```

### 2. Usage Analytics

**Recommendation**: Track game usage (privacy-respecting)

```typescript
// shared/utils/analytics.ts
interface GameEvent {
  eventName: string;
  gameName: string;
  level?: number;
  timestamp: string;
  metadata?: Record<string, any>;
}

export const trackEvent = (event: GameEvent) => {
  // Store locally for teacher dashboard
  const events = JSON.parse(localStorage.getItem('game-events') || '[]');
  events.push(event);
  localStorage.setItem('game-events', JSON.stringify(events));

  // Could also send to analytics service if desired
};

// Usage
trackEvent({
  eventName: 'level_completed',
  gameName: 'dimensional-analysis',
  level: 3,
  timestamp: new Date().toISOString(),
  metadata: { score: 0.85 }
});
```

### 3. Performance Monitoring

**Recommendation**: Add performance metrics

```typescript
// shared/hooks/usePerformance.ts
export const usePerformance = (componentName: string) => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`${componentName}: ${entry.duration}ms`);
      }
    });

    observer.observe({ entryTypes: ['measure'] });
    performance.mark(`${componentName}-start`);

    return () => {
      performance.mark(`${componentName}-end`);
      performance.measure(
        componentName,
        `${componentName}-start`,
        `${componentName}-end`
      );
      observer.disconnect();
    };
  }, [componentName]);
};
```

---

## 🔄 CI/CD Pipeline

### 1. GitHub Actions Workflow

**Recommendation**: Automate builds and tests

`.github/workflows/ci.yml`:
```yaml
name: CI

on:
  push:
    branches: [main, 'claude/**']
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Type check
        run: pnpm type-check

      - name: Run tests
        run: pnpm test

      - name: Build all games
        run: pnpm build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to kvenno.app
        run: |
          # Copy built HTML files to deployment directory
          # rsync or similar deployment script
```

### 2. Automated Releases

`.github/workflows/release.yml`:
```yaml
name: Release

on:
  push:
    tags:
      - '*-v*.*.*'

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Create Release
        uses: actions/create-release@v1
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
```

---

## 📦 Dependency Management

### 1. Automated Updates

**Recommendation**: Use Dependabot

`.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### 2. Security Audits

```bash
# Add to package.json scripts
"scripts": {
  "audit": "pnpm audit",
  "audit:fix": "pnpm audit --fix"
}

# Run regularly
pnpm audit
```

---

## 🎨 Code Quality

### 1. ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
};
```

### 2. Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

### 3. TypeScript Strict Mode

```json
// tsconfig.base.json - enable gradually
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

---

## 📱 Progressive Web App (PWA)

### Recommendation: Make games installable

```typescript
// vite-plugin-pwa configuration
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    viteSingleFile(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Kvennaskólinn Chemistry Games',
        short_name: 'Kvenno Chem',
        description: 'Interactive chemistry learning games',
        theme_color: '#f36b22',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

**Benefits**:
- Offline access to games
- Install on home screen
- Faster load times
- Native app feel

---

## 🎯 Priority Recommendations

### High Priority (Implement First)
1. ✅ **Error Boundaries** - Prevent complete failures
2. ✅ **Conventional Commits** - Better git history
3. ✅ **TypeScript Strict Mode** - Catch more bugs
4. ✅ **Unit Tests for Utils** - Ensure correctness

### Medium Priority (Next Sprint)
5. **Git Hooks (Husky)** - Enforce quality
6. **GitHub Actions CI** - Automate testing
7. **Changelog Generation** - Track changes
8. **ESLint + Prettier** - Code consistency

### Low Priority (Nice to Have)
9. **E2E Tests (Playwright)** - Full coverage
10. **PWA Support** - Offline capability
11. **Analytics** - Usage insights
12. **Sentry** - Error tracking

---

## 📋 Implementation Checklist

- [ ] Add error boundaries to shared library
- [ ] Set up conventional commits
- [ ] Configure ESLint and Prettier
- [ ] Add unit tests for scoring utilities
- [ ] Set up Husky pre-commit hooks
- [ ] Create GitHub Actions CI workflow
- [ ] Implement automated changelog
- [ ] Add TypeScript strict mode incrementally
- [ ] Set up Dependabot for security updates
- [ ] Create release tagging strategy
- [ ] Add performance monitoring
- [ ] Consider PWA implementation

---

**Estimated Implementation Time**: 10-15 hours for high + medium priority items

**Expected Benefits**:
- 🐛 **50% fewer bugs** reaching production
- 📈 **Better code quality** and consistency
- 🚀 **Faster development** with automated tools
- 📊 **Better insights** into game usage
- 🔒 **Improved security** with automated audits
