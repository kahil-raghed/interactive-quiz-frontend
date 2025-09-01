"use client";

import { useForm } from "react-hook-form";
import { Course } from "../../../../types/course";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useCallback } from "react";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCourse, updateCourse } from "../../../../api/course";
import { Button } from "../../../../components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  year: z.string().min(1, { message: "Year is required" }),
  semester: z.string(),
});

export const CourseForm = ($: {
  onSuccess?: (course: Course) => void;
  course?: Partial<Course>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      year: "1",
      semester: "1",
      ...$.course,
    },
  });
  const queryClient = useQueryClient();

  const submit = form.handleSubmit(async (values) => {
    let res: Course;
    if (!$.course?._id) {
      res = await createCourse(values).then((res) => res.data);
      form.reset();
    } else {
      res = await updateCourse($.course?._id, values).then((res) => res.data);
    }

    toast("Course saved", {
      icon: <Check color="green" />,
      dismissible: true,
    });

    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === "courses",
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
              <FormLabel>Course name</FormLabel>
              <Input placeholder="Name..." {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
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
        />
        <FormField
          name="semester"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Semester</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">First semester</SelectItem>
                  <SelectItem value="2">Second semester</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};
