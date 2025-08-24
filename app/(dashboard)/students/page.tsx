"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { useStudents } from "@/query/student";
import { deleteStudent } from "@/api/student";
import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/data-table";
import { StudentForm } from "./_components/student-form";
import { Student } from "@/types/student";
import { TableFilter } from "@/components/table-filter";
import { FormProvider, useForm } from "react-hook-form";

export default function StudentsPage() {
  const form = useForm();
  const { data, isLoading } = useStudents();
  const [studentDialog, setStudentDialog] = useState<{
    open: boolean;
    student?: Student;
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
    const h = createColumnHelper<Student>();

    return [
      h.accessor("name", {
        header: "Name",
        cell: (c) => (
          <Link className="block" href={`/students/${c.row.original._id}`}>
            {c.getValue()}
          </Link>
        ),
      }),
      h.accessor("email", {
        header: "Email",
      }),
      h.accessor("studentNumber", {
        header: "Student Number",
      }),
      h.display({
        id: "actions",
        header: "Actions",
        size: 50,
        cell: (c) => (
          <div className="flex gap-2">
            <Button
              size="icon"
              onClick={() => {
                setStudentDialog({
                  open: true,
                  student: c.row.original,
                });
              }}
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
    <FormProvider {...form}>
      <div className="flex justify-end mb-4">
        <Dialog
          open={studentDialog?.open ?? false}
          onOpenChange={(open) =>
            setStudentDialog(
              open ? { open: open, student: studentDialog?.student } : null
            )
          }
        >
          <DialogTrigger asChild>
            <Button>Add Student</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add Student</DialogTitle>
            <StudentForm
              student={studentDialog?.student}
              onSuccess={() => {
                setStudentDialog(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <TableFilter
        filters={[
          { label: "Student Number", name: "student_number", type: "text" },
          { label: "Email", name: "email", type: "text" },
          { label: "Name", name: "name", type: "text" },
        ]}
      />
      <DataTable
        columns={columns}
        data={data ?? []} // Ensure data is always an array
        isLoading={isLoading}
      />
    </FormProvider>
  );
}
