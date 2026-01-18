#!/usr/bin/env node
import fs from 'fs';

const years = ['1-ar', '2-ar', '3-ar'];
let missing = [];

for (const year of years) {
  const gamesDir = `games/${year}`;
  if (!fs.existsSync(gamesDir)) continue;

  const games = fs.readdirSync(gamesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const game of games) {
    const builtPath = `${year}/${game}.html`;
    if (!fs.existsSync(builtPath)) {
      missing.push(`${year}/${game}`);
    }
  }
}

if (missing.length > 0) {
  console.log('Missing builds:');
  missing.forEach(g => console.log(`  - ${g}`));
  process.exit(1);
} else {
  console.log('All games have builds');
}
