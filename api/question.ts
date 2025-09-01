import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios";
import { ApiBase } from "@/config/api";
import { Quistions } from "@/types/question";

export const createQuestion = (
  data: {
    questions: Pick<
      Quistions,
      "text" | "type" | "choices" | "points" | "isMath" | "isMultiTrue"
    >[];
  } & { quizId: string },
  req?: AxiosRequestConfig
) => {
  return axiosInstance.post(
    `${ApiBase}/api/v1/quiz/bulk-create-questions`,
    data,
    req
  );
};
