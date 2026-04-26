import { create } from "zustand";

const POINTS_KEY = "kosh:points";

export interface PointEntry {
  amount: number;
  reason: string;
  date: string;
}

interface PointsState {
  total: number;
  streak: number;
  lastVisitDate: string | null;
  history: PointEntry[];
  load: () => void;
  addPoints: (amount: number, reason: string) => void;
  checkStreak: () => void;
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(POINTS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as {
      total: number;
      streak: number;
      lastVisitDate: string | null;
      history: PointEntry[];
    };
  } catch {
    return null;
  }
}

function saveToStorage(state: Pick<PointsState, "total" | "streak" | "lastVisitDate" | "history">) {
  localStorage.setItem(POINTS_KEY, JSON.stringify(state));
}

export const usePointsStore = create<PointsState>((set, get) => ({
  total: 0,
  streak: 0,
  lastVisitDate: null,
  history: [],

  load: () => {
    const saved = loadFromStorage();
    if (saved) {
      set(saved);
    }
    // Check streak on load
    get().checkStreak();
  },

  checkStreak: () => {
    const { lastVisitDate, streak } = get();
    const today = todayStr();
    if (lastVisitDate === today) return; // already visited today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    let newStreak = streak;
    if (lastVisitDate === yesterdayStr) {
      // Consecutive day — extend streak
      newStreak = streak + 1;
    } else if (lastVisitDate !== today) {
      // Streak broken or first visit
      newStreak = 1;
    }

    const state = { ...get(), streak: newStreak, lastVisitDate: today };
    saveToStorage(state);
    set({ streak: newStreak, lastVisitDate: today });

    // Award streak points (but not on very first visit)
    if (lastVisitDate && lastVisitDate !== today) {
      get().addPoints(newStreak >= 7 ? 20 : 10, `Day ${newStreak} streak 🔥`);
    }
  },

  addPoints: (amount, reason) => {
    const entry: PointEntry = { amount, reason, date: new Date().toISOString() };
    const newTotal = get().total + amount;
    const newHistory = [entry, ...get().history].slice(0, 50);
    const state = { ...get(), total: newTotal, history: newHistory };
    saveToStorage(state);
    set({ total: newTotal, history: newHistory });
  },
}));

// Points reference
export const POINTS = {
  MODULE_READ: 50,
  QUIZ_100: 100,
  QUIZ_67: 60,
  QUIZ_33: 30,
  ACTION_DONE: 25,
  SKIP_QUIZ_PASS: 75,
  CHALLENGE_DAY: 10,
  STREAK_BONUS: 20,
} as const;
