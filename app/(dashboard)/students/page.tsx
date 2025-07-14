"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Student } from "@/app/types/student";
import TanTable from "@/components/tan-table";
// import { findAllStudents } from "@/lib/api/student";
import { useStudents } from "@/query/student";
import { deleteStudent } from "@/api/student";
import { Course } from "@/types/course";
import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/data-table";
import { StudentForm } from "./_components/student-form";

export default function StudentsPage() {
  // const students = await findAllStudents();
  const { data, isLoading } = useStudents();
  const [studentDialog, setStudentDialog] = useState<{
    open: boolean;
    course?: Course;
  } | null>(null);

  const deleting = useRef(new Set<string>());
  const deleteCourseFn = useCallback(
    (id: string) => {
      deleting.current.add(id);
      deleteStudent(id).finally(() => {
        deleting.current.delete(id);
      });
    },
    [deleteStudent]
  );

  const columns = useMemo(() => {
    const h = createColumnHelper<Course>();

    return [
      h.accessor("name", {
        header: "Name",
        cell: (c) => (
          <Link className="block" href={`/students/${c.row.original._id}`}>
            {c.getValue()}
          </Link>
        ),
      }),
      h.accessor("year", {
        header: "Year",
      }),
      h.accessor("semester", {
        header: "Semester",
      }),
      h.display({
        id: "actions",
        header: "Actions",
        size: 50,
        cell: (c) => (
          <div className="flex gap-2">
            <Button
              size="icon"
              // onClick={() => {
              //   setCourseDialog({
              //     open: true,
              //     course: c.row.original,
              //   });
              // }}
            >
              <Edit />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              disabled={deleting.current.has(c.row.original._id)}
              onClick={() => deleteCourseFn(c.row.original._id)}
            >
              <Trash />
            </Button>
          </div>
        ),
      }),
    ];
  }, [deleting]);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog
          open={studentDialog?.open ?? false}
          onOpenChange={(open) =>
            setStudentDialog(
              open ? { open: open, course: studentDialog?.course } : null
            )
          }
        >
          <DialogTrigger asChild>
            <Button>Add Student</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add Student</DialogTitle>
            <StudentForm
              course={studentDialog?.course}
              onSuccess={() => {
                setStudentDialog(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
}
