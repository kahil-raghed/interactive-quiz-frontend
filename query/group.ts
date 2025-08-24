import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GroupQuery,
  assignStudents,
  deleteGroup,
  findGroup,
  getGroupById,
  removeStudents,
} from "../api/group";
import { Group } from "../types/group";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useGroups = (
  query?: Partial<GroupQuery>,
  initialData?: Group[]
) => {
  return useQuery({
    queryKey: ["groups", { ...query }, initialData],
    queryFn: ({ signal }) =>
      findGroup(query, { signal }).then((res) => res.data),
    initialData,
  });
};

export const useGroup = (id: string) => {
  return useQuery({
    queryKey: ["group", id],
    queryFn: ({ signal }) =>
      getGroupById(id, { signal }).then((res) => res.data),
    enabled: !!id,
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

export const useAssignStudents = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, studentIds }: { id: string; studentIds: string[] }) =>
      assignStudents(id, studentIds),
    onSuccess: (data) => {
      router.back();
      toast(data.data.message);

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "group",
      });
    },
  });
};

export const useRemoveStudents = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, studentIds }: { id: string; studentIds: string[] }) =>
      removeStudents(id, studentIds),
    onSuccess: (data) => {
      router.back();
      toast(data.data.message);

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "group",
      });
    },
    onError(data: any) {
      toast(data.response.data.message);
    },
  });
};
