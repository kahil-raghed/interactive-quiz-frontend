import { BaseEntity } from "./base";
import { Course } from "./course";
import { Student } from "./student";
import { Teacher } from "./teacher";

export interface Group extends BaseEntity {
  name: string;
  course: Course;
  teacher: Teacher;
  students: Student[];
}

export interface GroupQuery {
  teacher_ID: string;
  course_ID: string;
  name: string;
}

export interface CreateGroupRequest {
  name: string;
  course: string;
}
