import axios, { AxiosRequestConfig } from "axios";
import { ApiBase } from "../config/api";
import { Teacher } from "../types/teacher";
import { axiosInstance } from "./axios";

export interface TeacherQuery {
  name: string;
  email: string;
}

export interface CreateTeacherRequest extends Pick<Teacher, "name" | "email"> {}

export const getTeachers = (
  query?: Partial<TeacherQuery>,
  req?: AxiosRequestConfig
) =>
  axiosInstance.get<Teacher[]>(`${ApiBase}/api/v1/teachers`, {
    ...req,
    params: query,
  });
export const createTeacher = (
  data: CreateTeacherRequest,
  req?: AxiosRequestConfig
) => axiosInstance.post<Teacher>(`${ApiBase}/api/v1/teachers/`, data, req);

export const deleteTeacher = (id: string, req?: AxiosRequestConfig) =>
  axiosInstance.delete(`${ApiBase}/api/v1/teachers/${id}`, req);
