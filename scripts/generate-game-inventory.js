#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const gamesDir = 'games';
const outputFile = 'docs/_generated/games.md';

fs.mkdirSync(path.dirname(outputFile), { recursive: true });

const years = ['1-ar', '2-ar', '3-ar'];
let output = `# Game Inventory

*Auto-generated from games/ directory*

`;

let totalGames = 0;

for (const year of years) {
  const yearDir = path.join(gamesDir, year);
  if (!fs.existsSync(yearDir)) continue;

  const games = fs.readdirSync(yearDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  output += `## Year ${year.replace('-ar', '')}\n\n`;
  output += `| Game | Built | Size |\n|------|-------|------|\n`;

  for (const game of games) {
    const builtPath = `${year}/${game}.html`;
    const exists = fs.existsSync(builtPath);
    const size = exists ? (fs.statSync(builtPath).size / 1024).toFixed(0) + 'KB' : '-';

    output += `| ${game} | ${exists ? '✅' : '❌'} | ${size} |\n`;
    totalGames++;
  }

  output += '\n';
}

output += `---\n\n*${totalGames} games total*\n`;
output += `\nGenerated: ${new Date().toISOString()}\n`;

fs.writeFileSync(outputFile, output);
console.log(`Generated ${outputFile} with ${totalGames} games`);
