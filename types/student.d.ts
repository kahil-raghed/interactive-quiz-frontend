import { BaseEntity } from "./base";

export interface Student extends BaseEntity {
  name: string;
  studentNumber: string;
}
