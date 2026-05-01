import { create } from "zustand";
import { auth, db, type KoshProfile } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthStore {
  // Supabase auth user (set after OTP verification)
  user: User | null;
  // App profile (name, phone, etc — set after profile completion)
  profile: KoshProfile | null;
  isLoaded: boolean;

  // Called once at app start — listens to Supabase session changes
  initAuth: () => () => void;
  // After profile form is filled
  setProfile: (profile: KoshProfile) => void;
  // Logout: clear session + local data
  logout: () => Promise<void>;
  // Legacy — keep for components that call loadProfile()
  loadProfile: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  profile: null,
  isLoaded: false,

  initAuth: () => {
    // Restore profile from localStorage immediately (synchronous)
    const localProfile = db.getProfile();
    if (localProfile) set({ profile: localProfile });

    // Listen to Supabase auth state changes
    const { data: { subscription } } = auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      set({ user, isLoaded: true });

      if (user) {
        // Try to fetch profile from Supabase (cross-device sync)
        const remoteProfile = await db.fetchProfile(user.id);
        if (remoteProfile) {
          set({ profile: remoteProfile });
        } else {
          // No remote profile yet — keep local if it matches this user
          const local = db.getProfile();
          if (local && local.id === user.id) set({ profile: local });
          else set({ profile: null }); // new user, needs profile completion
        }
      } else {
        // No Supabase session — fall back to whatever is in localStorage.
        // This covers: local-only users, demo users, and offline use.
        // Truly signed-out users are handled by logout() which calls
        // db.clearAll() first, so db.getProfile() returns null there too.
        const localProfile = db.getProfile();
        set({ user: null, profile: localProfile, isLoaded: true });
      }
    });

    return () => subscription.unsubscribe();
  },

  setProfile: (profile: KoshProfile) => {
    db.saveProfile(profile);
    set({ profile });
  },

  logout: async () => {
    await auth.signOut();
    db.clearAll();
    set({ user: null, profile: null });
  },

  // Legacy compat — loads from localStorage synchronously
  loadProfile: () => {
    const profile = db.getProfile();
    set({ profile, isLoaded: true });
  },
}));
