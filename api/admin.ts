import { Admin, AdminQuery } from "@/types/admin";
import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios";
import { ApiBase } from "@/config/api";

export const findAdmin = (
  query?: Partial<AdminQuery>,
  req?: AxiosRequestConfig
) =>
  axiosInstance.get<Admin[]>(`${ApiBase}/api/v1/admin`, {
    ...req,
    params: query,
  });

export const createAdmin = (
  data: Pick<Admin, "name" | "email" | "password">,
  req?: AxiosRequestConfig
) => axiosInstance.post<Admin>(`${ApiBase}/api/v1/admin/admin`, data, req);
