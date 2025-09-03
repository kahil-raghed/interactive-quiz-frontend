"use client";

import Link from "next/link";
// import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAccessQuiz } from "@/query/quiz";
import { Quiz } from "@/types/quiz";
// import { isAdmin, parseJwt } from "@/lib/token";

// Schema for form validation
const accessQuizSchema = z.object({
  accessCode: z.string().min(1, "Access code is required"),
});

type LoginFormValues = z.infer<typeof accessQuizSchema>;

export function AccessStep($: {
  onSuccess?: (quiz: Quiz) => void;
}) {
  // const router = useRouter();

  // Form setup with react-hook-form & Zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(accessQuizSchema),
    defaultValues: {
      accessCode: "",
    },
  });

  // React Query mutation for login
  const { mutateAsync: access, isPending } = useAccessQuiz();

  const onSubmit = (values: LoginFormValues) => {
    access({ accessCode: values.accessCode }).then((res) => {
      $.onSuccess?.(res);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Access</CardTitle>
          <CardDescription>
            Use the quiz access code to access the quiz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="accessCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Access Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Accessing..." : "Access"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
