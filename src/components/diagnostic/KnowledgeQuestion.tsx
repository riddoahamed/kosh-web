import { useState } from "react";
import type { KnowledgeQuestion as KnowledgeQuestionType } from "@/types/curriculum";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

interface Props {
  question: KnowledgeQuestionType;
  onAnswer: (value: number, rawValue: number) => void;
}

export function KnowledgeQuestion({ question, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
    const value = index === question.correctIndex ? 20 : 0;
    setTimeout(() => onAnswer(value, index), 800);
  };

  return (
    <div className="space-y-5">
      <p className="text-lg font-medium text-foreground leading-relaxed">
        {question.text}
      </p>
      <div className="grid gap-3">
        {question.options.map((option, i) => {
          const isSelected = selected === i;
          const isCorrect = i === question.correctIndex;
          const showCorrect = revealed && isCorrect;
          const showWrong = revealed && isSelected && !isCorrect;

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              className={cn(
                "w-full text-left px-4 py-4 rounded-xl border-2 text-sm font-medium transition-all min-h-[52px]",
                !revealed &&
                  "border-border bg-card hover:border-primary/50 hover:bg-primary/5 active:scale-[0.99]",
                showCorrect && "border-emerald-500 bg-emerald-50 text-emerald-800",
                showWrong && "border-red-400 bg-red-50 text-red-700",
                revealed && !isSelected && !isCorrect &&
                  "border-border/50 bg-muted/30 text-foreground/30"
              )}
            >
              <span className="flex items-center gap-3">
                {showCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />}
                {showWrong && <XCircle className="h-5 w-5 text-red-400 shrink-0" />}
                {!showCorrect && !showWrong && (
                  <span className="font-bold text-foreground/30 shrink-0 w-4">
                    {String.fromCharCode(65 + i)}.
                  </span>
                )}
                {option}
              </span>
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="rounded-xl bg-muted/50 border border-border p-4 text-sm text-foreground/70">
          {question.explanation}
        </div>
      )}
    </div>
  );
}
