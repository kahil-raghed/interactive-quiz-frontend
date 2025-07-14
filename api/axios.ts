import { ApiBase } from "@/config/api";
import axios from "axios";


export const axiosInstance = axios.create({
  baseURL: ApiBase,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    return Promise.resolve(response);
  },
  (error: any) => {
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
    //   window.location.href = "/#/login";
    }
    return Promise.reject(error);
  }
);
