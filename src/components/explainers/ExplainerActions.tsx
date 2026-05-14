import { useEffect, useState } from "react";
import { Check, Copy, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import type { Explainer } from "@/types/explainer";
import { getExplainerProgress, markExplainerAction } from "@/lib/explainerProgress";
import { usePointsStore } from "@/store/pointsStore";

interface ExplainerActionsProps {
  explainer: Explainer;
}

function actionMessage(points: number) {
  return points > 0 ? `+${points} mangoes` : "Saved";
}

export function ExplainerActions({ explainer }: ExplainerActionsProps) {
  const { addPoints } = usePointsStore();
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [rated, setRated] = useState<"helpful" | "not_helpful" | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const progress = getExplainerProgress(explainer.id);
    setSaved(progress.saved === true);
    setShared(progress.shared === true);
    setRated(progress.rating ?? null);
  }, [explainer.id]);

  function award(action: "save" | "share" | "rate", points: number, rating?: "helpful" | "not_helpful") {
    const { firstTime, record } = markExplainerAction(explainer.id, action, rating);
    if (firstTime) {
      addPoints(points, `Explainer ${action}: ${explainer.title}`);
      setNotice(actionMessage(points));
    } else {
      setNotice("Already counted");
    }
    setSaved(record.saved === true);
    setShared(record.shared === true);
    setRated(record.rating ?? null);
    setTimeout(() => setNotice(null), 2200);
  }

  async function handleShare() {
    const url = `${window.location.origin}/explainers/${explainer.category}/${explainer.slug}`;
    const text = `${explainer.title} — Kosh Explainers`;
    if (navigator.share) {
      await navigator.share({ title: explainer.title, text, url }).catch(() => {});
    } else {
      await navigator.clipboard?.writeText(url).catch(() => {});
    }
    award("share", 5);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">Save this explainer</p>
        {notice && <span className="text-xs font-semibold text-primary">{notice}</span>}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => award("save", 5)}
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-3 text-sm font-semibold text-foreground/75 transition-colors hover:border-primary/40 hover:text-foreground"
        >
          {saved ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
          {saved ? "Saved" : "Save"}
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-3 text-sm font-semibold text-foreground/75 transition-colors hover:border-primary/40 hover:text-foreground"
        >
          {shared ? <Check className="h-4 w-4 text-primary" /> : <Share2 className="h-4 w-4" />}
          Share
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-border pt-3">
        <button
          type="button"
          onClick={() => award("rate", 3, "helpful")}
          className={`flex min-h-10 items-center justify-center gap-2 rounded-xl border px-3 text-xs font-semibold transition-colors ${
            rated === "helpful"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background/60 text-foreground/70 hover:border-primary/40"
          }`}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          Helpful
        </button>
        <button
          type="button"
          onClick={() => award("rate", 3, "not_helpful")}
          className={`flex min-h-10 items-center justify-center gap-2 rounded-xl border px-3 text-xs font-semibold transition-colors ${
            rated === "not_helpful"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background/60 text-foreground/70 hover:border-primary/40"
          }`}
        >
          <ThumbsDown className="h-3.5 w-3.5" />
          Not enough
        </button>
      </div>
    </div>
  );
}
