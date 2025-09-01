"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../../../components/data-table";
import { Course } from "../../../../types/course";
import { Group } from "../../../../types/group";
import { useMemo } from "react";
// import { useCourseById } from "../../../../query/course";
import { useParams } from "next/navigation";
import { useGroups } from "../../../../query/group";
import { Button } from "../../../../components/ui/button";

export default function CoursePageClient($: {
  course?: Course;
  groups?: Group[];
}) {
  const { id } = useParams();
  // const { data: course } = useCourseById(id as string, $.course);
  const { data: groups, isLoading } = useGroups(
    {
      course: id as string,
    },
    $.groups
  );

  const columns = useMemo(() => {
    const h = createColumnHelper<Group>();

    return [
      h.accessor("name", {
        header: "Name",
      }),
      h.accessor("students", {
        header: "Student Count",
        cell: (c) => c.getValue().length,
      }),
      h.display({
        header: "Actions",
        id: "actions",
        cell: () => (
          <div className="flex gap-2">
            <Button>View</Button>
            <button>Delete</button>
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
          <Button>New Group</Button>
        </div>
      </div>
      <DataTable columns={columns} data={groups ?? []} isLoading={isLoading} />
    </div>
  );
}
