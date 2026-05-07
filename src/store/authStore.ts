// ─────────────────────────────────────────────────────────────────────────────
// Auth store — local-first, NO Supabase auth listener.
//
// All sign-in / sign-up / sign-out logic lives in src/lib/localAuth.ts. This
// store is the React-facing facade so components can read the current profile
// reactively. We deliberately do NOT subscribe to supabase.auth.onAuthStateChange
// because (a) we're not using Supabase auth, and (b) it caused recurring
// "Lock broken by another request" errors when StrictMode double-mounted.
// ─────────────────────────────────────────────────────────────────────────────

import { create } from "zustand";
import { db, type KoshProfile } from "@/lib/supabase";
import { localAuth } from "@/lib/localAuth";

interface AuthStore {
  profile:  KoshProfile | null;
  isLoaded: boolean;

  /** Called once at app start. Returns a no-op cleanup so existing callers work. */
  initAuth:    () => () => void;
  /** Update the active user's profile (Profile page edits). */
  setProfile:  (profile: KoshProfile) => void;
  /** Snapshot active progress to account, clear active session, navigate home. */
  logout:      () => Promise<void>;
  /** Re-read profile from localStorage (used after demo / external mutations). */
  loadProfile: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  profile:  null,
  isLoaded: false,

  initAuth: () => {
    // Synchronous boot — no Supabase round-trip, so no race conditions.
    const profile = localAuth.getActiveProfile() ?? db.getProfile();
    set({ profile, isLoaded: true });
    return () => {};
  },

  setProfile: (profile: KoshProfile) => {
    // Mirror the update everywhere: active key, per-user cache, and the
    // localAuth account record. Also fire the existing Supabase upsert as a
    // best-effort background sync (errors are logged, not blocking).
    db.saveProfile(profile);
    localAuth.updateActiveProfile(profile);
    set({ profile });
  },

  logout: async () => {
    // Always succeed — local-first means logout is a synchronous local op.
    // Snapshot active state to the account first so re-login restores progress.
    localAuth.logOut();
    db.clearAll();
    set({ profile: null, isLoaded: true });
  },

  loadProfile: () => {
    const profile = localAuth.getActiveProfile() ?? db.getProfile();
    set({ profile, isLoaded: true });
  },
}));
