import { createGameTranslations } from '@shared/hooks/useGameI18n';

/**
 * Chemical Nomenclature (Nafnakerfid) Game Translations
 * Game about learning to name chemical compounds
 */
export const gameTranslations = createGameTranslations({
  is: {
    game: {
      title: 'Nafnakerfið',
      subtitle: 'Læra að nefna efnasambönd',
    },
    menu: {
      progress: 'Framvinda',
      reset: 'Endurstilla',
      levelsCompleted: 'Stig lokið',
      totalPoints: 'Heildar stig',
      gamesPlayed: 'Leikir spilaðir',
      backToGames: 'Til baka í leikjayfirlit',
      completed: 'Lokið',
      best: 'Besta',
      moves: 'leikir',
      completeLevel1First: 'Ljúktu stigi 1 fyrst',
      completeLevel2First: 'Ljúktu stigi 2 fyrst',
    },
    levels: {
      level1: {
        name: 'Stig 1',
        title: 'Grunnreglur',
        description: 'Læra reglurnar um nafngiftir efnasambanda',
      },
      level2: {
        name: 'Stig 2',
        title: 'Æfing með leiðsögn',
        description: 'Æfðu þig í að nefna efnasambönd skref fyrir skref',
      },
      level3: {
        name: 'Stig 3',
        title: 'Minnisleikur',
        description: 'Paraðu saman formúlur og nöfn í minnisleik',
      },
      level4: {
        name: 'Stig 4',
        title: 'Fjölatóma jónaæfing',
        description: 'Lærðu helstu fjölatóma jónirnar á flasskorta-stíl',
      },
      level5: {
        name: 'Stig 5',
        title: 'Formúla úr nafni',
        description: 'Skrifaðu formúlur út frá efnanöfnum',
      },
      level6: {
        name: 'Stig 6',
        title: 'Rómverskur tölustuðull',
        description: 'Málmar með breytilega hleðslu og rómverskar tölur',
      },
    },
  },
  en: {
    game: {
      title: 'Chemical Nomenclature',
      subtitle: 'Learn to name chemical compounds',
    },
    menu: {
      progress: 'Progress',
      reset: 'Reset',
      levelsCompleted: 'Levels completed',
      totalPoints: 'Total points',
      gamesPlayed: 'Games played',
      backToGames: 'Back to game overview',
      completed: 'Completed',
      best: 'Best',
      moves: 'moves',
      completeLevel1First: 'Complete level 1 first',
      completeLevel2First: 'Complete level 2 first',
    },
    levels: {
      level1: {
        name: 'Level 1',
        title: 'Basic Rules',
        description: 'Learn the rules for naming chemical compounds',
      },
      level2: {
        name: 'Level 2',
        title: 'Guided Practice',
        description: 'Practice naming chemical compounds step by step',
      },
      level3: {
        name: 'Level 3',
        title: 'Memory Game',
        description: 'Match formulas and names in a memory game',
      },
      level4: {
        name: 'Level 4',
        title: 'Polyatomic Ion Drill',
        description: 'Learn key polyatomic ions using flashcard-style practice',
      },
      level5: {
        name: 'Level 5',
        title: 'Formula from Name',
        description: 'Write formulas from chemical names',
      },
      level6: {
        name: 'Level 6',
        title: 'Stock System Mastery',
        description: 'Variable-charge metals with Roman numerals',
      },
    },
  },
  pl: {
    game: {
      title: 'Nomenklatura chemiczna',
      subtitle: 'Naucz sie nazywac zwiazki chemiczne',
    },
    menu: {
      progress: 'Postep',
      reset: 'Resetuj',
      levelsCompleted: 'Ukonczone poziomy',
      totalPoints: 'Suma punktow',
      gamesPlayed: 'Rozegrane gry',
      backToGames: 'Powrot do przegladu gier',
      completed: 'Ukonczone',
      best: 'Najlepszy',
      moves: 'ruchy',
      completeLevel1First: 'Najpierw ukonzcz poziom 1',
      completeLevel2First: 'Najpierw ukonzcz poziom 2',
    },
    levels: {
      level1: {
        name: 'Poziom 1',
        title: 'Podstawowe zasady',
        description: 'Poznaj zasady nazywania zwiazkow chemicznych',
      },
      level2: {
        name: 'Poziom 2',
        title: 'Cwiczenia z przewodnikiem',
        description: 'Cwicz nazywanie zwiazkow chemicznych krok po kroku',
      },
      level3: {
        name: 'Poziom 3',
        title: 'Gra pamieci',
        description: 'Dopasuj wzory i nazwy w grze pamieci',
      },
      level4: {
        name: 'Poziom 4',
        title: 'Cwiczenie jonow wieloatomowych',
        description: 'Naucz sie kluczowych jonow wieloatomowych za pomoca fiszek',
      },
      level5: {
        name: 'Poziom 5',
        title: 'Wzor z nazwy',
        description: 'Zapisz wzory na podstawie nazw chemicznych',
      },
      level6: {
        name: 'Poziom 6',
        title: 'Opanowanie systemu Stocka',
        description: 'Metale o zmiennej wartosciowosci z cyframi rzymskimi',
      },
    },
  },
});
