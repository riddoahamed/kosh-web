// ─────────────────────────────────────────────────────────────────────────────
// Kosh local auth — the simplest auth that actually works for an MVP.
//
// Everything is stored in localStorage on the user's device:
//   - kosh:accounts_v1     → { [email]: { password, profile, snapshot } }
//   - kosh:active_email_v1 → email of the currently logged-in account (or absent)
//
// "Snapshot" holds the per-account isolated copy of progress / mangoes /
// diagnostic results, so two accounts on the same device don't bleed into
// each other.
//
// No Supabase auth calls. No email confirmation. No magic links. No password
// reset emails. The entire flow is synchronous and offline-capable.
// Cross-device sync is OUT OF SCOPE for this auth layer; if you need it,
// it's a future feature on top.
//
// Trade-off: passwords are stored in plain text in localStorage. For an MVP
// educational app this is acceptable — the threat model is "another person
// using the same browser session" which is already covered by browser auth.
// Don't ship this as-is to a fintech.
// ─────────────────────────────────────────────────────────────────────────────

import type { KoshProfile, ModuleProgressRecord } from "./supabase";
import type { DiagnosticResult } from "@/types/diagnostic";

const ACCOUNTS_KEY = "kosh:accounts_v1";
const ACTIVE_KEY   = "kosh:active_email_v1";

// Active-state mirror keys (what the running app reads/writes)
const ACTIVE_KEYS = {
  PROFILE:    "kosh:profile",
  PROGRESS:   "kosh:module_progress",
  MANGOES:    "kosh:mangoes",
  DIAGNOSTIC: "kosh:diagnostic_result",
  FEEDBACK:   "kosh:lesson_feedback",
  EXPLAINERS: "kosh:explainer_progress",
  ZONE_UNLOCKS: "kosh:zone_unlocks",
  PACK_COMPLETION: "kosh:pack_completion",
} as const;

interface MangoesState {
  total: number;
  streak: number;
  lastVisitDate: string;
  history: { amount: number; reason: string; date: string }[];
}

interface AccountSnapshot {
  progress?:   Record<string, ModuleProgressRecord>;
  mangoes?:    MangoesState;
  diagnostic?: DiagnosticResult;
  lessonFeedback?: Record<string, unknown>;
  explainerProgress?: Record<string, unknown>;
  zoneUnlocks?: string[];
  packCompletion?: Record<string, unknown>;
}

interface AccountRecord {
  email:     string;
  password:  string;       // plain — see header comment for trade-off
  profile:   KoshProfile;
  snapshot?: AccountSnapshot;
  createdAt: string;
}

type AccountResult =
  | { success: true; profile: KoshProfile }
  | { success: false; error: string };

// ── Internals ────────────────────────────────────────────────────────────────

function readAccounts(): Record<string, AccountRecord> {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAccounts(all: Record<string, AccountRecord>): void {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(all));
}

function genLocalId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return "local-" + crypto.randomUUID();
  }
  return "local-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function clearActiveState(): void {
  Object.values(ACTIVE_KEYS).forEach((k) => localStorage.removeItem(k));
}

/** Copy the per-account snapshot into the active-state mirror keys so the
    running app sees this user's data. */
function restoreActiveStateFrom(acc: AccountRecord): void {
  localStorage.setItem(ACTIVE_KEYS.PROFILE, JSON.stringify(acc.profile));
  if (acc.snapshot?.progress) {
    localStorage.setItem(ACTIVE_KEYS.PROGRESS, JSON.stringify(acc.snapshot.progress));
  } else {
    localStorage.removeItem(ACTIVE_KEYS.PROGRESS);
  }
  if (acc.snapshot?.mangoes) {
    localStorage.setItem(ACTIVE_KEYS.MANGOES, JSON.stringify(acc.snapshot.mangoes));
  } else {
    localStorage.removeItem(ACTIVE_KEYS.MANGOES);
  }
  if (acc.snapshot?.diagnostic) {
    localStorage.setItem(ACTIVE_KEYS.DIAGNOSTIC, JSON.stringify(acc.snapshot.diagnostic));
  } else {
    localStorage.removeItem(ACTIVE_KEYS.DIAGNOSTIC);
  }
  if (acc.snapshot?.lessonFeedback) {
    localStorage.setItem(ACTIVE_KEYS.FEEDBACK, JSON.stringify(acc.snapshot.lessonFeedback));
  } else {
    localStorage.removeItem(ACTIVE_KEYS.FEEDBACK);
  }
  if (acc.snapshot?.explainerProgress) {
    localStorage.setItem(ACTIVE_KEYS.EXPLAINERS, JSON.stringify(acc.snapshot.explainerProgress));
  } else {
    localStorage.removeItem(ACTIVE_KEYS.EXPLAINERS);
  }
  if (acc.snapshot?.zoneUnlocks) {
    localStorage.setItem(ACTIVE_KEYS.ZONE_UNLOCKS, JSON.stringify(acc.snapshot.zoneUnlocks));
  } else {
    localStorage.removeItem(ACTIVE_KEYS.ZONE_UNLOCKS);
  }
  if (acc.snapshot?.packCompletion) {
    localStorage.setItem(ACTIVE_KEYS.PACK_COMPLETION, JSON.stringify(acc.snapshot.packCompletion));
  } else {
    localStorage.removeItem(ACTIVE_KEYS.PACK_COMPLETION);
  }
}

/** Read the active-state mirror keys back into a per-account snapshot. */
function captureActiveStateSnapshot(): AccountSnapshot {
  const snap: AccountSnapshot = {};
  const safeRead = <T>(key: string): T | undefined => {
    const raw = localStorage.getItem(key);
    if (!raw) return undefined;
    try { return JSON.parse(raw) as T; } catch { return undefined; }
  };
  const progress   = safeRead<Record<string, ModuleProgressRecord>>(ACTIVE_KEYS.PROGRESS);
  const mangoes    = safeRead<MangoesState>(ACTIVE_KEYS.MANGOES);
  const diagnostic = safeRead<DiagnosticResult>(ACTIVE_KEYS.DIAGNOSTIC);
  const feedback   = safeRead<Record<string, unknown>>(ACTIVE_KEYS.FEEDBACK);
  const explainers  = safeRead<Record<string, unknown>>(ACTIVE_KEYS.EXPLAINERS);
  const zoneUnlocks = safeRead<string[]>(ACTIVE_KEYS.ZONE_UNLOCKS);
  const packCompletion = safeRead<Record<string, unknown>>(ACTIVE_KEYS.PACK_COMPLETION);
  if (progress)   snap.progress   = progress;
  if (mangoes)    snap.mangoes    = mangoes;
  if (diagnostic) snap.diagnostic = diagnostic;
  if (feedback)   snap.lessonFeedback = feedback;
  if (explainers)  snap.explainerProgress = explainers;
  if (zoneUnlocks) snap.zoneUnlocks = zoneUnlocks;
  if (packCompletion) snap.packCompletion = packCompletion;
  return snap;
}

// ── Public API ───────────────────────────────────────────────────────────────

export const localAuth = {
  /** Currently logged-in email, or null if logged out. */
  getActiveEmail(): string | null {
    return localStorage.getItem(ACTIVE_KEY);
  },

  /** Currently logged-in profile, or null if logged out. */
  getActiveProfile(): KoshProfile | null {
    const email = this.getActiveEmail();
    if (!email) return null;
    const acc = readAccounts()[email];
    return acc?.profile ?? null;
  },

  /** True if an account exists for this email. */
  exists(email: string): boolean {
    return !!readAccounts()[email.trim().toLowerCase()];
  },

  /** Create a new account, log the user in, and restore (empty) state. */
  signUp(
    email: string,
    password: string,
    profileData: Omit<KoshProfile, "id" | "email" | "created_at"> & { id?: string },
  ): AccountResult {
    const e = email.trim().toLowerCase();
    if (!e || !password) return { success: false, error: "Email and password are required." };
    if (password.length < 6) return { success: false, error: "Password must be at least 6 characters." };

    const all = readAccounts();
    if (all[e]) {
      return { success: false, error: "An account with this email already exists. Try logging in instead." };
    }

    const profile: KoshProfile = {
      ...profileData,
      id: profileData.id ?? genLocalId(),
      email: e,
      created_at: new Date().toISOString(),
    };
    const now = new Date().toISOString();
    all[e] = {
      email: e,
      password,
      profile,
      createdAt: now,
      // Carry over any diagnostic the user already completed pre-signup
      // (so they don't have to retake the level check just because they
      // moved from anonymous → signed up)
      snapshot: captureActiveStateSnapshot(),
    };
    writeAccounts(all);

    // Clear any leftover from the anonymous session, then restore THIS account
    clearActiveState();
    restoreActiveStateFrom(all[e]);
    localStorage.setItem(ACTIVE_KEY, e);

    return { success: true, profile };
  },

  /** Verify password and load the account into the active session. */
  logIn(email: string, password: string): AccountResult {
    const e = email.trim().toLowerCase();
    if (!e || !password) return { success: false, error: "Email and password are required." };

    const acc = readAccounts()[e];
    if (!acc) return { success: false, error: "No account found with this email. Sign up first?" };
    if (acc.password !== password) return { success: false, error: "Wrong password." };

    // If a different user was active, snapshot their progress before switching
    const previousEmail = this.getActiveEmail();
    if (previousEmail && previousEmail !== e) {
      this.snapshotActive(previousEmail);
    }

    clearActiveState();
    restoreActiveStateFrom(acc);
    localStorage.setItem(ACTIVE_KEY, e);
    return { success: true, profile: acc.profile };
  },

  /** Snapshot the running app's active state into the given account record. */
  snapshotActive(email?: string): void {
    const e = (email ?? this.getActiveEmail() ?? "").trim().toLowerCase();
    if (!e) return;
    const all = readAccounts();
    if (!all[e]) return;
    all[e].snapshot = captureActiveStateSnapshot();
    // Also keep profile in sync (e.g., if the user updated it on the Profile page)
    const rawProfile = localStorage.getItem(ACTIVE_KEYS.PROFILE);
    if (rawProfile) {
      try { all[e].profile = JSON.parse(rawProfile) as KoshProfile; } catch { /* noop */ }
    }
    writeAccounts(all);
  },

  /** Update the active user's profile in both the active mirror and account. */
  updateActiveProfile(updates: Partial<KoshProfile>): KoshProfile | null {
    const e = this.getActiveEmail();
    if (!e) return null;
    const all = readAccounts();
    if (!all[e]) return null;
    const merged = { ...all[e].profile, ...updates };
    all[e].profile = merged;
    writeAccounts(all);
    localStorage.setItem(ACTIVE_KEYS.PROFILE, JSON.stringify(merged));
    return merged;
  },

  /** Snapshot active state into the account, then clear active session. */
  logOut(): void {
    const e = this.getActiveEmail();
    if (e) this.snapshotActive(e);
    clearActiveState();
    localStorage.removeItem(ACTIVE_KEY);
  },

  /** Forget the user from this device entirely (account + progress). */
  deleteAccount(email: string): void {
    const e = email.trim().toLowerCase();
    const all = readAccounts();
    delete all[e];
    writeAccounts(all);
    if (this.getActiveEmail() === e) {
      clearActiveState();
      localStorage.removeItem(ACTIVE_KEY);
    }
  },

  /** List all registered emails on this device (for debug / admin). */
  listEmails(): string[] {
    return Object.keys(readAccounts());
  },
};
