"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useAssignStudents, useGroup, useRemoveStudents } from "@/query/group";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Controller, useForm } from "react-hook-form";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { useStudents } from "@/query/student";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { toast } from "sonner";

const formSchema = z.object({
  studentIds: z
    .string()
    .array()
    .min(1, "At least one student must be selected"),
  type: z.string().nullable(),
});

const Group = () => {
  const { id } = useParams();
  // const router = useRouter();
  const { data: students } = useStudents();
  const { data: group, isLoading: isGroup } = useGroup(id as string);

  const { mutate: assign, isPending: isAssign } = useAssignStudents();
  const { mutate: remove, isPending: isRemove } = useRemoveStudents();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { type: "assign", studentIds: [] },
  });

  const onSubmit = ({ studentIds, type }: z.infer<typeof formSchema>) => {
    if (type === "assign") {
      assign({ id: id as string, studentIds });
    } else {
      remove({ id: id as string, studentIds });
    }
  };

  if (isGroup) return <Skeleton className="h-20" />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <p className="text-2xl">Group&apos;s Students ({group?.name})</p>
        <p>Students</p>
        <div className="flex flex-wrap gap-2">
          {group?.students.map((student, idx) => (
            <Badge key={idx} variant={"outline"}>
              {student}
            </Badge>
          ))}
        </div>

        <Tabs
          defaultValue="assign"
          onValueChange={(type) => reset({ studentIds: [], type })}
          className="w-full"
        >
          <TabsList className="w-full">
            <TabsTrigger value="assign">Assign Student</TabsTrigger>
            <TabsTrigger value="remove">Remove Student</TabsTrigger>
          </TabsList>
          <TabsContent value="assign">
            <Controller
              name={"studentIds"}
              control={control} // Use passed control or context control
              render={({ field }) => (
                <MultiSelect
                  options={
                    students?.map((student) => ({
                      label: student.name,
                      value: student._id,
                    })) ?? []
                  }
                  defaultValue={field.value || []}
                  onValueChange={(value) => field.onChange(value)}
                />
              )}
            />
          </TabsContent>
          <TabsContent value="remove">
            <Controller
              name={"studentIds"}
              control={control} // Use passed control or context control
              render={({ field }) => (
                <MultiSelect
                  options={
                    group?.students.map((student) => ({
                      label: student,
                      value: student,
                    })) ?? []
                  }
                  defaultValue={field.value || []}
                  onValueChange={(value) => field.onChange(value)}
                />
              )}
            />
          </TabsContent>
        </Tabs>

        {errors.studentIds && (
          <p className="text-sm text-red-500">{errors.studentIds.message}</p>
        )}

        <Button type="submit" disabled={isAssign || isRemove}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Group;
