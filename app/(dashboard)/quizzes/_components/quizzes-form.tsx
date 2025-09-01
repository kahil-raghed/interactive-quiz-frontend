"use client";
import { Quiz } from "@/types/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useGroups } from "@/query/group";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createQuiz, updateQuiz } from "@/api/quiz";

const formSchema = z.object({
  group: z.string().min(1, { message: "Group is required" }),
  scheduledAt: z.date().or(z.string()),
});

const QuizzesForm = ($: { onSuccess?: (quiz: Quiz) => void; quiz?: Quiz }) => {
  const queryClient = useQueryClient();
  const { data: groups } = useGroups();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      group: $.quiz?.group,
      scheduledAt: $.quiz?.scheduledAt,
    },
  });

  const submit = form.handleSubmit(async (values) => {
    let res: Quiz;

    if ($.quiz?._id) {
      res = await updateQuiz($.quiz?._id, values).then((res) => res.data);
    } else {
      res = await createQuiz(values).then((res) => res.data);
    }

    toast("Course saved", {
      icon: <Check color="green" />,
      dismissible: true,
    });

    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === "quizzes",
    });

    $.onSuccess?.(res);
  }, console.error);

  return (
    <Form {...form}>
      <form onSubmit={submit}>
        <FormField
          name="group"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Group</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={field.disabled}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Group" />
                </SelectTrigger>
                <SelectContent>
                  {groups?.map(({ name, _id }) => (
                    <SelectItem key={_id} value={_id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="scheduledAt"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>Scheduled At</FormLabel>
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={field.onChange}
                showTimeInput
                timeInputLabel="Time:"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full border rounded-md p-2"
                placeholderText="Select date and time..."
              />
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

export default QuizzesForm;
