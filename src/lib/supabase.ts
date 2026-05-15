import { createClient } from "@supabase/supabase-js";
import type { DiagnosticResult } from "@/types/diagnostic";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

// App runs in localStorage-only mode if env vars are missing
export const supabaseReady = !!supabaseUrl && !!supabaseKey;

export const supabase = supabaseReady
  ? createClient(supabaseUrl!, supabaseKey!)
  : null;

// ── Auth helpers ──────────────────────────────────────────────────────────
// Primary path is email + password (no magic-link redirect URL config needed).
// Magic-link OTP is kept as a fallback for users who prefer it.

export const auth = {
  /** Create an account with email + password. Returns { user, session, error }.
      If email confirmation is enabled in Supabase, session will be null until
      the user confirms via email — surface this case to the UI.
      The emailRedirectTo brings them back to /auth after they click the link
      so the auto-detected session lands them straight on the dashboard. */
  async signUpWithPassword(email: string, password: string, data?: Record<string, unknown>) {
    if (!supabase) throw new Error("Supabase not configured");
    return supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        emailRedirectTo: window.location.origin + "/auth",
        data,
      },
    });
  },

  /** Log in with email + password. */
  async signInWithPassword(email: string, password: string) {
    if (!supabase) throw new Error("Supabase not configured");
    return supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
  },

  /** Send a password-reset email. The user gets a link that returns to
      /auth?reset=1 where they can set a new password. */
  async resetPassword(email: string) {
    if (!supabase) throw new Error("Supabase not configured");
    return supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: window.location.origin + "/auth?reset=1",
    });
  },

  /** Update the password for the currently-signed-in user. Used after the
      password-reset email lands the user back in the app. */
  async updatePassword(newPassword: string) {
    if (!supabase) throw new Error("Supabase not configured");
    return supabase.auth.updateUser({ password: newPassword });
  },

  /** Re-send the email-confirmation link if the user lost their first email. */
  async resendConfirmation(email: string) {
    if (!supabase) throw new Error("Supabase not configured");
    return supabase.auth.resend({
      type: "signup",
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: window.location.origin + "/auth" },
    });
  },

  // ── Magic link / OTP (kept as a fallback) ────────────────────────────
  async sendOtp(email: string) {
    if (!supabase) throw new Error("Supabase not configured");
    return supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: window.location.origin + "/auth",
      },
    });
  },

  async verifyOtp(email: string, token: string) {
    if (!supabase) throw new Error("Supabase not configured");
    return supabase.auth.verifyOtp({ email: email.trim().toLowerCase(), token, type: "email" });
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
  LESSON_FEEDBACK: "kosh:lesson_feedback",
  EXPLAINER_PROGRESS: "kosh:explainer_progress",
  ZONE_UNLOCKS: "kosh:zone_unlocks",
  PACK_COMPLETION: "kosh:pack_completion",
} as const;
const MANGOES_KEY = "kosh:mangoes";

// Per-user-id profile cache — survives logout so users don't have to re-enter
// their profile on every login if Supabase is unreachable or RLS blocks the
// remote write (which fails silently otherwise).
const PROFILE_CACHE_PREFIX = "kosh:profile_cache:";
const profileCacheKey = (userId: string) => `${PROFILE_CACHE_PREFIX}${userId}`;
const USER_STATE_CACHE_PREFIX = "kosh:user_state_cache:";
const userStateCacheKey = (userId: string) => `${USER_STATE_CACHE_PREFIX}${userId}`;

function readCachedProfile(userId: string): KoshProfile | null {
  const raw = localStorage.getItem(profileCacheKey(userId));
  if (!raw) return null;
  try { return JSON.parse(raw) as KoshProfile; } catch { return null; }
}

function writeCachedProfile(profile: KoshProfile): void {
  if (!profile.id) return;
  localStorage.setItem(profileCacheKey(profile.id), JSON.stringify(profile));
}

function safeJSON<T,>(key: string): T | undefined {
  const v = localStorage.getItem(key);
  if (!v) return undefined;
  try { return JSON.parse(v) as T; } catch { return undefined; }
}

function captureLocalUserState(): Record<string, unknown> {
  return {
    profile: safeJSON(KEYS.PROFILE),
    progress: safeJSON(KEYS.MODULE_PROGRESS),
    mangoes: safeJSON(MANGOES_KEY),
    diagnostic: safeJSON(KEYS.DIAGNOSTIC),
    lessonFeedback: safeJSON(KEYS.LESSON_FEEDBACK),
    explainerProgress: safeJSON(KEYS.EXPLAINER_PROGRESS),
    zoneUnlocks: safeJSON(KEYS.ZONE_UNLOCKS),
    packCompletion: safeJSON(KEYS.PACK_COMPLETION),
  };
}

function snapshotToSupabaseUserCache(userId?: string): void {
  try {
    const profile = safeJSON<KoshProfile>(KEYS.PROFILE);
    const id = userId ?? profile?.id;
    if (!id) return;
    localStorage.setItem(userStateCacheKey(id), JSON.stringify(captureLocalUserState()));
  } catch {
    /* best-effort only */
  }
}

function restoreSupabaseUserCache(userId: string): KoshProfile | null {
  const raw = localStorage.getItem(userStateCacheKey(userId));
  if (!raw) return null;
  try {
    const snap = JSON.parse(raw) as Record<string, unknown>;
    const pairs: Array<[string, unknown]> = [
      [KEYS.MODULE_PROGRESS, snap.progress],
      [MANGOES_KEY, snap.mangoes],
      [KEYS.DIAGNOSTIC, snap.diagnostic],
      [KEYS.LESSON_FEEDBACK, snap.lessonFeedback],
      [KEYS.EXPLAINER_PROGRESS, snap.explainerProgress],
      [KEYS.ZONE_UNLOCKS, snap.zoneUnlocks],
      [KEYS.PACK_COMPLETION, snap.packCompletion],
    ];
    for (const [key, value] of pairs) {
      if (value === undefined) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(value));
    }
    return snap.profile ? (snap.profile as KoshProfile) : null;
  } catch {
    return null;
  }
}

// ── Per-account snapshot helper ──────────────────────────────────────────────
// On every mutation (profile / progress / diagnostic / mangoes), copy the
// current active-state localStorage keys into the localAuth account record.
// This keeps each user's data isolated even when multiple accounts share a
// device — when account A logs out, A's data is preserved in their account
// record so the next time they log in, it's restored.
//
// We INLINE the snapshot logic here (instead of importing localAuth) to
// avoid a circular import (localAuth.ts imports types from this file).
function snapshotToActiveAccount(): void {
  try {
    const email = localStorage.getItem("kosh:active_email_v1");
    if (!email) return;
    const raw = localStorage.getItem("kosh:accounts_v1");
    if (!raw) return;
    const accs = JSON.parse(raw);
    if (!accs[email]) return;

    const safeJSON = <T,>(key: string): T | undefined => {
      const v = localStorage.getItem(key);
      if (!v) return undefined;
      try { return JSON.parse(v) as T; } catch { return undefined; }
    };

    accs[email].snapshot = {
      progress:   safeJSON("kosh:module_progress"),
      mangoes:    safeJSON("kosh:mangoes"),
      diagnostic: safeJSON("kosh:diagnostic_result"),
      lessonFeedback: safeJSON("kosh:lesson_feedback"),
      explainerProgress: safeJSON("kosh:explainer_progress"),
      zoneUnlocks: safeJSON("kosh:zone_unlocks"),
      packCompletion: safeJSON("kosh:pack_completion"),
    };
    const p = safeJSON<KoshProfile>("kosh:profile");
    if (p) accs[email].profile = p;
    localStorage.setItem("kosh:accounts_v1", JSON.stringify(accs));
  } catch {
    /* best-effort — never throw during a save */
  }
  snapshotToSupabaseUserCache();
}

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

  // — Extended fields for leaderboards & community —
  institution?: string;          // University / company / school name
  institution_type?: "university" | "college" | "school" | "company" | "other";
  occupation?: "student" | "professional" | "business_owner" | "freelancer" | "other";
  division?: string;             // Bangladesh division (Dhaka, Chittagong, etc.)
  district?: string;             // Free-text district
  bio?: string;                  // Short tagline

  // — KYC fields (for mango redemption) —
  kyc_submitted?: boolean;
  kyc_status?: "not_submitted" | "pending" | "verified" | "rejected";
  nid_last4?: string;            // Last 4 digits of NID only — never full NID
  kyc_submitted_at?: string;
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

export type LessonFeedbackValue = "too_long" | "too_basic" | "useful" | "want_more";

export interface LessonFeedbackRecord {
  moduleId: string;
  value: LessonFeedbackValue;
  quizScore: number | null;
  createdAt: string;
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
    snapshotToActiveAccount();
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
    // Active pointer + per-user cache (cache survives logout for fast re-auth)
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    writeCachedProfile(profile);
    snapshotToActiveAccount();

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
        // Extended
        institution: profile.institution ?? null,
        institution_type: profile.institution_type ?? null,
        occupation: profile.occupation ?? null,
        division: profile.division ?? null,
        district: profile.district ?? null,
        bio: profile.bio ?? null,
        kyc_submitted: profile.kyc_submitted ?? false,
        kyc_status: profile.kyc_status ?? "not_submitted",
        nid_last4: profile.nid_last4 ?? null,
        kyc_submitted_at: profile.kyc_submitted_at ?? null,
      })
      .then(({ error }) => {
        if (error) {
          // Surface RLS / network failures so we can diagnose. Cache still
          // holds the profile, so the user experience isn't blocked.
          console.warn("[kosh] profile upsert failed:", error.message);
        }
      });
  },

  getProfile(): KoshProfile | null {
    const raw = localStorage.getItem(KEYS.PROFILE);
    if (!raw) return null;
    try { return JSON.parse(raw) as KoshProfile; } catch { return null; }
  },

  /** Save a profile locally only — no Supabase write attempt. Used during
      sign-up when email confirmation is required and the user has no live
      session yet. The profile is cached so it's ready for the moment they
      come back after confirming, and a saveProfile() call later will sync
      it to Supabase. */
  saveLocalOnlyProfile(profile: KoshProfile): void {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
    writeCachedProfile(profile);
  },

  /** Profile lookup priority: Supabase → per-user cache → null.
      Per-user cache lets returning users skip the profile form even if the
      remote write previously failed (RLS, env var miss, network drop, etc). */
  async fetchProfile(userId: string): Promise<KoshProfile | null> {
    // Try Supabase first
    if (supabase) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      if (error) {
        console.warn("[kosh] profile fetch error:", error.message);
      }
      if (data) {
        const profile = data as KoshProfile;
        restoreSupabaseUserCache(userId);
        localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
        writeCachedProfile(profile); // refresh cache
        snapshotToSupabaseUserCache(userId);
        return profile;
      }
    }
    // Fall back to per-user cache (survives logout)
    const cached = readCachedProfile(userId);
    if (cached) {
      restoreSupabaseUserCache(userId);
      // Promote cached profile to active and try syncing it to Supabase.
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(cached));
      this.saveProfile(cached); // best-effort retry
      return cached;
    }
    const restored = restoreSupabaseUserCache(userId);
    if (restored) {
      localStorage.setItem(KEYS.PROFILE, JSON.stringify(restored));
      writeCachedProfile(restored);
      return restored;
    }
    return null;
  },

  // ── Module progress ────────────────────────────────────────────────────
  saveModuleProgress(record: ModuleProgressRecord): void {
    const all = this.getAllProgress();
    all[record.moduleId] = record;
    localStorage.setItem(KEYS.MODULE_PROGRESS, JSON.stringify(all));
    snapshotToActiveAccount();
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

  // ── Lesson feedback ────────────────────────────────────────────────────
  saveLessonFeedback(record: LessonFeedbackRecord): void {
    const all = this.getAllLessonFeedback();
    all[record.moduleId] = record;
    localStorage.setItem(KEYS.LESSON_FEEDBACK, JSON.stringify(all));
    snapshotToActiveAccount();

    if (!supabase) return;
    getAuthUserId().then((userId) => {
      if (!userId) return;
      supabase!
        .from("lesson_feedback")
        .upsert(
          {
            user_id: userId,
            module_id: record.moduleId,
            feedback: record.value,
            quiz_score: record.quizScore,
            created_at: record.createdAt,
          },
          { onConflict: "user_id,module_id" },
        )
        .then(() => {});
    });
  },

  getLessonFeedback(moduleId: string): LessonFeedbackRecord | null {
    return this.getAllLessonFeedback()[moduleId] ?? null;
  },

  getAllLessonFeedback(): Record<string, LessonFeedbackRecord> {
    const raw = localStorage.getItem(KEYS.LESSON_FEEDBACK);
    if (!raw) return {};
    try { return JSON.parse(raw) as Record<string, LessonFeedbackRecord>; } catch { return {}; }
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
  /** Logout: clear ACTIVE session data + demo flag + mangoes, but KEEP the
      per-user profile cache so the same user can sign back in without
      re-filling the profile form. UI/theme prefs are also kept. */
  clearAll(): void {
    snapshotToSupabaseUserCache();
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
    // Also clear demo flag, points, and any session-tied state
    localStorage.removeItem("kosh:demo_mode");
    localStorage.removeItem(MANGOES_KEY);
    // Note: kosh:profile_cache:<userId> entries are intentionally preserved.
  },

  /** Public snapshot helper — pointsStore and other non-db code can call
      this after writing to localStorage so the active account stays in sync. */
  syncToActiveAccount(): void {
    snapshotToActiveAccount();
    snapshotToSupabaseUserCache();
  },

  /** Hard reset — wipes everything including profile caches. Use only when
      the user explicitly says "forget me on this device." */
  hardClearAll(): void {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
    localStorage.removeItem("kosh:demo_mode");
    localStorage.removeItem(MANGOES_KEY);
    localStorage.removeItem("kosh:accounts_v1");
    localStorage.removeItem("kosh:active_email_v1");
    // Sweep all per-user profile caches
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.startsWith(PROFILE_CACHE_PREFIX)) localStorage.removeItem(k);
      if (k && k.startsWith(USER_STATE_CACHE_PREFIX)) localStorage.removeItem(k);
    }
  },
};

// (localAuth has moved to src/lib/localAuth.ts — see that file for the
// canonical local-first auth implementation. supabase.ts now only handles
// remote sync and the localStorage helpers used by the running app.)
