import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios";
import { ApiBase } from "@/config/api";
import { Quiz, QuizQuery } from "@/types/quiz";

export const getQuizzes = (
  query?: Partial<QuizQuery>,
  req?: AxiosRequestConfig
) =>
  axiosInstance.get<Quiz[]>(`${ApiBase}/api/v1/quiz`, {
    ...req,
    params: query,
  });

export const getQuiz = (id?: string, req?: AxiosRequestConfig) =>
  axiosInstance.get<Quiz>(`${ApiBase}/api/v1/quiz/${id}`, req);

export const createQuiz = (
  data: Pick<Quiz, "scheduledAt" & { group: string }>,
  req?: AxiosRequestConfig
) => axiosInstance.post<Quiz>(`${ApiBase}/api/v1/quiz`, data, req);

export const updateQuiz = (
  id: string,
  data: Pick<Quiz, "scheduledAt" & { group: string }>,
  req?: AxiosRequestConfig
) => axiosInstance.patch<Quiz>(`${ApiBase}/api/v1/quiz/${id}`, data, req);

export const deleteQuiz = (id: string, req?: AxiosRequestConfig) =>
  axiosInstance.delete(`${ApiBase}/api/v1/quiz/${id}`, req);
