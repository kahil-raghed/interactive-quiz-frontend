import { BaseEntity } from "./base";
import { Course } from "./course";
import { Group } from "./group";
import { Quistions } from "./question";

export interface Quiz extends BaseEntity {
  group: Group;
  questions: Quistions[];
  scheduledAt: Date | string;
  accessCode: string;
  isOver: boolean;
}

export interface QuizQuery extends Pick<Quiz, "isOver" | "accessCode"> {
  group: string;
}
