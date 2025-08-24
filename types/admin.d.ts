export interface Admin extends BaseEntity {
  _id: string;
  name: string;
  email: string;
  userType: "admin" | "teacher" | "student";
  password: string;
}

export interface AdminQuery extends Pick<Admin, "name"> {}
