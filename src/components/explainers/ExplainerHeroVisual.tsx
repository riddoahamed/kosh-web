import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  Calendar,
  Check,
  Coins,
  Edit3,
  GitFork,
  Globe2,
  Heart,
  Home,
  List,
  ListChecks,
  Lock,
  Pause,
  PiggyBank,
  Scale,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Explainer } from "@/types/explainer";

const ICONS: Record<string, LucideIcon> = {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  Calendar,
  Check,
  Coins,
  Edit3,
  GitFork,
  Globe2,
  Heart,
  Home,
  List,
  ListChecks,
  Lock,
  Pause,
  PiggyBank,
  Scale,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
};

function IconLookup({ name, className }: { name?: string; className?: string }) {
  const Icon = (name && ICONS[name]) || ListChecks;
  return <Icon className={className} />;
}

export function ExplainerHeroVisual({ explainer }: { explainer: Explainer }) {
  const workerWise = explainer.category === "worker-wise";
  const visual = explainer.visual;

  if (visual.type === "step-cards" && visual.steps && visual.steps.length > 0) {
    return (
      <div
        className={`rounded-2xl border p-4 ${
          workerWise
            ? "border-primary/30 bg-primary/10"
            : "border-primary/20 bg-card"
        }`}
        role="img"
        aria-label={visual.altText}
      >
        <div className="flex gap-3 overflow-x-auto pb-1">
          {visual.steps.map((step, i) => (
            <div
              key={i}
              className="flex w-32 shrink-0 flex-col items-center gap-2 rounded-2xl border border-border bg-background/70 p-4"
            >
              <IconLookup name={step.icon} className="h-9 w-9 text-primary" />
              <p className={`text-center font-semibold leading-tight ${workerWise ? "text-sm" : "text-xs"} text-foreground/80`}>
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border p-5 ${
        workerWise
          ? "border-primary/30 bg-primary/10"
          : "border-primary/20 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.18),transparent_42%),hsl(var(--card))]"
      }`}
      role="img"
      aria-label={visual.altText}
    >
      <div className="flex items-center gap-4">
        <div className={`flex shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground ${workerWise ? "h-16 w-16" : "h-14 w-14"}`}>
          <IconLookup name={visual.suggestedIcon} className={workerWise ? "h-8 w-8" : "h-7 w-7"} />
        </div>
        <div className="min-w-0">
          <p className={`font-bold text-foreground ${workerWise ? "text-xl" : "text-base"}`}>
            {visual.type.replace("-", " ")}
          </p>
          <p className={`mt-1 leading-relaxed text-foreground/65 ${workerWise ? "text-base" : "text-sm"}`}>
            {visual.description}
          </p>
        </div>
      </div>
    </div>
  );
}
