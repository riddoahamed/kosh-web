import {
  AlertTriangle,
  BriefcaseBusiness,
  Calculator,
  Globe2,
  ListChecks,
  Lock,
  PiggyBank,
  Scale,
  Smartphone,
  TrendingDown,
  Users,
} from "lucide-react";
import type { Explainer } from "@/types/explainer";

const ICONS = {
  AlertTriangle,
  BriefcaseBusiness,
  Calculator,
  Globe2,
  ListChecks,
  Lock,
  PiggyBank,
  Scale,
  Smartphone,
  TrendingDown,
  Users,
};

export function ExplainerHeroVisual({ explainer }: { explainer: Explainer }) {
  const Icon = ICONS[explainer.visual.suggestedIcon as keyof typeof ICONS] ?? ListChecks;
  const workerWise = explainer.category === "worker-wise";

  return (
    <div
      className={`rounded-2xl border p-5 ${
        workerWise
          ? "border-primary/30 bg-primary/10"
          : "border-primary/20 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.18),transparent_42%),hsl(var(--card))]"
      }`}
      role="img"
      aria-label={explainer.visual.altText}
    >
      <div className="flex items-center gap-4">
        <div className={`flex shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground ${workerWise ? "h-16 w-16" : "h-14 w-14"}`}>
          <Icon className={workerWise ? "h-8 w-8" : "h-7 w-7"} />
        </div>
        <div className="min-w-0">
          <p className={`font-bold text-foreground ${workerWise ? "text-xl" : "text-base"}`}>
            {explainer.visual.type.replace("-", " ")}
          </p>
          <p className={`mt-1 leading-relaxed text-foreground/65 ${workerWise ? "text-base" : "text-sm"}`}>
            {explainer.visual.description}
          </p>
        </div>
      </div>
    </div>
  );
}
