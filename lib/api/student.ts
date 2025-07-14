import { ApiBase } from "@/config/api";
import { Student } from "@/types/student";
import axios from "axios";
// import { env } from "process";

export const findAllStudents = async () =>
  axios
    .get<Student[]>(`${ApiBase}/api/v1/student`)
    .then((res) => res.data);
