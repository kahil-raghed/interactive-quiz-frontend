export interface Choices {
  text: string;
  isCorrect: boolean;
}

export interface Quistion {
  _id: string;
  text: string;
  isMath: boolean;
  type: string;
  points: number;
  isMultiTrue: boolean;
  choices: Choices[];
}
