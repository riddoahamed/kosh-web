import { useState } from "react";
import type { OrderStepsGame as OrderStepsGameType } from "@/types/curriculum";

interface Props {
  game: OrderStepsGameType;
  onComplete: () => void;
}

export function OrderStepsGame({ game, onComplete }: Props) {
  // Shuffle once on mount
  const [shuffled] = useState<number[]>(() => {
    const indices = game.steps.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });

  // selectedOrder: original indices in the order the user tapped them
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);

  const remaining = shuffled.filter((i) => !selectedOrder.includes(i));

  function handleTap(originalIdx: number) {
    if (revealed) return;
    setSelectedOrder((prev) => [...prev, originalIdx]);
  }

  function handleReveal() {
    setRevealed(true);
    onComplete();
  }

  return (
    <div className="space-y-4">
      {/* Tap-to-select pool */}
      {!revealed && remaining.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-foreground/40 uppercase tracking-widest">Tap in order</p>
          {remaining.map((originalIdx) => (
            <button
              key={originalIdx}
              onClick={() => handleTap(originalIdx)}
              className="w-full text-left px-4 py-3 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 text-sm transition-all cursor-pointer"
            >
              {game.steps[originalIdx]}
            </button>
          ))}
        </div>
      )}

      {/* Building order */}
      {selectedOrder.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-foreground/40 uppercase tracking-widest">Your order</p>
          {selectedOrder.map((originalIdx, position) => {
            const isCorrect = game.correctOrder[position] === originalIdx;
            let cls = "w-full text-left px-4 py-3 rounded-xl border-2 text-sm flex items-start gap-3 ";
            if (!revealed) {
              cls += "border-primary/30 bg-primary/5";
            } else if (isCorrect) {
              cls += "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
            } else {
              cls += "border-amber-400 bg-amber-500/10 text-amber-700 dark:text-amber-400";
            }
            return (
              <div key={`sel-${position}`} className={cls}>
                <span className="shrink-0 font-bold text-foreground/40 w-5 text-right">{position + 1}.</span>
                <span>{game.steps[originalIdx]}</span>
                {revealed && (
                  <span className="ml-auto shrink-0 text-base">{isCorrect ? "✓" : "~"}</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Reveal button */}
      {selectedOrder.length === game.steps.length && !revealed && (
        <button
          onClick={handleReveal}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ background: "linear-gradient(135deg, hsl(160,84%,39%) 0%, hsl(160,84%,30%) 100%)" }}
        >
          Reveal answer
        </button>
      )}

      {/* Explanation */}
      {revealed && (
        <div className="rounded-xl border border-amber-500/25 bg-amber-500/8 p-4 text-sm text-foreground/75 leading-relaxed">
          {game.explanation}
        </div>
      )}
    </div>
  );
}
