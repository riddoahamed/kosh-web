import { useState } from "react";
import type { CalculatorRevealGame as CalculatorRevealGameType } from "@/types/curriculum";

interface Props {
  game: CalculatorRevealGameType;
  onComplete: () => void;
}

function formatBdt(n: number): string {
  if (n >= 10_000_000) return `Tk ${(n / 10_000_000).toFixed(2)} crore`;
  if (n >= 100_000)    return `Tk ${(n / 100_000).toFixed(2)} lakh`;
  return `Tk ${n.toLocaleString("en-IN")}`;
}

export function CalculatorRevealGame({ game, onComplete }: Props) {
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);

  const numInput = parseFloat(input.replace(/,/g, "")) || 0;

  // For isCalculation (FI number): result = input * 12 * 25
  const calculatedResult = game.isCalculation ? numInput * 12 * 25 : null;

  function handleReveal() {
    if (!input.trim()) return;
    setRevealed(true);
    onComplete();
  }

  // Accuracy for standard mode
  let accuracy: "close" | "off" | null = null;
  if (revealed && game.correctAnswer !== null && !game.isReflection && !game.isCalculation) {
    const pct = Math.abs(numInput - game.correctAnswer) / game.correctAnswer;
    accuracy = pct <= 0.1 ? "close" : "off";
  }

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <input
            type="number"
            inputMode="decimal"
            placeholder={game.isCalculation ? "Enter monthly expenses" : `Your guess (${game.unit})`}
            value={input}
            onChange={(e) => !revealed && setInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
            readOnly={revealed}
          />
          {game.unit && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-foreground/30">
              {game.unit}
            </span>
          )}
        </div>
        {!revealed && (
          <button
            onClick={handleReveal}
            disabled={!input.trim()}
            className="px-5 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-40 transition-all"
            style={{ background: "linear-gradient(135deg, hsl(160,84%,39%) 0%, hsl(160,84%,30%) 100%)" }}
          >
            Reveal
          </button>
        )}
      </div>

      {/* Result */}
      {revealed && (
        <div className="space-y-3">
          {/* Standard: show correct answer comparison */}
          {game.correctAnswer !== null && !game.isReflection && !game.isCalculation && (
            <div className={`rounded-xl px-4 py-3 text-sm font-semibold ${
              accuracy === "close"
                ? "bg-green-500/10 border border-green-500/25 text-green-700 dark:text-green-400"
                : "bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-400"
            }`}>
              {accuracy === "close" ? "Close!" : "Not quite —"}{" "}
              The answer is{" "}
              <span className="font-bold">
                {game.correctAnswer}{game.unit}
              </span>
              {game.formula && (
                <span className="ml-1 text-xs font-normal opacity-70">({game.formula})</span>
              )}
            </div>
          )}

          {/* Calculation mode: show computed FI number */}
          {game.isCalculation && calculatedResult !== null && (
            <div className="rounded-xl bg-primary/10 border border-primary/25 px-4 py-3 space-y-1">
              <p className="text-xs text-foreground/40 uppercase tracking-widest">Your FI number</p>
              <p className="text-xl font-bold text-foreground">{formatBdt(calculatedResult)}</p>
              {game.formula && (
                <p className="text-xs text-foreground/40">{game.formula}</p>
              )}
            </div>
          )}

          {/* Reflection mode: just show insight */}
          {game.isReflection && (
            <div className="rounded-xl bg-primary/8 border border-primary/20 px-4 py-3 text-sm text-foreground/70">
              <span className="font-semibold text-foreground">Your number: </span>
              {numInput}{game.unit}
            </div>
          )}

          {/* Always show explanation */}
          <div className="rounded-xl border border-amber-500/25 bg-amber-500/8 p-4 text-sm text-foreground/75 leading-relaxed">
            {game.explanation}
          </div>
        </div>
      )}
    </div>
  );
}
