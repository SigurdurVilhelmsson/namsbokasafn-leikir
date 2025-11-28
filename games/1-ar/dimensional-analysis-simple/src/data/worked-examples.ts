// Worked examples with step-by-step explanations
export interface WorkedExampleStep {
  text: string;
  visual: {
    current?: string;
    target?: string;
    factor?: string;
    equals?: string;
    equation?: string;
    cancel?: string;
    numerator?: string[];
    denominator?: string[];
    result?: string;
  };
}

export interface WorkedExample {
  problem: {
    value: number;
    from: string;
    to: string;
  };
  steps: WorkedExampleStep[];
}

export const WORKED_EXAMPLES: WorkedExample[] = [
  {
    problem: { value: 5000, from: 'g', to: 'kg' },
    steps: [
      {
        text: "Við höfum 5000 grömm og viljum breyta í kílógrömm.",
        visual: { current: "5000 g", target: "? kg" }
      },
      {
        text: "Við vitum að 1 kg = 1000 g. Þetta þýðir að (1 kg)/(1000 g) = 1.",
        visual: { factor: "1 kg / 1000 g", equals: "1" }
      },
      {
        text: "Þegar við margföldum með 1, breytist gildið ekki - bara einingin!",
        visual: { equation: "5000 g × (1 kg / 1000 g)" }
      },
      {
        text: "Athugaðu: 'g' er í teljara OG nefnara, þannig að það strikast út.",
        visual: { cancel: "g", numerator: ["g"], denominator: ["g"] }
      },
      {
        text: "Eftir stendur: 5000 × (1/1000) kg = 5 kg ✓",
        visual: { result: "5 kg" }
      }
    ]
  },
  {
    problem: { value: 2.5, from: 'km', to: 'm' },
    steps: [
      {
        text: "Við höfum 2.5 kílómetra og viljum breyta í metra.",
        visual: { current: "2.5 km", target: "? m" }
      },
      {
        text: "Við vitum að 1 km = 1000 m, þannig að (1000 m)/(1 km) = 1.",
        visual: { factor: "1000 m / 1 km", equals: "1" }
      },
      {
        text: "Við margföldum upphafsgildi með umbreytingarstuðli.",
        visual: { equation: "2.5 km × (1000 m / 1 km)" }
      },
      {
        text: "'km' strikast út þar sem það er bæði í teljara og nefnara.",
        visual: { cancel: "km", numerator: ["km"], denominator: ["km"] }
      },
      {
        text: "Niðurstaðan: 2.5 × 1000 m = 2500 m ✓",
        visual: { result: "2500 m" }
      }
    ]
  },
  {
    problem: { value: 150, from: 'cm', to: 'm' },
    steps: [
      {
        text: "Við höfum 150 sentímetra og viljum breyta í metra.",
        visual: { current: "150 cm", target: "? m" }
      },
      {
        text: "Við vitum að 100 cm = 1 m, þannig að (1 m)/(100 cm) = 1.",
        visual: { factor: "1 m / 100 cm", equals: "1" }
      },
      {
        text: "Við margföldum: 150 cm × (1 m / 100 cm)",
        visual: { equation: "150 cm × (1 m / 100 cm)" }
      },
      {
        text: "'cm' strikast út.",
        visual: { cancel: "cm", numerator: ["cm"], denominator: ["cm"] }
      },
      {
        text: "Niðurstaðan: 150/100 m = 1.5 m ✓",
        visual: { result: "1.5 m" }
      }
    ]
  }
];
