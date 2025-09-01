"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useForm } from "react-hook-form";
import { MathField } from "../../../components/ui/math-field";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";
import { Button } from "../../../components/ui/button";
import { Controller } from "react-hook-form";

const formSchema = z.object({
  title: z.string().optional(),
  questions: z.array(
    z.object({
      title: z.string().min(1, "Question title is required"),
      content: z.string().optional(),
      mathEquations: z.array(z.string().min(1, "Equation cannot be empty")),
      options: z.array(
        z.object({
          title: z.string().min(1, "Option title is required"),
          isCorrect: z.boolean(),
        })
      ),
    })
  ),
});

export default function QuizEditor() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      questions: [
        {
          title: "",
          content: "",
          mathEquations: [],
          options: [
            { title: "Option 1", isCorrect: true },
            { title: "Option 2", isCorrect: false },
            { title: "Option 3", isCorrect: false },
            { title: "Option 4", isCorrect: false },
          ],
        },
      ],
    },
  });

  const questions = form.watch("questions");

  const submit = form.handleSubmit((values) => {
    console.log(values);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz 1</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <Form {...form}>
          <form onSubmit={submit}>
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Title</FormLabel>
                  <Input placeholder="Title..." {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-lg font-semibold mb-2">Questions:</p>
            <Separator className="mb-4" />

            <div className="mb-4">
              {questions.map((q, ix) => (
                <div key={ix} className="mb-4">
                  {ix > 0 && <Separator />}
                  <p className="mb-2">Question {ix + 1}:</p>
                  <FormField
                    name={`questions.${ix}.title`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <Input placeholder="title..." {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col">
                    {q.mathEquations.map((eq, eqIx) => (
                      <FormField
                        key={eqIx}
                        name={`questions.${ix}.mathEquations.${eqIx}`}
                        control={form.control}
                        render={({}) => (
                          <FormItem className="mb-2">
                            <div className="flex">
                              <FormLabel className="me-2">
                                Eq{eqIx + 1}:
                              </FormLabel>
                              <Controller
                                control={form.control}
                                name={`questions.${ix}.mathEquations.${eqIx}`}
                                render={({ field: controllerField }) => (
                                  <MathField
                                    value={controllerField.value}
                                    onChange={controllerField.onChange}
                                    name={controllerField.name}
                                    className="flex-1"
                                  />
                                )}
                              />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button
                      size={"sm"}
                      onClick={() => {
                        const currentEquations = form.getValues(
                          `questions.${ix}.mathEquations`
                        );
                        form.setValue(`questions.${ix}.mathEquations`, [
                          ...currentEquations,
                          "",
                        ]);
                      }}
                    >
                      Add Equation
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button
                onClick={() => {
                  form.setValue("questions", [
                    ...form.getValues("questions"),
                    {
                      title: "",
                      content: "",
                      mathEquations: [],
                      options: [
                        { title: "Option 1", isCorrect: true },
                        { title: "Option 2", isCorrect: false },
                        { title: "Option 3", isCorrect: false },
                        { title: "Option 4", isCorrect: false },
                      ],
                    },
                  ]);
                }}
              >
                Add Question
              </Button>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
