"use client";

import { useForm } from "react-hook-form";
import { Student } from "../../../../types/student";
import {
  Form,
  // FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../components/ui/input";
import { createStudent, updateStudent } from "../../../../api/student";
import { Button } from "../../../../components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check } from "lucide-react";
// import { useCallback } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

const formSchema = z.object({
  studentNumber: z.string().min(1, { message: "Student Number is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  // year: z.string().min(1, { message: "Year is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const StudentForm = ($: {
  onSuccess?: (student: Student) => void;
  student?: Partial<Student>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      // year: "1",
      ...$.student,
    },
  });
  const queryClient = useQueryClient();

  const isNew = !$.student?._id;

  const submit = form.handleSubmit(async (values) => {
    let res: Student;
    if (isNew) {
      res = await createStudent({ ...values, userType: "student" }).then(
        (res) => res.data
      );
      form.reset();
    } else {
      res = await updateStudent($.student?._id!, values).then(
        (res) => res.data
      );
    }

    toast("Course saved", {
      icon: <Check color="green" />,
      dismissible: true,
    });

    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === "students",
    });
    $.onSuccess?.(res);
  }, console.error);

  return (
    <Form {...form}>
      <form onSubmit={submit}>
        <FormField
          name="studentNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Student Number</FormLabel>
              <Input placeholder="Number..." type="number" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Name</FormLabel>
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

        {/* <FormField
          name="year"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Year</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={field.disabled}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">First year</SelectItem>
                  <SelectItem value="2">Second year</SelectItem>
                  <SelectItem value="3">Third year</SelectItem>
                  <SelectItem value="4">Fourth year</SelectItem>
                  <SelectItem value="5">Fifth year</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}

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
