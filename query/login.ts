import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login successful!");
      router.push("/");
    },
    onError: () => {
      toast.error("Invalid credentials. Please try again.");
    },
  });
};
