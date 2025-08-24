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
import { Group } from "@/types/group";
import { createColumnHelper } from "@tanstack/react-table";
import { useCallback, useMemo, useRef, useState } from "react";
import { TableFilter } from "@/components/table-filter";
import { FormProvider, useForm } from "react-hook-form";
import AdminForm from "./_components/admin-form";
import { Admin, AdminQuery } from "@/types/admin";
import { useAdmin } from "@/query/admin";

export default function Page() {
  const form = useForm<AdminQuery>();
  const { data } = useAdmin(form.watch());
  const [adminDialog, setAdminDialog] = useState<{
    open: boolean;
    admin?: Admin;
  } | null>(null);

  const deleting = useRef(new Set<string>());

  const columns = useMemo(() => {
    const h = createColumnHelper<Admin>();

    return [
      h.accessor("name", {
        header: "Name",
      }),
      h.accessor("email", {
        header: "Email",
      }),
    ];
  }, [deleting]);

  return (
    <FormProvider {...form}>
      <div className="flex justify-end mb-4">
        <Dialog
          open={adminDialog?.open ?? false}
          onOpenChange={(open) =>
            setAdminDialog(
              open ? { open: open, admin: adminDialog?.admin } : null
            )
          }
        >
          <DialogTrigger asChild>
            <Button>Add Admin</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add Admin</DialogTitle>
            <AdminForm
              admin={adminDialog?.admin}
              onSuccess={() => {
                setAdminDialog(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Separator />

      <TableFilter filters={[{ label: "Name", name: "name", type: "text" }]} />
      <DataTable columns={columns} data={data ?? []} isLoading={false} />
    </FormProvider>
  );
}
