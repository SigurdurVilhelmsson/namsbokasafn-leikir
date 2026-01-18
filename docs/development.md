# Development Guide

This guide covers the development workflow, tools, and best practices for working on ChemistryGames.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Development Workflow](#development-workflow)
3. [Available Scripts](#available-scripts)
4. [Code Quality Tools](#code-quality-tools)
5. [Project Structure](#project-structure)
6. [Creating a New Game](#creating-a-new-game)
7. [Testing](#testing)
8. [Debugging](#debugging)
9. [Common Tasks](#common-tasks)
10. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites

Ensure you have the required tools installed:

```bash
# Check Node.js version (requires v18+)
node --version

# Check pnpm version (requires v8+)
pnpm --version

# If pnpm is not installed
npm install -g pnpm
```

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/SigurdurVilhelmsson/ChemistryGames.git
cd ChemistryGames

# Install all dependencies (monorepo + all games)
pnpm install

# Verify setup
pnpm type-check
```

### Start Development

```bash
# Option 1: Start a specific game
cd games/1-ar/molmassi
pnpm dev

# Option 2: Work on shared library
cd shared
# Make changes, they'll be picked up by games on next build
```

---

## Development Workflow

### Typical Development Session

```bash
# 1. Pull latest changes
git pull origin main

# 2. Create a feature branch
git checkout -b feature/my-new-feature

# 3. Install dependencies (if package.json changed)
pnpm install

# 4. Start development server
cd games/1-ar/molmassi
pnpm dev

# 5. Make changes and test in browser
# Browser auto-reloads on file changes

# 6. Check code quality before committing
cd ../..  # Back to root
pnpm check-all

# 7. Build to verify production bundle
cd games/1-ar/molmassi
pnpm build

# 8. Commit changes
git add .
git commit -m "feat(molmassi): add new difficulty level"

# 9. Push to remote
git push origin feature/my-new-feature
```

### Branch Strategy

- `main` - Production-ready code
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates
- `refactor/*` - Code refactoring

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `style`: Code style changes (formatting)
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(molmassi): add hint system with point penalties
fix(shared): correct sig fig validation for scientific notation
docs(readme): update migration status
refactor(lausnir): extract validation logic to utils
```

---

## Available Scripts

### Root Level (Monorepo)

Run these from the repository root:

```bash
# Development
pnpm dev                 # Start dev server (prompts for game selection)

# Building
pnpm build               # Build all games
pnpm build:all          # Build all games with detailed output
pnpm shared:build       # Build shared library only

# Code Quality
pnpm type-check         # Check TypeScript types in all packages
pnpm lint               # Lint all TypeScript files
pnpm lint:fix           # Lint and auto-fix issues
pnpm format             # Format all files with Prettier
pnpm format:check       # Check formatting without changing files
pnpm check-all          # Run all checks (type + lint + format)

# Validation
pnpm validate           # Full validation (install + check + build)

# Testing
pnpm test               # Run tests (when implemented)

# Maintenance
pnpm clean              # Remove all node_modules and build outputs
```

### Game Level

Run these from a specific game directory (e.g., `games/1-ar/molmassi`):

```bash
# Development
pnpm dev                # Start dev server (http://localhost:5173)

# Building
pnpm build              # Build to single HTML file
pnpm preview            # Preview production build

# Code Quality
pnpm type-check         # Check TypeScript types for this game
pnpm lint               # Lint this game's code
pnpm format             # Format this game's code
```

### Shared Library

Run these from `shared/` directory:

```bash
pnpm type-check         # Check TypeScript types
pnpm build              # Build shared library (if needed)
```

---

## Code Quality Tools

### ESLint

Lints TypeScript and React code for common issues.

**Configuration:** `.eslintrc.js`

**Usage:**
```bash
# Lint all files
pnpm lint

# Auto-fix issues
pnpm lint:fix

# Lint specific file
pnpm eslint src/App.tsx
```

**Rules:**
- Warns on `console.log` (use `console.warn` or `console.error`)
- Warns on unused variables (prefix with `_` to ignore)
- Enforces React hooks rules
- Warns on `any` types

**Disable rule for specific line:**
```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = complexLegacyData;
```

### Prettier

Formats code for consistency.

**Configuration:** `.prettierrc`

**Usage:**
```bash
# Format all files
pnpm format

# Check formatting without changes
pnpm format:check

# Format specific file
pnpm prettier --write src/App.tsx
```

**Settings:**
- Single quotes
- 2-space indentation
- Semicolons required
- 100 character line width
- Trailing commas in ES5

### TypeScript

Provides type safety and better IDE support.

**Configuration:** `tsconfig.base.json` (root) and `tsconfig.json` (per package)

**Usage:**
```bash
# Check types
pnpm type-check

# Check types in watch mode
pnpm type-check --watch
```

**Common Type Issues:**

1. **Implicit any:**
   ```typescript
   // ❌ Bad
   function process(data) { }

   // ✅ Good
   function process(data: GameData) { }
   ```

2. **Null/undefined:**
   ```typescript
   // ❌ Bad
   const name = user.name;

   // ✅ Good
   const name = user?.name ?? 'Unknown';
   ```

3. **Type assertions:**
   ```typescript
   // ⚠️ Use sparingly
   const element = document.getElementById('root') as HTMLElement;

   // ✅ Better
   const element = document.getElementById('root');
   if (!element) throw new Error('Root element not found');
   ```

---

## Project Structure

```
ChemistryGames/
├── .github/              # GitHub Actions workflows
│   └── workflows/
│       └── ci.yml        # Continuous Integration
├── shared/               # Shared component library
│   ├── hooks/           # React hooks (useI18n, useProgress, etc.)
│   ├── utils/           # Utility functions (scoring, storage, etc.)
│   ├── types/           # TypeScript type definitions
│   ├── i18n/            # Translation files (is, en, pl)
│   ├── styles/          # Theme and styles
│   ├── package.json
│   └── README.md        # Shared library documentation
├── games/                # Individual game projects
│   ├── 1-ar/            # Year 1 games
│   │   ├── molmassi/
│   │   │   ├── src/
│   │   │   │   ├── App.tsx
│   │   │   │   ├── main.tsx
│   │   │   │   ├── data/       # Game data
│   │   │   │   ├── components/ # React components
│   │   │   │   └── utils/      # Game-specific utilities
│   │   │   ├── package.json
│   │   │   ├── vite.config.ts
│   │   │   └── tsconfig.json
│   │   └── ...
│   └── 3-ar/            # Year 3 games
│       └── ...
├── tools/                # Development tools
│   ├── game-template/   # Template for new games
│   ├── create-game.sh   # Game creation script
│   └── build-all.mjs    # Build all games script
├── 1-ar/                 # Built Year 1 games (HTML files)
├── 3-ar/                 # Built Year 3 games (HTML files)
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
├── package.json         # Root package.json (monorepo)
├── pnpm-workspace.yaml  # pnpm workspace config
├── tsconfig.base.json   # Base TypeScript config
├── README.md            # Main repository README
├── MIGRATION-PLAN.md    # Migration status and plan
├── MIGRATION-GUIDE.md   # How to migrate games
└── DEVELOPMENT.md       # This file
```

### Key Directories

- **`shared/`** - Reusable code for all games
- **`games/`** - Source code for each game
- **`1-ar/`, `3-ar/`** - Built games (deployment-ready HTML files)
- **`tools/`** - Development utilities

---

## Creating a New Game

### Using the Template

```bash
cd tools
./create-game.sh <year> <game-name> "<Title>" "<Description>"

# Example:
./create-game.sh 1-ar acid-base "Sýru-Basa Leikur" "Learn about acids and bases"
```

This creates a complete game structure with:
- ✅ Vite + React + TypeScript setup
- ✅ Tailwind CSS configured
- ✅ i18n integration
- ✅ Shared library imports
- ✅ Build scripts

### Manual Setup (Not Recommended)

If you need to set up manually:

1. **Copy template:**
   ```bash
   cp -r tools/game-template games/1-ar/my-game
   cd games/1-ar/my-game
   ```

2. **Update package.json:**
   ```json
   {
     "name": "@kvenno/my-game",
     "version": "1.0.0"
   }
   ```

3. **Install dependencies:**
   ```bash
   pnpm install
   ```

4. **Start development:**
   ```bash
   pnpm dev
   ```

### Game Development Checklist

- [ ] Create game structure with template
- [ ] Define game data in `src/data/`
- [ ] Create TypeScript interfaces for data
- [ ] Implement main game logic in `src/App.tsx`
- [ ] Create reusable components in `src/components/`
- [ ] Add translations to `shared/i18n/`
- [ ] Use shared hooks (`useI18n`, `useProgress`, etc.)
- [ ] Add game-specific utilities in `src/utils/`
- [ ] Test all game modes and difficulty levels
- [ ] Test language switching (is, en, pl)
- [ ] Test accessibility features
- [ ] Test on mobile devices
- [ ] Run `pnpm check-all`
- [ ] Build and verify production bundle
- [ ] Add game README with instructions

---

## Testing

### Manual Testing

Currently, games are tested manually:

1. **Start dev server:**
   ```bash
   cd games/1-ar/molmassi
   pnpm dev
   ```

2. **Test checklist:**
   - [ ] All game modes work
   - [ ] Scoring calculates correctly
   - [ ] Timer works (if applicable)
   - [ ] Progress saves and loads
   - [ ] Language switching works
   - [ ] Accessibility features work
   - [ ] Mobile responsive
   - [ ] No console errors
   - [ ] Keyboard navigation works

3. **Test in different browsers:**
   - Chrome/Edge
   - Firefox
   - Safari (if on Mac)

4. **Test built version:**
   ```bash
   pnpm build
   open ../../1-ar/molmassi.html
   ```

### Automated Testing (Future)

Planned testing infrastructure:

- **Unit tests** - Vitest for utilities and hooks
- **Component tests** - React Testing Library
- **E2E tests** - Playwright for full game flows

---

## Debugging

### Browser DevTools

**Open DevTools:**
- Chrome/Edge: `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- Firefox: `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)

**Useful Features:**
- **Console** - View logs, errors, warnings
- **Sources** - Set breakpoints, step through code
- **Network** - Monitor API calls, asset loading
- **Application** - View localStorage, cookies

### React Developer Tools

Install the React DevTools extension:
- [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

**Features:**
- Inspect component tree
- View props and state
- Track re-renders
- Profile performance

### Common Debugging Patterns

**1. Debug state changes:**
```typescript
const [score, setScore] = useState(0);

useEffect(() => {
  console.log('Score changed:', score);
}, [score]);
```

**2. Debug props:**
```typescript
function MyComponent(props: Props) {
  console.log('Props:', props);
  return <div>...</div>;
}
```

**3. Debug hooks:**
```typescript
const { progress, updateProgress } = useProgress({ gameId: 'molmassi' });
console.log('Current progress:', progress);
```

**4. Debug localStorage:**
```typescript
// View all saved progress
console.log('All localStorage:', { ...localStorage });

// View specific game progress
const key = 'kvenno-chemistry-molmassi';
console.log('Molmassi progress:', localStorage.getItem(key));
```

**5. Breakpoint debugging:**
```typescript
function calculateScore(answer: number) {
  debugger; // Execution will pause here
  const correct = currentQuestion.answer;
  return answer === correct ? 10 : 0;
}
```

### TypeScript Errors

**View in IDE:**
- VSCode: Install "TypeScript Vue Plugin" extension
- Errors show inline with red squiggles

**View in terminal:**
```bash
pnpm type-check
```

**Common fixes:**

1. **Missing type:**
   ```typescript
   // Add explicit type
   const data: GameData = { ... };
   ```

2. **Optional chaining:**
   ```typescript
   // Use ?. for possibly undefined
   const name = user?.profile?.name;
   ```

3. **Type assertion (use sparingly):**
   ```typescript
   const value = someValue as ExpectedType;
   ```

---

## Common Tasks

### Add a New Translation

1. **Edit translation files:**
   ```bash
   # shared/i18n/is.json
   {
     "myGame": {
       "newKey": "Íslenskur texti"
     }
   }

   # shared/i18n/en.json
   {
     "myGame": {
       "newKey": "English text"
     }
   }
   ```

2. **Use in component:**
   ```typescript
   const { t } = useI18n();
   <p>{t('myGame.newKey')}</p>
   ```

3. **Test language switching:**
   - Toggle language in game UI
   - Verify text changes

### Add a New Shared Utility

1. **Create utility file:**
   ```typescript
   // shared/utils/myUtil.ts
   export const myFunction = (param: string): number => {
     // Implementation
     return 42;
   };
   ```

2. **Export from index:**
   ```typescript
   // shared/utils/index.ts
   export * from './myUtil';
   ```

3. **Use in game:**
   ```typescript
   import { myFunction } from '@shared/utils';

   const result = myFunction('test');
   ```

### Update Dependencies

```bash
# Check for updates
pnpm outdated

# Update all to latest
pnpm update --latest

# Update specific package
pnpm update react --latest

# After updating, test everything
pnpm validate
```

### Clean Build

```bash
# Remove all build artifacts and node_modules
pnpm clean

# Reinstall everything
pnpm install

# Rebuild everything
pnpm build:all
```

### Add a New Game Component

1. **Create component file:**
   ```typescript
   // games/1-ar/molmassi/src/components/ScoreDisplay.tsx
   interface Props {
     score: number;
     maxScore: number;
   }

   export function ScoreDisplay({ score, maxScore }: Props) {
     const percentage = (score / maxScore) * 100;

     return (
       <div className="score-display">
         <p>Score: {score} / {maxScore}</p>
         <p>{percentage.toFixed(0)}%</p>
       </div>
     );
   }
   ```

2. **Use in App:**
   ```typescript
   import { ScoreDisplay } from './components/ScoreDisplay';

   <ScoreDisplay score={currentScore} maxScore={100} />
   ```

---

## Troubleshooting

### Issue: Dev server won't start

**Error:** `Port 5173 is already in use`

**Solution:**
```bash
# Find and kill process using port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
pnpm dev --port 5174
```

### Issue: Changes not reflected in browser

**Solutions:**
1. Hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Restart dev server
4. Check if file is saved
5. Check console for errors

### Issue: TypeScript errors after pulling changes

**Solution:**
```bash
# Reinstall dependencies
pnpm install

# Clear TypeScript cache
rm -rf node_modules/.cache

# Restart TypeScript server in VSCode
# Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

### Issue: Build fails

**Check:**
1. No TypeScript errors: `pnpm type-check`
2. No lint errors: `pnpm lint`
3. All dependencies installed: `pnpm install`
4. Check build output for specific error

**Common causes:**
- Import path errors
- Missing dependencies
- TypeScript errors
- Invalid Vite config

### Issue: Shared library changes not picked up

**Solution:**
```bash
# From game directory
cd games/1-ar/molmassi

# Clear and reinstall
rm -rf node_modules
pnpm install

# Restart dev server
pnpm dev
```

### Issue: Translation not showing

**Check:**
1. Key exists in all translation files (is.json, en.json, pl.json)
2. Correct key path: `t('game.title')` not `t('title')`
3. No typos in key name
4. File is valid JSON (use JSON validator)

**Debug:**
```typescript
const { t, language } = useI18n();
console.log('Language:', language);
console.log('Translation:', t('your.key', 'FALLBACK'));
```

### Issue: pnpm command not found

**Solution:**
```bash
# Install pnpm globally
npm install -g pnpm

# Verify installation
pnpm --version
```

### Issue: Wrong Node version

**Solution:**
```bash
# Check current version
node --version

# Install Node 18+ using nvm
nvm install 18
nvm use 18

# Or download from nodejs.org
```

---

## Best Practices

### Code Organization

✅ **DO:**
- Keep components small and focused
- Separate data from logic
- Use TypeScript types for everything
- Extract reusable logic to hooks/utils
- Use shared library when possible

❌ **DON'T:**
- Put everything in App.tsx
- Mix data with components
- Use `any` types
- Duplicate code across games
- Ignore TypeScript errors

### Performance

✅ **DO:**
- Use `useCallback` for event handlers
- Use `useMemo` for expensive calculations
- Optimize images (use SVG when possible)
- Keep bundle size small (<250KB)

❌ **DON'T:**
- Create new functions in render
- Do expensive calculations on every render
- Include large images/assets
- Import unused dependencies

### Accessibility

✅ **DO:**
- Use semantic HTML (`<button>`, `<nav>`, etc.)
- Add ARIA labels where needed
- Support keyboard navigation
- Use `useAccessibility` hook
- Test with keyboard only

❌ **DON'T:**
- Use `<div onClick>` instead of `<button>`
- Ignore focus states
- Rely only on mouse/touch
- Forget alt text for images

### Git

✅ **DO:**
- Write descriptive commit messages
- Use conventional commit format
- Keep commits focused and atomic
- Pull before pushing
- Review your changes before committing

❌ **DON'T:**
- Commit broken code
- Use vague messages like "fix stuff"
- Mix unrelated changes in one commit
- Commit `node_modules` or build files
- Force push to shared branches

---

## Resources

### Documentation

- [Main README](README.md) - Repository overview
- [Migration Guide](MIGRATION-GUIDE.md) - How to migrate games
- [Migration Plan](MIGRATION-PLAN.md) - Migration status
- [Shared Library](shared/README.md) - Shared library API
- [Deployment Guide](DEPLOYMENT.md) - How to deploy

### External Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [pnpm Documentation](https://pnpm.io/)

### Tools

- [VSCode](https://code.visualstudio.com/) - Recommended editor
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)

---

## Getting Help

1. **Check documentation** - Start with README and guides
2. **Review examples** - Look at existing games
3. **Search issues** - Check GitHub issues
4. **Ask for help** - Open a new issue with details

**When reporting issues, include:**
- Steps to reproduce
- Expected behavior
- Actual behavior
- Error messages
- Environment (OS, Node version, browser)

---

**Happy coding! 🚀**
