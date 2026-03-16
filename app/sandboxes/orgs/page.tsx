import type { Metadata } from "next";
import SandboxOrgsPage from "@/components/SandboxOrgs/SandboxOrgsPage";

export const metadata: Metadata = {
  title: "Org Repos — Recoup Admin",
};

export default function Page() {
  return <SandboxOrgsPage />;
}
