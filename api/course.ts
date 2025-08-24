import axios, { AxiosRequestConfig } from "axios";
import { ApiBase } from "../config/api";
import { Course } from "../types/course";
import { axiosInstance } from "./axios";

export interface CourseQuery {
  name: string;
  year: string;
  semester: string;
}

export interface CreateCourseRequest
  extends Pick<Course, "name" | "year" | "semester"> {}

export const findCourse = (
  query?: Partial<CourseQuery>,
  req?: AxiosRequestConfig
) =>
  axiosInstance.get<Course[]>(`${ApiBase}/api/v1/course`, {
    ...req,
    params: query,
  });

export const getCourseById = (id: string, req?: AxiosRequestConfig) =>
  axiosInstance.get<Course>(`${ApiBase}/api/v1/course/${id}`, req);

export const createCourse = (
  data: CreateCourseRequest,
  req?: AxiosRequestConfig
) => axiosInstance.post<Course>(`${ApiBase}/api/v1/course`, data, req);

export const updateCourse = (
  id: string,
  data: Partial<Course>,
  req?: AxiosRequestConfig
) => axiosInstance.patch<Course>(`${ApiBase}/api/v1/course/${id}`, data, req);

export const deleteCourse = (id: string, req?: AxiosRequestConfig) =>
  axiosInstance.delete(`${ApiBase}/api/v1/course/${id}`, req);
