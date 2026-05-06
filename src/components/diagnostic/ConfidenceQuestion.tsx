import { useState } from "react";
import type { ConfidenceQuestion as ConfidenceQuestionType } from "@/types/curriculum";
import { cn } from "@/lib/utils";
import { normalizeLikert } from "@/lib/scoring";

interface Props {
  question: ConfidenceQuestionType;
  onAnswer: (value: number, rawValue: number) => void;
}

export function ConfidenceQuestion({ question, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
    const rawValue = index + 1;
    const value = normalizeLikert(rawValue);
    onAnswer(value, rawValue);
  };

  return (
    <div className="space-y-5">
      <p className="text-lg font-medium text-foreground leading-relaxed italic">
        {question.text}
      </p>
      <div className="space-y-3">
        <div className="grid gap-3">
          {question.likertLabels.map((label, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={cn(
                "w-full text-left px-4 py-4 rounded-xl border-2 text-sm font-medium transition-all min-h-[52px]",
                selected === i
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:border-primary/40 hover:bg-primary/5 active:scale-[0.99]"
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full border-2 text-xs font-bold shrink-0 transition-all",
                    selected === i
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground/50"
                  )}
                >
                  {i + 1}
                </span>
                {label}
              </span>
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-foreground/40 px-1">
          <span>Strongly disagree</span>
          <span>Strongly agree</span>
        </div>
      </div>
    </div>
  );
}
