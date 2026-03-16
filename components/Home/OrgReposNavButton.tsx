import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrgReposNavButton() {
  return (
    <Button asChild variant="ghost">
      <Link href="/sandboxes/orgs">View Org Commits →</Link>
    </Button>
  );
}
