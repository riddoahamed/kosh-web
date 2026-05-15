export type ExplainerCategory =
  | "scenario"
  | "comparison"
  | "diaspora"
  | "worker-wise"
  | "employer";

export interface ExplainerStep {
  icon: string;
  label: string;
}

export interface ExplainerVisual {
  type:
    | "icon"
    | "illustration"
    | "chart"
    | "table"
    | "flowchart"
    | "checklist"
    | "country-card"
    | "step-cards";
  description: string;
  suggestedIcon?: string;
  altText: string;
  steps?: ExplainerStep[];
}

export interface ExplainerSection {
  heading: string;
  body: string;
}

export interface ExternalLink {
  title: string;
  href: string;
  description?: string;
  type: "official" | "tool" | "deeper-reading";
}

export interface Explainer {
  id: string;
  slug: string;
  category: ExplainerCategory;
  title: string;
  subtitle: string;
  tldr: string;
  audience: string;
  readingTimeMinutes: number;
  language: "en" | "bn";
  difficulty: "easy" | "medium";
  tags: string[];
  mangoReward: number;
  lastUpdated: string;
  visual: ExplainerVisual;
  sections: ExplainerSection[];
  actionStep: string;
  relatedModules: string[];
  relatedCalculators: string[];
  sourceNotes?: string[];
  siblingExplainerSlug?: string;
  externalLinks?: ExternalLink[];
}
