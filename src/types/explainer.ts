export type ExplainerCategory =
  | "scenario"
  | "comparison"
  | "diaspora"
  | "worker-wise"
  | "employer";

export interface ExplainerVisual {
  type: "icon" | "illustration" | "chart" | "table" | "flowchart" | "checklist" | "country-card";
  description: string;
  suggestedIcon?: string;
  altText: string;
}

export interface ExplainerSection {
  heading: string;
  body: string;
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
}
