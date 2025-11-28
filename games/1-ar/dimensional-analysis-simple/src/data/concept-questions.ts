// Concept check questions
export interface ConceptOption {
  text: string;
  correct: boolean;
  feedback?: string;
}

export interface ConceptQuestion {
  question: string;
  options: ConceptOption[];
}

export const CONCEPT_QUESTIONS: ConceptQuestion[] = [
  {
    question: "Af hverju settum við 'g' í nefnara stuðulsins?",
    options: [
      { text: "Til að 'g' strikist út við 'g' í upphafsgildi", correct: true },
      { text: "Til að fá stærri tölu", correct: false, feedback: "Nei - stefna stuðuls ákvarðast af því hvaða einingar þurfa að strikast út, ekki af því hvort talan verður stærri eða minni." },
      { text: "Af því að grömm eru minni en kílógrömm", correct: false, feedback: "Nei - það skiptir ekki máli hver er stærri eða minni. Það sem skiptir máli er að einingarnar strikist út." },
      { text: "Það skiptir ekki máli", correct: false, feedback: "Jú, það skiptir miklu máli! Ef við setjum 'g' í teljara í staðinn, fáum við rangar einingar." }
    ]
  },
  {
    question: "Hvað gerist ef þú snýrð umbreytingarstuðlinum við?",
    options: [
      { text: "Ekkert sérstakt", correct: false, feedback: "Það breytir mjög miklu! Ef við snúum stuðlinum við, þá verða einingarnar rangar." },
      { text: "Einingarnar strikast ekki rétt út", correct: true },
      { text: "Talan verður stærri", correct: false, feedback: "Það fer eftir stuðlinum. En mikilvægara er að einingarnar verða rangar." },
      { text: "Það er sama niðurstaðan", correct: false, feedback: "Nei, ef við snúum stuðlinum við fáum við alveg aðra niðurstöðu - bæði tölu og einingar." }
    ]
  },
  {
    question: "Hvers vegna jafngildir umbreytingarstuðull 1?",
    options: [
      { text: "Af því að teljari og nefnari eru jafnstórir", correct: true },
      { text: "Af því að við viljum að svo sé", correct: false, feedback: "Nei, það er ekki af því að við viljum það - það er raunverulegt stærðfræðilegt jafngildi. 1 kg = 1000 g, þannig að hlutfallið þeirra er 1." },
      { text: "Það jafngildir ekki alltaf 1", correct: false, feedback: "Jú, umbreytingarstuðull jafngildir alltaf 1 af því að teljari og nefnari tákna sama magn." },
      { text: "Af því að við deilum með sama tölunni", correct: false, feedback: "Það er rétt að við deilum með jafnstæðri stærð, en mikilvægara er að skilja að 1 kg og 1000 g eru nákvæmlega sama magn." }
    ]
  }
];
