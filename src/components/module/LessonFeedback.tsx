import { useEffect, useState } from "react";
import { Check, MessageSquareText } from "lucide-react";
import { db, type LessonFeedbackValue } from "@/lib/supabase";

interface LessonFeedbackProps {
  moduleId: string;
  quizScore: number | null;
}

const OPTIONS: Array<{ value: LessonFeedbackValue; label: string }> = [
  { value: "useful", label: "Useful" },
  { value: "too_long", label: "Too long" },
  { value: "too_basic", label: "Too basic" },
  { value: "want_more", label: "Want more" },
];

export function LessonFeedback({ moduleId, quizScore }: LessonFeedbackProps) {
  const [selected, setSelected] = useState<LessonFeedbackValue | null>(null);

  useEffect(() => {
    setSelected(db.getLessonFeedback(moduleId)?.value ?? null);
  }, [moduleId]);

  function choose(value: LessonFeedbackValue) {
    setSelected(value);
    db.saveLessonFeedback({
      moduleId,
      value,
      quizScore,
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-card/70 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <MessageSquareText className="h-4 w-4 text-primary" />
        <p className="text-sm font-semibold text-foreground">How was this lesson?</p>
        {selected && (
          <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-green-600">
            <Check className="h-3.5 w-3.5" />
            Saved
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {OPTIONS.map((option) => {
          const active = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => choose(option.value)}
              className={`min-h-10 rounded-xl border px-3 text-xs font-semibold transition-all ${
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-background/70 text-foreground/70 hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
