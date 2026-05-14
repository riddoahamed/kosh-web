import { db } from "@/lib/supabase";

const PROGRESS_KEY = "kosh:explainer_progress";

export type ExplainerAction = "read" | "save" | "share" | "rate";

export interface ExplainerProgressRecord {
  read?: boolean;
  saved?: boolean;
  shared?: boolean;
  rated?: boolean;
  rating?: "helpful" | "not_helpful";
}

function readAll(): Record<string, ExplainerProgressRecord> {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? "{}") as Record<string, ExplainerProgressRecord>;
  } catch {
    return {};
  }
}

function writeAll(records: Record<string, ExplainerProgressRecord>) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(records));
  db.syncToActiveAccount();
}

export function getExplainerProgress(id: string): ExplainerProgressRecord {
  return readAll()[id] ?? {};
}

export function markExplainerAction(
  id: string,
  action: ExplainerAction,
  rating?: "helpful" | "not_helpful",
): { firstTime: boolean; record: ExplainerProgressRecord } {
  const records = readAll();
  const current = records[id] ?? {};
  const field = action === "rate" ? "rated" : action === "read" ? "read" : action === "save" ? "saved" : "shared";
  const firstTime = current[field] !== true;
  const next: ExplainerProgressRecord = { ...current, [field]: true };
  if (rating) next.rating = rating;
  records[id] = next;
  writeAll(records);
  db.trackToolUsage(`explainer:${action}:${id}`);
  return { firstTime, record: next };
}
