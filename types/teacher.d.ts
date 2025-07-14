import { BaseEntity } from "./base";

export interface Teacher extends BaseEntity {
  userType: "teacher";
  name: string;
  email: string;
  password: string;
}
