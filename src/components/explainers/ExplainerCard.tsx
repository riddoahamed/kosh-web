import { Link } from "react-router-dom";
import { ArrowRight, Clock3, Search, Sparkles } from "lucide-react";
import type { Explainer } from "@/types/explainer";
import { getExplainerCategoryMeta } from "@/data/explainers";

export function ExplainerCard({ explainer, large = false }: { explainer: Explainer; large?: boolean }) {
  const meta = getExplainerCategoryMeta(explainer.category);
  const Icon = meta.icon;
  const href = `/explainers/${explainer.category}/${explainer.slug}`;

  return (
    <Link
      to={href}
      className={`group block rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm ${
        large ? "space-y-4" : "space-y-3"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-foreground/45">
            <span>{meta.shortLabel}</span>
            <span className="h-1 w-1 rounded-full bg-foreground/25" />
            <span className="inline-flex items-center gap-1 normal-case tracking-normal">
              <Clock3 className="h-3 w-3" />
              {explainer.readingTimeMinutes} min
            </span>
            <span className="inline-flex items-center gap-1 normal-case tracking-normal text-primary">
              <Sparkles className="h-3 w-3" />
              +{explainer.mangoReward}
            </span>
          </div>
          <h3 className={`${large ? "text-lg" : "text-base"} mt-2 font-bold leading-snug text-foreground`}>
            {explainer.title}
          </h3>
        </div>
      </div>

      <p className={`${large ? "text-sm" : "text-xs"} leading-relaxed text-foreground/65`}>
        {explainer.tldr}
      </p>

      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap gap-1.5">
          {explainer.tags.slice(0, large ? 4 : 3).map((tag) => (
            <span key={tag} className="rounded-full border border-border bg-background/50 px-2 py-1 text-[11px] text-foreground/45">
              {tag}
            </span>
          ))}
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-foreground/35 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
    </Link>
  );
}

export function EmptyExplainerState({ query }: { query: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 px-4 py-10 text-center">
      <Search className="mx-auto h-6 w-6 text-foreground/35" />
      <p className="mt-3 text-sm font-semibold text-foreground">No explainers found</p>
      <p className="mt-1 text-xs text-foreground/50">
        Try a simpler word{query ? ` instead of “${query}”` : ""}.
      </p>
    </div>
  );
}
