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
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";

export function QuestionsStep({ quiz }: { quiz: Quiz }) {
  const { isPending } = useSubmitQuiz();
  const form = useForm();
  const onSubmit = form.handleSubmit((values) => {});

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
                      name="type"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>{q.text}</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col"
                            >
                              {q.choices.map((c, ix) => (
                                <FormItem
                                  className="flex items-center gap-3"
                                  key={ix}
                                >
                                  <FormControl>
                                    <RadioGroupItem value={`${ix}`} />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {c.text}
                                  </FormLabel>
                                </FormItem>
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

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
