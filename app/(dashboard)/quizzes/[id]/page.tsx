"use client";

import { useQuiz } from "@/query/quiz";
import { useParams } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HelpCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import EDate from "@/lib/date";

const QuizPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuiz(id as string);

  console.log(data);

  if (isLoading) return <Skeleton className="h-20" />;

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-xl font-semibold">Quiz Not Found</h2>
            <p className="mt-2 text-muted-foreground">
              The requested quiz could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-left">
                <Badge variant="secondary" className="mb-2">
                  {data.group.name || "General Quiz"}
                </Badge>
                <CardTitle className="text-2xl md:text-3xl">
                  Quiz Details
                </CardTitle>
              </div>
              <Badge variant="outline">Access Code: {data.accessCode}</Badge>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-4">
              <div className="text-left">
                <p className="text-sm text-muted-foreground">
                  Scheduled: {EDate(data.scheduledAt)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Status: {data.isOver ? "Completed" : "Active"}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-medium">
                  Total Points:{" "}
                  {data.questions?.reduce((sum, q) => sum + q.points, 0) || 0}
                </p>
                <p className="text-sm text-muted-foreground">
                  {data.questions?.length} Questions
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-10">
            {data.questions?.map((question, index) => (
              <div key={question._id} className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      {question.text}
                      {question.isMath && (
                        <Badge variant="outline" className="ml-2">
                          Math
                        </Badge>
                      )}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Badge variant="secondary">
                        {question.points} point{question.points > 1 ? "s" : ""}
                      </Badge>
                      <Badge variant="outline">
                        {question.isMultiTrue
                          ? "Multiple Answers"
                          : "Single Answer"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pl-11">
                  {question.isMultiTrue ? (
                    // Multiple choice - use checkboxes
                    question.choices.map((choice, choiceIndex) => {
                      const choiceId = `${question._id}-${choiceIndex}`;

                      return (
                        <div
                          key={choiceId}
                          className="flex items-center space-x-3 p-3 rounded-md border"
                        >
                          <Checkbox
                            id={choiceId}
                            checked={choice.isCorrect}
                            className="!cursor-auto"
                            // disabled
                          />
                          <Label
                            htmlFor={choiceId}
                            className="flex items-center w-full !cursor-auto"
                          >
                            <span
                              className={
                                choice.isCorrect
                                  ? "font-semibold text-green-600"
                                  : ""
                              }
                            >
                              {choice.text}
                            </span>
                            {choice.isCorrect && (
                              <Badge variant="default" className="ml-auto">
                                Correct Answer
                              </Badge>
                            )}
                          </Label>
                        </div>
                      );
                    })
                  ) : (
                    // Single choice - use RadioGroup
                    <RadioGroup value="disabled" disabled>
                      {question.choices.map((choice, choiceIndex) => {
                        const choiceId = `${question._id}-${choiceIndex}`;

                        return (
                          <div
                            key={choiceId}
                            className="flex items-center space-x-3 p-3 rounded-md border"
                          >
                            <RadioGroupItem
                              value={choice.text}
                              id={choiceId}
                              checked={choice.isCorrect}
                              disabled
                              className="border-2 !cursor-auto"
                            />
                            <Label
                              htmlFor={choiceId}
                              className="flex items-center cursor-default w-full"
                            >
                              <span
                                className={
                                  choice.isCorrect
                                    ? "font-semibold text-green-600"
                                    : ""
                                }
                              >
                                {choice.text}
                              </span>
                              {choice.isCorrect && (
                                <Badge variant="default" className="ml-auto">
                                  Correct Answer
                                </Badge>
                              )}
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  )}
                </div>

                {index < (data.questions?.length || 0) - 1 && (
                  <Separator className="my-6" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;
