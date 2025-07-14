"use client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useDeleteTeacherMutation, useTeachers } from "@/query/teachers";
import { Teacher } from "@/types/teacher";
import { createColumnHelper } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { TeacherForm } from "./_components/teacher-form";
import { isAdmin } from "@/lib/token";

export default function Teachers() {
  const { data, isLoading } = useTeachers();
  const { mutateAsync: deleteTeacher } = useDeleteTeacherMutation();
  const [teacherDialog, setTeacherDialog] = useState<{
    open: boolean;
    teacher?: Teacher;
  } | null>(null);

  const deleting = useRef(new Set<string>());
  const deleteTeacherFn = useCallback(
    (id: string) => {
      0;
      deleting.current.add(id);
      deleteTeacher(id).finally(() => {
        deleting.current.delete(id);
      });
    },
    [deleteTeacher]
  );

  const columns = useMemo(() => {
    const h = createColumnHelper<Teacher>();

    return [
      h.accessor("name", {
        header: "Name",
      }),
      h.accessor("email", {
        header: "email",
      }),
      h.display({
        id: "actions",
        header: "Actions",
        size: 50,
        cell: (c) => (
          <div className="flex gap-2">
            {isAdmin() && (
              <Button
                size="icon"
                variant="destructive"
                disabled={deleting.current.has(c.row.original._id)}
                onClick={() => deleteTeacherFn(c.row.original._id)}
              >
                <Trash />
              </Button>
            )}
          </div>
        ),
      }),
    ];
  }, [deleting]);

  return (
    <div>
      {
        <div className="flex justify-end mb-4">
          {isAdmin() && (
            <Dialog
              open={teacherDialog?.open ?? false}
              onOpenChange={(open) =>
                setTeacherDialog(
                  open ? { open: open, teacher: teacherDialog?.teacher } : null
                )
              }
            >
              <DialogTrigger asChild>
                <Button>Add Teacher</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Add teacher</DialogTitle>
                <TeacherForm
                  teacher={teacherDialog?.teacher}
                  onSuccess={() => {
                    setTeacherDialog(null);
                  }}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
      }

      <Separator />

      <DataTable columns={columns} data={data} isLoading={false} />
    </div>
  );
}
