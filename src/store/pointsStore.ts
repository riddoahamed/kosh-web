import { create } from "zustand";

const STORE_KEY = "kosh:mangoes";
const REENGAGEMENT_KEY = "kosh:reengagement";

export interface MangoEntry {
  amount: number;
  reason: string;
  date: string;
}

interface PointsState {
  total: number;
  streak: number;
  lastVisitDate: string | null;
  history: MangoEntry[];
  load: () => void;
  addPoints: (amount: number, reason: string) => void;
  spendPoints: (amount: number, reason: string) => boolean;
  checkStreak: () => void;
  checkReengagement: () => { awarded: boolean; amount: number };
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function loadFromStorage() {
  try {
    // Try new key first, fall back to old key for migration
    const raw = localStorage.getItem(STORE_KEY) ?? localStorage.getItem("kosh:points");
    if (!raw) return null;
    return JSON.parse(raw) as {
      total: number;
      streak: number;
      lastVisitDate: string | null;
      history: MangoEntry[];
    };
  } catch {
    return null;
  }
}

function saveToStorage(state: Pick<PointsState, "total" | "streak" | "lastVisitDate" | "history">) {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
}

/** Tiered streak bonus: higher streak = more mangoes per day */
function streakBonus(streak: number): number {
  if (streak >= 30) return MANGOES.STREAK_BONUS_30_DAYS;
  if (streak >= 14) return MANGOES.STREAK_BONUS_14_DAYS;
  if (streak >= 7)  return MANGOES.STREAK_BONUS_7_DAYS;
  return 5; // base daily streak reward
}

export const usePointsStore = create<PointsState>((set, get) => ({
  total: 0,
  streak: 0,
  lastVisitDate: null,
  history: [],

  load: () => {
    const saved = loadFromStorage();
    if (saved) set(saved);
    get().checkStreak();
  },

  checkStreak: () => {
    const { lastVisitDate, streak } = get();
    const today = todayStr();
    if (lastVisitDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    let newStreak = streak;
    if (lastVisitDate === yesterdayStr) {
      newStreak = streak + 1;
    } else if (lastVisitDate !== today) {
      newStreak = 1;
    }

    const state = { ...get(), streak: newStreak, lastVisitDate: today };
    saveToStorage(state);
    set({ streak: newStreak, lastVisitDate: today });

    if (lastVisitDate && lastVisitDate !== today) {
      const bonus = streakBonus(newStreak);
      get().addPoints(bonus, `Day ${newStreak} streak 🔥`);
    }
  },

  checkReengagement: () => {
    const { lastVisitDate } = get();
    if (!lastVisitDate) return { awarded: false, amount: 0 };

    const last = new Date(lastVisitDate);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 14) return { awarded: false, amount: 0 };

    // Check if already awarded re-engagement recently (within 30 days)
    try {
      const re = localStorage.getItem(REENGAGEMENT_KEY);
      if (re) {
        const last30 = new Date(JSON.parse(re).awardedAt);
        const daysSinceLast = Math.floor((now.getTime() - last30.getTime()) / (1000 * 60 * 60 * 24));
        if (daysSinceLast < 30) return { awarded: false, amount: 0 };
      }
    } catch { /* ignore */ }

    const amount = MANGOES.REENGAGEMENT_AFTER_14_DAYS;
    get().addPoints(amount, "Welcome back! 🥭 Re-engagement bonus");
    localStorage.setItem(REENGAGEMENT_KEY, JSON.stringify({ awardedAt: now.toISOString() }));
    return { awarded: true, amount };
  },

  addPoints: (amount, reason) => {
    const entry: MangoEntry = { amount, reason, date: new Date().toISOString() };
    const newTotal = get().total + amount;
    const newHistory = [entry, ...get().history].slice(0, 100);
    const state = { ...get(), total: newTotal, history: newHistory };
    saveToStorage(state);
    set({ total: newTotal, history: newHistory });
  },

  spendPoints: (amount, reason) => {
    const { total } = get();
    if (total < amount) return false;
    const entry: MangoEntry = { amount: -amount, reason, date: new Date().toISOString() };
    const newTotal = total - amount;
    const newHistory = [entry, ...get().history].slice(0, 100);
    const state = { ...get(), total: newTotal, history: newHistory };
    saveToStorage(state);
    set({ total: newTotal, history: newHistory });
    return true;
  },
}));

// ─── Mango earning rates ───────────────────────────────────────────────────
export const MANGOES = {
  MODULE_READ:             60,
  QUIZ_100:                40,   // bonus on top of MODULE_READ
  QUIZ_67:                 20,   // 67-99% bonus
  QUIZ_33:                 10,   // 33-66% bonus
  ACTION_DONE:             25,
  SKIP_QUIZ_PASS:          75,
  CHALLENGE_DAY:           10,
  ZONE_COMPLETE:          150,
  STREAK_BONUS_7_DAYS:     15,   // per day after 7-day streak
  STREAK_BONUS_14_DAYS:    25,   // per day after 14-day streak
  STREAK_BONUS_30_DAYS:    35,   // per day after 30-day streak
  REENGAGEMENT_AFTER_14_DAYS: 500,
  SHARE_RESULT_CARD:       15,
  RETEST_30_DAY:          200,
} as const;

// Keep old POINTS alias so existing callers compile without changes
export const POINTS = {
  MODULE_READ:  MANGOES.MODULE_READ,
  QUIZ_100:     MANGOES.QUIZ_100,
  QUIZ_67:      MANGOES.QUIZ_67,
  QUIZ_33:      MANGOES.QUIZ_33,
  ACTION_DONE:  MANGOES.ACTION_DONE,
  SKIP_QUIZ_PASS: MANGOES.SKIP_QUIZ_PASS,
  CHALLENGE_DAY:  MANGOES.CHALLENGE_DAY,
  STREAK_BONUS:   MANGOES.STREAK_BONUS_7_DAYS,
} as const;

// ─── Redemption rules ──────────────────────────────────────────────────────
export const REDEMPTION = {
  MIN_MANGOES:      10_000,   // minimum mangoes to redeem
  MIN_DAYS:             90,   // minimum days on platform
  RATE_BDT_PER_MANGO: 0.01,  // 1,000 mangoes = Tk 10
  MIN_REDEEM_AMOUNT: 2_500,   // smallest redemption = Tk 25
  STREAK_REPAIR_COST:  150,   // streak repair spend
} as const;

export function mangoesToBdt(mangoes: number): number {
  return Math.floor(mangoes * REDEMPTION.RATE_BDT_PER_MANGO * 100) / 100;
}
