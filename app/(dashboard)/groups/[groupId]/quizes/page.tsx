"use client";

import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { FormItem } from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { Separator } from "../../../../../components/ui/separator";
import { Textarea } from "../../../../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { MathField } from "../../../../../components/ui/math-field";
import { useRef, useState } from "react";
import { convertLatexToMarkup } from "mathlive";

export default function GroupQuizes() {
  const [question, setQuestion] = useState("");

  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <h1 className="mb-4">Group Quizes</h1>
      <Card>
        <CardHeader>
          <CardTitle>Quiz edit</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="flex flex-col gap-4">
            <FormItem>
              <Label>Title</Label>
              <Input placeholder="Title..." />
            </FormItem>

            <FormItem>
              <Label>Question</Label>
              <Textarea
                ref={ref}
              />
              <AddEquationDialog 
                onFinish={(eq) => {
                    ref.current!.innerHTML += eq
                }}
              />
            </FormItem>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

const AddEquationDialog = ($: { onFinish?: (eq: string) => any }) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onDone = () => {
    $.onFinish?.(convertLatexToMarkup(value));
    setIsOpen(false);
    setValue("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Equation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Equation</DialogTitle>
        </DialogHeader>
        <MathField
          value={value}
          onChange={(ev) => setValue(ev.currentTarget.value)}
        />
        <Button onClick={onDone}>Done</Button>
      </DialogContent>
    </Dialog>
  );
};
