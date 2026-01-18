---
name: build-game
description: Build a specific game to single HTML
---

# Build Game

Usage: `/build-game <year>/<slug>`

## Runs

```bash
cd games/<year>/<slug>
pnpm build
```

## Example

`/build-game 1-ar/molmassi`

## Reports

- Build success/failure
- Output file size
- Output location (e.g., `1-ar/molmassi.html`)

## Build All Games

```bash
pnpm -r --filter "./games/**" build
```
