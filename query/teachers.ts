import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTeacher, deleteTeacher, getTeachers } from "@/api/teachers";
import { Teacher } from "@/types/teacher";

export const useTeachers = (initialData?: Teacher[]) => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: ({ signal }) => getTeachers({ signal }).then((res) => res.data),
    initialData,
  });
};

export const useDeleteTeacherMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTeacher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "teachers",
      });
    },
  });
};
