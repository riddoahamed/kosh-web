import { useState } from "react";
import type { FillBlankQuestion } from "@/types/curriculum";

interface Props {
  question: FillBlankQuestion;
  onAnswer: (correct: boolean) => void;
}

function normalize(s: string, unit?: string): string {
  let v = s.trim().toLowerCase();
  if (unit === "%") v = v.replace(/%/g, "").trim();
  if (unit === "Tk") v = v.replace(/tk\.?/gi, "").replace(/,/g, "").trim();
  // numeric variants for negatives
  v = v.replace(/^minus\s+/, "-").replace(/^negative\s+/, "-");
  return v;
}

function matchesAnswer(input: string, accepted: string[], unit?: string): boolean {
  const v = normalize(input, unit);
  return accepted.some((a) => normalize(a, unit) === v);
}

export function FillBlankInput({ question, onAnswer }: Props) {
  const [value, setValue] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [revealed, setRevealed] = useState<"correct" | "wrong" | "given_up" | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (revealed) return;
    if (matchesAnswer(value, question.acceptedAnswers, question.unit)) {
      setRevealed("correct");
      onAnswer(true);
      return;
    }
    const next = attempts + 1;
    setAttempts(next);
    if (next >= 2) {
      setRevealed("given_up");
      onAnswer(false);
    } else {
      setRevealed("wrong");
      setTimeout(() => setRevealed(null), 1500);
    }
  }

  const parts = question.question.split("___");
  const showHint = attempts >= 1 && question.hint && revealed !== "correct" && revealed !== "given_up";
  const isFinal = revealed === "correct" || revealed === "given_up";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-foreground leading-relaxed">
        <p className="font-semibold text-base">
          {parts.map((part, i) => (
            <span key={i}>
              {part}
              {i < parts.length - 1 && (
                <span className="inline-flex items-center mx-1 align-middle">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={isFinal}
                    placeholder="?"
                    className="w-32 px-2 py-1 rounded-lg border-2 border-primary/40 bg-primary/5 text-primary font-bold text-center focus:outline-none focus:border-primary disabled:opacity-60"
                  />
                  {question.unit && <span className="ml-1 text-foreground/60 font-normal">{question.unit}</span>}
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {showHint && (
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/25 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
          💡 Hint: {question.hint}
        </div>
      )}

      {revealed === "correct" && (
        <div className="rounded-xl p-4 text-sm bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400">
          <span className="font-semibold mr-1">Correct.</span>
          {question.explanation}
        </div>
      )}

      {revealed === "given_up" && (
        <div className="rounded-xl p-4 text-sm bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400">
          <span className="font-semibold mr-1">Answer: {question.acceptedAnswers[0]}.</span>
          {question.explanation}
        </div>
      )}

      {!isFinal && (
        <button
          type="submit"
          disabled={!value.trim()}
          className="w-full bg-primary text-primary-foreground rounded-xl py-3 text-sm font-bold hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          Check
        </button>
      )}
    </form>
  );
}
