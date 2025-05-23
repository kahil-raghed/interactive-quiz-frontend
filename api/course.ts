import axios, { AxiosRequestConfig } from "axios";
import { ApiBase } from "../config/api";
import { Course } from "../types/course";

export interface CourseQuery extends Partial<Course> {}

export interface CreateCourseRequest
  extends Pick<Course, "name" | "year" | "semester"> {}

export const findCourse = (query?: CourseQuery, req?: AxiosRequestConfig) =>
  axios.get<Course[]>(`${ApiBase}/v1/course`, {
    ...req,
    params: query,
  });

export const getCourseById = (id: string, req?: AxiosRequestConfig) =>
  axios.get<Course>(`${ApiBase}/v1/course/${id}`, req);

export const createCourse = (
  data: CreateCourseRequest,
  req?: AxiosRequestConfig
) => axios.post<Course>(`${ApiBase}/v1/course`, data, req);

export const updateCourse = (
  id: string,
  data: Partial<Course>,
  req?: AxiosRequestConfig
) => axios.patch<Course>(`${ApiBase}/v1/course/${id}`, data, req);

export const deleteCourse = (id: string, req?: AxiosRequestConfig) =>
  axios.delete(`${ApiBase}/v1/course/${id}`, req);
