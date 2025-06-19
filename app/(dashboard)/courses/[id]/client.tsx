"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../../../components/data-table";
import { Course } from "../../../../types/course";
import { Group } from "../../../../types/group";
import { useMemo } from "react";
import { useCourseById } from "../../../../query/course";
import { useParams } from "next/navigation";
import { useGroups } from "../../../../query/group";
import { Button } from "../../../../components/ui/button";
import { GroupDialog } from "./group-form";
import { GroupSummary } from "@/api/group";
import { LucideEye, LucideTrash, LucideView } from "lucide-react";
import Link from "next/link";
import { AppBase } from "@/config/app";

export default function CoursePageClient($: {
  course?: Course;
  groups?: GroupSummary[];
}) {
  const { id } = useParams();
  const { data: course } = useCourseById(id as string, $.course);
  const { data: groups, isLoading } = useGroups(
    {
      course: id as string,
    },
    $.groups
  );

  const columns = useMemo(() => {
    const h = createColumnHelper<GroupSummary>();

    return [
      h.accessor("name", {
        header: "Name",
      }),
      h.accessor("studentCount", {
        header: "Student Count",
        cell: (c) => c.getValue(),
      }),
      h.display({
        header: "Actions",
        id: "actions",
        cell: (c) => (
          <div className="flex gap-2">
            <Link href={`${AppBase}/groups/${c.row.original._id}`}>
              <Button size={"icon"}>
                <LucideEye />
              </Button>
            </Link>
            <Button size={"icon"} variant="destructive">
              <LucideTrash />
            </Button>
          </div>
        ),
      }),
    ];
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span>Groups:</span>
        <div>
          <GroupDialog trigger={<Button>New Group</Button>} />
        </div>
      </div>
      <DataTable columns={columns} data={groups} isLoading={isLoading} />
    </div>
  );
}
