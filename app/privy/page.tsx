import type { Metadata } from "next";
import PrivyLoginsPage from "@/components/PrivyLogins/PrivyLoginsPage";

export const metadata: Metadata = {
  title: "Privy Logins — Recoup Admin",
};

export default function Page() {
  return <PrivyLoginsPage />;
}
