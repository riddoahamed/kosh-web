import { useState } from "react";
import type { ActionNudge as ActionNudgeType } from "@/types/curriculum";
import { useProgressStore } from "@/store/progressStore";

const NUDGE_MANGO_BONUS = 15;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

interface ActionNudgeProps {
  nudge: ActionNudgeType;
  moduleId: string;
  onBonus: (amount: number, reason: string) => void;
}

type FollowUpAnswer = "yes" | "not_yet" | "skipped";

export function ActionNudge({ nudge, moduleId, onBonus }: ActionNudgeProps) {
  const { getNudgeRecord, commitNudge, completeNudge, skipNudge, markNudgeFollowUpShown } =
    useProgressStore();

  const record = getNudgeRecord(moduleId);

  const [confirmed, setConfirmed] = useState(record.committed);
  const [followUpDismissed, setFollowUpDismissed] = useState(false);
  const [followUpAnswer, setFollowUpAnswer] = useState<FollowUpAnswer | null>(null);

  // Snapshot mount time once — avoids re-evaluating Date.now() on every render
  const [mountTime] = useState(() => Date.now());
  const followUpDue =
    record.committed &&
    !record.followUpShown &&
    !!record.committedAt &&
    mountTime - new Date(record.committedAt).getTime() >= SEVEN_DAYS_MS;
  const showFollowUp = followUpDue && !followUpDismissed && followUpAnswer === null;

  function handleCommit() {
    setConfirmed(true);
    commitNudge(moduleId);
    onBonus(NUDGE_MANGO_BONUS, `Nudge committed: Module ${moduleId} 👉`);
  }

  function handleFollowUp(answer: FollowUpAnswer) {
    setFollowUpAnswer(answer);
    setFollowUpDismissed(true);
    if (answer === "yes") {
      completeNudge(moduleId);
      onBonus(NUDGE_MANGO_BONUS, `Nudge completed: Module ${moduleId} ✅`);
    } else {
      markNudgeFollowUpShown(moduleId);
    }
  }

  function handleSkip() {
    skipNudge(moduleId);
  }

  const categoryLabel: Record<ActionNudgeType["category"], string> = {
    research: "Research task",
    setup: "Setup task",
    small_action: "Small action",
    review: "Review task",
  };

  // Follow-up dialog
  if (showFollowUp) {
    return (
      <div className="rounded-2xl border border-teal-500/30 bg-teal-500/8 p-5 space-y-3">
        <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
          7-day check-in 📋
        </p>
        <p className="text-sm font-medium text-foreground/85 leading-relaxed">
          A week ago you committed to: <span className="italic">"{nudge.ctaText}"</span>
        </p>
        <p className="text-sm text-foreground/70">Did you actually do it?</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => handleFollowUp("yes")}
            className="flex-1 rounded-xl border border-emerald-500/40 bg-emerald-500/10 py-2.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors"
          >
            Yes, I did it ✓
          </button>
          <button
            onClick={() => handleFollowUp("not_yet")}
            className="flex-1 rounded-xl border border-border bg-background/50 py-2.5 text-sm font-semibold text-foreground/60 hover:bg-background/80 transition-colors"
          >
            Not yet
          </button>
          <button
            onClick={() => handleFollowUp("skipped")}
            className="flex-1 rounded-xl border border-border bg-background/50 py-2.5 text-sm font-semibold text-foreground/40 hover:bg-background/80 transition-colors"
          >
            Skipped it
          </button>
        </div>
      </div>
    );
  }

  // Follow-up completed confirmation
  if (followUpAnswer === "yes") {
    return (
      <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/8 p-4 flex gap-3 items-start">
        <span className="text-lg">✅</span>
        <div>
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            Nicely done — +{NUDGE_MANGO_BONUS} 🥭
          </p>
          <p className="text-xs text-foreground/60 mt-0.5 leading-relaxed">
            Real-world action is the hardest part of financial learning.
          </p>
        </div>
      </div>
    );
  }

  // Committed state
  if (confirmed) {
    return (
      <div className="rounded-2xl border border-teal-500/25 bg-teal-500/8 p-4 flex gap-3 items-start">
        <span className="text-lg">👉</span>
        <div>
          <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">
            Committed — +{NUDGE_MANGO_BONUS} 🥭 earned
          </p>
          <p className="text-xs text-foreground/60 mt-0.5 leading-relaxed">
            We'll check back in 7 days to see if you followed through.
          </p>
        </div>
      </div>
    );
  }

  // Default nudge card
  return (
    <div className="rounded-2xl border border-teal-500/25 bg-gradient-to-br from-teal-500/8 to-lime-500/5 p-5 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
          Try this in real life 👉
        </p>
        <span className="text-xs text-foreground/40 shrink-0">{categoryLabel[nudge.category]}</span>
      </div>

      <p className="text-sm text-foreground/85 leading-relaxed">{nudge.text}</p>

      {nudge.estimatedTime && (
        <p className="text-xs text-foreground/45">⏱ {nudge.estimatedTime}</p>
      )}

      <div className="flex gap-2 pt-1">
        <button
          onClick={handleCommit}
          className="flex-1 bg-teal-600 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-teal-700 transition-colors active:scale-95"
        >
          {nudge.ctaText}
        </button>
        <button
          onClick={handleSkip}
          className="rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm text-foreground/50 hover:text-foreground/70 transition-colors"
        >
          Later
        </button>
      </div>
    </div>
  );
}
