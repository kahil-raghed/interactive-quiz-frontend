import { createGroup } from "@/api/group";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  course: z.string().min(1, "Course is required"),
});

export const GroupDialog: FC<{
  trigger?: React.ReactNode;
}> = ($) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>{$.trigger}</DialogTrigger>
      <DialogContent aria-description="Create group">
        <DialogTitle>Create group</DialogTitle>
        <GroupForm />
      </DialogContent>
    </Dialog>
  );
};

const GroupForm: FC<{}> = () => {
  const { id } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      course: id as string,
    },
  });

  const queryClient = useQueryClient();

  const submit = form.handleSubmit(async (values) => {
    await createGroup(values).then(() => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "groups",
      });
    });
  });

  return (
    <Form {...form}>
      <form action="" onSubmit={submit}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Group name</FormLabel>
              <Input placeholder="Group..." {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Save</Button>
      </form>
    </Form>
  );
};
