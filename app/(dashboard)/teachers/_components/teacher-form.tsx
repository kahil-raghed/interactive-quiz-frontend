"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Teacher } from "@/types/teacher";
import { createTeacher } from "@/api/teachers";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().length(5, { message: "Password is required" }),
});

export const TeacherForm = ($: {
  onSuccess?: (course: Teacher) => void;
  teacher?: Partial<Teacher>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ...$.teacher,
    },
  });
  const queryClient = useQueryClient();

  const submit = form.handleSubmit(async (values) => {
    const res = await createTeacher(values).then((res) => res.data);
    form.reset();

    toast("Teacher saved", {
      icon: <Check color="green" />,
      dismissible: true,
    });
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === "teachers",
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
              <FormLabel>Teacher Name</FormLabel>
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
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email..." type="email" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Password</FormLabel>
              <Input placeholder="Password..." type="password" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};
