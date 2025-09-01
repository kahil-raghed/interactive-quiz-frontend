"use client";

import { DataTable } from "@/components/data-table";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useDeleteGroupMutation, useGroups } from "@/query/group";
import { Group, GroupQuery } from "@/types/group";
import { createColumnHelper } from "@tanstack/react-table";
import { Edit, Trash, User } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { GroupForm } from "./_components/group-form";
import { TableFilter } from "@/components/table-filter";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

export default function Groups() {
  const form = useForm<GroupQuery>();
  const queryClient = useQueryClient();
  const { data } = useGroups(form.watch());

  const { mutateAsync: deleteGroup } = useDeleteGroupMutation();
  const [groupDialog, setGroupDialog] = useState<{
    open: boolean;
    group?: Group;
  } | null>(null);

  const deleting = useRef(new Set<string>());
  const deleteGroupFn = useCallback(
    (id: string) => {
      deleting.current.add(id);
      deleteGroup(id).finally(() => {
        deleting.current.delete(id);

        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "groups",
        });
      });
    },
    [deleteGroup, queryClient]
  );

  const columns = useMemo(() => {
    const h = createColumnHelper<Group>();

    return [
      h.accessor("name", {
        header: "Name",
      }),
      h.accessor("course.name", {
        header: "Course",
      }),
      h.accessor("teacher.name", {
        header: "Teacher",
      }),
      h.display({
        id: "actions",
        header: "Actions",
        size: 50,
        cell: (c) => (
          <div className="flex gap-2">
            <Link
              href={"groups/" + c.row.original._id}
              className={buttonVariants({
                size: "icon",
                variant: "secondary",
              })}
            >
              <User />
            </Link>

            <Button
              size="icon"
              onClick={() => {
                setGroupDialog({
                  open: true,
                  group: c.row.original,
                });
              }}
            >
              <Edit />
            </Button>

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
  }, [deleting, deleteGroupFn]);

  return (
    <FormProvider {...form}>
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
            <GroupForm
              group={groupDialog?.group}
              onSuccess={() => {
                setGroupDialog(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />

      <TableFilter
        filters={[
          { label: "teacher ID", name: "teacher-id", type: "text" },
          { label: "course ID", name: "course-id", type: "text" },
          { label: "Name", name: "name", type: "text" },
        ]}
      />
      <DataTable columns={columns} data={data ?? []} isLoading={false} />
    </FormProvider>
  );
}
