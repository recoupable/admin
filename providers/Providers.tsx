"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivyProvider from "./PrivyProvider";
import { HideProvider } from "./HideProvider";
import { HideToggle } from "@/components/HideToggle";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider>
        <HideProvider>
          <HideToggle />
          {children}
        </HideProvider>
      </PrivyProvider>
    </QueryClientProvider>
  );
}
