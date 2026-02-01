import { createGameTranslations } from '@shared/hooks/useGameI18n';

/**
 * Limiting Reagent Game Translations
 */
export const gameTranslations = createGameTranslations({
  is: {
    game: {
      title: 'Takmarkandi Hvarfefni',
      subtitle: 'Kvennaskólinn - Efnafræði 1. ár',
      description: 'Lærðu að finna takmarkandi hvarfefni og reikna heimtir',
    },
    menu: {
      selectLevel: 'Veldu stig',
      backToGames: 'Til baka í leikjayfirlit',
    },
    levels: {
      level1: {
        name: 'Stig 1',
        title: 'Grunnhugtök',
        description: 'Skildu hugtökin sjónrænt - hvað eyðist fyrst?',
      },
      level2: {
        name: 'Stig 2',
        title: 'Leiðbeind æfing',
        description: 'Leystu verkefni skref fyrir skref með leiðsögn',
        locked: 'Ljúktu stigi 1 fyrst',
      },
      level3: {
        name: 'Stig 3',
        title: 'Meistarapróf',
        description: 'Veldu erfiðleikastig og kepptu við tímann!',
        locked: 'Ljúktu stigi 2 fyrst',
      },
      level4: {
        name: 'Stig 4',
        title: 'Prósentuheimta',
        description: 'Reiknaðu prósentuheimtu efnahvarfa',
        locked: 'Ljúktu stigi 3 fyrst',
      },
    },
    level4: {
      title: 'Stig 4: Prósentuheimta',
      subtitle: 'Reiknaðu prósentuheimtu efnahvarfa',
      selectDifficulty: 'Veldu erfiðleikastig',
      whatIsPercentYield: 'Hvað er prósentuheimta?',
    },
    progress: {
      title: 'Framvinda',
      levelsCompleted: 'Stig lokið',
      totalScore: 'Heildar stig',
      gamesPlayed: 'Leikir spilaðir',
      accuracy: 'nákvæmni',
      points: 'stig',
      completed: 'Lokið',
      reset: 'Endurstilla',
    },
    learn: {
      title: 'Hvað lærir þú?',
      point1: 'Hvað er takmarkandi hvarfefni og hvers vegna það skiptir máli',
      point2: 'Hvernig á að finna takmarkandi hvarfefni út frá stuðlum',
      point3: 'Reikna magn afurða og afganga eftir hvarf',
      point4: 'Nota stökjómetríu til að leysa raunveruleg vandamál',
      point5: 'Reikna prósentuheimtu og skilja af hverju heimta er undir 100%',
    },
  },
  en: {
    game: {
      title: 'Limiting Reagent',
      subtitle: 'Kvennaskólinn - Chemistry Year 1',
      description: 'Learn to find limiting reagents and calculate yields',
    },
    menu: {
      selectLevel: 'Select level',
      backToGames: 'Back to game overview',
    },
    levels: {
      level1: {
        name: 'Level 1',
        title: 'Basic Concepts',
        description: 'Understand concepts visually - what runs out first?',
      },
      level2: {
        name: 'Level 2',
        title: 'Guided Practice',
        description: 'Solve problems step by step with guidance',
        locked: 'Complete level 1 first',
      },
      level3: {
        name: 'Level 3',
        title: 'Master Test',
        description: 'Choose difficulty and race against time!',
        locked: 'Complete level 2 first',
      },
      level4: {
        name: 'Level 4',
        title: 'Percent Yield',
        description: 'Calculate percent yield of reactions',
        locked: 'Complete level 3 first',
      },
    },
    level4: {
      title: 'Level 4: Percent Yield',
      subtitle: 'Calculate percent yield of reactions',
      selectDifficulty: 'Select difficulty',
      whatIsPercentYield: 'What is percent yield?',
    },
    progress: {
      title: 'Progress',
      levelsCompleted: 'Levels completed',
      totalScore: 'Total score',
      gamesPlayed: 'Games played',
      accuracy: 'accuracy',
      points: 'points',
      completed: 'Completed',
      reset: 'Reset',
    },
    learn: {
      title: 'What will you learn?',
      point1: 'What is a limiting reagent and why it matters',
      point2: 'How to find limiting reagent from coefficients',
      point3: 'Calculate product amounts and excess after reaction',
      point4: 'Use stoichiometry to solve real problems',
      point5: 'Calculate percent yield and understand why yield is less than 100%',
    },
  },
  pl: {
    game: {
      title: 'Substrat ograniczajacy',
      subtitle: 'Kvennaskólinn - Chemia rok 1',
      description: 'Naucz sie znajdowac substrat ograniczajacy i obliczac wydajnosc',
    },
    menu: {
      selectLevel: 'Wybierz poziom',
      backToGames: 'Powrot do przegladu gier',
    },
    levels: {
      level1: {
        name: 'Poziom 1',
        title: 'Podstawowe pojecia',
        description: 'Zrozum pojecia wizualnie - co skonczy sie pierwsze?',
      },
      level2: {
        name: 'Poziom 2',
        title: 'Cwiczenia z prowadzeniem',
        description: 'Rozwiazuj zadania krok po kroku z pomoca',
        locked: 'Najpierw ukoncz poziom 1',
      },
      level3: {
        name: 'Poziom 3',
        title: 'Test mistrzowski',
        description: 'Wybierz trudnosc i scigaj sie z czasem!',
        locked: 'Najpierw ukoncz poziom 2',
      },
      level4: {
        name: 'Poziom 4',
        title: 'Wydajnosc procentowa',
        description: 'Oblicz wydajnosc procentowa reakcji',
        locked: 'Najpierw ukoncz poziom 3',
      },
    },
    level4: {
      title: 'Poziom 4: Wydajnosc procentowa',
      subtitle: 'Oblicz wydajnosc procentowa reakcji',
      selectDifficulty: 'Wybierz trudnosc',
      whatIsPercentYield: 'Czym jest wydajnosc procentowa?',
    },
    progress: {
      title: 'Postep',
      levelsCompleted: 'Ukonczone poziomy',
      totalScore: 'Calkowity wynik',
      gamesPlayed: 'Rozegrane gry',
      accuracy: 'dokladnosc',
      points: 'punkty',
      completed: 'Ukonczone',
      reset: 'Resetuj',
    },
    learn: {
      title: 'Czego sie nauczysz?',
      point1: 'Czym jest substrat ograniczajacy i dlaczego jest wazny',
      point2: 'Jak znalezc substrat ograniczajacy ze wspolczynnikow',
      point3: 'Obliczac ilosci produktow i nadmiaru po reakcji',
      point4: 'Uzywac stechiometrii do rozwiazywania rzeczywistych problemow',
      point5: 'Obliczac wydajnosc procentowa i rozumiec dlaczego jest ponizej 100%',
    },
  },
});
