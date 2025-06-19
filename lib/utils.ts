import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { notFound } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleAxiosNotFound(err: any): never {
  if (axios.isAxiosError(err) && err.response?.status === 404) {
    notFound();
  }
  throw err;
}
