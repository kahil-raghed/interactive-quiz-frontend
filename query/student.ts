import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getStudentById,
  findStudent,
  deleteStudent,
  StudentQuery,
} from "../api/student";
import { Student } from "../types/student";

export const useStudents = (
  query?: Partial<StudentQuery>,
  initialData?: Student[]
) => {
  return useQuery({
    queryKey: ["students", { ...query }],
    queryFn: ({ signal }) =>
      findStudent(query, { signal }).then((res) => res.data),
    initialData,
  });
};

export const useStudentById = (id: string, initialData?: Student) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: ({ signal }) =>
      getStudentById(id, { signal }).then((res) => res.data),
    initialData,
  });
};

export const useDeleteStudentutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "student",
      });
    },
  });
};
