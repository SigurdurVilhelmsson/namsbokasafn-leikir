/**
 * Commitlint configuration for conventional commits
 *
 * Commit format: type(scope): message
 *
 * Types:
 * - feat: New feature
 * - fix: Bug fix
 * - docs: Documentation only
 * - style: Code style (formatting, semicolons, etc.)
 * - refactor: Code change that neither fixes a bug nor adds a feature
 * - test: Adding or updating tests
 * - chore: Maintenance tasks
 *
 * Scopes (optional):
 * - shared: Changes to shared library
 * - 1-ar, 2-ar, 3-ar: Year-specific game changes
 * - tools: Build tools and scripts
 * - ci: CI/CD changes
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'perf', 'ci', 'build', 'revert'],
    ],
    'scope-enum': [
      1,
      'always',
      ['shared', '1-ar', '2-ar', '3-ar', 'tools', 'ci', 'deps', 'config'],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 100],
  },
};
