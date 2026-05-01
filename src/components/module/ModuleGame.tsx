import { useState } from "react";
import type { ModuleGame as ModuleGameType } from "@/types/curriculum";
import { ScenarioVerdictGame } from "./games/ScenarioVerdictGame";
import { AllocationGame } from "./games/AllocationGame";
import { OrderStepsGame } from "./games/OrderStepsGame";
import { CalculatorRevealGame } from "./games/CalculatorRevealGame";

interface Props {
  game: ModuleGameType;
  onComplete: (mangoReward: number) => void;
}

export function ModuleGame({ game, onComplete }: Props) {
  const [completed, setCompleted] = useState(false);

  function handleComplete() {
    if (completed) return;
    setCompleted(true);
    onComplete(game.mangoReward);
  }

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-primary/60 uppercase tracking-widest">
          Interactive Challenge
        </span>
        <span className="text-xs text-muted-foreground">
          +{game.mangoReward} 🥭
        </span>
      </div>

      <h3 className="font-semibold text-foreground text-base leading-snug">{game.title}</h3>
      <p className="text-sm text-foreground/65 leading-relaxed">{game.instructions}</p>

      {game.type === "scenario_verdict" && (
        <ScenarioVerdictGame game={game} onComplete={handleComplete} />
      )}
      {game.type === "allocation" && (
        <AllocationGame game={game} onComplete={handleComplete} />
      )}
      {game.type === "order_steps" && (
        <OrderStepsGame game={game} onComplete={handleComplete} />
      )}
      {game.type === "calculator_reveal" && (
        <CalculatorRevealGame game={game} onComplete={handleComplete} />
      )}

      {completed && (
        <div className="rounded-xl bg-green-500/10 border border-green-500/25 px-4 py-3 text-sm font-medium text-green-700 dark:text-green-400">
          ✓ +{game.mangoReward} 🥭 mangoes earned
        </div>
      )}
    </div>
  );
}
