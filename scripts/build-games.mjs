#!/usr/bin/env node
/**
 * Build script for Chemistry Games
 * Builds each game and renames output from index.html to [game-name].html
 * to avoid overwriting the year index pages.
 */

import { execSync } from 'child_process';
import { existsSync, renameSync, unlinkSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Threshold to detect year index pages (under 50KB, game builds are 150KB+)
const YEAR_INDEX_MAX_SIZE = 50000;

// Game definitions: [year, folder-name, output-name]
const games = [
  // Year 1 games
  ['1-ar', 'takmarkandi', 'takmarkandi'],
  ['1-ar', 'molmassi', 'molmassi'],
  ['1-ar', 'nafnakerfid', 'nafnakerfid'],
  ['1-ar', 'lausnir', 'lausnir'],
  ['1-ar', 'dimensional-analysis', 'dimensional-analysis'],

  // Year 2 games
  ['2-ar', 'hess-law', 'hess-law'],
  ['2-ar', 'kinetics', 'kinetics'],
  ['2-ar', 'lewis-structures', 'lewis-structures'],
  ['2-ar', 'vsepr-geometry', 'vsepr-geometry'],
  ['2-ar', 'intermolecular-forces', 'intermolecular-forces'],
  ['2-ar', 'organic-nomenclature', 'organic-nomenclature'],
  ['2-ar', 'redox-reactions', 'redox-reactions'],

  // Year 3 games
  ['3-ar', 'ph-titration', 'ph-titration'],
  ['3-ar', 'gas-law-challenge', 'gas-law-challenge'],
  ['3-ar', 'equilibrium-shifter', 'equilibrium-shifter'],
  ['3-ar', 'thermodynamics-predictor', 'thermodynamics-predictor'],
  ['3-ar', 'buffer-recipe-creator', 'buffer-recipe-creator'],
];

const args = process.argv.slice(2);
const targetYear = args.find(a => a.startsWith('--year='))?.split('=')[1];
const targetGame = args.find(a => a.startsWith('--game='))?.split('=')[1];
const verbose = args.includes('--verbose') || args.includes('-v');

console.log('🧪 Chemistry Games Build Script\n');

let successCount = 0;
let failCount = 0;

for (const [year, folder, outputName] of games) {
  // Filter by year or game if specified
  if (targetYear && year !== targetYear) continue;
  if (targetGame && folder !== targetGame) continue;

  const gameDir = join(rootDir, 'games', year, folder);
  const outputDir = join(rootDir, year);
  const tempOutput = join(outputDir, 'index.html');
  const finalOutput = join(outputDir, `${outputName}.html`);

  // Check if game directory exists
  if (!existsSync(gameDir)) {
    console.log(`⚠️  Skipping ${year}/${folder} - directory not found`);
    continue;
  }

  console.log(`📦 Building ${year}/${folder}...`);

  try {
    // Backup year index page if it exists and is small (not a game build)
    let yearIndexBackup = null;
    if (existsSync(tempOutput)) {
      const stats = statSync(tempOutput);
      if (stats.size < YEAR_INDEX_MAX_SIZE) {
        yearIndexBackup = readFileSync(tempOutput, 'utf-8');
        if (verbose) console.log(`   📋 Backed up year index page (${stats.size} bytes)`);
      }
    }

    // Build the game
    execSync('npx vite build', {
      cwd: gameDir,
      stdio: verbose ? 'inherit' : 'pipe',
    });

    // Check if index.html was created
    if (existsSync(tempOutput)) {
      // Remove existing output file if it exists
      if (existsSync(finalOutput)) {
        unlinkSync(finalOutput);
      }

      // Rename index.html to [game-name].html
      renameSync(tempOutput, finalOutput);
      console.log(`   ✅ Created ${year}/${outputName}.html`);
      successCount++;

      // Restore year index page if we backed it up
      if (yearIndexBackup) {
        writeFileSync(tempOutput, yearIndexBackup, 'utf-8');
        if (verbose) console.log(`   📋 Restored year index page`);
      }
    } else {
      console.log(`   ⚠️  Build completed but no index.html found`);
      failCount++;
    }
  } catch (error) {
    console.log(`   ❌ Build failed: ${error.message}`);
    failCount++;
  }
}

console.log(`\n📊 Build Summary: ${successCount} succeeded, ${failCount} failed`);

if (failCount > 0) {
  process.exit(1);
}
