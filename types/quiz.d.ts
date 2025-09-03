import { BaseEntity } from "./base";
import { Course } from "./course";
import { Group } from "./group";
import { Quistion } from "./question";

export interface Quiz extends BaseEntity {
  group: Group;
  questions: Quistion[];
  scheduledAt: Date | string;
  accessCode: string;
  isOver: boolean;
}

export interface QuizQuery extends Pick<Quiz, "isOver" | "accessCode"> {
  group: string;
}
