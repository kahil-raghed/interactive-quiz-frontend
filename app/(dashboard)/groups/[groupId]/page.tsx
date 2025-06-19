"use client";

import { GetGroupResponse } from "@/api/group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppBase } from "@/config/app";
import { useGetGroupById } from "@/query/group";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGroupContext } from "./group-context";

export default function GroupClient($: { group?: GetGroupResponse }) {
  const { group } = useGroupContext();

  return (
    <div>
      <h1>Group {group?.name}</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        <Link href={`${AppBase}/groups/${group?._id}/students`}>
          {/* Students */}
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
            </CardHeader>
            <CardContent>total: {group?.students?.length}</CardContent>
          </Card>
        </Link>

        <Link href={`${AppBase}/groups/${group?._id}/quizes`}>
          {/* Students */}
          <Card>
            <CardHeader>
              <CardTitle>Quizes</CardTitle>
            </CardHeader>
            <CardContent>total: {group?.students?.length}</CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
