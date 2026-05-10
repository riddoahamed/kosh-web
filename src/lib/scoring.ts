import type { DiagnosticResponse, AgeGroup } from "@/types/diagnostic";
import type { KnowledgeQuestion } from "@/types/curriculum";
import {
  LEVEL_THRESHOLDS,
  PERSONALITY_LABELS,
  type DiagnosticResult,
  type DomainScores,
  type GreyZoneFlagResult,
  type LevelAssignment,
} from "@/types/diagnostic";

export function scoreKnowledge(
  responses: DiagnosticResponse[],
  questions: KnowledgeQuestion[]
): number {
  const knowledgeResponses = responses.filter((r) =>
    questions.some((q) => q.id === r.questionId)
  );
  if (knowledgeResponses.length === 0) return 0;
  const total = knowledgeResponses.reduce((sum, r) => sum + r.value, 0);
  return total / knowledgeResponses.length;
}

export function scoreBehavior(responses: DiagnosticResponse[]): number {
  const behaviorResponses = responses.filter((r) =>
    r.questionId.startsWith("b")
  );
  if (behaviorResponses.length === 0) return 0;
  const total = behaviorResponses.reduce((sum, r) => sum + r.value, 0);
  return total / behaviorResponses.length;
}

export function scoreConfidence(responses: DiagnosticResponse[]): number {
  const confidenceResponses = responses.filter((r) =>
    r.questionId.startsWith("c")
  );
  if (confidenceResponses.length === 0) return 0;
  const total = confidenceResponses.reduce((sum, r) => sum + r.value, 0);
  return total / confidenceResponses.length;
}

export function computeDomainScores(
  responses: DiagnosticResponse[],
  knowledgeQuestions: KnowledgeQuestion[]
): DomainScores {
  const knowledge = scoreKnowledge(responses, knowledgeQuestions);
  const behavior = scoreBehavior(responses);
  const confidence = scoreConfidence(responses);
  const total = (knowledge + behavior + confidence) / 3;
  return {
    knowledge: Math.round(knowledge),
    behavior: Math.round(behavior),
    confidence: Math.round(confidence),
    total: Math.round(total),
  };
}

export function assignLevel(total: number): LevelAssignment {
  if (total < LEVEL_THRESHOLDS.LOW) return 0;
  if (total < LEVEL_THRESHOLDS.HIGH) return 1;
  return 10;
}

export function assignPersonalityLabel(level: LevelAssignment): string {
  return PERSONALITY_LABELS[level];
}

export function detectGreyZone(selections: string[]): GreyZoneFlagResult {
  const nonNone = selections.filter((s) => s !== "none") as Array<
    "crypto" | "forex" | "betting" | "schemes"
  >;
  return {
    flagged: nonNone.length > 0,
    exposures: nonNone,
  };
}

export function getStrongestDomain(scores: DomainScores): string {
  const { knowledge, behavior, confidence } = scores;
  if (knowledge >= behavior && knowledge >= confidence) return "Knowledge";
  if (behavior >= knowledge && behavior >= confidence) return "Behavior";
  return "Confidence";
}

export function getWeakestDomain(scores: DomainScores): string {
  const { knowledge, behavior, confidence } = scores;
  if (knowledge <= behavior && knowledge <= confidence) return "Knowledge";
  if (behavior <= knowledge && behavior <= confidence) return "Behavior";
  return "Confidence";
}

export function buildDiagnosticResult(
  responses: DiagnosticResponse[],
  greyZoneSelections: string[],
  knowledgeQuestions: KnowledgeQuestion[],
  ageGroup?: AgeGroup
): DiagnosticResult {
  const scores = computeDomainScores(responses, knowledgeQuestions);
  const level = assignLevel(scores.total);
  return {
    scores,
    level,
    personalityLabel: assignPersonalityLabel(level),
    greyZone: detectGreyZone(greyZoneSelections),
    responses,
    completedAt: new Date().toISOString(),
    ageGroup,
  };
}

export interface RecommendedPath {
  startModuleId: string;
  headline: string;
  detail: string;
}

export function getRecommendedPath(total: number, ageGroup?: AgeGroup): RecommendedPath {
  if (ageGroup === "over_35") {
    if (total >= 60) return {
      startModuleId: "z8-1",
      headline: "Jump to advanced planning",
      detail: "Your score suggests you've covered the basics. Zones 8–9 (advanced investing, real estate, retirement) are the highest-leverage content for where you are.",
    };
    return {
      startModuleId: "4",
      headline: "Start with Scam Spotter & Zone 5",
      detail: "Module 4 (financial scams) and Zone 5 (savings products deep-dive) are especially valuable for experienced earners who want to stress-test current habits.",
    };
  }

  if (ageGroup === "25_to_35") {
    if (total >= 70) return {
      startModuleId: "5",
      headline: "Skip the basics — start at Module 5",
      detail: "Your knowledge score suggests you understand fundamentals. Start at Module 5 (emergency fund) or Module 6 (Bangladesh savings products) for maximum value.",
    };
    return {
      startModuleId: "1",
      headline: "Build from the foundation",
      detail: "Modules 1–4 will clarify the map. After that, Zone 8 (advanced investing) is highlighted for your life stage.",
    };
  }

  // under_25 or unknown
  return {
    startModuleId: "1",
    headline: "Start at the beginning",
    detail: "Modules 1–8 are your 0→1 track. Each takes about 10 minutes. Work through Zone 1 first, then explore Zones 6–7 when you're ready for more depth.",
  };
}

export function normalizeLikert(value: number): number {
  return Math.round(((value - 1) / 4) * 100);
}

export const BEHAVIOR_SCORE_MAP: Record<string, number> = {
  never: 0,
  rarely: 25,
  sometimes: 50,
  often: 75,
  always: 100,
};
