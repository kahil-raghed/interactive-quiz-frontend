import { accessQuiz, getQuiz, getQuizzes, submitQuiz } from "@/api/quiz";
import { Quiz, QuizQuery } from "@/types/quiz";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useQuizzes = (
  query?: Partial<QuizQuery>,
  initialData?: Quiz[]
) => {
  return useQuery({
    queryKey: ["quizzes", query],
    queryFn: ({ signal }) =>
      getQuizzes(query, { signal }).then((res) => res.data),
    initialData,
  });
};

export const useQuiz = (id?: string, initialData?: Quiz) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: ({ signal }) => getQuiz(id, { signal }).then((res) => res.data),
    initialData,
    enabled: !!id,
  });
};

export const useAccessQuiz = () => {
  return useMutation({
    mutationKey: ["access-quiz"],
    mutationFn: ({ accessCode }: { accessCode: string }) =>
      accessQuiz(accessCode).then((res) => res.data),
  });
};

export const useSubmitQuiz = () => {
  return useMutation({
    mutationKey: ["submit-quiz"],
    mutationFn: (payload: { answers: Record<string, string> }) =>
      submitQuiz(payload).then((res) => res.data),
  });
};
