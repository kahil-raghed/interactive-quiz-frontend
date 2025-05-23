import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CourseQuery,
  deleteCourse,
  findCourse,
  getCourseById,
} from "../api/course";
import { Course } from "../types/course";

export const useCourses = (query?: CourseQuery, initialData?: Course[]) => {
  return useQuery({
    queryKey: ["courses", query ?? {}],
    queryFn: ({ signal }) =>
      findCourse(query, { signal }).then((res) => res.data),
    initialData,
  });
};

export const useCourseById = (id: string, initialData?: Course) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: ({ signal }) =>
      getCourseById(id, { signal }).then((res) => res.data),
    initialData,
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
