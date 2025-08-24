import { findAdmin } from "@/api/admin";
import { Admin, AdminQuery } from "@/types/admin";
import { useQuery } from "@tanstack/react-query";

export const useAdmin = (
  query?: Partial<AdminQuery>,
  initialData?: Admin[]
) => {
  return useQuery({
    queryKey: ["admin", query],
    queryFn: ({ signal }) =>
      findAdmin(query, { signal }).then((res) => res.data),
    initialData,
  });
};
