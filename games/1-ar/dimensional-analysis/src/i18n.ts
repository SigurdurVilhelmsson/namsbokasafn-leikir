import { createGameTranslations } from '@shared/hooks/useGameI18n';

/**
 * Dimensional Analysis Game Translations
 */
export const gameTranslations = createGameTranslations({
  is: {
    game: {
      title: 'Einingagreining',
      subtitle: 'Kvennaskólinn - Efnafræði 1. ár',
    },
    menu: {
      selectLevel: 'Veldu borð',
      problemsCompleted: 'Verkefnum lokið',
      challenges: 'Áskoranir',
      problems: 'Verkefni',
    },
    levels: {
      level1: {
        name: 'Hugtök',
        description: 'Sjónrænt nám - engir útreikningar',
      },
      level2: {
        name: 'Hagnýting',
        description: 'Spáðu fyrir um og rökstyddu',
      },
      level3: {
        name: 'Útreikningar',
        description: 'Fullir útreikningar með formúlum',
      },
    },
    stats: {
      title: 'Tölfræði',
      overallProgress: 'Heildarframvinda',
      problemsCompleted: 'Verkefnum lokið',
      currentLevel: 'Núverandi borð',
      accuracy: 'Hittni',
      predictionAccuracy: 'Hittni spár',
      averageScore: 'Meðalskor',
      level1Stats: 'Borð 1 - Hugtök',
      level2Stats: 'Borð 2 - Hagnýting',
      level3Stats: 'Borð 3 - Útreikningar',
    },
    level1: {
      title: 'Borð 1: Hugtök',
      challenge: 'Áskorun',
      accuracy: 'Hittni',
      selectFactor: 'Veldur þátt þannig að einingin sem þú vilt fella út sé andspænis upphafsstærðinni',
      correctExplanation: 'Rétt! Þú skildir hvernig á að nota umreikningsþætti.',
    },
    level2: {
      title: 'Borð 2: Hagnýting',
      problem: 'Verkefni',
      selectConversionFactor: 'Veldu umreikningsþátt',
      correctPath: 'Rétt umreikningsleið',
      correctAnswer: 'Rétt!',
    },
    level3: {
      title: 'Borð 3: Útreikningar',
      challenge: 'Áskorun',
      totalAmount: 'Heildarmagn',
      selectCorrectPath: 'Veldu rétta leið',
      selectPath: 'Veldu leið',
      totalScore: 'Heildarskor',
      correctMethod: 'Rétt aðferð (þáttaaðferð)',
      categories: {
        cooking: 'Matreiðsla',
        pharmacy: 'Lyfjafræði',
        engineering: 'Verkfræði',
        sports: 'Íþróttir',
        travel: 'Ferðalög',
        lab: 'Rannsóknarstofa',
      },
    },
    feedback: {
      correct: 'Rétt!',
      incorrect: 'Rangt',
    },
  },
  en: {
    game: {
      title: 'Dimensional Analysis',
      subtitle: 'Kvennaskólinn - Chemistry Year 1',
    },
    menu: {
      selectLevel: 'Select level',
      problemsCompleted: 'Problems completed',
      challenges: 'Challenges',
      problems: 'Problems',
    },
    levels: {
      level1: {
        name: 'Concepts',
        description: 'Visual learning - no calculations',
      },
      level2: {
        name: 'Application',
        description: 'Predict and reason',
      },
      level3: {
        name: 'Calculations',
        description: 'Full calculations with formulas',
      },
    },
    stats: {
      title: 'Statistics',
      overallProgress: 'Overall Progress',
      problemsCompleted: 'Problems completed',
      currentLevel: 'Current level',
      accuracy: 'Accuracy',
      predictionAccuracy: 'Prediction accuracy',
      averageScore: 'Average score',
      level1Stats: 'Level 1 - Concepts',
      level2Stats: 'Level 2 - Application',
      level3Stats: 'Level 3 - Calculations',
    },
    level1: {
      title: 'Level 1: Concepts',
      challenge: 'Challenge',
      accuracy: 'Accuracy',
      selectFactor: 'Select a factor so that the unit you want to cancel is on the opposite side of the starting amount',
      correctExplanation: 'Correct! You understood how to use conversion factors.',
    },
    level2: {
      title: 'Level 2: Application',
      problem: 'Problem',
      selectConversionFactor: 'Select conversion factor',
      correctPath: 'Correct conversion path',
      correctAnswer: 'Correct!',
    },
    level3: {
      title: 'Level 3: Calculations',
      challenge: 'Challenge',
      totalAmount: 'Total amount',
      selectCorrectPath: 'Select the correct path',
      selectPath: 'Select path',
      totalScore: 'Total score',
      correctMethod: 'Correct method (factor method)',
      categories: {
        cooking: 'Cooking',
        pharmacy: 'Pharmacy',
        engineering: 'Engineering',
        sports: 'Sports',
        travel: 'Travel',
        lab: 'Laboratory',
      },
    },
    feedback: {
      correct: 'Correct!',
      incorrect: 'Incorrect',
    },
  },
  pl: {
    game: {
      title: 'Analiza wymiarowa',
      subtitle: 'Kvennaskólinn - Chemia rok 1',
    },
    menu: {
      selectLevel: 'Wybierz poziom',
      problemsCompleted: 'Ukonczone zadania',
      challenges: 'Wyzwania',
      problems: 'Zadania',
    },
    levels: {
      level1: {
        name: 'Pojecia',
        description: 'Nauka wizualna - bez obliczen',
      },
      level2: {
        name: 'Zastosowanie',
        description: 'Przewiduj i rozumuj',
      },
      level3: {
        name: 'Obliczenia',
        description: 'Pelne obliczenia z wzorami',
      },
    },
    stats: {
      title: 'Statystyki',
      overallProgress: 'Ogolny postep',
      problemsCompleted: 'Ukonczone zadania',
      currentLevel: 'Obecny poziom',
      accuracy: 'Dokladnosc',
      predictionAccuracy: 'Dokladnosc przewidywan',
      averageScore: 'Sredni wynik',
      level1Stats: 'Poziom 1 - Pojecia',
      level2Stats: 'Poziom 2 - Zastosowanie',
      level3Stats: 'Poziom 3 - Obliczenia',
    },
    level1: {
      title: 'Poziom 1: Pojecia',
      challenge: 'Wyzwanie',
      accuracy: 'Dokladnosc',
      selectFactor: 'Wybierz wspolczynnik tak, aby jednostka, ktora chcesz usunac, byla po przeciwnej stronie',
      correctExplanation: 'Poprawnie! Zrozumiales, jak uzywac wspolczynnikow konwersji.',
    },
    level2: {
      title: 'Poziom 2: Zastosowanie',
      problem: 'Zadanie',
      selectConversionFactor: 'Wybierz wspolczynnik konwersji',
      correctPath: 'Poprawna sciezka konwersji',
      correctAnswer: 'Poprawnie!',
    },
    level3: {
      title: 'Poziom 3: Obliczenia',
      challenge: 'Wyzwanie',
      totalAmount: 'Calkowita ilosc',
      selectCorrectPath: 'Wybierz poprawna sciezke',
      selectPath: 'Wybierz sciezke',
      totalScore: 'Calkowity wynik',
      correctMethod: 'Poprawna metoda (metoda wspolczynnikowa)',
      categories: {
        cooking: 'Gotowanie',
        pharmacy: 'Farmacja',
        engineering: 'Inzynieria',
        sports: 'Sport',
        travel: 'Podroze',
        lab: 'Laboratorium',
      },
    },
    feedback: {
      correct: 'Poprawnie!',
      incorrect: 'Niepoprawnie',
    },
  },
});
