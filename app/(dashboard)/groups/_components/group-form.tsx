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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../../../../components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Group } from "@/types/group";
import { createGroup, updateGroup } from "@/api/group";
import { useCourses } from "@/query/course";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  course: z.any(),
});

export const GroupForm = ($: {
  onSuccess?: (
    group: Pick<Group, "name" | "course" | "students" | "teacher">
  ) => void;
  group?: Partial<Group>;
}) => {
  const queryClient = useQueryClient();
  const { data: courses } = useCourses();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      course: "",
      ...$.group,
    },
  });

  const isNew = !$.group?._id;

  const submit = form.handleSubmit(async (values: any) => {
    let res: Pick<Group, "name" | "course" | "students" | "teacher">;

    if (isNew) {
      res = await createGroup(values).then((res) => res.data);
      form.reset();
    } else {
      res = await updateGroup($.group?._id!, values).then((res) => res.data);
    }

    toast("Group saved", {
      icon: <Check color="green" />,
      dismissible: true,
    });

    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === "groups",
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
              <FormLabel>Group name</FormLabel>
              <Input placeholder="Name..." {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="course"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Course</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={field.disabled}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {courses?.map((course, idx) => (
                    <SelectItem value={course._id} key={idx}>
                      {course.name}
                    </SelectItem>
                  ))}
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
