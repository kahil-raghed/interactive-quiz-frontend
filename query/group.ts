import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GroupQuery, deleteGroup, findGroup } from "../api/group";
import { Group } from "../types/group";

export const useGroups = (query?: GroupQuery, initialData?: Group[]) => {
  return useQuery({
    queryKey: ["groups", query ?? {}],
    queryFn: ({ signal }) =>
      findGroup(query, { signal }).then((res) => res.data),
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
