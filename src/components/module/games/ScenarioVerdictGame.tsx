import { useState } from "react";
import type { ScenarioVerdictGame as ScenarioVerdictGameType } from "@/types/curriculum";

interface Props {
  game: ScenarioVerdictGameType;
  onComplete: () => void;
}

const DISPLAY_LABELS: Record<string, string> = {
  equity:        "Equity",
  not_equity:    "Not Equity",
  open_end:      "Open-end",
  closed_end:    "Closed-end",
  goal:          "Goal ✓",
  wish:          "Wish",
  A:             "Option A",
  B:             "Option B",
};

function toDisplay(value: string): string {
  return DISPLAY_LABELS[value] ?? value;
}

// Extract unique verdict values preserving insertion order
function uniqueVerdicts(items: ScenarioVerdictGameType["items"]): string[] {
  const seen = new Set<string>();
  for (const item of items) seen.add(item.correct);
  return Array.from(seen);
}

export function ScenarioVerdictGame({ game, onComplete }: Props) {
  const verdicts = uniqueVerdicts(game.items);
  const [idx, setIdx]       = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect]   = useState(0);
  const [done, setDone]         = useState(false);

  const item = game.items[idx];

  function handlePick(value: string) {
    if (selected !== null) return;
    setSelected(value);
    if (value === item.correct) setCorrect((c) => c + 1);

    setTimeout(() => {
      if (idx < game.items.length - 1) {
        setIdx((i) => i + 1);
        setSelected(null);
      } else {
        setDone(true);
        onComplete();
      }
    }, 2000);
  }

  if (done) {
    return (
      <div className="rounded-xl bg-green-500/10 border border-green-500/25 px-4 py-3">
        <p className="text-sm font-semibold text-green-700 dark:text-green-400">
          {correct}/{game.items.length} correct
        </p>
      </div>
    );
  }

  const isCorrect = selected === item.correct;

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-foreground/40">
        <span>{idx + 1} / {game.items.length}</span>
        <div className="h-1 w-24 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(idx / game.items.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Scenario */}
      <div className="rounded-xl border border-amber-500/25 bg-amber-500/8 p-4">
        <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
          {item.scenario}
        </p>
      </div>

      {/* Verdict buttons */}
      <div className="flex flex-wrap gap-2">
        {verdicts.map((value) => {
          let cls =
            "flex-1 min-w-[100px] py-2.5 px-4 rounded-xl border-2 text-sm font-semibold transition-all ";
          if (selected === null) {
            cls += "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
          } else if (value === item.correct) {
            cls += "border-green-500 bg-green-500/15 text-green-700 dark:text-green-400 cursor-default";
          } else if (value === selected && !isCorrect) {
            cls += "border-red-400 bg-red-500/10 text-red-600 dark:text-red-400 cursor-default";
          } else {
            cls += "border-border opacity-35 cursor-default";
          }

          return (
            <button key={value} className={cls} onClick={() => handlePick(value)}>
              {toDisplay(value)}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {selected !== null && (
        <div
          className={`rounded-xl p-4 text-sm leading-relaxed ${
            isCorrect
              ? "bg-green-500/10 border border-green-500/25 text-green-700 dark:text-green-400"
              : "bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-400"
          }`}
        >
          <span className="font-semibold mr-1">
            {isCorrect ? "Correct." : "Not quite."}
          </span>
          {item.explanation}
        </div>
      )}
    </div>
  );
}
