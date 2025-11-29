# Changelog

All notable changes to the ChemistryGames project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Documentation cleanup and reorganization
  - Created `docs/` directory with documentation index
  - Archived completed migration documentation
  - Added this CHANGELOG for future version tracking

---

## [2.0.0] - 2025-11-29

### Summary
Phase 2 Migration Complete! All 12 chemistry games successfully migrated to the new monorepo architecture.

### Added

#### Year 1 Games (1-ar)
- **Dimensional Analysis** - 3-level pedagogical framework with 35 questions
- **Dimensional Analysis Simple** - Tutorial, sandbox, and quiz format
- **Molar Mass Challenge (Mólmassi)** - Practice and competition modes with 29 compounds
- **Compound Name Matchmaker (Nafnakerfið)** - Card matching game with 59 compounds
- **Solution Lab (Lausnir)** - Interactive problem-solving with 5 problem types
- **Limiting Reactant Factory (Takmarkandi)** - Stoichiometry game with 20 reactions

#### Year 3 Games (3-ar)
- **pH Titration Practice** - Virtual lab with 4 titration types
- **pH Titration Master** - Advanced pH calculations including polyprotic acids
- **Gas Law Challenge** - Ideal Gas Law problems with particle visualization
- **Equilibrium Shifter** - Le Chatelier's Principle with 30 equilibrium systems
- **Thermodynamics Predictor** - Gibbs free energy calculations with 30 problems
- **Buffer Recipe Creator** - Henderson-Hasselbalch equation practice

#### Infrastructure
- Monorepo architecture with pnpm workspaces
- Shared component library (`shared/`)
  - Custom hooks: `useI18n`, `useProgress`, `useAccessibility`
  - Utilities: Storage, export, scoring algorithms
  - i18n system with 3 languages (Icelandic, English, Polish)
- Game template system (`tools/game-template/`)
- Automated game creation script (`tools/create-game.sh`)

#### Development Tools
- TypeScript configuration with strict mode
- ESLint and Prettier configuration
- VSCode debugging configurations
- Comprehensive error boundaries
- Source maps for debugging

#### Documentation
- Main README with architecture overview
- Development guide (DEVELOPMENT.md)
- Debugging guide (DEBUGGING.md)
- Deployment guide (DEPLOYMENT.md)
- Migration guide (MIGRATION-GUIDE.md)
- Site structure documentation (KVENNO-STRUCTURE.md)
- Game review guidelines (GAME-REVIEW-PROMPT.md)

### Changed
- All games rebuilt as React + TypeScript + Tailwind CSS apps
- Code reduction: 70-85% smaller codebases (from 1500-3000 lines to 300-500 lines)
- Centralized i18n: Update 1 file affects all games
- Single HTML file output for easy deployment
- Consistent UI/UX across all games

### Technical Details
- **Build System:** Vite with single-file plugin
- **Frontend:** React 18, TypeScript 5.3+, Tailwind CSS
- **Shared Library:** Custom hooks and utilities
- **Output:** Single HTML files (150-220KB each)
- **Deployment:** Static HTML to kvenno.app

---

## [1.0.0] - 2024

### Initial Release

#### Legacy Games (Before Migration)
- Monolithic HTML files (1500-3000 lines each)
- Hard-coded translations
- Duplicated code across games
- No shared components
- Limited maintainability

---

## Migration Phases

### Phase 1: Foundation (Completed 2024)
- ✅ Created shared component library
- ✅ Set up monorepo structure
- ✅ Migrated first complex game (dimensional-analysis)
- ✅ Created game template

### Phase 2: Game Migration (Completed 2025)
- ✅ Migrated all Year 1 games (6/6)
- ✅ Migrated all Year 3 games (6/6)
- ✅ Total: 12 games successfully migrated

### Phase 3: Documentation & Quality (Completed 2025)
- ✅ Updated all repository documentation
- ✅ Created comprehensive migration guides
- ✅ Set up development workflows
- ✅ Configured debugging tools
- ✅ Set up GitHub Actions CI workflow

---

## Version History

- **2.0.0** - Monorepo architecture with all games migrated
- **1.0.0** - Original legacy implementation

---

## Future Plans

See [IMPROVEMENTS.md](IMPROVEMENTS.md) for proposed enhancements:
- Unit testing infrastructure (Vitest)
- Component testing (React Testing Library)
- E2E testing (Playwright)
- Error tracking (Sentry)
- Progressive Web App support
- Analytics and monitoring
- Automated changelog generation

---

## Contributing

Please read [DEVELOPMENT.md](DEVELOPMENT.md) for development workflow and coding standards.

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

Examples:
feat(molmassi): add new difficulty level
fix(shared): correct sig fig validation
docs(readme): update migration status
refactor(lausnir): extract validation logic
```

---

**For detailed migration history, see:** `docs/archive/completed-migrations/MIGRATION-PLAN.md`

**Maintained by:** Sigurður E. Vilhelmsson, Kvennaskólinn í Reykjavík
