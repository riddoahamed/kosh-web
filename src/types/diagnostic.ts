export type LevelAssignment = 0 | 1 | 10;

export interface DomainScores {
  knowledge: number;
  behavior: number;
  confidence: number;
  total: number;
}

export interface DiagnosticResponse {
  questionId: string;
  value: number;
  rawValue: number | string;
}

export interface GreyZoneFlagResult {
  flagged: boolean;
  exposures: Array<"crypto" | "forex" | "betting" | "schemes">;
}

export interface DiagnosticResult {
  scores: DomainScores;
  level: LevelAssignment;
  personalityLabel: string;
  greyZone: GreyZoneFlagResult;
  responses: DiagnosticResponse[];
  completedAt: string;
}

export const LEVEL_THRESHOLDS = {
  LOW: 40,
  HIGH: 70,
} as const;

export const PERSONALITY_LABELS: Record<LevelAssignment, string> = {
  0: "Building the foundation",
  1: "Getting oriented",
  10: "Financially grounded",
} as const;

export const PERSONALITY_DESCRIPTIONS: Record<LevelAssignment, string> = {
  0: "Curious — let's build the map",
  1: "Oriented — you know the basics",
  10: "Grounded — you've done the work",
} as const;
