import { BaseEntity } from "./base";
import { Course } from "./course";

export interface Group extends BaseEntity {
  name: string;
  course: Course;
  year: string;
  students: string[];
}
