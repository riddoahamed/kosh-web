import { EXPLAINERS } from "@/data/explainers";
import { getExplainerProgress } from "@/lib/explainerProgress";
import type { LucideIcon } from "lucide-react";
import { Compass, Globe2, GraduationCap, Scale, Share2 } from "lucide-react";

export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  threshold: number;
  evaluate: () => number;
}

const PATH_FINDER_USE_KEY = "kosh:pathfinder_uses";

function countReadInCategory(category: string): number {
  return EXPLAINERS.filter((exp) => exp.category === category).filter(
    (exp) => getExplainerProgress(exp.id).read,
  ).length;
}

function countSharedExplainers(): number {
  return EXPLAINERS.filter((exp) => getExplainerProgress(exp.id).shared).length;
}

function countPathFinderUses(): number {
  try {
    const raw = localStorage.getItem(PATH_FINDER_USE_KEY);
    return raw ? (JSON.parse(raw) as string[]).length : 0;
  } catch {
    return 0;
  }
}

export const BADGES: BadgeDefinition[] = [
  {
    id: "decision-maker",
    title: "Decision Maker",
    description: "Read 5 scenario explainers",
    icon: GraduationCap,
    threshold: 5,
    evaluate: () => countReadInCategory("scenario"),
  },
  {
    id: "comparison-king",
    title: "Comparison King",
    description: "Read 4 comparison explainers",
    icon: Scale,
    threshold: 4,
    evaluate: () => countReadInCategory("comparison"),
  },
  {
    id: "global-bengali",
    title: "Global Bengali",
    description: "Read 3 diaspora explainers",
    icon: Globe2,
    threshold: 3,
    evaluate: () => countReadInCategory("diaspora"),
  },
  {
    id: "community-educator",
    title: "Community Educator",
    description: "Share 3 explainers",
    icon: Share2,
    threshold: 3,
    evaluate: countSharedExplainers,
  },
  {
    id: "path-walker",
    title: "Path Walker",
    description: "Use Path Finder 3 times",
    icon: Compass,
    threshold: 3,
    evaluate: countPathFinderUses,
  },
];

export interface BadgeStatus {
  badge: BadgeDefinition;
  progress: number;
  earned: boolean;
}

export function getBadgeStatuses(): BadgeStatus[] {
  return BADGES.map((badge) => {
    const progress = badge.evaluate();
    return { badge, progress, earned: progress >= badge.threshold };
  });
}
