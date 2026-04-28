import { createClient } from "@supabase/supabase-js";
import type { DiagnosticResult } from "@/types/diagnostic";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

// App runs in localStorage-only mode if env vars are missing
const supabaseReady = !!supabaseUrl && !!supabaseKey;

export const supabase = supabaseReady
  ? createClient(supabaseUrl!, supabaseKey!)
  : null;

// ── Auth helpers ──────────────────────────────────────────────────────────

export const auth = {
  async sendOtp(email: string) {
    if (!supabase) throw new Error("Supabase not configured");
    return supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
  },

  async verifyOtp(email: string, token: string) {
    if (!supabase) throw new Error("Supabase not configured");
    return supabase.auth.verifyOtp({ email, token, type: "email" });
  },

  async getSession() {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  async getUser() {
    if (!supabase) return null;
    const { data } = await supabase.auth.getUser();
    return data.user;
  },

  async signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  },

  onAuthStateChange(
    callback: (event: string, session: import("@supabase/supabase-js").Session | null) => void
  ) {
    if (!supabase) return { data: { subscription: { unsubscribe: () => {} } } };
    return supabase.auth.onAuthStateChange(callback);
  },
};

// ── Local storage keys ────────────────────────────────────────────────────

const KEYS = {
  DIAGNOSTIC: "kosh:diagnostic_result",
  PROFILE: "kosh:profile",
  MODULE_PROGRESS: "kosh:module_progress",
} as const;

// ── Types ─────────────────────────────────────────────────────────────────

export interface KoshProfile {
  id: string;          // = Supabase auth user id
  email?: string;
  name: string;
  age?: number;
  phone?: string;
  gender?: string;
  location?: string;
  consent_given: boolean;
  referral_code?: string;
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

// Get authed user id for Supabase writes (async, non-blocking)
async function getAuthUserId(): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

// ── DB ─────────────────────────────────────────────────────────────────────
// localStorage = synchronous source of truth (app works offline)
// Supabase writes = fire-and-forget background sync

export const db = {

  // ── Diagnostic ─────────────────────────────────────────────────────────
  saveDiagnosticResult(result: DiagnosticResult): void {
    localStorage.setItem(KEYS.DIAGNOSTIC, JSON.stringify(result));
    if (!supabase) return;
    getAuthUserId().then((userId) => {
      if (!userId) return;
      supabase!
        .from("diagnostic_results")
        .upsert({
          user_id: userId,
          scores: result.scores,
          level: result.level,
          personality_label: result.personalityLabel,
          grey_zone: result.greyZone?.flagged ?? false,
          grey_zone_exposures: result.greyZone?.exposures ?? [],
          responses: result.responses,
          completed_at: result.completedAt,
        })
        .then(() => {});
    });
  },

  getDiagnosticResult(): DiagnosticResult | null {
    const raw = localStorage.getItem(KEYS.DIAGNOSTIC);
    if (!raw) return null;
    try { return JSON.parse(raw) as DiagnosticResult; } catch { return null; }
  },

  // ── Profile ────────────────────────────────────────────────────────────
  saveProfile(profile: KoshProfile): void {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    if (!supabase) return;
    supabase
      .from("profiles")
      .upsert({
        id: profile.id,
        email: profile.email ?? null,
        name: profile.name,
        age: profile.age ?? null,
        phone: profile.phone ?? null,
        gender: profile.gender ?? null,
        location: profile.location ?? null,
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
    try { return JSON.parse(raw) as KoshProfile; } catch { return null; }
  },

  async fetchProfile(userId: string): Promise<KoshProfile | null> {
    if (!supabase) return null;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (!data) return null;
    const profile = data as KoshProfile;
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    return profile;
  },

  // ── Module progress ────────────────────────────────────────────────────
  saveModuleProgress(record: ModuleProgressRecord): void {
    const all = this.getAllProgress();
    all[record.moduleId] = record;
    localStorage.setItem(KEYS.MODULE_PROGRESS, JSON.stringify(all));
    if (!supabase) return;
    getAuthUserId().then((userId) => {
      if (!userId) return;
      supabase!
        .from("module_progress")
        .upsert({
          user_id: userId,
          module_id: record.moduleId,
          status: record.status,
          started_at: record.startedAt ?? null,
          completed_at: record.completedAt ?? null,
          time_spent_seconds: record.timeSpentSeconds,
          quiz_score: record.quizScore,
          quiz_responses: record.quizResponses,
          action_completed: record.actionCompleted,
          updated_at: new Date().toISOString(),
        })
        .then(() => {});
    });
  },

  getModuleProgress(moduleId: string): ModuleProgressRecord | null {
    return this.getAllProgress()[moduleId] ?? null;
  },

  getAllProgress(): Record<string, ModuleProgressRecord> {
    const raw = localStorage.getItem(KEYS.MODULE_PROGRESS);
    if (!raw) return {};
    try { return JSON.parse(raw) as Record<string, ModuleProgressRecord>; } catch { return {}; }
  },

  // ── Tool usage analytics ───────────────────────────────────────────────
  trackToolUsage(toolName: string): void {
    if (!supabase) return;
    getAuthUserId().then((userId) => {
      if (!userId) return;
      supabase!
        .from("tool_usage")
        .insert({ user_id: userId, tool_name: toolName, used_at: new Date().toISOString() })
        .then(() => {});
    });
  },

  // ── Clear ──────────────────────────────────────────────────────────────
  clearAll(): void {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  },
};
