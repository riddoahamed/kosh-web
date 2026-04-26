import { useState } from "react";
import type { BehaviorQuestion as BehaviorQuestionType } from "@/types/curriculum";
import { cn } from "@/lib/utils";

const SCORE_VALUES = [0, 25, 50, 75, 100];

interface Props {
  question: BehaviorQuestionType;
  onAnswer: (value: number, rawValue: number) => void;
}

export function BehaviorQuestion({ question, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
    onAnswer(SCORE_VALUES[index], index);
  };

  return (
    <div className="space-y-5">
      <p className="text-lg font-medium text-foreground leading-relaxed">
        {question.text}
      </p>
      <div className="grid gap-3">
        {question.frequencyLabels.map((label, i) => (
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
                  "w-5 h-5 rounded-full border-2 shrink-0 transition-all",
                  selected === i ? "border-primary bg-primary" : "border-border"
                )}
              />
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
