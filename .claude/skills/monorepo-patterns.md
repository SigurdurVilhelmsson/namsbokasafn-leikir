---
name: monorepo-patterns
description: pnpm workspace patterns. Triggers for dependencies, builds.
---

# Monorepo Patterns

## Structure

```
namsbokasafn-leikir/
├── package.json           # Root (scripts, devDeps)
├── pnpm-workspace.yaml    # Workspace config
├── shared/                # @shared package
└── games/
    └── <year>/<game>/     # Individual packages
```

## pnpm Commands

```bash
# Install all dependencies
pnpm install

# Run in specific package
pnpm --filter <package> <command>

# Run in all games
pnpm -r --filter "./games/**" build
```

## Shared Package

Games import from shared via workspace protocol:

```json
// games/1-ar/molmassi/package.json
{
  "dependencies": {
    "@shared": "workspace:*"
  }
}
```

## Adding Dependencies

```bash
# Add to specific game
cd games/1-ar/molmassi
pnpm add <package>

# Add to shared (affects all)
cd shared
pnpm add <package>

# Add dev dependency to root
pnpm add -D <package> -w
```

## Build Output

Each game builds to a single HTML file:

```
games/1-ar/molmassi/ (source)
    ↓ pnpm build
1-ar/molmassi.html (built, deployment-ready)
```

## Type Checking

```bash
# Check all packages
pnpm -r type-check

# Check specific game
cd games/1-ar/molmassi
pnpm type-check
```
