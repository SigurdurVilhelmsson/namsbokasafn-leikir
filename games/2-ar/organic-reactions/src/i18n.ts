import { createGameTranslations } from '@shared/hooks/useGameI18n';

/**
 * Organic Reactions Game Translations
 */
export const gameTranslations = createGameTranslations({
  is: {
    game: {
      title: 'Lífræn efnahvörf',
      subtitle: 'Kvennaskólinn - Efnafræði 2. ár',
      description: 'Lærðu um gerðir efnahvarfa, hvarfganga og efnasmíði',
    },
    intro: {
      title: 'Hvað eru lífræn efnahvörf?',
      description: 'Lífræn efnahvörf eru hvörf sem fela í sér kolefnissambönd. Í þessum leik lærir þú að greina gerðir hvarfa og skipuleggja efnasmíði.',
    },
    levels: {
      level1: {
        name: 'Stig 1: Gerðir efnahvarfa',
        description: 'Viðbót, Staðgengill, Brotthvarf',
        details: 'Lærðu að greina þrjár aðalgerðir lífrænna efnahvarfa.',
      },
      level2: {
        name: 'Stig 2: Hvarfgangar',
        description: 'Kjarnsækni og rafeindasækni',
        details: 'Skildu hvernig rafeindir hreyfast í hvörfum.',
        locked: 'Ljúktu stigi 1 fyrst',
      },
      level3: {
        name: 'Stig 3: Efnasmíði',
        description: 'Skipuleggðu hvörf',
        details: 'Veldu rétt hvarfefni til að búa til markefni.',
        locked: 'Ljúktu stigi 2 fyrst',
      },
    },
    concepts: {
      addition: 'Viðbót',
      substitution: 'Staðgengill',
      elimination: 'Brotthvarf',
      nucleophile: 'Kjarnsækni',
      electrophile: 'Rafeindasækni',
      arrowPushing: 'Bogaörvar',
      mechanism: 'Hvarfgangur',
      synthesis: 'Efnasmíði',
      markovnikov: 'Markovnikov regla',
      sn2: 'SN2 hvarf',
      e2: 'E2 hvarf',
    },
    reactionTypes: {
      addition: {
        name: 'Viðbót (Addition)',
        description: 'Atóm bætast við tvöfalda tengingu',
        example: 'C=C + HBr → C-C(H)(Br)',
      },
      substitution: {
        name: 'Staðgengill (Substitution)',
        description: 'Eitt atóm skipist út fyrir annað',
        example: 'R-X + Nu⁻ → R-Nu + X⁻',
      },
      elimination: {
        name: 'Brotthvarf (Elimination)',
        description: 'Atóm hverfa og tvöföld tenging myndast',
        example: 'R-CH₂-CH₂-X → R-CH=CH₂ + HX',
      },
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
      title: 'Organic Reactions',
      subtitle: 'Kvennaskólinn - Chemistry Year 2',
      description: 'Learn about reaction types, mechanisms, and synthesis planning',
    },
    intro: {
      title: 'What are organic reactions?',
      description: 'Organic reactions involve carbon compounds. In this game you will learn to identify reaction types and plan syntheses.',
    },
    levels: {
      level1: {
        name: 'Level 1: Reaction Types',
        description: 'Addition, Substitution, Elimination',
        details: 'Learn to identify the three main types of organic reactions.',
      },
      level2: {
        name: 'Level 2: Mechanisms',
        description: 'Nucleophiles and Electrophiles',
        details: 'Understand how electrons move in reactions.',
        locked: 'Complete level 1 first',
      },
      level3: {
        name: 'Level 3: Synthesis',
        description: 'Plan reactions',
        details: 'Choose the right reagents to make target molecules.',
        locked: 'Complete level 2 first',
      },
    },
    concepts: {
      addition: 'Addition',
      substitution: 'Substitution',
      elimination: 'Elimination',
      nucleophile: 'Nucleophile',
      electrophile: 'Electrophile',
      arrowPushing: 'Arrow pushing',
      mechanism: 'Mechanism',
      synthesis: 'Synthesis',
      markovnikov: 'Markovnikov rule',
      sn2: 'SN2 reaction',
      e2: 'E2 reaction',
    },
    reactionTypes: {
      addition: {
        name: 'Addition',
        description: 'Atoms add to a double bond',
        example: 'C=C + HBr → C-C(H)(Br)',
      },
      substitution: {
        name: 'Substitution',
        description: 'One atom is replaced by another',
        example: 'R-X + Nu⁻ → R-Nu + X⁻',
      },
      elimination: {
        name: 'Elimination',
        description: 'Atoms leave and a double bond forms',
        example: 'R-CH₂-CH₂-X → R-CH=CH₂ + HX',
      },
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
      title: 'Reakcje organiczne',
      subtitle: 'Kvennaskólinn - Chemia rok 2',
      description: 'Poznaj typy reakcji, mechanizmy i planowanie syntezy',
    },
    intro: {
      title: 'Czym sa reakcje organiczne?',
      description: 'Reakcje organiczne dotycza zwiazkow wegla. W tej grze nauczysz sie identyfikowac typy reakcji i planowac syntezy.',
    },
    levels: {
      level1: {
        name: 'Poziom 1: Typy reakcji',
        description: 'Addycja, Substytucja, Eliminacja',
        details: 'Naucz sie rozpoznawac trzy glowne typy reakcji organicznych.',
      },
      level2: {
        name: 'Poziom 2: Mechanizmy',
        description: 'Nukleofile i elektrofile',
        details: 'Zrozum jak elektrony przemieszczaja sie w reakcjach.',
        locked: 'Najpierw ukoncz poziom 1',
      },
      level3: {
        name: 'Poziom 3: Synteza',
        description: 'Planuj reakcje',
        details: 'Wybierz odpowiednie reagenty aby uzyskac produkt docelowy.',
        locked: 'Najpierw ukoncz poziom 2',
      },
    },
    concepts: {
      addition: 'Addycja',
      substitution: 'Substytucja',
      elimination: 'Eliminacja',
      nucleophile: 'Nukleofil',
      electrophile: 'Elektrofil',
      arrowPushing: 'Strzalki elektronowe',
      mechanism: 'Mechanizm',
      synthesis: 'Synteza',
      markovnikov: 'Regula Markownikowa',
      sn2: 'Reakcja SN2',
      e2: 'Reakcja E2',
    },
    reactionTypes: {
      addition: {
        name: 'Addycja',
        description: 'Atomy dolaczaja do wiazania podwojnego',
        example: 'C=C + HBr → C-C(H)(Br)',
      },
      substitution: {
        name: 'Substytucja',
        description: 'Jeden atom jest zastapiony przez inny',
        example: 'R-X + Nu⁻ → R-Nu + X⁻',
      },
      elimination: {
        name: 'Eliminacja',
        description: 'Atomy odchodza i tworzy sie wiazanie podwojne',
        example: 'R-CH₂-CH₂-X → R-CH=CH₂ + HX',
      },
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
