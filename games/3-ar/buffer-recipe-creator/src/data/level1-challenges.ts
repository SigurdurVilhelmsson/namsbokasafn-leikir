// Level 1: Conceptual Buffer Builder Challenges
// Students learn through visual manipulation, NO calculations

export interface Level1Challenge {
  id: number;
  system: string;
  acidFormula: string;
  baseFormula: string;
  acidName: string;
  baseName: string;
  pKa: number;
  targetPH: number;
  targetRatioMin: number;  // [Base]/[Acid] minimum
  targetRatioMax: number;  // [Base]/[Acid] maximum
  context: string;
  hint: string;
  // Post-success explanation
  explanation: string;
}

export const LEVEL1_CHALLENGES: Level1Challenge[] = [
  {
    id: 1,
    system: 'CH₃COOH / CH₃COO⁻',
    acidFormula: 'CH₃COOH',
    baseFormula: 'CH₃COO⁻',
    acidName: 'Ediksýra',
    baseName: 'Asetatjón',
    pKa: 4.74,
    targetPH: 4.74,
    targetRatioMin: 0.9,
    targetRatioMax: 1.1,
    context: 'Þú þarft að búa til stuðpúða við pH 4.74 fyrir rannsóknarstofu.',
    hint: 'Þegar pH = pKa, þarftu JAFNT af sýru og basa!',
    explanation: 'Þegar sýra og basi eru í jafnvægi (1:1), þá er pH nákvæmlega jafnt pKa. Þetta er miðpunktur stuðpúðans!'
  },
  {
    id: 2,
    system: 'CH₃COOH / CH₃COO⁻',
    acidFormula: 'CH₃COOH',
    baseFormula: 'CH₃COO⁻',
    acidName: 'Ediksýra',
    baseName: 'Asetatjón',
    pKa: 4.74,
    targetPH: 5.00,
    targetRatioMin: 1.6,
    targetRatioMax: 2.0,
    context: 'Þú þarft basískari stuðpúða, pH 5.0',
    hint: 'Hærra pH þarf MEIRA af basa en sýru!',
    explanation: 'Til að hækka pH yfir pKa þarf meira af basa. Hlutfallið [Basi]/[Sýra] > 1 gefur hærra pH.'
  },
  {
    id: 3,
    system: 'CH₃COOH / CH₃COO⁻',
    acidFormula: 'CH₃COOH',
    baseFormula: 'CH₃COO⁻',
    acidName: 'Ediksýra',
    baseName: 'Asetatjón',
    pKa: 4.74,
    targetPH: 4.50,
    targetRatioMin: 0.5,
    targetRatioMax: 0.65,
    context: 'Þú þarft súrari stuðpúða, pH 4.5',
    hint: 'Lægra pH þarf MEIRA af sýru en basa!',
    explanation: 'Til að lækka pH undir pKa þarf meira af sýru. Hlutfallið [Basi]/[Sýra] < 1 gefur lægra pH.'
  },
  {
    id: 4,
    system: 'H₂PO₄⁻ / HPO₄²⁻',
    acidFormula: 'H₂PO₄⁻',
    baseFormula: 'HPO₄²⁻',
    acidName: 'Díhýdrógenfosfat',
    baseName: 'Hýdrógenfosfat',
    pKa: 7.20,
    targetPH: 7.20,
    targetRatioMin: 0.9,
    targetRatioMax: 1.1,
    context: 'Búa til stuðpúða fyrir lækningalausnir (pH 7.2)',
    hint: 'pH = pKa → jafnt hlutfall!',
    explanation: 'Fosfatstuðpúði er mikilvægur í líkamanum. Sama reglan gildir: jafnt hlutfall = pH við pKa.'
  },
  {
    id: 5,
    system: 'H₂PO₄⁻ / HPO₄²⁻',
    acidFormula: 'H₂PO₄⁻',
    baseFormula: 'HPO₄²⁻',
    acidName: 'Díhýdrógenfosfat',
    baseName: 'Hýdrógenfosfat',
    pKa: 7.20,
    targetPH: 7.40,
    targetRatioMin: 1.4,
    targetRatioMax: 1.7,
    context: 'Líffræðilegur stuðpúði við pH 7.4 (blóð pH)',
    hint: 'Þarftu meira af basa til að hækka pH yfir pKa',
    explanation: 'Blóð hefur pH um 7.4, sem er aðeins yfir pKa fosfats. Þess vegna er lítið meira af basa í blóði.'
  },
  {
    id: 6,
    system: 'NH₄⁺ / NH₃',
    acidFormula: 'NH₄⁺',
    baseFormula: 'NH₃',
    acidName: 'Ammóníumjón',
    baseName: 'Ammóníak',
    pKa: 9.25,
    targetPH: 9.25,
    targetRatioMin: 0.9,
    targetRatioMax: 1.1,
    context: 'Basískur stuðpúði fyrir efnahvörf',
    hint: 'Sama reglan gildir: pH = pKa = jöfn hlutföll',
    explanation: 'Ammóníustuðpúði virkar við hátt pH. Sama hugmynd: jafnt hlutfall gefur pH = pKa, óháð hvaða stuðpúðakerfi er notað.'
  }
];
