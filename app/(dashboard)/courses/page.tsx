"use client";

import { Course } from "@/types/course";
import { createColumnHelper } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DataTable } from "../../../components/data-table";
import { useCourses, useDeleteCourseMutation } from "../../../query/course";
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
import { Edit, Trash } from "lucide-react";
import { isAdmin } from "@/lib/token";
import { TableFilter } from "@/components/table-filter";
import { FormProvider, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

export default function Courses() {
  const form = useForm();
  const queryClient = useQueryClient();
  const { data, isLoading } = useCourses(form.watch());
  const [admin, setAdmin] = useState(false);
  const [courseDialog, setCourseDialog] = useState<{
    open: boolean;
    course?: Course;
  } | null>(null);

  const { mutateAsync: deleteCourse } = useDeleteCourseMutation();

  useEffect(() => {
    setAdmin(isAdmin());
  }, []);

  const deleting = useRef(new Set<string>());
  const deleteCourseFn = useCallback(
    (id: string) => {
      deleting.current.add(id);
      deleteCourse(id).finally(() => {
        deleting.current.delete(id);

        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "courses",
        });
      });
    },
    [deleteCourse, queryClient]
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
            {admin && (
              <>
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
                <Button
                  size="icon"
                  variant="destructive"
                  disabled={deleting.current.has(c.row.original._id)}
                  onClick={() => deleteCourseFn(c.row.original._id)}
                >
                  <Trash />
                </Button>
              </>
            )}
          </div>
        ),
      }),
    ];
  }, [deleting, admin, deleteCourseFn]);

  return (
    <FormProvider {...form}>
      <div className="flex justify-end mb-4">
        {admin && (
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
        )}
      </div>

      <Separator />

      <TableFilter
        filters={[
          { label: "Name", name: "name", type: "text" },
          {
            label: "Year",
            name: "year",
            type: "select",
            options: [
              { label: "First Year", value: "1" },
              { label: "Second Year", value: "2" },
              { label: "Third Year", value: "3" },
              { label: "Fourth Year", value: "4" },
              { label: "Fifth Year", value: "5" },
            ],
          },
          {
            label: "Semester",
            name: "semester",
            type: "select",
            options: [
              { label: "First Semester", value: "1" },
              { label: "Second Semester", value: "2" },
            ],
          },
        ]}
      />

      <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
    </FormProvider>
  );
}
