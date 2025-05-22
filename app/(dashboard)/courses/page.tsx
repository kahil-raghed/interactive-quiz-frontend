"use client";

import { Course } from "@/types/course";
import { createColumnHelper } from "@tanstack/react-table";
import { useCallback, useMemo, useRef, useState } from "react";
import { DataTable } from "../../../components/data-table";
import { useCourses, useDeleteCourseMutation } from "../../../query/course";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { CourseForm } from "./_components/course-form";
import Link from "next/link";
import { Delete, Edit, Trash } from "lucide-react";

export default function Courses() {

  const { data, isLoading } = useCourses();
  const [courseDialog, setCourseDialog] = useState<{
    open: boolean;
    course?: Course;
  } | null>(null);

  const { mutateAsync: deleteCourse } = useDeleteCourseMutation();

  const deleting = useRef(new Set<string>());
  const deleteCourseFn = useCallback(
    (id: string) => {
      deleting.current.add(id);
      deleteCourse(id).finally(() => {
        deleting.current.delete(id);
      });
    },
    [deleteCourse]
  );

  const columns = useMemo(() => {
    const h = createColumnHelper<Course>();

    return [
      h.accessor("name", {
        header: "Name",
        cell: (c) => (
          <Link className="block" href={`/courses/${c.row.original._id}`}>
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
              onClick={() => {
                setCourseDialog({
                  open: true,
                  course: c.row.original,
                });
              }}
            >
              <Edit />
            </Button>
            <Button size="icon" variant="destructive" disabled={deleting.current.has(c.row.original._id)} onClick={() => deleteCourseFn(c.row.original._id)}>
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
          open={courseDialog?.open ?? false}
          onOpenChange={(open) =>
            setCourseDialog(
              open ? { open: open, course: courseDialog?.course } : null
            )
          }
        >
          <DialogTrigger asChild>
            <Button>Add Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add course</DialogTitle>
            <CourseForm
              course={courseDialog?.course}
              onSuccess={() => {
                setCourseDialog(null);
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
