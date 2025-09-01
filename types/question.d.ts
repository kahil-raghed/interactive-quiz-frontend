export interface Choices {
  text: string;
  isCorrect: boolean;
}

export interface Quistions {
  text: string;
  isMath: boolean;
  type: string;
  points: number;
  isMultiTrue: boolean;
  choices: Choices[];
}
