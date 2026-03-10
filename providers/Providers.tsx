"use client";

import PrivyProvider from "./PrivyProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <PrivyProvider>{children}</PrivyProvider>;
}
