import { BaseEntity } from "./base";

export interface Student extends BaseEntity {
  studentNumber: string;
  name: string;
  email: string;
  year: string;
  password: string;
  userType: "student";
}
