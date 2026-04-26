import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { greyZoneQuestion } from "@/data/diagnosticQuestions";
import { cn } from "@/lib/utils";

interface Props {
  onSubmit: (selections: string[]) => void;
}

export function GreyZoneQuestion({ onSubmit }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (value: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (value === "none") return new Set(["none"]);
      next.delete("none");
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="inline-block bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 text-xs font-semibold px-3 py-1 rounded-full">
          One final question
        </div>
        <p className="text-lg font-medium text-foreground leading-relaxed">
          {greyZoneQuestion.text}
        </p>
        <p className="text-sm text-muted-foreground">
          এটা test না — এটা সত্যিকারের সাহায্য করার জন্য জিজ্ঞেস করছি। Select all that apply.
        </p>
      </div>

      <div className="grid gap-3">
        {greyZoneQuestion.options.map((option) => {
          const isSelected = selected.has(option.value);
          return (
            <button
              key={option.value}
              onClick={() => toggle(option.value)}
              className={cn(
                "w-full text-left px-4 py-4 rounded-xl border-2 text-sm font-medium transition-all min-h-[52px] flex items-center gap-3",
                isSelected
                  ? option.value === "none"
                    ? "border-border bg-muted text-foreground"
                    : "border-violet-500 bg-violet-50 text-violet-800 dark:bg-violet-900/30 dark:text-violet-200"
                  : "border-border bg-card hover:border-border/80 active:scale-[0.99]"
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggle(option.value)}
                className={cn(
                  isSelected && option.value !== "none"
                    ? "data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                    : ""
                )}
              />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>

      <Button onClick={() => onSubmit(Array.from(selected))} disabled={selected.size === 0} className="w-full" size="lg">
        See my result →
      </Button>
    </div>
  );
}
