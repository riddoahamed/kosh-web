import type { DiagnosticResponse } from "@/types/diagnostic";
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
  knowledgeQuestions: KnowledgeQuestion[]
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
