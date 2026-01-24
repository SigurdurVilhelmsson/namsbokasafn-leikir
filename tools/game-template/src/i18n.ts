import { createGameTranslations } from '@shared/hooks/useGameI18n';

/**
 * Game-specific translations
 *
 * These translations are merged with shared translations from useGameI18n.
 * Game-specific keys override shared keys if they conflict.
 *
 * Access translations using the t() function:
 *   t('game.title')       -> Game-specific
 *   t('common.start')     -> Shared translation
 *   t('game.customKey')   -> Game-specific
 *
 * Shared keys available (see useGameI18n.ts for full list):
 *   common.*      - Start, continue, next, submit, etc.
 *   language.*    - Language names
 *   levels.*      - Level names and descriptions
 *   feedback.*    - Success, error, warning messages
 *   ui.*          - UI elements like reset, achievements, settings
 */
export const gameTranslations = createGameTranslations({
  is: {
    game: {
      title: 'GAME_TITLE',
      subtitle: 'GAME_SUBTITLE',
      description: 'GAME_DESCRIPTION',
      // Add game-specific translations here
      instructions: 'Leiðbeiningar fyrir leikinn',
    },
    // Override shared translations if needed
    // common: {
    //   start: 'Byrja leikinn',
    // },
  },
  en: {
    game: {
      title: 'GAME_TITLE_EN',
      subtitle: 'GAME_SUBTITLE_EN',
      description: 'GAME_DESCRIPTION_EN',
      instructions: 'Game instructions',
    },
  },
  pl: {
    game: {
      title: 'GAME_TITLE_PL',
      subtitle: 'GAME_SUBTITLE_PL',
      description: 'GAME_DESCRIPTION_PL',
      instructions: 'Instrukcje gry',
    },
  },
});
