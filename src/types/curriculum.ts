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
  // Legacy format: 5 frequency labels (existing modules)
  frequencyLabels?: [string, string, string, string, string];
  // MCQ format: options + correctIndex (age-group diagnostic questions)
  options?: string[];
  correctIndex?: number;
  explanation?: string;
}

export interface ConfidenceQuestion {
  id: string;
  type: "confidence";
  domain: "confidence";
  text: string;
  // Legacy format: 5 likert labels (existing modules)
  likertLabels?: [string, string, string, string, string];
  // MCQ format: options + correctIndex (age-group diagnostic questions)
  options?: string[];
  correctIndex?: number;
  explanation?: string;
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

export type QuizQuestionType =
  | "multiple_choice"
  | "fill_blank"
  | "scenario_decision"
  | "match_pairs";

export interface MultipleChoiceQuestion {
  type?: "multiple_choice";
  id?: string;
  text?: string;        // legacy field name
  question?: string;    // new field name
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FillBlankQuestion {
  type: "fill_blank";
  id?: string;
  question: string;             // use ___ to indicate blank
  acceptedAnswers: string[];    // case-insensitive match
  hint?: string;
  explanation: string;
  unit?: string;                // e.g. "%" or "Tk"
}

export interface ScenarioDecisionQuestion {
  type: "scenario_decision";
  id?: string;
  scenario: string;             // styled callout setting up the situation
  question: string;
  options: string[];
  correctIndex: number;
  optionExplanations: string[]; // explanation for each option
  explanation?: string;
}

export interface MatchPairsQuestion {
  type: "match_pairs";
  id?: string;
  question: string;
  leftItems: string[];
  rightItems: string[];
  correctMapping: number[];     // correctMapping[i] = index in rightItems matching leftItems[i]
  explanation: string;
}

export type ModuleQuizQuestion =
  | MultipleChoiceQuestion
  | FillBlankQuestion
  | ScenarioDecisionQuestion
  | MatchPairsQuestion;

export interface InlineCheck {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ActionNudge {
  text: string;
  ctaText: string;
  estimatedTime?: string;
  category: "research" | "setup" | "small_action" | "review";
}

export interface Module {
  id: string;
  zoneId?: string;
  title: string;
  tagline: string;
  estimatedMinutes: number;
  isGreyZoneOnly?: boolean;
  hook: string;
  context: string;
  rateNote?: string;
  teaching: string;
  inlineChecks?: InlineCheck[];
  actionNudge?: ActionNudge;
  bdExample?: string;
  actionPrompt: {
    text: string;
    cta?: string;           // legacy field name
    ctaButtonText?: string; // new field name
  };
  game?: ModuleGame;
  quiz: ModuleQuizQuestion[];
  whatsNext: {
    moduleId?: string;           // legacy field name
    nextModuleId?: string | null; // new field name
    preview: string;
  };
}

// ── Mini-game types ──────────────────────────────────────────────────────────

export type GameType =
  | "scenario_verdict"
  | "allocation"
  | "order_steps"
  | "calculator_reveal";

export interface ScenarioVerdictGame {
  type: "scenario_verdict";
  title: string;
  instructions: string;
  items: Array<{
    scenario: string;
    correct: string;
    explanation: string;
  }>;
  mangoReward: number;
}

export interface AllocationGame {
  type: "allocation";
  title: string;
  instructions: string;
  categories: Array<{
    id: string;
    label: string;
    description: string;
    suggestedRange: string;
  }>;
  revealAllocation: Record<string, Record<string, number>>;
  explanation: string;
  mangoReward: number;
}

export interface OrderStepsGame {
  type: "order_steps";
  title: string;
  instructions: string;
  steps: string[];
  correctOrder: number[];
  explanation: string;
  mangoReward: number;
}

export interface CalculatorRevealGame {
  type: "calculator_reveal";
  title: string;
  instructions: string;
  correctAnswer: number | null;
  unit: string;
  formula?: string;
  isReflection?: boolean;
  isCalculation?: boolean;
  explanation: string;
  mangoReward: number;
}

export type ModuleGame =
  | ScenarioVerdictGame
  | AllocationGame
  | OrderStepsGame
  | CalculatorRevealGame;

// ─────────────────────────────────────────────────────────────────────────────

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
