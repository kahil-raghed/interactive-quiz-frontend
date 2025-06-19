"use client";

import { GetGroupResponse } from "@/api/group";
import { useGetGroupById } from "@/query/group";
import { useParams } from "next/navigation";
import { createContext, PropsWithChildren, useContext } from "react";

const GroupContext = createContext<{
  group?: GetGroupResponse;
}>({});

export function GroupProvider({
  children,
  group: initialData,
}: PropsWithChildren<{
  group?: GetGroupResponse;
}>) {
  const { groupId } = useParams();

  const { data: group } = useGetGroupById(groupId as string, initialData);

  return (
    <GroupContext.Provider
      key={groupId as string}
      value={{
        group: group ?? initialData,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export function useGroupContext() {
  return useContext(GroupContext);
}
