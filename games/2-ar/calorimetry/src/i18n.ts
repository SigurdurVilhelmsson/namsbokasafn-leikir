import { createGameTranslations } from '@shared/hooks/useGameI18n';

/**
 * Calorimetry Game Translations
 */
export const gameTranslations = createGameTranslations({
  is: {
    game: {
      title: 'Hitalitun',
      subtitle: 'Kvennaskólinn - Efnafræði 2. ár',
      description: 'Lærðu um varmaflæði, orkumælingar og hitabreytingar í efnahvörfum',
    },
    intro: {
      title: 'Hvað er hitalitun?',
      description: 'Hitalitun (calorimetry) er vísindi þess að mæla varmaflæði í efnahvörfum.',
    },
    levels: {
      level1: {
        name: 'Stig 1: Varmarýmd',
        description: 'q = mcΔT formúlan',
        details: 'Lærðu um eðlisvarma og varmarýmd.',
      },
      level2: {
        name: 'Stig 2: Kaffibollahitamælir',
        description: 'Stöðugur þrýstingur',
        details: 'Mældu ΔH upplausnarhvarfa.',
        locked: 'Ljúktu stigi 1 fyrst',
      },
      level3: {
        name: 'Stig 3: Sprengihitamælir',
        description: 'Stöðugt rúmmál',
        details: 'Mældu orkuinnihald eldsneytis.',
        locked: 'Ljúktu stigi 2 fyrst',
      },
    },
    concepts: {
      heat: 'Varmi (q)',
      specificHeat: 'Eðlisvarmi (c)',
      temperatureChange: 'Hitabreyting (ΔT)',
      enthalpy: 'Enþalpía (ΔH)',
      internalEnergy: 'Innri orka (ΔU)',
      exothermic: 'Exóþermt',
      endothermic: 'Endóþermt',
      energyContent: 'Orkuinnihald',
    },
    progress: {
      title: 'Framvinda',
      levelsCompleted: 'Stig lokið',
      totalScore: 'Heildar stig',
      gamesPlayed: 'Leikir spilaðir',
      reset: 'Endurstilla',
    },
  },
  en: {
    game: {
      title: 'Calorimetry',
      subtitle: 'Kvennaskólinn - Chemistry Year 2',
      description: 'Learn about heat flow, energy measurements, and temperature changes in reactions',
    },
    intro: {
      title: 'What is calorimetry?',
      description: 'Calorimetry is the science of measuring heat flow in chemical reactions.',
    },
    levels: {
      level1: {
        name: 'Level 1: Heat Capacity',
        description: 'q = mcΔT formula',
        details: 'Learn about specific heat and heat capacity.',
      },
      level2: {
        name: 'Level 2: Coffee-Cup Calorimeter',
        description: 'Constant pressure',
        details: 'Measure ΔH of dissolution reactions.',
        locked: 'Complete level 1 first',
      },
      level3: {
        name: 'Level 3: Bomb Calorimeter',
        description: 'Constant volume',
        details: 'Measure energy content of fuels.',
        locked: 'Complete level 2 first',
      },
    },
    concepts: {
      heat: 'Heat (q)',
      specificHeat: 'Specific heat (c)',
      temperatureChange: 'Temperature change (ΔT)',
      enthalpy: 'Enthalpy (ΔH)',
      internalEnergy: 'Internal energy (ΔU)',
      exothermic: 'Exothermic',
      endothermic: 'Endothermic',
      energyContent: 'Energy content',
    },
    progress: {
      title: 'Progress',
      levelsCompleted: 'Levels completed',
      totalScore: 'Total score',
      gamesPlayed: 'Games played',
      reset: 'Reset',
    },
  },
  pl: {
    game: {
      title: 'Kalorymetria',
      subtitle: 'Kvennaskólinn - Chemia rok 2',
      description: 'Poznaj przeplyw ciepla, pomiary energii i zmiany temperatury w reakcjach',
    },
    intro: {
      title: 'Czym jest kalorymetria?',
      description: 'Kalorymetria to nauka o pomiarze przeplywu ciepla w reakcjach chemicznych.',
    },
    levels: {
      level1: {
        name: 'Poziom 1: Pojemnosc cieplna',
        description: 'Wzor q = mcΔT',
        details: 'Poznaj cieplo wlasciwe i pojemnosc cieplna.',
      },
      level2: {
        name: 'Poziom 2: Kalorymetr kubkowy',
        description: 'Stale cisnienie',
        details: 'Zmierz ΔH reakcji rozpuszczania.',
        locked: 'Najpierw ukoncz poziom 1',
      },
      level3: {
        name: 'Poziom 3: Kalorymetr bombowy',
        description: 'Stala objetosc',
        details: 'Zmierz zawartosc energetyczna paliw.',
        locked: 'Najpierw ukoncz poziom 2',
      },
    },
    concepts: {
      heat: 'Cieplo (q)',
      specificHeat: 'Cieplo wlasciwe (c)',
      temperatureChange: 'Zmiana temperatury (ΔT)',
      enthalpy: 'Entalpia (ΔH)',
      internalEnergy: 'Energia wewnetrzna (ΔU)',
      exothermic: 'Egzotermiczny',
      endothermic: 'Endotermiczny',
      energyContent: 'Zawartosc energetyczna',
    },
    progress: {
      title: 'Postep',
      levelsCompleted: 'Ukonczone poziomy',
      totalScore: 'Calkowity wynik',
      gamesPlayed: 'Rozegrane gry',
      reset: 'Resetuj',
    },
  },
});
