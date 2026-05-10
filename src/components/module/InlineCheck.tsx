import { useState } from "react";
import type { InlineCheck as InlineCheckType } from "@/types/curriculum";

interface InlineCheckProps {
  check: InlineCheckType;
}

export function InlineCheck({ check }: InlineCheckProps) {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div className="my-5 rounded-2xl border border-amber-500/25 bg-amber-500/8 p-4 space-y-3">
      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
        Quick check 💭
      </p>
      <p className="text-sm font-medium text-foreground/85 leading-relaxed">{check.question}</p>
      <div className="space-y-2">
        {check.options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === check.correctIndex;
          const showState = picked !== null;
          const stateClass = !showState
            ? "border-border bg-background/40 hover:bg-background/70"
            : isCorrect
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : isPicked
                ? "border-rose-500/50 bg-rose-500/10 text-rose-700 dark:text-rose-300"
                : "border-border bg-background/30 text-foreground/50";
          return (
            <button
              key={i}
              type="button"
              onClick={() => picked === null && setPicked(i)}
              disabled={picked !== null}
              className={`w-full text-left text-sm rounded-xl border px-3 py-2 transition-colors ${stateClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <p className="text-xs leading-relaxed text-foreground/70 pt-1">{check.explanation}</p>
      )}
    </div>
  );
}
