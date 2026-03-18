"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivyProvider from "./PrivyProvider";
import { HideProvider } from "./HideProvider";
const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider>
        <HideProvider>
          {children}
        </HideProvider>
      </PrivyProvider>
    </QueryClientProvider>
  );
}
