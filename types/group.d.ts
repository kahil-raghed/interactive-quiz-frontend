import { BaseEntity } from "./base";

export interface Group extends BaseEntity {
  name: string;
  course: string;
  year: string;
  students: string[];
}
