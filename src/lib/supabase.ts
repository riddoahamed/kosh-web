import { createClient } from "@supabase/supabase-js";
import type { DiagnosticResult } from "@/types/diagnostic";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

// If env vars are missing the app runs in localStorage-only mode
const supabaseReady = !!supabaseUrl && !!supabaseKey;
export const supabase = supabaseReady
  ? createClient(supabaseUrl!, supabaseKey!)
  : null;

const KEYS = {
  DIAGNOSTIC: "kosh:diagnostic_result",
  PROFILE: "kosh:profile",
  MODULE_PROGRESS: "kosh:module_progress",
} as const;

export interface KoshProfile {
  id: string;
  name: string;
  phone: string;
  gender: string;
  location: string;
  consent_given: boolean;
  referral_code?: string;
  referred_by?: string;
  level_assigned?: number;
  grey_zone_flagged?: boolean;
  grey_zone_exposure?: string[];
  created_at: string;
}

export interface ModuleProgressRecord {
  moduleId: string;
  status: "not_started" | "in_progress" | "completed";
  startedAt?: string;
  completedAt?: string;
  timeSpentSeconds: number;
  quizScore: number;
  quizResponses: Record<string, number>;
  actionCompleted: boolean;
}

function getProfileId(): string | null {
  try {
    const raw = localStorage.getItem(KEYS.PROFILE);
    if (!raw) return null;
    return (JSON.parse(raw) as KoshProfile).id ?? null;
  } catch {
    return null;
  }
}

// localStorage is the synchronous source of truth.
// Supabase calls are fire-and-forget — the app works offline,
// data syncs to the database in the background.
export const db = {
  saveDiagnosticResult(result: DiagnosticResult): void {
    localStorage.setItem(KEYS.DIAGNOSTIC, JSON.stringify(result));
    const profileId = getProfileId();
    if (!profileId || !supabase) return;
    supabase
      .from("diagnostic_sessions")
      .upsert({
        profile_id: profileId,
        scores: result.scores,
        level: result.level,
        personality_label: result.personalityLabel,
        grey_zone: result.greyZone,
        responses: result.responses,
        completed_at: result.completedAt,
      })
      .then(() => {});
  },

  getDiagnosticResult(): DiagnosticResult | null {
    const raw = localStorage.getItem(KEYS.DIAGNOSTIC);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as DiagnosticResult;
    } catch {
      return null;
    }
  },

  saveProfile(profile: KoshProfile): void {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    if (!supabase) return;
    supabase
      .from("profiles")
      .upsert({
        id: profile.id,
        name: profile.name,
        phone: profile.phone,
        gender: profile.gender,
        location: profile.location,
        consent_given: profile.consent_given,
        referral_code: profile.referral_code ?? null,
        level_assigned: profile.level_assigned ?? null,
        grey_zone_flagged: profile.grey_zone_flagged ?? false,
        grey_zone_exposure: profile.grey_zone_exposure ?? [],
        created_at: profile.created_at,
      })
      .then(() => {});
  },

  getProfile(): KoshProfile | null {
    const raw = localStorage.getItem(KEYS.PROFILE);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as KoshProfile;
    } catch {
      return null;
    }
  },

  saveModuleProgress(record: ModuleProgressRecord): void {
    const all = this.getAllProgress();
    all[record.moduleId] = record;
    localStorage.setItem(KEYS.MODULE_PROGRESS, JSON.stringify(all));
    const profileId = getProfileId();
    if (!profileId || !supabase) return;
    supabase
      .from("user_module_progress")
      .upsert({
        profile_id: profileId,
        module_id: record.moduleId,
        status: record.status,
        started_at: record.startedAt ?? null,
        completed_at: record.completedAt ?? null,
        time_spent_seconds: record.timeSpentSeconds,
        quiz_score: record.quizScore,
        quiz_responses: record.quizResponses,
        action_completed: record.actionCompleted,
      })
      .then(() => {});
  },

  getModuleProgress(moduleId: string): ModuleProgressRecord | null {
    const all = this.getAllProgress();
    return all[moduleId] ?? null;
  },

  getAllProgress(): Record<string, ModuleProgressRecord> {
    const raw = localStorage.getItem(KEYS.MODULE_PROGRESS);
    if (!raw) return {};
    try {
      return JSON.parse(raw) as Record<string, ModuleProgressRecord>;
    } catch {
      return {};
    }
  },

  clearAll(): void {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  },
};
