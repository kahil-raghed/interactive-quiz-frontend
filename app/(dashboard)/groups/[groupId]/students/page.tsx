"use client";

import { useMemo } from "react";
import { useGroupContext } from "../group-context";
import { Student } from "@/types/student";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";

export default function GroupStudentsPage() {
  const { group } = useGroupContext();

  const columns = useMemo(() => {
    const h = createColumnHelper<Student>();

    return [
      h.accessor("studentNumber", {
        header: "Student Number",
      }),
      h.accessor("name", {
        header: "Name",
      }),
    ];
  }, [group?._id]);

  return (
    <div>
      <h1 className="mb-2">Group {group?.name} Students</h1>

      <DataTable columns={columns} />
    </div>
  );
}
