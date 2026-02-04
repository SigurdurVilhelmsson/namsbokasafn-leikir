import { createGameTranslations } from '@shared/hooks/useGameI18n';

/**
 * Electrochemistry Game Translations
 */
export const gameTranslations = createGameTranslations({
  is: {
    game: {
      title: 'Rafefnafræði',
      subtitle: 'Kvennaskólinn - Efnafræði 2. ár',
      description: 'Lærðu um rafhlöður, rafgreiningu og rafefnafræðilega útreikninga',
    },
    intro: {
      title: 'Hvað er rafefnafræði?',
      description: 'Rafefnafræði fjallar um tengsl milli rafmagns og efnahvarfa. Rafhlöður breyta efnaorku í raforku.',
    },
    levels: {
      level1: {
        name: 'Stig 1: Galvanísk hlaup',
        description: 'Byggðu rafhlöður',
        details: 'Lærðu um anóðu, katóðu og rafeindarflæði.',
      },
      level2: {
        name: 'Stig 2: Staðalmætti (E°)',
        description: 'Notaðu E° töflu',
        details: 'Reiknaðu spennumun og spáðu fyrir um sjálfgengi.',
        locked: 'Ljúktu stigi 1 fyrst',
      },
      level3: {
        name: 'Stig 3: Magnreikningar',
        description: 'Faradays lög',
        details: 'Reiknaðu efnamagn í rafgreiningu.',
        locked: 'Ljúktu stigi 2 fyrst',
      },
    },
    concepts: {
      anode: 'Anóða (oxun)',
      cathode: 'Katóða (afoxun)',
      electronFlow: 'Rafeindarflæði',
      saltBridge: 'Saltbrú',
      standardPotential: 'Staðalmætti (E°)',
      cellPotential: 'Spennumunur hlaups',
      faradayConstant: 'Faraday-fasti',
      electrolysis: 'Rafgreining',
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
      title: 'Electrochemistry',
      subtitle: 'Kvennaskólinn - Chemistry Year 2',
      description: 'Learn about galvanic cells, electrolysis, and electrochemical calculations',
    },
    intro: {
      title: 'What is electrochemistry?',
      description: 'Electrochemistry studies the relationship between electricity and chemical reactions. Batteries convert chemical energy to electrical energy.',
    },
    levels: {
      level1: {
        name: 'Level 1: Galvanic Cells',
        description: 'Build electrochemical cells',
        details: 'Learn about anode, cathode, and electron flow.',
      },
      level2: {
        name: 'Level 2: Standard Potentials (E°)',
        description: 'Use E° tables',
        details: 'Calculate cell potential and predict spontaneity.',
        locked: 'Complete level 1 first',
      },
      level3: {
        name: 'Level 3: Quantitative Calculations',
        description: "Faraday's Laws",
        details: 'Calculate mass in electrolysis.',
        locked: 'Complete level 2 first',
      },
    },
    concepts: {
      anode: 'Anode (oxidation)',
      cathode: 'Cathode (reduction)',
      electronFlow: 'Electron flow',
      saltBridge: 'Salt bridge',
      standardPotential: 'Standard potential (E°)',
      cellPotential: 'Cell potential',
      faradayConstant: 'Faraday constant',
      electrolysis: 'Electrolysis',
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
      title: 'Elektrochemia',
      subtitle: 'Kvennaskólinn - Chemia rok 2',
      description: 'Poznaj ogniwa galwaniczne, elektrolize i obliczenia elektrochemiczne',
    },
    intro: {
      title: 'Czym jest elektrochemia?',
      description: 'Elektrochemia bada zaleznosc miedzy elektrycznoscia a reakcjami chemicznymi. Baterie przeksztalcaja energie chemiczna w elektryczna.',
    },
    levels: {
      level1: {
        name: 'Poziom 1: Ogniwa galwaniczne',
        description: 'Zbuduj ogniwa elektrochemiczne',
        details: 'Poznaj anode, katode i przeplyw elektronow.',
      },
      level2: {
        name: 'Poziom 2: Potencjaly standardowe (E°)',
        description: 'Uzyj tabel E°',
        details: 'Oblicz potencjal ogniwa i przewiduj spontanicznosc.',
        locked: 'Najpierw ukoncz poziom 1',
      },
      level3: {
        name: 'Poziom 3: Obliczenia ilosciowe',
        description: 'Prawa Faradaya',
        details: 'Oblicz mase w elektrolizie.',
        locked: 'Najpierw ukoncz poziom 2',
      },
    },
    concepts: {
      anode: 'Anoda (utlenianie)',
      cathode: 'Katoda (redukcja)',
      electronFlow: 'Przeplyw elektronow',
      saltBridge: 'Mostek solny',
      standardPotential: 'Potencjal standardowy (E°)',
      cellPotential: 'Potencjal ogniwa',
      faradayConstant: 'Stala Faradaya',
      electrolysis: 'Elektroliza',
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
