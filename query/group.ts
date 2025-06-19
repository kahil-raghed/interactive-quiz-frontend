import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FindGroupResponse,
  GetGroupResponse,
  GroupQuery,
  deleteGroup,
  findGroup,
  getGroupById,
} from "../api/group";

export const useGroups = (
  query?: GroupQuery,
  initialData?: FindGroupResponse
) => {
  return useQuery({
    queryKey: ["groups", query ?? {}],
    queryFn: ({ signal }) =>
      findGroup(query, { signal }).then((res) => res.data),
    initialData,
  });
};

export const useGetGroupById = (id: string, initialData?: GetGroupResponse) => {
  return useQuery({
    queryKey: ["groups", id],
    queryFn: ({ signal }) =>
      getGroupById(id, { signal }).then((res) => res.data),
    initialData,
  });
};

export const useDeleteGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "groups",
      });
    },
  });
};
