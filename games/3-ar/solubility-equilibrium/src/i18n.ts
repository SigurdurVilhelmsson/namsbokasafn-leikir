import { createGameTranslations } from '@shared/hooks/useGameI18n';

/**
 * Game-specific translations for Solubility Equilibrium (Ksp) Game
 */
export const gameTranslations = createGameTranslations({
  is: {
    game: {
      title: 'Leysnisjafnvægi',
      subtitle: 'Ksp og botnfall',
      description: 'Lærðu um leysni, Ksp, og hvort botnfall myndast.',
      instructions: 'Veldu þrep til að byrja.',
    },
    menu: {
      selectLevel: 'Veldu þrep',
      level1: 'Þrep 1: Ksp Tjáningar',
      level1Desc: 'Lærðu að skrifa Ksp tjáningar og bera saman leysni',
      level2: 'Þrep 2: Útreikningar',
      level2Desc: 'Reiknaðu mólleysni, Ksp, og sameiginlegu jónu áhrif',
      level3: 'Þrep 3: Botnfall',
      level3Desc: 'Spáðu hvort botnfall myndast með Q vs Ksp',
      locked: 'Læst',
      completed: 'Lokið',
    },
    levels: {
      beginner: 'Byrjandi',
      intermediate: 'Miðlungs',
      advanced: 'Lengra komnir',
    },
  },
  en: {
    game: {
      title: 'Solubility Equilibrium',
      subtitle: 'Ksp and Precipitation',
      description: 'Learn about solubility, Ksp, and precipitation.',
      instructions: 'Select a level to begin.',
    },
    menu: {
      selectLevel: 'Select Level',
      level1: 'Level 1: Ksp Expressions',
      level1Desc: 'Learn to write Ksp expressions and compare solubility',
      level2: 'Level 2: Calculations',
      level2Desc: 'Calculate molar solubility, Ksp, and common ion effects',
      level3: 'Level 3: Precipitation',
      level3Desc: 'Predict precipitation using Q vs Ksp',
      locked: 'Locked',
      completed: 'Completed',
    },
    levels: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },
  },
  pl: {
    game: {
      title: 'Równowaga Rozpuszczalności',
      subtitle: 'Ksp i Wytrącanie',
      description: 'Naucz się o rozpuszczalności, Ksp i wytrącaniu.',
      instructions: 'Wybierz poziom, aby rozpocząć.',
    },
    menu: {
      selectLevel: 'Wybierz Poziom',
      level1: 'Poziom 1: Wyrażenia Ksp',
      level1Desc: 'Naucz się pisać wyrażenia Ksp i porównywać rozpuszczalność',
      level2: 'Poziom 2: Obliczenia',
      level2Desc: 'Oblicz molową rozpuszczalność, Ksp i efekty wspólnego jonu',
      level3: 'Poziom 3: Wytrącanie',
      level3Desc: 'Przewiduj wytrącanie używając Q vs Ksp',
      locked: 'Zablokowany',
      completed: 'Ukończony',
    },
    levels: {
      beginner: 'Początkujący',
      intermediate: 'Średniozaawansowany',
      advanced: 'Zaawansowany',
    },
  },
});
