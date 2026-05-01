import type { LevelAssignment } from "@/types/diagnostic";
import { cn } from "@/lib/utils";

const CONFIG: Record<LevelAssignment, { label: string; bg: string; text: string; border: string }> = {
  0: {
    label: "Level 0",
    bg: "bg-muted",
    text: "text-foreground/70",
    border: "border-border",
  },
  1: {
    label: "Level 1",
    bg: "bg-primary/15",
    text: "text-primary",
    border: "border-primary/30",
  },
  10: {
    label: "Level 10",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-800 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
  },
};

interface Props {
  level: LevelAssignment;
  size?: "sm" | "md" | "lg";
}

export function LevelBadge({ level, size = "md" }: Props) {
  const config = CONFIG[level] ?? CONFIG[1]; // fallback so a bad level never crashes
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-bold",
        config.bg,
        config.text,
        config.border,
        size === "sm" && "text-xs px-2.5 py-0.5",
        size === "md" && "text-sm px-3 py-1",
        size === "lg" && "text-base px-4 py-1.5"
      )}
    >
      {config.label}
    </span>
  );
}
