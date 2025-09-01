"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useQuizzes } from "@/query/quiz";
import { useCreateQuestion } from "@/query/question";

// Zod schema for validation
const choiceSchema = z.object({
  text: z.string().min(1, "Choice text is required"),
  isCorrect: z.boolean(),
});

const questionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  type: z.string().min(1, "Question type is required"),
  choices: z.array(choiceSchema).min(2, "At least 2 choices are required"),
  points: z.number().min(0, "Points must be a positive number"),
  isMath: z.boolean(),
  isMultiTrue: z.boolean(),
});

const formSchema = z.object({
  quizId: z.string().min(1, "Quiz ID is required"),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddQuestion() {
  const { mutate: createQuestion, isPending: isCreate } = useCreateQuestion();
  const { data: quizzes, isLoading: isQuizzes } = useQuizzes();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quizId: "",
      questions: [
        {
          text: "",
          type: "multiple_choice",
          choices: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
          points: 1,
          isMath: false,
          isMultiTrue: false,
        },
      ],
    },
  });

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = (data: FormValues) => {
    createQuestion(data, {
      onSuccess() {
        toast.success("Question Added Successfully!");

        form.reset();
      },
    });
  };

  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add Questions</CardTitle>
          <CardDescription>
            Add new questions to an existing quiz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="quizId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz</FormLabel>
                    <Select
                      disabled={isQuizzes}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select the quiz to add questions to" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {quizzes?.map((quiz) => (
                          <SelectItem key={quiz._id} value={quiz._id}>
                            {quiz._id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-10">
                {questions.map((question, questionIndex) => (
                  <div
                    key={question.id}
                    className="space-y-6 p-6 border rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">
                        Question {questionIndex + 1}
                      </h3>
                      {questions.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeQuestion(questionIndex)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name={`questions.${questionIndex}.text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Question Text</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter your question"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`questions.${questionIndex}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Question Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="multiple_choice">
                                    Multiple Choice
                                  </SelectItem>
                                  <SelectItem value="true_false">
                                    True/False
                                  </SelectItem>
                                  <SelectItem value="short_answer">
                                    Short Answer
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`questions.${questionIndex}.points`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Points</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(+e.target.value)
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <FormField
                        control={form.control}
                        name={`questions.${questionIndex}.isMath`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Math Question
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`questions.${questionIndex}.isMultiTrue`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Multiple Correct Answers
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Choices</h4>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const currentChoices = form.getValues(
                              `questions.${questionIndex}.choices`
                            );
                            form.setValue(
                              `questions.${questionIndex}.choices`,
                              [
                                ...currentChoices,
                                { text: "", isCorrect: false },
                              ]
                            );
                          }}
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Choice
                        </Button>
                      </div>

                      {form
                        .watch(`questions.${questionIndex}.choices`)
                        .map((choice, choiceIndex) => (
                          <div
                            key={choiceIndex}
                            className="flex items-start space-x-3"
                          >
                            <FormField
                              control={form.control}
                              name={`questions.${questionIndex}.choices.${choiceIndex}.isCorrect`}
                              render={({ field }) => (
                                <FormItem className="flex items-center pt-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`questions.${questionIndex}.choices.${choiceIndex}.text`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      placeholder={`Choice ${choiceIndex + 1}`}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                const currentChoices = form.getValues(
                                  `questions.${questionIndex}.choices`
                                );
                                if (currentChoices.length <= 2) {
                                  toast.error("Minimum 2 choices required");
                                  return;
                                }
                                const newChoices = [...currentChoices];
                                newChoices.splice(choiceIndex, 1);
                                form.setValue(
                                  `questions.${questionIndex}.choices`,
                                  newChoices
                                );
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap w-full justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    appendQuestion({
                      text: "",
                      type: "multiple_choice",
                      choices: [
                        { text: "", isCorrect: false },
                        { text: "", isCorrect: false },
                      ],
                      points: 1,
                      isMath: false,
                      isMultiTrue: false,
                    });
                  }}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <div className="flex flex-wrap justify-end w-full gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>

            <Button
              type="submit"
              form="add-question-form"
              disabled={isCreate}
              onClick={form.handleSubmit(onSubmit)}
            >
              Save Questions
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
