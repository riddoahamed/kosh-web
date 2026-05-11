// ─────────────────────────────────────────────────────────────────────────────
// Auth store — Supabase-first for public beta.
//
// The app still keeps a local profile mirror so demo mode and offline reads
// work, but real beta accounts come from Supabase Auth.
// ─────────────────────────────────────────────────────────────────────────────

import { create } from "zustand";
import { auth, db, supabaseReady, type KoshProfile } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthStore {
  profile:  KoshProfile | null;
  isLoaded: boolean;

  /** Called once at app start. Returns the Supabase listener cleanup. */
  initAuth:    () => () => void;
  /** Update the active user's profile (Profile page edits). */
  setProfile:  (profile: KoshProfile) => void;
  /** Snapshot active progress to account, clear active session, navigate home. */
  logout:      () => Promise<void>;
  /** Re-read profile from localStorage (used after demo / external mutations). */
  loadProfile: () => void;
}

function profileFromUser(user: User): KoshProfile {
  const meta = user.user_metadata ?? {};
  return {
    id: user.id,
    email: user.email ?? undefined,
    name: typeof meta.name === "string" && meta.name.trim() ? meta.name : "Kosh learner",
    age: typeof meta.age === "number" ? meta.age : undefined,
    phone: typeof meta.phone === "string" ? meta.phone : undefined,
    consent_given: meta.consent_given === true,
    level_assigned: typeof meta.level_assigned === "number" ? meta.level_assigned : undefined,
    grey_zone_flagged: meta.grey_zone_flagged === true,
    grey_zone_exposure: Array.isArray(meta.grey_zone_exposure) ? meta.grey_zone_exposure : undefined,
    created_at: user.created_at ?? new Date().toISOString(),
    kyc_status: "not_submitted",
  };
}

export const useAuthStore = create<AuthStore>((set) => ({
  profile:  null,
  isLoaded: false,

  initAuth: () => {
    const localProfile = db.getProfile();
    if (localProfile) set({ profile: localProfile });

    if (!supabaseReady) {
      set({ profile: localProfile, isLoaded: true });
      return () => {};
    }

    let disposed = false;

    auth.getUser()
      .then(async (user) => {
        if (disposed) return;
        if (!user) {
          set({ profile: localProfile, isLoaded: true });
          return;
        }
        const profile = await db.fetchProfile(user.id);
        const nextProfile = profile ?? profileFromUser(user);
        if (!profile) db.saveProfile(nextProfile);
        if (disposed) return;
        set({ profile: nextProfile, isLoaded: true });
      })
      .catch(() => {
        if (!disposed) set({ profile: localProfile, isLoaded: true });
      });

    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session?.user) {
        db.clearAll();
        set({ profile: null, isLoaded: true });
        return;
      }
      const profile = await db.fetchProfile(session.user.id);
      const nextProfile = profile ?? profileFromUser(session.user);
      if (!profile) db.saveProfile(nextProfile);
      set({ profile: nextProfile, isLoaded: true });
    });

    return () => {
      disposed = true;
      subscription.unsubscribe();
    };
  },

  setProfile: (profile: KoshProfile) => {
    db.saveProfile(profile);
    set({ profile });
  },

  logout: async () => {
    await auth.signOut();
    db.clearAll();
    set({ profile: null, isLoaded: true });
  },

  loadProfile: () => {
    const profile = db.getProfile();
    set({ profile, isLoaded: true });
  },
}));
