import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  score: number;
  color?: string;
  delay?: number;
}

export function DomainScoreBar({ label, score, color = "bg-primary", delay = 0 }: Props) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), delay);
    return () => clearTimeout(timer);
  }, [score, delay]);

  const getScoreLabel = (s: number) => {
    if (s >= 70) return "Strong";
    if (s >= 40) return "Building";
    return "Starting";
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-foreground/80">{label}</span>
        <span className="text-muted-foreground text-xs">
          {score}% · {getScoreLabel(score)}
        </span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-1000 ease-out", color)}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
