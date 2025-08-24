"use client";
import React from "react";
import { Admin } from "@/types/admin";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { createAdmin } from "@/api/admin";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(5, { message: "Password is required" }),
});

const AdminForm = ($: {
  onSuccess?: (onSuccess: Admin) => void;
  admin?: Partial<Admin>;
}) => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      ...$.admin,
    },
  });

  const submit = form.handleSubmit(async (values: any) => {
    let res: Admin;

    res = await createAdmin(values).then((res) => res.data);

    toast("Admin saved", {
      icon: <Check color="green" />,
      dismissible: true,
    });

    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === "admin",
    });
    $.onSuccess?.(res);
  }, console.error);

  return (
    <Form {...form}>
      <form onSubmit={submit}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Admin name</FormLabel>
              <Input placeholder="Name..." {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Admin Email</FormLabel>
              <Input placeholder="Email..." {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Admin Password</FormLabel>
              <Input type="password" placeholder="Password..." {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default AdminForm;
