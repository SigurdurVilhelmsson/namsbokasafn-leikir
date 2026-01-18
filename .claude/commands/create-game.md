---
name: create-game
description: Scaffold a new game using tools/create-game.sh
---

# Create Game

Usage: `/create-game <year> <slug> "<title>"`

## Runs

```bash
cd tools
./create-game.sh <year> <slug> "<title>" "<description>"
```

## Example

`/create-game 2-ar electrochemistry "Electrochemistry Quiz"`

Creates:

- `games/2-ar/electrochemistry/` with full structure
- Configured package.json
- Vite config for single-file build
- Basic App.tsx template

## After Creation

```bash
cd games/2-ar/electrochemistry
pnpm install
pnpm dev
```
