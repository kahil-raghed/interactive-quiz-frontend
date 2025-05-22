import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CourseQuery, deleteCourse, findCourse } from "../api/course";

export const useCourses = (query?: CourseQuery) => {
  return useQuery({
    queryKey: ["courses", query ?? {}],
    queryFn: () => findCourse(query).then((res) => res.data),
  });
};

export const useDeleteCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "courses",
      });
    },
  });
};
