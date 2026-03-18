"use client";

import { useState, useCallback, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useHide } from "@/providers/HideProvider";

const BLINK_MS = 150;

export function HideToggle() {
  const { isHidden, toggle } = useHide();
  const [phase, setPhase] = useState<"idle" | "closing" | "opening">("idle");
  const iconRef = useRef<SVGSVGElement>(null);

  const handleClick = useCallback(() => {
    if (phase !== "idle") return;

    // Phase 1: close the eye
    setPhase("closing");

    setTimeout(() => {
      // Phase 2: swap icon while still closed, then open
      toggle();
      setPhase("opening");

      // Wait for next frame so the browser registers scaleY(0) before animating to scaleY(1)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("idle");
        });
      });
    }, BLINK_MS);
  }, [toggle, phase]);

  const Icon = isHidden ? EyeOff : Eye;

  const scaleY = phase === "closing" || phase === "opening" ? 0 : 1;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isHidden ? "Show sensitive info" : "Hide sensitive info"}
      aria-pressed={isHidden}
      title={isHidden ? "Show sensitive info" : "Hide sensitive info"}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      <Icon
        ref={iconRef}
        className="h-4 w-4"
        style={{
          transform: `scaleY(${scaleY})`,
          transition: `transform ${BLINK_MS}ms ease-in-out`,
        }}
      />
    </button>
  );
}
