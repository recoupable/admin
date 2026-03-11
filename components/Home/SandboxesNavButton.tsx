import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SandboxesNavButton() {
  return (
    <Button asChild>
      <Link href="/sandboxes">View Sandboxes →</Link>
    </Button>
  );
}
