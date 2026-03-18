"use client";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHide } from "@/providers/HideProvider";

export function HideToggle() {
  const { isHidden, toggle } = useHide();

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="ghost"
        onClick={toggle}
        className="h-9 px-3 gap-2 border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
        title={isHidden ? "Show sensitive info" : "Hide sensitive info"}
      >
        {isHidden ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
        <span className="text-sm font-medium">
          {isHidden ? "Hidden" : "Visible"}
        </span>
      </Button>
    </div>
  );
}
