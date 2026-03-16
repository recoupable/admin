import OrgsPage from "@/components/Orgs/OrgsPage";

export const metadata = {
  title: "Org Repos — Recoup Admin",
  description: "View all GitHub org repositories and their commit statistics.",
};

export default function Page() {
  return <OrgsPage />;
}
