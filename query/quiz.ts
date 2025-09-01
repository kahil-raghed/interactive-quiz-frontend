import { getQuiz, getQuizzes } from "@/api/quiz";
import { Quiz, QuizQuery } from "@/types/quiz";
import { useQuery } from "@tanstack/react-query";

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
