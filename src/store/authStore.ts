import { create } from "zustand";
import { db, type KoshProfile } from "@/lib/supabase";

interface AuthStore {
  profile: KoshProfile | null;
  isLoaded: boolean;
  setProfile: (profile: KoshProfile) => void;
  loadProfile: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  profile: null,
  isLoaded: false,

  setProfile: (profile) => {
    db.saveProfile(profile);
    set({ profile });
  },

  loadProfile: () => {
    const profile = db.getProfile();
    set({ profile, isLoaded: true });
  },

  logout: () => {
    db.clearAll();
    set({ profile: null });
  },
}));
