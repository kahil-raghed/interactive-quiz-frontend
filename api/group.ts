import axios, { AxiosRequestConfig } from "axios";
import { ApiBase } from "../config/api";
import { Group } from "../types/group";
import { axiosInstance } from "./axios";

export interface GroupQuery extends Partial<Group> {}

export interface CreateGroupRequest
  extends Pick<Group, "name" | "year" | "course" | "students"> {}

export const findGroup = (query?: GroupQuery, req?: AxiosRequestConfig) =>
  axiosInstance.get<Group[]>(`${ApiBase}/api/v1/group`, {
    ...req,
    params: query,
  });

export const getGroupById = (id: string, req?: AxiosRequestConfig) =>
  axiosInstance.get<Group>(`${ApiBase}/api/v1/group/${id}`, req);

export const createGroup = (
  data: CreateGroupRequest,
  req?: AxiosRequestConfig
) => axiosInstance.post<Group>(`${ApiBase}/api/v1/group`, data, req);

export const updateGroup = (
  id: string,
  data: Partial<Group>,
  req?: AxiosRequestConfig
) => axiosInstance.patch<Group>(`${ApiBase}/api/v1/group/${id}`, data, req);

export const deleteGroup = (id: string, req?: AxiosRequestConfig) =>
  axiosInstance.delete(`${ApiBase}/api/v1/group/${id}`, req);
