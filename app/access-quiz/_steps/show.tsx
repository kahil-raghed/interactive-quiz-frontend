import { Quiz } from "@/types/quiz";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubmitQuiz } from "@/query/quiz";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Fragment, useState } from "react";
import { Separator } from "@/components/ui/separator";

function getClass(index, value, isCorrect) {
  console.log(index, value, isCorrect);
  if (index != value) {
    return "";
  }

  return isCorrect ? "bg-successful/80" : "bg-destructive/50";
}

export function QuestionsStep({ quiz }: { quiz: Quiz }) {
  const [showAnswers, setShowAnswers] = useState(false);
  // const { isPending } = useSubmitQuiz();
  const form = useForm();
  const isPending = form.formState.isSubmitting;
  const onSubmit = form.handleSubmit(async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowAnswers(true);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-10/12">
        <CardHeader>
          <CardTitle className="text-2xl">Answer all questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="flex flex-col gap-8">
                {quiz.questions.map((q) => (
                  <Fragment key={q._id}>
                    <FormField
                      control={form.control}
                      name={`answers.${q._id}` as const}
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>{q.text}</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col"
                              disabled={showAnswers}
                            >
                              {q.choices.map((c, ix) => (
                                <div key={ix}>
                                  <FormItem
                                    className={
                                      "p-3 flex items-center gap-3 rounded-sm " +
                                      (showAnswers
                                        ? getClass(ix, field.value, c.isCorrect)
                                        : "")
                                    }
                                    
                                  >
                                    <FormControl className="bg-background">
                                      <RadioGroupItem value={`${ix}`} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {c.text}
                                    </FormLabel>
                                  </FormItem>
                                    { c.isCorrect && showAnswers && <p className="text-sm text-successful ps-4">This is the correct answer</p>}
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Fragment>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isPending || showAnswers}
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
