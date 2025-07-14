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
import { useDeleteGroupMutation, useGroups } from "@/query/group";
import { Group } from "@/types/group";
import { createColumnHelper } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

export default function Groups() {
  const { data } = useGroups();
  const { mutateAsync: deleteGroup } = useDeleteGroupMutation();
  const [groupDialog, setGroupDialog] = useState<{
    open: boolean;
    group?: Group;
  } | null>(null);

  const deleting = useRef(new Set<string>());
  const deleteGroupFn = useCallback(
    (id: string) => {
      0;
      deleting.current.add(id);
      deleteGroup(id).finally(() => {
        deleting.current.delete(id);
      });
    },
    [deleteGroup]
  );

  const columns = useMemo(() => {
    const h = createColumnHelper<Group>();

    return [
      h.accessor("name", {
        header: "Name",
      }),
      h.accessor("course.name", {
        header: "Name",
      }),
      h.accessor("year", {
        header: "year",
      }),
      h.display({
        id: "actions",
        header: "Actions",
        size: 50,
        cell: (c) => (
          <div className="flex gap-2">
            {/* <Button
              size="icon"
              onClick={() => {
                setTeacherDialog({
                  open: true,
                  teacher: c.row.original,
                });
              }}
            >
              <Edit />
            </Button> */}
            <Button
              size="icon"
              variant="destructive"
              disabled={deleting.current.has(c.row.original._id)}
              onClick={() => deleteGroupFn(c.row.original._id)}
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
          open={groupDialog?.open ?? false}
          onOpenChange={(open) =>
            setGroupDialog(
              open ? { open: open, group: groupDialog?.group } : null
            )
          }
        >
          <DialogTrigger asChild>
            <Button>Add Group</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add Group</DialogTitle>
            {/* <TeacherForm
              teacher={teacherDialog?.teacher}
              onSuccess={() => {
                setTeacherDialog(null);
              }}
            /> */}
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} isLoading={false} />
    </div>
  );
}
