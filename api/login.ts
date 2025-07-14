import { ApiBase } from "@/config/api";
import { Login } from "@/types/login";
import axios, { AxiosRequestConfig } from "axios";

export const login = async ({
  data,
  role,
  req,
}: {
  data: Login;
  role: "admin" | "student" | "teachers";
  req?: AxiosRequestConfig;
}) =>
  (
    await axios.post<{ jwtToken: string }>(
      `${ApiBase}/api/v1/${role}/login`,
      data,
      { ...req }
    )
  ).data;
