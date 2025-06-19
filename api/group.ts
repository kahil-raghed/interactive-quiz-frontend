import axios, { AxiosRequestConfig } from "axios";
import { ApiBase } from "../config/api";
import { Group } from "../types/group";
import { Course } from "@/types/course";

export interface GroupQuery extends Partial<Group> {}

export type FindGroupResponse = GroupSummary[];

export interface GetGroupResponse extends Omit<Group, "course"> {
  course: Course;
}

export interface CreateGroupRequest extends Pick<Group, "name"> {}

export interface GroupSummary {
  _id: string;
  name: string;
  studentCount: number;
}

export const findGroup = (query?: GroupQuery, req?: AxiosRequestConfig) =>
  axios.get<FindGroupResponse>(`${ApiBase}/v1/group`, {
    ...req,
    params: query,
  });

export const getGroupById = (id: string, req?: AxiosRequestConfig) =>
  axios.get<GetGroupResponse>(`${ApiBase}/v1/group/${id}`, req);

export const createGroup = (
  data: CreateGroupRequest,
  req?: AxiosRequestConfig
) => axios.post<Group>(`${ApiBase}/v1/group`, data, req);

export const updateGroup = (
  id: string,
  data: Partial<Group>,
  req?: AxiosRequestConfig
) => axios.patch<Group>(`${ApiBase}/v1/group/${id}`, data, req);

export const deleteGroup = (id: string, req?: AxiosRequestConfig) =>
  axios.delete(`${ApiBase}/v1/group/${id}`, req);
