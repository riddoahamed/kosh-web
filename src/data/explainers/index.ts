import { BriefcaseBusiness, Globe2, Scale, UsersRound, Waypoints } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Explainer, ExplainerCategory } from "@/types/explainer";
import { EXPLAINERS } from "./generated";
import { ALL_MODULES } from "@/data/modules";

export { EXPLAINERS };

export interface ExplainerCategoryMeta {
  id: ExplainerCategory;
  label: string;
  shortLabel: string;
  description: string;
  path: string;
  icon: LucideIcon;
}

export const EXPLAINER_CATEGORIES: ExplainerCategoryMeta[] = [
  {
    id: "scenario",
    label: "Scenario Explainers",
    shortLabel: "Scenario",
    description: "Fast guidance for one real money decision.",
    path: "/explainers/scenario",
    icon: Waypoints,
  },
  {
    id: "comparison",
    label: "Comparison Explainers",
    shortLabel: "Comparison",
    description: "Side-by-side clarity on products, tradeoffs, and fit.",
    path: "/explainers/comparison",
    icon: Scale,
  },
  {
    id: "diaspora",
    label: "Diaspora Explainers",
    shortLabel: "Diaspora",
    description: "Money context for Bangladeshis living abroad or sending money home.",
    path: "/explainers/diaspora",
    icon: Globe2,
  },
  {
    id: "worker-wise",
    label: "Worker Wise",
    shortLabel: "Worker Wise",
    description: "Simple Bangla explainers for workers and new earners.",
    path: "/worker-wise",
    icon: UsersRound,
  },
  {
    id: "employer",
    label: "Employer Packs",
    shortLabel: "Employer",
    description: "Ready-to-use workplace financial education packs.",
    path: "/explainers/employer",
    icon: BriefcaseBusiness,
  },
];

export const CALCULATOR_LINKS: Record<string, { title: string; href: string }> = {
  "fdr-calculator": { title: "FDR Calculator", href: "/fdr-calculator" },
  "portfolio-builder": { title: "Portfolio Builder", href: "/portfolio-builder" },
  "emi-calculator": { title: "EMI Calculator", href: "/emi-calculator" },
  "savings-goal": { title: "Goal Planner", href: "/savings-goal" },
  "sip-calculator": { title: "Goal SIP", href: "/sip-calculator" },
  comparator: { title: "Savings Comparator", href: "/comparator" },
  "budget-planner": { title: "Budget Planner", href: "/budget-planner" },
};

export function getExplainerCategoryMeta(category: ExplainerCategory): ExplainerCategoryMeta {
  return EXPLAINER_CATEGORIES.find((item) => item.id === category) ?? EXPLAINER_CATEGORIES[0];
}

export function getExplainersByCategory(category: ExplainerCategory): Explainer[] {
  return EXPLAINERS.filter((explainer) => explainer.category === category);
}

export function getExplainer(category: string | undefined, slug: string | undefined): Explainer | undefined {
  return EXPLAINERS.find((explainer) => explainer.category === category && explainer.slug === slug);
}

export function getRelatedExplainers(current: Explainer, limit = 3): Explainer[] {
  const currentTags = new Set(current.tags);
  return EXPLAINERS
    .filter((explainer) => explainer.id !== current.id)
    .map((explainer) => ({
      explainer,
      score:
        (explainer.category === current.category ? 3 : 0) +
        explainer.tags.reduce((total, tag) => total + (currentTags.has(tag) ? 1 : 0), 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.explainer);
}

export function searchExplainers(query: string, category?: ExplainerCategory): Explainer[] {
  const q = query.trim().toLowerCase();
  const source = category ? getExplainersByCategory(category) : EXPLAINERS;
  if (!q) return source;
  return source.filter((explainer) => {
    const haystack = [
      explainer.title,
      explainer.subtitle,
      explainer.tldr,
      explainer.audience,
      explainer.category,
      ...explainer.tags,
    ].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}

export type UnifiedSearchResult =
  | {
      type: "explainer";
      title: string;
      subtitle: string;
      href: string;
      badge: string;
      meta: string;
    }
  | {
      type: "module";
      title: string;
      subtitle: string;
      href: string;
      badge: string;
      meta: string;
    }
  | {
      type: "calculator";
      title: string;
      subtitle: string;
      href: string;
      badge: string;
      meta: string;
    };

export function searchKoshContent(query: string): UnifiedSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const explainers: UnifiedSearchResult[] = searchExplainers(q).map((explainer) => ({
    type: "explainer",
    title: explainer.title,
    subtitle: explainer.tldr,
    href: `/explainers/${explainer.category}/${explainer.slug}`,
    badge: getExplainerCategoryMeta(explainer.category).shortLabel,
    meta: `${explainer.readingTimeMinutes} min · +${explainer.mangoReward} mangoes`,
  }));

  const modules: UnifiedSearchResult[] = Object.values(ALL_MODULES)
    .filter((module) => `${module.title} ${module.tagline} ${module.zoneId ?? ""}`.toLowerCase().includes(q))
    .slice(0, 6)
    .map((module) => ({
      type: "module",
      title: module.title,
      subtitle: module.tagline,
      href: `/module/${module.id}`,
      badge: "Module",
      meta: `${module.estimatedMinutes} min`,
    }));

  const calculators: UnifiedSearchResult[] = Object.entries(CALCULATOR_LINKS)
    .filter(([, item]) => item.title.toLowerCase().includes(q))
    .map(([id, item]) => ({
      type: "calculator",
      title: item.title,
      subtitle: "Interactive Kosh tool",
      href: item.href,
      badge: "Calculator",
      meta: id.replace(/-/g, " "),
    }));

  return [...explainers, ...modules, ...calculators].slice(0, 12);
}

export function isExplainerCategory(value: string | undefined): value is ExplainerCategory {
  return EXPLAINER_CATEGORIES.some((category) => category.id === value);
}

export const EXPLAINER_PATH_OPTIONS = [
  { label: "Compare safe savings options", category: "comparison" as const, tag: "fdr" },
  { label: "Recover from a money mistake", category: "scenario" as const, tag: "lost" },
  { label: "Live abroad or send money home", category: "diaspora" as const, tag: "remittance" },
  { label: "Simple help for workers", category: "worker-wise" as const, tag: "সঞ্চয়" },
  { label: "Teach a workplace team", category: "employer" as const, tag: "employee" },
  { label: "Start investing carefully", category: "scenario" as const, tag: "invest" },
];

export function resolveModuleTitle(id: string): string {
  return ALL_MODULES[id]?.title ?? id;
}
