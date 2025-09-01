"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { useCallback, useMemo, useRef, useState } from "react";
import { DataTable } from "../../../components/data-table";
import { Separator } from "@radix-ui/react-separator";
import { Button, buttonVariants } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import Link from "next/link";
import { Check, Edit, Eye, Trash, X } from "lucide-react";
import { TableFilter } from "@/components/table-filter";
import { FormProvider, useForm } from "react-hook-form";
import { Quiz } from "@/types/quiz";
import { useQuizzes } from "@/query/quiz";
import EDate from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import QuizzesForm from "./_components/quizzes-form";
import { deleteQuiz } from "@/api/quiz";
import { useQueryClient } from "@tanstack/react-query";

const Page = () => {
  const form = useForm();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuizzes(form.watch());
  const [quizDialog, setQuizDialog] = useState<{
    open: boolean;
    quiz?: Quiz;
  } | null>(null);

  const deleting = useRef(new Set<string>());
  const deleteQuizFn = useCallback(
    (id: string) => {
      deleting.current.add(id);
      deleteQuiz(id).finally(() => {
        deleting.current.delete(id);

        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "quizzes",
        });
      });
    },
    [queryClient]
  );

  const columns = useMemo(() => {
    const h = createColumnHelper<Quiz>();

    return [
      h.accessor("group.name", {
        header: "Group Name",
      }),
      h.accessor("group.teacher.name", {
        header: "Teacher",
      }),
      h.accessor("accessCode", {
        header: "Access Code",
      }),
      h.accessor("scheduledAt", {
        header: "Scheduled At",
        cell: ({
          cell: {
            row: {
              original: { scheduledAt },
            },
          },
        }) => EDate(scheduledAt),
      }),
      h.accessor("isOver", {
        header: "Is Over",
        cell: ({
          row: {
            original: { isOver },
          },
        }) => <Badge variant={"outline"}>{!isOver ? <X /> : <Check />}</Badge>,
      }),
      h.display({
        id: "actions",
        header: "Actions",
        size: 50,
        cell: ({
          cell: {
            row: { original },
          },
        }) => (
          <div className="flex gap-2">
            <>
              <Link
                href={`quizzes/${original._id}`}
                className={buttonVariants({ variant: "outline", size: "icon" })}
              >
                <Eye />
              </Link>

              <Button
                size="icon"
                onClick={() => {
                  setQuizDialog({
                    open: true,
                    quiz: original,
                  });
                }}
              >
                <Edit />
              </Button>

              <Button
                size="icon"
                variant="destructive"
                disabled={deleting.current.has(original._id)}
                onClick={() => {
                  deleteQuizFn(original._id);
                }}
              >
                <Trash />
              </Button>
            </>
          </div>
        ),
      }),
    ];
  }, [deleting, deleteQuizFn]);

  return (
    <FormProvider {...form}>
      <div className="flex justify-end gap-2 mb-4">
        <Link
          href={"/add-question"}
          className={buttonVariants({ variant: "outline" })}
        >
          + Add Question
        </Link>

        <Dialog
          open={quizDialog?.open ?? false}
          onOpenChange={(open) =>
            setQuizDialog(open ? { open: open, quiz: quizDialog?.quiz } : null)
          }
        >
          <DialogTrigger asChild>
            <Button>Add Quiz</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add Quiz</DialogTitle>
            <QuizzesForm
              quiz={quizDialog?.quiz}
              onSuccess={() => {
                setQuizDialog(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      <TableFilter
        filters={[
          { label: "Group", name: "group", type: "text" },
          {
            label: "is Over",
            name: "isOver",
            type: "select",
            options: [
              { label: "True", value: "true" },
              { label: "False", value: "false" },
            ],
          },
          { label: "Access Code", name: "accessCode", type: "text" },
        ]}
      />

      <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
    </FormProvider>
  );
};

export default Page;
