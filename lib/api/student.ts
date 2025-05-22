import { Student } from "@/app/types/student";
import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";
import { env } from "process";

export const findAllStudents = async () =>
  axios.get<Student[]>(`${env.API_BASE}/v1/student`).then((res) => res.data);
