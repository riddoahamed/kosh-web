export type QuestionType = "knowledge" | "behavior" | "confidence";

export interface KnowledgeQuestion {
  id: string;
  type: "knowledge";
  domain: "knowledge";
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BehaviorQuestion {
  id: string;
  type: "behavior";
  domain: "behavior";
  text: string;
  frequencyLabels: [string, string, string, string, string];
}

export interface ConfidenceQuestion {
  id: string;
  type: "confidence";
  domain: "confidence";
  text: string;
  likertLabels: [string, string, string, string, string];
}

export type DiagnosticQuestion =
  | KnowledgeQuestion
  | BehaviorQuestion
  | ConfidenceQuestion;

export interface GreyZoneOption {
  value: "crypto" | "forex" | "betting" | "schemes" | "none";
  label: string;
}

export interface GreyZoneQuestion {
  id: "grey-zone-branch";
  text: string;
  options: GreyZoneOption[];
}

export interface ModuleQuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  tagline: string;
  estimatedMinutes: number;
  isGreyZoneOnly?: boolean;
  hook: string;
  context: string;
  teaching: string;
  bdExample: string;
  actionPrompt: {
    text: string;
    cta: string;
  };
  quiz: ModuleQuizQuestion[];
  whatsNext: {
    moduleId: string;
    preview: string;
  };
}

export type ScenarioVerdict = "scam" | "real" | "risky";

export interface Scenario {
  id: string;
  category: "scam" | "grey-zone";
  title: string;
  text: string;
  verdict: ScenarioVerdict;
  explanation: string;
  redFlags?: string[];
}
