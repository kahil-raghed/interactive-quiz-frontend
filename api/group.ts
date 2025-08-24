import axios, { AxiosRequestConfig } from "axios";
import { ApiBase } from "../config/api";
import { CreateGroupRequest, Group, GroupQuery } from "../types/group";
import { axiosInstance } from "./axios";

export const findGroup = (
  query?: Partial<GroupQuery>,
  req?: AxiosRequestConfig
) =>
  axiosInstance.get<Group[]>(`${ApiBase}/api/v1/group`, {
    ...req,
    params: { ...query },
  });

export const getGroupById = (id?: string, req?: AxiosRequestConfig) =>
  axiosInstance.get<Group>(`${ApiBase}/api/v1/group/${id}`, req);

export const createGroup = (
  data: CreateGroupRequest,
  req?: AxiosRequestConfig
) =>
  axiosInstance.post<Pick<Group, "name" | "course" | "students" | "teacher">>(
    `${ApiBase}/api/v1/group`,
    data,
    req
  );

export const updateGroup = (
  id: string,
  data: Partial<Pick<Group, "name" | "course">>,
  req?: AxiosRequestConfig
) => axiosInstance.patch<Group>(`${ApiBase}/api/v1/group/${id}`, data, req);

export const deleteGroup = (id: string, req?: AxiosRequestConfig) =>
  axiosInstance.delete(`${ApiBase}/api/v1/group/${id}`, req);

export const assignStudents = (id: string, studentIds: string[]) =>
  axiosInstance.post(`${ApiBase}/api/v1/group/${id}/assign-students`, {
    studentIds,
  });

export const removeStudents = (id: string, studentIds: string[]) =>
  axiosInstance.post(`${ApiBase}/api/v1/group/${id}/remove-students`, {
    studentIds,
  });
