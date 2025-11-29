# Debugging Guide

This guide covers debugging techniques, tools, and best practices for ChemistryGames development.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [VSCode Debugging](#vscode-debugging)
3. [Browser DevTools](#browser-devtools)
4. [React DevTools](#react-devtools)
5. [Error Boundary](#error-boundary)
6. [Source Maps](#source-maps)
7. [Common Debugging Scenarios](#common-debugging-scenarios)
8. [Performance Debugging](#performance-debugging)
9. [Network Debugging](#network-debugging)
10. [Debugging Tips & Tricks](#debugging-tips--tricks)

---

## Quick Start

### Prerequisites

1. **Install VSCode Extensions:**
   - VSCode will prompt you to install recommended extensions
   - Or install manually from `.vscode/extensions.json`

2. **Install Browser Extensions:**
   - [React DevTools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
   - [React DevTools for Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

3. **Start Development Server:**
   ```bash
   cd games/1-ar/molmassi
   pnpm dev
   ```

### Quick Debug Session

1. **Set a breakpoint** in VSCode (click left of line number)
2. **Press F5** to start debugging
3. **Browser opens automatically** with debugger attached
4. **Trigger the code** that has the breakpoint
5. **Execution pauses** at breakpoint - inspect variables!

---

## VSCode Debugging

### Available Configurations

The repository includes pre-configured debugging setups in `.vscode/launch.json`:

#### 1. Debug Chrome
- Launches Chrome with debugging enabled
- Automatically connects to `http://localhost:5173`
- **Usage:** Press `F5` or select "Debug Chrome" from Run & Debug panel

#### 2. Debug Firefox
- Launches Firefox with debugging enabled
- Same as Chrome but for Firefox users
- **Usage:** Select "Debug Firefox" from dropdown

#### 3. Attach to Chrome
- Attach to an already-running Chrome instance
- Requires Chrome started with remote debugging:
  ```bash
  # Mac
  /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

  # Windows
  chrome.exe --remote-debugging-port=9222

  # Linux
  google-chrome --remote-debugging-port=9222
  ```
- **Usage:** Start Chrome manually, then select "Attach to Chrome"

#### 4. Debug Current Game (Chrome)
- Launches Chrome and starts dev server automatically
- Skips node internals and dependencies
- **Usage:** Select "Debug Current Game (Chrome)"

### Using Breakpoints

#### Set Breakpoints

**Click in gutter:**
```typescript
function calculateScore(answer: number) {
  const correct = 42;        // <- Click here
  return answer === correct ? 10 : 0;
}
```

**Conditional breakpoints:**
- Right-click in gutter → "Add Conditional Breakpoint"
- Example: `answer > 50`

**Logpoints:**
- Right-click in gutter → "Add Logpoint"
- Example: `Answer: {answer}, Correct: {correct}`
- Logs to Debug Console without pausing

#### Breakpoint Actions

When paused at a breakpoint:
- **F10** - Step Over (execute current line)
- **F11** - Step Into (enter function call)
- **Shift+F11** - Step Out (exit current function)
- **F5** - Continue (resume execution)
- **Shift+F5** - Stop debugging

### Debug Console

**Access:** View → Debug Console (or Ctrl+Shift+Y)

**Evaluate expressions:**
```javascript
// Check variable value
> currentScore
42

// Execute code
> console.log('Current state:', gameState)

// Call functions
> calculateScore(100)
10
```

### Watch Expressions

**Add watches:**
1. Open Debug sidebar
2. Click "+" in WATCH section
3. Enter expression: `gameState.score`

Watches update automatically as you step through code.

### Call Stack

**View call stack:**
- Shows function call hierarchy
- Click to jump to different stack frames
- Inspect variables at each level

---

## Browser DevTools

### Opening DevTools

**Chrome/Edge:**
- `F12`
- `Ctrl+Shift+I` (Windows/Linux)
- `Cmd+Option+I` (Mac)

**Firefox:**
- `F12`
- `Ctrl+Shift+I` (Windows/Linux)
- `Cmd+Option+I` (Mac)

### Console Panel

**Viewing logs:**
```typescript
console.log('Normal log');
console.warn('Warning message');
console.error('Error message');
console.table({ score: 10, level: 3 }); // Table format
console.group('Game State');
console.log('Score:', score);
console.log('Level:', level);
console.groupEnd();
```

**Filtering:**
- Click filter icon
- Select: All, Errors, Warnings, Info, Logs
- Search by text

**Clear console:**
- Click 🚫 icon
- Or type `clear()` in console
- Or `Ctrl+L`

### Sources Panel

**Finding files:**
- `Ctrl+P` to open file search
- Type filename to find
- Click to open

**Setting breakpoints:**
- Click line number
- Right-click for conditional/logpoint
- Breakpoints persist across page reloads

**Debugging:**
- Same keyboard shortcuts as VSCode
- Hover over variables to inspect
- Right-click variables → "Add to watch"

### Network Panel

**Monitor requests:**
- See all network requests
- Filter by type: XHR, JS, CSS, Img
- View request/response headers
- Check timing information

**Useful for:**
- Debugging translation loading
- Checking asset loading
- Monitoring localStorage operations

### Application Panel

**localStorage:**
- Application → Local Storage → `http://localhost:5173`
- View all saved data
- Edit values manually
- Delete specific keys

**Example keys:**
```
kvenno-chemistry-molmassi
kvenno-language
kvenno-accessibility
```

**Inspect localStorage:**
```javascript
// View all
console.log(localStorage);

// Get specific item
console.log(localStorage.getItem('kvenno-chemistry-molmassi'));

// Set value
localStorage.setItem('test', JSON.stringify({ foo: 'bar' }));

// Clear all
localStorage.clear();
```

---

## React DevTools

### Installation

**Chrome:**
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi

**Firefox:**
https://addons.mozilla.org/en-US/firefox/addon/react-devtools/

### Components Tab

**Inspect component tree:**
- View all React components
- See component hierarchy
- Search for components

**View props and state:**
- Click component in tree
- Right panel shows:
  - Props
  - State
  - Hooks
  - Rendered by

**Edit state live:**
- Click value in right panel
- Type new value
- Component re-renders with new state

**Filter components:**
- Type in search box
- Use regex: `/Button/`
- Filter by component type

### Profiler Tab

**Record performance:**
1. Click "Record" button (red circle)
2. Interact with app
3. Click "Stop"
4. View flame graph

**Analyze renders:**
- See which components re-rendered
- View render duration
- Identify performance bottlenecks
- Check why component re-rendered

**Settings:**
- Highlight updates when components render
- Show render duration in component tree

---

## Error Boundary

### Using ErrorBoundary Component

The shared library includes an `ErrorBoundary` component that catches errors:

**Basic usage:**
```typescript
import { ErrorBoundary } from '@shared/components';

function main() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
```

**Custom fallback:**
```typescript
<ErrorBoundary
  fallback={
    <div>
      <h1>Oops! Something went wrong</h1>
      <button onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  }
>
  <App />
</ErrorBoundary>
```

**With error handler:**
```typescript
<ErrorBoundary
  onError={(error, errorInfo) => {
    // Log to external service
    logErrorToService({ error, errorInfo });

    // Or just console.error
    console.error('Error:', error);
    console.error('Stack:', errorInfo.componentStack);
  }}
>
  <App />
</ErrorBoundary>
```

### Testing Error Boundary

**Manual test:**
```typescript
function BuggyComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Test error!');
  }

  return (
    <button onClick={() => setShouldThrow(true)}>
      Trigger Error
    </button>
  );
}

// Wrap in ErrorBoundary
<ErrorBoundary>
  <BuggyComponent />
</ErrorBoundary>
```

**Using hook:**
```typescript
import { useErrorHandler } from '@shared/components';

function MyComponent() {
  const throwError = useErrorHandler();

  return (
    <button onClick={() => throwError(new Error('Test error'))}>
      Trigger Error
    </button>
  );
}
```

### Error Boundary Features

- **Development:** Shows error details and component stack
- **Production:** Shows user-friendly error message
- **Bilingual:** Error message in Icelandic and English
- **Actions:**
  - Reload page
  - Try again (resets error boundary)

---

## Source Maps

Source maps allow debugging of TypeScript/JSX in original source code.

### Configuration

**Vite (already configured):**
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    sourcemap: true, // Enable for development
  }
});
```

### Using Source Maps

**In browser:**
- Original TypeScript files appear in Sources panel
- Set breakpoints in `.tsx` files
- Step through TypeScript code

**Benefits:**
- Debug original code, not compiled JavaScript
- Meaningful variable names
- Correct line numbers in errors

---

## Common Debugging Scenarios

### Scenario 1: State Not Updating

**Problem:**
```typescript
const [score, setScore] = useState(0);

function handleAnswer() {
  setScore(score + 10);
  console.log(score); // Still shows old value!
}
```

**Debug:**
```typescript
// Add useEffect to track changes
useEffect(() => {
  console.log('Score changed to:', score);
}, [score]);

// Or use callback form
function handleAnswer() {
  setScore(prev => {
    console.log('Old score:', prev);
    return prev + 10;
  });
}
```

### Scenario 2: Infinite Re-renders

**Problem:**
```typescript
useEffect(() => {
  setData(fetchData());
}, [data]); // Re-runs when data changes!
```

**Debug:**
```typescript
// Add console.log to track renders
useEffect(() => {
  console.log('Effect running, data:', data);
  setData(fetchData());
}, [data]);

// Fix: Remove dependency or use different trigger
useEffect(() => {
  setData(fetchData());
}, []); // Only run once
```

### Scenario 3: Props Not Passing

**Problem:**
```typescript
<MyComponent score={score} />

function MyComponent({ score }) {
  console.log(score); // undefined!
}
```

**Debug:**
```typescript
// Check parent component
console.log('Passing score:', score);

// Check child component
function MyComponent(props) {
  console.log('Received props:', props);
  console.log('Score:', props.score);
}

// Fix: Use TypeScript for type safety
interface Props {
  score: number;
}

function MyComponent({ score }: Props) {
  // Now TypeScript will catch missing props
}
```

### Scenario 4: Translation Not Working

**Problem:**
```typescript
const { t } = useI18n();
console.log(t('game.title')); // Returns 'game.title'
```

**Debug:**
```typescript
const { t, language } = useI18n();
console.log('Current language:', language);
console.log('Translation exists:', t('game.title', 'FALLBACK'));

// Check translation file
// shared/i18n/is.json should have:
// {
//   "game": {
//     "title": "Leikur"
//   }
// }
```

### Scenario 5: localStorage Not Saving

**Problem:**
```typescript
localStorage.setItem('score', score); // Doesn't work!
```

**Debug:**
```typescript
// Check browser quota
console.log('localStorage length:', localStorage.length);

// Check value type
console.log('Saving:', score, typeof score);

// Fix: Convert to string
localStorage.setItem('score', String(score));
// Or JSON
localStorage.setItem('score', JSON.stringify(score));
```

---

## Performance Debugging

### React Profiler

**Record session:**
```typescript
import { Profiler } from 'react';

function onRenderCallback(
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>
```

**Use React DevTools Profiler:**
1. Open React DevTools
2. Click Profiler tab
3. Click Record
4. Interact with app
5. Stop recording
6. Analyze flame graph

### Performance API

**Measure execution time:**
```typescript
performance.mark('calculation-start');
const result = expensiveCalculation();
performance.mark('calculation-end');

performance.measure(
  'calculation',
  'calculation-start',
  'calculation-end'
);

const measure = performance.getEntriesByName('calculation')[0];
console.log('Calculation took:', measure.duration, 'ms');
```

**Custom hook:**
```typescript
function usePerformance(label: string) {
  useEffect(() => {
    performance.mark(`${label}-start`);

    return () => {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);

      const measure = performance.getEntriesByName(label)[0];
      console.log(`${label}:`, measure.duration.toFixed(2), 'ms');
    };
  }, [label]);
}

// Usage
function MyComponent() {
  usePerformance('MyComponent');
  // ...
}
```

### Finding Re-render Issues

**Track renders:**
```typescript
function MyComponent() {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`MyComponent rendered ${renderCount.current} times`);
  });

  return <div>...</div>;
}
```

**Use why-did-you-render:**
```typescript
// Install: pnpm add @welldone-software/why-did-you-render

// src/wdyr.ts
import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

// Import before React components
import './wdyr';
import App from './App';
```

### Optimize Performance

**Memoization:**
```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);

// Memoize components
const MemoizedComponent = React.memo(MyComponent);
```

---

## Network Debugging

### Monitor Requests

**Chrome DevTools:**
1. Open DevTools → Network tab
2. Reload page
3. View all requests

**Filter requests:**
- All, XHR/Fetch, JS, CSS, Img, Media, Font, Doc
- Search by name or URL

**Inspect request:**
- Click request
- View Headers, Payload, Response, Timing

### Debugging localStorage Operations

**Monitor in real-time:**
```typescript
// Wrap localStorage.setItem
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  console.log('localStorage.setItem:', key, value);
  return originalSetItem.apply(this, arguments);
};
```

---

## Debugging Tips & Tricks

### Console Tricks

**Better object logging:**
```typescript
// ❌ Bad
console.log('User:', user);

// ✅ Good
console.log('User:', { user });

// ✅ Even better
console.log({ user, score, level });
```

**Styled console:**
```typescript
console.log(
  '%cScore Updated',
  'color: green; font-weight: bold; font-size: 16px',
  score
);
```

**Performance timing:**
```typescript
console.time('Calculation');
expensiveCalculation();
console.timeEnd('Calculation');
// Calculation: 142.3ms
```

**Trace function calls:**
```typescript
function complexFunction() {
  console.trace('complexFunction called');
  // Shows call stack
}
```

### Debugger Statement

**Programmatic breakpoint:**
```typescript
function calculate(value) {
  if (value > 100) {
    debugger; // Execution pauses here
  }
  return value * 2;
}
```

**Production-safe:**
```typescript
if (process.env.NODE_ENV === 'development') {
  debugger;
}
```

### Quick Debugging Functions

**Deep clone for debugging:**
```typescript
const snapshot = JSON.parse(JSON.stringify(complexObject));
console.log('Snapshot:', snapshot);
```

**Compare objects:**
```typescript
console.log('Before:', JSON.stringify(before));
console.log('After:', JSON.stringify(after));
```

### VSCode Snippets

**Create debug snippet:**
```json
// .vscode/debug.code-snippets
{
  "Console Log": {
    "prefix": "clg",
    "body": ["console.log('$1:', $1);"],
    "description": "Console log with label"
  },
  "Debug Point": {
    "prefix": "dbg",
    "body": [
      "if (process.env.NODE_ENV === 'development') {",
      "  debugger;",
      "}"
    ]
  }
}
```

---

## Debugging Checklist

Before reporting a bug:

- [ ] Check browser console for errors
- [ ] Check Network tab for failed requests
- [ ] Check localStorage in Application tab
- [ ] Try in incognito/private mode
- [ ] Try different browser
- [ ] Check if issue reproduces in production build
- [ ] Add console.logs to narrow down issue
- [ ] Try git bisect to find breaking commit
- [ ] Check recent changes in git history

---

## Resources

### Documentation
- [VSCode Debugging](https://code.visualstudio.com/docs/editor/debugging)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [React DevTools](https://react.dev/learn/react-developer-tools)

### Tools
- [React DevTools Extension](https://react.dev/learn/react-developer-tools)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools) (if using Redux)
- [Error Tracking (Sentry)](https://sentry.io/)

---

**Happy debugging! 🐛**
