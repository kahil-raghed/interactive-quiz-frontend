import axios, { AxiosRequestConfig } from "axios";
import { ApiBase } from "../config/api";
import { Student } from "../types/student";
import { axiosInstance } from "./axios";

export interface StudentQuery {
  student_number: string;
  email: string;
  name: string;
}

export interface CreateStudentRequest extends Partial<Student> {}

export const findStudent = (
  query?: Partial<StudentQuery>,
  req?: AxiosRequestConfig
) =>
  axiosInstance.get<Student[]>(`${ApiBase}/api/v1/student`, {
    ...req,
    params: query,
  });

export const getStudentById = (id: string, req?: AxiosRequestConfig) =>
  axiosInstance.get<Student>(`${ApiBase}/api/v1/student/${id}`, req);

export const createStudent = (
  data: CreateStudentRequest,
  req?: AxiosRequestConfig
) => axiosInstance.post<Student>(`${ApiBase}/api/v1/student`, data, req);

export const updateStudent = (
  id: string,
  data: Partial<Student>,
  req?: AxiosRequestConfig
) => axiosInstance.patch<Student>(`${ApiBase}/api/v1/student/${id}`, data, req);

export const deleteStudent = (id: string, req?: AxiosRequestConfig) =>
  axiosInstance.delete(`${ApiBase}/api/v1/student/${id}`, req);
