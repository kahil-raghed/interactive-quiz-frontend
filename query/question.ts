import { createQuestion } from "@/api/question";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateQuestion = () => {
  return useMutation({
    mutationFn: createQuestion,
    onError() {
      toast("Error creating question");
    },
  });
};
