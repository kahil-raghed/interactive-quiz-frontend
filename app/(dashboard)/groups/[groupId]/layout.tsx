import { FC, PropsWithChildren } from "react";
import { GroupProvider } from "./group-context";
import { getGroupById } from "@/api/group";
import { handleAxiosNotFound } from "@/lib/utils";

export default async function GroupLayout({
  children,
  params,
}: PropsWithChildren<{
  params: Promise<{ groupId: string }>;
}>) {
  const { groupId } = await params;

  const group = await getGroupById(groupId)
    .then((res) => res.data)
    .catch(handleAxiosNotFound);

  return <GroupProvider group={group}>{children}</GroupProvider>;
}
