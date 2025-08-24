"use client";

import { QueryClientProvider } from "../../providers/query-client-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <>{children}</>
    </QueryClientProvider>
  );
}
