import { useState } from "react";
import type { AllocationGame as AllocationGameType } from "@/types/curriculum";

interface Props {
  game: AllocationGameType;
  onComplete: () => void;
}

const STEP = 5000;
const TARGET = 100000;

const PROFILE_LABELS: Record<string, string> = {
  conservative: "Conservative",
  moderate: "Moderate",
  growth: "Growth",
};

export function AllocationGame({ game, onComplete }: Props) {
  const [alloc, setAlloc] = useState<Record<string, number>>(
    Object.fromEntries(game.categories.map((c) => [c.id, 0]))
  );
  const [submitted, setSubmitted] = useState(false);

  const total = Object.values(alloc).reduce((a, b) => a + b, 0);
  const remaining = TARGET - total;
  const pct = Math.round((total / TARGET) * 100);

  function adjust(id: string, delta: number) {
    if (submitted) return;
    const newVal = (alloc[id] ?? 0) + delta;
    if (newVal < 0) return;
    if (delta > 0 && total + delta > TARGET) return;
    setAlloc((prev) => ({ ...prev, [id]: newVal }));
  }

  function handleSubmit() {
    setSubmitted(true);
    onComplete();
  }

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-foreground/50">
          <span>Allocated: Tk {total.toLocaleString("en-IN")} ({pct}%)</span>
          <span className={remaining === 0 ? "text-green-500" : "text-foreground/40"}>
            {remaining === 0 ? "Ready to submit ✓" : `Tk ${remaining.toLocaleString("en-IN")} remaining`}
          </span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              pct === 100 ? "bg-green-500" : "bg-primary"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Category tiles */}
      <div className="space-y-2">
        {game.categories.map((cat) => {
          const catPct = Math.round(((alloc[cat.id] ?? 0) / TARGET) * 100);
          return (
            <div
              key={cat.id}
              className="rounded-xl border border-border bg-card p-4 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight">{cat.label}</p>
                  <p className="text-xs text-foreground/45 mt-0.5">{cat.description}</p>
                  <p className="text-xs text-primary/60 mt-0.5">Suggested: {cat.suggestedRange}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-foreground">
                    Tk {(alloc[cat.id] ?? 0).toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-foreground/40">{catPct}%</p>
                </div>
              </div>

              {!submitted && (
                <div className="flex gap-2">
                  <button
                    onClick={() => adjust(cat.id, -STEP)}
                    disabled={(alloc[cat.id] ?? 0) === 0}
                    className="flex-1 py-1.5 rounded-lg border border-border text-sm font-semibold text-foreground/60 hover:bg-muted disabled:opacity-30 transition-all"
                  >
                    − Tk 5k
                  </button>
                  <button
                    onClick={() => adjust(cat.id, STEP)}
                    disabled={remaining < STEP}
                    className="flex-1 py-1.5 rounded-lg border border-primary/30 text-sm font-semibold text-primary hover:bg-primary/8 disabled:opacity-30 transition-all"
                  >
                    + Tk 5k
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={remaining !== 0}
          className="w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-40 transition-all"
          style={{ background: "linear-gradient(135deg, hsl(87,95%,62%) 0%, hsl(175,100%,42%) 100%)", color: "hsl(235,60%,8%)" }}
        >
          Submit my allocation
        </button>
      )}

      {/* Comparison reveal */}
      {submitted && (
        <div className="space-y-3">
          <p className="text-xs text-foreground/40 uppercase tracking-widest">Compare to example profiles</p>
          {Object.entries(game.revealAllocation).map(([profileKey, profileAlloc]) => (
            <div key={profileKey} className="rounded-xl border border-border bg-card/50 p-3 space-y-2">
              <p className="text-sm font-semibold text-foreground">{PROFILE_LABELS[profileKey] ?? profileKey}</p>
              <div className="space-y-1">
                {game.categories.map((cat) => {
                  const pAllocPct = profileAlloc[cat.id] ?? 0;
                  const myPct = Math.round(((alloc[cat.id] ?? 0) / TARGET) * 100);
                  return (
                    <div key={cat.id} className="flex items-center gap-2 text-xs">
                      <span className="text-foreground/50 w-28 shrink-0 truncate">{cat.label}</span>
                      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/50 rounded-full transition-all"
                          style={{ width: `${pAllocPct}%` }}
                        />
                      </div>
                      <span className="text-foreground/40 w-8 text-right">{pAllocPct}%</span>
                      <span className={`w-8 text-right font-medium ${
                        myPct === pAllocPct ? "text-green-500" :
                        Math.abs(myPct - pAllocPct) <= 10 ? "text-amber-500" : "text-foreground/30"
                      }`}>
                        {myPct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="rounded-xl border border-amber-500/25 bg-amber-500/8 p-4 text-sm text-foreground/75 leading-relaxed">
            {game.explanation}
          </div>
        </div>
      )}
    </div>
  );
}
