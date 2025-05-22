'use client'

import { PropsWithChildren, useMemo } from "react";

import {
  QueryClient,
  QueryClientProvider as TanQueryClientProvider,
} from "@tanstack/react-query";

export function QueryClientProvider({ children }: PropsWithChildren) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <TanQueryClientProvider client={queryClient}>
      {children}
    </TanQueryClientProvider>
  );
}
